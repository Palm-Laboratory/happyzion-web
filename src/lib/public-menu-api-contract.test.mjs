import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicMenuApiPath = path.join(here, "public-menu-api.ts");
const packageJsonPath = path.join(here, "..", "..", "package.json");

test("public menu API types come from generated OpenAPI components", async () => {
  const contents = await readFile(publicMenuApiPath, "utf8");

  assert.match(
    contents,
    /import\s+type\s+\{\s*components\s*\}\s+from\s+["']@\/types\/api["']/,
    "Expected public-menu-api.ts to import generated OpenAPI component types.",
  );
  assert.match(
    contents,
    /PublicNavigationResponse\s*=\s*components\["schemas"\]\["PublicNavigationResponse"\]/,
    "Expected public navigation response type to use the generated schema.",
  );
  assert.match(
    contents,
    /GeneratedResolvedMenuPage\s*=\s*components\["schemas"\]\["PublicResolvedMenuPageResponse"\]/,
    "Expected resolved menu page type to use the generated schema.",
  );
});

test("public static params include renderable dynamic menu types", async () => {
  const contents = await readFile(publicMenuApiPath, "utf8");

  assert.match(contents, /RENDERABLE_TYPES[\s\S]*["']BOARD["']/, "Expected board menus to be static-param candidates.");
  assert.match(
    contents,
    /RENDERABLE_TYPES[\s\S]*["']YOUTUBE_PLAYLIST["']/,
    "Expected YouTube playlist menus to be static-param candidates.",
  );
});

test("frontend exposes an API type generation script", async () => {
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));

  assert.equal(
    packageJson.scripts["gen:api"],
    "openapi-typescript ../happyzion_api/build/openapi/openapi.yaml -o src/types/api.d.ts",
  );
  assert.ok(
    packageJson.devDependencies["openapi-typescript"],
    "Expected openapi-typescript to be installed as a dev dependency.",
  );
});
