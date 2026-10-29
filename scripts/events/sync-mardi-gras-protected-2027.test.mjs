import assert from "node:assert/strict";
import test from "node:test";
import { proposeProtectedMardiGrasFacts as propose, validateProtectedRecord } from "./sync-mardi-gras-protected-2027.mjs";
const empty = () => ({ schemaVersion: 1, season: 2027, records: {} });
const from = (id, slug, city, url, startDate, endDate = startDate) => ({
  eventSlug: slug, sourceId: id, sourceUrl: url, city, eventName: "Official Mardi Gras event",
  organizer: id, startDate, endDate, startDateTime: null, endDateTime: null,
  timeType: "published-event-occurrence-not-parade-start",
  evidenceType: "official-event-jsonld", checkedAt: "2026-10-29T16:00:00.000Z",
});
const orange = from("orange-sabine", "mardi-gras-on-the-sabine-orange", "Orange",
  "https://orangetexas.gov/407/Mardi-Gras-on-the-Sabine", "2027-02-06");
const beaumont = from("beaumont-festival", "mardi-gras-southeast-texas-beaumont", "Beaumont",
  "https://mardigrastx.com/", "2027-02-05", "2027-02-07");
const row = (facts) => ({
  id: facts.sourceId, sourceUrl: facts.sourceUrl, state: "review-required",
  reason: "possible-new-2027-announcement-requires-editorial-verification", normalized2027Candidate: facts,
});
const ledger = rows => ({ schemaVersion: 1, checkedAt: "2026-10-29T16:00:00.000Z", observations: [
  ...rows, ...["oak-cliff-parade", "port-arthur-gate-hours", "mainland-texas-city", "bandera-specific", "bandera-general",
    ...(["orange-sabine", "beaumont-festival"].filter(id => !rows.some(row => row.id === id)))].map(id => ({
    id, state: "expected-source-state", reason: "same-run", sourceUrl: "https://official.example/" + id,
  })),
] });
const sourceRecords = {
  "mardi-gras-on-the-sabine-orange": "2026-02-07",
  "mardi-gras-southeast-texas-beaumont": "2026-02-12",
};
test("exact official pending-to-confirmed facts prepare a two-guide protected source registry", () => {
  const result = propose(empty(), ledger([row(orange), row(beaumont)]), sourceRecords);
  assert.equal(result.changed, 2);
  assert.equal(result.proposed.records[orange.eventSlug].startDate, "2027-02-06");
});
test("confirmed-to-changed date updates once while unchanged source never generates daily PR", () => {
  const before = { ...empty(), records: { [orange.eventSlug]: orange } };
  assert.equal(propose(before, ledger([row(orange)]), sourceRecords).changed, 0);
  const revised = { ...orange, startDate: "2027-02-07", endDate: "2027-02-07" };
  assert.equal(propose(before, ledger([row(revised)]), sourceRecords).changed, 1);
});
test("checks during January 2027 are permitted for 2027 season, but never older years", () => {
  assert.equal(validateProtectedRecord({ ...orange, checkedAt: "2027-01-10T16:00:00.000Z" }, orange.sourceId), true);
  assert.equal(validateProtectedRecord({ ...orange, checkedAt: "2025-01-10T16:00:00.000Z" }, orange.sourceId), false);
});
test("no candidate, source outage, older date or missing seven-source ledger never promote", () => {
  assert.equal(propose(empty(), ledger([]), sourceRecords).changed, 0);
  assert.equal(propose(empty(), ledger([{ ...row(orange), normalized2027Candidate: null }]), sourceRecords).changed, 0);
  assert.equal(validateProtectedRecord({ ...orange, startDate: "2026-02-06" }, orange.sourceId), false);
  assert.throws(() => propose(empty(), { schemaVersion: 1, checkedAt: "2026-10-29T16:00:00.000Z", observations: [] }, sourceRecords));
});
test("cross-event source identity, wrong city, nonexistent date, and contradictory year fail closed", () => {
  assert.equal(validateProtectedRecord({ ...orange, sourceUrl: beaumont.sourceUrl }, orange.sourceId), false);
  assert.equal(validateProtectedRecord({ ...orange, city: "Houston" }, orange.sourceId), false);
  assert.equal(validateProtectedRecord({ ...orange, startDate: "2027-02-29" }, orange.sourceId), false);
  assert.equal(validateProtectedRecord({ ...orange, endDate: "2027-03-30" }, orange.sourceId), false);
  assert.throws(() => propose(empty(), ledger([row({ ...orange, sourceUrl: beaumont.sourceUrl })]), sourceRecords));
});
test("existing manually updated 2027 guide cannot silently be overwritten", () => {
  assert.throws(() => propose(empty(), ledger([row(orange)]), { ...sourceRecords, [orange.eventSlug]: "2027-02-06" }));
});
test("gate time, duplicate source ids and incomplete cross-source evidence cannot auto-publish", () => {
  const bad = from("port-arthur-gate-hours", "mardi-gras-port-arthur", "Port Arthur",
    "https://visitportarthurtx.com/", "2027-02-05", "2027-02-07");
  assert.equal(validateProtectedRecord(bad, bad.sourceId), false);
  const duplicate = ledger([row(orange), { ...row(orange), id: "orange-sabine" }]);
  assert.throws(() => propose(empty(), duplicate, sourceRecords));
});
