import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const checks = [
  {
    id: 'generated-content',
    label: 'Thin, empty and generated-content quality',
    script: 'scripts/data/validate-generated-page-quality.mjs',
  },
  {
    id: 'county-property',
    label: 'Verified county property-tax source freshness and crawl policy',
    script: 'scripts/data/validate-county-property-enrichment.mjs',
  },
  {
    id: 'destination-indexing',
    label: 'Primary destination indexing and duplicate-unit consolidation',
    script: 'scripts/data/validate-destination-indexing-policy.mjs',
  },
  {
    id: 'content-integrity',
    label: 'Required content fields and data integrity',
    script: 'scripts/data/validate-content-data-integrity.mjs',
  },
  {
    id: 'duplication',
    label: 'Repetitive and duplicate content',
    script: 'scripts/data/validate-content-duplication.mjs',
  },
  {
    id: 'freshness',
    label: 'Freshness and stale-statistic signals',
    script: 'scripts/data/validate-freshness-signals.mjs',
  },
  {
    id: 'crawl-demand',
    label: 'Crawl-demand and sitemap namespace discipline',
    script: 'scripts/data/validate-crawl-demand.mjs',
  },
  {
    id: 'internal-discovery',
    label: 'Internal-link discovery and orphan risk',
    script: 'scripts/data/validate-internal-link-discovery.mjs',
  },
  {
    id: 'legacy-links',
    label: 'Legacy and redirected link integrity',
    script: 'scripts/data/validate-legacy-links.mjs',
  },
  {
    id: 'sitemap-routes',
    label: 'Sitemap and public-route coverage',
    script: 'scripts/data/validate-sitemap-routes.mjs',
  },
  {
    id: 'indexation',
    label: 'Indexation and canonical quality',
    script: 'scripts/data/validate-indexation-quality.mjs',
  },
  {
    id: 'production-data',
    label: 'Production data quality',
    script: 'scripts/data/validate-production-data.mjs',
  },
  {
    id: 'county-housing-costs',
    label: 'Official county housing and cost data readiness',
    script: 'scripts/data/validate-county-housing-costs.mjs',
  },
  {
    id: 'partner-inquiry',
    label: 'Partnership inquiry privacy and server-boundary controls',
    script: 'scripts/data/validate-partner-inquiry.mjs',
  },
  {
    id: 'destination-data',
    label: 'Destination and place data integrity',
    script: 'scripts/data/validate-destination-data-integrity.mjs',
  },
  {
    id: 'entity-templates',
    label: 'Entity-template completeness and questionable data',
    script: 'scripts/data/validate-entity-template-quality.mjs',
  },
  {
    id: 'image-quality',
    label: 'Image metadata and editorial-image quality',
    script: 'scripts/data/validate-image-seo.mjs',
  },
  {
    id: 'answer-layers',
    label: 'AEO answer-layer completeness',
    script: 'scripts/data/validate-aeo-answer-layers.mjs',
  },
];

const MAX_LOG_CHARS = 6000;
const startedAt = new Date();
const results = [];

for (const check of checks) {
  const start = Date.now();
  const result = spawnSync(process.execPath, [check.script], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 10 * 1024 * 1024,
  });
  const output = [result.stdout, result.stderr]
    .filter(Boolean)
    .join('\n')
    .trim();
  const passed = result.status === 0;
  results.push({
    ...check,
    passed,
    exitCode: result.status ?? 1,
    durationMs: Date.now() - start,
    output: output.slice(-MAX_LOG_CHARS),
  });
  console.log(`${passed ? 'PASS' : 'FAIL'} ${check.id} — ${check.label}`);
  if (!passed && output) console.error(output.slice(-MAX_LOG_CHARS));
}

const failed = results.filter((result) => !result.passed);
const finishedAt = new Date();
const report = [
  '# TexasDefined Site Quality Watch',
  '',
  `- Started: ${startedAt.toISOString()}`,
  `- Finished: ${finishedAt.toISOString()}`,
  `- Checks: ${results.length}`,
  `- Passed: ${results.length - failed.length}`,
  `- Failed: ${failed.length}`,
  '',
  '## Summary',
  '',
  '| Check | Result | Duration |',
  '|---|---:|---:|',
  ...results.map((result) => `| ${result.label.replaceAll('|', '\\|')} | ${result.passed ? 'PASS' : 'FAIL'} | ${(result.durationMs / 1000).toFixed(1)}s |`),
  '',
  ...(failed.length
    ? [
        '## Failures',
        '',
        ...failed.flatMap((result) => [
          `### ${result.label}`,
          '',
          `Command: \`node ${result.script}\``,
          '',
          '```text',
          result.output || `Exited with code ${result.exitCode} and no output.`,
          '```',
          '',
        ]),
      ]
    : [
        '## Result',
        '',
        'All recurring editorial, route, freshness, duplication, data-integrity and discovery checks passed.',
        '',
      ]),
].join('\n');

fs.writeFileSync('site-quality-report.md', report);
fs.writeFileSync('site-quality-report.json', JSON.stringify({
  startedAt: startedAt.toISOString(),
  finishedAt: finishedAt.toISOString(),
  passed: failed.length === 0,
  summary: {
    total: results.length,
    passed: results.length - failed.length,
    failed: failed.length,
  },
  results,
}, null, 2));

if (failed.length) {
  console.error(`Site quality watch failed: ${failed.length} of ${results.length} checks failed.`);
  process.exit(1);
}

console.log(`Site quality watch passed: ${results.length} checks passed.`);
