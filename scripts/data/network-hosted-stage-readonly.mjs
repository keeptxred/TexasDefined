/**
 * Read-only acceptance of an already-provisioned, synthetic, isolated HOSTED
 * Supabase staging tenant. No production linking, service-role credentials,
 * new users, uploads, deletes, SQL changes or privileged RPC calls.
 *
 * Prerequisites are explicitly owner-approved staging fixtures: two distinct
 * CONFIRMED synthetic GoTrue users, two independently bound Featured accounts,
 * one reviewed draft revision and one private PNG each. Execute manually:
 *   NETWORK_HOSTED_STAGE_READONLY_APPROVED=approved-isolated-staging-only \
 *   NETWORK_STAGE_SUPABASE_URL=... NETWORK_STAGE_PROJECT_REF=... \
 *   NETWORK_STAGE_PUBLISHABLE_KEY=... \
 *   NETWORK_STAGE_OWNER_ONE_JWT=... NETWORK_STAGE_OWNER_TWO_JWT=... \
 *   NETWORK_STAGE_OWNER_ONE_ID=... NETWORK_STAGE_OWNER_TWO_ID=... \
 *   NETWORK_STAGE_ACCOUNT_ONE_ID=... NETWORK_STAGE_ACCOUNT_TWO_ID=... \
 *   NETWORK_STAGE_REVISION_ONE_ID=... NETWORK_STAGE_REVISION_TWO_ID=... \
 *   NETWORK_STAGE_MEDIA_ONE=... NETWORK_STAGE_MEDIA_TWO=... \
 *   node scripts/data/network-hosted-stage-readonly.mjs
 *
 * Never copy a service_role key or production token to this process.
 */
import { pathToFileURL } from 'node:url';

const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const validMedia=/^[a-zA-Z0-9_-]{1,100}\.(?:png|jpg|jpeg|webp)$/;
const forbiddenRef='ftkznprjljkhymknvhye';
function fail() {throw Error('Hosted Network staging acceptance configuration invalid');}
export function validateNetworkHostedStageConfig(env) {
 if(env.NETWORK_HOSTED_STAGE_READONLY_APPROVED!=='approved-isolated-staging-only')fail();
 let parsed;
 try {parsed=new URL(env.NETWORK_STAGE_SUPABASE_URL||'');}catch{fail();}
 const hostname=parsed.hostname;
 if(parsed.protocol!=='https:' ||parsed.port ||parsed.username ||parsed.password ||
    parsed.pathname!=='/'||parsed.search||parsed.hash||
    !/^[a-z0-9-]{8,64}\.supabase\.co$/.test(hostname) ||
    hostname.startsWith(forbiddenRef+'.') ||
    env.NETWORK_STAGE_PROJECT_REF!==hostname.slice(0,-'.supabase.co'.length))fail();
 const anonKey=env.NETWORK_STAGE_PUBLISHABLE_KEY||'';
 // API PUBLIC key only. Legacy Supabase eyJ keys must decode to "anon":
 // a service_role JWT also begins eyJ and would invalidate RLS evidence.
 let validLegacyAnon=false;
 if (anonKey.startsWith('eyJ') && anonKey.length>80) {
   try {
     const part=anonKey.split('.');
     if(part.length===3 && part.every(Boolean)) {
       const payload=JSON.parse(Buffer.from(part[1],'base64url').toString('utf8'));
       validLegacyAnon=payload?.role==='anon';
     }
   } catch {validLegacyAnon=false;}
 }
 if(!((anonKey.startsWith('sb_publishable_') && anonKey.length>30) || validLegacyAnon) ||
    /[\s]/.test(anonKey) ||anonKey.startsWith('sb_secret_') ||
    anonKey.startsWith('sk_')) fail();
 function owner(n){
  const id=env['NETWORK_STAGE_OWNER_'+n+'_ID']||'';
  const token=env['NETWORK_STAGE_OWNER_'+n+'_JWT']||'';
  if(!uuid.test(id) || token.length<60 || token.length>8192 ||
     !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token))fail();
  // Untrusted decode is only a local safety preflight; the actual signature,
  // expiry and identity are independently validated by the hosted GoTrue
  // /auth/v1/user request in each acceptance phase.
  let claims;
  try { claims=JSON.parse(Buffer.from(token.split('.')[1],'base64url').toString('utf8')); }
  catch { fail(); }
  if(claims?.role!=='authenticated' || claims.sub!==id ||
     !Number.isFinite(claims.exp) || claims.exp <= Math.floor(Date.now()/1000)+30)
     fail();
  return {id,token};
 }
 const one=owner('ONE'),two=owner('TWO');
 if(one.id===two.id ||one.token===two.token)fail();
 const a1=env.NETWORK_STAGE_ACCOUNT_ONE_ID||'',a2=env.NETWORK_STAGE_ACCOUNT_TWO_ID||'';
 const r1=env.NETWORK_STAGE_REVISION_ONE_ID||'',r2=env.NETWORK_STAGE_REVISION_TWO_ID||'';
 const m1=env.NETWORK_STAGE_MEDIA_ONE||'',m2=env.NETWORK_STAGE_MEDIA_TWO||'';
 if(![a1,a2,r1,r2].every(id=>uuid.test(id)) ||
    a1===a2||r1===r2||!validMedia.test(m1)||!validMedia.test(m2))fail();
 return {
  origin:parsed.origin,anonKey,
  owners:[{...one,account:a1,revision:r1,media:m1},
          {...two,account:a2,revision:r2,media:m2}],
 };
}
async function requestStage(fetcher,config,token,path,{method='GET',body}={}){
 const res=await fetcher(config.origin+path,{
  method,
  headers:{
   apikey:config.anonKey,
   Authorization:'Bearer '+token,
   ...(body===undefined?{}:{'Content-Type':'application/json'}),
  },
  ...(body===undefined?{}:{body:JSON.stringify(body)}),
  redirect:'error',
  cache:'no-store',
  signal:AbortSignal.timeout(12_000),
 });
 return res;
}
async function jsonStage(fetcher,config,token,path,method='GET',body){
 const response=await requestStage(fetcher,config,token,path,{method,body});
 if(response.status!==200)throw Error('Hosted Network staging expected HTTP 200');
 const content=await response.json();
 if(!content ||typeof content!=='object')throw Error('Hosted Network staging invalid response');
 return content;
}
/**
 * Checks existing staging Auth/RLS/Storage fixtures in both ownership directions.
 * Never runs PUT/DELETE, app intake, Auth provisioning, or SQL.
 * Output excludes user emails, media payloads, tokens and paths.
 */
