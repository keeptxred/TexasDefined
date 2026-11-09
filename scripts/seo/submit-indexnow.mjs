import { readFile } from 'node:fs/promises';
import {
  collectSitemapEntries,
  fetchText,
  parseExplicitUrls,
  selectMeaningfulUrls,
  submitIndexNowSafely,
  verifyIndexNowKey,
} from './indexnow-lib.mjs';

const origin = 'https://texasdefined.com';
const host = 'texasdefined.com';
const key = '0c2b08423ce5be707dd931f57239acf1';
// Keep IndexNow discovery in parity with the published sitemap index.
// Shop products currently have no reliable <lastmod>, so unchanged products
// are not resubmitted hourly; real publish/updates use INDEXNOW_URLS.
const sitemapUrls = [
  `${origin}/sitemap.xml`,
  `${origin}/sitemap-explore.xml`,
  `${origin}/sitemap-texas-icons.xml`,
  `${origin}/sitemap-evergreen.xml`,
  `${origin}/sitemap-shop.xml`,
];
const optionalSitemapUrls = new Set([
  `${origin}/sitemap-evergreen.xml`,
  `${origin}/sitemap-shop.xml`,
]);
const fullSubmission = process.env.INDEXNOW_FULL === 'true';
const freshnessHours = Math.max(1, Number(process.env.INDEXNOW_FRESHNESS_HOURS || 72));
const explicitUrls = parseExplicitUrls(process.env.INDEXNOW_URLS, { origin });
const strict = process.env.INDEXNOW_STRICT === 'true';

if (process.env.PUBLIC_INDEXING_ENABLED === 'false') {
  console.log('IndexNow submission disabled because PUBLIC_INDEXING_ENABLED=false.');
  process.exit(0);
}

const localKey = (await readFile(new URL(`../../public/${key}.txt`, import.meta.url), 'utf8')).trim();
if (localKey !== key) throw new Error('Tracked IndexNow key file does not match the configured key.');

const robots = await fetchText(`${origin}/robots.txt`, { userAgent: 'TexasDefinedIndexNow/2.0' });
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
  const nested = await Promise.all(sitemapUrls.map(async (sitemapUrl) => {
    try {
      return await collectSitemapEntries(sitemapUrl, { origin });
    } catch (error) {
      // A transient optional feed outage must not suppress notifications for
      // healthy primary, Explore and icon pages. This is surfaced in CI logs.
      if (!optionalSitemapUrls.has(sitemapUrl)) throw error;
      console.warn(`IndexNow optional sitemap unavailable: ${sitemapUrl}: ${error instanceof Error ? error.message : String(error)}`);
      return [];
    }
  }));
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
