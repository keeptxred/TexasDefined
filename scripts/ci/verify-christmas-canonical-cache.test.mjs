import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const server = readFileSync("src/server.ts", "utf8");
const purge = readFileSync("scripts/ci/purge-cloudflare-cache.mjs", "utf8");
const deploy = readFileSync(".github/workflows/deploy-production.yml", "utf8");
const verifier = readFileSync("scripts/ci/verify-christmas-hub-production.mjs", "utf8");

test("Texas Christmas calendar SSR is not cached after Texas-local date rollover", () => {
  assert.match(server, /function applyChristmasHolidayEdgeCachePolicy\(/);
  assert.match(server, /url\.pathname !== "\/events\/christmas-events"/);
  assert.match(server, /applyPlayoffGuideEdgeCachePolicy\(request, applyChristmasHolidayEdgeCachePolicy\(request,/);
  const section = server.slice(server.indexOf("function applyChristmasHolidayEdgeCachePolicy("),
    server.indexOf("async function addBingVerificationMeta("));
  for (const header of ["Cache-Control", "CDN-Cache-Control", "Cloudflare-CDN-Cache-Control"])
    assert.ok(section.includes(`headers.set("${header}", "no-store`),
      `Christmas SSR must set ${header} no-store`);
  assert.match(section, /headers\.delete\("age"\)/);
});

test("fresh Worker deployment invalidates only relevant canonical holiday HTML", () => {
  for (const url of [
    "events/christmas-events", "events",
    "event/caldwell-kolache-festival", "county/burleson",
  ]) {
    assert.ok(purge.includes(`${zoneName}/${url}`) || purge.includes(`/ ${url}`),
      `Missing targeted purge for ${url}`);
    assert.ok(deploy.includes(`https://texasdefined.com/${url}`),
      `Missing protected workflow purge of ${url}`);
  }
  assert.match(verifier, /expectedActiveCommunityCount = remainingCommunityEvents\.length/);
  assert.match(verifier, /cacheBusted = await check\(/);
});
