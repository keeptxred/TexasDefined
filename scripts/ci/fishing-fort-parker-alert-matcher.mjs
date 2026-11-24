/**
 * Fort Parker access alerts must retain both the dated Navasota River ramp
 * restriction and the independently closed fishing piers. A source miss is
 * review-needed, NEVER evidence of reopening.
 * Evidence: https://tpwd.texas.gov/state-parks/fort-parker/alert
 */
export function matchesFortParkerAlertText(text) {
  return /\bNavasota River boat ramp\b/i.test(text)
    && /\bclosed from Oct\.?\s*19,\s*2026 to Jan\.?\s*10,\s*2027\b/i.test(text)
    && /\bBoth fishing piers are closed\b/i.test(text);
}
