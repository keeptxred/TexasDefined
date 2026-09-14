import fs from 'node:fs/promises';
import path from 'node:path';

const source = await fs.readFile('src/data/sports-venue-images-curated-overrides.ts', 'utf8');
const imageUrls = [...source.matchAll(/imageUrl:\s*'([^']+)'/g)].map((match) => match[1]);
const sourcePages = [...source.matchAll(/sourcePage:\s*'([^']+)'/g)].map((match) => match[1]);
const localImageUrls = imageUrls.filter((url) => url.startsWith('/'));
const remoteImageUrls = imageUrls.filter((url) => !url.startsWith('/'));
const urls = [...new Set([...remoteImageUrls, ...sourcePages])];
const failures = [];

for (const url of localImageUrls) {
  const publicPath = path.join('public', url.replace(/^\/+/, ''));
  try {
    const stat = await fs.stat(publicPath);
    if (!stat.isFile() || stat.size <= 0) {
      failures.push(`${url} is missing or empty at ${publicPath}.`);
    }
  } catch (error) {
    failures.push(`${url} could not be read at ${publicPath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

for (const url of urls) {
  if (!/^https:\/\//i.test(url)) {
    failures.push(`${url} must use HTTPS.`);
  }
}

if (!urls.length && !localImageUrls.length) {
  console.log('No curated sports venue image overrides to validate.');
  process.exit(0);
}

async function probe(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'TexasDefined-image-governance/1.0 (+https://texasdefined.com)',
      },
    });

    if ([403, 405, 501].includes(response.status)) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          range: 'bytes=0-0',
          'user-agent': 'TexasDefined-image-governance/1.0 (+https://texasdefined.com)',
        },
      });
    }

    return response;
  } finally {
    clearTimeout(timeout);
  }
}

for (const url of urls) {
  if (!/^https:\/\//i.test(url)) continue;
  try {
    const response = await probe(url);
    if (!response.ok) {
      failures.push(`${url} returned HTTP ${response.status}.`);
      continue;
    }
    if (remoteImageUrls.includes(url)) {
      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.toLowerCase().startsWith('image/')) {
        failures.push(`${url} resolved successfully but did not return image content (${contentType || 'no content-type'}).`);
      }
    }
  } catch (error) {
    failures.push(`${url} could not be reached: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error('Curated sports venue source validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Curated sports venue sources validated: ${localImageUrls.length} local image assets present and ${urls.length} remote URLs reachable.`);
