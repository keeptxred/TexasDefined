import fs from 'node:fs';

const source = fs.readFileSync('src/data/top-attraction-authority-sources.ts', 'utf8');
const failures = [];

const slugs = [...source.matchAll(/^\s{2}"([a-z0-9-]+)": \[/gm)].map((match) => match[1]);
const urls = [...source.matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1]);
const labels = [...source.matchAll(/label:\s*"([^"]+)"/g)].map((match) => match[1]);
const scopes = [...source.matchAll(/scope:\s*"([^"]+)"/g)].map((match) => match[1]);

if (slugs.length !== 25) failures.push(`Expected 25 Top-25 supplemental-source blocks; found ${slugs.length}.`);
if (new Set(slugs).size !== slugs.length) failures.push('Top-25 supplemental-source slugs must be unique.');
if (urls.length < 35) failures.push(`Expected at least 35 supporting authority URLs; found ${urls.length}.`);
if (urls.length !== labels.length || urls.length !== scopes.length) failures.push(`Source label/url/scope counts differ: labels=${labels.length}, urls=${urls.length}, scopes=${scopes.length}.`);
if (new Set(urls).size !== urls.length) failures.push('Supporting authority URLs must be unique across the Top-25 registry.');

const blockedHosts = new Set([
  'facebook.com', 'www.facebook.com',
  'instagram.com', 'www.instagram.com',
  'pinterest.com', 'www.pinterest.com',
  'reddit.com', 'www.reddit.com',
  'tiktok.com', 'www.tiktok.com',
  'tripadvisor.com', 'www.tripadvisor.com',
  'twitter.com', 'www.twitter.com',
  'x.com', 'www.x.com',
  'yelp.com', 'www.yelp.com',
  'youtube.com', 'www.youtube.com',
]);

for (const [index, rawUrl] of urls.entries()) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    failures.push(`Invalid source URL: ${rawUrl}`);
    continue;
  }
  if (url.protocol !== 'https:') failures.push(`Authority source must use HTTPS: ${rawUrl}`);
  if (blockedHosts.has(url.hostname.toLowerCase())) failures.push(`Review/social platform cannot serve as Top-25 authority evidence: ${rawUrl}`);
  if (/^(?:localhost|127\.0\.0\.1|0\.0\.0\.0|::1)$/i.test(url.hostname)) failures.push(`Local source URL is not allowed: ${rawUrl}`);
  if ([...url.searchParams.keys()].some((key) => /^utm_/i.test(key) || /^(?:gclid|fbclid|mc_cid|mc_eid)$/i.test(key))) failures.push(`Tracking parameters are not allowed in authority source URL: ${rawUrl}`);
  if ((labels[index] ?? '').trim().length < 8) failures.push(`Authority source label is too vague for ${rawUrl}.`);
  if ((scopes[index] ?? '').trim().length < 30) failures.push(`Authority source scope is too thin for ${rawUrl}.`);
}

for (const forbidden of ['Tripadvisor', 'TripAdvisor', 'Yelp', 'Reddit', 'TikTok', 'Instagram review', 'Facebook review']) {
  if (source.includes(forbidden)) failures.push(`Authority source registry includes prohibited review/social evidence token: ${forbidden}.`);
}

if (failures.length) {
  console.error('Top 25 authority source policy failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Top 25 authority source policy passed: ${slugs.length} attraction blocks and ${urls.length} unique supporting HTTPS authority URLs with no review/social/tracking sources.`);
