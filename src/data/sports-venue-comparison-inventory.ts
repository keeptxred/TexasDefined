import { applyCurrentEntityCorrections } from './knowledge-graph/current-entity-corrections';
import { CURATED_KNOWLEDGE_GRAPH_SEED } from './knowledge-graph/seed';

/** One lightweight inventory for the comparison table and directory summary.
 * Do not include the heavy source-enrichment records in directory rendering.
 * The curated guide list intentionally uses a separate indexability gate.
 */
export const SPORTS_VENUE_COMPARISON_INVENTORY = [...new Map(
  CURATED_KNOWLEDGE_GRAPH_SEED
    .filter((entity) => entity.kind === 'sports-venue')
    .map(applyCurrentEntityCorrections)
    .map((entity) => [entity.slug, entity] as const),
).values()];

export const SPORTS_VENUE_COMPARISON_INVENTORY_COUNT = SPORTS_VENUE_COMPARISON_INVENTORY.length;
