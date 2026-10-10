import { createFileRoute } from "@tanstack/react-router";

const reply = (data: unknown, status = 200) => Response.json(data, {
  status, headers: { "cache-control": "no-store" },
});
const PRICE_ID = "price_1UP28XLtRurj6GMNwFlYDW6N";

export const Route = createFileRoute("/api/public/network-checkout")({
  server: { handlers: { POST: async ({ request }) => {
    const origin = new URL(request.url).origin;
    if (request.headers.get("origin") !== origin) return reply({ error: "Invalid request origin." }, 403);
    let body: { applicationId?: string; email?: string };
    try { body = await request.json(); } catch { return reply({ error: "Invalid request." }, 400); }
    if (!body || !/^[0-9a-f-]{36}$/i.test(body.applicationId || "")) return reply({ error: "Application not found." }, 400);
    // Contact-email knowledge is not proof of business ownership. Require a confirmed sign-in before billing.
    const bearer = request.headers.get("authorization")?.match(/^Bearer ([\w.-]+)$/)?.[1];
    if (!bearer) return reply({ error: "Sign in with your confirmed application email before checkout." }, 401);
    const {stripeCheckoutEnabled,createNetworkCheckoutSession}=await import("@/data/network-stripe.server");
    if (!stripeCheckoutEnabled()) return reply({ error: "Subscription checkout is not yet activated." }, 503);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: verified, error: authError } = await supabaseAdmin.auth.getUser(bearer);
    if (authError || !verified.user?.email_confirmed_at || !verified.user.email ||
        verified.user.email.trim().toLowerCase() !== String(body.email || "").trim().toLowerCase()) {
      return reply({ error: "A verified application-email account is required for checkout." }, 403);
    }
    const { data, error } = await supabaseAdmin.from("texasdefined_network_applications")
      .select("id,plan,status,contact_email,paid_entitlement_active,stripe_subscription_id").eq("id", body.applicationId).single();
    if (error || !data || data.plan !== "plus" || data.status !== "approved" ||
        data.contact_email.toLowerCase() !== String(body.email || "").trim().toLowerCase()) {
      return reply({ error: "This application is not eligible for checkout." }, 422);
    }
    // Verified email alone does not prove control of the business. A reviewed owner binding is required.
    const { data: ownership, error: ownershipError } = await supabaseAdmin
      .from("texasdefined_network_business_accounts")
      .select("application_id")
      .eq("application_id", data.id)
      .eq("owner_user_id", verified.user.id)
      .eq("access_enabled", true)
      .maybeSingle();
    if (ownershipError || !ownership) {
      return reply({ error: "Business ownership must be verified before subscription checkout." }, 403);
    }
    // A paid or previously-created subscription must be managed through billing, not duplicated by Checkout.
    if (data.paid_entitlement_active || data.stripe_subscription_id) {
      return reply({ error: "A subscription already exists for this application. Use membership billing to manage it." }, 409);
    }
    try {
      const url=await createNetworkCheckoutSession(data.id,data.contact_email);
      return reply({ok:true,url});
    } catch (error) {
      console.error("[network] Stripe checkout creation failed",error instanceof Error?error.message:"unknown");
      return reply({error:"Checkout could not be started."},503);
    }

  } } },
});
