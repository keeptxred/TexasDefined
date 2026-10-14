import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

// The initial SSR HTML is strictly limited to independently published listings.
// Private applications and unpublished profiles never reach the browser loader.
const getPublishedProfile = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    if(process.env.NETWORK_DIRECTORY_ENABLED!=="true")return null;
    const {networkCustomerLaunchArmed}=await import("@/data/network-atomic-launch-readiness.server");
    if(!networkCustomerLaunchArmed(process.env))return null;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) || data.slug.length > 120) return null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: listing, error } = await supabaseAdmin
      .from("texasdefined_network_public_listings")
      .select("slug,plan,profile,logo_storage_path,gallery_storage_paths")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error("Published business profile is temporarily unavailable.");
    const {projectNetworkPublicProfile}=await import("@/data/network-public-profile-policy");
    const visible=listing?projectNetworkPublicProfile(listing):null;
    return visible ? {...visible,indexable:process.env.NETWORK_ISOLATED_STAGING!=='true'} : null;
  });

export const Route = createFileRoute("/network/business/$slug")({
  loader: async ({ params }) => {
    const listing = await getPublishedProfile({ data: { slug: params.slug } });
    if (!listing) throw notFound();
    return listing;
  },
  head: ({ loaderData }) => {
    // Only editorially published, projected public fields may enter the head.
    // Staging and unlaunched routes never advertise an indexable canonical URL.
    const profile = (loaderData?.profile ?? {}) as Record<string,unknown>;
    const safe = (key:string) =>
      typeof profile[key]==="string" ? (profile[key] as string).replace(/\s+/g," ").trim() : "";
    const name = safe("business_name") || "Texas Business";
    const area = [safe("category"),safe("city")].filter(Boolean).join(" in ");
    const summary = safe("description");
    const description = (summary.length>=20
      ? summary : `Explore ${name}${area ? " — "+area : ""} on the Texas Defined Network.`).slice(0,160);
    const canonical = loaderData?.indexable && loaderData.slug
      ? `https://texasdefined.com/network/business/${encodeURIComponent(loaderData.slug)}` : null;
    return {
      meta: [
        { title: `${name} | Texas Defined Network` },
        { name:"description", content:description },
        { name:"robots", content:loaderData?.indexable ? "index,follow" : "noindex,nofollow,noarchive" },
        { property:"og:title", content:`${name} | Texas Defined Network` },
        { property:"og:description", content:description },
        ...(canonical ? [{property:"og:url",content:canonical}] : []),
      ],
      links: canonical ? [{rel:"canonical",href:canonical}] : [],
    };
  },
});
