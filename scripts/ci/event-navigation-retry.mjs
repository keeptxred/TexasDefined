/** Distinguish rare recoverable edge/SSR responses from permanent page faults.
 * A successful retry still must pass every canonical, content and mobile assertion.
 * Never retry 4xx, redirects, 200, or attempts after the final budget.
 */
export const EVENT_NAV_ATTEMPTS = 3;
const TRANSIENT_SERVER_STATUSES = new Set([500, 502, 503, 504]);
export function shouldRetryEventNavigationStatus(status, attempt) {
  return Number.isInteger(status) && TRANSIENT_SERVER_STATUSES.has(status)
    && Number.isInteger(attempt) && attempt >= 1 && attempt < EVENT_NAV_ATTEMPTS;
}
