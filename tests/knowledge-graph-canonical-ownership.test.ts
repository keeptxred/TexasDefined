import { describe, expect, it } from 'vitest';

import { canonicalEntityPath, genericEntityPath } from '../src/data/knowledge-graph/relationships';
import { CURATED_KNOWLEDGE_GRAPH_SEED } from '../src/data/knowledge-graph/seed';

describe('knowledge-graph canonical ownership', () => {
  it('maps only known curated mirrors to richer destination owners', () => {
    const expectedOwners = new Map([
      ['national-park:big-bend-national-park', '/destination/big-bend-national-park'],
      ['lake:caddo-lake', '/destination/caddo-lake'],
      ['state-park:palo-duro-canyon-state-park', '/destination/palo-duro-canyon-state-park'],
      ['state-park:enchanted-rock-state-natural-area', '/destination/enchanted-rock-state-natural-area'],
      ['cavern:natural-bridge-caverns', '/destination/natural-bridge-caverns'],
      ['beach:padre-island-national-seashore', '/destination/padre-island-national-seashore'],
      ['historic-site:the-alamo', '/destination/the-alamo'],
    ]);

    for (const [id, expected] of expectedOwners) {
      const entity = CURATED_KNOWLEDGE_GRAPH_SEED.find((candidate) => candidate.id === id);
      expect(entity, `missing curated entity ${id}`).toBeDefined();
      expect(canonicalEntityPath(entity!)).toBe(expected);
    }
  });

  it('does not invent a destination owner when no destination is known', () => {
    const entity = { kind: 'national-forest' as const, slug: 'sam-houston-national-forest', sourceId: 'usfs-texas' };
    expect(canonicalEntityPath(entity)).toBe('/national-forest/sam-houston-national-forest');
    expect(canonicalEntityPath(entity)).toBe(genericEntityPath(entity));
  });

  it('does not broadly canonicalize an unmatched kind', () => {
    expect(canonicalEntityPath({ kind: 'state-park', slug: 'not-a-known-owner', sourceId: 'tpwd-parks' }))
      .toBe('/state-park/not-a-known-owner');
  });

  it('assigns Explore catalog projections to destination routes by provenance', () => {
    expect(canonicalEntityPath({ kind: 'museum', slug: 'example-museum', sourceId: 'explore-shared-catalog' })).toBe('/destination/example-museum');
  });
});
