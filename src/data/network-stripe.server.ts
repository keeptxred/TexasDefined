/** Server-only Stripe API helpers. Never import into a browser route component. */
export const NETWORK_PLUS_PRICE = 'price_1UP28XLtRurj6GMNwFlYDW6N';
const stripeBase='https://api.stripe.com/v1';
export async function stripeRequest(path:string,init:RequestInit={}) {
 const key=process.env.STRIPE_SECRET_KEY;
 if(!key||!key.startsWith('sk_live_')) throw new Error('Live Stripe server secret is not configured');
 const response=await fetch(stripeBase+path,{...init,headers:{Authorization:'Bearer '+key,...(init.headers||{})}});
 const json=await response.json() as Record<string,any>;
 if(!response.ok)throw new Error('Stripe API unavailable: '+response.status);
 return json;
}
export function stripeCheckoutEnabled() {
 return process.env.NETWORK_CHECKOUT_ENABLED==='true' && !!process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_live_');
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
 if(!isNetworkCheckoutUrl(result.url)||typeof result.id!=='string'||!/^cs_live_[a-zA-Z0-9_]+$/.test(result.id)
   ||typeof result.expires_at!=='number'||!Number.isSafeInteger(result.expires_at)
   ||result.expires_at<Math.floor(Date.now()/1000)+60)throw new Error('Stripe Checkout session unavailable');
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
