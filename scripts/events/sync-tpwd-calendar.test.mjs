import test from "node:test";
import assert from "node:assert/strict";
import { parseTpwdCalendar } from "./sync-tpwd-calendar.mjs";

const NOW = new Date("2026-10-21T18:00:00Z");
const link = (title, path) => '<h3><a href="' + path + '">' + title + "</a></h3>";
test("imports dated park activity facts without copying prose", () => {
  const html = [
    link("Forest Trail Hike", "/calendar/martin-dies-jr/forest-trail-hike/2026-10-22"),
    "<p>Copyrighted description must not be stored</p>",
    link("Tiny Trailblazers", "/calendar/lake-somerville-birch-creek/tiny-trailblazers-1/2026-10-22"),
  ].join("");
  const events = parseTpwdCalendar(html, NOW);
  assert.equal(events.length, 2);
  assert.equal(events[0].startDate, "2026-10-22");
  assert.ok(events.every(e => !JSON.stringify(e).includes("Copyrighted")));
  assert.equal(events[0].parkKey, "martin-dies-jr");
});
test("excludes routine, admin, malformed, expired and far future listings", () => {
  const html = [
    link("Visitor Center Hours", "/calendar/some-park/visitor-center/2026-10-22"),
    link("TPWD Job Fair", "/calendar/some-park/job-fair/2026-10-22"),
    link("Nature Walk", "/calendar/some-park/nature-walk/2026-10-20"),
    link("Stargazing", "/calendar/some-park/stargazing/2027-03-03"),
    link("Birding Walk", "/calendar/some-park/birding/2026-10-23"),
    link("Birding Walk", "https://scam.example/calendar/some-park/birding/2026-10-23"),
    link("Birding Walk", "/calendar/some-park/birding/not-a-date"),
  ].join("");
  assert.deepEqual(parseTpwdCalendar(html, NOW).map(e => e.title), ["Birding Walk"]);
});
test("includes unique festivals and interpretive programs that lack generic keywords", () => {
  const html = [
    link("TRAIL OF TERROR", "/calendar/lockhart/trail-of-terror/2026-10-22"),
    link("Pirates of the Canyon", "/calendar/palo-duro-canyon/pirates-of-the-canyon/2026-10-23"),
    link("Picnic in the Park", "/calendar/buescher/picnic-in-the-park/2026-10-22"),
    link("Texas A&M Galveston Career Fair", "/calendar/galveston/career/2026-10-22"),
    link("Education Center Open", "/calendar/martin-dies-jr/education-center-open/2026-10-22"),
  ].join("");
  assert.deepEqual(parseTpwdCalendar(html, NOW).map(item => item.title), [
    "Picnic in the Park", "TRAIL OF TERROR", "Pirates of the Canyon",
  ]);
});
test("deduplicates calendar links across repeated source sections", () => {
  const same = link("Night Sky Tour", "/calendar/park/night-sky/2026-10-25");
  assert.equal(parseTpwdCalendar(same + same, NOW).length, 1);
});
