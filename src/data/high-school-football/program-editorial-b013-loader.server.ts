import type { FootballProgramEditorial } from './program-editorial';

// Assigned Batch013: only individually authored first-five routes.
export const BATCH013_AUTHORED_SLUGS = new Set(['cuero','cumby','cushing','cy-fair','cypress-creek']);

export async function loadBatch013FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH013_AUTHORED_SLUGS.has(slug)) return undefined;
  const { getBatch013FootballProgramEditorial } = await import('./program-editorial-b013');
  return getBatch013FootballProgramEditorial(slug);
}
