import type { FootballProgramEditorial } from './program-editorial';

// Keep five source-backed Batch010 guides on a conditional server-only import;
// no official marks, unsourced season results or client-visible dataset costs.
export const BATCH010_FOOTBALL_SLUGS = new Set<string>(['chilton','china-spring','christoval','cibolo-steele','cisco']);
export const BATCH010_SECOND_SLUGS = new Set<string>(['clarendon','clarksville','claude','cleburne','cleveland']);

export async function loadBatch010FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (BATCH010_SECOND_SLUGS.has(slug)) {
    const { getBatch010SecondFootballProgramEditorial } = await import('./program-editorial-b010-second');
    return getBatch010SecondFootballProgramEditorial(slug);
  }
  if (!BATCH010_FOOTBALL_SLUGS.has(slug)) return undefined;
  const { getBatch010FootballProgramEditorial } = await import('./program-editorial-b010');
  return getBatch010FootballProgramEditorial(slug);
}