export async function runNetworkHostedStageReadOnly(config, fetcher=fetch){
 const {origin,owners}=config;
 if(!origin ||!Array.isArray(owners)||owners.length!==2)fail();
 let checks=0;
 for(let i=0;i<2;i++){
  const user=owners[i],other=owners[1-i];
  const auth=await jsonStage(fetcher,config,user.token,'/auth/v1/user');
  if(auth.id!==user.id || typeof auth.email!=='string' ||
     !auth.email.toLowerCase().endsWith('@example.invalid') ||
     !auth.email_confirmed_at)
    throw Error('Hosted Network stage expected independently confirmed synthetic Auth identity');
  checks++;
  const accounts=await jsonStage(fetcher,config,user.token,
    '/rest/v1/texasdefined_network_business_accounts?select=id,owner_user_id,access_enabled,membership_tier');
  if(!Array.isArray(accounts)||accounts.length!==1||
    accounts[0].id!==user.account||accounts[0].owner_user_id!==user.id||
    accounts[0].access_enabled!==true||accounts[0].membership_tier!=='featured')
    throw Error('Hosted Network staging owner account RLS mismatch');
  checks++;
  const revisions=await jsonStage(fetcher,config,user.token,
    '/rest/v1/texasdefined_network_profile_revisions?select=id,business_account_id');
  if(!Array.isArray(revisions)||revisions.length!==1||
    revisions[0].id!==user.revision||revisions[0].business_account_id!==user.account)
    throw Error('Hosted Network staging owner revision RLS mismatch');
  checks++;
  const direct=await requestStage(fetcher,config,user.token,
    '/storage/v1/object/authenticated/texasdefined-network-featured-drafts/'+
    encodeURIComponent(user.id)+'/'+encodeURIComponent(user.account)+'/'+encodeURIComponent(user.media));
  if(direct.status!==200)throw Error('Hosted Network stage owner cannot read permitted private media');
  // No private bytes read or logged.
  checks++;
  const foreign=await requestStage(fetcher,config,user.token,
    '/storage/v1/object/authenticated/texasdefined-network-featured-drafts/'+
    encodeURIComponent(other.id)+'/'+encodeURIComponent(other.account)+'/'+encodeURIComponent(other.media));
  if(![400,401,403,404].includes(foreign.status))
    throw Error('Hosted Network stage cross-owner private Storage read not denied');
  checks++;
 }
 return {accepted:true,scope:'isolated-hosted-read-only',checks,
   notes:'Two confirmed synthetic owners, account and revision RLS, private media owner access and cross-owner rejection. No writes.'};
}
/**
 * Second acceptance PHASE, after the owner explicitly disables owner TWO
 * in the isolated staging database using reviewed admin controls.
 * The old hosted revision SELECT policy would FAIL this functional check.
 * JWT remains valid while account access is revoked: verify fresh RLS.
 * No mutation occurs in this process.
 */
