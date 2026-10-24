import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const load = path => readFileSync(path, 'utf8');
const schema = load('supabase/migrations/20261024151000_group_event_partner_outreach_evidence.sql');
const server = load('src/data/corporate-event-partner-outreach.server.ts');
const api = load('src/data/corporate-event-partner-outreach.functions.ts');
const panel = load('src/components/events/CorporateEventPartnerOutreachPanel.tsx');
const admin = load('src/routes/admin.sports-partners.lazy.tsx');
const canonical = load('scripts/ci/run-premerge-validation.mjs');

for (const check of [
  'create table if not exists public.texasdefined_group_event_partner_outreach',
  'provider_slug text not null',
  'contact_kind text not null',
  'occurred_at timestamptz not null',
  'evidence_key text not null',
  'evidence_reference text not null',
  'followup_on date null',
  'td_group_partner_outreach_no_future_events',
  'td_group_partner_outreach_followup_after_event',
  'td_group_partner_outreach_external_event_once',
  'enable row level security',
  'revoke all on table public.texasdefined_group_event_partner_outreach from public, anon, authenticated',
  'grant select, insert on table public.texasdefined_group_event_partner_outreach to service_role',
  'revoke update, delete, truncate on table public.texasdefined_group_event_partner_outreach from service_role',
]) assert(schema.includes(check), 'Missing private, append-only external business contact protection: ' + check);
assert(!/\bgrant\s+(select|insert|update|delete)\b[^;]+\b(to\s+anon|to\s+authenticated)\b/i.test(schema),
  'Never disclose recorded venue correspondence to unauthenticated or general users');
assert((server.match(/await assertSportsPartnerAccess\(accessKey\)/g) || []).length === 2,
  'Both private read and write require real staff authorization');
for (const guard of [
  'independentlyVerifiedActualContact !== true',
  'Do not record copied drafts or planned communications',
  'corporateEventProviders.some(provider => provider.slug === input.venueSlug)',
  "const evidenceKey = input.evidenceKey.trim().toUpperCase()",
  'evidenceReference.length < 20',
  'when.toISOString() !== input.occurredAt',
  'corporateEventTexasToday(when)',
  ".from('texasdefined_group_event_partner_outreach').insert(",
  ".order('recorded_at',{ascending:false}).limit(EVENT_LIMIT + 1)",
  'truncated: rows.length > EVENT_LIMIT',
  'sent: false as const',
  'partnerApproved: false as const',
  'booked: false as const',
]) assert(server.includes(guard), 'Evidence-only business recording contract missing: ' + guard);
for (const guard of [
  "createServerFn({ method: 'POST' })",
  'independentlyVerifiedActualContact: z.literal(true)',
  "venueSlug: z.string().trim().regex",
  'evidenceKey: z.string().trim().min(6).max(120)',
  'evidenceReference: z.string().trim().min(20).max(500)',
]) assert(api.includes(guard), 'Authenticated and bounded API input missing: ' + guard);
assert(admin.includes("{dashboard ? <CorporateEventPartnerOutreachPanel accessKey={accessKey} /> : null}"),
  'Only the already-unlocked staff dashboard may render actual external business evidence');
for (const check of [
  'I independently checked an actual completed venue communication',
  'Copying an unsent invitation is not contact',
  'type="datetime-local"',
  'Official business site',
  'venueSlug:provider.slug',
  'independentlyVerifiedActualContact:true',
  'Record actual external contact',
  'due follow-ups in visible records',
  'snapshot?.truncated',
  'matching.slice(currentPage*PAGE_SIZE,(currentPage+1)*PAGE_SIZE)',
  'setPage(currentPage-1)',
  'setPage(currentPage+1)',
  'No invitation was sent, no partner approved and no booking made.',
]) assert(panel.includes(check), 'Operator must distinguish real contact from drafts and protect recent pagination: ' + check);
assert(!/\bsendMail\s*\(|\bmailer\.|\bfetch\s*\(|\bstripe\.|\bwindow\.open\(/.test(server + api + panel),
  'Venue contact evidence must not send messages, charge a payment or call external APIs');
assert(canonical.includes('validate-corporate-event-partner-outreach.mjs'),
  'Every future production merge must test private real-world outreach proof');
console.log('Corporate event partner outreach: staff-only append-only real evidence, dedup, bounded follow-up and zero automatic business contact PASS.');
