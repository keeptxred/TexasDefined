import { TEXAS_ESSENTIAL_FACTS } from './texas-essential-facts';
import { texasEssentialFactSources, type TexasFactSource } from './texas-essential-fact-sources.server';

export type ProvenancedTexasEssentialFact = (typeof TEXAS_ESSENTIAL_FACTS)[number] & {
  sources: readonly TexasFactSource[];
};

export const PROVENANCED_TEXAS_ESSENTIAL_FACTS: ProvenancedTexasEssentialFact[] = TEXAS_ESSENTIAL_FACTS.map((item) => ({
  ...item,
  sources: texasEssentialFactSources(item.id),
}));

export function loadTexasFactsDataServer() {
  return { facts: PROVENANCED_TEXAS_ESSENTIAL_FACTS };
}
