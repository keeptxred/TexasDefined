/** Server-only Stripe API helpers. Never import into a browser route component. */
import {getNetworkStripeRuntime,networkStripeExpectedLivemode,networkStripeWebhookSecret,NETWORK_PLUS_LIVE_PRICE,type NetworkStripeRuntime} from './network-stripe-mode.server.ts';
export const NETWORK_PLUS_PRICE = NETWORK_PLUS_LIVE_PRICE;
const stripeBase='https://api.stripe.com/v1';
export async function stripeRequest(path:string,init:RequestInit={}) {
 const runtime=getNetworkStripeRuntime();
 if(!runtime) throw new Error('Stripe server secret or isolated test environment is not configured');
 const key=runtime.secret;
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
 const runtime=getNetworkStripeRuntime();
 const key=runtime?.secret;
 if(!key||!/^sub_[A-Za-z0-9_]+$/.test(subscriptionId))
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
 return process.env.NETWORK_CHECKOUT_ENABLED==='true' && getNetworkStripeRuntime()!==null;
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
 const signingSecret=networkStripeWebhookSecret();
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

/** Validate the ENTIRE Stripe portal-session response before returning its bearer URL.
 * A Stripe-hosted URL alone is not proof the session belongs to this business.
 * The server route supplies the exact verified customer and runtime context.
 */
export function isExpectedNetworkBillingPortalSession(
 result:unknown,
 expectedCustomer:unknown,
 runtime: Pick<NetworkStripeRuntime,'livemode'|'siteOrigin'>,
):result is {url:string} {
 if(!result||typeof result!=='object'||Array.isArray(result)||
    typeof expectedCustomer!=='string'||!/^cus_[A-Za-z0-9_]+$/.test(expectedCustomer))return false;
 const session=result as Record<string,unknown>;
 return session.object==='billing_portal.session'
  && typeof session.id==='string' && /^bps_[A-Za-z0-9_]+$/.test(session.id)
  && session.customer===expectedCustomer
  && session.livemode===runtime.livemode
  && session.return_url===runtime.siteOrigin+'/network/billing'
  && isNetworkBillingPortalUrl(session.url);
}

export function isNetworkCheckoutUrl(url:unknown):url is string {
 if(typeof url!=='string')return false;
 try {const target=new URL(url);return target.protocol==='https:'&&target.hostname==='checkout.stripe.com'&&target.username===''&&target.password==='';}
 catch{return false}
}
export async function createNetworkCheckoutSession(
 applicationId:string,attemptKey:string,stripeCustomerId:string,billingAccountId:string
) {
 if(!/^[0-9a-f-]{36}$/i.test(applicationId)||!/^[0-9a-f-]{36}$/i.test(attemptKey)||
   !/^cus_[A-Za-z0-9_]+$/.test(stripeCustomerId)||!/^[0-9a-f-]{36}$/i.test(billingAccountId))
  throw Error('Invalid reserved checkout attempt');

 if(!stripeCheckoutEnabled())throw new Error('Network billing is not activated');
 const runtime=getNetworkStripeRuntime();
 if(!runtime)throw new Error('Network Stripe mode is not configured');
 const params=new URLSearchParams({
  mode:'subscription',
  'line_items[0][price]':runtime.priceId,
  'line_items[0][quantity]':'1',
  customer:stripeCustomerId,
  client_reference_id:applicationId,
  'metadata[application_id]':applicationId,
  'metadata[billing_account_id]':billingAccountId,
  'subscription_data[metadata][application_id]':applicationId,
  'subscription_data[metadata][billing_account_id]':billingAccountId,
  'subscription_data[metadata][project]':'TexasDefined',
  success_url:runtime.siteOrigin+'/network/checkout-return?session_id={CHECKOUT_SESSION_ID}',
  cancel_url:runtime.siteOrigin+'/network/billing?checkout=cancelled',
  billing_address_collection:'auto',
 });
 const result=await stripeRequest('/checkout/sessions',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Idempotency-Key':'network-plus-'+applicationId+'-'+attemptKey},body:params});
 // Stripe's creation response must belong to this exact reviewed application.
 // Never finalize an unrelated/test-mode/payment-only Session just because the
 // response carries a plausible Stripe-hosted URL and a cs_live_ identifier.
 if(result.object!=='checkout.session'||result.livemode!==runtime.livemode||
   result.mode!=='subscription'||result.status!=='open'||
   result.client_reference_id!==applicationId||
   result.metadata?.application_id!==applicationId||
   result.metadata?.billing_account_id!==billingAccountId||
   result.customer!==stripeCustomerId||
   !isNetworkCheckoutUrl(result.url)||typeof result.id!=='string'||
   !(runtime.livemode?/^cs_live_[a-zA-Z0-9_]+$/:/^cs_test_[a-zA-Z0-9_]+$/).test(result.id)||
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

/** A verified subscription with an unsupported price can revoke only its
 * OWN existing binding. It must never create a new business/Stripe binding.
 * Current subscription metadata is still required to identify the app.
 */
export function isBoundNetworkSubscriptionPriceMismatch(
 subscription:Record<string,any>,
 existing:{stripe_subscription_id?:unknown;stripe_customer_id?:unknown;plan?:unknown}|null,
):boolean {
 if(!existing || existing.plan!=='plus' || !isNetworkSubscriptionIdentity(subscription))
  return false;
 return existing.stripe_subscription_id===subscription.id
  && existing.stripe_customer_id===subscription.customer
  && !isExpectedNetworkPlusSubscription(subscription);
}
/** Identity only, NOT proof of current Plus price or paid entitlement. */
export function isNetworkSubscriptionIdentity(subscription:Record<string,any>):boolean {
 const expectedMode=networkStripeExpectedLivemode();
 return !!subscription && expectedMode!==null
  && subscription.livemode===expectedMode
  && typeof subscription.id==='string' && /^sub_[A-Za-z0-9_]+$/.test(subscription.id)
  && typeof subscription.customer==='string' && /^cus_[A-Za-z0-9_]+$/.test(subscription.customer)
  && subscription.metadata?.project==='TexasDefined'
  && typeof subscription.metadata?.application_id==='string'
  && /^[0-9a-f-]{36}$/i.test(subscription.metadata.application_id)
  && typeof subscription.metadata?.billing_account_id==='string'
  && /^[0-9a-f-]{36}$/i.test(subscription.metadata.billing_account_id);
}

/** Inspected subscription must describe exactly one approved $19.99 Plus line item. */
export function isExpectedNetworkPlusSubscription(subscription: Record<string,any>):boolean {
 const items=subscription.items?.data;
 const expectedMode=networkStripeExpectedLivemode();
 const expectedPrice=expectedMode===true?NETWORK_PLUS_PRICE:getNetworkStripeRuntime()?.priceId;
 return expectedMode!==null && subscription.livemode===expectedMode
  && typeof subscription.id==='string' && /^sub_[A-Za-z0-9_]+$/.test(subscription.id)
  && typeof subscription.customer==='string' && /^cus_[A-Za-z0-9_]+$/.test(subscription.customer)
  && subscription.metadata?.project==='TexasDefined'
  && typeof subscription.metadata?.application_id==='string'
  && /^[0-9a-f-]{36}$/i.test(subscription.metadata.application_id)
  && typeof subscription.metadata?.billing_account_id==='string'
  && /^[0-9a-f-]{36}$/i.test(subscription.metadata.billing_account_id)
  && Array.isArray(items) && items.length===1
  && items[0]?.price?.id===expectedPrice
  && items[0]?.quantity===1;
}
