import type { FootballProgramEditorial } from './program-editorial';

// Avoid eagerly parsing football editorial for unrelated SSR routes.
export const BATCH009_FOOTBALL_SLUGS = new Set<string>(["canyon-west-plains", "carrizo-springs", "carrollton-creekview", "carrollton-ranchview", "carrollton-smith", "carrollton-turner", "carthage", "castle-hills", "castroville-medina-valley", "cayuga"]);
export async function loadBatch009FootballProgramEditorial(slug: string): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH009_FOOTBALL_SLUGS.has(slug)) return undefined;
  const { getBatch009FootballProgramEditorial } = await import('./program-editorial-b009');
  return getBatch009FootballProgramEditorial(slug);
}
