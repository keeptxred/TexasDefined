import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_13: Record<string, ParkingMapAsset> = {
  'reliant-stadium': {
    id: 'parking-map:reliant-stadium:2026-09', venueSlug: 'reliant-stadium', venueName: 'Reliant Stadium', imageUrl: '/images/parking-maps/reliant-stadium.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Reliant Stadium showing the Reliant Park facilities, nine principal parking color zones and surrounding roads',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['Reliant Park publishes a current official site map with detailed parking zones, but the reviewed map artwork does not document a reusable commercial publication license.', 'Open-license/Wikimedia checks did not surface a current reusable Reliant Stadium parking map with the active Reliant Park lot configuration.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [
      { label: 'Reliant Park — current directions and parking', url: 'https://www.nrgpark.com/directions-parking/', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Reliant Park — current official site map', url: 'https://www.nrgpark.com/wp-content/uploads/reliant-park-site-map.pdf', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Reliant Park — accessibility guide', url: 'https://www.nrgpark.com/accessibility-guide/', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: ['Reliant Stadium, Reliant Center, Reliant Arena and the Astrodome placement was compared directly with the current official one-page site map.', 'Red, Yellow, Purple, Teal, Green, Blue, Orange, Maroon and Tan/Dock 1 parking zones were all checked against the official map.', 'Kirby Drive, Fannin Street, Main/McNee, Westridge and South Loop 610 orientation was checked against the current map and directions page.', 'ADA sections in Orange, Maroon, Red and Blue are documented by the venue, but the schematic avoids event-specific stall assignments because those can change.'],
  },
};
