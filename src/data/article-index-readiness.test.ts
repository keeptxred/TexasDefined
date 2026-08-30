import { describe, expect, it } from "vitest";

import type { Article } from "./types";
import {
  ARTICLE_DISCOVERY_MIN_READING_MINUTES,
  ARTICLE_INDEX_MIN_BODY_WORDS,
  isArticleDiscoveryReady,
  isArticleIndexReady,
  shouldNoindexTexasGatewayArticle,
} from "./fixtures/texas-gateway-index-readiness";

const bodyText = Array.from({ length: ARTICLE_INDEX_MIN_BODY_WORDS }, (_, index) => `word${index}`).join(" ");

const readyArticle: Article = {
  id: "article-ready",
  brandId: "texasdefined",
  slug: "ready-texas-guide",
  title: "A Substantive Texas Guide With a Clear Reader Purpose",
  dek: "A practical, source-aware Texas guide with enough context to help readers understand the subject before they act or travel.",
  category: "texas-history",
  hero: { src: "/images/ready.jpg", alt: "Historic Texas courthouse under a clear sky", width: 1600, height: 900 },
  authorId: "a-hollis",
  publishedAt: "2026-08-27T12:00:00.000Z",
  readingMinutes: 5,
  tags: ["Texas"],
  body: [{ type: "paragraph", text: bodyText }],
  relatedCollections: [],
  relatedDestinations: [],
  sourceName: "Texas State Library and Archives Commission",
  sourceUrl: "https://www.tsl.texas.gov/",
};

describe("strict article index readiness", () => {
  it("allows a substantive, attributable Texas article", () => {
    expect(isArticleIndexReady(readyArticle)).toBe(true);
    expect(isArticleDiscoveryReady(readyArticle)).toBe(true);
    expect(shouldNoindexTexasGatewayArticle(readyArticle)).toBe(false);
  });

  it("quarantines articles below the body-depth floor", () => {
    const thin = { ...readyArticle, body: [{ type: "paragraph" as const, text: "short article" }] };
    expect(isArticleIndexReady(thin)).toBe(false);
    expect(isArticleDiscoveryReady(thin)).toBe(false);
    expect(shouldNoindexTexasGatewayArticle(thin)).toBe(true);
  });

  it("allows only intentional empty-body lazy stubs through catalog discovery", () => {
    const lazyStub = {
      ...readyArticle,
      body: [],
      readingMinutes: ARTICLE_DISCOVERY_MIN_READING_MINUTES,
    };
    expect(isArticleIndexReady(lazyStub)).toBe(false);
    expect(isArticleDiscoveryReady(lazyStub)).toBe(true);
    expect(shouldNoindexTexasGatewayArticle(lazyStub)).toBe(true);

    const weakStub = { ...lazyStub, readingMinutes: ARTICLE_DISCOVERY_MIN_READING_MINUTES - 1 };
    expect(isArticleDiscoveryReady(weakStub)).toBe(false);
  });

  it("never treats a partially populated thin body as a lazy-stub exception", () => {
    const partial = {
      ...readyArticle,
      readingMinutes: 12,
      body: [{ type: "paragraph" as const, text: "This is still a thin partial body." }],
    };
    expect(isArticleDiscoveryReady(partial)).toBe(false);
  });

  it("quarantines incomplete or malformed source attribution", () => {
    const { sourceUrl: _sourceUrl, ...withoutSourceUrl } = readyArticle;
    expect(isArticleIndexReady({ ...withoutSourceUrl, sourceName: "Official source" })).toBe(false);
    expect(isArticleDiscoveryReady({ ...withoutSourceUrl, sourceName: "Official source" })).toBe(false);
    expect(isArticleIndexReady({ ...readyArticle, sourceUrl: "javascript:alert(1)" })).toBe(false);
  });

  it("allows an original editorial article without optional source metadata when it otherwise passes", () => {
    const { sourceName: _sourceName, sourceUrl: _sourceUrl, ...withoutSourceMetadata } = readyArticle;
    expect(isArticleIndexReady(withoutSourceMetadata)).toBe(true);
    expect(isArticleDiscoveryReady(withoutSourceMetadata)).toBe(true);
  });

  it("keeps staged gateway acquisition drafts quarantined from both route and catalog discovery", () => {
    const staged = { ...readyArticle, id: "gateway-example" };
    expect(isArticleIndexReady(staged)).toBe(false);
    expect(isArticleDiscoveryReady(staged)).toBe(false);
  });
});
