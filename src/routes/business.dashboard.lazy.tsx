import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { supabase } from '@/integrations/supabase/client';

export const Route=createLazyFileRoute('/business/dashboard')({component:BusinessDashboard});
type Account={id:string;application_id:string;access_enabled:boolean};
type Revision={id:string;review_status:string;created_at:string;proposed_profile:Record<string,unknown>};
type Published={slug:string;profile:Record<string,unknown>;logo_storage_path:string|null;gallery_storage_paths:string[]};
const fields=[['business_name','Business name'],['description','Description'],['category','Category'],['city','City / area'],['address','Public address'],['phone','Public phone'],['hours','Hours'],['website','Website'],['social','Social link'],['services','Services'],['faq','FAQs'],['offer','Current offer']] as const;
function BusinessDashboard(){
 const [email,setEmail]=useState('');
 const [userId,setUserId]=useState<string|null>(null);
 const [account,setAccount]=useState<Account|null>(null);
 const [revisions,setRevisions]=useState<Revision[]>([]);
 const [published,setPublished]=useState<Published|null>(null);
 const [draft,setDraft]=useState<Record<string,string>>({});
 const [newLogo,setNewLogo]=useState<File|null>(null);
 const [newGallery,setNewGallery]=useState<File[]>([]);
 const [message,setMessage]=useState('');
 const [busy,setBusy]=useState(false);
 useEffect(()=>{let alive=true;void supabase.auth.getUser().then(({data})=>{if(alive)setUserId(data.user?.id||null)});const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>setUserId(session?.user.id||null));return()=>{alive=false;subscription.unsubscribe()}},[]);
 useEffect(()=>{if(!userId){setAccount(null);setPublished(null);return}let active=true;void (async()=>{
  const {data,error}=await supabase.from('texasdefined_network_business_accounts').select('id,application_id,access_enabled').eq('owner_user_id',userId).limit(1).maybeSingle();
  if(!active)return;if(error){setMessage('Account loading failed.');return}
  setAccount(data as Account|null);if(data){
   const [revisionsResult, listingResult]=await Promise.all([
    supabase.from('texasdefined_network_profile_revisions').select('id,review_status,created_at,proposed_profile').eq('business_account_id',data.id).order('created_at',{ascending:false}).limit(20),
    supabase.from('texasdefined_network_public_listings').select('slug,profile,logo_storage_path,gallery_storage_paths').eq('application_id',data.application_id).eq('is_published',true).maybeSingle()
   ]);
   if(active){setRevisions((revisionsResult.data||[]) as Revision[]);setPublished(!listingResult.error?listingResult.data as Published|null:null)}
  }else{setPublished(null)}
 })();return()=>{active=false}},[userId]);
 async function signIn(e:React.FormEvent){e.preventDefault();setBusy(true);const {error}=await supabase.auth.signInWithOtp({email,options:{emailRedirectTo:window.location.origin+'/business/dashboard',shouldCreateUser:false}});setMessage(error?error.message:'Check your email for a secure sign-in link.');setBusy(false)}
 async function submit(e:React.FormEvent){e.preventDefault();if(!account?.access_enabled)return;setBusy(true);setMessage('');
 const {data:{user}}=await supabase.auth.getUser();if(!user){setMessage('Sign in again.');setBusy(false);return}
 const payload:Record<string,unknown>=Object.fromEntries(Object.entries(draft).filter(([k,v])=>fields.some(([name])=>name===k)&&v.trim()));
 const selected=[...(newLogo?[newLogo]:[]),...newGallery];
 if(selected.some(file=>file.size>3000000||file.size===0||!['image/jpeg','image/png','image/webp'].includes(file.type))) {
  setMessage('Use JPEG, PNG or WebP files under 3 MB.');setBusy(false);return;
 }
 const upload=async(file:File,label:string)=>{
  const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
  const path=user.id+'/'+account.id+'/'+crypto.randomUUID()+'-'+label+'.'+ext;
  const {error}=await supabase.storage.from('texasdefined-network-featured-drafts').upload(path,file,{contentType:file.type,upsert:false});
  if(error)throw new Error('Image upload failed');
  return path;
 };
 try{
  if(newLogo)payload.logo_storage_path=await upload(newLogo,'logo');
  if(newGallery.length)payload.gallery_storage_paths=await Promise.all(newGallery.map((file,i)=>upload(file,'photo-'+i)));
 }catch(err){setMessage(err instanceof Error?err.message:'Image upload failed');setBusy(false);return}

 if(!Object.keys(payload).length && !newLogo && !newGallery.length){setMessage('Enter at least one proposed change.');setBusy(false);return}
 const {error}=await supabase.from('texasdefined_network_profile_revisions').insert({business_account_id:account.id,submitted_by:user.id,proposed_profile:payload} as never);
 setMessage(error?('Could not submit: '+error.message):'Changes submitted for editorial approval. Your public listing is unchanged.');
 if(!error){setDraft({});setNewLogo(null);setNewGallery([]);setRevisions(old=>[{id:'new',created_at:new Date().toISOString(),review_status:'pending_review',proposed_profile:payload},...old])}setBusy(false)}
 return <main><Container className="py-12"><p className="eyebrow text-primary">TexasDefined Network</p><h1 className="mt-2 font-display text-4xl">My Business Dashboard</h1>
 {!userId?<form onSubmit={signIn} className="mt-8 max-w-md space-y-4"><p>Featured members can request a secure email sign-in link.</p><label className="block">Account email<input required type="email" className="mt-2 w-full border border-border p-3" value={email} onChange={e=>setEmail(e.target.value)}/></label><button disabled={busy} className="bg-primary px-6 py-3 text-primary-foreground">Email sign-in link</button></form>:<><button className="mt-4 border border-border px-4 py-2" onClick={()=>void supabase.auth.signOut()}>Sign out</button>
 {!account?<p className="mt-6">No Featured business is assigned to this account. Contact TexasDefined to verify ownership and activate access.</p>:!account.access_enabled?<p className="mt-6">Your business account is pending activation.</p>:<div className="mt-8 grid gap-8 lg:grid-cols-2"><form onSubmit={submit} className="space-y-5"><h2 className="font-display text-2xl">Propose updates</h2><p className="text-sm text-muted-foreground">Only fill fields you want to change. Every update requires approval before appearing publicly.</p>{fields.map(([name,label])=><label key={name} className="block text-sm font-semibold">{label}{['description','services','faq'].includes(name)?<textarea className="mt-2 w-full rounded-lg border border-border p-3" maxLength={1500} rows={3} value={draft[name]||''} onChange={e=>setDraft(old=>({...old,[name]:e.target.value}))}/>:<input className="mt-2 w-full rounded-lg border border-border p-3" maxLength={300} value={draft[name]||''} onChange={e=>setDraft(old=>({...old,[name]:e.target.value}))}/>}</label>)}<div className="space-y-3 border-t border-border pt-5"><p className="font-semibold">Submit image changes for approval</p><label className="block text-sm">Replace logo <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setNewLogo(e.target.files?.[0]||null)} className="mt-2 block"/></label><label className="block text-sm">Replace gallery (up to six) <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={e=>setNewGallery(Array.from(e.target.files||[]).slice(0,6))} className="mt-2 block"/></label></div><button disabled={busy||revisions.some(r=>r.review_status==='pending_review')} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-50">Submit changes for approval</button></form><aside><div className="sticky top-28 rounded-2xl border border-border bg-white p-6"><h2 className="font-display text-2xl">Current approved listing</h2>
   {published?<div className="mt-4 space-y-3">
     {published.logo_storage_path&&<img src={supabase.storage.from('texasdefined-network-published').getPublicUrl(published.logo_storage_path).data.publicUrl} alt="Current approved business logo" className="h-20 w-20 rounded-xl border object-contain"/>}
     <p className="font-semibold">{String(published.profile.business_name||'Your business')}</p>
     <p className="text-sm text-muted-foreground">{String(published.profile.category||'')} · {String(published.profile.city||'')}</p>
     <a className="inline-block text-sm text-primary underline" href={'/network/business/'+published.slug} target="_blank" rel="noreferrer">View live approved page</a>
     <p className="text-xs text-muted-foreground">The currently approved listing stays online while proposed edits await review.</p>
   </div>:<p className="mt-4 text-sm text-muted-foreground">No approved public profile is available yet.</p>}
   <h2 className="mt-8 font-display text-2xl">Preview proposed changes</h2>{fields.filter(([name])=>draft[name]?.trim()).map(([name,label])=><p key={name} className="mt-4 whitespace-pre-wrap"><strong>{label}:</strong> {draft[name]}</p>)}<h3 className="mt-8 font-display text-xl">Review history</h3>{revisions.map(r=><div key={r.id} className="mt-3 border-t border-border pt-3 text-sm">{r.review_status} · {new Date(r.created_at).toLocaleDateString()}</div>)}</div></aside></div>}
 </>}
 {message&&<p role="status" className="mt-6 rounded-xl border border-border p-4">{message}</p>}
 </Container></main>
}
