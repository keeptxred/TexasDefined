import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const title = "Best Places to Go Camping in Texas | RV, Tent & Primitive Camping";
const description = "Compare standout Texas camping destinations, then search verified public campgrounds by RV, tent, primitive, beach, cabins, full hookups, water access, region and official reservation source.";
const canonicalPath = "/best-places-to-go-camping-in-texas";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

function profileAnchor(profile: { destinationSlug: string; profileSlug?: unknown }) {
  return typeof profile.profileSlug === "string" && profile.profileSlug ? profile.profileSlug : profile.destinationSlug;
}

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    // Keep the camping guide self-contained. It needs verified campground
    // comparison data, not the full statewide destination resolver.
    const [
      { CAMPING_DISCOVERY_PROFILES },
      { CAMPING_DISCOVERY_PROFILES_WAVE2 },
      { CAMPING_DISCOVERY_PROFILES_WAVE3 },
      { CAMPING_DISCOVERY_PROFILES_WAVE4 },
      { CAMPING_DISCOVERY_PROFILES_WAVE5 },
    ] = await Promise.all([
      import("@/data/camping/discovery"),
      import("@/data/camping/profiles-wave2"),
      import("@/data/camping/profiles-wave3"),
      import("@/data/camping/profiles-wave4"),
      import("@/data/camping/profiles-wave5"),
    ]);
    const profiles = [
      ...CAMPING_DISCOVERY_PROFILES,
      ...CAMPING_DISCOVERY_PROFILES_WAVE2,
      ...CAMPING_DISCOVERY_PROFILES_WAVE3,
      ...CAMPING_DISCOVERY_PROFILES_WAVE4,
      ...CAMPING_DISCOVERY_PROFILES_WAVE5,
    ];
    return { entries: profiles.map((profile) => ({ profile })) };
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
            name: "Verified Texas public camping destinations and campgrounds",
            numberOfItems: entries.length,
            itemListElement: entries.map(({ profile }, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Campground",
                name: profile.name,
                url: profileAnchor(profile) === profile.destinationSlug
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
              { "@type": "ListItem", position: 3, name: "Best Camping in Texas", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});
