import assert from "node:assert/strict";
import { test } from "node:test";

import { hasUnresolvedPublicRouteToken } from "./public-route-tokens.ts";

test("unsubstituted route parameter paths never qualify for public crawling", () => {
  for (const route of [
    "/explore/near/$metro",
    "/events/$collection",
    "/explore/painted-churches_/guides_/$slug",
    "/explore/near/%24metro",
    "/events/%2524collection",
    "/{-$optional}",
    "/%7B-%24optional%7D",
  ]) {
    assert.equal(hasUnresolvedPublicRouteToken(route), true, route);
  }
});

test("ordinary visitor URLs and query-safe slugs are not suppressed", () => {
  for (const route of [
    "/",
    "/explore/near/houston",
    "/events/texas-this-weekend",
    "/explore/painted-churches/guides",
    "/destination/choke-canyon-state-park",
    "/article/texas-road-trips",
  ]) {
    assert.equal(hasUnresolvedPublicRouteToken(route), false, route);
  }
});

test("malformed URL escape sequences fail closed", () => {
  assert.equal(hasUnresolvedPublicRouteToken("/explore/near/%24invalid%"), true);
});
