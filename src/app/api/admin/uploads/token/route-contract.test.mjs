import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const routePath = path.join(here, "route.ts");

async function readRoute() {
  return readFile(routePath, "utf8");
}

test("admin upload token route uses the existing admin session gate", async () => {
  const contents = await readRoute();

  assert.match(
    contents,
    /import\s*\{[^}]*getAdminSession[^}]*isAdminSession[^}]*\}\s*from\s*["']@\/auth["']/s,
    "Expected the route to import getAdminSession and isAdminSession from @/auth.",
  );
  assert.match(contents, /await\s+getAdminSession\s*\(/, "Expected the route to read the admin session.");
  assert.match(contents, /isAdminSession\s*\(\s*session\s*\)/, "Expected the route to verify the admin session.");
});

test("admin upload token route exposes a POST handler with a Korean unauthorized response", async () => {
  const contents = await readRoute();

  assert.match(contents, /export\s+async\s+function\s+POST\s*\(/, "Expected an exported async POST route handler.");
  assert.match(contents, /status\s*:\s*401/, "Expected unauthorized requests to return HTTP 401.");
  assert.match(
    contents,
    /로그인|인증|권한|관리자/,
    "Expected the unauthorized response to include an understandable Korean admin/auth message.",
  );
});

test("admin upload token route delegates token issuing with the session actor id", async () => {
  const contents = await readRoute();

  assert.match(
    contents,
    /import\s*\{[^}]*issueAdminUploadToken[^}]*\}\s*from\s*["']@\/lib\/admin-upload-api["']/s,
    "Expected the route to import issueAdminUploadToken from @/lib/admin-upload-api.",
  );
  assert.match(
    contents,
    /issueAdminUploadToken\s*\(\s*session\.user\.id\s*,/s,
    "Expected the route to pass session.user.id as the upload-token actor id.",
  );
});

test("admin upload token route does not expose the sync key literal", async () => {
  const contents = await readRoute();

  assert.equal(
    contents.includes("ADMIN_SYNC_KEY"),
    false,
    "Expected the route to delegate admin key handling without referencing ADMIN_SYNC_KEY directly.",
  );
});
