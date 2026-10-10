import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect,useState } from 'react';
import { Container } from '@/components/layout/Container';
import { supabase } from '@/integrations/supabase/client';

export const Route=createLazyFileRoute('/network/business/$slug')({component:BusinessProfile});
type Listing={slug:string;plan:string;profile:Record<string,unknown>;logo_storage_path:string|null;gallery_storage_paths:string[]};
function BusinessProfile(){
 const {slug}=Route.useParams();
 const [record,setRecord]=useState<Listing|null>(null);
 const [loading,setLoading]=useState(true);
 useEffect(()=>{let active=true;setLoading(true);void supabase.from('texasdefined_network_public_listings')
 .select('slug,plan,profile,logo_storage_path,gallery_storage_paths').eq('slug',slug).eq('is_published',true).maybeSingle()
 .then(({data,error})=>{if(active){setRecord(!error?data as Listing|null:null);setLoading(false)}});return()=>{active=false}},[slug]);
 const get=(name:string)=>typeof record?.profile?.[name]==='string'?String(record.profile[name]):'';
 const media=(path:string)=>supabase.storage.from('texasdefined-network-published').getPublicUrl(path).data.publicUrl;
 return <main className="bg-[#faf8f3]"><Container className="py-12 sm:py-16">
  {loading?<p>Loading business profile…</p>:!record?<div><h1 className="font-display text-4xl">Business listing unavailable</h1><p className="mt-4">This listing is not currently published.</p></div>:<>
   <p className="eyebrow text-primary">Texas Defined Network · {record.plan}</p>
   <div className="mt-5 flex flex-wrap items-center gap-6">
    {record.logo_storage_path&&<img src={media(record.logo_storage_path)} alt={get('business_name')+' logo'} className="h-28 w-28 rounded-2xl border border-border bg-white object-contain p-2"/>}
    <div><h1 className="font-display text-4xl sm:text-5xl">{get('business_name')}</h1><p className="mt-3 text-muted-foreground">{get('category')} · {get('city')}</p></div>
   </div>
   <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
    <article><h2 className="font-display text-2xl">About this business</h2><p className="mt-4 whitespace-pre-wrap leading-8">{get('description')}</p>
    {get('services')&&<section className="mt-10"><h2 className="font-display text-2xl">Services and specialties</h2><p className="mt-3 whitespace-pre-wrap">{get('services')}</p></section>}
    {record.gallery_storage_paths?.length>0&&<section className="mt-10"><h2 className="font-display text-2xl">Photo gallery</h2><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{record.gallery_storage_paths.map((path,i)=><img key={path} src={media(path)} alt={get('business_name')+' supplied photo '+(i+1)} className="aspect-[4/3] w-full rounded-xl object-cover"/>)}</div></section>}
    {get('faq')&&<section className="mt-10"><h2 className="font-display text-2xl">Frequently asked questions</h2><p className="mt-3 whitespace-pre-wrap">{get('faq')}</p></section>}
    {get('offer')&&<section className="mt-10 rounded-xl border border-primary/30 bg-white p-5"><h2 className="font-display text-xl">Business news</h2><p className="mt-2 whitespace-pre-wrap">{get('offer')}</p></section>}
    </article>
    <aside className="self-start rounded-2xl border border-border bg-white p-6"><h2 className="font-display text-xl">Plan your visit</h2>
      {get('address')&&<p className="mt-5"><strong>Address</strong><span className="mt-1 block">{get('address')}</span></p>}
      {get('hours')&&<p className="mt-5"><strong>Hours</strong><span className="mt-1 block whitespace-pre-wrap">{get('hours')}</span></p>}
      {get('phone')&&<p className="mt-5"><strong>Phone</strong><span className="mt-1 block">{get('phone')}</span></p>}
      {get('website')&&/^https:\/\//i.test(get('website'))&&<a className="mt-5 block font-semibold text-primary underline" href={get('website')} rel="nofollow noopener noreferrer" target="_blank">Official website ↗</a>}
      {get('social')&&/^https:\/\//i.test(get('social'))&&<a className="mt-5 block font-semibold text-primary underline" href={get('social')} rel="nofollow noopener noreferrer" target="_blank">Social page ↗</a>}
    </aside>
   </div><p className="mt-12 text-xs text-muted-foreground">Business-provided information, reviewed by Texas Defined. Sponsored or paid features do not determine editorial coverage.</p>
  </>}
 </Container></main>;
}
