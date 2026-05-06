import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const editorPath = path.join(here, "simple-editor.tsx");
const rendererPath = path.join(here, "..", "..", "public-board", "public-board-renderer.tsx");

async function readEditor() {
  return readFile(editorPath, "utf8");
}

async function readRenderer() {
  return readFile(rendererPath, "utf8");
}

function assertRendererSupportsMark(contents, mark) {
  assert.match(
    contents,
    new RegExp(`case\\s+["']${mark}["']`),
    `Expected public board renderer to support the ${mark} mark.`,
  );
}

function assertRendererSupportsNode(contents, node) {
  assert.match(
    contents,
    new RegExp(`case\\s+["']${node}["']`),
    `Expected public board renderer to support the ${node} node.`,
  );
}

test("SimpleEditor registers link and underline extensions for the visible toolbar controls", async () => {
  const contents = await readEditor();

  assert.match(contents, /@tiptap\/extension-link/, "Expected SimpleEditor to import Tiptap Link.");
  assert.match(contents, /@tiptap\/extension-underline/, "Expected SimpleEditor to import Tiptap Underline.");
  assert.match(contents, /Link\.configure\(/, "Expected SimpleEditor to register the Link extension.");
  assert.match(contents, /\bUnderline\b/, "Expected SimpleEditor to register the Underline extension.");
  assert.match(contents, /MarkButton type="underline"/, "Expected the underline toolbar control to remain wired.");
  assert.match(contents, /LinkPopover|LinkButton/, "Expected the link toolbar controls to remain wired.");
});

test("public board renderer supports every SimpleEditor text mark exposed to authors", async () => {
  const renderer = await readRenderer();

  [
    "bold",
    "italic",
    "strike",
    "code",
    "underline",
    "highlight",
    "link",
    "subscript",
    "superscript",
  ].forEach((mark) => assertRendererSupportsMark(renderer, mark));
});

test("public board renderer supports every SimpleEditor block node written by the shared editor", async () => {
  const renderer = await readRenderer();

  [
    "paragraph",
    "heading",
    "bulletList",
    "orderedList",
    "listItem",
    "taskList",
    "taskItem",
    "blockquote",
    "codeBlock",
    "horizontalRule",
    "hardBreak",
    "image",
    "youtube",
  ].forEach((node) => assertRendererSupportsNode(renderer, node));

  assert.match(
    renderer,
    /getTextAlignStyle/,
    "Expected public board renderer to support paragraph and heading text alignment from SimpleEditor.",
  );
});
