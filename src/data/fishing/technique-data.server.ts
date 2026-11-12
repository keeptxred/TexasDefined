import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

import { fishingPlatform, fishingScope } from "./index";
import { isFishingCurrentlyClosed } from "./operational-closures";
import { fishingTechniqueAuthorityContent } from "./technique-authority-content";
import { fishingTechniqueFaq } from "./technique-faq";
import { selectFeaturedLakeApplications } from "./technique-content-quality";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug } from "./slugs";
import { fishingTechniqueImages, isFishingTechniqueHeroReady } from "./technique-images";
import {
  FISHING_TECHNIQUES_DIRECTORY_PATH,
  FISHING_TECHNIQUES_VERIFIED_AT,
  FISHING_TECHNIQUE_EDITORIAL_UPDATED_AT,
  PUBLISHED_FISHING_TECHNIQUE_SLUGS,
  fishingTechniqueCanonicalPath,
} from "./technique-routing";

const origin = `https://${texasDefinedBrand.identity.domain}`;
const directoryDescription = "Choose a fishing method for Texas lakes by cover, depth and target species, with practical setup guides, seasonal notes and links to individual lake guides.";

type DirectoryHeadEntry = { technique: { name: string }; canonicalPath: string };
type ProfileHeadEntry = {
  technique: { name: string; slug: string; summary: string; verifiedAt: string };
  canonicalPath: string;
  featuredProfiles: Array<{ lake: { name: string; slug: string } }>;
  featuredSources: Array<{ url: string; checkedAt?: string }>;
  species: Array<{ commonName: string }>;
  sources: Array<{ url: string; checkedAt?: string }>;
};

function newestDate(values: Array<string | undefined>) {
  return values.filter((value): value is string => Boolean(value)).sort().at(-1);
}

function buildFishingTechniqueDirectoryHead(entries: DirectoryHeadEntry[]) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", url: `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}`, name: "Texas Fishing Techniques", description: directoryDescription, mainEntity: { "@id": `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}#techniques` } },
      { "@type": "ItemList", "@id": `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}#techniques`, numberOfItems: entries.length, itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.technique.name, url: `${origin}${entry.canonicalPath}` })) },
      { "@type": "FAQPage", mainEntity: fishingTechniqueFaq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Front page", item: origin },
        { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
        { "@type": "ListItem", position: 3, name: "Fishing techniques", item: `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}` },
      ] },
    ],
  };

  return {
    meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Techniques — Source-Backed Methods by Lake & Species", description: directoryDescription, canonicalPath: FISHING_TECHNIQUES_DIRECTORY_PATH }),
    links: [canonicalLink(texasDefinedBrand, FISHING_TECHNIQUES_DIRECTORY_PATH)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  };
}

