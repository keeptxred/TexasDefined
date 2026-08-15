import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { FISHING_SERVICES_DIRECTORY_PATH } from "@/data/fishing/local-routing";
import { getFishingServicesDirectoryData } from "@/data/fishing/services-directory-data.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishingServicesDirectory = lazy(() => import("@/components/fishing/FishingServicesDirectory").then((module) => ({ default: module.FishingServicesDirectory })));

export const Route = createFileRoute("/fishing/services")({
  validateSearch: (search: Record<string, unknown>) => ({
    lake: typeof search.lake === "string" ? search.lake : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    city: typeof search.city === "string" ? search.city : undefined,
    county: typeof search.county === "string" ? search.county : undefined,
  }),
  loader: () => getFishingServicesDirectoryData(),
  head: ({ loaderData }) => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const items = loaderData?.services ?? [];
    const description = "Verified Texas fishing services and lake-area businesses, including tackle shops and other angler services tied to the lakes they actually serve.";
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Services — Tackle Shops & Lake-Area Businesses", description, canonicalPath: FISHING_SERVICES_DIRECTORY_PATH }),
      links: [canonicalLink(texasDefinedBrand, FISHING_SERVICES_DIRECTORY_PATH)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "CollectionPage", name: "Texas Fishing Services", description, url: `${origin}${FISHING_SERVICES_DIRECTORY_PATH}` },
        { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.service.name, url: `${origin}${entry.href}` })) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: origin }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` }, { "@type": "ListItem", position: 3, name: "Fishing services", item: `${origin}${FISHING_SERVICES_DIRECTORY_PATH}` }] },
      ]) }],
    };
  },
  component: FishingServicesRoute,
});

function FishingServicesRoute() {
  return <Suspense fallback={<div className="min-h-[32rem]" aria-hidden="true" />}><FishingServicesDirectory pageData={Route.useLoaderData()} search={Route.useSearch()} /></Suspense>;
}