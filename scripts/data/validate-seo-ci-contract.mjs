import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const workflow = fs.readFileSync('.github/workflows/validate.yml', 'utf8');
const deployWorkflow = fs.readFileSync('.github/workflows/deploy-production.yml', 'utf8');
const validationSuite = fs.readFileSync('scripts/ci/run-validation-suite.mjs', 'utf8');
const errors = [];

const directValidators = [
  'validate-generated-page-quality.mjs',
  'validate-public-route-governance.mjs',
  'validate-indexation-quality.mjs',
  'validate-crawl-demand.mjs',
  'validate-freshness-signals.mjs',
  'validate-machine-indexing.mjs',
  'validate-aeo-answer-layers.mjs',
  'validate-homepage-seo.mjs',
  'validate-texas-explained-seo.mjs',
  'validate-things-unique-to-texas.mjs',
  'validate-texas-icon-link-depth.mjs',
  'validate-texas-weather-authority.mjs',
  'validate-texas-food-history.mjs',
  'validate-texas-culture-citation-index.mjs',
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
  'validate-knowledge-graph-behavior.mjs', 'validate-citation-magnets.mjs',
  'validate-citation-downloads.mjs', 'validate-gsc-evergreen-recovery.mjs',
  'validate-expedia-affiliate.mjs',
];

const cultureDeployValidators = [
  'validate-machine-indexing.mjs',
  'validate-things-unique-to-texas.mjs',
  'validate-texas-icon-link-depth.mjs',
  'validate-texas-weather-authority.mjs',
  'validate-texas-food-history.mjs',
  'validate-texas-culture-citation-index.mjs',
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

const workflowRunsMonolithicSeoGate = workflow.includes('npm run seo:validate');
const missingNamedWorkflowValidators = directValidators.filter((validator) => !workflow.includes(`node scripts/data/${validator}`));
const workflowRunsNamedSeoGates = missingNamedWorkflowValidators.length === 0;
const workflowRunsCentralSuite = workflow.includes('node scripts/ci/run-validation-suite.mjs full');
const missingCentralSuiteValidators = directValidators.filter((validator) => !validationSuite.includes(`scripts/data/${validator}`));
const workflowRunsCentralSeoGates = workflowRunsCentralSuite && missingCentralSuiteValidators.length === 0;

if (!workflowRunsMonolithicSeoGate && !workflowRunsNamedSeoGates && !workflowRunsCentralSeoGates) {
  errors.push(`Validate workflow must run npm run seo:validate, preserve every named direct SEO validator, or invoke the authoritative validation suite with every direct validator registered. Missing named gates: ${missingNamedWorkflowValidators.join(', ') || 'none'}. Missing suite registrations: ${missingCentralSuiteValidators.join(', ') || 'none'}.`);
}

const workflowRetainsSeoContract = (
  workflow.includes('Validate SEO CI contract') && workflow.includes('node scripts/data/validate-seo-ci-contract.mjs')
) || (
  workflowRunsCentralSuite && validationSuite.includes('scripts/data/validate-seo-ci-contract.mjs')
);
if (!workflowRetainsSeoContract) {
  errors.push('Validate workflow must retain the SEO CI contract either as its own named gate or as a protected registration in the authoritative validation suite.');
}
if (!workflow.includes('Build production application')) errors.push('Validate workflow must retain the production build gate.');
if (!workflow.includes('cancel-in-progress: true')) errors.push('Validate workflow should cancel superseded runs to reduce wasted CI minutes.');

const deployRunsCentralPredeploy = deployWorkflow.includes('node scripts/ci/run-validation-suite.mjs predeploy');
const legacyCultureGatePresent = deployWorkflow.includes('Validate Texas culture authority before deploy');
const centralCultureGatePresent = deployWorkflow.includes('Validate authority before deploy') && deployRunsCentralPredeploy;
if (!legacyCultureGatePresent && !centralCultureGatePresent) {
  errors.push('Production deploy workflow must retain the Texas culture authority predeploy gate.');
}
for (const validator of cultureDeployValidators) {
  const legacyDirect = deployWorkflow.includes(`node scripts/data/${validator}`);
  const centralRegistered = deployRunsCentralPredeploy && validationSuite.includes(`scripts/data/${validator}`);
  if (!legacyDirect && !centralRegistered) {
    errors.push(`Production deploy workflow must run ${validator} before the production build/deploy.`);
  }
}

const cultureGatePosition = deployRunsCentralPredeploy
  ? deployWorkflow.indexOf('node scripts/ci/run-validation-suite.mjs predeploy')
  : deployWorkflow.indexOf('Validate Texas culture authority before deploy');
const buildPosition = deployWorkflow.indexOf('Build production bundle');
const deployPosition = deployWorkflow.indexOf('Deploy TexasDefined Worker');
if (cultureGatePosition < 0 || buildPosition < 0 || deployPosition < 0 || cultureGatePosition > buildPosition || cultureGatePosition > deployPosition) {
  errors.push('Texas culture authority validation must run before the production build and Worker deployment.');
}

if (errors.length) {
  console.error('SEO CI contract validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

for (const validator of delegatedValidators) {
  const result = spawnSync(process.execPath, [`scripts/data/${validator}`], { stdio: 'inherit', env: process.env });
  if (result.error) {
    console.error(`::error file=scripts/data/${validator},title=SEO delegated validator could not start::${validator} could not start inside validate-seo-ci-contract.`);
    console.error(`SEO delegated validator could not start: ${validator}`);
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`::error file=scripts/data/${validator},title=SEO delegated validator failed::${validator} failed inside validate-seo-ci-contract with exit code ${result.status ?? 1}.`);
    console.error(`SEO delegated validator failed: ${validator}`);
    process.exit(result.status ?? 1);
  }
}

console.log(`SEO CI contract passed with ${protectedValidators.length} protected remediation validators (${directValidators.length} direct, ${delegatedValidators.length} delegated) plus ${cultureDeployValidators.length} culture-authority predeploy gates. The workflow may use one monolithic SEO gate, stricter named direct gates, or the authoritative validation suite while preserving the 91-link Texas icon-depth floor, generated-page quality, citation discovery, GSC evergreen recovery, machine-readable citation-download protections and Texas culture deployment safety.`);
