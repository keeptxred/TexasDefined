import fs from "node:fs";
import assert from "node:assert/strict";

const fixtureFiles = [
  "src/data/fixtures/texas-high-intent-guides-a.ts",
  "src/data/fixtures/texas-high-intent-guides-b.ts",
];
const factsFile = "src/data/fixtures/texas-high-intent-pick-evidence.ts";
const standardFile = "src/data/fixtures/texas-gateway-index-readiness.ts";
const content = (path) => fs.readFileSync(path, "utf8");
const specs = fixtureFiles.flatMap((path) => {
  const text = content(path);
  const start = text.indexOf(" = [\n  {", text.indexOf("const specs:"));
  const end = text.indexOf("\n];", start);
  assert(start > 0 && end > start, "Guide editorial spec array not found in " + path);
  return JSON.parse(text.slice(start + 3, end + 2));
});
const registry = content(factsFile);
const m = [...registry.matchAll(/^  (\d+): \[([\s\S]*?)^  \],/gm)];
const errors = [];
const covered = [];
for (const [, idRaw, body] of m) {
  const number = Number(idRaw);
  const spec = specs.find((item) => item.number === number);
  if (!spec) { errors.push("Orphan source group " + number); continue; }
  const rows = [...body.matchAll(/\{ title: ("(?:[^"\\]|\\.)*"), officialUrl: ("(?:[^"\\]|\\.)*"), internalHref: ("(?:[^"\\]|\\.)*"), sourceCheckedAt: ("(?:[^"\\]|\\.)*"), reviewingAuthority: ("(?:[^"\\]|\\.)*") \}/g)].map((match) => {
    const [title, officialUrl, internalHref, sourceCheckedAt, reviewingAuthority] = match.slice(1).map(JSON.parse);
    return { title, officialUrl, internalHref, sourceCheckedAt, reviewingAuthority };
  });
  if (rows.length !== spec.picks.length) errors.push(number + ": " + rows.length + " source records but " + spec.picks.length + " article picks");
  const titles = new Set(spec.picks.map((pick) => pick.title));
  const linked = new Set();
  for (const row of rows) {
    if (linked.has(row.title)) errors.push(number + ": duplicate source record " + row.title);
    linked.add(row.title);
    if (!titles.has(row.title)) errors.push(number + ": source title does not match rendered pick " + row.title);
    if (!/^https:\/\//.test(row.officialUrl) || !row.reviewingAuthority || !/^2026-\d\d-\d\d$/.test(row.sourceCheckedAt)) errors.push(number + ": incomplete official source " + row.title);
    if (!row.internalHref.startsWith("/")) errors.push(number + ": source has no local link " + row.title);
  }
  for (const title of titles) if (!linked.has(title)) errors.push(number + ": no operator source for pick " + title);
  covered.push({ number, sourceRows: rows.length });
}
for (const article of specs) {
  if (article.picks.length < 10) errors.push(article.number + ": incomplete destination count");
}
const readiness = content(standardFile);
if (!readiness.includes("allGuidePicksIndividuallySourced(number, pickHeadings)")) errors.push("Release gate no longer enforces item-level research for all comparison guides");
const approvals = readiness.match(/TEXAS_HIGH_INTENT_RELEASE_APPROVED_SLUGS = new Set<string>\(\[([\s\S]*?)\]\)/);
if (!approvals) errors.push("Explicit public release approval registry is missing");
else {
  const approved = [...approvals[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  const mapped = new Set(covered.map((x) => specs.find((spec) => spec.number === x.number)?.slug));
  for (const slug of approved) if (!mapped.has(slug)) errors.push("Unresearched comparison already approved for publication: " + slug);
}
const missing = specs.filter((article) => !covered.some((row) => row.number === article.number)).map((article) => article.number);
const mappedRows = covered.reduce((sum, row) => sum + row.sourceRows, 0);
if (errors.length) {
  console.error("Individual comparison source coverage failed:\n" + errors.map((item) => "- " + item).join("\n"));
  process.exit(1);
}
console.log("PASS: " + covered.length + " source-mapped guide groups contain " + mappedRows + " exact recommendation-to-operator links; " + missing.length + " groups (" + missing.join(", ") + ") still require item-level research and remain unapproved for indexing.");
