import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/explore.$category.lazy.tsx'), 'utf8');
const categoryPage = fs.readFileSync(path.join(root, 'src/components/editorial/CategoryPage.tsx'), 'utf8');
const authorityBoundary = fs.readFileSync(path.join(root, 'src/data/explore-category-authority.ts'), 'utf8');
const authorityServer = fs.readFileSync(path.join(root, 'src/data/explore-category-authority.server.ts'), 'utf8');
const indexability = fs.readFileSync(path.join(root, 'src/data/explore-category-indexability.ts'), 'utf8');
const errors = [];

for (const feature of [
  'getExploreCategoryAuthorityHtml',
  'getExploreCategoryAuthorityHtml(category.slug)',
  'authorityHtml',
  'return { category, articles, destinations, authorityHtml }',
]) {
  if (!route.includes(feature)) errors.push(`Explore authority loader contract missing: ${feature}.`);
}

for (const feature of [
  'const { destinations, authorityHtml } = Route.useLoaderData()',
  'authorityHtml={authorityHtml}',
]) {
  if (!lazyRoute.includes(feature)) errors.push(`Explore authority loader-to-view handoff missing: ${feature}.`);
}

for (const feature of [
  'authorityHtml?: string | null',
  'belongsToExplore && authorityHtml',
  'dangerouslySetInnerHTML={{ __html: authorityHtml }}',
]) {
  if (!categoryPage.includes(feature)) errors.push(`Explore authority HTML rendering contract missing: ${feature}.`);
}

for (const feature of [
  'createServerFn({ method: "GET" })',
  'await import("./explore-category-authority.server")',
  'getExploreCategoryAuthorityHtmlServer(data.category)',
]) {
  if (!authorityBoundary.includes(feature)) errors.push(`Explore authority server boundary missing: ${feature}.`);
}
if (authorityBoundary.includes('title: "How to explore wild Texas"') || authorityBoundary.includes('title: "A practical guide to caves and caverns in Texas"')) {
  errors.push('Long-form Explore authority copy must remain server-only and out of the protected client bundle.');
}
if (route.includes('explore-category-authority.server') || lazyRoute.includes('explore-category-authority.server') || categoryPage.includes('explore-category-authority.server')) {
  errors.push('Client-visible Explore route/view files must not import the server-only authority corpus directly.');
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

console.log('Explore Outdoors and Caverns retain server-only substantive authority depth, official sources, internal discovery, safe HTML rendering, client-bundle isolation, and index readiness.');
