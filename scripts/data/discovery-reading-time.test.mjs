import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  MAX_DISCOVERY_READING_TIME_RESOLUTION,
  verifiedDiscoveryReadingMinutes,
  verifyDiscoveryReadingTimes,
} from "../../src/data/verified-discovery-reading-time.ts";

const body = (words) => [{
  type: "paragraph",
  text: Array.from({ length: words }, () => "texas").join(" "),
}];
const article = (slug, estimate, words = 0) => ({
  id: slug, brandId: "texasdefined", slug, title: slug,
  dek: "", category: "guides", hero: {src: "", alt: "", width: 1, height: 1},
  authorId: "editor", publishedAt: "2026-11-06", readingMinutes: estimate,
  tags: [], body: words ? body(words) : [], relatedCollections: [], relatedDestinations: [],
});

test("all four previously mismatched homepage discovery stubs take canonical article times", async () => {
  const examples = [
    ["texas-wine-country", 23, 8 * 220],
    ["scenic-drives-in-texas", 27, 10 * 220],
    ["fredericksburg-johnson-city-historic-road-trip", 19, 11 * 220],
    ["texas-pecos-river-guide", 11, 5 * 220],
  ];
  const stubs = examples.map(([slug, estimate]) => article(slug, estimate));
  const visited = [];
  const resolved = await verifyDiscoveryReadingTimes(stubs, async (slug) => {
    visited.push(slug);
    const found = examples.find((row) => row[0] === slug);
    assert.ok(found);
    return article(slug, 999, found[2]);
  });
  assert.equal(visited.length, examples.length);
  for (let i = 0; i < examples.length; i++) {
    const [slug, , words] = examples[i];
    assert.equal(resolved[i].slug, slug);
    assert.equal(verifiedDiscoveryReadingMinutes(resolved[i]), words / 220);
    assert.equal(stubs[i].readingTimeVerified, undefined, "input stubs were mutated");
  }
});

test("a detail failure or an empty body never re-exposes a guessed read time", async () => {
  const stubs = [article("temporarily-unavailable", 30), article("empty-detail", 40)];
  const output = await verifyDiscoveryReadingTimes(stubs, async (slug) => {
    if (slug === "temporarily-unavailable") throw Error("transient upstream");
    return article(slug, 40);
  });
  assert.equal(verifiedDiscoveryReadingMinutes(output[0]), null);
  assert.equal(verifiedDiscoveryReadingMinutes(output[1]), null);
  assert.equal(output[0].readingMinutes, 30);
});

test("unbounded archives never import hundreds of complete articles to show a decorative estimate", async () => {
  const list = Array.from({ length: MAX_DISCOVERY_READING_TIME_RESOLUTION + 1 },
    (_, i) => article("article-" + i, 18));
  let invoked = 0;
  const resolved = await verifyDiscoveryReadingTimes(list, async () => {
    invoked++;
    throw Error("should never run");
  });
  assert.equal(invoked, 0);
  assert.equal(resolved.length, list.length);
  assert.ok(resolved.every((a) => verifiedDiscoveryReadingMinutes(a) === null));
});

test("feature, card and canonical detail all use one verified discovery contract", () => {
  const files = [
    ["src/data/queries.ts", [
      "verifyDiscoveryReadingTimes(discovered, loadCanonicalArticleDetail)",
      "queryFn: () => loadCanonicalArticleDetail(slug)",
    ]],
    ["src/routes/index.lazy.tsx", ["verifiedDiscoveryReadingMinutes(hero)"]],
    ["src/components/editorial/ArticleCard.tsx", ["verifiedDiscoveryReadingMinutes(article)"]],
    ["src/components/editorial/FeatureHero.tsx", ["verifiedDiscoveryReadingMinutes(article)"]],
  ];
  for (const [path, markers] of files) {
    const source = readFileSync(path, "utf8");
    for (const marker of markers) {
      assert.ok(source.includes(marker), path + ": missing " + marker);
    }
  }
});
