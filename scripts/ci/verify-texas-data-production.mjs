import assert from 'node:assert/strict';

// Bounded public HTTP acceptance, run by the existing post-deployment smoke workflow.
// No Cloudflare Browser Rendering, direct cache purge, or authenticated API calls.
const domain = 'https://texasdefined.com';
const directWorker = 'https://texasdefined-site.freddy-coppola.workers.dev';
const csvSpecs = [
  {
    path: '/texas-data/county-growth.csv',
    columns: ['fips', 'county_name', 'population_base_2020', 'population_estimate_2025', 'population_change', 'population_change_percent'],
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
    'Texas Defined insurance research',
    'not an exhaustive list of every incorporated municipality',
    '$3,489',
    'Houston–Pasadena–The Woodlands',
  ]) {
    assert.ok(body.includes(phrase), origin + ' missing new hub content: ' + phrase);
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
