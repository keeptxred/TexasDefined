#!/usr/bin/env node

import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const REQUEST_TIMEOUT_MS = 15_000;
const REQUEST_ATTEMPTS = 3;

function decodeHtml(value) {
  return value
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
  const text = decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<(?:br\s*\/?|\/p|\/div|\/li|\/section|\/article|\/h[1-6])\s*>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  );

  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

export function parseBuceesOfficialTexasLocations(html) {
  const lines = htmlToLines(html);
  const locations = [];

  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^#(\d+)\s*[–—-]\s*(.+?),\s*TX$/i);
    if (!heading) continue;

    const locationNumber = heading[1];
    const headingCity = heading[2].trim();
    let cityLineIndex = -1;
    let city = null;
    let postalCode = null;

    for (let cursor = index + 1; cursor < Math.min(lines.length, index + 12); cursor += 1) {
      if (/^#\d+\s*[–—-]/.test(lines[cursor])) break;
      const cityLine = lines[cursor].match(/^(.+?),\s*(?:Texas|TX)\s+(\d{5})(?:-\d{4})?$/i);
      if (!cityLine) continue;
      cityLineIndex = cursor;
      city = cityLine[1].trim();
      postalCode = cityLine[2];
      break;
    }

    if (cityLineIndex < 1 || !city || !postalCode) {
      throw new Error(`Could not parse the official address block for Buc-ee's #${locationNumber} (${headingCity}, TX).`);
    }

    const street = lines[cityLineIndex - 1];
    if (!street || /^(?:Car Wash|DEF|Ethanol-Free|Mercedes-Benz|Tesla)/i.test(street)) {
      throw new Error(`Could not identify the official street address for Buc-ee's #${locationNumber} (${headingCity}, TX).`);
    }

    locations.push({ locationNumber, headingCity, street, city, postalCode });
  }

  return locations;
}

export const SOURCE_ADAPTERS = Object.freeze({
  bucees: Object.freeze({
    brandSlug: 'bucees',
    label: "Buc-ee's",
    sourceUrl: 'https://buc-ees.com/locations/',
    minExpectedTexasLocations: 30,
    parseOfficialLocations: parseBuceesOfficialTexasLocations,
  }),
});

function adapterFor(brandSlug) {
  const adapter = SOURCE_ADAPTERS[brandSlug];
  if (!adapter) throw new Error(`Unknown verified-registry brand: ${brandSlug}`);
  return adapter;
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

function validateOfficialLocations(adapter, locations) {
  const seen = new Set();
  for (const location of locations) {
    const locationNumber = String(location.locationNumber ?? '').trim();
    if (!locationNumber) throw new Error(`${adapter.label} official source returned a location without a stable location number.`);
    if (seen.has(locationNumber)) throw new Error(`${adapter.label} official source returned duplicate location #${locationNumber}.`);
    seen.add(locationNumber);
  }

  if (locations.length < adapter.minExpectedTexasLocations) {
    throw new Error(
      `${adapter.label} official source parser found only ${locations.length} Texas locations; expected at least ${adapter.minExpectedTexasLocations}. Treating this as a source/parser failure rather than registry drift.`,
    );
  }

  return locations;
}

export function compareOfficialToRegistryForAdapter(adapter, officialLocations, registryRows) {
  const officialByNumber = new Map(officialLocations.map((row) => [String(row.locationNumber), row]));
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
    if (registry.source_url !== adapter.sourceUrl) {
      differences.push(`source_url registry="${registry.source_url ?? ''}"`);
    }
    if (registry.public_locator_enabled !== true) {
      differences.push('public_locator_enabled registry is not true');
    }

    if (differences.length > 0) changed.push({ locationNumber: number, differences });
  }

  return {
    brandSlug: adapter.brandSlug,
    label: adapter.label,
    officialCount: officialLocations.length,
    registryCount: registryRows.length,
    officialOnly,
    registryOnly,
    duplicateRegistryNumbers: [...new Set(duplicateRegistryNumbers)],
    changed,
    matches:
      officialOnly.length === 0
      && registryOnly.length === 0
      && duplicateRegistryNumbers.length === 0
      && changed.length === 0
      && officialLocations.length === registryRows.length,
  };
}

