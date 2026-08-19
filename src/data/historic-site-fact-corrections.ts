import type { Destination } from "./types";

/**
 * Source-backed corrections for historic-site facts that should override
 * older preserved seed values without mutating the 43-site source catalog.
 */
export function applyHistoricSiteFactCorrections(destination: Destination): Destination {
  if (destination.category !== "historic-sites") return destination;

  if (destination.slug === "lipantitlan") {
    return {
      ...destination,
      county: "Nueces",
      coordinates: { lat: 27.96445, lng: -97.81838 },
    };
  }

  return destination;
}
