import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), "utf8");

const [llms, citationGuide, citationManifestSource, rootRoute, hub, lakesRoute, speciesRoute, slugsSource] = await Promise.all([
  read("src/routes/llms[.]txt.ts"),
  read("src/routes/citation-guide.tsx"),
  read("public/citation-magnets.json"),
  read("src/routes/__root.tsx"),
  read("src/routes/fishing.tsx"),
  read("src/routes/fishing.lakes.tsx"),
  read("src/routes/fishing.species.tsx"),
  read("src/data/fishing/slugs.ts"),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const completeLakeGuides = [
  ["Lake Conroe", "lake-conroe"],
  ["Lake Fork", "lake-fork"],
  ["Sam Rayburn Reservoir", "sam-rayburn-reservoir"],
  ["Lake Livingston", "lake-livingston"],
  ["Lake Texoma", "lake-texoma"],
  ["Toledo Bend Reservoir", "toledo-bend-reservoir"],
  ["Possum Kingdom Reservoir", "possum-kingdom-reservoir"],
  ["Canyon Lake", "canyon-lake"],
  ["Choke Canyon Reservoir", "choke-canyon-reservoir"],
  ["Amistad Reservoir", "amistad-reservoir"],
  ["O.H. Ivie Lake", "o-h-ivie-lake"],
  ["Lake Travis", "lake-travis"],
  ["Lake Whitney", "lake-whitney"],
  ["Lake Tawakoni", "lake-tawakoni"],
  ["Falcon International Reservoir", "falcon-international-reservoir"],
];

function parseSlugArray(source, name) {
  const match = source.match(new RegExp(`(?:export\\s+)?const\\s+${name}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s+as const;`));
  if (!match) {
    errors.push(`Could not parse ${name} from fishing slug registry.`);
    return [];
  }
  return [...match[1].matchAll(/"([^"]+)"/g)].map((row) => row[1]);
}

const canonicalCompleteSlugs = [
  ...parseSlugArray(slugsSource, "BASE_COMPLETE_FISHING_LAKE_SLUGS"),
  ...parseSlugArray(slugsSource, "WAVE2_COMPLETE_FISHING_LAKE_SLUGS"),
];
const authoritySlugs = completeLakeGuides.map(([, slug]) => slug);
assert(new Set(authoritySlugs).size === completeLakeGuides.length, "Fishing citation authority lake list contains duplicate slugs.");
assert(canonicalCompleteSlugs.length === authoritySlugs.length, `Fishing citation authority must cover every complete lake guide; canonical registry has ${canonicalCompleteSlugs.length}, authority list has ${authoritySlugs.length}.`);
for (const slug of canonicalCompleteSlugs) assert(authoritySlugs.includes(slug), `Fishing citation authority is missing canonical complete lake ${slug}.`);
for (const slug of authoritySlugs) assert(canonicalCompleteSlugs.includes(slug), `Fishing citation authority contains non-canonical complete lake ${slug}.`);

for (const marker of [
  "## Texas fishing",
  "Texas fishing guide: https://texasdefined.com/fishing",
  "Complete Texas fishing lakes directory: https://texasdefined.com/fishing/lakes",
  "Texas freshwater fish species directory: https://texasdefined.com/fishing/species",
  "Largemouth bass guide: https://texasdefined.com/fishing/species/largemouth-bass",
  "Lake-to-species relationships are durable fishery context, not a statement about the current bite.",
  "The species directory controls the current standalone-species-guide scope.",
  "use Texas Parks & Wildlife Department sources linked from the relevant guide",
  "do not infer a current bite, stocking status, lake level, ramp condition, closure or regulation",
]) assert(llms.includes(marker), `llms.txt is missing fishing retrieval/source-precedence marker: ${marker}.`);

for (const [name, slug] of completeLakeGuides) {
  const marker = `${name} fishing guide: https://texasdefined.com/fishing/lakes/${slug}`;
  assert(llms.includes(marker), `llms.txt is missing complete fishing lake citation target: ${marker}.`);
}

for (const marker of [
  "title: 'Fishing & lake references'",
  "['Texas fishing guide', '/fishing']",
  "['Compare complete fishing lakes', '/fishing/lakes']",
  "['Texas freshwater fish species', '/fishing/species']",
  "['Largemouth bass fishing', '/fishing/species/largemouth-bass']",
  "15 complete lake guides",
  "current rules, water levels, ramp conditions and the current bite",
  '<Link to="/fishing"',
  '<Link to="/fishing/lakes"',
]) assert(citationGuide.includes(marker), `Human citation guide is missing fishing authority/source-precedence marker: ${marker}.`);

for (const [name, slug] of completeLakeGuides) {
  const marker = `['${name} fishing', '/fishing/lakes/${slug}']`;
  assert(citationGuide.includes(marker), `Human citation guide is missing complete fishing lake link: ${marker}.`);
}

let manifest;
try {
  manifest = JSON.parse(citationManifestSource);
} catch (error) {
  errors.push(`citation-magnets.json is invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
}

if (manifest) {
  const expected = [
    ["https://texasdefined.com/fishing", "fishing-reference-hub"],
    ["https://texasdefined.com/fishing/lakes", "fishing-lake-comparison"],
    ["https://texasdefined.com/fishing/species", "fishing-species-directory"],
    ["https://texasdefined.com/fishing/species/largemouth-bass", "fishing-species-reference"],
    ...completeLakeGuides.map(([, slug]) => [`https://texasdefined.com/fishing/lakes/${slug}`, "fishing-lake-reference"]),
  ];
  for (const [url, type] of expected) {
    const resource = (manifest.resources ?? []).find((row) => row.url === url);
    assert(Boolean(resource), `Machine citation manifest is missing fishing resource ${url}.`);
    if (resource) {
      assert(resource.type === type, `${url} must retain citation type ${type}.`);
      assert(resource.trust?.includes("official-sources"), `${url} must retain official-sources trust guidance.`);
      if (type === "fishing-lake-reference") {
        assert(resource.trust?.includes("durable-fishery-context"), `${url} must retain durable-fishery-context guidance.`);
        assert(resource.trust?.includes("evergreen-vs-live-caveat"), `${url} must retain evergreen-vs-live guidance.`);
      }
    }
  }
  const hubResource = (manifest.resources ?? []).find((row) => row.url === "https://texasdefined.com/fishing");
  assert(hubResource?.trust?.includes("evergreen-vs-live-caveat"), "Fishing hub citation resource must preserve evergreen-vs-live guidance.");
  const lakesResource = (manifest.resources ?? []).find((row) => row.url === "https://texasdefined.com/fishing/lakes");
  assert(lakesResource?.trust?.includes("completed-guide-scope"), "Fishing lakes directory citation resource must preserve completed-guide scope.");
  const speciesResource = (manifest.resources ?? []).find((row) => row.url === "https://texasdefined.com/fishing/species");
  assert(speciesResource?.trust?.includes("standalone-guide-scope"), "Fishing species directory citation resource must preserve standalone-guide scope.");
}

for (const marker of [
  '"Texas fishing"',
  '"Texas fishing lakes"',
  '"Texas freshwater fish"',
]) assert(rootRoute.includes(marker), `Organization knowsAbout must retain fishing subject identity: ${marker}.`);

for (const source of [hub, lakesRoute, speciesRoute]) {
  for (const forbidden of ["citation-magnets.json", "llms[.]txt", "citation-guide"]) {
    assert(!source.includes(forbidden), `Reader-facing fishing routes must not import machine/citation authority files directly: ${forbidden}.`);
  }
}

if (errors.length) {
  console.error("Fishing authority validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Fishing authority validated: all ${completeLakeGuides.length} complete lake guides are represented in llms.txt, the human citation guide and the machine citation manifest with official-source precedence and live-condition caveats.`);
