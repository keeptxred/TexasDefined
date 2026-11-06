/**
 * Bounded transport retry for existing production HTML acceptance probes.
 * Never converts failing HTTP content or assertion failures into passes.
 * Only network/timeout failures and transient HTTP status codes are retried.
 */
const transientStatuses = new Set([408, 425, 429, 500, 502, 503, 504, 520, 522, 524]);

export async function fetchLiveHtmlWithRetry(url, {
  fetchImpl = fetch, headers = {}, cache, redirect = 'manual',
  timeoutMs = 20000, attempts = 3, retryDelayMs = 750,
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
} = {}) {
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 3) {
    throw new Error('Live HTML retry count must be bounded between 1 and 3');
  }
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetchImpl(url, {
        headers, cache, redirect, signal: AbortSignal.timeout(timeoutMs),
      });
      const html = await response.text();
      if (transientStatuses.has(response.status) && attempt < attempts) {
        lastError = new Error(`Transient HTTP ${response.status} at ${url}`);
      } else {
        return { response, html, attempt };
      }
    } catch (error) {
      const retryable = error?.name === 'TimeoutError' || error?.name === 'AbortError' ||
        error instanceof TypeError;
      if (!retryable || attempt === attempts) throw error;
      lastError = error;
    }
    // All non-transient HTTP results return immediately. On a transient
    // response, or after a retryable timeout, retain a strict retry budget.
    console.warn(`[live-html] transient request attempt ${attempt}/${attempts} for ${url}: ${String(lastError)}`);
    if (attempt < attempts) await sleep(retryDelayMs * attempt);
  }
  throw lastError ?? new Error('Live HTML request failed after bounded retries');
}
