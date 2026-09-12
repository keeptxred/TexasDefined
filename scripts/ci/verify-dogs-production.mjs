const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const userAgent = 'TexasDefined-Dogs-Production-Smoke/1.0';

const breeds = [
  'labrador-retriever',
  'golden-retriever',
  'dachshund',
  'french-bulldog',
  'german-shepherd',
  'australian-shepherd',
  'pembroke-welsh-corgi',
  'beagle',
  'boxer',
  'chihuahua',
  'great-dane',
  'yorkshire-terrier',
];

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&');
}

function parseAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attributes;
}

function requireNeedle(body, needle, label) {
  if (!body.includes(needle)) throw new Error(`${label} missing expected content: ${needle}`);
}

function requireExact(actual, expected, label) {
  if (actual !== expected) throw new Error(`${label} mismatch: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`);
}

function verifyHead(html, { title, description, canonical }, label) {
  const titleMatch = html.match(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/i);
  if (!titleMatch) throw new Error(`${label} is missing an SSR <title>`);
  requireExact(decodeHtml(titleMatch[1]).trim(), title, `${label} title`);

  const descriptionTag = (html.match(/<meta\b[^>]*>/gi) ?? [])
    .map((tag) => parseAttributes(tag))
    .find((attributes) => attributes.name?.toLowerCase() === 'description');
  if (!descriptionTag) throw new Error(`${label} is missing an SSR meta description`);
  requireExact(descriptionTag.content ?? '', description, `${label} meta description`);

  const canonicalTag = (html.match(/<link\b[^>]*>/gi) ?? [])
    .map((tag) => parseAttributes(tag))
    .find((attributes) => attributes.rel?.toLowerCase().split(/\s+/).includes('canonical'));
  if (!canonicalTag) throw new Error(`${label} is missing an SSR canonical link`);
  requireExact(canonicalTag.href ?? '', canonical, `${label} canonical`);
}

async function fetchProduction(path, label, { expectedStatus = 200, verify = () => {} } = {}) {
  let last = { status: 'network-error', challenge: false, error: '' };
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=dogs-${Date.now()}-${attempt}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': userAgent },
      });
      const body = await response.text();
      const challenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      last = { status: String(response.status), challenge, error: '' };

      if (response.status === expectedStatus && !challenge) {
        try {
          verify(body, response);
          return;
        } catch (error) {
          last.error = error instanceof Error ? error.message : String(error);
          console.log(`[${label}] production content not ready: ${last.error}`);
        }
      }
    } catch (error) {
      last = { status: 'network-error', challenge: false, error: error instanceof Error ? error.message : String(error) };
    }
    if (attempt < 12) await sleep(5_000);
  }
  throw new Error(`${label} did not satisfy production contract: expectedStatus=${expectedStatus} status=${last.status} challenge=${last.challenge} error=${last.error}`);
}

await fetchProduction('/dogs', 'dogs hub', {
  verify: (body) => {
    verifyHead(body, {
      title: 'Texas Dogs Defined — Breeds, Dog Life & Funny Shirt Ideas | Texas Defined',
      description: 'Texas Dogs Defined is the playful dog-life department of Texas Defined: breed personalities, Texas dog culture and breed-specific shirt ideas built for dog people.',
      canonical: `${origin}/dogs`,
    }, 'dogs hub');
    for (const needle of ['Texas Dogs Defined', 'CollectionPage', 'ItemList', 'BreadcrumbList', '/dogs/labrador-retriever']) {
      requireNeedle(body, needle, 'dogs hub');
    }
    if (/\bnoindex\b/i.test(body)) throw new Error('dogs hub unexpectedly contains noindex');
  },
});

await fetchProduction('/dogs/labrador-retriever', 'labrador breed', {
  verify: (body) => {
    verifyHead(body, {
      title: 'Labrador Retriever Defined — Personality & Funny Shirt Ideas | Texas Defined',
      description: 'Labrador Retriever Defined: breed personality, the Texas-life angle and funny shirt directions that fit Lab people without turning the page into a generic product listing.',
      canonical: `${origin}/dogs/labrador-retriever`,
    }, 'labrador breed');
    for (const needle of ['Labrador Retriever', 'WebPage', 'BreadcrumbList', 'Lake Day Labrador']) {
      requireNeedle(body, needle, 'labrador breed');
    }
    if (/\bnoindex\b/i.test(body)) throw new Error('labrador breed unexpectedly contains noindex');
  },
});

await fetchProduction('/dogs/definitely-not-a-real-texasdefined-breed', 'invalid breed 404', {
  expectedStatus: 404,
});

await fetchProduction('/sitemap.xml', 'dogs sitemap', {
  verify: (body) => {
    requireNeedle(body, '<loc>https://texasdefined.com/dogs</loc>', 'dogs sitemap');
    for (const slug of breeds) {
      requireNeedle(body, `<loc>https://texasdefined.com/dogs/${slug}</loc>`, 'dogs sitemap');
    }
  },
});

await fetchProduction('/robots.txt', 'dogs robots', {
  verify: (body) => {
    if (/Disallow:\s*\/dogs(?:\/|\s|$)/i.test(body)) throw new Error('robots.txt blocks /dogs');
  },
});

console.log('Texas Dogs production smoke passed: hub and representative breed SSR SEO/schema are live, invalid breeds 404, all governed Dogs URLs are in sitemap.xml, and robots.txt does not block /dogs.');