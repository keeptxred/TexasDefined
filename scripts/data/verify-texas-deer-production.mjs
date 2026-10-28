import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('src/data/hunting/deer-season-dates.json', 'utf8'));
const origin = (process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const path = '/hunting/texas-deer-hunting';
const canonical = 'https://texasdefined.com' + path;
const imageUrl = 'https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/banner_images/2021-05/White-tailed%20deer.jpg?itok=tsL8BNDt';

function displayDate(iso, style, includeYear) {
  const date = new Date(iso + 'T12:00:00Z');
  if (Number.isNaN(date.getTime())) throw new Error('Invalid deer date: ' + iso);
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', month: style === 'long' ? 'long' : 'short', day: 'numeric',
    ...(includeYear ? { year: 'numeric' } : {}),
  }).format(date);
  return style === 'short'
    ? formatted.replace(/^(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec) /, '$1. ')
    : formatted;
}

function displayRange(row) {
  const sameYear = row.start.slice(0, 4) === row.end.slice(0, 4);
  const sameMonth = sameYear && row.start.slice(5, 7) === row.end.slice(5, 7);
  const first = displayDate(row.start, 'short', !sameYear);
  return sameMonth
    ? first + '–' + Number(row.end.slice(8)) + ', ' + row.end.slice(0, 4)
    : first + '–' + displayDate(row.end, 'short', true);
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[^\0]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:amp);/gi, '&')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&(?:quot|#34);/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function assertContains(text, needle, label) {
  if (!text.includes(needle)) throw new Error('Deer production failed (' + label + '): missing ' + needle);
}

export function verifyDeerDocument(html) {
  if (!/^\s*<!doctype html>/i.test(html)) throw new Error('Deer guide did not return a complete HTML document');
  const canonicalTags = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => match[0])
    .filter(tag => /\brel=["']canonical["']/i.test(tag));
  if (canonicalTags.length !== 1 || !canonicalTags[0].includes('href="' + canonical + '"')) {
    throw new Error('Deer guide canonical link missing, incorrect or duplicated');
  }
  const socialTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0])
    .filter(tag => /\bproperty=["']og:image["']/i.test(tag));
  if (socialTags.length !== 1 || !socialTags[0].includes(imageUrl)) {
    throw new Error('Deer guide is missing the correct social preview image');
  }
  const rendered = visibleText(html);
  for (const required of [
    'Texas White-Tailed Deer Hunting Guide',
    'Texas white-tailed deer hunting dates',
    'Start with the county, not just the season zone',
    'Chronic wasting disease',
    'Current official sources',
    'Tom Koerner',
    displayDate(data.sourceCheckedAt, 'long', true),
  ]) assertContains(rendered, required, 'visible content');

  if (data.rows.length !== 8) throw new Error('Deer season registry does not contain eight official date ranges');
  for (const row of data.rows) {
    assertContains(rendered, row.season, 'season table ' + row.id);
    assertContains(rendered, displayRange(row), 'date range ' + row.id);
  }

  if (!html.includes('href="#deer-guide-1"') || !html.includes('id="deer-guide-11"')) {
    throw new Error('Deer guide jump links or destination anchors are missing');
  }
  if (!html.includes('src="' + imageUrl + '"') || !html.includes('alt="Close view of a white-tailed buck')) {
    throw new Error('Deer guide photograph or meaningful alternative text is missing');
  }
  if (!html.includes('https://www.fws.gov/media/white-tailed-deer-buck-0')) {
    throw new Error('Deer guide photo attribution source is missing');
  }

  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const entities = scripts.flatMap((match) => {
    try {
      const value = JSON.parse(match[1]);
      return value['@graph'] || [value];
    } catch {
      throw new Error('Deer guide emitted invalid structured-data JSON');
    }
  });
  const article = entities.find((entity) => entity['@type'] === 'Article');
  if (!article || article.image?.url !== imageUrl || article.image?.license !== 'https://www.fws.gov/media/white-tailed-deer-buck-0') {
    throw new Error('Deer guide Article schema or licensed image metadata is missing');
  }
  if (!entities.some((entity) => entity['@type'] === 'FAQPage' && entity.mainEntity?.length)) {
    throw new Error('Deer guide FAQ structured data is missing');
  }
  return { verifiedRanges: data.rows.length, checkedSnapshot: data.sourceCheckedAt };
}


function verifyDeerImageResponse(contentType, bytes) {
  if (!contentType.toLowerCase().includes('image/jpeg')) {
    throw new Error('Deer image did not return JPEG media; received ' + contentType);
  }
  if (bytes.length < 1024 || bytes[0] !== 0xff || bytes[1] !== 0xd8 ||
      bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
    throw new Error('Deer image was empty, incomplete or did not contain valid JPEG boundaries');
  }
}
async function verifyDeerImage() {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(imageUrl, {
        headers: { accept: 'image/jpeg', 'user-agent': 'TexasDefined-deer-image-readiness/1.0' },
        signal: AbortSignal.timeout(25000),
      });
      if (!response.ok) throw new Error('Deer image upstream HTTP ' + response.status);
      if (new URL(response.url).hostname !== 'www.fws.gov') {
        throw new Error('Deer image was redirected away from USFWS');
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      verifyDeerImageResponse(response.headers.get('content-type') || '', bytes);
      console.log('USFWS deer photo verified: HTTP ' + response.status + ', JPEG bytes ' + bytes.length);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 2500));
    }
  }
  throw lastError;
}

