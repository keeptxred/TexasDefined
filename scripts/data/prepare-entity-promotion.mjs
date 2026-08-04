import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const promote = process.argv.includes('--promote');
const approval = process.env.ENTITY_PROMOTION_APPROVAL ?? '';
const generatedPath = path.join(root, 'src/data/knowledge-graph/generated.ts');
const currentText = await fs.readFile(generatedPath, 'utf8').catch(() => "import type { TexasEntityRecord } from './types';\nexport const GENERATED_KNOWLEDGE_GRAPH_ENTITIES: TexasEntityRecord[] = [];\n");
const current = parseGenerated(currentText);
const proposed = await loadStagedImports();
const quarantine = proposed.map((entity) => ({ entityId: entity.id, reasons: quarantineReasons(entity) })).filter((item) => item.reasons.length);
const quarantined = new Set(quarantine.map((item) => item.entityId));
const promotable = proposed.filter((entity) => !quarantined.has(entity.id));
const diff = compare(current, promotable);
const proposedFingerprint = fingerprint(promotable);
const generatedAt = new Date().toISOString();
const manifestId = `entity-promotion-${generatedAt.slice(0, 10)}-${proposedFingerprint.replace('fnv1a-', '')}`;
const quarantinePercent = percent(quarantine.length, proposed.length);
const blockers = [...diff.blockers];
if (quarantinePercent > 10) blockers.push(`Quarantine rate ${quarantinePercent}% exceeds 10%.`);
if (!proposed.length) blockers.push('No staged import records found.');
if (!promotable.length && proposed.length) blockers.push('No promotable records remain after quarantine.');
const manifest = {
  id: manifestId,
  generatedAt,
  mode: promote ? 'promotion-requested' : 'preview-only',
  currentFingerprint: fingerprint(current),
  proposedFingerprint,
  currentRecords: current.length,
  proposedRecords: proposed.length,
  promotableRecords: promotable.length,
  quarantinedRecords: quarantine.length,
  quarantinePercent,
  safeToPromote: blockers.length === 0,
  blockers,
  quarantine,
  diff,
};
const reportsDir = path.join(root, 'data/reports');
await fs.mkdir(reportsDir, { recursive: true });
await fs.writeFile(path.join(reportsDir, 'entity-promotion-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
await fs.writeFile(path.join(reportsDir, 'entity-promotion-quarantine.json'), `${JSON.stringify({ generatedAt, manifestId, quarantine }, null, 2)}\n`);

if (promote) {
  if (!manifest.safeToPromote) throw new Error(`Promotion blocked: ${blockers.join(' ')}`);
  if (approval !== manifestId) throw new Error(`Promotion approval must equal manifest ID ${manifestId}.`);
  const snapshotsDir = path.join(root, 'data/snapshots');
  await fs.mkdir(snapshotsDir, { recursive: true });
  const snapshotName = `generated-${generatedAt.replace(/[:.]/g, '-')}.ts`;
  await fs.writeFile(path.join(snapshotsDir, snapshotName), currentText);
  const output = `import type { TexasEntityRecord } from './types';\n\n/** Governed promotion ${manifestId}. Previous version: data/snapshots/${snapshotName}. */\nexport const GENERATED_KNOWLEDGE_GRAPH_ENTITIES: TexasEntityRecord[] = ${JSON.stringify(promotable, null, 2)};\n`;
  await fs.writeFile(generatedPath, output);
  await fs.writeFile(path.join(reportsDir, 'entity-promotion-result.json'), `${JSON.stringify({ ...manifest, promotedAt: new Date().toISOString(), rollbackSnapshot: `data/snapshots/${snapshotName}` }, null, 2)}\n`);
  console.log(`Promoted ${promotable.length} entities under manifest ${manifestId}.`);
} else {
  console.log(`Prepared ${manifestId}: ${promotable.length} promotable, ${quarantine.length} quarantined, ${blockers.length} blockers.`);
}

async function loadStagedImports() {
  const dir = path.join(root, 'data/imports');
  const names = await fs.readdir(dir).catch(() => []);
  const records = [];
  for (const name of names.filter((item) => item.endsWith('.json')).sort()) {
    const parsed = JSON.parse(await fs.readFile(path.join(dir, name), 'utf8'));
    if (Array.isArray(parsed.records)) records.push(...parsed.records);
  }
  return dedupe(records);
}
function parseGenerated(source) {
  const start = source.indexOf('[');
  const end = source.lastIndexOf(']');
  if (start < 0 || end < start) return [];
  try { return JSON.parse(source.slice(start, end + 1)); } catch { return []; }
}
function quarantineReasons(entity) {
  const reasons = [];
  if (!entity?.id || !entity?.name || !entity?.slug) reasons.push('missing-required-identity');
  if (!entity?.sourceId) reasons.push('missing-source-id');
  if (!['official', 'high'].includes(entity?.sourceConfidence)) reasons.push('insufficient-source-confidence');
  if (!entity?.sourceCheckedAt) reasons.push('missing-source-check');
  if (!entity?.reviewDueAt) reasons.push('missing-review-date');
  if (['retired', 'temporarily-closed'].includes(entity?.status)) reasons.push(`non-promotable-status:${entity.status}`);
  if (entity?.officialUrl) { try { if (new URL(entity.officialUrl).protocol !== 'https:') reasons.push('official-url-not-https'); } catch { reasons.push('invalid-official-url'); } }
  return reasons;
}
function compare(current, proposed) {
  const before = new Map(current.map((item) => [item.id, canonical(item)]));
  const after = new Map(proposed.map((item) => [item.id, canonical(item)]));
  const added = [], changed = [], removed = [], unchanged = [];
  for (const [id, value] of after) !before.has(id) ? added.push(id) : before.get(id) !== value ? changed.push(id) : unchanged.push(id);
  for (const id of before.keys()) if (!after.has(id)) removed.push(id);
  const changePercent = percent(added.length + changed.length + removed.length, Math.max(1, current.length));
  const removalPercent = percent(removed.length, Math.max(1, current.length));
  const blockers = [];
  if (changePercent > 20) blockers.push(`Change rate ${changePercent}% exceeds 20%.`);
  if (removalPercent > 5) blockers.push(`Removal rate ${removalPercent}% exceeds 5%.`);
  if (!proposed.length && current.length) blockers.push('Proposed import is empty.');
  return { added: added.sort(), changed: changed.sort(), removed: removed.sort(), unchanged: unchanged.sort(), changePercent, removalPercent, blockers };
}
function canonical(entity) { return JSON.stringify({ ...entity, aliases: [...(entity.aliases ?? [])].sort(), relationships: [...(entity.relationships ?? [])].sort((a, b) => `${a.type}:${a.targetId}`.localeCompare(`${b.type}:${b.targetId}`)), tags: [...(entity.tags ?? [])].sort() }); }
function dedupe(records) { const map = new Map(); for (const record of records) if (record?.id) map.set(record.id, record); return [...map.values()]; }
function fingerprint(records) { const value = JSON.stringify([...records].sort((a, b) => String(a.id).localeCompare(String(b.id))).map(canonical)); let hash = 2166136261; for (let i = 0; i < value.length; i += 1) { hash ^= value.charCodeAt(i); hash = Math.imul(hash, 16777619); } return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`; }
function percent(value, total) { return total ? Math.round((value / total) * 1000) / 10 : 0; }
