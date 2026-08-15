import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

import { fishingPlatform, fishingScope } from "./index";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug } from "./slugs";
import {
  FISHING_TECHNIQUES_DIRECTORY_PATH,
  FISHING_TECHNIQUES_VERIFIED_AT,
  PUBLISHED_FISHING_TECHNIQUE_SLUGS,
  fishingTechniqueCanonicalPath,
} from "./technique-routing";

const origin = `https://${texasDefinedBrand.identity.domain}`;
const directoryDescription = "Browse source-backed Texas fishing techniques and see the complete lakes, target species and seasons where each method has a verified relationship in TexasDefined's fishing catalog.";
const directoryFaq = [
  { question: "Are these live fishing recommendations?", answer: "No. Technique pages organize durable, source-backed lake relationships. Check fresh fishing reports and current conditions before a trip." },
  { question: "Does TexasDefined recommend specific tackle brands?", answer: "No. The technique directory explains verified methods and lake applications without product rankings, affiliate weighting or sponsor influence." },
  { question: "Why are some fishing techniques not listed?", answer: "A public technique page requires a verified technique record plus at least one verified application on a complete TexasDefined lake guide. Missing coverage is not a judgment that another method does not work." },
];

type DirectoryHeadEntry = { technique: { name: string }; canonicalPath: string };
type ProfileHeadEntry = {
  technique: { name: string; summary: string; verifiedAt: string };
  canonicalPath: string;
  lakes: Array<{ name: string; slug: string }>;
  species: Array<{ commonName: string }>;
  sources: Array<{ url: string }>;
};

function buildFishingTechniqueDirectoryHead(entries: DirectoryHeadEntry[]) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", url: `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}`, name: "Texas Fishing Techniques", description: directoryDescription, mainEntity: { "@id": `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}#techniques` } },
      { "@type": "ItemList", "@id": `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}#techniques`, numberOfItems: entries.length, itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.technique.name, url: `${origin}${entry.canonicalPath}` })) },
      { "@type": "FAQPage", mainEntity: directoryFaq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
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
  const { technique, canonicalPath, lakes, species, sources } = entry;
  const description = `${technique.name} fishing in Texas: source-backed lake applications, target species and seasonal context drawn from TexasDefined's complete fishing-lake guides.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", url: `${origin}${canonicalPath}`, name: `${technique.name} Fishing in Texas`, description, dateModified: technique.verifiedAt, about: { "@type": "Thing", name: technique.name, description: technique.summary }, citation: sources.map((source) => source.url), mainEntity: { "@id": `${origin}${canonicalPath}#lake-applications` } },
      { "@type": "ItemList", "@id": `${origin}${canonicalPath}#lake-applications`, numberOfItems: lakes.length, itemListElement: lakes.map((lake, index) => ({ "@type": "ListItem", position: index + 1, name: `${technique.name} — ${lake.name}`, url: `${origin}${fishingFoundationAnchor("lake", lake.slug)}` })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Front page", item: origin },
        { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
        { "@type": "ListItem", position: 3, name: "Fishing techniques", item: `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}` },
        { "@type": "ListItem", position: 4, name: technique.name, item: `${origin}${canonicalPath}` },
      ] },
      { "@type": "Thing", name: technique.name, description: technique.summary, subjectOf: `${origin}${canonicalPath}`, keywords: species.map((fish) => fish.commonName).join(", ") },
    ],
  };

  return {
    meta: buildMeta(texasDefinedBrand, { title: `${technique.name} Fishing in Texas — Lakes, Species & Seasons`, description, canonicalPath }),
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

  const lakes = allLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug));
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

      return {
        technique,
        canonicalPath: fishingTechniqueCanonicalPath(technique.slug),
        profiles,
        species: relatedSpecies,
        lakes: relatedLakes,
        seasons,
        sources,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .sort((a, b) => a.technique.name.localeCompare(b.technique.name));

  return {
    verifiedAt: FISHING_TECHNIQUES_VERIFIED_AT,
    entries,
    species: [...new Map(entries.flatMap((entry) => entry.species).map((fish) => [fish.id, fish])).values()]
      .sort((a, b) => a.commonName.localeCompare(b.commonName)),
    categories: [...new Set(entries.map((entry) => entry.technique.category))].sort(),
    policy: {
      sourcing: "Technique pages publish only when the technique and at least one complete-lake application have verified source relationships.",
      conditions: "Technique guidance is durable planning context, not a live bite report, forecast, or claim that a method is productive today.",
      commerce: "TexasDefined does not rank technique guidance by sponsorship, brand, product price, affiliate value, or advertiser status.",
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
