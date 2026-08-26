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
];

for (const path of [...profileFiles, ...readinessFiles]) {
  requireCondition(existsSync(resolve(root, path)), `missing required source file ${path}`);
}

function extractProfileBlocks(path) {
  const text = read(path);
  const declaration = /export const\s+[A-Z0-9_]+:\s*readonly\s+TexasTalentProfile\[\]\s*=\s*\[/g.exec(text);
  requireCondition(Boolean(declaration), `${path} is missing its exported TexasTalentProfile[] array`);

  const arrayStart = declaration.index + declaration[0].lastIndexOf("[");
  let squareDepth = 0;
  let curlyDepth = 0;
  let objectStart = -1;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  const blocks = [];

  for (let index = arrayStart; index < text.length; index += 1) {
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

    if (char === "[") {
      squareDepth += 1;
      continue;
    }
    if (char === "]") {
      squareDepth -= 1;
      if (squareDepth === 0) break;
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
        blocks.push(text.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }

  requireCondition(squareDepth === 0, `${path} profile array did not close cleanly`);
  return blocks;
}

const profileBlocks = profileFiles.flatMap(extractProfileBlocks);
const profileSlugs = profileBlocks.map((block, index) => {
  const slug = /\bslug:\s*"([^"]+)"/.exec(block)?.[1];
  requireCondition(Boolean(slug), `profile record ${index + 1} is missing a slug`);
  return slug;
});

const readinessText = readinessFiles.map(read).join("\n");
const readinessSlugs = readinessFiles.flatMap((path) =>
  [...read(path).matchAll(/^ {2}(?:"([^"]+)"|([a-z][a-z0-9-]*)):\s*\{/gm)]
    .map((match) => match[1] ?? match[2]),
);

const profileSet = new Set(profileSlugs);
const readinessSet = new Set(readinessSlugs);
const missingReadiness = profileSlugs.filter((slug) => !readinessSet.has(slug));
const orphanReadiness = readinessSlugs.filter((slug) => !profileSet.has(slug));
requireCondition(missingReadiness.length === 0, `profiles missing readiness records: ${missingReadiness.join(", ")}`);
requireCondition(orphanReadiness.length === 0, `readiness records without profiles: ${orphanReadiness.join(", ")}`);

requireCondition(profileBlocks.length === 50, `expected 50 profile records; found ${profileBlocks.length}`);
requireCondition(profileSlugs.length === 50, `expected 50 profile slugs; found ${profileSlugs.length}`);
requireCondition(new Set(profileSlugs).size === 50, "profile slugs must be unique");
requireCondition(readinessSlugs.length === 50, `expected 50 readiness records; found ${readinessSlugs.length}`);
requireCondition(new Set(readinessSlugs).size === 50, "readiness slugs must be unique");

const structuralFields = ["overview", "definingWorks", "timeline", "legacy", "texasPlaces", "sources"];
for (const [index, block] of profileBlocks.entries()) {
  const slug = profileSlugs[index];
  for (const field of structuralFields) {
    requireCondition(
      new RegExp(`\\b${field}:\\s*\\[`).test(block),
      `${slug} is missing required ${field} content`,
    );
  }
  requireCondition(/\bprofileStatus:\s*"(?:planned|researching|ready)"/.test(block), `${slug} is missing a valid profileStatus`);
  requireCondition(/\blastReviewedAt:\s*/.test(block), `${slug} is missing lastReviewedAt`);
}

const sourceReviews = [...readinessText.matchAll(/sourceReview:\s*\{\s*status:\s*"reviewed"/g)].length;
const imageReviews = [...readinessText.matchAll(/imageReview:\s*\{\s*status:\s*"verified"/g)].length;
const heroImages = [...readinessText.matchAll(/\bheroImage:\s*\{/g)].length;
const internalReviews = [...readinessText.matchAll(/\binternalLinkReview:\s*\{/g)].length;
const launchStatuses = [...readinessText.matchAll(/\blaunchStatus:\s*"([^"]+)"/g)].map((match) => match[1]);

requireCondition(sourceReviews === 50, `all 50 profiles must have reviewed source records; found ${sourceReviews}`);
requireCondition(imageReviews === 50, `all 50 profiles must have verified image reviews; found ${imageReviews}`);
requireCondition(heroImages === 50, `all 50 profiles must have a cleared hero image/context image; found ${heroImages}`);
requireCondition(internalReviews === 50, `all 50 profiles must have internal-link review records; found ${internalReviews}`);
requireCondition(launchStatuses.length === 50, `all 50 profiles must have launch status; found ${launchStatuses.length}`);
requireCondition(!launchStatuses.includes("launch-ready"), "hidden build must not grant launch-ready editorial approval");

const adminRoute = read("src/routes/admin.texas-talent.tsx");
const adminPage = read("src/routes/admin.texas-talent.lazy.tsx");
const publicRoutes = read("src/lib/public-routes.ts");
const serverLoader = read("src/data/texas-talent.server.ts");
const talentDefinition = read("src/data/texas-talent.ts");
const bannerPath = resolve(root, "public/images/editorial/texas-talent-hero.webp");

requireCondition(
  adminRoute.includes('noindex, nofollow, noarchive'),
  "admin Texas Talent route must remain noindex, nofollow, noarchive",
);
requireCondition(
  !existsSync(resolve(root, "src/routes/texas-talent.tsx")) &&
    !existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx")),
  "public Texas Talent hub route must remain absent until explicit launch work",
);
requireCondition(
  !publicRoutes.includes('"/texas-talent"'),
  "Texas Talent must not be classified as an indexable public route before launch",
);
requireCondition(existsSync(bannerPath), "approved Texas Talent banner asset is missing");
requireCondition(
  adminPage.includes('/images/editorial/texas-talent-hero.webp'),
  "hidden workbench must render the approved Texas Talent banner",
);
requireCondition(
  talentDefinition.includes('TEXAS_TALENT_TAGLINE = "The Stars of Texas Shine Bright"'),
  "Texas Talent tagline contract changed unexpectedly",
);

requireCondition(
  /export function loadTexasTalentPublishableProfilesServer\(\)\s*\{\s*return loadTexasTalentProfilesServer\(\)\.filter\(isTexasTalentPublishable\);\s*\}/s.test(serverLoader),
  "publication list must continue to use conservative stored readiness",
);
requireCondition(
  /export function loadTexasTalentProfileForPublicationServer\(slug: string\)\s*\{\s*const profile = loadTexasTalentProfileServer\(slug\);\s*if \(!profile\) return null;\s*return assertTexasTalentPublishable\(profile\);\s*\}/s.test(serverLoader),
  "publication detail loader must continue to assert stored publishability",
);

console.log(
  `Texas Talent launch contract passed: ${profileSlugs.length} profiles, ${sourceReviews} source reviews, ${imageReviews} image reviews, ${heroImages} cleared hero/context images; public launch remains disabled.`,
);
