import { getNetworkStripeRuntime } from '@/data/network-stripe-mode.server';
import { stripeRequest } from '@/data/network-stripe.server';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

export type TexasDefinedBillingAccount = {
  billingAccountId: string;
  stripeCustomerId: string | null;
  billingEmail: string;
  displayName: string;
};

export type TexasDefinedInvoiceLine = {
  productFamily: 'network' | 'advertising' | 'other';
  sourceType: 'network_membership' | 'advertiser_agreement' | 'advertising_campaign' | 'manual';
  sourceId?: string | null;
  description: string;
  quantity?: number;
  unitAmountCents: number;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const customerPattern = /^cus_[A-Za-z0-9_]+$/;

function parseBillingAccount(value: unknown): TexasDefinedBillingAccount {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Billing account response is invalid.');
  }
  const record = value as Record<string, unknown>;
  if (
    typeof record.billingAccountId !== 'string' || !uuidPattern.test(record.billingAccountId) ||
    typeof record.billingEmail !== 'string' ||
    typeof record.displayName !== 'string' ||
    (record.stripeCustomerId !== null && record.stripeCustomerId !== undefined &&
      (typeof record.stripeCustomerId !== 'string' || !customerPattern.test(record.stripeCustomerId)))
  ) {
    throw new Error('Billing account response is invalid.');
  }
  return {
    billingAccountId: record.billingAccountId,
    stripeCustomerId: typeof record.stripeCustomerId === 'string' ? record.stripeCustomerId : null,
    billingEmail: record.billingEmail,
    displayName: record.displayName,
  };
}

export async function ensureNetworkBillingAccount(applicationId: string, ownerUserId: string) {
  if (!uuidPattern.test(applicationId) || !uuidPattern.test(ownerUserId)) {
    throw new Error('Billing account identity is invalid.');
  }
  const client = supabaseAdmin as any;
  const { data, error } = await client.rpc('ensure_texasdefined_network_billing_account', {
    p_application_id: applicationId,
    p_owner_user_id: ownerUserId,
  });
  if (error) throw new Error(error.message || 'Billing account could not be prepared.');
  return parseBillingAccount(data);
}

export async function ensureAdvertiserBillingAccount(agreementId: string) {
  if (!uuidPattern.test(agreementId)) throw new Error('Advertiser agreement identity is invalid.');
  const client = supabaseAdmin as any;
  const { data, error } = await client.rpc('ensure_texasdefined_advertiser_billing_account', {
    p_agreement_id: agreementId,
  });
  if (error) throw new Error(error.message || 'Billing account could not be prepared.');
  return parseBillingAccount(data);
}

export async function loadTexasDefinedBillingAccount(billingAccountId: string) {
  if (!uuidPattern.test(billingAccountId)) throw new Error('Billing account identity is invalid.');
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_billing_accounts')
    .select('id,display_name,billing_email,stripe_customer_id,status')
    .eq('id', billingAccountId)
    .maybeSingle();
  if (error || !data || data.status !== 'active') throw new Error('Billing account is unavailable.');
  return parseBillingAccount({
    billingAccountId: data.id,
    stripeCustomerId: data.stripe_customer_id,
    billingEmail: data.billing_email,
    displayName: data.display_name,
  });
}

export async function ensureTexasDefinedStripeCustomer(
  account: TexasDefinedBillingAccount,
  source: 'network' | 'advertising' | 'admin',
) {
  if (account.stripeCustomerId) {
    const client = supabaseAdmin as any;
    const { data: rebound, error: reboundError } = await client.rpc('bind_texasdefined_billing_stripe_customer', {
      p_billing_account_id: account.billingAccountId,
      p_stripe_customer_id: account.stripeCustomerId,
    });
    if (reboundError || rebound !== true) throw new Error('Stripe customer binding could not be verified.');
    return account.stripeCustomerId;
  }
  const runtime = getNetworkStripeRuntime();
  if (!runtime) throw new Error('Stripe billing is not configured.');

  const body = new URLSearchParams({
    name: account.displayName,
    email: account.billingEmail,
    'metadata[project]': 'TexasDefined',
    'metadata[billing_account_id]': account.billingAccountId,
    'metadata[source]': source,
  });
  const result = await stripeRequest('/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Idempotency-Key': 'texasdefined-billing-account-' + account.billingAccountId,
    },
    body,
  });
  if (
    result.object !== 'customer' ||
    typeof result.id !== 'string' ||
    !customerPattern.test(result.id) ||
    result.livemode !== runtime.livemode ||
    result.metadata?.billing_account_id !== account.billingAccountId ||
    result.metadata?.project !== 'TexasDefined'
  ) {
    throw new Error('Stripe customer creation could not be verified.');
  }

  const client = supabaseAdmin as any;
  const { data: bound, error } = await client.rpc('bind_texasdefined_billing_stripe_customer', {
    p_billing_account_id: account.billingAccountId,
    p_stripe_customer_id: result.id,
  });
  if (error || bound !== true) throw new Error('Stripe customer could not be bound to the billing account.');
  return result.id as string;
}

