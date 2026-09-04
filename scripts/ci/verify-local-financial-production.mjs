import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

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

async function fetchProduction(path) {
  let lastError;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-Local-Financial-Smoke/1.0' },
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

    if (attempt < 4) await sleep(5_000);
  }

  throw lastError ?? new Error('production request failed');
}

appendSummary('\n## Local financial production verification\n\n');
appendSummary('| Result | Surface | Contract |\n|---|---|---|\n');

for (const page of affordabilityPages) {
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
    const hasNoindex = /<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["'])/i.test(body);
    if (!response.ok) fail(label, `HTTP ${response.status}`);
    else if (hasNoindex) fail(label, 'unexpected robots noindex');
    else if (missing.length) fail(label, `missing ${missing.join(', ')}`);
    else {
      console.log(`[${label}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${label} | 200, H1/copy, canonical, indexable, local tax + relocation links, WebApplication/BreadcrumbList/FAQPage |\n`);
    }
  } catch (error) {
    fail(label, error instanceof Error ? error.message : String(error));
  }
}

for (const page of costOfLivingPages) {
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
    const hasNoindex = /<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["'])/i.test(body);
    if (!response.ok) fail(label, `HTTP ${response.status}`);
    else if (hasNoindex) fail(label, 'unexpected robots noindex');
    else if (missing.length) fail(label, `missing ${missing.join(', ')}`);
    else {
      console.log(`[${label}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${label} | 200, title/H1/copy, canonical, indexable, local tax + relocation links, WebApplication/BreadcrumbList/FAQPage |\n`);
    }
  } catch (error) {
    fail(label, error instanceof Error ? error.message : String(error));
  }
}

for (const page of salaryNeededPages) {
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
    const hasNoindex = /<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["'])/i.test(body);
    if (!response.ok) fail(label, `HTTP ${response.status}`);
    else if (hasNoindex) fail(label, 'unexpected robots noindex');
    else if (missing.length) fail(label, `missing ${missing.join(', ')}`);
    else {
      console.log(`[${label}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${label} | 200, H1/copy, canonical, indexable, local cost + tax + relocation links, WebApplication/BreadcrumbList/FAQPage |\n`);
    }
  } catch (error) {
    fail(label, error instanceof Error ? error.message : String(error));
  }
}

for (const page of propertyTaxSamples) {
  const label = `property-tax:${page.path.split('/').at(-1)}`;
  try {
    const { response, body } = await fetchProduction(page.path);
    const canonicalUrl = `${origin}${page.path}`;
    const required = [page.name, 'property tax calculator', canonicalUrl, 'parcel', 'taxing'];
    const missing = required.filter((needle) => !body.toLowerCase().includes(needle.toLowerCase()));
    const hasNoindex = /<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["'])/i.test(body);
    if (!response.ok) fail(label, `HTTP ${response.status}`);
    else if (hasNoindex) fail(label, 'unexpected robots noindex');
    else if (missing.length) fail(label, `missing ${missing.join(', ')}`);
    else {
      console.log(`[${label}] verified (${response.status})`);
      appendSummary(`| ✅ pass | ${label} | 200, county context, canonical, indexable, parcel/taxing-unit explanation |\n`);
    }
  } catch (error) {
    fail(label, error instanceof Error ? error.message : String(error));
  }
}

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