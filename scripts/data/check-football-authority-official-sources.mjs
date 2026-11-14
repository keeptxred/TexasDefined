#!/usr/bin/env node
// Safe official-source availability and change monitor for TexasDefined football.
// Verifies URL reachability and source content fingerprints only. NEVER deduces
// scores, standings, coaching changes, ticket availability or publishing rights.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CONFIG_PATH = 'docs/football-authority/official-source-watch.json';
export const REPORT_PATH = process.env.FOOTBALL_SOURCE_REVIEW_REPORT || 'artifacts/football-source-watch/report.json';
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isDue(date, today) {
  if (!DATE.test(date) || !DATE.test(today)) throw Error('Invalid ISO date');
  const parsed = Date.parse(date + 'T00:00:00Z');
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString().slice(0,10) !== date)
    throw Error('Invalid calendar date: ' + date);
  return date <= today;
}

export function normalizeVisibleText(html) {
  return html.replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/\s+/g, ' ').trim().slice(0, 180000);
}

export function validateLedger(data, registry, today) {
  assert.equal(data.schemaVersion, 1);
  assert.ok(Array.isArray(data.sources) && data.sources.length >= 10 && data.sources.length <= 1500);
  assert.ok(Number.isInteger(data.nextSourceIndex) && data.nextSourceIndex >= 0 && data.nextSourceIndex < data.sources.length,
    'Rotating football review cursor must reference a real source');
  assert.ok(Number.isInteger(data.safety.perRunSourceCap) && data.safety.perRunSourceCap >= 1 && data.safety.perRunSourceCap <= 25,
    'Never check more than 25 official sources in one scheduled run');
  assert.ok(data.sources.length <= data.safety.sourceCountCap);
  assert.ok(data.safety.perSourceTimeoutMs >= 1000 && data.safety.perSourceTimeoutMs <= 15000);
  assert.ok(data.safety.maxBodyBytes >= 50000 && data.safety.maxBodyBytes <= 2000000);
  const allowed = new Set(data.safety.approvedDomains);
  assert.ok(allowed.size >= 3 && [...allowed].every(h => /^[a-z0-9.-]+$/.test(h)));
  const names = new Set();
  const registryNames = new Set(registry.schoolRecords.map(s => s.slug));
  for (const row of data.sources) {
    assert.ok(typeof row.slug === 'string' && !names.has(row.slug), 'Unique source ID');
    names.add(row.slug);
    assert.ok(registryNames.has(row.slug) || row.slug === 'uil-2026-alignment', 'Canonical researched school only');
    assert.ok(typeof row.url === 'string' && row.url.startsWith('https://'));
    const url = new URL(row.url);
    assert.ok(allowed.has(url.hostname) && !url.username && !url.password && !url.hash, 'Explicitly authorized official host only');
    isDue(row.reviewAfter, today);
    assert.ok(row.contentFingerprint === null || /^[a-f0-9]{64}$/.test(row.contentFingerprint));
    assert.ok(row.lastObservedAt === null || DATE.test(row.lastObservedAt));
  }
  return names.size;
}

// Deterministic persistent rolling source selection: after a successful run,
// the protected fingerprint PR moves nextSourceIndex forward. No entire-site
// crawl, no Cloudflare Worker schedule and no unbounded background scanning.
export function selectSourceCohort(data) {
  const start = data.nextSourceIndex;
  const count = Math.min(data.safety.perRunSourceCap, data.sources.length);
  return Array.from({ length: count }, (_, offset) => data.sources[(start + offset) % data.sources.length]);
}

