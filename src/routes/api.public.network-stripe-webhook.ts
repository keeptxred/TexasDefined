import { createFileRoute } from "@tanstack/react-router";


// One production HMAC verifier shared with the executable Stripe security tests.
export const Route = createFileRoute("/api/public/network-stripe-webhook")({
  server: { handlers: { POST: async ({ request }) => {
    const {networkStripeWebhookSecret,networkStripeHostAllowed,networkStripeExpectedLivemode,getNetworkStripeRuntime}=await import("@/data/network-stripe-mode.server");
    if(!networkStripeHostAllowed(request))return new Response("Stripe endpoint unavailable on this host", {status:503});
    const expectedMode=networkStripeExpectedLivemode();
    const secret = networkStripeWebhookSecret();
    if (!secret) return new Response("Webhook not configured", { status: 503 });
    const { readNetworkWebhookPayload } = await import("@/data/network-stripe.server");
    const raw = await readNetworkWebhookPayload(request);
    if (raw===null) return new Response("Invalid or oversized webhook body", { status: 413 });
    const header = request.headers.get("stripe-signature") || "";
    const { verifyStripeSignature } = await import("@/data/network-stripe.server");
    if (!await verifyStripeSignature(raw,header)) return new Response("Invalid signature", { status: 400 });
    let event: Record<string, any>;
    try { event = JSON.parse(raw); } catch { return new Response("Invalid event", { status: 400 }); }
    if (expectedMode===null)return new Response("Stripe mode unavailable",{status:503});
    if(event.livemode!==expectedMode || typeof event.type !== "string") return new Response("Ignored", { status: 200 });
    const obj=event.data?.object;
    const sharedInvoiceEvents=[
      "invoice.finalized","invoice.sent","invoice.paid","invoice.payment_failed",
      "invoice.voided","invoice.marked_uncollectible",
    ];
    if(sharedInvoiceEvents.includes(event.type)
      && typeof obj?.id==="string"
      && obj?.metadata?.project==="TexasDefined"
      && typeof obj?.metadata?.local_invoice_id==="string"
      && typeof obj?.metadata?.billing_account_id==="string"){
      if(typeof event.id!=="string"||!/^evt_[A-Za-z0-9_]+$/.test(event.id))
        return new Response("Invalid event ID",{status:400});
      let invoice:Record<string,any>;
      try{
        const {readTexasDefinedCurrentInvoice}=await import("@/data/texasdefined-billing.server");
        invoice=await readTexasDefinedCurrentInvoice(obj.id);
      }catch{
        return new Response("Invoice verification unavailable",{status:503});
      }
      if(invoice.metadata?.local_invoice_id!==obj.metadata.local_invoice_id
        || invoice.metadata?.billing_account_id!==obj.metadata.billing_account_id)
        return new Response("Invoice identity mismatch",{status:409});
      const unixIso=(value:unknown)=>{
        if(typeof value!=="number"||!Number.isSafeInteger(value)||value<0)return null;
        return new Date(value*1000).toISOString();
      };
      const {supabaseAdmin}=await import("@/integrations/supabase/client.server");
      const {data:outcome,error:dbError}=await (supabaseAdmin as any).rpc(
        "apply_texasdefined_billing_invoice_event",{
          p_event_id:event.id,
          p_event_type:event.type,
          p_local_invoice_id:invoice.metadata.local_invoice_id,
          p_stripe_invoice_id:invoice.id,
          p_customer_id:invoice.customer,
          p_status:invoice.status,
          p_amount_due_cents:invoice.amount_due,
          p_amount_paid_cents:invoice.amount_paid,
          p_amount_remaining_cents:invoice.amount_remaining,
          p_due_at:unixIso(invoice.due_date),
          p_paid_at:unixIso(invoice.status_transitions?.paid_at),
        }
      );
      if(dbError)return new Response("Invoice reconciliation unavailable",{status:503});
      if(outcome==="mismatch")return new Response("Invoice or customer mismatch",{status:409});
      if(outcome==="ignored")return new Response("Ignored",{status:200});
      if(outcome==="already_processed")return new Response("Already processed",{status:200});
      if(outcome!=="processed")return new Response("Invoice reconciliation incomplete",{status:503});
      return new Response("ok",{status:200});
    }

    if (!["customer.subscription.created","customer.subscription.updated","customer.subscription.deleted","invoice.paid","invoice.payment_failed"].includes(event.type)) {
      return new Response("Ignored", { status: 200 });
    }
    const subscriptionId = event.type.startsWith("customer.subscription.") ? obj?.id : (obj?.subscription || obj?.parent?.subscription_details?.subscription);
    const runtime=getNetworkStripeRuntime();
    if (typeof subscriptionId !== "string" || !runtime || runtime.livemode!==expectedMode)
      return new Response("Stripe verification unavailable", { status: 503 });
    // Webhook delivery order is not guaranteed. Verify CURRENT Stripe state.
    // Timeout, connectivity, malformed JSON and API failures are retriable 503s,
    // never a successful acknowledgement and never a permission bypass.
    let subscription: Record<string, any>;
    try {
      const {readNetworkCurrentStripeSubscription}=await import("@/data/network-stripe.server");
      subscription=await readNetworkCurrentStripeSubscription(subscriptionId);
    } catch {
      return new Response("Subscription verification unavailable", { status: 503 });
    }
    if (subscription.livemode !== expectedMode || subscription.id !== subscriptionId) return new Response("Invalid subscription", { status: 422 });
    const {isNetworkSubscriptionIdentity,isExpectedNetworkPlusSubscription,isBoundNetworkSubscriptionPriceMismatch}=await import("@/data/network-stripe.server");
    if(!isNetworkSubscriptionIdentity(subscription))return new Response("Ignored",{status:200});
    const id = String(subscription.metadata.application_id);
    const billingAccountId=String(subscription.metadata.billing_account_id);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const {data:bound,error:boundError}=await supabaseAdmin
      .from("texasdefined_network_applications")
      .select("plan,stripe_subscription_id,stripe_customer_id,billing_account_id")
      .eq("id",id).maybeSingle();
    if(boundError)return new Response("Subscription binding verification unavailable",{status:503});
    if(!bound || bound.billing_account_id!==billingAccountId || bound.stripe_customer_id!==subscription.customer)
      return new Response("Subscription billing identity mismatch",{status:409});
    const correctPlusPrice=isExpectedNetworkPlusSubscription(subscription);
    if(!correctPlusPrice){
      // A price migration must not leave an already-entitled account public.
      // Only a subscription/customer ALREADY bound to this application may be
      // revoked; never associate an unrelated or newly-created Stripe plan.
      if(!isBoundNetworkSubscriptionPriceMismatch(subscription,bound))
        return new Response("Ignored",{status:200});
    }
    // Read verified CURRENT Stripe state, not old invoice event delivery order.
    // A recovered subscription must not be deactivated by a delayed failure.
    // Price changes revoke entitlement only for the previously bound owner.
    const active=correctPlusPrice && subscription.status==="active";
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
