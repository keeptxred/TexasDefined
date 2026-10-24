import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders, corporateEventCategories } from '../../src/data/corporate-events.ts';

const route = readFileSync('src/routes/corporate-events.tsx', 'utf8');
const lazyRoute = readFileSync('src/routes/corporate-events.lazy.tsx', 'utf8');
const api = readFileSync('src/data/corporate-events.functions.ts', 'utf8');
const registry = readFileSync('src/lib/public-routes.ts', 'utf8');
const brand = readFileSync('src/brand/texasdefined.ts', 'utf8');
const events = readFileSync('src/routes/events.index.lazy.tsx', 'utf8');
const categoryGuides = readFileSync('src/components/events/CorporateEventCategoryGuides.tsx', 'utf8');
const guidebook = readFileSync('src/routes/guides.lazy.tsx', 'utf8');
const cityGuides = readFileSync('src/components/events/CorporateEventMetroGuides.tsx', 'utf8');
const categories = new Set(corporateEventCategories.map((item) => item.value));

assert(corporateEventProviders.length >= 146, 'Directory needs 146+ distinct officially sourced Texas corporate venues');
assert(corporateEventProviders.filter((p) => p.city === 'Houston').length >= 60, 'Houston city must maintain 60+ distinct official-source corporate venue listings, not suburban aliases');
// The operator's official directions give 6749 FM 2920, Spring, TX 77379;
// Houston marketing language describes its metro market, not its city address.
const geronimo = corporateEventProviders.find(p => p.slug === 'geronimo-adventure-park');
assert.equal(geronimo?.city, 'Spring', 'Geronimo is physically in Spring, not Houston city');
assert.equal(geronimo?.metro, 'Houston', 'Spring still belongs in the Houston metro search');
assert(geronimo?.area.includes('FM 2920'), 'Display a location-specific Spring area label');
assert.equal(geronimo?.sourceUrl, 'https://www.geronimoadventurepark.com/groups-and-events', 'Preserve cited group-capacity source');

for (const metro of ['Houston', 'Dallas', 'Austin', 'San Antonio', 'El Paso', 'Corpus Christi', 'Galveston', 'Waco', 'Lubbock', 'Bryan/College Station', 'Tyler', 'Beaumont', 'Amarillo', 'McAllen', 'Midland/Odessa', 'Abilene', 'Killeen/Temple', 'New Braunfels', 'Fredericksburg']) {
  assert(corporateEventProviders.filter((p) => p.city === metro || p.metro?.includes(metro)).length >= 3, 'Insufficient metro coverage: ' + metro);
}
assert(corporateEventProviders.filter((p) => p.city === 'Houston' && p.maxGroup >= 45 && (!p.minGroup || p.minGroup <= 45)).length >= 8);

const verifiedHouston20261024 = [
  ['escape-the-room-midtown-houston-teams', null],
  ['escape-it-houston-group-events', 36],
  ['bowl-and-barrel-citycentre-houston-events', null],
  ['bayou-music-center-houston-private-events', 3464],
  ['sur-la-table-houston-citycentre-private-cooking', 20],
  ['house-of-blues-houston-private-events', null],
  ['air-terminal-museum-houston-corporate', 160],
  ['rustic-houston-uptown-park-corporate', null],
  ['713-music-hall-houston-corporate', 4450],
  ['hotel-zaza-houston-museum-district-meetings', null],
  ['hotel-zaza-houston-memorial-city-meetings', null],
  ['houston-marriott-medical-center-meetings', 600],
  ['downtown-aquarium-houston-corporate-rentals', null],
  ['maggianos-memorial-city-private-events', null],
];
for (const [slug, upperLimit] of verifiedHouston20261024) {
  const provider = corporateEventProviders.find((venue) => venue.slug === slug);
  assert(provider, 'The 2026-10-24 official-source Houston venue was removed: ' + slug);
  assert.equal(provider.city, 'Houston', 'Use actual city, not inaccurate metro alias: ' + slug);
  assert.equal(provider.verifiedOn, '2026-10-24', 'Review date must be tied to the completed official source research: ' + slug);
  assert.equal(provider.maxGroup, upperLimit, 'Do not invent or inflate maximum capacity: ' + slug);
  assert(provider.officialUrl.startsWith('https://') && provider.sourceUrl.startsWith('https://'), 'Official source required: ' + slug);
  assert.equal(provider.startingPricePerPerson, null, 'Custom and group-size-dependent corporate rates are not global per-person prices: ' + slug);
}
assert(!corporateEventProviders.some((venue) => /the rustic.*downtown/i.test(venue.name)),
  'Exclude The Rustic Houston Downtown until the operator confirms reopening from its temporary relocation closure');


