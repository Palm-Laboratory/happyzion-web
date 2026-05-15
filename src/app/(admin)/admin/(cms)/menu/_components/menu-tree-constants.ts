import type { MenuStatus, MenuType } from "@/lib/admin-menu-api";

export const AUTO_SCROLL_EDGE_THRESHOLD_PX = 72;
export const AUTO_SCROLL_MAX_SPEED_PX = 20;

export const STATUS_META: Record<MenuStatus, string> = {
  DRAFT: "bg-amber-100 text-amber-700",
  PUBLISHED: "bg-emerald-100 text-emerald-700",
  HIDDEN: "bg-slate-100 text-slate-600",
  ARCHIVED: "bg-rose-100 text-rose-700",
};

export const STATUS_LABEL: Record<MenuStatus, string> = {
  DRAFT: "분류 대기",
  PUBLISHED: "공개",
  HIDDEN: "숨김",
  ARCHIVED: "보관",
};

export const MANAGED_STATUS_OPTIONS: Array<{
  value: Extract<MenuStatus, "PUBLISHED" | "HIDDEN">;
  label: string;
}> = [
  { value: "PUBLISHED", label: STATUS_LABEL.PUBLISHED },
  { value: "HIDDEN", label: STATUS_LABEL.HIDDEN },
];

export const MENU_TYPE_LABEL: Record<MenuType, string> = {
  FOLDER: "일반 메뉴 그룹",
  STATIC: "정적 페이지",
  BOARD: "게시판",
  EXTERNAL_LINK: "외부 링크",
  YOUTUBE_PLAYLIST_GROUP: "영상 그룹",
  YOUTUBE_PLAYLIST: "유튜브 재생목록",
};

export const HANGUL_BASE_CODE = 0xac00;
export const HANGUL_CHOSEONG_INTERVAL = 588;
export const HANGUL_JONGSEONG_COUNT = 28;
export const HANGUL_INITIAL_ROMANIZATION = [
  "g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s",
  "ss", "", "j", "jj", "ch", "k", "t", "p", "h",
];
export const HANGUL_VOWEL_ROMANIZATION = [
  "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa",
  "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i",
];
export const HANGUL_FINAL_ROMANIZATION = [
  "", "k", "k", "ks", "n", "nj", "nh", "t", "l", "lk",
  "lm", "lb", "ls", "lt", "lp", "lh", "m", "p", "ps", "t",
  "t", "ng", "t", "t", "k", "t", "p", "h",
];
