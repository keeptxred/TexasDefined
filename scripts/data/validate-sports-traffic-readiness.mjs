import fs from 'node:fs/promises';

const read = (file) => fs.readFile(file, 'utf8');
const [migration, server, functions, tracker, quickAnswers, admin, adminNav, sponsorship] = await Promise.all([
  read('supabase/migrations/20260814143000_add_sports_venue_traffic_readiness_metrics.sql'),
  read('src/data/sports-traffic.server.ts'),
  read('src/data/sports-traffic.functions.ts'),
  read('src/components/sports/SportsTrafficTracker.tsx'),
  read('src/components/sports/SportsVenueQuickAnswers.tsx'),
  read('src/routes/admin.sports-traffic.tsx'),
  read('src/routes/admin.tsx'),
  read('src/data/sports-sponsorship.server.ts'),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  'texasdefined_sports_venue_daily_traffic',
  "surface_path ~ '^/sports-venue/[a-z0-9-]+$'",
  'enable row level security',
  'revoke all on table public.texasdefined_sports_venue_daily_traffic from anon, authenticated',
  'security invoker',
  "set search_path = ''",
  'record_texasdefined_sports_venue_pageview',
  'revoke all on function public.record_texasdefined_sports_venue_pageview(text) from public, anon, authenticated',
  'no visitor identifiers',
]) assert(migration.toLowerCase().includes(marker.toLowerCase()), `Sports traffic migration missing privacy/security marker: ${marker}`);
for (const forbidden of ['ip_address', 'user_agent', 'visitor_id', 'device_id', 'email_address', 'cookie_id']) {
  assert(!migration.toLowerCase().includes(forbidden), `Sports traffic schema must not store visitor identity: ${forbidden}`);
}

for (const marker of [
  'SPORTS_TRAFFIC_WINDOW_DAYS = 30',
  'SPORTS_TRAFFIC_MONTHLY_PAGEVIEW_TARGET = 3000',
  'SPORTS_TRAFFIC_VENUE_PAGEVIEW_TARGET = 300',
  'SPORTS_TRAFFIC_MIN_VENUES_AT_TARGET = 3',
  'recordSportsVenuePageview',
  'loadSportsTrafficReadiness',
  'assertSportsPartnerAccess',
  'trafficReady',
  'outreachHoldActive: SPORTS_SPONSOR_OUTREACH_HOLD',
]) assert(server.includes(marker), `Sports traffic server missing readiness marker: ${marker}`);
assert(server.includes(".from('texasdefined_sports_venue_daily_traffic')"), 'Sports traffic readiness must read the aggregate daily table.');

for (const marker of ['createServerFn', 'recordSportsVenuePageviewFn', 'getSportsTrafficReadiness', "await import('./sports-traffic.server')"]) {
  assert(functions.includes(marker), `Sports traffic server-function boundary missing: ${marker}`);
}
assert(!functions.includes('client.server'), 'Sports traffic client-shipped function module must not import service-role Supabase directly.');

for (const marker of ['useEffect', 'sessionStorage.getItem', 'sessionStorage.setItem', 'recordSportsVenuePageviewFn', 'return null']) {
  assert(tracker.includes(marker), `Sports traffic tracker missing session-scoped aggregate behavior: ${marker}`);
}
assert(!tracker.includes('document.cookie') && !tracker.includes('localStorage'), 'Sports traffic tracker must not use persistent cookies/localStorage for identification.');
assert(quickAnswers.includes('SportsTrafficTracker'), 'All venue guides must inherit the traffic tracker through the shared quick-answer component.');

for (const marker of [
  "createFileRoute('/admin/sports-traffic')",
  'noindex,nofollow,noarchive',
  'monthlyPageviewTarget',
  'venuePageviewTarget',
  'minimumVenuesAtTarget',
  'Traffic readiness does not remove it automatically',
  'No venue-guide views have been recorded',
  'does not store visitor IDs, cookies, email addresses, IP addresses or user-agent strings',
]) assert(admin.includes(marker), `Sports traffic admin dashboard missing readiness/privacy marker: ${marker}`);
assert(adminNav.includes('to="/admin/sports-traffic"'), 'Admin navigation must expose the protected sports traffic dashboard.');

assert(sponsorship.includes('SPORTS_SPONSOR_OUTREACH_HOLD = true'), 'Traffic readiness must not replace the explicit sponsor outreach hold.');
assert(sponsorship.includes("if (status === 'approved') assertSponsorLaunchReady();"), 'Traffic readiness must not auto-approve sponsors or placements.');

if (errors.length) {
  console.error('Sports traffic readiness validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Sports traffic readiness validated: 30-day aggregate venue-guide traffic, 3,000 total / 3 venues at 300+ thresholds, session duplicate guard, privacy-light storage, protected admin visibility and manual sponsor launch hold are enforced.');
