import { bosqueRiverBridgeMeridianAuthority } from "./thc-bosque-river-bridge-meridian";

/** The 1940 WPA Bosque River I-beam bridge is distinct from Clifton's 1884 Whipple truss. */
export const thcHistoricLandmarkAuthorityBatch05Destinations = [
  bosqueRiverBridgeMeridianAuthority,
];

export const thcHistoricLandmarkAuthorityBatch05Slugs =
  thcHistoricLandmarkAuthorityBatch05Destinations.map((site) => site.slug);
