import { readFile } from 'node:fs/promises';
import {
  collectSitemapEntries,
  parseExplicitUrls,
  selectMeaningfulUrls,
  submitIndexNowSafely,
  verifyIndexNowKey,
} from './indexnow-lib.mjs';

const publicIndexingEnabled = process.env.PUBLIC_INDEXING_ENABLED === 'true';
if (!publicIndexingEnabled) {
  console.log('IndexNow submission skipped: PUBLIC_INDEXING_ENABLED is not explicitly true. No URLs were submitted.');
  process.exit(0);
}

const origin = 'https://texasdefined.com';
const host = 'texasdefined.com';
const key = '0c2b08423ce5be707dd931f57239acf1';
const sitemapUrls = [
  `${origin}/sitemap.xml`,
  `${origin}/sitemap-explore.xml`,
  `${origin}/sitemap-texas-icons.xml`,
];
const fullSubmission = process.env.INDEXNOW_FULL === 'true';
const freshnessHours = Math.max(1, Number(process.env.INDEXNOW_FRESHNESS_HOURS || 72));
const explicitUrls = parseExplicitUrls(process.env.INDEXNOW_URLS, { origin });
const strict = process.env.INDEXNOW_STRICT === 'true';

// The shared helper owns these preserved IndexNow contracts:
// https://api.indexnow.org/indexnow ; accepted HTTP [200, 202] ; hard limit 10_000 URLs.
const localKey = (await readFile(new URL(`../../public/${key}.txt`, import.meta.url), 'utf8')).trim();
if (localKey !== key) throw new Error('Tracked IndexNow key file does not match the configured key.');

const robotsResponse = await fetch(`${origin}/robots.txt`, {
  headers: { 'user-agent': 'TexasDefinedIndexNow/2.0' },
  redirect: 'follow',
  signal: AbortSignal.timeout(15_000),
});
if (!robotsResponse.ok) throw new Error(`robots.txt returned HTTP ${robotsResponse.status}`);
const robots = await robotsResponse.text();
for (const required of [
  'User-agent: Bingbot',
  'User-agent: OAI-SearchBot',
  'Sitemap: https://texasdefined.com/sitemap.xml',
  'Sitemap: https://texasdefined.com/sitemap-explore.xml',
  'Sitemap: https://texasdefined.com/sitemap-texas-icons.xml',
]) {
  if (!robots.includes(required)) throw new Error(`robots.txt missing: ${required}`);
}

await verifyIndexNowKey({ origin, key });

let selected = explicitUrls;
let selectionMode = explicitUrls.length ? 'explicit transition/publish event' : 'sitemap meaningful changes';
if (!selected.length) {
  const nested = await Promise.all(sitemapUrls.map((sitemapUrl) => collectSitemapEntries(sitemapUrl, { origin })));
  selected = selectMeaningfulUrls(nested.flat(), { full: fullSubmission, freshnessHours });
  selectionMode = fullSubmission ? 'full canonical sitemap' : `canonical URLs changed in the last ${freshnessHours}h`;
}

if (!selected.length) {
  console.log(`IndexNow: no ${selectionMode}; cosmetic deployment produced no notification.`);
  process.exit(0);
}

const result = await submitIndexNowSafely({ origin, host, key, urls: selected, logger: console });
if (!result.ok) {
  console.warn(`IndexNow soft failure: ${result.error}`);
  if (strict) process.exitCode = 1;
} else {
  console.log(`IndexNow accepted ${result.submitted} canonical TexasDefined URL(s) across ${result.batches.length} batch(es): ${selectionMode}.`);
}
