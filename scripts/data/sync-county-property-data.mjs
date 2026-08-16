import fs from 'node:fs/promises';
import path from 'node:path';

const DIRECTORY_URL = 'https://comptroller.texas.gov/taxes/property-tax/county-directory/';
const OUTPUT = path.join(process.cwd(), 'src', 'data', 'property', 'county-property-enrichment.generated.ts');
const USER_AGENT = 'TexasDefined county property verifier/1.0';
const CONCURRENCY = 8;
const SOURCE_MAX_AGE_DAYS = 730;

const directoryHtml = await fetchText(DIRECTORY_URL);
const counties = parseCountyDirectory(directoryHtml);
if (counties.length !== 254) throw new Error(`Expected 254 Comptroller county pages; found ${counties.length}.`);

const requested = process.argv.find((arg) => arg.startsWith('--county='))?.split('=')[1]?.trim().toLowerCase();
const selected = requested ? counties.filter((county) => county.slug === requested) : counties;
if (requested && selected.length !== 1) throw new Error(`Unknown county slug: ${requested}`);

const results = [];
for (let index = 0; index < selected.length; index += CONCURRENCY) {
  const batch = selected.slice(index, index + CONCURRENCY);
  const batchResults = await Promise.all(batch.map(async (county) => {
    try {
      const html = await fetchText(county.url);
      return { county, fetched: true, enrichment: parseCountyPage(html, county.url) };
    } catch (error) {
      console.error(`Unable to sync ${county.slug}:`, error instanceof Error ? error.message : String(error));
      return { county, fetched: false, enrichment: null };
    }
  }));
  results.push(...batchResults);
}

let merged = {};
try {
  const existing = await fs.readFile(OUTPUT, 'utf8');
  merged = parseExistingSnapshot(existing);
} catch {}

for (const { county, fetched, enrichment } of results) {
  if (enrichment) merged[county.slug] = enrichment;
  else if (fetched) delete merged[county.slug];
}

const ordered = Object.fromEntries(Object.entries(merged).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile(OUTPUT, renderSnapshot(ordered));
const refreshed = results.filter((item) => item.enrichment).length;
const withdrawn = results.filter((item) => item.fetched && !item.enrichment).length;
console.log(`County property snapshot now contains ${Object.keys(ordered).length} verified counties; refreshed ${refreshed}; withheld or withdrew ${withdrawn} because required office data was missing or stale.`);

function parseCountyDirectory(html) {
  const items = [];
  const seen = new Set();
  const pattern = /<a[^>]+href=["']([^"']*county-directory\/([^"'?#/]+\.php))["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(pattern)) {
    const label = stripHtml(match[3]).replace(/^\d{3}\s+/, '').trim();
    if (!label) continue;
    const slug = slugify(label);
    if (seen.has(slug)) continue;
    seen.add(slug);
    items.push({ slug, name: label, url: new URL(match[1], DIRECTORY_URL).toString() });
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
