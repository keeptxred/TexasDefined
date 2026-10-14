import '../network.css';
import {createLazyFileRoute} from '@tanstack/react-router';
import {useEffect,useState} from 'react';
import {Container} from '@/components/layout/Container';
import {HostedWebsiteTemplate} from '@/components/network/HostedWebsiteTemplate';
import {HostedWebsiteEditor} from '@/components/network/HostedWebsiteEditor';
import {WEBSITE_HOSTING_TIERS,validateHostedWebsiteDraft,type WebsiteHostingTier} from '@/data/network-commercial-model';

export const Route=createLazyFileRoute('/network/website-demo')({component:HostedWebsiteDemo});

function samplePages(tier:WebsiteHostingTier){
 const pages=[
  {slug:'home',title:'Home',body:"Explore Lake Conroe with a knowledgeable local fishing guide. This is sample copy to demonstrate how a business owner could introduce their services, explain what makes their business unique, and help visitors plan their trip."},
  {slug:'trips',title:'Fishing Trips',body:"Choose a trip that fits your interests and experience. A real business owner can explain available trips, meeting points, equipment provided, preparation tips and current prices."},
  {slug:'captain',title:'Captain & Boat',body:"Introduce the captain, experience, qualifications and the boat. Include seating, equipment, safety guidance and what guests should bring."},
  {slug:'reports',title:'Fishing Reports',body:"October 2026 — Example fishing report\nShare recent conditions, helpful observations, seasonal changes and fresh trip information. Owners can keep their own reports current from the website editor."},
  {slug:'contact',title:'Contact',body:"Explain when and how customers can reach you. Include your genuine phone number, verified business contact details, service area and social media links."},
 ];
 if(tier==='starter')return [pages[0]];
 if(tier==='business')return [pages[0],pages[1],pages[3]];
 return pages;
}
function HostedWebsiteDemo(){
 const [query,setQuery]=useState({tier:'starter',page:'home'});
 const [draft,setDraft]=useState({businessName:"Jimmy's Fishing Guide (Sample)",pages:samplePages('starter'),galleryStoragePaths:[] as string[]});
 useEffect(()=>{
  const params=new URLSearchParams(window.location.search);
  setQuery({tier:params.get('tier')||'starter',page:params.get('page')||'home'});
 },[]);
 const tier:WebsiteHostingTier=WEBSITE_HOSTING_TIERS.some(t=>t.id===query.tier)?query.tier as WebsiteHostingTier:'starter';
 const pages=samplePages(tier);
 const pageSlug=pages.some(p=>p.slug===query.page)?query.page:'home';
 useEffect(()=>{setDraft({businessName:"Jimmy's Fishing Guide (Sample)",pages:samplePages(tier),galleryStoragePaths:[]});},[tier]);
 const result=validateHostedWebsiteDraft(tier,draft);
 if(!result.ok)return <Container className="py-16"><h1>Sample website unavailable</h1></Container>;
 const href=(page:string)=>'/network/website-demo?tier='+tier+'&page='+page;
 return <div className="bg-[#fffaf3]">
  <Container className="py-6">
   <p className="text-sm font-semibold text-primary">TexasDefined · Hosting examples</p>
   <div className="mt-3 flex flex-wrap gap-2">
    {WEBSITE_HOSTING_TIERS.map(p=><a key={p.id} href={'/network/website-demo?tier='+p.id}
      aria-current={p.id===tier?'page':undefined}
      className={`rounded-full border px-4 py-2 text-sm font-semibold ${p.id===tier?'border-primary bg-primary text-primary-foreground':'border-border bg-white'}`}>{p.title} · {p.maxPages} {p.maxPages===1?'page':'pages'}</a>)}
   </div>
  </Container>
  <HostedWebsiteTemplate
    demo activeSlug={pageSlug} buildPageHref={href}
    site={{businessName:result.draft.businessName,locality:'Lake Conroe, Texas',
      category:'Fishing guide',shortDescription:'Illustrative guided trips on Lake Conroe',
      pages:result.draft.pages,galleryImages:[]}}/>
  <Container className="pb-12"><details className="rounded-2xl border border-border bg-surface p-5">
   <summary className="cursor-pointer text-lg font-semibold">Try the self-service editor (example only)</summary>
   <div className="mt-6"><HostedWebsiteEditor tier={tier} draft={draft} onChange={setDraft}/></div>
   <p className="mt-3 text-xs text-muted-foreground">Demo edits are not saved. No account, publication or purchase is created.</p>
  </details></Container>
 </div>;
}
