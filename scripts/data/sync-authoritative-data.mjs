import fs from 'node:fs/promises';
import path from 'node:path';

const sources = [
  ['tx-comptroller-property-tax','https://comptroller.texas.gov/taxes/property-tax/'],
  ['tx-comptroller-county-directory','https://comptroller.texas.gov/taxes/property-tax/county-directory/'],
  ['texas-county-websites','https://www.texas.gov/texas-county-websites.html'],
  ['tx-dps-driver-license','https://www.dps.texas.gov/section/driver-license'],
  ['txdmv-registration','https://www.txdmv.gov/motorists/register-your-vehicle'],
  ['tx-sos-business','https://www.sos.state.tx.us/corp/sosda/index.shtml'],
];

const results = [];
for (const [id, url] of sources) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'TexasDefined source validator/1.0' } });
    results.push({ id, url, ok: response.ok, status: response.status, finalUrl: response.url, checkedAt: new Date().toISOString() });
  } catch (error) {
    results.push({ id, url, ok: false, status: null, error: error instanceof Error ? error.message : String(error), checkedAt: new Date().toISOString() });
  }
}

const output = path.join(process.cwd(), 'data', 'reports', 'authoritative-source-health.json');
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, `${JSON.stringify({ generatedAt: new Date().toISOString(), sources: results }, null, 2)}\n`);

const failed = results.filter((result) => !result.ok);
console.log(`Checked ${results.length} authoritative sources; ${failed.length} failed.`);
if (failed.length && process.argv.includes('--strict')) process.exit(1);
