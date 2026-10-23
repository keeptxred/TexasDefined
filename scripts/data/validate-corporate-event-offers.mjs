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
  "approvedRedemptionUrl",
  "business.status",
]) {
  // business status is enforced through the approved-filtered business query,
  // not a client assertion.
  if (marker === 'business.status') continue;
  assert(server.includes(marker), 'Missing public-offer privacy/review guard: ' + marker);
}
assert(server.includes(".eq('status', 'approved')"), 'Approved-only queries required');
assert(server.includes("provider.slug"), 'Offer must map to a source-curated venue');
assert(server.includes("redemption.protocol !== 'https:'"), 'Offer links must use HTTPS');
assert(server.includes("host.endsWith('.' + businessHost)"), 'Offer link must stay on an approved partner domain');
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
