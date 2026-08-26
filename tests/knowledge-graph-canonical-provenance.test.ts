import { describe, expect, it } from 'vitest';

import { canonicalEntityPath } from '../src/data/knowledge-graph/relationships';

describe('knowledge-graph canonical provenance', () => {
  it('does not infer destination ownership from Explore catalog provenance', () => {
    expect(canonicalEntityPath({
      kind: 'museum',
      slug: 'example-museum',
      sourceId: 'explore-shared-catalog',
    })).toBe('/museum/example-museum');

    expect(canonicalEntityPath({
      kind: 'state-park',
      slug: 'example-state-park',
      sourceId: 'explore-shared-catalog',
    })).toBe('/state-park/example-state-park');
  });

  it('does not broadly redirect curated entities just because their kind can also appear in Explore', () => {
    expect(canonicalEntityPath({
      kind: 'museum',
      slug: 'curated-museum',
      sourceId: 'official-destination-sites',
    })).toBe('/museum/curated-museum');

    expect(canonicalEntityPath({
      kind: 'state-park',
      slug: 'not-a-known-owner',
      sourceId: 'tpwd-parks',
    })).toBe('/state-park/not-a-known-owner');
  });

  it('keeps the existing seven exact curated mirrors on destination routes without seed tags', () => {
    expect(canonicalEntityPath({ kind: 'lake', slug: 'caddo-lake' })).toBe('/destination/caddo-lake');
    expect(canonicalEntityPath({ kind: 'historic-site', slug: 'the-alamo' })).toBe('/destination/the-alamo');
  });
});