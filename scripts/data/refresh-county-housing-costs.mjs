import fs from 'node:fs/promises';
import path from 'node:path';

const YEAR = 2024;
const RELEASE = '2020–2024 ACS 5-Year Estimates';
const BASE = `https://www2.census.gov/programs-surveys/acs/summary_file/${YEAR}/table-based-SF/data/5YRData`;
const SOURCE_PAGE = `https://www.census.gov/programs-surveys/acs/data/summary-file.${YEAR}.html`;
const OUTPUT = path.resolve('src/data/acs-county-housing-costs.snapshot.json');

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
    if (!Number.isFinite(numeric) || numeric < 0) return;
    values.set(geoId.slice(-5), numeric);
  });
  if (values.size < 250) throw new Error(`${table} produced only ${values.size} Texas county rows`);
  return { field, url, values };
}

const tables = [];
for (const spec of TABLES) tables.push(await loadTable(spec));

const fips = [...tables[0].values.keys()].filter((code) => tables.every((table) => table.values.has(code))).sort();
if (fips.length < 250) throw new Error(`Only ${fips.length} counties have all required ACS measures`);

const rows = fips.map((code) => Object.fromEntries([
  ['fips', code],
  ...tables.map((table) => [table.field, table.values.get(code)]),
]));

const snapshot = {
  release: RELEASE,
  year: YEAR,
  generatedAt: new Date().toISOString(),
  sourcePage: SOURCE_PAGE,
  sourceFiles: Object.fromEntries(tables.map((table) => [table.field, table.url])),
  rowCount: rows.length,
  rows,
};

await fs.writeFile(OUTPUT, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
console.log(`Wrote ${rows.length} Texas county housing/cost rows to ${OUTPUT}`);
