const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();

const sectors = [
  ['energy-power', 'Energy & Power', ['Harris County', 'Midland County']],
  ['technology-semiconductors', 'Technology & Semiconductors', ['Grayson County']],
  ['advanced-manufacturing', 'Advanced Manufacturing', ['Bexar County']],
  ['trade-transportation-logistics', 'Trade, Transportation & Logistics', ['Webb County']],
  ['aerospace-aviation-defense', 'Aerospace, Aviation & Defense', ['Bexar County']],
  ['healthcare-life-sciences', 'Healthcare & Life Sciences', ['Harris County']],
  ['agriculture-livestock', 'Agriculture & Livestock', ['Dallam County']],
  ['financial-services', 'Financial Services', ['Dallas County']],
  ['construction-real-estate', 'Construction & Real Estate', ['Harris County']],
  ['corporate-professional-services', 'Corporate & Professional Services', ['Dallas County']],
  ['hospitality-tourism-culture', 'Hospitality, Tourism & Culture', ['Galveston County']],
];

const reciprocalCountyChecks = [
  ['harris', 'energy-power'],
  ['webb', 'trade-transportation-logistics'],
  ['grayson', 'technology-semiconductors'],
  ['midland', 'energy-power'],
  ['bexar', 'aerospace-aviation-defense'],
  ['dallam', 'agriculture-livestock'],
];

const expectedPaths = ['/texas-industries', ...sectors.map(([slug]) => `/texas-industries/${slug}`)];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const escapeRegex = (value) => value.replace(/[.*+?^$\{\}()|[\]\\]/g, '\\$&');

async function fetchWithRetry(path, label, { attempts = 6, cacheBust = true } = {}) {
  let last = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const suffix = cacheBust ? `${separator}verify=${encodeURIComponent(`${sha}-${runId}-${label}-${attempt}`)}` : '';
    const url = `${origin}${path}${suffix}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Industries-Production-Smoke/1.0' },
      });
      const body = await response.text();
      last = { response, body, url, attempt };
      if (response.status < 500 && response.headers.get('cf-mitigated')?.toLowerCase() !== 'challenge') return last;
    } catch (error) {
      last = { error, url, attempt };
    }
    if (attempt < attempts) await sleep(5_000);
  }
  return last;
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function hasCanonical(html, canonicalUrl) {
  const value = escapeRegex(canonicalUrl);
  return new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${value}["']|<link[^>]+href=["']${value}["'][^>]+rel=["']canonical["']`, 'i').test(html);
}

function hasNoindex(html) {
  return /<meta\b[^>]*(?:name=["']robots["'][^>]*content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["'])/i.test(html);
}

async function verifyPage(path, label, needles, schemaTypes = []) {
  const result = await fetchWithRetry(path, label);
  requireCondition(result?.response, `${label}: request never produced an HTTP response.`);
  requireCondition(result.response.status === 200, `${label}: expected HTTP 200, received ${result.response.status}.`);
  requireCondition(!hasNoindex(result.body), `${label}: indexable authority page unexpectedly contains noindex.`);
  requireCondition(hasCanonical(result.body, `${origin}${path}`), `${label}: canonical tag is missing or incorrect.`);
  for (const needle of needles) requireCondition(result.body.includes(needle), `${label}: missing production marker "${needle}".`);
  for (const schemaType of schemaTypes) requireCondition(result.body.includes(schemaType), `${label}: missing structured-data marker "${schemaType}".`);
  console.log(`PASS ${label}: HTTP 200, canonical/indexability and required production markers verified.`);
  return result.body;
}

await verifyPage(
  '/texas-industries',
  'industry hub',
  ['The industries that power Texas', 'Industry is part of the TexasDefined place graph'],
  ['CollectionPage', 'ItemList', 'BreadcrumbList'],
);

for (const [slug, title, countyNeedles] of sectors) {
  await verifyPage(
    `/texas-industries/${slug}`,
    `industry sector ${slug}`,
    [title, 'How the sector evolved', 'Representative roles and common training pathways', 'Where the industry clusters in Texas', ...countyNeedles],
    ['BreadcrumbList'],
  );
}

const invalid = await fetchWithRetry('/texas-industries/not-a-real-sector', 'invalid-industry-slug');
requireCondition(invalid?.response, 'invalid industry slug: request never produced an HTTP response.');
requireCondition(
  invalid.response.status === 404 || (invalid.response.status === 200 && hasNoindex(invalid.body)),
  `invalid industry slug: expected HTTP 404 or a noindex response, received HTTP ${invalid.response.status} without noindex.`,
);
console.log(`PASS invalid industry slug: HTTP ${invalid.response.status}${hasNoindex(invalid.body) ? ' with noindex' : ''}.`);

const sitemap = await fetchWithRetry('/sitemap.xml', 'industry-sitemap', { cacheBust: false });
requireCondition(sitemap?.response?.status === 200, `industry sitemap: expected HTTP 200, received ${sitemap?.response?.status ?? 'no response'}.`);
for (const path of expectedPaths) requireCondition(sitemap.body.includes(`${origin}${path}`), `industry sitemap missing ${path}.`);
console.log('PASS industry sitemap: all 12 canonical industry URLs are present.');

const llms = await fetchWithRetry('/llms.txt', 'industry-llms', { cacheBust: false });
requireCondition(llms?.response?.status === 200, `industry llms.txt: expected HTTP 200, received ${llms?.response?.status ?? 'no response'}.`);
for (const path of expectedPaths) requireCondition(llms.body.includes(`${origin}${path}`), `industry llms.txt missing ${path}.`);
console.log('PASS industry llms.txt: all 12 canonical industry URLs are discoverable.');

for (const [countySlug, sectorSlug] of reciprocalCountyChecks) {
  const result = await fetchWithRetry(`/county/${countySlug}`, `county-${countySlug}-industry-${sectorSlug}`);
  requireCondition(result?.response?.status === 200, `county ${countySlug}: expected HTTP 200, received ${result?.response?.status ?? 'no response'}.`);
  requireCondition(
    result.body.includes(`href="/texas-industries/${sectorSlug}"`) || result.body.includes(`href='${'/texas-industries/'}${sectorSlug}'`),
    `county ${countySlug}: reciprocal industry link to ${sectorSlug} is missing from SSR HTML.`,
  );
  console.log(`PASS reciprocal county link: ${countySlug} → ${sectorSlug}.`);
}

console.log(`Texas industries production verification passed: 12 canonical industry pages, invalid-slug indexability, sitemap/llms discovery, canonical/schema markers, authority-depth markers and ${reciprocalCountyChecks.length} representative reciprocal county links are live.`);
