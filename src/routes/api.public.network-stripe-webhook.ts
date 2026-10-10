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
    if (!["customer.subscription.created","customer.subscription.updated","customer.subscription.deleted","invoice.paid","invoice.payment_failed"].includes(event.type)) {
      return new Response("Ignored", { status: 200 });
    }
    const obj=event.data?.object;
    const subscriptionId = event.type.startsWith("customer.subscription.") ? obj?.id : (obj?.subscription || obj?.parent?.subscription_details?.subscription);
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
    // Read the verified CURRENT subscription state, not the delivery order of old invoice events.
    // A recovered subscription must not be deactivated by a delayed failure notification.
    const active = subscription.status === "active";
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if(typeof event.id!=="string")return new Response("Invalid event ID",{status:400});
    const {data:prior,error:priorError}=await supabaseAdmin.from("texasdefined_network_stripe_events").select("processed_at").eq("stripe_event_id",event.id).maybeSingle();
    if(priorError)return new Response("Event ledger unavailable",{status:503});
    if(prior?.processed_at)return new Response("Already processed",{status:200});
    if(!prior){const {error:recordError}=await supabaseAdmin.from("texasdefined_network_stripe_events").insert({stripe_event_id:event.id,stripe_event_type:event.type} as never);if(recordError&&recordError.code!=="23505")return new Response("Event recording failed",{status:503});}
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
    if (!active) {
      // Payment entitlement and editorial approval are separate requirements.
      // Suspend already-published paid listings; NEVER auto-publish on renewed payment.
      const { error:hideError } = await supabaseAdmin.from("texasdefined_network_public_listings")
        .update({ is_published: false, updated_at: new Date().toISOString() } as never)
        .eq("application_id", id).eq("plan", "plus").eq("is_published", true);
      if (hideError) return new Response("Unable to suspend unpaid listing", { status: 503 });
      const { error:reviewError } = await supabaseAdmin.from("texasdefined_network_applications")
        .update({ status: "approved", updated_at: new Date().toISOString() } as never)
        .eq("id", id).eq("status", "published");
      if (reviewError) return new Response("Unable to reset publication state", { status: 503 });
    }
    const {error:ledgerError}=await supabaseAdmin.from("texasdefined_network_stripe_events").update({processed_at:new Date().toISOString()} as never).eq("stripe_event_id",event.id);
    if(ledgerError)return new Response("Event processing incomplete",{status:503});
    return new Response("ok", { status: 200 });
  } } },
});
