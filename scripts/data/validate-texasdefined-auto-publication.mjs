import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};

const workflow = read('.github/workflows/texasdefined-auto-publication.yml');
const publisher = read('scripts/news/texasdefined-auto-publisher.mjs');
const migration = read('supabase/migrations/20260813143000_harden_texasdefined_auto_publication.sql');
const env = read('.env');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const remoteArticles = read('src/data/articles-remote.ts');
const route = readRouteSurface('src/routes/news.$slug.tsx');
const errors = [];

for (const token of ['workflow_dispatch:', 'mode:', 'dry-run', 'publish', 'TEXASDEFINED_AUTO_PUBLISH_ENABLED', 'PUBLISH_TEXASDEFINED']) {
  if (!workflow.includes(token)) errors.push(`Workflow is missing ${token}`);
}
if (/^\s*schedule:/m.test(workflow)) errors.push('Auto-publication schedule must remain disabled until activation is approved.');
for (const token of ['ready_for_rewrite IS TRUE', 'classification_confidence', 'texas_relevance_score', 'source_reputation_score', 'security_invoker', 'publish_texasdefined_queue_item_v2', 'FROM anon, authenticated', "TO service_role"]) {
  if (!migration.includes(token)) errors.push(`Migration is missing ${token}`);
}
for (const token of ['--publish', 'TEXASDEFINED_AUTO_PUBLISH_ENABLED', 'TEXASDEFINED_PUBLISH_CONFIRMATION', 'readyQueue()', 'validateDraft', 'generateAndStoreImage', 'publish_texasdefined_queue_item_v2']) {
  if (!publisher.includes(token)) errors.push(`Publisher is missing ${token}`);
}
if (env.includes('qhwwmdszjgkscqxgmenf')) errors.push('Retired TexasDefined Supabase project remains in .env.');
if (!env.includes('ftkznprjljkhymknvhye')) errors.push('Active shared Supabase project is absent from .env.');

for (const token of [
  'fetchPublishedTexasDefinedNewsArticles({ limit: 200 })',
  '...remoteNews.map((article) => ({ path: `/news/${article.slug}`',
  'fetchPublishedTexasDefinedEvergreenArticles({ limit: 200 })',
  '...remoteEvergreen.map((article) => ({ path: `/article/${article.slug}`',
]) {
  if (!sitemap.includes(token)) errors.push(`Published TexasDefined sitemap routing contract is missing ${token}`);
}
for (const token of [
  'if (kind === "evergreen") params.set("source_feed_id", "is.null")',
  'if (kind === "news") params.set("source_feed_id", "not.is.null")',
]) {
  if (!remoteArticles.includes(token)) errors.push(`Published TexasDefined source classification contract is missing ${token}`);
}
if (!route.includes('fetchPublishedTexasDefinedNewsArticle')) errors.push('Live /news article route must resolve only feed-backed published stories.');
for (const token of ['article.hero.credit', 'article.sourceUrl', 'article.relatedDestinations']) if (!route.includes(token)) errors.push(`Live article route is missing ${token}`);

if (errors.length) {
  console.error(`TexasDefined auto-publication readiness failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('TexasDefined auto-publication is guarded, source-gated, image-gated, disabled by default, and isolated to feed-backed /news routes while manual evergreen content remains on canonical /article routes.');