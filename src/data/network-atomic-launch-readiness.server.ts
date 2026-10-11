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
 'publicDirectoryAndRobots','legalAndCommercialPolicy','fullBrowserRegression',
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
 checks['config:serviceRole']=typeof environment.SUPABASE_SERVICE_ROLE_KEY==='string'&&
  environment.SUPABASE_SERVICE_ROLE_KEY.length>75;
 checks['config:adminKey']=typeof environment.NETWORK_ADMIN_ACCESS_KEY==='string'&&
  environment.NETWORK_ADMIN_ACCESS_KEY.length>=32&&
  environment.NETWORK_ADMIN_ACCESS_KEY.length<=200;
 checks['config:stripeLive']=typeof environment.STRIPE_SECRET_KEY==='string'&&
  environment.STRIPE_SECRET_KEY.startsWith('sk_live_')&&
  environment.STRIPE_SECRET_KEY.length>24;
 checks['config:stripeWebhook']=typeof environment.STRIPE_WEBHOOK_SECRET==='string'&&
  environment.STRIPE_WEBHOOK_SECRET.startsWith('whsec_')&&
  environment.STRIPE_WEBHOOK_SECRET.length>24;
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
export function networkCustomerLaunchArmed(
 environment:Record<string,string|undefined>,
):boolean{
 const raw=environment.NETWORK_LAUNCH_EVIDENCE_JSON;
 if(typeof raw!=='string'||raw.length<100||raw.length>5_000)return false;
 let evidence:unknown;
 try{evidence=JSON.parse(raw);}catch{return false;}
 if(!evidence ||typeof evidence!=='object'||Array.isArray(evidence))return false;
 if(environment.NETWORK_GRAPH_MAILBOX!=='admin@texasdefined.com')return false;
 return inspectNetworkAtomicLaunch(environment,evidence as Partial<NetworkLaunchEvidence>).ready;
}
