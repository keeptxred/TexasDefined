import type { Destination, ImageRef } from "./types";

export const AQUARIUM_SOURCE_REVIEWED = "2026-08-30";

export function aquariumHero(src: string, alt: string, credit: string, height = 900): ImageRef {
  return { src, alt, width: 1600, height, credit };
}

export function aquariumDestination(record: Omit<Destination, "brandId" | "sourceCheckedAt">): Destination {
  return {
    ...record,
    brandId: "texasdefined",
    sourceCheckedAt: AQUARIUM_SOURCE_REVIEWED,
  };
}
