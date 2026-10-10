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
      if(Number(request.headers.get("content-length")||0)>24000)return response({error:"Request too large"},413);
      let input:ApplicationInput;
      try {const raw=await request.text();if(raw.length>24000)return response({error:"Request too large"},413);input=JSON.parse(raw)} catch {return response({error:"Invalid application"},400)}
      if(!input || typeof input!=="object" || Array.isArray(input))return response({error:"Invalid application"},400);
      if(clean(input.websiteField))return response({ok:true},202); // Bot honeypot
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
        const {error}=await supabaseAdmin.from("texasdefined_network_applications").insert(record as never);
        if(error){console.error("[network] insert failed",error.code);return response({error:"Application could not be received. Try again later."},503)}
        return response({ok:true,message:"Application received for review. No listing has been published or charged."},201);
      }catch(e){console.error("[network] server unavailable",e instanceof Error?e.message:"unknown");return response({error:"Application temporarily unavailable."},503)}
    }
  }}
});
