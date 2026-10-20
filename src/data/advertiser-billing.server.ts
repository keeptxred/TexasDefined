import { getAdvertiserTier } from '@/data/advertising-program';
import { assertNetworkAdminAccess } from '@/data/network-admin-access.server';
import {
  createTexasDefinedDraftInvoice,
  ensureAdvertiserBillingAccount,
  loadTexasDefinedBillingAccount,
} from '@/data/texasdefined-billing.server';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

const uuidPattern=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function listAdvertiserBillingAccounts(accessKey:string){
  await assertNetworkAdminAccess(accessKey);
  const client=supabaseAdmin as any;
  const {data,error}=await client
    .from('texasdefined_billing_accounts')
    .select('id,display_name,legal_name,billing_email,contact_email,website,source,stripe_customer_id,status')
    .eq('status','active')
    .order('display_name',{ascending:true})
    .limit(500);
  if(error)throw new Error('Billing accounts could not be loaded.');
  return (Array.isArray(data)?data:[]).map((row:any)=>({
    id:String(row.id),
    displayName:String(row.display_name),
    legalName:typeof row.legal_name==='string'?row.legal_name:null,
    billingEmail:String(row.billing_email),
    contactEmail:typeof row.contact_email==='string'?row.contact_email:null,
    website:typeof row.website==='string'?row.website:null,
    source:String(row.source),
    hasStripeCustomer:typeof row.stripe_customer_id==='string'&&row.stripe_customer_id.startsWith('cus_'),
  }));
}

export async function prepareAdvertiserDraftInvoice(accessKey:string,input:{
  agreementId:string;
  billingAccountId?:string|null;
  daysUntilDue?:number;
  acceptedBy?:string;
}){
  await assertNetworkAdminAccess(accessKey);
  if(!uuidPattern.test(input.agreementId))throw new Error('Advertiser agreement identity is invalid.');
  if(input.billingAccountId&&!uuidPattern.test(input.billingAccountId))throw new Error('Billing account identity is invalid.');

  const client=supabaseAdmin as any;
  const {data:agreement,error:agreementError}=await client
    .from('texasdefined_advertiser_agreements')
    .select('id,status,tier,billing_cycle,published_price_cents,business_name,billing_account_id,stripe_invoice_id,invoice_status,payment_status')
    .eq('id',input.agreementId)
    .maybeSingle();
  if(agreementError||!agreement?.id)throw new Error('Signed advertiser agreement was not found.');
  if(!['pending_publisher_acceptance','accepted'].includes(String(agreement.status)))
    throw new Error('This advertiser agreement is not eligible for billing.');
  if(typeof agreement.published_price_cents!=='number'||!Number.isSafeInteger(agreement.published_price_cents)||agreement.published_price_cents<=0)
    throw new Error('This advertiser agreement requires a confirmed invoice amount before billing.');

  if(typeof agreement.stripe_invoice_id==='string'&&agreement.stripe_invoice_id.startsWith('in_')){
    return {
      agreementId:String(agreement.id),
      billingAccountId:typeof agreement.billing_account_id==='string'?agreement.billing_account_id:null,
      stripeInvoiceId:agreement.stripe_invoice_id,
      invoiceStatus:String(agreement.invoice_status||'draft'),
      paymentStatus:String(agreement.payment_status||'pending'),
      reused:true,
    };
  }

  let billingAccount;
  if(input.billingAccountId){
    const {data:assigned,error:assignError}=await client.rpc('assign_texasdefined_advertiser_billing_account',{
      p_agreement_id:input.agreementId,
      p_billing_account_id:input.billingAccountId,
    });
    if(assignError||assigned!==true)throw new Error('Existing billing account could not be assigned.');
    billingAccount=await loadTexasDefinedBillingAccount(input.billingAccountId);
  }else{
    billingAccount=await ensureAdvertiserBillingAccount(input.agreementId);
  }

  const acceptedBy=(input.acceptedBy||'TexasDefined advertiser admin').trim();
  const {data:accepted,error:acceptError}=await client.rpc('accept_texasdefined_advertiser_agreement',{
    p_agreement_id:input.agreementId,
    p_publisher_accepted_by:acceptedBy,
  });
  if(acceptError||!['accepted','already_accepted'].includes(String(accepted)))
    throw new Error('Publisher acceptance could not be recorded.');

  const tier=getAdvertiserTier(String(agreement.tier) as 'local'|'growth'|'premier'|'custom');
  const billingCycle=String(agreement.billing_cycle) as 'monthly'|'annual';
  const invoice=await createTexasDefinedDraftInvoice({
    billingAccountId:billingAccount.billingAccountId,
    dedupeKey:'advertiser-agreement:'+input.agreementId,
    daysUntilDue:input.daysUntilDue??15,
    memo:'Texas Defined advertising order — '+tier.name,
    createdBy:acceptedBy,
    lines:[{
      productFamily:'advertising',
      sourceType:'advertiser_agreement',
      sourceId:input.agreementId,
      description:`${tier.name} advertising — ${billingCycle} billing`,
      quantity:1,
      unitAmountCents:agreement.published_price_cents,
    }],
  });

  const {error:updateError}=await client
    .from('texasdefined_advertiser_agreements')
    .update({
      billing_account_id:invoice.billingAccountId,
      stripe_customer_id:invoice.stripeCustomerId,
      stripe_invoice_id:invoice.stripeInvoiceId,
      invoice_status:'draft',
      payment_status:'pending',
    })
    .eq('id',input.agreementId);
  if(updateError)throw new Error('Advertiser invoice state could not be saved.');

  const {error:leadError}=await client
    .from('texasdefined_partner_inquiries')
    .update({status:'awaiting_payment'})
    .eq('advertiser_agreement_id',input.agreementId);
  if(leadError)throw new Error('Advertiser workflow could not be advanced to awaiting payment.');

  return {
    agreementId:input.agreementId,
    billingAccountId:invoice.billingAccountId,
    stripeCustomerId:invoice.stripeCustomerId,
    stripeInvoiceId:invoice.stripeInvoiceId,
    localInvoiceId:invoice.localInvoiceId,
    invoiceStatus:invoice.status,
    paymentStatus:'pending',
    reused:invoice.reused,
  };
}
