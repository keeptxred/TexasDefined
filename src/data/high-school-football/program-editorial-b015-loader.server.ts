import type { FootballProgramEditorial } from './program-editorial';
const BATCH015_FIRST_FIVE = new Set(['dell-city', 'denison', 'denton', 'denton-braswell', 'denton-guyer']);
export async function loadBatch015FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH015_FIRST_FIVE.has(slug)) return undefined;
  const { getBatch015FirstThreeEditorial } = await import('./program-editorial-b015');
  return getBatch015FirstThreeEditorial(slug);
}
