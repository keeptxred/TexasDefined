import type { SportsVenueEnrichment } from './sports-venue-enrichment';

const verifiedAt = '2026-09-11';

export function applySportsVenueMaintenance(
  slug: string,
  profile: SportsVenueEnrichment | undefined,
): SportsVenueEnrichment | undefined {
  if (!profile) return profile;

  if (slug === 'toyota-stadium-frisco') {
    return {
      ...profile,
      parking: 'Toyota Stadium is in a multi-year modernization, so available lots, open stadium sides and pedestrian routes can change as construction advances. FC Dallas publishes the current paid, reserved and season-member parking plan for each renovation phase; use that live matchday guidance instead of a prior-season map.',
      arrival: 'Construction is changing normal stadium circulation through the phased modernization. Confirm the current open gates, concourses and parking approaches on FC Dallas’s official stadium information page before driving to Frisco rather than relying on a fixed side-of-stadium instruction.',
      verifiedAt,
    };
  }

  if (slug === 'daikin-park') {
    const { capacity: _unstableCapacity, ...rest } = profile;
    return {
      ...rest,
      verifiedAt,
    };
  }

  if (slug === 'college-park-center') {
    return {
      ...profile,
      primaryEvents: ['UT Arlington basketball and volleyball', 'Basketball, tournaments and community events', 'Concerts and special events'],
      history: 'College Park Center opened in 2012 as a $78 million, 218,000-square-foot arena in downtown Arlington. It gives UT Arlington basketball and volleyball a 7,000-seat home and has hosted national postseason tournaments, high-school playoff games, concerts and WNBA basketball. The Dallas Wings announced that their 2027 home schedule will move to American Airlines Center, so the arena’s durable identity should remain centered on UT Arlington and its broader event calendar.',
      verifiedAt,
    };
  }

  return profile;
}
