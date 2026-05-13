import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const pagePath = path.join(here, "page.tsx");
const clientPath = path.join(here, "_components", "board-management-client.tsx");
const editorPath = path.join(here, "_components", "board-post-editor.tsx");
const simpleEditorPath = path.join(here, "..", "..", "..", "..", "..", "components", "tiptap-templates", "simple", "simple-editor.tsx");
const adminUploadApiPath = path.join(here, "..", "..", "..", "..", "..", "lib", "admin-upload-api.ts");

async function readSource(sourcePath) {
  return readFile(sourcePath, "utf8");
}

test("board management page exists and uses the admin session gate", async () => {
  const contents = await readSource(pagePath);

  assert.match(
    contents,
    /import\s*\{[^}]*getAdminSession[^}]*isAdminSession[^}]*\}\s*from\s*["']@\/auth["']/s,
    "Expected the board management page to import getAdminSession and isAdminSession from @/auth.",
  );
  assert.match(contents, /await\s+getAdminSession\s*\(/, "Expected the page to read the admin session.");
  assert.match(contents, /isAdminSession\s*\(\s*session\s*\)/, "Expected the page to verify the admin session.");
  assert.match(
    contents,
    /redirect\s*\(\s*["']\/admin\/login["']\s*\)/,
    "Expected unauthorized admins to be redirected to /admin/login.",
  );
});

test("board management page fetches boards and renders the client entry screen", async () => {
  const contents = await readSource(pagePath);

  assert.match(
    contents,
    /import\s*\{[^}]*getAdminBoards[^}]*\}\s*from\s*["']@\/lib\/admin-board-api["']/s,
    "Expected the page to import getAdminBoards from @/lib/admin-board-api.",
  );
  assert.match(
    contents,
    /getAdminBoards\s*\(\s*session\.user\.id\s*\)/s,
    "Expected the page to fetch admin boards with session.user.id.",
  );
  assert.match(
    contents,
    /<BoardManagementClient\b/s,
    "Expected the page to render BoardManagementClient.",
  );
});

