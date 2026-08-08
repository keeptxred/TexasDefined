import type { Destination } from "./types";

// Compatibility module retained so historical imports remain valid.
// Palo Pinto Mountains State Park verification now lives in batch 22.
export function applyCuratedDestinationBatch32(destination: Destination): Destination {
  return destination;
}

export function applyCuratedDestinationsBatch32(destinations: Destination[]): Destination[] {
  return destinations;
}
