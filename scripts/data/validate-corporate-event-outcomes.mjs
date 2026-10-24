import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = p => readFileSync(p,'utf8');
const migration = read('supabase/migrations/20261024020500_group_event_outcome_evidence_ledger.sql');
const server = read('src/data/corporate-event-outcomes.server.ts');
const api = read('src/data/corporate-event-outcomes.functions.ts');
const ui = read('src/components/events/CorporateEventOutcomePanel.tsx');
const privateRoute = read('src/routes/admin.sports-partners.lazy.tsx');
const premerge = read('scripts/ci/run-premerge-validation.mjs');

const statuses = [
 'quote_requested','quote_received','referral_sent','booking_confirmed',
 'booking_cancelled','dispute_opened','dispute_resolved','revenue_verified',
];
for(const status of statuses){
  assert(migration.includes("'"+status+"'"),'Private evidence type missing from SQL: '+status);
  assert(api.includes("'"+status+"'"),'Private evidence type missing from API: '+status);
  assert(ui.includes("'"+status+"'"),'Private evidence type missing from staff UI: '+status);
}
for(const guard of [
  'enable row level security',
  'revoke all on public.texasdefined_group_event_outcome_events from public, anon, authenticated',
  'grant select, insert on public.texasdefined_group_event_outcome_events to service_role',
  'revoke update, delete, truncate on public.texasdefined_group_event_outcome_events from service_role',
  'evidence_reference',
  'check (currency =',
]) assert(migration.includes(guard),'Missing private, append-only SQL guarantee: '+guard);
for(const check of [
  'await assertSportsPartnerAccess(accessKey)',
  "lead.allow_provider_outreach",
  "lead.provider_outreach_consented_at",
  "lead.provider_slugs.includes(input.venueSlug)",
  "commercial_agreement_covers_quote_routing",
  "commercial_agreement_verified_at",
  "partner.identity_verified_at",
  "verified.length !== 1",
  "'revenue_verified'",
  "amountCents",
  "verifiedReceivedCents",
  "sent: false, booked: false, charged: false",
]) assert(server.includes(check),'Server independent-evidence safeguard missing: '+check);
assert(api.includes("z.literal(true)") && api.includes("createServerFn({ method: 'POST' })"),
  'Privileged evidence API requires explicit attestation');
assert(ui.includes('No eligible organizer records with optional venue-specific sharing consent'),
  'Do not surface an outcome form to nonconsenting organizers');
assert(ui.includes("getCorporateEventOperations") && ui.includes("getCorporateEventOutcomes"),
  'Staff data must remain behind existing protected operations');
assert(ui.includes("not unique customers or an all-time ledger"),
  'Staff reporting must disclose partial, evidence-event totals');
assert(privateRoute.includes("{dashboard ? <CorporateEventOutcomePanel accessKey={accessKey} /> : null}"),
  'New outcomes panel must stay behind a successfully unlocked private dashboard');
assert(!server.includes('sendMail(') && !server.includes('mailer.send')
  && !server.includes('.from(\'payments\')') && !server.includes('stripe.'),
  'Event attestation must not reach outbound mail or payment processors');
assert(premerge.includes('validate-corporate-event-outcomes.mjs'), 'Canonical premerge must exercise evidence ledger contract');
console.log('Private corporate-event outcome evidence ledger: consent, signed terms, receipt-only revenue and RLS contract PASS');
