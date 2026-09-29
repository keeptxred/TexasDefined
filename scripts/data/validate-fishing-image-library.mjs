import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const fail = (message) => { throw new Error(`Fishing image library validation failed: ${message}`); };
const requireText = (source, token, label) => { if (!source.includes(token)) fail(label); };

const paths = {
  library: "src/data/fishing/image-library.ts",
  photo: "src/components/fishing/FishingPhoto.tsx",
  speciesProfile: "src/components/fishing/FishingSpeciesProfile.tsx",
  speciesDirectory: "src/components/fishing/FishSpeciesDirectory.tsx",
  hub: "src/components/fishing/FishingHub.tsx",
  showcase: "src/components/fishing/ShowcaseLakeGuide.tsx",
  genericLake: "src/components/fishing/GenericFishingLakeGuide.tsx",
  lakeDirectory: "src/components/fishing/FishingLakesDirectory.tsx",
  slugs: "src/data/fishing/slugs.ts",
};
for (const path of Object.values(paths)) if (!fs.existsSync(path)) fail(`required file missing: ${path}`);
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));

for (const token of [
  "FishingImageRightsStatus",
  "FishingVisualAsset",
  "sourceUrl",
  "creator",
  "licenseName",
  "licenseUrl",
  "rightsStatus",
  "verifiedAt",
  "representativeOfGroup",
  "actualLocation",
  "fishingFishImages",
  "fishingLakeImages",
  "getFishingFishImage",
  "getFishingLakeImage",
]) requireText(files.library, token, `registry contract missing ${token}`);

const requiredFish = [
  "largemouth-bass",
  "smallmouth-bass",
  "spotted-bass",
  "guadalupe-bass",
  "crappie",
  "black-crappie",
  "white-crappie",
  "catfish",
  "blue-catfish",
  "channel-catfish",
  "flathead-catfish",
  "white-bass",
  "striped-bass",
  "hybrid-striped-bass",
  "alligator-gar",
  "freshwater-drum",
  "sunfish",
  "bluegill",
  "rainbow-trout",
  "walleye",
  "red-drum",
];
for (const slug of requiredFish) {
  const token = `"${slug}":`;
  const bareToken = `  ${slug}:`;
  if (!files.library.includes(token) && !files.library.includes(bareToken)) fail(`governed fish inventory missing ${slug}`);
}

for (const slug of ["crappie", "catfish", "sunfish"]) {
  const start = files.library.indexOf(`  ${slug.includes("-") ? '"' + slug + '"' : slug}: fish(`);
  if (start < 0) fail(`representative fish group missing ${slug}`);
  const end = files.library.indexOf("\n  ),", start);
  const block = files.library.slice(start, end > start ? end + 5 : start + 1000);
  if (!block.includes(`representativeOfGroup: "${slug}"`)) fail(`${slug} group image must be explicitly labeled representative`);
}

for (const token of [
  "commons.wikimedia.org/wiki/File:",
  "commons.wikimedia.org/wiki/Special:Redirect/file/",
  "Public domain — U.S. federal government work",
  "Wikimedia Commons / U.S. Fish & Wildlife Service",
  "CC0 1.0 public-domain dedication",
  "Wikimedia Commons / iNaturalist",
]) requireText(files.library, token, `fish provenance contract missing ${token}`);

