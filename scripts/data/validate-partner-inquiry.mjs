import fs from 'node:fs';

const migration = fs.readFileSync('supabase/migrations/20260814023200_create_partner_inquiries.sql', 'utf8');
const agreementMigration = fs.readFileSync('supabase/migrations/20260915185000_create_advertiser_agreements.sql', 'utf8');
const serverWriter = fs.readFileSync('src/data/partner-inquiry.server.ts', 'utf8');
const serverFn = fs.readFileSync('src/data/partner-inquiry.functions.ts', 'utf8');
const agreementWriter = fs.readFileSync('src/data/advertiser-agreement.server.ts', 'utf8');
const agreementFn = fs.readFileSync('src/data/advertiser-agreement.functions.ts', 'utf8');
const advertisingProgram = fs.readFileSync('src/data/advertising-program.ts', 'utf8');
const route = fs.readFileSync('src/routes/partner-with-us.tsx', 'utf8');
const lazyRoute = fs.readFileSync('src/routes/partner-with-us.lazy.tsx', 'utf8');
const billingRoute = fs.readFileSync('src/routes/advertising-billing.tsx', 'utf8');
const termsRoute = fs.readFileSync('src/routes/advertising-terms.tsx', 'utf8');
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
  'CREATE TABLE IF NOT EXISTS public.texasdefined_advertiser_agreements',
  "status IN ('pending_publisher_acceptance', 'accepted', 'declined', 'void')",
  'agreement_snapshot text NOT NULL',
  "tier IN ('local', 'growth', 'premier', 'custom')",
  "billing_cycle IN ('monthly', 'annual')",
  'authority_confirmed boolean NOT NULL CHECK (authority_confirmed = true)',
  'esign_consent boolean NOT NULL CHECK (esign_consent = true)',
  'REVOKE ALL ON TABLE public.texasdefined_advertiser_agreements FROM anon, authenticated',
  'GRANT ALL ON TABLE public.texasdefined_advertiser_agreements TO service_role',
]) {
  if (!agreementMigration.includes(token)) errors.push(`Advertiser agreement migration missing ${token}`);
}
if (/CREATE POLICY/i.test(agreementMigration)) errors.push('Advertiser agreement table must not expose a direct public RLS policy.');

for (const token of [
  "from('texasdefined_advertiser_agreements').insert(value)",
  'AdvertiserAgreementAdminClient',
]) {
  if (!agreementWriter.includes(token)) errors.push(`Advertiser agreement server writer missing ${token}`);
}

for (const token of [
  "createServerFn({ method: 'POST' })",
  '.inputValidator(advertiserAgreementSchema)',
  "z.enum(['local', 'growth', 'premier', 'custom'])",
  'z.literal(ADVERTISING_AGREEMENT_VERSION)',
  'Typed signature must match the signer name.',
  'advertiserAgreementSnapshot(tierId, billingCycle)',
  'await saveAdvertiserAgreement',
]) {
  if (!agreementFn.includes(token)) errors.push(`Advertiser agreement function missing ${token}`);
}
if (agreementFn.includes('client.server') || agreementFn.includes('supabaseAdmin')) errors.push('Advertiser agreement function wrapper must not import privileged database code directly.');

for (const token of [
  "id: 'local'",
  'monthlyPrice: 249',
  'annualPrice: 2490',
  "id: 'growth'",
  'monthlyPrice: 499',
  'annualPrice: 4990',
  "id: 'premier'",
  'monthlyPrice: 999',
  'annualPrice: 9990',
  "id: 'custom'",
  'ADVERTISING_AGREEMENT_VERSION',
  'agreementClauses',
  'advertiserAgreementSnapshot',
]) {
  if (!advertisingProgram.includes(token)) errors.push(`Advertising program model missing ${token}`);
}

for (const token of [
  "createFileRoute('/partner-with-us')",
  "title: 'Advertise & Partner With Texas Defined'",
  'sourcePath?: string;',
  'validateSearch:',
  "sourcePath: typeof search.source === 'string' ? sanitizePartnerSource(search.source) : undefined",
]) {
  if (!route.includes(token)) errors.push(`Partner With Us route shell missing ${token}`);
}

for (const token of [
  "createLazyFileRoute('/partner-with-us')",
  'A professional sponsorship program, not a link marketplace.',
  'Advertising does not buy editorial coverage, rankings, reviews, recommendations or factual conclusions.',
  'Placement examples',
  'Packages & pricing',
  'Billing & payment',
  'Agreement & electronic acceptance',
  'name="addressLine2"',
  'name="agreementAddressLine2"',
  'await submitPartnerInquiry({ data:',
  'await submitAdvertiserAgreement({ data:',
  'Submit partnership inquiry',
  'Accept & submit agreement',
]) {
  if (!lazyRoute.includes(token)) errors.push(`Partner With Us advertiser platform missing ${token}`);
}

for (const [name, source, tokens] of [
  ['billing route', billingRoute, ["createFileRoute('/advertising-billing')", "robots: 'noindex, follow'", 'advertisingPaymentMethods', 'Standard package billing', '/advertising-terms']],
  ['terms route', termsRoute, ["createFileRoute('/advertising-terms')", "robots: 'noindex, follow'", 'agreementClauses', 'ADVERTISING_AGREEMENT_VERSION', '/advertising-billing']],
]) {
  for (const token of tokens) if (!source.includes(token)) errors.push(`Advertiser ${name} missing ${token}`);
  if (source.includes('client.server') || source.includes('supabaseAdmin')) errors.push(`Advertiser ${name} must not import privileged database code.`);
}

for (const [name, source] of [['route shell', route], ['lazy form', lazyRoute]]) {
  if (source.includes('client.server') || source.includes('supabaseAdmin')) {
    errors.push(`Public partner ${name} must not import privileged database code.`);
  }
}
if (!footer.includes('<Link to="/partner-with-us"')) errors.push('Partner With Us must be discoverable from the footer.');
if (!publicRoutes.includes('"/partner-with-us"')) errors.push('Partner With Us must be governed as a public indexable route.');

if (errors.length) {
  console.error(`Partner advertiser validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Partner advertiser validation passed: pricing, placement examples, stable billing/terms URLs, versioned electronic agreement acceptance, private RLS storage, server-only persistence and public inquiry safeguards are protected.');
