import { useEffect, useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { commerceApiBase } from "@/data/shop-products-remote";

const LIVE_TEST_RUN = "td-20260920-8c2e41";

type TestStatus = {
  paid: boolean;
  webhookReceived: boolean;
  amountTotal?: number | null;
  status?: string;
  paymentStatus?: string;
};

export const Route = createLazyFileRoute("/shop/live-payment-test")({
  component: LivePaymentTestPage,
});

function LivePaymentTestPage() {
  const { run, session_id } = Route.useSearch();
  const validRun = run === LIVE_TEST_RUN;
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<TestStatus | null>(null);

  useEffect(() => {
    if (!validRun || !session_id) return;
    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      attempts += 1;
      try {
        const url = new URL("/api/public/payments/live-test", commerceApiBase());
        url.searchParams.set("site", "texasdefined");
        url.searchParams.set("run", LIVE_TEST_RUN);
        url.searchParams.set("session_id", session_id);
        const response = await fetch(url, {
          headers: { accept: "application/json" },
          cache: "no-store",
        });
        const payload = await response.json() as TestStatus & { ok?: boolean; error?: string };
        if (!response.ok || !payload.ok) throw new Error(payload.error || "Unable to verify payment.");
        if (cancelled) return;
        setStatus(payload);
        if ((!payload.paid || !payload.webhookReceived) && attempts < 15) {
          window.setTimeout(poll, 1500);
        }
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "Unable to verify payment.");
      }
    };

    void poll();
    return () => { cancelled = true; };
  }, [validRun, session_id]);

  async function startTest() {
    setWorking(true);
    setError("");
    try {
      const response = await fetch(`${commerceApiBase()}/api/public/payments/live-test`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ site: "texasdefined", run: LIVE_TEST_RUN }),
      });
      const payload = await response.json() as { ok?: boolean; url?: string; error?: string };
      if (!response.ok || !payload.ok || !payload.url) {
        throw new Error(payload.error || "Unable to start live payment test.");
      }
      window.location.assign(payload.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to start live payment test.");
      setWorking(false);
    }
  }

  const complete = Boolean(status?.paid && status?.webhookReceived);

  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow text-primary">Texas Defined Shop</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none sm:text-6xl">
            50¢ live payment verification
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            This is a one-time live Stripe diagnostic. It charges exactly $0.50 and does not create or ship merchandise.
          </p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        {!validRun ? (
          <div className="max-w-3xl border-t-2 border-foreground pt-8">
            <p className="eyebrow text-primary">Test unavailable</p>
            <h2 className="mt-3 font-display text-4xl">This test link is invalid or expired.</h2>
            <Link to="/shop" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">
              Return to the shop →
            </Link>
          </div>
        ) : session_id ? (
          <div className="max-w-3xl border-t-2 border-foreground pt-8">
            <p className="eyebrow text-primary">Live verification</p>
            <h2 className="mt-3 font-display text-4xl">
              {complete ? "Live payment verified" : status?.paid ? "Payment received — checking webhook" : "Checking live payment"}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              {complete
                ? "Stripe confirms the 50¢ live payment and the production webhook received it. Printify fulfillment was intentionally suppressed."
                : "This page is checking Stripe and the production webhook. It may take a few seconds after checkout returns."}
            </p>
            {status ? (
              <div className="mt-8 grid gap-4 border-y border-border py-6 text-sm sm:grid-cols-2">
                <div><span className="text-muted-foreground">Payment:</span> <strong>{status.paid ? "Paid" : status.paymentStatus || "pending"}</strong></div>
                <div><span className="text-muted-foreground">Webhook:</span> <strong>{status.webhookReceived ? "Received" : "Waiting"}</strong></div>
                <div><span className="text-muted-foreground">Amount:</span> <strong>$0.50</strong></div>
                <div><span className="text-muted-foreground">Fulfillment:</span> <strong>Suppressed for test</strong></div>
              </div>
            ) : null}
            {error ? <p role="alert" className="mt-5 text-sm text-destructive">{error}</p> : null}
          </div>
        ) : (
          <div className="max-w-3xl border-t-2 border-foreground pt-8">
            <p className="eyebrow text-primary">Ready</p>
            <h2 className="mt-3 font-display text-4xl">Run the live Texas Defined charge</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Clicking below opens Stripe’s live hosted checkout. Enter the card there. The charge is real and is exactly 50¢.
            </p>
            <button
              type="button"
              onClick={startTest}
              disabled={working}
              className="mt-8 bg-foreground px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-background disabled:opacity-60"
            >
              {working ? "Opening Stripe…" : "Start 50¢ live Texas Defined test"}
            </button>
            {error ? <p role="alert" className="mt-5 text-sm text-destructive">{error}</p> : null}
          </div>
        )}
      </Container>
    </>
  );
}
