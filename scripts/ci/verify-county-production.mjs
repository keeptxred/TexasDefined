const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sha = process.env.GITHUB_SHA ?? 'local';
const timeoutMs = Number(process.env.COUNTY_SMOKE_TIMEOUT_MS ?? 20000);

function fail(message) {
  console.error(`::error title=County production smoke failed::${message}`);
  process.exitCode = 1;
}

async function request(path, options = {}) {
  const separator = path.includes('?') ? '&' : '?';
  const url = `${origin}${path}${separator}county_smoke=${encodeURIComponent(`${runId}-${sha}`)}`;
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(timeoutMs),
    ...options,
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      ...(options.headers ?? {}),
    },
  });
  return { response, url };
}

async function verifyCountyHub() {
  const { response, url } = await request('/county');
  const body = await response.text();
  if (!response.ok) return fail(`GET ${url} returned ${response.status}.`);

  const markers = [
    'Discover all 254 Texas counties',
    'Every Texas county has a story worth exploring',
    'Search Texas counties',
    'Find DMV and county vehicle offices',
    '/images/texas-county-map-red.svg',
    'Search counties by city',
    'Search counties by ZIP code',
    'Find a county by exact address',
    'All 254 Texas county guides',
  ];
  for (const marker of markers) {
    if (!body.includes(marker)) fail(`GET ${url} is missing required marker: ${marker}`);
  }
  const introduction = body.indexOf('Every Texas county has a story worth exploring');
  const searchHeading = body.indexOf('Search Texas counties');
  if (introduction >= 0 && searchHeading >= 0 && introduction >= searchHeading) {
    fail('County guide introduction must appear before the county search section.');
  }
  if (body.includes('Find the county from what you already know')) {
    fail('County hub must not display the retired county-finder heading.');
  }
}

async function verifyCountyMapAsset() {
  const { response, url } = await request('/images/texas-county-map-red.svg');
  if (!response.ok) return fail(`GET ${url} returned ${response.status}.`);
  const contentType = response.headers.get('content-type') ?? '';
  const body = await response.text();
  if (!contentType.includes('svg')) fail(`County map must be served as SVG: ${contentType || 'missing content-type'}.`);
  if (!body.includes('Map of all 254 Texas counties in red')) fail('County map SVG is missing its descriptive title.');
  const countyCount = (body.match(/<title>[^<]+County<\/title>/g) ?? []).length;
  if (countyCount !== 254) fail(`County map expected 254 geographic shapes, found ${countyCount}.`);
}

async function postLookup(payload) {
  const { response, url } = await request('/api/find-my-county', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let body;
  try {
    body = await response.json();
  } catch {
    fail(`POST ${url} returned non-JSON content with status ${response.status}.`);
    return { response, body: null, url };
  }
  if (!response.ok || !body?.ok) {
    fail(`POST ${url} failed for ${JSON.stringify(payload)} with status ${response.status}: ${JSON.stringify(body)}`);
  }
  return { response, body, url };
}

async function verifyCityLookup() {
  const { response, body } = await postLookup({ city: 'Katy' });
  if (!body?.ok) return;
  const names = new Set((body.counties ?? []).map((county) => county.name));
  for (const expected of ['Fort Bend County', 'Harris County', 'Waller County']) {
    if (!names.has(expected)) fail(`Katy lookup did not include ${expected}. Returned: ${[...names].join(', ') || 'none'}`);
  }
  if (body.queryType !== 'city') fail(`Katy lookup returned queryType=${String(body.queryType)} instead of city.`);
  if (!String(body.source ?? '').includes('Census')) fail('Katy lookup did not identify Census as its source.');
  const cacheControl = response.headers.get('cache-control') ?? '';
  if (!cacheControl.includes('no-store')) fail(`Katy lookup cache-control is not no-store: ${cacheControl || 'missing'}`);
}

async function verifyZipLookup() {
  const { body } = await postLookup({ zip: '77494' });
  if (!body?.ok) return;
  const names = new Set((body.counties ?? []).map((county) => county.name));
  if (!names.has('Fort Bend County')) fail(`77494 lookup did not include Fort Bend County. Returned: ${[...names].join(', ') || 'none'}`);
  if (body.queryType !== 'zip') fail(`77494 lookup returned queryType=${String(body.queryType)} instead of zip.`);
}

async function verifyAddressLookup() {
  const { body } = await postLookup({ address: '1100 Congress Ave, Austin, TX 78701' });
  if (!body?.ok) return;
  if (body.countyName !== 'Travis County') fail(`1100 Congress Ave lookup returned ${String(body.countyName)} instead of Travis County.`);
  if (body.countyUrl !== '/county/travis') fail(`1100 Congress Ave lookup returned countyUrl=${String(body.countyUrl)} instead of /county/travis.`);
  if (!String(body.source ?? '').includes('Census')) fail('Address lookup did not identify Census as its source.');
}

try {
  await verifyCountyHub();
  await verifyCountyMapAsset();
  await verifyCityLookup();
  await verifyZipLookup();
  await verifyAddressLookup();
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

if (!process.exitCode) {
  console.log('County production smoke passed: updated county hub, 254-shape red map, multi-county city lookup, ZIP lookup and exact-address lookup are live.');
}
