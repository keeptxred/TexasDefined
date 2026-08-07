import { applyCuratedDestination, applyCuratedDestinations } from "./destination-curation";
import { applyCuratedDestinationBatch2, applyCuratedDestinationsBatch2 } from "./destination-curation-batch2";
import { applyCuratedDestinationBatch3, applyCuratedDestinationsBatch3 } from "./destination-curation-batch3";
import { applyCuratedDestinationBatch4, applyCuratedDestinationsBatch4 } from "./destination-curation-batch4";
import { applyCuratedDestinationBatch5, applyCuratedDestinationsBatch5 } from "./destination-curation-batch5";
import { applyCuratedDestinationBatch6, applyCuratedDestinationsBatch6 } from "./destination-curation-batch6";
import { applyCuratedDestinationBatch7, applyCuratedDestinationsBatch7 } from "./destination-curation-batch7";
import type { Destination } from "./types";
export function applyAllCuratedDestination(destination: Destination): Destination { return applyCuratedDestinationBatch7(applyCuratedDestinationBatch6(applyCuratedDestinationBatch5(applyCuratedDestinationBatch4(applyCuratedDestinationBatch3(applyCuratedDestinationBatch2(applyCuratedDestination(destination))))))); }
export function applyAllCuratedDestinations(destinations: Destination[]): Destination[] { return applyCuratedDestinationsBatch7(applyCuratedDestinationsBatch6(applyCuratedDestinationsBatch5(applyCuratedDestinationsBatch4(applyCuratedDestinationsBatch3(applyCuratedDestinationsBatch2(applyCuratedDestinations(destinations))))))); }
