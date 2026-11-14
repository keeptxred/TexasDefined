import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateEventMarketMatches, corporateEventAreaMatches } from '../../src/data/corporate-event-market-search.ts';

const secondWave=[
  'cidercade-houston-team-events','k1-speed-houston-corporate','k1-speed-woodlands-conroe',
  'rooftop-cinema-uptown-houston-events','saint-arnold-houston-private-events',
  'popstroke-katy-company-golf','kemah-boardwalk-corporate','lone-star-flight-museum-rentals',
  'the-health-museum-houston-rentals','bayou-city-event-center-corporate','post-houston-corporate-rentals',
  'discovery-green-sarofim-corporate','texas-treeventures-woodlands-teams',
  'topgolf-webster-corporate','topgolf-spring-corporate',
  'dave-busters-houston-katy-fwy','dave-busters-sugar-land-corporate',
  'dave-busters-shenandoah-corporate','dave-busters-friendswood-corporate',
  'main-event-webster-corporate','main-event-shenandoah-corporate',
  'main-event-tomball-corporate','main-event-humble-corporate',
];
assert.equal(secondWave.length,23,'Second Houston wave must cover 23 unique venues');
const independentlyRechecked20261024 = new Set([
  'cidercade-houston-team-events','k1-speed-houston-corporate',
  'bayou-city-event-center-corporate','discovery-green-sarofim-corporate',
  'lone-star-flight-museum-rentals',
]);
const sourceRecheckRecord = readFileSync('docs/corporate-event-venue-source-review-20261024.md','utf8');
for (const officialHost of ['cidercade.com/houston/faq','k1speed.com/houston-location/groups-and-parties',
  'bayoucityeventcenter.com/corporate-events','discoverygreen.com/location/sarofim-picnic-lawn',
  'lonestarflight.org/see-do/waltrip-hangar']) {
  assert(sourceRecheckRecord.includes(officialHost), 'New review dates require documented actual operator evidence: '+officialHost);
}

const unique = new Set(corporateEventProviders.map(p=>p.slug));
assert.equal(unique.size,corporateEventProviders.length,'Never duplicate a physical location');
const all=new Map(corporateEventProviders.map(p=>[p.slug,p]));
for(const slug of secondWave) {
  const v=all.get(slug);
  assert(v,'Unpublished source-backed Houston provider '+slug);
  assert(corporateEventMarketMatches(v,'Houston'),'Suburban options must appear in the Houston metro query: '+slug);
  assert(v.officialUrl.startsWith('https://') && v.sourceUrl.startsWith('https://'),'Official HTTPS sources required');
  assert.equal(v.verifiedOn, independentlyRechecked20261024.has(slug) ? '2026-10-24' : '2026-10-23',
    'The exact review date must reflect the dated operator-source evidence for '+slug);
  assert(v.capacityDetail.length > 65,'Qualifications are required where a group limit is unknown: '+slug);
  assert.equal(v.startingPricePerPerson,null,'General/retail/event package costs may NOT be invented as corporate per-person rates: '+slug);
}
for (const suburb of ['Katy','Sugar Land','Webster','Conroe','Humble','Tomball','Shenandoah','Spring','Friendswood','Kemah','The Woodlands']) {
  const v=corporateEventProviders.filter(p=>corporateEventMarketMatches(p,suburb));
  assert(v.length >= 1,'Corporate-event finder must support '+suburb+' locality');
}
const downtown=corporateEventProviders.filter(p=>corporateEventMarketMatches(p,'Houston') && corporateEventAreaMatches(p,'Downtown'));
assert(downtown.length >= 3,'Downtown filter must find several centrally described group venues');
assert(corporateEventAreaMatches(all.get('cidercade-houston-team-events'),' EaDo '),'Local areas must be case-insensitive and trim whitespace');
assert(!corporateEventAreaMatches(all.get('cidercade-houston-team-events'),'Katy'),'Neighborhood filters should not invent travel radius');
assert(corporateEventAreaMatches(all.get('cidercade-houston-team-events'),'  '),'Blank area preference must match all venue areas');
const finder=readFileSync('src/routes/corporate-events.lazy.tsx','utf8');
assert(finder.includes('corporateEventAreaMatches(provider, areaQuery)'),'Finder must honor the area filter');
assert(finder.includes("if (publicArea) url.searchParams.set('area', publicArea)") &&
  finder.includes("safeCorporateSharePlace(areaQuery, 'area', corporateEventProviders)"),
  'Public share links can retain a sourced public venue area without copying organizer free-text personal addresses');
assert(finder.includes("const [areaQuery, setAreaQuery] = useState('')"),'Area preference must be optional');
assert(finder.includes('does not calculate distance or driving time'),'Must not invent travel time or geocoded radius');
assert(!finder.includes('one of the nine currently sourced markets'),'Remove old fixed-market count from main finder');
const market=corporateEventProviders.filter(p=>corporateEventMarketMatches(p,'Houston, TX'));
assert(market.length>=53,'Houston metro must expose 53 or more sourced venues');
assert(corporateEventProviders.length>=108,'Statewide catalog requires 108 or more unique venues');
assert.equal(all.get('k1-speed-houston-corporate')?.minGroup,8);
assert.equal(all.get('k1-speed-woodlands-conroe')?.minGroup,8);
assert(all.get('k1-speed-houston-corporate')?.capacityDetail.includes('58-inch'),'Disclose important safety rules');
assert.equal(all.get('bayou-city-event-center-corporate')?.maxGroup,2500);
assert.equal(all.get('post-houston-corporate-rentals')?.maxGroup,3000);
assert.equal(all.get('kemah-boardwalk-corporate')?.maxGroup,5000);
assert(all.get('kemah-boardwalk-corporate')?.capacityDetail.includes('128'),'Do not overstate boat capacity as venue-wide capacity');
assert.equal(all.get('discovery-green-sarofim-corporate')?.maxGroup,200);
assert(all.get('saint-arnold-houston-private-events')?.capacityDetail.includes('NOT the public Beer Garden'));
assert(all.get('popstroke-katy-company-golf')?.capacityDetail.includes('NOT corporate event prices'));
const existing=readFileSync('scripts/data/validate-corporate-houston-depth.mjs','utf8');
assert(existing.includes('houstonMarket.length >= 53'),'First-wave guard must enforce combined 53+ count');
console.log('Houston second wave PASS: 23 additional business locations, 53+ metro, 108 statewide, all sources and safety/rate caveats.');
