import type { FootballProgramEditorial } from './program-editorial';
export const BATCH014_FIRST_FIVE = new Set(['dallas-kimball','dallas-life-oak-cliff','dallas-lincoln','dallas-madison','dallas-molina']);
export async function loadBatch014FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> { if (!BATCH014_FIRST_FIVE.has(slug)) return undefined; const {getBatch014FirstFiveEditorial}=await import('./program-editorial-b014'); return getBatch014FirstFiveEditorial(slug); }
