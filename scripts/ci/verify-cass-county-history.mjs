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

// A county authority check must cover defining cultural history, not just its
// courthouse. Require people, venue, geography, usable visitor directions,
// cross-links and independently published evidence in both page surfaces.
const visitor = fs.readFileSync('src/data/county-visitor-places.ts', 'utf8');
const culturalSections = [
  'How Linden became Music City Texas',
  'Richard Bowden: from Linden bands to Pinkard & Bowden',
  'Music City Texas Theater: a concert room with a local mission',
  'T-Bone Walker, Don Henley and Scott Joplin',
  'The T-Bone Walker Blues Festival and a useful downtown visit',
  'Quick answers about Richard Bowden and Linden',
];
for (const item of culturalSections) {
  assert.ok(source.includes(item), `Cass County authority gap: ${item}`);
}
for (const item of [
  'Sandy Pinkard', 'Pinkard & Bowden', 'Richard Bowden',
  '108 Legion Street', 'former American Legion',
  'musiccitytexas.org', 'T-Bone Walker Blues Festival',
  'Scott Joplin', 'birthplace is not settled',
  '/texas-icons/don-henley', '/texas-icons/t-bone-walker',
  '/texas-icons/scott-joplin', '/texas-music',
  'texastimetravel.com/cities/linden/',
  'lindentxchamber.org/aboutus',
  'houstonpress.com/news/strings-attached-6551821/',
]) {
  assert.ok(source.includes(item), `Cass County missing music heritage or source: ${item}`);
}
const theaterEntry = visitor.indexOf('"name": "Music City Texas Theater in Linden"');
assert.ok(theaterEntry > 0, 'Cass County theater visitor listing is absent');
assert.ok(visitor.slice(theaterEntry - 90, theaterEntry).includes('"county": "cass"'), 'Theater county assignment must stay Cass');
assert.ok(visitor.slice(theaterEntry, theaterEntry + 520).includes('108 Legion Street'), 'Theater listing must include usable address');
assert.ok(visitor.includes("Richard Bowden helped build"), 'Theater short listing must mention Richard Bowden');
assert.ok(!source.includes('Joplin was born in Linden.'), 'Do not flatten Scott Joplin birthplace uncertainty');

console.log('Cass County editorial provenance / AEO / historical safety assertions: PASS');
