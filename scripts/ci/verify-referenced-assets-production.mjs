// Bounded asset handoff for the canonical GitHub production workflow.
// Capture old HTML-referenced hashes BEFORE a deploy, then verify old+new assets
// AFTER the SAME deployment. Carry the most recent older snapshot forward once
// to test that hashes survive two successive regular production replacements.
// No Cloudflare writes, caching changes, new publisher, or sitewide crawl.
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CANONICAL = 'https://texasdefined.com';
const DIRECT = 'https://texasdefined-site.freddy-coppola.workers.dev';
const PAGES = ['/', '/property-tax/taxing-unit/ennis-isd', '/property-tax/taxing-unit/yoakum-hospital-district', '/texas-high-school-football-teams/shepherd'];
const SNAPSHOT = '.artifacts/asset-handoff-snapshot.json';
const PRIOR = '.artifacts/prior-asset-handoff.json';
const REPORT = '.artifacts/asset-delivery-report.json';
const LIMIT_PER_PAGE = 80;
// Two historic snapshots, the current build's dynamic route chunks, and
// previously proven HTTP-200 retained hashes can exceed the original 250.
// This remains a hard cap PER origin, not a sampling limit or a skipped cohort.
// Every entry below the cap is checked on BOTH public origins.
export const MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN = 512;
export function assertBoundedCrossReleaseSet(assets) {
  if (!(assets instanceof Map)) throw new Error('Cross-release verification set must be a Map');
  if (assets.size > MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN) {
    throw new Error('Cross-release asset verification cap exceeded: ' + assets.size +
      ' > ' + MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN + '; inspect retained-asset history, do not truncate');
  }
  return assets.size;
}
const REQUEST_TIMEOUT = 20000;
// A 1,431-old-hash release previously spent its live acceptance audit doing
// 1,500 HTTP checks sequentially, then timed out on canonical HTML. Preserve
// EVERY original SHA check on both origins but use bounded 6-way concurrency.
export const MAX_ASSET_AUDIT_CONCURRENCY = 6;
export async function mapBounded(items, concurrency, visit) {
  if (!Array.isArray(items) || !Number.isSafeInteger(concurrency) ||
      concurrency < 1 || concurrency > 8 || typeof visit !== 'function')
    throw new Error('Invalid bounded original-byte asset audit work queue');
  const result = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({length:Math.min(concurrency,items.length)},async()=>{
    while (true) {
      const index=cursor++;
      if (index>=items.length) return;
      result[index]=await visit(items[index],index);
    }
  }));
  return result;
}

// One more attempt is permitted ONLY for a transport timeout or connection
// reset; never retry or reinterpret HTTP 404/500, wrong Worker version, wrong
// MIME, missing bytes, SHA mismatch or a Cloudflare challenge as successful.
export async function retryOneTransportTimeout(action, pause=ms=>new Promise(done=>setTimeout(done,ms))) {
  try { return await action(); }
  catch (error) {
    const name=String(error?.name || '');
    const code=String(error?.cause?.code || '');
    if (!['TimeoutError','AbortError'].includes(name) &&
        !['ETIMEDOUT','ECONNRESET','EAI_AGAIN'].includes(code)) throw error;
    await pause(250);
    return await action();
  }
}

