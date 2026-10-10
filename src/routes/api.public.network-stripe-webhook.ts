import { createFileRoute } from "@tanstack/react-router";

const PRICE_ID = "price_1UP28XLtRurj6GMNwFlYDW6N";
const encoder = new TextEncoder();
function validHexEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let different = 0;
  for (let i = 0; i < left.length; i++) different |= left.charCodeAt(i) ^ right.charCodeAt(i);
  return different === 0;
}
async function signatureValid(raw: string, header: string, secret: string) {
  const fragments = header.split(",").map(segment => segment.trim());
  const timestamp = fragments.find(s => s.startsWith("t="))?.slice(2);
  const signatures = fragments.filter(s => s.startsWith("v1=")).map(s => s.slice(3));
  const time = Number(timestamp);
  if (!Number.isSafeInteger(time) || Math.abs(Date.now() / 1000 - time) > 300 || !signatures.length) return false;
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(timestamp + "." + raw));
  const signature = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  return signatures.some(s => validHexEqual(signature, s));
}

export const Route = createFileRoute("/api/public/network-stripe-webhook")({
  server: { handlers: { POST: async ({ request }) => {
    const secret = process.env["STRIPE_WEBHOOK_SECRET"];
    if (!secret) return new Response("Webhook not configured", { status: 503 });
    const raw = await request.text();
    const header = request.headers.get("stripe-signature") || "";
    if (!await signatureValid(raw, header, secret)) return new Response("Invalid signature", { status: 400 });
    let event: Record<string, any>;
    try { event = JSON.parse(raw); } catch { return new Response("Invalid event", { status: 400 }); }
    if (event.livemode !== true || typeof event.type !== "string") return new Response("Ignored", { status: 200 });
    if (!["customer.subscription.created","customer.subscription.updated","customer.subscription.deleted"].includes(event.type)) {
      return new Response("Ignored", { status: 200 });
    }
    const subscriptionId = event.data?.object?.id;
    const stripeKey = process.env["STRIPE_SECRET_KEY"];
    if (typeof subscriptionId !== "string" || !stripeKey) return new Response("Stripe verification unavailable", { status: 503 });
    // Always fetch current subscription state. Webhook delivery order is not guaranteed.
    const live = await fetch("https://api.stripe.com/v1/subscriptions/" + encodeURIComponent(subscriptionId), {
      headers: { authorization: "Bearer " + stripeKey },
    });
    if (!live.ok) return new Response("Subscription verification unavailable", { status: 503 });
    const subscription = await live.json() as Record<string, any>;
    if (subscription.livemode !== true || subscription.id !== subscriptionId) return new Response("Invalid subscription", { status: 422 });
    const id = subscription?.metadata?.application_id;
    const price = subscription?.items?.data?.[0]?.price?.id;
    if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id) ||
        price !== PRICE_ID || subscription?.metadata?.project !== "TexasDefined" ||
        typeof subscription?.id !== "string") return new Response("Ignored", { status: 200 });
    const active = event.type !== "customer.subscription.deleted" && subscription.status === "active";
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing, error: lookupError } = await supabaseAdmin.from("texasdefined_network_applications")
      .select("id,stripe_subscription_id,plan").eq("id", id).single();
    if (lookupError || !existing || existing.plan !== "plus") return new Response("Ignored", { status: 200 });
    if (existing.stripe_subscription_id && existing.stripe_subscription_id !== subscription.id) {
      return new Response("Subscription mismatch", { status: 409 });
    }
    const { error } = await supabaseAdmin.from("texasdefined_network_applications")
      .update({
        stripe_customer_id: String(subscription.customer || ""),
        stripe_subscription_id: subscription.id,
        paid_entitlement_active: active,
        updated_at: new Date().toISOString(),
      } as never).eq("id", id);
    if (error) return new Response("Persistence failure", { status: 503 });
    return new Response("ok", { status: 200 });
  } } },
});
