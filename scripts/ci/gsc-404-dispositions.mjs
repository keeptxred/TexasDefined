/**
 * Human-reviewed disposition, not a blanket "fix all 404" rule.
 * Source: November 13, 2026 GSC 99-URL owner sample and verified 2026
 * UIL/TEA publication rules, live visitor closure status and shop inventory.
 * A valid 404 is not a failure of Google's policies. A real published page
 * resolving to a broken redirect target is a genuine defect.
 *
 * These decisions are scoped ONLY to the immutable sample inventory. Adding
 * another URL requires separate research, not an inferred blanket redirect.
 */
export const INTENTIONAL_MISSING = Object.freeze({
  '/texas-icons/shaquille-oneal': 'Texas Icons profile is research-staged, not publication-certified: do not fabricate an athlete biography',
  '/texas-high-school-football-isds/golden-rule-charter-school': 'No approved current UIL 2026 football team/ISD record: refuse fabricated school program',
  '/texas-high-school-football-isds/central-isd': 'Pollok Central has no 2026 UIL varsity football alignment: a basketball campus is not a football ISD',
  '/shop/campfire-kitchen': 'Retired unpublished shop collection; no supported current product catalog or equivalent sales page',
  '/shop/smoke-and-salt': 'Retired unpublished shop collection; no supported current product catalog or equivalent sales page',
  '/shop/wildflower-house': 'Retired unpublished shop collection; no supported current product catalog or equivalent sales page',
  '/county/cameron-hidalgo-starr-and-willacy-counties': 'Invalid compound-county entity, not a county or permissible canonical county profile',
  '/destination/chinati-mountains-state-natural-area': 'TPWD says park is not yet open to public; no approved visitor authority page',
  '/attraction/chinati-mountains-state-natural-area': 'Historical attraction duplicate of TPWD never-open public site; direct 404, not redirect to missing',
  '/destination/fairfield-lake-state-park': 'TPWD visitor park closed after lease ended; refuse stale open-park itinerary',
  '/state-park/fairfield-lake-state-park': 'Historical closed state-park import; direct 404, not a 301-to-missing chain',
  '/destination/wyler-aerial-tramway-state-park': 'TPWD tramway and grounds not open for ordinary unscheduled visits',
  '/state-park/wyler-aerial-tramway-state-park': 'Historical unavailable tramway import; direct 404 avoids false available-visit guidance',
});

function templatePath(path) {
  let v=path;
  for(let i=0;i<3;i++) {
    try {
      const next=decodeURIComponent(v);
      if(next===v)break;
      v=next;
    } catch { return true; }
  }
  return v.split('/').some(segment => segment.startsWith('$') || /^\{[-+]?\$[^}]+\}$/.test(segment));
}

/** Expected HTTP behavior for one of 99 pre-reviewed historical source URLs.
 * 'recover' means publish the valuable ORIGINAL authority page or 301 to a
 * source-verified exact equivalent; it does NOT assert the URL is indexed.
 */
export function expectedGscDisposition(path) {
  if(templatePath(path)) return { expected:'direct-missing', category:'invalid-router-template',
    reason:'Serialized TanStack route pattern, not an actual address or content page' };
  if(Object.hasOwn(INTENTIONAL_MISSING,path))return { expected:'direct-missing',
    category:'deliberate-unpublished-or-closed', reason:INTENTIONAL_MISSING[path] };
  return { expected:'recover-to-200',category:'legitimate-content-or-equivalent',
    reason:'Historic content/park alias must lead to a verified complete page with self-canonical' };
}

function canonicalEquivalent(finalUrl, canonical) {
  if(!finalUrl || !canonical) return false;
  try {
    const a=new URL(finalUrl), b=new URL(canonical,a);
    const trim=p=>p.length>1?p.replace(/\/+$/,''):p;
    return a.hostname.toLowerCase()===b.hostname.toLowerCase()
      && a.protocol==='https:' && b.protocol==='https:'
      && trim(a.pathname)===trim(b.pathname)
      && !b.search && !b.hash;
  }catch{return false;}
}

/** Do not mistake transport failures for HTTP404 or Google recrawl evidence. */
export function verifyGscExpectedResponse(row) {
  const intent=expectedGscDisposition(row.path);
  const evidence={...intent,path:row.path,observedOutcome:row.outcome,
    firstStatus:row.firstStatus,finalStatus:row.finalStatus,finalUrl:row.finalUrl,
    canonical:row.canonical,robots:row.robots};
  if(row.error) return {...evidence,pass:false,code:'HTTP_NOT_OBSERVED',detail:row.error};
  if(intent.expected==='direct-missing'){
    const ok=[404,410].includes(row.firstStatus) && row.firstStatus===row.finalStatus
      && row.redirectCount===0;
    return {...evidence,pass:ok,code:ok?'EXPECTED_DIRECT_404':'MISSING_ROUTE_NOT_DIRECT',
      detail:ok?'Intentional 404/410 is the correct outcome':'Invalid page must not redirect, return 200 or render a template'};
  }
  if(row.finalStatus!==200)return {...evidence,pass:false,code:'RECOVERY_NOT_HTTP_200',
    detail:'Valuable source URL still fails or ends at a missing destination'};
  if(!canonicalEquivalent(row.finalUrl,row.canonical))return {...evidence,pass:false,
    code:'CANONICAL_NOT_SELF',detail:'HTTP200 requires an absolute, self-consistent HTTPS canonical at the final content URL'};
  const redirects=[301,302,303,307,308].includes(row.firstStatus);
  if(redirects && row.firstStatus!==301 && row.firstStatus!==308)return {...evidence,pass:false,
    code:'TEMPORARY_LEGACY_REDIRECT',detail:'The retiring source needs a permanent 301/308, not a temporary or encoded-template redirect'};
  return {...evidence,pass:true,code:redirects?'VERIFIED_PERMANENT_EQUIVALENT':'VERIFIED_RESTORED_PAGE',
    detail:'Live HTTP route and final self-canonical observed; Google recrawl/indexing not inferred'};
}
