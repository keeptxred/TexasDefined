export type ParkingMapOrigin = 'reusable-source' | 'ai-generated';
export type ParkingMapRightsStatus = 'verified-reusable' | 'generated-owned' | 'unknown';
export type ParkingMapVerificationStatus = 'verified' | 'pending' | 'rejected';
export type ParkingMapReuseSearchStatus = 'reusable-found' | 'no-suitable-reusable-map-found';

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
  reuseSearchStatus: ParkingMapReuseSearchStatus;
  reuseSearchNotes: readonly string[];
  verificationStatus: ParkingMapVerificationStatus;
  verifiedAgainstRealMap: boolean;
  verifiedAt?: string;
  verificationSources: readonly ParkingMapVerificationSource[];
  accuracyNotes: readonly string[];
  eventSpecific?: boolean;
};

export function isPublishableParkingMap(map: ParkingMapAsset | undefined): map is ParkingMapAsset {
  if (!map || !map.displayAllowed || map.verificationStatus !== 'verified') return false;
  if (!map.verifiedAgainstRealMap || !map.verifiedAt || map.verificationSources.length === 0) return false;
  if (map.accuracyNotes.length === 0 || map.reuseSearchNotes.length === 0) return false;

  if (map.origin === 'ai-generated') {
    return map.rightsStatus === 'generated-owned'
      && map.reuseSearchStatus === 'no-suitable-reusable-map-found';
  }

  return map.rightsStatus === 'verified-reusable'
    && map.reuseSearchStatus === 'reusable-found'
    && Boolean(map.sourcePage && map.sourceName && map.licenseName && map.licenseUrl);
}
