/** Prepare a brand-new, unlinked localhost Supabase CLI project for CI.
 * Copies ONLY the 38 applied Network migrations plus five pending source files.
 * Never reads or copies .env, tokens, customer files, or actual production data.
 */
import {existsSync,mkdirSync,copyFileSync,readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.argv[2]||'');
const runner=path.resolve(process.env.RUNNER_TEMP||'/nonexistent-runner-temp');
if(process.env.NETWORK_SUPABASE_REAL_E2E!=='yes-local-disposable-only'
 || !root.startsWith(runner+path.sep)
 || !existsSync(path.join(root,'supabase','config.toml'))
 || existsSync(path.join(root,'supabase','.branches')))
 throw Error('Refusing Network Auth/Storage setup outside fresh unlinked CI-local Supabase');
const config=readFileSync(path.join(root,'supabase','config.toml'),'utf8');
if(config.includes('ftkznprjljkhymknvhye')||config.includes('project_id = "keeptxred"'))
 throw Error('Shared/production Supabase config cannot be used for local integration');
const base=path.join(root,'supabase','migrations');
mkdirSync(base,{recursive:true});
if(readdirSync(base).some(s=>s.endsWith('.sql')))throw Error('Local migration directory not empty');
const manifest=readFileSync('scripts/data/validate-network-migration-parity.mjs','utf8');
const applied=[...manifest.matchAll(/"(202610\d{8}_[^"]+\.sql)"/g)].map(m=>m[1]);
if(applied.length!==40||new Set(applied).size!==40)throw Error('Applied Network migration manifest changed');
const pending=[
 '20261011043000_network_owner_revision_read_revocation.sql',
 '20261011044000_network_sensitive_action_audit.sql',
 '20261011045000_network_notification_manual_recovery.sql',
 '20261011046000_network_featured_storage_atomic_counter.sql',
 '20261011210000_network_profile_daily_metrics.sql',
];
for(const f of applied){
 const from=path.join('supabase','migrations',f);
 if(!existsSync(from))throw Error('Tracked migration missing: '+f);
 copyFileSync(from,path.join(base,f));
}
for(const f of pending){
 const from=path.join('supabase','pending',f);
 if(!existsSync(from))throw Error('Unapplied proposed release migration missing: '+f);
 copyFileSync(from,path.join(base,f));
}
console.log('LOCAL SUPABASE PREPARED: 38 applied Network-only migrations + 5 isolated pending files copied for idempotency into disposable, unlinked CLI project. No remote connection.');
