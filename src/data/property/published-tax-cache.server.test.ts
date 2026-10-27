import { describe, expect, it, beforeEach, vi } from 'vitest';
import { cachedPublishedTax, clearPublishedTaxCacheForTests } from './published-tax-cache.server';

beforeEach(() => { clearPublishedTaxCacheForTests(); vi.restoreAllMocks(); });

describe('published tax snapshot cache', () => {
  it('coalesces repeated county and unit reads', async () => {
    const read = vi.fn().mockResolvedValue(['2025 verified']);
    const [a, b] = await Promise.all([
      cachedPublishedTax('county:2025:travis', read),
      cachedPublishedTax('county:2025:travis', read),
    ]);
    expect(a).toEqual(b);
    expect(await cachedPublishedTax('county:2025:travis', read)).toEqual(a);
    expect(read).toHaveBeenCalledTimes(1);
  });

  it('expires instead of hiding subsequent verified corrections', async () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(10_000);
    const read = vi.fn().mockResolvedValueOnce('old').mockResolvedValueOnce('new');
    expect(await cachedPublishedTax('history:foo', read, 60_000)).toBe('old');
    now.mockReturnValue(70_001);
    expect(await cachedPublishedTax('history:foo', read, 60_000)).toBe('new');
  });

  it('never caches failed imports or failed reads', async () => {
    const read = vi.fn().mockRejectedValueOnce(new Error('PostgREST 503')).mockResolvedValueOnce('ok');
    await expect(cachedPublishedTax('statewide:2025', read)).rejects.toThrow('PostgREST 503');
    expect(await cachedPublishedTax('statewide:2025', read)).toBe('ok');
    expect(read).toHaveBeenCalledTimes(2);
  });
});
