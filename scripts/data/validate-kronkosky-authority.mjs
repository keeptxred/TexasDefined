import assert from "node:assert/strict";
import fs from "node:fs";
import { applyKronkoskyOpeningAuthority } from "../../src/data/kronkosky-state-natural-area-authority.ts";

/**
 * Executable, park-specific content and publication contract.
 * Verifies actual resolved overlay, not just the presence of strings in a draft.
 * The official release is the source of opening dates. A passing test does not
 * certify current booking inventory or a live Cloudflare deployment.
 */
const slug = "albert-bessie-kronkosky-state-natural-area";
const original = {
  slug,
  hero: { src: "/images/texasdefined-destination-placeholder.svg" },
  summary: "Closed",
  entryNote: "Closed while under construction",
  body: ["Old page claims no opening date"],
  sourceCheckedAt: "2026-10-17",
};
const destination = applyKronkoskyOpeningAuthority(original, Date.parse("2026-11-19T12:00:00Z"));
const dayUsePhase = applyKronkoskyOpeningAuthority(original, Date.parse("2026-12-02T12:00:00Z"));
const overnightPhase = applyKronkoskyOpeningAuthority(original, Date.parse("2026-12-16T12:00:00Z"));
assert.match(destination.entryNote, /NOT YET OPEN/);
assert.match(dayUsePhase.entryNote, /DAY-USE DATE REACHED/);
assert.match(overnightPhase.entryNote, /ANNOUNCED OPENING DATES HAVE PASSED/);
assert.match(dayUsePhase.body[0], /overnight stays are not scheduled until December 15/);
assert.match(overnightPhase.body[0], /historical agency announcements/);
assert.ok(!overnightPhase.summary.includes("opens for day use"), "Opening must not remain a future event");
assert.ok(!overnightPhase.visitorFaqs[1].answer.includes("scheduled to open"), "FAQ must age with opening");
assert.equal(applyKronkoskyOpeningAuthority({ slug: "unrelated-park" }).slug, "unrelated-park");
assert.equal(destination.slug, slug);
assert.equal(destination.sourceCheckedAt, "2026-11-19");
assert.equal(destination.updatedAt, "2026-11-19");
assert.match(destination.summary, /December 1, 2026/);
assert.match(destination.summary, /December 15/);
assert.match(destination.entryNote, /\$6/);
assert.match(destination.entryNote, /7 a\.m\.–10 p\.m\./);
assert.match(destination.entryNote, /weather/);
assert.ok(destination.body.length >= 12, "Substantive, park-specific editorial sections must survive curation");
assert.ok(destination.body.join(" ").length > 6000, "No thin generic attraction listing");
for (const phrase of ["26 miles", "Red Bluff", "Hill Country", "Nature Center", "golden-cheeked", "archaeolog", "3,800", "2011"]) {
  assert.ok(destination.body.join(" ").toLowerCase().includes(phrase.toLowerCase()), "Missing researched topic " + phrase);
}
assert.equal(destination.nearestTown, "Pipe Creek");
assert.equal(destination.county, "Bandera");
assert.match(destination.address, /7754 State Highway 46/);
assert.match(destination.hero.src, /ABK_SNA_Entrance_2026\.jpg/);
assert.match(destination.hero.credit, /Larry D\. Moore · CC BY 4\.0/);
assert.ok(destination.hero.alt.length >= 40);
assert.equal(destination.authorityGuide.itineraries.length, 3);
assert.ok(destination.authorityGuide.sources.length >= 8);
assert.ok(destination.authorityGuide.sources.some(x => x.url.endsWith("/park-alert")));
assert.ok(destination.authorityGuide.sources.some(x => x.url.includes("tpr.org")));
assert.match(destination.body.join(" "), /four-mile hike one way/);
const faq = destination.visitorFaqs;
assert.ok(faq.length >= 10);
assert.equal(new Set(faq.map(x => x.question)).size, faq.length, "FAQs cannot repeat");
assert.ok(faq.every(x => x.sourceUrl?.startsWith("https://")), "FAQs require official sources");
const facts = destination.visitorFacts;
assert.equal(facts.length, 7);
assert.equal(new Set(facts.map(x => x.topic + ":" + x.label)).size, facts.length);
assert.ok(facts.every(x => x.sourceUrl?.startsWith("https://") && x.checkedAt === "2026-11-19"));
assert.ok(facts.some(x => x.topic === "accessibility"));
assert.ok(facts.some(x => x.topic === "camping"));
assert.match(destination.accessibilityNotes, /Extreme Motus/);
assert.match(destination.officialUrl, /tpwd\.texas\.gov/);
assert.match(destination.reservationUrl, /texasstateparks\.reserveamerica\.com/);

