import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

// The audit gates protect page identity and known regressions, not a made-up
// numerical "Google score." Originality, factual source changes, accessibility,
// rendered SEO and production indexing require separate evidence.
const read = (path) => readFileSync(path, "utf8");
const slugs = [
  "texas-state-fair",
  "texas-two-step",
  "texas-fishing-license",
  "texas-drivers-license",
  "track-texas-drivers-license",
  "texas-by-texas-txt",
  "texas-dmv",
  "texas-vehicle-registration",
  "texas-vehicle-registration-renewal",
  "texas-vehicle-registration-fees-taxes",
  "replace-texas-registration-receipt",
  "texas-toll-tags",
  "texas-flag",
  "texas-vs-every-state",
  "texas-history",
  "texas-old-west",
  "texas-sacred-places",
  "texas-science-technology-industry",
  "texas-college-towns",
  "texas-unique-lodging",
  "texas-music",
  "texas-music-timeline",
  "texas-blues",
  "texas-conjunto-tejano",
  "texas-western-swing",
  "texas-country-outlaw",
  "texas-rock-rockabilly",
  "texas-jazz",
  "texas-gospel-rnb-pop",
  "texas-hip-hop",
  "texas-music-venues",
  "gruene-hall-history"
];
const files = {
  base: read("src/data/priority-search-pages.ts"),
  services: read("src/data/priority-search-pages-public-services.ts"),
  current: read("src/data/priority-search-pages-public-services-current.ts"),
  west: read("src/routes/texas-old-west.lazy.tsx"),
  swing: read("src/data/texas-music-guides-batch1.ts"),
  colleges: read("src/routes/texas-college-towns.lazy.tsx"),
  stateCompare: read("src/routes/texas-vs-every-state.lazy.tsx"),
  priorityUI: read("src/components/editorial/PrioritySearchPage.tsx"),
  fair: read("src/routes/texas-state-fair.tsx"),
};
const problems = [];
const fail = (msg) => problems.push(msg);
const findSection = (content, key) => {
  const prefix = '  "' + key + '": {';
  const begin = content.indexOf(prefix);
  if (begin < 0) return "";
  const following = content.indexOf('\n  "', begin + prefix.length);
  return content.slice(begin, following < 0 ? content.length : following);
};
const prioritySections = [
  ["texas-fishing-license", files.base, 650],
  ["texas-drivers-license", files.base, 650],
  ["texas-dmv", files.base, 450],
  ["texas-flag", files.base, 450],
  ["texas-two-step", files.base, 450],
  ["track-texas-drivers-license", files.services, 450],
  ["texas-by-texas-txt", files.services, 500],
  ["replace-texas-registration-receipt", files.services, 450],
  ["texas-toll-tags", files.current, 400],
];
const placeholderPhrases = /\b(?:lorem ipsum|in today's fast-paced world|delve into|unlock the secrets|in conclusion|comprehensive tapestry|your ultimate guide)\b/i;

for (const slug of slugs) {
  const file = "src/routes/" + slug + ".tsx";
  const lazy = "src/routes/" + slug + ".lazy.tsx";
  if (!existsSync(file) && !existsSync(lazy)) fail("Missing public route: /" + slug);
}
assert.equal(slugs.length, 32, "Expected exactly the 32 commissioned URLs");
assert.equal(new Set(slugs).size, 32, "Duplicate route in 32-page audit");

for (const [slug, source, minimumWords] of prioritySections) {
  const section = findSection(source, slug);
  if (!section) { fail("Missing guide data: " + slug); continue; }
  const words = section.replace(/https?:\/\/\S+/g, " ").match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)?.length ?? 0;
  if (words < minimumWords) fail("Thin editorial service guide: " + slug + " (" + words + " words)");
  if (placeholderPhrases.test(section)) fail("Boilerplate AI-like phrase in " + slug);
  if (!section.includes('heading:') && !section.includes('"heading":')) fail("No substantive sections: " + slug);
  if (!section.includes("https://")) fail("Missing primary source links: " + slug);
}
const licensed = findSection(files.base, "texas-fishing-license");
for (const expected of ["$30","$35","$40","$58","$63","$68","August 3, 2026","State Park","tpwd.texas.gov","Year-from-purchase"]) {
  if (!licensed.includes(expected)) fail("Fishing fee/exception coverage missing: " + expected);
}
const lottery = findSection(files.base, "texas-two-step");
for (const expected of ["$1", "1,832,600", "32.4", "$5", "$7", "180 days", "texas-dance-halls-honky-tonks"]) {
  if (!lottery.includes(expected)) fail("Lottery requirements incomplete: " + expected);
}
if (!files.priorityUI.includes("section.table") || !files.priorityUI.includes('scope="col"') || !files.priorityUI.includes("<caption")) fail("Accessible fee and decision tables absent");
if (/\["Texas two-step",\s*"\/texas-two-step"/.test(files.west)) fail("Old West wrongly links dancing to lottery");
const westernSwing = files.swing.slice(files.swing.indexOf('"texas-western-swing"'));
if (/href:\s*"\/texas-two-step"/.test(westernSwing)) fail("Western swing wrongly links dancing to lottery");
if (!files.colleges.includes("apply.baylor.edu/portal/visit_experience")) fail("Missing Baylor official campus source");
if (files.stateCompare.includes("<h2 className=\"font-display text-4xl\">The comparison index</h2>")) fail("Boilerplate 49-state index summaries restored");
if (!files.stateCompare.includes("Census ACS comparisons") || !files.stateCompare.includes("BEA regional prices")) fail("State-comparison source methodology missing");
if (!files.fair.includes("concluded October 18")) fail("State Fair past-event status missing");
const fallbackFair = findSection(files.base, "texas-state-fair");
if (fallbackFair.includes("is now open")) fail("Expired State Fair open-now wording in data fallback");

if (problems.length) {
  for (const issue of problems) console.error("FAIL:", issue);
  process.exitCode = 1;
} else {
  console.log("32-route authority regression contract passed; all commissioned route files accounted for.");
  console.log("Detailed regulatory sources and key task-completion pages protected.");
  console.log("This is NOT certification of Google's ranking, indexing, live server or editorial originality.");
}
