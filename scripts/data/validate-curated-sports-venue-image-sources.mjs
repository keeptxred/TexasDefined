import fs from 'node:fs/promises';
import path from 'node:path';

const source = await fs.readFile('src/data/sports-venue-images-curated-overrides.ts', 'utf8');
const imageUrls = [...source.matchAll(/imageUrl:\s*'([^']+)'/g)].map((match) => match[1]);
const sourcePages = [...source.matchAll(/sourcePage:\s*'([^']+)'/g)].map((match) => match[1]);
const localImageUrls = imageUrls.filter((url) => url.startsWith('/'));
const remoteImageUrls = imageUrls.filter((url) => !url.startsWith('/'));
const urls = [...new Set([...remoteImageUrls, ...sourcePages])];
const failures = [];
const overrideRecords = [...source.matchAll(/^  '([^']+)': \{([\s\S]*?)^  \},/gm)].map((match) => ({
  slug: match[1],
  block: match[2],
}));
const fieldValue = (block, field) => block.match(new RegExp(\`\${field}:\\\\s*['"]([^'"]+)['"]\`))?.[1] ?? '';

function cleanHtml(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function commonsTitleFromSourcePage(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'commons.wikimedia.org') return null;
    const pathname = decodeURIComponent(parsed.pathname);
    const prefix = '/wiki/File:';
    return pathname.startsWith(prefix) ? \`File:\${pathname.slice(prefix.length)}\` : null;
  } catch {
    return null;
  }
}

function licenseFamily(value) {
  const license = cleanHtml(value).toLowerCase().replace(/_/g, ' ');
  if (license.includes('cc0') || license.includes('cc zero')) return 'cc0';
  const bySa = license.match(/cc(?: |-)by(?: |-)?sa(?: |-|_)*(\d+(?:\.\d+)?)/i);
  if (bySa) return \`cc-by-sa-\${bySa[1]}\`;
  const by = license.match(/cc(?: |-)by(?: |-|_)*(\d+(?:\.\d+)?)/i);
  if (by) return \`cc-by-\${by[1]}\`;
  if (license.includes('public domain')) return 'public-domain';
  return license;
}

async function fetchCommonsMetadata(title) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.searchParams.set('action', 'query');
  api.searchParams.set('format', 'json');
  api.searchParams.set('formatversion', '2');
  api.searchParams.set('prop', 'imageinfo');
  api.searchParams.set('iiprop', 'extmetadata|mime|size');
  api.searchParams.set('titles', title);

  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(api, {
        signal: controller.signal,
        headers: { 'user-agent': 'TexasDefined-image-governance/1.0 (+https://texasdefined.com)' },
      });
      if (!response.ok) throw new Error(`Commons API returned HTTP ${response.status}`);
      const payload = await response.json();
      const page = payload?.query?.pages?.[0];
      const info = page?.imageinfo?.[0];
      if (!page || page.missing || !info) throw new Error(`Commons file missing: ${title}`);
      return info;
    } catch (error) {
      lastError = error;
      if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 750));
    } finally {
      clearTimeout(timeout);
    }
  }
  throw lastError;
}


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

for (const record of overrideRecords) {
  const sourcePage = fieldValue(record.block, 'sourcePage');
  const commonsTitle = commonsTitleFromSourcePage(sourcePage);
  if (!commonsTitle) continue;

  const declaredLicense = fieldValue(record.block, 'licenseName');
  try {
    const info = await fetchCommonsMetadata(commonsTitle);
    const metadata = info.extmetadata ?? {};
    const actualLicense = cleanHtml(metadata.LicenseShortName?.value || metadata.UsageTerms?.value);
    const declaredFamily = licenseFamily(declaredLicense);
    const actualFamily = licenseFamily(actualLicense);
    if (!actualFamily || !/^(?:cc0|cc-by(?:-sa)?-\\d+(?:\\.\\d+)?|public-domain)$/.test(actualFamily)) {
      failures.push(`${record.slug}: Commons metadata does not expose a commercially reusable license for ${commonsTitle}: ${actualLicense || '(missing)'}.`);
    } else if (declaredFamily !== actualFamily) {
      failures.push(`${record.slug}: declared license ${declaredLicense} does not match Commons metadata ${actualLicense} for ${commonsTitle}.`);
    }
  } catch (error) {
    failures.push(`${record.slug}: Commons license metadata could not be verified for ${commonsTitle}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error('Curated sports venue source validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Curated sports venue sources validated: ${localImageUrls.length} local image assets present, ${urls.length} remote URLs reachable, and Commons override license metadata matches the declared commercial-reuse license family.`);
