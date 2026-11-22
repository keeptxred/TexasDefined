#!/usr/bin/env node
/**
 * Rusk County heritage authority regression contract.
 * Source-review dates require an editor; this guard never invents future
 * event occurrences or asserts that a successful HTTP fetch verifies facts.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const county = read("src/data/fixtures/rusk-county-henderson-east-texas-oil-field-piney-woods-texas.ts");
const museums = read("src/data/museum-expansion-statewide-wave9.ts");
const index = read("src/data/major-event-index.ts");
const guides = read("src/data/major-event-authority.server.ts");
const destinationPage = read("src/routes/destination.$slug.tsx");
const countyPage = read("src/routes/$kind.$slug.lazy.tsx");
const sitemap = read("src/routes/sitemap[.]xml.ts");
const eventLanding = read("src/components/events/EventsLandingPage.tsx");
const refresh = read("scripts/events/event-page-refresh-governance.mjs");
const lifecycle = read("src/data/major-event-authority.ts");

const includesAll = (label, source, snippets) => snippets.forEach((s) => assert.ok(source.includes(s), label + " missing " + s));
includesAll("Rusk county", county, [
  "Syrup Capital of Texas", "House Concurrent Resolution 83", "ribbon cane",
  "/event/heritage-syrup-festival", "/destination/rusk-county-depot-museum-history-center-henderson",
  "/texas-capital-designations", "November 14, 2026",
  "https://capitol.texas.gov/tlodocs/89R/billtext/html/HC00083F.htm",
  "https://www.ruskcountyhistory.org/our-grounds", 'updatedAt: "2026-11-22"',
]);
const museumStart = museums.indexOf('id: "museum-statewide-wave9-rusk-depot"');
const museumEnd = museums.indexOf('id: "museum-statewide-wave9-falfurrias-heritage"', museumStart);
assert.ok(museumStart > 0 && museumEnd > museumStart, "Depot Museum record boundaries must remain intact");
const museum = museums.slice(museumStart, museumEnd);
includesAll("Rusk museum", museum, [
  "Syrup Capital of Texas", "37th Heritage Syrup Festival", "514 N High St",
  "Henderson_July_2017_09_", "Michael Barera", "CC BY-SA 4.0",
  "visitorFacts:", "visitorFaqs:", "authorityGuide:",
  "https://www.ruskcountyhistory.org/contact", 'updatedAt: "2026-11-22"',
]);
const entry = index.match(/\{ slug: "heritage-syrup-festival",[^\n]+/);
assert.ok(entry, "The permanent Heritage Syrup Festival must be indexed");
includesAll("Festival index", entry[0], [
  'startDate: "2026-11-14"', 'endDate: "2026-11-14"',
  'countySlug: "rusk"', 'region: "piney-woods"',
  'sourceCheckedAt: "2026-11-22"', 'officialUrl: "https://www.hendersontx.us/14/Heritage-Syrup-Festival"',
  "This date has passed", "2027",
]);
assert.ok(!/startDate: "2027-|endDate: "2027-/.test(entry[0]), "Never invent 2027 festival dates");
const guideStart = guides.indexOf('slug: "heritage-syrup-festival"');
assert.ok(guideStart > 0);
const guide = guides.slice(guideStart, guides.indexOf('\n  {', guideStart + 30));
includesAll("Festival guide", guide, [
  "37th annual", "2026", "historical", "not an advertisement",
  "/county/rusk", "/destination/rusk-county-depot-museum-history-center-henderson",
  "/texas-capital-designations", "https://www.ruskcountyhistory.org/syrup-festival",
]);
includesAll("Prominent county fact block and accurately distinguished revision date", countyPage, [
  'id="rusk-syrup-heritage"', "Rusk County is the Syrup Capital of Texas",
  "37th edition was held November 14, 2026", "Guide updated",
  'href="/event/heritage-syrup-festival"',
  'href="/destination/rusk-county-depot-museum-history-center-henderson"',
]);
includesAll("Sitemap live editorial date and edge invalidation", sitemap, [
  '"/county/rusk": "2026-11-22"', "rusk-syrup-20261122",
  "hasCompliantMajorEventImageServer(event.slug)",
]);
includesAll("Museum reverse links", destinationPage, [
  'destination.slug === "rusk-county-depot-museum-history-center-henderson"',
  'href="/event/heritage-syrup-festival"', 'href="/county/rusk"',
]);
includesAll("Events hub festival discovery", eventLanding, [
  'href="/event/heritage-syrup-festival"', "archived 37th annual festival",
]);
includesAll("Automated official-source review coverage", refresh, [
  "major-event-index.ts", "refreshCadenceDays", "daysToUnconfirmedAnnualSeason",
]);
includesAll("Expired-event Google schema safety", lifecycle, [
  "hasExpiredConfirmedEventOccurrence", "applyEventSchemaConfidencePolicy",
]);
console.log("Rusk County / Heritage Syrup Festival / Depot Museum authority and refresh link contract: PASS");
