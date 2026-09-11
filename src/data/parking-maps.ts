export type ParkingMapOrigin = 'reusable-source' | 'ai-generated';
export type ParkingMapRightsStatus = 'verified-reusable' | 'generated-owned' | 'unknown';
export type ParkingMapVerificationStatus = 'verified' | 'pending' | 'rejected';

export type ParkingMapVerificationSource = {
  label: string;
  url: string;
  checkedAt: string;
  role: 'accuracy' | 'rights' | 'both';
};

export type ParkingMapAsset = {
  id: string;
  venueSlug?: string;
  venueName?: string;
  eventSlugs?: readonly string[];
  imageUrl: string;
  alt: string;
  origin: ParkingMapOrigin;
  rightsStatus: ParkingMapRightsStatus;
  displayAllowed: boolean;
  sourcePage?: string;
  sourceName?: string;
  author?: string;
  licenseName?: string;
  licenseUrl?: string;
  verificationStatus: ParkingMapVerificationStatus;
  verifiedAgainstRealMap: boolean;
  verifiedAt?: string;
  verificationSources: readonly ParkingMapVerificationSource[];
  accuracyNotes: readonly string[];
  eventSpecific?: boolean;
};

const venueParkingMaps: Record<string, ParkingMapAsset> = {
  'att-stadium': {
    id: 'parking-map:att-stadium:2026-09',
    venueSlug: 'att-stadium',
    venueName: 'AT&T Stadium',
    imageUrl: '/images/parking-maps/att-stadium.svg',
    alt: 'Verified TexasDefined parking orientation diagram for AT&T Stadium showing the stadium, major surrounding roads and principal parking zones',
    origin: 'ai-generated',
    rightsStatus: 'generated-owned',
    displayAllowed: true,
    verificationStatus: 'verified',
    verifiedAgainstRealMap: true,
    verifiedAt: '2026-09-11',
    verificationSources: [
      {
        label: 'AT&T Stadium — official parking information and parking map',
        url: 'https://attstadium.com/stadium-info/parking/',
        checkedAt: '2026-09-11',
        role: 'accuracy',
      },
    ],
    accuracyNotes: [
      'Stadium position and north/south/east/west orientation checked against the current official parking map.',
      'I-30, Copeland Road, Randol Mill Road, Collins Street, Cowboys Way and Division Street were checked against the official map.',
      'The diagram groups numbered Cowboys parking lots by side of the stadium instead of reproducing the official map artwork.',
      'The diagram is intentionally schematic and not to scale; event-specific lot assignments can change.',
    ],
  },
  'texas-motor-speedway': {
    id: 'parking-map:texas-motor-speedway:2026-09',
    venueSlug: 'texas-motor-speedway',
    venueName: 'Texas Motor Speedway',
    imageUrl: '/images/parking-maps/texas-motor-speedway.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Texas Motor Speedway showing the speedway, major approach roads and primary parking areas',
    origin: 'ai-generated',
    rightsStatus: 'generated-owned',
    displayAllowed: true,
    verificationStatus: 'verified',
    verifiedAgainstRealMap: true,
    verifiedAt: '2026-09-11',
    verificationSources: [
      {
        label: 'Texas Motor Speedway — official directions and parking map',
        url: 'https://www.texasmotorspeedway.com/fans/directions-parking/',
        checkedAt: '2026-09-11',
        role: 'accuracy',
      },
      {
        label: 'Wikimedia Commons — Texas Motor Speedway track map',
        url: 'https://commons.wikimedia.org/wiki/File:TexasMotorSpeedway.svg',
        checkedAt: '2026-09-11',
        role: 'accuracy',
      },
    ],
    accuracyNotes: [
      'Track footprint, I-35W/Hwy 114 relationship and the western parking field orientation were checked against current official directions and parking material.',
      'Victory Circle and the primary general/preferred parking zones were checked against the official inbound parking map.',
      'The track outline was cross-checked against an independently reusable CC0 Wikimedia Commons track map.',
      'The diagram is intentionally schematic and not to scale; race-weekend traffic patterns and lot assignments can change.',
    ],
  },
};

const eventParkingMaps: Record<string, ParkingMapAsset> = {};

export function isPublishableParkingMap(map: ParkingMapAsset | undefined): map is ParkingMapAsset {
  if (!map || !map.displayAllowed || map.verificationStatus !== 'verified') return false;
  if (!map.verifiedAgainstRealMap || !map.verifiedAt || map.verificationSources.length === 0) return false;
  if (map.accuracyNotes.length === 0) return false;

  if (map.origin === 'ai-generated') {
    return map.rightsStatus === 'generated-owned';
  }

  return map.rightsStatus === 'verified-reusable'
    && Boolean(map.sourcePage && map.sourceName && map.licenseName && map.licenseUrl);
}

export function getParkingMapForVenueSlug(slug: string | undefined) {
  if (!slug) return undefined;
  const map = venueParkingMaps[slug];
  return isPublishableParkingMap(map) ? map : undefined;
}

export function getParkingMapForEvent(eventSlug: string | undefined, venueSlug?: string) {
  const eventMap = eventSlug ? eventParkingMaps[eventSlug] : undefined;
  if (isPublishableParkingMap(eventMap)) return eventMap;
  return getParkingMapForVenueSlug(venueSlug);
}

export function parkingMapCoverage() {
  return {
    venueMaps: Object.values(venueParkingMaps),
    eventOverrides: Object.values(eventParkingMaps),
  } as const;
}
