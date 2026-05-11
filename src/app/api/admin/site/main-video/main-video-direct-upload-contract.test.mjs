import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const routePath = path.join(here, "route.ts");
const tokenRoutePath = path.join(here, "../../uploads/token/route.ts");
const adminUploadApiPath = path.join(here, "../../../../../lib/admin-upload-api.ts");

async function readSource(filePath) {
  return readFile(filePath, "utf8");
}

test("admin main-video route no longer proxies multipart uploads through Next.js", async () => {
  const contents = await readSource(routePath);

  assert.doesNotMatch(
    contents,
    /export\s+async\s+function\s+POST\s*\(/,
    "Expected route.ts not to export POST; browsers should upload directly to the backend with X-Upload-Token.",
  );
  assert.doesNotMatch(
    contents,
    /request\.formData\s*\(/,
    "Expected the main-video route not to buffer multipart bodies with request.formData().",
  );
  assert.doesNotMatch(
    contents,
    /\buploadAdminMainVideoSetting\s*\(/,
    "Expected the main-video route not to proxy files through uploadAdminMainVideoSetting(file).",
  );
});

test("admin upload-token route exists for main-video direct upload token issuance", async () => {
  await access(tokenRoutePath);

  const contents = await readSource(tokenRoutePath);
  assert.match(contents, /export\s+async\s+function\s+POST\s*\(/, "Expected upload-token route to issue tokens over POST.");
  assert.match(
    contents,
    /\bissueAdminUploadToken\s*\(/,
    "Expected upload-token route to delegate token issuance to the admin upload API helper.",
  );
});

test("admin upload API types allow MAIN_VIDEO tokens with video defaults", async () => {
  const contents = await readSource(adminUploadApiPath);

  assert.match(
    contents,
    /AdminUploadAssetKind\s*=\s*[^;]*["']MAIN_VIDEO["']/s,
    "Expected AdminUploadAssetKind to include MAIN_VIDEO for main-video token issuance.",
  );
  assert.match(
    contents,
    /MAIN_VIDEO[\s\S]*(video\/mp4|video\/quicktime|video\/webm)/,
    "Expected MAIN_VIDEO token defaults to allow browser-uploaded video MIME types.",
  );
});
