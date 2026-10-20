import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const media = read("src/data/fixtures/texas-home-finance-media.ts");
const rights = read("src/data/heritage-photo-license-links.ts");
const route = read("src/routes/texas-living.tsx");
const sources = new Map([
  ["finance", read("src/data/fixtures/finance-evergreen-depth.ts")],
  ["finance3", read("src/data/fixtures/finance-evergreen-depth-3.ts")],
  ["lazy", read("src/data/fixtures/lazy-migrated-editorial.ts")],
  ["wellStub", read("src/data/fixtures/texas-explained-support-stubs-2.ts")],
  ["wellArticle", read("src/data/fixtures/texas-explained-support-articles-2.ts")],
  ["helocArticle", read("src/data/fixtures/finance-heloc-depth.ts")],
]);
const expectations = [
  ["salary-needed-to-buy-a-house-in-texas", "salaryAffordabilityHero", ["finance","lazy"], "Independence_Heights_Residential_HIstoric_District_Houston_(HDR).jpg"],
  ["texas-closing-costs-guide", "homeClosingHero", ["finance","lazy"], "Close-up_of_the_key_with_house_keychain.jpg"],
  ["texas-mortgage-payment-guide", "mortgageFinancingHero", ["finance3","lazy"], "Property_Contract_Law_and_Mortgages.jpg"],
  ["texas-home-equity-heloc-guide", "homeEquityHero", ["finance3","lazy"], ""],
  ["texas-rural-wells-water-guide", "privateWellEquipmentHero", ["wellStub","wellArticle"], "The_Well_(4679680189).jpg"],
];
const fail = [];
const images = new Map();
for (const [slug, name, sourceNames, commonsFile] of expectations) {
  const match = media.match(new RegExp('export const ' + name + ': Article\\["hero"\\] = \\{([\\s\\S]*?)\\n\\};'));
  if (!match) { fail.push(name + " missing shared media definition"); continue; }
  const object = match[1];
  const src = object.match(/\bsrc:\s*"([^"]+)"/)?.[1] ?? "";
  const alt = object.match(/\balt:\s*"([^"]+)"/)?.[1] ?? "";
  const credit = object.match(/\bcredit:\s*"([^"]+)"/)?.[1] ?? "";
  const width = Number(object.match(/\bwidth:\s*(\d+)/)?.[1] ?? 0);
  const height = Number(object.match(/\bheight:\s*(\d+)/)?.[1] ?? 0);
  if (width < 1200 || height < 800 || alt.length < 40 || !credit) {
    fail.push(slug + ": image needs >=1200x800, meaningful alt and source/ownership credit");
  }
  if (images.has(src)) fail.push(slug + " repeats image assigned to " + images.get(src));
  images.set(src, slug);
  if (commonsFile) {
    const photoRef = "File:" + commonsFile;
    if (!src.includes(commonsFile) ||
        !rights.includes('"/article/' + slug + '"') ||
        !rights.includes(photoRef) ||
        !/CC BY/.test(credit)) {
      fail.push(slug + ": missing corresponding rights-cleared photograph or visible license entry");
    }
  } else if (src !== "/images/editorial/texas-heloc-home-equity.jpg") {
    fail.push(slug + ": expected the article's original relevant HELOC infographic");
  }
  for (const sourceName of sourceNames) {
    if (!sources.get(sourceName).includes(name)) fail.push(slug + ": media not shared with " + sourceName);
  }
  if (route.includes("'" + slug + "': {")) fail.push(slug + ": a Texas Life-only override shadows the full article's hero");
}
if (!sources.get("helocArticle").includes('src: "/images/editorial/texas-heloc-home-equity.jpg"')) {
  fail.push("HELOC detail no longer matches the catalog infographic");
}
if (images.size !== 5) fail.push("Expected five distinct repaired Texas Life housing images");
if (fail.length) {
  console.error("Texas Life housing photo quality regression:");
  for (const item of fail) console.error("- " + item);
  process.exit(1);
}
console.log("PASS: five distinct, topic-specific Texas Life housing media assignments with article/catalog consistency and photo rights.");
