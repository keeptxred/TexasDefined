export type FishingImageRightsStatus = "public-domain" | "cc-by" | "cc-by-sa";

export interface FishingVisualAsset {
  id: string;
  kind: "fish" | "lake";
  src: string;
  alt: string;
  width: number;
  height: number;
  sourceName: string;
  sourceUrl?: string;
  creator: string;
  licenseName: string;
  licenseUrl: string;
  rightsStatus: FishingImageRightsStatus;
  verifiedAt: string;
  actualLocation?: boolean;
  representativeOfGroup?: string;
  credit: string;
}

const VERIFIED_AT = "2026-09-29";
const COMMONS_PD = "https://commons.wikimedia.org/wiki/Commons:Public_domain";
const CC0_1 = "https://creativecommons.org/publicdomain/zero/1.0/";
const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0/";
const CC_BY_4 = "https://creativecommons.org/licenses/by/4.0/";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";

function commonsFile(filename: string) {
  return `https://commons.wikimedia.org/wiki/File:${filename.replaceAll(" ", "_")}`;
}

function commonsImage(filename: string) {
  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}?width=960`;
}

const fish = (
  id: string,
  filename: string,
  alt: string,
  creator: string,
  options: { representativeOfGroup?: string; width?: number; height?: number } = {},
): FishingVisualAsset => ({
  id,
  kind: "fish",
  src: commonsImage(filename),
  alt,
  width: options.width ?? 960,
  height: options.height ?? 640,
  sourceName: "Wikimedia Commons / U.S. Fish & Wildlife Service",
  sourceUrl: commonsFile(filename),
  creator,
  licenseName: "Public domain — U.S. federal government work",
  licenseUrl: COMMONS_PD,
  rightsStatus: "public-domain",
  verifiedAt: VERIFIED_AT,
  representativeOfGroup: options.representativeOfGroup,
  credit: `${creator} · U.S. Fish & Wildlife Service · Public domain`,
});

const cc0Fish = (
  id: string,
  filename: string,
  alt: string,
  creator: string,
): FishingVisualAsset => ({
  id,
  kind: "fish",
  src: commonsImage(filename),
  alt,
  width: 960,
  height: 720,
  sourceName: "Wikimedia Commons / iNaturalist",
  sourceUrl: commonsFile(filename),
  creator,
  licenseName: "CC0 1.0 public-domain dedication",
  licenseUrl: CC0_1,
  rightsStatus: "public-domain",
  verifiedAt: VERIFIED_AT,
  credit: `${creator} · CC0 1.0 · Wikimedia Commons`,
});

export const fishingFishImages: Record<string, FishingVisualAsset> = {
  "largemouth-bass": fish(
    "fish-largemouth-bass",
    "Largemouth Bass (Micropterus salmoides) (53118577249).jpg",
    "Largemouth bass in side view",
    "USFWS Mountain-Prairie / Sam Stukel",
  ),
  "smallmouth-bass": fish(
    "fish-smallmouth-bass",
    "Smallmouth bass.jpg",
    "Smallmouth bass",
    "Duane Raver, U.S. Fish and Wildlife Service",
  ),
  "spotted-bass": fish(
    "fish-spotted-bass",
    "Micropterus punctulatus 1.jpg",
    "Spotted bass",
    "Dick Biggins, U.S. Fish and Wildlife Service",
  ),
  "guadalupe-bass": cc0Fish(
    "fish-guadalupe-bass",
    "Micropterus treculii 423449040.jpg",
    "Guadalupe bass",
    "Nick Loveland",
  ),
  crappie: fish(
    "fish-crappie",
    "Black crappie.jpg",
    "Black crappie, shown as a representative crappie image",
    "United States Fish and Wildlife Service",
    { representativeOfGroup: "crappie" },
  ),
  "black-crappie": fish(
    "fish-black-crappie",
    "Black crappie.jpg",
    "Black crappie",
    "United States Fish and Wildlife Service",
  ),
  "white-crappie": fish(
    "fish-white-crappie",
    "White crappie pomoxis annularis.jpg",
    "White crappie",
    "Duane Raver, U.S. Fish and Wildlife Service",
  ),
  catfish: fish(
    "fish-catfish",
    "Channel catfish (Ictalurus punctatus) (51591896207).jpg",
    "Channel catfish, shown as a representative catfish image",
    "USFWS Mountain-Prairie / Sam Stukel",
    { representativeOfGroup: "catfish" },
  ),
  "blue-catfish": fish(
    "fish-blue-catfish",
    "Blue Catfish (Ictalurus furcatus) (53678866030).jpg",
    "Blue catfish",
    "USFWS Mountain-Prairie",
  ),
  "channel-catfish": fish(
    "fish-channel-catfish",
    "Channel catfish (Ictalurus punctatus) (51591896207).jpg",
    "Channel catfish",
    "USFWS Mountain-Prairie / Sam Stukel",
  ),
  "flathead-catfish": fish(
    "fish-flathead-catfish",
    "Flathead Catfish (Pylodictis olivaris).jpg",
    "Flathead catfish",
    "USFWS Mountain-Prairie / Sam Stukel",
  ),
  "white-bass": fish(
    "fish-white-bass",
    "Morone chrysops white bass fish (white background).jpg",
    "White bass",
    "Duane Raver, U.S. Fish and Wildlife Service",
  ),
  "striped-bass": fish(
    "fish-striped-bass",
    "Striped bass morone saxatilis fish.jpg",
    "Striped bass",
    "Duane Raver, U.S. Fish and Wildlife Service",
  ),
  "hybrid-striped-bass": fish(
    "fish-hybrid-striped-bass",
    "Hybrid striped bass (51254193135).jpg",
    "Hybrid striped bass",
    "USFWS Mountain-Prairie",
  ),
  "alligator-gar": fish(
    "fish-alligator-gar",
    "Alligator gar fish.jpg",
    "Alligator gar",
    "Duane Raver, U.S. Fish and Wildlife Service",
  ),
  "freshwater-drum": fish(
    "fish-freshwater-drum",
    "Freshwater Drum (Aplodinotus grunniens) (50642305682).jpg",
    "Freshwater drum",
    "USFWS Mountain-Prairie / Sam Stukel",
  ),
  walleye: fish(
    "fish-walleye",
    "Walleye (51300340382).jpg",
    "Walleye",
    "USFWS Mountain-Prairie",
  ),
  "red-drum": fish(
    "fish-red-drum",
    "Red Drum Fish.jpg",
    "Red drum",
    "Steve Hillebrand, U.S. Fish and Wildlife Service",
  ),
  sunfish: fish(
    "fish-sunfish",
    "Bluegill (Lepomis macrochirus) (53678765399).jpg",
    "Bluegill, shown as a representative sunfish image",
    "USFWS Mountain-Prairie",
    { representativeOfGroup: "sunfish" },
  ),
  bluegill: fish(
    "fish-bluegill",
    "Bluegill (Lepomis macrochirus) (53678765399).jpg",
    "Bluegill",
    "USFWS Mountain-Prairie",
  ),
  "rainbow-trout": fish(
    "fish-rainbow-trout",
    "Rainbow trout Ryan Hagerty USFWS.png",
    "Rainbow trout",
    "Ryan Hagerty, U.S. Fish and Wildlife Service",
  ),
};

const lake = (
  id: string,
  src: string,
  alt: string,
  width: number,
  height: number,
  creator: string,
  licenseName: string,
  licenseUrl: string,
  rightsStatus: FishingImageRightsStatus,
): FishingVisualAsset => ({
  id,
  kind: "lake",
  src,
  alt,
  width,
  height,
  sourceName: "TexasDefined governed local asset · Wikimedia Commons provenance",
  creator,
  licenseName,
  licenseUrl,
  rightsStatus,
  verifiedAt: VERIFIED_AT,
  actualLocation: true,
  credit: `${creator} · ${licenseName} · Wikimedia Commons`,
});

export const fishingLakeImages: Record<string, FishingVisualAsset> = {
  "amistad-reservoir": lake(
    "lake-amistad",
    "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg",
    "Amistad National Recreation Area reservoir water and canyon landscape",
    1600, 1067,
    "National Park Service Digital Image Archives",
    "Public domain",
    COMMONS_PD,
    "public-domain",
  ),
  "lake-meredith": lake(
    "lake-meredith",
    "/images/explore/lakes-rivers/lake-meredith-national-recreation-area.jpg",
    "Lake Meredith National Recreation Area in the Texas Panhandle",
    1600, 2979,
    "United States National Park Service",
    "Public domain",
    COMMONS_PD,
    "public-domain",
  ),
  "ray-roberts-lake": lake(
    "lake-ray-roberts",
    "/images/explore/lakes-rivers/ray-roberts-lake-isle-du-bois-unit.jpg",
    "Ray Roberts Lake at the Isle du Bois unit",
    1600, 1068,
    "U.S. Army Corps of Engineers",
    "Public domain",
    COMMONS_PD,
    "public-domain",
  ),
  "lake-somerville": lake(
    "lake-somerville",
    "/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg",
    "Lake Somerville at Birch Creek",
    1600, 900,
    "Larry D. Moore",
    "CC BY 4.0",
    CC_BY_4,
    "cc-by",
  ),
  "caddo-lake": lake(
    "lake-caddo",
    "/images/state-parks/caddo-lake-state-park.jpg",
    "Bald cypress and water at Caddo Lake State Park",
    1600, 867,
    "William L. Farr",
    "CC BY-SA 4.0",
    CC_BY_SA_4,
    "cc-by-sa",
  ),
  "lake-bob-sandlin": lake(
    "lake-bob-sandlin",
    "/images/state-parks/lake-bob-sandlin-state-park.jpg",
    "Lake Bob Sandlin State Park shoreline",
    1600, 900,
    "Larry D. Moore",
    "CC BY 4.0",
    CC_BY_4,
    "cc-by",
  ),
  "lake-corpus-christi": lake(
    "lake-corpus-christi",
    "/images/state-parks/lake-corpus-christi-state-park.jpg",
    "Lake Corpus Christi State Park and reservoir",
    1600, 1067,
    "Larry D. Moore",
    "CC BY 4.0",
    CC_BY_4,
    "cc-by",
  ),
  "lake-livingston": lake(
    "lake-livingston",
    "/images/state-parks/lake-livingston-state-park.jpg",
    "Lake Livingston State Park shoreline and lake",
    1600, 900,
    "Larry D. Moore",
    "CC BY 4.0",
    CC_BY_4,
    "cc-by",
  ),
  "lake-tawakoni": lake(
    "lake-tawakoni",
    "/images/state-parks/lake-tawakoni-state-park.jpg",
    "Lake Tawakoni State Park shoreline",
    1600, 1100,
    "Judy Gallagher",
    "CC BY 2.0",
    CC_BY_2,
    "cc-by",
  ),
  "lake-whitney": lake(
    "lake-whitney",
    "/images/state-parks/lake-whitney-state-park.jpg",
    "Lake Whitney State Park shoreline",
    1600, 900,
    "Larry D. Moore",
    "CC BY 4.0",
    CC_BY_4,
    "cc-by",
  ),
};

export function getFishingFishImage(slugOrId: string) {
  return fishingFishImages[slugOrId] ?? null;
}

export function getFishingLakeImage(slug: string) {
  return fishingLakeImages[slug] ?? null;
}
