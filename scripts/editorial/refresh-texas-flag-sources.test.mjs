import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { sourceEvidence, refreshTexasFlagSources } from "./refresh-texas-flag-sources.mjs";

const spec = {
  id: "archive", title: "Texas State Library",
  url: "https://example.org/official", required: ["January 25, 1839"],
  affected: ["/texas-flag"], subject: "authentic signed flag",
};
const content = "In the Texas republic historical record, ".repeat(15) + "January 25, 1839 " + "was documented in the signed legislative archive. ".repeat(15);
const wrap = body => "<html><body><nav>Changing navigation</nav><main><p>" + body + "</p></main></body></html>";
const mock = html => async (url) => {
  assert.equal(url, spec.url);
  return new Response(html, { status: 200 });
};

test("official-source fingerprint ignores irrelevant site navigation and detects a real local change", () => {
  const first = sourceEvidence(wrap(content), spec.required);
  const same = sourceEvidence(wrap(content).replace("Changing navigation", "Revised navigation"), spec.required);
  const newText = sourceEvidence(wrap(content.replace("signed legislative archive", "revised legislative archive")), spec.required);
  assert.equal(first.hash, same.hash);
  assert.notEqual(first.hash, newText.hash);
});

test("missing legal anchor is a blocking validation error, not permission to rewrite public text", () => {
  assert.throws(() => sourceEvidence(wrap("long text ".repeat(100)), spec.required), /anchor missing/);
});

test("first read creates source evidence; unchanged runs leave baseline and public dates alone", async () => {
  const folder = mkdtempSync(join(tmpdir(), "td-flag-source-"));
  try {
    const paths = {
      statePath: join(folder, "state.json"),
      reportPath: join(folder, "report.json"),
      proposalPath: join(folder, "proposal.md"),
      sourceList: [spec],
      now: new Date("2026-11-20T14:00:00Z"),
    };
    const first = await refreshTexasFlagSources({ ...paths, fetchImpl: mock(wrap(content)) });
    assert.equal(first.changes[0].type, "initial-baseline");
    assert.match(readFileSync(paths.proposalPath, "utf8"), /No researched public page text was changed/);
    const baseline = readFileSync(paths.statePath, "utf8");
    const repeat = await refreshTexasFlagSources({ ...paths, fetchImpl: mock(wrap(content)) });
    assert.equal(repeat.changes.length, 0);
    assert.equal(readFileSync(paths.statePath, "utf8"), baseline);
    const altered = await refreshTexasFlagSources({
      ...paths, fetchImpl: mock(wrap(content.replace("signed legislative archive", "revised legislative archive"))),
    });
    assert.equal(altered.changes[0].type, "changed");
    assert.notEqual(readFileSync(paths.statePath, "utf8"), baseline);
  } finally { rmSync(folder, { recursive: true, force: true }); }
});

test("unavailable upstream sources fail closed without forging a new baseline", async () => {
  const folder = mkdtempSync(join(tmpdir(), "td-flag-source-"));
  try {
    await assert.rejects(() => refreshTexasFlagSources({
      sourceList: [spec], statePath: join(folder, "state.json"),
      reportPath: join(folder, "report.json"), proposalPath: join(folder, "proposal.md"),
      fetchImpl: async () => new Response("", { status: 503 }),
    }), /source HTTP 503/);
  } finally { rmSync(folder, { recursive: true, force: true }); }
});
