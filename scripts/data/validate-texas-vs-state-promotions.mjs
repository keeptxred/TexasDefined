import fs from "node:fs";

const WAVE4_PATH = "ops/seo/gsc-remediation-wave4-2026-09-05.json";
const WAVE6_PATH = "ops/seo/gsc-remediation-wave6-2026-09-06.json";
const WAVE7_PATH = "ops/seo/gsc-remediation-wave7-2026-09-06.json";
const WAVE8_PATH = "ops/seo/gsc-remediation-wave8-2026-09-06.json";
const READINESS_PATH = "src/data/texas-vs-state-index-readiness.server.ts";
const EVIDENCE_WAVE6_PATH = "src/data/texas-vs-state-evidence.server.ts";
const EVIDENCE_WAVE7_PATH = "src/data/texas-vs-state-evidence-wave7.server.ts";
const EVIDENCE_WAVE8_PATH = "src/data/texas-vs-state-evidence-wave8.server.ts";
const PROFILE_SERVER_PATH = "src/data/texas-vs-state-profile.server.ts";
const ROUTE_PATH = "src/routes/texas-vs.$state.tsx";

const batches = [
  {
    wavePath: WAVE6_PATH,
    evidencePath: EVIDENCE_WAVE6_PATH,
    states: [
      { slug: "colorado", name: "Colorado" },
      { slug: "tennessee", name: "Tennessee" },
      { slug: "north-carolina", name: "North Carolina" },
      { slug: "georgia", name: "Georgia" },
      { slug: "new-york", name: "New York" },
    ],
  },
  {
    wavePath: WAVE7_PATH,
    evidencePath: EVIDENCE_WAVE7_PATH,
    states: [
      { slug: "louisiana", name: "Louisiana" },
      { slug: "new-mexico", name: "New Mexico" },
      { slug: "michigan", name: "Michigan" },
    ],
  },
  {
    wavePath: WAVE8_PATH,
    evidencePath: EVIDENCE_WAVE8_PATH,
    states: [
      { slug: "ohio", name: "Ohio" },
      { slug: "virginia", name: "Virginia" },
      { slug: "pennsylvania", name: "Pennsylvania" },
    ],
  },
];

const expected = batches.flatMap((batch) => batch.states);
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
  "revenue.louisiana.gov",
  "www.lhc.la.gov",
  "www.laworks.net",
  "gohsep.la.gov",
  "www.dotd.louisiana.gov",
  "www.tax.newmexico.gov",
  "housingnm.org",
  "www.dws.state.nm.us",
  "www.dhsem.nm.gov",
  "www.dot.nm.gov",
  "www.michigan.gov",
  "codes.ohio.gov",
  "www14e.ohiohome.org",
  "ohiolmi.com",
  "services.dps.ohio.gov",
  "www.tax.virginia.gov",
  "www.dhcd.virginia.gov",
  "virginiaworks.gov",
  "www.vaemergency.gov",
  "drpt.virginia.gov",
  "www.pa.gov",
  "dced.pa.gov",
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

function stateBlock(source, states, index, path) {
  const { name } = states[index];
  const quotedMarker = `${JSON.stringify(name)}: {`;
  const bareMarker = `  ${name}: {`;
  let start = source.indexOf(quotedMarker);
  if (start === -1 && /^[A-Za-z]+$/.test(name)) start = source.indexOf(bareMarker);
  if (start === -1) fail(`missing evidence block for ${name} in ${path}`);

  let end = source.length;
  for (let next = index + 1; next < states.length; next += 1) {
    const nextName = states[next].name;
    const candidates = [
      source.indexOf(`${JSON.stringify(nextName)}: {`, start + 1),
      /^[A-Za-z]+$/.test(nextName) ? source.indexOf(`  ${nextName}: {`, start + 1) : -1,
    ].filter((value) => value >= 0);
    if (candidates.length) {
      end = Math.min(...candidates);
      break;
    }
  }
  return source.slice(start, end);
}

const wave4 = JSON.parse(read(WAVE4_PATH));
const readiness = read(READINESS_PATH);
const profileServer = read(PROFILE_SERVER_PATH);
const compactProfileServer = profileServer.replace(/\s+/g, " ");
const route = read(ROUTE_PATH);
const historicalImproveSlugs = wave4.reviewed
  .filter((item) => item.action === "IMPROVE")
  .map((item) => item.path.slice("/texas-vs/".length));

