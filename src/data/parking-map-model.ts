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
  /** Required for occurrence-specific event maps so annual event slugs cannot reuse stale parking instructions. */
  eventYear?: number;
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

export function isParkingMapApplicableToEvent(
  map: ParkingMapAsset | undefined,
  eventStartDate: string | undefined,
): map is ParkingMapAsset {
  if (!isPublishableParkingMap(map)) return false;
  if (!map.eventSpecific) return true;
  if (!map.eventYear || !eventStartDate) return false;
  const yearMatch = eventStartDate.match(/^(\d{4})-/);
  return Boolean(yearMatch && Number(yearMatch[1]) === map.eventYear);
}
