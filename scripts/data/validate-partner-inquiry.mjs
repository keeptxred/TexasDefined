import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');

const inquiryMigration = read('supabase/migrations/20260814023200_create_partner_inquiries.sql');
const inquiryPackageMigration = read('supabase/migrations/20260916163411_add_advertiser_package_fields_to_partner_inquiries.sql');
const inquiryWorkflowMigration = read('supabase/migrations/20260917125500_extend_texasdefined_partner_inquiries_for_advertiser_workflow.sql');
const agreementMigration = read('supabase/migrations/20260915234926_create_texasdefined_advertiser_agreements.sql');
const agreementHardeningMigration = read('supabase/migrations/20260916162851_harden_texasdefined_advertiser_agreements.sql');
const agreementSearchPathMigration = read('supabase/migrations/20260916163025_pin_advertiser_agreement_trigger_search_path.sql');
const agreementOfferMigration = read('supabase/migrations/20260917130039_create_texasdefined_advertiser_agreement_offers.sql');
const agreementOfferProtectionMigration = read('supabase/migrations/20260917130651_protect_signed_advertiser_agreement_offer_links.sql');
const inquiryWriter = read('src/data/partner-inquiry.server.ts');
const inquiryFn = read('src/data/partner-inquiry.functions.ts');
const agreementWriter = read('src/data/advertiser-agreement.server.ts');
const agreementFn = read('src/data/advertiser-agreement.functions.ts');
const advertiserLeadWriter = read('src/data/advertiser-leads.server.ts');
const advertiserLeadFn = read('src/data/advertiser-leads.functions.ts');
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
const advertiserAdmin = read('src/routes/admin.sports-partners.lazy.tsx');
const legacyBillingRoute = read('src/routes/advertising-billing.tsx');
const legacyTermsRoute = read('src/routes/advertising-terms.tsx');
const baseAgreement = read('docs/advertising/contracts/advertising-sponsorship-base-terms.md');
const localSchedule = read('docs/advertising/contracts/local-partner-schedule.md');
const growthSchedule = read('docs/advertising/contracts/growth-partner-schedule.md');
const premierSchedule = read('docs/advertising/contracts/premier-partner-schedule.md');
const customSchedule = read('docs/advertising/contracts/custom-partnership-schedule.md');
const eventSchedule = read('docs/advertising/contracts/event-campaign-schedule.md');
const integratedSchedule = read('docs/advertising/contracts/integrated-campaign-schedule.md');
const orderForm = read('docs/advertising/contracts/advertising-order-form-template.md');
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
requireTokens('Partner inquiry workflow migration', inquiryWorkflowMigration, [
  'phone text', 'target_texas_locations text', 'desired_start_date date', 'objectives text', 'notes text',
  'advertiser_agreement_id uuid REFERENCES public.texasdefined_advertiser_agreements(id) ON DELETE SET NULL',
  "'approved','agreement_sent','agreement_signed','awaiting_payment','paid'",
  "'assets_needed','scheduled','live','completed','declined'",
]);
requireTokens('Partner inquiry server writer', inquiryWriter, [
  "from('texasdefined_partner_inquiries').insert(value)",
  'phone:', 'target_texas_locations:', 'desired_start_date:', 'objectives:', 'notes:',
  'requested_tier:', 'billing_cycle:', 'PartnerInquiryAdminClient',
]);
requireTokens('Partner inquiry server function', inquiryFn, [
  "createServerFn({ method: 'POST' })", '.inputValidator(partnerInquirySchema)',
  "z.enum(['local', 'growth', 'premier', 'custom'])", "z.enum(['monthly', 'annual'])",
  'phone:', 'targetTexasLocations:', 'desiredStartDate:', 'objectives:', 'notes:',
  "if (data.addressLine2.trim()) return { ok: true }",
  'requested_tier: data.requestedTier', 'billing_cycle: data.billingCycle', 'await savePartnerInquiry',
]);
if (inquiryFn.includes('client.server') || inquiryFn.includes('supabaseAdmin')) errors.push('Partner inquiry function wrapper must not import privileged database code directly.');

