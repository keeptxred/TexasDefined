import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { targets, verifySource } from "./check-november-event-sources.mjs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("watcher accepts 2026 organizer windows, rejects stale and missing dates", () => {
  assert(verifySource("<h1>November 27, 2026 - January 3, 2027</h1>", targets[0]));
  assert(!verifySource("<p>November 28, 2026 - January 4, 2027</p>", targets[0]));
  assert(verifySource("<p>November 28 - December 28</p><p>2026 schedule</p>", targets[1]));
  assert(!verifySource("<p>November 27 - November 29, 2026</p>", targets[1]));
});

test("November collection stays consumer-focused with responsive filters", () => {
  const collections = read("../../src/data/event-temporal-collections.server.ts");
  const block = collections.slice(collections.indexOf('slug: "november-events"'), collections.indexOf('slug: "december-events"'));
  const visitorCopy = [block.match(/lead: "([^"]+)"/)?.[1], ...Array.from(block.matchAll(/"([^"]+)",?\n/g), (m) => m[1])].join(" ");
  assert(!/noindex|indexable|crawl|SEO|thin seasonal page/i.test(visitorCopy));
  const layout = read("../../src/routes/events.$collection.lazy.tsx");
  for (const token of ["NovemberCollectionBrowser", "Filter November events by date", "Filter November events by region", "Filter November events by city", "Filter November events by category", "novemberOfficialPicks"]) {
    assert(layout.includes(token), `Missing November UI token ${token}`);
  }
});

test("canonical event seasons and title deduplication remain correct", () => {
  const johnson = read("../../src/data/major-event-expanded-authority-tranche45.server.ts");
  const j = johnson.slice(johnson.indexOf('slug: "johnson-city-christmas-lights-spectacular"'));
  assert(j.includes('startDate: "2026-11-27"'));
  assert(j.includes('endDate: "2027-01-03"'));
  const south = read("../../src/data/major-event-expanded-authority-tranche47.server.ts");
  const s = south.slice(south.indexOf('slug: "south-pole-illuminated-festival"'), south.indexOf('slug: "bill-pickett-rodeo-fort-worth"'));
  assert(s.includes('startDate: "2026-11-28"'));
  assert(s.includes('endDate: "2026-12-28"'));
  const page = read("../../src/data/major-event-page.server.ts");
  assert(page.includes('yearQualifiedEventName'));
  const picks = read("../../src/data/events/november-official-picks-2026.ts");
  for (const token of ["ThunderCloud Subs Turkey Trot", "Dallas YMCA Turkey Trot", "Fort Worth YMCA Turkey Trot", "Calaveras de Azúcar Festival"]) assert(picks.includes(token));
});
