import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [migration, server, functions, route, adminLayout, partnerRoute, venueGuide, venueDirectory] = await Promise.all([
  read('supabase/migrations/20260814040011_create_texasdefined_admin_access_keys.sql'),
  read('src/data/sports-partner-leads.server.ts'),
  read('src/data/sports-partner-leads.functions.ts'),
  read('src/routes/admin.sports-partners.tsx'),
  read('src/routes/admin.tsx'),
  read('src/routes/partner-with-us.tsx'),
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/routes/sports-venues.tsx'),
]);

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
  "createFileRoute('/admin/sports-partners')",
  'noindex,nofollow,noarchive',
  'type="password"',
  'sessionStorage.setItem(SESSION_KEY, key)',
  'sessionStorage.removeItem(SESSION_KEY)',
  'getSportsPartnerLeadDashboard',
  'setSportsPartnerLeadStatus',
  'Venue-attributed',
  'Lead sources',
  'Sports-travel opportunities',
  'Lock dashboard',
]) {
  assert(route.includes(marker), `Sports partner admin route is missing privacy or operator marker: ${marker}.`);
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

console.log('Sports partner operations validated: RLS-protected hashed admin key, server-only PII access, gated operator dashboard, status workflow and venue-source attribution are protected.');
