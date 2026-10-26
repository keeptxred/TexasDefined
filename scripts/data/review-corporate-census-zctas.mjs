/**
 * Offline, read-only research of Census ZCTA points and county associations.
 * No network calls, no user ZIP logging, no production DB, and NO radius enrollments.
 * Extract the official national 2026 ZCTA zip yourself; do not infer TX from 7xxxx.
 *
 * node scripts/data/review-corporate-census-zctas.mjs \
 *   --gazetteer .artifacts/corporate-events/2026_Gaz_zcta_national.txt \
 *   --counties .artifacts/corporate-events/tab20_zcta520_county20_natl.txt \
 *   --zips 77030,77058,77020,77034,77056 \
 *   --output .artifacts/corporate-events/zcta-review.json
 */
import { readFile, writeFile, mkdir, lstat } from 'node:fs/promises';
import { resolve, relative, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

export const ZCTA_GAZETTEER_SOURCE =
  'https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2026_Gazetteer/2026_Gaz_zcta_national.zip';
export const COUNTY_RELATIONSHIP_SOURCE =
  'https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/tab20_zcta520_county20_natl.txt';
const ROOT = resolve('.artifacts/corporate-events');
const MAX_ZIPS = 25;
const realDay = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const n = Date.parse(value + 'T12:00:00Z');
  return Number.isFinite(n) && new Date(n).toISOString().slice(0, 10) === value;
};

function parseDelimited(text, wanted, label) {
  if (typeof text !== 'string' || !text.length) throw new Error(label + ': missing source text');
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(line => line.trim() !== '');
  const header = lines.shift();
  const delimiter = header.includes('|') ? '|' : '\t';
  const columns = header.split(delimiter).map(value => value.trim());
  const indexes = wanted.map(key => columns.indexOf(key));
  if (indexes.some(index => index < 0) || new Set(columns).size !== columns.length) {
    throw new Error(label + ': unexpected official header; inspect source layout before continuing');
  }
  if (lines.length < 1 || lines.length > 100000) throw new Error(label + ': impossible file row count');
  return lines.map(line => {
    const values = line.split(delimiter);
    return indexes.map(index => (values[index] ?? '').trim());
  });
}

export function reviewCensusZctaSources(gazetteerText, countyText, requestedZips, asOf) {
  if (!realDay(asOf) || !Array.isArray(requestedZips) || requestedZips.length < 1 ||
    requestedZips.length > MAX_ZIPS || requestedZips.some(zip => typeof zip !== 'string' || !/^\d{5}$/.test(zip)) ||
    new Set(requestedZips).size !== requestedZips.length) {
    throw new Error('Require 1-25 distinct five-digit codes and a real research date');
  }
  const gazRows = parseDelimited(gazetteerText, ['GEOID','INTPTLAT','INTPTLONG'], '2026 Census ZCTA Gazetteer');
  const countyRows = parseDelimited(countyText, ['GEOID_ZCTA5_20','GEOID_COUNTY_20'], '2020 Census ZCTA-to-county relationship');
  const targets = new Set(requestedZips);
  const zcta = new Map();
  const counties = new Map();
  for (const [zip, lat, long] of gazRows) {
    if (!targets.has(zip)) continue;
    const rows = zcta.get(zip) ?? [];
    rows.push({ latitude: Number(lat), longitude: Number(long) });
    zcta.set(zip, rows);
  }
  for (const [zip, county] of countyRows) {
    if (!targets.has(zip)) continue;
    if (!/^\d{5}$/.test(county)) {
      // A malformed county record cannot silently authorize TX membership.
      const values = counties.get(zip) ?? new Set();
      values.add('invalid:' + county);
      counties.set(zip, values);
      continue;
    }
    const values = counties.get(zip) ?? new Set();
    values.add(county);
    counties.set(zip, values);
  }
  const candidates = requestedZips.map(zip => {
    const centers = zcta.get(zip) ?? [];
    const related = [...(counties.get(zip) ?? new Set())].sort();
    const exclusiveTexas = related.length > 0 && related.every(county => /^48\d{3}$/.test(county));
    const validCenter = centers.length === 1 && Number.isFinite(centers[0].latitude) &&
      Number.isFinite(centers[0].longitude) &&
      centers[0].latitude >= 25.8 && centers[0].latitude <= 36.6 &&
      centers[0].longitude >= -106.7 && centers[0].longitude <= -93.4;
    const status = !related.length ? 'no-official-county-relationship'
      : !exclusiveTexas ? 'non-texas-or-cross-state-relationship'
      : !validCenter ? 'missing-ambiguous-or-out-of-range-census-point'
      : 'research-candidate-needs-independent-review';
    return {
      zip, status, countyGeoids2020: related,
      censusRepresentativeCoordinate: status === 'research-candidate-needs-independent-review' ? centers[0] : null,
      // Never produce a VerifiedZipLocation, point.precision, or an enrollment flag.
      source2026: ZCTA_GAZETTEER_SOURCE,
      countyEvidence2020: COUNTY_RELATIONSHIP_SOURCE,
      manualSourceValidationRequired: true, admissionToRadiusSearch: false,
    };
  });
  return {
    asOf, purpose: 'quarantined-zcta-research-only', sourceVintage: '2026 Gazetteer / 2020 ZCTA counties',
    candidates, verifiedZipLocationsCreated: 0, venuesGeolocated: 0, publicRadiusEnabled: false,
    warning: 'A Census statistical representative point is NOT a street address, venue entrance, delivery ZIP, road mileage, or proof of date availability. Official file provenance and candidates require independent human verification before enrollment.',
  };
}

function insideRoot(path) {
  const value = relative(ROOT, resolve(path));
  return value !== '' && value !== '..' && !value.startsWith('../') && !value.startsWith('..\\');
}
async function boundedInput(path, limit) {
  if (!insideRoot(path) || !path.endsWith('.txt')) throw new Error('Inputs must be uncompressed .txt files under .artifacts/corporate-events');
  const info = await lstat(path);
  if (!info.isFile() || info.isSymbolicLink() || info.size > limit) throw new Error('Unsafe, linked or oversized Census input');
  return readFile(path, 'utf8');
}
async function main() {
  const args = process.argv.slice(2);
  const get = key => { const i = args.indexOf(key); return i < 0 ? null : args[i+1] ?? null; };
  const gaz = get('--gazetteer'), rel = get('--counties'), list = get('--zips'), out = get('--output');
  if (!gaz || !rel || !list || !out || !insideRoot(out) || !out.endsWith('.json') ||
      resolve(gaz) === resolve(rel) || resolve(out) === resolve(gaz) || resolve(out) === resolve(rel)) {
    throw new Error('Explicit two official text inputs, ZIP list and separate private JSON output required');
  }
  const zipList = list.split(',');
  const result = reviewCensusZctaSources(
    await boundedInput(gaz, 10_000_000),
    await boundedInput(rel, 15_000_000),
    zipList, new Date().toISOString().slice(0,10),
  );
  await mkdir(dirname(resolve(out)), { recursive: true });
  await writeFile(out, JSON.stringify(result, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
  console.log('Census cross-source research written privately: ' + result.candidates.length +
    ' entries. ZIPs admitted to public radius search: ZERO.');
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error('Offline ZCTA research blocked:', error.message); process.exitCode = 1; });
}
