import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const source=(path)=>readFileSync(path,'utf8');
const billing=source('src/data/texasdefined-billing.server.ts');
const billingAdminServer=source('src/data/texasdefined-billing-admin.server.ts');
const billingAdminFunctions=source('src/data/texasdefined-billing-admin.functions.ts');
const billingAdmin=source('src/routes/admin.billing.lazy.tsx');
const billingRoute=source('src/routes/admin.billing.tsx');
const adminNav=source('src/routes/admin.tsx');
const sportsAdmin=source('src/routes/admin.sports-partners.lazy.tsx');
const checkout=source('src/routes/api.public.network-checkout.ts');
const stripe=source('src/data/network-stripe.server.ts');
const webhook=source('src/routes/api.public.network-stripe-webhook.ts');
const advertiser=source('src/data/advertiser-billing.server.ts');
const schema=source('supabase/migrations/20261011230709_create_texasdefined_shared_billing_backbone.sql');
const idempotency=source('supabase/migrations/20261011231152_harden_texasdefined_shared_invoice_idempotency.sql');
const acceptance=source('supabase/migrations/20261011231251_add_advertiser_publisher_acceptance_to_shared_billing.sql');
const reconciliation=source('supabase/migrations/20261011231541_reconcile_texasdefined_shared_stripe_invoices.sql');
const reuse=source('supabase/migrations/20261011232059_reuse_exact_verified_texasdefined_billing_accounts.sql');
const manualInvoiceBlock=billingAdminServer.slice(
  billingAdminServer.indexOf('export async function createAdminManualDraftInvoice'),
  billingAdminServer.indexOf('export async function sendAdminBillingInvoice'),
);

const check=(label,value)=>{
  assert.ok(value,label);
  console.log('PASS shared billing: '+label);
};

check('canonical business billing account owns one unique Stripe customer',
  schema.includes('CREATE TABLE IF NOT EXISTS public.texasdefined_billing_accounts')
  && schema.includes('stripe_customer_id text UNIQUE')
  && schema.includes("source IN ('network','advertising','admin')"));

for(const table of [
  'texasdefined_billing_accounts',
  'texasdefined_billing_invoices',
  'texasdefined_billing_invoice_items',
  'texasdefined_billing_stripe_events',
]){
  check(table+' is server-only',
    schema.includes('ALTER TABLE public.'+table+' ENABLE ROW LEVEL SECURITY')
    && schema.includes('REVOKE ALL ON TABLE public.'+table+' FROM PUBLIC, anon, authenticated')
    && schema.includes('GRANT ALL ON TABLE public.'+table+' TO service_role'));
}

check('Network checkout resolves canonical billing account and Stripe customer first',
  checkout.includes('ensureNetworkBillingAccount(data.id,verified.user.id)')
  && checkout.includes("ensureTexasDefinedStripeCustomer(billingAccount,'network')")
  && checkout.includes('billingAccount.billingAccountId')
  && stripe.includes('customer:stripeCustomerId')
  && stripe.includes('result.customer!==stripeCustomerId')
  && stripe.includes('result.metadata?.billing_account_id!==billingAccountId'));

check('Stripe subscriptions carry application and shared billing identity',
  stripe.includes("'subscription_data[metadata][application_id]':applicationId")
  && stripe.includes("'subscription_data[metadata][billing_account_id]':billingAccountId")
  && stripe.includes("subscription.metadata?.billing_account_id==='string'"));

check('draft invoicing is explicitly launch-gated and retry-safe',
  billing.includes("process.env.TEXASDEFINED_INVOICING_ENABLED !== 'true'")
  && billing.includes(".eq('dedupe_key', dedupeKey)")
  && billing.includes("'Idempotency-Key': 'texasdefined-invoice-'")
  && idempotency.includes('CREATE UNIQUE INDEX IF NOT EXISTS texasdefined_billing_invoices_dedupe_key_uidx'));

