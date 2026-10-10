import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const auth = z.string().min(20).max(200);
const id = z.string().uuid();
const status = z.enum(["pending_review", "approved", "rejected", "published"]);

export const loadNetworkApplications = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessKey: auth }))
  .handler(async ({ data }) => {
    const { assertSportsPartnerAccess } = await import("@/data/sports-partner-leads.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await assertSportsPartnerAccess(data.accessKey);
    const { data: applications, error } = await supabaseAdmin
      .from("texasdefined_network_applications")
      .select("id,created_at,status,plan,business_name,category,city,contact_email,phone,website,paid_entitlement_active")
      .order("created_at", { ascending: false }).limit(100);
    if (error) throw new Error("Unable to load listing applications.");
    return applications || [];
  });

export const updateNetworkApplication = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessKey: auth, id, status }))
  .handler(async ({ data }) => {
    // Legacy moderation must use the same editorial and publication gates as the admin UI.
    // Never update the application to "published" without creating its reviewed public profile.
    const { setNetworkApplicationReview, publishApprovedNetworkListing } =
      await import("@/data/network-review.server");
    if (data.status === "published") {
      const result = await publishApprovedNetworkListing(data.accessKey, data.id);
      return { ok: true, status: "published" as const, url: result.url };
    }
    const action = data.status === "approved"
      ? "approve" as const
      : data.status === "rejected" ? "reject" as const : "reopen" as const;
    const result = await setNetworkApplicationReview(data.accessKey, data.id, action);
    return { ok: true, status: result.status };
  });
