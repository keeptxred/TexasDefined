import { getSportsVenueEnrichmentAll } from '../sports-venue-enrichment-all';

export type VerifiedFootballVenueLink = {
  venueSlug: string;
  venueName: string;
  venuePath: string;
  relationship: 'school-home' | 'district-football-venue';
  relationshipLabel: string;
  note: string;
  officialUrl: string;
  city?: string;
  capacity?: string;
  parking?: string;
  arrival?: string;
  verifiedAt?: string;
};

type VenueRule = {
  venueSlug: string;
  venueName: string;
  officialUrl: string;
  districtNames?: readonly string[];
  schoolNames?: readonly string[];
  relationship: VerifiedFootballVenueLink['relationship'];
  relationshipLabel: string;
  note: string;
};

const VERIFIED_FOOTBALL_VENUE_RULES: readonly VenueRule[] = [
  {
    venueSlug: 'eagle-stadium-allen',
    venueName: 'Eagle Stadium',
    officialUrl: 'https://www.allenisd.org/page/eagle-stadium',
    schoolNames: ['Allen'],
    districtNames: ['Allen ISD', 'Allen Independent School District'],
    relationship: 'school-home',
    relationshipLabel: 'Verified Allen football venue',
    note: 'Allen ISD identifies Eagle Stadium as its football stadium. Use the current Allen ISD event schedule and stadium guidance for the specific game.',
  },
  {
    venueSlug: 'ford-center-at-the-star',
    venueName: 'Ford Center at The Star',
    officialUrl: 'https://www.thestarinfrisco.com/ford-center/',
    districtNames: ['Frisco ISD', 'Frisco Independent School District'],
    relationship: 'district-football-venue',
    relationshipLabel: 'Verified Frisco ISD football venue',
    note: 'Ford Center at The Star is shared by the Dallas Cowboys, City of Frisco and Frisco ISD, and Frisco ISD football programs use it for district games. Confirm the specific matchup and venue assignment on the current district schedule before travel.',
  },
  {
    venueSlug: 'mckinney-isd-stadium',
    venueName: 'McKinney ISD Stadium & Community Event Center',
    officialUrl: 'https://www.mckinneyisd.net/page/mckinney-isd-stadium/',
    districtNames: ['McKinney ISD', 'McKinney Independent School District'],
    relationship: 'district-football-venue',
    relationshipLabel: 'Verified district football venue',
    note: 'McKinney ISD uses this stadium for district football and community events. Confirm the specific school, home/visitor side and event date on the district schedule.',
  },
  {
    venueSlug: 'childrens-health-stadium-prosper',
    venueName: "Children's Health Stadium at PISD",
    officialUrl: 'https://www.prosper-isd.net/page/childrens-health-stadium-at-pisd',
    districtNames: ['Prosper ISD', 'Prosper Independent School District'],
    relationship: 'district-football-venue',
    relationshipLabel: 'Verified district football venue',
    note: 'Prosper ISD identifies this as a district stadium serving multiple high schools and district events. Confirm the game assignment before treating it as a school-specific home venue.',
  },
  {
    venueSlug: 'legacy-stadium-katy',
    venueName: 'Legacy Stadium',
    officialUrl: 'https://www.katyisd.org/athletics/facilities/legacy-stadium',
    districtNames: ['Katy ISD', 'Katy Independent School District'],
    relationship: 'district-football-venue',
    relationshipLabel: 'Verified Katy ISD football venue',
    note: 'Legacy Stadium serves multiple Katy ISD schools rather than one permanent home team. Use the current Katy ISD varsity schedule to confirm which stadium hosts a specific game.',
  },
  {
    venueSlug: 'ratliff-stadium',
    venueName: 'Ratliff Stadium',
    officialUrl: 'https://www.ectorcountyisd.org/departments/athletics-pe/ratliff-stadium-policy-regulations',
    districtNames: ['Ector County ISD', 'Ector County Independent School District'],
    schoolNames: ['Odessa', 'Odessa Permian'],
    relationship: 'district-football-venue',
    relationshipLabel: 'Verified Ector County ISD football venue',
    note: 'Ratliff Stadium serves Ector County ISD football, including the Odessa programs associated with the stadium. Confirm the current schedule and event policies before travel.',
  },
  {
    venueSlug: 'cy-fair-fcu-stadium',
    venueName: 'Cy-Fair Federal Credit Union Stadium',
    officialUrl: 'https://www.cfisd.net/athletics/facilities/cy-fair-federal-credit-union-stadium',
    districtNames: ['Cypress-Fairbanks ISD', 'Cypress-Fairbanks Independent School District', 'Cypress Fairbanks ISD'],
    relationship: 'district-football-venue',
    relationshipLabel: 'Verified CFISD football venue',
    note: 'CFISD uses this Berry Center stadium for district football and other events. The district also operates other venues, so confirm the school and game assignment on the current schedule.',
  },
  {
    venueSlug: 'mesquite-memorial-stadium',
    venueName: 'Mesquite Memorial Stadium',
    officialUrl: 'https://www.mesquiteisd.org/facility-locations',
    districtNames: ['Mesquite ISD', 'Mesquite Independent School District'],
    relationship: 'district-football-venue',
    relationshipLabel: 'Verified Mesquite ISD football venue',
    note: 'Mesquite ISD uses Memorial Stadium for district football and other athletic events. Confirm the specific matchup, ticketing and game-day assignment before travel.',
  },
] as const;

function normalize(value?: string) {
  return (value ?? '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\bindependent\s+school\s+district\b/g, ' isd ')
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

function matches(values: readonly string[] | undefined, ...candidates: Array<string | undefined>) {
  if (!values?.length) return false;
  const normalizedValues = new Set(values.map(normalize));
  return candidates.some((candidate) => candidate && normalizedValues.has(normalize(candidate)));
}

export function getVerifiedFootballVenueLinks(input: {
  schoolName: string;
  officialSchoolName?: string;
  districtName?: string;
}): VerifiedFootballVenueLink[] {
  return VERIFIED_FOOTBALL_VENUE_RULES
    .filter((rule) =>
      matches(rule.schoolNames, input.schoolName, input.officialSchoolName)
      || matches(rule.districtNames, input.districtName),
    )
    .map((rule) => {
      const enrichment = getSportsVenueEnrichmentAll(rule.venueSlug);
      return {
        venueSlug: rule.venueSlug,
        venueName: rule.venueName,
        venuePath: `/sports-venue/${rule.venueSlug}`,
        relationship: rule.relationship,
        relationshipLabel: rule.relationshipLabel,
        note: rule.note,
        officialUrl: rule.officialUrl,
        city: enrichment?.city,
        capacity: enrichment?.capacity,
        parking: enrichment?.parking,
        arrival: enrichment?.arrival,
        verifiedAt: enrichment?.verifiedAt,
      };
    });
}

export const VERIFIED_FOOTBALL_VENUE_RELATIONSHIP_COUNT = VERIFIED_FOOTBALL_VENUE_RULES.length;
