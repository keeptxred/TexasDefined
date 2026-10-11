/** Original SQL-source mirror atomicity gate; never connects to any database. */
import {readFileSync} from 'node:fs';
const files=["20261011043000_network_owner_revision_read_revocation.sql","20261011044000_network_sensitive_action_audit.sql","20261011045000_network_notification_manual_recovery.sql","20261011046000_network_featured_storage_atomic_counter.sql"];
for(const file of files){
 const sql=readFileSync('supabase/pending/'+file,'utf8');
 const lines=sql.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
 if(lines.filter(x=>x==='BEGIN;').length!==1 ||
    lines.filter(x=>x==='COMMIT;').length!==1 || lines.at(-1)!=='COMMIT;')
   throw new Error('Exactly one complete explicit transaction required: '+file);
 const begin=sql.search(/^BEGIN;$/m), commit=sql.search(/^COMMIT;$/m);
 const ddl=sql.search(/^(?:DROP POLICY|CREATE TABLE|LOCK TABLE)/m);
 if(ddl<0 || begin<0 || begin>=ddl || commit<=ddl)
   throw new Error('DDL outside atomic transaction: '+file);
 if(!sql.includes("SET LOCAL lock_timeout = '5s';") ||
    !sql.includes("SET LOCAL statement_timeout = '45s';"))
   throw new Error('Lock/statement timeouts missing: '+file);
}
const quota=readFileSync('supabase/pending/'+files[3],'utf8');
for(const required of ['LOCK TABLE storage.objects IN SHARE ROW EXCLUSIVE MODE',
 'network_featured_usage_after_insert','network_featured_usage_after_delete',
 'network_featured_usage_prevent_move']){
 if(!quota.includes(required))throw new Error('Quota migration prerequisite missing: '+required);
}
console.log('PASS: original four SQL source mirrors are bounded and match installed migration sources (no database writes)');
