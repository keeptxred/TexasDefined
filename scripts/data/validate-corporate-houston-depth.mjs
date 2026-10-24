import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateEventMarketMatches } from '../../src/data/corporate-event-market-search.ts';

const newHoustonSlugs = [
  'puttshack-houston-corporate',
  'flight-club-houston-social-darts',
  'topgolf-houston-katy-team-events',
  'space-center-houston-corporate-rentals',
  'hmns-houston-corporate-events',
  'hmns-sugar-land-corporate-events',
  'color-factory-houston-private-events',
  'andretti-katy-company-events',
  'daikin-park-houston-team-building',
  'houston-food-bank-corporate-volunteers',
  'museum-of-illusions-houston-groups',
  'mfah-houston-private-events',
  'houston-arboretum-corporate-retreats',
  'great-big-game-show-houston',
  'game-show-studio-houston-corporate',
  'escape-hunt-houston-corporate',
  'ifly-houston-memorial-teams',
  'game-show-experience-houston',
];
assert.equal(new Set(newHoustonSlugs).size,18);
assert(corporateEventProviders.length >= 108,'Houston expansion must raise statewide catalog to 108+');
const slugs = new Set(corporateEventProviders.map(p=>p.slug));
assert.equal(slugs.size,corporateEventProviders.length,'All providers must have unique slugs');
const bySlug = new Map(corporateEventProviders.map(p=>[p.slug,p]));
for (const slug of newHoustonSlugs) {
  const p=bySlug.get(slug);
  assert(p,'Missing new editorial venue: '+slug);
  assert(corporateEventMarketMatches(p,'Houston'),'Houston metro query must include ' + slug);
  assert(p.officialUrl.startsWith('https://') && p.sourceUrl.startsWith('https://'),'Untrusted external source: '+slug);
  const reviewed = new Date(p.verifiedOn + 'T12:00:00Z');
  assert(!Number.isNaN(reviewed.getTime()) && reviewed.toISOString().slice(0,10) === p.verifiedOn && reviewed.getTime() <= Date.now() + 86400000,
    'Real nonfuture date required for the independently verified venue: ' + slug);
  assert(p.capacityDetail.length >= 65,'A capacity qualifier is required: '+slug);
  assert(p.categories.length >= 1);
  assert(p.maxGroup == null || p.maxGroup >= 20);
}
const houstonMarket=corporateEventProviders.filter(p=>corporateEventMarketMatches(p,'Houston, TX'));
assert(houstonMarket.length >= 53,'Houston metro directory should now include 53+ researched options');
assert(houstonMarket.filter(p=>p.maxGroup == null || p.maxGroup >= 45).length >= 23,'At least 23 Houston metro venues should remain possible for 45-person plans pending real quotes');
const topgolf=bySlug.get('topgolf-houston-katy-team-events');
assert.equal(topgolf?.startingPricePerPerson,46);
assert(topgolf.capacityDetail.includes('tax') && topgolf.capacityDetail.includes('admin fees'),'Topgolf rate fees must be transparent');
const puttshack=bySlug.get('puttshack-houston-corporate');
assert.equal(puttshack?.startingPricePerPerson,null,'Do not apply 13–18-guest rate to corporate group of 45');
const moi=bySlug.get('museum-of-illusions-houston-groups');
assert.equal(moi?.startingPricePerPerson,null,'Do not divide flat private venue rental into fabricated per-person package');
const gameShow=bySlug.get('game-show-experience-houston');
assert.equal(gameShow?.startingPricePerPerson,null,'Retail and mobile costs are not a corporate 45-person group rate');
assert(gameShow?.capacityDetail.includes('NOT verified'),'Mobile 20-person cap must not imply automatic 45 capacity');
const arboretum=bySlug.get('houston-arboretum-corporate-retreats');
assert(arboretum?.capacityDetail.includes('membership'),'Private venue membership condition must be disclosed');
const foodBank=bySlug.get('houston-food-bank-corporate-volunteers');
assert(foodBank?.capacityDetail.includes('40+'),'Large volunteer shifts require explicit coordination');
assert.equal(bySlug.get('escape-hunt-houston-corporate')?.maxGroup,90);
const spaceCenter = bySlug.get('space-center-houston-corporate-rentals');
assert.equal(spaceCenter?.maxGroup,8000,
  'Operator-published Full Center Experience capacity is 8,000, not the 5,400-person Independence Plaza maximum');
assert(spaceCenter?.capacityDetail.includes('Full Center Experience') && spaceCenter?.capacityDetail.includes('5,400'),
  'Preserve exact independent room/whole-facility capacity distinctions');
assert.equal(spaceCenter?.sourceUrl, 'https://spacecenter.org/host-an-event/venue-information/',
  'Large-group headcounts require official room-by-room evidence, not an inferred venue quote');
assert.equal(bySlug.get('game-show-studio-houston-corporate')?.maxGroup,200);
const guides=readFileSync('src/components/events/CorporateEventMetroGuides.tsx','utf8');
assert(guides.includes('corporateEventMarketMatches(provider, guide.key)'),'Houston guide must include both the city and suburban metro aliases via the shared matcher');
const contract=readFileSync('scripts/data/validate-corporate-events.mjs','utf8');
const catalogMinimum = contract.match(/corporateEventProviders\.length\s*>=\s*(\d+)/);
assert(Number(catalogMinimum?.[1]) >= 108,'Main directory contract must retain the 108-venue Houston deepening baseline even after expansion');
console.log('Houston source-backed corporate venues PASS: original +18, 53+ Houston metro, source and price/capacity disclosures retained.');
