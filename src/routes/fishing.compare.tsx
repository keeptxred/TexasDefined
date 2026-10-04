import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingPlannerData } from "@/data/fishing/planner-data.functions";
import { FISHING_LAKE_COMPARE_PATH } from "@/data/fishing/planner-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Compare complete Texas fishing lake guides by verified fishery strengths, geography, current reports and verified local coverage.";
type CompareSearch = { lake1?: string; lake2?: string; lake3?: string };

export const Route = createFileRoute("/fishing/compare")({
  validateSearch: (search: Record<string, unknown>): CompareSearch => ({ lake1: cleanLakeSlug(search.lake1), lake2: cleanLakeSlug(search.lake2), lake3: cleanLakeSlug(search.lake3) }),
  loader: () => getFishingPlannerData(),
  head: ({ loaderData }) => {
    const rows = loaderData?.rows ?? [];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", url: `${siteUrl}${FISHING_LAKE_COMPARE_PATH}`, name: "Texas Fishing Lake Comparison", description },
        { "@type": "ItemList", numberOfItems: rows.length, itemListElement: rows.map((row, index) => ({ "@type": "ListItem", position: index + 1, name: row.lake.name, url: `${siteUrl}${row.href}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Compare lakes", item: `${siteUrl}${FISHING_LAKE_COMPARE_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Compare Texas Fishing Lakes — Fishery, Access & Trip Planning", description, canonicalPath: FISHING_LAKE_COMPARE_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_LAKE_COMPARE_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
});

Route.lazy(() => import("@/lazy/fishing-compare").then((d) => d.Route));

function cleanLakeSlug(value: unknown) { return typeof value === "string" && /^[a-z0-9-]+$/.test(value) ? value : undefined; }
