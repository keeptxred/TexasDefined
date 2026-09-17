import type { TexasEntityRecord } from './types';

const checkedAt = '2026-08-13';
const maintenanceCheckedAt = '2026-09-11';
const generatedSportsVenueMarkers = [
  'Texas Defined tracks it as a visitor-facing venue',
  'Texas Defined includes it in the statewide venue guide to connect the sporting experience with practical trip planning and the surrounding county and region.',
] as const;

function stripGeneratedSportsVenueBoilerplate(description?: string) {
  if (!description) return description;
  if (generatedSportsVenueMarkers.some((marker) => description.includes(marker))) return undefined;
  return description;
}

export function applyCurrentEntityCorrections(entity: TexasEntityRecord): TexasEntityRecord {
  let corrected = entity;

  if (corrected.id === 'sports-venue:jones-att-stadium') {
    corrected = {
      ...corrected,
      name: 'Galaxy Stadium',
      aliases: [...new Set([...corrected.aliases, 'Jones AT&T Stadium', 'Jones ATT Stadium', 'Jones Stadium', 'Galaxy Stadium'])],
      description: 'Galaxy Stadium in Lubbock is the home of Texas Tech Red Raiders football and one of West Texas’s major college-sports destinations. The venue adopted the Galaxy Stadium name beginning with the 2026 football season under a 15-year naming-rights agreement, while its long history at the heart of the Texas Tech campus continues to make game weekends a regional travel draw.',
      sourceCheckedAt: checkedAt,
    };
  }

  if (corrected.id === 'sports-venue:college-park-center') {
    corrected = {
      ...corrected,
      description: 'College Park Center in Arlington is UT Arlington basketball and volleyball’s 7,000-seat downtown-campus home and a multipurpose arena for tournaments, concerts and community events. The building has also hosted Dallas Wings basketball, while the team’s announced 2027 move to American Airlines Center keeps the venue’s durable identity centered on UTA and its broader event calendar.',
      sourceCheckedAt: maintenanceCheckedAt,
    };
  }

  if (corrected.kind === 'sports-venue') {
    const description = stripGeneratedSportsVenueBoilerplate(corrected.description);
    if (description !== corrected.description) corrected = { ...corrected, description };
  }

  return corrected;
}
