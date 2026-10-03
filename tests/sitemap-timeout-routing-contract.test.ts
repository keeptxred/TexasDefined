import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('Explore sitemap timeout integration', () => {
  it('keeps timeout handling server-only and wraps both remote catalog calls', () => {
    const route = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');

    expect(route).toContain('import("@/lib/sitemap-remote-timeout.server")');
    expect(route).toContain('withSitemapRemoteTimeout(\n              "Explore sitemap enriched catalog"');
    expect(route).toContain('withSitemapRemoteTimeout(\n              "Explore sitemap core catalog"');
  });
});
