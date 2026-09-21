import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];

const articleBody = read('src/components/editorial/ArticleBody.tsx');
const eventPage = read('src/routes/event.$slug.lazy.tsx');
const productionAudit = read('scripts/ci/audit-production-page-experience.mjs');
const qualityWatch = read('scripts/data/run-site-quality-watch.mjs');
const workflow = read('.github/workflows/audit-all-production-pages.yml');

function requireText(source, needle, label) {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
}

for (const needle of [
  'function normalizeEditorialHeading(text: string)',
  '/^why it belongs on the list[.!?]?$/i',
  'return "Why this matters"',
  '/^plan the visit[.!?]?$/i',
  'return "Planning your visit"',
  'render(normalizeEditorialHeading(block.text), 2)',
]) requireText(articleBody, needle, 'article legacy-heading normalization');

for (const needle of [
  'LEGACY_PLAN_VISIT_HEADING',
  'LEGACY_LISTICLE_HEADING',
  'MARGINED_STAY_SLOT',
  'removeStaySlotOuterMargin',
  'Why this matters',
  'Planning your visit',
  'injectStayNearbySlot(removeStaySlotOuterMargin(normalizeVisitorHeadings',
]) requireText(eventPage, needle, 'event page normalization');

for (const needle of [
  "const SITEMAPS = ['/sitemap.xml', '/sitemap-explore.xml', '/sitemap-texas-icons.xml']",
  "arrayValues('INDEXABLE_STATIC_PATHS')",
  "arrayValues('CONDITIONAL_INDEXABLE_PUBLIC_PATHS')",
  "arrayValues('NON_INDEXABLE_PUBLIC_PATHS')",
  "arrayValues('REDIRECT_ONLY_PATHS')",
  "target.mode === 'redirect'",
  'expected exactly one canonical',
  'sitemap/indexable page emits noindex',
  'expected exactly one visible-page H1',
  'legacy/generic heading still renders',
  'unfinished/placeholder guide copy',
  'empty Stay Nearby slot retains vertical margin',
  'image missing alt attribute',
  'thin visible SSR text signal',
  "fs.writeFileSync('page-experience-audit.json'",
]) requireText(productionAudit, needle, 'all-page production audit');

requireText(qualityWatch, "script: 'scripts/data/validate-page-experience.mjs'", 'site quality watch wiring');

for (const needle of [
  'name: Audit all TexasDefined production pages',
  'Deploy TexasDefined production',
  'workflow_dispatch:',
  'schedule:',
  'node --check scripts/ci/audit-production-page-experience.mjs',
  'node scripts/ci/audit-production-page-experience.mjs',
  'page-experience-audit.json',
]) requireText(workflow, needle, 'production audit workflow');

function walk(dir) {
  const values = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) values.push(...walk(full));
    else if (entry.isFile() && /\.(?:tsx?|jsx?)$/.test(entry.name)) values.push(full);
  }
  return values;
}

const routeFiles = walk(path.join(root, 'src/routes'));
const largeBlankFallback = /fallback\s*=\s*\{\s*<(?:main|div|section)\b[^>]*className=["'][^"']*(?:min-h-screen|min-h-\[(?:5[0-9]|[6-9]\d|1\d\d)vh\])[^"']*["'][^>]*\>\s*<\/(?:main|div|section)>\s*\}/g;

for (const file of routeFiles) {
  const source = fs.readFileSync(file, 'utf8');
  if (largeBlankFallback.test(source)) {
    failures.push(`${path.relative(root, file).replaceAll('\\', '/')}: large blank Suspense fallback can create scrollable dead space`);
  }
  largeBlankFallback.lastIndex = 0;
}

const fixtureDir = path.join(root, 'src/data/fixtures');
const legacyPhraseFiles = fs.existsSync(fixtureDir)
  ? walk(fixtureDir).filter((file) => /why it belongs on the list/i.test(fs.readFileSync(file, 'utf8')))
  : [];

if (failures.length) {
  console.error('Sitewide page-experience validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Sitewide page-experience safeguards passed across ${routeFiles.length} route source files. `
  + `${legacyPhraseFiles.length} legacy article source file(s) still contain the retired listicle heading, but the shared ArticleBody renderer now normalizes it before display; `
  + 'event pages normalize legacy visit headings and remove empty-slot outer margins; the post-deploy audit covers every sitemap plus governed static/noindex/redirect public HTML route.',
);
