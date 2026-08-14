import type { TexasEntityRecord } from './types';

const checkedAt = '2026-08-13';

export function applyCurrentEntityCorrections(entity: TexasEntityRecord): TexasEntityRecord {
  if (entity.id === 'sports-venue:jones-att-stadium') {
    return {
      ...entity,
      name: 'Galaxy Stadium',
      slug: 'galaxy-stadium',
      aliases: [...new Set([...entity.aliases, 'Jones AT&T Stadium', 'Jones ATT Stadium', 'Jones Stadium'])],
      description: 'Galaxy Stadium in Lubbock is the home of Texas Tech Red Raiders football and one of West Texas’s major college-sports destinations. The venue adopted the Galaxy Stadium name beginning with the 2026 football season under a 15-year naming-rights agreement, while its long history at the heart of the Texas Tech campus continues to make game weekends a regional travel draw.',
      sourceCheckedAt: checkedAt,
    };
  }

  return entity;
}
