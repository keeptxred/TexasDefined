import fs from 'node:fs/promises';
import path from 'node:path';

const registryFiles = [
  'src/data/sports-venue-images.ts',
  'src/data/sports-venue-images-curated-overrides.ts',
  'src/data/sports-venue-images-additions.ts',
  'src/data/sports-venue-images-additions-wave2.ts',
  'src/data/sports-venue-images-additions-wave3.ts',
  'src/data/sports-venue-images-additions-wave4.ts',
  'src/data/sports-venue-images-additions-wave5.ts',
  'src/data/sports-venue-images-additions-wave6.ts',
  'src/data/sports-venue-images-additions-wave7.ts',
];

const USER_AGENT = 'TexasDefined-image-governance/1.0 (+https://texasdefined.com)';
const TIMEOUT_MS = 15000;
const DIRECT_CONCURRENCY = 4;
const COMMONS_BATCH_SIZE = 25;

const records = [];
for (const file of registryFiles) {
  const source = await fs.readFile(file, 'utf8');
  for (const match of source.matchAll(/imageUrl:\s*['"]([^'"]+)['"]/g)) {
    records.push({ kind: 'image', url: match[1], file });
  }
  for (const match of source.matchAll(/sourcePage:\s*['"]([^'"]+)['"]/g)) {
    records.push({ kind: 'source', url: match[1], file });
  }
}

const unique = new Map();
for (const record of records) {
  const key = `${record.kind}:${record.url}`;
  if (!unique.has(key)) unique.set(key, record);
}
const checks = [...unique.values()];

const failures = [];
let localImagesChecked = 0;
let commonsFilesChecked = 0;
let directRemoteImagesChecked = 0;
let directRemoteSourcesChecked = 0;
let sameSiteSourcesSkipped = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeTitle(title) {
  return title.replace(/_/g, ' ').trim().toLowerCase();
}

function getCommonsFileTitle(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.hostname !== 'commons.wikimedia.org') return null;

  let pathname;
  try {
    pathname = decodeURIComponent(parsed.pathname);
  } catch {
    pathname = parsed.pathname;
  }

  const filePrefix = '/wiki/File:';
  if (pathname.startsWith(filePrefix)) {
    return `File:${pathname.slice(filePrefix.length)}`;
  }

  const redirectPrefix = '/wiki/Special:Redirect/file/';
  if (pathname.startsWith(redirectPrefix)) {
    return `File:${pathname.slice(redirectPrefix.length)}`;
  }

  return null;
}

async function probeDirect(url) {
  let response = await fetchWithTimeout(url, {
    method: 'HEAD',
    redirect: 'follow',
    headers: { 'user-agent': USER_AGENT },
  });

  if ([403, 405, 501].includes(response.status)) {
    response = await fetchWithTimeout(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        range: 'bytes=0-0',
        'user-agent': USER_AGENT,
      },
    });
  }

  return response;
}

async function probeDirectWithRetry(url) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await probeDirect(url);
      if (response.status !== 429 && response.status < 500) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt === 0) await sleep(1000);
  }
  throw lastError;
}

async function fetchCommonsBatch(titles) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.searchParams.set('action', 'query');
  api.searchParams.set('format', 'json');
  api.searchParams.set('formatversion', '2');
  api.searchParams.set('prop', 'imageinfo');
  api.searchParams.set('iiprop', 'url|mime|size');
  api.searchParams.set('titles', titles.join('|'));

  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetchWithTimeout(api, {
        headers: { 'user-agent': USER_AGENT },
      });
      if (response.ok) return await response.json();
      lastError = new Error(`Commons API returned HTTP ${response.status}`);
      if (response.status !== 429 && response.status < 500) throw lastError;
    } catch (error) {
      lastError = error;
    }
    if (attempt < 2) await sleep(1000 * (attempt + 1));
  }
  throw lastError;
}

const commonsByTitle = new Map();
const directRemoteChecks = [];

