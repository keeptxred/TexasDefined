#!/usr/bin/env node

import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const ACADEMY_TEXAS_DIRECTORY = 'https://www.academy.com/storelocator/texas';
const SUPABASE_DEFAULT_URL = 'https://ftkznprjljkhymknvhye.supabase.co';
const USER_AGENT = 'TexasDefined Academy location freshness verifier (+https://texasdefined.com/)';
const REQUEST_TIMEOUT_MS = 20_000;
const REQUEST_ATTEMPTS = 3;
const CONCURRENCY = 3;
const REQUEST_DELAY_MS = 200;
const MIN_EXPECTED_ACTIVE_TEXAS_STORES = 110;

function decodeHtml(value) {
  return String(value ?? '')
    .replace(/&#x([0-9a-f]+);/gi, (_match, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_match, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;|&rsquo;/gi, "'")
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—');
}

function htmlToLines(html) {
  return decodeHtml(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(?:br\s*\/?|\/p|\/div|\/li|\/section|\/article|\/h[1-6])\s*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function normalizeAcademyUrl(href, base = ACADEMY_TEXAS_DIRECTORY) {
  try {
    const url = new URL(decodeHtml(href), base);
    if (url.hostname !== 'www.academy.com') return null;
    url.search = '';
    url.hash = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

function hrefValues(html) {
  return [...String(html).matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
}

export function parseAcademyTexasCityUrls(html) {
  return [...new Set(
    hrefValues(html)
      .map((href) => normalizeAcademyUrl(href))
      .filter((url) => url && /^https:\/\/www\.academy\.com\/storelocator\/texas\/[a-z0-9-]+$/i.test(url)),
  )].sort();
}

export function parseAcademyTexasStoreUrls(html, baseUrl = ACADEMY_TEXAS_DIRECTORY) {
  return [...new Set(
    hrefValues(html)
      .map((href) => normalizeAcademyUrl(href, baseUrl))
      .filter((url) => url && /^https:\/\/www\.academy\.com\/storelocator\/texas\/[a-z0-9-]+\/store-\d+$/i.test(url)),
  )].sort((left, right) => left.localeCompare(right, 'en'));
}

function jsonLdObjects(html) {
  const objects = [];
  for (const match of String(html).matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1].trim());
      const queue = Array.isArray(parsed) ? [...parsed] : [parsed];
      while (queue.length) {
        const value = queue.shift();
        if (!value || typeof value !== 'object') continue;
        objects.push(value);
        if (Array.isArray(value['@graph'])) queue.push(...value['@graph']);
      }
    } catch {
      // Ignore unrelated malformed JSON-LD and continue with first-party page parsing.
    }
  }
  return objects;
}

function stringValue(...values) {
  return values.find((value) => typeof value === 'string' && value.trim())?.trim();
}

function storeNumberFromUrl(sourceUrl) {
  const match = sourceUrl.match(/\/store-(\d+)$/i);
  if (!match) throw new Error(`Academy store URL has no stable store number: ${sourceUrl}`);
  return String(Number.parseInt(match[1], 10));
}

function parseAcademyStoreStatus(html) {
  const lines = htmlToLines(html).slice(0, 140);
  if (lines.some((line) => /^COMING SOON!?/i.test(line))) return 'planned';
  if (lines.some((line) => /^PERMANENTLY CLOSED\b/i.test(line))) return 'closed';
  return 'active';
}

function unitOnlyLine(value) {
  const line = String(value ?? '').trim();
  return /^(?:(?:suite|ste|unit|bldg|building)\b\s*#?\s*[a-z0-9-]+|#\s*[a-z0-9-]+|\d{1,4})$/i.test(line);
}

function fallbackAddress(html, sourceUrl) {
  const lines = htmlToLines(html);
  for (let index = 1; index < Math.min(lines.length, 200); index += 1) {
    const cityLine = lines[index].match(/^(.+?),\s*TX(?:\s*\(Texas\))?\s+(\d{5})(?:-\d{4})?$/i);
    if (!cityLine) continue;
    let streetIndex = index - 1;
    if (unitOnlyLine(lines[streetIndex]) && streetIndex > 0) streetIndex -= 1;
    const street = lines[streetIndex];
    if (!street || unitOnlyLine(street) || /^(?:Academy Sports(?: \+ Outdoors)?|Open|Closed|Main Number|Call Now)$/i.test(street)) continue;
    return {
      street,
      city: cityLine[1].trim(),
      postalCode: cityLine[2],
      sourceUrl,
    };
  }
  return null;
}

export function parseAcademyStorePage(html, sourceUrl) {
  const stableSourceUrl = normalizeAcademyUrl(sourceUrl);
  if (!stableSourceUrl || !/\/store-\d+$/i.test(stableSourceUrl)) {
    throw new Error(`Refusing non-Academy Texas store URL: ${sourceUrl}`);
  }

  const status = parseAcademyStoreStatus(html);
  for (const object of jsonLdObjects(html)) {
    const address = object.address && typeof object.address === 'object' ? object.address : null;
    if (!address) continue;
    const state = stringValue(address.addressRegion, address.region, address.state);
    if (state && !/^(?:TX|Texas)$/i.test(state)) continue;
    const street = stringValue(address.streetAddress, address.address1, address.line1);
    const city = stringValue(address.addressLocality, address.city, address.locality);
    const postalCode = stringValue(address.postalCode, address.zip);
    if (!street || !city || !postalCode) continue;
    return {
      locationNumber: storeNumberFromUrl(stableSourceUrl),
      street,
      city,
      postalCode: postalCode.slice(0, 5),
      sourceUrl: stableSourceUrl,
      status,
    };
  }

  const fallback = fallbackAddress(html, stableSourceUrl);
  if (!fallback) throw new Error(`Could not parse Academy store address from ${stableSourceUrl}`);
  return {
    locationNumber: storeNumberFromUrl(stableSourceUrl),
    ...fallback,
    status,
  };
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\bsaint\b/g, 'st')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function normalizeStreet(value) {
  return normalizeText(value).replace(/\s+/g, '');
}

export function compareAcademyOfficialToRegistry(officialLocations, registryRows) {
  const officialActive = officialLocations.filter((row) => row.status === 'active');
  const officialByNumber = new Map(officialActive.map((row) => [String(row.locationNumber), row]));
  const registryByNumber = new Map();
  const duplicateRegistryNumbers = [];

  for (const row of registryRows) {
    const locationNumber = String(row.location_number ?? '').trim();
    if (!locationNumber) continue;
    if (registryByNumber.has(locationNumber)) duplicateRegistryNumbers.push(locationNumber);
    registryByNumber.set(locationNumber, row);
  }

  const sortNumbers = (values) => values.sort((a, b) => Number(a) - Number(b));
  const officialOnly = sortNumbers([...officialByNumber.keys()].filter((number) => !registryByNumber.has(number)));
  const registryOnly = sortNumbers([...registryByNumber.keys()].filter((number) => !officialByNumber.has(number)));
  const changed = [];

  for (const [number, official] of officialByNumber) {
    const registry = registryByNumber.get(number);
    if (!registry) continue;
    const differences = [];
    if (normalizeText(official.city) !== normalizeText(registry.city)) {
      differences.push(`city official="${official.city}" registry="${registry.city}"`);
    }
    if (normalizeStreet(official.street) !== normalizeStreet(registry.street)) {
      differences.push(`street official="${official.street}" registry="${registry.street}"`);
    }
    if (String(official.postalCode) !== String(registry.postal_code ?? '')) {
      differences.push(`postal official="${official.postalCode}" registry="${registry.postal_code ?? ''}"`);
    }
    if (registry.source_url !== official.sourceUrl) {
      differences.push(`source_url official="${official.sourceUrl}" registry="${registry.source_url ?? ''}"`);
    }
    if (registry.public_locator_enabled !== true) differences.push('public_locator_enabled registry is not true');
    if (differences.length) changed.push({ locationNumber: number, differences });
  }

  return {
    officialCount: officialActive.length,
    registryCount: registryRows.length,
    officialOnly,
    registryOnly,
    duplicateRegistryNumbers: [...new Set(duplicateRegistryNumbers)],
    changed,
    matches:
      officialActive.length >= MIN_EXPECTED_ACTIVE_TEXAS_STORES
      && officialOnly.length === 0
      && registryOnly.length === 0
      && duplicateRegistryNumbers.length === 0
      && changed.length === 0
      && officialActive.length === registryRows.length,
  };
}

async function requestWithRetry(url, init = {}, label = url) {
  let lastError;
  for (let attempt = 1; attempt <= REQUEST_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...init,
        headers: {
          accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
          'user-agent': USER_AGENT,
          ...(init.headers ?? {}),
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const text = await response.text();
      if (!response.ok) throw new Error(`${label} returned HTTP ${response.status}: ${text.slice(0, 300)}`);
      return text;
    } catch (error) {
      lastError = error;
      if (attempt < REQUEST_ATTEMPTS) await new Promise((resolve) => setTimeout(resolve, attempt * 1_200));
    }
  }
  throw new Error(`${label} failed after ${REQUEST_ATTEMPTS} attempts: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

async function mapLimit(values, limit, mapper) {
  const results = new Array(values.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= values.length) return;
      results[index] = await mapper(values[index], index);
      await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY_MS));
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, worker));
  return results;
}

export async function crawlAcademyOfficialTexasLocations() {
  const stateHtml = await requestWithRetry(ACADEMY_TEXAS_DIRECTORY, {}, 'Academy Texas directory');
  const directStoreUrls = parseAcademyTexasStoreUrls(stateHtml);
  const cityUrls = parseAcademyTexasCityUrls(stateHtml);
  if (directStoreUrls.length < 70 || cityUrls.length < 5) {
    throw new Error(`Academy Texas directory exposed only ${directStoreUrls.length} direct store links and ${cityUrls.length} city pages; refusing an incomplete source snapshot.`);
  }

  const cityPages = await mapLimit(cityUrls, CONCURRENCY, async (url) => ({
    url,
    html: await requestWithRetry(url, {}, `Academy city directory ${url}`),
  }));
  const storeUrls = [...new Set([
    ...directStoreUrls,
    ...cityPages.flatMap(({ url, html }) => parseAcademyTexasStoreUrls(html, url)),
  ])].sort((left, right) => left.localeCompare(right, 'en'));

  if (storeUrls.length < MIN_EXPECTED_ACTIVE_TEXAS_STORES) {
    throw new Error(`Academy official directory exposed only ${storeUrls.length} Texas store pages; refusing an incomplete source snapshot.`);
  }

  const stores = await mapLimit(storeUrls, CONCURRENCY, async (url) =>
    parseAcademyStorePage(await requestWithRetry(url, {}, `Academy store ${url}`), url));
  const seen = new Set();
  for (const store of stores) {
    if (seen.has(store.locationNumber)) throw new Error(`Academy official source returned duplicate store #${store.locationNumber}.`);
    seen.add(store.locationNumber);
  }
  return stores.sort((left, right) => Number(left.locationNumber) - Number(right.locationNumber));
}

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required for live Academy registry verification.`);
  return value;
}

async function loadAcademyRegistryRows(supabaseUrl, serviceRoleKey) {
  const endpoint = new URL(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/texasdefined_brand_locations`);
  endpoint.searchParams.set('brand_slug', 'eq.academy');
  endpoint.searchParams.set('state', 'eq.TX');
  endpoint.searchParams.set('status', 'eq.active');
  endpoint.searchParams.set('public_locator_enabled', 'eq.true');
  endpoint.searchParams.set('select', 'location_number,street,city,postal_code,source_url,source_checked_at,status,public_locator_enabled');
  endpoint.searchParams.set('order', 'location_number.asc');

  const text = await requestWithRetry(endpoint.toString(), {
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      accept: 'application/json',
    },
  }, 'Supabase Academy registry query');
  const rows = JSON.parse(text);
  if (!Array.isArray(rows)) throw new Error('Supabase Academy registry query did not return an array.');
  if (rows.length < MIN_EXPECTED_ACTIVE_TEXAS_STORES) {
    throw new Error(`Supabase returned only ${rows.length} public active Texas Academy locations.`);
  }
  return rows;
}

async function markAcademyRegistryChecked(supabaseUrl, serviceRoleKey, checkedAt) {
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/rpc/touch_brand_location_source_checked`;
  const text = await requestWithRetry(endpoint, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({ p_brand_slug: 'academy', p_checked_at: checkedAt }),
  }, 'Supabase Academy freshness RPC');
  const touched = Number(JSON.parse(text));
  if (!Number.isInteger(touched) || touched < MIN_EXPECTED_ACTIVE_TEXAS_STORES) {
    throw new Error(`Academy freshness RPC touched an unexpected number of rows: ${text}`);
  }
  return touched;
}

export function runSelfTest() {
  const directoryHtml = [
    '<a href="/storelocator/texas/houston">Houston</a>',
    '<a href="/storelocator/texas/austin/store-0025">Austin #25</a>',
  ].join('\n');
  assert.deepEqual(parseAcademyTexasCityUrls(directoryHtml), ['https://www.academy.com/storelocator/texas/houston']);
  assert.deepEqual(parseAcademyTexasStoreUrls(directoryHtml), ['https://www.academy.com/storelocator/texas/austin/store-0025']);

  const storeHtml = '<script type="application/ld+json">{"@type":"SportingGoodsStore","address":{"streetAddress":"801 East William Cannon Drive","addressLocality":"Austin","addressRegion":"TX","postalCode":"78745"}}</script>';
  const official = parseAcademyStorePage(storeHtml, 'https://www.academy.com/storelocator/texas/austin/store-0025');
  assert.equal(official.locationNumber, '25');
  assert.equal(official.city, 'Austin');
  assert.equal(official.status, 'active');

  const registry = [{
    location_number: '25',
    street: '801 East William Cannon Drive',
    city: 'Austin',
    postal_code: '78745',
    source_url: official.sourceUrl,
    public_locator_enabled: true,
  }];
  const paddedOfficial = Array.from({ length: MIN_EXPECTED_ACTIVE_TEXAS_STORES }, (_value, index) => ({
    ...official,
    locationNumber: String(index + 1),
    sourceUrl: `https://www.academy.com/storelocator/texas/test/store-${String(index + 1).padStart(4, '0')}`,
  }));
  const paddedRegistry = paddedOfficial.map((row) => ({
    location_number: row.locationNumber,
    street: row.street,
    city: row.city,
    postal_code: row.postalCode,
    source_url: row.sourceUrl,
    public_locator_enabled: true,
  }));
  assert.equal(compareAcademyOfficialToRegistry(paddedOfficial, paddedRegistry).matches, true);
  paddedRegistry[0].source_url = ACADEMY_TEXAS_DIRECTORY;
  assert.equal(compareAcademyOfficialToRegistry(paddedOfficial, paddedRegistry).matches, false);
  assert.equal(registry[0].source_url, official.sourceUrl);
  console.log('Academy location source verifier self-test passed.');
}

