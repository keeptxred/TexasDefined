import type { ParkingMapAsset } from './parking-map-model';
import { isParkingMapApplicableToEvent, isPublishableParkingMap } from './parking-map-model';
import { VENUE_PARKING_MAPS_BATCH_1 } from './parking-maps-batch1';
import { VENUE_PARKING_MAPS_BATCH_2 } from './parking-maps-batch2';
import { VENUE_PARKING_MAPS_BATCH_3 } from './parking-maps-batch3';
import { VENUE_PARKING_MAPS_BATCH_4 } from './parking-maps-batch4';
import { VENUE_PARKING_MAPS_BATCH_5 } from './parking-maps-batch5';
import { VENUE_PARKING_MAPS_BATCH_6 } from './parking-maps-batch6';
import { VENUE_PARKING_MAPS_BATCH_7 } from './parking-maps-batch7';
import { VENUE_PARKING_MAPS_BATCH_8 } from './parking-maps-batch8';
import { VENUE_PARKING_MAPS_BATCH_9 } from './parking-maps-batch9';
import { VENUE_PARKING_MAPS_BATCH_10 } from './parking-maps-batch10';
import { VENUE_PARKING_MAPS_BATCH_11 } from './parking-maps-batch11';
import { VENUE_PARKING_MAPS_BATCH_12 } from './parking-maps-batch12';
import { VENUE_PARKING_MAPS_BATCH_13 } from './parking-maps-batch13';
import { VENUE_PARKING_MAPS_BATCH_14 } from './parking-maps-batch14';
import { VENUE_PARKING_MAPS_BATCH_15 } from './parking-maps-batch15';
import { VENUE_PARKING_MAPS_BATCH_16 } from './parking-maps-batch16';
import { VENUE_PARKING_MAPS_BATCH_17 } from './parking-maps-batch17';
import { VENUE_PARKING_MAPS_BATCH_18 } from './parking-maps-batch18';
import { EVENT_PARKING_MAPS_BATCH_1 } from './parking-maps-event-batch1';

export type {
  ParkingMapAsset,
  ParkingMapOrigin,
  ParkingMapReuseSearchStatus,
  ParkingMapRightsStatus,
  ParkingMapVerificationSource,
  ParkingMapVerificationStatus,
} from './parking-map-model';
export { isParkingMapApplicableToEvent, isPublishableParkingMap } from './parking-map-model';

const venueParkingMaps: Record<string, ParkingMapAsset> = {
  ...VENUE_PARKING_MAPS_BATCH_1,
  ...VENUE_PARKING_MAPS_BATCH_2,
  ...VENUE_PARKING_MAPS_BATCH_3,
  ...VENUE_PARKING_MAPS_BATCH_4,
  ...VENUE_PARKING_MAPS_BATCH_5,
  ...VENUE_PARKING_MAPS_BATCH_6,
  ...VENUE_PARKING_MAPS_BATCH_7,
  ...VENUE_PARKING_MAPS_BATCH_8,
  ...VENUE_PARKING_MAPS_BATCH_9,
  ...VENUE_PARKING_MAPS_BATCH_10,
  ...VENUE_PARKING_MAPS_BATCH_11,
  ...VENUE_PARKING_MAPS_BATCH_12,
  ...VENUE_PARKING_MAPS_BATCH_13,
  ...VENUE_PARKING_MAPS_BATCH_14,
  ...VENUE_PARKING_MAPS_BATCH_15,
  ...VENUE_PARKING_MAPS_BATCH_16,
  ...VENUE_PARKING_MAPS_BATCH_17,
  ...VENUE_PARKING_MAPS_BATCH_18,
};

const eventParkingMaps: Record<string, ParkingMapAsset> = {
  ...EVENT_PARKING_MAPS_BATCH_1,
};

export function getParkingMapForVenueSlug(slug: string | undefined) {
  if (!slug) return undefined;
  const map = venueParkingMaps[slug];
  return isPublishableParkingMap(map) ? map : undefined;
}

export function getParkingMapForEvent(
  eventSlug: string | undefined,
  venueSlug?: string,
  eventStartDate?: string,
) {
  const eventMap = eventSlug ? eventParkingMaps[eventSlug] : undefined;
  if (isParkingMapApplicableToEvent(eventMap, eventStartDate)) return eventMap;
  return getParkingMapForVenueSlug(venueSlug);
}

export function parkingMapCoverage() {
  return { venueMaps: Object.values(venueParkingMaps), eventOverrides: Object.values(eventParkingMaps) } as const;
}
