import { lazy, Suspense } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchAssignedShopProducts } from "@/data/shop-products-remote";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta } from "@/lib/seo";
import { shopProductSearchName } from "@/lib/shop-product-search-title";

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
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: product ? `/shop/product/${encodeURIComponent(product.id)}` : undefined,
        // Long POD titles contain comma-separated keyword lists. Keep those
        // in the visible product name and schema, but not the search snippet.
        title: product ? shopProductSearchName(product.name) : "Texas Shop Product",
        description: product?.blurb || "Shop Texas-inspired products from Texas Defined.",
        image: product?.image.src,
        imageAlt: product?.image.alt || product?.name,
      }),
      links: canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [],
      scripts: product && canonicalUrl ? [{ type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: Array.from(new Set([product.image.src, ...enabled.flatMap((variant) => [variant.image, ...(variant.images ?? [])])].filter((image): image is string => Boolean(image)))),
        url: canonicalUrl,
        offers: (enabled.length ? enabled : [null]).map((variant) => ({
          "@type": "Offer",
          url: variant ? `${canonicalUrl}?variant=${encodeURIComponent(String(variant.id))}` : canonicalUrl,
          priceCurrency: product.currency || "USD",
          price: Number(variant?.price ?? product.priceCents / 100).toFixed(2),
          availability: `https://schema.org/${variant ? "InStock" : "OutOfStock"}`,
          sku: variant ? `${product.id}-${variant.id}` : product.id,
        })),
      }) }] : [],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { variant } = Route.useSearch();
  return <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading product details…</div>}><ProductDetailPage product={product} related={related} variant={variant} /></Suspense>;
}
