import type { FootballProgramEditorial } from './program-editorial';
export const BATCH014_FIRST_FIVE = new Set(['dallas-kimball','dallas-life-oak-cliff','dallas-lincoln','dallas-madison','dallas-molina']);
export const BATCH014_SECOND_FIVE = new Set(['dallas-pinkston','dallas-roosevelt','dallas-samuell','dallas-seagoville','dallas-skyline']);
export const BATCH014_THIRD_FIVE = new Set(['dallas-south-oak-cliff','dallas-spruce','dallas-sunset','dallas-white','dallas-wilson']);
export const BATCH014_FOURTH_FIVE = new Set(['danbury','dawson','dayton','de-kalb','de-leon']);
export async function loadBatch014FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if(BATCH014_FIRST_FIVE.has(slug)){
    const {getBatch014FirstFiveEditorial}=await import('./program-editorial-b014');
    return getBatch014FirstFiveEditorial(slug);
  }
  if(BATCH014_SECOND_FIVE.has(slug)){
    const {getBatch014SecondFiveEditorial}=await import('./program-editorial-b014-group2');
    return getBatch014SecondFiveEditorial(slug);
  }
  if(BATCH014_THIRD_FIVE.has(slug)){
    const {getBatch014ThirdFiveEditorial}=await import('./program-editorial-b014-group3');
    return getBatch014ThirdFiveEditorial(slug);
  }
  if(BATCH014_FOURTH_FIVE.has(slug)){
    const {getBatch014FourthFiveEditorial}=await import('./program-editorial-b014-group4');
    return getBatch014FourthFiveEditorial(slug);
  }
  return undefined;
}