export async function probeSource(row, opts) {
  const { allowed, timeoutMs, maxBytes } = opts;
  // Validate every hop BEFORE requesting it. redirect:'follow' would first
  // fetch an off-allowlist URL and only then reveal the final hostname.
  let nextUrl = new URL(row.url);
  let res;
  for (let hop = 0; hop <= 4; hop++) {
    if (nextUrl.protocol !== 'https:' || !allowed.has(nextUrl.hostname) ||
        nextUrl.username || nextUrl.password || nextUrl.hash || nextUrl.port)
      throw Error('Source redirected to an unauthorized official host or URL');
    res = await fetch(nextUrl, {
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs),
      headers: { 'Accept': 'text/html,application/pdf;q=0.8', 'User-Agent': 'TexasDefinedOfficialSourceMonitor/1.0 (+https://texasdefined.com/)' },
    });
    if (![301,302,303,307,308].includes(res.status)) break;
    const location = res.headers.get('location');
    if (!location) throw Error('Official source redirect missing Location');
    if (hop === 4) throw Error('Official source exceeds four allowed redirects');
    const destination = new URL(location, nextUrl);
    await res.body?.cancel();
    nextUrl = destination;
  }
  const finalUrl = new URL(res.url || nextUrl.href);
  if (!allowed.has(finalUrl.hostname) || finalUrl.protocol !== 'https:')
    throw Error('Source unexpectedly served from outside an approved official domain');
  if (!res.ok) throw Error('Official source HTTP ' + res.status);
  const contentType = (res.headers.get('content-type') || '').toLowerCase();
  if (!(contentType.includes('html') || contentType.includes('pdf') || contentType.includes('text/')))
    throw Error('Unrecognized official source content type: ' + contentType.slice(0,70));
  const reader = res.body?.getReader();
  if (!reader) throw Error('Source response body unavailable');
  const parts = []; let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) throw Error('Source exceeds limited monitoring size');
      parts.push(Buffer.from(value));
    }
  } finally { reader.releaseLock(); }
  const data = Buffer.concat(parts);
  if (data.length < 80) throw Error('Source body is too small to verify');
  const content = contentType.includes('pdf') ? data : Buffer.from(normalizeVisibleText(data.toString('utf8')));
  if (content.length < 80) throw Error('Visible source text is too short for stable fingerprint');
  return { fingerprint: createHash('sha256').update(content).digest('hex'),
    httpStatus: res.status, finalUrl: res.url, contentType: contentType.split(';')[0], bytes: data.length };
}

async function main() {
  const today = new Date().toISOString().slice(0,10);
  const ledger = JSON.parse(await readFile(CONFIG_PATH, 'utf8'));
  const registry = JSON.parse(await readFile('docs/football-authority/REGISTRY.json','utf8'));
  validateLedger(ledger,registry,today);
  if (process.argv.includes('--validate')) {
    console.log('Football official-source watch validation passed: ' + ledger.sources.length + ' bounded first-party/UIL URLs.');
    return;
  }
  if (!process.argv.includes('--probe')) throw Error('Pass --validate or --probe (explicit network opt-in)');
  const selected = selectSourceCohort(ledger);
  const startingIndex = ledger.nextSourceIndex;
  const summary = { checkedAt: today, sourceCount: ledger.sources.length,
    checkedSourceCount: selected.length, startingIndex, nextSourceIndex: null,
    baselineInitialized:[],
    sourceChanges:[], reviewDue:[], failures:[], unchanged:[], policy:
    'Hashes and HTTP availability are not verified score results, coaching changes or permission to reuse source text.' };
  const allowed = new Set(ledger.safety.approvedDomains);
  let dirty = false;
  // Serial bounded requests: no broad search or site-wide crawl.
  for (const row of selected) {
    if (isDue(row.reviewAfter,today)) summary.reviewDue.push({slug:row.slug,reviewAfter:row.reviewAfter,url:row.url});
    try {
      const observed = await probeSource(row,{
        allowed, timeoutMs:ledger.safety.perSourceTimeoutMs, maxBytes:ledger.safety.maxBodyBytes
      });
      if (!row.contentFingerprint) {
        row.contentFingerprint = observed.fingerprint;
        row.lastObservedAt = today;
        dirty = true;
        summary.baselineInitialized.push({slug:row.slug,url:row.url});
      } else if (row.contentFingerprint !== observed.fingerprint) {
        summary.sourceChanges.push({slug:row.slug,url:row.url,
          message:'Source document changed; editorial facts and dates need independent human/source review. Do not automatically copy scores.'});
        row.contentFingerprint = observed.fingerprint;
        row.lastObservedAt = today;
        dirty = true;
      } else summary.unchanged.push(row.slug);
    } catch(error) {
      summary.failures.push({slug:row.slug,url:row.url,
        error:String(error?.message||error).slice(0,180)});
    }
  }
  const nextIndex = (startingIndex + selected.length) % ledger.sources.length;
  summary.nextSourceIndex = nextIndex;
  if (nextIndex !== startingIndex) {
    ledger.nextSourceIndex = nextIndex;
    dirty = true;
  }
  if (dirty) await writeFile(CONFIG_PATH,JSON.stringify(ledger,null,2)+'\n');
  await mkdir(dirname(REPORT_PATH),{recursive:true});
  await writeFile(REPORT_PATH,JSON.stringify(summary,null,2)+'\n');
  console.log('Football official source freshness',JSON.stringify({
    sources:summary.sourceCount, checked:summary.checkedSourceCount,
    nextCursor:summary.nextSourceIndex, initialized:summary.baselineInitialized.length,
    changes:summary.sourceChanges.length, due:summary.reviewDue.length,
    inaccessible:summary.failures.length, ledgerChanged:dirty }));
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(e => {console.error('Football official source monitor failed:',e);process.exitCode=1;});
}
