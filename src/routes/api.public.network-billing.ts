import { createFileRoute } from "@tanstack/react-router";

const respond = (data: unknown, status = 200) => Response.json(data, {
  status, headers: { "cache-control": "no-store" },
});

/** Drain a bounded amount of the rejected POST body to keep the local
 * Cloudflare Workers Assets / Miniflare proxy's request lifecycle valid.
 * Never allocate or wait for a full untrusted upload on an unauthorized call. */
async function discardRejectedNetworkPostBody(request: Request) {
  if (!request.body) return;
  const reader = request.body.getReader();
  let total = 0;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) return;
      total += next.value.byteLength;
      if (total > 65_536) { await reader.cancel(); return; }
    }
  } catch {
    try { await reader.cancel(); } catch {}
  }
}

async function owner(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer ([\w.-]+)$/)?.[1];
  if (!token) return null;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  const user = data.user;
  if (error || !user?.email || !user.email_confirmed_at) return null;
  return { client: supabaseAdmin, email: user.email.toLowerCase(), userId: user.id };
}

export const Route = createFileRoute("/api/public/network-billing")({
  server: { handlers: {
    GET: async ({ request }) => {
      const auth = await owner(request);
      if (!auth) return respond({ error: "Sign in to manage your subscription." }, 401);
      const {data: bindings, error: bindingError} = await auth.client
        .from("texasdefined_network_business_accounts")
        .select("application_id")
        .eq("owner_user_id", auth.userId).eq("access_enabled", true);
      if (bindingError) return respond({error:"Unable to verify business ownership."},503);
      const {stripeCheckoutEnabled}=await import("@/data/network-stripe.server");
      const checkoutAvailable=stripeCheckoutEnabled();
      const ids=(bindings||[]).map(binding=>binding.application_id);
      if (!ids.length) return respond({ok:true,memberships:[],checkoutAvailable});
      const { data, error } = await auth.client.from("texasdefined_network_applications")
        .select("id,business_name,plan,status,paid_entitlement_active,stripe_customer_id,stripe_subscription_id")
        .in("id",ids).eq("contact_email", auth.email).eq("plan", "plus").order("created_at", { ascending: false });
      if (error) return respond({ error: "Unable to load subscriptions." }, 503);
      return respond({ ok: true, checkoutAvailable, memberships: (data || []).map(item => ({
        id: item.id, name: item.business_name, status: item.status,
        paid: item.paid_entitlement_active, manageable: !!item.stripe_customer_id,
        checkoutEligible: item.status === "approved" && !item.paid_entitlement_active && !item.stripe_subscription_id,
      })) });
    },
    POST: async ({ request }) => {
      if (request.headers.get("origin") !== new URL(request.url).origin) {
        await discardRejectedNetworkPostBody(request);
        return respond({ error: "Invalid request origin." }, 403);
      }
      const auth = await owner(request);
      if (!auth) {
        await discardRejectedNetworkPostBody(request);
        return respond({ error: "Sign in to manage your subscription." }, 401);
      }
      let id: unknown;
      try { id = (await request.json()).applicationId; } catch { return respond({ error: "Invalid request." }, 400); }
      if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) return respond({ error: "Invalid subscription." }, 400);
      const { data, error } = await auth.client.from("texasdefined_network_applications")
        .select("stripe_customer_id").eq("id", id).eq("plan", "plus").eq("contact_email", auth.email).maybeSingle();
      if (error || !data?.stripe_customer_id) return respond({ error: "No active billing account found." }, 404);
      // Only a reviewed, enabled owner binding may access the Stripe customer portal.
      const { data: ownerBinding, error: ownerError } = await auth.client
        .from("texasdefined_network_business_accounts")
        .select("application_id")
        .eq("application_id", id)
        .eq("owner_user_id", auth.userId)
        .eq("access_enabled", true)
        .maybeSingle();
      if (ownerError || !ownerBinding) return respond({ error: "Verified business ownership is required." }, 403);
      const key = process.env["STRIPE_SECRET_KEY"];
      if (!key?.startsWith("sk_live_")) return respond({ error: "Billing portal is temporarily unavailable." }, 503);
      const body = new URLSearchParams({
        customer: data.stripe_customer_id,
        return_url: "https://texasdefined.com/network/billing",
      });
      try {
        const stripe = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
          method: "POST",
          headers: { authorization: "Bearer " + key, "content-type": "application/x-www-form-urlencoded" },
          body,
          signal: AbortSignal.timeout(12_000),
        });
        if (!stripe.ok) return respond({ error: "Unable to open the billing portal." }, 503);
        const result = await stripe.json() as { url?: unknown };
        // Never return an untrusted payment-management redirect to the browser.
        const {isNetworkBillingPortalUrl}=await import("@/data/network-stripe.server");
        if(!isNetworkBillingPortalUrl(result.url)) {
          return respond({ error: "Billing portal unavailable." }, 503);
        }
        return respond({ ok: true, url: result.url });
      } catch {
        return respond({ error: "Billing portal temporarily unavailable." }, 503);
      }
    },
  } },
});
