export type FishingImageRightsStatus = "public-domain" | "cc-by" | "cc-by-sa" | "nasa-media-guidelines";

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
const CC_BY_3 = "https://creativecommons.org/licenses/by/3.0/";
const CC_BY_4 = "https://creativecommons.org/licenses/by/4.0/";
const CC_BY_SA_2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const CC_BY_SA_3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const NASA_MEDIA_GUIDELINES = "https://www.nasa.gov/nasa-brand-center/images-and-media/";

function commonsFile(filename: string) {
  return `https://commons.wikimedia.org/wiki/File:${filename.replaceAll(" ", "_")}`;
}

function commonsImage(filename: string) {
  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}?width=960`;
}

function commonsLakeImage(filename: string) {
  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}?width=1600`;
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
  "largemouth-bass": fish("fish-largemouth-bass", "Largemouth Bass (Micropterus salmoides) (53118577249).jpg", "Largemouth bass in side view", "USFWS Mountain-Prairie / Sam Stukel"),
  "smallmouth-bass": fish("fish-smallmouth-bass", "Smallmouth bass.jpg", "Smallmouth bass", "Duane Raver, U.S. Fish and Wildlife Service"),
  "spotted-bass": fish("fish-spotted-bass", "Micropterus punctulatus 1.jpg", "Spotted bass", "Dick Biggins, U.S. Fish and Wildlife Service"),
  "guadalupe-bass": cc0Fish("fish-guadalupe-bass", "Micropterus treculii 423449040.jpg", "Guadalupe bass", "Nick Loveland"),
  crappie: fish("fish-crappie", "Black crappie.jpg", "Black crappie, shown as a representative crappie image", "United States Fish and Wildlife Service", { representativeOfGroup: "crappie" }),
  "black-crappie": fish("fish-black-crappie", "Black crappie.jpg", "Black crappie", "United States Fish and Wildlife Service"),
  "white-crappie": fish("fish-white-crappie", "White crappie pomoxis annularis.jpg", "White crappie", "Duane Raver, U.S. Fish and Wildlife Service"),
  catfish: fish("fish-catfish", "Channel catfish (Ictalurus punctatus) (51591896207).jpg", "Channel catfish, shown as a representative catfish image", "USFWS Mountain-Prairie / Sam Stukel", { representativeOfGroup: "catfish" }),
  "blue-catfish": fish("fish-blue-catfish", "Blue Catfish (Ictalurus furcatus) (53678866030).jpg", "Blue catfish", "USFWS Mountain-Prairie"),
  "channel-catfish": fish("fish-channel-catfish", "Channel catfish (Ictalurus punctatus) (51591896207).jpg", "Channel catfish", "USFWS Mountain-Prairie / Sam Stukel"),
  "flathead-catfish": fish("fish-flathead-catfish", "Flathead Catfish (Pylodictis olivaris).jpg", "Flathead catfish", "USFWS Mountain-Prairie / Sam Stukel"),
  "white-bass": fish("fish-white-bass", "Morone chrysops white bass fish (white background).jpg", "White bass", "Duane Raver, U.S. Fish and Wildlife Service"),
  "striped-bass": fish("fish-striped-bass", "Striped bass morone saxatilis fish.jpg", "Striped bass", "Duane Raver, U.S. Fish and Wildlife Service"),
  "hybrid-striped-bass": fish("fish-hybrid-striped-bass", "Hybrid striped bass (51254193135).jpg", "Hybrid striped bass", "USFWS Mountain-Prairie"),
  "alligator-gar": fish("fish-alligator-gar", "Alligator gar fish.jpg", "Alligator gar", "Duane Raver, U.S. Fish and Wildlife Service"),
  "freshwater-drum": fish("fish-freshwater-drum", "Freshwater Drum (Aplodinotus grunniens) (50642305682).jpg", "Freshwater drum", "USFWS Mountain-Prairie / Sam Stukel"),
  walleye: fish("fish-walleye", "Walleye (51300340382).jpg", "Walleye", "USFWS Mountain-Prairie"),
  "red-drum": fish("fish-red-drum", "Red Drum Fish.jpg", "Red drum", "Steve Hillebrand, U.S. Fish and Wildlife Service"),
  sunfish: fish("fish-sunfish", "Bluegill (Lepomis macrochirus) (53678765399).jpg", "Bluegill, shown as a representative sunfish image", "USFWS Mountain-Prairie", { representativeOfGroup: "sunfish" }),
  bluegill: fish("fish-bluegill", "Bluegill (Lepomis macrochirus) (53678765399).jpg", "Bluegill", "USFWS Mountain-Prairie"),
  "rainbow-trout": fish("fish-rainbow-trout", "Rainbow trout Ryan Hagerty USFWS.png", "Rainbow trout", "Ryan Hagerty, U.S. Fish and Wildlife Service"),
};

