import fs from "node:fs";
import path from "node:path";

const launchPath = "src/data/texas-icons-launch.ts";
const dataDir = "src/data";
const rosterPath = "src/data/texas-icons-roster.server.ts";
const holdsPath = "src/data/texas-icons-editorial-holds.server.ts";
const functionsPath = "src/data/texas-icons.functions.ts";
const routePath = "src/routes/texas-icons_.$slug.tsx";
const hubPath = "src/routes/texas-icons.tsx";
const sitemapPath = "src/routes/sitemap[.]xml.ts";
const publicRoutesPath = "src/lib/public-routes.ts";
const typesPath = "src/data/texas-icons-types.ts";
const readinessPath = "scripts/data/validate-texas-icons-readiness.mjs";

const expectedSlugs = [
  "lyndon-b-johnson",
  "george-w-bush",
  "barbara-jordan",
  "george-h-w-bush",
  "ann-richards",
  "nolan-ryan",
  "simone-biles",
  "tom-landry",
  "earl-campbell",
  "george-foreman",
];
const failures = [];

for (const requiredPath of [
  launchPath,
  rosterPath,
  holdsPath,
  functionsPath,
  routePath,
  hubPath,
  sitemapPath,
  publicRoutesPath,
  typesPath,
  readinessPath,
]) {
  if (!fs.existsSync(requiredPath)) failures.push(`Missing Texas Icons launch contract file: ${requiredPath}`);
}
if (failures.length) fail();

const launch = fs.readFileSync(launchPath, "utf8");
const roster = fs.readFileSync(rosterPath, "utf8");
const holds = fs.readFileSync(holdsPath, "utf8");
const functions = fs.readFileSync(functionsPath, "utf8");
const route = fs.readFileSync(routePath, "utf8");
const hub = fs.readFileSync(hubPath, "utf8");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const publicRoutes = fs.readFileSync(publicRoutesPath, "utf8");
const types = fs.readFileSync(typesPath, "utf8");
const readiness = fs.readFileSync(readinessPath, "utf8");

const launchSlugs = [...launch.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)].map((match) => match[1]);
if (!sameArray(launchSlugs, expectedSlugs)) {
  failures.push(`Launch cohort must remain the reviewed ten-profile set; found: ${launchSlugs.join(", ")}.`);
}
if (new Set(launchSlugs).size !== launchSlugs.length) failures.push("Launch cohort contains duplicate slugs.");
if (!launch.includes('const approvedAt = "2026-08-29";')) failures.push("Launch cohort must retain its explicit owner-approval date.");
if ((launch.match(/sourceReviewCertified:\s*true/g) ?? []).length !== expectedSlugs.length) failures.push("Every launch profile must certify source review.");
if ((launch.match(/internalLinksCertified:\s*true/g) ?? []).length !== expectedSlugs.length) failures.push("Every launch profile must certify internal links.");
if ((launch.match(/imagePolicy:\s*"text-only-no-profile-image"/g) ?? []).length !== expectedSlugs.length) failures.push("Every launch profile must use the text-only/no-profile-image rights policy.");

const canonicalBlock = roster.match(/const CANONICAL_PATHS:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] ?? "";
const canonicalSlugs = new Set(
  [...canonicalBlock.matchAll(/^\s{2}"([^"]+)":\s*"\//gm)].map((match) => slugify(match[1])),
);
const holdBlock = holds.match(/const TEXAS_ICON_EDITORIAL_HOLD_SUMMARIES:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] ?? "";
const holdSlugs = new Set([...holdBlock.matchAll(/^\s{2}"([^"]+)":/gm)].map((match) => match[1]));

const talentSlugs = new Set();
for (const file of fs.readdirSync(dataDir).filter((name) => /^texas-talent-profiles.*\.ts$/.test(name))) {
  const source = fs.readFileSync(path.join(dataDir, file), "utf8");
  for (const match of source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)) talentSlugs.add(match[1]);
}

const researchBySlug = new Map();
for (const file of fs.readdirSync(dataDir).filter((name) => /^texas-icons-research-.*\.server\.ts$/.test(name))) {
  const source = fs.readFileSync(path.join(dataDir, file), "utf8");
  const matches = [...source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)];
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? source.lastIndexOf("];\n");
    researchBySlug.set(match[1], { file, block: source.slice(start, end > start ? end : source.length) });
  }
}

