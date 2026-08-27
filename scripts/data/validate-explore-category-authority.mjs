import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/explore.$category.lazy.tsx'), 'utf8');
const categoryPage = fs.readFileSync(path.join(root, 'src/components/editorial/CategoryPage.tsx'), 'utf8');
const authorityWrapper = fs.readFileSync(path.join(root, 'src/data/explore-category-authority.ts'), 'utf8');
const authorityServer = fs.readFileSync(path.join(root, 'src/data/explore-category-authority.server.ts'), 'utf8');
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
  'import.meta.env.SSR',
  'await import("@/data/explore-category-authority.server")',
  '"/content/explore-category-authority/outdoors.html"',
  '"/content/explore-category-authority/caverns.html"',
  'fetch(assetPath',
]) {
  if (!authorityWrapper.includes(feature)) errors.push(`Bundle-safe Explore authority boundary missing: ${feature}.`);
}
for (const forbidden of ['createServerFn', 'createIsomorphicFn', '/api/public/explore-category-authority']) {
  if (authorityWrapper.includes(forbidden)) errors.push(`Explore authority wrapper must not include protected-bundle overhead: ${forbidden}.`);
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

const htmlWordCount = (html) => (html.replace(/<[^>]+>/g, ' ').match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g) ?? []).length;

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
  if (words < 700) errors.push(`Explore server authority guide too thin (${words} literal words; minimum 700): ${slug}.`);
  if (sections < 5) errors.push(`Explore authority guide needs at least five substantive sections (${sections}): ${slug}.`);
  if (sources < 4) errors.push(`Explore authority guide needs at least four authoritative external sources (${sources}): ${slug}.`);
  if (relatedLinks < 3) errors.push(`Explore authority guide needs at least three internal discovery links (${relatedLinks}): ${slug}.`);

  const assetPath = path.join(root, 'public/content/explore-category-authority', `${slug}.html`);
  if (!fs.existsSync(assetPath)) {
    errors.push(`Static Explore authority asset missing: ${slug}.`);
    continue;
  }
  const html = fs.readFileSync(assetPath, 'utf8');
  const assetWords = htmlWordCount(html);
  const assetSections = (html.match(/<h3\b/g) ?? []).length;
  const officialLinks = (html.match(/href="https:\/\//g) ?? []).length;
  const internalLinks = (html.match(/href="\//g) ?? []).length;
  if (assetWords < 700) errors.push(`Static Explore authority asset too thin (${assetWords} words; minimum 700): ${slug}.`);
  if (assetSections < 5) errors.push(`Static Explore authority asset needs at least five substantive sections (${assetSections}): ${slug}.`);
  if (officialLinks < 4) errors.push(`Static Explore authority asset needs at least four authoritative external links (${officialLinks}): ${slug}.`);
  if (internalLinks < 3) errors.push(`Static Explore authority asset needs at least three internal links (${internalLinks}): ${slug}.`);
  if (/<script\b|\son\w+\s*=|javascript:/i.test(html)) errors.push(`Static Explore authority asset contains executable or unsafe markup: ${slug}.`);
  if ((html.match(/target="_blank"/g) ?? []).length !== (html.match(/rel="noopener noreferrer"/g) ?? []).length) {
    errors.push(`Static Explore authority asset external-link rel protections are incomplete: ${slug}.`);
  }
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

console.log('Explore Outdoors and Caverns retain 700+ words, substantive sections, official sources, internal discovery, safe rendering, static client assets, SSR-only corpus loading, and index readiness.');
