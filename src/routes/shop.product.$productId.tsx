import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchAssignedShopProducts } from "@/data/shop-products-remote";
import type { ProductVariant } from "@/data/types";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/commerce/ProductCard";
import { useShopCart } from "@/lib/shop-cart";

export const Route = createFileRoute("/shop/product/$productId")({
  loader: async ({ params }) => {
    const [product] = await fetchAssignedShopProducts({ id: params.productId });
    if (!product) throw notFound();
    const related = (await fetchAssignedShopProducts({ limit: 12 }))
      .filter((candidate) => candidate.id !== product.id)
      .sort((a, b) => {
        const aMatch = a.collectionSlugs.some((slug) => product.collectionSlugs.includes(slug)) ? 1 : 0;
        const bMatch = b.collectionSlugs.some((slug) => product.collectionSlugs.includes(slug)) ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 4);
    return { product, related };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} | Texas Defined Shop` : "Product | Texas Defined Shop" },
      { name: "description", content: loaderData?.product.blurb || "Shop Texas-inspired products from Texas Defined." },
    ],
  }),
  component: ProductPage,
});

function variantLabel(variant: ProductVariant) {
  return variant.title || `Option ${variant.id}`;
}

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const available = (product.variants ?? []).filter((variant) => variant.is_enabled !== false);
  const [variantId, setVariantId] = useState<number | null>(available[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const cart = useShopCart();
  const selected = available.find((variant) => variant.id === variantId) ?? null;
  const image = selected?.image || selected?.images?.[0] || product.image.src;
  const price = Number(selected?.price ?? product.priceCents / 100);

  function addToCart() {
    cart.add({
      productId: product.id,
      title: product.name,
      image,
      price,
      currency: product.currency,
      variantId: selected?.id ?? null,
      variantTitle: selected ? variantLabel(selected) : null,
      quantity,
    });
    setAdded(true);
  }

  return (
    <>
      <Container className="py-10 sm:py-16">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/shop" className="hover:text-primary">Shop</Link> <span aria-hidden>/</span> {product.name}
        </nav>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden bg-muted">
            <img src={image} alt={product.name} className="aspect-square h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-primary">Texas Defined Shop</p>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-semibold">{new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency }).format(price)}</p>
            <p className="mt-5 whitespace-pre-line leading-relaxed text-muted-foreground">{product.blurb}</p>

            {available.length > 0 ? (
              <label className="mt-8 text-sm font-semibold">
                Choose an option
                <select value={variantId ?? ""} onChange={(event) => setVariantId(Number(event.target.value))} className="mt-2 h-12 w-full border border-input bg-background px-3">
                  {available.map((variant) => (
                    <option key={variant.id} value={variant.id}>{variantLabel(variant)} — {new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency }).format(Number(variant.price ?? price))}</option>
                  ))}
                </select>
              </label>
            ) : null}

            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-semibold">Quantity</span>
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-10 w-10 border">−</button>
              <span className="min-w-8 text-center font-semibold">{quantity}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(20, value + 1))} className="h-10 w-10 border">+</button>
            </div>

            <button type="button" onClick={addToCart} className="mt-8 inline-flex min-h-12 items-center justify-center bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90">
              Add to Bag
            </button>
            {added ? (
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span>Added to your bag.</span>
                <Link to="/shop/cart" className="font-semibold text-primary underline">View Bag ({cart.count})</Link>
              </div>
            ) : null}

            <div className="mt-8 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground">Made to order</p>
                <p className="mt-1 leading-relaxed text-muted-foreground">Printed after you order and usually ships from our U.S. production partner within 3–7 business days.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Returns and issues</p>
                <p className="mt-1 leading-relaxed text-muted-foreground">Because each piece is made to order, we replace items that arrive damaged, misprinted, or incorrect.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 ? (
        <section className="border-t border-border bg-card/40 py-14 sm:py-18">
          <Container>
            <p className="eyebrow text-primary">More from the shop</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">You may also like</h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.id}><ProductCard product={item} /></li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
