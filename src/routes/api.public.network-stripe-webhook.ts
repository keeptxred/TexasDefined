import { createFileRoute } from "@tanstack/react-router";


// One production HMAC verifier shared with the executable Stripe security tests.
export const Route = createFileRoute("/api/public/network-stripe-webhook")({
  server: { handlers: { POST: async ({ request }) => {
    const secret = process.env["STRIPE_WEBHOOK_SECRET"];
    if (!secret) return new Response("Webhook not configured", { status: 503 });
    const { readNetworkWebhookPayload } = await import("@/data/network-stripe.server");
    const raw = await readNetworkWebhookPayload(request);
    if (raw===null) return new Response("Invalid or oversized webhook body", { status: 413 });
    const header = request.headers.get("stripe-signature") || "";
    const { verifyStripeSignature } = await import("@/data/network-stripe.server");
    if (!await verifyStripeSignature(raw,header)) return new Response("Invalid signature", { status: 400 });
    let event: Record<string, any>;
    try { event = JSON.parse(raw); } catch { return new Response("Invalid event", { status: 400 }); }
    if (event.livemode !== true || typeof event.type !== "string") return new Response("Ignored", { status: 200 });
    if (!["customer.subscription.created","customer.subscription.updated","customer.subscription.deleted","invoice.paid","invoice.payment_failed"].includes(event.type)) {
      return new Response("Ignored", { status: 200 });
    }
    const obj=event.data?.object;
    const subscriptionId = event.type.startsWith("customer.subscription.") ? obj?.id : (obj?.subscription || obj?.parent?.subscription_details?.subscription);
    const stripeKey = process.env["STRIPE_SECRET_KEY"];
    if (typeof subscriptionId !== "string" || !stripeKey?.startsWith("sk_live_"))
      return new Response("Stripe verification unavailable", { status: 503 });
    // Always fetch current subscription state. Webhook delivery order is not guaranteed.
    const live = await fetch("https://api.stripe.com/v1/subscriptions/" + encodeURIComponent(subscriptionId), {
      headers: { authorization: "Bearer " + stripeKey },
    });
    if (!live.ok) return new Response("Subscription verification unavailable", { status: 503 });
    const subscription = await live.json() as Record<string, any>;
    if (subscription.livemode !== true || subscription.id !== subscriptionId) return new Response("Invalid subscription", { status: 422 });
    const { isExpectedNetworkPlusSubscription } = await import("@/data/network-stripe.server");
    if(!isExpectedNetworkPlusSubscription(subscription))return new Response("Ignored",{status:200});
    const id = String(subscription.metadata.application_id);
    // Read the verified CURRENT subscription state, not the delivery order of old invoice events.
    // A recovered subscription must not be deactivated by a delayed failure notification.
    const active = subscription.status === "active";
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if(typeof event.id!=="string")return new Response("Invalid event ID",{status:400});
    // One serialized, transactional database reconciliation after signature and Stripe verification.
    const {data:outcome,error:dbError}=await supabaseAdmin.rpc(
      "apply_texasdefined_network_stripe_event",{
        p_application_id:id,
        p_event_id:event.id,
        p_event_type:event.type,
        p_subscription_id:subscription.id,
        p_customer_id:subscription.customer,
        p_paid_active:active,
      }
    );
    if(dbError)return new Response("Event reconciliation unavailable",{status:503});
    if(outcome==="mismatch")return new Response("Subscription or customer mismatch",{status:409});
    if(outcome==="ignored")return new Response("Ignored",{status:200});
    if(outcome==="already_processed")return new Response("Already processed",{status:200});
    if(outcome!=="processed")return new Response("Reconciliation incomplete",{status:503});
    return new Response("ok", { status: 200 });
  } } },
});
