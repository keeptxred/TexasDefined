import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateVenueMatchesEvidenceFilter } from '../../src/data/corporate-event-source-gaps.ts';

const unknown={maxGroup:null,minGroup:8,startingPricePerPerson:null};
const fortyFive={maxGroup:45,minGroup:8,startingPricePerPerson:38};
const exactly44={maxGroup:44,minGroup:8,startingPricePerPerson:30};
const minGreater={maxGroup:120,minGroup:50,startingPricePerPerson:null};
assert(corporateVenueMatchesEvidenceFilter(unknown,'no-numeric-capacity-ceiling'));
assert(corporateVenueMatchesEvidenceFilter(unknown,'no-numeric-starting-rate'));
assert(!corporateVenueMatchesEvidenceFilter(unknown,'published-ceiling-covers-45'),
  'Unknown capacity must never be displayed as confirmed for 45 guests');
assert(corporateVenueMatchesEvidenceFilter(fortyFive,'published-ceiling-covers-45'));
assert(!corporateVenueMatchesEvidenceFilter(exactly44,'published-ceiling-covers-45'));
assert(!corporateVenueMatchesEvidenceFilter(minGreater,'published-ceiling-covers-45'),
  'A venue with published minimum 50 is not documented for 45 guests');
assert(corporateVenueMatchesEvidenceFilter(minGreater,'no-numeric-starting-rate'));
assert(corporateVenueMatchesEvidenceFilter(minGreater,'all'));
assert(!corporateVenueMatchesEvidenceFilter(minGreater,'arbitrary-unapproved'));

assert(corporateEventProviders.length >= 136,'All 136 sourced venues must remain in the review queue');
const unmatched = corporateEventProviders.filter(provider =>
  !corporateVenueMatchesEvidenceFilter(provider,'all'));
assert.equal(unmatched.length,0,'New venues must default into the staff evidence review queue');
const noMaximum=corporateEventProviders.filter(provider =>
  corporateVenueMatchesEvidenceFilter(provider,'no-numeric-capacity-ceiling'));
const noRate=corporateEventProviders.filter(provider =>
  corporateVenueMatchesEvidenceFilter(provider,'no-numeric-starting-rate'));
assert(noMaximum.length>0 && noRate.length>0,'Source evidence filters must expose actual unresolved review work');
const staff=readFileSync('src/components/events/CorporateEventSourceReviewPanel.tsx','utf8');
const admin=readFileSync('src/routes/admin.sports-partners.lazy.tsx','utf8');
const canonical=readFileSync('scripts/ci/run-premerge-validation.mjs','utf8');
assert(staff.includes('corporateVenueMatchesEvidenceFilter(item.provider, evidenceNeed)'),
  'Capacity/price filters must use the tested evidence classifier, not a hidden live-availability promise');
assert(staff.includes('setEvidenceNeed(event.target.value as CorporateVenueEvidenceFilter); setPageIndex(1);'),
  'Changing evidence type must reset bounded pagination');
for (const label of [
  'No published numeric maximum','No numeric starting rate','Published limits include 45 guests',
  'not promises of simultaneous room capacity','still require the venue to confirm the actual event format',
]) assert(staff.includes(label),'Staff evidence filter must disclose its editorial limitations: '+label);
assert(staff.includes('const pageSize = 24') && staff.includes('aria-live="polite"'),
  'Keep bounded, accessible review results');
assert(admin.includes('{dashboard ? <CorporateEventSourceReviewPanel /> : null}'),
  'Do not reveal private source editorial operations outside authorized dashboard');
assert(!/\bfetch\s*\(|\.insert\s*\(|\.update\s*\(/.test(staff),
  'Filtering venue claims must be read-only, with no external contact or automatic source-reverified records');
assert(canonical.includes('validate-corporate-event-evidence-gaps.mjs'),
  'Protected canonical validator must include this missing-evidence test');
console.log('Corporate events sourced capacity and price gap review: 136+ listings, no invented 45-guest fit, private and read-only PASS.');
