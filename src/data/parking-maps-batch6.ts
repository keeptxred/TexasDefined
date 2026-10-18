import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_6: Record<string, ParkingMapAsset> = {
  'frost-bank-center': {
    id: 'parking-map:frost-bank-center:2026-09', venueSlug: 'frost-bank-center', venueName: 'Frost Bank Center', imageUrl: '/images/parking-maps/frost-bank-center.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Frost Bank Center showing principal venue lots, surrounding roads and the Lot 5 rideshare area',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['Frost Bank Center publishes current parking, ingress and egress map imagery, but the reviewed official artwork does not document a reusable publication license.', 'Open-license searches surfaced venue photography and team media but no current reusable Frost Bank Center parking map suitable for publication.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [{ label: 'Frost Bank Center — Parking, Directions & Transportation', url: 'https://www.frostbankcenter.com/parking', checkedAt: '2026-09-11', role: 'accuracy' }, { label: 'Frost Bank Center — Directions', url: 'https://www.frostbankcenter.com/directions', checkedAt: '2026-09-11', role: 'accuracy' }],
    accuracyNotes: ['The venue parking/egress material was used to verify the numbered lot arrangement represented in the schematic.', 'The official venue currently identifies Lot 5 as the designated rideshare pickup zone.', 'East Houston Street, Frost Bank Center Drive and the I-35/I-10 approach relationships were checked against current official directions.', 'The diagram omits prices and event-specific lot inventory because the venue states parking prices and availability vary by event.'],
  },
  'alamodome': {
    id: 'parking-map:alamodome:2026-09', venueSlug: 'alamodome', venueName: 'Alamodome', imageUrl: '/images/parking-maps/alamodome.svg',
    alt: 'Verified TexasDefined parking orientation diagram for the Alamodome showing Lots A, B, C and D and principal downtown access roads',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['The Alamodome publishes official lot and event parking maps, but no reusable publication license was documented for the reviewed artwork.', 'Open-license source checks did not surface a current reusable Alamodome parking map with Lots A through D and active event access guidance.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [{ label: 'Alamodome — official parking lots and directions map', url: 'https://www.alamodome.com/assets/doc/Alamodome-Lots-Map-REV010921-24d0d2062b.pdf', checkedAt: '2026-09-11', role: 'accuracy' }, { label: 'Alamodome — current facility parking and rideshare guidance', url: 'https://www.alamodome.com/plan-your-visit/facility-rules-security', checkedAt: '2026-09-11', role: 'accuracy' }, { label: 'Alamodome — accessibility and Lot A guidance', url: 'https://www.alamodome.com/plan-your-visit/accessibility-ada-services', checkedAt: '2026-09-11', role: 'accuracy' }],
    accuracyNotes: ['Lots A, B, C and D and their relationship to the stadium were checked against the official Alamodome lots map.', 'Lot A accessible parking, Lots B/C public parking and Lot D rideshare/drop-off use were cross-checked against current venue guidance.', 'I-37, Cherry Street, Montana Street, César E. Chávez Boulevard and Tower of the Americas Way were checked against official maps and directions.', 'The schematic omits fixed event pricing and assumes no particular lot is open unless the event page confirms it.'],
  },
  'freeman-coliseum': {
    id: 'parking-map:freeman-coliseum:2026-10', venueSlug: 'freeman-coliseum', venueName: 'Freeman Coliseum', imageUrl: '/images/parking-maps/freeman-coliseum.svg',
    alt: 'Original orientation diagram showing Freeman Coliseum west of Frost Bank Center, Expo Halls to the north, lots 1 through 3 to the south, lot 9 to the west, and lots 8, 7, and 6 to the north',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['Freeman Coliseum publishes a current 2026 official campus map, but no reusable publication license was located for that artwork. The official map is linked for navigation rather than reproduced.', 'This independently drawn, not-to-scale orientation diagram is used only to distinguish buildings and lot positions; event-specific routing always takes precedence.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-10-10',
    verificationSources: [{ label: 'Freeman Coliseum — official 2026 Coliseum & Expo Halls grounds map', url: 'https://freemancoliseum.com/pdf/2026/freeman_expo_grounds_map_2026.pdf', checkedAt: '2026-10-10', role: 'accuracy' }, { label: 'Freeman Coliseum — ADA guide and mobility drop-off guidance', url: 'https://www.freemancoliseum.com/pdf/ADA_Freeman_Coliseum.pdf', checkedAt: '2026-10-10', role: 'accuracy' }],
    accuracyNotes: ['The diagram follows the 2026 official map: south-side lots 1, 2, 3, western lot 9, eastern lot 4, middle-north lot 5, northern lots 8, 7, 6.', 'The Coliseum and separate Frost Bank Center have distinct footprints; Expo Halls A/B/C and Expo Hall 2 are separate from both.', 'East Houston Street is south of the buildings and Frost Bank Center Drive is east; this diagram is not to scale.', 'No gate entitlement, price, availability, accessible-space allocation, or live traffic status is implied; consult the official event notices.'],
  },
  'nelson-wolff-stadium': {
    id: 'parking-map:nelson-wolff-stadium:2026-09', venueSlug: 'nelson-wolff-stadium', venueName: 'Nelson W. Wolff Municipal Stadium', imageUrl: '/images/parking-maps/nelson-wolff-stadium.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Nelson Wolff Stadium showing the first-base and third-base parking approaches',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['The San Antonio Missions publish current parking-entry guidance but do not publish a reusable licensed parking map suitable for TexasDefined.', 'Open-license searches surfaced recent reusable Wolff Stadium photography but no current reusable visitor parking map.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [{ label: 'San Antonio Missions — Know Before You Go parking information', url: 'https://www.milb.com/san-antonio/ballpark/wolff-stadium/know-before-you-go', checkedAt: '2026-09-11', role: 'accuracy' }, { label: 'San Antonio Missions — Wolff Stadium A-Z Guide', url: 'https://www.milb.com/san-antonio/ballpark/wolff-stadium/a-z-guide', checkedAt: '2026-09-11', role: 'accuracy' }],
    accuracyNotes: ['The current Missions guide identifies two parking areas and recommends the third-base entrance from Callaghan Road for odd-numbered sections and VIP parking.', 'The first-base entrance from the U.S. 90 access road is identified by the Missions as the preferred approach for even-numbered sections.', 'Both parking areas are documented as having accessible parking.', 'Prices and event-specific controls are omitted because the Missions state parking terms can change by game or special event.'],
  },
  'retama-park': {
    id: 'parking-map:retama-park:2026-09', venueSlug: 'retama-park', venueName: 'Retama Park', imageUrl: '/images/parking-maps/retama-park.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Retama Park showing the general parking field, VIP lot and Retama Parkway access',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['Retama Park publishes current parking and access instructions but no reusable licensed visitor parking map was found.', 'Open-license source checks did not surface a current reusable Retama Park parking map suitable for publication.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [{ label: 'Retama Park — Visit: directions and parking', url: 'https://www.retamapark.com/visit', checkedAt: '2026-09-11', role: 'accuracy' }, { label: 'Retama Park — 2026 live racing visitor information', url: 'https://www.retamapark.com/horseracing/live-racing', checkedAt: '2026-09-11', role: 'accuracy' }],
    accuracyNotes: ['Retama Park currently states general parking is free for simulcast and live-racing guests.', 'The VIP lot is verified as being on the right side of the building when facing the front and is the recommended simulcast parking area.', 'I-35 frontage-road access and Retama Parkway were checked against the venue’s current official directions.', 'The diagram is intentionally simple because the official visitor guidance distinguishes general and VIP parking but does not publish detailed numbered lot geometry.'],
  },
};
