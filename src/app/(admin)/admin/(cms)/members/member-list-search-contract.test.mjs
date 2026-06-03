import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const pagePath = path.join(here, "page.tsx");
const clientPath = path.join(here, "_components", "member-list-client.tsx");
const apiPath = path.join(here, "..", "..", "..", "..", "..", "lib", "admin-members-api.ts");

test("member list search preserves filters from controls to API query", async () => {
  const page = await readFile(pagePath, "utf8");
  const client = await readFile(clientPath, "utf8");
  const api = await readFile(apiPath, "utf8");

  assert.match(page, /sp\.includeInactive === "true"/, "Expected page query parser to read includeInactive=true.");
  assert.match(page, /parseStatus\(sp\.status\)/, "Expected page query parser to validate status.");
  assert.match(client, /value=\{statusInput\}/, "Expected a controlled status filter.");
  assert.match(client, /<option value="ALL">전체 상태<\/option>/, "Expected explicit all-status option.");
  assert.match(
    client,
    /query\.status \?\? \(query\.includeInactive \? "ALL" : "ACTIVE"\)/,
    "Expected the default selected status to be active.",
  );
  assert.match(
    client,
    /if \(statusInput === "ALL"\) params\.set\("includeInactive", "true"\)/,
    "Expected all-status search to include inactive statuses.",
  );
  assert.match(
    client,
    /else if \(statusInput && statusInput !== "ACTIVE"\) params\.set\("status", statusInput\)/,
    "Expected search button to write selected status.",
  );
  assert.match(
    api,
    /if \(q\.includeInactive\) params\.set\("includeInactive", "true"\)/,
    "Expected API client to forward includeInactive=true to backend.",
  );
  assert.match(api, /if \(q\.status\) params\.set\("status", q\.status\)/, "Expected API client to forward status.");
});

test("member list pagination renders visible page numbers", async () => {
  const client = await readFile(clientPath, "utf8");

  assert.match(client, /getVisiblePageItems/, "Expected pagination to calculate visible page buttons.");
  assert.match(client, /Math\.ceil\(data\.total \/ query\.size\)/, "Expected pagination to use total count.");
  assert.match(client, /aria-current=\{isCurrent \? "page" : undefined\}/, "Expected current page to be marked.");
  assert.match(client, /총 \{data\.total\.toLocaleString\("ko-KR"\)\}명/, "Expected total count to be visible.");
});
