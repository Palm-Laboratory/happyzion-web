import type {
  AdminMenuTreeNode,
  AdminStaticPage,
  MenuType,
  MenuTreeNodePayload,
} from "@/lib/admin-menu-api";
import {
  HANGUL_BASE_CODE,
  HANGUL_CHOSEONG_INTERVAL,
  HANGUL_FINAL_ROMANIZATION,
  HANGUL_INITIAL_ROMANIZATION,
  HANGUL_JONGSEONG_COUNT,
  HANGUL_VOWEL_ROMANIZATION,
} from "./menu-tree-constants";

export type EditorNode = AdminMenuTreeNode;

export type DropIndicator = {
  parentId: number | null;
  index: number;
};

function romanizeHangulSyllable(char: string): string {
  const syllableIndex = char.charCodeAt(0) - HANGUL_BASE_CODE;
  const choseongIndex = Math.floor(syllableIndex / HANGUL_CHOSEONG_INTERVAL);
  const jungseongIndex = Math.floor(
    (syllableIndex % HANGUL_CHOSEONG_INTERVAL) / HANGUL_JONGSEONG_COUNT,
  );
  const jongseongIndex = syllableIndex % HANGUL_JONGSEONG_COUNT;

  return [
    HANGUL_INITIAL_ROMANIZATION[choseongIndex],
    HANGUL_VOWEL_ROMANIZATION[jungseongIndex],
    HANGUL_FINAL_ROMANIZATION[jongseongIndex],
  ].join("");
}

export function slugifyToAscii(rawText: string): string {
  let value = "";
  let pendingSeparator = false;

  const flushSeparator = () => {
    if (pendingSeparator && value.length > 0) {
      value += "-";
    }
    pendingSeparator = false;
  };

  for (const char of rawText.trim()) {
    const code = char.charCodeAt(0);

    if (
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z") ||
      (char >= "0" && char <= "9")
    ) {
      flushSeparator();
      value += char.toLowerCase();
    } else if (code >= HANGUL_BASE_CODE && code <= 0xd7a3) {
      const romanized = romanizeHangulSyllable(char);
      if (romanized) {
        flushSeparator();
        value += romanized;
      }
    } else {
      pendingSeparator = value.length > 0;
    }
  }

  return value.replace(/-+$/g, "");
}

export function getSlugPreview(node: EditorNode, manual: boolean) {
  const source = manual ? node.slug : node.label;
  const value = slugifyToAscii(source);

  return {
    source,
    value,
    modeLabel: manual ? "직접 입력 변환 결과" : "자동 생성 미리보기",
    isEmptyInput: source.trim().length === 0,
    isEmptyResult: value.length === 0,
  };
}

export function flattenTree(
  nodes: EditorNode[],
  depth = 0,
): Array<{ node: EditorNode; depth: number }> {
  return nodes.flatMap((node) => [
    { node, depth },
    ...flattenTree(node.children, depth + 1),
  ]);
}

export function cloneTree(nodes: EditorNode[]): EditorNode[] {
  return nodes.map((node) => ({
    ...node,
    status: !node.isAuto && node.status === "DRAFT" ? "HIDDEN" : node.status,
    children: cloneTree(node.children),
  }));
}

export function isDetachedPlaylist(node: EditorNode): boolean {
  return node.type === "YOUTUBE_PLAYLIST" && node.parentId === null;
}

export function mapTree(
  nodes: EditorNode[],
  targetId: number,
  updater: (node: EditorNode) => EditorNode,
): EditorNode[] {
  return nodes.map((node) => {
    if (node.id === targetId) {
      return updater({ ...node, children: cloneTree(node.children) });
    }
    return { ...node, children: mapTree(node.children, targetId, updater) };
  });
}

export function removeNode(nodes: EditorNode[], targetId: number): EditorNode[] {
  return nodes
    .filter((node) => node.id !== targetId)
    .map((node) => ({ ...node, children: removeNode(node.children, targetId) }));
}

export function findNode(nodes: EditorNode[], targetId: number): EditorNode | null {
  for (const node of nodes) {
    if (node.id === targetId) return node;
    const childMatch = findNode(node.children, targetId);
    if (childMatch) return childMatch;
  }
  return null;
}

