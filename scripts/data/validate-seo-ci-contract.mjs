import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const workflow = fs.readFileSync('.github/workflows/validate.yml', 'utf8');
const errors = [];

const directValidators = [
  'validate-generated-page-quality.mjs',
  'validate-public-route-governance.mjs',
  'validate-indexation-quality.mjs',
  'validate-crawl-demand.mjs',
  'validate-machine-indexing.mjs',
  'validate-aeo-answer-layers.mjs',
  'validate-homepage-seo.mjs',
  'validate-explore-category-seo.mjs',
  'validate-explore-region-seo.mjs',
  'validate-explore-topical-authority.mjs',
  'validate-article-discover-seo.mjs',
  'validate-author-eeat.mjs',
  'validate-entity-template-quality.mjs',
  'validate-image-seo.mjs',
  'validate-search-rendering-performance.mjs',
  'validate-content-duplication.mjs',
  'validate-sitemap-routes.mjs',
  'validate-internal-link-discovery.mjs',
  'validate-search-intent-ctr.mjs',
];

const delegatedValidators = [
  'validate-website-search-action.mjs', 'validate-global-search-destinations.mjs',
  'validate-explore-route-registration.mjs', 'validate-destination-data-integrity.mjs',
  'validate-destination-relationships.mjs', 'validate-explore-profile-enrichment.mjs',
  'validate-destination-card-enrichment.mjs', 'validate-remote-homepage-destinations.mjs',
  'validate-texas-resources-seo.mjs', 'validate-texas-living-seo.mjs', 'validate-living-authority.mjs',
  'validate-shop-schema.mjs', 'validate-data-center-seo.mjs', 'validate-place-directory-seo.mjs',
  'validate-financial-tools-seo.mjs', 'validate-guides-seo.mjs', 'validate-practical-guides-seo.mjs',
  'validate-property-tax-guide-seo.mjs', 'validate-calculator-app-seo.mjs',
  'validate-knowledge-graph-platform.mjs', 'validate-internal-linking.mjs',
  'validate-internal-link-policy-release.mjs', 'validate-internal-link-golden-corpus.mjs',
  'validate-knowledge-graph-behavior.mjs',
];

const protectedValidators = [...directValidators, ...delegatedValidators];
const seoScript = packageJson.scripts?.['seo:validate'] ?? '';
const dataScript = packageJson.scripts?.['data:validate'] ?? '';
const generatedPageScript = packageJson.scripts?.['generated-pages:validate'] ?? '';
if (!seoScript) errors.push('package.json must expose an seo:validate script.');
if (!generatedPageScript.includes('validate-generated-page-quality.mjs')) errors.push('package.json must expose generated-pages:validate as a permanent standalone gate.');
if (!dataScript.includes('validate-generated-page-quality.mjs')) errors.push('data:validate must run the generated-page quality validator.');

for (const validator of protectedValidators) {
  if (!fs.existsSync(`scripts/data/${validator}`)) errors.push(`Missing SEO validator file: ${validator}`);
}
for (const validator of directValidators) {
  if (!seoScript.includes(validator)) errors.push(`seo:validate does not run ${validator}`);
}

if (!workflow.includes('npm run seo:validate')) errors.push('Validate workflow must run npm run seo:validate as a dedicated CI gate.');
if (!workflow.includes('Build production application')) errors.push('Validate workflow must retain the production build gate.');
if (!workflow.includes('cancel-in-progress: true')) errors.push('Validate workflow should cancel superseded runs to reduce wasted CI minutes.');

if (errors.length) {
  console.error('SEO CI contract validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

for (const validator of delegatedValidators) {
  const result = spawnSync(process.execPath, [`scripts/data/${validator}`], { stdio: 'inherit', env: process.env });
  if (result.error) {
    console.error(`SEO delegated validator could not start: ${validator}`);
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`SEO delegated validator failed: ${validator}`);
    process.exit(result.status ?? 1);
  }
}

console.log(`SEO CI contract passed with ${protectedValidators.length} protected remediation validators (${directValidators.length} direct, ${delegatedValidators.length} delegated), including the permanent generated-page quality gate.`);
