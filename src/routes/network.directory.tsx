import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const listProfiles = createServerFn({ method: "GET" }).handler(async () => {
  // Never index an empty, unreleased directory; public visibility is armed by
  // the same production gate that permits reading editorially published rows.
  if(process.env.NETWORK_DIRECTORY_ENABLED!=="true")return {profiles:[],indexable:false};
  const {networkCustomerLaunchArmed}=await import("@/data/network-atomic-launch-readiness.server");
  if(!networkCustomerLaunchArmed(process.env))return {profiles:[],indexable:false};
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // Only independently published public profiles appear here, never the private intake table.
  // Published Featured listings have an explicitly labeled sponsored
  // directory lane, independently of editorial chronology. A separate
  // capped retrieval prevents older sponsored profiles being excluded merely
  // because a busy directory has newer ordinary submissions.
  const [sponsored,ordinary] = await Promise.all([
    supabaseAdmin.from("texasdefined_network_public_listings")
      .select("slug,plan,profile").eq("is_published",true).eq("plan","featured")
      .order("published_at",{ascending:false}).limit(200),
    supabaseAdmin.from("texasdefined_network_public_listings")
      .select("slug,plan,profile").eq("is_published", true)
      .order("published_at", { ascending: false }).limit(200),
  ]);
  if (sponsored.error || ordinary.error)
    throw new Error("Network directory temporarily unavailable.");
  const seen = new Set<string>();
  const published = [...(sponsored.data||[]),...(ordinary.data||[])].filter(row => {
    if(seen.has(row.slug))return false;
    seen.add(row.slug);
    return true;
  });
  const profiles = published.map((row) => {
    const fields = row.profile as Record<string, unknown>;
    const safe = (key: string) => typeof fields?.[key] === "string" ? String(fields[key]) : "";
    return {
      slug: row.slug,
      plan: row.plan,
      business_name: safe("business_name"),
      category: safe("category"),
      city: safe("city"),
      description: safe("description"),
    };
  });
  return {profiles,indexable:profiles.length>0 && process.env.NETWORK_ISOLATED_STAGING!=='true'};
});

export const Route = createFileRoute("/network/directory")({
  loader: () => listProfiles(),
  head: ({loaderData}) => ({
    meta: [
      { title: "Explore Texas Businesses & Organizations | Texas Defined Network" },
      { name: "robots", content: loaderData?.indexable ? "index,follow" : "noindex,nofollow,noarchive" },
      { name: "description", content: "Discover Texas businesses, museums, organizations, and places through the Texas Defined Network." },
    ],
    links:loaderData?.indexable ? [{rel:"canonical",href:"https://texasdefined.com/network/directory"}] : [],
  }),
});

