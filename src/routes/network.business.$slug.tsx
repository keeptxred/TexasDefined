import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

// The initial SSR HTML is strictly limited to independently published listings.
// Private applications and unpublished profiles never reach the browser loader.
const getPublishedProfile = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    if(process.env.NETWORK_DIRECTORY_ENABLED!=="true")return null;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) || data.slug.length > 120) return null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: listing, error } = await supabaseAdmin
      .from("texasdefined_network_public_listings")
      .select("slug,plan,profile,logo_storage_path,gallery_storage_paths")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error("Published business profile is temporarily unavailable.");
    return listing ? {...listing,indexable:true} : null;
  });

export const Route = createFileRoute("/network/business/$slug")({
  loader: async ({ params }) => {
    const listing = await getPublishedProfile({ data: { slug: params.slug } });
    if (!listing) throw notFound();
    return listing;
  },
  head: ({ loaderData, params }) => {
    const profile = loaderData?.profile as Record<string, unknown> | undefined;
    const businessName = typeof profile?.business_name === "string" && profile.business_name.trim()
      ? profile.business_name.trim()
      : "Texas Business";
    const description = typeof profile?.description === "string" && profile.description.trim()
      ? profile.description.trim()
      : `Published Texas business listing for ${businessName}, with visitor and business information.`;
    const canonicalPath = `/network/business/${params.slug}`;
    return {
      // The publisher-aware title governor is required even for future long
      // business names. Preserve the complete business name in the page body.
      meta: buildMeta(texasDefinedBrand, {
        title: businessName,
        description,
        canonicalPath,
        robots: loaderData?.indexable ? "index,follow" : "noindex,nofollow,noarchive",
      }),
      links: loaderData?.indexable ? [canonicalLink(texasDefinedBrand, canonicalPath)] : [],
    };
  },
});
