import type { Article, Destination, ImageRef } from "@/data/types";

const REMOTE = /^https:\/\/(?:commons\.wikimedia\.org|upload\.wikimedia\.org|images\.unsplash\.com)\//i;
const OWN = /^https:\/\/(?:www\.)?texasdefined\.com(\/[^#]*)/i;

export function editorialImageSrc(src: string) {
  const own = src.match(OWN)?.[1];
  return own || (REMOTE.test(src) ? `/media/remote?url=${encodeURIComponent(src)}` : src);
}

const deliverImage = (image: ImageRef): ImageRef => {
  const src = editorialImageSrc(image.src);
  return src === image.src ? image : { ...image, src };
};

function presentFallArticle(article: Article): Article {
  if (article.slug === "fall-in-texas-complete-guide") {
    return { ...article, title: "Texas Fall Foliage: When and Where Color Peaks by Region" };
  }
  if (article.slug === "best-places-for-fall-colors-in-texas") {
    return {
      ...article,
      title: "Best Texas State Parks and Natural Areas for Fall Color",
      hero: {
        src: "/images/state-parks/lost-maples-state-natural-area.jpg",
        alt: "Lost Maples State Natural Area in Texas",
        width: 1600,
        height: 1200,
        credit: "Alec Norman · CC BY-SA 3.0 · Wikimedia Commons",
      },
    };
  }
  return article;
}

export function prepareArticleForDelivery(article: Article): Article {
  const presented = presentFallArticle(article);
  const hero = deliverImage(presented.hero);
  const body = presented.body.length
    ? presented.body.map((block) => block.type === "image" ? { ...block, image: deliverImage(block.image) } : block)
    : presented.body;
  return hero === presented.hero && body === presented.body ? presented : { ...presented, hero, body };
}

export function prepareDestinationForDelivery(destination: Destination): Destination {
  const hero = deliverImage(destination.hero);
  return hero === destination.hero ? destination : { ...destination, hero };
}
