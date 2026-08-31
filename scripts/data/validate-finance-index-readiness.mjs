import fs from 'node:fs';

const depthSource = fs.readFileSync('src/data/fixtures/finance-evergreen-depth-3.ts', 'utf8');
const enrichmentSource = fs.readFileSync('src/data/fixtures/finance-index-readiness-enrichment.ts', 'utf8');
const lazySource = fs.readFileSync('src/data/fixtures/lazy-migrated-editorial.ts', 'utf8');
const readinessSource = fs.readFileSync('src/data/fixtures/texas-gateway-index-readiness.ts', 'utf8');
const failures = [];

const targets = [
  {
    slug: 'true-cost-of-owning-a-home-in-texas',
    baseStart: 'const trueCost = base({',
    baseEnd: 'const homeEquity = base({',
    enrichmentStart: 'const trueCostEnrichment: ArticleBlock[] = [',
    enrichmentEnd: 'const mortgagePaymentEnrichment: ArticleBlock[] = [',
    markers: ['Build reserves in layers', 'Build a reserve ladder'],
  },
  {
    slug: 'texas-mortgage-payment-guide',
    baseStart: 'const mortgagePayment = base({',
    baseEnd: 'export const financeEvergreenDepth3Articles',
    enrichmentStart: 'const mortgagePaymentEnrichment: ArticleBlock[] = [',
    enrichmentEnd: 'export function enrichFinanceIndexReadyArticle',
    markers: ['Escrow is cash management, not free money', 'Use a payment stack, not a teaser rate'],
  },
];

function between(source, start, end, label) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);
  if (startIndex < 0 || endIndex < 0) {
    failures.push(`${label}: could not parse source boundary.`);
    return '';
  }
  return source.slice(startIndex, endIndex);
}

function bodyOnly(articleSource, label) {
  const bodyIndex = articleSource.indexOf('body: [');
  if (bodyIndex < 0) {
    failures.push(`${label}: body array is missing.`);
    return '';
  }
  return articleSource.slice(bodyIndex + 'body: ['.length);
}

function decodeStringLiteral(literal) {
  try {
    return JSON.parse(literal);
  } catch {
    failures.push(`Could not decode article string literal: ${literal.slice(0, 80)}`);
    return '';
  }
}

function sourceWords(source) {
  const literals = source.match(/"(?:\\.|[^"\\])*"/g) ?? [];
  const text = literals.map(decodeStringLiteral).join(' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}

if (!readinessSource.includes('export const ARTICLE_INDEX_MIN_BODY_WORDS = 600;')) {
  failures.push('Shared article index-readiness threshold must remain 600 body words.');
}

for (const target of targets) {
  const baseRecord = between(depthSource, target.baseStart, target.baseEnd, `${target.slug} base record`);
  const baseBody = bodyOnly(baseRecord, target.slug);
  const enrichment = between(enrichmentSource, target.enrichmentStart, target.enrichmentEnd, `${target.slug} enrichment`);
  const effectiveWords = sourceWords(baseBody) + sourceWords(enrichment);

  if (effectiveWords < 600) {
    failures.push(`${target.slug}: effective body depth is ${effectiveWords} words; at least 600 are required for route-level indexing.`);
  }
  for (const marker of target.markers) {
    if (!`${baseBody}\n${enrichment}`.includes(marker)) failures.push(`${target.slug}: substantive marker missing: ${marker}`);
  }
}

for (const token of [
  'const { enrichFinanceIndexReadyArticle } = await import("./finance-index-readiness-enrichment");',
  'return enrichFinanceIndexReadyArticle(article);',
  'const article = financeEvergreenDepth3Articles.find((article) => article.slug === slug) ?? null;',
]) {
  if (!lazySource.includes(token)) failures.push(`Finance detail-loader index-readiness wiring missing: ${token}`);
}

for (const slug of targets.map((target) => target.slug)) {
  if (!enrichmentSource.includes(`article.slug === "${slug}"`)) failures.push(`Finance enrichment target missing: ${slug}`);
}

if (failures.length) {
  console.error('Finance article index-readiness validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Finance article index-readiness validation passed: the true-cost and mortgage-payment guides retain substantive production markers, exceed the unchanged 600-word route threshold after detail enrichment, and remain wired through the governed lazy article path.');
