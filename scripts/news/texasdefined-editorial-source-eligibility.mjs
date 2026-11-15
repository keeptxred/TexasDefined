/**
 * Cheap, deterministic guard for feed items that are discovery pointers,
 * web housekeeping pages or transient score tickers rather than a substantive
 * original lifestyle report. Applies before ANY optional source fetch/AI spend.
 */
export function isTexasDefinedDirectEditorialSource(item) {
  const title = String(item?.title ?? '').trim();
  const link = String(item?.link ?? '').trim();
  if (!title || !link) return false;
  let parsed;
  try {
    parsed = new URL(link);
  } catch {
    return false;
  }
  if (!['https:', 'http:'].includes(parsed.protocol)) return false;
  const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
  if (hostname === 'news.google.com') return false;
  if ((hostname === 'lrl.state.tx.us' || hostname === 'lrl.texas.gov')
    && (parsed.pathname.toLowerCase() === '/cl.cfm'
      || parsed.pathname.toLowerCase().startsWith('/currentissues/clips/'))) return false;
  const normalizedTitle = title.toLowerCase();
  // A routing fault in the shared KTR/TD feed must never become a live
  // TexasDefined article merely because its source was scored AUTO_PUBLISH.
  // This last-mile guard intentionally checks the HEADLINE, not publisher
  // branding or broad descriptions that mention government in passing.
  const publicAffairsTitle =
    /\b(?:district attorney|county attorney|attorney general|prosecutor|\bda\b)\b.{0,110}\b(?:recus|criminal case|indict|charg|fraud|investigat|lawsuit|corrupt)/i.test(normalizedTitle)
    || /\b(?:sentenced|indicted|charged|pleads? guilty|arrested|fbi raid|fbi searches|wire fraud|ponzi scheme|investor fraud)\b/i.test(normalizedTitle)
    || /\b(?:city council|county commissioners?|texas legislature|school board|\bmetro\b)\s+(?:approv|vote|adopt|propos|reject|pass|authoriz|consider)/i.test(normalizedTitle)
    || /\b(?:houston|dallas|austin|san antonio|el paso|fort worth|arlington|lubbock)\s+(?:considers?|approves?|adopts?|passes?|proposes?)\s+(?:new\s+)?(?:restrictions?|ordinance|zoning|ban|budget|tax|regulation)/i.test(normalizedTitle);
  // Land disposition involving a private launch operator is public-policy
  // reporting, not a park/visitor article—even if a shared-feed classifier
  // placed it in the TexasDefined Explore category. Match either headline
  // order and leave launches, public beach access and parks guides alone.
  const operator = /\b(?:spacex|starbase|boca chica)\b/;
  const landDeal = /\b(?:public parkland|public park land|public land|state park land|parkland sale|park land sale|parkland purchase)\b/;
  const landTransactionVerb = /\b(?:sale|sell|selling|buy|buying|bought|purchase|purchas\w*|lease|leas\w*|acquir\w*|eyeing|eyes|consider\w*|pause|deal|trade|transfer\w*)\b/;
  const spaceLandDisposition = operator.test(normalizedTitle)
    && landDeal.test(normalizedTitle)
    && landTransactionVerb.test(normalizedTitle);
  if (publicAffairsTitle || spaceLandDisposition) return false;
  // Crime reports and fatal house-fire investigations are public safety,
  // not TexasDefined sports, parks or travel editorial. Require actual crime
  // or fire terms to avoid sports uses of "shot", "shootout" or "killed".
  const localVictimCrime = /\b(?:shot|shooting|stabbed|stabbing)\b/.test(normalizedTitle)
    && /\b(?:robbed|robbery|murder|police|suspect)\b/.test(normalizedTitle);
  const fatalBuildingFire = /\b(?:killed|dead|died|deaths?|fatal)\b/.test(normalizedTitle)
    && /\b(?:house fire|apartment fire|residential fire)\b/.test(normalizedTitle)
    && /\b(?:fire officials?|fire department|firefighters?|police|investigation|irving|dallas)\b/.test(normalizedTitle);
  if (localVictimCrime || fatalBuildingFire) return false;

  // Such items should not be expanded into 750-word "original reporting".
  if (/\b(?:privacy policy|cookie policy|terms of (?:use|service)|accessibility statement|user agreement)\b/.test(normalizedTitle)) return false;
  if (/\b(?:live (?:updates?|scores?|blog)|scores? and schedule|scoreboard|up[- ]to[- ]the[- ]minute scores?|week\s*\d+ live scores?)\b/.test(normalizedTitle)) return false;
  if (/\b(?:hsfb playoff pairings|playoff pairings|day trips? & beyond:.*events roundup|events roundup|score roundup)\b/.test(normalizedTitle)) return false;
  return true;
}
