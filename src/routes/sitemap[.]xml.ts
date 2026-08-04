import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { platform, scope } from "@/data";

const origin = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [articles, destinations, collections, categories] = await Promise.all([
          platform.articles.list(scope),
          platform.destinations.list(scope),
          platform.collections.list(scope),
          platform.taxonomy.categories(scope),
        ]);

        const paths = [
          "/",
          "/explore",
          "/sports",
          "/events",
          "/texas-history",
          "/moving-to-texas",
          "/home-garden",
          "/real-estate",
          "/guides",
          "/learn/property-taxes",
          "/learn/property-tax-payments",
          "/learn/appraisal-districts",
          "/decide/property-taxes",
          "/do/homestead-exemption",
          "/do/property-tax-protest",
          "/browse/counties",
          "/browse/cities",
          "/shop",
          "/about",
          ...categories.map((category) => `/explore/${category.slug}`),
          ...collections.map((collection) => `/shop/${collection.slug}`),
          ...articles.map((article) => `/article/${article.slug}`),
          ...destinations.map((destination) => `/destination/${destination.slug}`),
        ];

        const uniquePaths = [...new Set(paths)];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePaths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n")}
</urlset>`;

        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
