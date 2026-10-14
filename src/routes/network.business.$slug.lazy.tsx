import "../network.css";
import { createLazyFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import {useEffect} from 'react';
import { supabase } from '@/integrations/supabase/client';

export const Route=createLazyFileRoute('/network/business/$slug')({component:BusinessProfile});
function observeNetworkAction(slug:string,action:'profile_view'|'website_click'|'social_click'|'phone_click'){
 // Browser sends no email, IP, visitor/session ID or referral in its payload.
 void fetch('/api/public/network-metrics',{
  method:'POST',credentials:'omit',keepalive:true,
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({slug,action}),
 }).catch(()=>{ /* Telemetry must never prevent navigation or page rendering. */ });
}
function BusinessProfile(){
 const record=Route.useLoaderData() as {slug:string;plan:string;profile:Record<string,unknown>;logo_storage_path:string|null;gallery_storage_paths:string[]};
 useEffect(()=>{
  // At most one observed display per tab and 30-minute listing window.
  // This is NOT a unique-person count and no visitor identifier is sent.
  const key='network-observed-display:'+record.slug;
  try{
   const last=Number(sessionStorage.getItem(key)||0);
   if(Date.now()-last<30*60*1000)return;
   sessionStorage.setItem(key,String(Date.now()));
  }catch{ /* sessionStorage may be disabled; reporting remains best effort */ }
  observeNetworkAction(record.slug,'profile_view');
 },[record.slug]);
 const enhanced=record.plan==='plus'||record.plan==='featured';
 const get=(name:string)=>typeof record?.profile?.[name]==='string'?String(record.profile[name]):'';
 const media=(path:string)=>supabase.storage.from('texasdefined-network-published').getPublicUrl(path).data.publicUrl;
 return <div className="bg-[#faf8f3]"><Container className="py-12 sm:py-16">
  <>
   <p className="eyebrow text-primary">Texas Defined Network · {record.plan}</p>
   <div className="mt-5 flex flex-wrap items-center gap-6">
    {record.logo_storage_path&&<img src={media(record.logo_storage_path)} alt={get('business_name')+' logo'} className="h-28 w-28 rounded-2xl border border-border bg-white object-contain p-2"/>}
    <div><h1 className="font-display text-4xl sm:text-5xl">{get('business_name')}</h1><p className="mt-3 text-muted-foreground">{get('category')} · {get('city')}</p></div>
   </div>
   <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
    <article><h2 className="font-display text-2xl">About this business</h2><p className="mt-4 whitespace-pre-wrap leading-8">{get('description')}</p>
    {enhanced&&get('services')&&<section className="mt-10"><h2 className="font-display text-2xl">Services and specialties</h2><p className="mt-3 whitespace-pre-wrap">{get('services')}</p></section>}
    {enhanced&&record.gallery_storage_paths?.length>0&&<section className="mt-10"><h2 className="font-display text-2xl">Photo gallery</h2><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{record.gallery_storage_paths.map((path,i)=><img key={path} src={media(path)} alt={get('business_name')+' supplied photo '+(i+1)} className="aspect-[4/3] w-full rounded-xl object-cover"/>)}</div></section>}
    {enhanced&&get('faq')&&<section className="mt-10"><h2 className="font-display text-2xl">Frequently asked questions</h2><p className="mt-3 whitespace-pre-wrap">{get('faq')}</p></section>}
    {enhanced&&get('offer')&&<section className="mt-10 rounded-xl border border-primary/30 bg-white p-5"><h2 className="font-display text-xl">Business news</h2><p className="mt-2 whitespace-pre-wrap">{get('offer')}</p></section>}
    </article>
    <aside className="self-start rounded-2xl border border-border bg-white p-6"><h2 className="font-display text-xl">Plan your visit</h2>
      {get('address')&&<p className="mt-5"><strong>Address</strong><span className="mt-1 block">{get('address')}</span></p>}
      {get('hours')&&<p className="mt-5"><strong>Hours</strong><span className="mt-1 block whitespace-pre-wrap">{get('hours')}</span></p>}
      {get('phone')&&<p className="mt-5"><strong>Phone</strong>
       {/^[+0-9()\-\s]{6,24}$/.test(get('phone'))?
       <a className="mt-1 block text-primary underline" href={'tel:'+get('phone').replace(/[^+0-9]/g,'')}
        onClick={()=>observeNetworkAction(record.slug,'phone_click')}>{get('phone')}</a>:
       <span className="mt-1 block">{get('phone')}</span>}</p>}
      {enhanced&&get('website')&&/^https:\/\//i.test(get('website'))&&<a className="mt-5 block font-semibold text-primary underline" href={get('website')} rel="nofollow noopener noreferrer" target="_blank" onClick={()=>observeNetworkAction(record.slug,'website_click')}>Official website ↗</a>}
      {enhanced&&get('social')&&/^https:\/\//i.test(get('social'))&&<a className="mt-5 block font-semibold text-primary underline" href={get('social')} rel="nofollow noopener noreferrer" target="_blank" onClick={()=>observeNetworkAction(record.slug,'social_click')}>Social page ↗</a>}
    </aside>
   </div><p className="mt-12 text-xs text-muted-foreground">Business-provided information, reviewed by Texas Defined. Sponsored or paid features do not determine editorial coverage.</p>
  </>
 </Container></div>;
}
