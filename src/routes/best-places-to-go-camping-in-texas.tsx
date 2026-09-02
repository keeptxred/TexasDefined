import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { destinationsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const title = "Texas Camping & RV Campground Guide";
const description = "Find verified public camping in Texas by RV, tent, primitive, beach, full-hookup, water access and region, with official reservation sources and links to destination, county, fishing and trip-planning guides.";
const canonicalPath = "/best-places-to-go-camping-in-texas";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute(canonicalPath)({
  loader: async ({ context }) => {
    // Load the comparison dataset only for this guide so it stays out of the global route bundle.
    const [{ CAMPING_DISCOVERY_PROFILES }, destinations] = await Promise.all([
      import("@/data/camping/discovery"),
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
    ]);
    const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
    return { entries: CAMPING_DISCOVERY_PROFILES.map((profile) => ({ profile, destination: bySlug.get(profile.destinationSlug) })) };
  },
  head: ({ loaderData }) => {
    const profiles = loaderData?.entries.map(({ profile }) => profile) ?? [];
    const modified = profiles.map((profile) => profile.verifiedAt).sort().at(-1) ?? "2026-09-01";
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": pageUrl,
            url: pageUrl,
            name: title,
            description,
            dateModified: modified,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            mainEntity: { "@id": `${pageUrl}#camping-directory` },
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#camping-directory`,
            name: "Verified Texas public camping destinations",
            numberOfItems: profiles.length,
            itemListElement: profiles.map((profile, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "TouristAttraction",
                name: profile.name,
                url: absoluteUrl(texasDefinedBrand, `/destination/${profile.destinationSlug}`),
                containedInPlace: { "@type": "State", name: "Texas" },
                provider: { "@type": "Organization", name: profile.managingAgency },
              },
            })),
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Camping & RV", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});
