import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const runtime = readFileSync(new URL('./destination-query-runtime.ts', import.meta.url), 'utf8');

describe('destination remote failover pressure', () => {
  it('uses the core/public catalog only after an actual enriched-source failure', () => {
    expect(runtime).toContain('const core = enrichedResult.failed ? await loadCoreCatalog(options, params) : []');
    expect(runtime).toContain('let enrichedFailed = false');
    expect(runtime).toContain('const core = enrichedFailed');
    expect(runtime).not.toContain('const core = enriched.length ? []');
  });

  it('does not duplicate successful empty slug lookups and prefers local fallbacks during outages', () => {
    expect(runtime).toContain('enrichedFailed = true');
    expect(runtime).toContain('if (enrichedFailed) {');
    expect(runtime.indexOf('const preserved = preservedExploreDestinations.find')).toBeLessThan(runtime.indexOf('if (enrichedFailed) {'));
    expect(runtime.indexOf('const local = await platform.destinations.getBySlug')).toBeLessThan(runtime.indexOf('if (enrichedFailed) {'));
  });
});
