import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const listProfiles = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("texasdefined_network_applications")
    .select("id,business_name,category,city,description,plan,paid_entitlement_active")
    .eq("status", "published").order("business_name").limit(200);
  if (error) throw new Error("Network directory temporarily unavailable.");
  return data || [];
});

export const Route = createFileRoute("/network/directory")({
  loader: () => listProfiles(),
  head: () => ({
    meta: [
      { title: "Explore Texas Businesses & Organizations | Texas Defined Network" },
      { name: "description", content: "Discover Texas businesses, museums, organizations, and places through the Texas Defined Network." },
    ],
  }),
});

