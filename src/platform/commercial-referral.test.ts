import assert from "node:assert/strict";
import test from "node:test";

import {
  commercialReferralForAnchor,
  markEarlyCommercialReferralEvent,
  wasEarlyCommercialReferralEvent,
} from "./commercial-referral.ts";

test("maps commercial anchor metadata into the first-party referral payload", () => {
  assert.deepEqual(
    commercialReferralForAnchor({
      href: "https://www.hotels.com/example",
      dataset: {
        commercialPartner: "hotels.com",
        commercialPlacement: "stay-nearby-card-exact",
      },
    }),
    {
      resourceId: "hotels.com",
      entityKind: "stay-nearby-card-exact",
      destination: "https://www.hotels.com/example",
    },
  );
});

test("defaults missing commercial placement without losing the partner", () => {
  assert.deepEqual(
    commercialReferralForAnchor({
      href: "https://www.viator.com/Texas/d296",
      dataset: { commercialPartner: "viator" },
    }),
    {
      resourceId: "viator",
      entityKind: "unspecified",
      destination: "https://www.viator.com/Texas/d296",
    },
  );
});

test("ignores anchors that are not commercial", () => {
  assert.equal(
    commercialReferralForAnchor({
      href: "https://texasdefined.com/explore",
      dataset: {},
    }),
    null,
  );
});

test("early-click dedupe is scoped to the exact browser event", () => {
  const earlyEvent = {};
  const laterEvent = {};

  assert.equal(wasEarlyCommercialReferralEvent(earlyEvent), false);
  assert.equal(wasEarlyCommercialReferralEvent(laterEvent), false);

  markEarlyCommercialReferralEvent(earlyEvent);

  assert.equal(wasEarlyCommercialReferralEvent(earlyEvent), true);
  assert.equal(wasEarlyCommercialReferralEvent(laterEvent), false);
});
