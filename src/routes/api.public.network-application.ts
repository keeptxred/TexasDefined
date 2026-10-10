import { createFileRoute } from "@tanstack/react-router";

type ApplicationInput = Record<string, unknown>;
const allowedFields = ["businessName","category","description","city","address","phone","email","hours","website","social","services","faq","offer"] as const;
const clean = (value: unknown,max=1200) => typeof value === "string" ? value.trim().slice(0,max) : "";
const response = (body:object,status:number) => Response.json(body,{status,headers:{"Cache-Control":"no-store","X-Robots-Tag":"noindex, nofollow"}});
export const Route = createFileRoute("/api/public/network-application")({
  server: { handlers: {
    POST: async ({request}) => {
      const origin=request.headers.get("Origin");
      if(origin) { let url:URL; try {url=new URL(origin)}catch{return response({error:"Invalid origin"},403)}
        if(!["texasdefined.com","www.texasdefined.com","localhost"].includes(url.hostname))return response({error:"Invalid origin"},403);
      }
      if(Number(request.headers.get("content-length")||0)>16000000)return response({error:"Request too large"},413);
      let input:ApplicationInput;
      let uploadedLogo:File|null=null;
      let uploadedGallery:File[]=[];
      try {
        if(request.headers.get("content-type")?.includes("multipart/form-data")) {
          const form=await request.formData();
          const raw=form.get("application");
          if(typeof raw!=="string"||raw.length>24000)return response({error:"Invalid application"},400);
          input=JSON.parse(raw);
          uploadedLogo=form.get("logo") instanceof File ? form.get("logo") as File : null;
          uploadedGallery=form.getAll("gallery").filter((value):value is File=>value instanceof File);
          if(uploadedGallery.length>4)return response({error:"Choose up to four gallery images."},422);
          for(const file of [...(uploadedLogo?[uploadedLogo]:[]),...uploadedGallery]) {
            if(file.size>3000000||file.size===0||!["image/png","image/jpeg","image/webp"].includes(file.type))return response({error:"Each image must be JPEG, PNG or WebP and under 3 MB."},422);
            const bytes=new Uint8Array(await file.slice(0,12).arrayBuffer());
            const png=bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71;
            const jpg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
            const webp=String.fromCharCode(...bytes.slice(0,4))==="RIFF"&&String.fromCharCode(...bytes.slice(8,12))==="WEBP";
            if(!(file.type==="image/png"&&png||file.type==="image/jpeg"&&jpg||file.type==="image/webp"&&webp))return response({error:"Invalid image data"},422);
          }
        } else {
          const raw=await request.text();if(raw.length>24000)return response({error:"Request too large"},413);input=JSON.parse(raw);
        }
      } catch {return response({error:"Invalid application"},400)}
      if(!input || typeof input!=="object" || Array.isArray(input))return response({error:"Invalid application"},400);
      if(clean(input.websiteField))return response({ok:true},202); // Bot honeypot
      if(input.authorized!==true)return response({error:"You must confirm authority to submit this listing and media."},422);
      const plan=input.plan==="plus"?"plus":input.plan==="basic"?"basic":null;
      const businessName=clean(input.businessName,160),category=clean(input.category,120),city=clean(input.city,160),email=clean(input.email,254);
      if(!plan||businessName.length<2||!category||!city||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return response({error:"Please complete all required fields and provide a valid email."},422);
      const record={
        plan, business_name:businessName, category, city, contact_email:email,
        description:clean(input.description,2400),address:clean(input.address,200),phone:clean(input.phone,80),
        hours:clean(input.hours,500),website:plan==="plus"?clean(input.website,300):null,
        social:plan==="plus"?clean(input.social,300):null,services:plan==="plus"?clean(input.services,1600):null,
        faq:plan==="plus"?clean(input.faq,1600):null,offer:plan==="plus"?clean(input.offer,500):null,
      };
      try {
        const {supabaseAdmin}=await import("@/integrations/supabase/client.server");
        const {data,error}=await supabaseAdmin.from("texasdefined_network_applications").insert(record as never).select("id").single();
        if(error||!data){console.error("[network] insert failed",error?.code);return response({error:"Application could not be received. Try again later."},503)}
        const applicationId=(data as {id:string}).id;
        const bucket="texasdefined-network-applications";
        const savedPaths:string[]=[];
        const store=async(file:File,label:string)=>{
          const ext=file.type==="image/png"?"png":file.type==="image/webp"?"webp":"jpg";
          const key=applicationId+"/"+label+"."+ext;
          const {error:uploadError}=await supabaseAdmin.storage.from(bucket).upload(key,await file.arrayBuffer(),{contentType:file.type,upsert:false});
          if(uploadError)throw new Error("Private image upload failed");
          savedPaths.push(key);return key;
        };
        try {
          const logoPath=uploadedLogo?await store(uploadedLogo,"logo"):null;
          const galleryPaths:string[]=[];
          for(const [i,file] of (plan==="plus"?uploadedGallery:[]).entries())galleryPaths.push(await store(file,"gallery-"+(i+1)));
          if(logoPath||galleryPaths.length){
            const {error:mediaError}=await supabaseAdmin.from("texasdefined_network_applications").update({logo_storage_path:logoPath,gallery_storage_paths:galleryPaths} as never).eq("id",applicationId);
            if(mediaError)throw new Error("Could not attach uploaded media");
          }
        }catch(err) {
          if(savedPaths.length)await supabaseAdmin.storage.from(bucket).remove(savedPaths);
          await supabaseAdmin.from("texasdefined_network_applications").delete().eq("id",applicationId);
          console.error("[network] media save failed",err instanceof Error?err.message:"unknown");
          return response({error:"Image upload failed; please retry."},503);
        }
        return response({ok:true,applicationId,checkoutAvailable:false,message:"Application received. Checkout is temporarily unavailable; no charge was made."},201);
            }
          }
        }
        return response({ok:true,applicationId,checkoutAvailable:false,message:"Application and images received for review. No listing has been published or charged."},201);
      }catch(e){console.error("[network] server unavailable",e instanceof Error?e.message:"unknown");return response({error:"Application temporarily unavailable."},503)}
    }
  }}
});
