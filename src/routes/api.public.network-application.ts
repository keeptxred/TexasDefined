import { createFileRoute } from "@tanstack/react-router";

type ApplicationInput = Record<string, unknown>;
const allowedFields = ["businessName","category","description","city","address","phone","email","hours","website","social","services","faq","offer"] as const;
const clean = (value: unknown,max=1200) => typeof value === "string" ? value.trim().slice(0,max) : "";
const response = (body:object,status:number) => Response.json(body,{status,headers:{"Cache-Control":"no-store","X-Robots-Tag":"noindex, nofollow"}});
export const Route = createFileRoute("/api/public/network-application")({
  server: { handlers: {
    POST: async ({request}) => {
      // Noindex is not a launch gate. Reject ALL intake and media until explicitly armed.
      if(process.env.NETWORK_INTAKE_ENABLED!=='true'){
        // Wrangler's local proxy can die after an early POST response with an unread
        // body. Consume only a small, bounded amount; never buffer full media uploads.
        // The public intake remains disabled regardless of the request payload.
        if(request.body){
          const reader=request.body.getReader();
          let bytes=0;
          try{
            while(true){
              const part=await reader.read();
              if(part.done)break;
              bytes+=part.value.byteLength;
              if(bytes>65536){await reader.cancel();break}
            }
          }catch{try{await reader.cancel()}catch{}}
        }
        return response({error:"Network applications are not open yet."},503);
      }
      const origin=request.headers.get("Origin");
      if(origin) { let url:URL; try {url=new URL(origin)}catch{return response({error:"Invalid origin"},403)}
        if(!["texasdefined.com","www.texasdefined.com","localhost"].includes(url.hostname))return response({error:"Invalid origin"},403);
      }
      // A missing/spoofed Content-Length must never bypass the hard intake cap.
      // Bound actual streamed bytes BEFORE constructing FormData or buffering JSON.
      const {readBoundedNetworkIntakeBody}=await import("@/data/network-intake-limits.server");
      const boundedBody=await readBoundedNetworkIntakeBody(request);
      if(boundedBody===null)return response({error:"Request too large or unreadable"},413);
      let input:ApplicationInput;
      let uploadedLogo:File|null=null;
      let uploadedGallery:File[]=[];
      try {
        if(request.headers.get("content-type")?.includes("multipart/form-data")) {
          const form=await new Response(boundedBody,{headers:{"content-type":request.headers.get("content-type")||"application/octet-stream"}}).formData();
          const raw=form.get("application");
          if(typeof raw!=="string"||raw.length>24000)return response({error:"Invalid application"},400);
          input=JSON.parse(raw);
          uploadedLogo=form.get("logo") instanceof File ? form.get("logo") as File : null;
          uploadedGallery=form.getAll("gallery").filter((value):value is File=>value instanceof File);
          if(uploadedGallery.length>4)return response({error:"Choose up to four gallery images."},422);
          for(const file of [...(uploadedLogo?[uploadedLogo]:[]),...uploadedGallery]) {
            if(file.size>3000000||file.size===0||!["image/png","image/jpeg","image/webp"].includes(file.type))return response({error:"Each image must be JPEG, PNG or WebP and under 3 MB."},422);
            const bytes=new Uint8Array(await file.slice(0,12).arrayBuffer());
            const pngSignature=[137,80,78,71,13,10,26,10];
            const png=bytes.length>=pngSignature.length&&pngSignature.every((byte,index)=>bytes[index]===byte);
            const jpg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
            const webp=String.fromCharCode(...bytes.slice(0,4))==="RIFF"&&String.fromCharCode(...bytes.slice(8,12))==="WEBP";
            if(!(file.type==="image/png"&&png||file.type==="image/jpeg"&&jpg||file.type==="image/webp"&&webp))return response({error:"Invalid image data"},422);
          }
        } else {
          const raw=new TextDecoder("utf-8",{fatal:true}).decode(boundedBody);
          if(raw.length>24000)return response({error:"Request too large"},413);
          input=JSON.parse(raw);
        }
      } catch {return response({error:"Invalid application"},400)}
      if(!input || typeof input!=="object" || Array.isArray(input))return response({error:"Invalid application"},400);
      if(clean(input.websiteField))return response({ok:true},202); // Bot honeypot
      const {NETWORK_TERMS_VERSION,NETWORK_TERMS_SNAPSHOT_SHA256}=await import("@/data/network-terms");
      if(input.authorized!==true)return response({error:"You must confirm authority to represent this business."},422);
      if(input.factsAccepted!==true)return response({error:"You must accept responsibility for the facts and claims you submit."},422);
      if(input.mediaAccepted!==true)return response({error:"You must accept responsibility for image and media rights."},422);
      if(input.indexingAccepted!==true)return response({error:"You must acknowledge public search and third-party discovery of published content."},422);
      if(input.termsAccepted!==true||input.termsVersion!==NETWORK_TERMS_VERSION)
        return response({error:"You must accept the current TexasDefined Business Network Membership Terms."},422);
      const plan=input.plan==="plus"?"plus":input.plan==="basic"?"basic":null;
      const businessName=clean(input.businessName,160),category=clean(input.category,120),city=clean(input.city,160),email=clean(input.email,254);
      if(!plan||businessName.length<2||!category||!city||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return response({error:"Please complete all required fields and provide a valid email."},422);
      const record={
        plan, business_name:businessName, category, city, contact_email:email,
        description:clean(input.description,2400),address:clean(input.address,200),phone:clean(input.phone,80),
        hours:clean(input.hours,500),website:plan==="plus"?clean(input.website,300):null,
        social:plan==="plus"?clean(input.social,300):null,services:plan==="plus"?clean(input.services,1600):null,
        faq:plan==="plus"?clean(input.faq,1600):null,offer:plan==="plus"?clean(input.offer,500):null,
        terms_version:NETWORK_TERMS_VERSION,
        terms_snapshot_sha256:NETWORK_TERMS_SNAPSHOT_SHA256,
        terms_accepted_at:new Date().toISOString(),
        representative_authority_accepted:true,
        facts_responsibility_accepted:true,
        media_responsibility_accepted:true,
        search_indexing_accepted:true,
      };
      try {
        const {supabaseAdmin}=await import("@/integrations/supabase/client.server");
        // Check recent live submissions without revealing whether a particular email has an account.
        // The Cloudflare POST limiter remains the primary abuse control.
        const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const {data: recent,error: checkError}=await supabaseAdmin.from("texasdefined_network_applications")
          .select("business_name,city,status")
          .eq("contact_email",email).gte("created_at",cutoff)
          .in("status",["pending_review","approved","published"]).limit(200);
        if(checkError)throw new Error("Duplicate check temporarily unavailable");
        const normalize=(value:string)=>value.trim().normalize("NFKC").toLocaleLowerCase("en-US").replace(/\s+/g," ");
        if((recent||[]).some(entry=>normalize(entry.business_name)===normalize(businessName)&&normalize(entry.city)===normalize(city))){
          return response({error:"A recent application for this business has already been received. Contact Texas Defined if you need to correct it."},409);
        }
        const {data,error}=await supabaseAdmin.from("texasdefined_network_applications").insert(record as never).select("id").single();
        if(error?.code==="23505")return response({error:"An application for this business is already under review or active."},409);
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
          // Finalize references and enqueue receipt only once all objects exist.
          const {data:completed,error:finalizeError}=await supabaseAdmin.rpc(
            "finalize_texasdefined_network_intake",{
              p_application_id:applicationId,p_logo:logoPath,p_gallery:galleryPaths
            });
          if(finalizeError||completed!==true)throw new Error("Could not finalize application intake");
        }catch(err) {
          // Finalizer responses can be lost after a successful DB commit. Never
          // erase the completed application or duplicate its receipt because
          // the caller timed out waiting for a success response.
          const {data:current,error:readError}=await supabaseAdmin
            .from("texasdefined_network_applications")
            .select("intake_complete").eq("id",applicationId).maybeSingle();
          if(!readError && current?.intake_complete===true){
            return response({ok:true,applicationId,checkoutAvailable:false,
              message:"Application and images received for review. No listing has been published or charged."},201);
          }
          if(readError||!current){
            console.error("[network] incomplete intake could not be verified");
            return response({error:"Application status could not be confirmed. Contact Texas Defined before resubmitting."},503);
          }
          // An upload may have succeeded in Storage even when its HTTP reply
          // failed before savedPaths was updated. Enumerate the WHOLE private
          // folder, not merely locally acknowledged upload paths.
          const {networkIntakeCleanupObjectPaths,networkIntakeCleanupFolderIsEmpty}=
            await import("@/data/network-intake-cleanup.server");
          const storage=supabaseAdmin.storage.from(bucket);
          const {data:existingMedia,error:listError}=await storage.list(applicationId,{limit:100});
          const cleanupPaths=listError?null:networkIntakeCleanupObjectPaths(applicationId,existingMedia);
          let safelyRemoved=false;
          if(cleanupPaths!==null){
            const {error:removeError}=cleanupPaths.length
              ? await storage.remove(cleanupPaths)
              : {error:null};
            if(!removeError){
              const {data:remainingMedia,error:remainingError}=await storage.list(applicationId,{limit:100});
              safelyRemoved=!remainingError&&networkIntakeCleanupFolderIsEmpty(remainingMedia);
            }
          }
          if(safelyRemoved){
            // Never delete an application which another request just finalized.
            const {error:deleteError,count}=await supabaseAdmin
              .from("texasdefined_network_applications")
              .delete({count:"exact"}).eq("id",applicationId).eq("intake_complete",false);
            safelyRemoved=!deleteError&&count===1;
          }
          console.error("[network] incomplete intake compensation",{
            step:err instanceof Error?err.message:"unknown",cleaned:safelyRemoved,
          });
          return safelyRemoved
            ? response({error:"Image upload failed; please retry."},503)
            : response({error:"Upload was interrupted. Manual cleanup may be required before another submission. Contact Texas Defined."},503);
        }
        return response({ok:true,applicationId,checkoutAvailable:false,message:"Application and images received for review. No listing has been published or charged."},201);
      }catch(e){console.error("[network] server unavailable",e instanceof Error?e.message:"unknown");return response({error:"Application temporarily unavailable."},503)}
    }
  }}
});
