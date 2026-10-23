import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateEventMarketMatches } from '../../src/data/corporate-event-market-search.ts';

const existingCities = ['Houston','Dallas','Austin','San Antonio'];
const additionalCities = ['El Paso','Corpus Christi','Galveston','Waco','Lubbock'];
assert.equal(corporateEventProviders.length, 46, 'Only fully sourced current editorial listings belong in the catalog');
assert.equal(new Set(corporateEventProviders.map((p) => p.slug)).size, 46);
for (const name of [...existingCities, ...additionalCities]) {
  const area = corporateEventProviders.filter((p) =>
    p.city === name || (name === 'Dallas' && p.metro === 'Dallas/Fort Worth') || p.metro === name,
  );
  assert(area.length >= 3, 'Need at least three published city options for ' + name);
  assert(corporateEventProviders.some((p) => corporateEventMarketMatches(p,name+', TX')), name + ', TX should match the finder');
}
for (const name of additionalCities) {
  assert(corporateEventProviders.filter((p) => p.city === name).length === 3, 'Add three sourced partners to '+name);
}
for (const p of corporateEventProviders) {
  assert(p.officialUrl.startsWith('https://') && p.sourceUrl.startsWith('https://'), p.slug);
  assert.equal(p.verifiedOn,'2026-10-23');
  assert(p.categories.length > 0);
  if(p.startingPricePerPerson!==null) assert(p.startingPricePerPerson > 0);
  if(p.maxGroup !== null) assert(p.maxGroup > 0);
  assert(p.capacityDetail.length > 20, 'Explain the actual capacity qualifier: '+p.slug);
}
const guides=readFileSync('src/components/events/CorporateEventMetroGuides.tsx','utf8');
const seo=readFileSync('src/routes/corporate-events.tsx','utf8');
const ui=readFileSync('src/routes/corporate-events.lazy.tsx','utf8');
for(const slug of ['el-paso','corpus-christi','galveston','waco','lubbock']) {
  assert(guides.includes("slug: '"+slug+"'"),'Visible market guide absent '+slug);
}
assert(guides.includes("guide.slug === 'corpus-christi' || guide.slug === 'galveston'"),'Coastal CTAs must select applicable company-event category');
assert(seo.includes('Corpus Christi') && seo.includes('Lubbock'),'SEO description must cover new markets');
assert(ui.includes('nine Texas markets'),'Hero must reflect new statewide coverage');
assert(ui.includes('Browse Houston, DFW, Austin, San Antonio, El Paso'),'Finder input hint must reflect nine city markets');
console.log('46 official-source corporate event venues across nine Texas markets: verified schema and discoverability PASS.');
