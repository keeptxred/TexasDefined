/** Strict, opt-in Stripe test mode. Never enable against the shared TexasDefined Supabase.
 * Production remains live-mode-only, with unchanged price and origin.
 */
export const NETWORK_PLUS_LIVE_PRICE='price_1UP28XLtRurj6GMNwFlYDW6N';
export type NetworkStripeRuntime={livemode:boolean;secret:string;priceId:string;siteOrigin:string};
export function getNetworkStripeRuntime():NetworkStripeRuntime|null {
 const mode=process.env.NETWORK_STRIPE_MODE||'live';
 const secret=process.env.STRIPE_SECRET_KEY||'';
 if(mode==='live')return secret.startsWith('sk_live_')
   ? {livemode:true,secret,priceId:NETWORK_PLUS_LIVE_PRICE,siteOrigin:'https://texasdefined.com'} : null;
 if(mode!=='test' || process.env.NETWORK_STRIPE_TEST_MODE_ENABLED!=='true'
   || process.env.NETWORK_ISOLATED_STAGING!=='true' || !secret.startsWith('sk_test_'))
   return null;
 // A test endpoint may never operate on this project's shared production DB.
 const database=process.env.SUPABASE_URL||'';
 let db:URL,origin:URL;
 try {db=new URL(database);origin=new URL(process.env.NETWORK_STAGE_ORIGIN||'');}catch{return null}
 if(database.includes('ftkznprjljkhymknvhye') ||
    !['https:','http:'].includes(db.protocol) ||
    (db.protocol==='http:'&&!['localhost','127.0.0.1'].includes(db.hostname)) ||
    (origin.protocol!=='https:' && !(origin.protocol==='http:'&&['localhost','127.0.0.1'].includes(origin.hostname))) ||
    ['texasdefined.com','www.texasdefined.com'].includes(origin.hostname) ||
    origin.username || origin.password || origin.search || origin.hash || origin.pathname!=='/' ||
    !origin.hostname || !db.hostname) return null;
 const priceId=process.env.NETWORK_STRIPE_TEST_PRICE_ID||'';
 if(!/^price_[A-Za-z0-9]+$/.test(priceId)||priceId===NETWORK_PLUS_LIVE_PRICE)return null;
 return {livemode:false,secret,priceId,siteOrigin:origin.origin};
}
export function networkStripeHostAllowed(request:Request):boolean {
 const mode=process.env.NETWORK_STRIPE_MODE||'live';
 const config=getNetworkStripeRuntime();
 // A copied live Stripe secret must never open real billing on a preview host.
 // Production Checkout and webhooks are pinned to the canonical HTTPS origin.
 if(!config)return false;
 if(mode==='live' && !config.livemode)return false;
 if(mode==='test' && config.livemode)return false;
 try{return new URL(request.url).origin===config.siteOrigin;}catch{return false}
}
export function networkStripeExpectedLivemode():boolean|null {
 const mode=process.env.NETWORK_STRIPE_MODE||'live';
 if(mode==='live')return true;
 const config=getNetworkStripeRuntime();
 return config&&!config.livemode?false:null;
}
export function networkStripeWebhookSecret():string|null {
 if((process.env.NETWORK_STRIPE_MODE||'live')==='live')return process.env.STRIPE_WEBHOOK_SECRET||null;
 if(!getNetworkStripeRuntime())return null;
 const secret=process.env.NETWORK_STRIPE_TEST_WEBHOOK_SECRET||'';
 return secret.startsWith('whsec_')?secret:null;
}
