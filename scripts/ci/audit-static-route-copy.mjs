import fs from 'node:fs/promises';
import path from 'node:path';

const ROUTES_DIR = 'src/routes';
const OUT = process.env.STATIC_ROUTE_COPY_AUDIT_JSON || '/tmp/texasdefined-static-route-copy-audit.json';
const REVIEW_WORDS = Number(process.env.STATIC_ROUTE_REVIEW_WORDS || 140);

const EXCLUDED = [
  /^api\./,
  /^sitemap/,
  /^robots/,
  /^manifest/,
  /^rss/,
  /^feed/,
  /^og\./,
];

function normalize(text = '') {
  return text
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function words(text = '') {
  return (text.match(/[A-Za-z0-9]+(?:[’'\-][A-Za-z0-9]+)*/g) || []).length;
}

function likelyHumanCopy(text) {
  if (!text || text.length < 3) return false;
  if (/^(?:https?:|\/|\.\/|@\/|[A-Za-z0-9_-]+\.(?:tsx?|mjs|css|svg|webp|png|jpg))/.test(text)) return false;
  if (/^(?:mt-|mb-|mx-|my-|pt-|pb-|px-|py-|text-|bg-|border-|grid|flex|gap-|sm:|md:|lg:|xl:|hover:|focus:|font-|leading-|tracking-|max-w-|min-h-|rounded|items-|justify-|space-y-)/.test(text)) return false;
  if (/^[A-Za-z0-9_-]+(?:\s+[A-Za-z0-9_:\-\[\]\/\.]+){2,}$/.test(text) && /(?:text-|bg-|border-|grid|flex|gap-|mt-|py-|px-)/.test(text)) return false;
  return /[A-Za-z]{2}/.test(text);
}

function collectCopy(source) {
  const snippets = [];
  const add = (value) => {
    const text = normalize(value);
    if (likelyHumanCopy(text)) snippets.push(text);
  };

  for (const match of source.matchAll(/>([^<{][^<]{2,})</g)) add(match[1]);
  for (const match of source.matchAll(/\b(?:title|description|body|copy|dek|eyebrow|label|intro|lede|subtitle|answer|note)\s*=\s*["'`]([^"'`]+)["'`]/g)) add(match[1]);
  for (const match of source.matchAll(/\b(?:title|description|body|copy|dek|eyebrow|label|intro|lede|subtitle|answer|note)\s*:\s*["'`]([^"'`]+)["'`]/g)) add(match[1]);

  return [...new Set(snippets)];
}

const entries = await fs.readdir(ROUTES_DIR, { withFileTypes: true });
const routeFiles = entries
  .filter((entry) => entry.isFile() && /\.tsx$/.test(entry.name))
  .map((entry) => entry.name)
  .filter((name) => !name.includes('$'))
  .filter((name) => !EXCLUDED.some((pattern) => pattern.test(name)))
  .sort();

const grouped = new Map();
for (const file of routeFiles) {
  const key = file.replace(/\.lazy\.tsx$/, '').replace(/\.tsx$/, '');
  const list = grouped.get(key) || [];
  list.push(file);
  grouped.set(key, list);
}

const results = [];
for (const [routeKey, files] of grouped) {
  const combined = (await Promise.all(files.map((file) => fs.readFile(path.join(ROUTES_DIR, file), 'utf8')))).join('\n');
  const snippets = collectCopy(combined);
  const copyWords = words(snippets.join(' '));
  const sharedSurfaceSignals = [
    'CategoryPage', 'ArticleBody', 'TexasEvergreenGuide', 'DestinationCollectionPage', 'CalculatorPage',
    'CountyGuideSections', 'Fishing', 'Directory', 'Hub', 'useLoaderData', 'Route.useLoaderData',
  ].filter((signal) => combined.includes(signal));
  const likelyWrapper = copyWords < 40 && sharedSurfaceSignals.length > 0;
  const needsReview = copyWords < REVIEW_WORDS && !likelyWrapper;
  results.push({ routeKey, files, copyWords, snippetCount: snippets.length, sharedSurfaceSignals, likelyWrapper, needsReview, sample: snippets.slice(0, 8) });
}

const review = results.filter((item) => item.needsReview).sort((a, b) => a.copyWords - b.copyWords || a.routeKey.localeCompare(b.routeKey));
const report = { auditedAt: new Date().toISOString(), reviewThreshold: REVIEW_WORDS, routeGroups: results.length, reviewCount: review.length, review, results };
await fs.writeFile(OUT, JSON.stringify(report, null, 2) + '\n');

console.log(`Static route copy audit scanned ${results.length} route groups; ${review.length} need editorial-depth review.`);
for (const item of review.slice(0, 250)) {
  console.warn(`REVIEW ${item.routeKey} :: ${item.copyWords} reader-facing words across ${item.files.join(', ')} :: ${item.sample.slice(0, 3).join(' | ')}`);
}
