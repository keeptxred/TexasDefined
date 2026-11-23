// Require public, reader-visible Linden music context on the county guide and
// its two statewide discovery pages. Production acceptance is read-only.
export const lindenMusicOrigins = [
  'https://texasdefined.com',
  'https://texasdefined-site.freddy-coppola.workers.dev',
];
export const lindenMusicPages = {
  '/county/cass': [
    'Richard Bowden: from Linden bands to Pinkard',
    'Music City Texas Theater: a concert room with a local mission',
    'Music City Texas Theater and Texas venues',
    'Linden beyond the major music cities',
  ],
  '/texas-music-venues': [
    'Music City Texas Theater: a small-town stage in Linden',
    'American Legion Auditorium in Linden, Cass County',
    'Richard Bowden',
    'Texas Historical Commission',
  ],
  '/texas-music-cities': [
    'Why small music towns like Linden belong on the map',
    'Music Friendly Texas Certified Community',
    'Richard Bowden',
    'Music City Texas Theater',
  ],
};
const internalLinks = {
  '/county/cass': ['/texas-music-venues', '/texas-music-cities'],
  '/texas-music-venues': ['/county/cass', '/texas-icons/don-henley'],
  '/texas-music-cities': ['/county/cass', '/texas-music-venues'],
};
const site = 'https://texasdefined.com';

export function assertLindenMusicPage(html, path, url) {
  if (!Object.hasOwn(lindenMusicPages, path)) throw new Error('Unexpected page ' + path);
  if (!html.includes('<html') || !html.includes('<body'))
    throw new Error(url + ': missing server-rendered HTML');
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0].toLowerCase());
  if (meta.some((tag) => /name=["']robots["']/.test(tag) && /noindex/.test(tag)))
    throw new Error(url + ': music discovery page incorrectly noindexed');
  const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0])
    .filter((tag) => /rel=["']canonical["']/.test(tag));
  if (!canonicals.some((tag) => tag.includes('href="' + site + path + '"')))
    throw new Error(url + ': incorrect or missing music canonical for ' + path);
  const visible = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;|&#38;|&#x26;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
  for (const marker of lindenMusicPages[path]) {
    if (!visible.includes(marker))
      throw new Error(url + ': Linden music evidence missing in visible text: ' + marker);
  }
  for (const link of internalLinks[path]) {
    const escaped = link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp('href=["\\\']' + escaped + '(?:["\\\']|[?#])').test(html))
      throw new Error(url + ': missing reciprocal music navigation: ' + link);
  }
}

async function check(origin, path, fresh) {
  const url = new URL(path, origin);
  if (fresh) url.searchParams.set('__linden_music', String(Date.now()));
  const response = await fetch(url, {
    headers: { Accept: 'text/html', 'Cache-Control': 'no-cache', 'User-Agent': 'TexasDefined-Linden-Music-Acceptance/1.0' },
    signal: AbortSignal.timeout(20000),
  });
  if (response.status !== 200 || !(response.headers.get('content-type') || '').includes('text/html')
      || response.headers.get('cf-mitigated') === 'challenge')
    throw new Error(url + ': expected ordinary HTML 200, got ' + response.status);
  assertLindenMusicPage(await response.text(), path, String(url));
  console.log('PASS ' + url.origin + path + (fresh ? ' [cache-busted]' : ' [visitor URL]'));
}

if (process.argv[1]?.endsWith('/verify-linden-music-discovery-production.mjs')) {
  for (const origin of lindenMusicOrigins) {
    for (const path of Object.keys(lindenMusicPages)) {
      await check(origin, path, false);
      await check(origin, path, true);
    }
  }
  console.log('Linden music discovery production check PASS: two origins, three pages, normal and fresh');
}
