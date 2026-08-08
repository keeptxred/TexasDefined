import type { Destination } from "./types";

// Batch 29 previously repeated destinations already curated in earlier batches.
// Keep the exported API stable while avoiding later duplicate overrides.
export function applyCuratedDestinationBatch29(destination: Destination): Destination {
  return destination;
}

export function applyCuratedDestinationsBatch29(destinations: Destination[]): Destination[] {
  return destinations;
}