export async function runNetworkHostedRevokedOwnerReadOnly(config,fetcher=fetch){
 if(!config?.origin||!Array.isArray(config.owners)||config.owners.length!==2)fail();
 const active=config.owners[0],revoked=config.owners[1];
 const identity=await jsonStage(fetcher,config,revoked.token,'/auth/v1/user');
 if(identity.id!==revoked.id||!identity.email_confirmed_at)
   throw Error('Hosted Network stage disabled synthetic identity not authenticated');
 // Independent database-state control: avoid mistaking a general Storage/RLS
 // denial for a completed owner revocation. Current account SELECT RLS exposes
 // its own disabled binding while all private revision/media must be denied.
 const accounts=await jsonStage(fetcher,config,revoked.token,
  '/rest/v1/texasdefined_network_business_accounts?select=id,owner_user_id,access_enabled,membership_tier');
 if(!Array.isArray(accounts)||accounts.length!==1 ||
    accounts[0].id!==revoked.account||accounts[0].owner_user_id!==revoked.id ||
    accounts[0].access_enabled!==false)
   throw Error('Hosted Network stage disabled owner binding state not verified');
 const revokedRevisions=await jsonStage(fetcher,config,revoked.token,
  '/rest/v1/texasdefined_network_profile_revisions?select=id,business_account_id');
 if(!Array.isArray(revokedRevisions)||revokedRevisions.length!==0)
   throw Error('Hosted Network stage disabled owner can still read private revisions');
 const revokedMedia=await requestStage(fetcher,config,revoked.token,
  '/storage/v1/object/authenticated/texasdefined-network-featured-drafts/'+
  encodeURIComponent(revoked.id)+'/'+encodeURIComponent(revoked.account)+'/'+encodeURIComponent(revoked.media));
 if(![400,401,403,404].includes(revokedMedia.status))
   throw Error('Hosted Network stage disabled owner can still read private media');
 // Positive controls ensure a global outage is not mistaken for revocation.
 const activeRevisions=await jsonStage(fetcher,config,active.token,
  '/rest/v1/texasdefined_network_profile_revisions?select=id,business_account_id');
 if(!Array.isArray(activeRevisions)||activeRevisions.length!==1||
   activeRevisions[0].id!==active.revision)
   throw Error('Hosted Network stage active control owner cannot read own revision');
 const activeMedia=await requestStage(fetcher,config,active.token,
  '/storage/v1/object/authenticated/texasdefined-network-featured-drafts/'+
  encodeURIComponent(active.id)+'/'+encodeURIComponent(active.account)+'/'+encodeURIComponent(active.media));
 if(activeMedia.status!==200)
   throw Error('Hosted Network stage active control owner cannot read private media');
 return {accepted:true,scope:'isolated-hosted-revoked-owner-read-only',checks:6,
  notes:'Disabled owner TWO Auth remains valid but private revision and media access are denied. Active owner ONE still works. No writes.'};
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
 try{
  const config=validateNetworkHostedStageConfig(process.env);
  const phase=process.env.NETWORK_STAGE_REVOCATION_PHASE||'baseline';
  if(!['baseline','revoked-owner-two'].includes(phase))fail();
  const outcome=phase==='revoked-owner-two'
    ? await runNetworkHostedRevokedOwnerReadOnly(config)
    : await runNetworkHostedStageReadOnly(config);
  console.log(JSON.stringify(outcome));
 }catch(error){
  // Generic failure, no token, email, response body or URL disclosure.
  console.error(error instanceof Error?error.message:'Hosted Network staging check failed');
  process.exitCode=1;
 }
}
