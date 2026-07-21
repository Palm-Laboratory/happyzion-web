import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const pagePath = path.join(here, "page.tsx");
const componentsDir = path.join(here, "_components");
const clientPath = path.join(componentsDir, "menu-management-client.tsx");
const treeUtilsPath = path.join(componentsDir, "menu-tree-utils.ts");
const treeConstantsPath = path.join(componentsDir, "menu-tree-constants.ts");
const detailPanelPath = path.join(componentsDir, "menu-detail-panel.tsx");
const useMenuTreePath = path.join(componentsDir, "use-menu-tree.ts");
const menuSchemaPath = path.join(componentsDir, "menu-schema.ts");

async function readPage() {
  return readFile(pagePath, "utf8");
}

async function readClient() {
  return readFile(clientPath, "utf8");
}

async function readTreeUtils() {
  return readFile(treeUtilsPath, "utf8");
}

async function readTreeConstants() {
  return readFile(treeConstantsPath, "utf8");
}

async function readDetailPanel() {
  return readFile(detailPanelPath, "utf8");
}

async function readUseMenuTree() {
  return readFile(useMenuTreePath, "utf8");
}

async function readMenuSchema() {
  return readFile(menuSchemaPath, "utf8");
}

async function readClientSurfaces() {
  const sources = await Promise.all([
    readClient(),
    readTreeUtils(),
    readUseMenuTree(),
    readDetailPanel(),
  ]);
  return sources.join("\n");
}

