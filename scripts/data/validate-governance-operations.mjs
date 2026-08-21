import fs from 'node:fs';

const required = [
  'src/shared/platform-core/governance-events.ts',
  'src/platform/governance-event-store.ts',
  'src/platform/governance-persistence.ts',
  'src/routes/api.publication-gate.ts',
  'src/routes/api.governance-health.ts',
  'src/routes/admin.governance-health.tsx',
  'src/shared/platform-core/consumer.json',
  'src/shared/platform-core/upstream.json',
  'supabase/migrations/20260804195800_governance_events.sql',
  'supabase/rollback/20260804195800_governance_events_down.sql',
  'scripts/data/maintain-governance-events.mjs',
  '.github/workflows/governance-maintenance.yml',
];
const errors = [];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing governance file: ${file}`);
if (!fs.existsSync('src/routes/admin.governance-health.lazy.tsx')) errors.push('Missing lazy governance dashboard: src/routes/admin.governance-health.lazy.tsx');
if (!fs.existsSync('src/platform/governance-health.functions.ts')) errors.push('Missing server-isolated governance health loader: src/platform/governance-health.functions.ts');
if (!errors.length) {
  const [core, store, persistence, gate, health, dashboardShell] = required.slice(0, 6).map((file) => fs.readFileSync(file, 'utf8'));
  const dashboardLazy = fs.readFileSync('src/routes/admin.governance-health.lazy.tsx', 'utf8');
  const dashboardLoader = fs.readFileSync('src/platform/governance-health.functions.ts', 'utf8');
  const dashboard = `${dashboardShell}\n${dashboardLazy}\n${dashboardLoader}`;
  const consumer = JSON.parse(fs.readFileSync(required[6], 'utf8'));
  const upstream = JSON.parse(fs.readFileSync(required[7], 'utf8'));
  const migration = fs.readFileSync(required[8], 'utf8');
  const rollback = fs.readFileSync(required[9], 'utf8');
  const maintenance = fs.readFileSync(required[10], 'utf8');
  const workflow = fs.readFileSync(required[11], 'utf8');

  for (const symbol of ['createGovernanceEvent','validateGovernanceEvent','summarizeGovernanceEvents','detectOwnershipDrift']) if (!core.includes(symbol)) errors.push(`Shared governance contract missing ${symbol}`);
  for (const symbol of ['MAX_EVENTS = 2_000','appendGovernanceEvent','recordGovernanceDecision','structuredClone','persistGovernanceEvents','loadGovernanceEvents','storesArticleBodies: false','storesCaptions: false','storesReaderIdentifiers: false','storesCredentials: false']) if (!store.includes(symbol)) errors.push(`Governance store safeguard missing ${symbol}`);
  for (const symbol of ['platform_governance_events','on_conflict=id','resolution=ignore-duplicates','SUPABASE_SERVICE_ROLE_KEY','pruneGovernanceEvents']) if (!persistence.includes(symbol)) errors.push(`Durable persistence safeguard missing ${symbol}`);
  for (const symbol of ['recordGovernanceDecision','governanceEventIds','writer: \'api/publication-gate\'']) if (!gate.includes(symbol)) errors.push(`Publication gate logging missing ${symbol}`);
  for (const symbol of ['await governanceHealth()','status: health.healthy ? 200 : 503','no-store','noindex, nofollow']) if (!health.includes(symbol)) errors.push(`Governance health API safeguard missing ${symbol}`);
  for (const symbol of ['Cross-Site Governance Health','Blocked rate','Override acceptance','Privacy controls','maxMemoryEvents','summary.bySite.TexasDefined','summary.bySite.KeepTXRed','getGovernanceHealth','createLazyFileRoute']) if (!dashboard.includes(symbol)) errors.push(`Governance dashboard coverage missing ${symbol}`);
  for (const symbol of ['platform_governance_events','platform_governance_daily_summaries','enable row level security','prune_platform_governance_events','refresh_platform_governance_daily_summaries','revoke all']) if (!migration.includes(symbol)) errors.push(`Governance migration safeguard missing ${symbol}`);
  for (const symbol of ['drop function if exists public.refresh_platform_governance_daily_summaries','drop function if exists public.prune_platform_governance_events','drop table if exists public.platform_governance_daily_summaries','drop table if exists public.platform_governance_events']) if (!rollback.includes(symbol)) errors.push(`Governance rollback safeguard missing ${symbol}`);
  for (const symbol of ['GOVERNANCE_RETENTION_DAYS','GOVERNANCE_AGGREGATE_DAYS','refresh_platform_governance_daily_summaries','prune_platform_governance_events']) if (!maintenance.includes(symbol)) errors.push(`Governance maintenance script missing ${symbol}`);
  for (const symbol of ['schedule:','SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','maintain-governance-events.mjs']) if (!workflow.includes(symbol)) errors.push(`Governance maintenance workflow missing ${symbol}`);
  for (const forbidden of ['articleBody','caption:', 'email:', 'ipAddress', 'accessToken', 'password']) if (core.includes(forbidden) || store.includes(forbidden) || persistence.includes(forbidden) || migration.includes(forbidden)) errors.push(`Privacy-prohibited field found: ${forbidden}`);
  for (const capability of ['governance-events','governance-analytics','ownership-drift-detection']) if (!consumer.capabilities.includes(capability)) errors.push(`Consumer capability missing ${capability}`);
  if (consumer.packageVersion !== '0.5.0' || consumer.apiVersion !== '1.3') errors.push('Consumer must use core 0.5.0 / API 1.3.');
  if (upstream.version !== '0.5.0' || upstream.apiVersion !== '1.3') errors.push('Upstream pin must use core 0.5.0 / API 1.3.');
  if (!/^[0-9a-f]{40}$/.test(upstream.commit) || upstream.commit !== consumer.coreCommit) errors.push('Consumer and upstream core commits must match exactly.');
}
if (errors.length) {
  console.error(`TexasDefined governance validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('TexasDefined durable cross-site governance logging, aggregation, retention, rollback, privacy, API, and dashboard are valid.');
