import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_15: Record<string, ParkingMapAsset> = {
  'gerald-j-ford-stadium': {
    id: 'parking-map:gerald-j-ford-stadium:2026-09', venueSlug: 'gerald-j-ford-stadium', venueName: 'Gerald J. Ford Stadium', imageUrl: '/images/parking-maps/gerald-j-ford-stadium.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Gerald J. Ford Stadium showing current SMU parking centers and major campus roads',
    origin: 'ai-generated', rightsStatus: 'generated-owned', displayAllowed: true, reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: ['SMU publishes current 2026 football and 2026-27 visitor parking maps, but no reusable commercial publication license was documented for the official map artwork.', 'Open-license source checks did not surface a current reusable Ford Stadium football parking map with 2026 campus parking conditions.'],
    verificationStatus: 'verified', verifiedAgainstRealMap: true, verifiedAt: '2026-09-11',
    verificationSources: [
      { label: 'SMU Athletics — 2026 football parking information and map link', url: 'https://smumustangs.com/sports/2016/6/8/parking', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'SMU Parking — Visitor Parking Map 2026-27', url: 'https://www.smu.edu/-/media/site/businessfinance/campus-services/parkingandcardservices/visitor-parking-map-2026-27.pdf', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'SMU Athletics — April 2026 Friday at Ford parking map', url: 'https://smumustangs.com/news/2026/4/13/smu-football-to-host-friday-at-ford-event-on-april-17-to-end-spring.aspx', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: ['Ford Stadium, Binkley Parking Center and Meadows Parking Center placement was compared directly with the current 2026-27 SMU visitor map.', 'Binkley and Moody parking centers were independently confirmed as event parking for SMU’s April 2026 Friday at Ford event.', 'Binkley Avenue, SMU Boulevard, Bush Avenue, Bishop Boulevard and Mockingbird Lane orientation was checked against the current campus map.', 'The schematic intentionally does not label season-ticket parking allocations because SMU directs football visitors to the current 2026 gameday parking map and notes that some campus lots are unavailable on game days.'],
  },
};