export function compareBuceesOfficialToRegistry(officialLocations, registryRows) {
  return compareOfficialToRegistryForAdapter(SOURCE_ADAPTERS.bucees, officialLocations, registryRows);
}

async function requestWithRetry(url, init, label) {
  let lastError;

  for (let attempt = 1; attempt <= REQUEST_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
      const text = await response.text();
      if (!response.ok) throw new Error(`${label} returned HTTP ${response.status}: ${text.slice(0, 300)}`);
      return text;
    } catch (error) {
      lastError = error;
      if (attempt < REQUEST_ATTEMPTS) await new Promise((resolve) => setTimeout(resolve, attempt * 1_500));
    }
  }

  throw new Error(`${label} failed after ${REQUEST_ATTEMPTS} attempts: ${lastError?.message ?? String(lastError)}`);
}

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required for live registry verification.`);
  return value;
}

async function loadRegistryRows(supabaseUrl, serviceRoleKey, adapter) {
  const endpoint = new URL(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/texasdefined_brand_locations`);
  endpoint.searchParams.set('brand_slug', `eq.${adapter.brandSlug}`);
  endpoint.searchParams.set('state', 'eq.TX');
  endpoint.searchParams.set('status', 'eq.active');
  endpoint.searchParams.set('public_locator_enabled', 'eq.true');
  endpoint.searchParams.set(
    'select',
    'id,location_number,name,street,city,postal_code,source_url,source_checked_at,status,public_locator_enabled',
  );
  endpoint.searchParams.set('order', 'location_number.asc');

  const text = await requestWithRetry(
    endpoint,
    {
      headers: {
        apikey: serviceRoleKey,
        authorization: `Bearer ${serviceRoleKey}`,
        accept: 'application/json',
      },
    },
    `Supabase ${adapter.label} registry query`,
  );

  const rows = JSON.parse(text);
  if (!Array.isArray(rows)) throw new Error(`Supabase ${adapter.label} registry query did not return an array.`);
  if (rows.length < adapter.minExpectedTexasLocations) {
    throw new Error(`Supabase returned only ${rows.length} public active Texas ${adapter.label} locations.`);
  }
  return rows;
}

async function markRegistryChecked(supabaseUrl, serviceRoleKey, adapter, checkedAt) {
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/rpc/touch_brand_location_source_checked`;
  const text = await requestWithRetry(
    endpoint,
    {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        authorization: `Bearer ${serviceRoleKey}`,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({ p_brand_slug: adapter.brandSlug, p_checked_at: checkedAt }),
    },
    `Supabase ${adapter.label} freshness RPC`,
  );

  const touched = Number(JSON.parse(text));
  if (!Number.isInteger(touched) || touched < adapter.minExpectedTexasLocations) {
    throw new Error(`${adapter.label} freshness RPC touched an unexpected number of rows: ${text}`);
  }
  return touched;
}

function selfTestAdapter(adapter) {
  if (adapter.brandSlug !== 'bucees') throw new Error(`No self-test fixture is configured for ${adapter.brandSlug}.`);

  const padded = Array.from({ length: 30 }, (_unused, index) => {
    const number = 100 + index;
    return `<h4>#${number} – Test ${index}, TX</h4><p>${index} Main St<br>Test ${index}, Texas 75000</p>`;
  }).join('\n');
  const parsed = validateOfficialLocations(adapter, adapter.parseOfficialLocations(padded));
  assert.equal(parsed.length, 30);
  assert.equal(parsed[0].street, '0 Main St');
  assert.equal(parsed[29].city, 'Test 29');

  const twoOfficial = [
    { locationNumber: '40', street: '27700 Katy Fwy', city: 'Katy', postalCode: '77494' },
    { locationNumber: '75', street: '3245 N IH 35', city: 'San Marcos', postalCode: '78666' },
  ];
  const twoRegistry = [
    { location_number: '40', street: '27700 Katy Fwy', city: 'Katy', postal_code: '77494', source_url: adapter.sourceUrl, public_locator_enabled: true },
    { location_number: '75', street: '3245 N IH 35', city: 'San Marcos', postal_code: '78666', source_url: adapter.sourceUrl, public_locator_enabled: true },
  ];
  assert.equal(compareOfficialToRegistryForAdapter(adapter, twoOfficial, twoRegistry).matches, true);
  twoRegistry[1].postal_code = '00000';
  assert.equal(compareOfficialToRegistryForAdapter(adapter, twoOfficial, twoRegistry).matches, false);
}

