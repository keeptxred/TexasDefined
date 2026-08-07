import { applyCuratedDestination, applyCuratedDestinations } from "./destination-curation";
import { applyCuratedDestinationBatch2, applyCuratedDestinationsBatch2 } from "./destination-curation-batch2";
import { applyCuratedDestinationBatch3, applyCuratedDestinationsBatch3 } from "./destination-curation-batch3";
import type { Destination } from "./types";

export function applyAllCuratedDestination(destination: Destination): Destination {
  return applyCuratedDestinationBatch3(
    applyCuratedDestinationBatch2(applyCuratedDestination(destination)),
  );
}

export function applyAllCuratedDestinations(destinations: Destination[]): Destination[] {
  return applyCuratedDestinationsBatch3(
    applyCuratedDestinationsBatch2(applyCuratedDestinations(destinations)),
  );
}
