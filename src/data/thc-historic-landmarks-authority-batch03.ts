import { delRioSouthernPacificDepotAuthority } from "./thc-del-rio-southern-pacific-depot";
import { bosqueRiverBridgeAuthority } from "./thc-bosque-river-bridge";

export const thcHistoricLandmarkAuthorityBatch03Destinations = [
  delRioSouthernPacificDepotAuthority,
  bosqueRiverBridgeAuthority,
];
export const thcHistoricLandmarkAuthorityBatch03Slugs =
  thcHistoricLandmarkAuthorityBatch03Destinations.map((destination) => destination.slug);
