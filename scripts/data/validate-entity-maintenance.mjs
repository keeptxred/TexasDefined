import fs from 'node:fs';

const errors = [];
const required = [
  'src/platform/entity-maintenance.ts',
  'src/components/admin/EntityMaintenanceHealth.tsx',
  'src/routes/api.entity-maintenance.ts',
  'src/routes/admin.entity-maintenance.tsx',
];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing Phase 3 entity-maintenance file: ${path}`);
if (errors.length) fail();

const maintenance = fs.readFileSync(required[0], 'utf8');
const panel = fs.readFileSync(required[1], 'utf8');
const api = fs.readFileSync(required[2], 'utf8');
const page = fs.readFileSync(required[3], 'utf8');

requireSymbols(maintenance, [
  'ENTITY_MAINTENANCE_THRESHOLDS', 'auditAuthoritativeSourceFreshness', 'auditEntityMaintenance',
  'diffEntityImports', 'auditEntityMaintenanceHealth', 'maximumPromotionChangePercent',
  'maximumRemovalPercent', 'safeToPromote', 'blockers', 'pending-source-verification',
], 'maintenance engine');
requireSymbols(panel, ['EntityMaintenanceHealth', 'Stale entities', 'Missing official URLs', 'Highest-priority entity reviews', 'Authoritative source schedule'], 'maintenance panel');
requireSymbols(api, ["createFileRoute('/api/entity-maintenance')", 'auditEntityMaintenanceHealth', 'status: report.healthy ? 200 : 503', 'no-store', 'noindex, nofollow'], 'maintenance API');
requireSymbols(page, ["createFileRoute('/admin/entity-maintenance')", 'EntityMaintenanceHealth', 'loadTexasKnowledgeGraph', 'noindex,nofollow', '/admin/platform-health'], 'maintenance admin page');

if (errors.length) fail();
console.log('Phase 3 source freshness, stale-entity queues, and safe import promotion controls are protected.');

function requireSymbols(source, symbols, area) { for (const symbol of symbols) if (!source.includes(symbol)) errors.push(`${area} feature missing: ${symbol}`); }
function fail() { console.error('Phase 3 entity-maintenance validation failed:'); for (const error of errors) console.error(`- ${error}`); process.exit(1); }