const reviewedCorporateVenueFacts = [
  ['houston-zoo-events', 6000, 20, 'entire-Zoo after-hours rental reaches 6,000'],
  ['sam-houston-race-park', 5000, 10, '10–5,000 guests'],
  ['puttshack-houston-corporate', 670, 13, 'up to 670 people'],
];
for (const [slug, maxGroup, minGroup, evidence] of reviewedCorporateVenueFacts) {
  const venue = corporateEventProviders.find((item) => item.slug === slug);
  assert(venue, 'Missing source-reviewed group venue: ' + slug);
  assert.equal(venue.maxGroup, maxGroup, 'Do not substitute a single room cap for published sitewide event inventory: ' + slug);
  assert.equal(venue.minGroup ?? null, minGroup, 'Keep supported group booking minimum distinct from party/package limits: ' + slug);
  assert(venue.capacityDetail.includes(evidence), 'Capacity needs a format-specific source caveat: ' + slug);
  assert.equal(venue.verifiedOn, '2026-10-24');
  assert.equal(venue.startingPricePerPerson, null, 'Venue-wide corporate starting price is not verified: ' + slug);
}
for (const [slug, expectedSource, capacityLimit, rejectedCount, formatProof] of [
  ['houston-zoo-events', 'https://www.houstonzoo.org/host-an-event/', 6000, 6001, 'individual venue formats'],
  ['pelazzio-houston-corporate-ballrooms', 'https://pelazzio.com/houston-ballrooms/', 550, 551, 'Tuscany AB/Wing'],
]) {
  const venue = corporateEventProviders.find((item) => item.slug === slug);
  assert(venue, 'Missing official group-venue capacity evidence: ' + slug);
  assert.equal(venue.sourceUrl, expectedSource, 'Exact operator page documenting format-specific maximum: ' + slug);
  assert.equal(venue.maxGroup, capacityLimit, 'Keep max tied to published format, never infer a larger capacity: ' + slug);
  assert(rejectedCount > venue.maxGroup, 'Groups exceeding the documented maximum must be rejected: ' + slug);
  assert(venue.capacityDetail.includes(formatProof), 'Public display must distinguish entire-property/combined room layouts: ' + slug);
  assert.equal(venue.startingPricePerPerson, null, 'Event configurations and minimums do not establish one universal quoted rate');
}
const puttshackReview = corporateEventProviders.find((item) => item.slug === 'puttshack-houston-corporate');
assert.equal(puttshackReview?.sourceUrl, 'https://www.puttshack.com/parties/houston/',
  'Puttshack source URL must link to an active operator event page, not a defunct 404');
assert.equal(puttshackReview?.ageLimit ?? null, null,
  'Puttshack Houston allows all ages under the operator booking policy; do not reintroduce an evening-only restriction');
const cidercadeReview = corporateEventProviders.find((item) => item.slug === 'cidercade-houston-team-events');
assert.equal(cidercadeReview?.ageLimit, 'All ages until 9 PM; 18+ from 9 PM.',
  'Cidercade evening age rules must be visible, not buried in generic capacity details');
assert.equal(cidercadeReview?.startingPricePerPerson, null,
  'General arcade admission is not a sourced private corporate event quote');