export function collectDescendantIds(node: EditorNode): Set<number> {
  const ids = new Set<number>();
  const visit = (current: EditorNode) => {
    current.children.forEach((child) => {
      ids.add(child.id);
      visit(child);
    });
  };
  visit(node);
  return ids;
}

export function reparentNode(
  nodes: EditorNode[],
  targetId: number,
  nextParentId: number | null,
): EditorNode[] {
  const tree = cloneTree(nodes);
  const movingNode = findNode(tree, targetId);
  if (!movingNode) return tree;

  const withoutNode = removeNode(tree, targetId);
  if (nextParentId === null) {
    return [...withoutNode, { ...movingNode, parentId: null }];
  }

  const nextParent = findNode(withoutNode, nextParentId);
  if (!nextParent) return tree;

  return mapTree(withoutNode, nextParentId, (node) => ({
    ...node,
    children: [...node.children, { ...movingNode, parentId: nextParentId }],
  }));
}

export function moveNodeWithinSiblings(
  nodes: EditorNode[],
  targetId: number,
  direction: -1 | 1,
): EditorNode[] {
  const tree = cloneTree(nodes);

  const moveInList = (list: EditorNode[]): EditorNode[] => {
    const index = list.findIndex((item) => item.id === targetId);
    if (index === -1) {
      return list.map((item) => ({ ...item, children: moveInList(item.children) }));
    }

    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= list.length) return list;

    const nextList = [...list];
    const [moving] = nextList.splice(index, 1);
    nextList.splice(nextIndex, 0, moving);
    return nextList;
  };

  return moveInList(tree);
}

export function moveNodeToSiblingIndex(
  nodes: EditorNode[],
  targetId: number,
  nextIndex: number,
): EditorNode[] {
  const tree = cloneTree(nodes);

  const moveInList = (list: EditorNode[]): EditorNode[] => {
    const currentIndex = list.findIndex((item) => item.id === targetId);
    if (currentIndex === -1) {
      return list.map((item) => ({ ...item, children: moveInList(item.children) }));
    }

    const boundedNextIndex = Math.max(0, Math.min(nextIndex, list.length));
    const insertionIndex =
      currentIndex < boundedNextIndex ? boundedNextIndex - 1 : boundedNextIndex;

    if (currentIndex === insertionIndex) return list;

    const nextList = [...list];
    const [moving] = nextList.splice(currentIndex, 1);
    nextList.splice(insertionIndex, 0, moving);
    return nextList;
  };

  return moveInList(tree);
}

export function findSiblingList(
  nodes: EditorNode[],
  targetId: number,
): EditorNode[] | null {
  const index = nodes.findIndex((node) => node.id === targetId);
  if (index !== -1) return nodes;

  for (const node of nodes) {
    const childResult = findSiblingList(node.children, targetId);
    if (childResult) return childResult;
  }
  return null;
}

export function toPayload(nodes: EditorNode[]): MenuTreeNodePayload[] {
  return nodes.map((node) => ({
    id: node.id > 0 ? node.id : null,
    type: node.type,
    status: !node.isAuto && node.status === "DRAFT" ? "HIDDEN" : node.status,
    label: node.label,
    slug: node.slug,
    slugCustomized: node.isAuto ? node.slugCustomized : false,
    staticPageKey: node.staticPageKey,
    boardKey: node.boardKey,
    boardType: node.boardTypeKey,
    externalUrl: node.externalUrl,
    openInNewTab: node.openInNewTab,
    isAuto: node.isAuto,
    playlistContentForm: node.playlistContentForm,
    children: toPayload(node.children),
  }));
}

export function buildNewNode(
  id: number,
  type: MenuType,
  staticPages: AdminStaticPage[],
): EditorNode {
  return {
    id,
    type,
    status: "HIDDEN",
    label: "새 메뉴",
    slug: "",
    isAuto: false,
    labelCustomized: false,
    slugCustomized: false,
    staticPageKey: type === "STATIC" ? (staticPages[0]?.key ?? null) : null,
    boardKey: null,
    boardTypeKey: null,
    boardTypeLabel: null,
    externalUrl: type === "EXTERNAL_LINK" ? "https://example.com" : null,
    openInNewTab: type === "EXTERNAL_LINK",
    playlistTitle: null,
    playlistSourceTitle: null,
    thumbnailUrl: null,
    itemCount: null,
    syncStatus: null,
    playlistContentForm: type === "YOUTUBE_PLAYLIST" ? "LONGFORM" : null,
    parentId: null,
    children: [],
  };
}

