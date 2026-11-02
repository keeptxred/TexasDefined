import type { FootballProgramEditorial } from './program-editorial';

export const BATCH012_GROUP5_SLUGS = new Set(['crosbyton','cross-plains','crowell','crowley','crystal-city']);
export async function loadBatch012Group5FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH012_GROUP5_SLUGS.has(slug)) return undefined;
  const { getBatch012Group5FootballProgramEditorial } = await import('./program-editorial-b012-group5');
  return getBatch012Group5FootballProgramEditorial(slug);
}
