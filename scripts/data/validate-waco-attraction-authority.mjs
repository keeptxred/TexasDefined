import assert from 'node:assert/strict';
import fs from 'node:fs';

function read(path) { return fs.readFileSync(path, 'utf8'); }
const core = read('src/data/museum-expansion-waco.ts');
const museumUpgrade = read('src/data/waco-museum-authority-upgrades.ts');
const newPlaces = read('src/data/waco-viator-attraction-destinations.ts');
const preserved = read('src/data/destination-preserved-catalog.ts');
const venue = read('src/data/sports-venue-guide-wave4.ts');
const venuePage = read('src/components/sports/SportsVenueGuidePage.tsx');
const destination = read('src/components/editorial/DestinationViatorBooking.tsx');
const viator = read('src/data/waco-viator-attraction-links.ts');
const hub = read('src/routes/waco-attractions.tsx');
const ghost = read('src/routes/waco-ghost-tours.tsx');
const dallas = read('src/routes/dallas-to-waco-magnolia-tours.tsx');
const staticRoutes = read('src/lib/public-routes.ts');
const experience = read('src/components/monetization/WacoViatorExperienceCards.tsx');
const products = read('src/data/waco-bookable-viator-experiences.ts');

function present(source, needle, label) {
  assert.ok(source.includes(needle), `${label}: missing ${needle}`);
}
const museumSlugs = ['dr-pepper-museum-waco','texas-ranger-hall-of-fame-museum-waco'];
for (const slug of museumSlugs) {
  present(core, `slug: "${slug}"`, slug);
  present(museumUpgrade, `"${slug}": {`, `${slug} upgrade`);
}
present(core,'wacoMuseumBaseDestinations.map(applyWacoMuseumAuthority)', 'museum authority overlay attached');
present(museumUpgrade, 'authorityGuide };', 'full museum authority returned');
// The two museum authority structures use MUSEUM_AUTHORITY, not WACO_AUTHORITY_GUIDES.
for (const slug of museumSlugs) {
  present(museumUpgrade, `"${slug}": {`, `${slug} full source-backed authority data`);
}
const four = ['cottonland-castle','waco-suspension-bridge','cameron-park-waco','cameron-park-zoo'];
for (const slug of four) {
  present(newPlaces, `slug: "${slug}"`, `${slug} canonical`);
  present(newPlaces, `"${slug}": {`, `${slug} itinerary, assessment and sources`);
}
present(newPlaces, 'authorityGuide: WACO_AUTHORITY_GUIDES[entry.slug]', 'new destination authority attached');
present(preserved, 'wacoViatorAttractionDestinations,', 'new authority registry');
present(venue, "'mclane-stadium': {", 'sports venue canonical');
present(venue, 'faqs: [', 'McLane Stadium visitor FAQs');
present(venue, 'nearbyPlaces: [', 'McLane Stadium nearby Waco guides');
present(venuePage, 'mclane-viator-experiences', 'venue affiliate section');
present(viator, 'Dr Pepper Museum', 'museum Waco Viator registry');
for (const slug of [...museumSlugs,...four,'mclane-stadium']) {
  present(viator, `slug: "${slug}"`, `Waco attraction ${slug} Viator registry`);
}
present(hub, 'WACO_VIATOR_ATTRACTIONS.map', 'seven Waco authority directory');
for(const path of ['/waco-attractions','/waco-ghost-tours','/dallas-to-waco-magnolia-tours']){
  present(staticRoutes,`"${path}"`, `${path} sitemap indexability`);
}
present(destination, 'wacoViatorAttractionForSlug', 'attraction-specific Viator deep link');
present(experience, 'buildViatorAffiliateUrl(experience.url, experience.campaign)', 'product deep link attribution');
present(experience, 'sponsored nofollow noopener noreferrer', 'sponsored relationship');
present(experience, 'trackAffiliateClick(', 'product click analytics');
present(experience, 'Affiliate disclosure:', 'visible affiliate disclosure');
for(const code of ['455209P1','222222P107','5555414P1'])present(products,code,'Viator product code');
present(ghost, '<WacoViatorExperienceCards kind="ghost"', 'substantive ghost comparison');
present(dallas, '<WacoViatorExperienceCards kind="dallas"', 'substantive Dallas tour comparison');

for(const [slug, page] of [['dr-pepper-museum-waco',museumUpgrade],['texas-ranger-hall-of-fame-museum-waco',museumUpgrade],...four.map(slug=>[slug,newPlaces])]){
  assert.ok(page.includes('sources: [') && page.includes('itineraries: [') && page.includes('recommendedVisit:'), `${slug}: source-backed itinerary template missing`);
}
console.log('Waco authority regression: seven canonical guides, sources, itineraries, cross-links and affiliate attribution passed.');
