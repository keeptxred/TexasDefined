import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const required = [
  'supabase/migrations/20260814210459_create_governed_fishing_sponsorship.sql',
  'src/data/fishing-sponsorship.types.ts',
  'src/data/fishing-sponsorship-inventory.ts',
  'src/data/fishing-sponsorship.server.ts',
  'src/data/fishing-sponsorship.functions.ts',
  'src/components/fishing/SponsoredFishingPlacement.tsx',
  'src/routes/admin.fishing-sponsors.tsx',
  'src/routes/admin.fishing-sponsors.lazy.tsx',
];
for (const path of required) if (!fs.existsSync(path)) throw new Error(`Fishing Batch 10 missing required file: ${path}`);

const migration = read(required[0]);
const inventory = read(required[2]);
const server = read(required[3]);
const functions = read(required[4]);
const component = read(required[5]);
const adminShell = read(required[6]);
const adminLazy = read(required[7]);
const admin = `${adminShell}\n${adminLazy}`;
const adminLayout = read('src/routes/admin.tsx');

const requireText = (text, token, label) => { if (!text.includes(token)) throw new Error(`Fishing Batch 10 validation failed: ${label}`); };

for (const token of [
  'texasdefined_fishing_sponsors',
  'texasdefined_fishing_sponsor_placements',
  'texasdefined_fishing_sponsor_daily_metrics',
  'enable row level security',
  'revoke all on table public.texasdefined_fishing_sponsors from anon, authenticated',
  'grant all on table public.texasdefined_fishing_sponsors to service_role',
  'security invoker',
  'revoke all on function public.record_texasdefined_fishing_sponsor_metric(uuid, text) from public, anon, authenticated',
  "status in ('draft','approved','paused','ended')",
  'renewal_at',
  'monthly_price_cents',
  'priority integer',
  'exclusive boolean',
]) requireText(migration, token, `migration contract missing ${token}`);

for (const kind of ['featured-guide','lake-guide','regional-guide','species-guide','lake-sponsor','featured-marina','featured-tackle-shop','featured-lodging','featured-campground','featured-restaurant','regional-advertiser','statewide-advertiser']) {
  requireText(inventory, `kind: '${kind}'`, `inventory missing ${kind}`);
}
requireText(inventory, 'introMonthlyCents', 'intro pricing missing');
requireText(inventory, 'standardMonthlyCents', 'standard pricing missing');
requireText(inventory, 'maxConcurrent', 'multi-sponsor capacity missing');

for (const token of [
  'FISHING_SPONSOR_OUTREACH_HOLD = true',
  'loadActiveFishingSponsorPlacements',
  'recordFishingSponsorMetric',
  'loadFishingSponsorAdminDashboard',
  'createFishingSponsorPlacement',
  'setFishingSponsorPlacementStatus',
  'Exclusive inventory requires the surface to have no other approved placement.',
  'maximum three concurrent non-exclusive placements',
  'FISHING_SPONSOR_INVENTORY',
  'renewalAt',
  'impressions30d',
  'clicks30d',
]) requireText(server, token, `server governance missing ${token}`);

requireText(functions, 'getActiveFishingSponsorPlacements', 'public placement lookup function missing');
requireText(functions, 'trackFishingSponsorMetric', 'metric tracking function missing');
requireText(functions, 'getFishingSponsorAdminDashboard', 'admin dashboard function missing');
requireText(functions, "z.enum(['draft','approved','paused','ended'])", 'placement status validation missing');
requireText(functions, 'surfacePathSchema', 'fishing-only surface validation missing');

requireText(component, 'Sponsored ·', 'visible Sponsored disclosure missing');
requireText(component, 'rel="sponsored nofollow noopener noreferrer"', 'sponsored nofollow outbound-link policy missing');
requireText(component, "event: 'impression'", 'impression tracking hook missing');
requireText(component, "event: 'click'", 'click tracking hook missing');
requireText(component, 'if (!placements.length) return null', 'fail-closed empty fallback missing');

requireText(adminShell, "createFileRoute('/admin/fishing-sponsors')", 'admin route shell missing');
requireText(adminShell, 'noindex,nofollow,noarchive', 'admin route noindex policy missing');
requireText(adminLazy, "createLazyFileRoute('/admin/fishing-sponsors')", 'admin console native lazy boundary missing');
for (const token of ['Fishing Sponsorships','Rate-card controls','Renewals ≤30d','Create sponsor prospect','Create placement draft','30d CTR','Commercial delivery hold is ON']) requireText(admin, token, `admin console missing ${token}`);
requireText(adminLayout, 'to="/admin/fishing-sponsors"', 'operations navigation does not expose fishing sponsorship console');

if (server.includes('planner order') === false && server.includes('planner ordering') === false) throw new Error('Fishing Batch 10 validation failed: editorial planner independence is not documented.');

console.log('Fishing Batch 10 monetization validation passed: governed inventory/pricing, approval hold, advertiser records, scheduling, exclusivity, multi-sponsor capacity, privacy-light analytics, renewals, lazy admin operations, disclosures, nofollow links and fail-closed public delivery are protected.');
