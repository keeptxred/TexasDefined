import type { ParkingMapAsset } from './parking-map-model';

export const VENUE_PARKING_MAPS_BATCH_17: Record<string, ParkingMapAsset> = {
  'eagle-stadium-allen': {
    id: 'parking-map:eagle-stadium-allen:2026-09',
    venueSlug: 'eagle-stadium-allen',
    venueName: 'Eagle Stadium',
    imageUrl: '/images/parking-maps/eagle-stadium-allen.svg',
    alt: 'Verified TexasDefined parking orientation diagram for Allen ISD Eagle Stadium showing the east fan-parking area, Rivercrest Boulevard, Exchange Parkway, Greenville Avenue and the north Gate D officials area',
    origin: 'ai-generated',
    rightsStatus: 'generated-owned',
    displayAllowed: true,
    reuseSearchStatus: 'no-suitable-reusable-map-found',
    reuseSearchNotes: [
      'Allen ISD currently links a Stadium Site Plan and parking information from the Eagle Stadium page and publishes a district stadium packet with parking diagrams, but no commercial reuse license for the district artwork was documented.',
      'No current open-license parking map suitable for direct republication was found, so TexasDefined created an original orientation schematic from the district geometry and instructions.',
    ],
    verificationStatus: 'verified',
    verifiedAgainstRealMap: true,
    verifiedAt: '2026-09-11',
    verificationSources: [
      { label: 'Allen ISD — Eagle Stadium', url: 'https://www.allenisd.org/page/eagle-stadium', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Allen ISD — Eagle Stadium Information & Regulations packet', url: 'https://core-docs.s3.us-east-1.amazonaws.com/documents/asset/uploaded_file/3952/AISD/3179962/1_Web_stadium_brochure_10-08-2024.pdf', checkedAt: '2026-09-11', role: 'accuracy' },
      { label: 'Allen ISD — 2026-27 Eagle Stadium Guidelines and Security Procedures', url: 'https://www.allenisd.org/article/3092730', checkedAt: '2026-09-11', role: 'accuracy' },
    ],
    accuracyNotes: [
      'Allen ISD’s stadium packet directs fans approaching on Exchange Drive or Greenville Avenue into the fan-parking area on the east side of Eagle Stadium and places playoff officials near Gate D after circling the north end.',
      'The district packet documents 5,034 total parking spaces and 57 accessible spaces distributed near the Main Entrance and Gates A, C and D.',
      'The current 2026-27 stadium guidance confirms active home- and visitor-side gate operations; this schematic does not assign ordinary lots permanently by team because event operations can vary.',
      'The stadium address is confirmed by Allen ISD as 155 Rivercrest Boulevard, Allen, Texas 75002.',
    ],
  },
};
