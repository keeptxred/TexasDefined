/** Server-only Stripe API helpers. Never import into a browser route component. */
export const NETWORK_PLUS_PRICE = 'price_1UP28XLtRurj6GMNwFlYDW6N';
const stripeBase='https://api.stripe.com/v1';
export async function stripeRequest(path:string,init:RequestInit={}) {
 const key=process.env.STRIPE_SECRET_KEY;
 if(!key||!key.startsWith('sk_live_')) throw new Error('Live Stripe server secret is not configured');
 // Bound external Stripe POSTs as well as webhook subscription reads.
 // Preserve the caller's stable idempotency key; an uncertain outcome must
 // never be retried with a different key without DB attempt reconciliation.
 const response=await fetch(stripeBase+path,{
  ...init,
  signal:AbortSignal.timeout(12_000),
  headers:{...(init.headers||{}),Authorization:'Bearer '+key},
 });
 if(!response.ok)throw new Error('Stripe API unavailable: '+response.status);
 const json=await response.json() as Record<string,any>;
 if(!json||typeof json!=='object'||Array.isArray(json))
  throw new Error('Malformed Stripe API response');
 return json;
}
/** Current subscription read for verified webhook processing. Always fail closed.
 * The caller acknowledges the webhook only after this read and DB reconciliation. */
export async function readNetworkCurrentStripeSubscription(subscriptionId: string): Promise<Record<string,any>> {
 const key=process.env.STRIPE_SECRET_KEY;
 if(!key?.startsWith('sk_live_')||!/^sub_[A-Za-z0-9_]+$/.test(subscriptionId))
  throw new Error('Stripe subscription verification unavailable');
 const response=await fetch(stripeBase+'/subscriptions/'+encodeURIComponent(subscriptionId),{
  headers:{Authorization:'Bearer '+key},
  signal:AbortSignal.timeout(12_000),
 });
 if(!response.ok)throw new Error('Stripe subscription verification unavailable');
 const parsed=await response.json();
 if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))
  throw new Error('Malformed Stripe subscription response');
 return parsed as Record<string,any>;
}

export function stripeCheckoutEnabled() {
 return process.env.NETWORK_CHECKOUT_ENABLED==='true' && !!process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_live_');
}
/** Hard cap on untrusted webhook requests BEFORE signature verification.
 * A signed event never requires an unbounded read in the Worker runtime.
 */
export const NETWORK_WEBHOOK_MAX_BYTES=1_048_576;
export async function readNetworkWebhookPayload(request:Request):Promise<string|null>{
 const advertised=request.headers.get('content-length');
 if(advertised!==null&&/^\d+$/.test(advertised)&&Number(advertised)>NETWORK_WEBHOOK_MAX_BYTES)return null;
 if(!request.body)return '';
 const reader=request.body.getReader();
 const chunks:Uint8Array[]=[];
 let bytes=0;
 try{
  while(true){
   const part=await reader.read();
   if(part.done)break;
   bytes+=part.value.byteLength;
   if(bytes>NETWORK_WEBHOOK_MAX_BYTES){
    await reader.cancel().catch(()=>{});
    return null;
   }
   chunks.push(part.value);
  }
  const buffer=new Uint8Array(bytes);
  let offset=0;
  for(const chunk of chunks){buffer.set(chunk,offset);offset+=chunk.byteLength}
  return new TextDecoder('utf-8',{fatal:true}).decode(buffer);
 }catch{
  await reader.cancel().catch(()=>{});
  return null;
 }
}
export async function verifyStripeSignature(raw:string,header:string|null) {
 const signingSecret=process.env.STRIPE_WEBHOOK_SECRET;
 if(!signingSecret || !header)return false;
 const chunks=header.split(',').map(x=>x.trim().split('='));
 const timestamp=chunks.find(x=>x[0]==='t')?.[1];
 const candidate=chunks.filter(x=>x[0]==='v1').map(x=>x[1]);
 if(!timestamp||!candidate.length||!/^[0-9]+$/.test(timestamp))return false;
 if(Math.abs(Math.floor(Date.now()/1000)-Number(timestamp))>300)return false;
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(signingSecret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const expected=new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(timestamp+'.'+raw)));
 return candidate.some(hex=>{if(!/^[0-9a-f]{64}$/i.test(hex))return false;let difference=0;for(let i=0;i<32;i++)difference|=expected[i]^Number.parseInt(hex.slice(i*2,i*2+2),16);return difference===0});
}

