// Reuse a successful response across assertions for one URL. A failed assertion
// can explicitly refresh on the next bounded attempt; failures are never cached.
export function createProductionPageFetch(fetchImpl = fetch) {
  const pages = new Map();
  return async (input, init, refresh = false) => {
    const url = new URL(input);
    url.searchParams.delete('verify');
    const key = url.origin + url.pathname + url.search;
    if (refresh) pages.delete(key);
    if (pages.has(key)) return pages.get(key).clone();
    const response = await fetchImpl(input, init);
    if (response.ok && response.headers.get('cf-mitigated') !== 'challenge') pages.set(key, response.clone());
    return response;
  };
}
