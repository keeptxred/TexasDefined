import { lazy, Suspense } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchAssignedShopProducts } from "@/data/shop-products-remote";

const ProductDetailPage = lazy(() => import("@/components/commerce/ProductDetailPage").then((module) => ({ default: module.ProductDetailPage })));

export const Route = createFileRoute("/shop/product/$productId")({
  validateSearch: (search: Record<string, unknown>) => ({
    variant: typeof search.variant === "string" ? search.variant : undefined,
  }),
  loader: async ({ params }) => {
    const [productResults, relatedResults] = await Promise.all([
      fetchAssignedShopProducts({ id: params.productId }),
      fetchAssignedShopProducts({ limit: 12 }),
    ]);
    const [product] = productResults;
    if (!product) throw notFound();
    const related = relatedResults
      .filter((candidate) => candidate.id !== product.id)
      .sort((a, b) => Number(b.collectionSlugs.some((slug) => product.collectionSlugs.includes(slug))) - Number(a.collectionSlugs.some((slug) => product.collectionSlugs.includes(slug))))
      .slice(0, 4);
    return { product, related };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    const canonicalUrl = product ? `https://texasdefined.com/shop/product/${encodeURIComponent(product.id)}` : undefined;
    const enabled = product?.variants?.filter((variant) => variant.is_enabled !== false) ?? [];
    const offers = product && canonicalUrl ? (enabled.length ? enabled.map((variant) => ({
      "@type": "Offer", url: `${canonicalUrl}?variant=${encodeURIComponent(String(variant.id))}`, priceCurrency: product.currency || "USD", price: Number(variant.price ?? product.priceCents / 100).toFixed(2), availability: "https://schema.org/InStock", sku: `${product.id}-${variant.id}`,
    })) : [{ "@type": "Offer", url: canonicalUrl, priceCurrency: product.currency || "USD", price: (product.priceCents / 100).toFixed(2), availability: "https://schema.org/OutOfStock", sku: product.id }]) : [];
    return {
      meta: [
        { title: product ? `${product.name} | Texas Defined Shop` : "Product | Texas Defined Shop" },
        { name: "description", content: product?.blurb || "Shop Texas-inspired products from Texas Defined." },
      ],
      links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
      scripts: product && canonicalUrl ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: product.name, image: product.image.src, url: canonicalUrl, offers }) }] : [],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { variant } = Route.useSearch();
  return <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}><ProductDetailPage product={product} related={related} variant={variant} /></Suspense>;
}
