import fs from "node:fs";
import assert from "node:assert/strict";

function readDestinations(filename) {
  const source = fs.readFileSync(new URL("../../src/data/" + filename, import.meta.url), "utf8");
  const start = source.indexOf("= [");
  assert.ok(start !== -1, "Unable to locate destination records in " + filename);
  return JSON.parse(source.slice(start + 2).replace(/;\s*$/, "").trim());
}

const destinations = [
  ...readDestinations("nacogdoches-san-augustine-authority-destinations.ts"),
  ...readDestinations("zion-hill-nacogdoches-authority-destinations.ts"),
];
const imageOwners = new Map();
for (const destination of destinations) {
  assert.ok(destination.hero?.src?.startsWith("https://"), destination.slug + " has no usable source image");
  const owner = imageOwners.get(destination.hero.src);
  assert.ok(!owner, destination.slug + " and " + owner + " reuse the same hero image, preventing indexing");
  imageOwners.set(destination.hero.src, destination.slug);
}

const town = destinations.find((destination) => destination.slug === "san-augustine");
const courthouse = destinations.find((destination) => destination.slug === "san-augustine-county-courthouse");
assert.ok(town && courthouse, "Missing historic town or courthouse authority records");
assert.notEqual(town.hero.src, courthouse.hero.src);
const filename = "Retail Stores San Augustine (1 of 1).jpg";
assert.ok(town.hero.src.includes("Retail_Stores_San_Augustine_"), "Town hero must show San Augustine, not borrow the courthouse");
assert.match(town.hero.alt, /San Augustine/i);
assert.match(town.hero.credit ?? "", /Renelibrary.*CC BY-SA 4\.0/);
assert.ok(town.hero.width >= 1200);

const api = new URL("https://commons.wikimedia.org/w/api.php");
for (const [name, value] of Object.entries({
  action: "query", format: "json", prop: "imageinfo",
  iiprop: "url|size|extmetadata", titles: "File:" + filename,
})) api.searchParams.set(name, value);
const response = await fetch(api, {
  headers: { "user-agent": "TexasDefinedEditorialSourceVerifier/1.0 (https://texasdefined.com; media compliance)" },
  signal: AbortSignal.timeout(20000),
});
assert.ok(response.ok, "Commons metadata HTTP " + response.status);
const metadata = await response.json();
const page = Object.values(metadata.query?.pages ?? {})[0];
assert.ok(page && page.pageid !== -1 && page.imageinfo?.length, "Exact storefront photograph not found");
const info = page.imageinfo[0], rights = info.extmetadata ?? {};
assert.match(String(rights.Artist?.value ?? ""), /Renelibrary/i);
assert.match(String(rights.LicenseShortName?.value ?? "") + " " + String(rights.LicenseUrl?.value ?? ""), /CC BY-SA 4\.0|by-sa\/4\.0/i);
assert.ok(info.width >= 1200 && info.height >= 700, "Original photo resolution too low");
assert.ok(Math.abs(town.hero.height / town.hero.width - info.height / info.width) < 0.02, "Displayed image dimensions do not match original proportions");

console.log(JSON.stringify({
  status: "PASS",
  destinationsChecked: destinations.length,
  uniqueHeroSources: imageOwners.size,
  sanAugustineTownPhotograph: filename,
  creator: "Renelibrary",
  license: "CC BY-SA 4.0",
  originalDimensions: [info.width, info.height],
}));
