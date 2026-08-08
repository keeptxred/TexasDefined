import type { Destination } from "./types";

// Batch 36 previously repeated destinations already curated in earlier batches.
// Keep the exported API stable while avoiding later duplicate overrides.
export function applyCuratedDestinationBatch36(destination: Destination): Destination {
  return destination;
}
