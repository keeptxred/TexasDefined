import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const fail = (message) => { throw new Error(`Fishing image library v2 validation failed: ${message}`); };
const requireText = (source, token, label) => { if (!source.includes(token)) fail(label); };

const library = read("src/data/fishing/image-library.ts");
const photo = read("src/components/fishing/FishingPhoto.tsx");
const slugs = read("src/data/fishing/slugs.ts");
const showcase = read("src/components/fishing/ShowcaseLakeGuide.tsx");
const genericLake = read("src/components/fishing/GenericFishingLakeGuide.tsx");
const lakeDirectory = read("src/components/fishing/FishingLakesDirectory.tsx");
const speciesProfile = read("src/components/fishing/FishingSpeciesProfile.tsx");
const speciesDirectory = read("src/components/fishing/FishSpeciesDirectory.tsx");
const hub = read("src/components/fishing/FishingHub.tsx");

for (const token of [
  "sourceUrl: string;", "creator", "licenseName", "licenseUrl", "rightsStatus",
  "verifiedAt", "actualLocation", "representativeOfGroup", "fishingFishImages", "fishingLakeImages",
]) requireText(library, token, `registry contract missing ${token}`);

const requiredFish = [
  "largemouth-bass", "smallmouth-bass", "spotted-bass", "guadalupe-bass", "crappie", "black-crappie",
  "white-crappie", "catfish", "blue-catfish", "channel-catfish", "flathead-catfish", "white-bass",
  "striped-bass", "hybrid-striped-bass", "alligator-gar", "freshwater-drum", "sunfish", "bluegill",
  "rainbow-trout", "walleye", "red-drum",
];
for (const slug of requiredFish) if (!library.includes(`"${slug}":`) && !library.includes(`  ${slug}:`)) fail(`missing fish image ${slug}`);
for (const slug of ["crappie", "catfish", "sunfish"]) requireText(library, `representativeOfGroup: "${slug}"`, `${slug} must be labeled representative`);

const requiredLakes = [
  "lake-fork", "o-h-ivie-lake", "fayette-county-reservoir", "lake-nacogdoches", "amistad-reservoir", "lake-meredith",
  "ray-roberts-lake", "lake-somerville", "caddo-lake", "lake-bob-sandlin", "lake-corpus-christi", "lake-livingston",
  "lake-tawakoni", "lake-whitney", "sam-rayburn-reservoir", "lake-texoma", "toledo-bend-reservoir", "possum-kingdom-reservoir",
  "canyon-lake", "lake-travis", "lake-buchanan", "lake-lbj", "lewisville-lake", "lake-lavon", "lake-austin", "lake-houston",
  "grapevine-lake", "eagle-mountain-lake", "belton-lake", "stillhouse-hollow-reservoir", "calaveras-lake", "alan-henry-reservoir",
  "lake-palestine", "richland-chambers-reservoir", "lake-conroe", "choke-canyon-reservoir", "falcon-international-reservoir",
  "cedar-creek-reservoir", "lake-ray-hubbard", "lake-bridgeport", "lake-o-the-pines",
];
if (requiredLakes.length !== 41) fail(`expected 41 lake mappings, got ${requiredLakes.length}`);
for (const slug of requiredLakes) {
  const present = ["lake", "commonsLake", "licensedRemoteLake", "nasaLake"].some((helper) => library.includes(`"${slug}": ${helper}(`));
  if (!present) fail(`missing exact lake image ${slug}`);
}

const tuple = (name) => {
  const start = slugs.indexOf(`export const ${name}`);
  if (start < 0) return [];
  const end = slugs.indexOf("] as const", start);
  const block = slugs.slice(start, end);
  return [...block.matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
};
const complete = [...tuple("BASE_COMPLETE_FISHING_LAKE_SLUGS"), ...tuple("WAVE2_COMPLETE_FISHING_LAKE_SLUGS"), ...tuple("STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS")];
if (new Set(complete).size !== 41) fail(`expected 41 complete lake guides, got ${new Set(complete).size}`);
for (const slug of complete) if (!requiredLakes.includes(slug)) fail(`complete lake lacks exact photo: ${slug}`);

for (const token of [
  "Lake View from Lake Somerville SP Texas 2023.jpg",
  "Caddo Lake Texas (33279817550).jpg",
  "Lake Bob Sandlin.jpg",
  "Lake corpus christi view.jpg",
  "Lake Livingston State Park Dock.jpg",
  "Lake Tawakoni State Park Texas 2023.jpg",
  "Sunset Lake Whitney Texas 2024.jpg",
]) requireText(library, token, `exact-water replacement missing ${token}`);

const localPaths = [...library.matchAll(/"\/(images\/(?:explore|state-parks)\/[^\"]+\.(?:jpg|jpeg|png|webp|avif))"/gi)].map((m) => m[1]);
for (const relative of localPaths) if (!fs.existsSync(`public/${relative}`)) fail(`local image missing public/${relative}`);
if (localPaths.length === 0) fail("expected at least one locally hosted governed lake image");
for (const slug of ["amistad-reservoir", "lake-meredith", "ray-roberts-lake"]) {
  const line = library.split("\n").find((entry) => entry.includes(`"${slug}": lake(`));
  if (!line || !line.includes("commonsFile(")) fail(`local lake missing original source page: ${slug}`);
}

for (const token of ["image.credit", "image.sourceUrl", "image.licenseUrl", "noreferrer noopener"]) requireText(photo, token, `renderer missing ${token}`);
for (const [name, source] of Object.entries({ showcase, genericLake, lakeDirectory, speciesProfile, speciesDirectory, hub })) requireText(source, "FishingPhoto", `${name} bypasses FishingPhoto`);
for (const [name, source] of Object.entries({ showcase, genericLake, lakeDirectory, hub })) requireText(source, "getFishingLakeImage", `${name} lacks lake lookup`);
for (const [name, source] of Object.entries({ showcase, genericLake, speciesProfile, speciesDirectory, hub })) requireText(source, "getFishingFishImage", `${name} lacks fish lookup`);

for (const token of ["commonsFile(filename)", "sourceUrl: commonsFile(filename)", "actualLocation: true", "VERIFIED_AT", "NASA_MEDIA_GUIDELINES"]) requireText(library, token, `provenance enforcement missing ${token}`);

const assetIds = [...library.matchAll(/"((?:fish|lake)-[a-z0-9-]+)"/g)].map((m) => m[1]);
const repeated = assetIds.filter((value, index) => assetIds.indexOf(value) !== index);
if (repeated.length) fail(`duplicate asset IDs: ${[...new Set(repeated)].join(", ")}`);

if (!showcase.includes('showCredit={false}') || !genericLake.includes('showCredit={false}')) fail("representative/public-domain fish credit suppression contract changed");
if (lakeDirectory.includes('showCredit={false}') || showcase.includes('image={lakeImage} showCredit={false}') || genericLake.includes('image={lakeImage} showCredit={false}')) fail("lake attribution must remain visible");

console.log(`Fishing image library v2 passed: ${requiredFish.length}/21 fish species/groups and ${requiredLakes.length}/41 exact-location lake photos; ${localPaths.length} lake files are local and every lake mapping retains traceable provenance.`);
