import type { ParkingMapAsset } from './parking-map-model';
import { isPublishableParkingMap } from './parking-map-model';
import { VENUE_PARKING_MAPS_BATCH_1 } from './parking-maps-batch1';
import { VENUE_PARKING_MAPS_BATCH_2 } from './parking-maps-batch2';
import { VENUE_PARKING_MAPS_BATCH_3 } from './parking-maps-batch3';
import { VENUE_PARKING_MAPS_BATCH_4 } from './parking-maps-batch4';

export type {
  ParkingMapAsset,
  ParkingMapOrigin,
  ParkingMapReuseSearchStatus,
  ParkingMapRightsStatus,
  ParkingMapVerificationSource,
  ParkingMapVerificationStatus,
} from './parking-map-model';
export { isPublishableParkingMap } from './parking-map-model';

const venueParkingMaps: Record<string, ParkingMapAsset> = {
  ...VENUE_PARKING_MAPS_BATCH_1,
  ...VENUE_PARKING_MAPS_BATCH_2,
  ...VENUE_PARKING_MAPS_BATCH_3,
  ...VENUE_PARKING_MAPS_BATCH_4,
};

const eventParkingMaps: Record<string, ParkingMapAsset> = {};

export function getParkingMapForVenueSlug(slug: string | undefined) {
  if (!slug) return undefined;
  const map = venueParkingMaps[slug];
  return isPublishableParkingMap(map) ? map : undefined;
}

export function getParkingMapForEvent(eventSlug: string | undefined, venueSlug?: string) {
  const eventMap = eventSlug ? eventParkingMaps[eventSlug] : undefined;
  if (isPublishableParkingMap(eventMap)) return eventMap;
  return getParkingMapForVenueSlug(venueSlug);
}

export function parkingMapCoverage() {
  return { venueMaps: Object.values(venueParkingMaps), eventOverrides: Object.values(eventParkingMaps) } as const;
}
