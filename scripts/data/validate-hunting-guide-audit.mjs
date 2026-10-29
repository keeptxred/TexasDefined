import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const hub = read("src/components/hunting/HuntingHubPage.tsx");
const leaf = read("src/components/hunting/HuntingTopicPage.tsx");
const notice = read("src/components/hunting/HuntingRegulationArchiveNotice.tsx");
const topics = read("src/data/hunting/authority.ts");
const basic = read("src/data/hunting/authority-v2.ts");
const hubUi = read("src/components/hunting/HuntingAuthority.tsx");
const all = topics + "\n" + basic;
const keys = [...all.matchAll(/^\s{2}"([a-z0-9-]+)":/gm)].map(m => m[1]);
const unique = [...new Set(keys)];

assert.equal(unique.length, 30, "all 30 hunting authority guides remain registered");
for (const [name, source] of [["hub", hub], ["leaf", leaf]]) {
  assert.ok(source.includes("<HuntingRegulationArchiveNotice />"), name + " must display archived year notice");
}
assert.ok(leaf.includes("<HuntingRegulationArchiveNotice /><YouthHuntingPage"), "dedicated youth route must show expired notice");
assert.ok(leaf.includes("<HuntingRegulationArchiveNotice /><HuntingAuthorityTopicPage"), "dedicated deer and turkey plus other guides must show expired notice");
for (const marker of [
  "HUNTING_REGULATION_FRESHNESS.validThrough",
  "America/Chicago",
  "TPWD's current Outdoor Annual",
  "historical",
  'role="status"',
  'setExpired(Boolean(texasDate',
]) assert.ok(notice.includes(marker), "missing fail-closed archive protection: " + marker);
for (const [slug, terms] of Object.entries({
  "archery-hunting": ["Collin, Dallas, Grayson, and Rockwall", "upper-limb disability", "Archery Endorsement"],
  "hunter-education": ["September 2, 1971", "ages 9–16", "one-time deferral"],
  "drawn-hunts": ["ten days to claim", "loyalty points", "next business day"],
  "hunting-seasons": ["dove", "one date range", "legal"],
  "bag-limits": ["quail", "15", "45"],
  "annual-public-hunting-permit": ["$48", "$12", "Limited Public Use"],
  "public-hunting": ["E-Postcard", "legal-game", "not automatically"],
})) {
  const start = topics.indexOf('  "' + slug + '": topic(');
  assert.ok(start >= 0, "guide missing " + slug);
  const end = topics.indexOf("\n  \"", start + 5);
  const section = topics.slice(start, end < 0 ? topics.length : end);
  for (const term of terms) assert.ok(section.includes(term), slug + " lacks specific verified context: " + term);
  assert.ok((section.match(/heading: /g) || []).length >= 4, slug + " needs at least four distinct decision-oriented sections");
}
for (const url of [
 "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/general-regulations/means-and-methods",
 "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/dove",
 "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/quail",
 "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/duck",
]) assert.ok(topics.includes(url), "direct official species/means source missing " + url);
assert.ok(hubUi.includes("Statewide source overview checked"), "topic metadata must not imply each topic was re-reviewed today");
assert.ok(!topics.includes("2027–28 season is open"), "future official season must never be invented");
console.log("PASS hunting audit: all 30 existing topics, archived notice on every route, seven specific TPWD-driven core guides and correctly scoped source metadata");
