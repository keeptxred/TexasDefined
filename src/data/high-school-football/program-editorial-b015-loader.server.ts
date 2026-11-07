import type { FootballProgramEditorial } from './program-editorial';
const BATCH015_FIRST_FIFTEEN = new Set(['dell-city', 'denison', 'denton', 'denton-braswell', 'denton-guyer', 'denton-ryan', 'denver-city', 'detroit', 'devine', 'deweyville', 'dhanis', 'diana-new-diana', 'diboll', 'dickinson', 'dilley']);
export async function loadBatch015FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH015_FIRST_FIFTEEN.has(slug)) return undefined;
  const { getBatch015FirstThreeEditorial } = await import('./program-editorial-b015');
  return getBatch015FirstThreeEditorial(slug);
}
