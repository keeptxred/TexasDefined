const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const routes = [
  ['/moving-to-texas', 'Moving to Texas'],
  ['/moving-to-texas/tools', 'Texas relocation tools'],
  ['/find-my-county', 'What county am I in?'],
  ['/find-my-school-district', 'Find the school district that serves an address'],
  ['/find-my-utilities', 'Find utilities for a Texas address'],
  ['/find-my-voter-registration', 'Find your Texas voter-registration path'],
  ['/find-my-homestead-exemption', 'Find where to file a Texas homestead exemption'],
  ['/find-my-property-tax', 'Find your Texas property-tax offices'],
  ['/find-my-emergency-services', 'Find Texas emergency and community services'],
  ['/texas-zip-code-explorer', 'Texas ZIP Code Explorer'],
  ['/compare-texas-cities', 'Compare Texas cities'],
];
const toolkitLinks = routes
  .map(([path]) => path)
  .filter((path) => !['/moving-to-texas', '/moving-to-texas/tools'].includes(path));
const RETRY_ATTEMPTS = 6;
const RETRY_DELAY_MS = 5000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function hasCanonical(body, path) {
  const canonical = `${origin}${path}`;
  const tags = body.match(/<link\b[^>]*>/gi) ?? [];
  return tags.some(
    (tag) => /\brel=["']canonical["']/i.test(tag)
      && (tag.includes(`href="${canonical}"`) || tag.includes(`href='${canonical}'`)),
  );
}

function hasRobotsNoindex(body) {
  const metas = body.match(/<meta\b[^>]*>/gi) ?? [];
  return metas.some(
    (tag) => /\bname=["']robots["']/i.test(tag)
      && /\bcontent=["'][^"']*noindex/i.test(tag),
  );
}

function validatePage(path, needle, response, body) {
  if (response.status !== 200) return `expected HTTP 200, received ${response.status}`;
  if (!body.includes(needle)) return `expected substantive content not found: ${needle}`;
  if (!hasCanonical(body, path)) return `canonical does not resolve to ${origin}${path}`;
  if (hasRobotsNoindex(body)) return 'robots meta unexpectedly contains noindex';
  return null;
}

async function fetchLive(path, label, validate) {
  let lastError;
  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}relocation_verify=${Date.now()}-${attempt}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30000),
        headers: {
          'user-agent': 'TexasDefined-Relocation-Production-Smoke/1.0',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
        },
      });
      const body = await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';

      if (response.ok && !challenged) {
        const semanticError = validate?.(response, body) ?? null;
        if (!semanticError) return { response, body };
        lastError = new Error(`${label}: ${semanticError}`);
      } else {
        lastError = new Error(
          `${label}: HTTP ${response.status}${challenged ? ' with Cloudflare challenge' : ''}`,
        );
      }
    } catch (error) {
      lastError = error;
    }

    if (attempt < RETRY_ATTEMPTS) {
      console.warn(
        `Retrying ${label} after production response was not ready (attempt ${attempt}/${RETRY_ATTEMPTS})`,
      );
      await sleep(RETRY_DELAY_MS);
    }
  }

  throw lastError instanceof Error ? lastError : new Error(`${label}: request failed`);
}

for (const [path, needle] of routes) {
  const { response } = await fetchLive(
    path,
    path,
    (candidateResponse, body) => validatePage(path, needle, candidateResponse, body),
  );
  console.log(`PASS ${path}: ${response.status}, expected content, canonical, indexable meta`);
}

const { body: relocationHubBody } = await fetchLive('/moving-to-texas', 'relocation operating system');
for (const needle of [
  'Corporate Relocation to Texas',
  'Build an address-level research packet',
  'Save this address to My Texas Move',
]) {
  if (!relocationHubBody.includes(needle)) {
    throw new Error(`/moving-to-texas: missing deployed relocation marker: ${needle}`);
  }
}

const { body: industriesBody } = await fetchLive('/texas-industries', 'Texas industries relocation bridge');
if (!industriesBody.includes('Corporate relocation & workforce planning')) {
  throw new Error('/texas-industries: corporate relocation discovery is not live');
}

const { body: startBusinessBody } = await fetchLive('/start-a-business-in-texas', 'Texas business relocation bridge');
if (!startBusinessBody.includes('If the business move includes employees or a new Texas site')) {
  throw new Error('/start-a-business-in-texas: corporate relocation handoff is not live');
}

const { body: toolkitBody } = await fetchLive('/moving-to-texas/tools', 'relocation toolkit');
for (const path of toolkitLinks) {
  if (!toolkitBody.includes(`href="${path}"`) && !toolkitBody.includes(`href="${origin}${path}"`)) {
    throw new Error(`/moving-to-texas/tools: missing internal link to ${path}`);
  }
}

const { body: robots } = await fetchLive('/robots.txt', 'robots.txt');
for (const [path] of routes) {
  if (
    robots
      .split(/\r?\n/)
      .some((line) => line.trim().toLowerCase() === `disallow: ${path.toLowerCase()}`)
  ) {
    throw new Error(`robots.txt explicitly blocks ${path}`);
  }
}

const { body: sitemap } = await fetchLive('/sitemap.xml', 'sitemap.xml');
for (const [path] of routes) {
  if (!sitemap.includes(`<loc>${origin}${path}</loc>`)) {
    throw new Error(`sitemap.xml missing ${origin}${path}`);
  }
}

console.log(
  `TexasDefined relocation production verification passed for ${routes.length} canonical, indexable relocation URLs.`,
);
