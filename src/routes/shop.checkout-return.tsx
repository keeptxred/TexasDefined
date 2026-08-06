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
    <Container className="py-20 text-center sm:py-28">
      <p className="eyebrow text-primary">Texas Defined Shop</p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">Thank you for your order</h1>
      <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">
        Your payment was received. A confirmation will be sent to the email address used during checkout, and your items will be prepared by our print partner.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="bg-primary px-5 py-3 font-semibold text-primary-foreground">Continue shopping</Link>
        <Link to="/" className="border border-border px-5 py-3 font-semibold">Return home</Link>
      </div>
    </Container>
  );
}
