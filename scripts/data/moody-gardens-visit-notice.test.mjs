import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  isMoodyGardensNov16NoticeActive,
  moodyGardensNov16Notice,
} from "../../src/data/moody-gardens-visit-notice.ts";

test("early-closing notice is shown ahead of Nov. 16 and through its final local minute", () => {
  assert.equal(isMoodyGardensNov16NoticeActive(Date.parse("2026-11-12T23:59:59Z")), false);
  assert.equal(isMoodyGardensNov16NoticeActive(Date.parse("2026-11-13T00:00:00Z")), true);
  assert.equal(isMoodyGardensNov16NoticeActive(Date.parse("2026-11-16T19:00:00Z")), true);
  assert.equal(isMoodyGardensNov16NoticeActive(Date.parse("2026-11-17T05:59:59Z")), true);
  assert.equal(isMoodyGardensNov16NoticeActive(Date.parse("2026-11-17T06:00:00Z")), false);
  assert.equal(isMoodyGardensNov16NoticeActive(Date.parse("2027-01-15T00:00:00Z")), false);
  assert.equal(isMoodyGardensNov16NoticeActive(Number.NaN), false);
});

test("operating notice uses the operator's exact early-closing times and official URL", () => {
  assert.match(moodyGardensNov16Notice.heading, /Monday, Nov\. 16/);
  assert.match(moodyGardensNov16Notice.explanation, /last entry.*1 p\.m\./i);
  assert.match(moodyGardensNov16Notice.explanation, /outage beginning at 2 p\.m\./i);
  assert.equal(moodyGardensNov16Notice.sourceUrl, "https://www.moodygardens.com/visitor-info/hours");
  assert.equal(moodyGardensNov16Notice.sourceReviewed, "November 13, 2026");
});

test("the notice is rendered only behind the temporary expiry guard", () => {
  const component = readFileSync("src/components/editorial/MoodyGardensSpotlights.tsx", "utf8");
  assert.match(component, /isMoodyGardensNov16NoticeActive\(\)\s*&&/);
  assert.match(component, /moodyGardensNov16Notice\.explanation/);
  assert.match(component, /moodyGardensNov16Notice\.sourceUrl/);
  assert.match(component, /Temporary Moody Gardens operating-hours notice/);
});
