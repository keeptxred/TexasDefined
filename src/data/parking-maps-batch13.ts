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
  'memorial-park-golf-course': {
    id: 'parking-map:memorial-park-golf-course:2026-09', venueSlug: 'memorial-park-golf-course', venueName: 'Memorial Park Golf Course', imageUrl: '/images/parking-maps/memorial-park-golf-course.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Memorial Park Golf Course showing the Golf Clubhouse, Golf Education Center and current park parking areas',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['Memorial Park Conservancy publishes a January 2026 park map and an interactive map, but no reusable commercial publication license was documented for the official map artwork reviewed.', 'Open-license source checks did not surface a current reusable parking map showing the 2026 Memorial Park configuration and golf-course parking detail.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [
      { label: 'Memorial Park Conservancy — January 2026 park map', url: 'https://www.memorialparkconservancy.org/wp-content/uploads/2026/01/MPC-11x17-Map-Jan-2026.pdf', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Memorial Park Conservancy — current parking guidance', url: 'https://www.memorialparkconservancy.org/visit/maps-parking/parking/', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Memorial Park Golf Course — current parking information', url: 'https://www.memorialparkgolf.com/memorial-park-golf-course', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: ['Golf Course, Golf Clubhouse and Golf Education Center placement was checked against the January 2026 park map.', 'Current Conservancy and municipal-golf guidance both identify the Golf Course parking lot as paid parking.', 'Memorial Loop Drive, East Memorial Loop Drive and Memorial Drive orientation was compared against the current 2026 map.', 'The schematic keeps adjacent park parking generalized because park closures, construction and event operations can temporarily change availability.'],
  },
  'amarillo-national-center': {
    id: 'parking-map:amarillo-national-center:2026-09', venueSlug: 'amarillo-national-center', venueName: 'Amarillo National Center', imageUrl: '/images/parking-maps/amarillo-national-center.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Amarillo National Center showing surrounding Tri-State Fairgrounds parking, gates and adjacent arenas',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['Tri-State Fairgrounds publishes a current facility-map page and grounds diagram, but its site expressly carries an all-rights-reserved copyright notice and no reusable commercial map license was documented.', 'Open-license source checks did not surface a current reusable Tri-State Fairgrounds parking map with Amarillo National Center detail.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [
      { label: 'Tri-State Fairgrounds — current facility map', url: 'https://www.tristatefair.com/p/rentals/facility-map1', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Tri-State Fair & Rodeo — 2026 livestock parking / Gate 3', url: 'https://www.tristatefair.com/p/fair/compete-at-fair/livestock-shows', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Tri-State Fairgrounds — current directions', url: 'https://www.tristatefair.com/directions.aspx', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: ['Amarillo National Center placement and surrounding parking rows were compared directly with the current official fairgrounds facility-map image.', 'SE 10th Avenue/Gate 2, N 3rd Street/Gate 3, Marrs Street and E Grand Street orientation were checked against the official grounds map.', 'Tommy Grant Arena, livestock facilities and Bill Cody Arena were retained as orientation landmarks because they materially affect the surrounding parking pattern.', 'The official diagram marks several no-trailer-parking areas; the schematic warns about those restrictions rather than reproducing every stall or RV number.'],
  },
};
