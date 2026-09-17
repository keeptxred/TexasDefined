import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_19: Record<string, ParkingMapAsset> = {
  'waco-surf': {
    id: 'parking-map:waco-surf:2026-09',
    venueSlug: 'waco-surf',
    venueName: 'Waco Surf',
    imageUrl: '/images/parking-maps/waco-surf.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Waco Surf showing the front VIP and hotel/surf parking area, free back lot, Surf Center check-in and Old Mexia Road arrival',
    origin: 'ai-generated',
    rightsStatus: 'generated-owned',
    displayAllowed: true,
    reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: [
      'Waco Surf links an official site map and publishes current parking guidance, but no reusable publication license was documented for the official map artwork reviewed.',
      'Open-license source checks did not surface a current reusable Waco Surf visitor parking map, so TexasDefined uses an original schematic rather than reproducing the official site map.',
    ],
    verificationStatus: 'verified',
    verifiedAgainstRealMap: true,
    verifiedAt: '2026-09-12',
    verificationSources: [
      { label: 'Waco Surf — current FAQ and parking guidance', url: 'https://wacosurf.com/faq/', checkedAt: '2026-09-12', role: 'accuracy' },
      { label: 'Waco Surf Help Center — arrival process and official site-map references', url: 'https://intercom.help/waco-surf/en/articles/6226918-what-is-the-late-arrival-process-for-lodging', checkedAt: '2026-09-12', role: 'accuracy' },
      { label: 'Waco Surf — current contact and arrival address', url: 'https://wacosurf.com/contact/', checkedAt: '2026-09-12', role: 'accuracy' },
    ],
    accuracyNotes: [
      'Current Waco Surf guidance identifies the back lot as free parking and the front VIP parking area as a paid peak-season convenience option.',
      'The official site-map references identify the Hotel, Surf & VIP Parking area as map location 6 and the Waco Surf Hotel Surf Center check-in as map location 10.',
      'The visitor address at 5347 Old Mexia Road is used only as the arrival orientation; the diagram does not claim exact internal distances or lot boundaries.',
      'The schematic deliberately represents front-versus-back parking relationships instead of copying the official site-map artwork, and visitors should follow current on-site signs if operations change.',
    ],
  },
};
