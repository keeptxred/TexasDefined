import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const reportPath = process.env.STATEWIDE_FINANCIAL_DISCOVERY_REPORT ?? '.artifacts/statewide-financial-discovery.json';

const surfaces = [
  { path: '/texas-moving-cost-calculator', marker: 'Connect the one-time move to the monthly Texas budget', statusContext: 'td-fin-debug-moving' },
  { path: '/texas-cost-of-living-calculator', marker: 'Verify the categories that matter most to the move', statusContext: 'td-fin-debug-cost' },
  { path: '/texas-salary-comparison-by-city', marker: 'Compare income with the costs you will actually carry', statusContext: 'td-fin-debug-compare' },
  { path: '/texas-salary-calculator', marker: 'Compare pay with Texas living costs', statusContext: 'td-fin-debug-salary' },
  { path: '/texas-budget-planner', marker: 'Use the other Texas tools to improve the budget inputs', statusContext: 'td-fin-debug-budget' },
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

function formatLinkDiagnostics(body, rawHrefs, linkPathnames) {
  const pathSample = [...linkPathnames].sort().slice(0, 24);
  const hrefSample = rawHrefs.slice(0, 12);
  return [
    `bodyBytes=${Buffer.byteLength(body)}`,
    `anchors=${rawHrefs.length}`,
    `sameOriginPaths=${pathSample.length ? pathSample.join(';') : '(none)'}`,
    `hrefSample=${hrefSample.length ? hrefSample.join(';') : '(none)'}`,
  ].join(' | ');
}

function compactPath(path) {
  return path
    .replace('/texas-', '')
    .replace('-calculator', '')
    .replace('-by-city', '')
    .replace('-planner', '')
    .replaceAll('-', '_');
}

async function publishDiagnosticStatus(surface, diagnostic) {
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  if (!token || !repository || sha === 'local') return;

  const missingPeers = diagnostic.missingPeers.map(compactPath).join(',') || 'none';
  const missingSignals = diagnostic.missingPageSignals.length || 0;
  const description = [
    `http=${diagnostic.status ?? 'err'}`,
    `bytes=${diagnostic.bodyBytes ?? 0}`,
    `anchors=${diagnostic.anchorCount ?? 0}`,
    `missing=${missingPeers}`,
    `signals=${missingSignals}`,
    `noindex=${diagnostic.hasNoindex ? 1 : 0}`,
  ].join(' ');

  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/statuses/${sha}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state: diagnostic.error || diagnostic.status !== 200 || diagnostic.hasNoindex || diagnostic.missingPeers.length || diagnostic.missingPageSignals.length ? 'failure' : 'success',
        context: surface.statusContext,
        description: description.slice(0, 140),
      }),
    });
    if (!response.ok) console.log(`::warning title=Diagnostic status unavailable::${surface.path} status publication returned ${response.status}.`);
  } catch (error) {
    console.log(`::warning title=Diagnostic status unavailable::${surface.path}: ${error instanceof Error ? error.message : String(error)}`);
  }
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
    const linkDiagnostics = formatLinkDiagnostics(body, rawHrefs, linkPathnames);

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

    await publishDiagnosticStatus(surface, diagnostic);

    if (!response.ok) fail(surface.path, `HTTP ${response.status} | ${linkDiagnostics}`);
    else if (hasNoindex) fail(surface.path, `unexpected robots noindex | ${linkDiagnostics}`);
    else if (missingPageSignals.length) fail(surface.path, `missing page signals: ${missingPageSignals.join(', ')} | ${linkDiagnostics}`);
    else if (missingPeers.length) fail(surface.path, `missing internal links to ${missingPeers.join(', ')} | ${linkDiagnostics}`);
    else {
      console.log(`[${surface.path}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${surface.path} | 200, canonical, indexable, page marker, reciprocal links to all four core planning surfaces |\n`);
    }
  } catch (error) {
    diagnostic.error = error instanceof Error ? error.message : String(error);
    await publishDiagnosticStatus(surface, diagnostic);
    fail(surface.path, diagnostic.error);
  }
}

writeDiagnostics();
console.log(`Statewide financial discovery diagnostics written to ${reportPath}.`);

if (process.exitCode) process.exit(process.exitCode);
console.log(`Statewide financial discovery verification passed for ${surfaces.length} mutually linked planning surfaces.`);