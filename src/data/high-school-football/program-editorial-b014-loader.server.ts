import type { FootballProgramEditorial } from './program-editorial';
export const BATCH014_FIRST_FIVE = new Set(['dallas-kimball','dallas-life-oak-cliff','dallas-lincoln','dallas-madison','dallas-molina']);
export const BATCH014_SECOND_FIVE = new Set(['dallas-pinkston','dallas-roosevelt','dallas-samuell','dallas-seagoville','dallas-skyline']);
export async function loadBatch014FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if(BATCH014_FIRST_FIVE.has(slug)){
    const {getBatch014FirstFiveEditorial}=await import('./program-editorial-b014');
    return getBatch014FirstFiveEditorial(slug);
  }
  if(BATCH014_SECOND_FIVE.has(slug)){
    const {getBatch014SecondFiveEditorial}=await import('./program-editorial-b014-group2');
    return getBatch014SecondFiveEditorial(slug);
  }
  return undefined;
}