function normalizeInvoiceLines(lines: TexasDefinedInvoiceLine[]) {
  if (!Array.isArray(lines) || lines.length < 1 || lines.length > 50) {
    throw new Error('An invoice must contain between 1 and 50 line items.');
  }
  return lines.map((line) => {
    const quantity = line.quantity ?? 1;
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 1000) {
      throw new Error('Invoice line quantity is invalid.');
    }
    if (!Number.isSafeInteger(line.unitAmountCents) || Math.abs(line.unitAmountCents) > 100_000_000) {
      throw new Error('Invoice line amount is invalid.');
    }
    const description = line.description.trim();
    if (!description || description.length > 500) throw new Error('Invoice line description is invalid.');
    if (line.sourceId && !uuidPattern.test(line.sourceId)) throw new Error('Invoice line source is invalid.');
    return { ...line, quantity, description };
  });
}

export async function createTexasDefinedDraftInvoice(input: {
  billingAccountId: string;
  lines: TexasDefinedInvoiceLine[];
  daysUntilDue?: number;
  memo?: string;
  createdBy?: string;
  dedupeKey: string;
}) {
  if (process.env.TEXASDEFINED_INVOICING_ENABLED !== 'true') {
    throw new Error('TexasDefined invoicing is not activated.');
  }
  const daysUntilDue = input.daysUntilDue ?? 15;
  if (!Number.isSafeInteger(daysUntilDue) || daysUntilDue < 0 || daysUntilDue > 90) {
    throw new Error('Invoice payment terms are invalid.');
  }
  const dedupeKey = input.dedupeKey.trim();
  if (dedupeKey.length < 8 || dedupeKey.length > 200 || !/^[A-Za-z0-9:_-]+$/.test(dedupeKey)) {
    throw new Error('Invoice idempotency key is invalid.');
  }
  const lines = normalizeInvoiceLines(input.lines);
  const account = await loadTexasDefinedBillingAccount(input.billingAccountId);
  const stripeCustomerId = await ensureTexasDefinedStripeCustomer(account, 'admin');
  const client = supabaseAdmin as any;

  let { data: localInvoice, error: localError } = await client
    .from('texasdefined_billing_invoices')
    .insert({
      billing_account_id: account.billingAccountId,
      dedupe_key: dedupeKey,
      status: 'draft',
      collection_method: 'send_invoice',
      currency: 'usd',
      days_until_due: daysUntilDue,
      memo: input.memo?.trim() || null,
      created_by: input.createdBy?.trim() || 'texasdefined-admin',
      metadata: {
        product_families: [...new Set(lines.map((line) => line.productFamily))],
      },
    })
    .select('id,stripe_invoice_id,status')
    .maybeSingle();

  if (localError) {
    const retry = await client
      .from('texasdefined_billing_invoices')
      .select('id,stripe_invoice_id,status,billing_account_id')
      .eq('dedupe_key', dedupeKey)
      .maybeSingle();
    if (retry.error || !retry.data?.id || retry.data.billing_account_id !== account.billingAccountId) {
      throw new Error('Local invoice reservation could not be created.');
    }
    localInvoice = retry.data;
    localError = null;
  }
  if (!localInvoice?.id) throw new Error('Local invoice reservation could not be created.');
  if (typeof localInvoice.stripe_invoice_id === 'string' && /^in_[A-Za-z0-9_]+$/.test(localInvoice.stripe_invoice_id)) {
    return {
      billingAccountId: account.billingAccountId,
      stripeCustomerId,
      localInvoiceId: String(localInvoice.id),
      stripeInvoiceId: localInvoice.stripe_invoice_id,
      status: String(localInvoice.status || 'draft'),
      reused: true,
    };
  }

  const invoiceBody = new URLSearchParams({
    customer: stripeCustomerId,
    collection_method: 'send_invoice',
    days_until_due: String(daysUntilDue),
    auto_advance: 'false',
    'metadata[project]': 'TexasDefined',
    'metadata[billing_account_id]': account.billingAccountId,
    'metadata[local_invoice_id]': String(localInvoice.id),
  });
  if (input.memo?.trim()) invoiceBody.set('description', input.memo.trim());

  const invoice = await stripeRequest('/invoices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Idempotency-Key': 'texasdefined-invoice-' + String(localInvoice.id),
    },
    body: invoiceBody,
  });
  const runtime = getNetworkStripeRuntime();
  if (
    !runtime || invoice.object !== 'invoice' || invoice.livemode !== runtime.livemode ||
    typeof invoice.id !== 'string' || !/^in_[A-Za-z0-9_]+$/.test(invoice.id) ||
    invoice.customer !== stripeCustomerId ||
    invoice.metadata?.billing_account_id !== account.billingAccountId ||
    invoice.metadata?.local_invoice_id !== String(localInvoice.id)
  ) {
    throw new Error('Stripe draft invoice could not be verified.');
  }

  const { error: invoiceUpdateError } = await client
    .from('texasdefined_billing_invoices')
    .update({
      stripe_invoice_id: invoice.id,
      status: invoice.status || 'draft',
      invoice_number: invoice.number || null,
      amount_due_cents: Number(invoice.amount_due || 0),
      amount_paid_cents: Number(invoice.amount_paid || 0),
      amount_remaining_cents: Number(invoice.amount_remaining || 0),
      updated_at: new Date().toISOString(),
    })
    .eq('id', localInvoice.id);
  if (invoiceUpdateError) throw new Error('Stripe invoice could not be linked locally.');

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const totalAmount = line.unitAmountCents * line.quantity;
    const itemBody = new URLSearchParams({
      customer: stripeCustomerId,
      invoice: invoice.id,
      amount: String(totalAmount),
      currency: 'usd',
      description: line.description,
      'metadata[project]': 'TexasDefined',
      'metadata[billing_account_id]': account.billingAccountId,
      'metadata[local_invoice_id]': String(localInvoice.id),
      'metadata[product_family]': line.productFamily,
      'metadata[source_type]': line.sourceType,
    });
    if (line.sourceId) itemBody.set('metadata[source_id]', line.sourceId);

    const stripeItem = await stripeRequest('/invoiceitems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Idempotency-Key': 'texasdefined-invoice-item-' + String(localInvoice.id) + '-' + index,
      },
      body: itemBody,
    });
    if (
      stripeItem.object !== 'invoiceitem' || typeof stripeItem.id !== 'string' ||
      !/^ii_[A-Za-z0-9_]+$/.test(stripeItem.id) ||
      stripeItem.invoice !== invoice.id || stripeItem.customer !== stripeCustomerId
    ) {
      throw new Error('Stripe invoice line could not be verified.');
    }
    const { error: itemError } = await client.from('texasdefined_billing_invoice_items').upsert({
      invoice_id: localInvoice.id,
      stripe_invoice_item_id: stripeItem.id,
      product_family: line.productFamily,
      source_type: line.sourceType,
      source_id: line.sourceId || null,
      description: line.description,
      quantity: line.quantity,
      unit_amount_cents: line.unitAmountCents,
      metadata: {},
    }, { onConflict: 'stripe_invoice_item_id', ignoreDuplicates: true });
    if (itemError) throw new Error('Stripe invoice line could not be linked locally.');
  }

  const refreshed = await stripeRequest('/invoices/' + encodeURIComponent(String(invoice.id)));
  if (
    refreshed.object !== 'invoice' || refreshed.id !== invoice.id ||
    refreshed.customer !== stripeCustomerId || refreshed.livemode !== runtime.livemode
  ) throw new Error('Stripe invoice could not be reverified after line creation.');

  const { error: totalsError } = await client
    .from('texasdefined_billing_invoices')
    .update({
      status: refreshed.status || 'draft',
      invoice_number: refreshed.number || null,
      amount_due_cents: Number(refreshed.amount_due || 0),
      amount_paid_cents: Number(refreshed.amount_paid || 0),
      amount_remaining_cents: Number(refreshed.amount_remaining || 0),
      updated_at: new Date().toISOString(),
    })
    .eq('id', localInvoice.id);
  if (totalsError) throw new Error('Invoice totals could not be reconciled locally.');

  return {
    billingAccountId: account.billingAccountId,
    stripeCustomerId,
    localInvoiceId: String(localInvoice.id),
    stripeInvoiceId: String(invoice.id),
    status: String(refreshed.status || 'draft'),
    reused: false,
  };
}


