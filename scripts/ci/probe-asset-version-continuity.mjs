import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export const CANARIES = [
  '/texas-high-school-football-teams/shepherd',
  '/property-tax/taxing-unit/oak-point-wcid-2',
];
const ARTIFACT_DIR = '.artifacts';
const PRE = ARTIFACT_DIR + '/asset-continuity-before.json';
const POST = ARTIFACT_DIR + '/asset-continuity-after.json';
const USER_AGENT = 'TexasDefined-Asset-Continuity-Probe/1.0';
const ORIGIN = (process.env.ASSET_CONTINUITY_ORIGIN || 'https://texasdefined.com').replace(/\/+$/, '');
const MAX_HTML_ASSETS = 5;
const MAX_EXTRA_ASSETS = 4;

export function extractAssetPaths(html) {
  const regex = /(?:https:\/\/(?:www\.)?texasdefined\.com)?\/assets\/[A-Za-z0-9._/-]+\.(?:js|css)(?:\?[^"'<>\s\\]*)?/g;
  return [...new Set([...String(html).matchAll(regex)]
    .map((match) => match[0].replace(/^https:\/\/(?:www\.)?texasdefined\.com/, '').split('?')[0]))];
}

export function selectCanaryAssets(paths, limit = MAX_HTML_ASSETS) {
  const score = (item) => /texas-high-school-football|property-tax\.taxing-unit/.test(item)
    ? 0 : /\/main-/.test(item) ? 1 : /\.css$/.test(item) ? 2 : 3;
  return [...new Set(paths)].sort((a, b) => score(a) - score(b) || a.localeCompare(b)).slice(0, limit);
}

export function findTransitions(before, after) {
  const current = new Map(after.map((item) => [item.path, item]));
  return before
    .filter((item) => item.status === 200 && current.has(item.path))
    .filter((item) => current.get(item.path).status !== 200)
    .map((item) => ({
      path: item.path,
      beforeStatus: item.status,
      afterStatus: current.get(item.path).status,
      beforeRay: item.cfRay || null,
      afterRay: current.get(item.path).cfRay || null,
    }));
}

export function selectBuiltAssets(files) {
  const patterns = [
    /^main-[A-Za-z0-9_-]+\.js$/,
    /^styles-[A-Za-z0-9_-]+\.css$/,
    /^texas-high-school-football-teams_\._slug\.lazy-[A-Za-z0-9_-]+\.js$/,
    /^property-tax\.taxing-unit\._unit-[A-Za-z0-9_-]+\.js$/,
  ];
  return patterns.flatMap((pattern) => files.filter((file) => pattern.test(file)).sort().slice(0, 1))
    .slice(0, MAX_EXTRA_ASSETS).map((file) => '/assets/' + file);
}

async function observedResponse(url) {
  try {
    const response = await fetch(url, {
      redirect: 'manual', cache: 'no-store',
      headers: { 'user-agent': USER_AGENT, accept: '*/*' },
      signal: AbortSignal.timeout(15000),
    });
    const body = Buffer.from(await response.arrayBuffer());
    const meta = {
      status: response.status,
      contentType: response.headers.get('content-type') || '',
      cfRay: response.headers.get('cf-ray') || '',
      cfCacheStatus: response.headers.get('cf-cache-status') || '',
      workerVersion: response.headers.get('x-texasdefined-worker-version') || '',
      bytes: body.length,
      sha256: createHash('sha256').update(body).digest('hex'),
      challenge: response.headers.get('cf-mitigated') === 'challenge',
    };
    return { meta, body };
  } catch (error) {
    return {
      meta: { status: 0, error: error instanceof Error ? error.message : String(error) },
      body: Buffer.alloc(0),
    };
  }
}

async function probePage(pagePath) {
  const { meta, body } = await observedResponse(ORIGIN + pagePath);
  const references = meta.status === 200 ? selectCanaryAssets(extractAssetPaths(body.toString('utf8'))) : [];
  return { path: pagePath, ...meta, references };
}

async function probeAsset(assetPath) {
  const { meta } = await observedResponse(ORIGIN + assetPath);
  return { path: assetPath, ...meta };
}

function validAsset(item) {
  const expected = item.path.endsWith('.css') ? 'text/css' : /(?:javascript|ecmascript)/i;
  return item.status === 200 && !item.challenge
    && (typeof expected === 'string'
      ? (item.contentType || '').toLowerCase().includes(expected)
      : expected.test(item.contentType || ''));
}

export async function runProbe(phase) {
  if (!['before', 'after'].includes(phase)) throw new Error('Expected before or after phase');
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const pages = await Promise.all(CANARIES.map(probePage));
  const pageReferences = [...new Set(pages.flatMap((page) => page.references))];
  let previous = null;
  let newlyBuilt = [];
  if (phase === 'after') {
    try { previous = JSON.parse(await readFile(PRE, 'utf8')); } catch {}
    try { newlyBuilt = selectBuiltAssets(await readdir('dist/client/assets')); } catch {}
  }
  const previousPaths = previous?.assets?.filter((item) => item.status === 200).map((item) => item.path) || [];
  const paths = [...new Set([...pageReferences, ...previousPaths, ...newlyBuilt])];
  const assets = await Promise.all(paths.map(probeAsset));
  const transitions = previous ? findTransitions(previous.assets || [], assets) : [];
  const missingFresh = assets.filter((item) => [...pageReferences, ...newlyBuilt].includes(item.path) && !validAsset(item))
    .map((item) => ({ path: item.path, status: item.status, contentType: item.contentType, cfRay: item.cfRay, error: item.error }));
  const report = {
    phase, observedAt: new Date().toISOString(), origin: ORIGIN,
    releaseSha: process.env.GITHUB_SHA || null,
    source: 'read-only HTTP probes; GitHub-hosted runner, not verified Googlebot',
    pages, assets, newlyBuilt, transitions, missingFresh,
    previousAvailable: Boolean(previous),
    beforeVerifiedReferenceCount: previous?.assets?.filter((item) => item.status === 200).length ?? null,
    inspected: { pages: pages.length, assets: assets.length },
  };
  const file = phase === 'before' ? PRE : POST;
  await writeFile(file, JSON.stringify(report, null, 2) + '\n');
  console.log('[asset-continuity] ' + phase + ': ' + JSON.stringify({
    pages: pages.map((p) => [p.path, p.status, p.workerVersion]),
    references: pageReferences.length, builtAssets: newlyBuilt.length,
    checked: assets.length, previouslyWorkingNowFailed: transitions,
    missingCurrentAssets: missingFresh, artifact: file,
  }));
  if (transitions.length || missingFresh.length) {
    console.warn('::warning title=Asset continuity failures::Review ' + file + ' before attributing missing chunks to a deployment.');
  }
  if (phase === 'after' && (!previous || !previousPaths.length)) {
    console.warn('::warning title=Old-asset transition not testable::No previously successful referenced asset was captured; no disappearance claim is justified.');
  }
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runProbe(process.argv[2]).catch((error) => {
    console.error('[asset-continuity] probe failed:', error);
    process.exitCode = 1;
  });
}
