import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { hasCampingDestinationGuide } from "@/data/camping/destination-guides";
import { withResearchedCampingPetPolicy } from "@/data/camping/pet-policies";
import { CAMPING_OPERATIONAL_ALERTS } from "@/data/camping/official-alerts.generated";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const title = "Best Places to Go Camping in Texas | Parks, Beaches & Campgrounds";
const description = "Find the best places to go camping in Texas, from Hill Country rivers and Gulf beaches to canyon, forest and desert campsites. Compare verified campgrounds, camping styles, facilities and official reservation sources.";
const canonicalPath = "/best-places-to-go-camping-in-texas";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
// Updated only when substantive editorial guidance changes, not on routine source pings.
const EDITORIAL_UPDATED_AT = "2026-11-04";

function profileAnchor(profile: { destinationSlug: string; profileSlug?: unknown }) {
  return typeof profile.profileSlug === "string" && profile.profileSlug ? profile.profileSlug : profile.destinationSlug;
}

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    // Keep this guide self-contained. It needs verified campground comparison
    // data, not the full statewide destination resolver.
    const [
      { CAMPING_DISCOVERY_PROFILES },
      { CAMPING_DISCOVERY_PROFILES_WAVE2 },
      { CAMPING_DISCOVERY_PROFILES_WAVE3 },
      { CAMPING_DISCOVERY_PROFILES_WAVE4 },
      { CAMPING_DISCOVERY_PROFILES_WAVE5 },
      { CAMPING_DISCOVERY_PROFILES_WAVE6 },
      { CAMPING_DISCOVERY_PROFILES_WAVE7 },
      { CAMPING_DISCOVERY_PROFILES_WAVE8 },
      { CAMPING_DISCOVERY_PROFILES_WAVE9 },
      { CAMPING_DISCOVERY_PROFILES_WAVE10 },
    ] = await Promise.all([
      import("@/data/camping/discovery"),
      import("@/data/camping/profiles-wave2"),
      import("@/data/camping/profiles-wave3"),
      import("@/data/camping/profiles-wave4"),
      import("@/data/camping/profiles-wave5"),
      import("@/data/camping/profiles-wave6"),
      import("@/data/camping/profiles-wave7"),
      import("@/data/camping/profiles-wave8"),
      import("@/data/camping/profiles-wave9"),
      import("@/data/camping/profiles-wave10"),
    ]);
    const profiles = [
      ...CAMPING_DISCOVERY_PROFILES,
      ...CAMPING_DISCOVERY_PROFILES_WAVE2,
      ...CAMPING_DISCOVERY_PROFILES_WAVE3,
      ...CAMPING_DISCOVERY_PROFILES_WAVE4,
      ...CAMPING_DISCOVERY_PROFILES_WAVE5,
      ...CAMPING_DISCOVERY_PROFILES_WAVE6,
      ...CAMPING_DISCOVERY_PROFILES_WAVE7,
      ...CAMPING_DISCOVERY_PROFILES_WAVE8,
      ...CAMPING_DISCOVERY_PROFILES_WAVE9,
      ...CAMPING_DISCOVERY_PROFILES_WAVE10,
    ];
    return { entries: profiles.map((profile) => ({ profile: withResearchedCampingPetPolicy(profile) })) };
  },
  head: ({ loaderData }) => {
    const entries = loaderData?.entries ?? [];
    // Page metadata reflects substantive operational-notice updates; individual
    // campground verifiedAt dates continue to represent their own source research.
    const modified = [EDITORIAL_UPDATED_AT, ...entries.map(({ profile }) => profile.verifiedAt), ...CAMPING_OPERATIONAL_ALERTS.map((alert) => alert.checkedAt)].sort().at(-1) ?? EDITORIAL_UPDATED_AT;
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
            author: { "@type": "Organization", name: "Texas Defined", url: absoluteUrl(texasDefinedBrand, "/about") },
            publisher: { "@type": "Organization", name: "Texas Defined", url: absoluteUrl(texasDefinedBrand, "/") },
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
                url: hasCampingDestinationGuide(profile.destinationSlug) && profileAnchor(profile) === profile.destinationSlug
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
