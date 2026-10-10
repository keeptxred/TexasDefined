import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/network/apply")({ component: NetworkApplication });

type Plan = "basic" | "plus";
type Field = "businessName" | "category" | "description" | "city" | "address" | "phone" | "email" | "hours" | "website" | "social" | "services" | "faq" | "offer";
const INITIAL: Record<Field,string> = {businessName:"",category:"",description:"",city:"",address:"",phone:"",email:"",hours:"",website:"",social:"",services:"",faq:"",offer:""};
function NetworkApplication() {
  const [plan,setPlan]=useState<Plan>("basic");
  useEffect(()=>{if(new URLSearchParams(window.location.search).get("plan")==="plus")setPlan("plus");},[]);
  const [fields,setFields]=useState(INITIAL);
  const [logo,setLogo]=useState<string|null>(null);
  const [logoFile,setLogoFile]=useState<File|null>(null);
  const [galleryFiles,setGalleryFiles]=useState<File[]>([]);
  const [gallery,setGallery]=useState<string[]>([]);
  const [error,setError]=useState("");
  const [saved,setSaved]=useState(false);
  const [sending,setSending]=useState(false);
  const [authorized,setAuthorized]=useState(false);
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
  return <main className="bg-[#f9f6ef]">
    <Container width="wide" className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Texas Defined Network</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Build your business listing</h1>
      <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Enter your details and see how your listing will appear before submitting. This is an unlisted preview builder; submissions are reviewed before publication, and no payments are taken on this form.</p>
      <div className="mt-7 flex flex-wrap gap-3" role="group" aria-label="Listing plan">
        {(["basic","plus"] as const).map(t=><button key={t} type="button" onClick={()=>setPlan(t)} aria-pressed={plan===t} className={`rounded-full border px-6 py-3 font-semibold ${plan===t?"border-primary bg-primary text-primary-foreground":"border-border bg-white text-foreground"}`}>{t==="basic"?"Basic · Free":"Plus · $19.99/month"}</button>)}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form className="space-y-5 rounded-3xl border border-border bg-white p-6 sm:p-8" onSubmit={async e=>{e.preventDefault();setError("");setSaved(false);setSending(true);try{const r=await fetch("/api/public/network-application",{method:"POST",body:(()=>{const form=new FormData();form.append("application",JSON.stringify({...fields,plan,authorized,websiteField:""}));if(logoFile)form.append("logo",logoFile);if(plan==="plus")galleryFiles.forEach(file=>form.append("gallery",file));return form})()});const result=await r.json();if(!r.ok)throw new Error(result.error||"Unable to submit");setSaved(true);if(plan==="plus" && result.applicationId){const payment=await fetch("/api/public/network-checkout",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({applicationId:result.applicationId,email:fields.email})});const checkout=await payment.json();if(!payment.ok||!checkout.url)throw new Error(checkout.error||"Application received, but checkout is unavailable. Contact us with your business name; please do not submit a duplicate application.");window.location.assign(checkout.url)}}catch(err){setError(err instanceof Error?err.message:"Submission unavailable")}finally{setSending(false)}}}>
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
          <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required checked={authorized} onChange={e=>setAuthorized(e.target.checked)} className="mt-1 h-5 w-5" /><span>I am authorized to represent this organization, and I have permission to supply its name, branding and images for a Texas Defined listing. I understand the listing will be reviewed before publication.</span></label>
          {saved&&<p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-900">Your application has been received for review. No payment was taken and the profile is not public yet.</p>}
          {error&&<p role="status" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{error}</p>}
          <button type="submit" disabled={sending} className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-50">{sending?"Sending…":"Submit listing for review"}</button>
          <p className="text-xs text-muted-foreground">Your selected images and application details are submitted privately for review. No payment is taken.</p>
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
  </main>
}
