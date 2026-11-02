import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Editorial-body overlap guard for a cluster whose pages have distinct intents.
 * This intentionally excludes repeated citations, source names, links, prices,
 * UI widgets and standard navigation: those are legitimate shared facts.
 */
const articles = [
  ["winery-planning", "src/data/fixtures/fredericksburg-authority-guide.ts"],
  ["history-weekend", "src/data/fixtures/fredericksburg-history-weekend-guide.ts"],
];
function editorialParagraphs(path) {
  const source = readFileSync(resolve(path), "utf8");
  return [...source.matchAll(/\bp\("((?:[^"\\]|\\.){140,})"\)/gs)].map((match) =>
    match[1].replaceAll(/\\"/g, '"').replace(/\s+/g, " ").trim(),
  );
}
const tokens = (text) => text.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/).filter(Boolean);
function shingles(text) {
  const words = tokens(text);
  const values = new Set();
  for (let i = 0; i + 7 <= words.length; i += 1) values.add(words.slice(i, i + 7).join(" "));
  return values;
}
function similarity(left, right) {
  const a = shingles(left), b = shingles(right);
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const value of a) if (b.has(value)) shared += 1;
  return shared / (a.size + b.size - shared);
}
const content = articles.map(([id, path]) => ({id, path, paragraphs: editorialParagraphs(path)}));
const matches = [];
for (let i = 0; i < content.length; i += 1) {
  for (let j = i + 1; j < content.length; j += 1) {
    for (const a of content[i].paragraphs) {
      for (const b of content[j].paragraphs) {
        const score = similarity(a, b);
        if (score >= 0.82) matches.push({first:content[i].id,second:content[j].id,score:Number(score.toFixed(2)),text:a.slice(0,100)});
      }
    }
  }
}
if (matches.length) {
  console.error("Competing substantial editorial prose across page intents:", JSON.stringify(matches, null, 2));
  process.exitCode = 1;
} else {
  console.log("Fredericksburg article-intent overlap passed: " + content.map(x => x.id + "=" + x.paragraphs.length).join(", "));
}
