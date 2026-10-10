import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { supabase } from '@/integrations/supabase/client';

export const Route=createLazyFileRoute('/business/dashboard')({component:BusinessDashboard});
type Account={id:string;application_id:string;access_enabled:boolean};
type Revision={id:string;review_status:string;created_at:string;proposed_profile:Record<string,string>};
const fields=[['business_name','Business name'],['description','Description'],['category','Category'],['city','City / area'],['address','Public address'],['phone','Public phone'],['hours','Hours'],['website','Website'],['social','Social link'],['services','Services'],['faq','FAQs'],['offer','Current offer']] as const;
function BusinessDashboard(){
 const [email,setEmail]=useState('');
 const [userId,setUserId]=useState<string|null>(null);
 const [account,setAccount]=useState<Account|null>(null);
 const [revisions,setRevisions]=useState<Revision[]>([]);
 const [draft,setDraft]=useState<Record<string,string>>({});
 const [message,setMessage]=useState('');
 const [busy,setBusy]=useState(false);
 useEffect(()=>{let alive=true;void supabase.auth.getUser().then(({data})=>{if(alive)setUserId(data.user?.id||null)});const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>setUserId(session?.user.id||null));return()=>{alive=false;subscription.unsubscribe()}},[]);
 useEffect(()=>{if(!userId){setAccount(null);return}let active=true;void (async()=>{
  const {data,error}=await supabase.from('texasdefined_network_business_accounts').select('id,application_id,access_enabled').eq('owner_user_id',userId).limit(1).maybeSingle();
  if(!active)return;if(error){setMessage('Account loading failed.');return}
  setAccount(data as Account|null);if(data){const r=await supabase.from('texasdefined_network_profile_revisions').select('id,review_status,created_at,proposed_profile').eq('business_account_id',data.id).order('created_at',{ascending:false}).limit(20);if(active)setRevisions((r.data||[]) as Revision[])}
 })();return()=>{active=false}},[userId]);
 async function signIn(e:React.FormEvent){e.preventDefault();setBusy(true);const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.origin+'/business/dashboard',shouldCreateUser:false}});setMessage(error?error.message:'Check your email for a secure sign-in link.');setBusy(false)}
 async function submit(e:React.FormEvent){e.preventDefault();if(!account?.access_enabled)return;setBusy(true);setMessage('');
 const {data:{user}}=await supabase.auth.getUser();if(!user){setMessage('Sign in again.');setBusy(false);return}
 const payload=Object.fromEntries(Object.entries(draft).filter(([k,v])=>fields.some(([name])=>name===k)&&v.trim()));
 if(!Object.keys(payload).length){setMessage('Enter at least one proposed change.');setBusy(false);return}
 const {error}=await supabase.from('texasdefined_network_profile_revisions').insert({business_account_id:account.id,submitted_by:user.id,proposed_profile:payload} as never);
 setMessage(error?('Could not submit: '+error.message):'Changes submitted for editorial approval. Your public listing is unchanged.');
 if(!error){setDraft({});setRevisions(old=>[{id:'new',created_at:new Date().toISOString(),review_status:'pending_review',proposed_profile:payload},...old])}setBusy(false)}
 return <main><Container className="py-12"><p className="eyebrow text-primary">TexasDefined Network</p><h1 className="mt-2 font-display text-4xl">My Business Dashboard</h1>
 {!userId?<form onSubmit={signIn} className="mt-8 max-w-md space-y-4"><p>Featured members can request a secure email sign-in link.</p><label className="block">Account email<input required type="email" className="mt-2 w-full border border-border p-3" value={email} onChange={e=>setEmail(e.target.value)}/></label><button disabled={busy} className="bg-primary px-6 py-3 text-primary-foreground">Email sign-in link</button></form>:<><button className="mt-4 border border-border px-4 py-2" onClick={()=>void supabase.auth.signOut()}>Sign out</button>
 {!account?<p className="mt-6">No Featured business is assigned to this account. Contact TexasDefined to verify ownership and activate access.</p>:!account.access_enabled?<p className="mt-6">Your business account is pending activation.</p>:<div className="mt-8 grid gap-8 lg:grid-cols-2"><form onSubmit={submit} className="space-y-5"><h2 className="font-display text-2xl">Propose updates</h2><p className="text-sm text-muted-foreground">Only fill fields you want to change. Every update requires approval before appearing publicly.</p>{fields.map(([name,label])=><label key={name} className="block text-sm font-semibold">{label}{['description','services','faq'].includes(name)?<textarea className="mt-2 w-full rounded-lg border border-border p-3" maxLength={1500} rows={3} value={draft[name]||''} onChange={e=>setDraft(old=>({...old,[name]:e.target.value}))}/>:<input className="mt-2 w-full rounded-lg border border-border p-3" maxLength={300} value={draft[name]||''} onChange={e=>setDraft(old=>({...old,[name]:e.target.value}))}/>}</label>)}<button disabled={busy||revisions.some(r=>r.review_status==='pending_review')} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-50">Submit changes for approval</button></form><aside><div className="sticky top-28 rounded-2xl border border-border bg-white p-6"><h2 className="font-display text-2xl">Preview proposed changes</h2>{fields.filter(([name])=>draft[name]?.trim()).map(([name,label])=><p key={name} className="mt-4 whitespace-pre-wrap"><strong>{label}:</strong> {draft[name]}</p>)}<h3 className="mt-8 font-display text-xl">Review history</h3>{revisions.map(r=><div key={r.id} className="mt-3 border-t border-border pt-3 text-sm">{r.review_status} · {new Date(r.created_at).toLocaleDateString()}</div>)}</div></aside></div>}
 </>}
 {message&&<p role="status" className="mt-6 rounded-xl border border-border p-4">{message}</p>}
 </Container></main>
}
