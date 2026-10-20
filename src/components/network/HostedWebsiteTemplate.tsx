import type {HostedWebsitePageInput} from '@/data/network-commercial-model';

/**
 * Shared business-website presentation. Takes ONLY independently approved,
 * entitlement-checked data from its caller; visual display is not authorization.
 * Pages remain individual navigable URLs in production, not in-page anchors.
 */
export type HostedWebsitePublicView={
 businessName:string;
 locality:string;
 category:string;
 shortDescription:string;
 pages:readonly HostedWebsitePageInput[];
 galleryImages:readonly {src:string;alt:string}[];
 phone?:string;
 socialHref?:string;
};
type Props={
 site:HostedWebsitePublicView;
 activeSlug:string;
 buildPageHref:(slug:string)=>string;
 demo?:boolean;
};
export function HostedWebsiteTemplate({site,activeSlug,buildPageHref,demo=false}:Props){
 const active=site.pages.find(p=>p.slug===activeSlug);
 if(!active)return <main className="mx-auto max-w-4xl p-10"><h1>Page not found</h1></main>;
 const phone=site.phone?.trim()||'';
 const safePhone=/^[+0-9()\-\s]{7,26}$/.test(phone) ? phone.replace(/[^+0-9]/g,'') : null;
 const social=site.socialHref && /^https:\/\/[\w.-]+(?:\/|$)/i.test(site.socialHref) ? site.socialHref : null;
 return <main className="min-h-screen bg-[#fffaf3] text-[#163047]">
  <div className="border-b border-[#e4dbca] bg-white">
   <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-8">
    <div><p className="text-xs font-semibold uppercase tracking-widest text-[#9c482d]">{site.category} · {site.locality}</p>
      <p className="mt-1 font-display text-3xl font-bold">{site.businessName}</p></div>
    <a href={buildPageHref('home')} className="text-sm font-semibold text-[#9c482d]">Home</a>
   </div>
  </div>
  <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
   {demo&&<p className="mb-5 rounded-lg border border-[#e0cbad] bg-[#f8eddb] p-3 text-xs font-semibold">Example website only — not a live business or purchasable plan</p>}
   <nav aria-label={site.businessName+' website pages'} className="flex flex-wrap gap-2 border-b border-[#e4dbca] pb-6">
    {site.pages.map(page=><a key={page.slug} aria-current={page.slug===active.slug?'page':undefined}
      href={buildPageHref(page.slug)}
      className={`rounded-full border px-4 py-2 text-sm font-semibold ${page.slug===active.slug?'border-[#a94428] bg-[#a94428] text-white':'border-[#ccbba9] bg-white text-[#163047] hover:bg-[#f0e1cc]'}`}>
      {page.title}</a>)}
   </nav>
   <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
    <article>
     <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#ac4e2c]">{active.slug==='home'?'Welcome':'Explore'}</p>
     <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">{active.title}</h1>
     <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-[#344d5b]">{active.body}</p>
     {site.galleryImages.length>0&&<section className="mt-10"><h2 className="font-display text-2xl">From the gallery</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">{site.galleryImages.slice(0,6).map((image,i)=><img key={image.src+'-'+i}
       src={image.src} alt={image.alt} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />)}</div>
     </section>}
    </article>
    <aside className="self-start rounded-2xl border border-[#e4dbca] bg-white p-6">
     <h2 className="font-display text-2xl">Get in touch</h2>
     <p className="mt-3 text-sm leading-6 text-[#425869]">{site.shortDescription}</p>
     {safePhone&&<a href={'tel:'+safePhone} className="mt-5 block font-semibold text-[#9c482d]">{phone}</a>}
     {social&&<a href={social} target="_blank" rel="nofollow noopener noreferrer" className="mt-4 block text-sm font-semibold text-[#9c482d]">Social media ↗</a>}
     <p className="mt-8 border-t border-[#e4dbca] pt-4 text-xs text-[#61707b]">Website hosted by TexasDefined · Business information supplied by the owner</p>
    </aside>
   </div>
  </div>
 </main>;
}
