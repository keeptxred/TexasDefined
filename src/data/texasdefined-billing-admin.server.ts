import {assertNetworkAdminAccess} from '@/data/network-admin-access.server';
import {createTexasDefinedDraftInvoice,sendTexasDefinedInvoice} from '@/data/texasdefined-billing.server';
import {supabaseAdmin} from '@/integrations/supabase/client.server';

const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function loadTexasDefinedBillingDashboard(accessKey:string){
  await assertNetworkAdminAccess(accessKey);
  const client=supabaseAdmin as any;
  const [accountsResult,invoicesResult,itemsResult,networkResult,advertiserResult]=await Promise.all([
    client.from('texasdefined_billing_accounts')
      .select('id,created_at,updated_at,status,display_name,legal_name,billing_email,contact_email,website,source,stripe_customer_id')
      .order('created_at',{ascending:false}).limit(500),
    client.from('texasdefined_billing_invoices')
      .select('id,created_at,updated_at,billing_account_id,stripe_invoice_id,invoice_number,status,collection_method,currency,days_until_due,amount_due_cents,amount_paid_cents,amount_remaining_cents,due_at,paid_at,memo,created_by,dedupe_key')
      .order('created_at',{ascending:false}).limit(1000),
    client.from('texasdefined_billing_invoice_items')
      .select('id,invoice_id,product_family,source_type,source_id,description,quantity,unit_amount_cents')
      .order('created_at',{ascending:true}).limit(5000),
    client.from('texasdefined_network_applications')
      .select('id,business_name,plan,status,contact_email,website,billing_account_id,stripe_customer_id,stripe_subscription_id,paid_entitlement_active')
      .not('billing_account_id','is',null).limit(1000),
    client.from('texasdefined_advertiser_agreements')
      .select('id,created_at,status,tier,billing_cycle,published_price_cents,business_name,billing_email,company_website,billing_account_id,stripe_customer_id,stripe_invoice_id,payment_status,invoice_status,publisher_accepted_at,publisher_accepted_by')
      .order('created_at',{ascending:false}).limit(1000),
  ]);
  for(const result of [accountsResult,invoicesResult,itemsResult,networkResult,advertiserResult]){
    if(result.error)throw new Error('TexasDefined billing dashboard could not be loaded.');
  }
  return {
    generatedAt:new Date().toISOString(),
    invoicingEnabled:process.env.TEXASDEFINED_INVOICING_ENABLED==='true',
    invoiceSendingEnabled:process.env.TEXASDEFINED_INVOICE_SENDING_ENABLED==='true',
    accounts:accountsResult.data||[],
    invoices:invoicesResult.data||[],
    invoiceItems:itemsResult.data||[],
    networkMemberships:networkResult.data||[],
    advertiserAgreements:advertiserResult.data||[],
  };
}

export async function createAdminManualDraftInvoice(accessKey:string,input:{
  billingAccountId:string;
  requestId:string;
  productFamily:'network'|'advertising'|'other';
  description:string;
  quantity:number;
  unitAmountCents:number;
  daysUntilDue:number;
  memo?:string;
}){
  await assertNetworkAdminAccess(accessKey);
  if(!uuid.test(input.billingAccountId)||!uuid.test(input.requestId))
    throw new Error('Invoice identity is invalid.');
  if(input.productFamily==='network'){
    // A manual Network line is accounting-only and never grants membership.
    // Recurring membership entitlement must still come from its verified subscription.
  }
  return createTexasDefinedDraftInvoice({
    billingAccountId:input.billingAccountId,
    dedupeKey:'admin-manual:'+input.requestId,
    daysUntilDue:input.daysUntilDue,
    memo:input.memo,
    createdBy:'TexasDefined billing admin',
    lines:[{
      productFamily:input.productFamily,
      sourceType:'manual',
      description:input.description,
      quantity:input.quantity,
      unitAmountCents:input.unitAmountCents,
    }],
  });
}

export async function sendAdminBillingInvoice(accessKey:string,localInvoiceId:string){
  await assertNetworkAdminAccess(accessKey);
  if(!uuid.test(localInvoiceId))throw new Error('Invoice identity is invalid.');
  return sendTexasDefinedInvoice(localInvoiceId);
}
