import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");

const lazy = read("src/data/fixtures/lazy-standalone-evergreen.ts");
const history = read("src/routes/texas-history.lazy.tsx");
const brazoria = read("src/data/fixtures/brazoria-plantations-slavery-emancipation-history.ts");
const ima = read("src/data/fixtures/ima-hogg-texas-legacy.ts");
const family = read("src/data/fixtures/hogg-family-texas-legacy.ts");

for (const [slug, source, exportName] of [
  ["ima-hogg-texas-legacy", ima, "imaHoggTexasLegacyArticle"],
  ["hogg-family-texas-legacy", family, "hoggFamilyTexasLegacyArticle"],
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
]) {
  if (!ima.includes(token) && !family.includes(token) && !brazoria.includes(token)) failures.push(`Hogg authority cross-link missing: ${token}`);
}
for (const name of ["Will", "Ima", "Mike", "Tom"]) {
  if (!family.includes(name)) failures.push(`Hogg family page is missing child reference: ${name}`);
}
if (!ima.includes("Hogg Foundation for Mental Health") || !family.includes("Hogg Foundation for Mental Health")) failures.push("Hogg Foundation context must remain on both authority pages.");
if (!ima.includes("Bayou Bend") || !family.includes("Bayou Bend")) failures.push("Bayou Bend context must remain on both authority pages.");
if (!brazoria.includes("/article/hogg-family-texas-legacy") || !brazoria.includes("/article/ima-hogg-texas-legacy")) failures.push("Varner-Hogg supporting article must link to both Hogg authority pages.");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Hogg family authority validation passed.");
