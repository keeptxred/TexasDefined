import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src/data");

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function filesMatching(re) {
  return fs.readdirSync(dataDir)
    .filter((name) => re.test(name))
    .map((name) => path.join(dataDir, name));
}

function concatFiles(paths) {
  return paths.map((p) => fs.readFileSync(p, "utf8")).join("\n");
}

function slugSetFrom(text) {
  return new Set([...text.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]));
}

function fail(message) {
  console.error(`Painted Churches pre-index authority gate: ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

const catalogText = [
  read("src/data/painted-churches.ts"),
  read("src/data/painted-churches-expanded-legacy.ts"),
  read("src/data/painted-churches-preindex-expansion.ts"),
].join("\n");
const verified = slugSetFrom(catalogText);

const profileText = concatFiles(filesMatching(/^painted-church-profiles.*\.ts$/));
const researchText = concatFiles(filesMatching(/^painted-church-research.*\.ts$/));
const visitorText = concatFiles(filesMatching(/^painted-church-visitor-status.*\.ts$/));
const mapText = concatFiles(filesMatching(/^painted-church-map-points.*\.ts$/));

const profiles = slugSetFrom(profileText);
const research = slugSetFrom(researchText);
const visitors = slugSetFrom(visitorText);
const mapPoints = slugSetFrom(mapText);

assert(verified.size >= 33, `expected at least 33 verified churches in the pre-index authority corpus; found ${verified.size}`);

for (const slug of [...verified].sort()) {
  assert(profiles.has(slug), `${slug} is verified but has no substantive profile record`);
  assert(research.has(slug), `${slug} is verified but has no research dossier record`);
  assert(visitors.has(slug), `${slug} is verified but has no explicit visitor-evidence record`);
  assert(mapPoints.has(slug), `${slug} is verified but has no sourced map-point record`);
}

const detailRoute = read("src/routes/explore.painted-churches.$slug.tsx");
assert(detailRoute.includes("canonicalPaintedChurchProfileBySlug"), "church detail route must use the canonical profile resolver");
assert(detailRoute.includes("canonicalPaintedChurchGalleryBySlug"), "church detail route must use the canonical gallery resolver");
assert(!detailRoute.includes("paintedChurchProfileBySlug(params.slug) ??"), "church detail route still contains the legacy profile-resolution chain");
assert(!detailRoute.includes('aria-labelledby="photo-gallery"'), "church detail route still renders a duplicate inline gallery");

const dossier = read("src/components/editorial/PaintedChurchResearchDossier.tsx");
assert(dossier.includes("canonicalPaintedChurchResearchBySlug"), "research dossier must use the canonical research resolver");
assert(dossier.includes("canonicalPaintedChurchProfileBySlug"), "research dossier must use the canonical profile resolver");

const visitorResolver = read("src/data/painted-church-visitor-status.ts");
assert(visitorResolver.includes("Missing explicit visitor-status research"), "visitor resolver must fail closed instead of inventing a generic fallback");

const nomination = read("src/data/painted-church-thematic-nomination.ts");
assert(nomination.includes("galveston-st-joseph-church"), "thematic nomination evidence must retain Galveston St. Joseph as the historical fifteenth church");
assert(nomination.includes("historicalGroupSize: 15"), "thematic nomination evidence must preserve the historical 15-church count");

const howMany = read("src/routes/explore.painted-churches.how-many.tsx");
assert(howMany.includes("St. Joseph's in Galveston"), "count explainer must resolve the historical 14-versus-15 discrepancy");

const deploy = read(".github/workflows/deploy-production.yml");
assert(deploy.includes("PUBLIC_INDEXING_ENABLED"), "production workflow must explicitly gate search publication");
assert(deploy.includes("if: ${{ vars.PUBLIC_INDEXING_ENABLED == 'true' }}"), "IndexNow must remain disabled unless PUBLIC_INDEXING_ENABLED=true");

const expansion = read("src/data/painted-churches-preindex-expansion.ts");
for (const slug of [
  "palestine-first-presbyterian-church",
  "houston-annunciation-catholic-church",
  "waco-st-francis-on-the-brazos",
  "san-antonio-immaculate-heart-of-mary",
  "mason-st-joseph-catholic-church",
]) {
  assert(expansion.includes(`slug: \"${slug}\"`), `${slug} missing from pre-index expansion layer`);
}

const people = concatFiles(filesMatching(/^painted-church-people.*\.ts$/));
for (const contributor of [
  "pedro-juan-barcelo",
  "nicholas-j-clayton",
  "charles-sebastian-ott",
  "joseph-bleicke",
  "bartola-ihm-san-antonio",
  "fr-alberto-domingo",
  "manuel-lopez-mason",
  "murals-by-jericho",
  "stabat-mater-foundation",
]) {
  assert(people.includes(`slug: \"${contributor}\"`), `missing contributor authority record: ${contributor}`);
}

if (!process.exitCode) {
  console.log(`Painted Churches pre-index authority gate passed for ${verified.size} verified churches.`);
}
