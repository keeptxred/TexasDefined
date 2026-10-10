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
    const { assertSportsPartnerAccess } = await import("@/data/sports-partner-leads.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await assertSportsPartnerAccess(data.accessKey);
    const { data: existing, error: readError } = await supabaseAdmin
      .from("texasdefined_network_applications")
      .select("plan,status,paid_entitlement_active").eq("id", data.id).maybeSingle();
    if (readError || !existing) throw new Error("Application not found.");
    const record = existing as { plan: string; status: string; paid_entitlement_active: boolean };
    if (data.status === "published") {
      if (record.status !== "approved" && record.status !== "published") throw new Error("Approve the application first.");
      if (record.plan === "plus" && !record.paid_entitlement_active) throw new Error("Plus membership cannot be published until subscription payment is verified.");
    }
    const { error } = await supabaseAdmin.from("texasdefined_network_applications")
      .update({ status: data.status, updated_at: new Date().toISOString() } as never)
      .eq("id", data.id);
    if (error) throw new Error("Unable to update application.");
    return { ok: true, status: data.status };
  });