for (const record of checks) {
  const { kind, url, file } = record;

  if (kind === 'image' && url.startsWith('/')) {
    const publicPath = path.join('public', url.replace(/^\/+/, ''));
    try {
      const stat = await fs.stat(publicPath);
      if (!stat.isFile() || stat.size <= 0) {
        failures.push(`${file}: local image ${url} is missing or empty at ${publicPath}.`);
      } else {
        localImagesChecked += 1;
      }
    } catch (error) {
      failures.push(`${file}: local image ${url} could not be read at ${publicPath}: ${error instanceof Error ? error.message : String(error)}`);
    }
    continue;
  }

  if (!/^https:\/\//i.test(url)) {
    failures.push(`${file}: ${kind} URL must be HTTPS or a root-relative local image path: ${url}`);
    continue;
  }

  if (kind === 'source') {
    const parsed = new URL(url);
    if (parsed.hostname === 'texasdefined.com' || parsed.hostname === 'www.texasdefined.com') {
      sameSiteSourcesSkipped += 1;
      continue;
    }
  }

  const commonsTitle = getCommonsFileTitle(url);
  if (commonsTitle) {
    const key = normalizeTitle(commonsTitle);
    const existing = commonsByTitle.get(key) ?? { title: commonsTitle, records: [] };
    existing.records.push(record);
    commonsByTitle.set(key, existing);
    continue;
  }

  directRemoteChecks.push(record);
}

const commonsEntries = [...commonsByTitle.values()];
for (let index = 0; index < commonsEntries.length; index += COMMONS_BATCH_SIZE) {
  const batch = commonsEntries.slice(index, index + COMMONS_BATCH_SIZE);
  try {
    const payload = await fetchCommonsBatch(batch.map((entry) => entry.title));
    const pages = payload?.query?.pages ?? [];
    const returned = new Map(pages.map((page) => [normalizeTitle(page.title ?? ''), page]));

    for (const entry of batch) {
      const page = returned.get(normalizeTitle(entry.title));
      const imageInfo = page?.imageinfo?.[0];
      if (!page || page.missing || !imageInfo?.url) {
        for (const record of entry.records) {
          failures.push(`${record.file}: Wikimedia Commons file is missing or has no downloadable image: ${entry.title} (${record.url}).`);
        }
        continue;
      }
      const mime = imageInfo.mime ?? '';
      if (!mime.toLowerCase().startsWith('image/')) {
        for (const record of entry.records) {
          failures.push(`${record.file}: Wikimedia Commons file ${entry.title} is not image content (${mime || 'no mime'}).`);
        }
        continue;
      }
      commonsFilesChecked += 1;
    }
  } catch (error) {
    failures.push(`Wikimedia Commons batch validation failed for ${batch.length} files: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function validateDirectRecord(record) {
  try {
    const response = await probeDirectWithRetry(record.url);
    if (!response.ok) {
      failures.push(`${record.file}: ${record.url} returned HTTP ${response.status}.`);
      return;
    }
    if (record.kind === 'image') {
      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.toLowerCase().startsWith('image/')) {
        failures.push(`${record.file}: ${record.url} resolved but did not return image content (${contentType || 'no content-type'}).`);
        return;
      }
      directRemoteImagesChecked += 1;
    } else {
      directRemoteSourcesChecked += 1;
    }
  } catch (error) {
    failures.push(`${record.file}: ${record.url} could not be reached after retry: ${error instanceof Error ? error.message : String(error)}`);
  }
}

for (let index = 0; index < directRemoteChecks.length; index += DIRECT_CONCURRENCY) {
  const batch = directRemoteChecks.slice(index, index + DIRECT_CONCURRENCY);
  await Promise.all(batch.map(validateDirectRecord));
}

if (failures.length) {
  console.error('Governed sports venue image source validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Governed sports venue image sources validated: ${localImagesChecked} local images present, ${commonsFilesChecked} distinct Wikimedia Commons files verified through the MediaWiki API, ${directRemoteImagesChecked} other remote images reachable with image content, ${directRemoteSourcesChecked} other external source pages reachable, ${sameSiteSourcesSkipped} same-site source pages deferred to production route verification.`,
);
