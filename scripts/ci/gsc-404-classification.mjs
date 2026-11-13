/**
 * Classify observed HTTP responses to a historical Search Console 404 sample.
 * The source URL, not a guessed search-engine state, determines whether a
 * serialized TanStack parameter should be treated as a real visitor page.
 *
 * A 404/410 is NOT inherently a problem: unknown templates, retired resources,
 * and unapproved editorial pages may correctly return one. "Missing needs
 * disposition" means inspect source ownership, not manufacture a 301.
 */
export function classifyHistoricalGsc404({ invalidTemplate, firstStatus, finalStatus, error }) {
  if (error) return 'transport_or_chain_problem';
  const redirected = [301, 302, 303, 307, 308].includes(firstStatus);
  if (invalidTemplate) {
    if (firstStatus === 404 || firstStatus === 410) {
      return 'expected_invalid_template';
    }
    // Google must not be walked through a 307 normalizer to an encoded $slug.
    if (redirected) return 'invalid_template_redirect_chain';
    return 'invalid_template_unexpected_response';
  }
  if (finalStatus === 404 || finalStatus === 410) {
    return redirected ? 'redirect_to_missing' : 'missing_needs_disposition';
  }
  if (finalStatus === 200) return redirected ? 'redirected_to_200' : 'now_200';
  if (finalStatus != null && finalStatus >= 500) return 'server_error';
  return 'other_http_status';
}

export const REVIEW_OUTCOMES = Object.freeze(new Set([
  'redirect_to_missing',
  'missing_needs_disposition',
  'invalid_template_redirect_chain',
  'invalid_template_unexpected_response',
  'server_error',
  'transport_or_chain_problem',
  'other_http_status',
]));
