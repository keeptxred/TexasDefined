import fs from "node:fs";

const WAVE4_PATH = "ops/seo/gsc-remediation-wave4-2026-09-05.json";
const WAVE6_PATH = "ops/seo/gsc-remediation-wave6-2026-09-06.json";
const READINESS_PATH = "src/data/texas-vs-state-index-readiness.server.ts";
const EVIDENCE_PATH = "src/data/texas-vs-state-evidence.server.ts";
const PROFILE_SERVER_PATH = "src/data/texas-vs-state-profile.server.ts";
const ROUTE_PATH = "src/routes/texas-vs.$state.tsx";

const expected = [
  { slug: "colorado", name: "Colorado" },
  { slug: "georgia", name: "Georgia" },
  { slug: "new-york", name: "New York" },
  { slug: "north-carolina", name: "North Carolina" },
  { slug: "tennessee", name: "Tennessee" },
];
const expectedSlugs = expected.map((item) => item.slug).sort();
const requiredTopics = ["tax", "housing", "jobs", "risk", "transport"];
const requiredLensMarkers = ["taxLens:", "housingLens:", "jobsLens:", "riskLens:", "transportationLens:", "metroLens:"];
const allowedSourceHosts = new Set([
  "tax.colorado.gov",
  "demography.dola.colorado.gov",
  "cdle.colorado.gov",
  "planningforhazards.colorado.gov",
  "www.codot.gov",
  "www.tn.gov",
  "thda.org",
  "www.ncdor.gov",
  "www.nchfa.com",
  "d4.nccommerce.com",
  "www.ncdps.gov",
  "www.ncdot.gov",
  "dor.georgia.gov",
  "dca.georgia.gov",
  "dol.georgia.gov",
  "gema.georgia.gov",
  "www.dot.ga.gov",
  "www.tax.ny.gov",
  "hcr.ny.gov",
  "dol.ny.gov",
  "www.dhses.ny.gov",
  "www.dot.ny.gov",
]);

function fail(message) {
  console.error(`Texas-vs state promotion validation failed: ${message}`);
  process.exit(1);
}

function read(path) {
  if (!fs.existsSync(path)) fail(`missing ${path}`);
  return fs.readFileSync(path, "utf8");
}

function parseStringArray(source, constName) {
  const match = source.match(new RegExp(`const ${constName} = \\[(.*?)\\] as const;`, "s"));
  if (!match) fail(`could not parse ${constName} from ${READINESS_PATH}`);
  return [...match[1].matchAll(/"([^"]+)"/g)].map((entry) => entry[1]);
}

function assertSameSet(actual, expectedSet, label) {
  const a = [...new Set(actual)].sort();
  const e = [...new Set(expectedSet)].sort();
  if (JSON.stringify(a) !== JSON.stringify(e)) fail(`${label} mismatch. expected ${e.join(", ")}; got ${a.join(", ")}`);
}

const wave4 = JSON.parse(read(WAVE4_PATH));
const wave6 = JSON.parse(read(WAVE6_PATH));
const readiness = read(READINESS_PATH);
const evidenceSource = read(EVIDENCE_PATH);
const profileServer = read(PROFILE_SERVER_PATH);
const route = read(ROUTE_PATH);

if (wave6.summary?.reviewed !== 5 || wave6.summary?.KEEP !== 5 || wave6.summary?.IMPROVE !== 0 || wave6.summary?.NOINDEX !== 0 || wave6.summary?.REMOVE_CONSOLIDATE !== 0) {
  fail("Wave 6 summary must be exactly five KEEP promotions");
}

const wave6Slugs = wave6.reviewed.map((item) => {
  if (item.action !== "KEEP") fail(`${item.path} must be KEEP in Wave 6`);
  if (item.supersedes !== WAVE4_PATH) fail(`${item.path} must supersede Wave 4`);
  if (item.previousAction !== "IMPROVE") fail(`${item.path} must record previousAction IMPROVE`);
  if (!item.path.startsWith("/texas-vs/")) fail(`${item.path} is not a Texas-vs state path`);
  return item.path.slice("/texas-vs/".length);
});
assertSameSet(wave6Slugs, expectedSlugs, "Wave 6 promoted states");

const historicalImproveSlugs = wave4.reviewed.filter((item) => item.action === "IMPROVE").map((item) => item.path.slice("/texas-vs/".length));
for (const slug of expectedSlugs) {
  if (!historicalImproveSlugs.includes(slug)) fail(`${slug} was not an IMPROVE state in Wave 4`);
}

const originalImproveRegistry = parseStringArray(readiness, "GSC_IMPROVE_STATE_SLUGS");
if (originalImproveRegistry.length !== 37 || new Set(originalImproveRegistry).size !== 37) fail("historical GSC_IMPROVE_STATE_SLUGS must remain exactly 37 unique states");
for (const slug of expectedSlugs) {
  if (!originalImproveRegistry.includes(slug)) fail(`${slug} disappeared from the historical Wave 4 readiness registry`);
}