const requiredLakes = [
  "lake-nacogdoches",
  "fayette-county-reservoir",
  "o-h-ivie-lake",
  "lake-fork",
  "amistad-reservoir",
  "lake-meredith",
  "ray-roberts-lake",
  "lake-somerville",
  "caddo-lake",
  "lake-bob-sandlin",
  "lake-corpus-christi",
  "lake-livingston",
  "lake-tawakoni",
  "lake-whitney",
  "sam-rayburn-reservoir",
  "lake-texoma",
  "toledo-bend-reservoir",
  "possum-kingdom-reservoir",
  "canyon-lake",
  "lake-travis",
  "lake-buchanan",
  "lake-lbj",
  "lewisville-lake",
  "lake-lavon",
  "lake-austin",
  "lake-houston",
  "grapevine-lake",
  "eagle-mountain-lake",
  "belton-lake",
  "stillhouse-hollow-reservoir",
  "calaveras-lake",
  "alan-henry-reservoir",
  "lake-palestine",
  "lake-conroe",
  "choke-canyon-reservoir",
  "falcon-international-reservoir",
  "cedar-creek-reservoir",
  "lake-ray-hubbard",
  "lake-bridgeport",
  "lake-o-the-pines",
];
const allowedMissingLakePhotoSlugs = new Set(["richland-chambers-reservoir"]);
const parseSlugArray = (name) => {
  const match = files.slugs.match(new RegExp(`${name}\\s*=\\s*\\[([^\\]]+)\\]`, "s"));
  return match ? [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((entry) => entry[1]) : [];
};
const completeLakeSlugs = [
  ...parseSlugArray("BASE_COMPLETE_FISHING_LAKE_SLUGS"),
  ...parseSlugArray("WAVE2_COMPLETE_FISHING_LAKE_SLUGS"),
  ...parseSlugArray("STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS"),
];
if (new Set(completeLakeSlugs).size !== 41) fail(`expected 41 complete lake guides, found ${new Set(completeLakeSlugs).size}`);

for (const slug of requiredLakes) {
  const localToken = `"${slug}": lake(`;
  const commonsToken = `"${slug}": commonsLake(`;
  if (!files.library.includes(localToken) && !files.library.includes(commonsToken)) fail(`governed lake image inventory missing ${slug}`);
}

const governedLakeImageSlugs = new Set([
  ...[...files.library.matchAll(/^\s{2}"([^"]+)":\s+(?:lake|commonsLake|remoteLake)\(/gm)].map((match) => match[1]),
]);
for (const slug of completeLakeSlugs) {
  if (!governedLakeImageSlugs.has(slug) && !allowedMissingLakePhotoSlugs.has(slug)) fail(`exact-photo coverage missing for complete lake guide: ${slug}`);
}
for (const slug of allowedMissingLakePhotoSlugs) {
  if (governedLakeImageSlugs.has(slug)) fail(`${slug} is still marked as an intentional image gap after receiving a governed image`);
}
if (governedLakeImageSlugs.size !== 40) fail(`expected 40 governed exact-lake images, found ${governedLakeImageSlugs.size}`);

for (const token of [
  "remoteLake",
  "live.staticflickr.com",
  "https://www.flickr.com/photos/kenlund/27527896883/",
  "https://www.flickr.com/photos/attawayjl/3318770254/",
  "CC BY-SA 2.0",
  "CC BY 2.0",
  "Wikimedia Commons / Library of Congress",
  "Osprey @ Fayette County Reservoir (12715870).jpg",
]) requireText(files.library, token, `expanded lake-photo provenance contract missing ${token}`);

const localLakeImagePaths = [...files.library.matchAll(/"\/(images\/(?:explore|state-parks)\/[^"]+\.(?:jpg|jpeg|png|webp|avif))"/g)]
  .map((match) => `public/${match[1]}`);
for (const path of localLakeImagePaths) if (!fs.existsSync(path)) fail(`registered lake image file does not exist: ${path}`);
if (localLakeImagePaths.length < 10) fail(`expected at least 10 local exact-lake images, found ${localLakeImagePaths.length}`);
const commonsLakeBlocks = [...files.library.matchAll(/^\s{2}"([^"]+)": commonsLake\(/gm)].map((match) => match[1]);
if (commonsLakeBlocks.length < 28) fail(`expected at least 28 exact Commons lake images, found ${commonsLakeBlocks.length}`);
for (const slug of commonsLakeBlocks) {
  const start = files.library.indexOf(`  "${slug}": commonsLake(`);
  const end = files.library.indexOf("\n  ),", start);
  const block = files.library.slice(start, end > start ? end + 5 : start + 1600);
  for (const token of ["Wikimedia Commons", "sourceUrl", "actualLocation"]) {
    if (token === "sourceUrl" || token === "actualLocation") continue;
  }
  if (!block.includes("CC BY") && !block.includes("Public domain")) fail(`Commons lake image missing explicit reusable license: ${slug}`);
}


for (const token of [
  "image.credit",
  "image.sourceUrl",
  "image.licenseUrl",
  'rel="noreferrer noopener"',
]) requireText(files.photo, token, `FishingPhoto attribution contract missing ${token}`);

for (const [name, source] of Object.entries({
  speciesProfile: files.speciesProfile,
  speciesDirectory: files.speciesDirectory,
  hub: files.hub,
  showcase: files.showcase,
  genericLake: files.genericLake,
  lakeDirectory: files.lakeDirectory,
})) {
  requireText(source, "FishingPhoto", `${name} must use the governed FishingPhoto renderer`);
}

for (const [name, source] of Object.entries({
  speciesProfile: files.speciesProfile,
  speciesDirectory: files.speciesDirectory,
  hub: files.hub,
  showcase: files.showcase,
  genericLake: files.genericLake,
})) requireText(source, "getFishingFishImage", `${name} missing governed fish-image lookup`);

for (const [name, source] of Object.entries({
  hub: files.hub,
  showcase: files.showcase,
  genericLake: files.genericLake,
  lakeDirectory: files.lakeDirectory,
})) requireText(source, "getFishingLakeImage", `${name} missing governed lake-image lookup`);

for (const source of Object.values(files)) {
  if (/https?:\/\/(?!commons\.wikimedia\.org)[^"'\s)]+\.(?:jpg|jpeg|png|webp|avif)/i.test(source) && source !== files.library) {
    fail("hard-coded remote raster image found outside governed fishing image library");
  }
}

if (!files.showcase.includes('showCredit={false}') || !files.genericLake.includes('showCredit={false}')) {
  fail("public-domain fish cards should suppress repetitive credit while lake/guide photography retains attribution");
}
if (files.lakeDirectory.includes('showCredit={false}') || files.showcase.includes('image={lakeImage} showCredit={false}') || files.genericLake.includes('image={lakeImage} showCredit={false}')) {
  fail("CC-capable lake photography must not suppress visible attribution");
}

console.log(`Fishing image library validation passed: all ${requiredFish.length} published fish species/groups and 40 of 41 complete lake guides have governed exact-location imagery; Richland-Chambers remains the sole intentional rights-cleared-photo gap.`);
