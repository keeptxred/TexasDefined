import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

import { fishingPlatform, fishingScope } from "./index";
import { FISHING_GUIDES_DIRECTORY_PATH, FISHING_GUIDES_VERIFIED_AT, fishingGuideCanonicalPath } from "./guide-routing";

const SPONSORED_GUIDE_KINDS = ["featured-guide", "regional-guide", "statewide-advertiser"] as const;
const description = "Browse Texas fishing guides only after their listings and service relationships are verified, with lake, region and target-species filters activated from real data.";

function buildFishingGuideDirectoryHead(guides: Array<{ guide: { businessName: string }; href: string }>) {
  const origin = `https://${texasDefinedBrand.identity.domain}`;
  return {
    meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Guide Directory — Verified Guides", description, canonicalPath: FISHING_GUIDES_DIRECTORY_PATH, robots: guides.length ? undefined : "noindex, follow" }),
    links: [canonicalLink(texasDefinedBrand, FISHING_GUIDES_DIRECTORY_PATH)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify([
      { "@context": "https://schema.org", "@type": "CollectionPage", name: "Texas Fishing Guide Directory", description, url: `${origin}${FISHING_GUIDES_DIRECTORY_PATH}`, dateModified: FISHING_GUIDES_VERIFIED_AT },
      { "@context": "https://schema.org", "@type": "ItemList", name: "Verified Texas fishing guides", numberOfItems: guides.length, itemListElement: guides.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.guide.businessName, url: `${origin}${entry.href}` })) },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: origin },
        { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
        { "@type": "ListItem", position: 3, name: "Fishing guides", item: `${origin}${FISHING_GUIDES_DIRECTORY_PATH}` },
      ] },
    ]) }],
  };
}

export async function loadFishingGuideDirectoryDataServer() {
  const [guides, guideLakes, guideSpecies, lakes, species, advertisers, placements] = await Promise.all([
    fishingPlatform.guides.list({ ...fishingScope, status: "published", verifiedListing: true, limit: 5000 }),
    fishingPlatform.guideLakes.list(fishingScope),
    fishingPlatform.guideSpecies.list(fishingScope),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.advertisers.list({ ...fishingScope, status: "published" }),
    fishingPlatform.placements.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const speciesById = new Map(species.map((row) => [row.id, row]));
  const advertiserById = new Map(advertisers.map((row) => [row.id, row]));

  const editorialGuides = [...guides]
    .sort((left, right) => left.businessName.localeCompare(right.businessName) || left.slug.localeCompare(right.slug))
    .map((guide) => {
      const lakeRelations = guideLakes.filter((relation) => relation.guideId === guide.id);
      const speciesRelations = guideSpecies.filter((relation) => relation.guideId === guide.id);
      return {
        guide,
        href: fishingGuideCanonicalPath(guide.slug),
        lakes: lakeRelations.map((relation) => ({ relation, lake: lakeById.get(relation.lakeId) })).filter((row) => Boolean(row.lake)),
        species: speciesRelations.map((relation) => ({ relation, species: speciesById.get(relation.speciesId) })).filter((row) => Boolean(row.species)),
      };
    });

  const usedLakeIds = new Set(editorialGuides.flatMap((entry) => entry.lakes.map(({ lake }) => lake!.id)));
  const usedSpeciesIds = new Set(editorialGuides.flatMap((entry) => entry.species.map(({ species: fish }) => fish!.id)));
  const usedRegions = new Set(editorialGuides.flatMap(({ guide }) => guide.serviceRegions ?? []));

  const sponsoredPlacements = placements
    .filter((placement) => SPONSORED_GUIDE_KINDS.includes(placement.kind as (typeof SPONSORED_GUIDE_KINDS)[number]))
    .map((placement) => ({ placement, advertiser: advertiserById.get(placement.advertiserId) }))
    .filter((entry) => Boolean(entry.advertiser));

  return {
    verifiedAt: FISHING_GUIDES_VERIFIED_AT,
    editorialOrder: "Alphabetical by verified guide business name. Sponsorship never changes this order.",
    guides: editorialGuides,
    filters: {
      lakes: lakes.filter((lake) => usedLakeIds.has(lake.id)).sort((a, b) => a.name.localeCompare(b.name)),
      species: species.filter((fish) => usedSpeciesIds.has(fish.id)).sort((a, b) => a.commonName.localeCompare(b.commonName)),
      regions: [...usedRegions].sort(),
      tripTypes: [] as string[],
    },
    sponsoredPlacements,
    head: buildFishingGuideDirectoryHead(editorialGuides),
  };
}

export type FishingGuideDirectoryData = Awaited<ReturnType<typeof loadFishingGuideDirectoryDataServer>>;
