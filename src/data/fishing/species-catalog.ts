import { fishSpecies as foundationFishSpecies } from "./fixtures";
import type { FishSpecies, FishingSource } from "./types";

const BRAND = "texasdefined" as const;
export const FISH_SPECIES_CATALOG_VERIFIED_AT = "2026-08-13";

const speciesSource = (id: string, name: string, url: string): FishingSource => ({
  id,
  name,
  url,
  checkedAt: FISH_SPECIES_CATALOG_VERIFIED_AT,
  sourceType: "state",
});

const tpwdWildlifeIndex = speciesSource(
  "tpwd-fish-species-index",
  "Texas Parks & Wildlife Department — Wildlife Fact Sheets",
  "https://tpwd.texas.gov/huntwild/wild/species/",
);

const supplementalFishSpecies: FishSpecies[] = [
  {
    id: "guadalupe-bass",
    brandId: BRAND,
    slug: "guadalupe-bass",
    status: "published",
    verifiedAt: FISH_SPECIES_CATALOG_VERIFIED_AT,
    sources: [speciesSource("tpwd-guadalupe-bass", "Texas Parks & Wildlife Department — Guadalupe Bass", "https://tpwd.texas.gov/huntwild/wild/species/gdb/")],
    commonName: "Guadalupe bass",
    scientificName: "Micropterus treculii",
    taxonKind: "species",
    waterClass: "freshwater",
    summary: "Texas' endemic state fish, adapted to flowing Hill Country and Edwards Plateau streams and prized for current-water fishing.",
    aliases: ["Guadalupe spotted bass"],
    featured: true,
  },
  {
    id: "black-crappie",
    brandId: BRAND,
    slug: "black-crappie",
    status: "published",
    verifiedAt: FISH_SPECIES_CATALOG_VERIFIED_AT,
    sources: [speciesSource("tpwd-black-crappie", "Texas Parks & Wildlife Department — Black Crappie", "https://tpwd.texas.gov/huntwild/wild/species/crappie/")],
    commonName: "Black crappie",
    scientificName: "Pomoxis nigromaculatus",
    taxonKind: "species",
    waterClass: "freshwater",
    summary: "A structure-oriented crappie common in clearer waters, especially in East and Northeast Texas, and often caught around brush, timber and spawning cover.",
  },
  {
    id: "white-crappie",
    brandId: BRAND,
    slug: "white-crappie",
    status: "published",
    verifiedAt: FISH_SPECIES_CATALOG_VERIFIED_AT,
    sources: [tpwdWildlifeIndex],
    commonName: "White crappie",
    scientificName: "Pomoxis annularis",
    taxonKind: "species",
    waterClass: "freshwater",
    summary: "A widespread Texas crappie that uses reservoirs, rivers, brush, timber and seasonal shallow spawning habitat.",
  },
  {
    id: "alligator-gar",
    brandId: BRAND,
    slug: "alligator-gar",
    status: "published",
    verifiedAt: FISH_SPECIES_CATALOG_VERIFIED_AT,
    sources: [speciesSource("tpwd-alligator-gar", "Texas Parks & Wildlife Department — Alligator Gar", "https://tpwd.texas.gov/huntwild/wild/species/alg/")],
    commonName: "Alligator gar",
    scientificName: "Atractosteus spatula",
    taxonKind: "species",
    waterClass: "both",
    summary: "Texas' largest gar, found in major rivers, reservoirs and some coastal waters, with special harvest and reporting rules that anglers must verify before fishing.",
    aliases: ["gator gar"],
    featured: true,
  },
  {
    id: "freshwater-drum",
    brandId: BRAND,
    slug: "freshwater-drum",
    status: "published",
    verifiedAt: FISH_SPECIES_CATALOG_VERIFIED_AT,
    sources: [tpwdWildlifeIndex],
    commonName: "Freshwater drum",
    scientificName: "Aplodinotus grunniens",
    taxonKind: "species",
    waterClass: "freshwater",
    summary: "A widespread native freshwater fish that uses rivers and reservoirs and can provide strong light- and medium-tackle fishing around bottom structure and current.",
  },
  {
    id: "sunfish",
    brandId: BRAND,
    slug: "sunfish",
    status: "published",
    verifiedAt: FISH_SPECIES_CATALOG_VERIFIED_AT,
    sources: [tpwdWildlifeIndex],
    commonName: "Sunfish",
    taxonKind: "group",
    waterClass: "freshwater",
    summary: "A practical Texas fishing group that includes bluegill and other panfish found around shoreline cover, docks, vegetation, creeks and ponds.",
    featured: true,
  },
  {
    id: "rainbow-trout",
    brandId: BRAND,
    slug: "rainbow-trout",
    status: "published",
    verifiedAt: FISH_SPECIES_CATALOG_VERIFIED_AT,
    sources: [speciesSource("tpwd-rainbow-trout", "Texas Parks & Wildlife Department — Rainbow Trout", "https://tpwd.texas.gov/huntwild/wild/species/rbt/")],
    commonName: "Rainbow trout",
    scientificName: "Oncorhynchus mykiss",
    taxonKind: "species",
    waterClass: "freshwater",
    summary: "A cool-water fish that supports Texas' seasonal winter put-and-take fisheries through annual stockings, with limited year-round survival in suitable cold-water habitat.",
    featured: true,
  },
];

export const texasFreshwaterFishSpecies: FishSpecies[] = [
  ...new Map([...foundationFishSpecies, ...supplementalFishSpecies].map((row) => [row.id, row])).values(),
];

export interface FishSpeciesFamilyDefinition {
  id: string;
  name: string;
  description: string;
  speciesSlugs: string[];
}

export const fishSpeciesFamilies: FishSpeciesFamilyDefinition[] = [
  { id: "black-bass", name: "Black bass", description: "Texas' largemouth, smallmouth, Guadalupe and spotted bass fisheries.", speciesSlugs: ["largemouth-bass", "smallmouth-bass", "guadalupe-bass", "spotted-bass"] },
  { id: "temperate-bass", name: "White, striped & hybrid bass", description: "Schooling and open-water bass fisheries, including spring white-bass runs and reservoir striped-bass fishing.", speciesSlugs: ["white-bass", "striped-bass", "hybrid-striped-bass"] },
  { id: "crappie", name: "Crappie", description: "Black and white crappie plus the statewide crappie fishing group used by lake relationships.", speciesSlugs: ["crappie", "black-crappie", "white-crappie"] },
  { id: "catfish", name: "Catfish", description: "Blue, channel and flathead catfish, plus the statewide catfish group used by lake relationships.", speciesSlugs: ["catfish", "blue-catfish", "channel-catfish", "flathead-catfish"] },
  { id: "gar-drum", name: "Gar & drum", description: "Distinctive native fisheries ranging from trophy alligator gar to widespread freshwater drum.", speciesSlugs: ["alligator-gar", "freshwater-drum"] },
  { id: "sunfish", name: "Sunfish & panfish", description: "Accessible shoreline and family fishing built around bluegill and related sunfish.", speciesSlugs: ["sunfish", "bluegill"] },
  { id: "trout", name: "Seasonal trout", description: "Winter rainbow-trout opportunities created by TPWD stocking and cold-water habitat.", speciesSlugs: ["rainbow-trout"] },
];

export function getTexasFreshwaterSpeciesBySlug(slug: string) {
  return texasFreshwaterFishSpecies.find((row) => row.slug === slug) ?? null;
}
