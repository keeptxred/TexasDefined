import type { FootballProgramEditorial } from './program-editorial';
const BATCH015_FIRST_TWENTY_FIVE = new Set(['dell-city', 'denison', 'denton', 'denton-braswell', 'denton-guyer', 'denton-ryan', 'denver-city', 'detroit', 'devine', 'deweyville', 'dhanis', 'diana-new-diana', 'diboll', 'dickinson', 'dilley', 'dimmitt', 'donna', 'donna-north', 'dripping-springs', 'dublin', 'dumas', 'duncanville', 'eagle-mountain', 'eagle-pass', 'eagle-pass-winn']);
export async function loadBatch015FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH015_FIRST_TWENTY_FIVE.has(slug)) return undefined;
  const { getBatch015FirstThreeEditorial } = await import('./program-editorial-b015');
  return getBatch015FirstThreeEditorial(slug);
}
