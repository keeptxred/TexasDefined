// Resilient, bounded HTTP fetch for production sitemap/page auditing.
// Never converts failed fetches into passing pages; no unbounded polling.
export async function fetchTextWithRetry(url, {
  attempts = 3,
  timeoutMs = 30_000,
  backoffMs = 400,
  fetchImpl = fetch,
  headers = {},
} = {}) {
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 4) {
    throw new RangeError('Audit fetch attempts must be within 1..4.');
  }

  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    let shouldRetry = false;
    try {
      const response = await fetchImpl(url, {
        headers,
        redirect: 'follow',
        signal: controller.signal,
      });
      const body = await response.text();
      // Do not misreport temporary Cloudflare/upstream overload as a content error
      // until the bounded request attempts have been exhausted.
      shouldRetry = response.status === 429 || response.status >= 500;
      if (!shouldRetry || attempt === attempts) return { response, body };
      lastError = new Error('Temporary HTTP ' + response.status + ' from ' + url);
    } catch (error) {
      lastError = error;
      shouldRetry = true;
      if (attempt === attempts) throw error;
    } finally {
      clearTimeout(timeout);
    }
    if (shouldRetry && backoffMs > 0) {
      await new Promise(resolve => setTimeout(resolve, backoffMs * attempt));
    }
  }
  throw lastError;
}
