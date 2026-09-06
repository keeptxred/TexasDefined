import type { TexasEntityRecord } from './types';

const checkedAt = '2026-08-13';
const generatedSportsVenueMarker = 'Texas Defined tracks it as a visitor-facing venue';

function stripGeneratedSportsVenueBoilerplate(description?: string) {
  if (!description || !description.includes(generatedSportsVenueMarker)) return description;
  const firstSentenceEnd = description.indexOf('. ');
  return firstSentenceEnd >= 0 ? description.slice(0, firstSentenceEnd + 1).trim() : description.trim();
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

  if (corrected.kind === 'sports-venue') {
    const description = stripGeneratedSportsVenueBoilerplate(corrected.description);
    if (description && description !== corrected.description) corrected = { ...corrected, description };
  }

  return corrected;
}