// Route-specific lazy chunks were observed returning 404 to verified Googlebot.
// HTML <script>/<link> parsing alone cannot discover them: Vite references
// these hashes from dynamic import expressions. Read only two exact bundle
// canaries from the already-built client output, never crawl the whole site.
const REQUIRED_BUILT_ROUTE_PATTERNS = [
  /^texas-high-school-football-teams_\._slug\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^property-tax\.taxing-unit\._unit-[A-Za-z0-9_-]+\.js$/,
];
// The old Googlebot 404s also included main/Container/styles/Header/Footer/
// RouteStatusScreens/icon imports that are not always in server-rendered HTML.
// Keep optional names if actually emitted; never invent a filename.
const OPTIONAL_BUILT_CHUNK_PATTERNS = [
  /^main-[A-Za-z0-9_-]+\.js$/,
  /^Container-[A-Za-z0-9_-]+\.js$/,
  /^styles-[A-Za-z0-9_-]+\.css$/,
  /^Header-[A-Za-z0-9_-]+\.js$/,
  /^Footer-[A-Za-z0-9_-]+\.js$/,
  /^RouteStatusScreens-[A-Za-z0-9_-]+\.js$/,
  /^x-[A-Za-z0-9_-]+\.js$/,
  // Verified Microsoft search crawler (ASN 8075) 404s also hit stale event and food lazy-route chunks.
  // Optional in the current build; if emitted, carry into the old-hash handoff.
  /^events\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^events\._collection\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^food\._slug\.lazy-[A-Za-z0-9_-]+\.js$/,
  // Additional Oct 24–31 observed 404 families: major content routes.
  /^article\._slug-[A-Za-z0-9_-]+\.js$/,
  /^destination\._slug-[A-Za-z0-9_-]+\.js$/,
  /^events\.index\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^explore\.index\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^search\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^fishing\.lakes\._slug-[A-Za-z0-9_-]+\.js$/,
  /^texas-high-school-football-playoff-brackets-[A-Za-z0-9_-]+\.js$/,
  /^MuseumAuthorityNetworkSection-[A-Za-z0-9_-]+\.js$/,
  /^museum-authority-heroes-[A-Za-z0-9_-]+\.js$/,
  /^texas-data\.lazy-[A-Za-z0-9_-]+\.js$/,
  // Exact module families observed missing after Oct31 asset handoff on
  // existing football-team and district HTML. Capture only real emitted Vite
  // names; retain only when prior HTTP200+SHA256 provenance exists.
  /^texas-high-school-football-districts_\._slug\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^texas-high-school-football-districts\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^useLocation-[A-Za-z0-9_-]+\.js$/,
  /^SponsoredSportsPlacement-[A-Za-z0-9_-]+\.js$/,
  /^createLucideIcon-[A-Za-z0-9_-]+\.js$/,
  /^ContextualOfficialSources-[A-Za-z0-9_-]+\.js$/,
  /^CitationTrustPanel-[A-Za-z0-9_-]+\.js$/,
  /^CitationCollectionTrustRouter-[A-Za-z0-9_-]+\.js$/,
  /^analytics-[A-Za-z0-9_-]+\.js$/,
  // Production-observed Meta/Bing imports, Nov 1-2 2026. Keep exact emitted names only.
  /^external-link-[A-Za-z0-9_-]+\.js$/,
  /^useBaseQuery-[A-Za-z0-9_-]+\.js$/,
  /^DestinationCard-[A-Za-z0-9_-]+\.js$/,
  /^PropertyCalculatorFramework-[A-Za-z0-9_-]+\.js$/,
  // Three exact JS module families logged HTTP404 for verified Bingbot after the Nov 2 release.
  // Capture only real Vite-built filenames; previous original bytes still require HTTP200/SHA.
  /^CountyTaxRateSection-[A-Za-z0-9_-]+\.js$/,
  /^PublishableGraphic-[A-Za-z0-9_-]+\.js$/,
  /^_kind\._slug\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^AnswerSummary-[A-Za-z0-9_-]+\.js$/,
  /^texas-home-insurance-calculator\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^useQuery-[A-Za-z0-9_-]+\.js$/,
  /^SectionHeader-[A-Za-z0-9_-]+\.js$/,
  /^FootballFanOffers-[A-Za-z0-9_-]+\.js$/,
  /^ElPasoAreaAuthority-[A-Za-z0-9_-]+\.js$/,
  /^internal-linking-[A-Za-z0-9_-]+\.js$/,
  /^ArticleCard-[A-Za-z0-9_-]+\.js$/,
  /^UnusualBusinessAuthorityPanel-[A-Za-z0-9_-]+\.js$/,
  /^ArticleBody-[A-Za-z0-9_-]+\.js$/,
  /^ParkingMapPanel-[A-Za-z0-9_-]+\.js$/,
  /^event\._slug\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^shop\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^shop\.product\._productId-[A-Za-z0-9_-]+\.js$/,
  /^historic-sites-[A-Za-z0-9_-]+\.js$/,
  /^museum-authority-network-[A-Za-z0-9_-]+\.js$/,
  /^DestinationVerifiedVisitorFacts-[A-Za-z0-9_-]+\.js$/,
  /^BookingCarRentalCard-[A-Za-z0-9_-]+\.js$/,
  /^DestinationViatorBooking-[A-Za-z0-9_-]+\.js$/,
  /^town-authority-links-[A-Za-z0-9_-]+\.js$/,
  /^CityPassContextualCallout-[A-Za-z0-9_-]+\.js$/,
  /^CityPassCalloutContent-[A-Za-z0-9_-]+\.js$/,
  /^TexasExplainedContextLinks-[A-Za-z0-9_-]+\.js$/,
  /^TexasEventCarousel-[A-Za-z0-9_-]+\.js$/,
  /^sports-traffic\.functions-[A-Za-z0-9_-]+\.js$/,
  // Actual Nov2 live search-crawler 404s in El Paso /explore/near road-trips.
  /^MapPreview-[A-Za-z0-9_-]+\.js$/,
  /^dallas-small-town-drives-[A-Za-z0-9_-]+\.js$/,
  /^explore\.near\._metro\._collection\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^explore\.near\._metro\.lazy-[A-Za-z0-9_-]+\.js$/,
  /^explore\.near\._metro\._collection-[A-Za-z0-9_-]+\.js$/,
  /^explore\.near\._metro-[A-Za-z0-9_-]+\.js$/,
];


