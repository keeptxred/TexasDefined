import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateEventMarketMatches } from '../../src/data/corporate-event-market-search.ts';
const page = readFileSync('src/components/events/CorporateEventMetroGuides.tsx', 'utf8');
const route = readFileSync('src/routes/corporate-events.lazy.tsx', 'utf8');
const filters = ['Houston','Dallas/Fort Worth','Austin','San Antonio','Bryan/College Station','Midland/Odessa','Abilene','Killeen/Temple','New Braunfels','Fredericksburg'];
for (const market of filters) {
  const options = corporateEventProviders.filter((provider) => corporateEventMarketMatches(provider, market));
  assert(options.length >= 3, 'Too few sourced corporate event venues for ' + market);
}
for (const slug of ['houston','dallas-fort-worth','austin','san-antonio','abilene','killeen-temple','new-braunfels','fredericksburg']) {
  assert(page.includes("'corporate-events-' + guide.slug"), 'City anchor missing');
  assert(page.includes("slug: '" + slug + "'"), 'Missing metro guide: ' + slug);
}
assert(page.includes('provider.officialUrl'), 'City guide links must go to independent official venue websites');
assert(page.includes('corporateEventMarketMatches(provider, guide.key)'), 'City guides must include names and suburban metro aliases');
const categoryPage = readFileSync('src/components/events/CorporateEventCategoryGuides.tsx', 'utf8');
for (const [source, cityValue, categoryValue] of [[page, 'value={guide.city}', 'value={recommendedCategory}'], [categoryPage, 'value="Texas"', 'value={value}']]) {
  assert(source.includes('<form action="/corporate-events" method="get"'), 'Finder presets must use a native GET form, not crawlable query links');
  assert(source.includes('name="city" ' + cityValue), 'Preserve selected city');
  assert(source.includes('name="guests" value="45"'), 'Preserve group size');
  assert(source.includes('name="type" ' + categoryValue), 'Preserve category');
  assert(source.includes('<button type="submit"'), 'Preset must be keyboard operable');
  assert(!source.includes('/corporate-events?'), 'Do not generate crawler-facing corporate filter URLs');
}
assert(page.includes('no partner discount') || page.includes('no partner discount'.replace('no', 'No')), 'Do not imply negotiated discounts');
assert(page.includes('Only treat a reservation as confirmed'), 'Do not confuse a sourced venue with live booking');
assert(route.includes('<CorporateEventMetroGuides />'), 'Four market guides must appear on the main corporate finder');
console.log('Corporate-event market discovery and independent source links PASSED.');
