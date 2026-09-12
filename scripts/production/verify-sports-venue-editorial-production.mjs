const baseUrl = (process.env.TEXASDEFINED_BASE_URL ?? 'https://texasdefined.com').replace(/\/$/, '');
const verifyToken = process.env.GITHUB_SHA ?? Date.now().toString();
const banned = [
  'Texas Defined tracks it as a visitor-facing venue',
  'Texas Defined includes it in the statewide venue guide to connect the sporting experience with practical trip planning and the surrounding county and region.',
];

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

async function fetchText(pathname) {
  const separator = pathname.includes('?') ? '&' : '?';
  const url = `${baseUrl}${pathname}${separator}td_verify=${encodeURIComponent(verifyToken)}`;
  const response = await fetch(url, {
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'user-agent': 'TexasDefined production editorial verifier',
    },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`${pathname} returned HTTP ${response.status}`);
  return { url, text: await response.text() };
}

function assertAbsent(text, marker, label) {
  if (text.includes(marker)) throw new Error(`${label} still contains retired sports-venue boilerplate: ${marker}`);
}

function assertIncludes(text, marker, label) {
  if (!text.includes(marker)) throw new Error(`${label} is missing expected venue-specific editorial copy: ${marker}`);
}

const countyChecks = [
  {
    path: '/county/tarrant',
    label: 'Tarrant County sports destinations',
    expected: [
      'AT&T Stadium is the Dallas Cowboys’ home in Arlington',
      'Globe Life Field opened in 2020 as the Texas Rangers’ third Arlington home',
      'Amon G. Carter Stadium has been TCU football’s home since 1930',
      'Colonial Country Club opened in 1936 from Marvin Leonard’s championship-golf vision',
    ],
  },
  {
    path: '/county/harris',
    label: 'Harris County sports destinations',
    expected: [
      'Daikin Park has anchored Houston Astros baseball in downtown Houston since 2000',
      'Shell Energy Stadium is Houston’s soccer-focused home for Dynamo FC and the Dash',
      'Toyota Center is the Houston Rockets’ downtown arena and a major stop for concerts and touring sports events',
      'Legacy Stadium is Katy ISD’s 2017 district stadium',
    ],
  },
];

for (const check of countyChecks) {
  const { url, text } = await fetchText(check.path);
  const html = decodeHtml(text);
  for (const marker of banned) assertAbsent(html, marker, check.label);
  for (const marker of check.expected) assertIncludes(html, marker, check.label);
  console.log(`PASS ${check.label}: ${url}`);
}

const entityChecks = [
  {
    id: 'sports-venue:att-stadium',
    expected: 'AT&T Stadium is the Dallas Cowboys’ home in Arlington',
  },
  {
    id: 'sports-venue:legacy-stadium-katy',
    expected: 'Legacy Stadium is Katy ISD’s 2017 district stadium',
  },
];

for (const check of entityChecks) {
  const { url, text } = await fetchText(`/api/ai/entities?id=${encodeURIComponent(check.id)}`);
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    throw new Error(`AI entity endpoint returned non-JSON for ${check.id}: ${error.message}`);
  }
  const description = payload?.about?.description;
  if (typeof description !== 'string') throw new Error(`AI entity endpoint is missing description for ${check.id}`);
  for (const marker of banned) assertAbsent(description, marker, `AI entity ${check.id}`);
  assertIncludes(description, check.expected, `AI entity ${check.id}`);
  console.log(`PASS AI entity ${check.id}: ${url}`);
}

console.log('Sports venue production editorial verification passed: representative major and tier-2 county cards plus AI entity records use venue-specific editorial copy and retired boilerplate is absent.');
