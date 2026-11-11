import fs from 'node:fs';

const read = path => fs.readFileSync(path, 'utf8');
const entry = read('src/server-entry.ts');
const oidc = read('src/lib/github-oidc-jwt.server.ts');
const handler = read('src/lib/cj-account-sync.server.ts');
const core = read('src/lib/cj-account-reconciliation.ts');
const workflow = read('.github/workflows/sync-partner-referral-analytics.yml');
const migration = read('supabase/migrations/20261111170000_private_cj_account_sync.sql');
const failures = [];
const requireText = (source, snippet, label) => {
  if (!source.includes(snippet)) failures.push(label + ': missing ' + snippet);
};
for (const [source, snippet, label] of [
  [entry, 'await cjAccountSyncResponse(request, env)', 'Worker-only route'],
  [oidc, 'verifyCjGitHubOidc', 'Exact RSA-signed GitHub OIDC'],
  [oidc, 'RS256', 'RSA signature restriction'],
  [oidc, 'crypto.subtle.verify(', 'Cryptographic verification'],
  [oidc, "refs/heads/main", 'Protected main branch'],
  [oidc, 'sync-partner-referral-analytics.yml@refs/heads/main', 'Named workflow only'],
  [oidc, "'texasdefined-cj-reconciliation-v1'", 'Fixed audience'],
  [handler, "const PATH = '/api/internal/cj-account-sync'", 'Private endpoint path'],
  [handler, 'await verifyCjGitHubOidc(', 'Auth before provider access'],
  [handler, "requireSecret(env, 'CJ_PERSONAL_ACCESS_TOKEN')", 'Existing private Worker token only'],
  [handler, 'https://commissions.api.cj.com/query', 'Official CJ commission API'],
  [handler, 'https://programs.api.cj.com/query', 'Official CJ terms API'],
  [handler, "const REPORT_TABLE = 'texasdefined_cj_account_sync'", 'Private aggregate storage'],
  [handler, "Cache-Control': 'private, no-store, max-age=0'", 'No caching sensitive response'],
  [core, "CJ_PUBLISHER_CID = '8062457'", 'CJ publisher CID not website PID'],
  [core, "PALESTINE_SID = 'td_polar_palestine'", 'Exact Palestine source SID'],
  [core, 'if (!complete) throw new Error', 'No truncated commission snapshots'],
  [migration, 'enable row level security;', 'Private RLS'],
  [migration, 'revoke all on table public.texasdefined_cj_account_sync from public, anon, authenticated', 'No consumer Data API access'],
  [migration, 'to service_role', 'Service role only'],
  [workflow, 'id-token: write', 'GitHub short-lived OIDC issuance'],
  [workflow, 'needs: authorize', 'Protected publication authorization'],
  [workflow, "23 18 * * *", 'Daily bounded schedule'],
  [workflow, 'ACTIONS_ID_TOKEN_REQUEST_TOKEN', 'GitHub OIDC short-lived token retrieval'],
]) requireText(source, snippet, label);

if (entry.includes('CJ_PERSONAL_ACCESS_TOKEN') || core.includes('CJ_PERSONAL_ACCESS_TOKEN')) failures.push('CJ PAT must not be read in a client-importable module.');
if (!/const match = request\.headers\.get\('Authorization'\)/.test(handler)) failures.push('Anonymous endpoint cannot be enabled.');
if (/console\.log\([\s\S]{0,200}(commission|report_json|token_json)/i.test(handler)) failures.push('Provider financial data or tokens must never be logged.');
if (workflow.includes('CJ_PERSONAL_ACCESS_TOKEN') || workflow.includes('secrets.CJ_')) failures.push('Do not move the CJ token into GitHub secrets or logs.');
if (!migration.includes('No transaction IDs, shopper SIDs')) failures.push('Private CJ data minimization contract missing.');

if (failures.length) {
  console.error('Private CJ provider synchronization governance FAILED:\n' + failures.join('\n'));
  process.exit(1);
}
console.log('PASS: CJ publisher sync is private, OIDC-authenticated, provider read-only, bounded, RLS protected and scheduled through the existing GitHub workflow.');
