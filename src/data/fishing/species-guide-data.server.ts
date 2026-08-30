import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

import { fishingPlatform, fishingScope } from "./index";
import {
  fishingFoundationAnchor,
  isCompleteFishingLakeSlug,
  isCompleteFishingSpeciesSlug,
  type CompleteFishingSpeciesSlug,
} from "./slugs";
import {
  FISHING_SPECIES_DIRECTORY_PATH,
  FISHING_SPECIES_VERIFIED_AT,
  fishingSpeciesCanonicalPath,
} from "./species-routing";
import {
  PUBLISHED_FISHING_TECHNIQUE_SLUGS,
  fishingTechniqueCanonicalPath,
} from "./technique-routing";

const origin = `https://${texasDefinedBrand.identity.domain}`;
const seasonOrder = new Map(["spring", "summer", "fall", "winter", "year-round"].map((season, index) => [season, index]));

type SpeciesProfileHeadEntry = Awaited<ReturnType<typeof buildSpeciesProfileEntry>>;

function uniqueByUrl<T extends { url: string }>(rows: T[]) {
  return [...new Map(rows.map((row) => [row.url, row])).values()];
}

function titleCase(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildFishingSpeciesProfileHead(entry: NonNullable<SpeciesProfileHeadEntry>) {
  const { species, canonicalPath, lakes, sources } = entry;
  const url = `${origin}${canonicalPath}`;
  const isBlueCatfish = canonicalPath === "/fishing/species/blue-catfish";
  const title = isBlueCatfish
    ? "Blue Catfish in Texas: Fishing Guide"
    : `${species.commonName} Fishing in Texas — Lakes, Seasons & Techniques`;
  const description = isBlueCatfish
    ? "Blue catfish in Texas: verified lake relationships, seasonal patterns and source-backed fishing techniques without live-bite or sponsor-ranking claims."
    : `${species.commonName} fishing in Texas: verified complete-lake relationships, seasonal patterns and source-backed technique applications without live-bite or sponsor-ranking claims.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: `${species.commonName} Fishing in Texas`,
        description,
        dateModified: FISHING_SPECIES_VERIFIED_AT,
        isPartOf: { "@id": `${origin}/#website` },
        mainEntity: { "@id": `${url}#species` },
        citation: sources.map((source) => source.url),
      },
      {
        "@type": "Thing",
        "@id": `${url}#species`,
        name: species.commonName,
        alternateName: species.aliases,
        description: species.summary,
        sameAs: species.sources[0]?.url,
      },
      {
        "@type": "ItemList",
        "@id": `${url}#complete-lakes`,
        numberOfItems: lakes.length,
        itemListElement: lakes.map((row, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${species.commonName} — ${row.lake.name}`,
          url: `${origin}${row.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: origin },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fish species", item: `${origin}${FISHING_SPECIES_DIRECTORY_PATH}` },
          { "@type": "ListItem", position: 4, name: species.commonName, item: url },
        ],
      },
    ],
  };

  return {
    meta: buildMeta(texasDefinedBrand, {
      title,
      description,
      canonicalPath,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  };
}

async function buildSpeciesProfileEntry(slug: CompleteFishingSpeciesSlug) {
  const species = await fishingPlatform.species.getBySlug(fishingScope, slug);
  if (!species || species.status !== "published" || !species.verifiedAt || !species.sources.length) return null;

  const [allLakes, lakeSpecies, lakeTechniques, techniques] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeSpecies.list({ ...fishingScope, speciesId: species.id }),
    fishingPlatform.lakeTechniques.list(fishingScope),
    fishingPlatform.techniques.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const completeLakes = allLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug));
  const lakeById = new Map(completeLakes.map((lake) => [lake.id, lake]));
  const lakes = lakeSpecies
    .filter((relation) => lakeById.has(relation.lakeId))
    .filter((relation) => Boolean(relation.verifiedAt) && relation.sources.length > 0)
    .map((relation) => ({
      lake: lakeById.get(relation.lakeId)!,
      relation,
      href: fishingFoundationAnchor("lake", lakeById.get(relation.lakeId)!.slug),
    }))
    .sort((left, right) => left.lake.name.localeCompare(right.lake.name));

  if (!lakes.length) return null;

  const publicTechniqueSlugs = new Set<string>(PUBLISHED_FISHING_TECHNIQUE_SLUGS);
  const techniqueById = new Map(techniques.map((technique) => [technique.id, technique]));
  const techniqueApplications = lakeTechniques
    .filter((profile) => profile.speciesIds.includes(species.id))
    .filter((profile) => lakeById.has(profile.lakeId))
    .filter((profile) => Boolean(profile.verifiedAt) && profile.sources.length > 0)
    .map((profile) => ({
      profile,
      lake: lakeById.get(profile.lakeId)!,
      technique: techniqueById.get(profile.techniqueId) ?? null,
    }))
    .filter((row) => row.technique && publicTechniqueSlugs.has(row.technique.slug) && Boolean(row.technique.verifiedAt) && row.technique.sources.length > 0)
    .map((row) => ({ ...row, technique: row.technique! }))
    .sort((left, right) => left.technique.name.localeCompare(right.technique.name) || left.lake.name.localeCompare(right.lake.name));

  const relatedTechniques = [...new Map(techniqueApplications.map((row) => [row.technique.id, row.technique])).values()]
    .map((technique) => ({ ...technique, href: fishingTechniqueCanonicalPath(technique.slug) }))
    .sort((left, right) => left.name.localeCompare(right.name));

  const seasonalPatterns = lakes
    .flatMap((row) => row.relation.seasonalPatterns.map((pattern) => ({ ...pattern, lake: row.lake, href: row.href })))
    .sort((left, right) => (seasonOrder.get(left.season) ?? 99) - (seasonOrder.get(right.season) ?? 99) || left.lake.name.localeCompare(right.lake.name));

  const sources = uniqueByUrl([
    ...species.sources,
    ...lakes.flatMap((row) => row.relation.sources),
    ...techniqueApplications.flatMap((row) => [...row.profile.sources, ...row.technique.sources]),
  ]);

  const canonicalPath = fishingSpeciesCanonicalPath(slug);
  return {
    species,
    canonicalPath,
    lakes,
    seasonalPatterns,
    techniqueApplications,
    relatedTechniques,
    sources,
    verifiedAt: FISHING_SPECIES_VERIFIED_AT,
    policy: {
      sourcing: "A standalone species page requires a verified species record plus at least one verified lake-to-species relationship on a complete TexasDefined lake guide.",
      conditions: "Seasonal patterns and technique applications are durable planning context from source-backed lake relationships, not a live bite report or claim about today's conditions.",
      commerce: "Lake order is alphabetical. Sponsorship, affiliate value, product price and advertiser status do not change species guidance or editorial ordering.",
    },
  };
}

export async function loadFishingSpeciesProfileServer(slug: string) {
  if (!isCompleteFishingSpeciesSlug(slug)) return null;
  const entry = await buildSpeciesProfileEntry(slug);
  return entry ? { ...entry, head: buildFishingSpeciesProfileHead(entry) } : null;
}

export type FishingSpeciesProfileData = NonNullable<Awaited<ReturnType<typeof loadFishingSpeciesProfileServer>>>;
