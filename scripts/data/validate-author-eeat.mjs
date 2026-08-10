import fs from 'node:fs';

const failures = [];
const authorRoute = fs.readFileSync('src/routes/authors.$author.tsx', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const articleBody = fs.readFileSync('src/components/editorial/ArticleBody.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const about = fs.readFileSync('src/routes/about.tsx', 'utf8');

for (const feature of [
  'createFileRoute("/authors/$author")',
  '"@type": "ProfilePage"',
  '"@type": "Person"',
  'worksFor: { "@id": `${siteUrl}/#organization` }',
  'articles.filter((article) => article.authorId === author.id)',
  'Stories by ${author.name}',
  'ArticleCard article={article}',
]) {
  if (!authorRoute.includes(feature)) failures.push(`Author profile contract missing: ${feature}`);
}

for (const feature of [
  'to="/authors/$author"',
  'params={{ author: author.id }}',
]) {
  if (!articleBody.includes(feature)) failures.push(`Byline profile link missing: ${feature}`);
}

for (const feature of [
  'const authorUrl = author ? `${siteUrl}/authors/${author.id}` : null',
  'const authorId = authorUrl ? `${authorUrl}#person`',
  'url: authorUrl',
  'worksFor: { "@id": `${siteUrl}/#organization` }',
]) {
  if (!articleRoute.includes(feature)) failures.push(`Article canonical author identity missing: ${feature}`);
}

if (!sitemap.includes('platform.taxonomy.authors(scope)')) failures.push('Primary sitemap must load authors.');
if (!sitemap.includes('...authors.map((author) => ({ path: `/authors/${author.id}` }))')) failures.push('Primary sitemap must publish author profiles.');

for (const signal of ['Named bylines', 'Sources and official records', 'Corrections and updates', 'Clear separation of guidance']) {
  if (!about.includes(signal)) failures.push(`About-page editorial accountability signal missing: ${signal}.`);
}

if (failures.length) {
  console.error('Author E-E-A-T validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Canonical author profiles, byline identity, article schema, sitemap discovery and editorial accountability signals are protected.');
