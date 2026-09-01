import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [migration, promotionMigration, server, functions, promotionServer, promotionFunctions, routeHead, routeLazy, adminLayout, partnerRouteHead, partnerRouteLazy, venueGuide, venueDirectory] = await Promise.all([
  read('supabase/migrations/20260814040011_create_texasdefined_admin_access_keys.sql'),
  read('supabase/migrations/20260814042306_link_sports_partner_leads_to_sponsors.sql'),
  read('src/data/sports-partner-leads.server.ts'),
  read('src/data/sports-partner-leads.functions.ts'),
  read('src/data/sports-partner-promotion.server.ts'),
  read('src/data/sports-partner-promotion.functions.ts'),
  read('src/routes/admin.sports-partners.tsx'),
  read('src/routes/admin.sports-partners.lazy.tsx'),
  read('src/routes/admin.tsx'),
  read('src/routes/partner-with-us.tsx'),
  read('src/routes/partner-with-us.lazy.tsx'),
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/routes/sports-venues.tsx'),
]);

// TanStack file routes split route metadata from lazy operator/public UI. Validate
// both halves as one protected route so lazy loading cannot hide missing privacy,
// access-control, promotion, attribution, or workflow behavior.
const route = `${routeHead}\n${routeLazy}`;
const partnerRoute = `${partnerRouteHead}\n${partnerRouteLazy}`;

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  'texasdefined_admin_access_keys',
  'key_hash text not null',
  'enable row level security',
  'revoke all on table public.texasdefined_admin_access_keys from anon, authenticated',
  'grant all on table public.texasdefined_admin_access_keys to service_role',
]) {
  assert(migration.toLowerCase().includes(marker.toLowerCase()), `Admin access-key migration is missing security marker: ${marker}.`);
}
assert(!migration.toLowerCase().includes('insert into public.texasdefined_admin_access_keys'), 'Admin access-key migration must never commit a live access-key hash.');

for (const marker of [
  'texasdefined_sports_sponsors_source_inquiry_unique_idx',
  'source_inquiry_id',
  'where source_inquiry_id is not null',
  'duplicate sponsor records',
]) {
  assert(promotionMigration.toLowerCase().includes(marker.toLowerCase()), `Sports lead promotion migration is missing duplicate-protection marker: ${marker}.`);
}

for (const marker of [
  "import { supabaseAdmin } from '@/integrations/supabase/client.server'",
  "const ADMIN_KEY_NAME = 'sports-partner-leads'",
  "crypto.subtle.digest('SHA-256'",
  'constantTimeEqual',
  "from('texasdefined_admin_access_keys')",
  ".eq('is_active', true)",
  "from('texasdefined_partner_inquiries')",
  ".eq('partnership_type', 'sports-travel')",
  'loadSportsPartnerLeadDashboard',
  'updateSportsPartnerLeadStatus',
]) {
  assert(server.includes(marker), `Server-only sports lead module is missing security or workflow marker: ${marker}.`);
}

for (const marker of [
  'createServerFn',
  'accessKeySchema',
  "z.string().uuid()",
  "z.enum(['new', 'reviewing', 'contacted', 'closed'])",
  "await import('@/data/sports-partner-leads.server')",
]) {
  assert(functions.includes(marker), `Sports lead server-function boundary is missing marker: ${marker}.`);
}
assert(!functions.includes('client.server'), 'Client-shipped sports lead function module must not import the service-role Supabase client.');

for (const marker of [
  'assertSportsPartnerAccess',
  "from('texasdefined_partner_inquiries')",
  ".eq('partnership_type', 'sports-travel')",
  'if (!lead.website)',
  "website.protocol !== 'https:'",
  "from('texasdefined_sports_sponsors')",
  "status: 'prospect'",
  'source_inquiry_id: String(lead.id)',
  "update({ status: 'reviewing' })",
  'texasdefined_sports_sponsors_source_inquiry_unique_idx',
  'already been promoted to a sponsor prospect',
]) {
  assert(promotionServer.includes(marker), `Sports lead promotion server operation is missing qualification or duplicate-protection marker: ${marker}.`);
}
assert(promotionServer.includes("import { supabaseAdmin } from '@/integrations/supabase/client.server'"), 'Sports lead promotion must remain server-only through the service-role client.');

for (const marker of [
  'createServerFn',
  'promoteSportsPartnerLeadToSponsor',
  'z.string().uuid()',
  "await import('@/data/sports-partner-promotion.server')",
]) {
  assert(promotionFunctions.includes(marker), `Sports lead promotion server-function boundary is missing marker: ${marker}.`);
}
assert(!promotionFunctions.includes('client.server'), 'Client-shipped sports lead promotion function must not import the service-role Supabase client.');

for (const marker of [
  "createFileRoute('/admin/sports-partners')",
  "createLazyFileRoute('/admin/sports-partners')",
  'noindex,nofollow,noarchive',
  'type="password"',
  'sessionStorage.setItem(SESSION_KEY, key)',
  'sessionStorage.removeItem(SESSION_KEY)',
  'getSportsPartnerLeadDashboard',
  'setSportsPartnerLeadStatus',
  'promoteSportsPartnerLeadToSponsor',
  'Promote to sponsor prospect',
  'Website required before sponsor promotion',
  'was promoted to a sponsor prospect',
  'Venue-attributed',
  'Lead sources',
  'Sports-travel opportunities',
  'Lock dashboard',
]) {
  assert(route.includes(marker), `Sports partner admin route is missing privacy, promotion, or operator marker: ${marker}.`);
}
assert(!route.includes('supabaseAdmin'), 'Sports partner admin route must never import or reference the service-role Supabase client.');
assert(!route.includes("from('texasdefined_partner_inquiries')"), 'Sports partner admin route must never query lead PII directly.');
assert(!route.includes('loader:'), 'Sports partner admin route must not SSR-load lead PII before access-key validation.');

assert(adminLayout.includes('Sports partner leads'), 'Admin operations navigation must expose the gated sports partner lead view.');
assert(adminLayout.includes('to="/admin/sports-partners"'), 'Admin operations navigation must link to /admin/sports-partners.');

for (const marker of ['sports-travel', 'sanitizePartnerSource', 'sourcePath: search.sourcePath']) {
  assert(partnerRoute.includes(marker), `Partner inquiry route is missing lead-attribution marker: ${marker}.`);
}
assert(venueGuide.includes('type=sports-travel&source=${encodeURIComponent(canonicalPath)}'), 'Individual venue guides must attribute sports partner leads to their canonical source path.');
assert(venueDirectory.includes('type=sports-travel&source=%2Fsports-venues'), 'Statewide sports directory must attribute sports partner leads to /sports-venues.');

if (errors.length) {
  console.error('Sports partner operations validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Sports partner operations validated: RLS-protected hashed admin key, server-only PII access, gated operator dashboard, venue-source attribution, status workflow and duplicate-safe lead-to-sponsor promotion are protected.');
