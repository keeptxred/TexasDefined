import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");

const lazy = read("src/data/fixtures/lazy-standalone-evergreen.ts");
const history = read("src/routes/texas-history.lazy.tsx");
const brazoria = read("src/data/fixtures/brazoria-plantations-slavery-emancipation-history.ts");
const ima = read("src/data/fixtures/ima-hogg-texas-legacy.ts");
const family = read("src/data/fixtures/hogg-family-texas-legacy.ts");
const will = read("src/data/fixtures/will-hogg-texas-legacy.ts");
const foundation = read("src/data/fixtures/hogg-foundation-mental-health-texas-history.ts");
const james = read("src/data/texas-icons-research-history-7.server.ts");
const iconTypes = read("src/data/texas-icons-types.ts");
const iconRoute = read("src/routes/texas-icons_.$slug.tsx");
const destinations = read("src/data/hogg-legacy-destinations.ts");
const destinationCatalog = read("src/data/destination-preserved-catalog.ts");

for (const [slug, source, exportName] of [
  ["ima-hogg-texas-legacy", ima, "imaHoggTexasLegacyArticle"],
  ["hogg-family-texas-legacy", family, "hoggFamilyTexasLegacyArticle"],
  ["will-hogg-texas-legacy", will, "willHoggTexasLegacyArticle"],
  ["hogg-foundation-mental-health-texas-history", foundation, "hoggFoundationMentalHealthHistoryArticle"],
]) {
  if (!source.includes(`slug: "${slug}"`)) failures.push(`Missing Hogg authority slug: ${slug}`);
  if (!source.includes(`export const ${exportName}`)) failures.push(`Missing Hogg authority export: ${exportName}`);
  if (!source.includes('category: "texas-history"')) failures.push(`Hogg authority page must remain in texas-history: ${slug}`);
  if (!source.includes("sourceName:") || !source.includes("sourceUrl:")) failures.push(`Hogg authority page must retain source attribution: ${slug}`);
  if (!lazy.includes(`slug: "${slug}"`)) failures.push(`Hogg authority page is missing repository stub: ${slug}`);
  if (!lazy.includes(`import("./${slug}")`)) failures.push(`Hogg authority page is not lazy-loaded: ${slug}`);
  if (!history.includes(`slug: "${slug}"`)) failures.push(`Hogg authority page is missing Texas History discovery: ${slug}`);
}
for (const token of [
  "/texas-icons/james-hogg",
  "/destination/varner-hogg-plantation",
  "/article/hogg-family-texas-legacy",
  "/article/ima-hogg-texas-legacy",
  "/article/will-hogg-texas-legacy",
  "/article/hogg-foundation-mental-health-texas-history",
  "/destination/bayou-bend-collection-gardens",
  "/destination/winedale-historical-center",
]) {
  if (!ima.includes(token) && !family.includes(token) && !brazoria.includes(token)) failures.push(`Hogg authority cross-link missing: ${token}`);
}
for (const name of ["Will", "Ima", "Mike", "Tom"]) {
  if (!family.includes(name)) failures.push(`Hogg family page is missing child reference: ${name}`);
}
if (!will.includes("William Clifford 'Will' Hogg") || !will.includes("River Oaks") || !will.includes("Hogg Foundation for Mental Health")) failures.push("Will Hogg authority page must retain biography, River Oaks and Hogg Foundation context.");
if (!will.includes("https://www.tshaonline.org/handbook/entries/hogg-william-clifford")) failures.push("Will Hogg authority page must retain its Handbook of Texas source.");
if (!foundation.includes("https://hogg.utexas.edu/about/history") || !foundation.includes("established at The University of Texas at Austin in 1940") || !foundation.includes("Will Hogg endowment was transferred")) failures.push("Hogg Foundation authority page must retain official-source founding chronology.");
if (!foundation.includes("administrative unit of The University of Texas at Austin") || !foundation.includes("community-level change")) failures.push("Hogg Foundation authority page must retain present-day institutional context.");
if (!james.includes('relatedLinks: [') || !james.includes('/article/hogg-family-texas-legacy') || !james.includes('/article/hogg-foundation-mental-health-texas-history')) failures.push("James Hogg profile must retain reciprocal family-authority links.");
if (!iconTypes.includes("relatedLinks?: readonly") || !iconRoute.includes("Continue the story") || !iconRoute.includes("profile.relatedLinks")) failures.push("Texas Icons related-reading renderer must remain available for reciprocal authority links.");
for (const slug of ["bayou-bend-collection-gardens", "winedale-historical-center"]) {
  if (!destinations.includes(`slug: "${slug}"`)) failures.push(`Missing Hogg legacy destination: ${slug}`);
  if (!destinationCatalog.includes("hoggLegacyDestinations")) failures.push("Hogg legacy destinations must remain registered in the preserved destination catalog.");
}
for (const marker of [
  "Postoak · Public domain · Wikimedia Commons",
  "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  'officialUrl: "https://www.mfah.org/visit/bayou-bend"',
  'officialUrl: "https://briscoecenter.org/visit/winedale/"',
]) if (!destinations.includes(marker)) failures.push(`Hogg legacy destination governance marker missing: ${marker}`);

if (!ima.includes("Hogg Foundation for Mental Health") || !family.includes("Hogg Foundation for Mental Health")) failures.push("Hogg Foundation context must remain on both authority pages.");
if (!ima.includes("Bayou Bend") || !family.includes("Bayou Bend")) failures.push("Bayou Bend context must remain on both authority pages.");
if (!brazoria.includes("/article/hogg-family-texas-legacy") || !brazoria.includes("/article/ima-hogg-texas-legacy")) failures.push("Varner-Hogg supporting article must link to both Hogg authority pages.");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Hogg family authority validation passed.");
