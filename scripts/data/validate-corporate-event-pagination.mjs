import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CORPORATE_EVENT_RESULT_PAGE_SIZE, visibleCorporateEventResults, nextCorporateEventResultCount } from '../../src/data/corporate-event-pagination.ts';

const venues = Array.from({ length: 136 }, (_, i) => ({ slug: 'venue-' + (i + 1) }));
assert.equal(CORPORATE_EVENT_RESULT_PAGE_SIZE, 12, 'A full Texas-wide catalog must not render at once');
assert.deepEqual(visibleCorporateEventResults(venues, 12).map(p => p.slug),
  venues.slice(0, 12).map(p => p.slug), 'First page must preserve source-editorial order');
assert.equal(visibleCorporateEventResults(venues, -1).length, 12, 'Invalid counts must fail to the safe first page');
assert.equal(visibleCorporateEventResults(venues, 1000).length, 136, 'Everything remains reachable');
assert.equal(visibleCorporateEventResults(venues, Number.NaN).length, 12);
assert.equal(nextCorporateEventResultCount(136, 12), 24);
assert.equal(nextCorporateEventResultCount(136, 132), 136, 'Final step must clamp to match count');
assert.equal(nextCorporateEventResultCount(9, 12), 9, 'Small city markets must not show a pointless button');
assert.equal(nextCorporateEventResultCount(136, -5), 24, 'Invalid start must not skip listings');
const route = readFileSync('src/routes/corporate-events.lazy.tsx', 'utf8');
assert(route.includes('const [visibleCount, setVisibleCount] = useState(CORPORATE_EVENT_RESULT_PAGE_SIZE)'), 'Initialize first-page venue limit');
assert(route.includes('visibleCorporateEventResults(matches, visibleCount)'), 'Render only bounded cards, never all statewide results');
assert(route.includes('{visibleMatches.map((provider)'), 'Only current batch may be in the live venue grid');
assert(!route.includes('{matches.map((provider)'), 'Never render every matching venue card at once');
assert(route.includes('setVisibleCount(CORPORATE_EVENT_RESULT_PAGE_SIZE);'), 'Filters must reset pagination');
assert(route.includes('[city, areaQuery, headcount, category, includeOtherTypes, budget]'), 'Changing any public search filter must reset page');
assert(route.includes('onClick={() => setVisibleCount((shown) => nextCorporateEventResultCount(matches.length, shown))}'), 'Show more must advance, not reorder search results');
assert(route.includes('Showing {visibleMatches.length} of {matches.length} matched venue options'), 'Accessible public count must reflect actual matching providers');
assert(route.includes('role="status" aria-live="polite"'), 'Assistive technology must announce new results');
assert(route.includes("const shortlist = useMemo(() => corporateEventProviders.filter((provider) => selected.includes(provider.slug))"), 'Shortlist must remain independent of visible page');
assert(route.includes('selected.includes(provider.slug)'), 'Newly revealed venue card must reflect persisted shortlist state');
console.log('Corporate event finder progressive paging: 136 records, stable order, full venue reachability, a11y and shortlist independence PASS.');
