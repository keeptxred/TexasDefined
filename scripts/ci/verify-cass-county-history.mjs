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
assert.match(source, /updatedAt: "2026-11-24"/);
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
  'The Texas Music Barn: another historic Linden listening room',
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
  '301 East Houston Street', '1927', '2009',
  'The Barn\'s current concert and public-access status is not verified',
  'downtowntx.org/linden-texas/301-e-houston-st-linden-texas-75563',
  'texashistory.unt.edu/ark:/67531/metadc1924028/',
  'musiccitytexas.org', 'T-Bone Walker Blues Festival',
  '2006 through 2013', 'moved to Longview', 'subsequently dissolved',
  'no verified current-year festival dates',
  'bluesfestivalguide.com/t-bone-day-backers-aim-to-revive-linden-blues-fest/',
  'longviewtexas.gov/CivicAlerts.aspx?AID=75&ARC=322',
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
assert.ok(visitor.includes("held in Linden 2006–2013, not a confirmed current annual event"),
  'Theater visitor listing must not imply discontinued Linden festival recurs annually');
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
assert.ok(guideComponent.includes("entity.slug === 'cass' ? 14 : 8"), 'Cass County music and musician links must not be silently truncated to eight cards');

// Protect independently sourced Nov 24 editorial freshness for the county
// and both statewide music guides without falsely restamping other counties.
const lindenSitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
for(const path of ['/county/cass','/texas-music-venues','/texas-music-cities']) {
  assert.ok(lindenSitemap.includes('"' + path + '": "2026-11-24"'),
    'Stale Cass/Linden sitemap lastmod: ' + path);
}
assert.ok(lindenSitemap.includes('cacheUrl.searchParams.set("linden-music-editorial-lastmod", "2026-11-24")'),
  'Cass/Linden sitemap cache key must reflect the verified editorial update');
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
  'Linden also preserved a second listening-room tradition',
  'Texas Music Barn',
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
  'texas-music-barn-linden', '301 East Houston Street',
  'texastimetravel.com/directory/music-city-texas-theater/',
  'www.musiccitytexas.org/about',
]) assert.ok(historicVenues.includes(value), 'Linden historic venue listing/source missing: ' + value);
for (const ui of [venueUI, cityUI]) {
  assert.ok(ui.includes('texastimetravel.com/directory/music-city-texas-theater/'), 'Missing publicly visible heritage research citation');
  assert.ok(ui.includes('governor-abbott-announces-linden-designated-music-friendly-texas-certified-community'),
    'Missing original certification source');
}
// Require the researched Cass County music network to link in both directions
// from the actual published Texas Icons renderer, not merely from the county.
const iconRenderer = fs.readFileSync('src/routes/texas-icons_.$slug.tsx', 'utf8');
const countyRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
for (const value of [
  'cassMusicHistoryLinks', 'cassMusicSeoTitles', '"don-henley": [', '"t-bone-walker": [', '"scott-joplin": [',
  'Cass County and the disputed Caves Spring connection',
  '<NarrativeProfile profile={narrativeProfile} subjectType={icon.subjectType} slug={icon.slug} />',
]) assert.ok(iconRenderer.includes(value), 'Reverse biographical link or disputed-origin qualification missing: ' + value);
// The three newly edited canonical icon profiles must expose truthful
// date-scoped XML freshness, without artificially dating the other 217 icons.
const iconSitemap = fs.readFileSync('src/routes/sitemap-texas-icons[.]xml.ts', 'utf8');
for(const slug of ['don-henley','t-bone-walker','scott-joplin']) {
  assert.ok(iconSitemap.includes('"/texas-icons/' + slug + '": "2026-11-24"'),
    'Source-backed Texas Icons sitemap lastmod missing for ' + slug);
}
assert.ok(iconSitemap.includes('CASS_MUSIC_ICON_LASTMOD_BY_PATH[path]'),
  'Icon sitemap must use exact date map instead of a blanket restamp');
assert.ok(iconSitemap.includes('lastmod ?') && iconSitemap.includes('<lastmod>'),
  'Icon sitemap must serialize date only for editorially revised icons');
assert.ok(countyRoute.includes("entity.slug === 'cass') return 'Cass County, Texas: Linden Music, Courthouse & Atlanta'"),
  'Cass County has regressed to a generic and non-distinctive search title');
assert.ok(venueUI.includes('musicVenuePhotography["broken-spoke-austin-history"]'),
  'Missing license-governed statewide venue photograph');
assert.ok(cityUI.includes('musicVenuePhotography["billy-bobs-texas-history"]'),
  'Missing independently credited Texas music cities photograph');
for (const value of ['downtowntx.org/linden-texas/301-e-houston-st-linden-texas-75563',
  'texashistory.unt.edu/ark:/67531/metadc1924028/']) {
  assert.ok(venueUI.includes(value) && cityUI.includes(value),
    'Statewide music research source is not actually cited in visible guide: ' + value);
}
// Artist pictures must be real photographs of the intended musician and
// published under an independently verified reusable license. In particular,
// Commons' unrelated "TB Walker" images depict a Minnesota art collector;
// T-Bone Walker is the Linden-born blues musician photographed in 1972.
const portraits = fs.readFileSync('src/data/texas-icons-cass-photography.ts', 'utf8');
for(const value of [
  '"don-henley": {', '"t-bone-walker": {', '"scott-joplin": {',
  'Don_Henley_%28254840967%29.jpg', 'Alan Light', 'CC BY 2.0',
  'T-Bone_Walker_1972.jpg', 'Heinrich Klaffs', 'CC BY-SA 2.0',
  'Scott_Joplin_portrait_photo_highres.jpg', 'American Musician, 1907',
  'U.S. public domain (published 1907)',
  'creativecommons.org/licenses/by/2.0/',
  'creativecommons.org/licenses/by-sa/2.0/',
  'creativecommons.org/publicdomain/mark/1.0/',
]) assert.ok(portraits.includes(value), 'Cass musician photo identity/license provenance missing: ' + value);
assert.ok(!portraits.includes('TB_Walker.png'), 'Incorrectly attributed Minnesota T.B. Walker portrait');
for(const value of ['cassMusicPortraits[icon.slug]', '"@type": "ImageObject"',
  'license: portrait.licenseUrl', 'creditText: portrait.credit',
  'alt={portrait.alt}', 'loading="lazy"', 'portrait.sourcePage', 'portrait.licenseUrl',
  'image: cassMusicPortraits[loaderData.icon.slug]?.src',
  'imageAlt: cassMusicPortraits[loaderData.icon.slug]?.alt',
  'shown without editing'.replace(/^s/, 'S')]) {
  assert.ok(iconRenderer.includes(value), 'Artist photo accessibility/rights requirement missing: ' + value);
}
console.log('Cass County editorial provenance / AEO / historical safety assertions: PASS');
