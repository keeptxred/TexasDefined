import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const fail = (message) => {
  console.error(`TexasDefined AI intelligence validation failed: ${message}`);
  process.exitCode = 1;
};

const foundationPath = 'supabase/migrations/20260907021751_texasdefined_ai_intelligence_foundation.sql';
const evalSeedPath = 'supabase/migrations/20260907030000_texasdefined_ai_eval_seed_v1.sql';
const feedbackPath = 'supabase/migrations/20260907031500_texasdefined_ai_signal_feedback_loop.sql';
const radarPath = 'supabase/migrations/20260907034500_texasdefined_ai_opportunity_radar.sql';
const evalPath = 'src/data/texas-defined-ai-evaluation.json';

for (const file of [foundationPath, evalSeedPath, feedbackPath, radarPath, evalPath]) {
  if (!fs.existsSync(path.join(root, file))) fail(`required file is missing: ${file}`);
}
if (process.exitCode) process.exit(process.exitCode);

const foundation = read(foundationPath);
const evalSeed = read(evalSeedPath);
const feedback = read(feedbackPath);
const radar = read(radarPath);
const evalCases = JSON.parse(read(evalPath));

const requiredTables = [
  'td_ai_search_demand',
  'td_ai_question_signals',
  'td_ai_coverage_gaps',
  'td_ai_eval_cases',
  'td_ai_eval_runs',
];

for (const table of requiredTables) {
  if (!foundation.includes(`public.${table}`)) fail(`foundation migration does not define ${table}`);
  if (!foundation.includes(`alter table public.${table} enable row level security`)) fail(`${table} does not explicitly enable RLS`);
  if (!foundation.includes(`revoke all on public.${table} from anon, authenticated`)) fail(`${table} is not explicitly closed to anon/authenticated roles`);
  if (!foundation.includes(`grant all on public.${table} to service_role`)) fail(`${table} is not granted to service_role`);
}

const signalTableStart = foundation.indexOf('create table if not exists public.td_ai_question_signals');
const signalTableEnd = foundation.indexOf('create index if not exists td_ai_question_signals_cluster_idx');
const signalTable = foundation.slice(signalTableStart, signalTableEnd).toLowerCase();
for (const forbidden of ['raw_question', 'question text', 'ip_address', 'user_agent']) {
  if (signalTable.includes(forbidden)) fail(`question signal schema contains forbidden raw telemetry field: ${forbidden}`);
}

for (const required of ['td_ai_process_question_signal', 'td_ai_question_signals']) {
  if (!feedback.includes(required)) fail(`feedback migration is missing ${required}`);
}
for (const required of ['td_ai_opportunity_radar', 'td_ai_search_demand', 'td_ai_coverage_gaps']) {
  if (!radar.includes(required)) fail(`opportunity radar migration is missing ${required}`);
}
if (!evalSeed.includes('public.td_ai_eval_cases')) fail('evaluation seed does not target td_ai_eval_cases');

if (!Array.isArray(evalCases)) fail('evaluation corpus must be a JSON array');
if (evalCases.length < 80) fail(`evaluation corpus must contain at least 80 cases; found ${evalCases.length}`);
const ids = new Set();
const freshness = new Set();
const intents = new Set();
for (const item of evalCases) {
  if (!item?.id || !item?.question || !item?.expectedIntent || !item?.freshnessClass) {
    fail('every evaluation case needs id, question, expectedIntent, and freshnessClass');
    continue;
  }
  if (ids.has(item.id)) fail(`duplicate evaluation id: ${item.id}`);
  ids.add(item.id);
  freshness.add(item.freshnessClass);
  intents.add(item.expectedIntent);
  if (item.freshnessClass !== 'static' && item.mustVerifyCurrent !== true) {
    fail(`changing case ${item.id} must require current verification`);
  }
}

for (const expected of ['static', 'periodic', 'seasonal', 'live']) {
  if (!freshness.has(expected)) fail(`evaluation corpus does not cover freshness class ${expected}`);
}
for (const expected of ['explain', 'discover', 'nearby', 'compare', 'plan', 'current-status', 'rules-deadlines', 'event-time', 'how-to']) {
  if (!intents.has(expected)) fail(`evaluation corpus does not cover intent ${expected}`);
}

if (!process.exitCode) {
  console.log(`TexasDefined AI intelligence foundation validation passed (${evalCases.length} evaluation questions, ${requiredTables.length} protected tables).`);
}
