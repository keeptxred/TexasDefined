#!/usr/bin/env node

import assert from 'node:assert/strict';

const SOURCE_URL = 'https://buc-ees.com/locations/';
const MIN_EXPECTED_TEXAS_LOCATIONS = 30;
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

export function parseOfficialTexasLocations(html) {
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

    locations.push({
      locationNumber,
      headingCity,
      street,
      city,
      postalCode,
    });
  }

  const seen = new Set();
  for (const location of locations) {
    if (seen.has(location.locationNumber)) {
      throw new Error(`Official source returned duplicate Buc-ee's location #${location.locationNumber}.`);
    }
    seen.add(location.locationNumber);
  }

  if (locations.length < MIN_EXPECTED_TEXAS_LOCATIONS) {
    throw new Error(
      `Official source parser found only ${locations.length} Texas locations; expected at least ${MIN_EXPECTED_TEXAS_LOCATIONS}. Treating this as a source/parser failure rather than registry drift.`,
    );
  }

  return locations;
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

export function compareOfficialToRegistry(officialLocations, registryRows) {
  const officialByNumber = new Map(officialLocations.map((row) => [String(row.locationNumber), row]));
  const registryByNumber = new Map();
  const duplicateRegistryNumbers = [];

  for (const row of registryRows) {
    const locationNumber = String(row.location_number ?? '').trim();
    if (!locationNumber) continue;
    if (registryByNumber.has(locationNumber)) duplicateRegistryNumbers.push(locationNumber);
    registryByNumber.set(locationNumber, row);
  }

  const officialOnly = [...officialByNumber.keys()].filter((number) => !registryByNumber.has(number)).sort((a, b) => Number(a) - Number(b));
  const registryOnly = [...registryByNumber.keys()].filter((number) => !officialByNumber.has(number)).sort((a, b) => Number(a) - Number(b));
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
    if (registry.source_url !== SOURCE_URL) {
      differences.push(`source_url registry="${registry.source_url ?? ''}"`);
    }

    if (differences.length > 0) changed.push({ locationNumber: number, differences });
  }

  return {
    officialCount: officialLocations.length,
    registryCount: registryRows.length,
    officialOnly,
    registryOnly,
    duplicateRegistryNumbers: [...new Set(duplicateRegistryNumbers)],
    changed,
    matches:
      officialOnly.length === 0 &&
      registryOnly.length === 0 &&
      duplicateRegistryNumbers.length === 0 &&
      changed.length === 0 &&
      officialLocations.length === registryRows.length,
  };
}

async function requestWithRetry(url, init, label) {
  let lastError;

  for (let attempt = 1; attempt <= REQUEST_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const text = await response.text();
      if (!response.ok) {
        throw new Error(`${label} returned HTTP ${response.status}: ${text.slice(0, 300)}`);
      }
      return text;
    } catch (error) {
      lastError = error;
      if (attempt < REQUEST_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1_500));
      }
    }
  }

  throw new Error(`${label} failed after ${REQUEST_ATTEMPTS} attempts: ${lastError?.message ?? String(lastError)}`);
}

function requireEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required for live registry verification.`);
  return value;
}

async function loadRegistryRows(supabaseUrl, serviceRoleKey) {
  const endpoint = new URL(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/texasdefined_brand_locations`);
  endpoint.searchParams.set('brand_slug', 'eq.bucees');
  endpoint.searchParams.set('state', 'eq.TX');
  endpoint.searchParams.set('status', 'eq.active');
  endpoint.searchParams.set(
    'select',
    'id,location_number,name,street,city,postal_code,source_url,source_checked_at,status',
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
    'Supabase Buc-ee\'s registry query',
  );

  const rows = JSON.parse(text);
  if (!Array.isArray(rows)) throw new Error('Supabase Buc-ee\'s registry query did not return an array.');
  if (rows.length < MIN_EXPECTED_TEXAS_LOCATIONS) {
    throw new Error(`Supabase returned only ${rows.length} active Texas Buc-ee's locations.`);
  }
  return rows;
}

