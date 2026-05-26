import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const urlPath = path.join(here, "url.ts");

async function loadUrlModule() {
  const source = await readFile(urlPath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const commonJsModule = { exports: {} };

  vm.runInNewContext(compiled, {
    exports: commonJsModule.exports,
    module: commonJsModule,
    URL,
  });

  return commonJsModule.exports;
}

test("normalizeLinkHref upgrades domain-like editor input to absolute https URLs", async () => {
  const { normalizeLinkHref } = await loadUrlModule();

  assert.equal(normalizeLinkHref("tdch.co.kr"), "https://tdch.co.kr");
  assert.equal(normalizeLinkHref("www.tdch.co.kr/path?from=admin"), "https://www.tdch.co.kr/path?from=admin");
  assert.equal(normalizeLinkHref("tdch.co.kr:8080/path"), "https://tdch.co.kr:8080/path");
  assert.equal(normalizeLinkHref("localhost:3000/admin"), "https://localhost:3000/admin");
  assert.equal(normalizeLinkHref("//www.tdch.co.kr"), "https://www.tdch.co.kr");
  assert.equal(normalizeLinkHref("https//www.tdch.co.kr"), "https://www.tdch.co.kr");
});

test("normalizeLinkHref preserves explicit safe link forms", async () => {
  const { normalizeLinkHref } = await loadUrlModule();

  assert.equal(normalizeLinkHref("https://www.tdch.co.kr"), "https://www.tdch.co.kr");
  assert.equal(normalizeLinkHref("/about"), "/about");
  assert.equal(normalizeLinkHref("/tdch.co.kr"), "/tdch.co.kr");
  assert.equal(normalizeLinkHref("#section"), "#section");
  assert.equal(normalizeLinkHref("mailto:office@tdch.co.kr"), "mailto:office@tdch.co.kr");
  assert.equal(normalizeLinkHref("tel:021234567"), "tel:021234567");
});

test("sanitizeUrl accepts normalized domains without resolving them under the admin path", async () => {
  const { normalizeLinkHref, sanitizeUrl } = await loadUrlModule();

  assert.equal(
    sanitizeUrl(normalizeLinkHref("tdch.co.kr"), "https://admin.tdch.co.kr/admin/boards"),
    "https://tdch.co.kr/",
  );
  assert.equal(
    sanitizeUrl("javascript:alert(1)", "https://admin.tdch.co.kr/admin/boards"),
    "#",
  );
  assert.equal(
    sanitizeUrl(normalizeLinkHref("data:text/html,hi"), "https://admin.tdch.co.kr/admin/boards"),
    "#",
  );
  assert.equal(
    sanitizeUrl(normalizeLinkHref("tdch.co.kr:8080/path"), "https://admin.tdch.co.kr/admin/boards"),
    "https://tdch.co.kr:8080/path",
  );
});
