// Editorial authority evidence signals for the production sitemap crawl.
// These are review diagnostics, not a declaration of factual verification.
const COMMERCIAL = /^(\/(?:shop|cart|checkout|search|account|privacy|terms)(?:\/|$))/;
const DYNAMIC_TOOLS = /(?:-calculator)(?:\/|$)/;
const OFFICIAL_HOSTS = /(^|\.)(?:gov|edu)$|(?:^|\.)tshaonline\.org$|(?:^|\.)uiltexas\.org$|(?:^|\.)nps\.gov$|(?:^|\.)tpwd\.texas\.gov$/;
const ENTITY = /&(amp|quot|apos|lt|gt|#39);/gi;
const decode = value => String(value ?? '').replace(ENTITY, (match, entity) => ({ amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', '#39': "'" }[entity.toLowerCase()] ?? match));
const strip = value => decode(String(value ?? '').replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
const attr = (tag, name) => decode(tag.match(new RegExp('\\b' + name + '\\s*=\\s*["\']([^"\']*)["\']', 'i'))?.[1] ?? '');
const familyFor = path => {
  if (/^\/texas-high-school-football-(?:teams|districts)\//.test(path)) return 'school-football';
  if (/^\/fishing\//.test(path)) return 'fishing';
  if (/^\/(?:events?|sports-venue)\//.test(path)) return path.startsWith('/sports-venue/') ? 'venue' : 'event';
  if (/^\/(?:county|city)\//.test(path)) return 'community';
  if (/^\/(?:destination|state-park|national-park)\//.test(path)) return 'destination';
  if (/^\/(?:explore|texas-icons)\//.test(path)) return 'explore';
  if (/^\/article\//.test(path)) return 'article';
  if (/^\/(?:property-tax|texas-data|texas-vs)\//.test(path)) return 'data-reference';
  if (/^\/(?:hunting|wildlife-species)\//.test(path)) return 'wildlife';
  return 'other';
};
const TOPIC_CHECKLIST = Object.freeze({
  'school-football': ['school identity and geographic location', 'UIL/TAPPS current classification and district', 'verified team history versus changing schedule/roster', 'county/city and other team links'],
  fishing: ['current TPWD species and regulation sources', 'public access and launch ownership', 'seasonal water/closure and fishing conditions', 'relevant lake/river/county crosslinks'],
  event: ['current organizer date and venue evidence', 'cancellation/rescheduling status', 'ticket and accessibility information appropriate to event', 'destination and nearby stay context'],
  venue: ['operator location/accessibility sources', 'event and parking information when relevant', 'verified visitor policies and access', 'event/city/county contextual links'],
  community: ['verified geographic and municipal or Census facts', 'meaningful historical and cultural specificity', 'official agencies and practical services', 'destinations, parks, neighbors and topical crosslinks'],
  destination: ['independently verified operator or land-manager sources', 'specific visitor questions and access', 'topic-appropriate amenities and accessibility', 'linked county, region, nearby places and related guides'],
  explore: ['clear definition and scope', 'distinctive researched topical substance', 'visitor decision help where relevant', 'credible outgoing and incoming contextual links'],
  article: ['original researched interpretation or useful reporting', 'claim-specific primary citations', 'author identity and actual review date', 'relevant supporting guides and destinations'],
  'data-reference': ['dated primary data and method', 'clear units, limitations and geography', 'downloadable or inspectable figures when appropriate', 'related reference/agency links'],
  wildlife: ['official species and rule references', 'geographic and seasonal qualifications', 'ethical and lawful field guidance', 'habitat and related destination links'],
  other: ['purposeful complete content', 'truthful source and trust context when factual', 'usable navigation and accessibility'],
});
const VOLATILE = new Set(['fishing', 'event', 'venue', 'school-football', 'data-reference', 'wildlife']);
export function auditAuthorityEvidence(url, html) {
  const { pathname } = new URL(url);
  const family = familyFor(pathname);
  const checklist = TOPIC_CHECKLIST[family];
  const optOut = COMMERCIAL.test(pathname) || DYNAMIC_TOOLS.test(pathname);
  const main = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? '';
  const scope = main || html;
  const mainText = strip(scope);
  const mainWords = (mainText.match(/[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*/g) || []).length;
  const links = [...scope.matchAll(/<a\b[^>]*>/gi)].map(match => attr(match[0], 'href')).filter(Boolean);
  const external = [...new Set(links.flatMap(link => {
    try { const u = new URL(link, url); return u.protocol === 'https:' && !['texasdefined.com','www.texasdefined.com'].includes(u.hostname) ? [u.hostname] : []; }
    catch { return []; }
  }))];
  const officialHosts = external.filter(host => OFFICIAL_HOSTS.test(host));
  // Candidates are discovery hints, NOT validated evidence for a factual claim.
  const officialEvidenceCandidates = [...new Set(links.flatMap(link => {
    try {
      const u = new URL(link, url);
      return u.protocol === 'https:' && OFFICIAL_HOSTS.test(u.hostname) ? [u.href] : [];
    } catch { return []; }
  }))].slice(0, 24);
  const internalPaths = [...new Set(links.filter(link => link.startsWith('/') && !link.startsWith('//')).map(link => link.split(/[?#]/)[0]))];
  const headingTags = [...scope.matchAll(/<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/gi)].map(x => strip(x[1]));
  const relevantImageAlts = [...scope.matchAll(/<img\b[^>]*>/gi)].map(match => attr(match[0], 'alt')).filter(alt => alt.length > 24);
  const visibleReviewDate = /\b(?:last verified|sources? checked|fact.checked|last reviewed|research verified)\b/i.test(mainText);
  const visibleAuthorship = /\b(?:by|written by|edited by)\s+[A-Z][\p{L}.' -]{3,}/iu.test(mainText);
  const visibleSourceSection = headingTags.some(heading => /^(?:sources|references|source transparency|sources and further reading|research sources|methodology|official sources)\b/i.test(heading));
  const reviewFlags = [];
  if (!optOut) {
    if (!main) reviewFlags.push('main-landmark-review');
    if (!external.length) reviewFlags.push('no-visible-external-evidence-links');
    if (!officialHosts.length) reviewFlags.push('no-identifiable-primary-source-host');
    if (!visibleSourceSection && ['article','data-reference','community'].includes(family)) reviewFlags.push('claim-source-transparency-review');
    if (internalPaths.filter(link => link !== pathname).length < 3) reviewFlags.push('contextual-internal-discovery-review');
    if (!visibleReviewDate && VOLATILE.has(family)) reviewFlags.push('time-sensitive-source-date-review');
    if (family === 'article' && !visibleAuthorship) reviewFlags.push('byline-visibility-review');
    if (!headingTags.length) reviewFlags.push('editorial-section-structure-review');
    if (!relevantImageAlts.length && ['destination','explore','article'].includes(family)) reviewFlags.push('subject-specific-image-review');
  }
  const priority = family === 'event' ? 1 : ['fishing','school-football','data-reference'].includes(family) ? 2 : ['destination','community','venue'].includes(family) ? 3 : 4;
  return {
    family, priority, mainWords, headings: headingTags.length,
    contextualInternalPaths: internalPaths,
    externalHosts: external.length, identifiablePrimarySourceHosts: officialHosts.length,
    officialEvidenceCandidates,
    internalLinkDestinations: internalPaths.length, meaningfulImageAlts: relevantImageAlts.length,
    visibleSourceSection, visibleReviewDate, visibleAuthorship,
    reviewFlags, reviewChecklist: checklist,
    editorialCertification: 'not-determined-by-automated-crawl',
  };
}
export const authorityFamilies = Object.keys(TOPIC_CHECKLIST);
