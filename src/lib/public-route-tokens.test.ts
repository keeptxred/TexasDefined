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

test("all 16 historical GSC template URL patterns fail closed, even escaped", () => {
  const malformed = [
    "/explore/casinos/$slug",
    "/explore/painted-churches/people/$slug",
    "/explore/region/$region",
    "/explore/near/$metro/$collection",
    "/sports-venue/$slug",
    "/authors/$author",
    "/explore/$category",
    "/texas-vs/$state",
    "/texas-data/$datasetSlug",
    "/destination/$slug",
    "/texas-icons_/$slug",
    "/texas-symbols/$slug",
    "/$kind/$slug",
    "/explore/near/$metro",
    "/events/$collection",
    "/explore/painted-churches_/guides_/$slug",
  ];
  assert.equal(malformed.length, 16);
  for (const url of malformed) {
    assert.equal(hasUnresolvedPublicRouteToken(url), true, url);
    assert.equal(hasUnresolvedPublicRouteToken(url.replaceAll("$", "%24")), true, "escaped " + url);
    assert.equal(hasUnresolvedPublicRouteToken(url.replaceAll("$", "%2524")), true, "double escaped " + url);
  }
});
