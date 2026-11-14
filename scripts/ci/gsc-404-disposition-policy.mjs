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
  '/article/texas-road-trip-rules',
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

/** Verified publication owners for restored historical URLs. A generic hub
 * HTTP200 is not a repaired authority route and must never pass certification.
 * Original data/redirect owners and SSR contracts: #7127, #7130, #7134, #7135.
 * This does not override any existing football Google-only noindex cohort.
 */
export const RESTORED_GSC_CANONICAL_PATHS = Object.freeze({
  '/article/texas-road-trip-rules': '/article/texas-road-trip-rules',
  '/city/del-rio': '/city/del-rio',
  '/destination/fort-leaton-state-historic-site': '/destination/fort-leaton-state-historic-site',
  '/historic-site/fort-leaton-state-historic-site': '/destination/fort-leaton-state-historic-site',
  '/destination/barton-warnock-environmental-educational-center-state-park': '/destination/big-bend-ranch-state-park',
  '/state-park/barton-warnock-environmental-educational-center-state-park': '/destination/big-bend-ranch-state-park',
  '/article/texas-oil-boom-history-spindletop-permian-basin': '/article/texas-oil-boom-wichita-falls-west-texas-rigs',
  '/texas-high-school-football-isds/brookesmith-isd': '/texas-high-school-football-isds/brookesmith-isd',
  '/texas-high-school-football-isds/morgan-isd': '/texas-high-school-football-isds/morgan-isd',
  '/texas-high-school-football-isds/walnut-springs-isd': '/texas-high-school-football-isds/walnut-springs-isd',
  '/texas-high-school-football-isds/three-rivers-isd': '/texas-high-school-football-isds/three-rivers-isd',
});


/** Frozen 60 exact live-verified public source/canonical outcomes from the complete
 * 2026-11-13 22:58 UTC 99-path read-only production run:
 * https://github.com/keeptxred/TexasDefined/actions/runs/43523411213
 * These were 54 working 301 aliases and six direct 200 pages. Prevent a later
 * catch-all homepage redirect or soft-404 canonical from posing as a repair.
 * An editorially authorized canonical change must update this exact ledger
 * and its accompanying tests, not silently weaken the verifier.
 */
