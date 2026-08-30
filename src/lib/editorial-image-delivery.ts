import { HOMES_LAND_EDITORIAL_DESK_ID } from "@/data/editorial-desks";
import { normalizeArticleEditorialDesk } from "@/data/editorial-desk-routing";
import type { Article, Destination, ImageRef } from "@/data/types";

export const REMOTE_IMAGE_PATH = "/media/remote";
export const REMOTE_IMAGE_HOSTS = new Set([
  "commons.wikimedia.org",
  "upload.wikimedia.org",
  "images.unsplash.com",
]);

const OWN_IMAGE = /^https:\/\/(?:www\.)?texasdefined\.com(\/[^#]*)/i;

export function allowedRemoteImageUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return REMOTE_IMAGE_HOSTS.has(url.hostname.toLowerCase()) ? url : null;
  } catch {
    return null;
  }
}

export function editorialImageSrc(src: string) {
  const ownPath = src.match(OWN_IMAGE)?.[1];
  if (ownPath) return ownPath;
  return allowedRemoteImageUrl(src)
    ? `${REMOTE_IMAGE_PATH}?url=${encodeURIComponent(src)}`
    : src;
}

function deliverImage(image: ImageRef): ImageRef {
  const src = editorialImageSrc(image.src);
  return src === image.src ? image : { ...image, src };
}

function deliveryAuthorId(article: Article) {
  return article.category === "home-garden"
    || article.category === "real-estate"
    || article.category === "property-taxes"
    ? HOMES_LAND_EDITORIAL_DESK_ID
    : article.authorId;
}

export function prepareArticleForDelivery(article: Article): Article {
  const normalizedArticle = normalizeArticleEditorialDesk(article);
  const hero = deliverImage(normalizedArticle.hero);
  const authorId = deliveryAuthorId(normalizedArticle);
  let bodyChanged = false;
  const body = normalizedArticle.body.map((block) => {
    if (block.type !== "image") return block;
    const image = deliverImage(block.image);
    if (image === block.image) return block;
    bodyChanged = true;
    return { ...block, image };
  });
  return hero === article.hero && !bodyChanged && authorId === article.authorId
    ? article
    : { ...article, authorId, hero, body };
}

export function prepareDestinationForDelivery(destination: Destination): Destination {
  const hero = deliverImage(destination.hero);
  return hero === destination.hero ? destination : { ...destination, hero };
}
