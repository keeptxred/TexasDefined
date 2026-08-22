import { describe, expect, it } from 'vitest';

import { canonicalEntityPath, genericEntityPath } from './relationships';

describe('knowledge-graph canonical ownership', () => {
  it('maps only known curated mirrors to richer destination owners', () => {
    expect(canonicalEntityPath({ kind: 'national-park', slug: 'big-bend-national-park', sourceId: 'nps-texas' })).toBe('/destination/big-bend-national-park');
    expect(canonicalEntityPath({ kind: 'lake', slug: 'caddo-lake', sourceId: 'tpwd-parks' })).toBe('/destination/caddo-lake');
    expect(canonicalEntityPath({ kind: 'cavern', slug: 'natural-bridge-caverns', sourceId: 'official-destination-sites' })).toBe('/destination/natural-bridge-caverns');
    expect(canonicalEntityPath({ kind: 'beach', slug: 'padre-island-national-seashore', sourceId: 'nps-texas' })).toBe('/destination/padre-island-national-seashore');
    expect(canonicalEntityPath({ kind: 'historic-site', slug: 'the-alamo', sourceId: 'official-destination-sites' })).toBe('/destination/the-alamo');
  });

  it('does not invent a destination owner when no destination is known', () => {
    const entity = { kind: 'national-forest' as const, slug: 'sam-houston-national-forest', sourceId: 'usfs-texas' };
    expect(canonicalEntityPath(entity)).toBe('/national-forest/sam-houston-national-forest');
    expect(canonicalEntityPath(entity)).toBe(genericEntityPath(entity));
  });

  it('assigns Explore catalog projections to destination routes by provenance', () => {
    expect(canonicalEntityPath({ kind: 'museum', slug: 'example-museum', sourceId: 'explore-shared-catalog' })).toBe('/destination/example-museum');
  });

  it('honors an explicit per-record canonical owner before other rules', () => {
    expect(canonicalEntityPath({
      kind: 'sports-venue',
      slug: 'example-stadium',
      sourceId: 'official-destination-sites',
      canonicalPath: '/destination/example-stadium',
    })).toBe('/destination/example-stadium');
  });
});
