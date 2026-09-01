import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [schemaMigration, deliveryMigration, server, functions, component, directory, guide, galaxy, adminHead, adminLazy, adminNav, partnerPageHead, partnerPageLazy, salesPlaybook] = await Promise.all([
  read('supabase/migrations/20260814041151_create_governed_sports_sponsorship.sql'),
  read('supabase/migrations/20260814041302_govern_sports_sponsor_delivery.sql'),
  read('src/data/sports-sponsorship.server.ts'),
  read('src/data/sports-sponsorship.functions.ts'),
  read('src/components/sports/SponsoredSportsPlacement.tsx'),
  read('src/routes/sports-venues.tsx'),
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/routes/sports-venue.jones-att-stadium.tsx'),
  read('src/routes/admin.sports-sponsors.tsx'),
  read('src/routes/admin.sports-sponsors.lazy.tsx'),
  read('src/routes/admin.tsx'),
  read('src/routes/partner-with-us.tsx'),
  read('src/routes/partner-with-us.lazy.tsx'),
  read('docs/SPORTS_SPONSORSHIP_SALES_PLAYBOOK.md'),
]);

// The sponsorship console and public partner page deliberately split route
// metadata from lazy UI. Treat each pair as one contract while retaining all
// security, approval, privacy, reporting and commercial-integrity assertions.
const admin = `${adminHead}\n${adminLazy}`;
const partnerPage = `${partnerPageHead}\n${partnerPageLazy}`;

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  'texasdefined_sports_sponsors',
  'texasdefined_sports_sponsor_placements',
  'texasdefined_sports_sponsor_daily_metrics',
  "status in ('prospect','approved','inactive')",
  "status in ('draft','approved','paused','ended')",
  "status <> 'approved' or approved_at is not null",
  "surface_path = '/sports-venues' or surface_path ~ '^/sports-venue/[a-z0-9-]+$'",
  'enable row level security',
  'revoke all on table public.texasdefined_sports_sponsors from anon, authenticated',
  'revoke all on table public.texasdefined_sports_sponsor_placements from anon, authenticated',
  'revoke all on table public.texasdefined_sports_sponsor_daily_metrics from anon, authenticated',
  'privacy-light aggregate sponsorship metrics only',
]) assert(schemaMigration.toLowerCase().includes(marker.toLowerCase()), `Sports sponsorship schema is missing governance marker: ${marker}.`);

for (const forbidden of ['ip_address', 'user_agent', 'device_id', 'visitor_id', 'email text not null']) {
  assert(!schemaMigration.toLowerCase().includes(forbidden), `Sports sponsorship metrics/schema must not collect visitor identity field: ${forbidden}.`);
}

for (const marker of [
  'texasdefined_sports_sponsor_one_approved_surface_idx',
  "where status = 'approved'",
  'record_texasdefined_sports_sponsor_metric',
  'security definer',
  "p_event not in ('impression', 'click')",
  "p.status = 'approved'",
  'p.approved_at is not null',
  "s.status = 'approved'",
  'p.starts_at is null or p.starts_at <= now()',
  'p.ends_at is null or p.ends_at > now()',
  'revoke all on function public.record_texasdefined_sports_sponsor_metric(uuid, text) from public, anon, authenticated',
  'grant execute on function public.record_texasdefined_sports_sponsor_metric(uuid, text) to service_role',
  'stores no visitor identifiers',
]) assert(deliveryMigration.toLowerCase().includes(marker.toLowerCase()), `Sports sponsor delivery migration is missing marker: ${marker}.`);

for (const marker of [
  "import { supabaseAdmin } from '@/integrations/supabase/client.server'",
  'assertSportsPartnerAccess',
  'loadActiveSportsSponsorPlacement',
  ".eq('surface_path', surfacePath)",
  ".eq('status', 'approved')",
  ".not('approved_at', 'is', null)",
  ".eq('texasdefined_sports_sponsors.status', 'approved')",
  'recordSportsSponsorMetric',
  'loadSportsSponsorAdminDashboard',
  'createSportsSponsor',
  "status: 'prospect'",
  'createSportsSponsorPlacement',
  "status: 'draft'",
  'reviseSportsSponsorPlacement',
  'approved_at: null',
  "if (status === 'approved' && sponsorStatus !== 'approved')",
  'Another placement is already approved for that sports surface',
]) assert(server.includes(marker), `Sports sponsorship server module is missing approval, delivery, or admin marker: ${marker}.`);

for (const marker of [
  'export const SPORTS_SPONSOR_OUTREACH_HOLD = true',
  'SPORTS_SPONSOR_OUTREACH_HOLD_REASON',
  'assertSponsorLaunchReady()',
  'if (SPORTS_SPONSOR_OUTREACH_HOLD) return null',
  "if (status === 'approved') assertSponsorLaunchReady();",
  'sufficient real sports-page traffic',
]) assert(server.includes(marker), `Sports sponsorship server module is missing traffic-gated outreach hold marker: ${marker}.`);

const approvalHoldCount = (server.match(/if \(status === 'approved'\) assertSponsorLaunchReady\(\);/g) ?? []).length;
assert(approvalHoldCount === 2, `Traffic gate must block both sponsor approval and placement approval; found ${approvalHoldCount} approval holds.`);

