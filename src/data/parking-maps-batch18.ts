import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_18: Record<string, ParkingMapAsset> = {
  'momentum-bank-ballpark': {
    id: 'parking-map:momentum-bank-ballpark:2026-09',
    venueSlug: 'momentum-bank-ballpark',
    venueName: 'Momentum Bank Ballpark',
    imageUrl: '/images/parking-maps/momentum-bank-ballpark.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Momentum Bank Ballpark showing the ballpark, general parking, reserved Lot B1, accessible parking and Champions Drive',
    origin: 'ai-generated',
    rightsStatus: 'generated-owned',
    displayAllowed: true,
    reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: [
      'The RockHounds publish a current ballpark diagram and parking guidance, but no reusable publication license was documented for the official artwork reviewed.',
      'The TexasDefined diagram is original and deliberately schematic rather than reproducing the official ballpark artwork.',
    ],
    verificationStatus: 'verified',
    verifiedAgainstRealMap: true,
    verifiedAt: '2026-09-12',
    verificationSources: [
      { label: 'Midland RockHounds — Momentum Bank Ballpark', url: 'https://www.milb.com/midland/ballpark', checkedAt: '2026-09-12', role: 'accuracy' },
      { label: 'Midland RockHounds — Ballpark Guidelines', url: 'https://www.milb.com/midland/ballpark/ballpark-guidelines', checkedAt: '2026-09-12', role: 'accuracy' },
    ],
    accuracyNotes: [
      'The venue address at 5514 Champions Drive and the official ballpark entrance context were checked against the current RockHounds ballpark page and diagram.',
      'Current RockHounds guidance states that parking is free with space for more than 3,500 cars and buses and includes reserved accessible spaces.',
      'Reserved Lot B1 is identified in current RockHounds guidance for eligible club, suite and box-seat parking-pass holders.',
      'The diagram is an orientation aid, not a lot-boundary survey; visitors should follow event-day signs and current team instructions.',
    ],
  },
};
