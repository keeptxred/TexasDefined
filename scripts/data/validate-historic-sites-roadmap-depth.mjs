import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const article = read("src/data/fixtures/historic-sites-roadmap-article.ts");
const loader = read("src/data/fixtures/lazy-explore-feature-articles.ts");
const errors = [];
const slug = "texas-historic-sites-roadmap";

function wordCount(source) {
  const bodyAt = source.indexOf("body: [");
  const body = bodyAt >= 0 ? source.slice(bodyAt) : source;
  const text = [
    ...[...body.matchAll(/text: \"((?:\\.|[^\"\\])*)\"/g)].map((match) => match[1]),
    ...[...body.matchAll(/items: \[([\s\S]*?)\]/g)].map((match) => match[1]),
  ].join(" ");
  return (text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g) ?? []).length;
}

const words = wordCount(article);
const paragraphs = (article.match(/type: \"paragraph\"/g) ?? []).length;
const headings = (article.match(/type: \"heading\"/g) ?? []).length;
const internalLinks = (article.match(/href: \"\//g) ?? []).length;

if (!article.includes(`slug: \"${slug}\"`)) errors.push(`Missing canonical authority article ${slug}`);
if (words < 1200) errors.push(`${slug}: only ${words} body words; minimum is 1200`);
if (paragraphs < 16) errors.push(`${slug}: only ${paragraphs} paragraphs; minimum is 16`);
if (headings < 10) errors.push(`${slug}: only ${headings} headings; minimum is 10`);
if (internalLinks < 4) errors.push(`${slug}: only ${internalLinks} internal links; minimum is 4`);
if (!article.includes('readingMinutes: 8')) errors.push(`${slug}: authority metadata must advertise the expanded eight-minute guide`);
if (!article.includes('sourceName: \"Texas Historical Commission\"')) errors.push(`${slug}: Texas Historical Commission source authority is missing`);
if (!article.includes('sourceUrl: \"https://thc.texas.gov/historic-sites\"')) errors.push(`${slug}: canonical THC historic-sites source URL is missing`);

for (const marker of [
  "Begin with San Antonio's missions, not only the Alamo",
  "Follow colonization and revolution as a route, not a single battlefield",
  "Go to Palo Alto when you are ready for the U.S.-Mexico War",
  "Courthouse squares explain how local Texas government became geography",
  "Do not treat Indigenous, Tejano or Black history as sidebars",
  "Build regional history trips instead of trying to cover Texas at once",
  "Historic-site etiquette is part of understanding the place",
  "Verify the modern visit before chasing the historic past",
]) {
  if (!article.includes(marker)) errors.push(`${slug}: missing researched authority section ${marker}`);
}

for (const factMarker of [
  "San Antonio Missions National Historical Park",
  "San Felipe de Austin",
  "Washington-on-the-Brazos",
  "San Jacinto",
  "Palo Alto Battlefield National Historical Park",
  "Texas Historical Commission's courthouse preservation program",
]) {
  if (!article.includes(factMarker)) errors.push(`${slug}: missing statewide historic-site context ${factMarker}`);
}

for (const href of [
  "/texas-history",
  "/article/texas-courthouses-town-square",
  "/article/texas-main-street-downtowns-guide",
  "/article/texas-railroads-town-growth-explained",
  "/browse/counties",
]) {
  if (!article.includes(`href: \"${href}\"`)) errors.push(`${slug}: missing internal authority link ${href}`);
}

if (!loader.includes(`const historicSitesRoadmapSlug = \"${slug}\"`)) errors.push(`${slug}: dedicated loader contract missing`);
if (!loader.includes('await import("./historic-sites-roadmap-article")')) errors.push(`${slug}: deep authority module is not lazy-loaded`);
if (!loader.includes('slug === historicSitesRoadmapSlug')) errors.push(`${slug}: dedicated authority resolver does not intercept the legacy slug`);
if (!loader.includes('readingMinutes: 8')) errors.push(`${slug}: Explore discovery stub is not aligned to the expanded guide`);

const dedicatedAt = loader.indexOf('await import("./historic-sites-roadmap-article")');
const genericAt = loader.indexOf('await import("./explore-feature-articles")');
if (dedicatedAt < 0 || genericAt < 0 || dedicatedAt > genericAt) {
  errors.push(`${slug}: deep authority module must resolve before the generic legacy Explore feature bundle`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Historic-sites roadmap depth validation passed: ${words} body words, ${paragraphs} paragraphs, ${headings} headings, ${internalLinks} internal links, official source authority and dedicated pre-legacy resolution.`);
