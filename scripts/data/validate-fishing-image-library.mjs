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
];
for (const slug of requiredLakes) requireText(files.library, `"${slug}": lake(`, `governed lake image inventory missing ${slug}`);

const localLakeImagePaths = [...files.library.matchAll(/"\/(images\/(?:explore|state-parks)\/[^"]+\.(?:jpg|jpeg|png|webp|avif))"/g)]
  .map((match) => `public/${match[1]}`);
for (const path of localLakeImagePaths) if (!fs.existsSync(path)) fail(`registered lake image file does not exist: ${path}`);
if (localLakeImagePaths.length < 10) fail(`expected at least 10 local exact-lake images, found ${localLakeImagePaths.length}`);

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

console.log(`Fishing image library validation passed: all ${requiredFish.length} published fish species/groups and ${requiredLakes.length} exact lake-photo mappings are protected with provenance, license metadata, reusable rendering and attribution rules.`);
