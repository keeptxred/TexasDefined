import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { normalizeTabcRows } from './refresh-texas-breweries.mjs';

const path = fileURLToPath(new URL('../../src/data/breweries/texas-breweries.generated.json', import.meta.url));
const snapshot = JSON.parse(await readFile(path, 'utf8'));
assert.equal(snapshot.sourceUrl, 'https://data.texas.gov/dataset/TABC-License-Information/7hf9-qc9f');
assert.ok(Array.isArray(snapshot.breweries));
if (snapshot.fetchedAt) assert.ok(!Number.isNaN(Date.parse(snapshot.fetchedAt)));
const ids = new Set(), slugs = new Set();
for (const row of snapshot.breweries) {
  for (const field of ['licenseId', 'slug', 'name', 'county', 'city', 'licenseStatus']) assert.ok(row[field], 'Missing ' + field);
  assert.ok(['BW', 'BP'].includes(row.licenseType), 'Unexpected brewing license type');
  assert.match(row.licenseStatus, /^Active\b/i);
  assert.match(row.slug, /^[a-z0-9-]+$/);
  assert.ok(!ids.has(row.licenseId), 'Duplicate license ID');
  assert.ok(!slugs.has(row.slug), 'Duplicate slug');
  ids.add(row.licenseId); slugs.add(row.slug);
}
const example = { license_type:'BW', primary_status:'Active', state:'TX', trade_name:'Example Brewery', city:'Austin', county:'Travis', license_id:'12345', address:'12 Main St', zip:'78701' };
assert.equal(normalizeTabcRows([example, { ...example }, { ...example, license_id:'12346', primary_status:'Expired' }, { ...example, license_id:'12347', license_type:'BN' }]).length, 1);
assert.equal(normalizeTabcRows([{ ...example, license_status: 'Active - Renewal Pending', primary_status: undefined }]).length, 1);
assert.equal(normalizeTabcRows([{ ...example, city: '' }]).length, 0);
assert.equal(normalizeTabcRows([example], [{licenseId:'12345',slug:'preserved-old-slug'}])[0].slug, 'preserved-old-slug');
const brewpub = { license_type:'BG', subordinates:'BP,FB', primary_status:'Active', state:'TX', trade_name:'Example Brewpub', city:'Dallas', county:'Dallas', license_id:'67890.0' };
const parsedBrewpub = normalizeTabcRows([brewpub]);
assert.equal(parsedBrewpub.length, 1);
assert.equal(parsedBrewpub[0].licenseType, 'BP');
assert.equal(parsedBrewpub[0].licenseId, '67890');
assert.equal(normalizeTabcRows([{...brewpub, subordinates:'BPP'}]).length, 0);
console.log('Brewery snapshot validated: ' + snapshot.breweries.length + ' active BW/BP locations.');
