import type { FootballProgramEditorial } from './program-editorial';

// First five individually sourced Batch011 school guides are a conditional
// server-only import; these pages never imply school mark, player-photo,
// live-score-feed, ticket-admission or human accessibility approval.
export const BATCH011_FOOTBALL_SLUGS = new Set<string>([
  'colorado-city-colorado',
  'columbus',
  'comal-canyon',
  'comal-canyon-lake',
  'comal-davenport',
  'comal-pieper',
  'comal-smithson-valley',
  'comanche',
  'comfort',
  'commerce',
  'como-pickton',
  'conroe',
  'conroe-caney-creek',
  'conroe-grand-oaks',
  'conroe-oak-ridge',
  'conroe-the-woodlands',
  'conroe-woodlands-college-park',
  'converse-judson',
  'coolidge',
  'cooper',
]);

export async function loadBatch011FootballProgramEditorial(
  slug: string,
): Promise<FootballProgramEditorial | undefined> {
  if (!BATCH011_FOOTBALL_SLUGS.has(slug)) return undefined;
  const { getBatch011FootballProgramEditorial } =
    await import('./program-editorial-b011');
  return getBatch011FootballProgramEditorial(slug);
}
