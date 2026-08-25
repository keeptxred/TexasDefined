import { useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { commerceApiBase } from "@/data/shop-products-remote";
import { useShopCart } from "@/lib/shop-cart";

export const Route = createLazyFileRoute("/shop/cart")({ component: CartPage });

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
        body: JSON.stringify({ items: cart.items.map((item) => ({ productId: item.productId, variantId: item.variantId, quantity: item.quantity })) }),
      });
      const payload = await response.json() as { ok?: boolean; url?: string; error?: string };
      if (!response.ok || !payload.ok || !payload.url) throw new Error(payload.error || "Unable to start checkout");
      window.location.assign(payload.url);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to start checkout");
      setWorking(false);
    }
  }

  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-20">
        <p className="eyebrow text-primary">The Texas Defined Shop</p>
        <h1 className="mt-4 font-display text-5xl leading-none sm:text-6xl">Your bag</h1>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      {cart.items.length === 0 ? (
        <div className="max-w-2xl border-t-2 border-foreground pt-8">
          <p className="eyebrow text-primary">Your bag is empty</p>
          <h2 className="mt-3 font-display text-4xl">Nothing selected yet.</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">Browse the current Texas Defined shop for apparel and goods chosen to fit the magazine’s point of view.</p>
          <Link to="/shop" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Return to the shop →</Link>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <ul className="divide-y divide-border border-y border-border">
              {cart.items.map((item) => <li key={item.key} className="grid grid-cols-[96px_1fr] gap-5 py-6 sm:grid-cols-[120px_1fr_auto]">
                <img src={item.image} alt="" className="aspect-[4/5] w-full object-cover" />
                <div>
                  <h2 className="font-display text-2xl leading-tight" title={item.title}>{displayTitle(item.title)}</h2>
                  {item.variantTitle ? <p className="mt-2 text-sm text-muted-foreground">{item.variantTitle}</p> : null}
                  <p className="mt-3 font-semibold">{money(item.price, item.currency)}</p>
                  <div className="mt-4 flex items-center gap-2"><button type="button" aria-label={`Decrease quantity of ${displayTitle(item.title)}`} onClick={() => cart.setQuantity(item.key, item.quantity - 1)} className="h-9 w-9 border border-border">−</button><span className="w-8 text-center">{item.quantity}</span><button type="button" aria-label={`Increase quantity of ${displayTitle(item.title)}`} onClick={() => cart.setQuantity(item.key, item.quantity + 1)} className="h-9 w-9 border border-border">+</button><button type="button" onClick={() => cart.remove(item.key)} className="ml-3 text-xs uppercase tracking-[0.1em] text-muted-foreground underline underline-offset-4">Remove</button></div>
                </div>
                <p className="font-semibold sm:text-right">{money(item.price * item.quantity, item.currency)}</p>
              </li>)}
            </ul>
            <Link to="/shop" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">← Continue shopping</Link>
          </div>

          <aside className="h-fit border-t-2 border-foreground pt-6 lg:sticky lg:top-28">
            <p className="eyebrow text-primary">Order summary</p>
            <div className="mt-5 flex justify-between border-y border-border py-5 text-lg font-semibold"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">Shipping and taxes are calculated at checkout.</p>
            {error ? <p className="mt-4 text-sm text-destructive" role="alert">{error}</p> : null}
            <button type="button" onClick={checkout} disabled={working} className="mt-6 w-full bg-foreground px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-background disabled:opacity-60">{working ? "Opening checkout…" : "Secure checkout"}</button>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">Orders are printed and shipped by our U.S. production partner. Secure payment at checkout.</p>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">Review our <Link to="/return-refund-policy" className="border-b border-primary text-primary">Return &amp; Refund Policy</Link> before checkout.</p>
          </aside>
        </div>
      )}
    </Container>
  </>;
}
