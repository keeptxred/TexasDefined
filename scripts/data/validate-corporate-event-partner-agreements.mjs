import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const load = (path) => readFileSync(path, 'utf8');
const sql = load('supabase/migrations/20261024014500_group_event_partner_agreement_gate.sql');
const admin = load('src/data/corporate-events.admin.server.ts');
const fns = load('src/data/corporate-events.admin.functions.ts');
const panel = load('src/components/events/CorporateEventOpsPanel.tsx');
const publicOffers = load('src/data/corporate-events-offers.server.ts');
const quotePrep = load('src/data/corporate-event-quote.server.ts');

for (const text of [
  'commercial_agreement_verified_at',
  'commercial_agreement_covers_offers',
  'commercial_agreement_covers_quote_routing',
  'commercial_agreement_expires_on',
  'td_group_partner_agreement_evidence_required',
  'create trigger td_group_offer_agreement_guard',
  'commercial_agreement_expires_on < new.ends_on',
  'security invoker',
  'revoke all on function public.texasdefined_group_event_offer_agreement_guard()',
]) assert(sql.includes(text), 'Missing private signed-partner agreement DB guard: ' + text);

assert(!sql.includes('grant select on table') && !sql.includes('grant insert on table'),
  'No public access should be added to partner records or offers');
for (const marker of [
  'await assertSportsPartnerAccess(accessKey)',
  'recordCorporateEventCommercialAgreement',
  'commercial_agreement_covers_offers !== true',
  'commercial_agreement_verified_at',
  'corporateEventTexasToday()',
  'published: false, sent: false',
]) assert(admin.includes(marker), 'Server approval gate missing: ' + marker);
for (const marker of [
  'verifiedSignedAgreement: z.literal(true)',
  'verificationReference: z.string().trim().min(20).max(500)',
  'coversOffers: z.boolean()',
  'coversQuoteRouting: z.boolean()',
]) assert(fns.includes(marker), 'Staff input contract missing: ' + marker);
assert(panel.includes('Record independently verified signed agreement') &&
  panel.includes('No signed partner agreement verified'),
  'Protected operator must show the explicit commercial authorization state');
assert(panel.includes('No offer approved, lead forwarded or email sent'),
  'Verification must not imply a commercial transaction or outreach');
assert(publicOffers.includes('business.commercial_agreement_covers_offers !== true'),
  'Public feed must fail closed if signed partner authorization is absent');
for (const critical of [
  'corporateEventEvidenceTimestampIsValid(offer.reviewed_at)',
  'corporateEventEvidenceTimestampIsValid(business.identity_verified_at)',
  'corporateEventEvidenceTimestampIsValid(business.commercial_agreement_verified_at)',
  'corporateEventVerifiedRedemptionUrl(offer.redemption_url, business.website, provider.officialUrl)',
]) assert(publicOffers.includes(critical), 'Public corporate offers missing authoritative business/evidence gate: ' + critical);
const proof = spawnSync(process.execPath,
  ['--experimental-strip-types', '--test', 'scripts/data/corporate-event-offer-provenance.test.mjs'],
  { cwd: process.cwd(), stdio: 'inherit', shell: false });
assert.equal(proof.status, 0,
  'Security proof tests must pass: exact official venue hosts, valid timestamps, no external redirects or sibling host impersonation');
assert(publicOffers.includes('business.commercial_agreement_expires_on < offer.ends_on'),
  'Public feed must suppress offers that outlive the agreement');
assert(quotePrep.includes('identity_verified_at') &&
  quotePrep.includes('Boolean(application.identity_verified_at)') &&
  quotePrep.includes('Date.parse(String(application.identity_verified_at)) <= Date.now()'),
  'An approved application without independently time-verified identity must never expose planner details');
assert(quotePrep.includes('Date.parse(String(application.commercial_agreement_verified_at)) <= Date.now()'),
  'Future-dated agreement attestation cannot be treated as verified');
assert(quotePrep.includes('application.commercial_agreement_covers_quote_routing === true'),
  'Private quote drafts require actual partner scope as well as planner consent');
assert(quotePrep.includes('lead.provider_outreach_consented_at') &&
  quotePrep.includes('lead.provider_slugs.includes(providerSlug)') &&
  quotePrep.includes('sent: false as const'),
  'Planner opt-in and no-send mode must remain intact');
console.log('Corporate event independent identity, signed commercial agreement and quote consent gates PASS');
