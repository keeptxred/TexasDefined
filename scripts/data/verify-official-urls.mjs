import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const timeoutMs = 15000;
const concurrency = 8;
const maximumFailurePercent = 10;
const sourcesText = await fs.readFile(path.join(root, 'src/data/source-governance.ts'), 'utf8');
const generatedText = await fs.readFile(path.join(root, 'src/data/knowledge-graph/generated.ts'), 'utf8').catch(() => '');
const urls = [...new Set([
  ...matches(sourcesText, /url:\s*['"](https:\/\/[^'"]+)['"]/g),
  ...matches(generatedText, /"officialUrl":\s*"(https:\/\/[^"\\]+)"/g),
])].slice(0, 2000);

const results = [];
for (let index = 0; index < urls.length; index += concurrency) {
  const batch = urls.slice(index, index + concurrency);
  results.push(...await Promise.all(batch.map(checkUrl)));
}
const failed = results.filter((item) => !item.ok);
const failurePercent = results.length ? Math.round((failed.length / results.length) * 1000) / 10 : 0;
const report = {
  generatedAt: new Date().toISOString(),
  checked: results.length,
  passed: results.length - failed.length,
  failed: failed.length,
  failurePercent,
  maximumFailurePercent,
  healthy: failurePercent <= maximumFailurePercent,
  failures: failed,
  results,
};
const output = path.join(root, 'data/reports/official-url-health.json');
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Official URL verification: ${report.passed}/${report.checked} passed; ${failurePercent}% failed.`);
if (!report.healthy) process.exitCode = 1;

async function checkUrl(url) {
  const started = Date.now();
  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(timeoutMs), headers: { 'user-agent': 'TexasDefined source verifier/1.0' } });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(timeoutMs), headers: { 'user-agent': 'TexasDefined source verifier/1.0', range: 'bytes=0-1024' } });
    }
    return { url, ok: response.ok, status: response.status, finalUrl: response.url, durationMs: Date.now() - started };
  } catch (error) {
    return { url, ok: false, status: 0, durationMs: Date.now() - started, error: error instanceof Error ? error.message : String(error) };
  }
}
function matches(source, pattern) { return [...source.matchAll(pattern)].map((match) => match[1]); }