const read = path => fs.readFileSync(path, "utf8");
const curation = read("src/data/destination-curation-all.ts");
const curators = curation.slice(curation.indexOf("const CURATORS:"));
assert.ok(curation.includes('import { applyKronkoskyOpeningAuthority }'));
assert.ok(curators.indexOf("  applyKronkoskyOpeningAuthority,") > curators.indexOf("  applyAttractionVisitorDepth,"),
  "Opening override must be the final authority, not overwritten by older closure curation");
const availability = read("src/data/destination-availability.ts");
assert.match(availability, /2026-12-01T06:00:00Z/);
assert.match(availability, /Date\.now\(\) >= KRONKOSKY_DAY_USE_OPEN_AT/);
assert.match(availability, /isEditoriallyIndexablePreopeningDestination/);
const detail = read('src/routes/destination.$slug.tsx');
assert.ok(detail.includes("isEditoriallyIndexablePreopeningDestination(destination)"),
  "Announced, quality-verified page must be indexable without claiming the park is open");
assert.ok(detail.includes("kronkoskyImageRights"), "Image license must be linked in ImageObject schema");
assert.ok(detail.includes("Kronkosky State Natural Area: Trails, Camping & Fees"));
assert.ok(detail.includes("Texas State Parks"));
assert.ok(detail.includes("Plan Kronkosky State Natural Area: opening dates"));
const sitemap = read("src/data/destination-sitemap-detail-parity.server.ts");
assert.ok(sitemap.includes('"albert-bessie-kronkosky-state-natural-area"'));
assert.ok(sitemap.includes("isEditoriallyIndexablePreopeningDestination(destination)"));
const visitorFactAudit = read("scripts/data/validate-destination-visitor-fact-catalog.mjs");
assert.ok(visitorFactAudit.includes('name === "kronkosky-state-natural-area-authority.ts"'),
  "Weekly freshness review must include new visitor fact overlay");
const crosslinks = read("src/data/destination-editorial-links.ts");
assert.ok(crosslinks.includes('"/county/bandera"'));
assert.ok(crosslinks.includes('"/destination/guadalupe-river-state-park"'));
const credits = read("src/components/editorial/DestinationAuthoritySections.tsx");
assert.ok(credits.includes("ABK_SNA_Entrance_2026.jpg"));
assert.ok(credits.includes("https://creativecommons.org/licenses/by/4.0/"));
console.log("Kronkosky opening authority: researched copy, dates, media, visitor facts, indexing, sitemap, links and refresh contract PASS");

const prod = read("scripts/ci/verify-kronkosky-production.mjs");
assert.match(prod, /for \(const bust of \[false, true\]\)/, "Must test ordinary clean and nonce cache keys");
const deploy = read(".github/workflows/deploy-production.yml");
assert.ok(deploy.includes("https://texasdefined.com/destination/albert-bessie-kronkosky-state-natural-area"), "Canonical destination must be purged");
const monitor = read("scripts/data/monitor-kronkosky-sources.mjs");
assert.ok(monitor.includes("SOURCE_CHANGED") && monitor.includes("PUBLIC_STALE"));
assert.ok(monitor.includes("2026-12-15T06:00:00Z"), "Camping opening must trigger source follow-up");
const refreshWorkflow = read(".github/workflows/kronkosky-park-source-refresh.yml");
assert.ok(refreshWorkflow.includes("cron:") && refreshWorkflow.includes("monitor-kronkosky-sources.mjs"), "Dedicated GitHub schedule and source watch required");
