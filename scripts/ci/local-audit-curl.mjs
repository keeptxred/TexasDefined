// Minimal read-only curl interface for the preserved county shell assertions.
// The shared transport rewrites every same-site hop, including -L redirects.
import { writeFile } from 'node:fs/promises';
import { createLocalAuditFetch } from './local-audit-fetch.mjs';

const auditFetch = createLocalAuditFetch({ localOrigin: process.env.LOCAL_AUDIT_ORIGIN });
const args = process.argv.slice(2);
if (args.length === 1 && args[0] === '--validate') process.exit(0);
let url, output, format = '', follow = false, timeout = 30_000;
const headers = {};
for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === '-L') follow = true;
  else if (arg === '-sS') continue;
  else if (arg === '-A') headers['user-agent'] = args[++i];
  else if (arg === '-o') output = args[++i];
  else if (arg === '-w') format = args[++i];
  else if (arg === '--max-time') timeout = Number(args[++i]) * 1000;
  else if (!arg.startsWith('-') && !url) url = arg;
  else throw new Error(`Unsupported local audit curl argument: ${arg}`);
}
if (!url || !Number.isFinite(timeout) || timeout <= 0 || timeout > 60_000) throw new Error('Invalid local audit curl request');
const response = await auditFetch(url, { headers, redirect: follow ? 'follow' : 'manual', signal: AbortSignal.timeout(timeout) });
const bytes = Buffer.from(await response.arrayBuffer());
if (output && output !== '/dev/null') await writeFile(output, bytes);
else if (!output) process.stdout.write(bytes);
const location = response.headers.get('location');
const values = {
  http_code: String(response.status),
  content_type: response.headers.get('content-type') || '',
  redirect_url: location ? new URL(location, response.url || url).href : '',
};
auditFetch.assertComplete();
process.stdout.write(format.replace(/%\{(http_code|content_type|redirect_url)\}/g, (_, key) => values[key]).replaceAll('\\t', '\t').replaceAll('\\n', '\n'));