export async function readTexasDefinedCurrentInvoice(invoiceId:string) {
  if (!/^in_[A-Za-z0-9_]+$/.test(invoiceId)) throw new Error('Stripe invoice verification unavailable.');
  const runtime=getNetworkStripeRuntime();
  if(!runtime)throw new Error('Stripe invoice verification unavailable.');
  const invoice=await stripeRequest('/invoices/'+encodeURIComponent(invoiceId));
  if (
    invoice.object!=='invoice' || invoice.id!==invoiceId || invoice.livemode!==runtime.livemode ||
    typeof invoice.customer!=='string' || !/^cus_[A-Za-z0-9_]+$/.test(invoice.customer) ||
    invoice.metadata?.project!=='TexasDefined' ||
    typeof invoice.metadata?.billing_account_id!=='string' || !uuidPattern.test(invoice.metadata.billing_account_id) ||
    typeof invoice.metadata?.local_invoice_id!=='string' || !uuidPattern.test(invoice.metadata.local_invoice_id) ||
    !['draft','open','paid','void','uncollectible'].includes(String(invoice.status))
  ) throw new Error('Stripe invoice verification unavailable.');
  for(const amount of [invoice.amount_due,invoice.amount_paid,invoice.amount_remaining]){
    if(typeof amount!=='number'||!Number.isSafeInteger(amount)||amount<0)
      throw new Error('Stripe invoice verification unavailable.');
  }
  return invoice as Record<string,any>;
}

