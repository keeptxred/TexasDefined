// Production-only HTTP transport for strict fishing sitemap/robots parity.
// A single transient network timeout must not be mistaken for a page defect.
// Neither HTTP status failures nor malformed/incorrect content are retried or accepted.
const MAX_ATTEMPTS = 2;
const TIMEOUT_MS = 20000;

export async function fetchFishingParityText(
  url,
  {
    fetchImpl = fetch,
    sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    onRetry = () => {},
  } = {},
) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let response;
    try {
      response = await fetchImpl(url, {
        headers: { 'user-agent': 'TexasDefinedProductionAcceptance/1.0' },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      // Only the bounded network/response-body abort gets ONE fresh request.
      // Never turn a bad sitemap, canonical, HTTP error or bogus HTML into a pass.
      const timedOut = error?.name === 'TimeoutError' || error?.name === 'AbortError';
      if (!timedOut || attempt === MAX_ATTEMPTS) {
        throw new Error(`${url}: ${timedOut ? `timed out on attempt ${attempt}/${MAX_ATTEMPTS}` : String(error)}`);
      }
      onRetry({ url, attempt, reason: 'timeout', maxAttempts: MAX_ATTEMPTS });
      await sleep(250);
    }
  }
  throw new Error(`${url}: bounded verification did not finish`);
}
