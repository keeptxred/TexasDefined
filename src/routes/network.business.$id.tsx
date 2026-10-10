import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

type PublicProfile = {
  id: string; plan: "basic" | "plus"; business_name: string; category: string;
  city: string; description: string; address: string | null; phone: string | null;
  hours: string | null; website: string | null; social: string | null;
  services: string | null; faq: string | null; offer: string | null;
  logoUrl: string | null; galleryUrls: string[];
};
const getProfile = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }): Promise<PublicProfile | null> => {
    if (!/^[0-9a-f-]{36}$/i.test(data.id)) return null;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("texasdefined_network_applications")
      .select("id,plan,status,paid_entitlement_active,business_name,category,city,description,address,phone,hours,website,social,services,faq,offer,logo_storage_path,gallery_storage_paths")
      .eq("id", data.id)
      .eq("status", "published")
      .maybeSingle();
    if (error || !row) return null;
    const profile = row as unknown as PublicProfile & { paid_entitlement_active: boolean; logo_storage_path: string | null; gallery_storage_paths: string[] };
    const isPlus = profile.plan === "plus" && profile.paid_entitlement_active;
    const bucket = supabaseAdmin.storage.from('texasdefined-network-applications');
    const mediaUrl = async (path: string | null): Promise<string | null> => {
      if (!path) return null;
      const { data: signed, error: mediaError } = await bucket.createSignedUrl(path, 3600);
      return mediaError ? null : signed?.signedUrl || null;
    };
    const logoUrl = await mediaUrl(profile.logo_storage_path);
    const galleryUrls = isPlus ? (await Promise.all((profile.gallery_storage_paths || []).slice(0,4).map(mediaUrl))).filter((url): url is string => !!url) : [];
    return {
      id: profile.id, plan: isPlus ? "plus" : "basic",
      business_name: profile.business_name, category: profile.category, city: profile.city,
      description: profile.description, address: profile.address, phone: profile.phone, hours: profile.hours,
      website: isPlus ? profile.website : null,
      social: isPlus ? profile.social : null,
      services: isPlus ? profile.services : null,
      faq: isPlus ? profile.faq : null,
      offer: isPlus ? profile.offer : null,
      logoUrl, galleryUrls,
    };
  });

export const Route = createFileRoute("/network/business/$id")({
  loader: ({ params }) => getProfile({ data: { id: params.id } }),
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.business_name} | Texas Defined Network` },
      { name: "description", content: loaderData.description.slice(0, 155) || `Discover ${loaderData.business_name} in ${loaderData.city}, Texas.` },
      { name: "robots", content: "index,follow" },
    ] : [{ title: "Listing unavailable | Texas Defined" }, { name: "robots", content: "noindex,nofollow" }],
  }),
});

