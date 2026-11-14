import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { calculateArticleReadingMinutes, countArticleWords } from "./article-reading-time";

const indexSource = readFileSync(new URL("./index.ts", import.meta.url), "utf8");
const lazyStubSource = readFileSync(new URL("./fixtures/texas-wildlife-guide-stub.ts", import.meta.url), "utf8");

describe("article reading-time normalization", () => {
  it("preserves declared reading time when a lazy discovery stub has no body text", () => {
    expect(calculateArticleReadingMinutes({ body: [], readingMinutes: 18 })).toBe(18);
    expect(indexSource).toContain("readingMinutes: calculateArticleReadingMinutes(article)");
    expect(lazyStubSource).toContain("readingMinutes: 18");
    expect(lazyStubSource).toContain("body: []");
  });

  it("uses full story words at 220 words/minute while excluding media-only blocks", () => {
    const paragraph = { type: "paragraph" as const, text: Array(221).fill("Texas").join(" ") };
    const image = { type: "image" as const, image: { src: "/test.jpg", alt: "Photo", width: 100, height: 100 } };
    const body = [paragraph, image];
    expect(countArticleWords(body)).toBe(221);
    expect(calculateArticleReadingMinutes({ body, readingMinutes: 18 })).toBe(2);
  });
});
