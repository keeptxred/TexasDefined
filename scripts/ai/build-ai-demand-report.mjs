import fs from 'node:fs';
import path from 'node:path';

import { classifyOfficialSources } from './official-source-registry.mjs';

const DATASET = 'texas_defined_ai_questions';
const OUTPUT_PATH = 'ops/ai/texas-defined-ai-demand.generated.json';
const WINDOW_DAYS = 14;
const CURRENT_DAYS = 7;
const MAX_ROWS = 5000;
const MIN_DISTINCT_QUESTIONS = 2;
const MIN_DEMAND_SCORE = 8;

const SAFE_FACETS = [
  ['rv park', ['rv', 'park']],
  ['campground', ['campground']],
  ['hotel', ['hotel']],
  ['lodging', ['lodging']],
  ['wedding venue', ['wedding', 'venue']],
  ['golf course', ['golf', 'course']],
  ['state park', ['state', 'park']],
  ['lake', ['lake']],
  ['river', ['river']],
  ['beach', ['beach']],
  ['school district', ['school', 'district']],
  ['isd', ['isd']],
  ['property tax', ['property', 'tax']],
  ['homestead exemption', ['homestead', 'exemption']],
  ['mud district', ['mud']],
  ['pid district', ['pid']],
  ['farm-to-market road', ['farm', 'market', 'road']],
  ['ranch-to-market road', ['ranch', 'market', 'road']],
  ['frontage road', ['frontage', 'road']],
  ['county seat', ['county', 'seat']],
  ['barbecue', ['barbecue']],
  ['barbecue', ['bbq']],
  ['kolache', ['kolache']],
  ['klobasnek', ['klobasnek']],
  ['event', ['event']],
  ['festival', ['festival']],
  ['fishing', ['fishing']],
  ['hunting', ['hunting']],
  ['hiking', ['hiking']],
  ['moving', ['moving']],
  ['retirement', ['retirement']],
  ['insurance', ['insurance']],
  ['mortgage', ['mortgage']],
  ['restaurant', ['restaurant']],
  ["Buc-ee's", ['buc', 'ee']],
  ['H-E-B', ['heb']],
];

const COMMERCIAL_FACETS = new Set([
  'rv park', 'campground', 'hotel', 'lodging', 'wedding venue', 'golf course',
  'moving', 'retirement', 'insurance', 'mortgage', 'restaurant', "Buc-ee's", 'H-E-B',
]);

const STOP_WORDS = new Set([
  'a', 'about', 'after', 'all', 'an', 'and', 'anything', 'are', 'around', 'at', 'be', 'best',
  'can', 'could', 'defined', 'do', 'does', 'for', 'from', 'get', 'give', 'good', 'have', 'help',
  'how', 'i', 'in', 'is', 'it', 'me', 'my', 'near', 'of', 'on', 'or', 'our', 'place', 'places',
  'please', 'should', 'show', 'tell', 'texas', 'that', 'the', 'their', 'there', 'this', 'to', 'want',
  'what', 'when', 'where', 'which', 'who', 'why', 'with', 'would', 'you', 'your', 'find',
]);

function fail(message) {
  console.error(`Texas Defined AI demand report: ${message}`);
  process.exit(1);
}

function parseTimestamp(value) {
  if (typeof value !== 'string' || !value) return null;
  const normalized = value.includes('T') ? value : `${value.replace(' ', 'T')}Z`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function tokenise(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/\[(?:email|phone|address)\]/g, ' ')
    .replace(/h-e-b/g, 'heb')
    .replace(/buc[-’']?ee['’]?s/g, 'buc ee')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}

function safeFacets(tokens) {
  const tokenSet = new Set(tokens);
  const facets = [];
  for (const [label, required] of SAFE_FACETS) {
    if (required.every((token) => tokenSet.has(token)) && !facets.includes(label)) facets.push(label);
  }
  return facets.slice(0, 4);
}

function recommendAssetType(categoryId, facets) {
  const set = new Set(facets);
  if (set.has('wedding venue') || set.has('rv park') || set.has('campground') || set.has('golf course') || set.has('hotel') || set.has('restaurant')) return 'directory-or-filter';
  if (set.has('moving') || set.has('retirement') || set.has('property tax') || set.has('school district') || set.has('isd')) return 'comparison-or-planner';
  if (set.has('event') || set.has('festival')) return 'event-discovery';
  if (set.has('lake') || set.has('river') || set.has('beach') || set.has('state park')) return 'guide-plus-structured-data';
  if (categoryId === 'laws-government' || categoryId === 'roads-transportation' || categoryId === 'food-culture' || categoryId === 'history-geography') return 'texas-explained-or-faq';
  return 'existing-page-improvement-or-guide';
}

function topSurface(rows) {
  const counts = new Map();
  for (const row of rows) {
    const title = typeof row.topTitle === 'string' ? row.topTitle.trim() : '';
    const href = typeof row.topHref === 'string' ? row.topHref.trim() : '';
    if (!title || !href.startsWith('/')) continue;
    const key = `${title}\u0000${href}`;
    const previous = counts.get(key) ?? { title, href, count: 0 };
    previous.count += Number(row.sampleInterval) || 1;
    counts.set(key, previous);
  }
  return [...counts.values()].sort((a, b) => b.count - a.count)[0] ?? null;
}

function round(value) {
  return Math.round(value * 100) / 100;
}

