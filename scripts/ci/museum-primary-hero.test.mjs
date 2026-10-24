import assert from "node:assert/strict";
import test from "node:test";
import { primaryDestinationHeroSrc, primaryDestinationHeroAlt, isMissingPrimaryDestinationHero } from "./museum-primary-hero.mjs";

const hero = '<div data-image-fallback-label="" aria-hidden="true" class="absolute inset-0"></div>'
  + '<img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Former_alvin_tx_post_office.jpg?width=1600&amp;source=td" alt="Exact museum exterior">';

test("primary hero remains valid when a related destination card has a missing-photo placeholder", () => {
  const html = '<html><body>' + hero
    + '<aside><img src="/texasdefined-destination-placeholder.svg" alt="Other unverified destination"></aside>'
    + '</body></html>';
  assert.equal(isMissingPrimaryDestinationHero(html), false);
  assert.match(primaryDestinationHeroSrc(html), /Former_alvin_tx_post_office\.jpg\?width=1600&source=td/);
});

test("primary placeholder cannot pass by borrowing a related museum's licensed image", () => {
  const html = '<body><div data-image-fallback-label aria-hidden="true"></div>'
    + '<img src="/texasdefined-destination-placeholder.svg">'
    + '<aside><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Actual_Museum.jpg"></aside></body>';
  assert.equal(isMissingPrimaryDestinationHero(html), true);
});

test("missing or structurally changed primary hero fails closed", () => {
  assert.equal(isMissingPrimaryDestinationHero('<body><img src="https://example.com/unrelated.jpg"></body>'), true);
  assert.equal(isMissingPrimaryDestinationHero(''), true);
});

test("first destination hero is the only photo accepted", () => {
  const html = '<body><section>' + hero + '</section>' + hero.replace('Former_alvin_tx_post_office.jpg','Wrong_related.jpg') + '</body>';
  assert.match(primaryDestinationHeroSrc(html), /Former_alvin_tx_post_office\.jpg/);
});

test("primary alt text belongs only to the actual marked hero", () => {
  const markup = '<div data-image-fallback-label aria-hidden="true"></div>'
    + '<img alt="Museum &amp; Archive entrance&#39;s west face" src="https://example.org/museum.jpg">';
  assert.equal(primaryDestinationHeroAlt('<body>' + markup + '<aside><img alt="Wrong place"></aside></body>'),
    "Museum & Archive entrance's west face");
  assert.equal(primaryDestinationHeroAlt('<aside><img alt="Unrelated photo"></aside>'), "");
});