check('invoice lines retain product family and source identity',
  schema.includes("product_family IN ('network','advertising','other')")
  && schema.includes("source_type IN ('network_membership','advertiser_agreement','advertising_campaign','manual')")
  && billing.includes("'metadata[product_family]': line.productFamily")
  && billing.includes("'metadata[source_type]': line.sourceType"));

check('advertiser publisher acceptance is explicit before billing',
  acceptance.includes('accept_texasdefined_advertiser_agreement')
  && acceptance.includes("v_status <> 'pending_publisher_acceptance'")
  && advertiser.includes('accept_texasdefined_advertiser_agreement')
  && billingAdmin.includes('Accept & prepare draft invoice'));

check('billing actions require dedicated administrator access, never the marketing key',
  advertiser.includes("import { assertNetworkAdminAccess }")
  && advertiser.includes('await assertNetworkAdminAccess(accessKey)')
  && !advertiser.includes('assertSportsPartnerAccess')
  && billingAdminServer.includes("import {assertNetworkAdminAccess}")
  && billingAdminServer.includes('await assertNetworkAdminAccess(accessKey)')
  && !sportsAdmin.includes('advertiser-billing.functions')
  && !sportsAdmin.includes('Prepare draft invoice'));

check('unified billing console is private and linked from operations navigation',
  billingRoute.includes("createFileRoute('/admin/billing')")
  && billingRoute.includes('noindex,nofollow,noarchive')
  && adminNav.includes('to="/admin/billing"')
  && billingAdmin.includes('One business billing identity and one Stripe customer'));

check('existing billing-account selection is explicit for advertiser orders',
  acceptance.includes('assign_texasdefined_advertiser_billing_account')
  && advertiser.includes('billingAccountId?:string|null')
  && billingAdmin.includes('Existing billing customer (optional)')
  && billingAdmin.includes('value={a.id}'));

check('verified cross-product reuse requires exact billing email plus normalized website and fails closed on ambiguity',
  reuse.includes('lower(trim(billing_email))=lower(trim(v_application.contact_email))')
  && reuse.includes('regexp_replace(lower(trim(website))')
  && reuse.includes('lower(trim(billing_email))=lower(trim(v_agreement.billing_email))')
  && reuse.includes('Multiple matching billing accounts require administrator resolution')
  && reuse.includes('Verified business ownership is required'));

check('shared invoice reconciliation verifies current Stripe state and service-only RPC',
  webhook.includes('readTexasDefinedCurrentInvoice(obj.id)')
  && webhook.includes('apply_texasdefined_billing_invoice_event')
  && reconciliation.includes('v_invoice.stripe_customer_id IS DISTINCT FROM p_customer_id')
  && reconciliation.includes('TO service_role')
  && reconciliation.includes('FROM PUBLIC,anon,authenticated'));

check('advertiser payment state stays separate from Network entitlement',
  reconciliation.includes("source_type='advertiser_agreement'")
  && reconciliation.includes('payment_status=CASE')
  && !reconciliation.includes('paid_entitlement_active'));

check('manual invoice creation is positive-charge-only and cannot grant Network entitlement',
  billingAdminFunctions.includes("unitAmountCents:z.number().int().min(1)")
  && billingAdmin.includes('min="0.01"')
  && manualInvoiceBlock.includes("sourceType:'manual'")
  && !manualInvoiceBlock.includes('paid_entitlement_active'));

check('invoice sending has a second independent release gate',
  billing.includes("process.env.TEXASDEFINED_INVOICE_SENDING_ENABLED!=='true'")
  && billing.includes("'/finalize'")
  && billing.includes("'/send'")
  && billingAdminServer.includes('sendTexasDefinedInvoice(localInvoiceId)')
  && billingAdmin.includes('dashboard.invoiceSendingEnabled')
  && billingAdmin.includes('Sending disabled until launch verification'));

console.log('Shared TexasDefined billing architecture validated.');