const houston20261024Expansion = [
  ['grangers-houston-private-events', 250, 10, 'https://grangershouston.com/private-events.php'],
  ['cellar7-houston-private-events', 250, null, 'https://www.cellar7htx.com/private-events'],
  ['east-river-nine-houston-events', null, 20, 'https://eastriver9.com/book-an-event/'],
  ['puttery-houston-corporate-events', 600, null, 'https://www.puttery.com/locations/houston/'],
  ['davis-street-hermann-park-daytime-events', 200, null, 'https://www.davisstreet.com/daytime-events'],
  ['pour-behavior-houston-corporate', null, null, 'https://www.pourbehaviortx.com/private-events'],
  ['pelazzio-houston-corporate-ballrooms', 550, 75, 'https://pelazzio.com/corporate-events/'],
  ['battlefield-houston-corporate-laser-tag', null, 15, 'https://www.battlefieldhouston.com/indoor/indoorgroup'],
  ['brittmoore-houston-corporate-events', null, null, 'https://www.thebrittmoorehtx.com/events-corporate'],
  ['marriott-houston-energy-corridor-meetings', 300, null, 'https://www.marriott.com/en-us/hotels/houeg-houston-marriott-energy-corridor/events/'],
];
for (const [slug, maxGroup, minGroup, officialUrl] of houston20261024Expansion) {
  const venue = corporateEventProviders.find((p) => p.slug === slug);
  assert(venue, 'Missing researched Houston group venue '+slug);
  assert.equal(venue.city, 'Houston', 'Do not misclassify a suburb as Houston: '+slug);
  assert.equal(venue.maxGroup, maxGroup, 'Do not inflate a capacity inferred from combined rooms or from a plus sign: '+slug);
  assert.equal(venue.minGroup ?? null, minGroup, 'Use only the published private-event minimum: '+slug);
  assert.equal(venue.startingPricePerPerson, null, 'Public admission or package prices are not globally applicable corporate group quotes: '+slug);
  assert.equal(venue.verifiedOn, '2026-10-24');
  assert.equal(venue.officialUrl, officialUrl);
  assert.equal(venue.sourceUrl, officialUrl);
  assert(venue.capacityDetail.length > 85, 'Show specific room/format or quote limitations: '+slug);
}
assert.equal(corporateEventProviders.find(p=>p.slug === 'pour-behavior-houston-corporate')?.ageLimit,
  '21+; venue dress code applies.', 'Disclose real source-reported nightlife eligibility');
assert(corporateEventProviders.find(p=>p.slug === 'puttery-houston-corporate-events')?.ageLimit.includes('Fri–Sat'),
  'Puttery Houston evening restrictions are not the same as Puttshack Houston');


// Two independently verified multi-space capacity fixes: do not substitute a
// specific room limit for the operator's distinct multi-space/buyout format.
const updatedMultiSpaceVenueFacts = [
  ['pkl-social', 20, 250, '20–250', 'https://pklsocial.com/private-events/'],
  ['space-center-houston-corporate-rentals', 10, 8000, 'Full Center Experience', 'https://spacecenter.org/host-an-event/venue-information/'],
];
for (const [slug, min, max, formatEvidence, source] of updatedMultiSpaceVenueFacts) {
  const venue = corporateEventProviders.find(item => item.slug === slug);
  assert(venue, 'Missing independently sourced venue: '+slug);
  assert.equal(venue.minGroup, min, 'Operator-published group minimum required: '+slug);
  assert.equal(venue.maxGroup, max, 'Venue max applies to the documented format, not one room: '+slug);
  assert(venue.capacityDetail.includes(formatEvidence), 'Specify the operator-published multi-space/buyout format: '+slug);
  assert.equal(venue.sourceUrl, source, 'Keep current official venue capacity evidence URL: '+slug);
  assert.equal(venue.verifiedOn, '2026-10-24', 'Only use actual source-review date: '+slug);
  assert.equal(venue.startingPricePerPerson, null, 'Venue-wide corporate quote requires independent confirmation: '+slug);
}


// Independently rechecked Houston operator rates and the Houston-branded but
// physically Shenandoah event venue. Prior 146 official listings are preserved.
const sourceBySlug = new Map(corporateEventProviders.map(p=>[p.slug,p]));
const shenandoahGame = sourceBySlug.get('game-show-battle-rooms-shenandoah');
assert(shenandoahGame && shenandoahGame.city === 'Shenandoah' && shenandoahGame.metro === 'Houston',
  'Physical city must be Shenandoah even though company markets this site as Houston/The Woodlands');
assert.equal(shenandoahGame.verifiedOn,'2026-10-24');
assert.equal(shenandoahGame.maxGroup,null,'Nationwide room max is not a Shenandoah-specific promise');
assert.equal(shenandoahGame.startingPricePerPerson,null,'No invented corporate rate');
assert(shenandoahGame.capacityDetail.includes('8980 Metropark Drive')
  && shenandoahGame.capacityDetail.includes('41+')
  && shenandoahGame.capacityDetail.includes('need confirmation'),
  'Source-backed location and large-event inquiry policy must remain visible');
assert.equal(sourceBySlug.get('puttery-houston-corporate-events')?.maxGroup,600,'Preserve other merged operator research');
assert.equal(sourceBySlug.get('pour-behavior-houston-corporate')?.maxGroup,null,'Floor space is not occupancy');
assert(corporateEventProviders.filter(p=>p.city === 'Houston').length>=60,
  'Never inflate Houston city count with nearby Shenandoah metro');
