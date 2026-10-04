import type { GeoPoint } from "@/data/types";

/**
 * Provider-agnostic map interface. A single Map component wraps this, so a
 * later switch to a live tile provider touches one adapter, not components.
 */

export interface MapMarker {
  id: string;
  label: string;
  point: GeoPoint;
  href?: string;
}

export interface MapService {
  /** Static preview image for a set of markers, or null when unavailable. */
  staticImageUrl(markers: MapMarker[], zoom: number): string | null;
  /** Deep link to an external map provider for one point. */
  directionsUrl(point: GeoPoint, label: string): string;
  /** Driving route from an explicit origin to an explicit destination. */
  drivingRouteUrl(origin: GeoPoint, destination: GeoPoint): string;
}

export const linkOnlyMaps: MapService = {
  staticImageUrl() {
    return null;
  },
  directionsUrl(point, label) {
    const query = encodeURIComponent(`${label} ${point.lat},${point.lng}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },
  drivingRouteUrl(origin, destination) {
    const originQuery = encodeURIComponent(`${origin.lat},${origin.lng}`);
    const destinationQuery = encodeURIComponent(`${destination.lat},${destination.lng}`);
    return `https://www.google.com/maps/dir/?api=1&origin=${originQuery}&destination=${destinationQuery}&travelmode=driving`;
  },
};

export const maps: MapService = linkOnlyMaps;
