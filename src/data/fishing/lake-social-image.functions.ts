import { createServerFn } from "@tanstack/react-start";

export type FishingLakeSocialImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const DISCOVER_MIN_LAKE_IMAGE_WIDTH = 1200;

const loadFishingLakeSocialImage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const [{ getFishingLakeImage }, { applyLakePhotoGovernance }] = await Promise.all([
      import("./image-library"),
      import("./lake-photo-governance"),
    ]);
    const raw = getFishingLakeImage(data.slug);
    if (!raw) return null;
    const image = applyLakePhotoGovernance(raw);
    if (image.width < DISCOVER_MIN_LAKE_IMAGE_WIDTH || image.height <= 0) return null;
    return { src: image.src, alt: image.alt, width: image.width, height: image.height } satisfies FishingLakeSocialImage;
  });

export function getFishingLakeSocialImage(slug: string) {
  return loadFishingLakeSocialImage({ data: { slug } });
}
