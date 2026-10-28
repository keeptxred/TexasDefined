import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const censusCountyVintage = JSON.parse(readFileSync(new URL('../../src/data/generated/texas-county-growth-current.json', import.meta.url), 'utf8')).vintage;

const currentBls = JSON.parse(readFileSync(new URL('../../src/data/generated/texas-metro-payrolls-current.json', import.meta.url), 'utf8'));
assert.equal(currentBls.rows?.length, 13, 'Verified source must include all 13 Texas BLS metros');
const currentBlsReleaseLabel = new Date(currentBls.releaseMonth + '-01T12:00:00Z')
  .toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const currentBlsHubPayrolls = [
  'Dallas–Fort Worth–Arlington',
  'Houston–Pasadena–The Woodlands',
  'Austin–Round Rock–San Marcos',
  'San Antonio–New Braunfels',
].map(label => {
  const row = currentBls.rows.find(item => item.label === label);
  assert.ok(row && Number.isInteger(row.value), 'BLS source missing the expected hub metro: ' + label);
  return { label, displayed: row.value.toLocaleString('en-US') };
});

const currentTdi = JSON.parse(readFileSync(new URL('../../src/data/generated/tdi-homeowners-current.json', import.meta.url), 'utf8'));
const latestTdi = currentTdi.rows?.at(-1);
assert.ok(latestTdi && Number.isInteger(latestTdi.premium) && latestTdi.premium > 0,
  'Official maintained TDI premium series must have a valid latest premium');
const currentTdiPremiumLabel = '$' + latestTdi.premium.toLocaleString('en-US');

// Bounded public HTTP acceptance, run by the existing post-deployment smoke workflow.
// No Cloudflare Browser Rendering, direct cache purge, or authenticated API calls.
const domain = 'https://texasdefined.com';
const directWorker = 'https://texasdefined-site.freddy-coppola.workers.dev';
const csvSpecs = [
  {
    path: '/texas-data/county-growth.csv',
    columns: ['fips', 'county_name', 'population_base_2020', 'population_estimate_' + censusCountyVintage, 'population_change', 'population_change_percent'],
    rows: 254,
    uniqueColumn: 'fips',
  },
  {
    path: '/texas-data/county-housing-costs.csv',
    columns: ['fips', 'county', 'median_home_value', 'median_gross_rent', 'median_monthly_owner_costs', 'median_household_income'],
    rows: 254,
    uniqueColumn: 'fips',
  },
  {
    path: '/texas-data/city-county-relationships.csv',
    columns: ['city_name', 'city_slug', 'place_type', 'primary_directory_county', 'all_counties', 'county_count', 'region', 'county_registry_match'],
    rows: 57,
    uniqueColumn: 'city_slug',
  },
  {
    path: '/sports-venues/compare.csv',
    columns: ['venue_name', 'canonical_url', 'city', 'county', 'region', 'venue_type', 'capacity', 'opened', 'source_checked_at', 'official_url'],
    rows: 84,
    uniqueColumn: null,
  },
];

function parseCsv(source) {
  const records = [];
  let record = [], value = '', quoted = false;
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (char === '"') {
      if (quoted && source[i + 1] === '"') { value += '"'; i++; }
      else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      record.push(value); value = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && source[i + 1] === '\n') i++;
      record.push(value); value = '';
      if (record.some(field => field.length)) records.push(record);
      record = [];
    } else value += char;
  }
  assert.equal(quoted, false, 'Unclosed CSV quote');
  if (record.length || value) {
    record.push(value);
    if (record.some(field => field.length)) records.push(record);
  }
  return records;
}

async function get(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(30_000),
    headers: { 'user-agent': 'TexasDefined-Data-Live-Acceptance/1.0', accept: '*/*' },
  });
  assert.equal(response.status, 200, url + ' HTTP status');
  assert.notEqual(response.headers.get('cf-mitigated'), 'challenge', url + ' challenged');
  return { response, body: await response.text() };
}

function validateHub(body, origin) {
  for (const phrase of [
    'Texas at a glance',
    'Major Texas metro payrolls',
    'Texas Metro Nonfarm Payroll Employment — ' + currentBlsReleaseLabel,
    'Texas Defined insurance research',
    'not an exhaustive list of every incorporated municipality',
    currentTdiPremiumLabel,
    'Houston–Pasadena–The Woodlands',
  ]) {
    assert.ok(body.includes(phrase), origin + ' missing new hub content: ' + phrase);
  }
  for (const { label, displayed } of currentBlsHubPayrolls) {
    assert.ok(body.includes(label), origin + ' missing BLS metro: ' + label);
    assert.ok(body.includes(displayed), origin + ' has stale official BLS payroll value for ' + label);
  }
  assert.ok(!body.includes('DFW nonfarm payrolls'), origin + ' still serves old snapshot');
  for (const { path } of csvSpecs) {
    assert.ok(body.includes(path), origin + ' missing CSV link: ' + path);
  }
  assert.ok(body.includes('rel="canonical"') && body.includes(domain + '/texas-data'),
    origin + ' missing canonical');
}

