import { applyCuratedDestination, applyCuratedDestinations } from "./destination-curation";
import { applyCuratedDestinationBatch2, applyCuratedDestinationsBatch2 } from "./destination-curation-batch2";
import { applyCuratedDestinationBatch3, applyCuratedDestinationsBatch3 } from "./destination-curation-batch3";
import { applyCuratedDestinationBatch4, applyCuratedDestinationsBatch4 } from "./destination-curation-batch4";
import { applyCuratedDestinationBatch5, applyCuratedDestinationsBatch5 } from "./destination-curation-batch5";
import { applyCuratedDestinationBatch6, applyCuratedDestinationsBatch6 } from "./destination-curation-batch6";
import { applyCuratedDestinationBatch7, applyCuratedDestinationsBatch7 } from "./destination-curation-batch7";
import { applyCuratedDestinationBatch8, applyCuratedDestinationsBatch8 } from "./destination-curation-batch8";
import { applyCuratedDestinationBatch9, applyCuratedDestinationsBatch9 } from "./destination-curation-batch9";
import { applyCuratedDestinationBatch10, applyCuratedDestinationsBatch10 } from "./destination-curation-batch10";
import { applyCuratedDestinationBatch11, applyCuratedDestinationsBatch11 } from "./destination-curation-batch11";
import type { Destination } from "./types";
export function applyAllCuratedDestination(destination: Destination): Destination { return applyCuratedDestinationBatch11(applyCuratedDestinationBatch10(applyCuratedDestinationBatch9(applyCuratedDestinationBatch8(applyCuratedDestinationBatch7(applyCuratedDestinationBatch6(applyCuratedDestinationBatch5(applyCuratedDestinationBatch4(applyCuratedDestinationBatch3(applyCuratedDestinationBatch2(applyCuratedDestination(destination))))))))))); }
export function applyAllCuratedDestinations(destinations: Destination[]): Destination[] { return applyCuratedDestinationsBatch11(applyCuratedDestinationsBatch10(applyCuratedDestinationsBatch9(applyCuratedDestinationsBatch8(applyCuratedDestinationsBatch7(applyCuratedDestinationsBatch6(applyCuratedDestinationsBatch5(applyCuratedDestinationsBatch4(applyCuratedDestinationsBatch3(applyCuratedDestinationsBatch2(applyCuratedDestinations(destinations))))))))))); }
