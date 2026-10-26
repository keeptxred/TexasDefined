/**
 * Corporate-marketplace post-build client isolation guard.
 *
 * Public venue names, dates, category labels and form UI belong in the client.
 * Private SQL ledger table names and service-role configuration do not.
 * Authorized admin UI naturally includes form/DTO field names, which by
 * themselves contain no sensitive customer values; do not flag those labels. The check runs on ACTUAL compiled assets, not a source
 * grep, and never reads or logs customer records or secret values.
 *
 * This is a defense-in-depth static-bundle test, NOT a proof that every
 * anonymous HTTP endpoint is safe. Database RLS and API checks are separate.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const assetDirs = ['dist/client/assets', '.output/public/assets'];
const signatures = [
  { id: 'private-group-ledger-table', regex: /\btexasdefined_group_event_(?:requests|partner_applications|partner_outreach|outcome_events|offers|offer_click_totals)\b/i },
  { id: 'service-role-secret-name', regex: /\b(?:SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SECRET_KEY|SUPABASE_SERVICE_KEY)\b/i },
];

/** Public venue editorial metadata is allowed; internal ledger identifiers aren't. */
export function corporateClientPrivacyViolations(text) {
  if (typeof text !== 'string') return ['unreadable-client-asset'];
  return signatures.filter(item => item.regex.test(text)).map(item => item.id);
}

async function findCompiledAssetDir() {
  for (const candidate of assetDirs) {
    try {
      if ((await stat(candidate)).isDirectory()) return resolve(candidate);
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
  }
  throw new Error('Missing built public assets: run the production Vite build first.');
}

export async function assertCompiledCorporateClientPrivacy(assetDirectory = null) {
  const directory = assetDirectory ? resolve(assetDirectory) : await findCompiledAssetDir();
  const pending = [directory];
  const violations = [];
  let inspected = 0;
  while (pending.length) {
    const current = pending.pop();
    const files = await readdir(current, { withFileTypes: true });
    for (const item of files) {
      const path = join(current, item.name);
      if (item.isSymbolicLink()) throw new Error('Refuse symlink traversal while scanning public bundles');
      if (item.isDirectory()) { pending.push(path); continue; }
      if (!item.isFile() || !/\.(?:js|mjs)$/.test(item.name)) continue;
      inspected++;
      if (inspected > 1500) throw new Error('Unexpected number of public JavaScript files; review build output');
      if ((await stat(path)).size > 20_000_000) throw new Error('Client bundle unusually large; inspect before releasing');
      const found = corporateClientPrivacyViolations(await readFile(path, 'utf8'));
      if (found.length) violations.push({ asset: relative(directory, path), categories: found });
    }
  }
  if (!inspected) throw new Error('No public JavaScript bundle found; cannot certify client isolation');
  if (violations.length) {
    // Never echo bundle source or real customer strings into logs.
    throw new Error('Private corporate ledger identifiers in compiled public JavaScript: '
      + JSON.stringify(violations.slice(0, 20)));
  }
  return { scannedClientFiles: inspected, privateLedgerIdentifiersFound: 0 };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  assertCompiledCorporateClientPrivacy().then(out => {
    console.log('Corporate event compiled client privacy PASS: '
      + out.scannedClientFiles + ' JS assets; no private group-event ledger table names or service key identifiers.');
  }).catch(error => { console.error(error.message); process.exitCode = 1; });
}
