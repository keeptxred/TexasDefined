import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
const page = readFileSync('src/components/events/CorporateEventMetroGuides.tsx', 'utf8');
const route = readFileSync('src/routes/corporate-events.lazy.tsx', 'utf8');
const filters = ['Houston','Dallas/Fort Worth','Austin','San Antonio'];
for (const market of filters) {
  const options = corporateEventProviders.filter((provider) => provider.city === market || provider.metro === market);
  assert(options.length >= 3, 'Too few sourced corporate event venues for ' + market);
}
for (const slug of ['houston','dallas-fort-worth','austin','san-antonio']) {
  assert(page.includes("'corporate-events-' + guide.slug"), 'City anchor missing');
  assert(page.includes("slug: '" + slug + "'"), 'Missing metro guide: ' + slug);
}
assert(page.includes('provider.officialUrl'), 'City guide links must go to independent official venue websites');
assert(page.includes("provider.metro === guide.key"), 'Metro suburban entries must be included');
assert(page.includes("'/corporate-events?city=' + encodeURIComponent(guide.city)"), 'City guide must link back to finder');
assert(page.includes('no partner discount') || page.includes('no partner discount'.replace('no', 'No')), 'Do not imply negotiated discounts');
assert(page.includes('Only treat a reservation as confirmed'), 'Do not confuse a sourced venue with live booking');
assert(route.includes('<CorporateEventMetroGuides />'), 'Four market guides must appear on the main corporate finder');
console.log('Corporate-event market discovery and independent source links PASSED.');
