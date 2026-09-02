import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const reportPath = process.env.STATEWIDE_FINANCIAL_DISCOVERY_REPORT ?? '.artifacts/statewide-financial-discovery.json';

const surfaces = [
  { path: '/texas-moving-cost-calculator', marker: 'Connect the one-time move to the monthly Texas budget' },
  { path: '/texas-cost-of-living-calculator', marker: 'Verify the categories that matter most to the move' },
  { path: '/texas-salary-comparison-by-city', marker: 'Compare income with the costs you will actually carry' },
  { path: '/texas-salary-calculator', marker: 'Compare pay with Texas living costs' },
  { path: '/texas-budget-planner', marker: 'Use the other Texas tools to improve the budget inputs' },
];

const diagnostics = [];

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

function extractLinks(body) {
  const rawHrefs = [];
  const pathnames = new Set();
  const anchorPattern = /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi;
  for (const match of body.matchAll(anchorPattern)) {
    const href = decodeAttribute(match[2]?.trim() ?? '');
    if (!href) continue;
    if (rawHrefs.length < 200) rawHrefs.push(href);
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
    try {
      const url = new URL(href, origin);
      if (url.origin === new URL(origin).origin) pathnames.add(url.pathname.replace(/\/$/, '') || '/');
    } catch {
      // Ignore malformed and non-URL href values; required internal paths still fail closed below.
    }
  }
  return { rawHrefs, pathnames };
}

function writeDiagnostics() {
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(
    reportPath,
    `${JSON.stringify({ origin, sha, runId, generatedAt: new Date().toISOString(), surfaces: diagnostics }, null, 2)}\n`,
  );
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
  return { requestedUrl: url, response, body: await response.text() };
}

appendSummary('\n## Statewide financial discovery verification\n\n');
appendSummary('| Result | Surface | Contract |\n|---|---|---|\n');

for (const surface of surfaces) {
  const diagnostic = {
    path: surface.path,
    status: null,
    finalUrl: null,
    bodyBytes: null,
    anchorCount: null,
    sameOriginPathnames: [],
    rawHrefs: [],
    missingPeers: [],
    missingPageSignals: [],
    hasNoindex: null,
    error: null,
  };
  diagnostics.push(diagnostic);

  try {
    const { response, body } = await fetchProduction(surface.path);
    const canonical = `${origin}${surface.path}`;
    const { rawHrefs, pathnames: linkPathnames } = extractLinks(body);
    const missingPeers = surfaces
      .filter((item) => item.path !== surface.path)
      .map((item) => item.path)
      .filter((path) => !linkPathnames.has(path));
    const missingPageSignals = [surface.marker, canonical].filter((needle) => !body.includes(needle));
    const hasNoindex = /<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["'])/i.test(body);

    Object.assign(diagnostic, {
      status: response.status,
      finalUrl: response.url,
      bodyBytes: Buffer.byteLength(body),
      anchorCount: rawHrefs.length,
      sameOriginPathnames: [...linkPathnames].sort(),
      rawHrefs,
      missingPeers,
      missingPageSignals,
      hasNoindex,
    });

    if (!response.ok) fail(surface.path, `HTTP ${response.status}`);
    else if (hasNoindex) fail(surface.path, 'unexpected robots noindex');
    else if (missingPageSignals.length) fail(surface.path, `missing page signals: ${missingPageSignals.join(', ')}`);
    else if (missingPeers.length) fail(surface.path, `missing internal links to ${missingPeers.join(', ')}`);
    else {
      console.log(`[${surface.path}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${surface.path} | 200, canonical, indexable, page marker, reciprocal links to all four core planning surfaces |\n`);
    }
  } catch (error) {
    diagnostic.error = error instanceof Error ? error.message : String(error);
    fail(surface.path, diagnostic.error);
  }
}

writeDiagnostics();
console.log(`Statewide financial discovery diagnostics written to ${reportPath}.`);

if (process.exitCode) process.exit(process.exitCode);
console.log(`Statewide financial discovery verification passed for ${surfaces.length} mutually linked planning surfaces.`);