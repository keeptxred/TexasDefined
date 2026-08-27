import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/explore.$category.lazy.tsx'), 'utf8');
const categoryPage = fs.readFileSync(path.join(root, 'src/components/editorial/CategoryPage.tsx'), 'utf8');
const authorityWrapper = fs.readFileSync(path.join(root, 'src/data/explore-category-authority.ts'), 'utf8');
const authorityServer = fs.readFileSync(path.join(root, 'src/data/explore-category-authority.server.ts'), 'utf8');
const apiRoute = fs.readFileSync(path.join(root, 'src/routes/api/public/explore-category-authority.ts'), 'utf8');
const indexability = fs.readFileSync(path.join(root, 'src/data/explore-category-indexability.ts'), 'utf8');
const errors = [];

for (const feature of [
  'getExploreCategoryAuthorityHtml(category.slug)',
  'return { category, articles, destinations, authorityHtml }',
]) {
  if (!route.includes(feature)) errors.push(`Explore loader authority contract missing: ${feature}.`);
}

for (const feature of [
  'const { destinations, authorityHtml } = Route.useLoaderData()',
  'authorityHtml={authorityHtml}',
]) {
  if (!lazyRoute.includes(feature)) errors.push(`Explore lazy-route rendering contract missing: ${feature}.`);
}

for (const feature of [
  'authorityHtml?: string | null',
  'belongsToExplore && authorityHtml',
  'dangerouslySetInnerHTML={{ __html: authorityHtml }}',
]) {
  if (!categoryPage.includes(feature)) errors.push(`Explore authority HTML rendering contract missing: ${feature}.`);
}

for (const feature of [
  'createIsomorphicFn',
  '.server((category: CategorySlug) => getExploreCategoryAuthorityHtmlServer(category))',
  '.client(async (category: CategorySlug) =>',
  'fetch(`/api/public/explore-category-authority?category=${encodeURIComponent(category)}`',
]) {
  if (!authorityWrapper.includes(feature)) errors.push(`Explore authority environment boundary missing: ${feature}.`);
}
if (authorityWrapper.includes('createServerFn')) errors.push('Explore authority must not register a createServerFn RPC in the protected main bundle.');
if (!authorityWrapper.includes('from "@/data/explore-category-authority.server"')) errors.push('Isomorphic wrapper must use the server-only authority corpus inside the server implementation.');

for (const feature of [
  'createFileRoute("/api/public/explore-category-authority")',
  'getExploreCategoryAuthorityHtmlServer(category)',
  '"content-type": "text/html; charset=utf-8"',
  '"x-content-type-options": "nosniff"',
]) {
  if (!apiRoute.includes(feature)) errors.push(`Explore authority API contract missing: ${feature}.`);
}

for (const feature of [
  'function escapeHtml(value: string)',
  '.replaceAll("&", "&amp;")',
  '.replaceAll("<", "&lt;")',
  '.replaceAll(">", "&gt;")',
  'function safeExternalUrl(value: string)',
  'url.protocol === "https:"',
  'function safeInternalHref(value: string)',
  'value.startsWith("/")',
  '!value.startsWith("//")',
  'rel="noopener noreferrer"',
]) {
  if (!authorityServer.includes(feature)) errors.push(`Explore authority safe-rendering control missing: ${feature}.`);
}

const blockFor = (slug) => {
  const marker = `  ${slug}: {`;
  const start = authorityServer.indexOf(marker);
  if (start < 0) return '';
  const nextMarkers = ['\n  outdoors: {', '\n  caverns: {']
    .map((candidate) => authorityServer.indexOf(candidate, start + marker.length))
    .filter((index) => index > start);
  const end = nextMarkers.length ? Math.min(...nextMarkers) : authorityServer.indexOf('\n};', start);
  return authorityServer.slice(start, end > start ? end : authorityServer.length);
};

const literalWordCount = (source) => {
  const literals = source.match(/"(?:\\.|[^"\\])*"/g) ?? [];
  const text = literals.map((literal) => {
    try { return JSON.parse(literal); } catch { return ''; }
  }).join(' ');
  return (text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g) ?? []).length;
};

for (const slug of ['outdoors', 'caverns']) {
  const block = blockFor(slug);
  if (!block) {
    errors.push(`Low-value Explore remediation authority block missing: ${slug}.`);
    continue;
  }
  const words = literalWordCount(block);
  const sections = (block.match(/heading:/g) ?? []).length;
  const sources = (block.match(/url: "https:\/\//g) ?? []).length;
  const relatedLinks = (block.match(/href: "\//g) ?? []).length;
  if (words < 700) errors.push(`Explore authority guide too thin (${words} literal words; minimum 700): ${slug}.`);
  if (sections < 5) errors.push(`Explore authority guide needs at least five substantive sections (${sections}): ${slug}.`);
  if (sources < 4) errors.push(`Explore authority guide needs at least four authoritative external sources (${sources}): ${slug}.`);
  if (relatedLinks < 3) errors.push(`Explore authority guide needs at least three internal discovery links (${relatedLinks}): ${slug}.`);
}

const stagedMatch = indexability.match(/STAGED_EXPLORE_CATEGORY_SLUGS\s*=\s*new Set<CategorySlug>\(\[([\s\S]*?)\]\)/);
const stagedBody = stagedMatch?.[1] ?? '';
for (const remediated of ['outdoors', 'caverns']) {
  if (new RegExp(`["']${remediated}["']`).test(stagedBody)) {
    errors.push(`Remediated Explore category remains staged noindex after authority expansion: ${remediated}.`);
  }
}

if (errors.length) {
  console.error('Explore category authority remediation validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore Outdoors and Caverns retain substantive authority depth, official sources, internal discovery, safe rendering, isomorphic server/client delivery, and index readiness.');
