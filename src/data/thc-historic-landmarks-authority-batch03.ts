import { delRioSouthernPacificDepotAuthority } from "./thc-del-rio-southern-pacific-depot";
import { cliftonWhippleTrussBridgeAuthority } from "./thc-clifton-whipple-truss-bridge";

/** Source-certified additions; every added landmark must have a
 * property-specific image with verified commercial-use rights. */
export const thcHistoricLandmarkAuthorityBatch03Destinations = [
  delRioSouthernPacificDepotAuthority,
  cliftonWhippleTrussBridgeAuthority,
];
export const thcHistoricLandmarkAuthorityBatch03Slugs =
  thcHistoricLandmarkAuthorityBatch03Destinations.map((site) => site.slug);
