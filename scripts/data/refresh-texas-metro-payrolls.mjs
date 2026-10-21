import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const tableUrl = 'https://www.bls.gov/news.release/metro.t03.htm';
const summaryUrl = 'https://www.bls.gov/news.release/metro.nr0.htm';
const dataPath = 'src/data/generated/texas-metro-payrolls-current.json';
const bridgePath = 'src/data/texas-data-center.ts';
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const fredSeries = [
  'DALL148NAN', 'HOUS448NAN', 'AUST448NAN', 'SANA748NAN', 'ELPA348NAN',
  'MCAL548NAN', 'CORP548NAN', 'LUBB148NAN', 'BROW148NAN',
  'COLL748NAN', 'WACO348NAN', 'AMAR148NAN', 'TYLE348NAN',
];
const fredCsvUrl = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=' + fredSeries.join(',');

const canonicalAreas = [
  ['Dallas–Fort Worth–Arlington','Dallas-Fort Worth-Arlington'],
  ['Houston–Pasadena–The Woodlands','Houston-Pasadena-The Woodlands'],
  ['Austin–Round Rock–San Marcos','Austin-Round Rock-San Marcos'],
  ['San Antonio–New Braunfels','San Antonio-New Braunfels'],
  ['El Paso','El Paso'],
  ['McAllen–Edinburg–Mission','McAllen-Edinburg-Mission'],
  ['Corpus Christi','Corpus Christi'],
  ['Lubbock','Lubbock'],
  ['Brownsville–Harlingen','Brownsville-Harlingen'],
  ['College Station–Bryan','College Station-Bryan'],
  ['Waco','Waco'],
  ['Amarillo','Amarillo'],
  ['Tyler','Tyler'],
];
function decode(s) {
  return s.replace(/&nbsp;|&#160;/gi, ' ').replace(/&ndash;|&#8211;/gi, '–')
    .replace(/&mdash;|&#8212;/gi, '—').replace(/&amp;/gi, '&')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}
function plain(html) {
  return decode(html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}
const normal = s => plain(s).replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase()
  .replace(/\s*\(\d+\)$/, '');
function parseNumber(cell) {
  const s = plain(cell).replace(/\(p\)/gi, '').trim();
  return /^(?:\d{1,3}(?:,\d{3})*|\d+)\.\d$/.test(s) ? Math.round(Number(s.replaceAll(',', '')) * 1000) : null;
}
export function parseCurrentRelease(summaryHtml) {
  const source = plain(summaryHtml);
  const period = source.match(/METROPOLITAN AREA EMPLOYMENT AND UNEMPLOYMENT\s*[-–—]\s*([A-Za-z]+)\s+(\d{4})/i);
  if (!period) throw new Error('BLS metropolitan news release month/year absent');
  const monthIndex = monthNames.findIndex(m => m.toLowerCase() === period[1].toLowerCase());
  const year = Number(period[2]);
  if (monthIndex < 0 || year < 2026 || year > new Date().getUTCFullYear()) throw new Error('Unrecognized BLS news release vintage');
  const publication = source.match(/For release[^]{0,130}?\b([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})/i);
  if (!publication) throw new Error('BLS publication date absent');
  const pubMonth = monthNames.findIndex(m => m.toLowerCase() === publication[1].toLowerCase());
  const pubDay = Number(publication[2]), pubYear = Number(publication[3]);
  const published = new Date(Date.UTC(pubYear, pubMonth, pubDay));
  if (pubMonth < 0 || published.getUTCMonth() !== pubMonth || published.getUTCDate() !== pubDay ||
      published.getUTCFullYear() !== pubYear || published > new Date() || pubYear < year) {
    throw new Error('BLS publication date implausible');
  }
  const releaseMonth = year + '-' + String(monthIndex + 1).padStart(2, '0');
  const publishedDate = published.toISOString().slice(0, 10);
  const sourceUrl = 'https://www.bls.gov/news.release/archives/metro_' +
    String(pubMonth + 1).padStart(2, '0') + String(pubDay).padStart(2, '0') + pubYear + '.htm';
  return { releaseMonth, publishedDate, sourceUrl };
}
export function parseMetroTable(html) {
  if (!/Employees on nonfarm payrolls by state and metropolitan area/i.test(plain(html))) {
    throw new Error('BLS Table 3 heading missing: source format may have changed');
  }
  const mapped = new Map();
  for (const match of html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...match[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/gi)].map(m => m[1]);
    if (cells.length < 5) continue;
    const key = normal(cells[0]);
    const expected = canonicalAreas.find(([, official]) => normal(official) === key);
    if (!expected) continue;
    // BLS Table 3: prior-year prior-month, current-year prior-month,
    // prior-year release-month, current-year release-month, delta, percent.
    // A column-layout change must fail, not silently use the wrong value.
    const values = cells.slice(1).map(parseNumber);
    if (values.length < 4 || values.slice(0, 4).some(n => n === null)) {
      throw new Error('Unexpected BLS Table 3 numeric format for ' + expected[0]);
    }
    if (mapped.has(expected[0])) throw new Error('Duplicate BLS metro row: ' + expected[0]);
    mapped.set(expected[0], values[3]);
  }
  if (mapped.size !== canonicalAreas.length) {
    throw new Error('Incomplete BLS Table 3 metros: found ' + mapped.size + '/' + canonicalAreas.length);
  }
  return canonicalAreas.map(([label]) => ({ label, value: mapped.get(label) }));
}
// FRED is a Federal Reserve Bank of St. Louis distribution of the SAME monthly,
// not-seasonally-adjusted BLS metro employment series. Use only matching vintages
// and all 13 named series, never mix adjusted/annual/unrelated data.
export function parseFredCsv(csv, previous, checkedAt = new Date().toISOString().slice(0, 10)) {
  const lines = csv.replace(/^\uFEFF/, '').trim().split(/\r?\n/).map(line => line.split(','));
  const header = lines.shift()?.map(x => x.trim().replace(/^"|"$/g, ''));
  if (!header || !['observation_date', 'DATE'].includes(header[0])) throw new Error('Unrecognized FRED CSV date header');
  if (header.length !== fredSeries.length + 1 ||
      !fredSeries.every((id, i) => header[i + 1] === id)) {
    throw new Error('FRED source changed the required 13 monthly BLS series');
  }
  const candidates = lines.filter(fields => /^\d{4}-\d{2}-01$/.test(fields[0]) &&
    fields.length === header.length && fields.slice(1).every(n => /^\d+(?:\.\d+)?$/.test(n)));
  const record = candidates.at(-1);
  if (!record) throw new Error('FRED BLS source returned no complete monthly Texas observation');
  const month = record[0].slice(0, 7);
  const rows = record.slice(1).map((n, i) => ({ label: canonicalAreas[i][0], value: Math.round(Number(n) * 1000) }));
  const same = month === previous.releaseMonth && rows.every((row, i) =>
    previous.rows[i]?.label === row.label && previous.rows[i]?.value === row.value);
  return {
    releaseMonth: month,
    publishedDate: same ? previous.publishedDate : checkedAt,
    sourceUrl: fredCsvUrl,
    units: 'total nonfarm payroll jobs, not seasonally adjusted',
    rows,
  };
}
async function fredSource() {
  const response = await fetch(fredCsvUrl, {
    signal: AbortSignal.timeout(25_000),
    headers: { accept: 'text/csv' },
  });
  if (response.status !== 200) throw new Error('Federal Reserve BLS-series source unavailable: HTTP ' + response.status);
  const body = await response.text();
  if (body.length < 300) throw new Error('Federal Reserve BLS-series CSV unexpectedly short');
  return body;
}

export function validateFresh(data, previous) {
  if (!/^\d{4}-\d{2}$/.test(data.releaseMonth) || !/^\d{4}-\d{2}-\d{2}$/.test(data.publishedDate) ||
      !(data.sourceUrl.startsWith('https://www.bls.gov/news.release/archives/metro_') ||
        data.sourceUrl.startsWith('https://fred.stlouisfed.org/graph/fredgraph.csv?id='))) {
    throw new Error('Malformed BLS period or provenance');
  }
  if (data.releaseMonth < previous.releaseMonth) throw new Error('New BLS release is older than the published snapshot');
  if (data.rows.length !== canonicalAreas.length || previous.rows.length !== canonicalAreas.length) {
    throw new Error('Metro comparison row count changed');
  }
  for (const [index, row] of data.rows.entries()) {
    const prev = previous.rows[index];
    if (row.label !== canonicalAreas[index][0] || prev.label !== row.label ||
        !Number.isInteger(row.value) || row.value < 50_000 ||
        Math.abs(row.value - prev.value) / prev.value > 0.2) {
      throw new Error('BLS metro row changed beyond controlled limits: ' + row.label);
    }
  }
}
async function official(url) {
  const response = await fetch(url, { headers: { accept: 'text/html' }, signal: AbortSignal.timeout(25_000) });
  if (response.status !== 200) throw new Error('Official BLS source unavailable: ' + url + ' HTTP ' + response.status);
  const html = await response.text();
  if (html.length < 6000) throw new Error('BLS source unexpectedly short: ' + url);
  return html;
}
export async function refresh({ fetchSource = official, read = p => fs.readFile(p, 'utf8'), write = (p, v) => fs.writeFile(p, v) } = {}) {
  const previous = JSON.parse(await read(dataPath));
  // Independent official summary corroborates the latest-month Table 3.
  let data;
  try {
    const [releaseHtml, tableHtml] = await Promise.all([fetchSource(summaryUrl), fetchSource(tableUrl)]);
    const release = parseCurrentRelease(releaseHtml);
    const rows = parseMetroTable(tableHtml);
    data = { ...release, units: 'total nonfarm payroll jobs, not seasonally adjusted', rows };
  } catch (error) {
    console.warn('Direct BLS source failed; checking Federal Reserve BLS-series distribution: ' + String(error));
    data = parseFredCsv(await fredSource(), previous);
  }
  validateFresh(data, previous);
  if (JSON.stringify(data) === JSON.stringify(previous)) {
    console.log('BLS metros reviewed; unchanged ' + data.releaseMonth + ' (' + data.rows.length + ' metros)');
    return false;
  }
  const updated = release.publishedDate;
  const bridge = await read(bridgePath);
  const match = bridge.match(/(\{ slug: 'texas-metro-payrolls-latest', updated: ')(\d{4}-\d{2}-\d{2})(' \})/);
  if (!match) throw new Error('Texas Data sitemap latest BLS updated marker missing');
  const replaced = bridge.replace(match[0], match[1] + updated + match[3]);
  // Only write after all independent source/format, row and bridge checks pass.
  await write(dataPath, JSON.stringify(data, null, 2) + '\n');
  if (bridge !== replaced) await write(bridgePath, replaced);
  console.log('Updated current BLS Texas metro payrolls: ' + data.releaseMonth + '; ' + data.rows.length + ' metros; ' + data.sourceUrl);
  return true;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  refresh().catch(error => { console.error(error); process.exitCode = 1; });
}
