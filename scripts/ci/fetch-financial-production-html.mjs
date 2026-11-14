/**
 * A bounded recovery for intermittent network/stream timeouts when verifying
 * already-deployed public pages. The caller still checks HTTP status, robots,
 * canonical, editorial markers and every required reciprocal link. No
 * response with HTTP 404/5xx or invalid content is ever converted to success.
 */
export async function fetchFinancialProductionHtml(url, {
  fetchImpl = fetch,
  attempts = 3,
  timeoutMs = 30_000,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  onRetry = () => {},
} = {}) {
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 3)
    throw new Error('Financial request retry attempts must be between 1 and 3');
  if (!Number.isFinite(timeoutMs) || timeoutMs < 1 || timeoutMs > 30_000)
    throw new Error('Financial verification request timeout must be <= 30 seconds');
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetchImpl(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(timeoutMs),
        headers: { 'user-agent': 'TexasDefined-CI-Statewide-Financial-Discovery/1.0' },
      });
      // HTTP errors are explicit content/status failures, NOT timeout cases.
      // The calling verifier rejects any !response.ok without a retry bypass.
      const body = await response.text();
      return { response, body };
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      onRetry({ attempt, error: error instanceof Error ? error.message : String(error) });
      await sleep(Math.min(2000 * attempt, 4000));
    }
  }
  throw new Error('Financial production response failed after ' + attempts +
    ' bounded network attempts: ' + String(lastError instanceof Error ? lastError.message : lastError));
}
