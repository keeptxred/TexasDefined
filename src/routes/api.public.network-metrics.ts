import {createFileRoute} from '@tanstack/react-router';
import {NETWORK_METRIC_ACTIONS,summarizeNetworkOwnerMetrics} from '@/data/network-profile-metrics';

const answer=(value:unknown,status=200)=>Response.json(value,{status,
 headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const uuid=/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
const slugPattern=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const shouldServe=async()=>{
 const {networkCustomerLaunchArmed}=await import('@/data/network-atomic-launch-readiness.server');
 return networkCustomerLaunchArmed(process.env);
};

/** The POST path is additionally guarded by the Worker-owned,
 * fail-closed, per-IP metrics rate limiter before the route is dispatched.
 * Only counters, never an IP address or user session, enter the database.
 */
async function record(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin ||
    request.headers.get('sec-fetch-site')==='cross-site')
  return answer({error:'Request origin not permitted'},403);
 if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))
  return answer({error:'Expected JSON'},415);
 const declared=Number(request.headers.get('content-length')||0);
 if(!Number.isFinite(declared)||declared>1024)
  return answer({error:'Payload too large'},413);
 let raw:string;
 try{raw=await request.text()}catch{return answer({error:'Invalid request'},400)}
 if(new TextEncoder().encode(raw).byteLength>1024)
  return answer({error:'Payload too large'},413);
 let data:unknown;
 try{data=JSON.parse(raw)}catch{return answer({error:'Invalid JSON'},400)}
 if(!data||typeof data!=='object'||Array.isArray(data))
  return answer({error:'Invalid event'},400);
 const {slug,action}=data as Record<string,unknown>;
 if(typeof slug!=='string'||slug.length>120||!slugPattern.test(slug)||
    !NETWORK_METRIC_ACTIONS.includes(action as typeof NETWORK_METRIC_ACTIONS[number]))
  return answer({error:'Invalid event'},400);
 if(!await shouldServe())return answer({error:'Network launch pending'},503);
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 // These service-only RPCs are introduced by a PENDING release migration.
 // Keep the autogen Supabase Database type unchanged until staged schema sync.
 const db=supabaseAdmin as unknown as {rpc:(name:string,args:Record<string,unknown>)=>
  Promise<{data:unknown;error:unknown}>};
 const {data:recorded,error}=await db.rpc('record_texasdefined_network_profile_metric',
  {p_slug:slug,p_action:action as string});
 if(error)return answer({error:'Metrics unavailable'},503);
 if(recorded!==true)return answer({error:'Published listing not found'},404);
 return new Response(null,{status:204,headers:{'Cache-Control':'no-store'}});
}
async function ownerReport(request:Request){
 const token=request.headers.get('authorization')?.match(/^Bearer ([\w.-]+)$/)?.[1];
 if(!token)return answer({error:'Sign in required'},401);
 const id=new URL(request.url).searchParams.get('applicationId')||'';
 if(!uuid.test(id))return answer({error:'Invalid business'},400);
 if(!await shouldServe())return answer({error:'Network launch pending'},503);
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const {data:who,error:authError}=await supabaseAdmin.auth.getUser(token);
 const user=who.user;
 if(authError||!user||!user.email||!user.email_confirmed_at)
  return answer({error:'Verified sign-in required'},401);
 const {data:account,error:accountError}=await supabaseAdmin
  .from('texasdefined_network_business_accounts')
  .select('id,application_id,access_enabled,membership_tier')
  .eq('application_id',id).eq('owner_user_id',user.id).eq('access_enabled',true)
  .maybeSingle();
 if(accountError)return answer({error:'Ownership unavailable'},503);
 if(!account||!['plus','featured'].includes(account.membership_tier))
  return answer({error:'Verified owner required'},403);
 const {data:application,error:applicationError}=await supabaseAdmin
  .from('texasdefined_network_applications')
  .select('contact_email,plan,paid_entitlement_active')
  .eq('id',id).maybeSingle();
 if(applicationError)return answer({error:'Membership unavailable'},503);
 const {matchingNetworkOwnerEmail}=await import('@/data/network-owner-email');
 if(!application||!matchingNetworkOwnerEmail(application.contact_email,user.email)||
    application.plan!=='plus'||application.paid_entitlement_active!==true)
  return answer({error:'Active verified Plus membership required'},403);
 const {data:listing,error:listingError}=await supabaseAdmin
  .from('texasdefined_network_public_listings')
  .select('application_id').eq('application_id',id)
  .eq('is_published',true).maybeSingle();
 if(listingError)return answer({error:'Listing status unavailable'},503);
 if(!listing)return answer({error:'Published listing required'},403);
 const db=supabaseAdmin as unknown as {rpc:(name:string,args:Record<string,unknown>)=>
  Promise<{data:unknown;error:unknown}>};
 const {data:rows,error:reportError}=await db.rpc('get_texasdefined_network_profile_metrics',
  {p_application_id:id});
 if(reportError||!Array.isArray(rows))return answer({error:'Statistics unavailable'},503);
 try{
  const today=new Date().toISOString().slice(0,10);
  return answer({ok:true,report:summarizeNetworkOwnerMetrics(rows,
   account.membership_tier as 'plus'|'featured',today)});
 }catch{return answer({error:'Statistics unavailable'},503)}
}
export const Route=createFileRoute('/api/public/network-metrics')({
 server:{handlers:{POST:({request})=>record(request),GET:({request})=>ownerReport(request)}},
});
