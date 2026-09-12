#!/usr/bin/env node

import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const ACADEMY_TEXAS_DIRECTORY = 'https://www.academy.com/storelocator/texas';
const CENSUS_BATCH_ENDPOINT = 'https://geocoding.geo.census.gov/geocoder/locations/addressbatch';
const CENSUS_SINGLE_ENDPOINT = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress';
const USER_AGENT = 'TexasDefined Academy location seed generator (+https://texasdefined.com/)';
const REQUEST_TIMEOUT_MS = 20_000;
const REQUEST_ATTEMPTS = 3;
const CONCURRENCY = 2;
const REQUEST_DELAY_MS = 300;
const MIN_EXPECTED_TEXAS_STORES = 110;

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

function stripTags(html) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<(?:br\s*\/?|\/p|\/div|\/li|\/section|\/article|\/h[1-6])\s*>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function normalizeUrl(href, base = ACADEMY_TEXAS_DIRECTORY) {
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
  return [...html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
}

export function parseAcademyTexasCityUrls(html) {
  return [...new Set(hrefValues(html)
    .map((href) => normalizeUrl(href))
    .filter((url) => url && /^https:\/\/www\.academy\.com\/storelocator\/texas\/[a-z0-9-]+$/i.test(url)))]
    .sort();
}

export function parseAcademyTexasStoreUrls(html, baseUrl = ACADEMY_TEXAS_DIRECTORY) {
  return [...new Set(hrefValues(html)
    .map((href) => normalizeUrl(href, baseUrl))
    .filter((url) => url && /^https:\/\/www\.academy\.com\/storelocator\/texas\/[a-z0-9-]+\/store-\d+$/i.test(url)))]
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function jsonLdObjects(html) {
  const objects = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
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
      // Ignore malformed unrelated JSON-LD and keep parsing the first-party page.
    }
  }
  return objects;
}

function stringValue(...values) {
  return values.find((value) => typeof value === 'string' && value.trim())?.trim();
}

function numberValue(...values) {
  for (const value of values) {
    const number = typeof value === 'number' ? value : Number.parseFloat(String(value ?? ''));
    if (Number.isFinite(number)) return number;
  }
  return undefined;
}

function validTexasPoint(latitude, longitude) {
  return Number.isFinite(latitude) && Number.isFinite(longitude)
    && latitude >= 25.5 && latitude <= 36.6
    && longitude >= -106.7 && longitude <= -93.4;
}

