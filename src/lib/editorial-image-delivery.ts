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

const OWN_IMAGE = /^https:\/\/(?:www\.)?texasdefined\.com(\/[^#]*)/i;

// These verified six-man-football assets repeatedly failed through the Worker image
// proxy in production. Keep the exception intentionally narrow so the rest of the
// editorial library continues to use governed same-origin remote-image delivery.
const BROWSER_DIRECT_WIKIMEDIA_PATHS = new Set([
  "/wikipedia/commons/a/a6/Bart_Coan_Field_from_west.jpg",
  "/wikipedia/commons/f/fa/Six-man_football_battle.jpg",
  "/wikipedia/commons/a/a4/Whitharral_Texas_Panthers_six-man_football_2010.jpg",
  "/wikipedia/commons/5/5e/Six_man_field.png",
]);

export function allowedRemoteImageUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return REMOTE_IMAGE_HOSTS.has(url.hostname.toLowerCase()) ? url : null;
  } catch {
    return null;
  }
}

function shouldDeliverRemoteImageDirectly(url: URL) {
  return url.hostname.toLowerCase() === "upload.wikimedia.org"
    && BROWSER_DIRECT_WIKIMEDIA_PATHS.has(url.pathname);
}

export function editorialImageSrc(src: string) {
  const ownPath = src.match(OWN_IMAGE)?.[1];
  if (ownPath) return ownPath;
  const remote = allowedRemoteImageUrl(src);
  if (!remote) return src;
  if (shouldDeliverRemoteImageDirectly(remote)) return src;
  return `${REMOTE_IMAGE_PATH}?url=${encodeURIComponent(src)}`;
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
