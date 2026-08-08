import type { Destination } from "./types";

/**
 * Compatibility layer retained so the numbered curation import chain remains stable.
 * Port Isabel Lighthouse hero data was consolidated into batch 27.
 * Garner State Park continues to use the generated local state-park hero asset.
 */
export function applyCuratedDestinationBatch31(destination: Destination): Destination {
  return destination;
}

export function applyCuratedDestinationsBatch31(destinations: Destination[]): Destination[] {
  return destinations;
}
