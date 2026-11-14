import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { prepareCorporateEventPartnerInvitation } from '../../src/data/corporate-event-partner-invitation.ts';

const venue = {
  name: 'Illustrative Games of Texas', city: 'Houston', format: 'Indoor games',
  capacityDetail: 'Official group room information; group size must be reconfirmed',
  officialUrl: 'https://venues.example.test/corporate',
  sourceUrl: 'https://venues.example.test/groups',
  verifiedOn: '2026-10-23',
};
test('manual group-partner contact asks about 45 guests but never asserts live capacity, contact or prices', () => {
  const out = prepareCorporateEventPartnerInvitation(venue, 'group-packages');
  assert.equal(out.status, 'manual-draft-not-sent');
  assert.equal(out.officialUrl, venue.officialUrl);
  for (const marker of [
    'approximately 45 coworkers', 'organized rotations', 'must be reconfirmed',
    'https://venues.example.test/groups', 'pricing', 'cancellation',
    'not forwarding planner contact details',
  ]) assert(out.body.includes(marker), 'Missing safe business-contact disclosure: ' + marker);
  assert(!out.body.includes('@'), 'Never guess a venue email address');
  assert(!/\b(guarantee|confirmed booking|exclusive partner|commission of 10%|coupon code:)\b/i.test(out.body));
});
test('commercial invitation never invents affiliate terms or paid editorial ranking', () => {
  const out=prepareCorporateEventPartnerInvitation(venue,'commercial-opportunities');
  assert.equal(out.status,'manual-draft-not-sent');
  assert(out.body.includes('No rates, discounts, commissions, exclusivity or placements are assumed'));
  assert(out.body.includes('clearly labeled') && out.body.includes('independent editorial venue rankings'));
  assert.throws(() => prepareCorporateEventPartnerInvitation(venue,'send-now'),/Unknown manual invitation purpose/);
});
test('business-development panel is protected and cannot send, record or approve a commercial event',()=>{
  const ui=readFileSync('src/components/events/CorporateEventPartnerInvitationKit.tsx','utf8');
  const privateRoute=readFileSync('src/routes/admin.sports-partners.lazy.tsx','utf8');
  assert(privateRoute.includes('{dashboard ? <CorporateEventPartnerInvitationKit /> : null}'),
    'Invitation tools must be visible only after authorized staff dashboard unlock');
  for(const marker of [
    'navigator.clipboard.writeText(', 'Copy unsent invitation',
    'Official venue contact website', 'Published source evidence',
    'Verify the authorized representative', 'separately signed and dated permission',
    'Never forward a planner', "corporateEventProviders",
  ]) assert(ui.includes(marker),'Missing staff manual outreach boundary: '+marker);
  assert(!/sendMail\s*\(|\.send\s*\(|\.insert\s*\(|\.update\s*\(|fetch\s*\(|createServerFn\s*\(/.test(ui),
    'Manual invitation preparation must not message partners or create business records');
});
