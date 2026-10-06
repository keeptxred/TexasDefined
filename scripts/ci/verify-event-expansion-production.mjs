#!/usr/bin/env node

const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const runToken = `${process.env.GITHUB_SHA || 'local'}-${process.env.GITHUB_RUN_ID || Date.now()}`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function decode(value) {
  return String(value || '')
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&#39;|&#x27;|&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function tagAttribute(html, selector, attribute) {
  const tags = html.match(new RegExp(`<${selector}\\b[^>]*>`, 'gi')) || [];
  for (const tag of tags) {
    const match = tag.match(new RegExp(`\\b${attribute}=["']([^"']*)["']`, 'i'));
    if (match) return decode(match[1]);
  }
  return '';
}

function canonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of tags) {
    if (!/\brel=["'][^"']*canonical[^"']*["']/i.test(tag)) continue;
    return decode(tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || '');
  }
  return '';
}

function robots(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    if (!/\bname=["']robots["']/i.test(tag)) continue;
    return decode(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] || '');
  }
  return '';
}

function hasMeta(html, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  return tags.some((tag) => {
    const attr = decode(tag.match(new RegExp(`\\b${key}=["']([^"']*)["']`, 'i'))?.[1] || '');
    return attr.toLowerCase() === value.toLowerCase();
  });
}

async function fetchProduction(path, label) {
  let lastError = '';
  let body = '';
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify-event-expansion=${encodeURIComponent(`${runToken}-${attempt}`)}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Event-Expansion-Smoke/1.0' },
      });
      body = await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (response.ok && !challenged) return body;
      lastError = challenged ? 'Cloudflare challenge' : `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 6) await sleep(8_000);
  }
  if (body) console.error(`[${label}] response sample: ${body.slice(0, 800).replace(/\s+/g, ' ')}`);
  throw new Error(`${label} failed after retries: ${lastError || 'unknown response'}`);
}

const guides = [
  ['austoberfest', 'AustOberfest 2026', '/events/austin-this-weekend'],
  ['boo-at-the-austin-zoo', 'Boo at the Zoo 2026', '/events/austin-this-weekend'],
  ['ta-se-dhin-tak-tabla-festival', 'Ta Se Dhin Tak Tabla Festival 2026', '/events/austin-this-weekend'],
  ['san-antonio-black-international-film-festival', 'San Antonio Black International Film Festival 2026', '/events/san-antonio-this-weekend'],
  ['historic-market-square-car-show', 'Historic Market Square 12th Annual Car Show', '/events/san-antonio-this-weekend'],
  ['tejanos-at-the-alamo', 'Tejanos at the Alamo 2026', '/events/san-antonio-this-weekend'],
  ['san-antonio-monarch-butterfly-pollinator-festival', 'San Antonio Monarch Butterfly & Pollinator Festival 2026', '/events/san-antonio-this-weekend'],
];

async function verifyGuide(slug, name, weekendPath, sitemap) {
  const path = `/event/${slug}`;
  const html = await fetchProduction(path, name);
  const text = decode(html);
  assert(canonical(html) === `${origin}${path}`, `${name} canonical mismatch`);
  assert(text.includes(name), `${name} must render its event name`);
  assert(text.includes('Visit the official event site'), `${name} must expose its primary organizer link`);
  assert(text.includes('Planning your visit'), `${name} must expose visitor planning content`);
  assert(text.includes('Official event links'), `${name} must expose its source trail`);
  assert(html.includes(`href="${weekendPath}"`), `${name} must link back to its rolling metro weekend page`);
  assert(hasMeta(html, 'property', 'og:title'), `${name} must expose Open Graph title metadata`);
  assert(hasMeta(html, 'property', 'og:description'), `${name} must expose Open Graph description metadata`);
  const inSitemap = sitemap.includes(`<loc>${origin}${path}</loc>`);
  const noindex = /(?:^|[\s,])noindex(?:$|[\s,])/i.test(robots(html));
  if (inSitemap) {
    assert(!noindex, `${name} cannot be in sitemap while noindex`);
    assert(hasMeta(html, 'property', 'og:image'), `${name} must expose a compliant social image when indexable`);
  } else {
    assert(noindex, `${name} must fail closed to noindex while image-incomplete/out of sitemap`);
  }
  console.log(`[${name}] canonical/source/planning/internal-link/social/indexability contract verified`);
}

async function verifyMetro(path, name, sitemap) {
  const html = await fetchProduction(path, name);
  const text = decode(html);
  const count = Number(text.match(/([0-9,]+)\s+verified event guides/i)?.[1]?.replace(/,/g, '') || NaN);
  const noindex = /(?:^|[\s,])noindex(?:$|[\s,])/i.test(robots(html));
  const inSitemap = sitemap.includes(`<loc>${origin}${path}</loc>`);
  assert(Number.isFinite(count), `${name} must expose a verified event guide count`);
  if (count >= 4) {
    assert(!noindex, `${name} must be indexable at four or more verified guides`);
    assert(inSitemap, `${name} must be present in sitemap after qualifying`);
    console.log(`[${name}] ${count} verified guides; indexable/sitemap contract verified`);
  } else {
    assert(noindex, `${name} must fail closed to noindex below four verified guides; found ${count}`);
    assert(!inSitemap, `${name} must stay out of sitemap below four verified guides; found ${count}`);
    console.log(`[${name}] ${count} verified guides; fail-closed noindex/sitemap exclusion verified`);
  }
  assert(hasMeta(html, 'property', 'og:title'), `${name} must expose Open Graph title metadata`);
  assert(hasMeta(html, 'property', 'og:description'), `${name} must expose Open Graph description metadata`);
}

const sitemap = await fetchProduction('/sitemap.xml', 'event sitemap');
assert(!sitemap.includes('/events/events/'), 'sitemap must not contain duplicate /events/events/ routes');
for (const [slug, name, weekendPath] of guides) await verifyGuide(slug, name, weekendPath, sitemap);
await verifyMetro('/events/austin-this-weekend', 'Austin this weekend', sitemap);
await verifyMetro('/events/san-antonio-this-weekend', 'San Antonio this weekend', sitemap);
console.log('Events expansion production verification passed.');
