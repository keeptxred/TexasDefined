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
    // Serialize parallel calls in the private DB, reusing only a still-live Stripe URL.
    const {isNetworkCheckoutUrl}=await import("@/data/network-stripe.server");
    const {data:reservation,error:reserveError}=await supabaseAdmin.rpc(
      "reserve_texasdefined_network_checkout",{p_application_id:data.id,p_owner_user_id:verified.user.id}
    );
    if(reserveError||!reservation||typeof reservation!=="object")
      return reply({error:"Checkout reservation is unavailable."},503);
    const status=(reservation as {status?:unknown}).status;
    if(status==="not_eligible")return reply({error:"This application is not eligible for checkout."},422);
    if(status==="busy")return reply({error:"Checkout is already being prepared; retry shortly."},409);
    if(status==="reuse"){
      const url=(reservation as {url?:unknown}).url;
      return isNetworkCheckoutUrl(url)?reply({ok:true,url}):reply({error:"Checkout link is unavailable."},503);
    }
    const key=(reservation as {attemptKey?:unknown}).attemptKey;
    if(status!=="create"||typeof key!=="string"||!/^[0-9a-f-]{36}$/i.test(key))
      return reply({error:"Checkout reservation could not be completed."},503);
    try {
      const session=await createNetworkCheckoutSession(data.id,data.contact_email,key);
      const {data:finalized,error:finalizeError}=await supabaseAdmin.rpc(
        "complete_texasdefined_network_checkout",{
          p_application_id:data.id,p_owner_user_id:verified.user.id,p_attempt_key:key,
          p_session_id:session.sessionId,p_checkout_url:session.url,p_expires_at:session.expiresAt,
        }
      );
      if(finalizeError||finalized!==true)return reply({error:"Checkout session verification incomplete. Retry shortly."},503);
      return reply({ok:true,url:session.url});
    } catch (error) {
      console.error("[network] Stripe checkout creation failed",error instanceof Error?error.message:"unknown");
      return reply({error:"Checkout could not be started."},503);
    }

  } } },
});
