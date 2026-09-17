import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_10: Record<string, ParkingMapAsset> = {
  'mckinney-isd-stadium': {
    id: 'parking-map:mckinney-isd-stadium:2026-09', venueSlug: 'mckinney-isd-stadium', venueName: 'McKinney ISD Stadium & Community Event Center', imageUrl: '/images/parking-maps/mckinney-isd-stadium.svg',
    alt: 'Verified TexasDefined parking orientation diagram for McKinney ISD Stadium showing home and visitor parking, VIP context, accessible parking counts and principal approaches',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['McKinney ISD publishes separate current home-entry, visitor-entry, VIP, exit and handicap parking maps, but the district map artwork does not document a reusable publication license.', 'Open-license searches did not surface a current reusable McKinney ISD Stadium parking map with the district’s home/visitor traffic plan.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [{ label: 'McKinney ISD — Stadium Direction & Parking', url: 'https://www.mckinneyisd.net/page/stadium-direction-parking', checkedAt: '2026-09-11', role: 'accuracy' }, { label: 'McKinney ISD — Stadium Tailgating parking locations', url: 'https://www.mckinneyisd.net/page/stadium-tailgating', checkedAt: '2026-09-11', role: 'accuracy' }],
    accuracyNotes: ['The stadium is at McKinney Ranch Parkway and South Hardin Boulevard, just north of SH 121.', 'McKinney ISD maintains distinct home-side and visitor-side entry maps and directs visitor traffic from US 75 or SH 121 through McKinney Ranch/Hardin/Collin McKinney approaches.', 'The district documents 38 accessible spaces: 24 on the home side and 14 on the visitor side.', 'VIP parking is pass-controlled and directed by security; the schematic therefore represents VIP context without inventing a permanent reserved-lot polygon.'],
  },
  'cy-fair-fcu-stadium': {
    id: 'parking-map:cy-fair-fcu-stadium:2026-09', venueSlug: 'cy-fair-fcu-stadium', venueName: 'Cy-Fair Federal Credit Union Stadium', imageUrl: '/images/parking-maps/cy-fair-fcu-stadium.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Cy-Fair FCU Stadium showing current home Lots E and F, visitor Lots A and H and the West Road and Barker Cypress approaches',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['CFISD/Berry Center publishes event parking-map imagery and current lot instructions, but no reusable publication license was documented for the official map artwork.', 'Open-license searches did not surface a current reusable Cy-Fair FCU Stadium parking map with the active home/visitor lot assignments.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [{ label: 'Berry Center — Directions & Parking', url: 'https://berrycenter.cfisd.net/plan-your-visit/directions-parking', checkedAt: '2026-09-11', role: 'accuracy' }, { label: 'Berry Center — current 2026 football parking example', url: 'https://berrycenter.cfisd.net/bane-calendar-post-page/~occur-id/46930_2026-09-10T23%3A30%3A00Z_2026-09-11T02%3A30%3A00Z', checkedAt: '2026-09-11', role: 'accuracy' }],
    accuracyNotes: ['Current 2026 CFISD football instructions send the home team through the West Road entrance to Lots E and F and stadium Entrances 5 or 6.', 'Visitors enter from Barker Cypress, park in Lots A and H and use Entrances 7 or 8.', 'Berry Center states the complex has about 4,000 parking spaces across the Berry Center/Cy-Fair FCU Stadium campus, including ADA spaces.', 'Drop-off and pickup locations are explicitly event-dependent, so the schematic does not hard-code a permanent drop-off zone.'],
  },
};
