import fs from 'node:fs/promises';
import path from 'node:path';

const ROOTS = ['src/routes', 'src/components', 'src/data/fixtures'];
const EXTENSIONS = new Set(['.ts', '.tsx', '.md', '.mdx']);
const OUT = process.env.EDITORIAL_LANGUAGE_AUDIT_JSON || '/tmp/texasdefined-editorial-language-audit.json';

const hardPatterns = [
  { code: 'machine-heading-what-this-does', re: /^what this .+ does$/i },
  { code: 'internal-jargon-false-precision', re: /\bfalse precision\b/i },
  { code: 'internal-jargon-decision-support', re: /\bdecision support\b/i },
  { code: 'internal-jargon-context-marker', re: /\bcontext marker\b/i },
  { code: 'internal-jargon-representation-guarantees', re: /\brepresentation guarantees\b/i },
  { code: 'internal-jargon-publication-posture', re: /\bpublication posture\b/i },
  { code: 'internal-jargon-source-posture', re: /\bsource posture\b/i },
];

const reviewPatterns = [
  { code: 'what-defines-heading', re: /^what defines (?:this|the|.+)$/i },
  { code: 'what-we-can-verify-heading', re: /^what we can verify$/i },
  { code: 'how-this-fits-heading', re: /^how this .+ fits (?:the|this)/i },
  { code: 'editorial-process-heading', re: /\b(?:operational facts?|editorial judgment)\b/i },
  { code: 'ritual-heading', re: /^make .+ a .+ ritual$/i },
];

function normalize(value = '') {
  return value.replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/\s+/g, ' ').trim();
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (EXTENSIONS.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function candidates(source) {
  const found = [];
  const push = (kind, value, index) => {
    const text = normalize(value);
    if (text.length >= 4 && !text.includes('${') && !/[{}<>]/.test(text)) found.push({ kind, text, index });
  };

  for (const match of source.matchAll(/<h([1-3])\b[^>]*>([^<{][\s\S]*?)<\/h\1>/gi)) push(`h${match[1]}`, match[2].replace(/<[^>]+>/g, ' '), match.index ?? 0);
  for (const match of source.matchAll(/\bh\(\s*["'`]([^"'`]+)["'`]\s*\)/g)) push('article-heading', match[1], match.index ?? 0);
  for (const match of source.matchAll(/\btitle\s*[:=]\s*["'`]([^"'`]+)["'`]/g)) push('title', match[1], match.index ?? 0);
  return found;
}

function lineNumber(source, index) {
  return source.slice(0, index).split('\n').length;
}

function matchPattern(item, pattern) {
  return pattern.re.test(item.text);
}

function normalizedAtRender(file, item) {
  if (!file.includes(`${path.sep}src${path.sep}data${path.sep}fixtures${path.sep}`) || item.kind !== 'article-heading') return false;
  return /^what defines .+/i.test(item.text)
    || /^how this guide fits the larger texas homecoming story$/i.test(item.text)
    || /^how this church fits the painted churches collection$/i.test(item.text);
}

function longCopyReview(item) {
  const limit = item.kind === 'title' ? 105 : 84;
  return item.text.length > limit;
}

const files = (await Promise.all(ROOTS.map(async (root) => {
  try { return await walk(root); } catch { return []; }
}))).flat().sort();

const hard = [];
const review = [];
for (const file of files) {
  const source = await fs.readFile(file, 'utf8');
  for (const item of candidates(source)) {
    const line = lineNumber(source, item.index);
    for (const pattern of hardPatterns) if (matchPattern(item, pattern)) hard.push({ file, line, kind: item.kind, text: item.text, code: pattern.code });
    if (!normalizedAtRender(file, item)) {
      for (const pattern of reviewPatterns) if (matchPattern(item, pattern)) review.push({ file, line, kind: item.kind, text: item.text, code: pattern.code });
    }
    if (longCopyReview(item)) review.push({ file, line, kind: item.kind, text: item.text, code: item.kind === 'title' ? 'long-title' : 'long-heading' });
  }
}

const report = {
  auditedAt: new Date().toISOString(),
  filesScanned: files.length,
  hardIssueCount: hard.length,
  reviewCount: review.length,
  hard,
  review,
};
await fs.writeFile(OUT, JSON.stringify(report, null, 2) + '\n');

console.log(`Editorial language audit scanned ${files.length} source files.`);
for (const item of hard) console.error(`FAIL ${item.file}:${item.line} [${item.code}] ${item.text}`);
for (const item of review.slice(0, 300)) console.warn(`REVIEW ${item.file}:${item.line} [${item.code}] ${item.text}`);
if (hard.length) process.exit(1);
console.log(`PASS: no high-confidence machine-like heading regressions; ${review.length} reader-facing heading/title candidate(s) remain in the review queue.`);
