import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { useShopCart } from "@/lib/shop-cart";

export const Route = createFileRoute("/shop/checkout-return")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () => ({ meta: [{ title: "Order Received | Texas Defined" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: CheckoutReturnPage,
});

function CheckoutReturnPage() {
  const { session_id } = Route.useSearch();
  const cart = useShopCart();

  useEffect(() => {
    if (session_id) cart.clear();
  }, [session_id]);

  return (
    <main>
      <Container className="pb-20 pt-14 sm:pb-28 sm:pt-20">
        <section className="mx-auto max-w-4xl border-y border-border py-14 text-center sm:py-20">
          <p className="eyebrow text-primary">Texas Defined Shop</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-[0.98] sm:text-7xl">Thank you for your order</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Your payment was received. A confirmation will be sent to the email address used during checkout, and your items will be prepared by our print partner.
          </p>
          <div className="mx-auto mt-10 flex max-w-md flex-col border-t border-border sm:flex-row sm:justify-center">
            <Link to="/shop" className="border-b border-border px-6 py-4 text-sm font-semibold sm:border-b-0 sm:border-r">Continue shopping →</Link>
            <Link to="/" className="px-6 py-4 text-sm font-semibold">Return to the front page</Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
