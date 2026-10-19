import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
function parseStaticJson(path, before, after) {
  const source = read(path);
  const start = source.indexOf(before);
  assert.ok(start >= 0, `Missing static source marker ${before} in ${path}`);
  const from = start + before.length;
  const end = source.indexOf(after, from);
  assert.ok(end >= 0, `Missing end marker ${after} in ${path}`);
  return JSON.parse(source.slice(from, end));
}
function assertVisitorGuide(guide, label) {
  assert.ok(guide && guide.whyItMatters.length >= 150, `${label}: distinct destination significance is too thin`);
  assert.ok(guide.assessment.recommendedVisit.length >= 10, `${label}: visit duration required`);
  assert.equal(guide.itineraries.length, 3, `${label}: three itineraries are required`);
  for (const itinerary of guide.itineraries) {
    assert.ok(itinerary.duration && itinerary.label && itinerary.steps.length >= 3, `${label}: incomplete itinerary`);
    assert.ok(new Set(itinerary.steps).size >= 3, `${label}: repeated itinerary steps`);
  }
  assert.ok(guide.sources.some((item) => item.url.startsWith("https://")), `${label}: at least one official/supporting HTTPS source required`);
}
function assertFullDestination(destination, label) {
  assert.ok(destination.slug && destination.name && destination.county, `${label}: identity and county required`);
  assert.ok(destination.summary.length >= 90, `${label}: summary too thin`);
  assert.ok(destination.body.length >= 3 && destination.body.join(" ").length >= 450, `${label}: substantive body missing`);
  assert.ok(destination.highlights.length >= 3, `${label}: visit highlights missing`);
  assert.ok(destination.officialUrl.startsWith("https://"), `${label}: controlling official source missing`);
  assert.ok(destination.sourceCheckedAt && !Number.isNaN(Date.parse(destination.sourceCheckedAt)), `${label}: review date missing`);
  assert.ok(destination.hero.src.includes("commons.wikimedia.org/wiki/Special:Redirect/file/") && destination.hero.credit, `${label}: exact-subject licensed hero/photo credit required`);
  assert.ok(destination.hero.alt.length >= 30, `${label}: descriptive image alternative required`);
  assertVisitorGuide(destination.authorityGuide, label);
  assert.ok(destination.visitorFaqs.length >= 3, `${label}: attraction-specific questions missing`);
  assert.ok(destination.visitorFaqs.every(q => q.question && q.answer.length >= 45 && q.sourceUrl.startsWith("https://")), `${label}: FAQ evidence incomplete`);
  for (const group of ["nearbyAttractions","foodAndDrink","lodging","neighborhoods","familyStops","sideTrips"]) {
    assert.ok(destination.areaGuide[group].length >= 1, `${label}: area guide section ${group} missing`);
  }
}

const ranking = parseStaticJson(
  "src/data/texas-top50-ranking.ts",
  "export const TEXAS_TOP50_RANKING = ",
  " as const;",
);
assert.equal(ranking.length, 50, "Full ungrouped Top-50 ranking is required");
assert.deepEqual(ranking.map(x => x.rank), Array.from({length:50},(_,i)=>i+1), "Ranks must be contiguous");
assert.equal(new Set(ranking.map(x=>x.href)).size, 50, "Exactly one canonical URL per ranked attraction");
assert.ok(ranking.every(x=>/^\/(destination|event|sports-venue)\/|^\/texas-state-fair$/.test(x.href)), "Unexpected path outside managed attraction/event/stadium routes");
assert.equal(ranking[24].href, "/sports-venue/att-stadium", "AT&T Stadium must not be confused with Lubbock's Galaxy Stadium");
assert.equal(ranking[33].href, "/destination/congress-avenue-bridge-bat-colony", "Congress Avenue bats need their own exact subject");

const wave = parseStaticJson(
  "src/data/destination-authority-top50-wave1.ts",
  "const GUIDES: Record<Top50AuthorityWave1Slug, DestinationAuthorityGuide> = ",
  ";\n\nexport function applyTop50AuthorityWave1",
);
const waveManifest = parseStaticJson(
  "src/data/top50-authority-wave1-slugs.ts",
  "export const TOP50_AUTHORITY_WAVE1_SLUGS = ",
  " as const;",
);
assert.equal(waveManifest.length, 10, "First upgrade wave should contain ten named canonicals");
assert.deepEqual(Object.keys(wave).sort(), [...waveManifest].sort(), "Guide keys and lazy-load manifest must match");
for(const [slug,guide] of Object.entries(wave)) {
  assertVisitorGuide(guide, slug);
  assert.ok(ranking.some(x=>x.href === `/destination/${slug}`), `${slug}: no ranking path`);
}

