import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/routes/api.ai.entities.ts',
  'src/routes/api.knowledge-graph.ts',
  'src/routes/llms[.]txt.ts',
];
const errors = [];

for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  if (!source.includes("'x-robots-tag': 'noindex, follow'")) {
    errors.push(`${file} must remain accessible but excluded from search-result indexing.`);
  }
}

const llmsSource = fs.readFileSync(path.join(root, 'src/routes/llms[.]txt.ts'), 'utf8');
const requiredDiscoveryTargets = [
  '/api/knowledge-graph',
  '/api/ai/entities',
  '/texas-data',
  '/browse/counties',
  '/browse/cities',
  '/decide/financial-tools',
  '/learn/property-taxes',
  '/explore',
  '/explore/lakes-rivers',
  '/explore/state-parks',
  '/explore/national-parks',
  '/explore/major-springs',
  '/explore/caverns',
  '/explore/beaches-coast',
  '/explore/historic-sites',
  '/explore/road-trips',
  '/explore/small-towns',
  '/explore/food-bbq',
  '/explore/outdoors',
  '/sitemap.xml',
  '/sitemap-explore.xml',
];

for (const target of requiredDiscoveryTargets) {
  if (!llmsSource.includes(`https://texasdefined.com${target}`)) {
    errors.push(`llms.txt must advertise ${target}.`);
  }
}

if (!llmsSource.includes('calculator outputs as illustrative planning estimates')) {
  errors.push('llms.txt must preserve calculator retrieval guidance.');
}

if (errors.length) {
  console.error('TexasDefined machine-indexing validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('TexasDefined machine endpoints and AI discovery guidance are protected.');
