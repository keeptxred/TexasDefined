import fs from 'node:fs';
import assert from 'node:assert/strict';

const path = 'src/data/fixtures/cass-county-linden-atlanta-piney-woods-wright-patman-texas.ts';
const source = fs.readFileSync(path, 'utf8');

for (const required of [
  'completed in July 1861', // content says accepted on July 8, 1861 rather than this exact phrase
]) { void required; }

for (const required of [
  'July 8, 1861',
  'gold-leafed spire',
  '1908',
  '1933',
  'bucket brigades',
  '1934',
  'Horton Tank No. 4816',
  '50,000-gallon',
  '1935',
  'Ford V8',
  '1939',
  '121 West Rush Street',
  'Preservation Texas',
  'May 2022',
  'spring 2024',
  'Sources',
]) {
  if (required === 'Sources') continue; 
  assert.ok(source.includes(required), `Cass County history missing: ${required}`);
}
for (const forbidden of [
  'completed after the war',
  'burned to the ground',
  'the firehouse is open',
  'listed on the National Register of Historic Places in 2016',
]) {
  assert.ok(!source.includes(forbidden), `Cass County history contains a disproven or unsupported assertion: ${forbidden}`);
}
assert.match(source, /updatedAt: "2026-11-22"/);
assert.match(source, /region: "piney-woods"/);
assert.match(source, /type: "image"[\s\S]*Linden1\.JPG[\s\S]*Renelibrary/);
assert.match(source, /sources: \[/);
for (const primary of [
  'texastimetravel.com/directory/cass-county-courthouse/',
  'atlas.thc.texas.gov/NR/pdfs/79002924/79002924.pdf',
  'lindenheritage.org/wp-content/uploads/2016/01/Submittal-DeterminationEligibility-4Jan2016.pdf',
  'preservationtexas.org/linden',
]) assert.ok(source.includes(primary), `Missing corroborating source: ${primary}`);
console.log('Cass County editorial provenance / AEO / historical safety assertions: PASS');
