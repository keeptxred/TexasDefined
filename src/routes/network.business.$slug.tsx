import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

// The initial SSR HTML is strictly limited to independently published listings.
// Private applications and unpublished profiles never reach the browser loader.
const getPublishedProfile = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) || data.slug.length > 120) return null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: listing, error } = await supabaseAdmin
      .from("texasdefined_network_public_listings")
      .select("slug,plan,profile,logo_storage_path,gallery_storage_paths")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw new Error("Published business profile is temporarily unavailable.");
    return listing;
  });

export const Route = createFileRoute("/network/business/$slug")({
  loader: async ({ params }) => {
    const listing = await getPublishedProfile({ data: { slug: params.slug } });
    if (!listing) throw notFound();
    return listing;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${typeof (loaderData?.profile as Record<string,unknown> | undefined)?.business_name === "string" ? (loaderData?.profile as Record<string,unknown>).business_name : "Texas Business"} | Texas Defined Network` },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
});
