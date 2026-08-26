import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(process.cwd(), "src/data/texas-talent-launch.ts"), "utf8");
const fail = (message) => {
  console.error(`Texas Talent launch-depth validation failed: ${message}`);
  process.exit(1);
};
const requireText = (text, message) => {
  if (!source.includes(text)) fail(message);
};

const requiredThresholds = [
  ["minOverviewParagraphs: 3", "launch biography must require at least 3 narrative paragraphs"],
  ["minOverviewWords: 300", "launch biography must require at least 300 overview words"],
  ["minDefiningWorks: 5", "launch profile must require at least 5 defining works or achievements"],
  ["minTimelineMilestones: 5", "launch profile must require at least 5 timeline milestones"],
  ["minLegacyPoints: 3", "launch profile must require at least 3 legacy points"],
  ["minLegacyWords: 100", "launch legacy section must require at least 100 words"],
  ["minTexasPlaces: 2", "launch profile must require at least 2 Texas places"],
  ["minTexasPlaceContextWords: 18", "launch Texas-place context must require at least 18 words per place"],
  ["minSources: 2", "launch profile must retain at least 2 displayed sources"],
];

for (const [text, message] of requiredThresholds) requireText(text, message);
requireText("profile.readiness.sourceReview.status !== \"reviewed\"", "source review must remain a publication blocker");
requireText("profile.readiness.imageReview.status !== \"verified\"", "verified image rights must remain a publication blocker");
requireText("profile.readiness.internalLinkReview.status !== \"verified\"", "verified internal links must remain a publication blocker");
requireText("profile.readiness.launchStatus === \"launch-ready\"", "explicit editorial approval must remain separate from mechanical depth");
requireText("publishable: mechanicalReady && editorialApproved", "publication must still require both mechanical readiness and editorial approval");

console.log("Texas Talent launch-depth gate passed: public eligibility requires substantive biography, timeline, legacy, Texas-place context, sources, reviewed rights/links and explicit editorial approval.");
