import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateEventMarketMatches } from '../../src/data/corporate-event-market-search.ts';

const existingCities = ['Houston','Dallas','Austin','San Antonio'];
const additionalCities = ['El Paso','Corpus Christi','Galveston','Waco','Lubbock'];
assert(corporateEventProviders.length >= 46, 'The original nine-market sourced directory must be retained as the catalog grows');
assert.equal(new Set(corporateEventProviders.map((p) => p.slug)).size, corporateEventProviders.length, 'All original and future venue slugs must be unique');
for (const name of [...existingCities, ...additionalCities]) {
  const area = corporateEventProviders.filter((p) =>
    p.city === name || (name === 'Dallas' && p.metro === 'Dallas/Fort Worth') || p.metro === name,
  );
  assert(area.length >= 3, 'Need at least three published city options for ' + name);
  assert(corporateEventProviders.some((p) => corporateEventMarketMatches(p,name+', TX')), name + ', TX should match the finder');
}
for (const name of additionalCities) {
  assert(corporateEventProviders.filter((p) => p.city === name).length >= 3, 'Retain at least three sourced partners in '+name);
}
for (const p of corporateEventProviders) {
  assert(p.officialUrl.startsWith('https://') && p.sourceUrl.startsWith('https://'), p.slug);
  const reviewed = new Date(p.verifiedOn + 'T12:00:00Z');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(p.verifiedOn) &&
    !Number.isNaN(reviewed.getTime()) && reviewed.toISOString().slice(0, 10) === p.verifiedOn &&
    reviewed.getTime() <= Date.now() + 86400000,
    'Every editorial venue needs a real, non-future review date: ' + p.slug);
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
assert(guides.includes('recommendedCategory') && guides.includes('eligibleFor45'), 'Market CTAs must choose a category suitable for each venue market and requested group size');
assert(seo.includes('Texas Corporate Events') && seo.includes('corporate event venues'), 'Statewide SEO description must remain accurate as more markets join');
assert(ui.includes('throughout Texas') && ui.includes('company outings'), 'The main hero must describe statewide venue coverage, not a stale nine-market count');
assert(ui.includes('corporateEventMarketMatches(provider, cityTerm)'), 'Finder must search all current and future markets through its normalized matcher');
console.log('Original nine-market baseline preserved across statewide catalog growth; source and discoverability PASS.');
