import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { useShopCart } from "@/lib/shop-cart";
import { commerceApiBase } from "@/data/shop-products-remote";

export const Route = createFileRoute("/shop/cart")({
  head: () => ({ meta: [{ title: "Your Bag | Texas Defined Shop" }, { name: "robots", content: "noindex,follow" }] }),
  component: CartPage,
});

function money(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);
}

function displayTitle(title: string) {
  const normalized = title.replace(/\s+/g, " ").trim();
  if (normalized.length <= 72) return normalized;
  return `${normalized.slice(0, 69).trimEnd()}…`;
}

function CartPage() {
  const cart = useShopCart();
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setWorking(true);
    setError("");
    try {
      const response = await fetch(`${commerceApiBase()}/api/public/texasdefined-checkout`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          items: cart.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });
      const payload = await response.json() as { ok?: boolean; url?: string; error?: string };
      if (!response.ok || !payload.ok || !payload.url) throw new Error(payload.error || "Unable to start checkout");
      window.location.assign(payload.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to start checkout");
      setWorking(false);
    }
  }

  return (
    <Container className="py-12 sm:py-16">
      <p className="eyebrow text-primary">Texas Defined Shop</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Your Bag</h1>

      {cart.items.length === 0 ? (
        <div className="mt-10 border border-border bg-card p-10 text-center">
          <h2 className="font-display text-2xl">Your bag is empty</h2>
          <Link to="/shop" className="mt-6 inline-flex bg-primary px-5 py-3 font-semibold text-primary-foreground">Return to the shop</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border border-y border-border">
            {cart.items.map((item) => (
              <li key={item.key} className="grid grid-cols-[88px_1fr] gap-4 py-6 sm:grid-cols-[112px_1fr_auto]">
                <img src={item.image} alt="" className="aspect-square w-full object-cover" />
                <div>
                  <h2 className="font-display text-xl leading-snug" title={item.title}>{displayTitle(item.title)}</h2>
                  {item.variantTitle ? <p className="mt-2 text-sm text-muted-foreground">{item.variantTitle}</p> : null}
                  <p className="mt-2 font-semibold">{money(item.price, item.currency)}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <button type="button" onClick={() => cart.setQuantity(item.key, item.quantity - 1)} className="h-9 w-9 border">−</button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button type="button" onClick={() => cart.setQuantity(item.key, item.quantity + 1)} className="h-9 w-9 border">+</button>
                    <button type="button" onClick={() => cart.remove(item.key)} className="ml-3 text-sm text-muted-foreground underline">Remove</button>
                  </div>
                </div>
                <p className="font-semibold sm:text-right">{money(item.price * item.quantity, item.currency)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border bg-card p-6">
            <h2 className="font-display text-2xl">Order Summary</h2>
            <div className="mt-6 flex justify-between border-t border-border pt-4 text-lg font-semibold">
              <span>Subtotal</span><span>{money(cart.subtotal)}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Shipping and taxes are calculated at checkout.</p>
            {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
            <button type="button" onClick={checkout} disabled={working} className="mt-6 w-full bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-60">
              {working ? "Opening secure checkout…" : "Secure checkout"}
            </button>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">Orders are printed and shipped by our U.S. production partner. Secure payment at checkout.</p>
          </aside>
        </div>
      )}
    </Container>
  );
}