requireTokens('Advertiser agreement base migration', agreementMigration, [
  'CREATE TABLE IF NOT EXISTS public.texasdefined_advertiser_agreements',
  "status IN ('pending_publisher_acceptance', 'accepted', 'declined', 'void')",
  'agreement_snapshot text NOT NULL', 'agreement_snapshot_sha256 text NOT NULL',
  "tier IN ('local', 'growth', 'premier', 'custom')", "billing_cycle IN ('monthly', 'annual')",
  'business_name text NOT NULL', 'billing_email text NOT NULL',
  'authority_confirmed boolean NOT NULL CHECK (authority_confirmed = true)',
  'esign_consent boolean NOT NULL CHECK (esign_consent = true)',
  'stripe_customer_id text', 'stripe_invoice_id text', 'stripe_subscription_id text',
  'REVOKE ALL ON TABLE public.texasdefined_advertiser_agreements FROM anon, authenticated',
  'GRANT ALL ON TABLE public.texasdefined_advertiser_agreements TO service_role',
]);
if (/CREATE POLICY/i.test(agreementMigration)) errors.push('Advertiser agreement table must not expose a direct public RLS policy.');

requireTokens('Advertiser agreement hardening migration', agreementHardeningMigration, [
  'signer_accepted_at timestamptz', 'agreement_snapshot_sha256 text', 'business_name text', 'billing_email text',
  'payment_status text', 'invoice_status text', 'campaign_start_date date', 'campaign_end_date date',
  'destination_url text', 'placement_locations jsonb',
  'prevent_texasdefined_advertiser_agreement_acceptance_mutation',
  'accepted advertiser agreement identity and snapshot fields are immutable',
]);
requireTokens('Advertiser agreement trigger hardening', agreementSearchPathMigration, [
  'ALTER FUNCTION public.prevent_texasdefined_advertiser_agreement_acceptance_mutation()',
  'SET search_path = pg_catalog, public',
]);

requireTokens('Private advertiser agreement offer migration', agreementOfferMigration, [
  'CREATE TABLE IF NOT EXISTS public.texasdefined_advertiser_agreement_offers',
  'token_hash text NOT NULL UNIQUE', 'agreement_snapshot_sha256 text NOT NULL',
  "status IN ('active','signed','revoked','expired')", 'expires_at timestamptz NOT NULL',
  'ALTER TABLE public.texasdefined_advertiser_agreement_offers ENABLE ROW LEVEL SECURITY',
  'REVOKE ALL ON TABLE public.texasdefined_advertiser_agreement_offers FROM PUBLIC, anon, authenticated',
  'GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.texasdefined_advertiser_agreement_offers TO service_role',
  'CREATE OR REPLACE FUNCTION public.complete_texasdefined_advertiser_agreement_offer',
  'SECURITY DEFINER', "SET search_path = ''",
  'FOR UPDATE', "SET status = 'signed'", "SET status = 'agreement_signed'",
  'REVOKE ALL ON FUNCTION public.complete_texasdefined_advertiser_agreement_offer',
  'GRANT EXECUTE ON FUNCTION public.complete_texasdefined_advertiser_agreement_offer',
]);
if (/CREATE POLICY/i.test(agreementOfferMigration)) errors.push('Advertiser agreement offer table must not expose a direct public RLS policy.');
requireTokens('Signed advertiser agreement offer protection', agreementOfferProtectionMigration, [
  'ON DELETE RESTRICT', 'texasdefined_advertiser_agreement_offers_signed_agreement_id_fkey',
]);

requireTokens('Advertiser agreement server service', agreementWriter, [
  "import { createHash, randomBytes } from 'node:crypto'", 'sha256Hex', "randomBytes(32).toString('hex')",
  'buildOrderSnapshot', 'createAdvertiserAgreementOffer', 'loadAdvertiserAgreementOffer', 'completeAdvertiserAgreementOffer',
  "from('texasdefined_advertiser_agreement_offers')", "from('texasdefined_partner_inquiries')",
  "rpc('complete_texasdefined_advertiser_agreement_offer'", "status: 'agreement_sent'",
  'advertiserAgreementSnapshot(input.tier, input.billingCycle)',
]);
requireTokens('Advertiser agreement server functions', agreementFn, [
  'agreementToken', "regex(/^[a-f0-9]{64}$/i", "createServerFn({ method: 'GET' })",
  'loadAdvertiserAgreement', 'submitAdvertiserAgreement', 'createAdvertiserAgreementOffer',
  "if (data.addressLine2.trim()) return { ok: true }", 'completeAdvertiserAgreementOffer(data.token',
]);
if (agreementFn.includes('client.server') || agreementFn.includes('supabaseAdmin')) errors.push('Advertiser agreement function wrapper must not import privileged database code directly.');