export async function sendTexasDefinedInvoice(localInvoiceId:string) {
  if(process.env.TEXASDEFINED_INVOICE_SENDING_ENABLED!=='true')
    throw new Error('TexasDefined invoice sending is not activated.');
  if(!uuidPattern.test(localInvoiceId))throw new Error('Invoice identity is invalid.');
  const client=supabaseAdmin as any;
  const {data:local,error}=await client
    .from('texasdefined_billing_invoices')
    .select('id,stripe_invoice_id,status,billing_account_id')
    .eq('id',localInvoiceId).maybeSingle();
  if(error||!local?.id||typeof local.stripe_invoice_id!=='string')
    throw new Error('Draft invoice was not found.');
  if(local.status!=='draft')throw new Error('Only a draft invoice can be sent.');

  const finalized=await stripeRequest('/invoices/'+encodeURIComponent(local.stripe_invoice_id)+'/finalize',{
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
      'Idempotency-Key':'texasdefined-finalize-invoice-'+localInvoiceId,
    },
    body:new URLSearchParams({auto_advance:'false'}),
  });
  if(finalized.object!=='invoice'||finalized.id!==local.stripe_invoice_id||finalized.status!=='open')
    throw new Error('Stripe invoice could not be finalized.');

  const sent=await stripeRequest('/invoices/'+encodeURIComponent(local.stripe_invoice_id)+'/send',{
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
      'Idempotency-Key':'texasdefined-send-invoice-'+localInvoiceId,
    },
    body:new URLSearchParams(),
  });
  if(sent.object!=='invoice'||sent.id!==local.stripe_invoice_id||sent.status!=='open')
    throw new Error('Stripe invoice could not be sent.');

  const {error:updateError}=await client.from('texasdefined_billing_invoices').update({
    status:'open',
    invoice_number:sent.number||null,
    amount_due_cents:Number(sent.amount_due||0),
    amount_paid_cents:Number(sent.amount_paid||0),
    amount_remaining_cents:Number(sent.amount_remaining||0),
    due_at:typeof sent.due_date==='number'?new Date(sent.due_date*1000).toISOString():null,
    updated_at:new Date().toISOString(),
  }).eq('id',localInvoiceId);
  if(updateError)throw new Error('Sent invoice state could not be saved locally.');
  return {
    localInvoiceId,
    stripeInvoiceId:String(sent.id),
    status:'open',
    hostedInvoiceUrl:typeof sent.hosted_invoice_url==='string'?sent.hosted_invoice_url:null,
  };
}
