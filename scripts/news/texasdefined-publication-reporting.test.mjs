import { describe, expect, it } from 'vitest';
import { buildPublicationRunSummary, parsePostgrestExactCount } from './texasdefined-publication-reporting.mjs';

describe('TexasDefined publication reporting', () => {
  it('uses the exact PostgREST count instead of the limited sample size', () => {
    expect(parsePostgrestExactCount('0-2/50', 3)).toBe(50);
    expect(parsePostgrestExactCount('0-0/*', 1)).toBe(1);
  });

  it('reports a limited dry-run sample without understating the eligible queue', () => {
    expect(buildPublicationRunSummary({
      mode: 'dry-run',
      eligible: 50,
      selected: 3,
      published: 0,
      failed: 0,
      ids: [11, 12, 13],
    })).toEqual({
      mode: 'dry-run-summary',
      eligible: 50,
      selected: 3,
      published: 0,
      skipped: 47,
      failed: 0,
      ids: [11, 12, 13],
    });
  });

  it('reports publish success and failure counts without changing the eligible total', () => {
    expect(buildPublicationRunSummary({
      mode: 'publish', eligible: 50, selected: 1, published: 1, failed: 0, ids: [11],
    }).skipped).toBe(49);
    expect(buildPublicationRunSummary({
      mode: 'publish', eligible: 50, selected: 1, published: 0, failed: 1, ids: [11],
    }).skipped).toBe(49);
  });
});
