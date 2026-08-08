import type { Destination } from "./types";

// Compatibility module retained so historical imports remain valid.
// The destination content that once lived here is now owned by later
// authoritative curation batches, with coordinates/address/accessibility
// metadata preserved in those primary records.
export function applyCuratedDestinationBatch3(destination: Destination): Destination {
  return destination;
}

export function applyCuratedDestinationsBatch3(destinations: Destination[]): Destination[] {
  return destinations;
}
