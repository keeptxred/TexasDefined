import type { FootballProgramEditorial } from './program-editorial';

// Only load the individually authored first five Batch012 guides on their routes.
// Remaining assigned schools are not implemented or production certified.
export const BATCH012_AUTHORED_SLUGS = new Set([
  'corpus-christi-flour-bluff',
  'corpus-christi-king',
  'corpus-christi-london',
  'corpus-christi-miller',
  'corpus-christi-moody',
]);

export async function loadBatch012FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH012_AUTHORED_SLUGS.has(slug)) return undefined;
  const { getBatch012FootballProgramEditorial } = await import('./program-editorial-b012');
  return getBatch012FootballProgramEditorial(slug);
}
