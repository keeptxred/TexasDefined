import assert from "node:assert/strict";
import test from "node:test";

import { texasDefinedOutcomeAnalyticsResponse } from "./texas-defined-outcome-analytics.server.ts";

type DataPoint = { blobs?: string[]; doubles?: number[]; indexes?: string[] };

function request(body: unknown, origin = "https://texasdefined.com") {
  return new Request("https://texasdefined.com/api/analytics", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin,
    },
    body: JSON.stringify(body),
  });
}

function env(points: DataPoint[]) {
  return {
    TEXAS_DEFINED_OUTCOME_ANALYTICS: {
      writeDataPoint(point: DataPoint) {
        points.push(point);
      },
    },
  };
}

test("ignores requests outside the analytics API path", async () => {
  const response = await texasDefinedOutcomeAnalyticsResponse(
    new Request("https://texasdefined.com/not-analytics"),
    {},
  );
  assert.equal(response, null);
});

test("rejects cross-origin analytics writes", async () => {
  const response = await texasDefinedOutcomeAnalyticsResponse(
    request({ event: "partner_referral_clicked" }, "https://example.com"),
    env([]),
  );
  assert.equal(response?.status, 403);
});

test("rejects unknown event names", async () => {
  const response = await texasDefinedOutcomeAnalyticsResponse(
    request({ event: "invented_event" }),
    env([]),
  );
  assert.equal(response?.status, 400);
});

test("fails closed when the Analytics Engine binding is unavailable", async () => {
  const response = await texasDefinedOutcomeAnalyticsResponse(
    request({ event: "partner_referral_clicked" }),
    {},
  );
  assert.equal(response?.status, 503);
});

test("writes sanitized partner-referral telemetry without persisting session IDs", async () => {
  const points: DataPoint[] = [];
  const response = await texasDefinedOutcomeAnalyticsResponse(
    request({
      event: "partner_referral_clicked",
      resourceId: "hotels.com",
      entityKind: "stay-nearby-card-exact",
      query: "Email me at test@example.com or call 713-555-1212 at 123 Main St",
      destination: "https://www.hotels.com/ho115100/hilton-anatole-dallas-united-states-of-america/",
      path: "/sports-venue/globe-life-field?private=value",
      occurredAt: "2026-09-15T20:00:00-05:00",
      sessionId: "raw-session-id-must-not-persist",
    }),
    env(points),
  );

  assert.equal(response?.status, 202);
  assert.deepEqual(await response?.json(), { accepted: 1 });
  assert.equal(points.length, 1);
  assert.equal(points[0]?.blobs?.[0], "partner_referral_clicked");
  assert.equal(points[0]?.blobs?.[1], "hotels.com");
  assert.equal(points[0]?.blobs?.[6], "stay-nearby-card-exact");
  assert.equal(points[0]?.blobs?.[10], "/sports-venue/globe-life-field");
  assert.match(points[0]?.blobs?.[4] || "", /\[email\]/);
  assert.match(points[0]?.blobs?.[4] || "", /\[phone\]/);
  assert.match(points[0]?.blobs?.[4] || "", /\[address\]/);
  assert.ok(!JSON.stringify(points[0]).includes("raw-session-id-must-not-persist"));
  assert.match(points[0]?.indexes?.[0] || "", /^partner_referral_clicked:hotels\.com$/);
});

test("writes privacy-safe partner referral impressions with the same partner and placement dimensions", async () => {
  const points: DataPoint[] = [];
  const response = await texasDefinedOutcomeAnalyticsResponse(
    request({
      event: "partner_referral_shown",
      resourceId: "citypass",
      entityKind: "citypass-houston-destination",
      destination: "https://citypass.7eer.net/c/7236213/305537/3331",
      path: "/destination/houston?private=value",
      occurredAt: "2026-09-18T13:30:00Z",
      sessionId: "raw-session-id-must-not-persist",
    }),
    env(points),
  );

  assert.equal(response?.status, 202);
  assert.deepEqual(await response?.json(), { accepted: 1 });
  assert.equal(points.length, 1);
  assert.equal(points[0]?.blobs?.[0], "partner_referral_shown");
  assert.equal(points[0]?.blobs?.[1], "citypass");
  assert.equal(points[0]?.blobs?.[6], "citypass-houston-destination");
  assert.equal(points[0]?.blobs?.[10], "/destination/houston");
  assert.ok(!JSON.stringify(points[0]).includes("raw-session-id-must-not-persist"));
  assert.match(points[0]?.indexes?.[0] || "", /^partner_referral_shown:citypass$/);
});

test("rejects batches larger than the collector cap", async () => {
  const response = await texasDefinedOutcomeAnalyticsResponse(
    request({ events: Array.from({ length: 51 }, () => ({ event: "resource_found" })) }),
    env([]),
  );
  assert.equal(response?.status, 400);
});
