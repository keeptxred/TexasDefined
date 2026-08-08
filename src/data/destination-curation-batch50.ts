import type { Destination } from "./types";

// Batch 50 previously repeated destinations already curated in earlier batches.
// Keep the exported API stable while avoiding later duplicate overrides.
export function applyCuratedDestinationBatch50(destination: Destination): Destination {
  return destination;
}
