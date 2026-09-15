import fs from 'node:fs';

const WAVE4_PATH = 'ops/seo/gsc-remediation-wave4-2026-09-05.json';
const READINESS_PATH = 'src/data/texas-vs-state-index-readiness.server.ts';
const PROFILE_SERVER_PATH = 'src/data/texas-vs-state-profile.server.ts';
const LEGACY_ROUTE_PATH = 'src/routes/texas-vs.$state.tsx';
const EXPLORER_PATH = 'src/components/content/TexasVsStateExplorer.tsx';
const CANONICAL_ROUTE_PATH = 'src/routes/texas-vs-every-state.lazy.tsx';

const promotionWaves = [
  ['ops/seo/gsc-remediation-wave6-2026-09-06.json', 'src/data/texas-vs-state-evidence.server.ts'],
  ['ops/seo/gsc-remediation-wave7-2026-09-06.json', 'src/data/texas-vs-state-evidence-wave7.server.ts'],
  ['ops/seo/gsc-remediation-wave8-2026-09-06.json', 'src/data/texas-vs-state-evidence-wave8.server.ts'],
  ['ops/seo/gsc-remediation-wave9-2026-09-06.json', 'src/data/texas-vs-state-evidence-wave9.server.ts'],
  ['ops/seo/gsc-remediation-wave10-2026-09-07.json', 'src/data/texas-vs-state-evidence-wave10.server.ts'],
  ['ops/seo/gsc-remediation-wave11-2026-09-07.json', 'src/data/texas-vs-state-evidence-wave11.server.ts'],
  ['ops/seo/gsc-remediation-wave12-2026-09-08.json', 'src/data/texas-vs-state-evidence-wave12.server.ts'],
  ['ops/seo/gsc-remediation-wave13-2026-09-08.json', 'src/data/texas-vs-state-evidence-wave13.server.ts'],
  ['ops/seo/gsc-remediation-wave14-2026-09-08.json', 'src/data/texas-vs-state-evidence-wave14.server.ts'],
  ['ops/seo/gsc-remediation-wave15-2026-09-08.json', 'src/data/texas-vs-state-evidence-wave15.server.ts'],
  ['ops/seo/gsc-remediation-wave16-2026-09-08.json', 'src/data/texas-vs-state-evidence-wave16.server.ts'],
];

const requiredTopics = ['tax', 'housing', 'jobs', 'risk', 'transport'];
const requiredLensMarkers = ['taxLens:', 'housingLens:', 'jobsLens:', 'riskLens:', 'transportationLens:', 'metroLens:'];
const allowedNonGovHosts = new Set([
  'thda.org',
  'www.nchfa.com',
  'd4.nccommerce.com',
  'www.laworks.net',
  'housingnm.org',
  'www.dws.state.nm.us',
  'www14e.ohiohome.org',
  'ohiolmi.com',
  'www.nevadaworkforce.com',
  'www.scdot.org',
  'www.dartfirststate.com',
  'www.modot.org',
  'www.ripta.com',
]);

function fail(message) {
  console.error(`Texas-vs consolidated authority validation failed: ${message}`);
  process.exit(1);
}

function read(path) {
  if (!fs.existsSync(path)) fail(`missing ${path}`);
  return fs.readFileSync(path, 'utf8');
}

function assertSameSet(actual, expected, label) {
  const a = [...new Set(actual)].sort();
  const e = [...new Set(expected)].sort();
  if (JSON.stringify(a) !== JSON.stringify(e)) fail(`${label} mismatch. expected ${e.join(', ')}; got ${a.join(', ')}`);
}

