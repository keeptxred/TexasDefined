import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const indexSource = readFileSync(new URL("./index.ts", import.meta.url), "utf8");
const lazyStubSource = readFileSync(new URL("./fixtures/texas-wildlife-guide-stub.ts", import.meta.url), "utf8");

describe("article reading-time normalization", () => {
  it("preserves declared reading time when a lazy discovery stub has no body text", () => {
    expect(indexSource).toContain("if (wordCount === 0) return Math.max(1, article.readingMinutes);");
    expect(lazyStubSource).toContain("readingMinutes: 18");
    expect(lazyStubSource).toContain("body: []");
  });
});