for (const marker of [
  'getActiveSportsSponsorPlacement',
  'trackSportsSponsorMetric',
  'getSportsSponsorAdminDashboard',
  'createSportsSponsorProspect',
  'createSportsSponsorPlacementDraft',
  'reviseSportsSponsorPlacementDraft',
  'updateSportsSponsorPlacementStatus',
  "await import('@/data/sports-sponsorship.server')",
  'Sports sponsor lookup failed closed; rendering editorial page without sponsorship.',
  'return null;',
]) assert(functions.includes(marker), `Sports sponsorship server-function boundary is missing marker: ${marker}.`);
assert(!functions.includes('client.server'), 'Client-shipped sports sponsorship function module must not import the service-role Supabase client.');

for (const marker of [
  'Sponsored',
  'Paid placement by',
  'rel="sponsored nofollow noopener noreferrer"',
  'trackSportsSponsorMetric',
  "event: 'impression'",
  "event: 'click'",
]) assert(component.includes(marker), `Sponsored sports component is missing disclosure or aggregate metric marker: ${marker}.`);

for (const [name, source, surfaceMarker] of [
  ['sports directory', directory, "surfacePath: '/sports-venues'"],
  ['generic sports venue guide', guide, 'surfacePath: canonicalPath'],
  ['Galaxy Stadium guide', galaxy, 'surfacePath: canonicalPath'],
]) {
  assert(source.includes('SponsoredSportsPlacement'), `${name} does not render the governed sponsored component.`);
  assert(source.includes('getActiveSportsSponsorPlacement'), `${name} does not load sponsorship through the approved server function.`);
  assert(source.includes(surfaceMarker), `${name} does not request sponsorship for its exact surface.`);
  assert(source.includes('sponsorPlacement ?'), `${name} must render nothing when there is no approved placement.`);
}
const jsonLdStart = guide.indexOf('const jsonLd = {');
const jsonLdEnd = guide.indexOf('  return <>', jsonLdStart);
const jsonLdSection = jsonLdStart >= 0 && jsonLdEnd > jsonLdStart ? guide.slice(jsonLdStart, jsonLdEnd) : '';
assert(jsonLdSection.length > 0, 'Sports venue JSON-LD block could not be isolated for sponsorship separation validation.');
assert(!jsonLdSection.includes('sponsorPlacement'), 'Sponsor content must not be injected into editorial structured data.');

for (const marker of [
  "createFileRoute('/admin/sports-sponsors')",
  "createLazyFileRoute('/admin/sports-sponsors')",
  'noindex,nofollow,noarchive',
  'type="password"',
  'sessionStorage.setItem(SESSION_KEY, key)',
  'Lock sponsorship console',
  'Create a prospect',
  'Create a draft placement',
  'Approved sponsors',
  'Approved placements',
  '30d impressions',
  '30d clicks',
  'Only one placement can be approved per sports surface at a time',
  'Any saved revision returns this placement to draft and requires explicit reapproval',
]) assert(admin.includes(marker), `Sports sponsorship admin console is missing security, approval, or reporting marker: ${marker}.`);
assert(!admin.includes('supabaseAdmin'), 'Sports sponsorship admin route must never reference the service-role Supabase client directly.');
assert(!admin.includes("from('texasdefined_sports"), 'Sports sponsorship admin route must never query sponsorship tables directly.');
assert(!admin.includes('loader:'), 'Sports sponsorship admin route must not SSR-load commercial records before key validation.');
assert(adminNav.includes('to="/admin/sports-sponsors"'), 'TexasDefined Operations navigation must link to the gated sports sponsorship console.');

for (const marker of [
  'Founding sports rates',
  '$49/month',
  '$149/month',
  '$299/month',
  '$499/month',
  "not guaranteed-impression or guaranteed-booking packages",
  'does not sell editorial rankings, favorable reviews or factual conclusions',
  'One approved sponsored placement may run on a sports surface at a time',
]) assert(partnerPage.includes(marker), `Partner page is missing a founding-rate or commercial-integrity marker: ${marker}.`);

for (const marker of [
  'TexasDefined Sports Sponsorship Sales Playbook',
  'Single Venue',
  '$49/month',
  'Metro Sports Pack',
  '$149/month',
  'Texas Sports Network',
  '$299/month',
  'Founding Statewide Partner',
  '$499/month',
  'Initial prospect markets',
  'Outreach email: first contact',
  'Outreach email: follow-up 1',
  'Outreach email: follow-up 2',
  'No guaranteed impression, click, booking, revenue, ranking, or editorial outcome',
  'A sponsor may buy a disclosed placement. A sponsor may not buy:',
]) assert(salesPlaybook.includes(marker), `Sports sales playbook is missing launch-sales governance marker: ${marker}.`);

if (errors.length) {
  console.error('Sports sponsorship validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Sports sponsorship validated: traffic-gated outreach hold, explicit two-stage approval, one approved placement per surface, fail-closed public delivery, sponsored disclosure, privacy-light aggregate metrics, key-gated operator controls and founding launch-sales terms are protected.');
