import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), "utf8");

const [llms, citationGuide, citationManifestSource, rootRoute, hub, lakesRoute, speciesRoute] = await Promise.all([
  read("src/routes/llms[.]txt.ts"),
  read("src/routes/citation-guide.tsx"),
  read("public/citation-magnets.json"),
  read("src/routes/__root.tsx"),
  read("src/routes/fishing.tsx"),
  read("src/routes/fishing.lakes.tsx"),
  read("src/routes/fishing.species.tsx"),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

for (const marker of [
  "## Texas fishing",
  "Texas fishing guide: https://texasdefined.com/fishing",
  "Complete Texas fishing lakes directory: https://texasdefined.com/fishing/lakes",
  "Texas freshwater fish species directory: https://texasdefined.com/fishing/species",
  "Largemouth bass guide: https://texasdefined.com/fishing/species/largemouth-bass",
  "Lake Conroe fishing guide: https://texasdefined.com/fishing/lakes/lake-conroe",
  "Lake Fork fishing guide: https://texasdefined.com/fishing/lakes/lake-fork",
  "Sam Rayburn Reservoir fishing guide: https://texasdefined.com/fishing/lakes/sam-rayburn-reservoir",
  "Lake Livingston fishing guide: https://texasdefined.com/fishing/lakes/lake-livingston",
  "Lake Texoma fishing guide: https://texasdefined.com/fishing/lakes/lake-texoma",
  "only largemouth bass currently clears the complete statewide species-guide standard",
  "Lake-to-species relationships are durable fishery context, not a statement about the current bite.",
  "use Texas Parks & Wildlife Department sources linked from the relevant guide",
  "do not infer a current bite, stocking status, lake level, ramp condition, closure or regulation",
]) assert(llms.includes(marker), `llms.txt is missing fishing retrieval/source-precedence marker: ${marker}.`);

for (const marker of [
  "title: 'Fishing & lake references'",
  "['Texas fishing guide', '/fishing']",
  "['Compare complete fishing lakes', '/fishing/lakes']",
  "['Texas freshwater fish species', '/fishing/species']",
  "['Largemouth bass fishing', '/fishing/species/largemouth-bass']",
  "['Lake Conroe fishing', '/fishing/lakes/lake-conroe']",
  "fisheries authority, lake manager",
  "fishing regulations, current lake levels or ramp access",
  '<Link to="/fishing"',
  '<Link to="/fishing/lakes"',
]) assert(citationGuide.includes(marker), `Human citation guide is missing fishing authority/source-precedence marker: ${marker}.`);

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
    ["https://texasdefined.com/fishing/lakes/lake-conroe", "fishing-lake-reference"],
    ["https://texasdefined.com/fishing/lakes/lake-fork", "fishing-lake-reference"],
    ["https://texasdefined.com/fishing/lakes/sam-rayburn-reservoir", "fishing-lake-reference"],
    ["https://texasdefined.com/fishing/lakes/lake-livingston", "fishing-lake-reference"],
    ["https://texasdefined.com/fishing/lakes/lake-texoma", "fishing-lake-reference"],
  ];
  for (const [url, type] of expected) {
    const resource = (manifest.resources ?? []).find((row) => row.url === url);
    assert(Boolean(resource), `Machine citation manifest is missing fishing resource ${url}.`);
    if (resource) {
      assert(resource.type === type, `${url} must retain citation type ${type}.`);
      assert(resource.trust?.includes("official-sources"), `${url} must retain official-sources trust guidance.`);
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

console.log("Fishing authority validated: completed lake/species scope, official-source precedence, current-condition caveats, citation resources and organization subject identity are protected.");
