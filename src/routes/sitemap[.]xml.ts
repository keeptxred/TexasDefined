import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { platform, scope } from "@/data";
import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { canonicalEntityPath } from "@/data/knowledge-graph/relationships";

const origin = `https://${texasDefinedBrand.identity.domain}`;

const staticPublicPaths = [
  "/", "/explore", "/sports", "/events", "/texas-history", "/moving-to-texas", "/moving-to-texas-checklist",
  "/home-garden", "/real-estate", "/guides", "/texas-living", "/texas-resources", "/texas-data",
  "/learn/property-taxes", "/learn/property-tax-payments", "/learn/appraisal-districts",
  "/decide/property-taxes", "/decide/financial-tools", "/do/homestead-exemption", "/do/property-tax-protest",
  "/browse/counties", "/browse/cities", "/find-my-dmv", "/find-my-school-district",
  "/shop", "/about",
  "/tax-calculator", "/texas-financial-tools", "/texas-budget-planner", "/texas-closing-cost-calculator",
  "/texas-cost-of-living-calculator", "/texas-down-payment-assistance-calculator", "/texas-down-payment-calculator",
  "/texas-first-time-homebuyer-programs", "/texas-home-affordability-calculator", "/texas-home-equity-calculator",
  "/texas-home-equity-growth-calculator", "/texas-home-insurance-calculator", "/texas-homeownership-cost-calculator",
  "/texas-mortgage-calculator", "/texas-mortgage-payoff-calculator", "/texas-moving-cost-calculator",
  "/texas-property-tax-increase-calculator", "/texas-property-tax-protest-guide", "/texas-refinance-savings-calculator",
  "/texas-rent-vs-buy-calculator", "/texas-salary-calculator", "/texas-salary-comparison-by-city",
  "/texas-sales-tax-explained", "/texas-utility-cost-calculator",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [articles, destinations, collections, categories, graph] = await Promise.all([
          platform.articles.list(scope),
          platform.destinations.list(scope),
          platform.collections.list(scope),
          platform.taxonomy.categories(scope),
          loadTexasKnowledgeGraph(),
        ]);

        const paths = [
          ...staticPublicPaths,
          ...categories.map((category) => `/explore/${category.slug}`),
          ...collections.map((collection) => `/shop/${collection.slug}`),
          ...articles.map((article) => `/article/${article.slug}`),
          ...destinations.map((destination) => `/destination/${destination.slug}`),
          ...graph.filter((entity) => entity.status === "active" || entity.status === "seasonal").map(canonicalEntityPath),
        ];

        const uniquePaths = [...new Set(paths)].filter((path) => !path.startsWith("/admin") && !path.startsWith("/api/") && path !== "/search" && path !== "/explore/search");
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePaths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n")}
</urlset>`;

        return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
      },
    },
  },
});
