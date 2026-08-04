import fs from 'node:fs';

const errors = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const required = [
  'src/platform/internal-linking.ts',
  'src/components/content/AutoEntityLinks.tsx',
  'src/routes/api.internal-links.ts',
  'src/routes/article.$slug.tsx',
  'src/routes/destination.$slug.tsx',
];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing Phase 2 file: ${file}`);

const resolver = read('src/platform/internal-linking.ts');
const component = read('src/components/content/AutoEntityLinks.tsx');
const api = read('src/routes/api.internal-links.ts');
const article = read('src/routes/article.$slug.tsx');
const destination = read('src/routes/destination.$slug.tsx');

for (const feature of ['resolveInternalEntityLinks','InternalLinkPolicy','excludedKinds','existingHrefs','linkedEntityIds','rejectedAmbiguous','rejectedOverlap','entityPriority','internalLinkCoverage']) if (!resolver.includes(feature)) errors.push(`Internal-link resolver feature missing: ${feature}`);
for (const feature of ['data-entity-id','data-entity-kind','resolveInternalEntityLinks']) if (!component.includes(feature)) errors.push(`Internal-link component feature missing: ${feature}`);
for (const feature of ["createFileRoute('/api/internal-links')",'50000','diagnostics','cache-control']) if (!api.includes(feature)) errors.push(`Internal-link diagnostics API feature missing: ${feature}`);
if (!article.includes('ArticleBody blocks={article.body} entities={graph}')) errors.push('Article internal linking is not active.');
for (const feature of ['AutoEntityLinks','loadTexasKnowledgeGraph','excludedEntityIds']) if (!destination.includes(feature)) errors.push(`Destination internal linking feature missing: ${feature}`);

if (errors.length) {
  console.error('Phase 2 internal-linking validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Phase 2 internal-linking foundation is protected.');
