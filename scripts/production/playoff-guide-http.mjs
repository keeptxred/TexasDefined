// Strict live Worker article transport. One transient fetch/body timeout may be
// retried; the caller still validates HTTP status, immutable source wording,
// affiliate links, cache headers and exact page-specific content.
const MAX_ATTEMPTS = 2;

export async function fetchPlayoffGuideHtml(
  url,
  {
    fetchImpl = fetch,
    sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    onRetry = () => {},
  } = {},
) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetchImpl(url, {
        headers: { Accept: 'text/html', 'Cache-Control': 'no-cache' },
        cache: 'no-store',
        redirect: 'follow',
        signal: AbortSignal.timeout(30_000),
      });
      const html = await response.text();
      return { response, html, attempts: attempt };
    } catch (error) {
      const timedOut = error?.name === 'TimeoutError' || error?.name === 'AbortError';
      if (!timedOut || attempt === MAX_ATTEMPTS) {
        throw new Error(`${url}: ${timedOut ? `timed out on attempt ${attempt}/${MAX_ATTEMPTS}` : String(error)}`);
      }
      onRetry({ url, attempt, reason: 'timeout', maxAttempts: MAX_ATTEMPTS });
      await sleep(250);
    }
  }
  throw new Error(`${url}: bounded guide verification did not finish`);
}
