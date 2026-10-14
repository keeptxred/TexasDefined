/**
 * Network ONE-CUTOVER launch gate. No deployments, email sends, data changes or
 * Stripe mutations. Intended for independent acceptance artifacts AFTER real
 * integrations have been installed and tested in an isolated staging release.
 *
 * Never infer readiness from flags alone: configuration AND independently
 * recorded functional evidence must all exist.
 * Return only safe check IDs; do not serialize secrets or customer details.
 */
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Supabase accepts legacy signed service-role JWTs and modern opaque secret
 * keys. Shape-only preflight is not proof of privilege; provider E2E is required.
 */
const hasServiceCredential=(value:unknown):boolean=>
 typeof value==='string' &&
 ((value.startsWith('sb_secret_')&&value.length>=32&&value.length<=1024)||
  (value.length>75&&value.length<8192&&value.split('.').length===3));

const requiredFlags=[
 'NETWORK_INTAKE_ENABLED','NETWORK_OWNER_PORTAL_ENABLED',
 'NETWORK_PUBLICATION_ENABLED','NETWORK_DIRECTORY_ENABLED',
 'NETWORK_CHECKOUT_ENABLED','NETWORK_EMAIL_DELIVERY_ENABLED',
 'NETWORK_GRAPH_DISPATCH_ENABLED','NETWORK_CRON_ENABLED',
 'NETWORK_LAUNCH_ATOMIC_VERIFIED',
] as const;
const requiredEvidence=[
 'ownerAuthTwoPerson','ownerRevocation','concurrentStorageQuota',
 'basicEditorialPublication','plusVerifiedCheckout',
 'stripeWebhookRecovery','stripeCancelAndPortal','graphMailboxScope',
 'graphMessageReceived','graphNoDuplicateRecovery',
 'publicDirectoryAndRobots','planBenefitsDelivered','hostedWebsiteDelivered','legalAndCommercialPolicy','fullBrowserRegression',
] as const;
export type NetworkLaunchEvidence=Record<typeof requiredEvidence[number],{
 passed:boolean; reference:string; completedAt:string;
}>;
function wellFormedEvidence(v:unknown):v is {passed:true;reference:string;completedAt:string}{
 if(!v||typeof v!=='object'||Array.isArray(v))return false;
 const e=v as Record<string,unknown>;
 const completed=typeof e.completedAt==='string'?Date.parse(e.completedAt):NaN;
 return e.passed===true&&typeof e.reference==='string'&&
  /^[a-zA-Z0-9:_./-]{16,180}$/.test(e.reference) &&
  Number.isFinite(completed) &&completed>Date.parse('2026-10-01T00:00:00Z');
}
export function inspectNetworkAtomicLaunch(
 environment:Record<string,string|undefined>,
 evidence:Partial<NetworkLaunchEvidence>,
): {ready:boolean; missing:string[]; passed:number; total:number} {
 const checks:Record<string,boolean>={};
 for(const name of requiredFlags)checks['feature:'+name]=environment[name]==='true';
 checks['config:productionDb']=
  environment.SUPABASE_URL==='https://ftkznprjljkhymknvhye.supabase.co';
 checks['config:serviceRole']=hasServiceCredential(environment.SUPABASE_SERVICE_ROLE_KEY);
 checks['config:adminKey']=typeof environment.NETWORK_ADMIN_ACCESS_KEY==='string'&&
  environment.NETWORK_ADMIN_ACCESS_KEY.length>=32&&
  environment.NETWORK_ADMIN_ACCESS_KEY.length<=200;
 checks['config:stripeLive']=typeof environment.STRIPE_SECRET_KEY==='string'&&
  environment.STRIPE_SECRET_KEY.startsWith('sk_live_')&&
  environment.STRIPE_SECRET_KEY.length>24;
 checks['config:stripeWebhook']=typeof environment.NETWORK_STRIPE_WEBHOOK_SECRET==='string'&&
  environment.NETWORK_STRIPE_WEBHOOK_SECRET.startsWith('whsec_')&&
  environment.NETWORK_STRIPE_WEBHOOK_SECRET.length>24;
 checks['config:stripeHost']=environment.NETWORK_STRIPE_MODE===undefined||
  environment.NETWORK_STRIPE_MODE==='live';
 checks['config:graphTenant']=uuid.test(environment.NETWORK_GRAPH_TENANT_ID||'');
 checks['config:graphClient']=uuid.test(environment.NETWORK_GRAPH_CLIENT_ID||'');
 checks['config:graphSecret']=
  (environment.NETWORK_GRAPH_CLIENT_SECRET||'').length>=24;
 checks['config:graphMailbox']=environment.NETWORK_GRAPH_MAILBOX==='admin@texasdefined.com';
 for(const label of requiredEvidence){
  checks['e2e:'+label]=wellFormedEvidence(evidence[label]);
 }
 const missing=Object.keys(checks).filter(k=>!checks[k]);
 return {ready:missing.length===0,missing,passed:Object.keys(checks).length-missing.length,total:Object.keys(checks).length};
}
export const NETWORK_LAUNCH_EVIDENCE_KEYS=[...requiredEvidence];
export const NETWORK_LAUNCH_FEATURE_KEYS=[...requiredFlags];

