/**
 * Explicit owner-reviewed dispositions for historical 404 examples.
 *
 * URLs here are *deliberately absent* until a separately reviewed replacement
 * page is ready. Never treat a 404 as an automatic Search Console violation.
 * The 16 serialized route-template paths are validated by the existing
 * public-route-token guard and NOT duplicated here.
 *
 * This is a frozen historical sample, not a global robots/noindex policy.
 */
export const INTENTIONAL_404_DISPOSITIONS = Object.freeze({
  // Neither Golden Rule Charter nor Pollok Central ISD had a verified 2026 UIL
  // varsity football program in the reviewed 2026–28 UIL realignment. These
  // football-only ISD routes must not fabricate programs or relocate them into
  // unrelated schools. Ordinary district profiles can be a separate project.
  '/texas-high-school-football-isds/golden-rule-charter-school': {
    reason: 'no-verified-uil-varsity-football',
    source: 'https://realignment.uiltexas.org/',
  },
  '/texas-high-school-football-isds/central-isd': {
    reason: 'no-verified-uil-varsity-football',
    source: 'https://www.uiltexas.org/files/alignments/Alpha_26-28.pdf',
  },
  // These are old merchandise collection slugs. No corresponding active
  // collection or exact successor was established during this GSC audit.
  // Do not 301 all three to /shop without verified product equivalence.
  '/shop/campfire-kitchen': {
    reason: 'retired-collection-no-verified-successor',
    source: 'internal-catalog-review-2026-11-13',
  },
  '/shop/smoke-and-salt': {
    reason: 'retired-collection-no-verified-successor',
    source: 'internal-catalog-review-2026-11-13',
  },
  '/shop/wildflower-house': {
    reason: 'retired-collection-no-verified-successor',
    source: 'internal-catalog-review-2026-11-13',
  },
  // These routes were imported as ordinary visitor attractions but operator
  // status does not support publishing a current, open-to-visitors park guide.
  // Return 404, not irreversible 410: availability can change.
  '/destination/fairfield-lake-state-park': {
    reason: 'operator-closed-to-public',
    source: 'https://tpwd.texas.gov/newsmedia/releases/?req=20230214b',
  },
  '/state-park/fairfield-lake-state-park': {
    reason: 'operator-closed-to-public',
    source: 'https://tpwd.texas.gov/newsmedia/releases/?req=20230214b',
  },
  '/destination/wyler-aerial-tramway-state-park': {
    reason: 'operator-guided-only-no-open-public-park',
    source: 'https://tpwd.texas.gov/state-parks/wyler-aerial-tramway',
  },
  '/state-park/wyler-aerial-tramway-state-park': {
    reason: 'operator-guided-only-no-open-public-park',
    source: 'https://tpwd.texas.gov/state-parks/wyler-aerial-tramway',
  },
  '/destination/chinati-mountains-state-natural-area': {
    reason: 'operator-not-yet-open',
    source: 'https://tpwd.texas.gov/state-parks/chinati-mountains',
  },
  '/attraction/chinati-mountains-state-natural-area': {
    reason: 'operator-not-yet-open',
    source: 'https://tpwd.texas.gov/state-parks/chinati-mountains',
  },
  // This composite slug refers to four administrative counties. There is no
  // single public county or county-office entity with this name. Redirecting
  // to Cameron alone would silently discard three independent jurisdictions.
  '/county/cameron-hidalgo-starr-and-willacy-counties': {
    reason: 'invalid-composite-county-entity',
    source: 'https://www.texascounties.net/',
  },
});

/** Explicitly restored genuine pages; all require HTTP 200 or an equivalent
 * working 301 with a final 200, never HTTP 404. Other unclassified URLs remain
 * in evidence and are never silently accepted by this list.
 */
export const RESTORE_REQUIRED_GSC_PATHS = Object.freeze(new Set([
  '/city/del-rio',
  '/destination/fort-leaton-state-historic-site',
  '/historic-site/fort-leaton-state-historic-site',
  '/destination/barton-warnock-environmental-educational-center-state-park',
  '/state-park/barton-warnock-environmental-educational-center-state-park',
  '/article/texas-oil-boom-history-spindletop-permian-basin',
  '/texas-high-school-football-isds/brookesmith-isd',
  '/texas-high-school-football-isds/morgan-isd',
  '/texas-high-school-football-isds/walnut-springs-isd',
  '/texas-high-school-football-isds/three-rivers-isd',
]));

/** Annotate rather than suppress unexpected HTTP outcomes. Source-backed
 * "intentional 404" is not permission to return HTTP 200 as a thin placeholder.
 */
export function reviewGsc404Disposition({ path, invalidTemplate, firstStatus, finalStatus, outcome, error }) {
  const policy = INTENTIONAL_404_DISPOSITIONS[path] ?? null;
  if (invalidTemplate) {
    return {
      intent: 'invalid-route-template',
      policyReason: 'literal-router-token-not-a-published-page',
      review: error ? 'transport-review' : firstStatus === 404 || firstStatus === 410 ? 'expected-404' : 'route-leak-regression',
    };
  }
  if (policy) {
    const expected = !error && (firstStatus === 404 || firstStatus === 410)
      && (finalStatus === 404 || finalStatus === 410);
    return { intent: 'intentional-404', policyReason: policy.reason, source: policy.source, review: expected ? 'expected-404' : 'policy-regression' };
  }
  if (RESTORE_REQUIRED_GSC_PATHS.has(path)) {
    const served = !error && finalStatus === 200;
    return { intent: 'restored-valuable-page', policyReason: 'published-authority-or-verified-equivalent', review: served ? 'served-200' : 'restore-regression' };
  }
  return { intent: 'unresolved-editorial-review', policyReason: null,
    review: error ? 'transport-review' : outcome === 'redirect_to_missing' ? 'redirect-to-missing' : (finalStatus === 404 || finalStatus === 410) ? 'editorial-disposition-needed' : 'observed-response' };
}
