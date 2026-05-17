import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const detailPanelPath = path.join(here, "_components", "menu-detail-panel.tsx");
const deleteSectionPath = path.join(here, "_components", "menu-delete-section.tsx");

async function readDetailPanel() {
  return readFile(detailPanelPath, "utf8");
}

async function readDeleteSection() {
  return readFile(deleteSectionPath, "utf8");
}

test("FOLDER detail panel does not expose a button to add STATIC menus", async () => {
  const contents = await readDetailPanel();

  assert.doesNotMatch(
    contents,
    /onAddChild\(\s*["']STATIC["']\s*\)/,
    "Static page menus are code-managed; admins must not be able to create them via the UI.",
  );
  assert.doesNotMatch(
    contents,
    /정적\s*페이지\s*추가/,
    "Remove the legacy '정적 페이지 추가' button label so static menus stay developer-owned.",
  );
});

test("STATIC detail panel keeps connection target read-only", async () => {
  const contents = await readDetailPanel();

  assert.match(
    contents,
    /selectedNode\.staticPageKey[\s\S]{0,200}disabled\b/,
    "The static-page select must be disabled so admins cannot reassign the linked component.",
  );
  assert.doesNotMatch(
    contents,
    /onUpdateNode\(\(node\)\s*=>\s*\(\{\s*\.\.\.node,\s*staticPageKey/,
    "Do not allow staticPageKey edits from the STATIC detail panel.",
  );
});

test("STATIC detail panel locks the slug input", async () => {
  const contents = await readDetailPanel();

  assert.match(
    contents,
    /disabled=\{\s*selectedNode\.type\s*===\s*["']STATIC["']\s*\|\|\s*!selectedManualSlugMode\s*\}/,
    "The URL slug input must be disabled whenever the selected node is a STATIC menu.",
  );
});

test("Delete section refuses to delete STATIC menus", async () => {
  const contents = await readDeleteSection();

  assert.match(
    contents,
    /selectedNode\.type\s*===\s*["']STATIC["']\)\s*return null/,
    "STATIC menus must not surface a delete affordance — deletes are a developer responsibility.",
  );
});
