import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const plan = readFileSync('scripts/ci/production-change-scope.mjs', 'utf8');
const live = readFileSync('scripts/ci/verify-changed-production-pages.mjs', 'utf8');
const route = readFileSync('src/routes/corporate-events.lazy.tsx', 'utf8');
const catalog = readFileSync('src/data/corporate-events.ts', 'utf8');
const guide = readFileSync('src/components/events/CorporateEventCategoryGuides.tsx', 'utf8');

assert(plan.includes("corporateEventPages.add('/corporate-events')"), 'Finder changes must select the real canonical public route');
for (const path of [
  'src/routes/corporate-events.lazy.tsx', 'src/data/corporate-events.ts',
  'src/components/events/CorporateEventMetroGuides.tsx',
  'src/components/events/CorporateEventCategoryGuides.tsx',
  'src/data/corporate-events.functions.ts',
]) assert(plan.includes(path), 'Changed-source selector missing: ' + path);
assert(plan.includes('...corporateEventPages'), 'Production planner must not drop corporate smoke when page budget is reached');
assert(plan.includes('corporateEventPages: selectedPaths.filter'), 'Plan must pass only selected public pages to verifier');
assert(live.includes("corporateEventPages.length > 1"), 'Corporate smoke must be bounded to one route');
assert(live.includes("p !== '/corporate-events'"), 'Corporate smoke may not fetch arbitrary or private endpoints');
assert(live.includes("assertCorporateEventContents(html, 'cache-busted')"), 'Cache-busted release must be checked');
assert(live.includes("assertCorporateEventContents(visitorHtml, 'ordinary visitor URL')"), 'Unmodified visitor cache must also be checked');
assert(live.includes('visitorCanonical.length !== 1'), 'Visitor canonical must be checked independently');

const correctTagPattern = String.raw`visitorHtml.matchAll(/<link\b[^>]*>/gi)`;
const correctRelPattern = String.raw`.filter(match => /\brel=["']canonical["']/i.test(match[0]))`;
assert(live.includes(correctTagPattern) && live.includes(correctRelPattern),
  'The visitor-only verifier must use real regex word boundaries, not escaped literal backslash-b');
assert(!live.includes(String.raw`visitorHtml.matchAll(/<link\\b[^>]*>/gi)`)
  && !live.includes(String.raw`.filter(match => /\\brel=["']canonical["']/i.test(match[0]))`),
  'Double-escaped word boundaries wrongly reject all valid visitor canonical tags');
// Synthetic positive and negative controls. Do not call a live site here.
const canonicalDoc = '<html><head><meta charset="utf-8"><link rel="canonical" href="https://texasdefined.com/corporate-events"></head></html>';
const parse = html => [...html.matchAll(/<link\b[^>]*>/gi)].filter(match => /\brel=["']canonical["']/i.test(match[0]));
assert.equal(parse(canonicalDoc).length, 1, 'Valid canonical fixture must be recognized');
assert.equal(parse(canonicalDoc.replace('canonical', 'alternate')).length, 0, 'A noncanonical rel is not a canonical link');
assert.equal(parse(canonicalDoc+canonicalDoc).length, 2, 'Duplicate canonical links are not silently accepted');

assert(live.includes('cf-mitigated'), 'Cloudflare bot challenges must not be mistaken for production success');
for (const text of [
  'A practical guide to corporate event types', 'Corporate events in Texas cities',
  'BreadcrumbList', 'ItemList',
  'Submitting this form does not request a quote from a venue',
  'I agree TexasDefined may use this information to contact me',
  'Capacity is not live availability.',
]) assert(live.includes(text), 'Missing honest public SSR acceptance marker: ' + text);
assert(route.includes('<CorporateEventCategoryGuides />') && guide.includes('Ask before you commit'), 'Production markers must originate from real route components');
assert(catalog.includes('capacityDetail'), 'Published venue capacity is metadata, not a booking assertion');
assert(!live.includes('method: \'POST\'') && !live.includes('sendMail('),
  'Production verifier must remain a GET-only, zero-inquiry smoke');
console.log('Corporate-event bounded production SSR/canonical/privacy verification contract PASS');
