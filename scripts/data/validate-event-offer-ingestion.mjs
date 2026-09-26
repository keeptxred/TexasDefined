import { readFileSync } from 'node:fs';

function read(path) {
  return readFileSync(path, 'utf8');
}

const failures = [];
function assert(condition, message) {
  if (!condition) failures.push(message);
}
function requireText(source, text, label) {
  assert(source.includes(text), `${label} missing ${text}`);
}
function forbidText(source, text, label) {
  assert(!source.includes(text), `${label} must not include ${text}`);
}

const runtime = read('src/lib/texas-defined-event-offers.server.ts');
const serverEntry = read('src/server-entry.ts');
const wrangler = read('wrangler.jsonc');
const migration = read('supabase/migrations/20260925224500_create_texasdefined_event_offers.sql');
const offersRoute = read('src/routes/offers.tsx');

for (const marker of [
  'CJ_PERSONAL_ACCESS_TOKEN',
  'CJ_WEBSITE_ID',
  'TICKETMASTER_API_KEY',
  'TICKETMASTER_IMPACT_BASE_URL',
  'IMPACT_ACCOUNT_SID',
  'IMPACT_AUTH_TOKEN',
  'ticketmaster-impact',
  'cj-link-search',
  'impact-promotions',
  'commission_status',
  'discount_preserves_commission',
  'is_editorial_only',
  "network: 'impact'",
  "network: 'cj'",
  "fetch_strategy: 'api'",
]) requireText(runtime, marker, 'event offer runtime');

requireText(serverEntry, 'texasDefinedEventOffersResponse(request, env as Record<string, unknown>)', 'server entry API hook');
requireText(serverEntry, 'syncTexasDefinedEventOffers(env as Record<string, unknown>, "cloudflare-cron")', 'server entry scheduled hook');
requireText(wrangler, '"triggers"', 'wrangler scheduled trigger');
requireText(wrangler, '"17 */6 * * *"', 'six-hour event offer cron');
requireText(wrangler, '"CJ_PUBLISHER_ID": "8062457"', 'Cloudflare non-secret publisher var');
requireText(wrangler, '"CJ_WEBSITE_ID": "101876465"', 'Cloudflare non-secret website var');
requireText(wrangler, 'TICKETMASTER_IMPACT_BASE_URL', 'Ticketmaster Impact base var');
forbidText(wrangler, 'CJ_PERSONAL_ACCESS_TOKEN', 'wrangler config');
forbidText(wrangler, 'IMPACT_AUTH_TOKEN', 'wrangler config');
forbidText(wrangler, 'TICKETMASTER_API_KEY', 'wrangler config');

for (const marker of [
  'create table if not exists public.texasdefined_offer_sources',
  'create table if not exists public.texasdefined_event_offers',
  "fetch_strategy in ('manual', 'api', 'feed', 'webhook')",
  "network in ('impact', 'cj', 'expedia', 'direct', 'internal')",
  "kind in ('event', 'offer', 'hotel', 'attraction', 'package')",
  "commission_status in ('preserved', 'reduced', 'zero', 'unknown')",
  'alter table public.texasdefined_offer_sources enable row level security',
  'alter table public.texasdefined_event_offers enable row level security',
  'service_role manages texasdefined event offers',
  'texasdefined_event_offers_source_external_idx',
]) requireText(migration, marker, 'event offer migration');

for (const marker of [
  '/api/texasdefined/event-offers',
  'Commission-safe only',
  'Discounts only',
  'Ticketmaster first-24-hour primary onsales',
]) requireText(offersRoute, marker, 'offers route');

if (failures.length) {
  console.error('Event offer ingestion validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Event offer ingestion contract validated.');