export function selectBuiltRouteAssets(files) {
  function match(pattern, required) {
    // Vite may legitimately emit multiple differently hashed modules from the
    // same optional route family (observed article._slug: two emitted chunks).
    // Preserve each exact emitted filename; never guess or silently collapse
    // modules. Keep the required route canaries unique and fail closed above
    // a bounded family ceiling so the handoff cannot grow without limit.
    const matches = files.filter(file => pattern.test(file)).sort();
    const maxCount = required ? 1 : 8;
    if ((required && matches.length !== 1) || matches.length > maxCount ||
        new Set(matches).size !== matches.length) {
      throw new Error('Expected ' + (required ? 'exactly one' : 'at most eight distinct') +
        ' production client chunk(s) for ' + pattern + ', found ' + matches.length);
    }
    return matches.map(file => ({ path: '/assets/' + file,
      kind: file.endsWith('.css') ? 'css' : 'js', source: 'built-client-chunk' }));
  }
  return [
    ...REQUIRED_BUILT_ROUTE_PATTERNS.flatMap(pattern => match(pattern, true)),
    ...OPTIONAL_BUILT_CHUNK_PATTERNS.flatMap(pattern => match(pattern, false)),
  ];
}


function tagAttributes(tag) {
  const result = {};
  const expr = /([^\s"'=<>\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+)))?/g;
  for (const match of tag.matchAll(expr)) {
    const key = match[1].toLowerCase();
    result[key] = (match[2] ?? match[3] ?? match[4] ?? '').replace(/&amp;/gi, '&');
  }
  return result;
}

export function referencesFromHtml(html, base = CANONICAL) {
  const found = new Map();
  const origin = new URL(base).origin;
  const tags = html.match(/<(?:script|link)\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const attrs = tagAttributes(tag);
    const script = /^<script\b/i.test(tag);
    const rels = (attrs.rel || '').toLowerCase().split(/\s+/);
    const preload = rels.includes('modulepreload') || (rels.includes('preload') && /^(script|style)$/.test(attrs.as || ''));
    const stylesheet = rels.includes('stylesheet');
    const candidate = script ? attrs.src : (preload || stylesheet ? attrs.href : '');
    if (!candidate) continue;
    let url;
    try { url = new URL(candidate, base); } catch { continue; }
    if (url.origin !== origin || !/^\/assets\/[a-z0-9_./-]+\.(?:js|css)$/i.test(url.pathname)) continue;
    const kind = url.pathname.endsWith('.css') ? 'css' : 'js';
    if (script && kind !== 'js') continue;
    if (stylesheet && kind !== 'css') continue;
    found.set(url.pathname, { path: url.pathname, kind });
    if (found.size > LIMIT_PER_PAGE) throw new Error('Asset cap exceeded for ' + base);
  }
  return [...found.values()];
}

export function validAssetResponse(kind, response) {
  const mime = String(response.mime || '').toLowerCase().split(';')[0].trim();
  return response.status === 200
    && !response.challenge
    && response.bytes > 0
    && (kind === 'css' ? mime === 'text/css'
      : ['text/javascript', 'application/javascript', 'application/x-javascript', 'text/ecmascript', 'application/ecmascript'].includes(mime));
}

export function nextSnapshotHistory(prior, current) {
  const older = Array.isArray(prior?.snapshots) ? prior.snapshots.filter(x => x?.format === 1 && Array.isArray(x.pages)).slice(-1) : [];
  return { format: 1, snapshots: [...older, current] };
}

function label(origin) { return origin === CANONICAL ? 'canonical' : 'direct'; }
function probeUrl(origin, page) {
  const url = new URL(page, origin);
  url.searchParams.set('asset_handoff_verify', String(process.env.GITHUB_RUN_ID || 'manual') + '-' + Date.now());
  return url.toString();
}
async function get(url, opts = {}) {
  return fetch(url, { redirect: 'manual', cache: 'no-store',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    headers: { 'User-Agent': 'TexasDefined-Production-Asset-Handoff/1.0', ...opts.headers } });
}
async function retrieveHtml(origin, page) {
  const url=probeUrl(origin,page);
  const response = await retryOneTransportTimeout(() => get(url, {
    headers: { 'Cache-Control': 'no-cache, no-store, max-age=0' },
  }));
  const mime = (response.headers.get('content-type') || '').toLowerCase();
  if (response.status !== 200 || !mime.includes('text/html') || response.headers.get('cf-mitigated') === 'challenge') {
    throw new Error('HTML not usable on ' + label(origin) + page + ' (HTTP ' + response.status + ', ' + mime + ')');
  }
  const body = await response.text();
  const assets = referencesFromHtml(body, origin);
  if (!assets.some(x => x.kind === 'js')) {
    throw new Error('No versioned JS script/modulepreload found on ' + label(origin) + page + '; cannot certify');
  }
  return { path: page, version: response.headers.get('x-texasdefined-worker-version') || null,
    cacheControl: response.headers.get('cache-control') || null,
    cfRay: response.headers.get('cf-ray') || null,
    cfCacheStatus: response.headers.get('cf-cache-status') || null, assets };
}

async function retrieveAsset(origin, path, kind) {
  // The URL path is deliberately preserved without a cache-busting query:
  // this is the exact URL requested by an old document or Googlebot.
  const response = await get(origin + path);
  const body = await response.arrayBuffer();
  const record = {
    path, kind, origin: label(origin), status: response.status,
    mime: response.headers.get('content-type') || '',
    challenge: response.headers.get('cf-mitigated') === 'challenge',
    bytes: body.byteLength, cfRay: response.headers.get('cf-ray') || null,
    cfCacheStatus: response.headers.get('cf-cache-status') || null,
    etag: response.headers.get('etag') || null,
    sha256: response.status === 200 ? createHash('sha256').update(Buffer.from(body)).digest('hex') : null,
  };
  record.ok = validAssetResponse(kind, record);
  return record;
}
async function auditAssets(origin, assets) {
  // Stable indexed results, no sampling and no skipped candidates. Individual
  // timeouts become explicit failed records, not a silently shortened list.
  return mapBounded(assets,MAX_ASSET_AUDIT_CONCURRENCY,async ({path,kind})=>{
    try {return await retrieveAsset(origin,path,kind);}
    catch(error){return {path,kind,origin:label(origin),status:'network-error',ok:false,error:String(error)};}
  });
}
function uniqueAssets(pages) {
  const result = new Map();
  for (const page of pages) for (const asset of page.assets || []) result.set(asset.path, { path: asset.path, kind: asset.kind });
  return [...result.values()];
}
async function capture() {
  let prior = null;
  try {
    const raw = await readFile(PRIOR, 'utf8');
    // Some earlier failed-release artifacts end with the two literal bytes
    // backslash + n after otherwise complete JSON. Accept ONLY this exact
    // transport suffix; parse the full JSON and reject every other corruption.
    // Never discard snapshots or weaken the subsequent SHA/HTTP asset checks.
    try { prior = JSON.parse(raw); }
    catch (error) {
      if (!raw.endsWith('\\n')) throw error;
      prior = JSON.parse(raw.slice(0, -2));
      console.warn('Normalized one trailing literal \\n in restored asset history');
    }
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const pages = [];
  for (const page of PAGES) pages.push(await retrieveHtml(CANONICAL, page));
  // Upcoming release's route chunks are not necessarily present in the old
  // active Worker. Do not probe them as old assets. Record them so their
  // existence is checked on both origins immediately AFTER the deployment.
  const builtAssets = selectBuiltRouteAssets(await readdir('dist/client/assets'));
  const priorBuilt = prior?.snapshots?.at(-1)?.builtAssets || [];
  // The most recently deployed build is currently serving: probe its exact
  // lazily loaded hashes BEFORE replacement, so an old 200 -> new 404 is proof
  // of version-related disappearance, not a guessed stale URL.
  const legacyResponses = await auditAssets(CANONICAL, priorBuilt);
  const legacyAssets = priorBuilt.map(asset => {
    const observed = legacyResponses.find(item => item.path === asset.path);
    return { ...asset, wasAvailable: observed?.ok === true,
      preStatus: observed?.status ?? 'not-checked',
      preSha256: observed?.ok ? observed.sha256 : null };
  });
  const checked = await auditAssets(CANONICAL, uniqueAssets(pages));
  const statuses = new Map(checked.map(x => [x.path, x]));
  for (const page of pages) for (const asset of page.assets) {
    const initial = statuses.get(asset.path);
    asset.wasAvailable = initial?.ok === true;
    asset.preStatus = initial?.status ?? 'unknown';
    asset.preSha256 = initial?.ok ? initial.sha256 : null;
  }
  const current = { format: 1, capturedAt: new Date().toISOString(),
    sourceCommit: process.env.GITHUB_SHA || null, pages, builtAssets, legacyAssets };
  const snapshot = nextSnapshotHistory(prior, current);
  await mkdir('.artifacts', { recursive: true });
  await writeFile(SNAPSHOT, JSON.stringify(snapshot, null, 2) + '\n');
  const available = checked.filter(x => x.ok).length;
  console.log('Captured ' + pages.length + ' page HTML manifests, ' + available + '/' + checked.length
    + ' assets healthy before replacement; built lazy-route canaries=' + builtAssets.length
    + ', former lazy-route canaries=' + legacyAssets.length
    + ', retained ' + snapshot.snapshots.length + ' generations.');
  for (const row of checked.filter(x => !x.ok)) console.warn('PREEXISTING missing asset: ' + row.path + ' HTTP ' + row.status);
  for (const asset of legacyAssets.filter(x => !x.wasAvailable)) {
    console.warn('PREEXISTING old lazy-route chunk not available before deployment: ' + asset.path + ' HTTP ' + asset.preStatus);
  }
}

async function verify() {
  const saved = JSON.parse(await readFile(SNAPSHOT, 'utf8'));
  if (!Array.isArray(saved.snapshots) || !saved.snapshots.length) throw new Error('Predeploy asset snapshot missing');
  const expected = process.env.EXPECTED_DEPLOYED_WORKER_VERSION;
  if (!expected) throw new Error('EXPECTED_DEPLOYED_WORKER_VERSION is required for production verification');
  const histories = [];
  const inherited = new Map();
  const latest = saved.snapshots.at(-1);
  if (!Array.isArray(latest.builtAssets) || latest.builtAssets.length < REQUIRED_BUILT_ROUTE_PATTERNS.length ||
      !REQUIRED_BUILT_ROUTE_PATTERNS.every(pattern => latest.builtAssets.some(a => pattern.test(a.path.split('/').pop())))) {
    throw new Error('No complete built lazy-route canaries in predeploy snapshot; cannot certify');
  }
  const newBuilt = latest.builtAssets;
  for (const snapshot of saved.snapshots) {
    const available = [];
    for (const page of snapshot.pages) for (const asset of page.assets || []) {
      if (asset.wasAvailable === true) {
        inherited.set(asset.path, { path: asset.path, kind: asset.kind, preSha256: asset.preSha256 || null });
        available.push(asset.path);
      }
    }
    histories.push({ capturedAt: snapshot.capturedAt, sourceCommit: snapshot.sourceCommit,
      workerVersions: [...new Set(snapshot.pages.map(x => x.version).filter(Boolean))],
      availableCount: new Set(available).size, builtRouteAssets: snapshot.builtAssets?.map(x => x.path) || [] });
  }
  // Include only confirmed predeploy-200 former route chunks. A failed old
  // baseline is recorded separately and never mislabeled as a new 404.
  for (const a of latest.legacyAssets || []) {
    if (a.wasAvailable === true) inherited.set(a.path, { ...a });
  }
  // The outgoing Worker's old hash bytes were copied into the upcoming
  // dist/client bundle before Wrangler deployment. Make their continued
  // availability a hard live production gate, not a best-effort report.
  for (const asset of latest.retainedAssets || []) {
    if (asset.wasAvailable === true) inherited.set(asset.path, { ...asset });
  }
  const results = { format: 1, checkedAt: new Date().toISOString(), expected, histories,
    lazyRouteCanaries: newBuilt.map(x => x.path),
    preExistingLazyFailures: (latest.legacyAssets || []).filter(x => !x.wasAvailable)
      .map(x => ({ path: x.path, status: x.preStatus })),
    pages: [], assets: [], failures: [] };
  try {
    // Validate current Worker identity, cache policy and live HTML on BOTH
    // origins BEFORE the expensive all-hash audit. Never spend several
    // minutes proving one origin while the other is already unreachable.
    const witnessedOrigins=[];
    for (const origin of [DIRECT, CANONICAL]) {
      const currentPages = [];
      for (const page of PAGES) {
        const html = await retrieveHtml(origin, page);
        if (html.version !== expected) {
          throw new Error('Wrong active Worker version on ' + label(origin) + page + ': expected ' + expected + ', got ' + (html.version || 'missing'));
        }
        if ((page.startsWith('/property-tax/') || page.startsWith('/texas-high-school-football-teams/'))
          && !/(?:^|,)\s*no-store(?:,|$)/.test(html.cacheControl || '')) {
          throw new Error('SSR HTML cache policy permits stale hash references on ' + label(origin)
            + page + ': ' + (html.cacheControl || 'missing Cache-Control'));
        }
        currentPages.push(html);
      }
      results.pages.push({ origin: label(origin), pages: currentPages });
      witnessedOrigins.push({origin,currentPages});
    }
    for (const {origin,currentPages} of witnessedOrigins) {
      const combined = new Map();
      for (const a of uniqueAssets(currentPages)) combined.set(a.path, { ...a, sources: ['current-html'] });
      // Critical: dynamically imported football and property-tax route chunks
      // are required even if they have no <script> or <link> in server HTML.
      for (const a of newBuilt) {
        if (combined.has(a.path)) combined.get(a.path).sources.push('built-lazy-route');
        else combined.set(a.path, { ...a, sources: ['built-lazy-route'] });
      }
      for (const a of inherited.values()) {
        if (combined.has(a.path)) {
          combined.get(a.path).sources.push('old');
          combined.get(a.path).preSha256 = a.preSha256;
        } else combined.set(a.path, { ...a, sources: ['old'] });
      }
      // Bound each verification cohort, not the complete cross-release set.
      // Every exact asset is still audited on BOTH origins; never truncate.
      const allAssets = [...combined.values()];
      const cohortCount = Math.ceil(allAssets.length / MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN);
      console.log('[cross-release-asset-verify] origin=' + label(origin) +
        ' exactAssetCount=' + allAssets.length + ' cohorts=' + cohortCount +
        ' hardCapPerCohort=' + MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN + ' (no sampling)');
      for (let offset = 0; offset < allAssets.length; offset += MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN) {
       const cohort = new Map(allAssets.slice(offset, offset + MAX_CROSS_RELEASE_ASSETS_PER_ORIGIN).map(a => [a.path, a]));
       assertBoundedCrossReleaseSet(cohort);
       const cohortAssets=[...cohort.values()];
       const audited=await auditAssets(origin,cohortAssets);
       if (audited.length !== cohortAssets.length)
         throw new Error('Cross-release audit lost an original asset: '+label(origin));
       for (let index=0;index<cohortAssets.length;index++) {
        const a=cohortAssets[index],record=audited[index];
        if (!record || record.path !== a.path)
          throw new Error('Cross-release audit order or original path changed: '+a.path);
        record.sources = a.sources;
        record.oldHashMatches = !a.preSha256 || !record.ok || record.sha256 === a.preSha256;
        if (record.ok && a.preSha256 && !record.oldHashMatches) record.ok = false;
        results.assets.push(record);
        if (!record.ok) results.failures.push({ origin: label(origin), path: a.path, status: record.status,
          mime: record.mime || null, sources: a.sources, hashMismatch: record.oldHashMatches === false,
          cfRay: record.cfRay || null });
       }
      }
    }
  } catch (error) {
    results.failures.push({ fatal: String(error) });
  }
  await mkdir('.artifacts', { recursive: true });
  await writeFile(REPORT, JSON.stringify(results, null, 2) + '\n');
  console.log('Verified ' + results.assets.length + ' live asset responses across two public origins; failures=' + results.failures.length);
  if (results.failures.length) {
    for (const problem of results.failures.slice(0, 25)) console.error('::error title=Cross-release JS/CSS unavailable::' + JSON.stringify(problem));
    throw new Error('Live current/previous release JS/CSS verification failed; see ' + REPORT);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const mode = process.argv[2];
  if (mode === '--capture') await capture();
  else if (mode === '--verify') await verify();
  else throw new Error('Usage: node scripts/ci/verify-referenced-assets-production.mjs --capture|--verify');
}
