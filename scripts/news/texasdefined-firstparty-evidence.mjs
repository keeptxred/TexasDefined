/**
 * Bounded primary-publisher research before drafting. Never treats linked
 * pages as independent publishers or changes any source approval/score.
 * Fetches at most one HTTPS original .gov/.edu release plus three same-host
 * published evidence pages, with no redirects, private hosts or crawling.
 */
const MAX_ORIGINAL_HTML = 650_000;
const MAX_EVIDENCE_CHARS = 2_800;
const MAX_LINKED_PAGES = 3;

// Confirmed first-party links from TPWD's November 17 winter-trout release.
// This bounded fallback is used ONLY with that agency's exact original source
// and a substantial extracted source body. Every linked page must be fetched
// live, have an actual H1 + substantive body and pass the same-host HTTPS
// URL rules before it can be presented to the article drafter as evidence.
const TPWD_TROUT_FOLLOWUPS = Object.freeze([
  {url:'https://tpwd.texas.gov/fishboat/fish/management/stocking/trout_stocking.phtml',anchor:'Rainbow trout stocking schedule'},
  {url:'https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=1244',anchor:'Guadalupe River special fishing regulations'},
  {url:'https://tpwd.texas.gov/business/licenses/online_sales/',anchor:'Texas Parks and Wildlife fishing licenses'},
]);

function verifiedPublishedAgencyTopic(item, original) {
  return original.hostname === 'tpwd.texas.gov'
    && original.pathname === '/newsmedia/releases/'
    && /^20\d{6}[a-z]$/i.test(original.searchParams.get('req') || '')
    && String(item?.source || '') === 'Texas Parks & Wildlife'
    && /\brainbow trout\b/i.test(String(item?.title || ''))
    && /\bstock(?:ing)?\b/i.test(String(item?.title || ''))
    && /trout/i.test(String(item?.extracted_body || ''))
    && String(item?.extracted_body || '').length >= 2_200;
}

const KEYWORDS = /\b(?:trout|stocking|schedule|regulations?|licenses?|limits?|dates?|fees?|admission|access|closures?|visitors?|hours?|eligibility|program|rules|reserva(?:tion|tions)|safety|fishin(?:g)?|permits?|management)\b/i;
const NONCONTENT = /\.(?:pdf|jpe?g|png|gif|svg|zip|mp4|webp|ics)(?:$|[?])/i;
const NAV = /<\s*(?:script|style|nav|footer|header|form|noscript)\b[^>]*>[\s\S]*?<\/\s*(?:script|style|nav|footer|header|form|noscript)\s*>/gi;

function plain(value) {
  const entities = { amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',ndash:'–',mdash:'—',rsquo:'’',lsquo:'‘' };
  return String(value).replace(/&#x([0-9a-f]+);/gi, (_, n)=>String.fromCodePoint(parseInt(n,16)))
    .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(parseInt(n,10)))
    .replace(/&([a-z]+);/gi,(whole,k)=>entities[k.toLowerCase()]??whole)
    .replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
}
function officialUrl(raw, base, host=null) {
  try {
    const url=new URL(raw.replace(/&amp;/gi,'&'),base);
    const name=url.hostname.toLowerCase();
    if (url.protocol!=='https:' || url.username || url.password || url.port
      || !/\.(?:gov|edu)$/.test(name) || (host && name!==host)
      || url.hash || NONCONTENT.test(url.pathname)) return null;
    return url;
  } catch { return null; }
}
function h1Of(html) {
  const heading=String(html).match(/<h1\b[^>]*>([\s\S]{1,1200}?)<\/h1>/i);
  return heading ? plain(heading[1]) : '';
}
function readable(html) {
  let t=String(html).replace(NAV,' ');
  // Use the article/main body if the publisher provides one. Otherwise
  // start at H1 to avoid training on header navigation and cookie banners.
  const main=t.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (main) t=main[1];
  const h1=t.search(/<h1\b/i);
  if (h1>=0) t=t.slice(h1);
  t=t.replace(/<\/(?:h1|h2|h3|p|li|tr|section|article)>/gi,'\n');
  return plain(t).slice(0,MAX_EVIDENCE_CHARS);
}
async function htmlOf(url, fetcher) {
  try {
    const response=await fetcher(url.toString(), {
      headers:{'Accept':'text/html','User-Agent':'TexasDefined-Editorial-Evidence/1.0'},
      redirect:'manual',signal:AbortSignal.timeout(10_000),
    });
    if (!response.ok || !String(response.headers?.get('content-type')||'').toLowerCase().includes('text/html')
      || Number(response.headers?.get('content-length')||0)>MAX_ORIGINAL_HTML) return null;
    const html=await response.text();
    if (html.length>MAX_ORIGINAL_HTML) return null;
    return html;
  } catch { return null; }
}
function topicScore(anchor, url, titleTerms) {
  const text=plain(anchor);
  if (text.length<8 || text.length>170 || !KEYWORDS.test(text)) return -1;
  const terms=text.toLowerCase().split(/[^a-z]+/).filter(x=>x.length>=5);
  const matching=terms.filter(term=>titleTerms.has(term)).length;
  const semantic=KEYWORDS.test(new URL(url).pathname.replace(/[-_/]/g,' '))?2:0;
  return matching*3+semantic+1;
}
/**
 * Do not crawl, certify, or rewrite a source. The output is an optional
 * provenance-labeled set of facts for the independently guarded draft step.
 */
export async function collectFirstPartyEvidence(item,{fetcher=fetch}={}) {
  const original=officialUrl(String(item?.link||''),undefined);
  const none={kind:'primary-publisher-evidence',publisher:String(item?.source||''),sourceUrl:String(item?.link||''),records:[],attempted:0};
  if (!original) return none;
  const html=await htmlOf(original,fetcher);
  const titleTerms=new Set(String(item.title||'').toLowerCase().split(/[^a-z]+/).filter(x=>x.length>=5));
  const links=new Map();
  for(const m of (html || '').matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)){
    const target=officialUrl(m[1],original.toString(),original.hostname);
    if (!target || target.toString()===original.toString()) continue;
    const score=topicScore(m[2],target,titleTerms);
    if(score<2) continue;
    const key=target.toString();
    const existing=links.get(key);
    if(!existing || score>existing.score) links.set(key,{url:key,anchor:plain(m[2]),score});
  }
  // If the publisher's release temporarily times out or rate-limits the
  // HTML crawl, a verified primary text record can still request the exact
  // same-agency official pages previously linked in that specific bulletin.
  // URLs are NOT evidence until every candidate responds with real content.
  if (verifiedPublishedAgencyTopic(item,original)) {
    for (const row of TPWD_TROUT_FOLLOWUPS) {
      const target=officialUrl(row.url,original.toString(),original.hostname);
      if (!target) continue;
      const key=target.toString();
      if (!links.has(key)) links.set(key,{url:key,anchor:row.anchor,score:3});
    }
  }
  const selected=[...links.values()].sort((a,b)=>b.score-a.score||a.url.localeCompare(b.url)).slice(0,MAX_LINKED_PAGES);
  const results=await Promise.all(selected.map(async target=>{
    const html=await htmlOf(new URL(target.url),fetcher);
    if(!html) return null;
    const heading=h1Of(html);
    const body=readable(html);
    if(heading.length<8 || heading.length>160 || body.length<400) return null;
    // Original release mentions topic, but linked pages must still contain
    // meaningful official copy before the model may consume them.
    return {url:target.url,heading,anchor:target.anchor,excerpt:body};
  }));
  return {...none,records:results.filter(Boolean),attempted:selected.length};
}
