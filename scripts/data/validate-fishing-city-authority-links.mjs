import fs from "node:fs";
const read = (path) => fs.readFileSync(path, "utf8");
const inputs = [
  ["src/data/fishing/statewide-lake-network.ts", true],
  ["src/data/fishing/showcase-lakes-prototype.ts", false],
  ["src/data/fishing/expanded-showcase-lakes-prototype.ts", false],
  ["src/data/fishing/wave2-showcase-lakes-prototype.ts", false],
];
const lakes = [];
for (const [path, statewide] of inputs) {
  const src = read(path);
  const anchors = [...src.matchAll(statewide ? /^    slug: "([^"]+)", name: "([^"]+)"/gm : /^\s+slug: "([^"]+)",?/gm)];
  for (let i = 0; i < anchors.length; i++) {
    const a = anchors[i];
    const end = i + 1 < anchors.length ? anchors[i + 1].index : statewide ? src.indexOf("\n];", a.index) : src.length;
    const block = src.slice(a.index, end);
    const name = statewide ? a[2] : block.match(/overview:\s*\{\s*name:\s*"([^"]+)"/)?.[1];
    const match = block.match(statewide ? /nearestCities:\s*\[([^\]]+)\]/ : /nearestCommunities:\s*\[([^\]]+)\]/)?.[1] ?? "";
    const cities = [...match.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    if (!name || !cities.length) throw Error("Missing relevant city data for lake " + a[1]);
    lakes.push({ slug: a[1], name, cities });
  }
}
const conroe = read("src/data/fishing/lake-conroe-prototype.ts");
const cities = [...(conroe.match(/nearestCommunities:\s*\[([^\]]+)\]/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((x) => x[1]);
lakes.push({ slug: "lake-conroe", name: "Lake Conroe", cities });
if (new Set(lakes.map((x) => x.slug)).size !== lakes.length) throw Error("Duplicate lake in nearby-city index");
const out = {};
for (const lake of lakes) for (const city of lake.cities) {
  const key = city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  (out[key] ??= []).push({ slug: lake.slug, name: lake.name });
}
const sorted = Object.fromEntries(Object.keys(out).sort().map((k) => [k, out[k].sort((a,b) => a.name.localeCompare(b.name))]));
const target = "src/data/fishing/city-lake-links.generated.json";
const expected = JSON.stringify(sorted, null, 2) + "\n";
if (process.argv.includes("--write")) fs.writeFileSync(target, expected);
else if (read(target) !== expected) throw Error("City/lake internal linking registry drifted. Regenerate with node scripts/data/validate-fishing-city-authority-links.mjs --write");
const page = read("src/routes/$kind.$slug.lazy.tsx");
if (!page.includes("lakeGuidesNearCity") || !page.includes("/fishing/lakes/"))
  throw Error("City entity template does not expose verified lake guide links");
console.log(`City/lake links verified: ${lakes.length} lake guides, ${Object.keys(sorted).length} communities and ${Object.values(sorted).flat().length} nearby-lake references.`);
