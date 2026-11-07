// Check 42 combinations: six sports/events pairs and 36 technique pairs.
// Compare page-specific editorial data, not global navigation, repeated cards,
// or other shared layout. This heuristic is NOT a Google similarity score.
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const read = (path) => readFileSync(path, "utf8");
const routeSource = read("src/data/fishing/technique-routing.ts");
const techniqueSource = read("src/data/fishing/technique-guide-content.ts");
const fishingServer = read("src/data/fishing/technique-data.server.ts");
const fishingQuality = read("src/data/fishing/technique-content-quality.ts");
const fishingProfile = read("src/components/fishing/FishingTechniqueProfile.tsx");
const sportsData = JSON.parse(read("src/data/pro-teams.json"));
const sportsSeo = read("src/data/pro-team-seo.server.ts");
const eventsSource = read("src/components/events/EventsLandingPage.tsx");
const livePairVerifier = read("scripts/ci/verify-42-page-pairs-production.mjs");
assert.match(livePairVerifier, /const MAX_MAIN_TEXT_TERM_OVERLAP_PERCENT = 75;/, "Live production similarity tripwire must remain explicit");
assert.match(livePairVerifier, /mainTextTermOverlapPercent >= MAX_MAIN_TEXT_TERM_OVERLAP_PERCENT/, "Live production must actually fail when overlap regresses");
assert.match(livePairVerifier, /failures.push\(a.path \+ " vs " \+ b.path \+ ": " \+ mainTextTermOverlapPercent/, "Regressions must be recorded as failures, not merely reported");

const techniques = [
  "soft-plastics", "crankbaits", "spinnerbaits", "topwater", "trolling",
  "vertical-jigging", "jigs-and-minnows", "live-bait", "cut-bait",
];
const sports = ["dallas-mavericks", "san-antonio-spurs", "dallas-stars", "events"];
const stop = new Set([
  "this", "that", "when", "with", "from", "where", "then", "more", "your",
  "they", "into", "across", "around", "over", "well", "than", "also",
  "their", "some", "most", "which", "have", "what", "before",
]);
const terms = (value) => new Set((value.toLowerCase().match(/[a-z]{4,}/g) ?? []).filter((token) => !stop.has(token)));
const overlap = (left, right) => {
  const a = terms(left), b = terms(right);
  if (!a.size || !b.size) throw new Error("An editorial page has no analyzable main content");
  return [...a].filter((term) => b.has(term)).length / Math.min(a.size, b.size);
};
function techniqueBlock(slug) {
  const marker = '  "' + slug + '": {';
  const begin = techniqueSource.indexOf(marker);
  assert.ok(begin >= 0, "Missing editorial guide for " + slug);
  const end = techniqueSource.indexOf('\n  "', begin + marker.length);
  return techniqueSource.slice(begin, end >= 0 ? end : techniqueSource.length);
}
function combinations(paths, contents) {
  const output = [];
  for (let i = 0; i < paths.length; i++) {
    for (let j = i + 1; j < paths.length; j++) {
      output.push({ left: paths[i], right: paths[j], editorialOverlap: overlap(contents[i], contents[j]) });
    }
  }
  return output;
}
for (const slug of techniques) {
  assert.ok(routeSource.includes('"' + slug + '"'), "Technique lost its published route: " + slug);
  assert.ok(routeSource.includes('"/fishing/techniques/' + slug + '"'), "Technique lost its canonical path: " + slug);
}
assert.ok(fishingServer.includes("const featuredProfiles = selectFeaturedLakeApplications(profiles)"), "Technique SSR no longer selects distinctive lake examples");
assert.ok(fishingQuality.includes("isGenericLakeTechniqueSummary"), "Generic TPWD lake descriptions need a shared content-quality guard");
assert.ok(fishingProfile.includes("data.featuredProfiles.map"), "The detail page must show selected applications, not the repeated entire lake catalog");
assert.ok(fishingProfile.includes("data.featuredSources.map"), "The page must not repeat every catalog source citation");
assert.ok(!fishingProfile.includes("data.sources.map"), "The full repeated lake source directory has returned");
assert.ok(fishingProfile.includes("isGenericLakeTechniqueSummary(row.profile.summary)"), "Generic lake narrative prose must be hidden on detail pages");
assert.ok(fishingServer.includes("featuredSources: featuredSources") || fishingServer.includes("        featuredSources,"), "SSR must expose page-relevant sources");
assert.ok(!fishingProfile.includes("data.profiles.map"), "The full repeated lake directory has returned");
assert.ok(fishingServer.includes("profileCount: profiles.length"), "Do not lose the count of verified lake-technique relationships");
assert.ok(!fishingServer.includes("        profiles,\n        featuredProfiles,"), "Do not serialize the full verified catalog into every technique page");
assert.ok(fishingProfile.includes("data.profileCount"), "Visible count must be server-derived without rehydrating 72 full records");
assert.ok(fishingServer.includes("lakeCount: relatedLakes.length"), "Do not lose complete verified lake counts");
assert.ok(!fishingServer.includes("        lakes: relatedLakes,"), "Do not serialize every lake object in all nine pages");
assert.ok(fishingServer.includes("canonicalLink(texasDefinedBrand, canonicalPath)"), "Techniques must retain self-canonicals");
assert.ok(sportsSeo.includes("canonicalLink(texasDefinedBrand, path)"), "Teams must retain self-canonicals");
assert.ok(eventsSource.includes("const routeDescription ="), "Events needs independent editorial purpose");
assert.ok(eventsSource.includes("isGenericTicketingEventSummary(event.summary)"), "Calendar must not repeat generic provider summaries on every card");

// Every technique needs original, practical trip-preparation guidance rather than
// a shared three-paragraph disclaimer repeated across all nine indexable pages.
const uniqueTripChecks = new Set();
for (const slug of techniques) {
  const block = techniqueBlock(slug);
  const list = block.match(/tripChecks:\s*\[([\s\S]*?)\],/);
  assert.ok(list, "Missing method-specific trip checks: " + slug);
  const checks = [...list[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
  assert.equal(checks.length, 3, "Each technique should provide three useful trip checks: " + slug);
  for (const check of checks) {
    assert.ok(check.length >= 60, "Trip check is too generic: " + slug);
    assert.ok(!uniqueTripChecks.has(check), "Duplicate trip check across techniques: " + slug);
    uniqueTripChecks.add(check);
  }
}
assert.ok(fishingProfile.includes("guide.tripChecks.map"), "Render specific trip checks in the shared detail template");
assert.ok(!fishingProfile.includes("This page does not claim that"), "Repeated boilerplate disclaimer restored");
assert.ok(!fishingProfile.includes("These are practical technique fundamentals."), "Repeated publishing-process boilerplate restored on all nine technique guides");
assert.ok(!fishingProfile.includes("this page does not repeat a statewide lake catalog"), "Public guide should not discuss internal template/catalog deduplication");
assert.equal((fishingProfile.match(/<ol className="mt-7 list-none space-y-4">/g) ?? []).length, 2, "Both instruction lists need one visible number per step");
assert.equal((fishingProfile.match(/<span aria-hidden="true" className="font-display text-2xl text-primary">/g) ?? []).length, 2, "The custom step numbers must not repeat in the accessibility tree");


const techniquePairs = combinations(techniques.map((slug) => "/fishing/techniques/" + slug), techniques.map(techniqueBlock));
const teamEditorial = sports.slice(0, 3).map((slug) => {
  const team = sportsData.find((row) => row.slug === slug);
  assert.ok(team && team.intro && team.history?.length && team.weekend?.length, "Incomplete team guide: " + slug);
  return [team.name, team.league, team.city, team.intro, ...team.history, team.stay, team.food, ...team.weekend, ...team.faq.flat()].join(" ");
});
const eventsDescription = eventsSource.match(/const routeDescription = "([^"]+)"/)?.[1];
assert.ok(eventsDescription, "Events calendar lacks its unique description");
const sportsPairs = combinations(sports.map((slug) => slug === "events" ? "/events" : "/sports/teams/" + slug), [...teamEditorial, eventsDescription]);
const allPairs = [...sportsPairs, ...techniquePairs];
assert.equal(sportsPairs.length, 6);
assert.equal(techniquePairs.length, 36);
assert.equal(allPairs.length, 42);

const failures = allPairs.filter((pair) => pair.editorialOverlap > 0.65);
for (const pair of allPairs) {
  console.log(pair.left + " <-> " + pair.right + ": " + (pair.editorialOverlap * 100).toFixed(1) + "% main-content term overlap");
}
if (failures.length) throw new Error(failures.length + "/42 pairs exceed 65% of shorter-page editorial vocabulary: improve real content, do not cross-canonicalize different intents.");
console.log("PASS: all 42 editorial-distinctness checks; independent canonicals and verified lake coverage preserved.");
