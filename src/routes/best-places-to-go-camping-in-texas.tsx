import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { destinationsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const title = "Texas Camping & RV Campground Guide";
const description = "Find verified public camping and outdoor lodging in Texas by RV, tent, primitive, beach, cabins, glamping, full-hookup, water access and region, with official reservation sources and planning links.";
const canonicalPath = "/best-places-to-go-camping-in-texas";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

function profileAnchor(profile: { destinationSlug: string; profileSlug?: unknown }) {
  return typeof profile.profileSlug === "string" && profile.profileSlug ? profile.profileSlug : profile.destinationSlug;
}

export const Route = createFileRoute(canonicalPath)({
  loader: async ({ context }) => {
    // Load comparison datasets only for this guide so they stay out of the global route bundle.
    const [{ CAMPING_DISCOVERY_PROFILES }, { CAMPING_DISCOVERY_PROFILES_WAVE2 }, { CAMPING_DISCOVERY_PROFILES_WAVE3 }, { CAMPING_DISCOVERY_PROFILES_WAVE4 }, { CAMPING_DISCOVERY_PROFILES_WAVE5 }, destinations] = await Promise.all([
      import("@/data/camping/discovery"),
      import("@/data/camping/profiles-wave2"),
      import("@/data/camping/profiles-wave3"),
      import("@/data/camping/profiles-wave4"),
      import("@/data/camping/profiles-wave5"),
      context.queryClient.ensureQueryData(destinationsQuery({ limit: 5000 })),
    ]);
    const profiles = [...CAMPING_DISCOVERY_PROFILES, ...CAMPING_DISCOVERY_PROFILES_WAVE2, ...CAMPING_DISCOVERY_PROFILES_WAVE3, ...CAMPING_DISCOVERY_PROFILES_WAVE4, ...CAMPING_DISCOVERY_PROFILES_WAVE5];
    const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
    return { entries: profiles.map((profile) => ({ profile, destination: bySlug.get(profile.destinationSlug) })) };
  },
  head: ({ loaderData }) => {
    const entries = loaderData?.entries ?? [];
    const modified = entries.map(({ profile }) => profile.verifiedAt).sort().at(-1) ?? "2026-09-02";
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
            name: "Verified Texas public camping destinations, campgrounds and outdoor lodging",
            numberOfItems: entries.length,
            itemListElement: entries.map(({ profile, destination }, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "TouristAttraction",
                name: profile.name,
                url: destination && profileAnchor(profile) === profile.destinationSlug
                  ? absoluteUrl(texasDefinedBrand, `/destination/${profile.destinationSlug}`)
                  : `${pageUrl}#${profileAnchor(profile)}`,
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
