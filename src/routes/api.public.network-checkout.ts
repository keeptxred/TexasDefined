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
    const secret = process.env["STRIPE_SECRET_KEY"];
    if (!secret) return reply({ error: "Subscription checkout is unavailable." }, 503);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.from("texasdefined_network_applications")
      .select("id,plan,status,contact_email").eq("id", body.applicationId).single();
    if (error || !data || data.plan !== "plus" || !["pending_review","approved"].includes(data.status) ||
        data.contact_email.toLowerCase() !== String(body.email || "").trim().toLowerCase()) {
      return reply({ error: "This application is not eligible for checkout." }, 422);
    }
    const fields = new URLSearchParams();
    fields.set("mode", "subscription");
    fields.set("line_items[0][price]", PRICE_ID);
    fields.set("line_items[0][quantity]", "1");
    fields.set("customer_email", data.contact_email);
    fields.set("client_reference_id", data.id);
    fields.set("metadata[application_id]", data.id);
    fields.set("subscription_data[metadata][application_id]", data.id);
    fields.set("subscription_data[metadata][project]", "TexasDefined");
    fields.set("success_url", origin + "/network/checkout-return?session_id={CHECKOUT_SESSION_ID}");
    fields.set("cancel_url", origin + "/network/apply?plan=plus");
    const stripe = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST", headers: { authorization: "Bearer " + secret, "content-type": "application/x-www-form-urlencoded" },
      body: fields.toString(),
    });
    const result = await stripe.json() as { url?: string; error?: { message?: string } };
    if (!stripe.ok || !result.url) return reply({ error: "Checkout could not be started." }, 503);
    return reply({ ok: true, url: result.url });
  } } },
});
