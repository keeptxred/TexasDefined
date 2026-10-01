import { getFishingFishImage, getFishingLakeImage } from "./image-library";

export type FishingSocialImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const fishingGenericSocialImage: FishingSocialImage = {
  src: "/images/fishing/crankbaits-hero.avif",
  alt: "Largemouth bass approaching a crankbait in a representative freshwater fishing scene",
  width: 1200,
  height: 675,
};

function toMeta(image: { src: string; alt: string; width: number; height: number }): FishingSocialImage {
  return { src: image.src, alt: image.alt, width: image.width, height: image.height };
}

export function getFishingLakeSocialImage(slug: string): FishingSocialImage {
  const image = getFishingLakeImage(slug);
  if (image && image.width >= 1200 && image.height >= 630) return toMeta(image);
  return fishingGenericSocialImage;
}

export function getFishingFishSocialImage(slug: string): FishingSocialImage {
  const image = getFishingFishImage(slug);
  if (!image) return fishingGenericSocialImage;

  const socialWidth = 1600;
  const renderedHeight = Math.round((image.height / image.width) * socialWidth);
  const src = image.src.replace(/([?&]width=)\d+/i, `$1${socialWidth}`);

  if (src !== image.src && renderedHeight >= 630) {
    return { src, alt: image.alt, width: socialWidth, height: renderedHeight };
  }

  if (image.width >= 1200 && image.height >= 630) return toMeta(image);
  return fishingGenericSocialImage;
}
