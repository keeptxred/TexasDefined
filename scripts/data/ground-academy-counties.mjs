#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const CENSUS_COORDINATES_ENDPOINT = 'https://geocoding.geo.census.gov/geocoder/geographies/coordinates';
const REQUEST_TIMEOUT_MS = 20_000;
const REQUEST_ATTEMPTS = 3;
const CONCURRENCY = 4;
const REQUEST_DELAY_MS = 200;
const USER_AGENT = 'TexasDefined Academy county grounder (+https://texasdefined.com/)';

function countySlugFromName(value) {
  return String(value ?? '')
    .replace(/\s+County$/i, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseCensusTexasCounty(payload) {
  const geographies = payload?.result?.geographies;
  if (!geographies || typeof geographies !== 'object') return null;
  const counties = Object.entries(geographies).find(([key]) => /^counties$/i.test(key))?.[1];
  if (!Array.isArray(counties)) return null;
  for (const county of counties) {
    const stateCode = String(county?.STATE ?? county?.['STATE CODE'] ?? county?.GEOID ?? '').slice(0, 2);
    const name = typeof county?.NAME === 'string' ? county.NAME.trim() : '';
    const countySlug = countySlugFromName(name);
    const countyGeoid = String(county?.GEOID ?? '').trim();
    if (stateCode === '48' && name && countySlug && /^48\d{3}$/.test(countyGeoid)) {
      return { countyName: name, countySlug, countyGeoid };
    }
  }
  return null;
}

async function requestJson(url) {
  let lastError;
  for (let attempt = 1; attempt <= REQUEST_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { accept: 'application/json', 'user-agent': USER_AGENT },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
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

async function groundStore(store) {
  assert.equal(store.state, 'TX');
  assert.ok(Number.isFinite(store.latitude) && Number.isFinite(store.longitude), `Academy #${store.locationNumber} has no coordinates`);
  const url = new URL(CENSUS_COORDINATES_ENDPOINT);
  url.searchParams.set('x', String(store.longitude));
  url.searchParams.set('y', String(store.latitude));
  url.searchParams.set('benchmark', 'Public_AR_Current');
  url.searchParams.set('vintage', 'Current_Current');
  url.searchParams.set('format', 'json');
  const county = parseCensusTexasCounty(await requestJson(url));
  if (!county) throw new Error(`Census returned no Texas county for Academy #${store.locationNumber} at ${store.latitude},${store.longitude}`);
  return { ...store, ...county };
}

export function runSelfTest() {
  const parsed = parseCensusTexasCounty({ result: { geographies: { Counties: [{ STATE: '48', GEOID: '48157', NAME: 'Fort Bend County' }] } } });
  assert.deepEqual(parsed, { countyName: 'Fort Bend County', countySlug: 'fort-bend', countyGeoid: '48157' });
  assert.equal(parseCensusTexasCounty({ result: { geographies: { Counties: [{ STATE: '12', GEOID: '12086', NAME: 'Miami-Dade County' }] } } }), null);
  console.log('Academy Census county grounder self-test passed.');
}

async function run() {
  const [mode = '--live', path = 'academy-texas-locations.json'] = process.argv.slice(2);
  if (mode === '--self-test') return runSelfTest();
  if (mode !== '--live') throw new Error(`Unknown mode: ${mode}`);
  const payload = JSON.parse(await readFile(path, 'utf8'));
  if (!Array.isArray(payload.stores) || payload.stores.length !== payload.count || payload.stores.length < 110) {
    throw new Error(`Refusing unexpected Academy seed cardinality: count=${payload.count}, stores=${payload.stores?.length}`);
  }
  const stores = await mapLimit(payload.stores, CONCURRENCY, groundStore);
  for (const store of stores) {
    assert.match(store.countySlug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(store.countyGeoid, /^48\d{3}$/);
  }
  const countyCount = new Set(stores.map((store) => store.countyGeoid)).size;
  await writeFile(path, `${JSON.stringify({ ...payload, countyGroundedAt: new Date().toISOString().slice(0, 10), countySource: CENSUS_COORDINATES_ENDPOINT, countyCount, stores }, null, 2)}\n`, 'utf8');
  console.log(`Grounded ${stores.length} Academy Texas stores to ${countyCount} exact Census counties.`);
}

if (import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exitCode = 1;
  });
}
