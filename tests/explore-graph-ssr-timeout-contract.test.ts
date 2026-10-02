import fs from 'node:fs';

import { describe, expect, it } from 'vitest';

describe('Explore graph SSR timeout contract', () => {
  it('bounds the remote graph fetch on SSR without changing the client fetch branch', () => {
    const adapter = fs.readFileSync('src/data/knowledge-graph/explore-adapter.ts', 'utf8');

    expect(adapter).toContain('import.meta.env.SSR');
    expect(adapter).toContain('signal: AbortSignal.timeout(4_000)');
    expect(adapter).toContain(': { headers: headers() }');
  });

  it('keeps both sitemap paths on the bounded knowledge-graph loader path', () => {
    const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
    const iconsRoute = fs.readFileSync('src/routes/sitemap-texas-icons[.]xml.ts', 'utf8');
    const iconsServer = fs.readFileSync('src/data/texas-icons.server.ts', 'utf8');

    expect(sitemap).toContain('loadTexasKnowledgeGraph()');
    expect(iconsRoute).toContain('loadTexasIconsServer()');
    expect(iconsServer).toContain('loadTexasKnowledgeGraph()');
  });
});
