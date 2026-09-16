import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');

const inquiryMigration = read('supabase/migrations/20260814023200_create_partner_inquiries.sql');
const inquiryPackageMigration = read('supabase/migrations/20260916163411_add_advertiser_package_fields_to_partner_inquiries.sql');
const agreementMigration = read('supabase/migrations/20260915185000_create_advertiser_agreements.sql');
const agreementHardeningMigration = read('supabase/migrations/20260916162851_harden_texasdefined_advertiser_agreements.sql');
const agreementSearchPathMigration = read('supabase/migrations/20260916163025_pin_advertiser_agreement_trigger_search_path.sql');
const inquiryWriter = read('src/data/partner-inquiry.server.ts');
const inquiryFn = read('src/data/partner-inquiry.functions.ts');
const agreementWriter = read('src/data/advertiser-agreement.server.ts');
const agreementFn = read('src/data/advertiser-agreement.functions.ts');
const advertisingProgram = read('src/data/advertising-program.ts');
const route = read('src/routes/partner-with-us.tsx');
const lazyRoute = read('src/routes/partner-with-us.lazy.tsx');
const billingRoute = read('src/routes/partner-with-us.billing.tsx');
const billingLazyRoute = read('src/routes/partner-with-us.billing.lazy.tsx');
const termsRoute = read('src/routes/partner-with-us.terms.tsx');
const termsLazyRoute = read('src/routes/partner-with-us.terms.lazy.tsx');
const examplesRoute = read('src/routes/partner-with-us.examples.tsx');
const examplesLazyRoute = read('src/routes/partner-with-us.examples.lazy.tsx');
const agreementRoute = read('src/routes/partner-with-us.agreement.tsx');
const agreementLazyRoute = read('src/routes/partner-with-us.agreement.lazy.tsx');
const legacyBillingRoute = read('src/routes/advertising-billing.tsx');
const legacyTermsRoute = read('src/routes/advertising-terms.tsx');
const footer = read('src/components/layout/Footer.tsx');
const publicRoutes = read('src/lib/public-routes.ts');
const errors = [];

function requireTokens(name, source, tokens) {
  for (const token of tokens) if (!source.includes(token)) errors.push(`${name} missing ${token}`);
}

requireTokens('Partner inquiry migration', inquiryMigration, [
  'CREATE TABLE IF NOT EXISTS public.texasdefined_partner_inquiries',
  'ENABLE ROW LEVEL SECURITY',
  'REVOKE ALL ON TABLE public.texasdefined_partner_inquiries FROM anon, authenticated',
  'GRANT ALL ON TABLE public.texasdefined_partner_inquiries TO service_role',
]);
if (/CREATE POLICY/i.test(inquiryMigration)) errors.push('Partner inquiry table must not expose a direct public RLS policy.');

requireTokens('Partner inquiry package migration', inquiryPackageMigration, [
  'requested_tier text',
  'billing_cycle text',
  "requested_tier IN ('local','growth','premier','custom')",
  "billing_cycle IN ('monthly','annual')",
]);
requireTokens('Partner inquiry server writer', inquiryWriter, [
  "from('texasdefined_partner_inquiries').insert(value)",
  'requested_tier:',
  'billing_cycle:',
  'PartnerInquiryAdminClient',
]);
requireTokens('Partner inquiry server function', inquiryFn, [
  "createServerFn({ method: 'POST' })",
  '.inputValidator(partnerInquirySchema)',
  "z.enum(['local', 'growth', 'premier', 'custom'])",
  "z.enum(['monthly', 'annual'])",
  "if (data.addressLine2.trim()) return { ok: true }",
  'requested_tier: data.requestedTier',
  'billing_cycle: data.billingCycle',
  'await savePartnerInquiry',
]);
if (inquiryFn.includes('client.server') || inquiryFn.includes('supabaseAdmin')) errors.push('Partner inquiry function wrapper must not import privileged database code directly.');

