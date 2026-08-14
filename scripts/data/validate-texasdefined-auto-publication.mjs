import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/texasdefined-auto-publication.yml', 'utf8');
const publisher = fs.readFileSync('scripts/news/texasdefined-auto-publisher.mjs', 'utf8');
const migration = fs.readFileSync('supabase/migrations/20260813143000_harden_texasdefined_auto_publication.sql', 'utf8');
const env = fs.readFileSync('.env', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const route = fs.readFileSync('src/routes/news.$slug.tsx', 'utf8');
const errors = [];

for (const token of ['workflow_dispatch:', 'schedule:', "cron: '17 13 * * *'", 'mode:', 'dry-run', 'publish', "TEXASDEFINED_AUTO_PUBLISH_ENABLED: 'true'", 'PUBLISH_TEXASDEFINED', "github.event_name == 'schedule'", '--publish --limit=1']) {
  if (!workflow.includes(token)) errors.push(`Workflow is missing ${token}`);
}
for (const token of ['ready_for_rewrite IS TRUE', 'classification_confidence', 'texas_relevance_score', 'source_reputation_score', 'security_invoker', 'publish_texasdefined_queue_item_v2', 'FROM anon, authenticated', "TO service_role"]) {
  if (!migration.includes(token)) errors.push(`Migration is missing ${token}`);
}
for (const token of ['--publish', 'TEXASDEFINED_AUTO_PUBLISH_ENABLED', 'TEXASDEFINED_PUBLISH_CONFIRMATION', 'readyQueue()', 'validateDraft', 'generateAndStoreImage', 'publish_texasdefined_queue_item_v2']) {
  if (!publisher.includes(token)) errors.push(`Publisher is missing ${token}`);
}
if (env.includes('qhwwmdszjgkscqxgmenf')) errors.push('Retired TexasDefined Supabase project remains in .env.');
if (!env.includes('ftkznprjljkhymknvhye')) errors.push('Active shared Supabase project is absent from .env.');
if (!sitemap.includes('fetchPublishedTexasDefinedArticles({ limit: 200 })') || !sitemap.includes('`/news/${article.slug}`')) errors.push('Published TexasDefined articles are missing from the sitemap.');
for (const token of ['article.hero.credit', 'article.sourceUrl', 'article.relatedDestinations']) if (!route.includes(token)) errors.push(`Live article route is missing ${token}`);

if (errors.length) {
  console.error(`TexasDefined auto-publication readiness failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('TexasDefined auto-publication is source-gated, image-gated, limited to one article per scheduled run, and active daily.');