function extractBoardCase(contents) {
  const match = contents.match(/case\s+["']BOARD["']\s*:\s*(?<body>[\s\S]*?)(?=\n\s*case\s+["'][A-Z_]+["']\s*:)/);
  assert.ok(match?.groups?.body, "Expected getPublicRouteSummary to handle BOARD menu nodes.");
  return match.groups.body;
}

test("admin menu page does not fetch global boards for BOARD menu editing", async () => {
  const contents = await readPage();

  assert.doesNotMatch(
    contents,
    /getAdminBoards|availableBoards|getAdminBoardTypes|boardTypes/s,
    "Expected menu/page.tsx to avoid fetching or passing global boards or board types.",
  );
  assert.match(
    contents,
    /<MenuManagementClient\b[\s\S]*initialItems\s*=\s*\{\s*menuTree\.items\s*\}/s,
    "Expected menu/page.tsx to pass only the menu tree into MenuManagementClient.",
  );
});

test("admin menu public address preview builds BOARD URLs from parent and child slugs", async () => {
  const contents = await readTreeUtils();
  const boardCase = extractBoardCase(contents);

  assert.match(
    boardCase,
    /node\.parentId/,
    "Expected BOARD preview to require or use its parent menu when building the public route.",
  );
  assert.match(
    boardCase,
    /menuById\.get\s*\(\s*node\.parentId\s*\)/,
    "Expected BOARD preview to read the parent slug from menuById.",
  );
  assert.match(
    boardCase,
    /node\.slug/,
    "Expected BOARD preview to use the BOARD menu slug as the child path segment.",
  );
  assert.doesNotMatch(
    boardCase,
    /\/news\s*#|\$\{\s*node\.boardKey\s*\}/,
    "Expected BOARD preview to avoid legacy /news#boardKey URLs.",
  );
});

test("admin menu public address preview shows code registered paths for STATIC pages", async () => {
  const treeUtils = await readTreeUtils();
  const useMenuTreeContents = await readUseMenuTree();

  assert.match(
    treeUtils,
    /case\s+["']STATIC["'][\s\S]*staticPagePathByKey\.get\s*\(\s*node\.staticPageKey\s*\)/,
    "Expected STATIC previews to use the code-registered static page path instead of parent and child menu slugs.",
  );
  assert.match(
    useMenuTreeContents,
    /new Map\s*\(\s*staticPages\.map\s*\(\s*\(page\)\s*=>\s*\[\s*page\.key,\s*page\.path\s*\]\s*\)\s*\)/,
    "Expected the menu editor to build STATIC preview paths from the admin static page catalog response.",
  );
});

test("menu management client hides BOARD type editing from admins", async () => {
  const clientSurfaces = await readClientSurfaces();
  const detailPanel = await readDetailPanel();
  const treeUtils = await readTreeUtils();
  const menuSchema = await readMenuSchema();

  assert.doesNotMatch(
    clientSurfaces,
    /availableBoards|AdminBoardSummary|getAdminBoards|AdminBoardTypeSummary|getAdminBoardTypes/s,
    "Expected the menu admin client surfaces to avoid global board and board type props.",
  );
  assert.doesNotMatch(
    detailPanel,
    /게시판 타입|게시판 키|연결 게시판/,
    "Expected BOARD editor to hide board type and raw board key controls.",
  );
  assert.match(
    treeUtils,
    /boardType:\s*node\.boardTypeKey/,
    "Expected menu payload to send boardType from node.boardTypeKey so new nodes with null boardTypeKey let the backend assign the default board type.",
  );
  assert.doesNotMatch(
    menuSchema,
    /node\.type\s*===\s*["']BOARD["'][\s\S]{0,120}!node\.boardKey|게시판\s*키가\s*없습니다/,
    "Expected BOARD menu creation to allow an empty boardKey because the backend creates the menu-scoped board and assigns the key.",
  );
});

test("menu management client labels slug as a URL path field", async () => {
  const contents = await readDetailPanel();

  assert.match(
    contents,
    /<span[^>]*>\s*URL\s*경로\s*<\/span>|<span[^>]*>\s*공개\s*URL\s*경로\s*<\/span>/,
    "Expected the slug input label to communicate that it controls the URL path.",
  );
  assert.match(
    contents,
    /URL\s*경로|공개\s*URL에\s*들어가는\s*주소\s*조각/,
    "Expected the slug help text to explain the URL path behavior.",
  );
});

test("EXTERNAL_LINK detail panel hides the internal homepage address editor", async () => {
  const contents = await readDetailPanel();

  assert.match(
    contents,
    /hidden=\{selectedNode\.type\s*===\s*["']EXTERNAL_LINK["']\}[\s\S]{0,300}<h3[^>]*>\s*홈페이지 주소\s*<\/h3>/,
    "Expected external-link menus to hide the internal homepage address editor.",
  );
  assert.match(
    contents,
    /selectedNode\.type\s*===\s*["']EXTERNAL_LINK["'][\s\S]{0,300}외부 URL/,
    "Expected external-link menus to keep the external URL editor visible.",
  );
});

test("BOARD detail panel hides the connection target section", async () => {
  const contents = await readDetailPanel();

  assert.match(
    contents,
    /hidden=\{selectedNode\.type\s*===\s*["']BOARD["']\}[\s\S]{0,300}<h3[^>]*>\s*연결 대상\s*<\/h3>/,
    "Expected board menus to hide the connection target section because their boards are connected automatically.",
  );
});

test("parent dropdown reparenting expands the newly selected parent menu", async () => {
  const useMenuTree = await readUseMenuTree();
  const detailPanel = await readDetailPanel();
  const client = await readClient();

  assert.match(
    useMenuTree,
    /reparentSelectedNode[\s\S]{0,260}setExpandedRootIds[\s\S]{0,120}add\(nextParentId\)/,
    "Expected parent changes to expand the newly selected parent menu in the tree.",
  );
  assert.match(
    detailPanel,
    /onReparentNode\(nextParentId\)/,
    "Expected the parent dropdown to use the reparent handler instead of raw dirty marking.",
  );
  assert.match(
    client,
    /onReparentNode=\{tree\.reparentSelectedNode\}/,
    "Expected the menu client to wire the reparent handler into the detail panel.",
  );
});

test("parent dropdown reparenting focuses the moved menu row in the tree", async () => {
  const useMenuTree = await readUseMenuTree();
  const treePanel = await readFile(path.join(componentsDir, "menu-tree-panel.tsx"), "utf8");
  const client = await readClient();

  assert.match(
    useMenuTree,
    /treeFocusRequest[\s\S]{0,220}setTreeFocusRequest/,
    "Expected reparenting to issue a tree focus request for the moved menu.",
  );
  assert.match(
    treePanel,
    /data-menu-tree-node-id=\{node\.id\}/,
    "Expected menu tree rows to expose a stable focus target.",
  );
  assert.match(
    treePanel,
    /querySelector<HTMLButtonElement>[\s\S]{0,120}data-menu-tree-node-id/,
    "Expected the tree panel to resolve the moved row by id.",
  );
  assert.match(
    treePanel,
    /target\?\.focus\(\{\s*preventScroll:\s*true\s*\}\)/,
    "Expected the moved menu row to receive keyboard focus after reparenting.",
  );
  assert.match(
    client,
    /treeFocusRequest=\{tree\.treeFocusRequest\}/,
    "Expected the menu client to pass focus requests into the tree panel.",
  );
});

test("menu management client previews automatic and custom slug conversion", async () => {
  const treeUtils = await readTreeUtils();
  const useMenuTreeContents = await readUseMenuTree();
  const detailPanel = await readDetailPanel();

  assert.match(
    treeUtils,
    /function\s+slugifyToAscii\s*\(/,
    "Expected the client to mirror the backend slug conversion for live previews.",
  );
  assert.match(
    useMenuTreeContents,
    /getSlugPreview\s*\(\s*selectedNode\s*,\s*selectedManualSlugMode\s*\)/,
    "Expected the selected menu to derive a live slug preview from the current slug mode.",
  );
  assert.match(
    treeUtils,
    /source\s*=\s*manual\s*\?\s*node\.slug\s*:\s*node\.label/,
    "Expected automatic preview to update from the menu label while custom mode previews the typed slug.",
  );
  assert.match(
    treeUtils,
    /자동 생성 미리보기|직접 입력 변환 결과/,
    "Expected the slug preview helper to label automatic and custom slug preview modes.",
  );
  assert.match(
    detailPanel,
    /영문,\s*숫자,\s*한글을 포함해야 URL 경로를 만들 수 있습니다/,
    "Expected an operator-facing guide when conversion produces an empty slug.",
  );
});

test("menu management client keeps DRAFT as a server-created playlist state only", async () => {
  const treeUtils = await readTreeUtils();
  const treeConstants = await readTreeConstants();
  const detailPanel = await readDetailPanel();
  const buildNewNodeMatch = treeUtils.match(/function\s+buildNewNode[\s\S]*?\n}\n/);

  assert.ok(buildNewNodeMatch?.[0], "Expected menu-tree-utils to define buildNewNode.");
  assert.match(
    buildNewNodeMatch[0],
    /status:\s*"HIDDEN"/,
    "Expected new manual menus to start hidden instead of draft.",
  );
  assert.doesNotMatch(
    buildNewNodeMatch[0],
    /status:\s*"DRAFT"/,
    "Expected manual menu creation to avoid client-created DRAFT status.",
  );
  const statusOptionSurfaces = [treeUtils, treeConstants, detailPanel].join("\n");
  assert.doesNotMatch(
    statusOptionSurfaces,
    /\[\s*"DRAFT"\s*,\s*"PUBLISHED"\s*,\s*"HIDDEN"\s*\]/,
    "Expected manual menu status options to exclude DRAFT.",
  );
  assert.match(
    treeConstants,
    /MANAGED_STATUS_OPTIONS[\s\S]*PUBLISHED[\s\S]*HIDDEN/,
    "Expected menu status editing to expose published and hidden as the managed choices.",
  );
});

test("menu management client hides all children when a root menu is hidden", async () => {
  const treeUtils = await readTreeUtils();
  const detailPanel = await readDetailPanel();

  assert.match(
    treeUtils,
    /function\s+hideNodeTree[\s\S]*children:\s*node\.children\.map\s*\(\s*hideNodeTree\s*\)/,
    "Expected a recursive helper that hides the selected menu subtree.",
  );
  assert.match(
    detailPanel,
    /node\.parentId\s*===\s*null\s*&&\s*nextStatus\s*===\s*["']HIDDEN["'][\s\S]*hideNodeTree\s*\(\s*node\s*\)/,
    "Expected root menu status changes to HIDDEN to cascade to descendants.",
  );
  assert.match(
    treeUtils,
    /node\.status\s*===\s*["']ARCHIVED["']\s*\?\s*node\.status\s*:\s*["']HIDDEN["']/,
    "Expected archived children to keep their archived state while published or hidden children become hidden.",
  );
});
