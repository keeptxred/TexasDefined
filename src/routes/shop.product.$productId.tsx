import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchAssignedShopProducts } from "@/data/shop-products-remote";
import type { ProductVariant } from "@/data/types";
import { Container } from "@/components/layout/Container";
import { useShopCart } from "@/lib/shop-cart";

export const Route = createFileRoute("/shop/product/$productId")({
  loader: async ({ params }) => {
    const [product] = await fetchAssignedShopProducts({ id: params.productId });
    if (!product) throw notFound();
    return { product };
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
  const { product } = Route.useLoaderData();
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
            <label className="text-sm font-semibold">Quantity</label>
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-10 w-10 border">−</button>
            <span className="min-w-8 text-center font-semibold">{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => Math.min(20, value + 1))} className="h-10 w-10 border">+</button>
          </div>

          <button type="button" onClick={addToCart} className="mt-8 inline-flex min-h-12 items-center justify-center bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90">
            Add to cart
          </button>
          {added ? (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <span>Added to your cart.</span>
              <Link to="/shop/cart" className="font-semibold text-primary underline">View cart ({cart.count})</Link>
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
