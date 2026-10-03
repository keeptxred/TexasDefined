import { normalizeArticleEditorialDesk } from "@/data/editorial-desk-routing";
import type { Article, Destination, ImageRef } from "@/data/types";

export const REMOTE_IMAGE_PATH = "/media/remote";
export const REMOTE_IMAGE_HOSTS = new Set([
  "basemap.nationalmap.gov",
  "commons.wikimedia.org",
  "thumb.wikimedia.org",
  "upload.wikimedia.org",
  "images.unsplash.com",
]);

const REMOTE_IMAGE_EXACT_URLS = new Set([
  "https://cdn.jsdelivr.net/gh/coryetzkorn/state-svg-defs@5e5141e6117c793abf1892d0e4c8a4ebb76b032a/state-svg-defs.svg",
]);

const OWN_IMAGE = /^https:\/\/(?:www\.)?texasdefined\.com(\/[^#]*)/i;

export function allowedRemoteImageUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return REMOTE_IMAGE_HOSTS.has(url.hostname.toLowerCase()) || REMOTE_IMAGE_EXACT_URLS.has(url.toString())
      ? url
      : null;
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

export function prepareArticleForDelivery(article: Article): Article {
  const normalizedArticle = normalizeArticleEditorialDesk(article);
  const hero = deliverImage(normalizedArticle.hero);
  let bodyChanged = false;
  const body = normalizedArticle.body.map((block) => {
    if (block.type !== "image") return block;
    const image = deliverImage(block.image);
    if (image === block.image) return block;
    bodyChanged = true;
    return { ...block, image };
  });
  return hero === article.hero && !bodyChanged && normalizedArticle.authorId === article.authorId
    ? article
    : { ...normalizedArticle, hero, body };
}

export function prepareDestinationForDelivery(destination: Destination): Destination {
  const hero = deliverImage(destination.hero);
  return hero === destination.hero ? destination : { ...destination, hero };
}