export async function verifyAcademyLive() {
  const serviceRoleKey = requireEnvironment('SUPABASE_SERVICE_ROLE_KEY');
  const supabaseUrl = process.env.SUPABASE_URL?.trim() || SUPABASE_DEFAULT_URL;
  const [officialLocations, registryRows] = await Promise.all([
    crawlAcademyOfficialTexasLocations(),
    loadAcademyRegistryRows(supabaseUrl, serviceRoleKey),
  ]);
  const comparison = compareAcademyOfficialToRegistry(officialLocations, registryRows);
  if (!comparison.matches) {
    throw new Error(`Academy Texas location registry drift detected.\n${JSON.stringify(comparison, null, 2)}`);
  }
  const checkedAt = new Date().toISOString().slice(0, 10);
  const touched = await markAcademyRegistryChecked(supabaseUrl, serviceRoleKey, checkedAt);
  const result = {
    status: 'verified',
    brandSlug: 'academy',
    source: ACADEMY_TEXAS_DIRECTORY,
    officialCount: comparison.officialCount,
    registryCount: comparison.registryCount,
    checkedAt,
    touched,
  };
  console.log(JSON.stringify(result, null, 2));
  return result;
}

export async function runCli(args = process.argv.slice(2)) {
  const mode = args[0] ?? '--live';
  if (mode === '--self-test') {
    runSelfTest();
    return;
  }
  if (mode === '--live') {
    await verifyAcademyLive();
    return;
  }
  throw new Error(`Unknown mode: ${mode}. Use --self-test or --live.`);
}

const invokedDirectly = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) await runCli();
