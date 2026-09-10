import { describe, expect, it } from 'vitest';

import { canonicalEntityPath, isIndexableEntityPage } from '../src/data/knowledge-graph/relationships';
import { PUBLIC_CAVERN_ENTITIES } from '../src/data/knowledge-graph/public-caverns';
import { findCompleteTexasEntity, loadTexasKnowledgeGraph } from '../src/data/knowledge-graph';
import { TEXAS_ENTITY_REGISTRY, validateTexasEntityRegistry } from '../src/data/texas-entity-registry';

const EXPECTED_PUBLIC_CAVERNS = [
  'natural-bridge-caverns',
  'inner-space-cavern',
  'longhorn-cavern-state-park',
  'caverns-of-sonora',
  'cascade-caverns',
  'cave-without-a-name',
  'wonder-world-cave',
  'kickapoo-cavern-state-park',
  'gorman-cave',
  'devils-sinkhole-state-natural-area',
  'westcave-preserve',
] as const;

describe('public cavern knowledge graph', () => {
  it('keeps cavern mirrors out of the static client registry', () => {
    const cavernSlugs = TEXAS_ENTITY_REGISTRY
      .filter((entity) => entity.kind === 'cavern')
      .map((entity) => entity.slug);
    expect(cavernSlugs).toEqual(['natural-bridge-caverns']);
  });

  it('adds exactly the ten cavern mirrors that were missing from the original seed', () => {
    expect(PUBLIC_CAVERN_ENTITIES).toHaveLength(10);
    expect(PUBLIC_CAVERN_ENTITIES.some((entity) => entity.slug === 'natural-bridge-caverns')).toBe(false);
  });

  it('loads all 11 public cavern destinations through the complete knowledge graph', async () => {
    const graph = await loadTexasKnowledgeGraph();
    const cavernSlugs = new Set(
      graph.filter((entity) => entity.kind === 'cavern').map((entity) => entity.slug),
    );
    for (const slug of EXPECTED_PUBLIC_CAVERNS) expect(cavernSlugs.has(slug), slug).toBe(true);
  });

  it('finds lazy cavern mirrors through direct complete entity lookup', async () => {
    for (const slug of EXPECTED_PUBLIC_CAVERNS) {
      const entity = await findCompleteTexasEntity(slug);
      expect(entity?.kind, slug).toBe('cavern');
      expect(entity?.slug, slug).toBe(slug);
    }
  });

  it('canonicalizes every cavern entity to its Explore destination page and suppresses duplicate entity indexing', async () => {
    for (const slug of EXPECTED_PUBLIC_CAVERNS) {
      const entity = await findCompleteTexasEntity(slug);
      expect(entity, slug).toBeDefined();
      expect(canonicalEntityPath(entity!), slug).toBe(`/destination/${slug}`);
      expect(isIndexableEntityPage(entity!), slug).toBe(false);
    }
  });

  it('keeps the static registry structurally valid', () => {
    const validation = validateTexasEntityRegistry();
    expect(validation.errors).toEqual([]);
    expect(validation.valid).toBe(true);
  });
});
