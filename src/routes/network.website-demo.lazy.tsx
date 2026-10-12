import '../network.css';
import {createLazyFileRoute} from '@tanstack/react-router';
import {Container} from '@/components/layout/Container';
import {HostedWebsiteTemplate} from '@/components/network/HostedWebsiteTemplate';
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
 const tierInput=typeof window!=='undefined'?new URLSearchParams(window.location.search).get('tier'):'starter';
 const tier:WebsiteHostingTier=WEBSITE_HOSTING_TIERS.some(t=>t.id===tierInput)?tierInput as WebsiteHostingTier:'starter';
 const pages=samplePages(tier);
 const pageInput=typeof window!=='undefined'?new URLSearchParams(window.location.search).get('page'):'home';
 const pageSlug=pages.some(p=>p.slug===pageInput)?String(pageInput):'home';
 const sample={businessName:"Jimmy's Fishing Guide (Sample)",pages,galleryStoragePaths:[]};
 const result=validateHostedWebsiteDraft(tier,sample);
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
 </div>;
}
