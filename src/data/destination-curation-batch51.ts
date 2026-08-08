import type { Destination } from "./types";

// Reserved batch number. The proposed records were already curated in earlier batches,
// so this layer intentionally remains a no-op to avoid competing ownership.
export function applyCuratedDestinationBatch51(destination: Destination): Destination {
  return destination;
}
