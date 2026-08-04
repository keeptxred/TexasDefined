import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const write = process.argv.includes('--write');
const only = process.argv.find((arg) => arg.startsWith('--source='))?.split('=')[1];
const timeout = 30000;

const adapters = {
  census: {
    url: 'https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:48',
    sourceId: 'census-places',
    transform: (rows) => rows.slice(1).map(([name, stateFips, placeFips]) => ({ externalId: `census-place:${stateFips}${placeFips}`, kind: 'city', name, slug: slug(name.replace(/ city| town| village| CDP/gi, '')), sourceId: 'census-places', sourceConfidence: 'official', status: 'pending-source-verification' })),
  },
  usgs: {
    url: 'https://carto.nationalmap.gov/arcgis/rest/services/structures/MapServer?f=pjson',
    sourceId: 'usgs-water',
    transform: (body) => [{ externalId: 'usgs-service:national-map', kind: 'attraction', name: body.name ?? 'USGS National Map', slug: 'usgs-national-map', officialUrl: 'https://www.usgs.gov/national-hydrography', sourceId: 'usgs-water', sourceConfidence: 'official', status: 'pending-source-verification' }],
  },
  tpwd: {
    url: 'https://tpwd.texas.gov/state-parks/parks-map',
    sourceId: 'tpwd-parks',
    transform: (html) => extractLinks(html, /state-parks\//).map(({ label, href }) => ({ externalId: `tpwd:${slug(label)}`, kind: 'state-park', name: label, slug: slug(label), officialUrl: absolute(href, 'https://tpwd.texas.gov'), sourceId: 'tpwd-parks', sourceConfidence: 'official', status: 'pending-source-verification' })),
  },
  nps: {
    url: 'https://www.nps.gov/state/tx/index.htm',
    sourceId: 'nps-texas',
    transform: (html) => extractLinks(html, /^\/[^/]+\/index\.htm/).map(({ label, href }) => ({ externalId: `nps:${slug(label)}`, kind: 'national-park', name: label, slug: slug(label), officialUrl: absolute(href, 'https://www.nps.gov'), sourceId: 'nps-texas', sourceConfidence: 'official', status: 'pending-source-verification' })),
  },
  thc: {
    url: 'https://thc.texas.gov/historic-sites',
    sourceId: 'official-destination-sites',
    transform: (html) => extractLinks(html, /historic-sites\//).map(({ label, href }) => ({ externalId: `thc:${slug(label)}`, kind: 'historic-site', name: label, slug: slug(label), officialUrl: absolute(href, 'https://thc.texas.gov'), sourceId: 'official-destination-sites', sourceConfidence: 'official', status: 'pending-source-verification' })),
  },
  txdot: {
    url: 'https://www.txdot.gov/discover/scenic-drives.html',
    sourceId: 'official-destination-sites',
    transform: (html) => extractHeadings(html).map((name) => ({ externalId: `txdot-scenic:${slug(name)}`, kind: 'scenic-drive', name, slug: slug(name), officialUrl: 'https://www.txdot.gov/discover/scenic-drives.html', sourceId: 'official-destination-sites', sourceConfidence: 'official', status: 'pending-source-verification' })),
  },
};

const selected = Object.entries(adapters).filter(([name]) => !only || name === only);
if (!selected.length) throw new Error(`Unknown source: ${only}`);
const results = [];
const promoted = [];
for (const [name, adapter] of selected) {
  const startedAt = new Date().toISOString();
  try {
    const response = await fetch(adapter.url, { redirect: 'follow', signal: AbortSignal.timeout(timeout), headers: { 'user-agent': 'TexasDefined authoritative entity importer/1.0' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const contentType = response.headers.get('content-type') ?? '';
    const raw = contentType.includes('json') ? await response.json() : await response.text();
    const records = dedupe(adapter.transform(raw)).filter(validRecord).map(normalizeRecord);
    const report = { source: name, sourceId: adapter.sourceId, url: adapter.url, startedAt, completedAt: new Date().toISOString(), records: records.length, valid: true };
    if (write) {
      const output = path.join(root, 'data', 'imports', `${name}.json`);
      await fs.mkdir(path.dirname(output), { recursive: true });
      await fs.writeFile(output, `${JSON.stringify({ ...report, records }, null, 2)}\n`);
      promoted.push(...records);
    }
    results.push(report);
    console.log(`${name}: ${records.length} validated records${write ? ' staged for promotion' : ' (dry run)'}.`);
  } catch (error) {
    const report = { source: name, sourceId: adapter.sourceId, url: adapter.url, startedAt, completedAt: new Date().toISOString(), records: 0, valid: false, error: error instanceof Error ? error.message : String(error) };
    results.push(report);
    console.error(`${name}: ${report.error}`);
  }
}

if (write && !results.some((result) => !result.valid)) {
  const generated = path.join(root, 'src', 'data', 'knowledge-graph', 'generated.ts');
  const records = dedupe(promoted.map((record) => ({ ...record, externalId: record.id }))).map(({ externalId, ...record }) => record);
  const content = `import type { TexasEntityRecord } from './types';\n\n/** Generated by scripts/data/import-authoritative-entities.mjs --write. */\nexport const GENERATED_KNOWLEDGE_GRAPH_ENTITIES: TexasEntityRecord[] = ${JSON.stringify(records, null, 2)};\n`;
  await fs.writeFile(generated, content);
  console.log(`Promoted ${records.length} records into ${path.relative(root, generated)}.`);
}

const summaryPath = path.join(root, 'data', 'reports', 'entity-import-health.json');
await fs.mkdir(path.dirname(summaryPath), { recursive: true });
await fs.writeFile(summaryPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), write, promoted: write ? promoted.length : 0, results }, null, 2)}\n`);
if (results.some((result) => !result.valid)) process.exitCode = 1;

function normalizeRecord(record) {
  const checked = new Date().toISOString();
  return {
    externalId: record.externalId,
    id: record.externalId,
    kind: record.kind,
    name: record.name,
    slug: record.slug,
    aliases: record.aliases ?? [],
    ...(record.description ? { description: record.description } : {}),
    ...(record.countySlug ? { countySlug: record.countySlug } : {}),
    ...(record.region ? { region: record.region } : {}),
    ...(record.coordinates ? { coordinates: record.coordinates } : {}),
    ...(record.officialUrl ? { officialUrl: record.officialUrl } : {}),
    sourceId: record.sourceId,
    sourceConfidence: record.sourceConfidence,
    sourceCheckedAt: checked,
    reviewDueAt: new Date(Date.now() + 90 * 86400000).toISOString(),
    status: record.status,
    relationships: record.relationships ?? [],
    tags: record.tags ?? [],
  };
}
function slug(value) { return String(value).toLowerCase().replace(/&amp;/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function absolute(href, origin) { try { return new URL(href, origin).toString(); } catch { return origin; } }
function strip(value) { return String(value).replace(/<[^>]+>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim(); }
function extractLinks(html, hrefPattern) { return [...String(html).matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(([, href, label]) => ({ href, label: strip(label) })).filter((item) => item.label.length > 3 && hrefPattern.test(item.href)); }
function extractHeadings(html) { return [...String(html).matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi)].map(([, heading]) => strip(heading)).filter((heading) => /trail|drive|highway|loop|route/i.test(heading)); }
function dedupe(records) { const map = new Map(); for (const record of records) if (record?.externalId) map.set(record.externalId, record); return [...map.values()]; }
function validRecord(record) { return Boolean(record && record.externalId && record.kind && record.name && record.slug && record.sourceId && record.sourceConfidence); }