const promotedRegistry = parseStringArray(readiness, "GSC_PROMOTED_STATE_SLUGS");
assertSameSet(promotedRegistry, expectedSlugs, "runtime promoted-state registry");
if (!readiness.includes("if (TEXAS_VS_GSC_PROMOTED_STATE_SLUGS.has(slug)) return true;")) fail("readiness function does not explicitly restore promoted states");
if (!readiness.includes("if (TEXAS_VS_REDIRECT_ONLY_STATE_SLUGS.has(slug)) return false;")) fail("redirect-only states must remain excluded before promotion handling");

const stateMarkers = expected.map(({ name }) => `${JSON.stringify(name)}: {`);
for (let index = 0; index < expected.length; index += 1) {
  const { slug, name } = expected[index];
  const marker = stateMarkers[index];
  let start = evidenceSource.indexOf(marker);
  if (start === -1 && /^[A-Za-z]+$/.test(name)) start = evidenceSource.indexOf(`  ${name}: {`);
  if (start === -1) fail(`missing evidence block for ${name}`);

  let end = evidenceSource.length;
  for (let next = index + 1; next < stateMarkers.length; next += 1) {
    const quotedIndex = evidenceSource.indexOf(stateMarkers[next], start + marker.length);
    const bareIndex = evidenceSource.indexOf(`  ${expected[next].name}: {`, start + marker.length);
    const candidates = [quotedIndex, bareIndex].filter((value) => value >= 0);
    if (candidates.length) {
      end = Math.min(...candidates);
      break;
    }
  }
  const block = evidenceSource.slice(start, end);

  for (const lens of requiredLensMarkers) {
    if (!block.includes(lens)) fail(`${name} is missing ${lens.replace(":", "")}`);
  }

  const reviewMatch = block.match(/reviewedAt: "(\d{4}-\d{2}-\d{2})"/);
  if (!reviewMatch) fail(`${name} is missing reviewedAt`);
  const reviewedAt = new Date(`${reviewMatch[1]}T00:00:00Z`);
  const ageDays = (Date.now() - reviewedAt.getTime()) / 86400000;
  if (!Number.isFinite(ageDays) || ageDays < -2 || ageDays > 400) fail(`${name} reviewedAt is outside the 400-day freshness window`);

  const topics = [...block.matchAll(/topic: "(tax|housing|jobs|risk|transport)"/g)].map((match) => match[1]);
  assertSameSet(topics, requiredTopics, `${name} evidence topics`);
  if (topics.length !== requiredTopics.length) fail(`${name} must have exactly one source for each required topic`);

  const urls = [...block.matchAll(/url: "([^"]+)"/g)].map((match) => match[1]);
  if (urls.length !== 5) fail(`${name} must have exactly five official source URLs; got ${urls.length}`);
  for (const value of urls) {
    let url;
    try { url = new URL(value); } catch { fail(`${name} has invalid source URL ${value}`); }
    if (url.protocol !== "https:") fail(`${name} source must use HTTPS: ${value}`);
    if (!allowedSourceHosts.has(url.hostname)) fail(`${name} source host is not in the approved official-source set: ${url.hostname}`);
  }

  const words = requiredLensMarkers.reduce((total, lens, lensIndex) => {
    const startIndex = block.indexOf(lens);
    if (startIndex === -1) return total;
    const nextIndex = lensIndex + 1 < requiredLensMarkers.length ? block.indexOf(requiredLensMarkers[lensIndex + 1], startIndex) : block.indexOf("sources:", startIndex);
    return total + block.slice(startIndex, nextIndex > startIndex ? nextIndex : undefined).split(/\s+/).filter(Boolean).length;
  }, 0);
  if (words < 180) fail(`${name} evidence lenses are too thin (${words} words across six lenses)`);

  if (!wave6Slugs.includes(slug)) fail(`${name} evidence exists without matching Wave 6 promotion`);
}

for (const marker of ["TEXAS_VS_STATE_EVIDENCE", "evidence: TEXAS_VS_STATE_EVIDENCE[name]"]) {
  if (!profileServer.includes(marker)) fail(`profile server missing integration marker: ${marker}`);
}

for (const marker of [
  "evidence?.taxLens",
  "evidence?.housingLens",
  "evidence?.jobsLens",
  "evidence.riskLens",
  "evidence?.transportationLens",
  "evidence.metroLens",
  "loaderData.profile.evidence?.reviewedAt",
  "{name} official sources",
]) {
  if (!route.includes(marker)) fail(`Texas-vs route missing evidence render marker: ${marker}`);
}

console.log(`Texas-vs state promotion validation passed (${expected.length} evidence-qualified states).`);