requireTokens('Unified advertiser lead service', advertiserLeadWriter, [
  'loadAdvertiserLeadDashboard', 'updateAdvertiserLeadStatus', 'assertSportsPartnerAccess',
  "from('texasdefined_partner_inquiries')", 'target_texas_locations', 'advertiser_agreement_id',
]);
requireTokens('Unified advertiser lead functions', advertiserLeadFn, [
  'getAdvertiserLeadDashboard', 'setAdvertiserLeadStatus', "'agreement_sent'", "'agreement_signed'", "'awaiting_payment'", "'assets_needed'", "'live'",
]);

requireTokens('Advertising program model', advertisingProgram, [
  "id: 'local'", 'monthlyPrice: 249', 'annualPrice: 2490',
  "id: 'growth'", 'monthlyPrice: 499', 'annualPrice: 4990',
  "id: 'premier'", 'monthlyPrice: 999', 'annualPrice: 9990',
  "id: 'custom'", 'ADVERTISING_AGREEMENT_VERSION', 'agreementClauses', 'advertiserAgreementSnapshot',
]);

requireTokens('Partner With Us route shell', route, [
  "createFileRoute('/partner-with-us')", "title: 'Advertise & Partner With Texas Defined'",
  'sourcePath?: string;', 'validateSearch:',
  "sourcePath: typeof search.source === 'string' ? sanitizePartnerSource(search.source) : undefined",
]);
requireTokens('Partner With Us sales and inquiry page', lazyRoute, [
  "createLazyFileRoute('/partner-with-us')", 'A professional sponsorship program, not a link marketplace.',
  'Advertising does not buy editorial coverage, rankings, reviews, recommendations or factual conclusions',
  'Packages & pricing', '/partner-with-us/examples', '/partner-with-us/terms', '/partner-with-us/billing',
  'Media kit', 'Frequently asked questions', 'phone:', 'targetTexasLocations:', 'desiredStartDate:', 'objectives:', 'notes:',
  'requestedTier: selectedTier', 'billingCycle', 'name="addressLine2"',
  'await submitPartnerInquiry({ data:', 'Submit partnership inquiry',
]);
if (lazyRoute.includes('href="/partner-with-us/agreement"') || lazyRoute.includes('submitAdvertiserAgreement') || lazyRoute.includes('Accept & submit agreement')) {
  errors.push('Public sales page must not expose or duplicate the approved-advertiser signing form.');
}

requireTokens('Partner billing route shell', billingRoute, ["createFileRoute('/partner-with-us/billing')", "canonicalPath = '/partner-with-us/billing'"]);
requireTokens('Partner billing page', billingLazyRoute, [
  "createLazyFileRoute('/partner-with-us/billing')", 'Stripe Hosted Invoice Page', 'Net 15', 'Net 30', 'admin@texasdefined.com', 'One-time campaigns under $2,500',
]);
requireTokens('Partner terms route shell', termsRoute, ["createFileRoute('/partner-with-us/terms')", "canonicalPath = '/partner-with-us/terms'"]);
requireTokens('Partner terms page', termsLazyRoute, [
  "createLazyFileRoute('/partner-with-us/terms')", 'agreementClauses', 'ADVERTISING_AGREEMENT_VERSION', 'not editorial influence', 'does not represent that it has been reviewed by counsel',
]);
requireTokens('Partner examples route shell', examplesRoute, ["createFileRoute('/partner-with-us/examples')", "canonicalPath = '/partner-with-us/examples'"]);
requireTokens('Partner examples page', examplesLazyRoute, [
  "createLazyFileRoute('/partner-with-us/examples')", 'Sample advertiser · Demonstration only', 'Event page', 'Destination guide', 'Moving to Texas', 'Sports travel', 'RV / campground', 'Desktop sample', 'Mobile sample',
]);
requireTokens('Partner agreement route shell', agreementRoute, [
  "createFileRoute('/partner-with-us/agreement')", "canonicalPath = '/partner-with-us/agreement'", "robots: 'noindex, nofollow, noarchive'", 'token?: string;',
]);
requireTokens('Private partner agreement page', agreementLazyRoute, [
  "createLazyFileRoute('/partner-with-us/agreement')", 'loadAdvertiserAgreement', 'submitAdvertiserAgreement',
  'Approved advertiser workflow', 'Private agreement link required', 'Full agreement and approved order snapshot',
  'Electronic acceptance', 'Package, price and negotiated terms cannot be changed', 'Agreement acceptance recorded.',
  'authorityConfirmed', 'esignConsent', 'typedSignature', 'name="addressLine2"',
]);

