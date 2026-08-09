import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const FIXTURES = path.join(ROOT, "src/data/fixtures");
const INDEX_FILE = path.join(ROOT, "src/data/index.ts");
const CHAT_OVERRIDES = path.join(FIXTURES, "chat-article-hero-overrides.ts");

const normalizeImage = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";

  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      return `${url.origin}${url.pathname}`.toLowerCase();
    } catch {
      return raw.toLowerCase();
    }
  }

  return raw.replace(/\\/g, "/").replace(/[?#].*$/, "").toLowerCase();
};

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile() && entry.name.endsWith(".ts")) files.push(full);
  }
  return files;
}

function importMap(source) {
  const imports = new Map();
  const pattern = /import\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+)["'];?/g;
  for (const match of source.matchAll(pattern)) imports.set(match[1], match[2]);
  return imports;
}

function resolveSrc(expression, imports) {
  const value = expression.trim();
  const literal = value.match(/^["'`]([^"'`]+)["'`]$/);
  if (literal) return literal[1];
  if (/^[A-Za-z_$][\w$]*$/.test(value) && imports.has(value)) return imports.get(value);
  return "";
}

function scanArticleLiterals(source, file) {
  const imports = importMap(source);
  const slugMatches = [...source.matchAll(/\bslug\s*:\s*["'`]([^"'`]+)["'`]/g)];
  const articles = [];

  for (let index = 0; index < slugMatches.length; index += 1) {
    const match = slugMatches[index];
    const start = match.index ?? 0;
    const end = index + 1 < slugMatches.length ? (slugMatches[index + 1].index ?? source.length) : source.length;
    const segment = source.slice(start, end);
    const bodyAt = segment.search(/\bbody\s*:/);
    if (bodyAt < 0) continue;

    const beforeBody = segment.slice(0, bodyAt);
    const hero = beforeBody.match(/\bhero\s*:\s*\{[\s\S]*?\bsrc\s*:\s*([^,\n}]+)/);
    if (!hero) continue;

    const image = resolveSrc(hero[1], imports);
    if (!image) continue;

    articles.push({
      slug: match[1],
      image,
      file: path.relative(ROOT, file).replace(/\\/g, "/"),
    });
  }

  return articles;
}

function mapOverrides(source) {
  const overrides = new Map();
  const entryPattern = /["']([^"']+)["']\s*:\s*\{[\s\S]*?\bsrc\s*:\s*["'`]([^"'`]+)["'`][\s\S]*?\}/g;
  for (const match of source.matchAll(entryPattern)) overrides.set(match[1], match[2]);

  const specialSlug = source.match(/const\s+TEXAS_UNDERGROUND_SLUG\s*=\s*["'`]([^"'`]+)["'`]/)?.[1];
  const specialHero = source.match(/const\s+TEXAS_UNDERGROUND_HERO\s*=\s*\{[\s\S]*?\bsrc\s*:\s*["'`]([^"'`]+)["'`]/)?.[1];
  if (specialSlug && specialHero) overrides.set(specialSlug, specialHero);

  return overrides;
}

function chatOverrides(source, articlesByFile) {
  const defaults = importMap(source);
  const baseFiles = new Map();
  const baseImportPattern = /import\s*\{\s*[A-Za-z_$][\w$]*\s+as\s+([A-Za-z_$][\w$]*)\s*\}\s*from\s*["'](\.\/[^"']+)["'];?/g;
  for (const match of source.matchAll(baseImportPattern)) baseFiles.set(match[1], match[2]);

  const overrides = new Map();
  const exportPattern = /export\s+const\s+[A-Za-z_$][\w$]*\s*=\s*\{[\s\S]*?\.\.\.([A-Za-z_$][\w$]*)[\s\S]*?hero\s*:\s*\{[\s\S]*?\bsrc\s*:\s*([^,\n}]+)/g;
  for (const match of source.matchAll(exportPattern)) {
    const baseAlias = match[1];
    const relativeBase = baseFiles.get(baseAlias);
    if (!relativeBase) continue;

    const basePath = path.resolve(FIXTURES, `${relativeBase.replace(/^\.\//, "")}.ts`);
    const baseArticle = articlesByFile.get(basePath)?.[0];
    if (!baseArticle) continue;

    const image = resolveSrc(match[2], defaults);
    if (image) overrides.set(baseArticle.slug, image);
  }
  return overrides;
}

async function changedFixtureFiles() {
  if (process.argv.includes("--all")) return null;

  const candidates = [];
  if (process.env.GITHUB_BASE_REF) candidates.push(`origin/${process.env.GITHUB_BASE_REF}...HEAD`);
  candidates.push("HEAD^...HEAD");

  for (const range of candidates) {
    try {
      const { stdout } = await execFileAsync("git", ["diff", "--name-only", range], { cwd: ROOT });
      return new Set(stdout.split(/\r?\n/).filter((name) => name.startsWith("src/data/fixtures/") && name.endsWith(".ts")));
    } catch {
      // Try the next range. Local shallow clones may not have a merge base.
    }
  }

  return new Set();
}

const files = await walk(FIXTURES);
const articles = [];
const articlesByFile = new Map();
for (const file of files) {
  const source = await fs.readFile(file, "utf8");
  const rows = scanArticleLiterals(source, file);
  articles.push(...rows);
  articlesByFile.set(file, rows);
}

const finalBySlug = new Map(articles.map((article) => [article.slug, { ...article }]));

try {
  const chatSource = await fs.readFile(CHAT_OVERRIDES, "utf8");
  for (const [slug, image] of chatOverrides(chatSource, articlesByFile)) {
    const row = finalBySlug.get(slug);
    if (row) row.image = image;
  }
} catch {
  // The override file is optional to the scanner.
}

const indexSource = await fs.readFile(INDEX_FILE, "utf8");
for (const [slug, image] of mapOverrides(indexSource)) {
  const row = finalBySlug.get(slug);
  if (row) row.image = image;
}

const groups = new Map();
for (const article of finalBySlug.values()) {
  const key = normalizeImage(article.image);
  if (!key) continue;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(article);
}

const duplicates = [...groups.entries()]
  .filter(([, rows]) => new Set(rows.map((row) => row.slug)).size > 1)
  .sort(([a], [b]) => a.localeCompare(b));

const changed = await changedFixtureFiles();
const violations = duplicates.filter(([, rows]) => {
  if (changed === null) return true;
  return rows.some((row) => changed.has(row.file));
});

console.log(`Scanned ${finalBySlug.size} editorial article heroes.`);
if (duplicates.length) console.log(`Found ${duplicates.length} duplicate hero image group(s) site-wide.`);

if (!violations.length) {
  if (duplicates.length && changed !== null) {
    console.log("No newly changed editorial fixture participates in a duplicate hero group.");
  } else {
    console.log("Editorial hero image uniqueness check passed.");
  }
  process.exit(0);
}

console.error("\nEditorial hero image duplicate guard failed:");
for (const [image, rows] of violations) {
  console.error(`\n${image}`);
  for (const row of rows) console.error(`  - ${row.slug} (${row.file})`);
}
console.error("\nEvery editorial article must have its own hero image. Reuse is allowed for non-editorial destination cards, but not between article slugs.");
process.exit(1);
