/**
 * Refresh the statewide licensed-brewery location snapshot from TABC.
 * This is a build-time GitHub Actions job, NEVER a request-time Worker crawl.
 * TABC BW is a license category, not proof of open taproom/visitor services.
 * Do not drop the last-good snapshot on API failure or suspicious count changes.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const target = fileURLToPath(new URL('../../src/data/breweries/texas-breweries.generated.json', import.meta.url));
const SOURCE = 'https://data.texas.gov/dataset/TABC-License-Information/7hf9-qc9f';
const API = 'https://data.texas.gov/resource/7hf9-qc9f.json';
const slugify = (value) => String(value ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const tidy = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

export function normalizeTabcRows(rows, previous = []) {
  const oldSlugs = new Map(previous.map((entry) => [String(entry.licenseId), entry.slug]));
  const deduped = new Map();
  for (const row of rows) {
    const primaryLicenseType = tidy(row.license_type).toUpperCase();
    const subordinateCodes = tidy(row.subordinates).toUpperCase().split(',').map((value) => value.trim());
    const licenseType = primaryLicenseType === 'BW'
      ? 'BW'
      : (['BG', 'MB', 'BE'].includes(primaryLicenseType) && subordinateCodes.includes('BP') ? 'BP' : null);
    const status = tidy(row.primary_status || row.license_status);
    const state = tidy(row.state).toUpperCase();
    if (!licenseType || !/^Active(?:\b|$)/i.test(status) || state !== 'TX') continue;
    const licenseId = tidy(row.license_id).replace(/^(\d+)\.0$/, '$1');
    const name = tidy(row.trade_name || row.owner);
    const city = tidy(row.city);
    const county = tidy(row.county).replace(/\s+County$/i, '');
    if (!licenseId || !name || !city || !county) continue;
    const slug = oldSlugs.get(licenseId) || (slugify(name) + '-' + slugify(city) + '-' + slugify(licenseId));
    deduped.set(licenseId, {
      licenseId, slug, name, city, county,
      address: tidy([row.address, row.address_2].filter(Boolean).join(', ')),
      zip: tidy(row.zip).slice(0, 5),
      phone: tidy(row.phone),
      licenseStatus: status,
      licenseType,
      expirationDate: tidy(row.expiration_date).slice(0, 10),
    });
  }
  return [...deduped.values()].sort((a, b) => a.name.localeCompare(b.name) || a.city.localeCompare(b.city) || a.licenseId.localeCompare(b.licenseId));
}

export async function main() {
  const previous = JSON.parse(await readFile(target, 'utf8'));
  const url = new URL(API);
  url.searchParams.set('$where', "license_type='BW'");
  url.searchParams.set('$limit', '5000');
  url.searchParams.set('$order', 'license_id ASC');
  const response = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'TexasDefined-BreweryDirectory/1.0' }, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error('TABC request failed: HTTP ' + response.status);
  const rows = await response.json();
  if (!Array.isArray(rows)) throw new Error('TABC returned a non-array response');
  if (rows.length >= 5000) throw new Error('TABC result reached row cap; pagination required, refusing incomplete snapshot');
  const secondaryUrl = new URL(API);
  secondaryUrl.searchParams.set('$where', "subordinates like '%BP%' AND state='TX'");
  secondaryUrl.searchParams.set('$limit', '5000');
  secondaryUrl.searchParams.set('$order', 'license_id ASC');
  const secondaryResponse = await fetch(secondaryUrl, { headers: { Accept: 'application/json', 'User-Agent': 'TexasDefined-BreweryDirectory/1.0' }, signal: AbortSignal.timeout(30000) });
  if (!secondaryResponse.ok) throw new Error('TABC BP subordinate request failed: HTTP ' + secondaryResponse.status);
  const secondaryRows = await secondaryResponse.json();
  if (!Array.isArray(secondaryRows) || secondaryRows.length >= 5000) throw new Error('Incomplete TABC BP subordinate result; preserving previous snapshot');
  const breweries = normalizeTabcRows([...rows, ...secondaryRows], previous.breweries ?? []);
  const bwCount = breweries.filter((place) => place.licenseType === 'BW').length;
  const bpCount = breweries.filter((place) => place.licenseType === 'BP').length;
  if (bwCount < 100 || bpCount < 20) throw new Error('Unexpectedly small BW/BP coverage (' + bwCount + '/' + bpCount + '); preserving previous snapshot');
  if (breweries.length < 100) {
    const sample = rows.slice(0, 3).map((row) => ({
      license_type: row.license_type, primary_status: row.primary_status,
      license_status: row.license_status, state: row.state,
      city_present: Boolean(row.city), county_present: Boolean(row.county),
      license_id_present: Boolean(row.license_id),
    }));
    console.error('TABC diagnostic:', JSON.stringify({ sourceRows: rows.length, keys: Object.keys(rows[0] ?? {}).sort(), sample }));
    throw new Error('Suspiciously small active BW roster (' + breweries.length + '); preserving last-good snapshot');
  }
  if (previous.breweries?.length > 100 && breweries.length < previous.breweries.length * .75)
    throw new Error('More than 25% drop in active BW licenses; preserving last-good snapshot pending review');
  if (JSON.stringify(breweries) === JSON.stringify(previous.breweries)) {
    console.log('TABC licensed brewery roster unchanged: ' + breweries.length + ' active BW/BP locations');
    return;
  }
  const snapshot = {
    source: 'Texas Alcoholic Beverage Commission — TABC License Information (7hf9-qc9f)',
    sourceUrl: SOURCE,
    fetchedAt: new Date().toISOString(),
    breweries,
  };
  await writeFile(target, JSON.stringify(snapshot, null, 2) + '\n');
  console.log('Updated Texas brewery license snapshot: ' + breweries.length + ' active BW/BP locations');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fileURLToPath(new URL('file://' + process.argv[1]).href)) {
  main().catch((error) => { console.error(error); process.exitCode = 1; });
}