/**
 * Runtime customer cutover guard. The signed-off acceptance manifest is held
 * only as a Worker secret (NOT an artifact embedded in the client bundle).
 * All production credentials, eight feature switches and every independent
 * acceptance record must be simultaneously present. No partial activation.
 */
/**
 * Staging alone can turn on the entire test-mode journey BEFORE acceptance
 * artifacts exist. A separate Supabase tenant, Stripe TEST credentials,
 * noncanonical stage origin, synthetic-only operator authorization and all
 * user-facing flags are mandatory. Never permit any stage shortcut on prod.
 */
export function networkIsolatedStagingArmed(
 environment:Record<string,string|undefined>,
):boolean{
 if(environment.NETWORK_ISOLATED_STAGING!=='true' ||
    environment.NETWORK_STAGE_QA_APPROVED!=='approved-synthetic-staging-only' ||
    environment.NETWORK_STRIPE_MODE!=='test' ||
    environment.NETWORK_STRIPE_TEST_MODE_ENABLED!=='true' ||
    typeof environment.STRIPE_SECRET_KEY!=='string' ||
    !environment.STRIPE_SECRET_KEY.startsWith('sk_test_') ||
    // Staging must never depend on or require live signing secrets.
    typeof environment.NETWORK_STRIPE_TEST_WEBHOOK_SECRET!=='string' ||
    !environment.NETWORK_STRIPE_TEST_WEBHOOK_SECRET.startsWith('whsec_') ||
    !/^price_[A-Za-z0-9]+$/.test(environment.NETWORK_STRIPE_TEST_PRICE_ID||'') ||
    environment.NETWORK_STRIPE_TEST_PRICE_ID==='price_1UP28XLtRurj6GMNwFlYDW6N' ||
    !requiredFlags.filter(f=>f!=='NETWORK_LAUNCH_ATOMIC_VERIFIED')
      .every(f=>environment[f]==='true') ||
    environment.NETWORK_GRAPH_MAILBOX!=='admin@texasdefined.com' ||
    !uuid.test(environment.NETWORK_GRAPH_CLIENT_ID||'') ||
    !uuid.test(environment.NETWORK_GRAPH_TENANT_ID||'') ||
    typeof environment.NETWORK_GRAPH_CLIENT_SECRET!=='string' ||
    environment.NETWORK_GRAPH_CLIENT_SECRET.length<24)
   return false;
 let db:URL,origin:URL;
 try{
  db=new URL(environment.SUPABASE_URL||'');
  origin=new URL(environment.NETWORK_STAGE_ORIGIN||'');
 }catch{return false;}
 const production='ftkznprjljkhymknvhye.supabase.co';
 return db.protocol==='https:' &&
    db.hostname.endsWith('.supabase.co') &&
    db.hostname!==production &&
    /^[a-z0-9-]{15,35}\.supabase\.co$/.test(db.hostname) &&
    origin.protocol==='https:' &&
    origin.hostname!=='texasdefined.com' &&
    origin.hostname!=='www.texasdefined.com' &&
    !origin.hostname.endsWith('.texasdefined.com') &&
    origin.hostname.endsWith('.workers.dev') &&
    origin.pathname==='/' && !origin.search && !origin.hash &&
    !origin.username && !origin.password &&
    hasServiceCredential(environment.SUPABASE_SERVICE_ROLE_KEY) &&
    typeof environment.NETWORK_ADMIN_ACCESS_KEY==='string' &&
    environment.NETWORK_ADMIN_ACCESS_KEY.length>=32;
}
/**
 * Protect against a staging-configured Worker being accidentally attached to
 * the canonical production hostname or to an arbitrary host. Flag values and
 * a claimed staging origin are not sufficient on their own.
 */
export function networkRequestHostAllowed(
 environment:Record<string,string|undefined>,requestUrl:string,
):boolean{
 let url:URL;
 try{url=new URL(requestUrl);}catch{return false;}
 if(url.protocol!=='https:' && url.hostname!=='127.0.0.1' && url.hostname!=='localhost')
  return false;
 if(environment.NETWORK_ISOLATED_STAGING==='true'){
  if(!networkIsolatedStagingArmed(environment))return false;
  let stage:URL;
  try{stage=new URL(environment.NETWORK_STAGE_ORIGIN||'');}catch{return false;}
  return url.origin===stage.origin;
 }
 return url.protocol==='https:' && url.hostname==='texasdefined.com';
}
export function networkCustomerLaunchArmed(
 environment:Record<string,string|undefined>,
):boolean{
 if(environment.NETWORK_ISOLATED_STAGING==='true')
  return networkIsolatedStagingArmed(environment);
 const raw=environment.NETWORK_LAUNCH_EVIDENCE_JSON;
 if(typeof raw!=='string'||raw.length<100||raw.length>5_000)return false;
 let evidence:unknown;
 try{evidence=JSON.parse(raw);}catch{return false;}
 if(!evidence ||typeof evidence!=='object'||Array.isArray(evidence))return false;
 if(environment.NETWORK_GRAPH_MAILBOX!=='admin@texasdefined.com')return false;
 return inspectNetworkAtomicLaunch(environment,evidence as Partial<NetworkLaunchEvidence>).ready;
}
