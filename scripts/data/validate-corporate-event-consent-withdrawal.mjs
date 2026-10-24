import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sql = readFileSync('supabase/migrations/20261024025000_group_event_consent_revocation.sql', 'utf8');
const server = readFileSync('src/data/corporate-events.admin.server.ts', 'utf8');
const api = readFileSync('src/data/corporate-events.admin.functions.ts', 'utf8');
const panel = readFileSync('src/components/events/CorporateEventOpsPanel.tsx', 'utf8');
const quote = readFileSync('src/data/corporate-event-quote.server.ts', 'utf8');
const quoteUi = readFileSync('src/components/events/CorporateEventQuotePrepPanel.tsx', 'utf8');
const intake = readFileSync('src/data/corporate-events.functions.ts', 'utf8');

for(const item of [
  'provider_outreach_revoked_at timestamptz',
  'provider_outreach_revoked_by text',
  'provider_outreach_revocation_note text',
  'td_group_event_outreach_revocation_proof',
  'new.allow_provider_outreach is distinct from false',
  'new.provider_outreach_revoked_at is distinct from old.provider_outreach_revoked_at',
  'before update on public.texasdefined_group_event_requests',
  'revoke all on function public.texasdefined_group_event_prevent_consent_reactivation()',
]) assert(sql.includes(item), 'Missing privacy-preserving revocation policy: '+item);

assert(server.includes('export async function revokeCorporateEventVenueSharing(')
  && server.includes('await assertSportsPartnerAccess(accessKey)')
  && server.includes(".eq('allow_provider_outreach', true)")
  && server.includes(".is('provider_outreach_revoked_at', null)"),
  'Only authorized operators can revoke active consent once');
assert(server.includes('allow_provider_outreach: false')
  && server.includes('provider_outreach_revoked_at: new Date().toISOString()'),
  'A revocation must immediately remove live permission');
assert(server.includes('historicalConsentRetainedPrivately: true')
  && !server.includes('provider_outreach_consented_at: null'),
  'Historical consent evidence must remain in the private ledger, not be silently erased');
assert(api.includes('withdrawCorporateEventVenueSharing = createServerFn({ method: \'POST\' })')
  && api.includes('verifiedOrganizerInstruction: z.literal(true)')
  && api.includes('verificationNote: z.string().trim().min(20).max(500)'),
  'Request must be explicitly verified and server validated');
assert(panel.includes('Record verified organizer withdrawal of venue-sharing consent')
  && panel.includes('withdrawVenueConsent(lead)')
  && panel.includes('No contact was sent to a venue'),
  'Private operator UI must record consent withdrawals without pretending to notify partners');
assert(quote.includes('!lead.allow_provider_outreach') &&
  quote.includes('lead.provider_outreach_consented_at'),
  'Every future private draft must continue to re-read the live consent bit');
const copySection = quoteUi.slice(quoteUi.indexOf('async function copyDraft()'), quoteUi.indexOf('return <section'));
assert(copySection.includes('await prepareCorporateEventQuoteDraft({ data:')
  && copySection.includes('await navigator.clipboard.writeText(')
  && copySection.indexOf('await prepareCorporateEventQuoteDraft({ data:') < copySection.indexOf('await navigator.clipboard.writeText('),
  'Manual clipboard disclosure must re-check real organizer consent and partner authority at copy time');
assert(copySection.includes('setDraft(null)'), 'Denied copy must immediately clear potentially stale contact details');
assert(intake.includes('consentSelectedVenues'), 'Original optional planner consent must remain separate');
console.log('Corporate event organizer venue-sharing withdrawal is private, audit-preserving and irreversible on the original inquiry PASS');