export function parseEmbeddedCoordinates(html) {
  const decoded = decodeHtml(html);
  const patterns = [
    /["']latitude["']\s*:\s*(-?\d+(?:\.\d+)?)[\s\S]{0,240}?["']longitude["']\s*:\s*(-?\d+(?:\.\d+)?)/gi,
    /["']longitude["']\s*:\s*(-?\d+(?:\.\d+)?)[\s\S]{0,240}?["']latitude["']\s*:\s*(-?\d+(?:\.\d+)?)/gi,
    /["']lat["']\s*:\s*(-?\d+(?:\.\d+)?)[\s\S]{0,160}?["'](?:lng|lon|long)["']\s*:\s*(-?\d+(?:\.\d+)?)/gi,
    /["'](?:lng|lon|long)["']\s*:\s*(-?\d+(?:\.\d+)?)[\s\S]{0,160}?["']lat["']\s*:\s*(-?\d+(?:\.\d+)?)/gi,
  ];
  for (let index = 0; index < patterns.length; index += 1) {
    for (const match of decoded.matchAll(patterns[index])) {
      const first = Number(match[1]);
      const second = Number(match[2]);
      const latitude = index % 2 === 0 ? first : second;
      const longitude = index % 2 === 0 ? second : first;
      if (validTexasPoint(latitude, longitude)) return { latitude, longitude };
    }
  }
  return null;
}

function storeNumberFromUrl(sourceUrl) {
  const match = sourceUrl.match(/\/store-(\d+)$/i);
  if (!match) throw new Error(`Academy store URL has no stable store number: ${sourceUrl}`);
  return String(Number.parseInt(match[1], 10));
}

function parseAcademyStoreStatus(html) {
  const lines = stripTags(html).slice(0, 120);
  if (lines.some((line) => /^COMING SOON!?/i.test(line))) return 'planned';
  if (lines.some((line) => /^PERMANENTLY CLOSED\b/i.test(line))) return 'closed';
  return 'active';
}

function unitOnlyLine(value) {
  const line = String(value ?? '').trim();
  return /^(?:(?:suite|ste|unit|bldg|building)\b\s*#?\s*[a-z0-9-]+|#\s*[a-z0-9-]+|\d{1,4})$/i.test(line);
}

function fallbackAddress(html, sourceUrl) {
  const lines = stripTags(html);
  for (let index = 1; index < Math.min(lines.length, 180); index += 1) {
    const cityLine = lines[index].match(/^(.+?),\s*TX(?:\s*\(Texas\))?\s+(\d{5})(?:-\d{4})?$/i);
    if (!cityLine) continue;
    let streetIndex = index - 1;
    if (unitOnlyLine(lines[streetIndex]) && streetIndex > 0) streetIndex -= 1;
    const street = lines[streetIndex];
    if (!street || unitOnlyLine(street) || /^(?:Academy Sports(?: \+ Outdoors)?|Open|Closed|Main Number|Call Now)$/i.test(street)) continue;
    return {
      street,
      city: cityLine[1].trim(),
      state: 'TX',
      postalCode: cityLine[2],
      name: `Academy Sports + Outdoors — ${cityLine[1].trim()}`,
      sourceUrl,
    };
  }
  return null;
}

export function parseAcademyStorePage(html, sourceUrl) {
  const stableSourceUrl = normalizeUrl(sourceUrl);
  if (!stableSourceUrl || !/\/store-\d+$/i.test(stableSourceUrl)) {
    throw new Error(`Refusing non-Academy Texas store URL: ${sourceUrl}`);
  }

  const embeddedPoint = parseEmbeddedCoordinates(html);
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
    const geo = object.geo && typeof object.geo === 'object' ? object.geo : {};
    const latitude = numberValue(geo.latitude, geo.lat);
    const longitude = numberValue(geo.longitude, geo.lng, geo.long);
    const point = validTexasPoint(latitude, longitude) ? { latitude, longitude } : embeddedPoint;
    return {
      street,
      city,
      state: 'TX',
      postalCode: postalCode.slice(0, 5),
      name: stringValue(object.name) || `Academy Sports + Outdoors — ${city}`,
      latitude: point?.latitude,
      longitude: point?.longitude,
      sourceUrl: stableSourceUrl,
      locationNumber: storeNumberFromUrl(stableSourceUrl),
      status,
    };
  }

  const fallback = fallbackAddress(html, stableSourceUrl);
  if (!fallback) throw new Error(`Could not parse Academy store address from ${stableSourceUrl}`);
  return {
    ...fallback,
    latitude: embeddedPoint?.latitude,
    longitude: embeddedPoint?.longitude,
    locationNumber: storeNumberFromUrl(stableSourceUrl),
    status,
  };
}

async function requestWithRetry(url, init = {}) {
  let lastError;
  for (let attempt = 1; attempt <= REQUEST_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...init,
        headers: { accept: 'text/html,application/xhtml+xml,*/*;q=0.8', 'user-agent': USER_AGENT, ...(init.headers ?? {}) },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      if (attempt < REQUEST_ATTEMPTS) await new Promise((resolve) => setTimeout(resolve, attempt * 1200));
    }
  }
  throw new Error(`${url} failed after ${REQUEST_ATTEMPTS} attempts: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
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

export async function crawlAcademyTexasStorePages() {
  const stateHtml = await requestWithRetry(ACADEMY_TEXAS_DIRECTORY);
  const directStoreUrls = parseAcademyTexasStoreUrls(stateHtml);
  const cityUrls = parseAcademyTexasCityUrls(stateHtml);
  if (directStoreUrls.length < 70 || cityUrls.length < 5) {
    throw new Error(`Academy Texas directory exposed only ${directStoreUrls.length} direct stores and ${cityUrls.length} multi-store city pages; refusing an incomplete crawl.`);
  }

  const cityPages = await mapLimit(cityUrls, CONCURRENCY, async (url) => ({ url, html: await requestWithRetry(url) }));
  const storeUrls = [...new Set([
    ...directStoreUrls,
    ...cityPages.flatMap(({ url, html }) => parseAcademyTexasStoreUrls(html, url)),
  ])].sort();
  if (storeUrls.length < MIN_EXPECTED_TEXAS_STORES) {
    throw new Error(`Academy official directory exposed only ${storeUrls.length} Texas stores; expected at least ${MIN_EXPECTED_TEXAS_STORES}.`);
  }

  const stores = await mapLimit(storeUrls, CONCURRENCY, async (url) => parseAcademyStorePage(await requestWithRetry(url), url));
  const byNumber = new Map();
  for (const store of stores) {
    if (byNumber.has(store.locationNumber)) throw new Error(`Duplicate Academy store number ${store.locationNumber}.`);
    byNumber.set(store.locationNumber, store);
  }
  return [...byNumber.values()].sort((left, right) => Number(left.locationNumber) - Number(right.locationNumber));
}

function csvQuote(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (character === ',' && !quoted) {
      values.push(current);
      current = '';
    } else current += character;
  }
  values.push(current);
  return values;
}

function censusAddressVariants(store) {
  const original = `${store.street}, ${store.city}, TX ${store.postalCode}`;
  const normalizedStreet = store.street
    .replace(/\bState Highway\b/gi, 'TX')
    .replace(/\bUS Highway\b/gi, 'US')
    .replace(/\bInterstate Highway\b/gi, 'I')
    .replace(/\bInterstate\b/gi, 'I')
    .replace(/\bHighway\b/gi, 'Hwy')
    .replace(/\s+/g, ' ')
    .trim();
  return [...new Set([original, `${normalizedStreet}, ${store.city}, TX ${store.postalCode}`])];
}

async function geocodeSingle(store) {
  for (const address of censusAddressVariants(store)) {
    const url = new URL(CENSUS_SINGLE_ENDPOINT);
    url.searchParams.set('address', address);
    url.searchParams.set('benchmark', 'Public_AR_Current');
    url.searchParams.set('format', 'json');
    try {
      const text = await requestWithRetry(url.toString(), { headers: { accept: 'application/json' } });
      const parsed = JSON.parse(text);
      const match = parsed?.result?.addressMatches?.[0];
      const latitude = Number(match?.coordinates?.y);
      const longitude = Number(match?.coordinates?.x);
      if (validTexasPoint(latitude, longitude)) return { latitude, longitude };
    } catch {
      // Try the next deterministic address normalization before failing closed.
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  return null;
}

async function geocodeMissingCoordinates(stores) {
  const missing = stores.filter((store) => !validTexasPoint(store.latitude, store.longitude));
  if (!missing.length) return stores;

  const csv = missing.map((store) => [store.locationNumber, store.street, store.city, 'TX', store.postalCode].map(csvQuote).join(',')).join('\n');
  const form = new FormData();
  form.set('benchmark', 'Public_AR_Current');
  form.set('addressFile', new Blob([csv], { type: 'text/csv' }), 'academy-texas.csv');

  const text = await requestWithRetry(CENSUS_BATCH_ENDPOINT, { method: 'POST', body: form, headers: { accept: 'text/csv' } });
  const coordinates = new Map();
  for (const line of text.split(/\r?\n/).filter(Boolean)) {
    const values = parseCsvLine(line);
    const id = values[0]?.trim();
    const coordinate = values.find((value) => /^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$/.test(value.trim()));
    if (!id || !coordinate) continue;
    const [longitude, latitude] = coordinate.split(',').map(Number);
    if (validTexasPoint(latitude, longitude)) coordinates.set(String(Number(id)), { latitude, longitude });
  }

  const batchResolved = stores.map((store) => {
    if (validTexasPoint(store.latitude, store.longitude)) return store;
    const point = coordinates.get(store.locationNumber);
    return point ? { ...store, ...point } : store;
  });

  const unresolved = batchResolved.filter((store) => !validTexasPoint(store.latitude, store.longitude));
  if (!unresolved.length) return batchResolved;
  const singleResolved = new Map();
  for (const store of unresolved) {
    const point = await geocodeSingle(store);
    if (point) singleResolved.set(store.locationNumber, point);
  }
  return batchResolved.map((store) => singleResolved.has(store.locationNumber)
    ? { ...store, ...singleResolved.get(store.locationNumber) }
    : store);
}

export function validateAcademySeed(stores) {
  if (stores.length < MIN_EXPECTED_TEXAS_STORES) throw new Error(`Only ${stores.length} Academy Texas stores were parsed.`);
  const ids = new Set();
  const missing = [];
  for (const store of stores) {
    assert.match(store.locationNumber, /^\d+$/);
    assert.equal(store.state, 'TX');
    assert.match(store.status, /^(?:active|planned|closed)$/);
    assert.match(store.postalCode, /^\d{5}$/);
    assert.match(store.sourceUrl, /^https:\/\/www\.academy\.com\/storelocator\/texas\/[a-z0-9-]+\/store-\d+$/i);
    if (ids.has(store.locationNumber)) throw new Error(`Duplicate Academy store number ${store.locationNumber}.`);
    ids.add(store.locationNumber);
    if (!validTexasPoint(store.latitude, store.longitude)) missing.push(store.locationNumber);
  }
  if (missing.length) throw new Error(`${missing.length} Academy stores are missing verified coordinates (${missing.join(', ')}); refusing an incomplete seed.`);
  return stores;
}

export function runSelfTest() {
  const stateFixture = '<a href="/storelocator/texas/katy/store-0033">Katy store</a><a href="/storelocator/texas/katy">Katy</a>';
  assert.deepEqual(parseAcademyTexasStoreUrls(stateFixture), ['https://www.academy.com/storelocator/texas/katy/store-0033']);
  assert.deepEqual(parseAcademyTexasCityUrls(stateFixture), ['https://www.academy.com/storelocator/texas/katy']);
  const storeFixture = `<script type="application/ld+json">${JSON.stringify({
    '@type': 'SportingGoodsStore',
    name: 'Academy Sports + Outdoors Grand Parkway',
    address: { streetAddress: '23155 Katy Freeway', addressLocality: 'Katy', addressRegion: 'TX', postalCode: '77450' },
  })}</script><script>window.store={"latitude":29.785,"longitude":-95.77}</script>`;
  const parsed = parseAcademyStorePage(storeFixture, 'https://www.academy.com/storelocator/texas/katy/store-0033');
  assert.equal(parsed.locationNumber, '33');
  assert.equal(parsed.street, '23155 Katy Freeway');
  assert.equal(parsed.city, 'Katy');
  assert.equal(parsed.postalCode, '77450');
  assert.equal(parsed.status, 'active');
  assert.deepEqual(parseEmbeddedCoordinates(storeFixture), { latitude: 29.785, longitude: -95.77 });
  const plannedFixture = '5755 Kyle Pkwy\nSuite 200\nKyle, TX (Texas) 78640\nCOMING SOON!';
  const planned = parseAcademyStorePage(plannedFixture, 'https://www.academy.com/storelocator/texas/kyle/store-0341');
  assert.equal(planned.street, '5755 Kyle Pkwy');
  assert.equal(planned.status, 'planned');
  console.log('Academy Texas location seed generator self-test passed.');
}

async function run() {
  const [mode = '--self-test', outputPath = 'academy-texas-locations.json'] = process.argv.slice(2);
  if (mode === '--self-test') return runSelfTest();
  if (mode !== '--live-output') throw new Error(`Unknown mode: ${mode}`);

  const crawled = await crawlAcademyTexasStorePages();
  const attempted = await geocodeMissingCoordinates(crawled);
  const debugPayload = {
    source: ACADEMY_TEXAS_DIRECTORY,
    sourceCheckedAt: new Date().toISOString().slice(0, 10),
    count: attempted.length,
    missingCoordinateStoreNumbers: attempted.filter((store) => !validTexasPoint(store.latitude, store.longitude)).map((store) => store.locationNumber),
    stores: attempted,
  };
  await writeFile('academy-texas-locations-debug.json', `${JSON.stringify(debugPayload, null, 2)}\n`, 'utf8');
  const geocoded = validateAcademySeed(attempted);
  const payload = { ...debugPayload, missingCoordinateStoreNumbers: [], stores: geocoded };
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Generated ${geocoded.length} verified Academy Texas store rows at ${outputPath}.`);
}

if (import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exitCode = 1;
  });
}
