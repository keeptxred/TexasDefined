import fs from 'node:fs';

const migration = fs.readFileSync('supabase/migrations/20260814023200_create_partner_inquiries.sql', 'utf8');
const serverWriter = fs.readFileSync('src/data/partner-inquiry.server.ts', 'utf8');
const serverFn = fs.readFileSync('src/data/partner-inquiry.functions.ts', 'utf8');
const route = fs.readFileSync('src/routes/partner-with-us.tsx', 'utf8');
const lazyRoute = fs.readFileSync('src/routes/partner-with-us.lazy.tsx', 'utf8');
const footer = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');
const publicRoutes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const errors = [];

for (const token of [
  'CREATE TABLE IF NOT EXISTS public.texasdefined_partner_inquiries',
  'ENABLE ROW LEVEL SECURITY',
  'REVOKE ALL ON TABLE public.texasdefined_partner_inquiries FROM anon, authenticated',
  'GRANT ALL ON TABLE public.texasdefined_partner_inquiries TO service_role',
  "partnership_type IN ('insurance', 'mortgage', 'real-estate', 'moving', 'travel', 'sponsorship', 'other')",
]) {
  if (!migration.includes(token)) errors.push(`Partner inquiry migration missing ${token}`);
}
if (/CREATE POLICY/i.test(migration)) errors.push('Partner inquiry table must not expose a direct public RLS policy.');

for (const token of [
  "import { supabaseAdmin } from '@/integrations/supabase/client.server'",
  "from('texasdefined_partner_inquiries').insert(value)",
  'PartnerInquiryAdminClient',
]) {
  if (!serverWriter.includes(token)) errors.push(`Partner inquiry server writer missing ${token}`);
}

for (const token of [
  "createServerFn({ method: 'POST' })",
  '.inputValidator(partnerInquirySchema)',
  "z.string().trim().email().max(320)",
  "if (data.addressLine2.trim()) return { ok: true }",
  'await savePartnerInquiry',
]) {
  if (!serverFn.includes(token)) errors.push(`Partner inquiry server function missing ${token}`);
}
if (serverFn.includes('client.server')) errors.push('Partner inquiry function wrapper must not import the privileged Supabase client directly.');

for (const token of [
  "createFileRoute('/partner-with-us')",
  "title: 'Partner With Texas Defined'",
  "validateSearch:",
  "sourcePath: sanitizePartnerSource(search.source)",
]) {
  if (!route.includes(token)) errors.push(`Partner With Us route shell missing ${token}`);
}

for (const token of [
  "createLazyFileRoute('/partner-with-us')",
  'Paid relationships do not buy editorial coverage, favorable rankings or changes to factual conclusions.',
  'Submissions are stored privately for Texas Defined to review.',
  'name="addressLine2"',
  "await submitPartnerInquiry({ data:",
  'Submit partnership inquiry',
]) {
  if (!lazyRoute.includes(token)) errors.push(`Partner With Us lazy form missing ${token}`);
}

for (const [name, source] of [['route shell', route], ['lazy form', lazyRoute]]) {
  if (source.includes('client.server') || source.includes('supabaseAdmin')) {
    errors.push(`Public partner ${name} must not import privileged database code.`);
  }
}
if (!footer.includes('<Link to="/partner-with-us"')) errors.push('Partner With Us must be discoverable from the footer.');
if (!publicRoutes.includes('"/partner-with-us"')) errors.push('Partner With Us must be governed as a public indexable route.');

if (errors.length) {
  console.error(`Partner inquiry validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Partner inquiry validation passed: lazy public form, TanStack input validation, route/search boundary, editorial-independence copy, private RLS storage and service-role-only database access are protected.');
