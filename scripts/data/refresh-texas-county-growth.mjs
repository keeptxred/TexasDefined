import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const OUTPUT = 'src/data/generated/texas-county-growth-current.json';
export const sourceUrl = vintage => 'https://www2.census.gov/programs-surveys/popest/datasets/2020-' + vintage + '/counties/totals/co-est' + vintage + '-alldata.csv';
const PAGE = 'https://www.census.gov/data/datasets/time-series/demo/popest/2020s-counties-total.html';

function cells(line) {
  let field = '', quoted = false;
  const result = [];
  for (let i = 0; i < line.length; ++i) {
    if (line[i] === '"') {
      if (quoted && line[i + 1] === '"') { field += '"'; ++i; }
      else quoted = !quoted;
    } else if (line[i] === ',' && !quoted) {
      result.push(field.trim()); field = '';
    } else field += line[i];
  }
  if (quoted) throw Error('Unclosed Census CSV quote');
  result.push(field.trim());
  return result;
}

export function parseTexasCountyGrowth(csv, vintage) {
  if (!Number.isInteger(vintage) || vintage < 2025 || vintage > 2029) {
    throw Error('Census 2020 estimates base requires methodology review outside 2025–2029');
  }
  const lines = csv.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  if (lines.length < 256) throw Error('Incomplete official county source');
  const headings = cells(lines.shift()).map(h => h.toUpperCase());
  if (new Set(headings).size !== headings.length) throw Error('Duplicate source columns');
  const ix = new Map(headings.map((h, i) => [h, i]));
  for (const key of ['SUMLEV','STATE','COUNTY','CTYNAME','ESTIMATESBASE2020','POPESTIMATE' + vintage]) {
    if (!ix.has(key)) throw Error('Missing Census county column ' + key);
  }
  const getNum = (row, key) => {
    const value = row[ix.get(key)];
    if (!/^\d+$/.test(value || '')) throw Error('Invalid official number for ' + key);
    const number = Number(value);
    if (!Number.isSafeInteger(number)) throw Error('Unsafe official number for ' + key);
    return number;
  };
  const state = [];
  const rows = [];
  const seen = new Set();
  for (const line of lines) {
    if (!line) continue;
    const row = cells(line);
    if (row.length !== headings.length) throw Error('Malformed Census CSV row');
    if (row[ix.get('STATE')] !== '48') continue;
    const level = row[ix.get('SUMLEV')], county = row[ix.get('COUNTY')];
    if (level === '040' && county === '000') {
      state.push(getNum(row, 'POPESTIMATE' + vintage)); continue;
    }
    if (level !== '050') continue;
    const code = Number(county);
    if (!/^\d{3}$/.test(county) || code < 1 || code > 507 || code % 2 !== 1) {
      throw Error('Invalid Texas county FIPS ' + county);
    }
    const fips = '48' + county;
    if (seen.has(fips)) throw Error('Duplicate Texas county FIPS ' + fips);
    seen.add(fips);
    const countyName = row[ix.get('CTYNAME')];
    if (!/ County(?:, Texas)?$/.test(countyName)) throw Error('Unexpected Texas county name ' + countyName);
    const populationBase2020 = getNum(row, 'ESTIMATESBASE2020');
    const populationEstimate = getNum(row, 'POPESTIMATE' + vintage);
    if (populationBase2020 < 20 || populationEstimate < 20 || populationEstimate > 6_000_000) {
      throw Error('Implausible official county population ' + fips);
    }
    const populationChange = populationEstimate - populationBase2020;
    rows.push({ fips, countyName, populationBase2020, populationEstimate,
      populationChange, populationChangePercent: populationChange / populationBase2020 * 100 });
  }
  if (rows.length !== 254 || seen.size !== 254) throw Error('Expected 254 complete Texas county records');
  for (let code = 1; code <= 507; code += 2) {
    if (!seen.has('48' + String(code).padStart(3, '0'))) throw Error('Missing Texas county FIPS ' + code);
  }
  const sum = rows.reduce((acc, row) => acc + row.populationEstimate, 0);
  if (state.length !== 1 || state[0] !== sum) {
    throw Error('Official county sum does not reconcile to Texas state total');
  }
  if (sum < 25_000_000 || sum > 50_000_000) throw Error('Implausible statewide county sum');
  rows.sort((a, b) => a.fips.localeCompare(b.fips));
  return { vintage, asOf: vintage + '-07-01', sourceUrl: PAGE, sourceFileUrl: sourceUrl(vintage), rows };
}

export function validateRollover(fresh, previous) {
  if (!previous) return fresh;
  if (fresh.vintage < previous.vintage || fresh.vintage > previous.vintage + 1) {
    throw Error('Census county vintage moved backwards or skipped');
  }
  if (previous.rows?.length !== 254) throw Error('Previous Census county snapshot incomplete');
  const oldByFips = new Map(previous.rows.map(row => [row.fips, row]));
  if (oldByFips.size !== 254) throw Error('Previous Census county FIPS duplicates');
  for (const row of fresh.rows) {
    const old = oldByFips.get(row.fips);
    if (!old || old.countyName !== row.countyName) throw Error('Changed Census county identity ' + row.fips);
    if (Math.abs(row.populationEstimate / old.populationEstimate - 1) > 0.30 ||
        Math.abs(row.populationBase2020 / old.populationBase2020 - 1) > 0.10) {
      throw Error('Census county revision needs manual methodology review ' + row.fips);
    }
  }
  return fresh;
}

async function download(vintage) {
  const response = await fetch(sourceUrl(vintage), {
    headers: { accept: 'text/csv' }, signal: AbortSignal.timeout(40_000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw Error('Official Census county source returned HTTP ' + response.status);
  const csv = await response.text();
  if (csv.length < 30_000 || csv.length > 35_000_000 || /<html/i.test(csv.slice(0, 200))) {
    throw Error('Official Census county file incomplete or not CSV');
  }
  return csv;
}

export async function refresh({ read = file => fs.readFile(file, 'utf8'),
  write = (file, value) => fs.writeFile(file, value),
  fetchSource = download, now = new Date() } = {}) {
  let previous;
  try { previous = JSON.parse(await read(OUTPUT)); }
  catch (e) { if (e.code !== 'ENOENT') throw e; }
  const next = previous ? previous.vintage + 1 : 2025;
  let vintage = previous?.vintage ?? 2025;
  let csv = null;
  if (next <= now.getUTCFullYear() && next <= 2029) {
    csv = await fetchSource(next);
    if (csv !== null) vintage = next;
  }
  if (csv === null) csv = await fetchSource(vintage);
  if (csv === null) throw Error('Latest published Census county source missing');
  const fresh = validateRollover(parseTexasCountyGrowth(csv, vintage), previous);
  if (previous && JSON.stringify(fresh) === JSON.stringify({
    vintage: previous.vintage, asOf: previous.asOf, sourceUrl: previous.sourceUrl,
    sourceFileUrl: previous.sourceFileUrl, rows: previous.rows
  })) {
    console.log('Census county data checked; unchanged Vintage ' + vintage); return false;
  }
  await write(OUTPUT, JSON.stringify({ ...fresh, verifiedAt: now.toISOString().slice(0, 10) }, null, 2) + '\n');
  console.log('Verified all 254 Census Texas county rows, Vintage ' + vintage);
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  refresh().catch(error => { console.error(error); process.exitCode = 1; });
}
