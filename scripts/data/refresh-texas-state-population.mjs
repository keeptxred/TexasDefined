import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const output = 'src/data/generated/texas-state-population-current.json';
const bridgePath = 'src/data/texas-data-center.ts';
export const censusUrl = vintage =>
  'https://www2.census.gov/programs-surveys/popest/datasets/2020-' + vintage +
  '/state/totals/NST-EST' + vintage + '-ALLDATA.csv';

function cells(line) {
  const result = [];
  let field = '', quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      result.push(field.trim()); field = '';
    } else field += char;
  }
  if (quoted) throw new Error('Unclosed Census CSV quoted field');
  result.push(field.trim());
  return result;
}

export function parseTexasStateCensus(csv, vintage) {
  if (!Number.isInteger(vintage) || vintage < 2025 || vintage > 2040) throw new Error('Unsupported Census vintage');
  const lines = csv.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  if (lines.length < 2) throw new Error('Census state CSV has no source rows');
  const header = cells(lines[0]).map(v => v.toUpperCase());
  if (header.length !== new Set(header).size) throw new Error('Census CSV duplicate columns');
  const positions = new Map(header.map((name, i) => [name, i]));
  const required = ['SUMLEV', 'STATE', 'NAME', 'POPESTIMATE' + vintage,
    'POPESTIMATE' + (vintage - 1), 'NPOPCHG_' + vintage, 'DOMESTICMIG' + vintage,
    'INTERNATIONALMIG' + vintage, 'NATURALCHG' + vintage, 'RESIDUAL' + vintage];
  for (const name of required) if (!positions.has(name)) {
    throw new Error('Census source missing official ' + name + ' column');
  }
  const records = lines.slice(1).filter(Boolean).map(cells);
  const texas = records.filter(record =>
    record[positions.get('SUMLEV')] === '040' &&
    record[positions.get('STATE')] === '48' &&
    record[positions.get('NAME')] === 'Texas');
  if (texas.length !== 1) throw new Error('Expected exactly one official Texas state record');
  const record = texas[0];
  if (record.length !== header.length) throw new Error('Census Texas data row length changed');
  const field = name => {
    const raw = record[positions.get(name)];
    if (!/^-?\d+$/.test(raw || '')) throw new Error('Census numeric field malformed: ' + name);
    return Number(raw);
  };
  const population = field('POPESTIMATE' + vintage);
  const priorPopulation = field('POPESTIMATE' + (vintage - 1));
  const populationChange = field('NPOPCHG_' + vintage);
  const domesticMigration = field('DOMESTICMIG' + vintage);
  const internationalMigration = field('INTERNATIONALMIG' + vintage);
  const naturalIncrease = field('NATURALCHG' + vintage);
  const residual = field('RESIDUAL' + vintage);
  if (population < 25_000_000 || population > 50_000_000 || priorPopulation < 25_000_000 ||
      population - priorPopulation !== populationChange ||
      naturalIncrease + domesticMigration + internationalMigration + residual !== populationChange ||
      Math.abs(populationChange) > 2_000_000 || Math.abs(residual) > 200_000 ||
      Math.abs(domesticMigration) > 1_000_000 || Math.abs(internationalMigration) > 1_000_000) {
    throw new Error('Census Texas source components or population failed consistency bounds');
  }
  return { vintage, sourceUrl: censusUrl(vintage), population, priorPopulation,
    populationChange, domesticMigration, internationalMigration, naturalIncrease };
}

export function verifySource(candidate, previous) {
  if (candidate.vintage < previous.vintage || candidate.vintage > previous.vintage + 1) {
    throw new Error('Census source year moved backwards or skipped a vintage');
  }
  if (Math.abs(candidate.population / previous.population - 1) > 0.12) {
    throw new Error('Census Texas population changed beyond a safe annual review bound');
  }
  return candidate;
}

async function officialCsv(vintage) {
  const url = censusUrl(vintage);
  const response = await fetch(url, {
    headers: { accept: 'text/csv' }, signal: AbortSignal.timeout(25_000),
  });
  if (response.status === 404) return null;
  if (response.status !== 200) throw new Error('Official Census source returned ' + response.status + ' for ' + url);
  const csv = await response.text();
  if (csv.length < 15_000 || csv.length > 1_000_000 || /<html/i.test(csv.slice(0, 200))) {
    throw new Error('Official Census data is incomplete or not CSV');
  }
  return csv;
}

export async function refresh({ load = p => fs.readFile(p, 'utf8'),
  save = (p, value) => fs.writeFile(p, value),
  download = officialCsv } = {}) {
  const previous = JSON.parse(await load(output));
  if (!Number.isInteger(previous.vintage) || previous.vintage < 2025) {
    throw new Error('Previously published Census vintage is invalid');
  }
  const nextVintage = previous.vintage + 1;
  let vintage = previous.vintage;
  let csv = null;
  if (nextVintage <= new Date().getUTCFullYear()) {
    csv = await download(nextVintage);
    if (csv !== null) vintage = nextVintage;
  }
  if (csv === null) csv = await download(previous.vintage);
  if (csv === null) throw new Error('Current official Census source has disappeared');
  const fresh = verifySource(parseTexasStateCensus(csv, vintage), previous);
  const oldStable = { ...previous }; delete oldStable.verifiedAt;
  if (JSON.stringify(fresh) === JSON.stringify(oldStable)) {
    console.log('Census Texas population verified unchanged: Vintage ' + vintage);
    return false;
  }
  const bridge = await load(bridgePath);
  const marker = bridge.match(/(\{ slug: 'texas-population-and-migration-latest', updated: ')(\d{4}-\d{2}-\d{2})(' \})/);
  if (!marker) throw new Error('Texas population sitemap metadata entry is missing');
  const checkedAt = new Date().toISOString().slice(0, 10);
  const updated = bridge.replace(marker[0], marker[1] + checkedAt + marker[3]);
  await save(output, JSON.stringify({ ...fresh, verifiedAt: checkedAt }, null, 2) + '\n');
  if (updated !== bridge) await save(bridgePath, updated);
  console.log('Official Census Texas population updated from complete Vintage ' + vintage);
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  refresh().catch(error => { console.error(error); process.exitCode = 1; });
}