test("board management page fetches real BOARD menu entries and passes them to the client", async () => {
  const contents = await readSource(pagePath);

  assert.match(
    contents,
    /import\s*\{[^}]*getAdminMenuItems[^}]*\}\s*from\s*["']@\/lib\/admin-menu-api["']/s,
    "Expected the board management page to import getAdminMenuItems from @/lib/admin-menu-api.",
  );
  assert.match(
    contents,
    /getAdminMenuItems\s*\(\s*session\.user\.id\s*\)/s,
    "Expected the page to fetch the actual admin menu tree for the current admin.",
  );
  assert.match(
    contents,
    /\.filter\s*\([^)]*type\s*===\s*["']BOARD["'][^)]*\)|filterBoardMenus|boardMenus/s,
    "Expected the page to derive selectable entries from real BOARD menus.",
  );
  assert.match(
    contents,
    /!\s*item\.isAuto|isUserCreatedBoardMenu|filterUserCreatedBoardMenus/s,
    "Expected the page to exclude auto-generated seed/fallback BOARD menus from the selectable list.",
  );
  assert.match(
    contents,
    /<BoardManagementClient\b[\s\S]*(?:initialBoardMenus|boardMenus)\s*=\s*\{/s,
    "Expected the page to pass real BOARD menu entries into BoardManagementClient.",
  );
});

test("board management client is a client component with list, save, loading, and error states", async () => {
  const contents = await readSource(clientPath);

  assert.match(contents, /^["']use client["'];?/m, "Expected board-management-client.tsx to be a client component.");
  assert.match(contents, /BoardManagementClient/, "Expected the component to expose BoardManagementClient.");
  assert.match(contents, /post|posts|게시글|목록/i, "Expected the client to show a board post list.");
  assert.match(contents, /save|saving|저장/i, "Expected the client to expose save state markers.");
  assert.match(contents, /loading|로딩|불러오/i, "Expected the client to expose loading state markers.");
  assert.match(contents, /error|오류|실패/i, "Expected the client to expose error state markers.");
});

test("board management client opens on the list screen with filters above the post list", async () => {
  const contents = await readSource(clientPath);

  assert.match(
    contents,
    /type\s+ScreenMode\s*=\s*["']list["']\s*\|\s*["']editor["']|useState<ScreenMode>\(\s*["']list["']\s*\)/s,
    "Expected the board management client to model separate list and editor screens.",
  );
  assert.match(
    contents,
    /useState<ScreenMode>\(\s*["']list["']\s*\)/,
    "Expected the initial board management screen to be the post list.",
  );
  assert.match(contents, /게시판/, "Expected the post list to expose a board menu filter.");
  assert.doesNotMatch(contents, /게시판 타입/, "Expected the post list to hide board type filtering from admins.");
  assert.match(contents, /제목 검색/, "Expected the post list to expose a title search filter.");
  assert.match(
    contents,
    /boardMenus\.map\s*\(\s*\(?\s*boardMenu\s*\)?\s*=>[\s\S]*<option\b[\s\S]*value\s*=\s*\{\s*boardMenu\.id\s*\}/s,
    "Expected the board filter to list actual BOARD menu entries.",
  );
  assert.match(
    contents,
    /screenMode\s*===\s*["']list["'][\s\S]*filteredPosts\.map/s,
    "Expected the list screen to render filtered post rows.",
  );
  assert.doesNotMatch(
    contents,
    /initialPosts\s*\[\s*0\s*\]\?\.id/,
    "Expected the client not to auto-open the first post when entering board management.",
  );
});

test("board management client uses one editor screen for details and new posts", async () => {
  const contents = await readSource(clientPath);

  assert.match(
    contents,
    /openNewPost[\s\S]*setSelectedPostId\s*\(\s*null\s*\)[\s\S]*setScreenMode\s*\(\s*["']editor["']\s*\)/s,
    "Expected the new-post action to open the shared editor screen without a selected post.",
  );
  assert.match(
    contents,
    /openPost[\s\S]*setSelectedPostId\s*\(\s*post\.id\s*\)[\s\S]*setScreenMode\s*\(\s*["']editor["']\s*\)/s,
    "Expected clicking a post to open the shared editor screen with that post selected.",
  );
  assert.match(
    contents,
    /\{selectedPostId\s*\?\s*["']게시글 상세["']\s*:\s*["']새 게시글 작성["']\}/,
    "Expected the editor heading to switch between detail and new-post modes.",
  );
  assert.match(contents, /목록으로/, "Expected the shared editor screen to provide a route back to the list.");
  assert.match(contents, /새 게시글 등록/, "Expected the list screen to expose a bottom new-post action.");
});

test("board management client selects BOARD menu ids instead of only board slugs", async () => {
  const contents = await readSource(clientPath);

  assert.match(
    contents,
    /(?:initialBoardMenus|boardMenus)/,
    "Expected the client to receive BOARD menu entries from the page.",
  );
  assert.match(
    contents,
    /selectedMenuId|selectedBoardMenuId|menuId/,
    "Expected the client selection state to track the selected BOARD menu id.",
  );
  assert.match(
    contents,
    /(?:initialBoardMenus|boardMenus)\.map\s*\(\s*\(?\s*(?:menu|boardMenu)[^)]*\)?\s*=>[\s\S]*<option\b[\s\S]*value\s*=\s*\{\s*(?:menu|boardMenu)\.(?:id|menuId)\s*\}/s,
    "Expected the select options to use actual BOARD menu ids as option values.",
  );
  assert.match(
    contents,
    /selected(?:Board)?Menu\.(?:boardKey|boardSlug)|boardMenu\.(?:boardKey|boardSlug)/s,
    "Expected the client to resolve the board key from the selected BOARD menu.",
  );
  assert.match(
    contents,
    /!\s*boardMenu\.isAuto|isUserCreatedBoardMenu|filterUserCreatedBoardMenus/s,
    "Expected the client to guard against auto-generated seed/fallback BOARD menus.",
  );
});

test("board management client ignores disconnected BOARD menu entries", async () => {
  const contents = await readSource(clientPath);

  assert.match(
    contents,
    /disconnectedBoardMenus/,
    "Expected the client to track BOARD menus whose board row is missing.",
  );
  assert.match(
    contents,
    /boardsBySlug\.has\s*\(\s*boardMenu\.boardKey\s*\?\?\s*["']["']\s*\)/,
    "Expected the selectable board menus to require a matching board slug before loading posts.",
  );
  assert.match(
    contents,
    /연결 게시판이 사라진 메뉴/,
    "Expected the UI to explain why disconnected board menus are excluded.",
  );
});

test("board management client requests upload tokens and uploads assets directly", async () => {
  const contents = await readSource(clientPath);
  const uploadApiContents = await readSource(adminUploadApiPath);

  assert.match(
    contents,
    /\/api\/admin\/uploads\/token|issueAdminUploadToken|upload token/i,
    "Expected the client to request admin upload tokens or use an upload token helper.",
  );
  assert.match(
    contents,
    /uploadAdminAssetDirect/,
    "Expected the client to use uploadAdminAssetDirect for direct admin asset uploads.",
  );
  assert.doesNotMatch(
    uploadApiContents,
    /image\/gif/,
    "Expected admin upload token MIME defaults not to allow GIF because backend storage does not support it.",
  );
});

test("board post editor uses Tiptap and exposes image plus YouTube insertion controls", async () => {
  const adapterContents = await readSource(editorPath);
  const contents = await readSource(simpleEditorPath);

  assert.match(adapterContents, /^["']use client["'];?/m, "Expected board-post-editor.tsx to be a client component.");
  assert.match(adapterContents, /SimpleEditor/, "Expected board-post-editor.tsx to delegate to the official Tiptap SimpleEditor template.");
  assert.match(
    contents,
    /@tiptap\/react/,
    "Expected the board post editor to import @tiptap/react.",
  );
  assert.match(
    contents,
    /useEditor|EditorContent/,
    "Expected the board post editor to use Tiptap's editor surface.",
  );
  assert.match(
    contents,
    /@tiptap\/extension-|StarterKit|Image|Youtube|YouTube/i,
    "Expected the editor to use Tiptap extensions.",
  );
  assert.match(contents, /image|이미지/i, "Expected the editor to expose image insertion text markers.");
  assert.match(contents, /youtube|youTube|video|동영상|유튜브/i, "Expected the editor to expose YouTube insertion text markers.");
  assert.equal(
    /\bpublicUrl\b/.test(contents),
    false,
    "Expected the editor to avoid persisting publicUrl in editor content.",
  );
});

test("board post editor uses the official Tiptap simple editor UI controls", async () => {
  const contents = await readSource(simpleEditorPath);

  assert.match(contents, /HeadingDropdownMenu/, "Expected the official SimpleEditor toolbar to expose heading controls.");
  assert.match(contents, /ListDropdownMenu/, "Expected the official SimpleEditor toolbar to expose list controls.");
  assert.match(contents, /MarkButton/, "Expected the official SimpleEditor toolbar to expose inline mark controls.");
  assert.match(contents, /TextAlignButton/, "Expected the official SimpleEditor toolbar to expose text alignment controls.");
  assert.match(contents, /ImageUploadButton/, "Expected the official SimpleEditor toolbar to expose image upload controls.");
  assert.match(contents, /UndoRedoButton/, "Expected the official SimpleEditor toolbar to expose undo and redo controls.");
  assert.match(
    contents,
    /accept:\s*["']image\/png,image\/jpeg,image\/webp["']/,
    "Expected the editor image upload accept list to match the backend-supported image MIME types.",
  );
});
