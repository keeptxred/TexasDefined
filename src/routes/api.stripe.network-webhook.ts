import { createFileRoute } from '@tanstack/react-router';
import { NETWORK_PLUS_PRICE, stripeRequest, verifyStripeSignature } from '@/data/network-stripe.server';

const respond=(status:number,body:string)=>new Response(body,{status,headers:{'Cache-Control':'no-store','Content-Type':'text/plain; charset=utf-8'}});
const subscriptionFrom=(object:Record<string,any>)=>{
 const id=object.subscription||object.parent?.subscription_details?.subscription||object.subscription_details?.subscription;
 return typeof id==='string'?id:typeof id?.id==='string'?id.id:null;
};

export const Route=createFileRoute('/api/stripe/network-webhook')({server:{handlers:{
 POST:async({request})=>{
  if(Number(request.headers.get('content-length')||0)>2_000_000)return respond(413,'Payload too large');
  const raw=await request.text();
  if(raw.length>2_000_000)return respond(413,'Payload too large');
  if(!(await verifyStripeSignature(raw,request.headers.get('stripe-signature'))))return respond(400,'Invalid signature');
  let event:Record<string,any>;
  try{event=JSON.parse(raw)}catch{return respond(400,'Invalid event')}
  if(typeof event.id!=='string'||typeof event.type!=='string'||!event.livemode)return respond(400,'Invalid event');
  const eventTypes=new Set(['checkout.session.completed','invoice.paid','invoice.payment_failed','customer.subscription.updated','customer.subscription.deleted']);
  if(!eventTypes.has(event.type))return respond(200,'Ignored');
  const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
  const ledger=supabaseAdmin.from('texasdefined_network_stripe_events');
  const {data:prior,error:readError}=await ledger.select('processed_at').eq('stripe_event_id',event.id).maybeSingle();
  if(readError)return respond(503,'Event verification temporarily unavailable');
  if(prior?.processed_at)return respond(200,'Already processed');
  if(!prior){const {error}=await ledger.insert({stripe_event_id:event.id,stripe_event_type:event.type} as never);if(error && error.code!=='23505')return respond(503,'Event recording unavailable')}
  try{
   const object=event.data?.object as Record<string,any> | undefined;
   if(!object || typeof object!=='object')throw Error('Missing event object');
   const subscriptionId=event.type.startsWith('customer.subscription.')?object.id:subscriptionFrom(object);
   if(typeof subscriptionId!=='string'||!subscriptionId.startsWith('sub_'))throw Error('Missing subscription');
   // Consult the canonical Stripe subscription rather than trusting event ordering or checkout return parameters.
   const subscription=await stripeRequest('/subscriptions/'+encodeURIComponent(subscriptionId));
   if(subscription.livemode!==true)throw Error('Wrong Stripe mode');
   const applicationId=subscription.metadata?.application_id;
   const prices=Array.isArray(subscription.items?.data)?subscription.items.data.map((x:any)=>x.price?.id):[];
   if(typeof applicationId!=='string'||!(/^[a-f0-9-]{36}$/i.test(applicationId))||!prices.includes(NETWORK_PLUS_PRICE))throw Error('Not a Network Plus subscription');
   const active=subscription.status==='active' && event.type!=='invoice.payment_failed' && event.type!=='customer.subscription.deleted';
   const customerId=typeof subscription.customer==='string'?subscription.customer:subscription.customer?.id;
   if(typeof customerId!=='string')throw Error('Missing Stripe customer');
   const {data,error}=await supabaseAdmin.from('texasdefined_network_applications').update({
     stripe_customer_id:customerId,stripe_subscription_id:subscriptionId,paid_entitlement_active:active,updated_at:new Date().toISOString()
   } as never).eq('id',applicationId).eq('plan','plus').select('id').maybeSingle();
   if(error||!data)throw Error('Network Plus application not found');
   const {error:doneError}=await ledger.update({processed_at:new Date().toISOString(),processing_error:null} as never).eq('stripe_event_id',event.id);
   if(doneError)throw Error('Cannot finalize event');
   return respond(200,'OK');
  }catch(err){
   const msg=err instanceof Error?err.message:'Unknown processing error';
   await ledger.update({processing_error:msg.slice(0,240)} as never).eq('stripe_event_id',event.id);
   console.error('[network billing] webhook processing failed:',msg);
   return respond(503,'Retry later');
  }
 }
}}});