const lake = (id: string, src: string, alt: string, width: number, height: number, creator: string, licenseName: string, licenseUrl: string, rightsStatus: FishingImageRightsStatus): FishingVisualAsset => ({
  id, kind: "lake", src, alt, width, height,
  sourceName: "TexasDefined governed local asset · Wikimedia Commons provenance",
  creator, licenseName, licenseUrl, rightsStatus, verifiedAt: VERIFIED_AT, actualLocation: true,
  credit: `${creator} · ${licenseName} · Wikimedia Commons`,
});

const licensedRemoteLake = (id: string, src: string, sourceUrl: string, alt: string, width: number, height: number, creator: string, licenseName: string, licenseUrl: string, rightsStatus: FishingImageRightsStatus, sourceName: string): FishingVisualAsset => ({
  id, kind: "lake", src, alt, width, height, sourceName, sourceUrl, creator, licenseName, licenseUrl, rightsStatus, verifiedAt: VERIFIED_AT, actualLocation: true,
  credit: `${creator} · ${licenseName} · ${sourceName}`,
});

const commonsLake = (id: string, filename: string, alt: string, width: number, height: number, creator: string, licenseName: string, licenseUrl: string, rightsStatus: FishingImageRightsStatus, sourceName = "Wikimedia Commons", checkedAt = VERIFIED_AT): FishingVisualAsset => ({
  id, kind: "lake", src: commonsLakeImage(filename), alt, width, height, sourceName, sourceUrl: commonsFile(filename), creator, licenseName, licenseUrl, rightsStatus, verifiedAt: checkedAt, actualLocation: true,
  credit: `${creator} · ${licenseName} · Wikimedia Commons`,
});

const nasaLake = (id: string, src: string, sourceUrl: string, alt: string, width: number, height: number): FishingVisualAsset => ({
  id, kind: "lake", src, alt, width, height,
  sourceName: "NASA Johnson Space Center Earth Science & Remote Sensing", sourceUrl,
  creator: "NASA Johnson Space Center Earth Science & Remote Sensing Unit",
  licenseName: "NASA Images and Media Usage Guidelines", licenseUrl: NASA_MEDIA_GUIDELINES,
  rightsStatus: "nasa-media-guidelines", verifiedAt: VERIFIED_AT, actualLocation: true,
  credit: "NASA Johnson Space Center Earth Science & Remote Sensing Unit · NASA media usage guidelines",
});

