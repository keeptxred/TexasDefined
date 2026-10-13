import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const prototypes = [
  ["src/data/fishing/statewide-lake-network.ts", true],
  ["src/data/fishing/showcase-lakes-prototype.ts", false],
  ["src/data/fishing/expanded-showcase-lakes-prototype.ts", false],
  ["src/data/fishing/wave2-showcase-lakes-prototype.ts", false],
];
const lakes = [];
for (const [path, statewide] of prototypes) {
  const source = read(path);
  const anchors = [...source.matchAll(statewide
    ? /^    slug: "([^"]+)", name: "([^"]+)"/gm
    : /^\s+slug: "([^"]+)",?/gm)];
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    const next = i + 1 < anchors.length ? anchors[i + 1].index
      : statewide ? source.indexOf("\n];", anchor.index) : source.length;
    const section = source.slice(anchor.index, next);
    const name = statewide ? anchor[2] : section.match(/overview:\s*\{\s*name:\s*"([^"]+)"/)?.[1];
    const counties = [...(section.match(/counties:\s*\[([^\]]+)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((match) => match[1]);
    if (!name || !counties.length) throw new Error("Incomplete lake-to-county metadata for " + anchor[1]);
    lakes.push({ slug: anchor[1], name, counties });
  }
}
const conroe = read("src/data/fishing/lake-conroe-prototype.ts");
const conroeCounties = [...(conroe.match(/counties:\s*\[([^\]]+)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((match) => match[1]);
if (!conroeCounties.length) throw new Error("Conroe county mapping unavailable");
lakes.push({ slug: "lake-conroe", name: "Lake Conroe", counties: conroeCounties });
const entries = {};
for (const lake of lakes) {
  for (const county of lake.counties) {
    const countySlug = county.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    (entries[countySlug] ??= []).push({ slug: lake.slug, name: lake.name });
  }
}
const sorted = Object.fromEntries(Object.keys(entries).sort().map((county) => [
  county, entries[county].sort((a, b) => a.name.localeCompare(b.name)),
]));
const target = "src/data/fishing/county-lake-links.generated.json";
const expected = JSON.stringify(sorted, null, 2) + "\n";
if (process.argv.includes("--write")) {
  fs.writeFileSync(target, expected);
} else {
  const actual = read(target);
  if (actual !== expected) throw new Error("County-lake authority index stale; run node scripts/data/validate-fishing-county-authority-links.mjs --write");
}
const unique = new Set(lakes.map((lake) => lake.slug));
if (unique.size !== lakes.length) throw new Error("Repeated canonical lake slug in county authority links");
const countyPage = read("src/components/content/CountyGuideSections.tsx");
if (!countyPage.includes("lakeAuthorityByCounty") || !countyPage.includes("countyLakeGuides.map"))
  throw new Error("County pages no longer render lake authority links");
const guide = read("src/data/fishing/statewide-lake-network.ts");
if (!guide.includes("href: `/county/${countySlug(county)}`"))
  throw new Error("Lake guides lost reciprocal county navigation");
console.log(`County/lake authority links validated: ${lakes.length} completed guides, ${Object.keys(sorted).length} county pages, ${Object.values(sorted).reduce((n, entries) => n + entries.length, 0)} source-derived links; reciprocal county route preserved.`);
