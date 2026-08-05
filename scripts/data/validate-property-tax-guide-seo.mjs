import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const component = fs.readFileSync(path.join(root, 'src/components/guides/PropertyTaxGuidePage.tsx'), 'utf8');
const guides = [
  ['Homestead exemption', 'src/routes/do.homestead-exemption.tsx', '/do/homestead-exemption', 'homestead-step-'],
  ['Property tax protest', 'src/routes/do.property-tax-protest.tsx', '/do/property-tax-protest', 'protest-step-'],
  ['Appraisal districts', 'src/routes/learn.appraisal-districts.tsx', '/learn/appraisal-districts', 'appraisal-step-'],
];
const errors = [];

for (const feature of ['canonicalPath?: string', 'stepPrefix?: string', 'aria-label="Breadcrumb"', 'id={`${stepPrefix}${stepNumber}`}', 'aria-current="page"']) {
  if (!component.includes(feature)) errors.push(`Property-tax guide component feature missing: ${feature}.`);
}

for (const [label, filename, canonicalPath, stepPrefix] of guides) {
  const route = fs.readFileSync(path.join(root, filename), 'utf8');
  for (const feature of [
    "'@type': 'HowTo'",
    "'@type': 'HowToStep'",
    "'@type': 'BreadcrumbList'",
    'steps.map((text, index)',
    `canonicalPath = '${canonicalPath}'`,
    `url: \`${'${pageUrl}'}#${stepPrefix}${'${index + 1}'}\``,
    `stepPrefix="${stepPrefix}"`,
    'isPartOf: { \'@id\': `${siteUrl}/#website` }',
  ]) {
    if (!route.includes(feature)) errors.push(`${label} SEO feature missing: ${feature}.`);
  }
  if (route.includes('totalTime:') || route.includes('estimatedCost:') || route.includes('supply:') || route.includes('tool:')) {
    errors.push(`${label} must not invent time, cost, supplies, or tools.`);
  }
}

if (errors.length) {
  console.error('Property-tax guide SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Property-tax guide HowTo, anchored steps, and breadcrumb validation passed.');