function parseStringArray(source, constName) {
  const match = source.match(new RegExp(`const ${constName} = \\[(.*?)\\] as const;`, 's'));
  if (!match) fail(`could not parse ${constName} from ${READINESS_PATH}`);
  return [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((entry) => entry[1]);
}

function stateNameFromSlug(slug) {
  return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function stateBlock(source, stateName) {
  const markers = [`${JSON.stringify(stateName)}: {`, `  ${stateName}: {`];
  const starts = markers.map((marker) => source.indexOf(marker)).filter((value) => value >= 0);
  if (!starts.length) fail(`missing evidence block for ${stateName}`);
  const start = Math.min(...starts);
  const next = source.indexOf('\n  },', start);
  if (next === -1) fail(`could not bound evidence block for ${stateName}`);
  return source.slice(start, next + 5);
}

function validateEvidenceBlock(block, stateName) {
  for (const lens of requiredLensMarkers) {
    if (!block.includes(lens)) fail(`${stateName} is missing ${lens.replace(':', '')}`);
  }

  const reviewMatch = block.match(/reviewedAt: ['"](\d{4}-\d{2}-\d{2})['"]/);
  if (!reviewMatch) fail(`${stateName} is missing reviewedAt`);
  const reviewedAt = new Date(`${reviewMatch[1]}T00:00:00Z`);
  const ageDays = (Date.now() - reviewedAt.getTime()) / 86400000;
  if (!Number.isFinite(ageDays) || ageDays < -2 || ageDays > 400) fail(`${stateName} reviewedAt is outside the 400-day freshness window`);

  const topics = [...block.matchAll(/topic: ['"](tax|housing|jobs|risk|transport)['"]/g)].map((match) => match[1]);
  assertSameSet(topics, requiredTopics, `${stateName} evidence topics`);
  if (topics.length !== requiredTopics.length) fail(`${stateName} must have exactly one source for each required topic`);

  const urls = [...block.matchAll(/url: ['"]([^'"]+)['"]/g)].map((match) => match[1]);
  if (urls.length !== 5 || new Set(urls).size !== 5) fail(`${stateName} must have exactly five unique official source URLs`);
  for (const value of urls) {
    let url;
    try {
      url = new URL(value);
    } catch {
      fail(`${stateName} has invalid source URL ${value}`);
    }
    if (url.protocol !== 'https:') fail(`${stateName} source must use HTTPS: ${value}`);
    const officialHost = url.hostname.endsWith('.gov') || allowedNonGovHosts.has(url.hostname);
    if (!officialHost) fail(`${stateName} source host is outside the approved government/official-source set: ${url.hostname}`);
  }

  const words = requiredLensMarkers.reduce((total, lens, lensIndex) => {
    const start = block.indexOf(lens);
    const nextMarker = requiredLensMarkers[lensIndex + 1];
    const end = nextMarker ? block.indexOf(nextMarker, start + lens.length) : block.indexOf('sources:', start + lens.length);
    const text = block.slice(start, end > start ? end : undefined);
    return total + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  if (words < 180) fail(`${stateName} evidence lenses are too thin (${words} words across six lenses)`);
}

const wave4 = JSON.parse(read(WAVE4_PATH));
const historicalImproveSlugs = wave4.reviewed
  .filter((item) => item.action === 'IMPROVE')
  .map((item) => item.path.slice('/texas-vs/'.length));
if (historicalImproveSlugs.length !== 37 || new Set(historicalImproveSlugs).size !== 37) {
  fail('Wave 4 must preserve exactly 37 unique historical IMPROVE states');
}

const promotedSlugs = [];
for (const [wavePath, evidencePath] of promotionWaves) {
  const wave = JSON.parse(read(wavePath));
  const evidenceSource = read(evidencePath);
  if (
    wave.summary?.reviewed !== wave.reviewed.length ||
    wave.summary?.KEEP !== wave.reviewed.length ||
    wave.summary?.IMPROVE !== 0 ||
    wave.summary?.NOINDEX !== 0 ||
    wave.summary?.REMOVE_CONSOLIDATE !== 0
  ) {
    fail(`${wavePath} summary must record every reviewed state as KEEP`);
  }

  for (const item of wave.reviewed) {
    if (item.action !== 'KEEP') fail(`${item.path} must remain KEEP in ${wavePath}`);
    if (item.supersedes !== WAVE4_PATH) fail(`${item.path} must supersede Wave 4`);
    if (item.previousAction !== 'IMPROVE') fail(`${item.path} must record previousAction IMPROVE`);
    if (!item.path.startsWith('/texas-vs/')) fail(`${item.path} is not a Texas-vs state path`);
    const slug = item.path.slice('/texas-vs/'.length);
    if (!historicalImproveSlugs.includes(slug)) fail(`${slug} was not an IMPROVE state in Wave 4`);
    if (promotedSlugs.includes(slug)) fail(`${slug} is promoted by more than one remediation wave`);
    promotedSlugs.push(slug);
    validateEvidenceBlock(stateBlock(evidenceSource, stateNameFromSlug(slug)), stateNameFromSlug(slug));
  }
}
assertSameSet(promotedSlugs, historicalImproveSlugs, 'Waves 6-16 promoted-state coverage');
if (promotedSlugs.length !== 37) fail(`Waves 6-16 must preserve 37 promoted states; found ${promotedSlugs.length}`);

const readiness = read(READINESS_PATH);
assertSameSet(parseStringArray(readiness, 'GSC_IMPROVE_STATE_SLUGS'), historicalImproveSlugs, 'historical Wave 4 readiness registry');
assertSameSet(parseStringArray(readiness, 'GSC_PROMOTED_STATE_SLUGS'), historicalImproveSlugs, 'promoted-state readiness registry');
const redirectOnly = parseStringArray(readiness, 'REDIRECT_ONLY_STATE_SLUGS');
assertSameSet(redirectOnly, ['california', 'florida'], 'historical redirect-only registry');
if (!/export function isTexasVsStateSitemapReady\([^)]*\)\s*\{\s*return false;\s*\}/s.test(readiness)) {
  fail('consolidation must keep every legacy /texas-vs/:state URL out of the sitemap');
}

const profileServer = read(PROFILE_SERVER_PATH);
for (const marker of [
  'TEXAS_VS_STATE_EVIDENCE',
  'TEXAS_VS_STATE_EVIDENCE_WAVE7',
  'TEXAS_VS_STATE_EVIDENCE_WAVE8',
  'TEXAS_VS_STATE_EVIDENCE_WAVE9',
  'TEXAS_VS_STATE_EVIDENCE_WAVE10',
  'TEXAS_VS_STATE_EVIDENCE_WAVE11',
  'TEXAS_VS_STATE_EVIDENCE_WAVE12',
  'TEXAS_VS_STATE_EVIDENCE_WAVE13',
  'TEXAS_VS_STATE_EVIDENCE_WAVE14',
  'TEXAS_VS_STATE_EVIDENCE_WAVE15',
  'TEXAS_VS_STATE_EVIDENCE_WAVE16',
]) {
  if (!profileServer.includes(marker)) fail(`profile server missing evidence integration marker ${marker}`);
}

const legacyRoute = read(LEGACY_ROUTE_PATH);
for (const marker of [
  "createFileRoute('/texas-vs/$state')",
  'texasVsStateName(params.state)',
  'notFound()',
  'redirect({ href: `/texas-vs-every-state#${params.state}`, statusCode: 301 })',
]) {
  if (!legacyRoute.includes(marker)) fail(`legacy Texas-vs route missing redirect/fail-closed marker ${marker}`);
}
if (legacyRoute.includes('texas-vs-state-evidence')) fail('legacy redirect route must not import server-only evidence catalogs');

const explorer = read(EXPLORER_PATH);
for (const marker of [
  'loadTexasVsStateProfile',
  'window.location.hash',
  'profile.evidence',
  'evidence?.taxLens',
  'evidence?.housingLens',
  'evidence?.jobsLens',
  'evidence.riskLens',
  'evidence?.transportationLens',
  'evidence.metroLens',
  'profile.evidence.reviewedAt',
  'profile.evidence.sources.map',
  '{name} official sources',
]) {
  if (!explorer.includes(marker)) fail(`canonical Texas-vs explorer missing evidence render marker ${marker}`);
}

const canonicalRoute = read(CANONICAL_ROUTE_PATH);
for (const marker of [
  'TexasVsStateExplorer',
  '<TexasVsStateExplorer />',
  'one canonical page',
  'does not create a separate canonical page',
]) {
  if (!canonicalRoute.includes(marker)) fail(`canonical Texas-vs page missing consolidation marker ${marker}`);
}

console.log(`Texas-vs consolidated authority validation passed: ${promotedSlugs.length} evidence-qualified promoted states remain preserved behind one canonical comparison explorer, with legacy state URLs fail-closed and permanently redirected.`);
