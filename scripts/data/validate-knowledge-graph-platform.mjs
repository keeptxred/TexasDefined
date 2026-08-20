import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const errors = [];
const required = [
  'src/data/knowledge-graph/generated.ts',
  'src/data/knowledge-graph/relationships.ts',
  'src/data/knowledge-graph/audit.ts',
  'src/data/knowledge-graph/explore-adapter.ts',
  'src/components/content/AutoEntityLinks.tsx',
  'src/routes/$kind.$slug.tsx',
  'src/routes/api.ai.entities.ts',
  'src/routes/llms[.]txt.ts',
  'scripts/data/import-authoritative-entities.mjs',
  'scripts/data/prepare-entity-promotion.mjs',
  '.github/workflows/import-entities.yml',
];
for (const file of required) if (!fs.existsSync(path.join(root, file))) errors.push(`Missing Phase 1 platform file: ${file}`);

const registry = read('src/data/texas-entity-registry.ts');
const generated = read('src/data/knowledge-graph/generated.ts');
const exploreAdapter = read('src/data/knowledge-graph/explore-adapter.ts');
const importer = read('scripts/data/import-authoritative-entities.mjs');
const promoter = read('scripts/data/prepare-entity-promotion.mjs');
const article = read('src/routes/article.$slug.tsx');
const articleBody = read('src/components/editorial/ArticleBody.tsx');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const health = `${read('src/routes/admin.platform-health.tsx')}\n${read('src/routes/admin.platform-health.lazy.tsx')}`;

if (!registry.includes('GENERATED_KNOWLEDGE_GRAPH_ENTITIES')) errors.push('Generated imports are not connected to the production registry.');
if (!generated.includes('GENERATED_KNOWLEDGE_GRAPH_ENTITIES')) errors.push('Generated graph export is missing.');
for (const feature of ['explore_entity_types(key,name)', 'MAX_GRAPH_ENTITIES', 'fetchExploreGraphPage', "replace(/[\\s_]+/g, '-')", "value.includes('cavern')", "value.includes('museum')"]) {
  if (!exploreAdapter.includes(feature)) errors.push(`Complete Explore graph feature missing: ${feature}.`);
}
for (const feature of ["process.argv.includes('--write')",'normalizeRecord','reviewDueAt','staged-only','prepare-entity-promotion.mjs']) if (!importer.includes(feature)) errors.push(`Import staging feature missing: ${feature}.`);
for (const feature of ["process.argv.includes('--promote')",'generatedPath','GENERATED_KNOWLEDGE_GRAPH_ENTITIES','safeToPromote','ENTITY_PROMOTION_APPROVAL','rollbackSnapshot']) if (!promoter.includes(feature)) errors.push(`Governed promotion feature missing: ${feature}.`);
for (const feature of ['ArticleBody blocks={article.body} entities={graph}','mentions: mentions.map','loadTexasKnowledgeGraph']) if (!article.includes(feature)) errors.push(`Article graph integration missing: ${feature}.`);
for (const feature of ['AutoEntityLinks','linked = new Set']) if (!articleBody.includes(feature)) errors.push(`Article auto-linking feature missing: ${feature}.`);
for (const feature of ['loadTexasKnowledgeGraph','canonicalEntityPath']) if (!sitemap.includes(feature)) errors.push(`Entity sitemap feature missing: ${feature}.`);
for (const feature of ['auditTexasKnowledgeGraph','missingOfficialUrls','duplicateAliases','Graph review queue']) if (!health.includes(feature)) errors.push(`Graph health feature missing: ${feature}.`);

if (errors.length) {
  console.error('TexasDefined knowledge-graph platform validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('TexasDefined knowledge-graph phases 1.1–1.6 validated.');
