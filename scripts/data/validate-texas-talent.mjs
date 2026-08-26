import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent validation failed: ${message}`);
  process.exit(1);
};
const requireCondition = (condition, message) => {
  if (!condition) fail(message);
};

const profileFiles = [
  "src/data/texas-talent-profiles.ts",
  "src/data/texas-talent-profiles-wave2-music.ts",
  "src/data/texas-talent-profiles-wave2-film.ts",
  "src/data/texas-talent-profiles-wave2-arts.ts",
  "src/data/texas-talent-profiles-wave3.ts",
];

const readinessFiles = [
  "src/data/texas-talent-readiness.ts",
  "src/data/texas-talent-readiness-batch3.ts",
  "src/data/texas-talent-readiness-batch4.ts",
  "src/data/texas-talent-readiness-batch5.ts",
  "src/data/texas-talent-readiness-batch6.ts",
  "src/data/texas-talent-readiness-batch7.ts",
  "src/data/texas-talent-readiness-batch8.ts",
  "src/data/texas-talent-readiness-batch9.ts",
  "src/data/texas-talent-readiness-batch10.ts",
  "src/data/texas-talent-readiness-batch11.ts",
  "src/data/texas-talent-readiness-batch12.ts",
];

for (const path of [...profileFiles, ...readinessFiles]) {
  requireCondition(existsSync(resolve(root, path)), `missing required source file ${path}`);
}

function findBalancedBlock(text, start, openChar, closeChar, context) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === openChar) depth += 1;
    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return text.slice(start, index + 1);
    }
  }

  fail(`${context} did not close cleanly`);
}

function extractProfileBlocks(path) {
  const text = read(path);
  const declaration = /export const\s+[A-Z0-9_]+:\s*readonly\s+TexasTalentProfile\[\]\s*=\s*\[/g.exec(text);
  requireCondition(Boolean(declaration), `${path} is missing its exported TexasTalentProfile[] array`);

  const arrayStart = declaration.index + declaration[0].lastIndexOf("[");
  const arrayText = findBalancedBlock(text, arrayStart, "[", "]", `${path} profile array`);
  const blocks = [];
  let squareDepth = 0;
  let curlyDepth = 0;
  let objectStart = -1;
  let quote = null;
  let escaped = false;

  for (let index = 0; index < arrayText.length; index += 1) {
    const char = arrayText[index];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") {
      squareDepth += 1;
      continue;
    }
    if (char === "]") {
      squareDepth -= 1;
      continue;
    }
    if (char === "{") {
      if (squareDepth === 1 && curlyDepth === 0) objectStart = index;
      curlyDepth += 1;
      continue;
    }
    if (char === "}") {
      curlyDepth -= 1;
      if (squareDepth === 1 && curlyDepth === 0 && objectStart >= 0) {
        blocks.push(arrayText.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }

  return blocks;
}

function extractReadinessRegistry(path) {
  const text = read(path);
  const declaration = /export const\s+TEXAS_TALENT_READINESS(?:_BATCH\d+)?:\s*Readonly<Record<string, TexasTalentReadinessRecord>>\s*=\s*\{/g.exec(text);
  requireCondition(Boolean(declaration), `${path} is missing its exported readiness registry`);

  const objectStart = declaration.index + declaration[0].lastIndexOf("{");
  const registryText = findBalancedBlock(text, objectStart, "{", "}", `${path} readiness registry`);
  const slugs = [...registryText.matchAll(/^ {2}(?:"([^"]+)"|([a-z][a-z0-9-]*)):\s*\{/gm)]
    .map((match) => match[1] ?? match[2]);

  return { registryText, slugs };
}

const profileBlocks = profileFiles.flatMap(extractProfileBlocks);
const profileSlugs = profileBlocks.map((block, index) => {
  const slug = /\bslug:\s*"([^"]+)"/.exec(block)?.[1];
  requireCondition(Boolean(slug), `profile record ${index + 1} is missing a slug`);
  return slug;
});

const readinessRegistries = readinessFiles.map(extractReadinessRegistry);
const readinessRegistryText = readinessRegistries.map((registry) => registry.registryText).join("\n");
const readinessSlugs = readinessRegistries.flatMap((registry) => registry.slugs);

requireCondition(profileBlocks.length >= 50, `expected at least 50 profile records; found ${profileBlocks.length}`);
requireCondition(profileSlugs.length === profileBlocks.length, "every profile record must expose exactly one top-level slug");
requireCondition(new Set(profileSlugs).size === profileSlugs.length, "profile slugs must be unique");
requireCondition(
  readinessSlugs.length === profileSlugs.length,
  `readiness coverage must match profile inventory exactly; found ${readinessSlugs.length} readiness records for ${profileSlugs.length} profiles`,
);
requireCondition(new Set(readinessSlugs).size === readinessSlugs.length, "readiness slugs must be unique");

const profileSet = new Set(profileSlugs);
const readinessSet = new Set(readinessSlugs);
const missingReadiness = profileSlugs.filter((slug) => !readinessSet.has(slug));
const orphanReadiness = readinessSlugs.filter((slug) => !profileSet.has(slug));
requireCondition(missingReadiness.length === 0, `profiles missing readiness records: ${missingReadiness.join(", ")}`);
requireCondition(orphanReadiness.length === 0, `readiness records without profiles: ${orphanReadiness.join(", ")}`);

const structuralFields = ["overview", "definingWorks", "timeline", "legacy", "texasPlaces", "sources"];
for (const [index, block] of profileBlocks.entries()) {
  const slug = profileSlugs[index];
  for (const field of structuralFields) {
    requireCondition(new RegExp(`\\b${field}:\\s*\\[`).test(block), `${slug} is missing required ${field} content`);
  }
  requireCondition(/\bprofileStatus:\s*"(?:planned|researching|ready)"/.test(block), `${slug} is missing a valid profileStatus`);
  requireCondition(/\blastReviewedAt:\s*/.test(block), `${slug} is missing lastReviewedAt`);
}

const sourceReviews = [...readinessRegistryText.matchAll(/sourceReview:\s*\{\s*status:\s*"reviewed"/g)].length;
const imageReviews = [...readinessRegistryText.matchAll(/imageReview:\s*\{\s*status:\s*"verified"/g)].length;
const heroImages = [...readinessRegistryText.matchAll(/\bheroImage:\s*\{/g)].length;
const sourceUrls = [...readinessRegistryText.matchAll(/\bsourceUrl:\s*"https:\/\//g)].length;
const licenseLabels = [...readinessRegistryText.matchAll(/\blicenseLabel:\s*"[^"]+"/g)].length;
const rightsNotes = [...readinessRegistryText.matchAll(/\brightsNote:\s*"[^"]+"/g)].length;
const internalReviews = [...readinessRegistryText.matchAll(/\binternalLinkReview:\s*\{/g)].length;
const launchStatuses = [...readinessRegistryText.matchAll(/\blaunchStatus:\s*"([^"]+)"/g)].map((match) => match[1]);
const expected = profileSlugs.length;

requireCondition(sourceReviews === expected, `all ${expected} profiles must have reviewed source records; found ${sourceReviews}`);
requireCondition(imageReviews === expected, `all ${expected} profiles must have verified image reviews; found ${imageReviews}`);
requireCondition(heroImages === expected, `all ${expected} profiles must have a cleared hero/context image; found ${heroImages}`);
requireCondition(sourceUrls >= expected, `all cleared images must retain source URLs; found ${sourceUrls}`);
requireCondition(licenseLabels >= expected, `all cleared images must retain license labels; found ${licenseLabels}`);
requireCondition(rightsNotes >= expected, `all cleared images must retain rights notes; found ${rightsNotes}`);
requireCondition(internalReviews === expected, `all ${expected} profiles must have internal-link review records; found ${internalReviews}`);
requireCondition(launchStatuses.length === expected, `all ${expected} profiles must have launch status; found ${launchStatuses.length}`);
requireCondition(!launchStatuses.includes("launch-ready"), "hidden build must not grant launch-ready editorial approval");

const adminRoute = read("src/routes/admin.texas-talent.tsx");
const adminPage = read("src/routes/admin.texas-talent.lazy.tsx");
const publicRoutes = read("src/lib/public-routes.ts");
const sitemapRoute = read("src/routes/sitemap[.]xml.ts");
const serverLoader = read("src/data/texas-talent.server.ts");
const talentDefinition = read("src/data/texas-talent.ts");
const bannerPath = resolve(root, "public/images/editorial/texas-talent-hero.webp");

requireCondition(
  adminRoute.includes("noindex, nofollow, noarchive"),
  "admin Texas Talent route must remain noindex, nofollow, noarchive",
);
requireCondition(
  !existsSync(resolve(root, "src/routes/texas-talent.tsx")) && !existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx")),
  "public Texas Talent hub route must remain absent until explicit launch work",
);
requireCondition(!publicRoutes.includes('"/texas-talent"'), "Texas Talent must not be classified as an indexable public route before launch");
requireCondition(!sitemapRoute.includes("texas-talent"), "Texas Talent must remain absent from sitemap generation before launch");
requireCondition(existsSync(bannerPath), "approved Texas Talent banner asset is missing");
requireCondition(adminPage.includes("/images/editorial/texas-talent-hero.webp"), "hidden workbench must render the approved Texas Talent banner");
requireCondition(
  talentDefinition.includes('TEXAS_TALENT_TAGLINE = "The Stars of Texas Shine Bright"'),
  "Texas Talent tagline contract changed unexpectedly",
);

for (const path of readinessFiles.slice(1)) {
  const match = /texas-talent-readiness-(batch\d+)\.ts$/.exec(path);
  if (!match) continue;
  const constant = `TEXAS_TALENT_READINESS_${match[1].toUpperCase()}`;
  requireCondition(serverLoader.includes(constant), `server readiness registry does not include ${constant}`);
}

requireCondition(
  /export function loadTexasTalentPublishableProfilesServer\(\)\s*\{\s*return loadTexasTalentProfilesServer\(\)\.filter\(isTexasTalentPublishable\);\s*\}/s.test(serverLoader),
  "publication list must continue to use conservative stored readiness",
);
requireCondition(
  /export function loadTexasTalentProfileForPublicationServer\(slug: string\)\s*\{\s*const profile = loadTexasTalentProfileServer\(slug\);\s*if \(!profile\) return null;\s*return assertTexasTalentPublishable\(profile\);\s*\}/s.test(serverLoader),
  "publication detail loader must continue to assert stored publishability",
);

console.log(
  `Texas Talent launch contract passed: ${expected} profiles with one-to-one readiness coverage, ${sourceReviews} source reviews, ${imageReviews} image reviews and ${heroImages} cleared images; public launch remains disabled.`,
);
