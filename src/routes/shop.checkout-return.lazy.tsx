import { useEffect, useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { commerceApiBase } from "@/data/shop-products-remote";
import { useShopCart } from "@/lib/shop-cart";

export const Route = createLazyFileRoute("/shop/checkout-return")({ component: CheckoutReturnPage });

type CheckoutState = "checking" | "paid" | "unconfirmed";

function CheckoutReturnPage() {
  const { session_id } = Route.useSearch();
  const cart = useShopCart();
  const [state, setState] = useState<CheckoutState>(session_id ? "checking" : "unconfirmed");

  useEffect(() => {
    if (!session_id) {
      setState("unconfirmed");
      return;
    }

    let active = true;
    void fetch(`${commerceApiBase()}/api/public/texasdefined-checkout?session_id=${encodeURIComponent(session_id)}`, {
      headers: { accept: "application/json" },
    })
      .then(async (response) => {
        const payload = await response.json() as { ok?: boolean; paid?: boolean };
        if (!active) return;
        if (response.ok && payload.ok && payload.paid) {
          cart.clear();
          setState("paid");
          return;
        }
        setState("unconfirmed");
      })
      .catch(() => {
        if (active) setState("unconfirmed");
      });

    return () => { active = false; };
  }, [session_id]);

  const paid = state === "paid";

  return (
    <>
      <Container className="pb-20 pt-14 sm:pb-28 sm:pt-20">
        <section className="mx-auto max-w-4xl border-y border-border py-14 text-center sm:py-20" aria-live="polite">
          <p className="eyebrow text-primary">Texas Defined Shop</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-[0.98] sm:text-7xl">
            {state === "checking" ? "Confirming your order" : paid ? "Thank you for your order" : "We could not confirm this checkout"}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {state === "checking"
              ? "We’re checking the payment status with our checkout provider."
              : paid
                ? "Your payment is confirmed. Your order can now move into fulfillment with our print partner."
                : "We did not receive a verified paid checkout session. Your bag has not been cleared. Check the payment status with your checkout provider before trying again."}
          </p>
          <div className="mx-auto mt-10 flex max-w-md flex-col border-t border-border sm:flex-row sm:justify-center">
            <Link to={paid ? "/shop" : "/shop/cart"} className="border-b border-border px-6 py-4 text-sm font-semibold sm:border-b-0 sm:border-r">{paid ? "Continue shopping →" : "Return to your bag →"}</Link>
            <Link to="/" className="px-6 py-4 text-sm font-semibold">Return to the front page</Link>
          </div>
        </section>
      </Container>
    </>
  );
}
