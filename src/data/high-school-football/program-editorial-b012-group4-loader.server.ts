import type { FootballProgramEditorial } from './program-editorial';

export const BATCH012_GROUP4_SLUGS = new Set(['crane','cranfills-gap','crawford','crockett','crosby']);
export async function loadBatch012Group4FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH012_GROUP4_SLUGS.has(slug)) return undefined;
  const { getBatch012Group4FootballProgramEditorial } = await import('./program-editorial-b012-group4');
  return getBatch012Group4FootballProgramEditorial(slug);
}