async function markRegistryChecked(supabaseUrl, serviceRoleKey, checkedAt) {
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/rpc/touch_bucees_source_checked`;
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
      body: JSON.stringify({ p_checked_at: checkedAt }),
    },
    'Supabase Buc-ee\'s freshness RPC',
  );

  const touched = Number(JSON.parse(text));
  if (!Number.isInteger(touched) || touched < MIN_EXPECTED_TEXAS_LOCATIONS) {
    throw new Error(`Freshness RPC touched an unexpected number of rows: ${text}`);
  }
  return touched;
}

function selfTest() {
  const padded = Array.from({ length: 30 }, (_unused, index) => {
    const number = 100 + index;
    return `<h4>#${number} – Test ${index}, TX</h4><p>${index} Main St<br>Test ${index}, Texas 75000</p>`;
  }).join('\n');
  const paddedParsed = parseOfficialTexasLocations(padded);
  assert.equal(paddedParsed.length, 30);
  assert.equal(paddedParsed[0].street, '0 Main St');
  assert.equal(paddedParsed[29].city, 'Test 29');

  const twoOfficial = [
    { locationNumber: '40', street: '27700 Katy Fwy', city: 'Katy', postalCode: '77494' },
    { locationNumber: '75', street: '3245 N IH 35', city: 'San Marcos', postalCode: '78666' },
  ];
  const twoRegistry = [
    { location_number: '40', street: '27700 Katy Fwy', city: 'Katy', postal_code: '77494', source_url: SOURCE_URL },
    { location_number: '75', street: '3245 N IH 35', city: 'San Marcos', postal_code: '78666', source_url: SOURCE_URL },
  ];
  assert.equal(compareOfficialToRegistry(twoOfficial, twoRegistry).matches, true);
  twoRegistry[1].postal_code = '00000';
  assert.equal(compareOfficialToRegistry(twoOfficial, twoRegistry).matches, false);

  console.log('Buc-ee\'s location source verifier self-test passed.');
}

async function verifyLive() {
  const supabaseUrl = process.env.SUPABASE_URL?.trim() || 'https://ftkznprjljkhymknvhye.supabase.co';
  const serviceRoleKey = requireEnvironment('SUPABASE_SERVICE_ROLE_KEY');

  const [officialHtml, registryRows] = await Promise.all([
    requestWithRetry(
      SOURCE_URL,
      {
        headers: {
          'user-agent': 'TexasDefined location freshness verifier (+https://texasdefined.com/)',
          accept: 'text/html,application/xhtml+xml',
        },
      },
      'Buc-ee\'s official locations page',
    ),
    loadRegistryRows(supabaseUrl, serviceRoleKey),
  ]);

  const officialLocations = parseOfficialTexasLocations(officialHtml);
  const comparison = compareOfficialToRegistry(officialLocations, registryRows);

  if (!comparison.matches) {
    console.error('Buc-ee\'s Texas location registry drift detected.');
    console.error(JSON.stringify(comparison, null, 2));
    process.exitCode = 1;
    return;
  }

  const checkedAt = new Date().toISOString().slice(0, 10);
  const touched = await markRegistryChecked(supabaseUrl, serviceRoleKey, checkedAt);
  console.log(
    JSON.stringify(
      {
        status: 'verified',
        source: SOURCE_URL,
        officialCount: comparison.officialCount,
        registryCount: comparison.registryCount,
        checkedAt,
        touched,
      },
      null,
      2,
    ),
  );
}

const mode = process.argv[2] ?? '--live';

if (mode === '--self-test') {
  selfTest();
} else if (mode === '--live') {
  await verifyLive();
} else {
  throw new Error(`Unknown mode: ${mode}. Use --self-test or --live.`);
}