export const LIVE_VERIFIED_GSC_CANONICAL_PATHS = Object.freeze({
  "/article/cameron-county-brownsville-harlingen-south-padre-rio-grande": "/county/cameron",
  "/article/texas-home-insurance-guide": "/article/texas-homeowners-insurance-guide",
  "/article/texas-hurricane-preparation-guide": "/article/texas-hurricane-preparation-homeowners-renters",
  "/attraction/dr-pepper-museum": "/destination/dr-pepper-museum-waco",
  "/attraction/hill-country-louise-merrick-unit-state-natural-area": "/destination/hill-country-state-natural-area",
  "/attraction/honey-creek-state-natural-area": "/destination/honey-creek-state-natural-area",
  "/destination/barrington-farm-site": "/destination/barrington-living-history-farm",
  "/destination/choke-canyon-north-shore-unit-state-park": "/destination/choke-canyon-state-park",
  "/destination/choke-canyon-south-shore-unit-state-park": "/destination/choke-canyon-state-park",
  "/destination/fort-richardson-state-park-state-historic-site": "/destination/fort-richardson-state-park-state-historic-site",
  "/destination/fredericksburg-texas-wineries-things-to-do-guide": "/article/fredericksburg-texas-wineries-things-to-do-guide",
  "/destination/goliad-state-park-state-historic-site": "/destination/goliad-state-park",
  "/destination/gorman-cave": "/destination/gorman-cave",
  "/destination/hill-country-louise-merrick-unit-state-natural-area": "/destination/hill-country-state-natural-area",
  "/destination/honey-creek-state-natural-area": "/destination/honey-creek-state-natural-area",
  "/destination/indian-lodge-state-park-lodge": "/destination/indian-lodge",
  "/destination/lake-somerville-birch-creek-unit-state-park": "/destination/lake-somerville-state-park",
  "/destination/lake-somerville-nails-creek-unit-state-park": "/destination/lake-somerville-state-park",
  "/destination/monument-hill-kreische-brewery-state-historic-site": "/destination/monument-hill",
  "/destination/ray-roberts-lake-isle-du-bois-unit-state-park": "/destination/ray-roberts-lake-state-park",
  "/destination/ray-roberts-lake-johnson-branch-unit-state-park": "/destination/ray-roberts-lake-state-park",
  "/destination/seminole-canyon-state-park-historic-site": "/destination/seminole-canyon-state-park",
  "/destination/texas-highway-16-hill-country": "/article/scenic-drives-in-texas",
  "/destination/washington-on-the-brazos-state-historic-site": "/destination/washington-on-the-brazos",
  "/destination/westcave-preserve": "/destination/westcave-preserve",
  "/destination/wonder-world-cave": "/destination/wonder-world-cave",
  "/event/state-fair-of-texas": "/texas-state-fair",
  "/historic-site/battleship-texas-state-historic-site": "/destination/battleship-texas",
  "/historic-site/fanthorp-inn-state-historic-site": "/destination/fanthorp-inn",
  "/historic-site/fort-richardson-state-park-state-historic-site": "/destination/fort-richardson-state-park-state-historic-site",
  "/historic-site/goliad-state-park-state-historic-site": "/destination/goliad-state-park",
  "/historic-site/monument-hill-kreische-brewery-state-historic-site": "/destination/monument-hill",
  "/historic-site/san-jacinto-monument-state-historic-site": "/destination/san-jacinto-battleground",
  "/historic-site/washington-on-the-brazos-state-historic-site": "/destination/washington-on-the-brazos",
  "/museum/barrington-farm-site": "/destination/barrington-living-history-farm",
  "/news/audie-murphy-texas-war-hero-actor": "/article/audie-murphy-texas-war-hero-actor",
  "/news/blue-bell-ice-cream-brenham-texas-history": "/article/blue-bell-ice-cream-brenham-texas-history",
  "/news/bucees-texas-road-trip-history": "/article/bucees-texas-road-trip-history",
  "/news/chester-nimitz-texas-fleet-admiral": "/article/chester-nimitz-texas-fleet-admiral",
  "/news/davy-crockett-texas-alamo-legend": "/article/davy-crockett-texas-alamo-legend",
  "/news/dr-pepper-waco-texas-history": "/dr-pepper-texas-history",
  "/news/fort-worth-stockyards-history-cattle-culture": "/article/fort-worth-stockyards-history-cattle-culture",
  "/news/james-bowie-texas-alamo-life-legend": "/article/james-bowie-texas-alamo-life-legend",
  "/news/juan-seguin-tejano-texas-revolution": "/article/juan-seguin-tejano-texas-revolution",
  "/news/mirabeau-b-lamar-president-republic-texas": "/article/mirabeau-b-lamar-president-republic-texas",
  "/news/san-antonio-spurs-texas-basketball-culture": "/article/san-antonio-spurs-texas-basketball-culture",
  "/news/san-antonio-stock-show-rodeo-history-guide": "/article/san-antonio-stock-show-rodeo-history-guide",
  "/news/stephen-f-austin-father-of-texas": "/article/stephen-f-austin-father-of-texas",
  "/news/texas-oil-boom-wichita-falls-west-texas-rigs": "/article/texas-oil-boom-wichita-falls-west-texas-rigs",
  "/news/william-barret-travis-alamo-commander": "/article/william-barret-travis-alamo-commander",
  "/state-park/caprock-canyons-trailway-estelline-terminal-state-park": "/destination/caprock-canyons-state-park",
  "/state-park/indian-lodge-state-park-lodge": "/destination/indian-lodge",
  "/state-park/lake-somerville-birch-creek-unit-state-park": "/destination/lake-somerville-state-park",
  "/state-park/lake-somerville-nails-creek-unit-state-park": "/destination/lake-somerville-state-park",
  "/state-park/lake-somerville-trailway-newman-bottom-th-state-park": "/destination/lake-somerville-state-park",
  "/state-park/port-isabel-lighthouse-state-park": "/destination/port-isabel-lighthouse",
  "/state-park/ray-roberts-lake-isle-du-bois-unit-state-park": "/destination/ray-roberts-lake-state-park",
  "/state-park/ray-roberts-lake-johnson-branch-unit-state-park": "/destination/ray-roberts-lake-state-park",
  "/texas-icons/shaquille-oneal": "/texas-icons/shaquille-oneal",
  "/things-unique-to-texas_/methodology": "/things-unique-to-texas/methodology",
});

function isExactRestoredCanonical(urlValue, expectedPath) {
  if (!urlValue || !expectedPath) return false;
  try {
    const url = new URL(urlValue);
    return url.protocol === 'https:' && url.host === 'texasdefined.com'
      && url.pathname === expectedPath && !url.search && !url.hash;
  } catch {
    return false;
  }
}

/** Annotate rather than suppress unexpected HTTP outcomes. Source-backed
 * "intentional 404" is not permission to return HTTP 200 as a thin placeholder.
 */
export function reviewGsc404Disposition({ path, invalidTemplate, firstStatus, finalStatus, finalUrl, canonical, outcome, error }) {
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
    const expected = RESTORED_GSC_CANONICAL_PATHS[path];
    const served = !error && finalStatus === 200
      && isExactRestoredCanonical(finalUrl, expected)
      && isExactRestoredCanonical(canonical, expected);
    return { intent: 'restored-valuable-page', policyReason: 'published-authority-or-verified-equivalent', review: served ? 'served-200' : 'restore-regression' };
  }
  if (Object.hasOwn(LIVE_VERIFIED_GSC_CANONICAL_PATHS, path)) {
    const expected = LIVE_VERIFIED_GSC_CANONICAL_PATHS[path];
    const served = !error && finalStatus === 200
      && isExactRestoredCanonical(finalUrl, expected)
      && isExactRestoredCanonical(canonical, expected);
    return {
      intent: 'previously-verified-published-authority',
      policyReason: '2026-11-13-exact-source-and-canonical-verification',
      source: 'https://github.com/keeptxred/TexasDefined/actions/runs/43523411213',
      review: served ? 'served-200' : 'canonical-regression',
    };
  }
  return { intent: 'unresolved-editorial-review', policyReason: null,
    review: error ? 'transport-review' : outcome === 'redirect_to_missing' ? 'redirect-to-missing' : (finalStatus === 404 || finalStatus === 410) ? 'editorial-disposition-needed' : 'observed-response' };
}
