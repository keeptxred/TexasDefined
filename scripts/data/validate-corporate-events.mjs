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

assert(corporateEventProviders.length >= 122, 'Corporate event venue directory requires 122 sourced venues across 19 Texas markets');
for (const metro of ['Houston', 'Dallas', 'Austin', 'San Antonio', 'El Paso', 'Corpus Christi', 'Galveston', 'Waco', 'Lubbock', 'Bryan/College Station', 'Tyler', 'Beaumont', 'Amarillo', 'McAllen', 'Midland/Odessa', 'Abilene', 'Killeen/Temple', 'New Braunfels', 'Fredericksburg']) {
  assert(corporateEventProviders.filter((p) => p.city === metro || p.metro?.includes(metro)).length >= 3, 'Insufficient metro coverage: ' + metro);
}
assert(corporateEventProviders.filter((p) => p.city === 'Houston' && p.maxGroup >= 45 && (!p.minGroup || p.minGroup <= 45)).length >= 8);
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
