/**
 * Scheduled TPWD source identity watch for all 22 fish in the
 * TexasDefined freshwater field-guide cohort. HTTP/identity check only.
 * Source content edits still require independent research and human review;
 * this script NEVER advances verifiedAt or silently changes fishing advice.
 */
import fs from "node:fs";
import assert from "node:assert/strict";

const names = [
  ["bowfin", "Bowfin", "Amia calva"],
  ["common-carp", "Common Carp", "Cyprinus carpio"],
  ["alligator-gar", "Alligator Gar", "Atractosteus spatula"],
  ["spotted-gar", "Spotted Gar", "Lepisosteus oculatus"],
  ["channel-catfish", "Channel Catfish", "Ictalurus punctatus"],
  ["blue-catfish", "Blue Catfish", "Ictalurus furcatus"],
  ["flathead-catfish", "Flathead Catfish", "Pylodictis olivaris"],
  ["largemouth-bass", "Largemouth Bass", "Micropterus salmoides"],
  ["guadalupe-bass", "Guadalupe Bass", "Micropterus treculii"],
  ["bluegill", "Bluegill", "Lepomis macrochirus"],
  ["redear-sunfish", "Redear Sunfish", "Lepomis microlophus"],
  ["green-sunfish", "Green Sunfish", "Lepomis cyanellus"],
  ["warmouth", "Warmouth", "Lepomis gulosus"],
  ["longear-sunfish", "Longear Sunfish", "Lepomis megalotis"],
  ["redbreast-sunfish", "Redbreast Sunfish", "Lepomis auritus"],
  ["rio-grande-cichlid", "Rio Grande Cichlid", "Herichthys cyanoguttatus"],
  ["black-crappie", "Black Crappie", "Pomoxis nigromaculatus"],
  ["white-crappie", "White Crappie", "Pomoxis annularis"],
  ["striped-bass", "Striped Bass", "Morone saxatilis"],
  ["white-bass", "White Bass", "Morone chrysops"],
  ["freshwater-drum", "Freshwater Drum", "Aplodinotus grunniens"],
  ["rainbow-trout", "Rainbow Trout", "Oncorhynchus mykiss"],
];
const identification = fs.readFileSync("src/data/fishing/species-identification.ts", "utf8");
const marker = "export const fishIdentification: Record<string, FishIdentification> = ";
assert(identification.includes(marker), "TPWD field-guide export missing");
const profiles = JSON.parse(identification.split(marker)[1].split(";\n")[0]);
const expected = new Set(names.map(([slug]) => slug));
assert.equal(expected.size, 22, "TPWD 22-species monitor must have unique slugs");
assert.deepEqual(expected, new Set(Object.keys(profiles)), "TPWD watch must cover all 22 field-guide species");

const species = names.map(([slug, commonName, scientificName]) => {
  const url = profiles[slug].sourceUrl;
  assert(url.startsWith("https://tpwd.texas.gov/huntwild/wild/species/"),
    "Nonofficial or unexpected fish source URL for " + slug + ": " + url);
  return { slug, commonName, scientificName, url };
});

const problems = [];
for (let start = 0; start < species.length; start += 4) {
  const batch = species.slice(start, start + 4);
  const checks = await Promise.all(batch.map(async ({ slug, commonName, scientificName, url }) => {
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": "TexasDefined-FishingSourceMonitor/1.1 (+https://texasdefined.com/fishing/species)",
          accept: "text/html, text/plain;q=0.8",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error("TPWD HTTP " + response.status);
      if (new URL(response.url).hostname !== "tpwd.texas.gov")
        throw new Error("Official source redirected to " + response.url);
      const html = await response.text();
      const normalized = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .toLowerCase();
      for (const token of [commonName, scientificName]) {
        if (!normalized.includes(token.toLowerCase()))
          throw new Error("Official species identity missing: " + token);
      }
      console.log("TPWD verified source identity: " + slug + " — " + commonName +
        " (" + scientificName + ") " + url);
      return null;
    } catch (error) {
      return "TPWD species source needs investigation: " + slug + " — " + String(error) +
        " (" + url + "). No source dates were advanced.";
    }
  }));
  problems.push(...checks.filter(Boolean));
}
if (problems.length) {
  console.error("TPWD fish source check failed: " + problems.length + " of " +
    species.length + " official pages require review.");
  for (const problem of problems) console.error(problem);
  process.exitCode = 1;
} else {
  console.log("PASS: All 22 TPWD freshwater-fish source identity pages are reachable and identify the expected fish.");
}
