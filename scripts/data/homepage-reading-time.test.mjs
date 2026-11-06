import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import test from "node:test";

import { calculateArticleReadingMinutes, countArticleWords } from "../../src/data/article-reading-time.ts";
import { ussLexingtonCv16HistoryVisitorGuideArticle as article } from "../../src/data/fixtures/uss-lexington-cv16-history-visitor-guide.ts";
import { USS_LEXINGTON_CV16_READING_MINUTES } from "../../src/data/fixtures/uss-lexington-reading-time.generated.ts";

const slug = "uss-lexington-cv16-history-visitor-guide";
const lazySource = readFileSync(new URL("../../src/data/fixtures/lazy-standalone-evergreen.ts", import.meta.url), "utf8");
const indexedSource = readFileSync(new URL("../../src/data/index.ts", import.meta.url), "utf8");
const fixtureSource = readFileSync(new URL("../../src/data/fixtures/repositories.ts", import.meta.url), "utf8");

test("USS Lexington reading-time metadata is generated from actual article text", () => {
  assert.equal(article.slug, slug);
  assert.ok(countArticleWords(article.body) > 1000, "full article unexpectedly lacks published text");
  const computedMinutes = calculateArticleReadingMinutes(article);
  assert.equal(computedMinutes, USS_LEXINGTON_CV16_READING_MINUTES);
  assert.equal(article.readingMinutes, computedMinutes);
  // Verify source-generated metadata is fresh after edits to this story.
  execFileSync(process.execPath, [
    "--experimental-strip-types",
    "scripts/data/generate-uss-lexington-reading-time.mjs",
    "--check",
  ], { encoding: "utf8", timeout: 15000 });
});

test("homepage feature and detail use the exact same lightweight estimate", () => {
  const start = lazySource.indexOf("const ussLexingtonCv16HistoryVisitorGuideStub: Article = {");
  assert.ok(start >= 0, "missing homepage source stub");
  const stub = lazySource.slice(start, lazySource.indexOf("\n};", start));
  assert.ok(stub.includes("readingMinutes: USS_LEXINGTON_CV16_READING_MINUTES"));
  assert.ok(stub.includes("body: []"), "homepage must not import heavy article text");
  assert.ok(lazySource.includes('from "./uss-lexington-reading-time.generated.ts"'));
  assert.ok(!lazySource.includes('from "./uss-lexington-cv16-history-visitor-guide"'));
  assert.ok(indexedSource.includes("readingMinutes: calculateArticleReadingMinutes(article)"));
  assert.ok(fixtureSource.includes("readingMinutes: calculateArticleReadingMinutes(article)"));
});

test("reading-time calculation handles media exclusion, empty stubs and rounded word limits", () => {
  const image = { type: "image", image: { src: "example.jpg", alt: "Image", width: 100, height: 100 } };
  const block = { type: "paragraph", text: Array(221).fill("word").join(" ") };
  assert.equal(countArticleWords([image, block]), 221);
  assert.equal(calculateArticleReadingMinutes({ body: [image, block], readingMinutes: 18 }), 2);
  assert.equal(calculateArticleReadingMinutes({ body: [], readingMinutes: 18 }), 18);
  assert.equal(calculateArticleReadingMinutes({ body: [], readingMinutes: 0 }), 1);
});
