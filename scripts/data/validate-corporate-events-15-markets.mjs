import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateEventMarketMatches, normalizeCorporateEventMarketQuery } from '../../src/data/corporate-event-market-search.ts';

const source = readFileSync('src/components/events/CorporateEventMetroGuides.tsx','utf8');
const route = readFileSync('src/routes/corporate-events.lazy.tsx','utf8');
const seo = readFileSync('src/routes/corporate-events.tsx','utf8');

const expectedNew = [
  'grand-station-college-station', 'topgolf-bryan-corporate', 'aggieland-safari-bryan-groups',
  'the-grove-tyler-private-events', 'the-villa-tyler-corporate', 'tyler-palace-corporate-events', 'pinots-palette-tyler-teams',
  'beaumont-event-centre-corporate', 'beaumont-childrens-museum-rentals', 'the-mahj-room-beaumont',
  'hodgetown-amarillo-special-events', 'amarillo-escape-and-mystery-teams', 'cornerstone-ranch-amarillo-corporate',
  'the-mcallen-forum-corporate', 'helium-trampoline-park-mcallen', 'tribeca-event-center-mcallen', 'kickin-axes-mcallen-groups',
  'tall-city-axe-house-midland', 'midland-social-corporate-events', 'escape-the-case-midland-odessa', 'venezia-midland-corporate',
];
assert.equal(expectedNew.length, 21);
assert(corporateEventProviders.length >= 67, 'Fifteen markets require at least 67 records');
const indexed = new Map(corporateEventProviders.map((p) => [p.slug,p]));
assert.equal(indexed.size,corporateEventProviders.length,'Provider slugs must remain unique');
for (const slug of expectedNew) {
  const record=indexed.get(slug);
  assert(record, 'Missing sourced venue: '+slug);
  assert(record.officialUrl.startsWith('https://'),slug+' official HTTPS');
  assert(record.sourceUrl.startsWith('https://'),slug+' source HTTPS');
  assert.equal(record.verifiedOn,'2026-10-23');
  assert(record.capacityDetail.length >= 50,slug+' capacity qualification required');
  if(record.startingPricePerPerson!=null) {
    assert.equal(slug,'topgolf-bryan-corporate','Do not guess a rate for new venues');
    assert.equal(record.startingPricePerPerson,42);
    assert(record.capacityDetail.includes('tax') && record.capacityDetail.includes('fees'));
  }
}
const markets = [
  ['Houston',10], ['Dallas',3], ['Austin',3], ['San Antonio',3],
  ['El Paso',3], ['Corpus Christi',3], ['Galveston',3], ['Waco',3], ['Lubbock',3],
  ['Bryan/College Station',3], ['Tyler',4], ['Beaumont',3], ['Amarillo',3],
  ['McAllen',4], ['Midland/Odessa',4],
];
assert.equal(markets.length,15);
for(const [market,min] of markets) {
  const records=corporateEventProviders.filter((p)=> corporateEventMarketMatches(p,market));
  assert(records.length>=min,'Venue count insufficient for '+market+': '+records.length);
}
assert.equal(normalizeCorporateEventMarketQuery('Bryan-College Station, TX'),'bryan college station');
assert.equal(normalizeCorporateEventMarketQuery('Midland–Odessa, TX'),'midland odessa');
for (const [alias,market] of [
  ['College Station, TX','Bryan/College Station'],
  ['Bryan','Bryan/College Station'],
  ['Odessa','Midland/Odessa'],
  ['Midland, TX','Midland/Odessa'],
  ['McAllen Texas','McAllen'],
]) {
  const matched=corporateEventProviders.filter((p)=>corporateEventMarketMatches(p,alias));
  assert(matched.length >= (alias==='Bryan'?2:3),alias+' must find '+market);
}
assert(source.includes('const cityGuides = [') && source.includes('knownGuideKeys'), 'Future markets must automatically get discovery sections');
assert(source.includes('provider.metro || provider.city'), 'Future metro aliases must be discovered automatically');
for (const anchor of ['bryan-college-station','tyler','beaumont','amarillo','mcallen','midland-odessa']) {
  assert(source.includes("slug: '"+anchor+"'"),'Missing public city discovery section: '+anchor);
}
assert(source.includes('eligibleFor45'), 'City guide links must prefer categories that work for 45-person groups');
assert(route.includes('Bryan–College Station') && route.includes('Midland–Odessa'), 'Hero must reflect statewide footprint');
assert(seo.includes('Bryan–College Station') && !seo.includes('45+ source-backed'), 'SEO must not have stale venue count');
console.log('TexasDefined corporate-event directory: 15 markets, 67+ venues, 21 new official sources, dynamic future guides PASS.');
