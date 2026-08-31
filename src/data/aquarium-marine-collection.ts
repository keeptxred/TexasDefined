import type { Destination } from "./types";

export const AQUARIUM_MARINE_SLUGS = [
  "texas-state-aquarium",
  "dallas-world-aquarium",
  "moody-gardens",
  "sea-life-grapevine-aquarium",
  "sea-life-san-antonio-aquarium",
  "downtown-aquarium-houston",
  "childrens-aquarium-dallas-fair-park",
  "san-antonio-aquarium",
  "austin-aquarium",
  "houston-interactive-aquarium-animal-preserve",
  "sea-center-texas",
  "sea-turtle-inc",
  "ut-marine-science-institute-patton-center",
  "science-spectrum-museum-aquarium",
  "houston-zoo",
  "fort-worth-zoo",
  "san-antonio-zoo",
] as const;

const aquariumMarineSlugSet = new Set<string>(AQUARIUM_MARINE_SLUGS);

export function aquariumMarineCollectionDestinations(destinations: Destination[]) {
  const bySlug = new Map(destinations.map((destination) => [destination.slug, destination]));
  return AQUARIUM_MARINE_SLUGS.flatMap((slug) => {
    const destination = bySlug.get(slug);
    return destination && aquariumMarineSlugSet.has(destination.slug) ? [destination] : [];
  });
}
