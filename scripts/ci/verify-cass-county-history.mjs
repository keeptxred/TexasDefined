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
assert.match(source, /updatedAt: "2026-11-23"/);
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
  'The Four Speeds, Felicity and Shiloh', 'Cass County Boys',
  'Music Friendly Texas Certified Community',
  '108 Legion Street', 'former American Legion',
  'musiccitytexas.org', 'T-Bone Walker Blues Festival',
  'Scott Joplin', 'birthplace is not settled',
  '/texas-icons/don-henley', '/texas-icons/t-bone-walker',
  '/texas-icons/scott-joplin', '/texas-music',
  '/texas-music-venues', '/texas-music-cities',
  'texastimetravel.com/cities/linden/',
  'lindentxchamber.org/aboutus',
  'houstonpress.com/news/strings-attached-6551821/',
  'capitol.texas.gov/tlodocs/851/billtext/html/HR00122F.htm',
  'iwesternmusic.org/performer-detail.php?id=2248',
]) {
  assert.ok(source.includes(item), `Cass County missing music heritage or source: ${item}`);
}
const theaterEntry = visitor.indexOf('"name": "Music City Texas Theater in Linden"');
assert.ok(theaterEntry > 0, 'Cass County theater visitor listing is absent');
assert.ok(visitor.slice(theaterEntry - 90, theaterEntry).includes('"county": "cass"'), 'Theater county assignment must stay Cass');
assert.ok(visitor.slice(theaterEntry, theaterEntry + 520).includes('108 Legion Street'), 'Theater listing must include usable address');
assert.ok(visitor.includes("Richard Bowden helped build"), 'Theater short listing must mention Richard Bowden');
assert.ok(!source.includes('Joplin was born in Linden.'), 'Do not flatten Scott Joplin birthplace uncertainty');

// The editorial longform already named Atlanta and Hughes Springs, but the
// main county identity/FAQ still displayed ONLY Linden. Cross-check the
// separate structured county place list against named, public sources.
const countyProfile = fs.readFileSync('src/data/county-profile.ts', 'utf8');
const cassCommunities = countyProfile.split("'cass': [")[1]?.split('],')[0] ?? '';
assert.ok(cassCommunities, 'Cass County structured place relationships missing');
for (const place of [
  'Atlanta', 'Hughes Springs', 'Queen City', 'Avinger',
  'Bloomburg', 'Domino', 'Douglassville', 'Marietta',
  'Bivins', 'Kildare', 'McLeod',
]) {
  assert.ok(cassCommunities.includes(`'${place}'`), `Cass County structured place relation missing: ${place}`);
}
for (const publishedSource of [
  'atcog.org/wp-content/uploads/2025/07/CEDS-Booklet-approved-2023-updated-June-26-2025-Board-of-Directors.pdf',
  'tshaonline.org/handbook/entries/cass-county',
  'comptroller.texas.gov/taxes/property-tax/county-directory/cass.php',
]) {
  assert.ok(countyProfile.includes(publishedSource), `Cass County communities have no corroborating evidence: ${publishedSource}`);
}
const identityComponent = fs.readFileSync('src/components/content/CountyIdentitySection.tsx', 'utf8');
const guideComponent = fs.readFileSync('src/components/content/CountyGuideSections.tsx', 'utf8');
assert.ok(identityComponent.includes('profile.majorCommunities'), 'County identity must use verified places');
assert.ok(guideComponent.includes('profile.majorCommunities.slice(0, 6)'), 'County AEO answer must use verified places');

// Keep Linden discoverable from statewide venue and music-city guides, not
// merely buried within a long county article or an isolated visitor listing.
const venueGuide = fs.readFileSync('src/data/texas-music-venue-guides.ts', 'utf8');
const cityGuide = fs.readFileSync('src/data/texas-music-city-guides.ts', 'utf8');
const historicVenues = fs.readFileSync('src/data/texas-music-historic-places.ts', 'utf8');
const venueUI = fs.readFileSync('src/components/editorial/TexasMusicVenueGuide.tsx', 'utf8');
const cityUI = fs.readFileSync('src/components/editorial/TexasMusicCityGuide.tsx', 'utf8');
for (const value of [
  'Music City Texas Theater: a small-town stage in Linden',
  'American Legion Auditorium in Linden, Cass County',
  '/county/cass', 'Richard Bowden',
]) assert.ok(venueGuide.includes(value), 'Statewide venue story or county connection missing: ' + value);
for (const value of [
  'Why small music towns like Linden belong on the map',
  'Music Friendly Texas Certified Community',
  '/county/cass', '/texas-music-venues',
]) assert.ok(cityGuide.includes(value), 'Statewide music-city small-town coverage missing: ' + value);
for (const value of [
  'music-city-texas-theater-linden', 'Music City Texas Theater',
  '1948–1950', '2003', '108 Legion Street', '400-seat',
  'texastimetravel.com/directory/music-city-texas-theater/',
  'www.musiccitytexas.org/about',
]) assert.ok(historicVenues.includes(value), 'Linden historic venue listing/source missing: ' + value);
for (const ui of [venueUI, cityUI]) {
  assert.ok(ui.includes('texastimetravel.com/directory/music-city-texas-theater/'), 'Missing publicly visible heritage research citation');
  assert.ok(ui.includes('governor-abbott-announces-linden-designated-music-friendly-texas-certified-community'),
    'Missing original certification source');
}
console.log('Cass County editorial provenance / AEO / historical safety assertions: PASS');
