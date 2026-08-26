import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent source-provenance validation failed: ${message}`);
  process.exit(1);
};
const requireCondition = (condition, message) => {
  if (!condition) fail(message);
};

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

for (const path of readinessFiles) {
  requireCondition(existsSync(resolve(root, path)), `missing readiness source ${path}`);
}

const readinessText = readinessFiles.map(read).join("\n");
const launchStatuses = [...readinessText.matchAll(/\blaunchStatus:\s*"([^"]+)"/g)].map((match) => match[1]);
const verifiedSourceArrays = [...readinessText.matchAll(/\bverifiedSources:\s*\[([^\]]*)\]/gs)];
const emptyVerifiedSourceArrays = verifiedSourceArrays.filter((match) => !/https:\/\//.test(match[1]));
const reviewedSourceReviews = [...readinessText.matchAll(/sourceReview:\s*\{\s*status:\s*"reviewed"/g)].length;

requireCondition(launchStatuses.length >= 50, `expected at least 50 readiness records; found ${launchStatuses.length}`);
requireCondition(
  verifiedSourceArrays.length === launchStatuses.length,
  `every readiness record must expose verifiedSources; found ${verifiedSourceArrays.length} arrays for ${launchStatuses.length} records`,
);
requireCondition(
  emptyVerifiedSourceArrays.length === 0,
  `${emptyVerifiedSourceArrays.length} readiness record(s) have no reviewed https authority source`,
);
requireCondition(
  reviewedSourceReviews === launchStatuses.length,
  `all readiness records must remain source-reviewed; found ${reviewedSourceReviews} reviewed records for ${launchStatuses.length} profiles`,
);
requireCondition(!launchStatuses.includes("launch-ready"), "source provenance work must not grant launch-ready approval");

const serverPath = "src/data/texas-talent.server.ts";
requireCondition(existsSync(resolve(root, serverPath)), "Texas Talent server loader is missing");
const server = read(serverPath);

requireCondition(
  server.includes("function withReviewedSourceProvenance"),
  "server loader must retain the reviewed-source provenance enrichment helper",
);
requireCondition(
  server.includes("readiness.sourceReview.verifiedSources"),
  "server loader must feed readiness-reviewed authority sources into profile enrichment",
);
requireCondition(
  server.includes("sources: [...existingSources, ...reviewedSources]"),
  "server loader must preserve authored sources and append missing reviewed authority sources",
);
requireCondition(
  server.includes("const existingUrls = new Set(existingSources.map((source) => source.url))"),
  "server loader must deduplicate reviewed authority sources against authored source URLs",
);
requireCondition(
  server.includes("const sourcedProfile = withReviewedSourceProvenance("),
  "server loader must apply reviewed-source provenance before returning profiles",
);
requireCondition(
  /export function loadTexasTalentPublishableProfilesServer\(\)\s*\{\s*return loadTexasTalentProfilesServer\(\)\.filter\(isTexasTalentPublishable\);\s*\}/s.test(server),
  "publication list must continue to use the conservative publishability gate",
);
requireCondition(
  /export function loadTexasTalentProfileForPublicationServer\(slug: string\)\s*\{\s*const profile = loadTexasTalentProfileServer\(slug\);\s*if \(!profile\) return null;\s*return assertTexasTalentPublishable\(profile\);\s*\}/s.test(server),
  "publication detail loader must continue to assert explicit publishability",
);

console.log(
  `Texas Talent source provenance passed: ${launchStatuses.length} readiness records retain reviewed authority sources, and the server loader appends those sources to profile previews without granting publication approval.`,
);
