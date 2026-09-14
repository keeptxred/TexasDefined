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
const CONCURRENCY = 8;
const TIMEOUT_MS = 15000;

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
let remoteImagesChecked = 0;
let remoteSourcesChecked = 0;
let sameSiteSourcesSkipped = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function probeRemote(url) {
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

async function probeRemoteWithRetry(url) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await probeRemote(url);
      if (response.status !== 429 && response.status < 500) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt === 0) await sleep(750);
  }
  throw lastError;
}

async function validateRecord(record) {
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
    return;
  }

  if (!/^https:\/\//i.test(url)) {
    failures.push(`${file}: ${kind} URL must be an HTTPS URL or a root-relative local image path: ${url}`);
    return;
  }

  if (kind === 'source') {
    const parsed = new URL(url);
    if (parsed.hostname === 'texasdefined.com' || parsed.hostname === 'www.texasdefined.com') {
      sameSiteSourcesSkipped += 1;
      return;
    }
  }

  try {
    const response = await probeRemoteWithRetry(url);
    if (!response.ok) {
      failures.push(`${file}: ${url} returned HTTP ${response.status}.`);
      return;
    }

    if (kind === 'image') {
      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.toLowerCase().startsWith('image/')) {
        failures.push(`${file}: ${url} resolved but did not return image content (${contentType || 'no content-type'}).`);
        return;
      }
      remoteImagesChecked += 1;
    } else {
      remoteSourcesChecked += 1;
    }
  } catch (error) {
    failures.push(`${file}: ${url} could not be reached after retry: ${error instanceof Error ? error.message : String(error)}`);
  }
}

for (let index = 0; index < checks.length; index += CONCURRENCY) {
  const batch = checks.slice(index, index + CONCURRENCY);
  await Promise.all(batch.map(validateRecord));
}

if (failures.length) {
  console.error('Governed sports venue image source validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Governed sports venue image sources validated: ${localImagesChecked} local images present, ${remoteImagesChecked} remote images reachable with image content, ${remoteSourcesChecked} external source pages reachable, ${sameSiteSourcesSkipped} same-site source pages deferred to production route verification.`,
);
