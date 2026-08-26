import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent editorial-status validation failed: ${message}`);
  process.exit(1);
};

const expectedCohort = [
  "willie-nelson",
  "selena",
  "buddy-holly",
  "beyonce",
  "matthew-mcconaughey",
  "george-strait",
  "stevie-ray-vaughan",
  "janis-joplin",
  "waylon-jennings",
  "roy-orbison",
  "jamie-foxx",
  "woody-harrelson",
  "tommy-lee-jones",
  "wes-anderson",
  "robert-rodriguez",
  "ornette-coleman",
  "townes-van-zandt",
  "lightnin-hopkins",
  "lead-belly",
  "billy-gibbons",
  "eva-longoria",
  "renee-zellweger",
  "ethan-hawke",
  "dennis-quaid",
  "sissy-spacek",
];

const statusSource = read("src/data/texas-talent-editorial-status.ts");
const statusSlugs = [...statusSource.matchAll(/^  (?:"([^"]+)"|([a-z][a-z0-9-]*)):\s*\{\s*profileStatus:\s*"ready",\s*lastReviewedAt:\s*"2026-08-26"\s*\}/gm)]
  .map((match) => match[1] ?? match[2]);

if (statusSlugs.length !== expectedCohort.length) {
  fail(`expected ${expectedCohort.length} content-ready overrides; found ${statusSlugs.length}`);
}
for (const slug of expectedCohort) {
  if (!statusSlugs.includes(slug)) fail(`editorial cohort is missing ${slug}`);
}
for (const slug of statusSlugs) {
  if (!expectedCohort.includes(slug)) fail(`unexpected content-ready override ${slug}`);
}

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
const readinessSource = readinessFiles.map(read).join("\n");

if (/\blaunchStatus:\s*"launch-ready"/.test(readinessSource)) {
  fail("content-ready editorial work must not grant launch-ready publication approval");
}

const server = read("src/data/texas-talent.server.ts");
if (!server.includes('TEXAS_TALENT_EDITORIAL_STATUS_OVERRIDES')) {
  fail("server loader does not apply editorial status overrides");
}
if (!server.includes('...(TEXAS_TALENT_EDITORIAL_STATUS_OVERRIDES[profile.slug] ?? {})')) {
  fail("editorial status overrides are not applied to effective profile records");
}
if (!server.includes('contentReady: profiles.filter((profile) => profile.profileStatus === "ready").length')) {
  fail("launch audit does not report content-ready profile count");
}
if (!/loadTexasTalentPublishableProfilesServer\(\)\s*\{\s*return loadTexasTalentProfilesServer\(\)\.filter\(isTexasTalentPublishable\);\s*\}/s.test(server)) {
  fail("publication list no longer uses the guarded publishability predicate");
}
if (!/loadTexasTalentProfileForPublicationServer\(slug: string\)\s*\{\s*const profile = loadTexasTalentProfileServer\(slug\);\s*if \(!profile\) return null;\s*return assertTexasTalentPublishable\(profile\);\s*\}/s.test(server)) {
  fail("publication detail loader no longer asserts guarded publishability");
}

console.log(
  `Texas Talent editorial-status contract passed: ${statusSlugs.length} profiles are content-ready, while launch-ready approval remains disabled.`,
);