for (const slug of expectedSlugs) {
  if (canonicalSlugs.has(slug)) failures.push(`${slug} has a stronger editorial canonical owner and must not launch as an Icons research profile.`);
  if (talentSlugs.has(slug)) failures.push(`${slug} has a Texas Talent owner and must not launch as a duplicate Icons research profile.`);
  if (holdSlugs.has(slug)) failures.push(`${slug} is under an editorial hold and must fail closed.`);

  const research = researchBySlug.get(slug);
  if (!research) {
    failures.push(`${slug} has no staged research owner.`);
    continue;
  }
  const { file, block } = research;
  if (!/editorialStatus:\s*"researched-staged"/.test(block)) failures.push(`${file}:${slug} must keep its stored research status staged.`);
  const sourceCount = (block.match(/url:\s*"https:\/\//g) ?? []).length;
  if (sourceCount < 3) failures.push(`${file}:${slug} needs at least three HTTPS research sources; found ${sourceCount}.`);
  const timelineCount = (block.match(/\{\s*year:\s*"/g) ?? []).length;
  if (timelineCount < 5) failures.push(`${file}:${slug} needs at least five timeline milestones; found ${timelineCount}.`);
  const placeSection = block.match(/texasPlaces:\s*\[([\s\S]*?)\],\s*sources:/)?.[1] ?? "";
  const placeCount = (placeSection.match(/\{\s*name:\s*"/g) ?? []).length;
  if (placeCount < 2) failures.push(`${file}:${slug} needs at least two Texas-place connections; found ${placeCount}.`);
  const overviewSection = block.match(/overview:\s*\[([\s\S]*?)\],\s*definingWorks:/)?.[1] ?? "";
  const overviewParagraphs = (overviewSection.match(/"(?:\\.|[^"\\])*"/g) ?? []).length;
  if (overviewParagraphs < 2) failures.push(`${file}:${slug} needs at least two overview paragraphs; found ${overviewParagraphs}.`);
  const legacySection = block.match(/legacy:\s*\[([\s\S]*?)\],\s*texasPlaces:/)?.[1] ?? "";
  const legacyParagraphs = (legacySection.match(/"(?:\\.|[^"\\])*"/g) ?? []).length;
  if (legacyParagraphs < 2) failures.push(`${file}:${slug} needs at least two legacy paragraphs; found ${legacyParagraphs}.`);
  const visibleWordEstimate = [overviewSection, legacySection, placeSection]
    .join(" ")
    .replace(/https?:\/\/\S+/g, " ")
    .match(/[A-Za-z0-9][A-Za-z0-9'’.-]*/g)?.length ?? 0;
  if (visibleWordEstimate < 250) failures.push(`${file}:${slug} launch-depth estimate is too small (${visibleWordEstimate} words across narrative/place sections).`);
}

if (!functions.includes("applyTexasIconLaunchCertification")) failures.push("Texas Icons server-function presentation boundary must apply launch certification after ownership resolution.");
if (!functions.includes('entry.reuseKind === "icon-research-ready"')) failures.push("Texas Icons hub stats must count certified researched profiles explicitly.");
if (!functions.includes("entry.indexableAtOwnRoute")) failures.push("Texas Icons launch stats must preserve explicit route indexability accounting.");

if (!route.includes('icon.reuseKind === "icon-research-ready"')) failures.push("Texas Icons profile route must distinguish certified research from staged drafts.");
if (!route.includes('icon.reuseKind === "icon-research-staged"')) failures.push("Texas Icons profile route must keep staged draft handling intact.");
if (!route.includes("robots: loaderData.icon.indexableAtOwnRoute")) failures.push("Texas Icons robots metadata must remain tied to the resolved indexability flag.");
if (/<img\b/i.test(route)) failures.push("Certified launch cohort uses a text-only image policy, but the Texas Icons profile route renders an img element.");
if (!route.includes("ResearchDraftNotice") || !route.includes("PublishedResearchNotice")) failures.push("Profile route must retain separate staged and published research notices.");

if (!hub.includes('kind === "icon-research-ready"')) failures.push("Texas Icons hub must visibly distinguish published researched profiles.");
if (!hub.includes("stats.researchedReady")) failures.push("Texas Icons hub must surface the published researched-profile count.");

if (!sitemap.includes("TEXAS_ICON_LAUNCH_CERTIFICATIONS")) failures.push("Sitemap must source certified Texas Icons launch entries from the launch registry.");
if (!sitemap.includes("`/texas-icons/${entry.slug}`")) failures.push("Sitemap must emit certified Texas Icons child paths.");
if (!publicRoutes.includes("/^\\/texas-icons\\/[a-z0-9-]+$/")) failures.push("Public route governance must continue to allow Texas Icons child routes.");

for (const token of ["history-politics", "sports", "/texas-history", "/texas-sports"]) {
  if (!types.includes(token)) failures.push(`Launch cohort requires category authority-link token: ${token}.`);
}
if (!route.includes("getTexasIconProfile") || !route.includes("related.map")) failures.push("Launch cohort must retain profile and related-profile internal links.");
if (!readiness.includes('editorialStatus \\"researched-staged\\"') && !readiness.includes('editorialStatus "researched-staged"')) {
  failures.push("The independent staged-readiness validator must remain present and locked to stored researched-staged records.");
}

if (failures.length) fail();
console.log(`Texas Icons launch validation passed: ${expectedSlugs.length} certified text-only profiles have staged source owners, no stronger owner conflicts, substantive narrative structure, 3+ HTTPS sources, category/related internal links, indexable presentation state and sitemap inclusion.`);

function sameArray(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fail() {
  console.error("Texas Icons launch validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
