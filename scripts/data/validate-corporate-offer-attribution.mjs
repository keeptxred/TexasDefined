import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (file) => readFileSync(file,'utf8');
const sql = read('supabase/migrations/20261023205500_group_event_offer_click_aggregates.sql');
const approved = read('src/data/corporate-events-offers.server.ts');
const outbound = read('src/data/corporate-event-offer-clicks.server.ts');
const api = read('src/data/corporate-event-offer-clicks.functions.ts');
const component = read('src/components/events/ApprovedCorporateEventOffers.tsx');
const adminServer = read('src/data/corporate-events.admin.server.ts');
const adminView = read('src/components/events/CorporateEventOpsPanel.tsx');
const privacy = read('src/routes/privacy.lazy.tsx');

assert(sql.includes('primary key (offer_id, clicked_on)'), 'Use only daily offer aggregate keys');
assert(sql.includes('clicked_on date not null') && sql.includes('clicks integer not null'), 'No visitor identity fields');
for (const identifier of ['ip_address', 'user_agent', 'visitor_id', 'session_id', 'cookie', 'email', 'referrer']) {
  // Intentionally avoid checking explanatory SQL comments.
  const columns = sql.slice(sql.indexOf('create table'), sql.indexOf(');', sql.indexOf('create table')));
  assert(!columns.includes(identifier), 'Attribution ledger contains identity field: ' + identifier);
}
assert(sql.includes('alter table public.texasdefined_group_event_offer_click_totals enable row level security'));
assert(sql.includes('revoke all on table public.texasdefined_group_event_offer_click_totals from anon, authenticated'));
assert(sql.includes('security invoker'), 'Counter RPC cannot bypass RLS under visitor roles');
assert(sql.includes('set search_path ='), 'Constrain search path');
assert(sql.includes('revoke execute on function public.td_record_corporate_event_offer_click(uuid) from public, anon, authenticated'), 'Unprivileged roles cannot call DB RPC');
assert(sql.includes('grant execute on function public.td_record_corporate_event_offer_click(uuid) to service_role'));
assert(sql.includes("o.status = 'approved'") && sql.includes("p.status = 'approved'") && sql.includes('o.reviewed_at is not null'), 'DB defense requires vetted offers');
assert(sql.includes("now() at time zone 'America/Chicago'"), 'Use business-local day');
assert(sql.includes('on conflict (offer_id, clicked_on)'), 'Concurrent clicks must not create duplicate daily rows');
assert(sql.includes('least(public.texasdefined_group_event_offer_click_totals.clicks + 1, 1000000)'), 'Unbounded counters are disallowed');
assert(approved.includes('id: offer.id') && approved.includes(".eq('status', 'approved')"), 'Only approved offer IDs can be public');
assert(outbound.includes('loadPublicCorporateEventOffers()') && outbound.includes('offer.id === offerId'), 'Re-check currently visible verified offers at click time');
assert(outbound.includes("client.rpc('td_record_corporate_event_offer_click', { p_offer_id: offerId })"));
assert(!outbound.includes('headers(') && !outbound.includes('request.headers'), 'Do not inspect visitor IP or user agent');
assert(api.includes("createServerFn({ method: 'POST' })"));
assert(api.includes('offerId: z.string().uuid()'));
assert(component.includes('offerId: offer.id'), 'Sponsored link must count only its approved offer');
assert(component.includes('.catch(() => undefined)'), 'Attribution failures must not block partner navigation');
assert(component.includes('rel="sponsored nofollow noopener noreferrer"'), 'Comply with advertising link disclosures');
assert(adminServer.includes("client.from('texasdefined_group_event_offer_click_totals')"), 'Stats must remain in protected operations endpoint');
assert(adminServer.includes('await assertSportsPartnerAccess(accessKey)'), 'Staff-only click summary');
assert(adminView.includes('Offer outbound clicks (30d)'));
assert(adminView.includes('Not attributable conversions.'), 'Never equate outbound links with conversions');
assert(privacy.includes('event-offer click-count ledger') && privacy.includes('does not retain visitors'), 'Publish accurate click-count privacy disclosure');
console.log('Corporate offer attribution: nonidentifying aggregates, vetted offers, RLS/role lockdown, review metrics, no fake conversions PASSED.');
