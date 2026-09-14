import fs from 'node:fs/promises';

const source = await fs.readFile('src/data/sports-venue-images-curated-overrides.ts', 'utf8');
const imageUrls = [...source.matchAll(/imageUrl:\s*'([^']+)'/g)].map((match) => match[1]);
const sourcePages = [...source.matchAll(/sourcePage:\s*'([^']+)'/g)].map((match) => match[1]);
const urls = [...new Set([...imageUrls, ...sourcePages])];

if (!urls.length) {
  console.log('No curated sports venue image overrides to validate remotely.');
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

const failures = [];
for (const url of urls) {
  try {
    const response = await probe(url);
    if (!response.ok) {
      failures.push(`${url} returned HTTP ${response.status}.`);
      continue;
    }
    if (imageUrls.includes(url)) {
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

console.log(`Curated sports venue sources validated remotely: ${urls.length} URLs reachable.`);
