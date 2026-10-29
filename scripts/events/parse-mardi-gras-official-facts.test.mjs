import assert from "node:assert/strict";
import test from "node:test";
import { OFFICIAL_SOURCES } from "./check-mardi-gras-official-sources.mjs";
import { parseVerifiedMardiGras2027Candidate as parse } from "./parse-mardi-gras-official-facts.mjs";
const checked = "2026-10-29T16:00:00.000Z";
const nextYearChecked = "2027-01-08T16:00:00.000Z";
const orange = OFFICIAL_SOURCES.find(s => s.id === "orange-sabine");
const beaumont = OFFICIAL_SOURCES.find(s => s.id === "beaumont-festival");
const texasCity = OFFICIAL_SOURCES.find(s => s.id === "mainland-texas-city");
function html(name, city, organizer, startDate, endDate = startDate, extra = "") {
  return '<html><h1>' + name + '</h1><p>2027 announcement</p>' +
    '<script type="application/ld+json">' + JSON.stringify({
      "@context": "https://schema.org", "@type": "Event", name, startDate, endDate,
      organizer: { "@type": "Organization", name: organizer },
      location: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: city } },
    }) + '</script>' + extra + '</html>';
}
test("strict Orange 2027 Event announcement becomes a normalized, source-timestamped candidate, not a publication", () => {
  const result = parse(orange, html("Mardi Gras on the Sabine", "Orange", "City of Orange", "2027-02-06"), checked);
  assert.equal(result.status, "candidate");
  assert.equal(result.facts.startDate, "2027-02-06");
  assert.equal(result.facts.eventSlug, "mardi-gras-on-the-sabine-orange");
  assert.equal(result.facts.timeType, "published-event-occurrence-not-parade-start");
});
test("strict Beaumont candidate is never charity Pardi Gras", () => {
  assert.equal(parse(beaumont, html("Mardi Gras Southeast Texas", "Beaumont", "Mardi Gras Southeast Texas", "2027-02-05", "2027-02-07"), checked).status, "candidate");
  assert.equal(parse(beaumont, html("Circle of Hope Pardi Gras", "Beaumont", "Circle of Hope", "2027-01-23"), checked).status, "hold");
});
test("Texas City confirmed candidate has no fabricated individual guide", () => {
  const result = parse(texasCity, html("Mainland Mardi Gras Parade", "Texas City", "City of Texas City", "2027-01-30"), checked);
  assert.equal(result.status, "candidate");
  assert.equal(result.facts.eventSlug, null);
});
test("the daily 2027 source watcher can still normalize same-season announcements", () => {
  const result = parse(orange, html("Mardi Gras on the Sabine", "Orange", "City of Orange", "2027-02-06"), nextYearChecked);
  assert.equal(result.status, "candidate");
  assert.equal(result.facts.checkedAt, nextYearChecked);
});
test("historical dates, guessed text, source challenge and unrelated JSON-LD all fail closed", () => {
  assert.equal(parse(orange, html("Mardi Gras on the Sabine", "Orange", "City of Orange", "2026-02-07"), checked).status, "hold");
  assert.equal(parse(orange, ("Mardi Gras on the Sabine, February 6, 2027. ").repeat(12), checked).status, "hold");
  assert.equal(parse(orange, "<h1>Just a moment...</h1>", checked).status, "hold");
  assert.equal(parse(orange, html("Other festival", "Orange", "City of Orange", "2027-02-06") + "Mardi Gras on the Sabine", checked).status, "hold");
});
test("wrong city, organizer, invalid leap day, too long range and source conflict fail closed", () => {
  assert.equal(parse(orange, html("Mardi Gras on the Sabine", "Houston", "City of Orange", "2027-02-06"), checked).status, "hold");
  assert.equal(parse(orange, html("Mardi Gras on the Sabine", "Orange", "Circle of Hope", "2027-02-06"), checked).status, "hold");
  assert.equal(parse(orange, html("Mardi Gras on the Sabine", "Orange", "City of Orange", "2027-02-29"), checked).status, "hold");
  assert.equal(parse(orange, html("Mardi Gras on the Sabine", "Orange", "City of Orange", "2027-02-01", "2027-02-17"), checked).status, "hold");
  const otherScript = html("Mardi Gras on the Sabine", "Orange", "City of Orange", "2027-02-07")
    .match(/<script[\s\S]*?<\/script>/)[0];
  assert.equal(parse(orange, html("Mardi Gras on the Sabine", "Orange", "City of Orange", "2027-02-06", "2027-02-06", otherScript), checked).reason, "conflicting-event-occurrence-jsonld");
});
test("cancelled, postponed and Bandera's incompatible pages never auto-promote", () => {
  const cancelled = html("Mardi Gras on the Sabine", "Orange", "City of Orange", "2027-02-06")
    .replace('"startDate":"2027-02-06"', '"eventStatus":"https://schema.org/EventCancelled","startDate":"2027-02-06"');
  assert.equal(parse(orange, cancelled, checked).status, "hold");
  const bandera = OFFICIAL_SOURCES.find(s => s.id === "bandera-specific");
  assert.equal(parse(bandera, html("Cowboy Mardi Gras", "Bandera", "Bandera Tourism", "2027-01-28"), checked).status, "hold");
});
test("the gate times at Port Arthur never masquerade as parade start times", () => {
  const port = OFFICIAL_SOURCES.find(s => s.id === "port-arthur-gate-hours");
  assert.equal(parse(port, html("Mardi Gras Port Arthur", "Port Arthur", "Visit Port Arthur", "2027-02-05", "2027-02-07"), checked).status, "hold");
});
