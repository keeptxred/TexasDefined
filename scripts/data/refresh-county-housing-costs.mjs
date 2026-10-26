import fs from 'node:fs/promises';
import path from 'node:path';

// Choose the newest *complete* published ACS five-year vintage, never the newest calendar year.
const FIRST_SUPPORTED_YEAR = 2024;
let YEAR = FIRST_SUPPORTED_YEAR;
let RELEASE = '';
let BASE = '';
let SOURCE_PAGE = '';
const sourceBase = year => `https://www2.census.gov/programs-surveys/acs/summary_file/${year}/table-based-SF/data/5YRData`;
const OUTPUT = path.resolve('src/data/acs-county-housing-costs.snapshot.json');
const TEXAS_COUNTY_COUNT = 254;

const TABLES = [
  { table: 'b19013', variable: 'B19013_E001', field: 'medianHouseholdIncome' },
  { table: 'b25064', variable: 'B25064_E001', field: 'medianGrossRent' },
  { table: 'b25077', variable: 'B25077_E001', field: 'medianHomeValue' },
  { table: 'b25088', variable: 'B25088_E001', field: 'medianMonthlyOwnerCosts' },
];

function parseDataLine(line) {
  return line.split('|');
}

async function readLines(url, onLine) {
  const response = await fetch(url, { headers: { accept: 'text/plain' } });
  if (!response.ok || !response.body) throw new Error(`Census download failed: ${response.status} ${url}`);
  const decoder = new TextDecoder();
  let buffer = '';
  for await (const chunk of response.body) {
    buffer += decoder.decode(chunk, { stream: true });
    let newline;
    while ((newline = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, newline).replace(/\r$/, '');
      buffer = buffer.slice(newline + 1);
      await onLine(line);
    }
  }
  buffer += decoder.decode();
  if (buffer) await onLine(buffer.replace(/\r$/, ''));
}

async function loadTable({ table, variable, field }) {
  const url = `${BASE}/acsdt5y${YEAR}-${table}.dat`;
  const values = new Map();
  let header = null;
  let geoIndex = -1;
  let valueIndex = -1;
  await readLines(url, (line) => {
    if (!line) return;
    const cells = parseDataLine(line);
    if (!header) {
      header = cells.map((cell) => cell.replace(/^\uFEFF/, '').trim());
      geoIndex = header.indexOf('GEO_ID');
      valueIndex = header.indexOf(variable);
      if (geoIndex < 0 || valueIndex < 0) {
        throw new Error(`${table} missing GEO_ID or ${variable}; first row has ${header.length} fields: ${header.slice(0, 12).join(' | ')}`);
      }
      return;
    }
    const geoId = String(cells[geoIndex] || '');
    if (!/^0500000US48\d{3}$/.test(geoId)) return;
    const numeric = Number(cells[valueIndex]);
    const estimate = Number.isFinite(numeric) && numeric >= 0 ? numeric : null;
    values.set(geoId.slice(-5), estimate);
  });
  if (values.size !== TEXAS_COUNTY_COUNT) {
    throw new Error(`${table} source coverage expected ${TEXAS_COUNTY_COUNT} Texas counties; found ${values.size}`);
  }
  const suppressed = [...values.values()].filter((value) => value === null).length;
  console.log(`${table}: ${values.size} Texas county rows; ${suppressed} suppressed/unavailable estimate(s).`);
  return { field, url, values };
}

// A missing first table means that vintage has not been published; an HTTP error other
// than 404 is a source failure. Once the first table exists, ALL four must validate
// before promotion; partial releases are never silently treated as complete.
let existing = null;
try { existing = JSON.parse(await fs.readFile(OUTPUT, 'utf8')); }
catch { /* The first bootstrap has no snapshot. */ }
const priorYear = Number(existing?.year || FIRST_SUPPORTED_YEAR);
if (!Number.isInteger(priorYear) || priorYear < FIRST_SUPPORTED_YEAR || priorYear > new Date().getUTCFullYear()) {
  throw new Error('Stored Census ACS vintage metadata is invalid');
}
const candidateMax = Math.min(new Date().getUTCFullYear() - 1, priorYear + 1);
let selected = null;
for (let candidate = candidateMax; candidate >= priorYear; candidate--) {
  const url = `${sourceBase(candidate)}/acsdt5y${candidate}-b19013.dat`;
  const response = await fetch(url, { headers: { range: 'bytes=0-255' }, signal: AbortSignal.timeout(20_000) });
  if (response.status === 404) continue;
  if (![200, 206].includes(response.status)) throw new Error('Census ACS availability probe failed: ' + response.status + ' ' + url);
  await response.body?.cancel();
  selected = candidate;
  break;
}
if (selected === null) throw new Error('Previously verified Census ACS vintage is no longer reachable');
YEAR = selected;
RELEASE = `${YEAR - 4}–${YEAR} ACS 5-Year Estimates`;
BASE = sourceBase(YEAR);
SOURCE_PAGE = `https://www.census.gov/programs-surveys/acs/data/summary-file.${YEAR}.html`;
console.log('Checking the complete official Census ACS five-year release for ' + YEAR);
const tables = [];
for (const spec of TABLES) tables.push(await loadTable(spec));

const fips = [...tables[0].values.keys()].filter((code) => tables.every((table) => table.values.has(code))).sort();
if (fips.length !== TEXAS_COUNTY_COUNT) {
  throw new Error(`Expected ${TEXAS_COUNTY_COUNT} counties across all required ACS tables; found ${fips.length}`);
}

const rows = fips.map((code) => Object.fromEntries([
  ['fips', code],
  ...tables.map((table) => [table.field, table.values.get(code) ?? null]),
]));
const sourceFiles = Object.fromEntries(tables.map((table) => [table.field, table.url]));

const stablePayload = {
  release: RELEASE,
  year: YEAR,
  sourcePage: SOURCE_PAGE,
  sourceFiles,
  rowCount: rows.length,
  rows,
};
const existingStablePayload = existing ? {
  release: existing.release,
  year: existing.year,
  sourcePage: existing.sourcePage,
  sourceFiles: existing.sourceFiles,
  rowCount: existing.rowCount,
  rows: existing.rows,
} : null;
const dataChanged = JSON.stringify(stablePayload) !== JSON.stringify(existingStablePayload);

const snapshot = {
  release: RELEASE,
  year: YEAR,
  generatedAt: dataChanged || !existing?.generatedAt ? new Date().toISOString() : existing.generatedAt,
  sourcePage: SOURCE_PAGE,
  sourceFiles,
  rowCount: rows.length,
  rows,
};

await fs.writeFile(OUTPUT, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(`${dataChanged ? 'Refreshed' : 'Verified unchanged'} ${rows.length} Texas county housing/cost rows in ${OUTPUT}`);
