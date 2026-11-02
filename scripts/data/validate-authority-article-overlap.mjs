import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Compare editorial prose only, never shared facts, addresses, source citations,
 * recurring UI components or navigation. Every audited page is an actual declared
 * canonical article in the ownership registry; adding a new family requires an
 * explicit extractable editorial source, not mass-generated near-identical pages.
 */
const owners = JSON.parse(readFileSync("src/data/authority/content-ownership.json", "utf8"));
const editorialSources = {
  "fredericksburg-texas-wineries-things-to-do-guide": {
    path: "src/data/fixtures/fredericksburg-authority-guide.ts", format: "ts-paragraph",
  },
  "fredericksburg-history-weekend-guide": {
    path: "src/data/fixtures/fredericksburg-history-weekend-guide.ts", format: "ts-paragraph",
  },
  "texas-wine-country": {
    path: "src/data/fixtures/regional-authority-guides.ts", format: "serialized-object",
  },
};
const textTokens = (text) => text.toLowerCase()
  .replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/).filter(Boolean);
function shingles(text) {
  const words = textTokens(text);
  const values = new Set();
  for (let i = 0; i + 7 <= words.length; i += 1)
    values.add(words.slice(i, i + 7).join(" "));
  return values;
}
function similarity(left, right) {
  const a = shingles(left), b = shingles(right);
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const value of a) if (b.has(value)) shared += 1;
  return shared / (a.size + b.size - shared);
}
function editorialParagraphs(slug, spec) {
  const source = readFileSync(resolve(spec.path), "utf8");
  let scope = source;
  let pattern;
  if (spec.format === "ts-paragraph") {
    if (!source.includes('slug: "' + slug + '"'))
      throw new Error("Article missing from editorial source: " + slug);
    pattern = /\bp\("((?:[^"\\]|\\.){140,})"\)/gs;
  } else if (spec.format === "serialized-object") {
    const anchor = source.indexOf('"slug": "' + slug + '"');
    if (anchor < 0) throw new Error("Serialized article slug not found: " + slug);
    const next = source.indexOf('\n  {\n    "id": ', anchor + 1);
    scope = source.slice(anchor, next >= 0 ? next : undefined);
    pattern = /"type": "paragraph",\s*"text": "((?:[^"\\]|\\.){140,})"/gs;
  } else throw new Error("Unsupported editorial source format: " + spec.format);
  const paragraphs = [...scope.matchAll(pattern)]
    .map((match) => match[1].replace(/\\\"/g, '"').replace(/\s+/g, " ").trim());
  if (paragraphs.length < 3)
    throw new Error("Editorial overlap audit cannot find substantive paragraphs for " + slug);
  return paragraphs;
}
let examined = 0;
const matches = [];
for (const cluster of owners.clusters ?? []) {
  const articles = (cluster.pages ?? [])
    .filter((page) => page.path.startsWith("/article/"))
    .map((page) => page.path.slice("/article/".length));
  if (articles.length < 2) continue;
  const content = articles.map((slug) => {
    const spec = editorialSources[slug];
    if (!spec) throw new Error("No source mapped for article in ownership cluster " + cluster.id + ": " + slug);
    return { slug, paragraphs: editorialParagraphs(slug, spec) };
  });
  examined += content.length;
  for (let i = 0; i < content.length; i += 1) {
    for (let j = i + 1; j < content.length; j += 1) {
      for (const a of content[i].paragraphs) {
        for (const b of content[j].paragraphs) {
          const score = similarity(a, b);
          if (score >= 0.82)
            matches.push({ first: content[i].slug, second: content[j].slug,
              score: Number(score.toFixed(2)), excerpt: a.slice(0, 100) });
        }
      }
    }
  }
}
if (!examined) throw new Error("Authority editorial audit processed no declared article cluster");
if (matches.length) {
  console.error("Competing substantial editorial prose across different page intents:", JSON.stringify(matches, null, 2));
  process.exitCode = 1;
} else {
  console.log("Authority article-intent overlap passed: " + examined + " owned canonical articles");
}
