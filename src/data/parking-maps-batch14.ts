import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_14: Record<string, ParkingMapAsset> = {
  'extraco-events-center': {
    id: 'parking-map:extraco-events-center:2026-09', venueSlug: 'extraco-events-center', venueName: 'Extraco Events Center', imageUrl: '/images/parking-maps/extraco-events-center.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Extraco Events Center showing principal public parking, Show Pavilion parking and Lake Air Drive gates',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['Extraco Events Center publishes a current parking map and printable version, but the site marks its content ©2026 All Rights Reserved and no reusable commercial license was documented.', 'Open-license source checks did not surface a current reusable Extraco parking map with the venue parking gates and event-center layout.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [
      { label: 'Extraco Events Center — official parking map', url: 'https://www.extracoeventscenter.com/p/plan-your-visit/parking-map1', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Extraco Events Center — current directions', url: 'https://www.extracoeventscenter.com/directions.aspx', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: ['The large public parking field south of N 44th Street and the Show Pavilion/Stall Barn parking relationship were compared directly with the official parking map.', 'Lake Air Drive parking Gates 2, 3, 4 and 5 were checked against the current official map.', 'N 42nd Street, N 44th Street, Lake Air Drive, Colorado Avenue and the Bosque Boulevard side were retained as the principal orientation framework.', 'The venue warns that the Lake Air entrance may be closed for some operations, so the schematic does not promise a specific event-day gate.'],
  },
  'expo-center-taylor-county': {
    id: 'parking-map:expo-center-taylor-county:2026-09', venueSlug: 'expo-center-taylor-county', venueName: 'Expo Center of Taylor County', imageUrl: '/images/parking-maps/expo-center-taylor-county.svg',
    alt: 'Verified TexasDefined parking orientation diagram for the Expo Center of Taylor County showing principal public parking, arenas and access gates',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['The Expo Center publishes current grounds/facility and RV maps, but the site marks its content ©2026 All Rights Reserved and no reusable commercial publication license was documented.', 'Open-license source checks did not surface a current reusable Taylor County Expo Center parking/grounds map with the active facility layout.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [
      { label: 'Expo Center of Taylor County — official grounds/facility map', url: 'https://www.taylorcountyexpocenter.com/p/venue-info', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Expo Center of Taylor County — current maps and tickets page', url: 'https://www.taylorcountyexpocenter.com/p/tickets--deals', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: ['Public parking fields around the Coliseum, Taylor Telecom Arena and the eastern grounds were compared directly with the official facility map.', 'Access gates 2 through 6, Expo Drive, Lytle Way and Loop 322/Highway 36 orientation were checked against the current map.', 'First Financial Pavilion, Guitar Arena, Modern Living Mall and the round-building area are shown only as orientation landmarks around the parking fields.', 'The venue currently advertises 5,000 free parking spaces; the schematic omits stall-level detail and RV spot numbers because event usage varies.'],
  },
};
