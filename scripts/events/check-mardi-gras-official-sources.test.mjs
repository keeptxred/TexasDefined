import assert from "node:assert/strict";
import test from "node:test";
import { OFFICIAL_SOURCES, evaluateSource, normalizeHtml } from "./check-mardi-gras-official-sources.mjs";

test("source monitor tracks official organizers plus Port Arthur regional visitor center and Bandera's contradictory listings", () => {
  assert.equal(OFFICIAL_SOURCES.length, 7);
  assert.equal(new Set(OFFICIAL_SOURCES.map((s) => s.url)).size, 7);
  assert.equal(OFFICIAL_SOURCES.filter((s) => s.id.startsWith("bandera-")).length, 2);
});
test("normalizes HTML but ignores script-injected dates", () => {
  assert.equal(normalizeHtml("<script>2027</script><div>A&amp;B&nbsp;C</div>"), "A&B C");
});
test("Oak Cliff partner 2027 schedule verifies only with both date and parade start", () => {
  const src = OFFICIAL_SOURCES.find((s) => s.id === "oak-cliff-parade");
  assert.equal(evaluateSource(src, "<h1>Sunday, February 7, 2027</h1><p>1:00pm Oak Cliff Mardi Gras Parade</p>".repeat(10)).ok, true);
  assert.equal(evaluateSource(src, "<h1>Sunday, February 7, 2027</h1><p>Parade time not posted</p>".repeat(10)).ok, false);
});
test("Port Arthur regional festival gate hours must not become fabricated parade times", () => {
  const source = OFFICIAL_SOURCES.find((s) => s.id === "port-arthur-gate-hours");
  const gates = ("Mardi Gras Port Arthur 2027 Gate Times on Procter St. at Glance: Friday February 5th - 6 p.m. to 11:30 p.m. Saturday February 6th - Noon - 11:30 p.m. Sunday February 7th - Noon - 7:00 p.m. ").repeat(4);
  assert.equal(evaluateSource(source, gates).ok, true);
  assert.equal(evaluateSource(source, gates.replaceAll("Friday February 5th - 6 p.m. to 11:30 p.m.", "Friday schedule to be announced")).ok, false);
});

test("Orange future year is not fabricated from 2026 historical schedule", () => {
  const src = OFFICIAL_SOURCES.find((s) => s.id === "orange-sabine");
  const historical = ("Information for the 2027 Mardi Gras on the Sabine will be updated at a later date. Saturday, February 7, 2026. ").repeat(10);
  assert.equal(evaluateSource(src, historical).ok, true);
  assert.equal(evaluateSource(src, ("The 2027 Mardi Gras on the Sabine is coming soon. ").repeat(10)).ok, false);
});
test("Beaumont's public festival remains separate from the Pardi Gras charity", () => {
  const src = OFFICIAL_SOURCES.find((s) => s.id === "beaumont-festival");
  assert.equal(evaluateSource(src, ("Feb. 13th, 14th & 15th Doggett Ford Park ").repeat(10)).ok, true);
  assert.equal(evaluateSource(src, ("Mardi Gras of Southeast Texas February 5–7, 2027 Doggett Ford Park ").repeat(10)).ok, false);
});
test("short anti-bot responses and unexpected source changes fail closed", () => {
  assert.equal(evaluateSource(OFFICIAL_SOURCES[0], "Just a moment...").ok, false);
  assert.equal(evaluateSource(OFFICIAL_SOURCES.at(-1), ("January festival canceled. ").repeat(30)).ok, false);
});
