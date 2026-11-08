import type { FootballProgramEditorial } from './program-editorial';
// Only the five individually sourced Batch016 schools load the new module;
// other assigned schools keep the conservative generic profile until researched.
const BATCH016_SOURCE_QUALIFIED = new Set(['early','earth-springlake','east-bernard','east-chambers','eastland']);
export async function loadBatch016FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH016_SOURCE_QUALIFIED.has(slug)) return undefined;
  const { getBatch016FootballProgramEditorial } = await import('./program-editorial-b016');
  return getBatch016FootballProgramEditorial(slug);
}
