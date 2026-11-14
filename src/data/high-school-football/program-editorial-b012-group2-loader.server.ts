import type { FootballProgramEditorial } from './program-editorial';

const BATCH012_GROUP_TWO_SLUGS = new Set([
  'corpus-christi-ray',
  'corpus-christi-tuloso-midway',
  'corpus-christi-veterans-memorial',
  'corpus-christi-west-oso',
  'corrigan-camden',
]);

export async function loadBatch012GroupTwoEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH012_GROUP_TWO_SLUGS.has(slug)) return undefined;
  const { getBatch012GroupTwoEditorial } = await import('./program-editorial-b012-group2');
  return getBatch012GroupTwoEditorial(slug);
}