requireTokens('Advertiser admin workflow', advertiserAdmin, [
  'Advertiser & Partner Leads', 'getAdvertiserLeadDashboard', 'setAdvertiserLeadStatus', 'createAdvertiserAgreementOffer',
  'Prepare private agreement link', 'Private link created — no email sent', 'Hold this link until the outreach-readiness gate is complete.',
  'billingAddress', 'paymentTerms', 'negotiatedAdditions',
]);

requireTokens('Legacy advertising billing route', legacyBillingRoute, ["createFileRoute('/advertising-billing')", "to: '/partner-with-us/billing'", 'replace: true']);
requireTokens('Legacy advertising terms route', legacyTermsRoute, ["createFileRoute('/advertising-terms')", "to: '/partner-with-us/terms'", 'replace: true']);

requireTokens('Master advertising agreement draft', baseAgreement, [
  '2026-09-16-v2', 'not been reviewed by counsel', 'Editorial independence', 'No performance guarantees', 'Indemnification', 'Limitation of liability', 'Force majeure', 'Governing law',
]);
requireTokens('Local Partner schedule', localSchedule, ['$249', '$2,490']);
requireTokens('Growth Partner schedule', growthSchedule, ['$499', '$4,990']);
requireTokens('Premier Partner schedule', premierSchedule, ['$999', '$9,990']);
requireTokens('Custom Partnership schedule', customSchedule, ['Custom']);
requireTokens('Event Campaign schedule', eventSchedule, ['$495', 'For attorney review before first commercial use.', 'does not guarantee']);
requireTokens('Integrated Campaign schedule', integratedSchedule, ['$1,500', 'For attorney review before first commercial use.', 'editorial']);
requireTokens('Advertising order form', orderForm, [
  'Annual Local Partner — $2,490/year prepaid', 'Annual Growth Partner — $4,990/year prepaid', 'Annual Premier Partner — $9,990/year prepaid',
  'Event Campaign — starting at $495', 'Integrated Campaign — starting at $1,500', 'Custom Sponsorship / Partnership',
  'Authorized signer', 'Publisher acceptance', 'does not',
]);

for (const [name, source] of [
  ['main route shell', route], ['main lazy page', lazyRoute], ['billing shell', billingRoute], ['billing page', billingLazyRoute],
  ['terms shell', termsRoute], ['terms page', termsLazyRoute], ['examples shell', examplesRoute], ['examples page', examplesLazyRoute],
  ['agreement shell', agreementRoute], ['agreement page', agreementLazyRoute], ['advertiser admin', advertiserAdmin],
]) {
  if (source.includes('client.server') || source.includes('supabaseAdmin')) errors.push(`Advertiser ${name} must not import privileged database code.`);
}

if (!footer.includes('<Link to="/partner-with-us"')) errors.push('Partner With Us must be discoverable from the footer.');
if (!publicRoutes.includes('"/partner-with-us"')) errors.push('Partner With Us must be governed as a public indexable route.');

if (errors.length) {
  console.error(`Partner advertiser validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Partner advertiser validation passed: unified pricing, complete inquiry capture, protected admin lifecycle, hashed one-time agreement links, fixed approved terms, atomic electronic acceptance, standardized contract schedules, billing policy, demonstration-only examples and legacy redirects are protected.');
