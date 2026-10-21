import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const FETCH_ATTEMPTS = 3;
const FETCH_TIMEOUT_MS = 15_000;
const FETCH_RETRY_DELAY_MS = 1_500;
const VERIFY_CONCURRENCY = 4;

const cityMappings = [
  { slug: 'houston', name: 'Houston', tax: '/property-tax-calculator/houston', relocation: '/article/moving-to-houston-address-checklist' },
  { slug: 'austin', name: 'Austin', tax: '/property-tax-calculator/austin', relocation: '/article/moving-to-austin-guide' },
  { slug: 'dallas', name: 'Dallas', tax: '/property-tax-calculator/dallas-county', relocation: '/article/moving-to-dallas-fort-worth-guide' },
  { slug: 'fort-worth', name: 'Fort Worth', tax: '/property-tax-calculator/tarrant-county', relocation: '/article/moving-to-dallas-fort-worth-guide' },
  { slug: 'san-antonio', name: 'San Antonio', tax: '/property-tax-calculator/bexar-county', relocation: '/article/moving-to-san-antonio-guide' },
  { slug: 'frisco', name: 'Frisco', tax: '/property-tax-calculator/frisco', relocation: '/article/moving-to-dallas-fort-worth-guide' },
  { slug: 'el-paso', name: 'El Paso', tax: '/property-tax-calculator/el-paso-county', relocation: '/article/moving-to-el-paso-guide' },
];

const affordabilityPages = cityMappings.map((item) => ({ ...item, path: `/texas-home-affordability-calculator/${item.slug}` }));
const costOfLivingPages = cityMappings.map((item) => ({ ...item, path: `/texas-cost-of-living-calculator/${item.slug}` }));
const salaryNeededPages = cityMappings.map((item) => ({ ...item, path: `/texas-salary-needed-calculator/${item.slug}`, costPath: `/texas-cost-of-living-calculator/${item.slug}` }));

const propertyTaxSamples = [
  { path: '/property-tax-calculator/dallas-county', name: 'Dallas County' },
  { path: '/property-tax-calculator/tarrant-county', name: 'Tarrant County' },
  { path: '/property-tax-calculator/bexar-county', name: 'Bexar County' },
  { path: '/property-tax-calculator/el-paso-county', name: 'El Paso County' },
];

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

