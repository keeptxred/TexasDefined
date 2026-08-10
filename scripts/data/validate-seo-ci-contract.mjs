import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const workflow = fs.readFileSync('.github/workflows/validate.yml', 'utf8');
const errors = [];

const requiredValidators = [
  'validate-public-route-governance.mjs',
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
];

const seoScript = packageJson.scripts?.['seo:validate'] ?? '';
if (!seoScript) errors.push('package.json must expose an seo:validate script.');

for (const validator of requiredValidators) {
  if (!fs.existsSync(`scripts/data/${validator}`)) errors.push(`Missing SEO validator file: ${validator}`);
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

console.log(`SEO CI contract passed with ${requiredValidators.length} protected remediation validators.`);
