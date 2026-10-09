import fs from 'node:fs/promises';
import path from 'node:path';

const DIRECTORY_URL = 'https://comptroller.texas.gov/taxes/property-tax/county-directory/';
const OUTPUT = path.join(process.cwd(), 'src', 'data', 'property', 'county-property-enrichment.generated.ts');
const USER_AGENT = 'TexasDefined county property verifier/1.0';
const CONCURRENCY = 8;
const AUDIT_ONLY = process.argv.includes('--audit-only');
const SOURCE_MAX_AGE_DAYS = 730;
const MIN_RETAINED_RATIO = 0.75;

const directoryHtml = await fetchText(DIRECTORY_URL);
const counties = parseCountyDirectory(directoryHtml);
if (counties.length !== 254) throw new Error(`Expected 254 Comptroller county pages; found ${counties.length}.`);
const countyCatalog = await fs.readFile('src/data/texas-places.ts', 'utf8');
const namesLiteral = /const COUNTY_NAMES\\s*=\\s*`([^`]*)`/.exec(countyCatalog)?.[1];
if (!namesLiteral) throw new Error('Cannot read canonical county names for office crosswalk');
const canonicalSlugs = new Set(namesLiteral.split('|').map(slugify));
const directorySlugs = new Set(counties.map((county) => county.slug));
const unmatched = [...canonicalSlugs].filter((slug) => !directorySlugs.has(slug));
const unexpected = [...directorySlugs].filter((slug) => !canonicalSlugs.has(slug));
if (unmatched.length || unexpected.length || directorySlugs.size !== 254) {
  throw new Error(`Comptroller county directory crosswalk mismatch: missing [${unmatched.join(', ')}], unexpected [${unexpected.join(', ')}]`);
}


const requested = process.argv.find((arg) => arg.startsWith('--county='))?.split('=')[1]?.trim().toLowerCase();
const selected = requested ? counties.filter((county) => county.slug === requested) : counties;
if (requested && selected.length !== 1) throw new Error(`Unknown county slug: ${requested}`);

const results = [];
for (let index = 0; index < selected.length; index += CONCURRENCY) {
  const batch = selected.slice(index, index + CONCURRENCY);
  const batchResults = await Promise.all(batch.map(async (county) => {
    try {
      const html = await fetchText(county.url);
      const appraisal = parseOfficeSection(html, 'Appraisal District', 'Tax Assessor/Collector');
      const taxOffice = parseOfficeSection(html, 'Tax Assessor/Collector');
      return {
        county, fetched: true,
        enrichment: parseCountyPage(html, county.url),
        audit: {
          appraisalUrl: appraisal.websiteUrl ?? null,
          appraisalSourceUpdated: appraisal.lastUpdated ?? null,
          taxOfficeUrl: taxOffice.websiteUrl ?? null,
          taxOfficeSourceUpdated: taxOffice.lastUpdated ?? null,
          appraisalCurrent: isFreshSourceDate(appraisal.lastUpdated),
          taxOfficeCurrent: isFreshSourceDate(taxOffice.lastUpdated),
        },
      };
    } catch (error) {
      console.error(`Unable to sync ${county.slug}:`, error instanceof Error ? error.message : String(error));
      return { county, fetched: false, enrichment: null };
    }
  }));
  results.push(...batchResults);
}

if (AUDIT_ONLY) {
  // Audit is deliberately read-only. Stale/missing official contacts are
  // problems for the research queue, never fresh verified data to publish.
  const now = new Date().toISOString().slice(0, 10);
  const rows = results.map((result) => ({
    county: result.county.slug,
    comptrollerUrl: result.county.url,
    checkedAt: now,
    state: !result.fetched ? 'source-fetch-failed'
      : result.enrichment ? 'current-source-record'
      : 'missing-or-stale-contact',
    ...result.audit,
  }));
  const filename = '/tmp/county-government-links-audit';
  await fs.writeFile(`${filename}.json`, JSON.stringify({
    generatedAt: new Date().toISOString(),
    officialDirectory: DIRECTORY_URL,
    sourceRuleMaxAgeDays: SOURCE_MAX_AGE_DAYS,
    countyCount: rows.length,
    verifiedCurrent: rows.filter((r) => r.state === 'current-source-record').length,
    missingOrStale: rows.filter((r) => r.state === 'missing-or-stale-contact').length,
    unreachableOfficialSources: rows.filter((r) => r.state === 'source-fetch-failed').length,
    note: 'A current Comptroller directory listing does not independently verify downstream county office websites, personnel or hours.',
    rows,
  }, null, 2) + '\n');
  const cols = ['county', 'state', 'comptrollerUrl', 'appraisalUrl',
    'appraisalSourceUpdated', 'taxOfficeUrl', 'taxOfficeSourceUpdated', 'checkedAt'];
  const cell = (value) => String(value ?? '').replace(/[\t\r\n]+/g, ' ');
  await fs.writeFile(`${filename}.tsv`,
    cols.join('\t') + '\n' + rows.map((row) => cols.map((column) => cell(row[column])).join('\t')).join('\n') + '\n');
  console.log(`OFFICIAL SOURCE AUDIT: ${rows.length} counties, ${rows.filter((r) => r.state === 'current-source-record').length} current office records, ${rows.filter((r) => r.state === 'missing-or-stale-contact').length} missing/stale, ${rows.filter((r) => r.state === 'source-fetch-failed').length} unreachable. See ${filename}.json and .tsv; unresolved records require source review.`);
  if (rows.length !== 254 && !requested) process.exitCode = 1;
  // Do not write the generated property dataset in read-only audit mode.
} else {
let merged = {};
try {
  const existing = await fs.readFile(OUTPUT, 'utf8');
  merged = parseExistingSnapshot(existing);
} catch {}
const previousCount = Object.keys(merged).length;

for (const { county, fetched, enrichment } of results) {
  if (enrichment) merged[county.slug] = enrichment;
  else if (fetched) delete merged[county.slug];
}

const ordered = Object.fromEntries(Object.entries(merged).sort(([a], [b]) => a.localeCompare(b)));
const nextCount = Object.keys(ordered).length;
if (!requested && previousCount >= 4 && nextCount < Math.floor(previousCount * MIN_RETAINED_RATIO)) {
  throw new Error(`Refusing statewide county-property refresh that would shrink verified coverage from ${previousCount} to ${nextCount}. This likely indicates an upstream markup/parser failure; investigate before accepting a large withdrawal.`);
}

await fs.writeFile(OUTPUT, renderSnapshot(ordered));
const refreshed = results.filter((item) => item.enrichment).length;
const withdrawn = results.filter((item) => item.fetched && !item.enrichment).length;
console.log(`County property snapshot now contains ${nextCount} verified counties; refreshed ${refreshed}; withheld or withdrew ${withdrawn} because required office data was missing or stale.`);
} // End update-only branch; --audit-only never alters checked-in source data.

function parseCountyDirectory(html) {
  const items = [];
  const seen = new Set();
  // The Comptroller sometimes uses relative hrefs (anderson.php) rather than
  // /county-directory/anderson.php. Resolve both forms to the exact official
  // directory path and require the three-digit county index in the link label.
  const pattern = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const directoryPath = new URL(DIRECTORY_URL).pathname;
  for (const match of html.matchAll(pattern)) {
    const labelText = stripHtml(match[2]).trim();
    const indexed = /^(\d{3})\s+(.+)$/.exec(labelText);
    if (!indexed) continue;
    const label = indexed[2].trim();
    // Texas Comptroller's 064 entry names this county "Dimmitt" in its
    // directory even though the legal county name is Dimmit. Do not confuse
    // it with Dimmitt, the county seat of Castro County.
    const slug = slugify(label) === 'dimmitt' ? 'dimmit' : slugify(label);
    let url;
    try { url = new URL(match[1], DIRECTORY_URL); }
    catch { continue; }
    if (url.origin !== new URL(DIRECTORY_URL).origin
      || !url.pathname.startsWith(directoryPath)
      || !/\/[a-z0-9-]+\.php$/i.test(url.pathname)) continue;
    if (seen.has(slug)) continue;
    seen.add(slug);
    items.push({ slug, name: label, url: url.toString() });
  }
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

function parseCountyPage(html, sourceUrl) {
  const appraisal = parseOfficeSection(html, 'Appraisal District', 'Tax Assessor/Collector');
  const taxOffice = parseOfficeSection(html, 'Tax Assessor/Collector');
  const sourceChecked = new Date().toISOString().slice(0, 10);

  if (!appraisal.websiteUrl || !taxOffice.websiteUrl) return null;
  if (!isFreshSourceDate(appraisal.lastUpdated) || !isFreshSourceDate(taxOffice.lastUpdated)) return null;

  const appraisalUpdated = appraisal.lastUpdated;
  const taxUpdated = taxOffice.lastUpdated;
  const { lastUpdated: _appraisalUpdated, ...appraisalContact } = appraisal;
  const { lastUpdated: _taxUpdated, ...taxOfficeContact } = taxOffice;
  return {
    appraisalDistrict: appraisalContact,
    taxOffice: taxOfficeContact,
    links: {
      appraisalDistrictUrl: appraisal.websiteUrl,
      taxOfficeUrl: taxOffice.websiteUrl,
    },
    sourceUpdatedAt: {
      appraisalDistrict: appraisalUpdated,
      taxOffice: taxUpdated,
    },
    lastVerifiedAt: sourceChecked,
    sourceUrls: [sourceUrl, appraisal.websiteUrl, taxOffice.websiteUrl],
  };
}

function parseOfficeSection(html, heading, nextHeading) {
  const start = new RegExp(`<h3[^>]*>\\s*${escapeRegExp(heading)}\\s*<\\/h3>`, 'i').exec(html);
  if (!start) return {};
  const remainder = html.slice(start.index + start[0].length);
  const end = nextHeading
    ? new RegExp(`<h3[^>]*>\\s*${escapeRegExp(nextHeading)}\\s*<\\/h3>`, 'i').exec(remainder)?.index
    : remainder.search(/<h2[^>]*>|<footer[^>]*>/i);
  const section = remainder.slice(0, end != null && end >= 0 ? end : undefined);
  const website = /Web(?:site| site):\s*(?:<[^>]+>\s*)*<a[^>]+href=["']([^"']+)["']/i.exec(section)?.[1]
    ?? /Web(?:site| site):\s*(?:<[^>]+>\s*)*([^<\r\n]+)/i.exec(section)?.[1];
  const emailHref = /href=["']mailto:([^"']+)["']/i.exec(section)?.[1];
  const emailText = /Email:\s*(?:<[^>]+>\s*)*([^<\r\n]+)/i.exec(section)?.[1];
  const phone = textAfterLabel(section, 'Phone');
  const lastUpdated = normalizeSourceDate(textAfterLabel(section, 'Last Updated'));
  const personLabel = heading === 'Appraisal District' ? 'Chief Appraiser' : 'Tax Assessor-Collector';
  const name = textAfterHeading(section, personLabel) ?? textAfterLabel(section, personLabel);
  const address = extractStreetAddress(section);
  return compact({
    name: cleanText(name),
    websiteUrl: normalizeExternalUrl(website),
    phone: cleanText(phone),
    address,
    email: cleanText(emailHref ? decodeEntities(emailHref) : emailText),
    lastUpdated,
  });
}

function isFreshSourceDate(value) {
  if (!value) return false;
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return false;
  const ageMs = Date.now() - timestamp;
  if (ageMs < 0) return false;
  return ageMs <= SOURCE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
}

function normalizeSourceDate(value) {
  const cleaned = cleanText(value);
  if (!cleaned) return undefined;
  const date = new Date(cleaned);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

function textAfterLabel(section, label) {
  const match = new RegExp(`${escapeRegExp(label)}:\\s*(?:<[^>]+>\\s*)*([^<\\r\\n]+)`, 'i').exec(section);
  return match?.[1];
}

function textAfterHeading(section, label) {
  const match = new RegExp(`<h4[^>]*>\\s*${escapeRegExp(label)}:\\s*([\\s\\S]*?)<\\/h4>`, 'i').exec(section);
  return match?.[1];
}

function extractStreetAddress(section) {
  const marker = /<h4[^>]*>\s*Street Address\s*<\/h4>/i.exec(section);
  if (!marker) return undefined;
  const after = section.slice(marker.index + marker[0].length);
  const end = after.search(/<h4[^>]*>|<h3[^>]*>/i);
  return cleanText(stripHtml(after.slice(0, end >= 0 ? end : undefined)));
}

function parseExistingSnapshot(text) {
  const marker = 'export const COUNTY_PROPERTY_ENRICHMENT';
  if (!text.includes(marker)) return {};
  const body = text.slice(text.indexOf('= {', text.indexOf(marker)) + 2, text.lastIndexOf('\n};') + 2);
  const jsonLike = body
    .replace(/([,{]\s*)([a-z][a-z0-9-]*):/gi, '$1"$2":')
    .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (_, value) => JSON.stringify(value.replace(/\\'/g, "'")));
  try { return JSON.parse(jsonLike); } catch { return {}; }
}

function renderSnapshot(records) {
  const lines = [
    "import type { CountyOfficeContact, CountyPropertyLinks } from '@/data/property/county-property-schema';",
    '',
    'export type CountyPropertyEnrichment = {',
    '  appraisalDistrict: Partial<CountyOfficeContact>;',
    '  taxOffice: Partial<CountyOfficeContact>;',
    '  links: Partial<CountyPropertyLinks>;',
    '  sourceUpdatedAt: { appraisalDistrict: string; taxOffice: string };',
    '  lastVerifiedAt: string;',
    '  sourceUrls: string[];',
    '};',
    '',
    '/** Generated from the Texas Comptroller county property-tax directory. */',
    'export const COUNTY_PROPERTY_ENRICHMENT: Record<string, CountyPropertyEnrichment> = {',
  ];
  for (const [slug, record] of Object.entries(records)) {
    lines.push(`  ${JSON.stringify(slug)}: ${JSON.stringify(record, null, 2).replace(/^/gm, '  ').trimStart()},`);
  }
  lines.push('};', '');
  return lines.join('\n');
}

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
    headers: { accept: 'text/html', 'user-agent': USER_AGENT },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.text();
}

function normalizeExternalUrl(value) {
  const cleaned = cleanText(value);
  if (!cleaned) return undefined;
  const decoded = decodeEntities(cleaned);
  try {
    const url = new URL(/^https?:\/\//i.test(decoded) ? decoded : `https://${decoded.replace(/^\/+/, '')}`);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString().replace(/\/$/, '') : undefined;
  } catch { return undefined; }
}

function compact(value) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item != null && item !== ''));
}

function cleanText(value) {
  if (!value) return undefined;
  const cleaned = decodeEntities(stripHtml(String(value))).replace(/\s+/g, ' ').trim();
  return cleaned || undefined;
}
function stripHtml(value) { return value.replace(/<[^>]+>/g, ' '); }
function decodeEntities(value) { return value.replace(/&amp;/g, '&').replace(/&#0*39;|&apos;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' '); }
function slugify(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
