import assert from "node:assert/strict";
import test from "node:test";

import {
  BOOKING_CJ_PUBLISHER_ID,
  bookingAffiliateDestinations,
  buildBookingCjDeepLink,
} from "../booking-affiliate.ts";

test("Booking.com approved destinations generate TexasDefined CJ deep links", () => {
  assert.equal(BOOKING_CJ_PUBLISHER_ID, "101876465");
  for (const destination of Object.values(bookingAffiliateDestinations)) {
    const affiliateUrl = buildBookingCjDeepLink(destination);
    assert.match(affiliateUrl, /^https:\/\/www\.anrdoezrs\.net\/links\/101876465\/type\/dlg\/https:\/\/www\.booking\.com\//);
    assert.ok(affiliateUrl.endsWith(new URL(destination).pathname));
  }
});

test("Booking.com deep-link builder rejects non-Booking destinations", () => {
  assert.throws(() => buildBookingCjDeepLink("https://example.com/flights"), /Unsupported Booking\.com affiliate destination/);
  assert.throws(() => buildBookingCjDeepLink("http://www.booking.com/flights/index.html"), /Unsupported Booking\.com affiliate destination/);
});
