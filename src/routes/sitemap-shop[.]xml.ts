import { createFileRoute } from "@tanstack/react-router";

const ORIGIN = "https://texasdefined.com";

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[c] ?? c);
}

/**
 * Published storefront product detail pages are eligible for indexing.
 * Use the same live, site-assigned catalog as /shop, but paginate it fully:
 * the interactive shop endpoint defaults to the first 100 products.
 *
 * A remote API failure returns 503 rather than publishing a misleading
 * zero-product sitemap. No variant query URLs appear: each product has one
 * canonical detail URL.
 */
export const Route = createFileRoute("/sitemap-shop.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { fetchAllPublishedShopProductsForIndexing } = await import("@/data/shop-products-remote");
          const products = await fetchAllPublishedShopProductsForIndexing();
          const urls = new Set(products.map((product) => `${ORIGIN}/shop/product/${encodeURIComponent(product.id)}`));
          const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls].map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join("\n")}
</urlset>`;
          return new Response(xml, {
            status: 200,
            headers: {
              "content-type": "application/xml; charset=utf-8",
              "cache-control": "public, max-age=300, s-maxage=900",
              "x-content-type-options": "nosniff",
            },
          });
        } catch (error) {
          console.error("TexasDefined shop sitemap catalog lookup failed", error);
          return new Response("Shop sitemap temporarily unavailable", {
            status: 503,
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "cache-control": "no-store",
              "retry-after": "300",
            },
          });
        }
      },
    },
  },
});