function selfTest() {
  const allDates = data.rows.map(row => row.season + ' ' + displayRange(row)).join(' ');
  const article = { '@type': 'Article', image: { url: imageUrl, license: 'https://www.fws.gov/media/white-tailed-deer-buck-0' } };
  const faq = { '@type': 'FAQPage', mainEntity: [{ name: 'Test question' }] };
  const example = '<!DOCTYPE html><html><head><link rel="canonical" href="' + canonical + '"><meta property="og:image" content="' + imageUrl + '"></head><body>'
    + 'Texas White-Tailed Deer Hunting Guide Texas white-tailed deer hunting dates Start with the county, not just the season zone Chronic wasting disease Current official sources Tom Koerner '
    + displayDate(data.sourceCheckedAt, 'long', true) + ' ' + allDates
    + '<nav><a href="#deer-guide-1">Introduction</a></nav><section id="deer-guide-11">Final section</section>'
    + '<img src="' + imageUrl + '" alt="Close view of a white-tailed buck in grass">'
    + '<a href="https://www.fws.gov/media/white-tailed-deer-buck-0">Photo rights</a>'
    + '<script type="application/ld+json">' + JSON.stringify({ '@graph': [article, faq] }) + '</script></body></html>';
  verifyDeerDocument(example);
  const jpeg = new Uint8Array(1024);
  jpeg[0] = 0xff; jpeg[1] = 0xd8; jpeg[1022] = 0xff; jpeg[1023] = 0xd9;
  verifyDeerImageResponse('image/jpeg', jpeg);
  for (const bad of [
    ['text/html', jpeg],
    ['image/jpeg', new Uint8Array(1024)],
    ['image/jpeg', jpeg.subarray(0, 20)],
  ]) {
    let rejected = false;
    try { verifyDeerImageResponse(...bad); } catch { rejected = true; }
    if (!rejected) throw new Error('Deer image verifier accepted a non-image or truncated photo');
  }

  for (const bad of [
    example.replace(canonical, 'https://example.org/wrong'),
    example.replace(displayRange(data.rows[0]), 'incorrect season date'),
    example.replace('type="application/ld+json"', 'type="text/plain"'),
    example.replace('property="og:image"', 'property="og:wrong"'),
  ]) {
    let rejected = false;
    try { verifyDeerDocument(bad); } catch { rejected = true; }
    if (!rejected) throw new Error('Deer production validator self-test accepted a broken page');
  }
  console.log('Texas deer live-page monitor self-test passed: canonical, 8 dynamic date ranges, image, Article and FAQ metadata.');
}

async function main() {
  if (process.argv.includes('--self-test')) return selfTest();
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(origin + path, {
        headers: { accept: 'text/html', 'user-agent': 'TexasDefined-deer-production-monitor/1.0', 'cache-control': 'no-cache' },
        signal: AbortSignal.timeout(25_000),
      });
      if (!response.ok) throw new Error('Deer guide HTTP ' + response.status);
      if (!response.headers.get('content-type')?.includes('text/html')) throw new Error('Deer guide served non-HTML content');
      if (new URL(response.url).hostname.replace(/^www\./, '') !== 'texasdefined.com') throw new Error('Deer guide redirected off the canonical domain');
      const result = verifyDeerDocument(await response.text());
      await verifyDeerImage();
      console.log('Texas deer production verified: canonical, eight published date ranges, eleven-section navigation, real JPEG photo, social metadata, Article and FAQ schema. TPWD snapshot ' + result.checkedSnapshot);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 2_000));
    }
  }
  throw lastError;
}

main().catch(error => { console.error(error); process.exitCode = 1; });
