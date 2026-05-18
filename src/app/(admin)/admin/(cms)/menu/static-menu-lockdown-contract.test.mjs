import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const detailPanelPath = path.join(here, "_components", "menu-detail-panel.tsx");
const deleteSectionPath = path.join(here, "_components", "menu-delete-section.tsx");
const treePanelPath = path.join(here, "_components", "menu-tree-panel.tsx");
const treeUtilsPath = path.join(here, "_components", "menu-tree-utils.ts");

async function readDetailPanel() {
  return readFile(detailPanelPath, "utf8");
}

async function readDeleteSection() {
  return readFile(deleteSectionPath, "utf8");
}

async function readTreePanel() {
  return readFile(treePanelPath, "utf8");
}

async function readTreeUtils() {
  return readFile(treeUtilsPath, "utf8");
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
    /disabled=\{\s*isStaticLockedMenu\s*\|\|\s*!selectedManualSlugMode\s*\}/,
    "The URL slug input must be disabled whenever the selected node is a STATIC menu.",
  );
});

test("static GNB groups lock the slug input", async () => {
  const contents = await readDetailPanel();

  assert.match(
    contents,
    /isStaticLockedMenu\s*=\s*selectedNode\.type\s*===\s*["']STATIC["']\s*\|\|\s*isStaticMenuGroup\s*\(\s*selectedNode\s*\)/,
    "Expected STATIC menus and GNB groups containing STATIC children to share the same URL lock.",
  );
  assert.match(
    contents,
    /disabled=\{\s*isStaticLockedMenu\s*\|\|\s*!selectedManualSlugMode\s*\}/,
    "The URL slug input must be disabled for static GNB groups as well as STATIC menus.",
  );
});

test("static GNB groups use a distinct operator-facing type label", async () => {
  const detailPanel = await readDetailPanel();
  const treePanel = await readTreePanel();
  const treeUtils = await readTreeUtils();

  assert.match(
    treeUtils,
    /isStaticMenuGroup\s*\(\s*node\s*\)\s*\?\s*["']정적 페이지 그룹["']/,
    "Expected static GNB groups to have a distinct type label.",
  );
  assert.match(
    detailPanel,
    /value=\{\s*getMenuTypeDisplayLabel\s*\(\s*selectedNode\s*\)\s*\}/,
    "Expected the detail type field to show the derived static group label.",
  );
  assert.match(
    treePanel,
    /getMenuTypeDisplayLabel\s*\(\s*node\s*\)/,
    "Expected the tree row subtitle to show the derived static group label.",
  );
});

test("STATIC detail panel locks parent movement", async () => {
  const contents = await readDetailPanel();

  assert.match(
    contents,
    /disabled=\{[\s\S]{0,120}selectedNode\.type\s*===\s*["']STATIC["']/,
    "The parent select must be disabled whenever the selected node is a STATIC menu.",
  );
  assert.match(
    contents,
    /고정된\s*상위\s*메뉴/,
    "Expected STATIC menus to communicate that their parent menu is fixed.",
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