export const fishingLakeImages: Record<string, FishingVisualAsset> = {
  "richland-chambers-reservoir": nasaLake("lake-richland-chambers", "https://eol.jsc.nasa.gov/DatabaseImages/EFS/lowres/STS058/STS058-80-35.jpg", "https://eol.jsc.nasa.gov/Collections/EarthFromSpace/printinfo.pl?PHOTO=STS058-80-35", "Richland-Chambers Reservoir and surrounding Trinity River basin seen from Space Shuttle Columbia in October 1993", 633, 639),
  "lake-conroe": commonsLake("lake-conroe", "USA - Texas - Sam Houston National Forest - Lake Conroe - 51632123698.jpg", "Lake Conroe in Sam Houston National Forest, Texas", 5385, 3029, "Alexander Hatley", "CC BY 2.0", CC_BY_2, "cc-by"),
  "choke-canyon-reservoir": commonsLake("lake-choke-canyon", "ISS006-E-5434 - View of Texas.jpg", "Choke Canyon Reservoir in a NASA Earth-observation photograph", 3032, 2064, "Earth Science and Remote Sensing Unit, NASA Johnson Space Center", "Public domain — NASA", COMMONS_PD, "public-domain", "Wikimedia Commons / NASA"),
  "falcon-international-reservoir": commonsLake("lake-falcon", "FalconReservoir.JPG", "Falcon Dam and International Reservoir on the Rio Grande", 3060, 2032, "Image Science and Analysis Laboratory, NASA Johnson Space Center", "Public domain — NASA", COMMONS_PD, "public-domain", "Wikimedia Commons / NASA"),
  "cedar-creek-reservoir": commonsLake("lake-cedar-creek", "Sunset at cedar creek lake, 3.28.2015 (16983601551).jpg", "Sunset over Cedar Creek Reservoir in North Texas", 2000, 1441, "greg westfall", "CC BY 2.0", CC_BY_2, "cc-by"),
  "lake-ray-hubbard": commonsLake("lake-ray-hubbard", "Lake Ray Hubbard Dam.jpg", "Lake Ray Hubbard at the reservoir dam east of Dallas", 4032, 3024, "U.S. Geological Survey", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / U.S. Geological Survey"),
  "lake-bridgeport": commonsLake("lake-bridgeport", "AS09-22-3337 (22022510782).jpg", "Lake Bridgeport visible in a NASA Apollo 9 Earth-orbit photograph of North Texas", 3900, 3900, "Project Apollo Archive / NASA", "Public domain — NASA", COMMONS_PD, "public-domain", "Wikimedia Commons / NASA"),
  "lake-o-the-pines": commonsLake("lake-o-the-pines", "USACE Ferrells Bridge Dam spillway.jpg", "Ferrells Bridge Dam spillway impounding Lake O' the Pines in East Texas", 1500, 1000, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / U.S. Army Corps of Engineers"),
  "lake-fork": commonsLake("lake-fork", "A mashy inlet of Lake Fork in Rains County, east of Dallas in northeast Texas LCCN2015630125.tif", "Marshy inlet of Lake Fork Reservoir in Rains County, Texas", 7360, 4912, "Carol M. Highsmith", "Public domain — Carol M. Highsmith / Library of Congress", COMMONS_PD, "public-domain", "Wikimedia Commons / Library of Congress"),
  "o-h-ivie-lake": licensedRemoteLake("lake-o-h-ivie", "https://live.staticflickr.com/7722/27527896213_4a4991376b.jpg", "https://www.flickr.com/photos/kenlund/27527896213/", "O.H. Ivie Lake in West Texas", 1024, 683, "Ken Lund", "CC BY-SA 2.0", CC_BY_SA_2, "cc-by-sa", "Flickr"),
  "fayette-county-reservoir": commonsLake("lake-fayette-county", "Osprey @ Fayette County Reservoir (12715870).jpg", "Osprey above Fayette County Reservoir in Texas", 2292, 1436, "Clinton & Charles Robertson", "CC BY-SA 2.0", CC_BY_SA_2, "cc-by-sa"),
  "lake-nacogdoches": licensedRemoteLake("lake-nacogdoches", "https://live.staticflickr.com/3475/3318770254_5e309e4ae2.jpg", "https://www.flickr.com/photos/attawayjl/3318770254/", "Lake Nacogdoches shoreline and water in East Texas", 1024, 768, "Jeff Attaway", "CC BY 2.0", CC_BY_2, "cc-by", "Flickr"),
  "sam-rayburn-reservoir": commonsLake("lake-sam-rayburn", "Sam Rayburn Reservoir.jpg", "Open water at Sam Rayburn Reservoir in East Texas", 1711, 1140, "Ricraider", "CC BY-SA 3.0", CC_BY_SA_3, "cc-by-sa"),
  "lake-texoma": commonsLake("lake-texoma", "Lake Texoma, 2007.jpg", "Lake Texoma at the Denison Dam spillway on the Texas-Oklahoma border", 1280, 960, "Herbert Smith / Brendajane", "Public domain", COMMONS_PD, "public-domain"),
  "toledo-bend-reservoir": commonsLake("lake-toledo-bend", "Sabine National Forest, Toledo Bend Reservoir, Texas.jpg", "Toledo Bend Reservoir in Sabine National Forest, Texas", 1800, 1200, "William L. Farr", "CC BY 4.0", CC_BY_4, "cc-by"),
  "possum-kingdom-reservoir": commonsLake("lake-possum-kingdom", "Possum Kingdom Lake.JPG", "Possum Kingdom Lake in North Texas", 2048, 1536, "Alan Edwards", "Public domain", COMMONS_PD, "public-domain"),
  "canyon-lake": commonsLake("lake-canyon", "Canyon Lake TX.jpg", "Canyon Lake in the Texas Hill Country", 1054, 790, "Edward Jackson (Pismo)", "Public domain", COMMONS_PD, "public-domain"),
  "lake-travis": commonsLake("lake-travis", "Lake Travis.jpg", "Lake Travis west of Austin in the Texas Hill Country", 5312, 2988, "BeckyBot", "CC BY-SA 4.0", CC_BY_SA_4, "cc-by-sa"),
  "lake-buchanan": commonsLake("lake-buchanan", "Lake Buchanan, Texas (9302).jpg", "Lake Buchanan and shoreline in Central Texas", 4896, 3264, "Lars Plougmann", "CC BY-SA 2.0", CC_BY_SA_2, "cc-by-sa"),
  "lake-lbj": commonsLake("lake-lbj", "Lake LBJ in Kingsland, TX IMG 1950.JPG", "Lake LBJ at Kingsland, Texas", 4320, 3240, "Billy Hathorn", "CC BY 3.0", CC_BY_3, "cc-by"),
  "lewisville-lake": commonsLake("lake-lewisville", "Lewisvillelake.jpg", "Lewisville Lake and the Dallas-Fort Worth area seen from orbit", 1536, 1017, "NASA Expedition 10 crewmember", "Public domain — NASA", COMMONS_PD, "public-domain", "Wikimedia Commons / NASA"),
  "lake-lavon": commonsLake("lake-lavon", "USACE Lavon Lake and Dam.jpg", "Aerial view of Lavon Lake and Dam in Collin County, Texas", 987, 787, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / U.S. Army Corps of Engineers"),
  "lake-austin": commonsLake("lake-austin", "Lake Austin.jpg", "Lake Austin in Austin, Texas", 1000, 861, "Jack Newton", "CC BY-SA 2.0", CC_BY_SA_2, "cc-by-sa"),
  "lake-houston": commonsLake("lake-houston", "Lake Houston, Texas (3909161310).jpg", "Lake Houston on the San Jacinto River northeast of Houston", 2112, 2816, "Ken Lund", "CC BY-SA 2.0", CC_BY_SA_2, "cc-by-sa"),
  "grapevine-lake": commonsLake("lake-grapevine", "Lake Grapevine (52551182908).jpg", "Lake Grapevine in North Texas after sunset", 5947, 3345, "Shiva Shenoy", "CC BY 2.0", CC_BY_2, "cc-by"),
  "eagle-mountain-lake": commonsLake("lake-eagle-mountain", "EagleMountainLakePark.JPG", "Eagle Mountain Lake from the western shore in Tarrant County, Texas", 3888, 2592, "Gordon Reid", "CC BY-SA 3.0", CC_BY_SA_3, "cc-by-sa"),
  "belton-lake": commonsLake("lake-belton", "Belton lake.jpg", "Aerial view of Belton Lake and Dam in Bell County, Texas", 1500, 1000, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / U.S. Army Corps of Engineers"),
  "stillhouse-hollow-reservoir": commonsLake("lake-stillhouse-hollow", "USACE Stillhouse Hollow Lake and Dam.jpg", "Aerial view of Stillhouse Hollow Lake and Dam in Bell County, Texas", 1500, 1000, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / U.S. Army Corps of Engineers"),
  "calaveras-lake": commonsLake("lake-calaveras", "Calaveras Lake TX-kmf.JPG", "Calaveras Lake in San Antonio, Texas", 2211, 1619, "Karen Fasimpaur", "Public domain", COMMONS_PD, "public-domain"),
  "alan-henry-reservoir": commonsLake("lake-alan-henry", "Lake Alan Henry.jpg", "Lake Alan Henry southeast of Lubbock, Texas", 1500, 1153, "Ricraider", "Public domain", COMMONS_PD, "public-domain"),
  "lake-palestine": commonsLake("lake-palestine", "The Villages Resort, Lake Palestine.jpg", "Lake Palestine in East Texas", 4914, 3276, "ImageTek", "CC BY 2.0", CC_BY_2, "cc-by"),
  "amistad-reservoir": lake("lake-amistad", "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg", "Amistad National Recreation Area reservoir water and canyon landscape", 1600, 1067, "National Park Service Digital Image Archives", "Public domain", COMMONS_PD, "public-domain"),
  "lake-meredith": lake("lake-meredith", "/images/explore/lakes-rivers/lake-meredith-national-recreation-area.jpg", "Lake Meredith National Recreation Area in the Texas Panhandle", 1600, 2979, "United States National Park Service", "Public domain", COMMONS_PD, "public-domain"),
  "ray-roberts-lake": lake("lake-ray-roberts", "/images/explore/lakes-rivers/ray-roberts-lake-isle-du-bois-unit.jpg", "Ray Roberts Lake at the Isle du Bois unit", 1600, 1068, "U.S. Army Corps of Engineers", "Public domain", COMMONS_PD, "public-domain"),
  "lake-somerville": lake("lake-somerville", "/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg", "Lake Somerville at Birch Creek", 1600, 900, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by"),
  "caddo-lake": lake("lake-caddo", "/images/state-parks/caddo-lake-state-park.jpg", "Bald cypress and water at Caddo Lake State Park", 1600, 867, "William L. Farr", "CC BY-SA 4.0", CC_BY_SA_4, "cc-by-sa"),
  "lake-bob-sandlin": lake("lake-bob-sandlin", "/images/state-parks/lake-bob-sandlin-state-park.jpg", "Lake Bob Sandlin State Park shoreline", 1600, 900, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by"),
  "lake-corpus-christi": lake("lake-corpus-christi", "/images/state-parks/lake-corpus-christi-state-park.jpg", "Lake Corpus Christi State Park and reservoir", 1600, 1067, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by"),
  "lake-livingston": lake("lake-livingston", "/images/state-parks/lake-livingston-state-park.jpg", "Lake Livingston State Park shoreline and lake", 1600, 900, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by"),
  "lake-tawakoni": lake("lake-tawakoni", "/images/state-parks/lake-tawakoni-state-park.jpg", "Lake Tawakoni State Park shoreline", 1600, 1100, "Judy Gallagher", "CC BY 2.0", CC_BY_2, "cc-by"),
  "lake-whitney": lake("lake-whitney", "/images/state-parks/lake-whitney-state-park.jpg", "Lake Whitney State Park shoreline", 1600, 900, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by"),
  "joe-pool-lake": commonsLake("lake-joe-pool", "USACE Joe Pool Lake and Dam.jpg", "Aerial view of Joe Pool Lake and Dam in the Dallas-Fort Worth metropolitan area", 1500, 1000, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / U.S. Army Corps of Engineers"),
  "lake-granbury": commonsLake("lake-granbury", "Lake Granbury.jpg", "Lake Granbury in Hood County, Texas, seen in NASA World Wind imagery", 1280, 978, "NASA World Wind / Sdenny123", "Public domain — NASA World Wind public-domain layer", COMMONS_PD, "public-domain", "Wikimedia Commons / NASA World Wind"),
  "lake-waco": commonsLake("lake-waco", "USACE Waco Lake and Dam.jpg", "Aerial view of Waco Lake and Dam on the Bosque River in McLennan County", 1500, 1000, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / U.S. Army Corps of Engineers"),
  "lake-brownwood": commonsLake("lake-brownwood", "Lake Brownwood.jpg", "Lake Brownwood viewed from Lake Brownwood State Park", 2385, 1341, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by"),
  "proctor-lake": commonsLake("lake-proctor", "USACE Proctor Lake Texas.jpg", "Aerial view of Proctor Lake on the Leon River in Comanche County", 1500, 1003, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / U.S. Army Corps of Engineers"),
  "lake-arrowhead": commonsLake("lake-arrowhead", "Lake Arrowhead.JPG", "Lake Arrowhead in North Texas viewed from the air", 3264, 2053, "Fredlyfish4", "CC BY-SA 3.0", CC_BY_SA_3, "cc-by-sa"),
  "lake-casa-blanca": commonsLake("lake-casa-blanca", "Entrance to Lake Casa Blanca, Laredo, TX IMG 2013.JPG", "Entrance to Lake Casa Blanca International State Park in Laredo, Texas", 2592, 1944, "Billy Hathorn", "CC BY-SA 3.0", CC_BY_SA_3, "cc-by-sa"),
  "lake-mineral-wells": commonsLake("lake-mineral-wells", "Lake Mineral Wells from State Park.jpg", "Lake Mineral Wells viewed from Lake Mineral Wells State Park", 3200, 1800, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by"),
  "lake-colorado-city": commonsLake("lake-colorado-city", "View Lake Colorado City State Park 2023.jpg", "Lake Colorado City viewed from Lake Colorado City State Park", 3556, 2000, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by"),
  "lake-stamford": commonsLake("lake-stamford", "Lake Stamford June 2007.jpg", "Lake Stamford boat ramp looking east in June 2007 at full pool; historical photo, not a current water-level view", 2453, 1839, "Logann1", "CC BY-SA 3.0", CC_BY_SA_3, "cc-by-sa", "Wikimedia Commons", "2026-10-12"),
  "lake-sweetwater": commonsLake("lake-sweetwater", "Lake Sweetwater Rec Area Rock Bench.jpg", "Historic Civilian Conservation Corps-era stone bench at Lake Sweetwater Recreation Area, Nolan County, Texas; not a current lake-water-level photograph", 2396, 1348, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by", "Wikimedia Commons", "2026-10-12"),
  "lake-georgetown": commonsLake("lake-georgetown", "Golden Hour Sunset Lake Georgetown TX 2024.jpg", "Genuine photographic view across Lake Georgetown at sunset, photographed 2024; not a current water-level image", 4032, 3024, "8bit12man", "CC BY 4.0", CC_BY_4, "cc-by", "Wikimedia Commons", "2026-10-12"),
  "benbrook-lake": commonsLake("benbrook-lake", "USACE Benbrook Lake and Dam.jpg", "Aerial view of Benbrook Lake and its Corps dam in Tarrant County, archival federal government photograph; not a current water-level view", 1500, 1001, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / USACE", "2026-10-12"),
  "granger-lake": commonsLake("granger-lake", "USACE Granger Lake and Dam.jpg", "Archival aerial view of Granger Lake and the Corps dam on the San Gabriel River, Williamson County; not a current shoreline or water-level image", 1500, 1000, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / USACE", "2026-10-12"),
  "aquilla-lake": commonsLake("aquilla-lake", "USACE Aquilla Dam and Lake.jpg", "Archival U.S. Army Corps of Engineers aerial of Aquilla Lake and Dam in Hill County; not a current map or water-level image", 1500, 1000, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / USACE", "2026-10-12"),
  "white-rock-lake": commonsLake("white-rock-lake", "White Rock Lake.jpg", "Actual March 2024 photograph of White Rock Lake, Dallas, the Bath House Cultural Center and city skyline; not a current lake condition photo", 4032, 3024, "DronePhotographer", "CC0 1.0", CC0_1, "public-domain", "Wikimedia Commons", "2026-10-12"),
  "bardwell-lake": commonsLake("bardwell-lake", "USACE Bardwell Dam and Lake.jpg", "Archival Corps aerial of Bardwell Lake and the dam near Ennis, Ellis County; not a real-time lake-level photograph", 1500, 1000, "U.S. Army Corps of Engineers", "Public domain — U.S. federal government work", COMMONS_PD, "public-domain", "Wikimedia Commons / USACE", "2026-10-13"),
  "lake-bastrop": commonsLake("lake-bastrop", "Lake bastrop north shore.jpg", "Actual photograph of Lake Bastrop North Shore Park and lakeshore in December 2014; historic view not a current access or water-level report", 2146, 1431, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by", "Wikimedia Commons", "2026-10-13"),
  "lake-arlington": commonsLake("lake-arlington", "North Lake Arlington Texas 2010.jpg", "Verified 2010 photograph overlooking Lake Arlington in Tarrant County, Texas; historical shoreline view, not live boating conditions", 3072, 2304, "Supportstorm", "Public domain — creator-dedicated work", COMMONS_PD, "public-domain", "Wikimedia Commons", "2026-10-13"),
  "cedar-lake-cleburne-state-park": commonsLake("cedar-lake-cleburne-state-park", "Cedar Lake Cleburne State Park Texas 2023.jpg", "Actual February 2023 Cedar Lake shoreline and kayaker inside Cleburne State Park, Johnson County, Texas", 3556, 2000, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by", "Wikimedia Commons", "2026-10-13"),
  "lake-worth": commonsLake("lake-worth", "Lake Worth from Lone Point Shelter.jpg", "Actual Lake Worth in Fort Worth, Texas, photographed from Lone Point Shelter in the Nature Center; not a current water-level or ramp-status image", 3049, 1800, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by", "Wikimedia Commons", "2026-10-13"),
  "lake-nasworthy": commonsLake("lake-nasworthy", "Lake Nasworthy at Sunset (115464108).jpg", "Actual sunset photograph of Lake Nasworthy in San Angelo, Texas, September 2003; historic view not a live marina or boat-ramp status report", 1177, 1571, "Jonathan Cutrer", "CC BY 2.0", CC_BY_2, "cc-by", "Wikimedia Commons / Flickr verified", "2026-10-13"),
  "lake-tyler": commonsLake("lake-tyler", "Lake Tyler East.jpg", "Exact photograph of Lake Tyler East from the SH 64 park in Smith County, Texas; depicts the east basin only, November 2022", 4991, 2804, "David A. Harrison", "CC BY-SA 4.0", CC_BY_SA_4, "cc-by-sa", "Wikimedia Commons", "2026-10-13"),
  "medina-lake": commonsLake("medina-lake", "Medina lake 2010.jpg", "Actual Medina Lake photographed July 2010 in Medina County, Texas; historical view not a current shoreline or boat-launch status report", 1652, 964, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by", "Wikimedia Commons", "2026-10-13"),
  "fort-parker-state-park-lake": commonsLake("fort-parker-state-park-lake", "Lake Fort Parker State Park Texas 2025.jpg", "Actual Fort Parker Lake inside Fort Parker State Park in Limestone County, Texas at dawn, 27 September 2025; not a current lake-level or ramp-status image", 3000, 2000, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by", "Wikimedia Commons", "2026-10-13"),
  "lake-weatherford": commonsLake("lake-weatherford", "Section of Lake Weatherford boardwalk.jpg", "Actual May 2024 photograph of the floating boardwalk at Lake Weatherford, Parker County, Texas; not a depiction of the marina ramp or current water-level conditions", 4624, 3468, "Forssa01", "CC0 1.0", CC0_1, "public-domain", "Wikimedia Commons", "2026-10-13"),
  "lake-abilene": commonsLake("lake-abilene", "Abilene State Park 1.jpg", "Actual Lake Abilene shoreline in Taylor County Texas, photographed June 8 2011 from the state park; historical lake view does not depict current fishing permission, closed boat ramps or current water level", 4000, 3000, "mr_t_77", "CC BY-SA 2.0", CC_BY_SA_2, "cc-by-sa", "Wikimedia Commons / Flickr", "2026-10-14"),
  "lake-cypress-springs": commonsLake("lake-cypress-springs", "Lake Cypress Springs Bathymetric Map.png", "Bathymetric MAP of Lake Cypress Springs, Franklin County, Texas, drawn from public 2007 TWDB depth survey; historic mapped contours NOT an actual lake photograph or current navigation chart", 1500, 757, "maxup10", "CC BY-SA 4.0", CC_BY_SA_4, "cc-by-sa", "Wikimedia Commons — lake-specific cartography", "2026-10-14"),
  "lake-cypress-springs-photo": commonsLake("lake-cypress-springs-photo", "Lake Cypress Springs, view from north branch.jpg", "March 2010 photograph of the real Lake Cypress Springs from its north branch in Franklin County, Texas; historic view, not current levels or ramp conditions", 640, 480, "Maxup10", "CC0 1.0", CC0_1, "public-domain", "Wikimedia Commons — actual lake photograph", "2026-10-14"),
  "lake-cypress-springs-topography": commonsLake("lake-cypress-springs-topography", "Lake Cypress Springs Topographical Map.png", "Topographical MAP of Lake Cypress Springs and surrounding Franklin County terrain generated from public elevation data, circa 2019; not a live depth sounding, satellite photograph or official navigation map", 2048, 1223, "maxup10", "CC BY-SA 4.0", CC_BY_SA_4, "cc-by-sa", "Wikimedia Commons — lake-specific cartography", "2026-10-14"),
  "bachman-lake": commonsLake("bachman-lake", "Bachman Lake.JPG", "Actual December 2005 photograph of Bachman Lake beside Dallas Love Field; a HISTORIC lake view, not a picture of the completed 2023 dredging or 2026 dam improvements", 2272, 1704, "Ansem27", "CC BY-SA 3.0", CC_BY_SA_3, "cc-by-sa", "Wikimedia Commons", "2026-10-14"),
  "brady-creek-reservoir": commonsLake("brady-creek-reservoir", "Brady Lake Texas 2021.jpg", "Actual May 26, 2021 photograph of Brady Creek Reservoir near Brady, McCulloch County, Texas; historical view, not a live ramp or water-level image", 3214, 1808, "Larry D. Moore", "CC BY 4.0", CC_BY_4, "cc-by", "Wikimedia Commons", "2026-10-14"),
  "e-v-spence-reservoir": commonsLake("e-v-spence-reservoir", "EV Spence Reservoir TX.jpg", "Exact aerial photograph of E. V. Spence Reservoir near Robert Lee, Coke County, Texas, facing northeast on January 21, 2009; not a live photograph of water level or recreation access", 1410, 940, "Jstuby", "Public domain — creator released own photograph", COMMONS_PD, "public-domain", "Wikimedia Commons", "2026-10-14"),
};

export function getFishingFishImage(slugOrId: string) {
  return fishingFishImages[slugOrId] ?? null;
}

export function getFishingLakeImage(slug: string) {
  return fishingLakeImages[slug] ?? null;
}
