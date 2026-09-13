import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();
const ORIGIN = (process.env.RV_PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const IMAGE_SOURCE_PATH = path.join(ROOT, 'src/data/rv-parks/images.server.ts');
const ARTIFACT_PATH = path.join(ROOT, '.artifacts/rv-production-images.json');
const EXPECTED_SEED_COUNT = 250;
const PAGE_CONCURRENCY = 10;
const ASSET_CONCURRENCY = 12;

function parseImageEntries(source) {
  const lines = source.split(/\r?\n/);
  const entries = [];

  for (let i = 0; i < lines.length; i += 1) {
    const start = lines[i].match(/^\s{2}(['"])([^'"]+)\1:\s*\{\s*$/);
    if (!start) continue;

    const slug = start[2];
    const body = [];
    i += 1;
    while (i < lines.length && !/^\s{2}\},?\s*$/.test(lines[i])) {
      body.push(lines[i]);
      i += 1;
    }

    const block = body.join('\n');
    const localSrc = block.match(/^\s{4}src:\s*(['"])(\/images\/rv-parks\/[^'"]+\.jpg)\1,?\s*$/m)?.[2] ?? null;
    const commonsFile = block.match(/^\s{4}src:\s*commons\((['"])(.*?)\1\),?\s*$/m)?.[2] ?? null;
    const generatedRepresentative = /sourceKind:\s*(['"])generated-representative\1/.test(block);
    const actualLocationFalse = /actualLocation:\s*false/.test(block);
    const representativeScope = /subjectScope:\s*(['"])representative\1/.test(block);

    if (!localSrc && !commonsFile) {
      throw new Error(`RV hero entry ${slug} does not expose a supported local or Commons src.`);
    }
    if (generatedRepresentative && (!actualLocationFalse || !representativeScope)) {
      throw new Error(`Generated RV hero ${slug} is missing representative/non-documentary metadata.`);
    }

    entries.push({ slug, localSrc, commonsFile, generatedRepresentative });
  }

  return entries;
}

function parseAuditClassifications() {
  const output = execFileSync(process.execPath, ['scripts/data/audit-rv-inventory-classification.mjs'], {
    cwd: ROOT,
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 20 * 1024 * 1024,
  });
  const lines = output.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => line.startsWith('slug\tdisposition\trobots\tpriority\tcounty\tname\tblockers'));
  if (headerIndex < 0) throw new Error('RV inventory audit did not emit its classification table.');

  const rows = new Map();
  for (const line of lines.slice(headerIndex + 1)) {
    if (!line.trim()) continue;
    const [slug, disposition, robots, priority, county, name, ...blockerParts] = line.split('\t');
    if (!slug || !disposition || !robots) continue;
    rows.set(slug, {
      slug,
      disposition,
      robots,
      priority,
      county,
      name,
      blockers: blockerParts.join('\t'),
    });
  }
  return rows;
}

function pageHasNoindex(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.some((tag) => /name=["']robots["']/i.test(tag) && /content=["'][^"']*noindex/i.test(tag));
}

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(url, {
        ...options,
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'user-agent': 'TexasDefined-RV-Production-Certifier/1.0',
          'cache-control': 'no-cache',
          ...(options.headers || {}),
        },
      });
      clearTimeout(timeout);
      if ((response.status >= 500 || response.status === 429) && attempt < attempts) {
        await response.arrayBuffer().catch(() => {});
        await new Promise((resolve) => setTimeout(resolve, attempt * 750));
        continue;
      }
      return response;
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;
      if (attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  throw lastError ?? new Error(`Unable to fetch ${url}`);
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) return;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

const imageSource = fs.readFileSync(IMAGE_SOURCE_PATH, 'utf8');
const entries = parseImageEntries(imageSource);
if (entries.length !== EXPECTED_SEED_COUNT) {
  throw new Error(`Expected ${EXPECTED_SEED_COUNT} governed RV hero entries, found ${entries.length}.`);
}

const duplicateSlugs = entries.filter((entry, index) => entries.findIndex((candidate) => candidate.slug === entry.slug) !== index);
if (duplicateSlugs.length) {
  throw new Error(`Duplicate RV image slugs: ${duplicateSlugs.map((entry) => entry.slug).join(', ')}`);
}

const audit = parseAuditClassifications();
if (audit.size !== EXPECTED_SEED_COUNT) {
  throw new Error(`Expected ${EXPECTED_SEED_COUNT} RV audit classifications, found ${audit.size}.`);
}

fs.mkdirSync(path.dirname(ARTIFACT_PATH), { recursive: true });
const failures = [];
const pageResults = await mapLimit(entries, PAGE_CONCURRENCY, async (entry) => {
  const pageUrl = new URL(`/destination/${entry.slug}`, ORIGIN);
  pageUrl.searchParams.set('rv-image-smoke', Date.now().toString());

  try {
    const response = await fetchWithRetry(pageUrl);
    const html = await response.text();
    const classification = audit.get(entry.slug);
    const result = {
      slug: entry.slug,
      status: response.status,
      localSrc: entry.localSrc,
      commonsFile: entry.commonsFile,
      generatedRepresentative: entry.generatedRepresentative,
      robotsExpected: classification?.robots ?? null,
      noindexObserved: pageHasNoindex(html),
      placeholderObserved: html.includes('destination-photo.jpg'),
      expectedHeroObserved: false,
      representativeLabelObserved: !entry.generatedRepresentative,
    };

    if (entry.localSrc) {
      result.expectedHeroObserved = html.includes(entry.localSrc);
    } else if (entry.commonsFile) {
      const expectedCommonsSrc = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(entry.commonsFile)}`;
      result.expectedHeroObserved = html.includes(expectedCommonsSrc) || html.includes('commons.wikimedia.org/wiki/Special:Redirect/file/');
    }
    if (entry.generatedRepresentative) {
      result.representativeLabelObserved = html.includes('AI-generated representative editorial image');
    }

    if (response.status !== 200) failures.push(`${entry.slug}: destination returned HTTP ${response.status}`);
    if (result.placeholderObserved) failures.push(`${entry.slug}: live page still contains destination-photo.jpg`);
    if (!result.expectedHeroObserved) failures.push(`${entry.slug}: governed hero source is not present in live HTML`);
    if (!result.representativeLabelObserved) failures.push(`${entry.slug}: generated representative image is not labeled as representative AI imagery`);
    if (classification?.robots === 'NOINDEX' && !result.noindexObserved) {
      failures.push(`${entry.slug}: audit requires NOINDEX but live page lacks a robots noindex directive`);
    }

    return result;
  } catch (error) {
    failures.push(`${entry.slug}: live destination fetch failed: ${error instanceof Error ? error.message : String(error)}`);
    return { slug: entry.slug, fetchError: error instanceof Error ? error.message : String(error) };
  }
});

const localEntries = entries.filter((entry) => entry.localSrc);
const assetResults = await mapLimit(localEntries, ASSET_CONCURRENCY, async (entry) => {
  const assetUrl = new URL(entry.localSrc, ORIGIN);
  assetUrl.searchParams.set('rv-image-smoke', Date.now().toString());
  try {
    let response = await fetchWithRetry(assetUrl, { method: 'HEAD' });
    if (!response.ok || !(response.headers.get('content-type') || '').toLowerCase().startsWith('image/')) {
      response = await fetchWithRetry(assetUrl, { method: 'GET', headers: { range: 'bytes=0-1023' } });
      await response.arrayBuffer();
    }
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok) failures.push(`${entry.slug}: image asset returned HTTP ${response.status}`);
    if (!contentType.toLowerCase().startsWith('image/')) failures.push(`${entry.slug}: image asset returned content-type ${contentType || 'missing'}`);
    return { slug: entry.slug, status: response.status, contentType };
  } catch (error) {
    failures.push(`${entry.slug}: image asset fetch failed: ${error instanceof Error ? error.message : String(error)}`);
    return { slug: entry.slug, fetchError: error instanceof Error ? error.message : String(error) };
  }
});

const generatedCount = entries.filter((entry) => entry.generatedRepresentative).length;
const noindexRequired = [...audit.values()].filter((record) => record.robots === 'NOINDEX').length;
const artifact = {
  checkedAt: new Date().toISOString(),
  origin: ORIGIN,
  governedEntries: entries.length,
  localImageEntries: localEntries.length,
  remoteCommonsEntries: entries.length - localEntries.length,
  generatedRepresentativeEntries: generatedCount,
  noindexRequired,
  pageChecks: pageResults.length,
  assetChecks: assetResults.length,
  failures,
  pageResults,
  assetResults,
};
fs.writeFileSync(ARTIFACT_PATH, `${JSON.stringify(artifact, null, 2)}\n`);

console.log(`RV production image certification: ${entries.length} pages, ${localEntries.length} local assets, ${generatedCount} representative AI heroes, ${noindexRequired} NOINDEX-required records.`);
if (failures.length) {
  console.error(`RV production image certification failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 100)) console.error(`- ${failure}`);
  if (failures.length > 100) console.error(`- ...and ${failures.length - 100} more`);
  process.exit(1);
}

console.log('RV production image certification passed: all governed pages are live without the destination placeholder, all local hero assets resolve as images, generated representatives are labeled, and NOINDEX requirements remain enforced.');
