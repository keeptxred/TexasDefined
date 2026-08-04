import fs from 'node:fs';

const errors = [];
const required = [
  'src/platform/entity-maintenance.ts',
  'src/platform/entity-promotion.ts',
  'src/components/admin/EntityMaintenanceHealth.tsx',
  'src/components/admin/EntityImportReview.tsx',
  'src/routes/api.entity-maintenance.ts',
  'src/routes/api.entity-import-preview.ts',
  'src/routes/admin.entity-maintenance.tsx',
  'src/routes/admin.entity-import-review.tsx',
  'scripts/data/verify-official-urls.mjs',
  'scripts/data/prepare-entity-promotion.mjs',
  '.github/workflows/entity-maintenance.yml',
];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing Phase 3 entity-maintenance file: ${path}`);
if (errors.length) fail();

const maintenance = read(required[0]);
const promotion = read(required[1]);
const panel = read(required[2]);
const review = read(required[3]);
const api = read(required[4]);
const previewApi = read(required[5]);
const page = read(required[6]);
const reviewPage = read(required[7]);
const urlVerifier = read(required[8]);
const promotionRunner = read(required[9]);
const workflow = read(required[10]);

requireSymbols(maintenance, [
  'ENTITY_MAINTENANCE_THRESHOLDS', 'auditAuthoritativeSourceFreshness', 'auditEntityMaintenance',
  'diffEntityImports', 'auditEntityMaintenanceHealth', 'maximumPromotionChangePercent',
  'maximumRemovalPercent', 'safeToPromote', 'blockers', 'pending-source-verification',
], 'maintenance engine');
requireSymbols(promotion, [
  'ENTITY_PROMOTION_POLICY', 'buildEntityPromotionManifest', 'promotableEntities',
  'validatePromotionApproval', 'fingerprintEntities', 'requireExplicitApproval',
  'requireRollbackSnapshot', 'maximumQuarantinedPercent', 'quarantineReasons',
  'approvalToken !== manifest.id', 'structuredClone',
], 'promotion governance');
requireSymbols(panel, ['EntityMaintenanceHealth', 'Stale entities', 'Missing official URLs', 'Highest-priority entity reviews', 'Authoritative source schedule'], 'maintenance panel');
requireSymbols(review, ['EntityImportReview', '/api/entity-import-preview', 'Preview promotion', 'preview-only', 'manifest ID', 'rollback snapshot'], 'import review console');
requireSymbols(api, ["createFileRoute('/api/entity-maintenance')", 'auditEntityMaintenanceHealth', 'status: report.healthy ? 200 : 503', 'no-store', 'noindex, nofollow'], 'maintenance API');
requireSymbols(previewApi, ["createFileRoute('/api/entity-import-preview')", 'buildEntityPromotionManifest', 'promotableEntities', 'preview-only', '10000', 'no-store', 'noindex, nofollow'], 'promotion preview API');
requireSymbols(page, ["createFileRoute('/admin/entity-maintenance')", 'EntityMaintenanceHealth', 'loadTexasKnowledgeGraph', 'noindex,nofollow', '/admin/entity-import-review', '/admin/platform-health'], 'maintenance admin page');
requireSymbols(reviewPage, ["createFileRoute('/admin/entity-import-review')", 'EntityImportReview', 'noindex,nofollow', '/admin/entity-maintenance', '/admin/platform-health'], 'import review page');
requireSymbols(urlVerifier, ['maximumFailurePercent', 'AbortSignal.timeout', "method: 'HEAD'", "method: 'GET'", 'official-url-health.json', 'process.exitCode = 1'], 'official URL verifier');
requireSymbols(promotionRunner, [
  '--promote', 'ENTITY_PROMOTION_APPROVAL', 'entity-promotion-manifest.json',
  'entity-promotion-quarantine.json', 'data/snapshots', 'approval !== manifestId',
  'safeToPromote', 'rollbackSnapshot', 'maximum',
], 'promotion runner');
requireSymbols(workflow, [
  'schedule:', "cron: '17 11 * * 2'", 'Dry-run authoritative imports',
  'Verify official URLs', 'Prepare promotion preview', 'actions/upload-artifact@v4',
  'retention-days: 30',
], 'scheduled maintenance workflow');
if (promotionRunner.includes('ENTITY_PROMOTION_APPROVAL ?? manifestId')) errors.push('Promotion runner defaults approval to the manifest ID.');
if (previewApi.includes('writeFile') || previewApi.includes('promote: true')) errors.push('Preview API contains write or promotion behavior.');

if (errors.length) fail();
console.log('Phase 3 source freshness, URL verification, quarantine, governed promotion manifests, rollback snapshots, scheduled maintenance, and import review are protected.');

function read(path) { return fs.readFileSync(path, 'utf8'); }
function requireSymbols(source, symbols, area) { for (const symbol of symbols) if (!source.includes(symbol)) errors.push(`${area} feature missing: ${symbol}`); }
function fail() { console.error('Phase 3 entity-maintenance validation failed:'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
