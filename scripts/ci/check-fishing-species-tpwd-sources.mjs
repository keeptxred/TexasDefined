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
const authority = fs.readFileSync("src/data/fishing/species-authority-notes.ts","utf8");
const supplemental = JSON.parse(authority.split("export const FISH_AUTHORITY_SOURCES = ")[1].split(" as const;")[0]);
const witnesses = { alabama:["Alabama Bass","Bluegill"], ladybird:["redbreast","redear","carp"], llano:["Guadalupe Bass","Channel Catfish","Largemouth"], fork:["Bowfin","Gar","Drum"], rayburn:["Bowfin","Gar","Drum"], flyrecords:["Longear","Warmouth","Green Sunfish"] };
const entries = Object.entries(supplemental);
for (let start=0;start<entries.length;start+=4) {
  const results=await Promise.all(entries.slice(start,start+4).map(async ([key,source])=>{
    try {
      const response=await fetch(source.url,{headers:{"user-agent":"TexasDefined-FishingSourceMonitor/1.1 (+https://texasdefined.com/fishing/species)",accept:"text/html"},redirect:"follow",signal:AbortSignal.timeout(20000)});
      if(!response.ok || new URL(response.url).hostname!=="tpwd.texas.gov") throw Error("Unexpected HTTP status or redirect: "+response.status);
      const normalized=(await response.text()).replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ").toLowerCase();
      for(const witness of witnesses[key]??[source.witness]) if(!normalized.includes(witness.toLowerCase())) throw Error("Missing source witness: "+witness);
      console.log("TPWD supplemental source identity: "+key+" "+source.url);
      return null;
    }catch(error){return "Supplemental TPWD source needs review: "+key+" "+String(error)+" ("+source.url+")";}
  }));
  problems.push(...results.filter(Boolean));
}
if (problems.length) {
  console.error("TPWD fish source check failed: " + problems.length + " of " +
    (species.length+entries.length) + " official pages require review.");
  for (const problem of problems) console.error(problem);
  process.exitCode = 1;
} else {
  console.log("PASS: All 22 TPWD species identities and supplemental official source witnesses passed. This is not a complete factual re-review.");
}
