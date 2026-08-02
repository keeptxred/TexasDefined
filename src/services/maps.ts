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
  /** Deep link to an external directions provider. */
  directionsUrl(point: GeoPoint, label: string): string;
}

export const linkOnlyMaps: MapService = {
  staticImageUrl() {
    return null;
  },
  directionsUrl(point, label) {
    const query = encodeURIComponent(`${label} ${point.lat},${point.lng}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  },
};

export const maps: MapService = linkOnlyMaps;