const promotedByWave = new Map();
for (const batch of batches) {
  const wave = JSON.parse(read(batch.wavePath));
  const expectedBatchSlugs = batch.states.map((item) => item.slug).sort();
  if (
    wave.summary?.reviewed !== batch.states.length ||
    wave.summary?.KEEP !== batch.states.length ||
    wave.summary?.IMPROVE !== 0 ||
    wave.summary?.NOINDEX !== 0 ||
    wave.summary?.REMOVE_CONSOLIDATE !== 0
  ) {
    fail(`${batch.wavePath} summary must be exactly ${batch.states.length} KEEP promotions`);
  }

  const slugs = wave.reviewed.map((item) => {
    if (item.action !== "KEEP") fail(`${item.path} must be KEEP in ${batch.wavePath}`);
    if (item.supersedes !== WAVE4_PATH) fail(`${item.path} must supersede Wave 4`);
    if (item.previousAction !== "IMPROVE") fail(`${item.path} must record previousAction IMPROVE`);
    if (!item.path.startsWith("/texas-vs/")) fail(`${item.path} is not a Texas-vs state path`);
    const slug = item.path.slice("/texas-vs/".length);
    if (!historicalImproveSlugs.includes(slug)) fail(`${slug} was not an IMPROVE state in Wave 4`);
    if (promotedByWave.has(slug)) fail(`${slug} is promoted by both ${promotedByWave.get(slug)} and ${batch.wavePath}`);
    promotedByWave.set(slug, batch.wavePath);
    return slug;
  });
  assertSameSet(slugs, expectedBatchSlugs, `${batch.wavePath} promoted states`);
}

const originalImproveRegistry = parseStringArray(readiness, "GSC_IMPROVE_STATE_SLUGS");
if (originalImproveRegistry.length !== 37 || new Set(originalImproveRegistry).size !== 37) {
  fail("historical GSC_IMPROVE_STATE_SLUGS must remain exactly 37 unique states");
}
for (const slug of expectedSlugs) {
  if (!originalImproveRegistry.includes(slug)) fail(`${slug} disappeared from the historical Wave 4 readiness registry`);
}

const promotedRegistry = parseStringArray(readiness, "GSC_PROMOTED_STATE_SLUGS");
assertSameSet(promotedRegistry, expectedSlugs, "runtime promoted-state registry");
if (!readiness.includes("if (TEXAS_VS_GSC_REDIRECT_ONLY_STATE_SLUGS.has(slug)) return false;") && !readiness.includes("if (TEXAS_VS_REDIRECT_ONLY_STATE_SLUGS.has(slug)) return false;")) {
  fail("redirect-only states must remain excluded before promotion handling");
}
if (!readiness.includes("if (TEXAS_VS_GSC_PROMOTED_STATE_SLUGS.has(slug)) return true;")) {
  fail("readiness function does not explicitly restore promoted states");
}

for (const batch of batches) {
  const evidenceSource = read(batch.evidencePath);
  for (let index = 0; index < batch.states.length; index += 1) {
    const { slug, name } = batch.states[index];
    const block = stateBlock(evidenceSource, batch.states, index, batch.evidencePath);

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
      try {
        url = new URL(value);
      } catch {
        fail(`${name} has invalid source URL ${value}`);
      }
      if (url.protocol !== "https:") fail(`${name} source must use HTTPS: ${value}`);
      if (!allowedSourceHosts.has(url.hostname)) fail(`${name} source host is not in the approved official-source set: ${url.hostname}`);
    }

    const words = requiredLensMarkers.reduce((total, lens, lensIndex) => {
      const startIndex = block.indexOf(lens);
      if (startIndex === -1) return total;
      const nextIndex = lensIndex + 1 < requiredLensMarkers.length
        ? block.indexOf(requiredLensMarkers[lensIndex + 1], startIndex)
        : block.indexOf("sources:", startIndex);
      return total + block.slice(startIndex, nextIndex > startIndex ? nextIndex : undefined).split(/\s+/).filter(Boolean).length;
    }, 0);
    if (words < 180) fail(`${name} evidence lenses are too thin (${words} words across six lenses)`);

    if (promotedByWave.get(slug) !== batch.wavePath) fail(`${name} evidence exists without a matching promotion in ${batch.wavePath}`);
  }
}

for (const marker of [
  "TEXAS_VS_STATE_EVIDENCE",
  "TEXAS_VS_STATE_EVIDENCE_WAVE7",
  "TEXAS_VS_STATE_EVIDENCE_WAVE8",
]) {
  if (!profileServer.includes(marker)) fail(`profile server missing integration marker: ${marker}`);
}
const expectedFallback = "TEXAS_VS_STATE_EVIDENCE[name] ?? TEXAS_VS_STATE_EVIDENCE_WAVE7[name] ?? TEXAS_VS_STATE_EVIDENCE_WAVE8[name]";
if (!compactProfileServer.includes(expectedFallback)) fail("profile server evidence fallback order does not match Waves 6-8");
if (route.includes("texas-vs-state-evidence")) fail("client route must not import the server-only Texas-vs evidence catalogs directly");

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

console.log(`Texas-vs state promotion validation passed (${expected.length} evidence-qualified states across ${batches.length} promotion waves).`);
