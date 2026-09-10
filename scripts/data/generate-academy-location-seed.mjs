#!/usr/bin/env node

import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const ACADEMY_TEXAS_DIRECTORY = 'https://www.academy.com/storelocator/texas';
const CENSUS_BATCH_ENDPOINT = 'https://geocoding.geo.census.gov/geocoder/locations/addressbatch';
const USER_AGENT = 'TexasDefined Academy location seed generator (+https://texasdefined.com/)';
const REQUEST_TIMEOUT_MS = 20_000;
const REQUEST_ATTEMPTS = 3;
const CONCURRENCY = 8;
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
      // A malformed unrelated JSON-LD block should not block the fallback parser.
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

function storeNumberFromUrl(sourceUrl) {
  const match = sourceUrl.match(/\/store-(\d+)$/i);
  if (!match) throw new Error(`Academy store URL has no stable store number: ${sourceUrl}`);
  return String(Number.parseInt(match[1], 10));
}

function fallbackAddress(html, sourceUrl) {
  const lines = stripTags(html);
  for (let index = 1; index < Math.min(lines.length, 160); index += 1) {
    const cityLine = lines[index].match(/^(.+?),\s*TX(?:\s*\(Texas\))?\s+(\d{5})(?:-\d{4})?$/i);
    if (!cityLine) continue;
    const street = lines[index - 1];
    if (!street || /^(?:Academy Sports|Open|Closed|Main Number|Call Now)$/i.test(street)) continue;
    return {
      street,
      city: cityLine[1].trim(),
      state: 'TX',
      postalCode: cityLine[2],
      name: `Academy Sports + Outdoors — ${cityLine[1].trim()}`,
      latitude: undefined,
      longitude: undefined,
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
    return {
      street,
      city,
      state: 'TX',
      postalCode: postalCode.slice(0, 5),
      name: stringValue(object.name) || `Academy Sports + Outdoors — ${city}`,
      latitude: numberValue(geo.latitude, geo.lat),
      longitude: numberValue(geo.longitude, geo.lng, geo.long),
      sourceUrl: stableSourceUrl,
      locationNumber: storeNumberFromUrl(stableSourceUrl),
    };
  }

  const fallback = fallbackAddress(html, stableSourceUrl);
  if (!fallback) throw new Error(`Could not parse Academy store address from ${stableSourceUrl}`);
  return { ...fallback, locationNumber: storeNumberFromUrl(stableSourceUrl) };
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
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, worker));
  return results;
}

export async function crawlAcademyTexasStorePages() {
  const stateHtml = await requestWithRetry(ACADEMY_TEXAS_DIRECTORY);
  const cityUrls = parseAcademyTexasCityUrls(stateHtml);
  if (cityUrls.length < 80) throw new Error(`Academy Texas directory exposed only ${cityUrls.length} city pages; refusing an incomplete crawl.`);

  const cityPages = await mapLimit(cityUrls, CONCURRENCY, async (url) => ({ url, html: await requestWithRetry(url) }));
  const storeUrls = [...new Set(cityPages.flatMap(({ url, html }) => parseAcademyTexasStoreUrls(html, url)))].sort();
  if (storeUrls.length < MIN_EXPECTED_TEXAS_STORES) {
    throw new Error(`Academy official city pages exposed only ${storeUrls.length} Texas stores; expected at least ${MIN_EXPECTED_TEXAS_STORES}.`);
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

async function geocodeMissingCoordinates(stores) {
  const missing = stores.filter((store) => !Number.isFinite(store.latitude) || !Number.isFinite(store.longitude));
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
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) coordinates.set(String(Number(id)), { latitude, longitude });
  }

  return stores.map((store) => {
    if (Number.isFinite(store.latitude) && Number.isFinite(store.longitude)) return store;
    const point = coordinates.get(store.locationNumber);
    return point ? { ...store, ...point } : store;
  });
}

export function validateAcademySeed(stores) {
  if (stores.length < MIN_EXPECTED_TEXAS_STORES) throw new Error(`Only ${stores.length} Academy Texas stores were parsed.`);
  const ids = new Set();
  let missingCoordinates = 0;
  for (const store of stores) {
    assert.match(store.locationNumber, /^\d+$/);
    assert.equal(store.state, 'TX');
    assert.match(store.postalCode, /^\d{5}$/);
    assert.match(store.sourceUrl, /^https:\/\/www\.academy\.com\/storelocator\/texas\/[a-z0-9-]+\/store-\d+$/i);
    if (ids.has(store.locationNumber)) throw new Error(`Duplicate Academy store number ${store.locationNumber}.`);
    ids.add(store.locationNumber);
    if (!Number.isFinite(store.latitude) || !Number.isFinite(store.longitude)) missingCoordinates += 1;
  }
  if (missingCoordinates > Math.max(5, Math.floor(stores.length * 0.08))) {
    throw new Error(`${missingCoordinates} Academy stores are missing coordinates; refusing a low-quality seed.`);
  }
  return stores;
}

export function runSelfTest() {
  const stateFixture = '<a href="/storelocator/texas/katy">Katy</a><a href="https://www.academy.com/storelocator/texas/houston">Houston</a>';
  assert.deepEqual(parseAcademyTexasCityUrls(stateFixture), [
    'https://www.academy.com/storelocator/texas/houston',
    'https://www.academy.com/storelocator/texas/katy',
  ]);
  const cityFixture = '<a href="/storelocator/texas/katy/store-0033?cid=loc_033">Grand Parkway</a>';
  assert.deepEqual(parseAcademyTexasStoreUrls(cityFixture, 'https://www.academy.com/storelocator/texas/katy'), [
    'https://www.academy.com/storelocator/texas/katy/store-0033',
  ]);
  const storeFixture = `<script type="application/ld+json">${JSON.stringify({
    '@type': 'SportingGoodsStore',
    name: 'Academy Sports + Outdoors Grand Parkway',
    address: { streetAddress: '23155 Katy Freeway', addressLocality: 'Katy', addressRegion: 'TX', postalCode: '77450' },
    geo: { latitude: 29.785, longitude: -95.77 },
  })}</script>`;
  const parsed = parseAcademyStorePage(storeFixture, 'https://www.academy.com/storelocator/texas/katy/store-0033');
  assert.equal(parsed.locationNumber, '33');
  assert.equal(parsed.street, '23155 Katy Freeway');
  assert.equal(parsed.city, 'Katy');
  assert.equal(parsed.postalCode, '77450');
  console.log('Academy Texas location seed generator self-test passed.');
}

async function run() {
  const [mode = '--self-test', outputPath = 'academy-texas-locations.json'] = process.argv.slice(2);
  if (mode === '--self-test') return runSelfTest();
  if (mode !== '--live-output') throw new Error(`Unknown mode: ${mode}`);

  const crawled = await crawlAcademyTexasStorePages();
  const geocoded = validateAcademySeed(await geocodeMissingCoordinates(crawled));
  const payload = {
    source: ACADEMY_TEXAS_DIRECTORY,
    sourceCheckedAt: new Date().toISOString().slice(0, 10),
    count: geocoded.length,
    stores: geocoded,
  };
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
