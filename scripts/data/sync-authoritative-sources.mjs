import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'src/data/source-governance.ts');
const outputPath = path.join(root, 'artifacts/source-health.json');
const text = await fs.readFile(sourcePath, 'utf8');
const records = [...text.matchAll(/\{ id: '([^']+)', name: '([^']+)', url: '([^']+)', domain: '([^']+)'/g)]
  .map(([, id, name, url, domain]) => ({ id, name, url, domain }));

const results = [];
for (const source of records) {
  let status = 0;
  let ok = false;
  let error = null;
  try {
    const response = await fetch(source.url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'user-agent': 'TexasDefined source-health-check/1.0' },
    });
    status = response.status;
    ok = response.ok || response.status === 405;
  } catch (caught) {
    error = caught instanceof Error ? caught.message : String(caught);
  }
  results.push({ ...source, ok, status, error, checkedAt: new Date().toISOString() });
}

const report = {
  generatedAt: new Date().toISOString(),
  total: results.length,
  healthy: results.filter((item) => item.ok).length,
  failed: results.filter((item) => !item.ok).length,
  results,
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Authoritative source sync complete: ${report.healthy}/${report.total} healthy.`);
if (report.failed) process.exitCode = 1;
