import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const propertySlugs = [
  'houston', 'austin', 'frisco',
  'harris-county', 'dallas-county', 'tarrant-county', 'bexar-county', 'travis-county', 'collin-county',
  'denton-county', 'fort-bend-county', 'montgomery-county', 'williamson-county', 'el-paso-county', 'hidalgo-county',
];
const housingSlugs = [
  'houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso',
  'harris-county', 'dallas-county', 'tarrant-county', 'bexar-county', 'travis-county', 'collin-county',
  'denton-county', 'fort-bend-county', 'montgomery-county', 'williamson-county', 'el-paso-county', 'hidalgo-county',
];
const costSlugs = ['houston', 'austin', 'dallas', 'fort-worth', 'san-antonio', 'frisco', 'el-paso'];

const families = [
  { legacy: '/property-tax-calculator', canonical: '/texas-property-tax-estimator', slugs: propertySlugs },
  { legacy: '/texas-home-affordability-calculator', canonical: '/texas-home-affordability-calculator', slugs: housingSlugs },
  { legacy: '/texas-homeownership-cost-calculator', canonical: '/texas-homeownership-cost-calculator', slugs: housingSlugs },
  { legacy: '/texas-home-insurance-calculator', canonical: '/texas-home-insurance-calculator', slugs: housingSlugs },
  { legacy: '/texas-mortgage-calculator', canonical: '/texas-mortgage-calculator', slugs: housingSlugs },
  { legacy: '/texas-cost-of-living-calculator', canonical: '/texas-cost-of-living-calculator', slugs: costSlugs },
  { legacy: '/texas-salary-needed-calculator', canonical: '/texas-salary-needed-calculator', slugs: costSlugs },
];
const canonicalPages = [...new Set(families.map((family) => family.canonical))];
const retiredPaths = families.flatMap((family) => family.slugs.map((slug) => `${family.legacy}/${slug}`));
const expectedLegacyInventory = '105 legacy local calculator URLs';
const expectedCanonicalInventory = '7 canonical calculator pages';
if (retiredPaths.length !== 105) throw new Error(`${expectedLegacyInventory} expected; found ${retiredPaths.length}.`);
if (canonicalPages.length !== 7) throw new Error(`${expectedCanonicalInventory} expected; found ${canonicalPages.length}.`);

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}
function fail(label, message) {
  console.error(`::error title=LOCAL FINANCIAL PRODUCTION failure::${label}: ${message}`);
  appendSummary(`| ❌ FAIL | ${label} | ${String(message).replaceAll('|', '\\|')} |\n`);
  process.exitCode = 1;
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, redirect = 'follow') {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    try {
      const response = await fetch(url, {
        redirect,
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-Consolidated-Financial/2.0' },
      });
      const body = redirect === 'manual' ? '' : await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (!challenged) return { response, body };
      lastError = new Error('Cloudflare returned cf-mitigated: challenge');
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 4) await sleep(5_000);
  }
  throw lastError ?? new Error('production request failed');
}

appendSummary('\n## Consolidated financial production verification\n\n');
appendSummary('| Result | Surface | Contract |\n|---|---|---|\n');

for (const path of canonicalPages) {
  try {
    const { response, body } = await request(path);
    const canonicalUrl = `${origin}${path}`;
    const hasCanonical = body.includes(`href=\"${canonicalUrl}\"`) || body.includes(`href='${canonicalUrl}'`);
    const hasNoindex = /<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["'])/i.test(body);
    if (response.status !== 200) fail(path, `expected 200, got ${response.status}`);
    else if (!hasCanonical) fail(path, `missing canonical ${canonicalUrl}`);
    else if (hasNoindex) fail(path, 'unexpected robots noindex');
    else {
      appendSummary(`| ✅ pass | ${path} | 200, self-canonical, indexable |\n`);
      console.log(`[canonical] ${path} verified`);
    }
  } catch (error) {
    fail(path, error instanceof Error ? error.message : String(error));
  }
}

for (const family of families) {
  for (const slug of family.slugs) {
    const path = `${family.legacy}/${slug}`;
    try {
      const { response } = await request(path, 'manual');
      const location = response.headers.get('location') ?? '';
      const expected = `${family.canonical}#${slug}`;
      const acceptedLocations = [expected, `${origin}${expected}`];
      if (response.status !== 301) fail(path, `expected 301, got ${response.status}`);
      else if (!acceptedLocations.includes(location)) fail(path, `expected Location ${expected}, got ${location || '(missing)'}`);
    } catch (error) {
      fail(path, error instanceof Error ? error.message : String(error));
    }
  }
  const invalidPath = `${family.legacy}/not-a-governed-location`;
  try {
    const { response } = await request(invalidPath, 'manual');
    if (response.status !== 404) fail(invalidPath, `expected fail-closed 404, got ${response.status}`);
  } catch (error) {
    fail(invalidPath, error instanceof Error ? error.message : String(error));
  }
}
appendSummary(`| ✅ checked | legacy local calculators | ${retiredPaths.length} governed legacy URLs require permanent canonical+fragment redirects; seven invalid slugs require 404 |\n`);

try {
  const { response, body } = await request('/sitemap.xml');
  if (response.status !== 200) fail('sitemap', `expected 200, got ${response.status}`);
  for (const path of canonicalPages) {
    if (!body.includes(`${origin}${path}`)) fail('sitemap', `missing canonical calculator ${path}`);
  }
  for (const path of retiredPaths) {
    if (body.includes(`${origin}${path}`)) fail('sitemap', `retired local URL still emitted: ${path}`);
  }
  if (!process.exitCode) appendSummary(`| ✅ pass | sitemap | all ${canonicalPages.length} canonical calculators present; all ${retiredPaths.length} retired local URLs absent |\n`);
} catch (error) {
  fail('sitemap', error instanceof Error ? error.message : String(error));
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`Consolidated financial production verification passed: ${expectedCanonicalInventory}, ${expectedLegacyInventory} permanently redirect, seven invalid-slug 404 checks, and sitemap consolidation.`);
