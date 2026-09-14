import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_20: Record<string, ParkingMapAsset> = {
  'tpc-san-antonio': {
    id: 'parking-map:tpc-san-antonio:2026-09',
    venueSlug: 'tpc-san-antonio',
    venueName: 'TPC San Antonio',
    imageUrl: '/images/parking-maps/tpc-san-antonio.svg',
    alt: 'Verified TexasDefined parking orientation diagram for TPC San Antonio showing resort arrival, golf parking, the golf clubhouse, and Oaks and Canyons course context',
    origin: 'ai-generated',
    rightsStatus: 'generated-owned',
    displayAllowed: true,
    reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: [
      'TPC San Antonio and JW Marriott publish current directions and an official resort map, but no reusable publication license was documented for the official map artwork reviewed.',
      'No suitable current open-license TPC San Antonio visitor parking map was found, so TexasDefined uses an original schematic rather than reproducing official resort-map artwork.',
    ],
    verificationStatus: 'verified',
    verifiedAgainstRealMap: true,
    verifiedAt: '2026-09-14',
    verificationSources: [
      { label: 'TPC San Antonio — Contact Us & Directions', url: 'https://tpc.com/sanantonio/contact-us-directions/', checkedAt: '2026-09-14', role: 'accuracy' },
      { label: 'JW Marriott San Antonio Hill Country Resort & Spa — official resort map', url: 'https://modules.marriott.com/resourcefiles/satjw-jw-marriott-san-antonio-hill-country-resort-and-spa-meetings-main/resort-map.pdf', checkedAt: '2026-09-14', role: 'accuracy' },
    ],
    accuracyNotes: [
      'TPC San Antonio directions route arrivals from US Highway 281 to TPC Parkway, then Marriott Parkway and the resort entrance.',
      'The current JW Marriott resort map labels a dedicated Golf Parking area with the Golf Clubhouse and both the Oaks and Canyons courses on the resort campus.',
      'This TexasDefined schematic is deliberately not to scale and does not claim exact lot boundaries, internal distances, or event-specific traffic controls.',
      'Valero Texas Open spectators should follow current tournament instructions and on-site signs; this venue map is the safe canonical fallback when an older event-specific override is not occurrence-valid.',
    ],
  },
};
