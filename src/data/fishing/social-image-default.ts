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

export const fishingGenericSocialMeta = {
  image: fishingGenericSocialImage.src,
  imageAlt: fishingGenericSocialImage.alt,
  imageWidth: fishingGenericSocialImage.width,
  imageHeight: fishingGenericSocialImage.height,
};
