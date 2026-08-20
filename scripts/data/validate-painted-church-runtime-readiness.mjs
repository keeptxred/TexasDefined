import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const workdir = mkdtempSync(path.join(tmpdir(), 'painted-church-readiness-'));
const outfile = path.join(workdir, 'readiness.mjs');
const esbuild = path.resolve('node_modules', '.bin', process.platform === 'win32' ? 'esbuild.cmd' : 'esbuild');

try {
  const build = spawnSync(esbuild, [
    'src/data/painted-church-preindex-readiness.ts',
    '--bundle',
    '--platform=node',
    '--format=esm',
    '--target=node22',
    `--outfile=${outfile}`,
  ], { stdio: 'inherit' });

  if (build.error) throw build.error;
  if (build.status !== 0) {
    console.error(`Unable to bundle Painted Churches readiness model (exit ${build.status}).`);
    process.exit(build.status || 1);
  }

  const readiness = await import(`${pathToFileURL(outfile).href}?v=${Date.now()}`);
  const records = readiness.paintedChurchReadiness;
  if (!Array.isArray(records) || !records.length) {
    console.error('Painted Churches runtime readiness model returned no church records.');
    process.exit(1);
  }

  const blockers = records.filter((record) => !record.requiredComplete);
  const stretch = records.filter((record) => record.dimensions.some((dimension) => !dimension.requiredForIndexLaunch && !dimension.complete));

  console.log(`Painted Churches runtime authority audit: ${records.length} verified churches.`);
  if (stretch.length) console.log(`Authority stretch queue: ${stretch.length} church${stretch.length === 1 ? '' : 'es'} still have non-launch research opportunities.`);

  if (blockers.length) {
    console.error(`Pre-index release blocked: ${blockers.length} church${blockers.length === 1 ? '' : 'es'} miss one or more required authority dimensions.`);
    for (const record of blockers) {
      console.error(`\n${record.name} — ${record.city} (${record.slug})`);
      for (const dimension of record.dimensions.filter((item) => item.requiredForIndexLaunch && !item.complete)) {
        console.error(`  - ${dimension.label}: ${dimension.detail}`);
      }
    }
    process.exit(1);
  }

  if (!readiness.paintedChurchIndexLaunchReady) {
    console.error('Readiness records passed individually but aggregate launch-ready flag is false.');
    process.exit(1);
  }

  console.log(`Painted Churches runtime readiness passed for all ${records.length} verified churches. Search indexing remains a separate explicit release decision.`);
} finally {
  rmSync(workdir, { recursive: true, force: true });
}