assert(corporateEventProviders.length>=147,'Do not duplicate or lose independently researched Houston entries');
const greatBigReviewed=sourceBySlug.get('great-big-game-show-houston');
assert.equal(greatBigReviewed.verifiedOn,'2026-10-24');
assert.equal(greatBigReviewed.startingPricePerPerson,null);
assert(greatBigReviewed.capacityDetail.includes('15–28') && greatBigReviewed.capacityDetail.includes('29+')
  && greatBigReviewed.capacityDetail.includes('NOT a 45-person price'),
  'Do not show the operator 15–28 guest package as a 45-guest corporate rate');
const puttshackReviewed=sourceBySlug.get('puttshack-houston-corporate');
assert.equal(puttshackReviewed.maxGroup,670);
assert.equal(puttshackReviewed.ageLimit ?? null,null,'Preserve verified all-ages Houston correction');
assert(puttshackReviewed.capacityDetail.includes('up to 670 people')
  && puttshackReviewed.capacityDetail.includes('up to 6'),
  'Venue-wide capacity and actual golf-rotation game group size are distinct');

assert.equal(new Set(corporateEventProviders.map((p) => p.slug)).size, corporateEventProviders.length);
for (const p of corporateEventProviders) {
  assert(p.officialUrl.startsWith('https://') && p.sourceUrl.startsWith('https://'));
  // Review dates are data, not a hard-coded launch day. Future additions must
  // be accepted once editorially checked, without lying about existing sources.
  assert(/^\d{4}-\d{2}-\d{2}$/.test(p.verifiedOn), 'Bad review date for ' + p.slug);
  const parsedReview = new Date(p.verifiedOn + 'T12:00:00Z');
  assert(!Number.isNaN(parsedReview.getTime()) && parsedReview.toISOString().slice(0, 10) === p.verifiedOn,
    'Invalid editorial review calendar date for ' + p.slug);
  assert(parsedReview.getTime() <= Date.now() + 86400000, 'Future source-review date for ' + p.slug);
  assert(p.categories.every((category) => categories.has(category)));
}
assert(route.includes("createFileRoute('/corporate-events')"));
assert(!route.includes('corporateEventProviders'), 'Keep the provider catalog out of the main client bundle');
assert(lazyRoute.includes("createLazyFileRoute('/corporate-events')"));
assert(lazyRoute.includes('submitGroupEventRequest'));
assert(lazyRoute.includes('application/ld+json'), 'The lazy page must SSR its sourced ItemList schema');
assert(lazyRoute.includes('navigator.clipboard.writeText'));
assert(lazyRoute.includes("url.searchParams.set('venues', selected.join(','))"), 'Shortlists must preserve public venue slugs');
assert(lazyRoute.includes('corporateEventMarketMatches(provider, cityTerm)'), 'Metropolitan and Texas city searches must use the tested matcher');
assert(api.includes('consentContact'));
assert(registry.includes('"/corporate-events"'));
assert(brand.includes('to: "/corporate-events"'));
assert(events.includes('to="/corporate-events"'));
assert(guidebook.includes('to: "/corporate-events", label: "Texas Corporate Events & Team-Building Planner"'),
  'The existing Texas Defined Guidebook must link to the 19-market corporate planning authority directory');
assert(cityGuides.includes('href="/guides"') && cityGuides.includes('Texas Defined guidebook'),
  'Corporate event planner must provide a contextual reciprocal link to the established Texas guidebook');
assert(lazyRoute.includes('<CorporateEventCategoryGuides />'), 'Category authority guidance must render on the canonical SSR page');
assert(lazyRoute.includes("import { CorporateEventCategoryGuides }"), 'Category guide component must be imported');
assert(lazyRoute.includes("'@type': 'BreadcrumbList'"), 'Corporate events structured data must include canonical breadcrumbs');
assert(lazyRoute.includes('aria-label="Breadcrumb"'), 'Visible breadcrumbs must accompany structured data');
assert(categoryGuides.includes('corporateEventProviders.filter((provider) => provider.categories.includes(value))'), 'Guides must derive examples from the actual directory');
assert(categoryGuides.includes('href={provider.officialUrl}'), 'Category venue examples must link to the sourced official URLs');
assert(categoryGuides.includes("corporateEventCategories.map"), 'Future category guides must remain data driven');
assert(categoryGuides.includes('Group capacity unverified') && categoryGuides.includes('This is not date availability'), 'Unknown capacities and date availability must never be advertised as confirmed');
for (const category of corporateEventCategories) {
  assert(categoryGuides.includes("'"+category.value+"':") || categoryGuides.includes(category.value + ':'),
    'Missing authored planning guidance for '+category.value);
}
console.log('Corporate events MVP contract checks passed');
