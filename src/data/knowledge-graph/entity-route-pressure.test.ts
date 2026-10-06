import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const entityRoute = readFileSync(new URL('../../routes/$kind.$slug.tsx', import.meta.url), 'utf8');

describe('generic entity route Supabase pressure', () => {
  it('resolves the requested entity without loading the full remote knowledge graph', () => {
    expect(entityRoute).toContain('findCompleteTexasEntity');
    expect(entityRoute).toContain('TEXAS_ENTITY_REGISTRY');
    expect(entityRoute).not.toContain('loadTexasKnowledgeGraph()');
  });
});
