import { describe, expect, it } from 'vitest';

import { canonicalEntityPath, isIndexableEntityPage } from '../src/data/knowledge-graph/relationships';
import { PUBLIC_CAVERN_ENTITIES } from '../src/data/knowledge-graph/public-caverns';
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
  it('contains all 11 public cavern destinations in the static registry', () => {
    const cavernSlugs = new Set(
      TEXAS_ENTITY_REGISTRY.filter((entity) => entity.kind === 'cavern').map((entity) => entity.slug),
    );
    for (const slug of EXPECTED_PUBLIC_CAVERNS) expect(cavernSlugs.has(slug), slug).toBe(true);
  });

  it('adds exactly the ten cavern mirrors that were missing from the original seed', () => {
    expect(PUBLIC_CAVERN_ENTITIES).toHaveLength(10);
    expect(PUBLIC_CAVERN_ENTITIES.some((entity) => entity.slug === 'natural-bridge-caverns')).toBe(false);
  });

  it('canonicalizes every cavern entity to its Explore destination page and suppresses duplicate entity indexing', () => {
    for (const slug of EXPECTED_PUBLIC_CAVERNS) {
      const entity = TEXAS_ENTITY_REGISTRY.find((candidate) => candidate.kind === 'cavern' && candidate.slug === slug);
      expect(entity, slug).toBeDefined();
      expect(canonicalEntityPath(entity!), slug).toBe(`/destination/${slug}`);
      expect(isIndexableEntityPage(entity!), slug).toBe(false);
    }
  });

  it('keeps the full static registry structurally valid', () => {
    const validation = validateTexasEntityRegistry();
    expect(validation.errors).toEqual([]);
    expect(validation.valid).toBe(true);
  });
});
