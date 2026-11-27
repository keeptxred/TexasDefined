import { fishSpecies as foundationFishSpecies } from "./fixtures";
import type { FishSpecies, FishingSource } from "./types";

const BRAND = "texasdefined" as const;
export const FISH_SPECIES_CATALOG_VERIFIED_AT = "2026-08-13";

const speciesSource = (id: string, name: string, url: string, checkedAt = FISH_SPECIES_CATALOG_VERIFIED_AT): FishingSource => ({
  id,
  name,
  url,
  checkedAt,
  sourceType: "state",
});

const tpwdWildlifeIndex = speciesSource(
  "tpwd-fish-species-index",
  "Texas Parks & Wildlife Department — Wildlife Fact Sheets",
  "https://tpwd.texas.gov/huntwild/wild/species/",
);

const supplementalFishSpecies: FishSpecies[] = [
  {
    id: "alabama-bass", brandId: BRAND, slug: "alabama-bass", status: "published",
    verifiedAt: "2026-11-27",
    sources: [speciesSource("tpwd-alan-henry-alabama-bass", "Texas Parks & Wildlife Department — Alan Henry Reservoir 2021 Survey Report", "https://tpwd.texas.gov/publications/pwdpubs/lake_survey/pwd_rp_t3200_1233/", "2026-11-27")],
    commonName: "Alabama bass", scientificName: "Micropterus henshalli", taxonKind: "species", waterClass: "freshwater",
    summary: "Alan Henry Reservoir's introduced black bass, distinguished from spotted bass in TPWD fisheries surveys. The lake's angling summary retains the older spotted-bass label; consult the survey and current rules.",
  },
  {
    id: "bowfin", brandId: BRAND, slug: "bowfin", status: "published",
    verifiedAt: "2026-11-15",
    sources: [speciesSource("tpwd-bowfin", "Texas Parks & Wildlife Department — Bowfin", "https://tpwd.texas.gov/huntwild/wild/species/bowfin/", "2026-11-15")],
    commonName: "Bowfin", scientificName: "Amia calva", taxonKind: "species", waterClass: "freshwater",
    summary: "Native air-breathing predator of eastern Texas backwaters, recognized by its long dorsal fin, rounded tail and broad toothy mouth.",
  },
  {
    id: "common-carp", brandId: BRAND, slug: "common-carp", status: "published",
    verifiedAt: "2026-11-15",
    sources: [speciesSource("tpwd-common-carp", "Texas Parks & Wildlife Department — Common carp", "https://tpwd.texas.gov/huntwild/wild/species/crp/", "2026-11-15")],
    commonName: "Common carp", scientificName: "Cyprinus carpio", taxonKind: "species", waterClass: "freshwater",
    summary: "Widespread introduced bottom-feeding fish with bronze scales, a long dorsal fin and two pairs of mouth barbels.",
  },
  {
    id: "spotted-gar", brandId: BRAND, slug: "spotted-gar", status: "published",
    verifiedAt: "2026-11-15",
    sources: [speciesSource("tpwd-spotted-gar", "Texas Parks & Wildlife Department — Spotted gar", "https://tpwd.texas.gov/huntwild/wild/species/spottedgar/", "2026-11-15")],
    commonName: "Spotted gar", scientificName: "Lepisosteus oculatus", taxonKind: "species", waterClass: "freshwater",
    summary: "Native armored fish of vegetated backwaters, identifiable by dark spots across the head, body and fins.",
  },
  {
    id: "redear-sunfish", brandId: BRAND, slug: "redear-sunfish", status: "published",
    verifiedAt: "2026-11-15",
    sources: [speciesSource("tpwd-redear-sunfish", "Texas Parks & Wildlife Department — Redear sunfish", "https://tpwd.texas.gov/huntwild/wild/species/sunfish/", "2026-11-15")],
    commonName: "Redear sunfish", scientificName: "Lepomis microlophus", taxonKind: "species", waterClass: "freshwater",
    summary: "Bottom-feeding sunfish of warm lakes and ponds, with a distinct red or orange margin on its dark gill flap.",
  },
  {
    id: "green-sunfish", brandId: BRAND, slug: "green-sunfish", status: "published",
    verifiedAt: "2026-11-15",
    sources: [speciesSource("tpwd-green-sunfish", "Texas Parks & Wildlife Department — Green sunfish", "https://tpwd.texas.gov/huntwild/wild/species/greensunfish/", "2026-11-15")],
    commonName: "Green sunfish", scientificName: "Lepomis cyanellus", taxonKind: "species", waterClass: "freshwater",
    summary: "Adaptable small-water sunfish with a proportionally large mouth, stocky body and blue-green cheek marks.",
  },
  {
    id: "warmouth", brandId: BRAND, slug: "warmouth", status: "published",
    verifiedAt: "2026-11-15",
    sources: [speciesSource("tpwd-warmouth", "Texas Parks & Wildlife Department — Warmouth", "https://tpwd.texas.gov/huntwild/wild/species/war/", "2026-11-15")],
    commonName: "Warmouth", scientificName: "Lepomis gulosus", taxonKind: "species", waterClass: "freshwater",
    summary: "Large-mouthed, mottled sunfish of stump-filled, weedy waters, with dark streaks radiating from the eye.",
  },
  {
    id: "longear-sunfish", brandId: BRAND, slug: "longear-sunfish", status: "published",
    verifiedAt: "2026-11-15",
    sources: [speciesSource("tpwd-longear-sunfish", "Texas Parks & Wildlife Department — Longear sunfish", "https://tpwd.texas.gov/huntwild/wild/species/longearsunfish/", "2026-11-15")],
    commonName: "Longear sunfish", scientificName: "Lepomis megalotis", taxonKind: "species", waterClass: "freshwater",
    summary: "Colorful creek-dwelling sunfish with blue-green facial marks and a white-edged elongated gill flap.",
  },
  {
    id: "redbreast-sunfish", brandId: BRAND, slug: "redbreast-sunfish", status: "published",
    verifiedAt: "2026-11-15",
    sources: [speciesSource("tpwd-redbreast-sunfish", "Texas Parks & Wildlife Department — Redbreast sunfish", "https://tpwd.texas.gov/huntwild/wild/species/redbreastsunfish/", "2026-11-15")],
    commonName: "Redbreast sunfish", scientificName: "Lepomis auritus", taxonKind: "species", waterClass: "freshwater",
    summary: "Stream sunfish with a yellow-orange breast and an unusually long, narrow gill-cover flap.",
  },
  {
    id: "rio-grande-cichlid", brandId: BRAND, slug: "rio-grande-cichlid", status: "published",
    verifiedAt: "2026-11-15",
    sources: [speciesSource("tpwd-rio-grande-cichlid", "Texas Parks & Wildlife Department — Rio Grande cichlid", "https://tpwd.texas.gov/huntwild/wild/species/cichlid/", "2026-11-15")],
    commonName: "Rio Grande cichlid", scientificName: "Herichthys cyanoguttatus", taxonKind: "species", waterClass: "freshwater",
    summary: "Native Texas cichlid with turquoise spots and vertical bars found in the lower Rio Grande and warm Central Texas waters.",
  },
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
  {
    id: "walleye",
    brandId: BRAND,
    slug: "walleye",
    status: "published",
    verifiedAt: "2026-09-28",
    sources: [speciesSource("tpwd-walleye", "Texas Parks & Wildlife Department — Walleye", "https://tpwd.texas.gov/huntwild/wild/species/walleye/")],
    commonName: "Walleye",
    scientificName: "Sander vitreus",
    taxonKind: "species",
    waterClass: "freshwater",
    summary: "A cool-water predator with a limited Texas distribution; Lake Meredith is the state's defining walleye reservoir.",
    featured: true,
  },
  {
    id: "red-drum",
    brandId: BRAND,
    slug: "red-drum",
    status: "published",
    verifiedAt: "2026-09-28",
    sources: [speciesSource("tpwd-red-drum", "Texas Parks & Wildlife Department — Red Drum", "https://tpwd.texas.gov/huntwild/wild/species/reddrum/")],
    commonName: "Red drum",
    scientificName: "Sciaenops ocellatus",
    taxonKind: "species",
    waterClass: "saltwater",
    summary: "A coastal game fish also maintained by stocking in a small number of Texas freshwater reservoirs, notably Calaveras and Braunig.",
    aliases: ["redfish"],
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
  { id: "black-bass", name: "Black bass", description: "Texas' largemouth, smallmouth, Guadalupe and spotted bass fisheries.", speciesSlugs: ["largemouth-bass", "smallmouth-bass", "guadalupe-bass", "spotted-bass", "alabama-bass"] },
  { id: "temperate-bass", name: "White, striped & hybrid bass", description: "Schooling and open-water bass fisheries, including spring white-bass runs and reservoir striped-bass fishing.", speciesSlugs: ["white-bass", "striped-bass", "hybrid-striped-bass"] },
  { id: "crappie", name: "Crappie", description: "Black and white crappie plus the statewide crappie fishing group used by lake relationships.", speciesSlugs: ["crappie", "black-crappie", "white-crappie"] },
  { id: "catfish", name: "Catfish", description: "Blue, channel and flathead catfish, plus the statewide catfish group used by lake relationships.", speciesSlugs: ["catfish", "blue-catfish", "channel-catfish", "flathead-catfish"] },
  { id: "gar-drum", name: "Gar & drum", description: "Distinctive native fisheries ranging from trophy alligator gar to widespread freshwater drum.", speciesSlugs: ["alligator-gar", "spotted-gar", "freshwater-drum"] },
  { id: "sunfish", name: "Sunfish & panfish", description: "Accessible shoreline and family fishing built around bluegill and related sunfish.", speciesSlugs: ["sunfish", "bluegill", "redear-sunfish", "green-sunfish", "warmouth", "longear-sunfish", "redbreast-sunfish"] },
  { id: "backwater-fish", name: "Bowfin & carp", description: "Two very different fish of slow water: native bowfin and introduced common carp.", speciesSlugs: ["bowfin", "common-carp"] },
  { id: "cichlids", name: "Texas cichlids", description: "The native Rio Grande cichlid and its warm-water habitat.", speciesSlugs: ["rio-grande-cichlid"] },
  { id: "trout", name: "Seasonal trout", description: "Winter rainbow-trout opportunities created by TPWD stocking and cold-water habitat.", speciesSlugs: ["rainbow-trout"] },
];

export function getTexasFreshwaterSpeciesBySlug(slug: string) {
  return texasFreshwaterFishSpecies.find((row) => row.slug === slug) ?? null;
}
