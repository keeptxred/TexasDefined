import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const fail = (message) => {
  console.error(`TexasDefined AI readiness validation failed: ${message}`);
  process.exitCode = 1;
};

const migrationPath = 'supabase/migrations/20260907021751_texasdefined_ai_intelligence_foundation.sql';
const serverPath = 'src/lib/texas-defined-ai.server.ts';
const intelligencePath = 'src/lib/texas-defined-ai-intelligence.server.ts';
const evalPath = 'src/data/texas-defined-ai-evaluation.json';

for (const file of [migrationPath, serverPath, intelligencePath, evalPath]) {
  if (!fs.existsSync(path.join(root, file))) fail(`required file is missing: ${file}`);
}
if (process.exitCode) process.exit(process.exitCode);

const migration = read(migrationPath);
const server = read(serverPath);
const intelligence = read(intelligencePath);
const evalCases = JSON.parse(read(evalPath));

const requiredTables = [
  'td_ai_search_demand',
  'td_ai_question_signals',
  'td_ai_coverage_gaps',
  'td_ai_eval_cases',
  'td_ai_eval_runs',
];
for (const table of requiredTables) {
  if (!migration.includes(`public.${table}`)) fail(`migration does not define ${table}`);
  if (!migration.includes(`alter table public.${table} enable row level security`)) fail(`${table} does not explicitly enable RLS`);
  if (!migration.includes(`revoke all on public.${table} from anon, authenticated`)) fail(`${table} is not explicitly closed to public/authenticated roles`);
  if (!migration.includes(`grant all on public.${table} to service_role`)) fail(`${table} is not granted to service_role`);
}

const signalTableStart = migration.indexOf('create table if not exists public.td_ai_question_signals');
const signalTableEnd = migration.indexOf('create index if not exists td_ai_question_signals_cluster_idx');
const signalTable = migration.slice(signalTableStart, signalTableEnd);
for (const forbidden of ['raw_question', 'question text', 'ip_address', 'user_agent']) {
  if (signalTable.toLowerCase().includes(forbidden)) fail(`question signal schema contains forbidden raw telemetry field: ${forbidden}`);
}

for (const invariant of [
  'store: false',
  'sameOriginRequest(request)',
  'TEXAS_DEFINED_AI_RATE_LIMITER',
  'MAX_REQUEST_BYTES',
  'MAX_QUESTION_LENGTH',
  'Structured Texas knowledge context',
  'recordTexasAiQuestionSignal',
  'classifyCoverage',
]) {
  if (!server.includes(invariant)) fail(`AI endpoint lost required invariant: ${invariant}`);
}

for (const provenanceField of ['sourceConfidence', 'sourceCheckedAt', 'reviewDueAt', 'relationships', 'officialUrl', 'countySlug', 'region']) {
  if (!intelligence.includes(provenanceField)) fail(`structured AI context is missing ${provenanceField}`);
}
if (!intelligence.includes('crypto.subtle.digest("SHA-256"')) fail('question fingerprint is not SHA-256 hashed');
if (!intelligence.includes('question_fingerprint: fingerprint')) fail('telemetry does not use the privacy-safe question fingerprint');

const telemetryStart = intelligence.indexOf('body: JSON.stringify({', intelligence.indexOf('/rest/v1/td_ai_question_signals'));
const telemetryEnd = intelligence.indexOf('}),\n    });', telemetryStart);
const telemetryPayload = intelligence.slice(telemetryStart, telemetryEnd);
if (!telemetryPayload) fail('could not locate privacy-safe telemetry payload');
for (const forbidden of ['question: input.question', 'raw_question', 'ip_address', 'user_agent', 'cf-connecting-ip']) {
  if (telemetryPayload.includes(forbidden)) fail(`telemetry payload contains forbidden raw visitor data: ${forbidden}`);
}

if (!Array.isArray(evalCases)) fail('evaluation corpus must be a JSON array');
if (evalCases.length < 80) fail(`evaluation corpus must contain at least 80 cases; found ${evalCases.length}`);
const ids = new Set();
const freshness = new Set();
const intents = new Set();
for (const item of evalCases) {
  if (!item?.id || !item?.question || !item?.expectedIntent || !item?.freshnessClass) fail('every evaluation case needs id, question, expectedIntent, and freshnessClass');
  if (ids.has(item.id)) fail(`duplicate evaluation id: ${item.id}`);
  ids.add(item.id);
  freshness.add(item.freshnessClass);
  intents.add(item.expectedIntent);
  if (item.freshnessClass !== 'static' && item.mustVerifyCurrent !== true) fail(`changing case ${item.id} must require current verification`);
}
for (const expected of ['static', 'periodic', 'seasonal', 'live']) {
  if (!freshness.has(expected)) fail(`evaluation corpus does not cover freshness class ${expected}`);
}
for (const expected of ['explain', 'discover', 'nearby', 'compare', 'plan', 'current-status', 'rules-deadlines', 'event-time', 'how-to']) {
  if (!intents.has(expected)) fail(`evaluation corpus does not cover intent ${expected}`);
}

if (!process.exitCode) {
  console.log(`TexasDefined AI readiness validation passed (${evalCases.length} evaluation questions, ${requiredTables.length} protected intelligence tables).`);
}