export function runSelfTests(brandSlug = null) {
  const adapters = brandSlug ? [adapterFor(brandSlug)] : Object.values(SOURCE_ADAPTERS);
  for (const adapter of adapters) selfTestAdapter(adapter);
  console.log(`Brand location source verifier self-test passed for ${adapters.map((adapter) => adapter.label).join(', ')}.`);
}

export async function verifyAdapterLive(adapter, { supabaseUrl, serviceRoleKey }) {
  const [officialHtml, registryRows] = await Promise.all([
    requestWithRetry(
      adapter.sourceUrl,
      {
        headers: {
          'user-agent': 'TexasDefined location freshness verifier (+https://texasdefined.com/)',
          accept: 'text/html,application/xhtml+xml',
        },
      },
      `${adapter.label} official locations source`,
    ),
    loadRegistryRows(supabaseUrl, serviceRoleKey, adapter),
  ]);

  const officialLocations = validateOfficialLocations(adapter, adapter.parseOfficialLocations(officialHtml));
  const comparison = compareOfficialToRegistryForAdapter(adapter, officialLocations, registryRows);
  if (!comparison.matches) {
    throw new Error(`${adapter.label} Texas location registry drift detected.\n${JSON.stringify(comparison, null, 2)}`);
  }

  const checkedAt = new Date().toISOString().slice(0, 10);
  const touched = await markRegistryChecked(supabaseUrl, serviceRoleKey, adapter, checkedAt);
  const result = {
    status: 'verified',
    brandSlug: adapter.brandSlug,
    source: adapter.sourceUrl,
    officialCount: comparison.officialCount,
    registryCount: comparison.registryCount,
    checkedAt,
    touched,
  };
  console.log(JSON.stringify(result, null, 2));
  return result;
}

async function liveEnvironment() {
  return {
    supabaseUrl: process.env.SUPABASE_URL?.trim() || 'https://ftkznprjljkhymknvhye.supabase.co',
    serviceRoleKey: requireEnvironment('SUPABASE_SERVICE_ROLE_KEY'),
  };
}

export async function runCli(args = process.argv.slice(2), options = {}) {
  const mode = args[0] ?? '--live-all';
  const forcedBrand = options.forcedBrand ?? null;

  if (mode === '--self-test') {
    runSelfTests(forcedBrand ?? args[1] ?? null);
    return;
  }

  const environment = await liveEnvironment();
  if (mode === '--live') {
    const brandSlug = forcedBrand ?? args[1];
    if (!brandSlug) throw new Error('A brand slug is required with --live.');
    await verifyAdapterLive(adapterFor(brandSlug), environment);
    return;
  }

  if (mode === '--live-all') {
    if (forcedBrand) {
      await verifyAdapterLive(adapterFor(forcedBrand), environment);
      return;
    }

    const failures = [];
    for (const adapter of Object.values(SOURCE_ADAPTERS)) {
      try {
        await verifyAdapterLive(adapter, environment);
      } catch (error) {
        failures.push(`${adapter.label}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    if (failures.length) throw new Error(`Brand location source verification failed:\n${failures.join('\n\n')}`);
    return;
  }

  throw new Error(`Unknown mode: ${mode}. Use --self-test, --live <brand-slug>, or --live-all.`);
}

const invokedDirectly = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) await runCli();
