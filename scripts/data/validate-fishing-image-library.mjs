import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const fail = (message) => { throw new Error(`Fishing image library validation failed: ${message}`); };
const requireText = (source, token, label) => { if (!source.includes(token)) fail(label); };

const paths = {
  library: "src/data/fishing/image-library.ts",
  governance: "src/data/fishing/lake-photo-governance.ts",
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
  "licensedRemoteLake",
  "nasaLake",
  "NASA_MEDIA_GUIDELINES",
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
  "lake-fork",
  "o-h-ivie-lake",
  "fayette-county-reservoir",
  "lake-nacogdoches",
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
  "richland-chambers-reservoir",
  "lake-conroe",
  "choke-canyon-reservoir",
  "falcon-international-reservoir",
  "cedar-creek-reservoir",
  "lake-ray-hubbard",
  "lake-bridgeport",
  "lake-o-the-pines",
  "joe-pool-lake",
  "lake-granbury",
  "lake-waco",
  "lake-brownwood",
  "proctor-lake",
  "lake-arrowhead",
  "lake-casa-blanca",
  "lake-mineral-wells",
  "lake-colorado-city",
];
const parseTuple = (source, name) => {
  const match = source.match(new RegExp(`${name}\\s*=\\s*\\[([^\\]]+)\\]`, "s"));
  return match ? [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((entry) => entry[1]) : [];
};
const completeLakeSlugs = [
  ...parseTuple(files.slugs, "BASE_COMPLETE_FISHING_LAKE_SLUGS"),
  ...parseTuple(files.slugs, "WAVE2_COMPLETE_FISHING_LAKE_SLUGS"),
  ...parseTuple(files.slugs, "STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS"),
];
const allowedExactLakeImageGaps = new Set();
if (new Set(completeLakeSlugs).size !== 50) fail(`expected 50 complete fishing lakes, found ${new Set(completeLakeSlugs).size}`);
if (requiredLakes.length !== 50) fail(`expected 50 governed exact lake-photo mappings, found ${requiredLakes.length}`);
for (const slug of completeLakeSlugs) {
  const hasMapping = requiredLakes.includes(slug);
  if (!hasMapping && !allowedExactLakeImageGaps.has(slug)) fail(`complete lake lacks governed image mapping or explicit exception: ${slug}`);
  if (hasMapping && allowedExactLakeImageGaps.has(slug)) fail(`lake cannot be both mapped and an exact-photo exception: ${slug}`);
}
for (const slug of allowedExactLakeImageGaps) {
  if (!completeLakeSlugs.includes(slug)) fail(`stale lake-image exception: ${slug}`);
  if (files.library.includes(`"${slug}":`)) fail(`exact lake image now exists; remove obsolete exception for ${slug}`);
}

for (const slug of requiredLakes) {
  const localToken = `"${slug}": lake(`;
  const commonsToken = `"${slug}": commonsLake(`;
  const remoteToken = `"${slug}": licensedRemoteLake(`;
  const nasaToken = `"${slug}": nasaLake(`;
  if (!files.library.includes(localToken) && !files.library.includes(commonsToken) && !files.library.includes(remoteToken) && !files.library.includes(nasaToken)) {
    fail(`governed lake image inventory missing ${slug}`);
  }
}

const nasaRichlandStart = files.library.indexOf('  "richland-chambers-reservoir": nasaLake(');
if (nasaRichlandStart < 0) fail("NASA Richland-Chambers image mapping missing");
const nasaRichlandEnd = files.library.indexOf("\n  ),", nasaRichlandStart);
const nasaRichlandBlock = files.library.slice(nasaRichlandStart, nasaRichlandEnd > nasaRichlandStart ? nasaRichlandEnd + 5 : nasaRichlandStart + 1800);
requireText(nasaRichlandBlock, "STS058-80-35", "NASA Richland-Chambers image identifier missing");
for (const token of [
  "NASA Johnson Space Center Earth Science & Remote Sensing",
  "NASA Images and Media Usage Guidelines",
  "nasa-media-guidelines",
]) requireText(files.library, token, `NASA Richland-Chambers rights contract missing ${token}`);

const localLakeImagePaths = [...files.library.matchAll(/"\/(images\/(?:explore|state-parks)\/[^"]+\.(?:jpg|jpeg|png|webp|avif))"/g)]
  .map((match) => `public/${match[1]}`);
for (const path of localLakeImagePaths) if (!fs.existsSync(path)) fail(`registered lake image file does not exist: ${path}`);
if (localLakeImagePaths.length < 10) fail(`expected at least 10 local exact-lake images, found ${localLakeImagePaths.length}`);

const localLakeBlocks = [...files.library.matchAll(/^\s{2}"([^"]+)": lake\(/gm)].map((match) => match[1]);
if (localLakeBlocks.length !== 10) fail(`expected 10 local lake mappings requiring provenance overrides, found ${localLakeBlocks.length}`);
for (const slug of localLakeBlocks) {
  const start = files.library.indexOf(`  "${slug}": lake(`);
  const end = files.library.indexOf("\n  ),", start);
  const block = files.library.slice(start, end > start ? end + 5 : start + 1600);
  const id = block.match(/lake\(\s*\n?\s*"([^"]+)"/)?.[1];
  if (!id) fail(`could not resolve local lake asset id for ${slug}`);
  const overrideStart = files.governance.indexOf(`  "${id}": governed({`);
  if (overrideStart < 0) fail(`local lake asset lacks traceable governance override: ${slug} (${id})`);
  const overrideEnd = files.governance.indexOf("\n  }),", overrideStart);
  const overrideBlock = files.governance.slice(overrideStart, overrideEnd > overrideStart ? overrideEnd + 5 : overrideStart + 1800);
  for (const token of ["sourceUrl:", "creator:", "licenseName:", "licenseUrl:", "rightsStatus:", "credit:"]) {
    requireText(overrideBlock, token, `governance override ${id} missing ${token}`);
  }
}
for (const token of ["verifiedAt: \"2026-09-30\"", "actualLocation: true", "applyLakePhotoGovernance"]) {
  requireText(files.governance, token, `lake photo governance contract missing ${token}`);
}

const commonsLakeBlocks = [...files.library.matchAll(/^\s{2}"([^"]+)": commonsLake\(/gm)].map((match) => match[1]);
const remoteLakeBlocks = [...files.library.matchAll(/^\s{2}"([^"]+)": licensedRemoteLake\(/gm)].map((match) => match[1]);
if (remoteLakeBlocks.length < 2) fail(`expected at least two exact licensed remote lake images, found ${remoteLakeBlocks.length}`);
for (const slug of remoteLakeBlocks) {
  const start = files.library.indexOf(`  "${slug}": licensedRemoteLake(`);
  const end = files.library.indexOf("\n  ),", start);
  const block = files.library.slice(start, end > start ? end + 5 : start + 1600);
  if (!block.includes("https://www.flickr.com/")) fail(`licensed remote lake image missing source page: ${slug}`);
  if (!block.includes("CC BY")) fail(`licensed remote lake image missing reusable CC license: ${slug}`);
}

if (commonsLakeBlocks.length < 26) fail(`expected at least 26 exact Commons lake images, found ${commonsLakeBlocks.length}`);
for (const slug of commonsLakeBlocks) {
  const start = files.library.indexOf(`  "${slug}": commonsLake(`);
  const end = files.library.indexOf("\n  ),", start);
  const block = files.library.slice(start, end > start ? end + 5 : start + 1600);
  if (!block.includes("CC BY") && !block.includes("Public domain")) fail(`Commons lake image missing explicit reusable license: ${slug}`);
}

for (const token of [
  "applyLakePhotoGovernance(image)",
  "governedImage.credit",
  "governedImage.sourceUrl",
  "governedImage.licenseUrl",
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

for (const [name, source] of Object.entries(files)) {
  if (/https?:\/\/(?!commons\.wikimedia\.org)[^"'\s)]+\.(?:jpg|jpeg|png|webp|avif)/i.test(source) && name !== "library") {
    fail(`hard-coded remote raster image found outside governed fishing image library: ${name}`);
  }
}

if (!files.showcase.includes('showCredit={false}') || !files.genericLake.includes('showCredit={false}')) {
  fail("public-domain fish cards should suppress repetitive credit while lake/guide photography retains attribution");
}
if (files.lakeDirectory.includes('showCredit={false}') || files.showcase.includes('image={lakeImage} showCredit={false}') || files.genericLake.includes('image={lakeImage} showCredit={false}')) {
  fail("CC-capable lake photography must not suppress visible attribution");
}

console.log(`Fishing image library validation passed: all ${requiredFish.length} published fish species/groups and all ${requiredLakes.length}/50 complete lake guides have governed exact-location imagery with provenance, license metadata, reusable rendering and attribution rules.`);