requireTokens('Advertiser agreement base migration', agreementMigration, [
  'CREATE TABLE IF NOT EXISTS public.texasdefined_advertiser_agreements',
  "status IN ('pending_publisher_acceptance', 'accepted', 'declined', 'void')",
  'agreement_snapshot text NOT NULL',
  "tier IN ('local', 'growth', 'premier', 'custom')",
  "billing_cycle IN ('monthly', 'annual')",
  'authority_confirmed boolean NOT NULL CHECK (authority_confirmed = true)',
  'esign_consent boolean NOT NULL CHECK (esign_consent = true)',
  'REVOKE ALL ON TABLE public.texasdefined_advertiser_agreements FROM anon, authenticated',
  'GRANT ALL ON TABLE public.texasdefined_advertiser_agreements TO service_role',
]);
if (/CREATE POLICY/i.test(agreementMigration)) errors.push('Advertiser agreement table must not expose a direct public RLS policy.');

requireTokens('Advertiser agreement hardening migration', agreementHardeningMigration, [
  'signer_accepted_at timestamptz',
  'agreement_snapshot_sha256 text',
  'business_name text',
  'billing_email text',
  'payment_status text',
  'invoice_status text',
  'stripe_customer_id',
  'stripe_invoice_id',
  'stripe_subscription_id',
  'prevent_texasdefined_advertiser_agreement_acceptance_mutation',
  'accepted advertiser agreement identity and snapshot fields are immutable',
]);
requireTokens('Advertiser agreement trigger hardening', agreementSearchPathMigration, [
  'ALTER FUNCTION public.prevent_texasdefined_advertiser_agreement_acceptance_mutation()',
  'SET search_path = pg_catalog, public',
]);
requireTokens('Advertiser agreement server writer', agreementWriter, [
  "import { createHash } from 'node:crypto'",
  "from('texasdefined_advertiser_agreements').insert({",
  "createHash('sha256')",
  'agreement_snapshot_sha256',
  'business_name:',
  'billing_email:',
]);
requireTokens('Advertiser agreement function', agreementFn, [
  "createServerFn({ method: 'POST' })",
  '.inputValidator(advertiserAgreementSchema)',
  "z.enum(['local', 'growth', 'premier', 'custom'])",
  'z.literal(ADVERTISING_AGREEMENT_VERSION)',
  'Typed signature must match the signer name.',
  'advertiserAgreementSnapshot(tierId, billingCycle)',
  'business_name: data.businessName',
  'billing_email: billingEmail.toLowerCase()',
  'await saveAdvertiserAgreement',
]);
if (agreementFn.includes('client.server') || agreementFn.includes('supabaseAdmin')) errors.push('Advertiser agreement function wrapper must not import privileged database code directly.');

requireTokens('Advertising program model', advertisingProgram, [
  "id: 'local'", 'monthlyPrice: 249', 'annualPrice: 2490',
  "id: 'growth'", 'monthlyPrice: 499', 'annualPrice: 4990',
  "id: 'premier'", 'monthlyPrice: 999', 'annualPrice: 9990',
  "id: 'custom'", 'ADVERTISING_AGREEMENT_VERSION', 'agreementClauses', 'advertiserAgreementSnapshot',
]);
if (/\b(?:49|149|299|499)\s*\/\s*(?:mo|month)\b/i.test(advertisingProgram)) errors.push('Advertising program must not retain legacy low sports sponsorship pricing.');

requireTokens('Partner With Us route shell', route, [
  "createFileRoute('/partner-with-us')",
  "title: 'Advertise & Partner With Texas Defined'",
  'sourcePath?: string;',
  'validateSearch:',
  "sourcePath: typeof search.source === 'string' ? sanitizePartnerSource(search.source) : undefined",
]);
requireTokens('Partner With Us sales and inquiry page', lazyRoute, [
  "createLazyFileRoute('/partner-with-us')",
  'A professional sponsorship program, not a link marketplace.',
  'Advertising does not buy editorial coverage, rankings, reviews, recommendations or factual conclusions',
  'Packages & pricing',
  '/partner-with-us/examples',
  '/partner-with-us/terms',
  '/partner-with-us/billing',
  '/partner-with-us/agreement',
  'requestedTier: selectedTier',
  'billingCycle',
  'name="addressLine2"',
  'await submitPartnerInquiry({ data:',
  'Submit partnership inquiry',
]);
if (lazyRoute.includes('submitAdvertiserAgreement') || lazyRoute.includes('agreementAddressLine2') || lazyRoute.includes('Accept & submit agreement')) {
  errors.push('Public sales page must not duplicate the approved-advertiser electronic agreement form.');
}