async function queryAnalytics(accountId, apiToken) {
  const sql = `SELECT
    timestamp,
    _sample_interval AS sampleInterval,
    index1 AS questionHash,
    blob1 AS sanitizedQuestion,
    blob2 AS coverage,
    blob3 AS outcome,
    blob4 AS topTitle,
    blob5 AS topHref,
    blob6 AS topKind,
    double2 AS topScore,
    double3 AS hitCount
  FROM ${DATASET}
  WHERE timestamp > NOW() - INTERVAL '${WINDOW_DAYS}' DAY
  ORDER BY timestamp DESC
  LIMIT ${MAX_ROWS}
  FORMAT JSON`;

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/analytics_engine/sql`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiToken}` },
    body: sql,
  });

  if (!response.ok) {
    if (response.status === 403) fail('Cloudflare Analytics Engine returned HTTP 403. The configured token needs Account Analytics Read permission.');
    fail(`Cloudflare Analytics Engine query failed with HTTP ${response.status}.`);
  }

  const payload = await response.json();
  if (!payload || !Array.isArray(payload.data)) fail('Cloudflare Analytics Engine returned an unexpected response shape.');
  return payload.data;
}

function buildReport(rows) {
  const now = Date.now();
  const currentBoundary = now - CURRENT_DAYS * 86_400_000;
  const clusters = new Map();
  let strong = 0;
  let partial = 0;
  let gap = 0;

  for (const row of rows) {
    const weight = Math.max(1, Number(row.sampleInterval) || 1);
    const coverage = ['strong', 'partial', 'gap'].includes(row.coverage) ? row.coverage : 'gap';
    if (coverage === 'strong') strong += weight;
    if (coverage === 'partial') partial += weight;
    if (coverage === 'gap') gap += weight;

    const tokens = tokenise(row.sanitizedQuestion);
    const category = classifyOfficialSources(tokens);
    const facets = safeFacets(tokens);
    const key = `${category.id}:${facets.slice().sort().join('|') || 'general'}`;
    const cluster = clusters.get(key) ?? {
      category,
      facets,
      rows: [],
      hashes: new Set(),
      askCount: 0,
      current7d: 0,
      prior7d: 0,
      gapCount: 0,
      partialCount: 0,
      strongCount: 0,
    };

    cluster.rows.push(row);
    if (typeof row.questionHash === 'string' && row.questionHash) cluster.hashes.add(row.questionHash);
    cluster.askCount += weight;
    if (coverage === 'gap') cluster.gapCount += weight;
    if (coverage === 'partial') cluster.partialCount += weight;
    if (coverage === 'strong') cluster.strongCount += weight;

    const timestamp = parseTimestamp(row.timestamp);
    if (timestamp && timestamp.getTime() >= currentBoundary) cluster.current7d += weight;
    else cluster.prior7d += weight;

    clusters.set(key, cluster);
  }

  const opportunities = [];
  for (const cluster of clusters.values()) {
    const distinctQuestions = cluster.hashes.size || Math.min(cluster.askCount, 1);
    if (distinctQuestions < MIN_DISTINCT_QUESTIONS) continue;

    const trendDelta = cluster.current7d - cluster.prior7d;
    const commercialIntent = cluster.facets.some((facet) => COMMERCIAL_FACETS.has(facet));
    const score = cluster.askCount * 2
      + cluster.gapCount * 4
      + cluster.partialCount * 2
      + Math.max(0, trendDelta) * 2
      + (commercialIntent ? 3 : 0);
    if (score < MIN_DEMAND_SCORE) continue;

    const surface = topSurface(cluster.rows);
    opportunities.push({
      topic: cluster.facets.length ? `${cluster.category.label}: ${cluster.facets.join(', ')}` : cluster.category.label,
      category: cluster.category.id,
      askCount: round(cluster.askCount),
      distinctQuestionPatterns: distinctQuestions,
      current7d: round(cluster.current7d),
      prior7d: round(cluster.prior7d),
      trendDelta: round(trendDelta),
      coverage: {
        gap: round(cluster.gapCount),
        partial: round(cluster.partialCount),
        strong: round(cluster.strongCount),
      },
      demandScore: round(score),
      commercialIntent,
      recommendedAssetType: recommendAssetType(cluster.category.id, cluster.facets),
      topExistingSurface: surface ? { title: surface.title, href: surface.href } : null,
      authoritativeSources: cluster.category.sources,
      publicationStatus: 'research-and-review-required',
    });
  }

  opportunities.sort((a, b) => b.demandScore - a.demandScore || b.askCount - a.askCount || a.topic.localeCompare(b.topic));

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    windowDays: WINDOW_DAYS,
    privacy: 'Aggregated generalized topics only. Raw or sanitized user questions are never written to this report.',
    publicationBoundary: 'Demand intelligence may prepare research and content changes, but it may not publish or auto-merge them.',
    totals: {
      events: round(strong + partial + gap),
      strong: round(strong),
      partial: round(partial),
      gap: round(gap),
      actionableOpportunities: opportunities.length,
    },
    opportunities: opportunities.slice(0, 40),
  };
}

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();
if (!accountId || !apiToken) fail('CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required.');

const rows = await queryAnalytics(accountId, apiToken);
console.log(`Texas Defined AI demand report: analyzed ${rows.length} private telemetry rows without logging question text.`);

const report = buildReport(rows);
if (!report.opportunities.length) {
  console.log('Texas Defined AI demand report: no generalized topic crossed the review threshold; no repository change created.');
  process.exit(0);
}

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Texas Defined AI demand report: wrote ${report.opportunities.length} reviewable generalized opportunities to ${OUTPUT_PATH}.`);
