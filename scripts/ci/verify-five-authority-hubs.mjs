import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

/** Focused authority release guard: five editorial hubs, no site-wide crawl.
 * The optional production mode verifies actual deployed HTML, not Google rankings. */
const paths = {
  dogs: "src/components/dogs/DogsHubPage.tsx",
  breed: "src/components/dogs/DogBreedPage.tsx",
  breedData: "src/data/texas-dogs-breed-care.ts",
  dogSlugs: "src/data/texas-dogs.ts",
  dogServer: "src/data/texas-dogs.server.ts",
  sports: "src/routes/sports.lazy.tsx",
  category: "src/components/editorial/CategoryPage.tsx",
  football: "src/routes/sports.friday-night-lights.lazy.tsx",
  hunt: "src/components/hunting/HuntingPublicAccessPlanner.tsx",
  tailgate: "src/routes/texas-tailgating-guide.lazy.tsx",
  tailgateHead: "src/routes/texas-tailgating-guide.tsx",
};
const source = Object.fromEntries(await Promise.all(Object.entries(paths).map(async ([key, file]) => [key, await readFile(file, "utf8")])));
const includesAll = (key, markers) => {
  for (const marker of markers) assert.ok(source[key].includes(marker), `${paths[key]} missing required authority contract: ${marker}`);
};
includesAll("dogs", ["Texas dog life: parks, heat, travel and breeds", "Plan a safe Texas dog outing in four checks", "texas-dog-heat-safety", "adopting-a-dog-in-texas", "Texas dog life: useful first, funny when it fits"]);
assert.ok(source.dogs.indexOf("From the Dog Desk") < source.dogs.indexOf("Choosing a breed"), "Dog care must lead breed catalog");
assert.ok(source.dogs.indexOf("Choosing a breed") < source.dogs.indexOf("Creative ideas · separate from care guidance"), "Shirt concepts must not lead care");
includesAll("breed", ["breed.care.movement", "breed.care.coatAndHome", "breed.care.texasPlan", "breed.care.sourceUrl", "Texas heat-safety guide"]);
includesAll("dogServer", ["care: DOG_BREED_CARE[breed.slug]", "Texas Dogs Guide: Heat Safety, Parks, Travel & Breeds"]);
const slugs = [...source.dogSlugs.matchAll(/^  "([a-z-]+)",$/gm)].map(x => x[1]);
assert.equal(slugs.length, 12, "Expected the governed twelve breeds");
for (const slug of slugs) assert.ok(source.breedData.includes('"' + slug + '": { movement:'), "Missing original care entry for " + slug);
assert.equal((source.breedData.match(/sourceUrl: "https:\/\/www.akc.org\/dog-breeds\//g) ?? []).length, slugs.length);
includesAll("category", ["showDestinations = true", "showDestinations && destinations.length > 0"]);
includesAll("sports", ["showDestinations={false}", "What are you planning to follow or visit?", "/sports-venues/college-sports", "/sports-venues/motorsports", "/sports/softball"]);
includesAll("football", ["Curated matchups & documented scores (not a live statewide scoreboard)", "Don't mistake a curated matchup archive", "https://www.uiltexas.org/football/playoff-brackets"]);
includesAll("hunt", ["Four checks before you treat an area as available", "Match legal game and dates", "Confirm the exact boundaries"]);
includesAll("tailgate", ["A comparison that changes your packing list", "AT&amp;T Stadium · Arlington", "Houston Texans · NRG Stadium", "USDA FSIS", "40°F or below", "one hour when outside temperatures exceed 90°F"]);
includesAll("tailgateHead", ['dateModified: "2026-11-11"']);
console.log("PASS five-hub focused authority content, source and topical-scope guards");

if (process.argv.includes("--production")) {
  const checks = [
    ["/hunting", ["Texas", "TPWD"]],
    ["/dogs", ["Texas dog life", "parks"]],
    ["/sports", ["Texas sports", "Choose the sport first"]],
    ["/sports/friday-night-lights", ["Friday Night Lights", "Curated matchups"]],
    ["/texas-tailgating-guide", ["Tailgating in Texas", "AT&T Stadium"]],
  ];
  const failed = [];
  for (const [path, needles] of checks) {
    try {
      const response = await fetch("https://texasdefined.com" + path, {
        headers: { "User-Agent": "TexasDefined-Five-Hub-Authority-Monitor/1.0" },
        signal: AbortSignal.timeout(25000),
      });
      assert.equal(response.status, 200, `${path} HTTP ${response.status}`);
      const html = await response.text();
      assert.ok(html.length > 800, `${path} unexpectedly empty`);
      assert.ok(html.includes('rel="canonical"') || html.includes('rel=\"canonical\"'), `${path} missing canonical`);
      for (const needle of needles) assert.ok(html.includes(needle), `${path} missing deployed marker ${needle}`);
      assert.ok(!/<meta[^>]*name=["']robots["'][^>]*noindex/i.test(html), `${path} is noindex`);
      console.log("LIVE PASS " + path);
    } catch (error) {
      failed.push(`${path}: ${error.message}`);
    }
  }
  if (failed.length) throw new Error("Five-hub live verification failed:\n" + failed.join("\n"));
}
