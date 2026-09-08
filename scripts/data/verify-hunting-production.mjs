const origin = (process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const userAgent = 'TexasDefined-Hunting-Production-Smoke/2.3';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const representativeTopics = [
  {
    path: '/hunting/public-hunting',
    needles: ['Where Can You Hunt on Public Land in Texas?', 'TPWD season source', 'Texas Parks and Wildlife', 'Current official sources'],
  },
  {
    path: '/hunting/texas-hunting-license',
    needles: ['Texas Hunting License Guide', 'TPWD season source', 'Texas Parks and Wildlife', 'Current official sources'],
  },
  {
    path: '/hunting/texas-deer-hunting',
    needles: ['Texas White-Tailed Deer Hunting Guide', 'TPWD season source', 'Texas Parks and Wildlife', 'Current official sources'],
  },
  {
    path: '/hunting/youth-hunting',
    needles: ['Texas Youth Hunting Guide: 2026–27 Youth-Only Seasons & Requirements', 'TPWD season source', 'Current official sources'],
  },
  {
    path: '/hunting/squirrel-hunting',
    needles: ['Texas Squirrel Hunting Guide', 'TPWD season source', 'Current official sources'],
  },
  {
    path: '/hunting/migratory-game-birds',
    needles: ['Texas Migratory Game Bird Hunting Guide', 'TPWD season source', 'Current official sources'],
  },
  {
    path: '/hunting/alligator-hunting',
    needles: ['Texas Alligator Hunting Guide', 'private property', 'TPWD season source', 'Current official sources'],
  },
  {
    path: '/hunting/trapping-furbearers',
    needles: ['Texas Trapping & Fur-Bearer Guide', 'commercial harvest for sale', 'TPWD season source', 'Current official sources'],
  },
];

const sitemapPaths = [
  '/hunting',
  ...representativeTopics.map(({ path }) => path),
  '/hunting/rabbit-hare-hunting',
  '/hunting/pheasant-hunting',
  '/hunting/chachalaca-hunting',
  '/hunting/pronghorn-hunting',
  '/hunting/goose-hunting',
  '/hunting/teal-hunting',
  '/hunting/sandhill-crane-hunting',
  '/hunting/other-migratory-game-birds',
];

function assertNulsOnlyInsideScripts(text, pathname) {
  let index = text.indexOf('\0');
  let count = 0;
  while (index !== -1) {
    count += 1;
    const scriptStart = text.lastIndexOf('<script', index);
    const scriptEndBefore = text.lastIndexOf('</script>', index);
    const scriptEndAfter = text.indexOf('</script>', index);
    if (scriptStart === -1 || scriptStart < scriptEndBefore || scriptEndAfter === -1) {
      throw new Error(`${pathname} contains a NUL byte outside a script block at decoded offset ${index}`);
    }
    index = text.indexOf('\0', index + 1);
  }
  return count;
}

function normalizeHtmlForAssertions(text) {
  return text.replaceAll('\0', '').replaceAll('<!-- -->', '');
}

async function fetchText(pathname) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(`${origin}${pathname}`, {
        headers: {
          'user-agent': userAgent,
          accept: pathname.endsWith('.xml') ? 'application/xml,text/xml;q=0.9,*/*;q=0.8' : 'text/html,*/*;q=0.8',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) throw new Error(`${pathname} returned ${response.status}`);

      const contentType = response.headers.get('content-type') ?? '';
      const text = await response.text();

      if (pathname.endsWith('.xml')) {
        if (!contentType.includes('xml')) throw new Error(`${pathname} returned unexpected content type ${contentType || '(missing)'}`);
        if (!text.includes('<?xml') && !text.includes('<urlset')) throw new Error(`${pathname} did not decode as XML`);
        return text;
      }

      if (!contentType.toLowerCase().includes('text/html')) throw new Error(`${pathname} returned unexpected content type ${contentType || '(missing)'}`);
      if (!text.trimStart().startsWith('<!DOCTYPE html>')) throw new Error(`${pathname} did not decode as an HTML document`);

      const nulCount = assertNulsOnlyInsideScripts(text, pathname);
      if (nulCount) console.log(`${pathname}: normalized ${nulCount} framework serialization NUL delimiter(s) contained inside script blocks.`);
      return normalizeHtmlForAssertions(text);
    } catch (error) {
      lastError = error;
      if (attempt < 4) await sleep(5_000);
    }
  }
  throw lastError instanceof Error ? lastError : new Error(`Failed to fetch ${pathname}`);
}

function requireText(body, needle, label) {
  if (!body.includes(needle)) throw new Error(`${label} missing expected content: ${needle}`);
}

async function verify() {
  const [hub, sitemap, ...topicBodies] = await Promise.all([
    fetchText('/hunting'),
    fetchText('/sitemap.xml'),
    ...representativeTopics.map(({ path }) => fetchText(path)),
  ]);

  requireText(hub, 'Hunting Texas: licenses, public land, species and season planning', 'Hunting hub');
  requireText(hub, 'Texas Parks and Wildlife', 'Hunting hub');
  requireText(hub, 'TPWD 2026–27', 'Hunting hub');
  requireText(hub, 'not the legal authority', 'Hunting hub');
  requireText(hub, 'More Texas game & small-game coverage', 'Hunting v2 hub');
  requireText(hub, 'Migratory game bird depth', 'Hunting v2 hub');
  requireText(hub, 'Fur-bearing animals & trapping', 'Hunting v2 hub');
  requireText(hub, 'Texas Squirrel Hunting Guide', 'Hunting v2 hub');
  requireText(hub, 'Texas Trapping & Fur-Bearer Guide', 'Hunting v2 hub');

  representativeTopics.forEach((topic, index) => {
    const body = topicBodies[index];
    for (const needle of topic.needles) requireText(body, needle, topic.path);
  });

  for (const path of sitemapPaths) requireText(sitemap, `${origin}${path}`, 'Production sitemap');

  console.log(`Hunting production verified: live UTF-8 HTML, framework NUL delimiters confined to script serialization, React hydration comments normalized for source-text assertions, TPWD 2026–27 freshness, ${representativeTopics.length} representative topic pages including v2 coverage, and ${sitemapPaths.length} hunting sitemap URLs are present.`);
}

try {
  await verify();
} catch (error) {
  console.error('Hunting production verification failed.');
  console.error(error instanceof Error ? error.stack : error);
  process.exit(1);
}
