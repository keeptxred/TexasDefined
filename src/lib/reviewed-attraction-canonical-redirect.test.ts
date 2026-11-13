import test from "node:test";
import assert from "node:assert/strict";
import { reviewedAttractionCanonicalRedirect, REVIEWED_ATTRACTION_CANONICAL_PATHS } from "./reviewed-attraction-canonical-redirect.ts";

const host = "https://texasdefined.com";
const request = (url: string, method = "GET") => new Request(url, { method });

test("the three reviewed attraction canonical documents remain 200-ready (no redirect)", () => {
  assert.equal(REVIEWED_ATTRACTION_CANONICAL_PATHS.length, 3);
  for (const path of REVIEWED_ATTRACTION_CANONICAL_PATHS) {
    assert.equal(reviewedAttractionCanonicalRedirect(request(host + path)), null, path);
  }
});

test("tracking, slash, case and www versions redirect directly to one exact clean canonical", () => {
  for (const path of REVIEWED_ATTRACTION_CANONICAL_PATHS) {
    for (const input of [
      host + path + "?utm_source=attraction-canonical-audit",
      host + path + "?utm_source=one&utm_medium=email",
      host + path + "/",
      "https://www.texasdefined.com" + path,
      host + path.toUpperCase() + "/?utm_campaign=qa",
    ]) {
      const response = reviewedAttractionCanonicalRedirect(request(input));
      assert.equal(response?.status, 301, input);
      assert.equal(response?.headers.get("location"), host + path, input);
    }
  }
});

test("no outside-page, alternate-host or non-navigation redirects", () => {
  for (const url of [
    host + "/destination/fort-worth-botanic-garden?utm_source=foo",
    host + "/destination/houston-botanic-garden-private",
    host + "/county/tarrant?utm_source=foo",
    "https://example.org/destination/houston-botanic-garden?utm_source=foo",
  ]) assert.equal(reviewedAttractionCanonicalRedirect(request(url)), null, url);
  for (const method of ["POST", "PUT", "DELETE", "OPTIONS"]) {
    assert.equal(reviewedAttractionCanonicalRedirect(request(host + REVIEWED_ATTRACTION_CANONICAL_PATHS[2] + "?utm_source=foo", method)), null);
  }
  assert.equal(reviewedAttractionCanonicalRedirect(request(host + REVIEWED_ATTRACTION_CANONICAL_PATHS[2] + "?utm_source=foo", "HEAD"))?.status, 301);
});
