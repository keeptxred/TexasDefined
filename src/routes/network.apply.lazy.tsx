import "../network.css";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { NETWORK_TERMS_VERSION } from "@/data/network-terms";

export const Route = createLazyFileRoute("/network/apply")({ component: NetworkApplication });

type Plan = "basic" | "plus";
type Field = "businessName" | "category" | "description" | "city" | "address" | "phone" | "email" | "hours" | "website" | "social" | "services" | "faq" | "offer";
const INITIAL: Record<Field,string> = {businessName:"",category:"",description:"",city:"",address:"",phone:"",email:"",hours:"",website:"",social:"",services:"",faq:"",offer:""};
function NetworkApplication() {
  const {applicationsOpen}=Route.useLoaderData();
  const [plan,setPlan]=useState<Plan>("basic");
  useEffect(()=>{if(new URLSearchParams(window.location.search).get("plan")==="plus")setPlan("plus");},[]);
  const [fields,setFields]=useState(INITIAL);
  const [logo,setLogo]=useState<string|null>(null);
  const [logoFile,setLogoFile]=useState<File|null>(null);
  const [galleryFiles,setGalleryFiles]=useState<File[]>([]);
  const [gallery,setGallery]=useState<string[]>([]);
  const [error,setError]=useState("");
  const [saved,setSaved]=useState(false);
  const [submittedId,setSubmittedId]=useState<string|null>(null);
  const [sending,setSending]=useState(false);
  const [authorized,setAuthorized]=useState(false);
  const [factsAccepted,setFactsAccepted]=useState(false);
  const [mediaAccepted,setMediaAccepted]=useState(false);
  const [indexingAccepted,setIndexingAccepted]=useState(false);
  const [termsAccepted,setTermsAccepted]=useState(false);
  useEffect(()=>()=>{if(logo) URL.revokeObjectURL(logo);gallery.forEach(URL.revokeObjectURL)},[logo,gallery]);
  const update=(key:Field)=>(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>setFields(old=>({...old,[key]:event.target.value}));
  const input=(key:Field,label:string,required=false,placeholder="")=><label className="block text-sm font-semibold text-foreground">{label}<input required={required} name={key} value={fields[key]} placeholder={placeholder} type={key==="email"?"email":"text"} onChange={update(key)} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-normal" /></label>;
  const multi=(key:Field,label:string,maxLength=1200)=><label className="block text-sm font-semibold text-foreground">{label}<textarea name={key} maxLength={maxLength} value={fields[key]} onChange={update(key)} rows={4} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-normal" /></label>;
  function images(files:FileList|null,kind:"logo"|"gallery") {
    if(!files?.length)return;
    const items=Array.from(files);
    if(items.some(f=>!["image/jpeg","image/png","image/webp"].includes(f.type)||f.size>3_000_000)) {setError("Images must be JPEG, PNG or WebP and under 3 MB each.");return}
    setError("");
    if(kind==="logo"){setLogoFile(items[0]);setLogo(URL.createObjectURL(items[0]));}
    else {setGalleryFiles(items.slice(0,4));setGallery(items.slice(0,4).map(URL.createObjectURL));}
  }
  return <div className="bg-[#f9f6ef]">
    <Container width="wide" className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Texas Defined Network</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Build your business listing</h1>
      {!applicationsOpen&&<p role="status" className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-950">Preview only — Network applications and uploads are not open yet. You can explore the form locally without submitting any information.</p>}
      <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Create your business profile and see how it will appear as you enter the details. Every application is reviewed before publication. Plus applications undergo editorial review and independent ownership verification before payment becomes available.</p>
      <div className="mt-7 flex flex-wrap gap-3" role="group" aria-label="Listing plan">
        {(["basic","plus"] as const).map(t=><button key={t} type="button" disabled={submittedId!==null} onClick={()=>setPlan(t)} aria-pressed={plan===t} className={`rounded-full border px-6 py-3 font-semibold ${plan===t?"border-primary bg-primary text-primary-foreground":"border-border bg-white text-foreground"}`}>{t==="basic"?"Basic · Free":"Plus · $19.99/month"}</button>)}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form className="space-y-5 rounded-3xl border border-border bg-white p-6 sm:p-8" onSubmit={async e => {
          e.preventDefault();
          if(!applicationsOpen){setError("Network applications are not yet open.");return}
          setError("");
          setSending(true);
          try {
            let applicationId = submittedId;
            if (!applicationId) {
              setSaved(false);
              const form = new FormData();
              form.append("application", JSON.stringify({...fields,plan,authorized,factsAccepted,mediaAccepted,indexingAccepted,termsAccepted,termsVersion:NETWORK_TERMS_VERSION,websiteField:""}));
              if (logoFile) form.append("logo",logoFile);
              if (plan === "plus") galleryFiles.forEach(file => form.append("gallery",file));
              const response = await fetch("/api/public/network-application",{method:"POST",body:form});
              const result = await response.json();
              if (!response.ok || !result.applicationId) throw new Error(result.error || "Could not save your application.");
              applicationId = result.applicationId;
              setSubmittedId(applicationId);
              setSaved(true);
            }
          } catch (error) {
            setError(error instanceof Error ? error.message : "Submission unavailable");
          } finally { setSending(false); }
        }}>
          <h2 className="font-display text-3xl">Your information</h2>
          {input("businessName","Business or organization name",true,"Your business name")}
          {input("category","Business category",true,"e.g. Bakery, museum, contractor")}
          {input("city","Texas city or service area",true,"City, TX")}
          {input("address","Street address (optional for service-area businesses)")}
          {input("phone","Public business phone")}
          {input("email","Contact email (not displayed publicly)",true)}
          {input("hours","Business hours")}
          {multi("description","Tell visitors about your business")}
          <label className="block text-sm font-semibold">Business logo or brand image <input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>images(e.target.files,"logo")} className="mt-2 block w-full text-sm" /></label>
          {plan==="plus"&&<div className="space-y-5 border-t border-border pt-6">
            <h3 className="font-display text-2xl">Plus profile enhancements</h3>
            {input("website","Official website")}
            {input("social","Social media page")}
            {multi("services","Services, products and specialties")}
            {multi("faq","Frequently asked questions")}
            {input("offer","Current event, offer or announcement")}
            <label className="block text-sm font-semibold">Gallery (up to four images) <input type="file" multiple accept="image/png,image/jpeg,image/webp" onChange={e=>images(e.target.files,"gallery")} className="mt-2 block w-full text-sm"/></label>
          </div>}
          <div className="space-y-4 border-t border-border pt-6">
            <h3 className="font-display text-2xl">Required acknowledgments</h3>
            <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={authorized} onChange={e=>setAuthorized(e.target.checked)} className="mt-1 h-5 w-5" /><span>I am authorized to represent this business or organization and to submit this listing on its behalf.</span></label>
            <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={factsAccepted} onChange={e=>setFactsAccepted(e.target.checked)} className="mt-1 h-5 w-5" /><span><strong>My facts are my responsibility.</strong> I am responsible for the accuracy and legality of every fact, claim, price, offer, credential, service description, business hour, contact detail and other statement I submit. TexasDefined does not fact-check customer-supplied listing content.</span></label>
            <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={mediaAccepted} onChange={e=>setMediaAccepted(e.target.checked)} className="mt-1 h-5 w-5" /><span><strong>My images and media are my responsibility.</strong> I own them or have all copyright, trademark, privacy, publicity, model/property release and other permissions needed for TexasDefined to display and use them for my listing. I accept responsibility for claims arising from material I submit.</span></label>
            <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={indexingAccepted} onChange={e=>setIndexingAccepted(e.target.checked)} className="mt-1 h-5 w-5" /><span><strong>I understand publication is public.</strong> If approved and published, my listing, website link, facts, logo and images may be crawled, indexed, cached, excerpted or surfaced by Google, Bing, other search engines, AI/answer systems, social networks, archives, directories and other third-party discovery services. TexasDefined cannot control third-party indexing or caching.</span></label>
            <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={termsAccepted} onChange={e=>setTermsAccepted(e.target.checked)} className="mt-1 h-5 w-5" /><span>I agree to the <a href="/network/terms" target="_blank" rel="noreferrer" className="font-semibold text-primary underline">TexasDefined Business Network Membership Terms</a> (version {NETWORK_TERMS_VERSION}) and acknowledge the <a href="/privacy" target="_blank" rel="noreferrer" className="font-semibold text-primary underline">Privacy Policy</a>.</span></label>
          </div>
          {saved&&<p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-900">Your application has been received for review. It is not public. Plus applicants must separately confirm their email and complete independent business-ownership verification with TexasDefined before billing can be enabled.</p>}
          {saved && plan==="plus" && <p className="text-sm text-muted-foreground">After editorial review, <a href="/business/dashboard" className="font-semibold text-primary underline">sign in with your application email</a> to prepare for verified owner access. Signing in does not grant access or activate billing.</p>}
          {error&&<p role="status" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{error}</p>}
          <button type="submit" disabled={!applicationsOpen || sending || (saved && plan==="basic")} className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-50">{sending?"Processing…":saved?"Application received":"Submit listing for review"}</button>
          <p className="text-xs text-muted-foreground">Application details and media are submitted privately for review. Nothing is public until TexasDefined approves and publishes the listing. Once published, approved public-facing content can be indexed or cached by third parties. Plus payment is unavailable until the required review and independent ownership verification are complete.</p>
        </form>
        <aside className="self-start lg:sticky lg:top-28" aria-label="Live listing preview">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-xl">
            <div className="relative min-h-44 bg-gradient-to-br from-[#163f61] via-[#35766c] to-[#d89a52] p-7 text-white">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">Listing preview · {plan}</span>
              {logo&&<img src={logo} alt="Uploaded business logo preview" className="mt-6 h-24 w-24 rounded-2xl border-2 border-white bg-white object-contain p-1"/>}
            </div>
            <div className="space-y-5 p-7">
              <div><h2 className="font-display text-3xl">{fields.businessName||"Your business name"}</h2><p className="mt-2 text-sm text-muted-foreground">{[fields.category,fields.city].filter(Boolean).join(" · ")||"Your category · Texas"}</p></div>
              <p className="whitespace-pre-wrap leading-7 text-muted-foreground">{fields.description||"Your business story appears here. Describe what makes your Texas business unique."}</p>
              {fields.address&&<p><strong>Location: </strong>{fields.address}</p>}
              {fields.phone&&<p><strong>Phone: </strong>{fields.phone}</p>}
              {fields.hours&&<p><strong>Hours: </strong>{fields.hours}</p>}
              {plan==="plus"&&<>
                {fields.website&&<p><strong>Website: </strong><span className="text-primary">{fields.website}</span></p>}
                {fields.social&&<p><strong>Social: </strong>{fields.social}</p>}
                {fields.services&&<div><h3 className="font-display text-xl">What we offer</h3><p className="mt-1 whitespace-pre-wrap">{fields.services}</p></div>}
                {gallery.length>0&&<div className="grid grid-cols-3 gap-2">{gallery.map((url,i)=><img key={url} src={url} alt={`Business gallery preview ${i+1}`} className="aspect-square rounded-xl object-cover"/>)}</div>}
                {fields.faq&&<div><h3 className="font-display text-xl">Frequently asked questions</h3><p className="mt-1 whitespace-pre-wrap">{fields.faq}</p></div>}
                {fields.offer&&<p className="rounded-xl bg-[#fff1d9] p-4"><strong>News and offers: </strong>{fields.offer}</p>}
              </>}
              <p className="border-t border-border pt-4 text-xs text-muted-foreground">Preview only. All listings are reviewed before publication.</p>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  </div>
}
