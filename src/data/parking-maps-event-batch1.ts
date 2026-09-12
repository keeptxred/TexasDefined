import type { ParkingMapAsset } from './parking-map-model';

export const EVENT_PARKING_MAPS_BATCH_1: Record<string, ParkingMapAsset> = {
  'valero-texas-open': {
    id: 'parking-map:event:valero-texas-open:2026',
    eventSlugs: ['valero-texas-open'],
    eventYear: 2026,
    imageUrl: '/images/parking-maps/valero-texas-open-2026.svg',
    alt: 'Verified TexasDefined 2026 Valero Texas Open parking diagram showing the River City Community Church and UTSA East Campus spectator lots, complimentary shuttle connection, and JW Marriott rideshare location',
    origin: 'ai-generated',
    rightsStatus: 'generated-owned',
    displayAllowed: true,
    reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: [
      'The Valero Texas Open publishes current parking locations and tournament mapping, but its site is all-rights-reserved and no commercial reuse license for the official map artwork was documented.',
      'TexasDefined therefore uses an original event-specific diagram based on the tournament’s published 2026 parking instructions rather than republishing tournament artwork.',
    ],
    verificationStatus: 'verified',
    verifiedAgainstRealMap: true,
    verifiedAt: '2026-09-11',
    verificationSources: [
      { label: 'Valero Texas Open — 2026 parking', url: 'https://www.valerotexasopen.com/parking/all/', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Valero Texas Open — spectator parking lots', url: 'https://www.valerotexasopen.com/parking/spectator/', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Valero Texas Open — tournament course map', url: 'https://valerotexasopen.com/map/', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: [
      'This override is intentionally event-specific because Valero Texas Open spectator parking is remote from TPC San Antonio and uses complimentary tournament shuttles.',
      'For April 2–5, 2026, the tournament lists River City Community Church at 16765 Lookout Road in Selma and the UTSA East Campus Lot entered from Valero Way as spectator and ADA parking options.',
      'The tournament designates rideshare drop-off and pickup at the JW Marriott Hill Country Resort parking lot, Row 6 near the resort tennis courts.',
      'The diagram is a connection/orientation schematic rather than a distance or drive-time map and should be reverified for future tournament years.',
    ],
    eventSpecific: true,
  },
};
