import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

import { fishingPlatform, fishingScope } from "./index";
import { fishingFoundationAnchor } from "./slugs";
import { largemouthBassEditorialProfile } from "./species-profiles";
import { fishingSpeciesCanonicalPath } from "./species-routing";

const qualityScore = { excellent: 40, good: 30, fair: 20, poor: 10, unknown: 0 } as const;
const prominenceScore = { primary: 6, secondary: 3, present: 1 } as const;
const canonicalPath = fishingSpeciesCanonicalPath("largemouth-bass");
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

function buildLargemouthBassHead(pageData: Awaited<ReturnType<typeof buildLargemouthBassPageData>>) {
  const url = `${siteUrl}${canonicalPath}`;
  const { species, profile } = pageData;
  const webPage = { "@type": "WebPage", "@id": url, url, name: "Largemouth Bass Fishing in Texas", description: profile.overview, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${url}#species` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, dateModified: profile.verifiedAt, citation: profile.sources.map((source) => source.url) };
  const speciesEntity = { "@type": "Thing", "@id": `${url}#species`, name: species.commonName, alternateName: species.aliases, description: species.summary, sameAs: profile.sources[0]?.url };
  const breadcrumb = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
    { "@type": "ListItem", position: 3, name: "Fish species", item: `${siteUrl}/fishing/species` },
    { "@type": "ListItem", position: 4, name: "Largemouth bass", item: url },
  ] };
  return {
    meta: buildMeta(texasDefinedBrand, { title: "Largemouth Bass Fishing in Texas — Seasons, Tactics & Best Lakes", description: "Fish largemouth bass across Texas with source-backed habitat, seasonal patterns, techniques, tackle, lures, ranked lakes, regulations and verified guide listings.", canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPage, speciesEntity, breadcrumb] }) }],
  };
}

async function buildLargemouthBassPageData() {
  const species = await fishingPlatform.species.getBySlug(fishingScope, largemouthBassEditorialProfile.slug);
  if (!species || species.status !== "published") throw new Error("Published largemouth bass species record is unavailable.");

  const [relations, lakes, techniques, guides, placements, advertisers, allSpecies] = await Promise.all([
    fishingPlatform.lakeSpecies.list({ ...fishingScope, speciesId: species.id }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", speciesId: species.id, limit: 5000 }),
    fishingPlatform.techniques.list({ ...fishingScope, status: "published", speciesId: species.id, limit: 100 }),
    fishingPlatform.guides.list({ ...fishingScope, status: "published", speciesId: species.id, limit: 100 }),
    fishingPlatform.placements.list({ ...fishingScope, status: "published", speciesId: species.id, limit: 100 }),
    fishingPlatform.advertisers.list({ ...fishingScope, status: "published" }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const lakeById = new Map(lakes.map((lake) => [lake.id, lake]));
  const rankedLakes = relations
    .map((relation) => {
      const lake = lakeById.get(relation.lakeId);
      if (!lake) return null;
      const score = qualityScore[relation.quality] + prominenceScore[relation.prominence] + (lake.featured ? 1 : 0);
      return { lake, relation, score, href: fishingFoundationAnchor("lake", lake.slug) };
    })
    .filter((row): row is NonNullable<typeof row> => Boolean(row))
    .sort((left, right) => right.score - left.score || left.lake.name.localeCompare(right.lake.name));

  const techniqueById = new Map(techniques.map((row) => [row.id, row]));
  const recommendedTechniques = largemouthBassEditorialProfile.techniqueIds.map((id) => techniqueById.get(id)).filter((row): row is NonNullable<typeof row> => Boolean(row));
  const relatedSpecies = largemouthBassEditorialProfile.relatedSpeciesSlugs.map((slug) => allSpecies.find((row) => row.slug === slug)).filter((row): row is NonNullable<typeof row> => Boolean(row));
  const verifiedGuides = guides.filter((guide) => guide.verifiedListing);
  const advertiserById = new Map(advertisers.map((row) => [row.id, row]));
  const now = largemouthBassEditorialProfile.verifiedAt;
  const sponsoredPlacements = placements
    .filter((row) => (!row.startsAt || row.startsAt.slice(0, 10) <= now) && (!row.endsAt || row.endsAt.slice(0, 10) >= now))
    .map((placement) => ({ placement, advertiser: advertiserById.get(placement.advertiserId) ?? null }))
    .filter((row) => Boolean(row.advertiser));

  const regions = [...new Set(rankedLakes.map((row) => row.lake.region))];
  return {
    species,
    profile: largemouthBassEditorialProfile,
    rankedLakes,
    recommendedTechniques,
    relatedSpecies,
    verifiedGuides,
    sponsoredPlacements,
    regions,
  };
}

export async function loadLargemouthBassPageDataServer() {
  const pageData = await buildLargemouthBassPageData();
  return { ...pageData, head: buildLargemouthBassHead(pageData) };
}
