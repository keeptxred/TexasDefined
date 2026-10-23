import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders, corporateEventCategories } from '../../src/data/corporate-events.ts';

const route = readFileSync('src/routes/corporate-events.tsx', 'utf8');
const lazyRoute = readFileSync('src/routes/corporate-events.lazy.tsx', 'utf8');
const api = readFileSync('src/data/corporate-events.functions.ts', 'utf8');
const registry = readFileSync('src/lib/public-routes.ts', 'utf8');
const brand = readFileSync('src/brand/texasdefined.ts', 'utf8');
const events = readFileSync('src/routes/events.index.lazy.tsx', 'utf8');
const categories = new Set(corporateEventCategories.map((item) => item.value));

assert(corporateEventProviders.length >= 30, 'At least 30 source-verified statewide providers');
for (const metro of ['Houston', 'Dallas', 'Austin', 'San Antonio']) {
  assert(corporateEventProviders.filter((provider) => provider.city === metro || provider.metro?.includes(metro)).length >= 3, metro + ' must have three or more options');
}
assert(corporateEventProviders.filter((p) => p.city === 'Houston' && p.maxGroup >= 45 && (!p.minGroup || p.minGroup <= 45)).length >= 8);
assert.equal(new Set(corporateEventProviders.map((p) => p.slug)).size, corporateEventProviders.length);
for (const p of corporateEventProviders) {
  assert(p.officialUrl.startsWith('https://') && p.sourceUrl.startsWith('https://'));
  assert(p.verifiedOn === '2026-10-23');
  assert(p.categories.every((category) => categories.has(category)));
}
assert(route.includes('createFileRoute("/corporate-events")'));
assert(lazyRoute.includes("createLazyFileRoute('/corporate-events')"));
assert(lazyRoute.includes('submitGroupEventRequest'));
assert(lazyRoute.includes('navigator.clipboard.writeText'));
assert(lazyRoute.includes('provider.metro?.toLowerCase().includes(requestedCity)'), 'Metro filtering must include real suburbs without mislabeling city');
assert(api.includes('consentContact'));
assert(registry.includes('"/corporate-events"'));
assert(brand.includes('to: "/corporate-events"'));
assert(events.includes('to="/corporate-events"'));
console.log('Corporate events MVP contract checks passed');