const results = [];
for (const origin of [domain, directWorker]) {
  const { response, body } = await get(origin + '/texas-data');
  assert.match(response.headers.get('content-type') || '', /text\/html/i, origin + ' HTML');
  validateHub(body, origin);
  results.push({ check: 'hub', origin, status: response.status, result: 'PASS' });
  console.log('PASS updated Texas Data hub — ' + origin);
}

// A healthy hub alone is insufficient: its linked canonical dataset detail
// must serve the same actually published source month and all 13 job counts,
// on both Cloudflare's public custom domain and the deployed Worker host.
const metroDetailPath = '/texas-data/texas-metro-payrolls-latest';
const countyGrowthDetailPath = '/texas-data/county-growth';
for (const origin of [domain, directWorker]) {
  const { response: metroResponse, body: metroBody } = await get(origin + metroDetailPath);
  assert.match(metroResponse.headers.get('content-type') || '', /text\/html/i, origin + ' BLS detail HTML');
  assert.ok(metroBody.includes('Texas Metro Nonfarm Payroll Employment — ' + currentBlsReleaseLabel),
    origin + ' published metro detail has the wrong official BLS observation month');
  assert.ok(metroBody.includes(currentBls.sourceUrl),
    origin + ' published metro detail lacks exact source release link');
  assert.ok(metroBody.includes('rel="canonical"') && metroBody.includes(domain + metroDetailPath),
    origin + ' published metro detail missing canonical');
  for (const row of currentBls.rows) {
    assert.ok(metroBody.includes(row.label), origin + ' missing official BLS metro row: ' + row.label);
    assert.ok(metroBody.includes(row.value.toLocaleString('en-US')),
      origin + ' has stale official BLS job count: ' + row.label);
  }
  results.push({ check: 'live-BLS-detail', origin, month: currentBls.releaseMonth, count: currentBls.rows.length, result: 'PASS' });
  console.log('PASS current official BLS dataset ' + currentBls.releaseMonth + ' / 13 metros — ' + origin);

  const { response: countyResponse, body: countyBody } = await get(origin + countyGrowthDetailPath);
  assert.match(countyResponse.headers.get('content-type') || '', /text\/html/i, origin + ' county growth detail HTML');
  assert.ok(countyBody.includes('Texas county population growth, 2020–' + censusCountyVintage),
    origin + ' county growth page vintage does not match verified Census release');
  assert.ok(countyBody.includes('/texas-data/county-growth.csv'),
    origin + ' county growth page lacks governed CSV distribution');
  assert.ok(countyBody.includes('rel="canonical"') && countyBody.includes(domain + countyGrowthDetailPath),
    origin + ' county growth page canonical mismatch');
  results.push({ check: 'live-Census-county-detail', origin, vintage: censusCountyVintage, result: 'PASS' });
  console.log('PASS Census county detail vintage ' + censusCountyVintage + ' — ' + origin);
}

await Promise.all(csvSpecs.map(async ({ path, columns, rows, uniqueColumn }) => {
  const { response, body } = await get(domain + path);
  assert.match(response.headers.get('content-type') || '', /text\/csv/i, path + ' content-type');
  assert.match(response.headers.get('content-disposition') || '', /attachment/i, path + ' download header');
  const csvRows = parseCsv(body);
  assert.deepEqual(csvRows[0], columns, path + ' header');
  assert.equal(csvRows.length - 1, rows, path + ' published row count');
  for (const [index, values] of csvRows.slice(1).entries()) {
    assert.equal(values.length, columns.length, path + ' column count at row ' + (index + 2));
  }
  if (uniqueColumn) {
    const index = columns.indexOf(uniqueColumn);
    const keys = csvRows.slice(1).map(values => values[index]);
    assert.ok(keys.every(Boolean), path + ' blank ' + uniqueColumn);
    assert.equal(new Set(keys).size, rows, path + ' duplicate ' + uniqueColumn);
  }
  results.push({ check: path, rows, bytes: Buffer.byteLength(body), status: response.status, result: 'PASS' });
  console.log('PASS CSV ' + path + ' — ' + rows + ' data records');
}));
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));
