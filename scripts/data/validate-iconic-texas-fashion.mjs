import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const failures = [];

const data = read("src/data/iconic-texas-fashion-items.ts");
const guide = read("src/data/fixtures/iconic-texas-fashion-guide.ts");
const registry = read("src/data/fixtures/lazy-standalone-evergreen.ts");
const brands = read("src/data/texas-evergreen-guides-batch3.ts");
const unique = read("src/data/things-unique-to-texas.ts");

const match = data.match(/ICONIC_TEXAS_FASHION_ITEMS = `([\s\S]*?)`\.trim\(\)\.split/);
if (!match) failures.push("Could not parse iconic Texas fashion item list.");
const items = match ? match[1].split("\n").filter(Boolean) : [];

if (items.length !== 250) failures.push(`Expected 250 iconic Texas fashion items; found ${items.length}.`);
if ((data.match(/start:/g) || []).length !== 10 || (data.match(/end:/g) || []).length !== 10) failures.push("Expected ten 25-item fashion sections.");
for (const bad of ["Shaner Bock", "Brnt Orange", "Squaw Wrap"]) {
  if (data.includes(bad)) failures.push(`Unnormalized source wording remains: ${bad}`);
}

for (const marker of [
  'slug: "iconic-texas-fashion-western-wear-guide"',
  'title: "250 Iconic Texas Fashion Items: Boots, Hats, Western Wear and Workwear"',
  'ICONIC_TEXAS_FASHION_ITEMS',
  'ICONIC_TEXAS_FASHION_SECTIONS',
  'relatedDestinations: ["fort-worth-stockyards"]',
  'href: "/texas-symbols"',
  'href: "/made-in-texas"',
  'href: "/destination/fort-worth-stockyards"',
  'Boots_on_the_fence..JPG?width=1600',
]) if (!guide.includes(marker)) failures.push(`Fashion guide missing required marker: ${marker}`);

for (const marker of [
  "iconicTexasFashionGuideStub",
  'import("./iconic-texas-fashion-guide")',
]) if (!registry.includes(marker)) failures.push(`Standalone article registry missing: ${marker}`);

if (!brands.includes('/article/iconic-texas-fashion-western-wear-guide')) failures.push("Texas brand guide lacks reciprocal fashion link.");
if (!unique.includes('item(230, "Boots, spurs and Western dress"') || !unique.includes('/article/iconic-texas-fashion-western-wear-guide')) failures.push("Things That Define Texas lacks Western-dress fashion link.");

for (const path of [
  "src/data/fixtures/el-paso-county-pass-missions-borderlands.ts",
  "src/data/fixtures/tarrant-county-fort-worth-trinity-western-heritage.ts",
  "src/data/fixtures/dallas-county-dallas-trinity-old-red.ts",
  "src/data/fixtures/montague-county-bowie-nocona-chisholm-trail-red-river-texas.ts",
  "src/data/fixtures/camp-county-pittsburg-railroads-poultry-piney-woods-texas.ts",
  "src/data/fixtures/travis-county-austin-capitol-springs-hill-country.ts",
  "src/data/fixtures/texas-life-split-source.ts",
  "src/data/fixtures/rodeo-101.ts",
  "src/routes/texas-old-west.tsx",
]) {
  if (!read(path).includes('/article/iconic-texas-fashion-western-wear-guide')) failures.push(`Missing fashion cross-link: ${path}`);
}

if (guide.includes("/texas-icons/cowboy-boot")) failures.push("Fashion guide references nonexistent cowboy-boot icon path.");

if (failures.length) {
  console.error("\nIconic Texas fashion validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Iconic Texas fashion validation passed: ${items.length} curated items, 10 sections, registry and reciprocal links verified.`);
