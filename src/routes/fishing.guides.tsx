import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { FishingGuideDirectory } from "@/components/fishing/FishingGuideDirectory";
import { getFishingGuideDirectoryData } from "@/data/fishing/guide-directory-data.functions";
import { FISHING_GUIDES_DIRECTORY_PATH } from "@/data/fishing/guide-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description = "Browse Texas fishing guides only after their listings and service relationships are verified, with lake, region and target-species filters activated from real data.";

function cleanFilter(value: unknown) {
  return typeof value === "string" && /^[a-z0-9-]{1,80}$/.test(value) ? value : undefined;
}

export const Route = createFileRoute("/fishing/guides")({
  validateSearch: (search: Record<string, unknown>) => ({ lake: cleanFilter(search.lake), region: cleanFilter(search.region), species: cleanFilter(search.species), trip: cleanFilter(search.trip) }),
  loader: () => getFishingGuideDirectoryData(),
  head: ({ loaderData }) => {
    const guides = loaderData?.guides ?? [];
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Guide Directory — Verified Guides", description, canonicalPath: FISHING_GUIDES_DIRECTORY_PATH }),
      links: [canonicalLink(texasDefinedBrand, FISHING_GUIDES_DIRECTORY_PATH)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify([
        { "@context": "https://schema.org", "@type": "CollectionPage", name: "Texas Fishing Guide Directory", description, url: `${origin}${FISHING_GUIDES_DIRECTORY_PATH}`, dateModified: loaderData?.verifiedAt },
        { "@context": "https://schema.org", "@type": "ItemList", name: "Verified Texas fishing guides", numberOfItems: guides.length, itemListElement: guides.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.guide.businessName, url: `${origin}${entry.href}` })) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: origin },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing guides", item: `${origin}${FISHING_GUIDES_DIRECTORY_PATH}` },
        ] },
      ]) }],
    };
  },
  component: FishingGuideDirectoryRoute,
});

function FishingGuideDirectoryRoute() {
  return <FishingGuideDirectory pageData={Route.useLoaderData()} search={Route.useSearch()} />;
}
