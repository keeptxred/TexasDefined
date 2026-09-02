import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const surfaces = [
  { path: '/texas-moving-cost-calculator', marker: 'Connect the one-time move to the monthly Texas budget' },
  { path: '/texas-cost-of-living-calculator', marker: 'Verify the categories that matter most to the move' },
  { path: '/texas-salary-comparison-by-city', marker: 'Compare income with the costs you will actually carry' },
  { path: '/texas-salary-calculator', marker: 'Compare pay with Texas living costs' },
  { path: '/texas-budget-planner', marker: 'Use the other Texas tools to improve the budget inputs' },
];

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

function fail(label, message) {
  console.error(`::error title=STATEWIDE FINANCIAL DISCOVERY failure::${label}: ${message}`);
  appendSummary(`| ❌ FAIL | ${label} | ${message.replaceAll('|', '\\|')} |\n`);
  process.exitCode = 1;
}

function decodeAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&#x27;', "'");
}

function extractLinkPathnames(body) {
  const pathnames = new Set();
  const anchorPattern = /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi;
  for (const match of body.matchAll(anchorPattern)) {
    const href = decodeAttribute(match[2]?.trim() ?? '');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
    try {
      const url = new URL(href, origin);
      if (url.origin === new URL(origin).origin) pathnames.add(url.pathname.replace(/\/$/, '') || '/');
    } catch {
      // Ignore malformed and non-URL href values; required internal paths still fail closed below.
    }
  }
  return pathnames;
}

async function fetchProduction(path) {
  const separator = path.includes('?') ? '&' : '?';
  const url = `${origin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}`)}`;
  const response = await fetch(url, {
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
    headers: { 'user-agent': 'TexasDefined-CI-Statewide-Financial-Discovery/1.0' },
  });
  return { response, body: await response.text() };
}

appendSummary('\n## Statewide financial discovery verification\n\n');
appendSummary('| Result | Surface | Contract |\n|---|---|---|\n');

for (const surface of surfaces) {
  try {
    const { response, body } = await fetchProduction(surface.path);
    const canonical = `${origin}${surface.path}`;
    const linkPathnames = extractLinkPathnames(body);
    const missingPeers = surfaces
      .filter((item) => item.path !== surface.path)
      .map((item) => item.path)
      .filter((path) => !linkPathnames.has(path));
    const missingPageSignals = [surface.marker, canonical].filter((needle) => !body.includes(needle));
    const hasNoindex = /<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["'])/i.test(body);
    if (!response.ok) fail(surface.path, `HTTP ${response.status}`);
    else if (hasNoindex) fail(surface.path, 'unexpected robots noindex');
    else if (missingPageSignals.length) fail(surface.path, `missing page signals: ${missingPageSignals.join(', ')}`);
    else if (missingPeers.length) fail(surface.path, `missing internal links to ${missingPeers.join(', ')}`);
    else {
      console.log(`[${surface.path}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${surface.path} | 200, canonical, indexable, page marker, reciprocal links to all four core planning surfaces |\n`);
    }
  } catch (error) {
    fail(surface.path, error instanceof Error ? error.message : String(error));
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`Statewide financial discovery verification passed for ${surfaces.length} mutually linked planning surfaces.`);