import type { Article, Destination, ImageRef } from "@/data/types";

const OWN_HOSTS = new Set(["texasdefined.com", "www.texasdefined.com"]);
const REMOTE_IMAGE_HOSTS = new Set([
  "commons.wikimedia.org",
  "upload.wikimedia.org",
  "images.unsplash.com",
]);

export const REMOTE_IMAGE_ROUTE = "/media/remote";

export function editorialImageSrc(src: string) {
  if (!/^https?:\/\//i.test(src)) return src;

  try {
    const url = new URL(src);
    if (OWN_HOSTS.has(url.hostname.toLowerCase())) return `${url.pathname}${url.search}${url.hash}`;
    if (!REMOTE_IMAGE_HOSTS.has(url.hostname.toLowerCase())) return src;
    return `${REMOTE_IMAGE_ROUTE}?url=${encodeURIComponent(url.toString())}`;
  } catch {
    return src;
  }
}

function deliverImage(image: ImageRef): ImageRef {
  const src = editorialImageSrc(image.src);
  return src === image.src ? image : { ...image, src };
}

const FALL_ARTICLE_OVERRIDES: Partial<Record<string, Partial<Article>>> = {
  "fall-in-texas-complete-guide": {
    title: "Texas Fall Foliage: When and Where Color Peaks by Region",
    dek: "A timing-first guide to when autumn color usually arrives across the Hill Country, Piney Woods, North Texas and West Texas—and how weather shifts the window.",
    tags: ["texas fall foliage timing", "when leaves change in texas", "lost maples peak color", "east texas autumn", "texas fall season"],
  },
  "best-places-for-fall-colors-in-texas": {
    title: "Best Texas State Parks and Natural Areas for Fall Color",
    dek: "A destination-first guide to Lost Maples, Garner, Caddo Lake, Daingerfield, Lake Bob Sandlin and other public places worth planning around for autumn color.",
    tags: ["best texas fall color parks", "lost maples", "garner state park", "caddo lake", "daingerfield state park"],
    hero: {
      src: "/images/state-parks/lost-maples-state-natural-area.jpg",
      alt: "Lost Maples State Natural Area in Texas",
      width: 1600,
      height: 1200,
      credit: "Alec Norman · CC BY-SA 3.0 · Wikimedia Commons",
    },
  },
};

export function prepareArticleForDelivery(article: Article): Article {
  const override = FALL_ARTICLE_OVERRIDES[article.slug] ?? {};
  const merged = { ...article, ...override } as Article;
  return {
    ...merged,
    hero: deliverImage(merged.hero),
    body: merged.body.map((block) =>
      block.type === "image" ? { ...block, image: deliverImage(block.image) } : block,
    ),
  };
}

export function prepareDestinationForDelivery(destination: Destination): Destination {
  return { ...destination, hero: deliverImage(destination.hero) };
}
