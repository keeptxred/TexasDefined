import type { Destination } from "./types";

// Compatibility module retained so historical imports remain valid.
// Its destination-specific photography has been consolidated into the
// authoritative curation records in batches 10 and 44.
export function applyCuratedDestinationBatch30(destination: Destination): Destination {
  return destination;
}

export function applyCuratedDestinationsBatch30(destinations: Destination[]): Destination[] {
  return destinations;
}
