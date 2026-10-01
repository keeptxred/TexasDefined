import { describe, expect, it } from 'vitest';

import { topAttractionTimeline } from '../src/data/destination-timelines-top-attractions';
import { CURATED_KNOWLEDGE_GRAPH_SEED } from '../src/data/knowledge-graph/seed';
import { canonicalEntityPath } from '../src/data/knowledge-graph/relationships';

const slug = 'sam-houston-memorial-museum-republic-texas-presidential-library-huntsville';

describe('Sam Houston museum authority cluster', () => {
  it('keeps one canonical destination URL for the museum entity', () => {
    const entity = CURATED_KNOWLEDGE_GRAPH_SEED.find((item) => item.slug === slug);
    expect(entity).toBeDefined();
    expect(entity?.kind).toBe('museum');
    expect(entity?.aliases).toContain('Sam Houston Memorial Museum');
    expect(entity?.aliases).toContain('Republic of Texas Presidential Library');
    expect(canonicalEntityPath(entity!)).toBe(`/destination/${slug}`);
  });

  it('preserves a source-backed museum chronology', () => {
    const timeline = topAttractionTimeline(slug);
    expect(timeline).toHaveLength(5);
    expect(timeline.map((event) => event.date)).toEqual(['1847', 'July 26, 1863', '1936', '2017', '2022']);
    expect(timeline.every((event) => event.sourceUrl.startsWith('https://'))).toBe(true);
  });
});
