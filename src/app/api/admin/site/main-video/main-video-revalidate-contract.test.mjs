import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const revalidateRoutePath = path.join(here, "revalidate/route.ts");
const mainVideoFormPath = path.join(
  here,
  "../../../../(admin)/admin/(cms)/main-video/_components/main-video-form.tsx",
);

async function readSource(filePath) {
  return readFile(filePath, "utf8");
}

test("admin main-video revalidation route exists under the lightweight endpoint", async () => {
  await access(revalidateRoutePath);
});

test("admin main-video revalidation route invalidates public and admin main-video caches", async () => {
  const contents = await readSource(revalidateRoutePath);

  assert.match(contents, /export\s+async\s+function\s+POST\s*\(/, "Expected revalidate route to export POST.");
  assert.match(
    contents,
    /\brevalidateTag\s*\(\s*["']site-settings["']\s*\)/,
    "Expected POST to revalidate the site-settings cache tag.",
  );
  assert.match(
    contents,
    /\brevalidatePath\s*\(\s*["']\/["']\s*\)/,
    "Expected POST to revalidate the public home page.",
  );
  assert.match(
    contents,
    /\brevalidatePath\s*\(\s*["']\/admin\/main-video["']\s*\)/,
    "Expected POST to revalidate the admin main-video page.",
  );
});

test("admin main-video form calls lightweight revalidation endpoint after direct upload succeeds", async () => {
  const contents = await readSource(mainVideoFormPath);
  const directUploadIndex = contents.indexOf("uploadAdminMainVideoDirect");
  const revalidateIndex = contents.indexOf("/api/admin/site/main-video/revalidate");

  assert.notEqual(directUploadIndex, -1, "Expected main-video form to use direct backend upload.");
  assert.notEqual(
    revalidateIndex,
    -1,
    "Expected main-video form to call the lightweight revalidation endpoint.",
  );
  assert.ok(
    revalidateIndex > directUploadIndex,
    "Expected revalidation call to happen after uploadAdminMainVideoDirect succeeds.",
  );
  assert.match(
    contents,
    /fetch\s*\(\s*["']\/api\/admin\/site\/main-video\/revalidate["']\s*,\s*\{[\s\S]*?method\s*:\s*["']POST["']/,
    "Expected main-video form to POST to the revalidation endpoint.",
  );
});