function fail(label, message) {
  console.error(`::error title=LOCAL FINANCIAL PRODUCTION failure::${label}: ${message}`);
  appendSummary(`| ❌ FAIL | ${label} | ${message.replaceAll('|', '\\|')} |\n`);
  process.exitCode = 1;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchProduction(path, baseOrigin = origin) {
  let lastError;

  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${baseOrigin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: {
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'user-agent': 'TexasDefined-CI-Local-Financial-Smoke/2.0',
        },
      });
      const body = await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';

      if (!challenged && response.ok) return { response, body };

      lastError = new Error(challenged ? 'Cloudflare returned cf-mitigated: challenge' : `HTTP ${response.status}`);
      console.log(`[local-financial:${path}] attempt ${attempt} failed: ${lastError.message}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.log(`[local-financial:${path}] attempt ${attempt} failed: ${lastError.message}`);
    }

    if (attempt < FETCH_ATTEMPTS) await sleep(FETCH_RETRY_DELAY_MS);
  }

  throw lastError ?? new Error('production request failed');
}

async function runWithConcurrency(items, worker, limit = VERIFY_CONCURRENCY) {
  let nextIndex = 0;
  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      if (currentIndex >= items.length) return;
      await worker(items[currentIndex]);
    }
  }));
}

function hasNoindex(body) {
  return /<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["'])/i.test(body);
}

async function verifyAffordability(page) {
  const label = `affordability:${page.slug}`;
  try {
    const { response, body } = await fetchProduction(page.path);
    const canonicalUrl = `${origin}${page.path}`;
    const required = [
      `${page.name} home affordability calculator`,
      `href="${page.tax}"`,
      `href="${page.relocation}"`,
      canonicalUrl,
      'WebApplication',
      'BreadcrumbList',
      'FAQPage',
      'This is a planning calculator',
    ];
    const missing = required.filter((needle) => !body.includes(needle));
    if (!response.ok) fail(label, `HTTP ${response.status}`);
    else if (hasNoindex(body)) fail(label, 'unexpected robots noindex');
    else if (missing.length) fail(label, `missing ${missing.join(', ')}`);
    else {
      console.log(`[${label}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${label} | 200, H1/copy, canonical, indexable, local tax + relocation links, WebApplication/BreadcrumbList/FAQPage |\n`);
    }
  } catch (error) {
    fail(label, error instanceof Error ? error.message : String(error));
  }
}

async function verifyCostOfLiving(page) {
  const label = `cost-of-living:${page.slug}`;
  try {
    const { response, body } = await fetchProduction(page.path);
    const canonicalUrl = `${origin}${page.path}`;
    const required = [
      `${page.name} cost of living calculator`,
      `${page.name} Cost of Living Calculator | Texas Defined`,
      `href="${page.tax}"`,
      `href="${page.relocation}"`,
      canonicalUrl,
      'WebApplication',
      'BreadcrumbList',
      'FAQPage',
      'No citywide average or preset local index is used.',
      'Planning only.',
    ];
    const missing = required.filter((needle) => !body.includes(needle));
    if (!response.ok) fail(label, `HTTP ${response.status}`);
    else if (hasNoindex(body)) fail(label, 'unexpected robots noindex');
    else if (missing.length) fail(label, `missing ${missing.join(', ')}`);
    else {
      console.log(`[${label}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${label} | 200, title/H1/copy, canonical, indexable, local tax + relocation links, WebApplication/BreadcrumbList/FAQPage |\n`);
    }
  } catch (error) {
    fail(label, error instanceof Error ? error.message : String(error));
  }
}

async function verifySalaryNeeded(page) {
  const label = `salary-needed:${page.slug}`;
  try {
    const { response, body } = await fetchProduction(page.path);
    const canonicalUrl = `${origin}${page.path}`;
    const required = [
      `Salary needed to live in ${page.name} calculator`,
      `href="${page.costPath}"`,
      `href="${page.tax}"`,
      `href="${page.relocation}"`,
      canonicalUrl,
      'WebApplication',
      'BreadcrumbList',
      'FAQPage',
      'Monthly household budget',
      'Planning only.',
    ];
    const missing = required.filter((needle) => !body.includes(needle));
    if (!response.ok) fail(label, `HTTP ${response.status}`);
    else if (hasNoindex(body)) fail(label, 'unexpected robots noindex');
    else if (missing.length) fail(label, `missing ${missing.join(', ')}`);
    else {
      console.log(`[${label}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${label} | 200, H1/copy, canonical, indexable, local cost + tax + relocation links, WebApplication/BreadcrumbList/FAQPage |\n`);
    }
  } catch (error) {
    fail(label, error instanceof Error ? error.message : String(error));
  }
}

async function verifyPropertyTax(page) {
  const label = `property-tax:${page.path.split('/').at(-1)}`;
  try {
    const { response, body } = await fetchProduction(page.path);
    const canonicalUrl = `${origin}${page.path}`;
    const required = [page.name, 'property tax calculator', canonicalUrl, 'parcel', 'taxing'];
    const lowerBody = body.toLowerCase();
    const missing = required.filter((needle) => !lowerBody.includes(needle.toLowerCase()));
    if (!response.ok) fail(label, `HTTP ${response.status}`);
    else if (hasNoindex(body)) fail(label, 'unexpected robots noindex');
    else if (missing.length) fail(label, `missing ${missing.join(', ')}`);
    else {
      console.log(`[${label}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${label} | 200, county context, canonical, indexable, parcel/taxing-unit explanation |\n`);
    }
  } catch (error) {
    fail(label, error instanceof Error ? error.message : String(error));
  }
}

// A prior statewide importer mapped empty historical M&O / I&S fields to zero.
// Keep the affected Escobares city history source-qualified on both production
// entry points, including the independently documented 2024 local supplement.
async function verifyEscobaresTaxingUnit() {
  const path = '/property-tax/taxing-unit/escobares';
  for (const [label, baseOrigin] of [
    ['canonical', origin],
    ['direct-worker', 'https://texasdefined-site.freddy-coppola.workers.dev'],
  ]) {
    const check = `taxing-unit:escobares:${label}`;
    try {
      const { response, body } = await fetchProduction(path, baseOrigin);
      const required = [
        'Escobares property tax rate',
        'Annual tax rates, with source distinctions',
        '0.340447',
        '0.263594',
        '0.076853',
        '0.314658',
        '2024-tax-rates-2.pdf',
        'Starr CAD report',
        'Locally verified',
      ];
      // React SSR may split visible phrases with hydration comments or nested tags.
      // Compare readable text as well as raw HTML without relaxing numeric/source checks.
      const readableText = body
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ');
      const missing = required.filter((needle) => !body.includes(needle) && !readableText.includes(needle));
      if (!response.ok) fail(check, `HTTP ${response.status}`);
      else if (hasNoindex(body)) fail(check, 'unexpected robots noindex');
      else if (missing.length) fail(check, `missing verified content: ${missing.join(', ')}`);
      else if (body.includes('>0.000000<')) fail(check, 'legacy missing historical components still rendered as zero');
      else {
        console.log(`[${check}] verified local 2024 total, M&O, I&S and source evidence (HTTP ${response.status})`);
        appendSummary(`| ✅ pass | ${check} | 2024 0.340447 = 0.263594 + 0.076853; local source cited; no legacy zero components |\n`);
      }
    } catch (error) {
      fail(check, error instanceof Error ? error.message : String(error));
    }
  }
}

appendSummary('\n## Local financial production verification\n\n');
appendSummary('| Result | Surface | Contract |\n|---|---|---|\n');

await runWithConcurrency(affordabilityPages, verifyAffordability);
await runWithConcurrency(costOfLivingPages, verifyCostOfLiving);
await runWithConcurrency(salaryNeededPages, verifySalaryNeeded);
await runWithConcurrency(propertyTaxSamples, verifyPropertyTax);
await verifyEscobaresTaxingUnit();

try {
  const { response, body } = await fetchProduction('/sitemap.xml');
  if (!response.ok) fail('sitemap', `HTTP ${response.status}`);
  else {
    const expectedPaths = [
      ...affordabilityPages.map((page) => page.path),
      ...costOfLivingPages.map((page) => page.path),
      ...salaryNeededPages.map((page) => page.path),
      ...propertyTaxSamples.map((page) => page.path),
    ];
    const missing = expectedPaths.filter((path) => !body.includes(`${origin}${path}`));
    if (missing.length) fail('sitemap', `missing ${missing.join(', ')}`);
    else {
      console.log(`[sitemap] verified ${expectedPaths.length} local financial URLs`);
      appendSummary(`| ✅ pass | sitemap | all ${expectedPaths.length} checked local financial URLs present |\n`);
    }
  }
} catch (error) {
  fail('sitemap', error instanceof Error ? error.message : String(error));
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`Local financial production verification passed (${affordabilityPages.length} affordability pages, ${costOfLivingPages.length} cost-of-living pages, ${salaryNeededPages.length} salary-needed pages, ${propertyTaxSamples.length} property-tax samples, sitemap membership).`);
