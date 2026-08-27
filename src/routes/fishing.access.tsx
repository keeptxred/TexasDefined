import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { getFishingAccessDirectoryData } from "@/data/fishing/access-directory-data.functions";
import { FISHING_ACCESS_DIRECTORY_PATH } from "@/data/fishing/local-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingAccessDirectory = lazy(() => import("@/components/fishing/FishingAccessDirectory").then((module) => ({ default: module.FishingAccessDirectory })));

export const Route = createFileRoute("/fishing/access")({
  validateSearch: (search: Record<string, unknown>) => ({
    lake: typeof search.lake === "string" ? search.lake : undefined,
    kind: typeof search.kind === "string" ? search.kind : undefined,
    city: typeof search.city === "string" ? search.city : undefined,
    county: typeof search.county === "string" ? search.county : undefined,
  }),
  loader: () => getFishingAccessDirectoryData(),
  head: ({ loaderData }) => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const items = loaderData?.access ?? [];
    const description = "Verified Texas fishing access: boat ramps, marinas, shore sites, piers and kayak launches tied to the lakes they serve, with source dates and changing-condition warnings.";
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Access — Ramps, Marinas, Shore & Kayak Launches", description, canonicalPath: FISHING_ACCESS_DIRECTORY_PATH, robots: items.length ? undefined : "noindex, follow" }),
      links: [canonicalLink(texasDefinedBrand, FISHING_ACCESS_DIRECTORY_PATH)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "CollectionPage", name: "Texas Fishing Access", description, url: `${origin}${FISHING_ACCESS_DIRECTORY_PATH}` },
        { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.point.name, url: `${origin}${entry.href}` })) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: origin }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` }, { "@type": "ListItem", position: 3, name: "Fishing access", item: `${origin}${FISHING_ACCESS_DIRECTORY_PATH}` }] },
      ]) }],
    };
  },
  component: FishingAccessRoute,
});

function FishingAccessRoute() {
  return <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}><FishingAccessDirectory pageData={Route.useLoaderData()} search={Route.useSearch()} /></Suspense>;
}
