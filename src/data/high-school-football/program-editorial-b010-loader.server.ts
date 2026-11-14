import type { FootballProgramEditorial } from './program-editorial';

// Keep individually researched Batch010 guides on a conditional server-only import;
// no official marks, unsourced season results or client-visible dataset costs.
export const BATCH010_FOOTBALL_SLUGS = new Set<string>(['chilton','china-spring','christoval','cibolo-steele','cisco','clarendon','clarksville','claude','cleburne','cleveland','cleveland-tarkington','clifton','clint','clint-horizon','clint-mountain-view','clute-brazoswood','clyde','coahoma','coldspring-oakhurst','coleman','college-station','college-station-a-and-m-consolidated','colleyville-heritage','collinsville','colmesneil']);
export async function loadBatch010FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH010_FOOTBALL_SLUGS.has(slug)) return undefined;
  const { getBatch010FootballProgramEditorial } = await import('./program-editorial-b010');
  return getBatch010FootballProgramEditorial(slug);
}