requireTokens('Partner billing route shell', billingRoute, ["createFileRoute('/partner-with-us/billing')", "canonicalPath = '/partner-with-us/billing'"]);
requireTokens('Partner billing page', billingLazyRoute, [
  "createLazyFileRoute('/partner-with-us/billing')", 'Stripe Hosted Invoice Page', 'Net 15', 'Net 30', 'admin@texasdefined.com', 'One-time campaigns under $2,500',
]);
requireTokens('Partner terms route shell', termsRoute, ["createFileRoute('/partner-with-us/terms')", "canonicalPath = '/partner-with-us/terms'"]);
requireTokens('Partner terms page', termsLazyRoute, [
  "createLazyFileRoute('/partner-with-us/terms')", 'agreementClauses', 'ADVERTISING_AGREEMENT_VERSION', 'not editorial influence', '/partner-with-us/agreement', 'does not represent that it has been reviewed by counsel',
]);
requireTokens('Partner examples route shell', examplesRoute, ["createFileRoute('/partner-with-us/examples')", "canonicalPath = '/partner-with-us/examples'"]);
requireTokens('Partner examples page', examplesLazyRoute, [
  "createLazyFileRoute('/partner-with-us/examples')", 'Sample advertiser · Demonstration only', 'Event page', 'Destination guide', 'Moving to Texas', 'Sports travel', 'RV / campground', 'Desktop sample', 'Mobile sample',
]);
requireTokens('Partner agreement route shell', agreementRoute, [
  "createFileRoute('/partner-with-us/agreement')", "canonicalPath = '/partner-with-us/agreement'", "robots: 'noindex, follow'",
]);
requireTokens('Partner agreement page', agreementLazyRoute, [
  "createLazyFileRoute('/partner-with-us/agreement')", 'submitAdvertiserAgreement', 'Print / save agreement', 'businessName', 'billingEmail', 'typedSignature', 'authorityConfirmed', 'esignConsent', 'Exact agreement snapshot',
]);

requireTokens('Legacy advertising billing route', legacyBillingRoute, ["createFileRoute('/advertising-billing')", "to: '/partner-with-us/billing'", 'replace: true']);
requireTokens('Legacy advertising terms route', legacyTermsRoute, ["createFileRoute('/advertising-terms')", "to: '/partner-with-us/terms'", 'replace: true']);

for (const [name, source] of [
  ['main route shell', route], ['main lazy page', lazyRoute], ['billing shell', billingRoute], ['billing page', billingLazyRoute],
  ['terms shell', termsRoute], ['terms page', termsLazyRoute], ['examples shell', examplesRoute], ['examples page', examplesLazyRoute],
  ['agreement shell', agreementRoute], ['agreement page', agreementLazyRoute],
]) {
  if (source.includes('client.server') || source.includes('supabaseAdmin')) errors.push(`Public advertiser ${name} must not import privileged database code.`);
}

if (!footer.includes('<Link to="/partner-with-us"')) errors.push('Partner With Us must be discoverable from the footer.');
if (!publicRoutes.includes('"/partner-with-us"')) errors.push('Partner With Us must be governed as a public indexable route.');

if (errors.length) {
  console.error(`Partner advertiser validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Partner advertiser validation passed: unified pricing, review-first inquiry, lazy advertiser routes, demonstration-only examples, versioned electronic agreement acceptance, immutable private persistence, billing policy and legacy URL redirects are protected.');
