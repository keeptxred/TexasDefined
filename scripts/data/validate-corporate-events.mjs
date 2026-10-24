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
const categories = new Set(corporateEventCategories.map((item) => item.value));

assert(corporateEventProviders.length >= 136, 'Corporate event directory requires at least 136 independently sourced venues including 50+ in Houston proper');
assert(corporateEventProviders.filter((p) => p.city === 'Houston').length >= 50, 'Houston proper must maintain 50+ distinct source-backed venues, not just suburban listings');
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
  assert(provider.startingPricePerPerson === null || (provider.slug === 'escape-it-houston-group-events' && provider.startingPricePerPerson === 35),
    'Do not use unverified private group pricing: ' + slug);
}
assert(!corporateEventProviders.some((venue) => /the rustic.*downtown/i.test(venue.name)),
  'Exclude The Rustic Houston Downtown until the operator confirms reopening from its temporary relocation closure');

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
