/** Local SQL overlay; only an explicitly disposable network_replay database.
 * This generator outputs SQL, never runs SQL or changes hosted migrations.
 */
import {readFileSync} from 'node:fs';
if(process.env.NETWORK_MIGRATION_REPLAY_ISOLATED!=='yes-ephemeral-local-only' ||
 !['127.0.0.1','localhost'].includes(process.env.PGHOST) ||
 process.env.PGDATABASE!=='network_replay' || process.env.PGUSER!=='postgres')
 throw Error('Stripe staging override requires disposable local network_replay PostgreSQL');
const source=readFileSync('supabase/migrations/20261010223315_network_checkout_finalize_reverify_owner.sql','utf8');
const original="'^cs_live_[a-zA-Z0-9_]+$'";
const testPattern="'^cs_test_[a-zA-Z0-9_]+$'";
if(source.split(original).length!==2)throw Error('Historical Checkout finalizer signature changed: stop and reconcile');
// Callback avoids JavaScript's special $' replacement expansion.
const overridden=source.replace(original,()=>testPattern);
if(overridden===source || overridden.includes(original) || !overridden.includes(testPattern))
 throw Error('Isolated test finalizer override failed');
process.stdout.write('BEGIN;\n'+overridden+'\nCOMMIT;\n');