function buildFishingTechniqueProfileHead(entry: ProfileHeadEntry) {
  const { technique, canonicalPath, featuredProfiles, featuredSources, species } = entry;
  const description = technique.slug === "trolling"
    ? "How to troll for fish in Texas lakes: boat routes, running depth, safe passes, seasonal choices and water-specific species guidance."
    : `How to fish ${technique.name.toLowerCase()} in Texas: practical setup, where and when to use it, seasonal guidance, and source-backed lake and species applications.`;
  const images = fishingTechniqueImages[technique.slug];
  const imageReady = isFishingTechniqueHeroReady(technique.slug);
  const authority = fishingTechniqueAuthorityContent[technique.slug as keyof typeof fishingTechniqueAuthorityContent];
  const faq = authority?.faq ?? [];
  const dateModified = newestDate([FISHING_TECHNIQUE_EDITORIAL_UPDATED_AT, technique.verifiedAt, ...featuredSources.map((source) => source.checkedAt)]) ?? technique.verifiedAt;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", url: `${origin}${canonicalPath}`, name: `${technique.name} Fishing in Texas`, description, dateModified, about: { "@type": "Thing", name: technique.name, description: technique.summary }, citation: featuredSources.map((source) => source.url), mainEntity: { "@id": `${origin}${canonicalPath}#lake-applications` }, ...(imageReady && images?.hero ? { image: images.hero.src.startsWith("http") ? images.hero.src : `${origin}${images.hero.src}` } : {}) },
      { "@type": "ItemList", "@id": `${origin}${canonicalPath}#lake-applications`, numberOfItems: featuredProfiles.length, itemListElement: featuredProfiles.map(({ lake }, index) => ({ "@type": "ListItem", position: index + 1, name: `${technique.name} — ${lake.name}`, url: `${origin}${fishingFoundationAnchor("lake", lake.slug)}` })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Front page", item: origin },
        { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
        { "@type": "ListItem", position: 3, name: "Fishing techniques", item: `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}` },
        { "@type": "ListItem", position: 4, name: technique.name, item: `${origin}${canonicalPath}` },
      ] },
      { "@type": "Thing", name: technique.name, description: technique.summary, subjectOf: `${origin}${canonicalPath}`, keywords: species.map((fish) => fish.commonName).join(", ") },
      ...(faq.length ? [{ "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }] : []),
    ],
  };

  return {
    meta: buildMeta(texasDefinedBrand, {
      title: technique.slug === "trolling" ? "Trolling for Fish in Texas — Boat Setup, Depth & Lakes" : `${technique.name} Fishing in Texas — Guide, Lakes & Seasons`,
      description,
      canonicalPath,
      robots: imageReady ? undefined : "noindex, follow, max-image-preview:large",
      ...(imageReady && images?.hero ? {
        image: images.hero.src,
        imageAlt: images.hero.alt,
        imageWidth: images.hero.width,
        imageHeight: images.hero.height,
        imageType: images.hero.imageType,
      } : {}),
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  };
}

export async function loadFishingTechniqueDirectoryServer() {
  const [allLakes, species, techniques, lakeTechniques] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.techniques.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.lakeTechniques.list(fishingScope),
  ]);

  const lakes = allLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug) && !isFishingCurrentlyClosed(lake.slug));
  const lakeById = new Map(lakes.map((lake) => [lake.id, lake]));
  const speciesById = new Map(species.map((fish) => [fish.id, fish]));
  const allowedSlugs = new Set<string>(PUBLISHED_FISHING_TECHNIQUE_SLUGS);

  const entries = techniques
    .filter((technique) => allowedSlugs.has(technique.slug))
    .map((technique) => {
      const profiles = lakeTechniques
        .filter((profile) => profile.techniqueId === technique.id)
        .filter((profile) => lakeById.has(profile.lakeId))
        .filter((profile) => Boolean(profile.verifiedAt) && profile.sources.length > 0)
        .map((profile) => ({
          profile,
          lake: lakeById.get(profile.lakeId)!,
          species: profile.speciesIds.map((speciesId) => speciesById.get(speciesId)).filter((fish): fish is NonNullable<typeof fish> => Boolean(fish)),
        }))
        .sort((a, b) => a.lake.name.localeCompare(b.lake.name));

      if (!profiles.length || !technique.verifiedAt || !technique.sources.length) return null;

      const relatedSpecies = [...new Map(profiles.flatMap((row) => row.species).map((fish) => [fish.id, fish])).values()]
        .sort((a, b) => a.commonName.localeCompare(b.commonName));
      const relatedLakes = [...new Map(profiles.map((row) => [row.lake.id, row.lake])).values()]
        .sort((a, b) => a.name.localeCompare(b.name));
      const seasons = [...new Set(profiles.flatMap((row) => row.profile.seasons))].sort();
      const sources = [...new Map([
        ...technique.sources,
        ...profiles.flatMap((row) => row.profile.sources),
      ].map((source) => [source.url, source])).values()];

      const featuredProfiles = selectFeaturedLakeApplications(profiles);
      const featuredSources = [...new Map([
        ...technique.sources,
        ...featuredProfiles.flatMap((row) => row.profile.sources),
      ].map((source) => [source.url, source])).values()];

      return {
        technique,
        canonicalPath: fishingTechniqueCanonicalPath(technique.slug),
        profileCount: profiles.length,
        allProfiles: profiles.map(({ profile, lake }) => ({
          profile: { id: profile.id, seasons: profile.seasons },
          lake: { name: lake.name, slug: lake.slug },
        })),
        featuredProfiles,
        featuredSources,
        species: relatedSpecies,
        lakeCount: relatedLakes.length,
        seasons,
        lastVerifiedSourceAt: newestDate(sources.map((source) => source.checkedAt)) ?? technique.verifiedAt,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .sort((a, b) => a.technique.name.localeCompare(b.technique.name));

  const verifiedAt = newestDate([
    FISHING_TECHNIQUES_VERIFIED_AT,
    ...entries.map((entry) => entry.lastVerifiedSourceAt),
  ]) ?? FISHING_TECHNIQUES_VERIFIED_AT;

  return {
    verifiedAt,
    entries,
    species: [...new Map(entries.flatMap((entry) => entry.species).map((fish) => [fish.id, fish])).values()]
      .sort((a, b) => a.commonName.localeCompare(b.commonName)),
    categories: [...new Set(entries.map((entry) => entry.technique.category))].sort(),
    policy: {
      sourcing: "Start with cover and depth: soft plastics work precisely around cover, while spinnerbaits and crankbaits help search larger areas.",
      conditions: "Topwater suits visible surface activity; trolling is an option for open-water fish. These guides are not a live bite report; conditions and target species decide which method makes sense.",
      commerce: "Choose a lake guide for method-specific examples. sponsorship does not affect technique placement. Check current reports, closures and fishing regulations before you go.",
    },
    head: buildFishingTechniqueDirectoryHead(entries),
  };
}

export async function loadFishingTechniqueProfileServer(slug: string) {
  const directory = await loadFishingTechniqueDirectoryServer();
  const entry = directory.entries.find((row) => row.technique.slug === slug);
  return entry ? { ...entry, head: buildFishingTechniqueProfileHead(entry) } : null;
}

export type FishingTechniqueDirectoryData = Awaited<ReturnType<typeof loadFishingTechniqueDirectoryServer>>;
export type FishingTechniqueProfileData = NonNullable<Awaited<ReturnType<typeof loadFishingTechniqueProfileServer>>>;
