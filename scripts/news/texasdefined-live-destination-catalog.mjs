import { readFileSync } from 'node:fs';

/**
 * Fishing links are rendered by the published news article component using
 * the same COMPLETE_FISHING_* slug lists. Never infer a fishing route merely
 * from a plausible-looking slug. Only indexable sitemap URLs AND editorially
 * complete allowlisted routes can be linked from generated articles.
 */
const fishingSource = readFileSync(new URL('../../src/data/fishing/slugs.ts', import.meta.url), 'utf8');
function approvedFishingSlugs(constantNames) {
  const values = new Set();
  for (const constantName of constantNames) {
    const match = fishingSource.match(new RegExp('(?:export\\s+)?const\\s+' + constantName + '\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const;'));
    if (!match) throw new Error('Missing source-of-truth verified fishing inventory: ' + constantName);
    for (const slug of match[1].matchAll(/"([a-z0-9]+(?:-[a-z0-9]+)*)"/g)) values.add(slug[1]);
  }
  if (values.size < constantNames.length) throw new Error('Incomplete fishing route verification inventory.');
  return values;
}
const fishingLakes = approvedFishingSlugs([
  'BASE_COMPLETE_FISHING_LAKE_SLUGS',
  'WAVE2_COMPLETE_FISHING_LAKE_SLUGS',
  'STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS',
]);
const fishingSpecies = approvedFishingSlugs(['COMPLETE_FISHING_SPECIES_SLUGS']);

/**
 * The historical Supabase explore_entities table may be empty while the
 * magazine has real, indexable, authority-reviewed /destination routes.
 * A canonical sitemap GET (not a crawl of every page) is the source of truth.
 */
const STOP = new Set(['the','a','an','and','for','with','from','texas','state','park','parks','museum',
  'lake','lakes','site','center','centre','area','historic','national','county','city','of','at','in',
  'new','old','river','rivers','trail','trails','visitor','visitors','on','to','this','that']);
function tokens(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g,' ').split(/\s+/).filter(Boolean);
}
function meaningful(value) { return tokens(value).filter(word => word.length >= 4 && !STOP.has(word)); }
function pathFromLoc(url, expectedOrigin) {
  try {
    const p = new URL(url.replace(/&amp;/g,'&'));
    if (p.origin !== expectedOrigin || p.search || p.hash) return null;
    const match = p.pathname.match(/^\/destination\/([a-z0-9-]+)\/?$/);
    if (match) return match[1];
    const lake = p.pathname.match(/^\/fishing\/lakes\/([a-z0-9-]+)\/?$/);
    if (lake && fishingLakes.has(lake[1])) return lake[1];
    const species = p.pathname.match(/^\/fishing\/species\/([a-z0-9-]+)\/?$/);
    if (species && fishingSpecies.has(species[1])) return species[1];
    return null;
  } catch { return null; }
}
export function publishedDestinationSlugs(sitemap, siteOrigin='https://texasdefined.com') {
  if (!/^\s*<\?xml\b/i.test(String(sitemap || ''))
      || !/<urlset\b/i.test(sitemap)) throw new Error('Canonical destination sitemap is not a valid URL set.');
  const urls = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)];
  const origins = new Set();
  for (const m of urls) { try { origins.add(new URL(m[1].trim()).origin); } catch {} }
  if (urls.length < 10 || !origins.has(siteOrigin)) throw new Error('Sitemap returned an implausible or wrong-domain URL inventory.');
  return [...new Set(urls.map(x => pathFromLoc(x[1].trim(),siteOrigin)).filter(Boolean))];
}
/** Never attach unrelated SEO links merely to reach a numeric link quota. */
export function relevantDestinationRows(source, slugs, cap=24) {
  const text = ' '+[source?.title,source?.description,source?.extracted_body].join(' ')
    .toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim()+' ';
  const wordBag = new Set(tokens(text));
  return [...new Set(slugs)].map(slug => {
    const label = slug.replace(/-/g,' ');
    const anchors = meaningful(label);
    if (!anchors.length) return null;
    const exact = text.includes(' '+label+' ');
    const complete = anchors.every(part => wordBag.has(part));
    const overlap = anchors.reduce((n,part)=>n+(wordBag.has(part)?1:0),0);
    const score = exact ? 40 + anchors.length : complete && anchors.length >= 2 ? 20 + overlap : 0;
    return score > 0 ? {slug,name:label.replace(/\b\w/g,c=>c.toUpperCase()),summary:'Only use independently verified details about this actual destination.',region:'',score} : null;
  }).filter(Boolean).sort((a,b)=>b.score-a.score||a.slug.localeCompare(b.slug)).slice(0,cap)
    .map(({score,...row})=>row);
}
export async function liveDestinationSlugs(siteUrl='https://texasdefined.com', requester=fetch) {
  const response = await requester(siteUrl + '/sitemap.xml', { signal: AbortSignal.timeout(20_000), headers: { Accept: 'application/xml, text/xml;q=0.9' } });
  if (!response.ok) throw new Error('Published sitemap unavailable; refuse to invent internal links');
  const sitemap = await response.text();
  if (sitemap.length > 12_000_000) throw new Error('Published sitemap too large for bounded discovery.');
  const live = publishedDestinationSlugs(sitemap,new URL(siteUrl).origin);
  if (live.length < 2) throw new Error('Published sitemap contains too few vetted destination pages.');
  return live;
}
export async function liveRelevantDestinations(source, siteUrl='https://texasdefined.com', requester=fetch) {
  return relevantDestinationRows(source,await liveDestinationSlugs(siteUrl,requester));
}
