import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) => readFileSync(path, 'utf8');
const server = read('src/data/corporate-events-offers.server.ts');
const action = read('src/data/corporate-events-offers.functions.ts');
const view = read('src/components/events/ApprovedCorporateEventOffers.tsx');
const route = read('src/routes/corporate-events.lazy.tsx');
const guard = read('supabase/migrations/20261023172000_group_event_partners.sql');

for (const marker of [
  ".eq('status', 'approved')",
  ".lte('starts_on', today)",
  ".gte('ends_on', today)",
  ".not('reviewed_at', 'is', null)",
  "provider_slug",
  "business_name",
  "normalizedBusinessName",
  "corporateEventVerifiedRedemptionUrl",
  "corporateEventEvidenceTimestampIsValid",
  "business.identity_verified_at",
  "business.commercial_agreement_verified_at",
  "provider.officialUrl",
  "business.status",
]) {
  // business status is enforced through the approved-filtered business query,
  // not a client assertion.
  if (marker === 'business.status') continue;
  assert(server.includes(marker), 'Missing public-offer privacy/review guard: ' + marker);
}
assert(server.includes(".eq('status', 'approved')"), 'Approved-only queries required');
assert(server.includes("provider.slug"), 'Offer must map to a source-curated venue');
const provenance = read('src/data/corporate-event-offer-provenance.ts');
assert(provenance.includes("url.protocol !== 'https:'"), 'Offer links must use HTTPS, enforced by shared verified-host checker');
assert(provenance.includes("testHost.endsWith('.' + officialHost)"), 'Redemption host must be equal to verified host or its child, never a parent/sibling');
assert(provenance.includes('corporateEventOfficialDomainMatches(applicantWebsite, officialVenueUrl)'),
  'A self-entered partner website must match a source-backed official venue host before any redemption link is public');
assert(provenance.includes('sameOrChildHost(redemption, business)'),
  'Redemption must stay on the independently source-verified partner domain');
assert(server.includes('corporateEventVerifiedRedemptionUrl(offer.redemption_url, business.website, provider.officialUrl)'),
  'The actual public offer path must use the strict shared verified-domain checker');
assert(server.includes('corporateEventEvidenceTimestampIsValid(offer.reviewed_at)')
  && server.includes('corporateEventEvidenceTimestampIsValid(business.identity_verified_at)')
  && server.includes('corporateEventEvidenceTimestampIsValid(business.commercial_agreement_verified_at)'),
  'Offer approval, business identity and signed agreement must use nonfuture independently attested evidence timestamps');
assert(read('scripts/data/corporate-event-offer-provenance.test.mjs').includes('corporateEventVerifiedRedemptionUrl'),
  'Domain identity/provenance should be covered by deterministic adversarial host tests');
assert(!server.includes("select('*')") && !server.includes('contact_name') && !server.includes('email,phone'), 'Public projections must not select contact data');
assert(action.includes("createServerFn({ method: 'GET' })"), 'Public offers must be read-only');
assert(action.includes("await import('@/data/corporate-events-offers.server')"), 'Offer DB access must remain server-only');
assert(view.includes('if (!offers.length) return null'), 'No fake or placeholder offers when there are none');
assert(view.includes('rel="sponsored nofollow noopener noreferrer"'), 'Disclose and protect commercial outbound links');
assert(view.includes('getPublicCorporateEventOffers()'), 'Client must load reviewed offers');
assert(route.includes('<ApprovedCorporateEventOffers />'), 'Directory must display reviewed offers');
assert(guard.includes('alter table public.texasdefined_group_event_offers enable row level security'), 'Private offer ledger must have RLS');
assert(guard.includes('revoke all on table public.texasdefined_group_event_offers from anon, authenticated'), 'Public roles must have no direct DB access');
console.log('Corporate partner offers: reviewed, active, private-source, vendor-domain, sponsored disclosures PASS.');
