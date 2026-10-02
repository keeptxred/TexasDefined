import { afterEach, describe, expect, it, vi } from 'vitest';

import { SitemapRemoteTimeoutError, withSitemapRemoteTimeout } from '../src/lib/sitemap-remote-timeout.server';

describe('sitemap remote timeout', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns a remote result that finishes before the deadline', async () => {
    await expect(withSitemapRemoteTimeout('fast catalog', Promise.resolve(['ok']), 25)).resolves.toEqual(['ok']);
  });

  it('rejects a stalled remote operation instead of hanging sitemap generation', async () => {
    vi.useFakeTimers();
    const stalled = new Promise<never>(() => undefined);
    const result = withSitemapRemoteTimeout('stalled catalog', stalled, 25);

    const assertion = expect(result).rejects.toEqual(
      expect.objectContaining({
        name: 'SitemapRemoteTimeoutError',
        message: 'stalled catalog timed out after 25ms',
      }),
    );

    await vi.advanceTimersByTimeAsync(25);
    await assertion;
    expect(SitemapRemoteTimeoutError).toBeDefined();
  });
});
