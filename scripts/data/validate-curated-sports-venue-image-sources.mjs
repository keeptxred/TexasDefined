import fs from 'node:fs/promises';

const source = await fs.readFile('src/data/sports-venue-images-curated-overrides.ts', 'utf8');
const imageUrls = [...source.matchAll(/imageUrl:\s*'([^']+)'/g)].map((match) => match[1]);
const sourcePages = [...source.matchAll(/sourcePage:\s*'([^']+)'/g)].map((match) => match[1]);
const urls = [...new Set([...imageUrls, ...sourcePages])];

if (!urls.length) {
  console.log('No curated sports venue image overrides to validate remotely.');
  process.exit(0);
}

const failures = [];
for (const url of urls) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'TexasDefined-image-governance/1.0 (+https://texasdefined.com)',
      },
    });
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
  } finally {
    clearTimeout(timeout);
  }
}

if (failures.length) {
  console.error('Curated sports venue source validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Curated sports venue sources validated remotely: ${urls.length} URLs reachable.`);
