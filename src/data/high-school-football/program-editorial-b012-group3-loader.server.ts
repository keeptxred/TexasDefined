import type { FootballProgramEditorial } from './program-editorial';

export const BATCH012_GROUP3_SLUGS = new Set(['corsicana','cotton-center','cotulla','covington','crandall']);
export async function loadBatch012Group3FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH012_GROUP3_SLUGS.has(slug)) return undefined;
  const { getBatch012Group3FootballProgramEditorial } = await import('./program-editorial-b012-group3');
  return getBatch012Group3FootballProgramEditorial(slug);
}