export function hideNodeTree(node: EditorNode): EditorNode {
  return {
    ...node,
    status: node.status === "ARCHIVED" ? node.status : "HIDDEN",
    children: node.children.map(hideNodeTree),
  };
}

export function buildVideoNodePath(
  node: EditorNode,
  menuById: Map<number, EditorNode>,
): string {
  const segments: string[] = [];
  let current: EditorNode | undefined = node;

  while (current) {
    segments.push(current.slug || "(저장 시 자동 생성)");
    current = current.parentId ? menuById.get(current.parentId) : undefined;
  }

  return `/${segments.reverse().join("/")}`;
}

export function getPublicRouteSummary(
  node: EditorNode,
  menuById: Map<number, EditorNode>,
): string {
  switch (node.type) {
    case "STATIC":
      if (!node.staticPageKey) return "연결 페이지를 선택해 주세요";
      if (!node.parentId) return "상위 메뉴를 먼저 선택해 주세요";
      return node.slug
        ? `/${menuById.get(node.parentId)?.slug ?? "root"}/${node.slug}`
        : `/${menuById.get(node.parentId)?.slug ?? "root"}/(저장 시 자동 생성)`;
    case "BOARD":
      if (!node.parentId) return "상위 메뉴를 먼저 선택해 주세요";
      return node.slug
        ? `/${menuById.get(node.parentId)?.slug ?? "root"}/${node.slug}`
        : `/${menuById.get(node.parentId)?.slug ?? "root"}/(저장 시 자동 생성)`;
    case "YOUTUBE_PLAYLIST":
      return buildVideoNodePath(node, menuById);
    case "EXTERNAL_LINK":
      return node.externalUrl ?? "외부 URL을 입력해 주세요";
    case "FOLDER":
    case "YOUTUBE_PLAYLIST_GROUP":
      return "첫 번째 하위 메뉴로 이동";
  }
}

export function isManualSlugMode(node: EditorNode): boolean {
  return node.isAuto
    ? node.slugCustomized
    : node.slugCustomized || node.slug.trim().length > 0;
}

export function getParentRuleDescription(node: EditorNode): string {
  switch (node.type) {
    case "FOLDER":
      return "일반 메뉴 그룹은 최상위 GNB에만 배치됩니다. 하위에는 정적 페이지, 게시판, 외부 링크를 추가할 수 있습니다.";
    case "YOUTUBE_PLAYLIST_GROUP":
      return "영상 그룹은 최상위 GNB에만 배치됩니다. 유튜브 재생목록을 묶는 전용 그룹입니다.";
    case "YOUTUBE_PLAYLIST":
      return "유튜브 재생목록은 최상위 영상 그룹 아래에만 배치할 수 있습니다.";
    case "STATIC":
    case "BOARD":
    case "EXTERNAL_LINK":
      return "정적 페이지, 게시판, 외부 링크는 최상위 일반 메뉴 그룹 아래에만 배치할 수 있습니다.";
  }
}

export function buildNodeChangeSignatures(
  nodes: EditorNode[],
  parentId: number | null = null,
): Map<number, string> {
  const signatures = new Map<number, string>();

  nodes.forEach((node, index) => {
    signatures.set(
      node.id,
      JSON.stringify({
        type: node.type,
        status: !node.isAuto && node.status === "DRAFT" ? "HIDDEN" : node.status,
        label: node.label,
        slug: node.slug,
        slugCustomized: node.isAuto ? node.slugCustomized : false,
        staticPageKey: node.staticPageKey,
        boardKey: node.boardKey,
        boardType: node.boardTypeKey,
        externalUrl: node.externalUrl,
        openInNewTab: node.openInNewTab,
        isAuto: node.isAuto,
        playlistContentForm: node.playlistContentForm,
        parentId,
        order: index,
      }),
    );
    buildNodeChangeSignatures(node.children, node.id).forEach((signature, id) => {
      signatures.set(id, signature);
    });
  });

  return signatures;
}
