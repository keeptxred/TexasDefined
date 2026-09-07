import { describe, expect, it } from "vitest";

import { allowedRemoteImageUrl, editorialImageSrc, prepareArticleForDelivery } from "./editorial-image-delivery";
import type { Article } from "@/data/types";

describe("editorial image delivery", () => {
  it("proxies only approved HTTPS image hosts and keeps local paths local", () => {
    expect(editorialImageSrc("/images/local.jpg")).toBe("/images/local.jpg");
    expect(editorialImageSrc("https://texasdefined.com/images/local.jpg")).toBe("/images/local.jpg");
    expect(editorialImageSrc("https://www.texasdefined.com/images/local.jpg?x=1")).toBe("/images/local.jpg?x=1");

    const unsplash = "https://images.unsplash.com/photo-123?auto=format";
    expect(editorialImageSrc(unsplash)).toBe(`/media/remote?url=${encodeURIComponent(unsplash)}`);
    const wikimedia = "https://upload.wikimedia.org/wikipedia/commons/a/a1/example.jpg";
    expect(editorialImageSrc(wikimedia)).toBe(`/media/remote?url=${encodeURIComponent(wikimedia)}`);
    const wikimediaThumb = "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/example.jpg/1280px-example.jpg";
    expect(editorialImageSrc(wikimediaThumb)).toBe(`/media/remote?url=${encodeURIComponent(wikimediaThumb)}`);
  });

  it("rejects non-HTTPS and unapproved hosts from the remote-image policy", () => {
    expect(allowedRemoteImageUrl("http://images.unsplash.com/photo.jpg")).toBeNull();
    expect(allowedRemoteImageUrl("http://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/example.jpg/1280px-example.jpg")).toBeNull();
    expect(allowedRemoteImageUrl("https://evil.example/photo.jpg")).toBeNull();
    expect(allowedRemoteImageUrl("javascript:alert(1)")).toBeNull();
    expect(editorialImageSrc("https://evil.example/photo.jpg")).toBe("https://evil.example/photo.jpg");
  });

  it("rewrites article image delivery without changing image credits or unrelated content", () => {
    const article = {
      slug: "test-article",
      hero: {
        src: "https://images.unsplash.com/photo-123",
        alt: "Test",
        width: 1200,
        height: 800,
        credit: "Photographer · Unsplash",
      },
      body: [
        { type: "paragraph", text: "Keep this paragraph unchanged." },
        {
          type: "image",
          image: {
            src: "https://upload.wikimedia.org/wikipedia/commons/a/a1/example.jpg",
            alt: "Example",
            width: 800,
            height: 600,
            credit: "Creator · CC BY-SA 4.0 · Wikimedia Commons",
          },
        },
      ],
    } as unknown as Article;

    const delivered = prepareArticleForDelivery(article);
    expect(delivered.hero.src).toContain("/media/remote?url=");
    expect(delivered.hero.credit).toBe(article.hero.credit);
    expect(delivered.body[0]).toEqual(article.body[0]);
    expect(delivered.body[1]).toMatchObject({
      type: "image",
      image: { credit: "Creator · CC BY-SA 4.0 · Wikimedia Commons" },
    });
  });
});
