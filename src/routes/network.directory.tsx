import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const listProfiles = createServerFn({ method: "GET" }).handler(async () => {
  // Never index an empty, unreleased directory; public visibility is armed by
  // the same production gate that permits reading editorially published rows.
  if(process.env.NETWORK_DIRECTORY_ENABLED!=="true")return {profiles:[],indexable:false};
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // Only independently published public profiles appear here, never the private intake table.
  const { data, error } = await supabaseAdmin.from("texasdefined_network_public_listings")
    .select("slug,plan,profile").eq("is_published", true)
    .order("published_at", { ascending: false }).limit(200);
  if (error) throw new Error("Network directory temporarily unavailable.");
  const profiles = (data || []).map((row) => {
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
  return {profiles,indexable:profiles.length>0};
});

export const Route = createFileRoute("/network/directory")({
  loader: () => listProfiles(),
  head: ({loaderData}) => ({
    meta: [
      { title: "Explore Texas Businesses & Organizations | Texas Defined Network" },
      { name: "robots", content: loaderData?.indexable ? "index,follow" : "noindex,nofollow,noarchive" },
      { name: "description", content: "Discover Texas businesses, museums, organizations, and places through the Texas Defined Network." },
    ],
  }),
});