const parks = parseStaticJson(
  "src/data/top50-theme-park-destinations.ts",
  "export const top50ThemeParkDestinations: Destination[] = ",
  ";\n",
);
assert.equal(parks.length, 4, "Four named theme/waterpark destinations required");
for(const record of parks) {
  assertFullDestination(record, record.slug);
  assert.ok(ranking.some(x=>x.href === `/destination/${record.slug}`), `${record.slug}: missing canonical ranking entry`);
}
const bats = parseStaticJson(
  "src/data/congress-avenue-bat-colony-authority.ts",
  "export const congressAvenueBatDestination: Destination = ",
  ";\n",
);
assertFullDestination(bats,bats.slug);
assert.equal(bats.slug, "congress-avenue-bridge-bat-colony", "Never substitute a generic bat colony guide");
assert.equal(new Set([...waveManifest,...parks.map(x=>x.slug),bats.slug]).size,15,"No duplicate written authority guides");
assert.equal(new Set([...parks.map(x=>x.hero.src),bats.hero.src]).size,5,"Distinct subject images required");

const faqWaveSource = read("src/data/top50-source-verified-faqs-wave2.ts");
const faqWaveSlugs = parseStaticJson(
  "src/data/top50-source-verified-faqs-wave2.ts",
  "export const TOP50_FAQ_WAVE2_SLUGS = ",
  " as const;",
);
const faqWaveRecords = parseStaticJson(
  "src/data/top50-source-verified-faqs-wave2.ts",
  "const VERIFIED_FAQS: Record<Top50FaqWave2Slug, Array<{ question: string; answer: string; sourceUrl: string }>> = ",
  ";\n\nexport function applyTop50FaqWave2",
);
assert.equal(faqWaveSlugs.length, 9, "Exactly nine second-wave attraction FAQ upgrades");
assert.deepEqual(Object.keys(faqWaveRecords).sort(), [...faqWaveSlugs].sort(), "Published FAQ slugs must match lightweight manifest");
assert.ok(faqWaveSlugs.every(slug => ranking.some(item => item.href === `/destination/${slug}`)), "Every FAQ wave 2 page must belong to Top 50");
assert.ok(faqWaveSlugs.every(slug => faqWaveRecords[slug].length === 3), "Three individually sourced visitor answers per landmark");
assert.ok(Object.values(faqWaveRecords).flat().every(item => item.question.length >= 14 && item.answer.length >= 70 && /^https:\/\//.test(item.sourceUrl)), "FAQ answers need source links and substantive answers");
const faqPageLoader = read("src/routes/destination.$slug.tsx");
assert.ok(faqPageLoader.includes("applyTop50FaqWave2(destination)"), "Source-verified visitor answers must be displayed on canonical destination routes");

const venueData = parseStaticJson(
  "src/data/top50-sports-venue-visitor-guidance.ts",
  "}> = ",
  ";\n\nexport function getTop50VenueGuidance",
);
assert.deepEqual(Object.keys(venueData).sort(), ["att-stadium", "circuit-of-the-americas"], "Two Top 50 sports venues must have verified planning answers");
for (const [slug, record] of Object.entries(venueData)) {
  assert.ok(record.faqs.length === 3, `${slug}: three ticket, tour and transport answers are required`);
  assert.ok(record.faqs.every(item => item.question && item.answer.length > 60 && item.sourceUrl.startsWith("https://")), `${slug}: incomplete operator FAQ evidence`);
  assert.ok(record.sources.length >= 1 && record.sources.every(source => source.href.startsWith("https://")), `${slug}: official source visible`);
  assert.ok(ranking.some(item => item.href === `/sports-venue/${slug}`), `${slug}: missing canonical sports guide in ranking`);
}
const venueRenderer = read("src/components/sports/SportsVenueGuidePilotContent.tsx");
assert.ok(venueRenderer.includes("getTop50VenueGuidance(slug)") && venueRenderer.includes("top50Guidance?.faqs"), "Venue Q&A not attached to original sports pages");

const eventData = parseStaticJson(
  "src/data/top50-event-visitor-answers.ts",
  "const ANSWERS = ",
  " as const;",
);
assert.deepEqual(Object.keys(eventData).sort(), ["houston-livestock-show-rodeo", "state-fair-of-texas", "texas-renaissance-festival"], "Three ranked annual events need verified visitor answers");
for (const [slug, record] of Object.entries(eventData)) {
  assert.ok(record.questions.length === 3 && record.questions.every(item => item.answer.length > 70 && item.sourceUrl.startsWith("https://")), `${slug}: missing sourced visitor answers`);
}
const eventRenderer = read("src/components/editorial/Top50EventVisitorAnswers.tsx");
assert.ok(eventRenderer.includes("getTop50EventAnswers(slug)") && eventRenderer.includes("item.sourceUrl"), "Event FAQ source attribution must render");
assert.ok(read("src/routes/event.$slug.lazy.tsx").includes("Top50EventVisitorAnswers slug={page.slug}"), "Canonical major event pages must show targeted FAQ");
assert.ok(read("src/routes/texas-state-fair.lazy.tsx").includes('Top50EventVisitorAnswers slug="state-fair-of-texas"'), "State Fair archived authority page must show FAQ");

const ledger = read("docs/editorial/top-50-attractions-authority-ledger-20261017.md");
const lines = ledger.split("\n").filter(x=>/^\| \d+ \|/.test(x));
assert.equal(lines.length,50,"Every ranking needs a completion-ledger row");
lines.forEach((line,i) => {
  const cells = line.split("|").slice(1,-1).map(s=>s.trim().replaceAll("`",""));
  assert.equal(Number(cells[0]),i+1);
  assert.equal(cells[1],ranking[i].name);
  assert.equal(cells[2],ranking[i].href);
});
const preserved = read("src/data/destination-preserved-catalog.ts");
assert.ok(preserved.includes("top50CompactDestinationSummaries,"),"Five destinations must be discoverable through slim preserved catalog records");
const compact = parseStaticJson(
  "src/data/top50-preserved-summaries.ts",
  "export const top50CompactDestinationSummaries: Destination[] = ",
  ";\n",
);
assert.equal(compact.length, 5, "All five additional destinations must have discoverable summaries");
assert.deepEqual(compact.map(x => x.slug).sort(), [...parks.map(x => x.slug), bats.slug].sort(), "Compact catalog and full guide identities must agree");
assert.ok(compact.every(x => x.body.join(" ").length >= 450), "Public preview summaries must remain substantively indexable");
assert.ok(compact.every(x => !x.authorityGuide && !x.visitorFaqs), "Do not embed full authority guides in the client discovery catalog");
const runtime = read("src/data/destination-query-runtime.ts");
assert.ok(runtime.includes('import("./top50-theme-park-destinations")') && runtime.includes('import("./congress-avenue-bat-colony-authority")'),"Full Top-50 guides must resolve lazily on detail routes");
const sitemap = read("src/routes/sitemap-explore[.]xml.ts");
assert.ok(sitemap.includes('import("@/data/top50-theme-park-destinations")') && sitemap.includes('import("@/data/congress-avenue-bat-colony-authority")'),"Explore sitemap must audit researched canonical guides, not their previews");
const loader = read("src/routes/destination.$slug.tsx");
assert.ok(loader.includes("applyTop50AuthorityWave1(destination)"),"Existing Top-50 destination supplements must load on exact route");
const renderer = read("src/components/editorial/DestinationRelationships.tsx");
assert.ok(renderer.includes("isTop50ThemeParkDestination(destination.slug)") && renderer.includes("isTop50BatColonyDestination(destination.slug)") && renderer.includes("isTop50AuthorityWave1(destination.slug)"),"All fifteen guides must render as authority components");
const sourceRenderer = read("src/components/editorial/DestinationAuthorityGuide.tsx");
assert.ok(sourceRenderer.includes("destination.visitorFaqs ?? []") && sourceRenderer.includes("Official verification"),"Attraction-specific evidence must remain visible");
assert.ok(read("src/lib/public-routes.ts").includes('"/explore/top-50-attractions"'),"Top-50 collection must be indexable");
assert.ok(read("src/routes/sitemap-explore[.]xml.ts").includes('"/explore/top-50-attractions"'),"Top-50 collection must be in Explore sitemap");
assert.ok(read("src/routes/explore.top-50-attractions.tsx").includes("TEXAS_TOP50_RANKING.map"),"Ranking must render all fifty in source order");
console.log("Top-50 attraction structural contract: 50 canonical rankings; 10 enriched guides; 5 new destination guides; 9 landmark pages, 2 sports venues and 3 annual events with 42 official-source FAQs; page/SEO/sitemap routing all checked.");
