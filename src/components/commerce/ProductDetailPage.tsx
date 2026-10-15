import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Product, ProductVariant } from "@/data/types";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/commerce/ProductCard";
import { useShopCart } from "@/lib/shop-cart";
import { trackTexasDefinedOutcome } from "@/platform/analytics";

function variantLabel(variant: ProductVariant) { return variant.title || `Option ${variant.id}`; }

export function ProductDetailPage({ product, related, variant }: { product: Product; related: Product[]; variant?: string }) {
  const available = (product.variants ?? []).filter((candidate) => candidate.is_enabled !== false);
  const requestedVariantId = variant ? Number(variant) : null;
  const initialVariantId = available.some((candidate) => candidate.id === requestedVariantId) ? requestedVariantId : (available[0]?.id ?? null);
  const [variantId, setVariantId] = useState<number | null>(initialVariantId);
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const cart = useShopCart();
  const selected = available.find((candidate) => candidate.id === variantId) ?? null;
  const purchasable = Boolean(selected);
  const image = selected?.image || selected?.images?.[0] || product.image.src;
  const gallery = Array.from(new Set([image, ...(selected?.images ?? [])].filter(Boolean)));
  const displayImage = gallery[imageIndex] || image;
  const showImage = failedImage !== displayImage;
  const price = Number(selected?.price ?? product.priceCents / 100);
  const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency }).format(value);

  function addToCart() {
    if (!selected) return;
    cart.add({ productId: product.id, title: product.name, image, price, currency: product.currency, variantId: selected.id, variantTitle: variantLabel(selected), quantity });
    trackTexasDefinedOutcome("shop_add_to_cart", {
      resourceId: product.id,
      stepId: String(selected.id),
      entityKind: "product-variant",
      score: quantity,
    });
    setAdded(true);
  }

  return <>
    <Container className="pt-10 sm:pt-14"><nav className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground" aria-label="Breadcrumb"><Link to="/shop" className="hover:text-primary">Shop</Link> <span aria-hidden>·</span> <span aria-current="page">{product.name}</span></nav></Container>
    <Container className="py-8 sm:py-12 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div><div className="relative aspect-[4/5] overflow-hidden bg-muted">{showImage ? <img src={displayImage} alt={product.image.alt || product.name} className="absolute inset-0 size-full object-cover" onError={() => setFailedImage(displayImage)} /> : <div className="flex size-full items-center justify-center px-8 text-center text-sm text-muted-foreground" role="img" aria-label={`${product.name} image unavailable`}>Product image unavailable.</div>}</div>{gallery.length > 1 && <div className="mt-3 grid grid-cols-4 gap-3" aria-label="Product image gallery">{gallery.map((src, index) => <button key={src} type="button" aria-label={`View product image ${index + 1}`} aria-pressed={displayImage === src} onClick={() => setImageIndex(index)} className="aspect-square overflow-hidden border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"><img src={src} alt="" loading="lazy" className="size-full object-contain" /></button>)}</div>}</div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-primary">The Texas Defined Shop</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.98] sm:text-6xl">{product.name}</h1>
          <div className="mt-5 flex items-center justify-between gap-4 border-b border-border pb-5"><p className="text-xl font-semibold">{money(price)}</p><p className="eyebrow text-muted-foreground">{product.maker}</p></div>
          <p className="mt-6 whitespace-pre-line text-base leading-8 text-muted-foreground">{product.blurb}</p>
          {available.length > 0 ? <label className="eyebrow mt-8 text-muted-foreground">Choose an option<select value={variantId ?? ""} onChange={(event) => { setVariantId(Number(event.target.value)); setImageIndex(0); setAdded(false); }} className="mt-3 h-12 w-full border-0 border-b border-border bg-transparent px-0 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary">{available.map((candidate) => <option key={candidate.id} value={candidate.id}>{variantLabel(candidate)} — {money(Number(candidate.price ?? price))}</option>)}</select></label> : <div className="mt-8 border-y border-border py-5" role="status"><p className="eyebrow text-primary">Temporarily unavailable</p><p className="mt-2 text-sm leading-6 text-muted-foreground">There is not an orderable size or option for this item right now. Check back after the catalog updates.</p></div>}
          <div className="mt-7 flex items-center gap-3 border-b border-border pb-7"><span className="eyebrow mr-2 text-muted-foreground">Quantity</span><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={!purchasable} className="h-9 w-9 border border-border disabled:cursor-not-allowed disabled:opacity-40">−</button><span className="min-w-8 text-center font-semibold">{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(20, value + 1))} disabled={!purchasable} className="h-9 w-9 border border-border disabled:cursor-not-allowed disabled:opacity-40">+</button></div>
          <button type="button" onClick={addToCart} disabled={!purchasable} className="mt-7 inline-flex min-h-11 items-center justify-center bg-foreground px-6 text-sm font-semibold uppercase tracking-[0.08em] text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-45">{purchasable ? "Add to bag" : "Currently unavailable"}</button>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Standard U.S. shipping $6.99. Free standard shipping when merchandise exceeds $35. Review the total before paying.</p>
          {added && <div className="mt-4 flex flex-wrap items-center gap-4 text-sm" role="status"><span>Added to your bag.</span><Link to="/shop/cart" className="border-b border-primary font-semibold text-primary">View bag ({cart.count})</Link></div>}
          <div className="mt-10 grid border-t border-border text-sm sm:grid-cols-2"><div className="border-b border-border py-5 sm:border-b-0 sm:border-r sm:pr-6"><p className="eyebrow text-muted-foreground">Made to order</p><p className="mt-2 leading-6 text-muted-foreground">Most orders take 3–7 business days to produce, followed by an estimated 2–5 business days for U.S. delivery. Timing can vary by item, availability, carrier and season.</p></div><div className="py-5 sm:pl-6"><p className="eyebrow text-muted-foreground">Returns & issues</p><p className="mt-2 leading-6 text-muted-foreground">Made-to-order items are not generally returned or exchanged for a different size, color or change of mind. Damage or a manufacturing error reported within 30 days of delivery may qualify for a reprint or refund.</p></div></div>
        </div>
      </div>
    </Container>
    {related.length > 0 && <section className="border-t border-border bg-surface py-16 sm:py-20"><Container><p className="eyebrow text-primary">From the same shelf</p><h2 className="mt-3 font-display text-4xl">More from the shop</h2><ul className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <li key={item.id}><ProductCard product={item} /></li>)}</ul></Container></section>}
  </>;
}
