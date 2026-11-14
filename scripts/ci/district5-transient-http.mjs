/** Bounded network-only retries for live District 5 acceptance.
 * A real HTTP response is decisive; never retry status mismatches or missing SSR markers.
 * Accept injected fetch/sleep so the retry contract can be tested without network access.
 */
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';

const MAX_TRANSIENT_ATTEMPTS = 3;
const isTransientTransportError = (error) =>
  error?.name === 'TimeoutError' ||
  error?.name === 'AbortError' ||
  (error instanceof TypeError && /fetch failed|network|socket|timeout|terminated/i.test(error.message));

export async function fetchLiveDistrict5Html(url, origin, {
  fetchImpl = globalThis.fetch,
  sleep = delay,
  timeoutMs = 30_000,
  attempts = MAX_TRANSIENT_ATTEMPTS,
} = {}) {
  assert.ok(Number.isInteger(attempts) && attempts >= 1 && attempts <= MAX_TRANSIENT_ATTEMPTS,
    'Retry attempts must be bounded between 1 and 3');
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetchImpl(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          'user-agent': 'TexasDefined-District5-Production-Smoke/1.0',
          'cache-control': 'no-cache',
          'accept': 'text/html',
        },
      });
      assert.equal(response.status, 200, `${origin} returned ${response.status}`);
      return await response.text();
    } catch (error) {
      if (!isTransientTransportError(error)) throw error;
      if (attempt === attempts) {
        throw new Error(
          `${origin}: District 5 transient transport failed after ${attempt} attempt(s): ${error?.message ?? String(error)}`,
          { cause: error },
        );
      }
      console.warn(
        `::warning title=District 5 transient transport error::${origin} attempt ${attempt}/${attempts} failed (${error.name}); retrying the same URL.`,
      );
      await sleep(750 * attempt);
    }
  }
  throw new Error(`${origin}: unreachable transport retry state`);
}
