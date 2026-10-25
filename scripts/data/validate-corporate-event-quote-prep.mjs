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
// Actual staff quote preview must fail closed for forged/future consent and
// business identity, impossible expiry days, and unverified signed scopes.
assert(server.includes('corporateEventEvidenceTimestampIsValid(lead.provider_outreach_consented_at)'),
  'Only genuine nonfuture consent timestamps may unlock planner PII');
assert(server.includes('corporateEventEvidenceTimestampIsValid(application.identity_verified_at)')
  && server.includes('corporateEventEvidenceTimestampIsValid(application.commercial_agreement_verified_at)'),
  'Staff quote drafts must use the same signed-evidence policy as public offers');
assert(server.includes('isValidCorporateEventCalendarDate(String(application.commercial_agreement_expires_on))'),
  'An impossible agreement expiry cannot authorize a quote draft');
assert(!server.includes('Number.isFinite(Date.parse('),
  'No permissive Date.parse-only commercial evidence guard');
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
