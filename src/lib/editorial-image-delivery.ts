import type { Article, Destination, ImageRef } from "@/data/types";

const REMOTE_EDITORIAL_IMAGE = /^https:\/\/(?:commons\.wikimedia\.org|upload\.wikimedia\.org|images\.unsplash\.com)\//i;
const OWN_EDITORIAL_IMAGE = /^https:\/\/(?:www\.)?texasdefined\.com(\/[^#]*)/i;

export function editorialImageSrc(src: string) {
  const own = src.match(OWN_EDITORIAL_IMAGE);
  if (own?.[1]) return own[1];
  return REMOTE_EDITORIAL_IMAGE.test(src) ? `/media/remote?url=${encodeURIComponent(src)}` : src;
}

const deliverImage = (image: ImageRef): ImageRef => {
  const src = editorialImageSrc(image.src);
  return src === image.src ? image : { ...image, src };
};

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
  const override = FALL_ARTICLE_OVERRIDES[article.slug];
  const presented = override ? ({ ...article, ...override } as Article) : article;
  return {
    ...presented,
    hero: deliverImage(presented.hero),
    body: presented.body.map((block) => block.type === "image" ? { ...block, image: deliverImage(block.image) } : block),
  };
}

export function prepareDestinationForDelivery(destination: Destination): Destination {
  const src = editorialImageSrc(destination.hero.src);
  return src === destination.hero.src ? destination : { ...destination, hero: { ...destination.hero, src } };
}
