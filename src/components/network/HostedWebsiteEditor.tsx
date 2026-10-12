import type {HostedWebsiteDraftInput,HostedWebsitePageInput,WebsiteHostingTier} from '@/data/network-commercial-model';
import {getWebsiteHostingEntitlements,validateHostedWebsiteDraft} from '@/data/network-commercial-model';

type Props={
 tier:WebsiteHostingTier;
 draft:HostedWebsiteDraftInput;
 onChange:(next:HostedWebsiteDraftInput)=>void;
 onSave?:()=>void;
 saving?:boolean;
};

/** Reusable owner text/page editor. Parent must verify identity and persist via an audited server action. */
export function HostedWebsiteEditor({tier,draft,onChange,onSave,saving=false}:Props){
 const limits=getWebsiteHostingEntitlements(tier);
 if(!limits)return null;
 const check=validateHostedWebsiteDraft(tier,draft);
 const updatePage=(index:number,partial:Partial<HostedWebsitePageInput>)=>{
  onChange({...draft,pages:draft.pages.map((page,i)=>i===index?{...page,...partial}:page)});
 };
 const addPage=()=>{
  if(draft.pages.length>=limits.maxPages)return;
  const seen=new Set(draft.pages.map(p=>p.slug));
  let num=2;
  while(seen.has('new-page-'+num))num++;
  const pages=[...draft.pages,{slug:'new-page-'+num,title:'New Page '+num,body:'Add helpful, original information about your business.'}];
  onChange({...draft,pages});
 };
 return <section aria-label="Website content editor" className="rounded-2xl border border-border bg-white p-5 sm:p-8">
  <div className="flex flex-wrap items-start justify-between gap-3">
   <div><h2 className="font-display text-2xl">Edit your website</h2>
    <p className="mt-2 text-sm text-muted-foreground">This is the same page structure used for all three hosting tiers. Edit as often as needed. Page and image counts have limits.</p></div>
   <p className="rounded-full border border-border px-3 py-2 text-sm font-semibold">{draft.pages.length} of {limits.maxPages} pages</p>
  </div>
  <label className="mt-6 block text-sm font-semibold" htmlFor="hosted-business-name">Business name</label>
  <input id="hosted-business-name" maxLength={140} value={draft.businessName}
   onChange={event=>onChange({...draft,businessName:event.target.value})}
   className="mt-2 w-full rounded-lg border border-border bg-background p-3" />
  <div className="mt-6 grid gap-6">
   {draft.pages.map((page,i)=><fieldset key={page.slug} className="rounded-xl border border-border p-4">
    <legend className="px-2 font-semibold">Page {i+1} · /{page.slug}</legend>
    <label htmlFor={'hosted-title-'+page.slug} className="mt-2 block text-sm font-semibold">Page title</label>
    <input id={'hosted-title-'+page.slug} value={page.title} maxLength={110}
      onChange={event=>updatePage(i,{title:event.target.value})}
      className="mt-2 w-full rounded-lg border border-border p-3"/>
    <label htmlFor={'hosted-body-'+page.slug} className="mt-4 block text-sm font-semibold">Page content</label>
    <textarea id={'hosted-body-'+page.slug} value={page.body} rows={5} maxLength={12000}
      onChange={event=>updatePage(i,{body:event.target.value})}
      className="mt-2 w-full rounded-lg border border-border p-3"/>
    {i>0&&<button type="button" onClick={()=>onChange({...draft,pages:draft.pages.filter((_,j)=>j!==i)})}
      className="mt-3 text-sm font-semibold text-destructive underline">Remove this page</button>}
   </fieldset>)}
  </div>
  <div className="mt-6 flex flex-wrap items-center gap-3">
   <button type="button" onClick={addPage} disabled={draft.pages.length>=limits.maxPages}
    className="rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary disabled:opacity-50">Add page</button>
   {onSave&&<button type="button" onClick={onSave} disabled={saving||!check.ok}
    className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">
    {saving?'Saving…':'Save draft'}</button>}
  </div>
  {!check.ok&&<p role="alert" className="mt-4 text-sm text-destructive">{check.reason}</p>}
  <p className="mt-4 text-xs text-muted-foreground">Updates to a real customer's website must pass owner authorization, paid-hosting verification and publication review before they appear publicly.</p>
 </section>;
}
