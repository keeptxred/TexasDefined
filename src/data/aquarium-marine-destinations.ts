import { aquariumMarineDestinations1 } from "./aquarium-marine-destinations-1";
import { aquariumMarineDestinations2 } from "./aquarium-marine-destinations-2";
import { aquariumMarineDestinations3 } from "./aquarium-marine-destinations-3";
import { aquariumMarineDestinations4 } from "./aquarium-marine-destinations-4";
import { isDestinationPhotoPlaceholder } from "./explore-hero-reconciliation";
import type { Destination } from "./types";

export const aquariumMarineDestinations: Destination[] = [
  ...aquariumMarineDestinations1,
  ...aquariumMarineDestinations2,
  ...aquariumMarineDestinations3,
  ...aquariumMarineDestinations4,
];

export const AQUARIUM_MARINE_SLUGS = aquariumMarineDestinations.map((item) => item.slug);

const curatedBySlug = new Map(aquariumMarineDestinations.map((item) => [item.slug, item]));

export function enrichAquariumMarineDestination(destinationRecord: Destination): Destination {
  const curated = curatedBySlug.get(destinationRecord.slug);
  if (!curated) return destinationRecord;
  const hero = destinationRecord.hero && !isDestinationPhotoPlaceholder(destinationRecord.hero.src)
    ? destinationRecord.hero
    : curated.hero;
  return {
    ...destinationRecord,
    ...curated,
    id: destinationRecord.id,
    category: destinationRecord.category,
    hero,
  };
}

export function aquariumMarineDestinationsForCounty(countySlug: string) {
  const normalized = countySlug.trim().toLowerCase();
  return aquariumMarineDestinations.filter((item) =>
    item.county?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalized,
  );
}
