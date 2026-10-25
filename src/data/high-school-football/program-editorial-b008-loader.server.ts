import type { FootballProgramEditorial } from './program-editorial';

/** Only evaluate Batch 008's 25 fully sourced dossiers for those schools.
 * Do not eagerly parse the whole overlay on unrelated SSR school-profile requests. */
export const BATCH008_FOOTBALL_SLUGS = new Set<string>([
  'buckholts',
  'buda-hays',
  'buda-johnson',
  'buffalo',
  'bullard',
  'buna',
  'burkburnett',
  'burkeville',
  'burleson',
  'burleson-centennial',
  'burnet',
  'burton',
  'bushland',
  'bynum',
  'caddo-mills',
  'caldwell',
  'callisburg',
  'calvert',
  'cameron-yoe',
  'campbell',
  'canadian',
  'canton',
  'canutillo',
  'canyon',
  'canyon-randall',
]);

export async function loadBatch008FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH008_FOOTBALL_SLUGS.has(slug)) return undefined;
  const { getBatch008FootballProgramEditorial } = await import('./program-editorial-b008');
  return getBatch008FootballProgramEditorial(slug);
}
