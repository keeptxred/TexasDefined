import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const source=(p)=>readFileSync(p,'utf8');
const billing=source('src/data/texasdefined-billing.server.ts');
const checkout=source('src/routes/api.public.network-checkout.ts');
const stripe=source('src/data/network-stripe.server.ts');
const webhook=source('src/routes/api.public.network-stripe-webhook.ts');
const advertiser=source('src/data/advertiser-billing.server.ts');
const admin=source('src/routes/admin.sports-partners.lazy.tsx');
const schema=source('supabase/migrations/20261011230709_create_texasdefined_shared_billing_backbone.sql');
const idempotency=source('supabase/migrations/20261011231152_harden_texasdefined_shared_invoice_idempotency.sql');
const acceptance=source('supabase/migrations/20261011231251_add_advertiser_publisher_acceptance_to_shared_billing.sql');
const reconciliation=source('supabase/migrations/20261011231541_reconcile_texasdefined_shared_stripe_invoices.sql');

const check=(label,value)=>{assert.ok(value,label);console.log('PASS shared billing: '+label)};

check('canonical business billing account owns one unique Stripe customer',
 schema.includes('CREATE TABLE IF NOT EXISTS public.texasdefined_billing_accounts')
 &&schema.includes('stripe_customer_id text UNIQUE')
 &&schema.includes("source IN ('network','advertising','admin')"));

for(const table of ['texasdefined_billing_accounts','texasdefined_billing_invoices','texasdefined_billing_invoice_items','texasdefined_billing_stripe_events']){
 check(table+' is server-only',schema.includes('ALTER TABLE public.'+table+' ENABLE ROW LEVEL SECURITY')
  &&schema.includes('REVOKE ALL ON TABLE public.'+table+' FROM PUBLIC, anon, authenticated')
  &&schema.includes('GRANT ALL ON TABLE public.'+table+' TO service_role'));
}

check('Network checkout resolves the canonical billing account and customer first',
 checkout.includes('ensureNetworkBillingAccount(data.id,verified.user.id)')
 &&checkout.includes("ensureTexasDefinedStripeCustomer(billingAccount,'network')")
 &&checkout.includes('billingAccount.billingAccountId')
 &&stripe.includes('customer:stripeCustomerId')
 &&stripe.includes('result.customer!==stripeCustomerId')
 &&stripe.includes('result.metadata?.billing_account_id!==billingAccountId'));

check('Stripe subscriptions carry both application and shared billing identity',
 stripe.includes("'subscription_data[metadata][application_id]':applicationId")
 &&stripe.includes("'subscription_data[metadata][billing_account_id]':billingAccountId")
 &&stripe.includes("subscription.metadata?.billing_account_id==='string'"));

check('draft invoicing is explicitly launch-gated and retry-safe',
 billing.includes("process.env.TEXASDEFINED_INVOICING_ENABLED !== 'true'")
 &&billing.includes("dedupeKey:'")===false
 &&billing.includes(".eq('dedupe_key', dedupeKey)")
 &&billing.includes("'Idempotency-Key': 'texasdefined-invoice-'")
 &&idempotency.includes('CREATE UNIQUE INDEX IF NOT EXISTS texasdefined_billing_invoices_dedupe_key_uidx'));

check('invoice lines retain product family and source identity',
 schema.includes("product_family IN ('network','advertising','other')")
 &&schema.includes("source_type IN ('network_membership','advertiser_agreement','advertising_campaign','manual')")
 &&billing.includes("'metadata[product_family]': line.productFamily")
 &&billing.includes("'metadata[source_type]': line.sourceType"));

check('advertiser publisher acceptance is explicit before billing',
 acceptance.includes('accept_texasdefined_advertiser_agreement')
 &&acceptance.includes("v_status <> 'pending_publisher_acceptance'")
 &&advertiser.includes("accept_texasdefined_advertiser_agreement")
 &&admin.includes('Accept & prepare draft invoice'));

check('existing billing account reuse is explicit, never email-only auto-merge',
 acceptance.includes('assign_texasdefined_advertiser_billing_account')
 &&advertiser.includes('billingAccountId?:string|null')
 &&admin.includes('Create a new TexasDefined billing account')
 &&admin.includes('Reuse an existing billing account')===false
 &&billing.includes("metadata[billing_account_id]"));

check('shared invoice reconciliation verifies current Stripe state and service-only RPC',
 webhook.includes('readTexasDefinedCurrentInvoice(obj.id)')
 &&webhook.includes('apply_texasdefined_billing_invoice_event')
 &&reconciliation.includes('v_invoice.stripe_customer_id IS DISTINCT FROM p_customer_id')
 &&reconciliation.includes('TO service_role')
 &&reconciliation.includes('FROM PUBLIC,anon,authenticated'));

check('advertiser payment state is separate from Network entitlement',
 reconciliation.includes("source_type='advertiser_agreement'")
 &&reconciliation.includes("payment_status=CASE")
 &&!reconciliation.includes('paid_entitlement_active'));

check('invoice sending has a second independent release gate',
 billing.includes("process.env.TEXASDEFINED_INVOICE_SENDING_ENABLED!=='true'")
 &&billing.includes("'/finalize'")
 &&billing.includes("'/send'")
 &&!admin.includes('sendTexasDefinedInvoice'));

console.log('Shared TexasDefined billing architecture validated.');