/** A returned customer portal location must be the Stripe-owned HTTPS origin. */
export function isNetworkBillingPortalUrl(url:unknown):url is string {
 if(typeof url!=='string')return false;
 try{
  const destination=new URL(url);
  return destination.protocol==='https:'
   && destination.hostname==='billing.stripe.com'
   && destination.username==='' && destination.password===''
   && destination.hash==='';
 }catch{return false}
}

export function isNetworkCheckoutUrl(url:unknown):url is string {
 if(typeof url!=='string')return false;
 try {const target=new URL(url);return target.protocol==='https:'&&target.hostname==='checkout.stripe.com'&&target.username===''&&target.password==='';}
 catch{return false}
}
export async function createNetworkCheckoutSession(applicationId:string,email:string,attemptKey:string) {
 if(!/^[0-9a-f-]{36}$/i.test(applicationId)||!/^[0-9a-f-]{36}$/i.test(attemptKey))throw Error('Invalid reserved checkout attempt');

 if(!stripeCheckoutEnabled())throw new Error('Network billing is not activated');
 const params=new URLSearchParams({
  mode:'subscription',
  'line_items[0][price]':NETWORK_PLUS_PRICE,
  'line_items[0][quantity]':'1',
  customer_email:email,
  client_reference_id:applicationId,
  'metadata[application_id]':applicationId,
  'subscription_data[metadata][application_id]':applicationId,
  'subscription_data[metadata][project]':'TexasDefined',
  success_url:'https://texasdefined.com/network/checkout-return?session_id={CHECKOUT_SESSION_ID}',
  cancel_url:'https://texasdefined.com/network/billing?checkout=cancelled',
  billing_address_collection:'auto',
 });
 const result=await stripeRequest('/checkout/sessions',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Idempotency-Key':'network-plus-'+applicationId+'-'+attemptKey},body:params});
 // Stripe's creation response must belong to this exact reviewed application.
 // Never finalize an unrelated/test-mode/payment-only Session just because the
 // response carries a plausible Stripe-hosted URL and a cs_live_ identifier.
 if(result.object!=='checkout.session'||result.livemode!==true||
   result.mode!=='subscription'||result.status!=='open'||
   result.client_reference_id!==applicationId||
   result.metadata?.application_id!==applicationId||
   typeof result.customer_email!=='string'||
   result.customer_email.trim().toLowerCase()!==email.trim().toLowerCase()||
   !isNetworkCheckoutUrl(result.url)||typeof result.id!=='string'||!/^cs_live_[a-zA-Z0-9_]+$/.test(result.id)||
   typeof result.expires_at!=='number'||!Number.isSafeInteger(result.expires_at)||
   result.expires_at<Math.floor(Date.now()/1000)+60)
  throw new Error('Stripe Checkout session unavailable');
 return {url:result.url as string,sessionId:result.id as string,expiresAt:result.expires_at as number};
}

/** Bound a verified live Stripe subscription to its ORIGINAL Network business account. */
export function verifiedNetworkSubscriptionOwnership(
 subscription: { id?: unknown; customer?: unknown },
 existing: { stripe_subscription_id?: string | null; stripe_customer_id?: string | null },
): boolean {
 return typeof subscription.id === 'string'
  && typeof subscription.customer === 'string'
  && subscription.customer.length > 0
  && (!existing.stripe_subscription_id || existing.stripe_subscription_id === subscription.id)
  && (!existing.stripe_customer_id || existing.stripe_customer_id === subscription.customer);
}

/** Inspected subscription must describe exactly one approved $19.99 Plus line item. */
export function isExpectedNetworkPlusSubscription(subscription: Record<string,any>):boolean {
 const items=subscription.items?.data;
 return subscription.livemode===true
  && typeof subscription.id==='string' && /^sub_[A-Za-z0-9_]+$/.test(subscription.id)
  && typeof subscription.customer==='string' && /^cus_[A-Za-z0-9_]+$/.test(subscription.customer)
  && subscription.metadata?.project==='TexasDefined'
  && typeof subscription.metadata?.application_id==='string'
  && /^[0-9a-f-]{36}$/i.test(subscription.metadata.application_id)
  && Array.isArray(items) && items.length===1
  && items[0]?.price?.id===NETWORK_PLUS_PRICE
  && items[0]?.quantity===1;
}
