/** Generate a LOCAL-ONLY test-mode override for the historical Stripe finalizer.
 * This NEVER writes to Supabase and cannot produce SQL without the disposable
 * network_replay database guard. Do not add it to supabase/migrations.
 */
import {readFileSync} from 'node:fs';
if(process.env.NETWORK_MIGRATION_REPLAY_ISOLATED!=='yes-ephemeral-local-only' ||
 !['127.0.0.1','localhost'].includes(process.env.PGHOST) ||
 process.env.PGDATABASE!=='network_replay' || process.env.PGUSER!=='postgres')
 throw Error('Stripe staging override requires disposable local network_replay PostgreSQL');
const file='supabase/migrations/20261010223315_network_checkout_finalize_reverify_owner.sql';
const source=readFileSync(file,'utf8');
const original="'^cs_live_[a-zA-Z0-9_]+$'";
if(source.split(original).length!==2)throw Error('Historical Checkout finalizer signature changed: reconcile explicitly');
const overridden=source.replace(original,"'^cs_test_[a-zA-Z0-9_]+$'");
if(overridden===source || overridden.includes(original))throw Error('Test finalizer override failed');
process.stdout.write('BEGIN;\n'+overridden+'\nCOMMIT;\n');
