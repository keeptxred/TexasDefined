/**
 * Bounded post-deploy acceptance test for the horse-racing authority cluster.
 * Only invoked after an actual horse-racing code/content change; no site crawl,
 * screenshot farm, tag manager or third-party affiliate redirects.
 */
const origin = (process.env.TEXASDEFINED_BASE_URL || 'https://texasdefined.com').replace(/\/$/, '');
const token = [process.env.GITHUB_SHA || 'local', process.env.GITHUB_RUN_ID || 'run'].join('-');
const pages = [
  { path: '/horse-racing', title: 'Texas Horse Racing', text: ['Texas horse racing', 'Gillespie County Fairgrounds', 'Manor Downs', 'Texas Thoroughbred Association'], links: ['/horse-racing/calendar'] },
  { path: '/horse-racing/calendar', title: 'Texas Horse Racing Calendar', text: ['track comparison', 'Sam Houston Race Park', '2026-12-18', 'Retama Park'], links: ['/horse-racing'] },
  { path: '/horse-racing/gillespie-county-fairgrounds', title: 'Gillespie', text: ['Gillespie County Fairgrounds', '2027 race dates', 'data-stay-nearby-slot'], links: ['/horse-racing', '/county/gillespie'] },
  { path: '/horse-racing/manor-downs', title: 'Manor Downs', text: ['Manor Downs', 'Inactive historic', 'Travis County'], links: ['/horse-racing', '/county/travis'], forbid: ['data-stay-nearby-slot'] },
  { path: '/horse-racing/laredo-downs', title: 'Laredo Downs', text: ['Laredo Downs', 'Inactive historic'], links: ['/horse-racing', '/county/webb'], forbid: ['data-stay-nearby-slot'] },
  { path: '/horse-racing/valle-de-los-tesoros', title: 'Valle de los Tesoros', text: ['Valle de los Tesoros', 'Inactive historic'], links: ['/horse-racing', '/county/hidalgo'], forbid: ['data-stay-nearby-slot'] },
  { path: '/horse-racing/texas-racing-commission', title: 'Texas Racing Commission', text: ['Texas Racing Commission', '1801 Congress', 'GovernmentOrganization'], links: ['/horse-racing', '/county/travis'], forbid: ['data-stay-nearby-slot'] },
  { path: '/horse-racing/texas-thoroughbred-association', title: 'Texas Thoroughbred Association', text: ['Texas Thoroughbred Association', 'Buda', 'Accredited Texas-Bred'], links: ['/horse-racing', '/county/hays'], forbid: ['data-stay-nearby-slot'] },
  { path: '/horse-racing/texas-quarter-horse-association', title: 'Texas Quarter Horse Association', text: ['Texas Quarter Horse Association', 'Elgin', 'Accredited Texas-Bred'], links: ['/horse-racing', '/county/bastrop'], forbid: ['data-stay-nearby-slot'] },
  { path: '/horse-racing/texas-horsemens-partnership', title: 'Texas Horsemen', text: ["Texas Horsemen", 'Elgin', 'condition books'], links: ['/horse-racing', '/county/bastrop'], forbid: ['data-stay-nearby-slot'] },
];
const venueCanaries = [
  { path: '/sports-venue/lone-star-park', expected: 'Lone Star Park' },
  { path: '/sports-venue/sam-houston-race-park', expected: 'Sam Houston Race Park' },
  { path: '/sports-venue/retama-park', expected: 'Retama Park' },
];
const countyCanaries = ['/county/gillespie', '/county/travis', '/county/bastrop'];

function decode(value) {
  return value.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
}
function must(condition, error) {
  if (!condition) throw new Error(error);
}
async function get(path) {
  const url = new URL(path, origin);
  url.searchParams.set('td_horse_racing_verify', token);
  let last;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(url, {
        cache: 'no-store', redirect: 'follow',
        headers: { 'cache-control': 'no-cache', 'user-agent': 'TexasDefined-HorseRacing-Production-Check' },
        signal: AbortSignal.timeout(20000),
      });
      const html = decode(await response.text());
      if (response.status >= 500) throw new Error('HTTP ' + response.status);
      return { response, html };
    } catch (e) {
      last = e;
      if (attempt === 2) throw new Error(path + ': ' + (last?.message || String(last)));
    }
  }
}
function canonical(html) {
  const tags = [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)].map((match) => match[0]);
  must(tags.length === 1, 'Missing or repeated canonical link: ' + tags.length);
  return tags[0].match(/href=["']([^"']+)["']/i)?.[1];
}
async function checkPage(check) {
  const { response, html } = await get(check.path);
  must(response.status === 200 && response.headers.get('cf-mitigated') !== 'challenge', check.path + ': expected 200 got ' + response.status);
  must(/<html\b/i.test(html) && /<\/html>/i.test(html), check.path + ': invalid SSR document');
  must(canonical(html) === origin + check.path, check.path + ': canonical mismatch');
  must(/<title>[^<]+<\/title>/i.test(html), check.path + ': missing search title');
  must(html.toLowerCase().includes(check.title.toLowerCase()), check.path + ': missing title text');
  for (const text of check.text || []) must(html.toLowerCase().includes(text.toLowerCase()), check.path + ': missing marker ' + text);
  const hrefs = new Set([...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]));
  for (const path of check.links || []) must(hrefs.has(path), check.path + ': missing SSR link to ' + path);
  for (const bad of check.forbid || []) must(!html.includes(bad), check.path + ': inappropriate content ' + bad);
  if (check.path === '/horse-racing') must(!hrefs.has('/sports-venues/horse-racing'), 'Hub links to an unregistered category');
  console.log('PASS ' + check.path + ' (200, canonical, SEO and editorial/link checks)');
}
for (const page of pages) await checkPage(page);
for (const venue of venueCanaries) {
  const { response, html } = await get(venue.path);
  must(response.status === 200 && html.includes(venue.expected), venue.path + ': existing racetrack guide regression');
  must(canonical(html) === origin + venue.path, venue.path + ': existing canonical regression');
  console.log('PASS existing venue ' + venue.path);
}
for (const path of countyCanaries) {
  const { response, html } = await get(path);
  must(response.status === 200 && /<title>[^<]+<\/title>/.test(html), path + ': county authority regression');
  console.log('PASS county ' + path);
}
const retired = await get('/horse-racing/gulf-coast-racing');
must(retired.response.status === 404, 'Greyhound track was incorrectly exposed as a live horse-racing profile');
console.log('PASS greyhound classification guard: Gulf Coast Racing horse URL returns 404');
const asset = await get('/images/horse-racing/gillespie-2026-race-weekends.svg');
must(asset.response.status === 200 && asset.html.includes('<svg') && asset.html.includes('Gillespie'), 'Gillespie original graphic is unavailable');
console.log('PASS Gillespie editorial graphic asset');
console.log('PASS targeted horse-racing production cluster verification: 10 new pages, 3 existing tracks, 3 county pages, one negative guard and one graphic; no browser analytics executed.');
