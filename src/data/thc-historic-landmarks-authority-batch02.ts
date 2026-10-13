import { baileyCountyCourthouseHeritageDestination } from "./thc-bailey-county-courthouse";
import { wimberleyDowntownSquareHeritageDestination } from "./thc-wimberley-downtown-square";
import { sourLakeDowntownHeritageDestination } from "./thc-sour-lake-downtown";

export const thcHistoricLandmarkAuthorityBatch02Destinations = [
  baileyCountyCourthouseHeritageDestination,
  wimberleyDowntownSquareHeritageDestination,
  sourLakeDowntownHeritageDestination,
];
export const thcHistoricLandmarkAuthorityBatch02Slugs = thcHistoricLandmarkAuthorityBatch02Destinations.map(place=>place.slug);
