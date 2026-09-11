import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_16: Record<string, ParkingMapAsset> = {
  'childrens-health-stadium-prosper': {
    id: 'parking-map:childrens-health-stadium-prosper:2026-09',
    venueSlug: 'childrens-health-stadium-prosper',
    venueName: "Children's Health Stadium at PISD",
    imageUrl: '/images/parking-maps/childrens-health-stadium-prosper.svg',
    alt: "Verified TexasDefined parking orientation diagram for Children's Health Stadium at PISD showing the stadium, west and east parking areas, band parking, and current access-road orientation",
    origin: 'ai-generated',
    rightsStatus: 'generated-owned',
    displayAllowed: true,
    reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: [
      'Prosper ISD currently publishes a Stadium Maps SVG through its district document library, but the district does not document a commercial reuse license for that artwork.',
      'No open-license current parking map for the stadium was found, so TexasDefined uses an original orientation schematic instead of republishing the district artwork.',
    ],
    verificationStatus: 'verified',
    verifiedAgainstRealMap: true,
    verifiedAt: '2026-09-11',
    verificationSources: [
      { label: "Prosper ISD — Children's Health Stadium at PISD", url: 'https://www.prosper-isd.net/page/childrens-health-stadium-at-pisd', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Prosper ISD — Stadium Maps document library', url: "https://www.prosper-isd.net/documents/departments/athletics/children's-health-stadium-at-pisd/stadium-maps/608151", checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Prosper ISD — Maps & Directions', url: 'https://www.prosper-isd.net/page/maps-directions', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Bands of America — 2026 North Texas Regional logistics', url: 'https://marching.musicforall.org/logistics-north-texas-regional/', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: [
      'The stadium and surrounding west/east parking geometry were compared with the current Stadium Maps material linked by Prosper ISD.',
      'The 2026 Bands of America logistics independently confirms Stadium Drive access from West Frontier Parkway and Greenwood Memorial Drive access for event trucks.',
      'The schematic keeps parking labels generic because home, visitor, band, bus and special-event assignments can change by event.',
      'The stadium address is confirmed by Prosper ISD as 2000 Stadium Drive, Prosper, Texas 75078.',
    ],
  },
  'ratliff-stadium': {
    id: 'parking-map:ratliff-stadium:2026-09',
    venueSlug: 'ratliff-stadium',
    venueName: 'Ratliff Stadium',
    imageUrl: '/images/parking-maps/ratliff-stadium.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Ratliff Stadium showing west and east parking, Charles Walker Road, Grandview Avenue, Yukon Road, and principal stadium access points',
    origin: 'ai-generated',
    rightsStatus: 'generated-owned',
    displayAllowed: true,
    reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: [
      'Ector County ISD publishes current traffic-plan map imagery for Ratliff Stadium, but no commercial reuse license for the district artwork was documented.',
      'No current open-license parking diagram suitable for direct republication was found, so TexasDefined created an original schematic from the verified geometry.',
    ],
    verificationStatus: 'verified',
    verifiedAgainstRealMap: true,
    verifiedAt: '2026-09-11',
    verificationSources: [
      { label: 'Ector County ISD — Ratliff Stadium policy and map resources', url: 'https://www.ectorcountyisd.org/departments/athletics-pe/ratliff-stadium-policy-regulations', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Ector County ISD — OHS vs Permian traffic procedures', url: 'https://www.ectorcountyisd.org/departments/athletics-pe/ratliff-stadium-policy-regulations/ohs-vs-permian-traffic-procedures', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Ector County ISD — 2026 graduation traffic guidance', url: 'https://www.ectorcountyisd.org/parents-students/graduation-schedule', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: [
      'The current ECISD rivalry traffic map places large parking fields on both the west and east sides of Ratliff Stadium and shows Charles Walker Road to the north, Grandview Avenue to the east and Yukon Road to the south.',
      'The rivalry map assigns the west side to Odessa High and the east side to Permian; the canonical TexasDefined schematic intentionally neutralizes those team labels because assignments can vary by event.',
      'ECISD 2026 graduation guidance confirms that stadium traffic maps remain an active part of large-event arrival planning.',
      'Current road construction or police traffic control can supersede the orientation diagram, so visitors should follow event-day ECISD instructions.',
    ],
  },
};
