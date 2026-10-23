import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(p, 'utf8');
const server = read('src/data/corporate-event-quote.server.ts');
const fn = read('src/data/corporate-event-quote.functions.ts');
const panel = read('src/components/events/CorporateEventQuotePrepPanel.tsx');
const admin = read('src/routes/admin.sports-partners.lazy.tsx');
for (const marker of [
  'await assertSportsPartnerAccess(accessKey)',
  '.eq(\'id\', leadId)',
  'lead.allow_provider_outreach',
  'lead.provider_outreach_consented_at',
  'lead.provider_slugs.includes(providerSlug)',
  "['spam', 'closed']",
  'isUpcomingCorporateEventDate',
  ".eq('status', 'approved')",
  'normalizeBusinessName',
  'verifiedBusinessDomain',
  'candidates.length !== 1',
  "sent: false as const",
]) {
  assert(server.includes(marker), 'Missing privacy/partner validation guard: ' + marker);
}
assert(fn.includes("createServerFn({ method: 'POST' })"), 'Staff draft action must validate request');
assert(fn.includes('accessKey: z.string().min(20)'), 'Staff access key must be present');
assert(fn.includes('leadId: z.string().uuid()'), 'Request selector cannot accept arbitrary strings');
assert(!server.includes('sendMail(') && !server.includes('fetch(') && !server.includes('mailer.send'), 'Preparing a quote must never send private contact information');
assert(panel.includes("lead.allow_provider_outreach === true"), 'Admin UI must show only opted-in active planners');
assert(panel.includes('selectedVenueNames'), 'Admin must constrain venues to the planner shortlist');
assert(panel.includes('Prepare manual quote-request draft (not sent)'), 'Button may not imply sending');
assert(panel.includes('navigator.clipboard.writeText'), 'Operator must review and manually copy');
assert(admin.includes('{dashboard ? <CorporateEventQuotePrepPanel accessKey={accessKey} /> : null}'), 'Gate quote draft behind existing protected console');
console.log('Corporate event partner quote drafts: verified, opted-in, staff-only, no sending PASS.');
