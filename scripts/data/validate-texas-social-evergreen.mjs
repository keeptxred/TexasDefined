import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "src/data/texas-social-evergreen.ts",
  "src/data/texas-social-evergreen-batch2.ts",
];

const allowedCategories = new Set([
  "you-know",
  "texas-life",
  "weather",
  "food",
  "road-trip",
  "small-town",
  "home",
  "conversation",
]);

const posts = [];
for (const file of files) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) throw new Error(`Missing Texas social file: ${file}`);
  const source = fs.readFileSync(full, "utf8");
  const objectPattern = /\{\s*id:\s*"([^"]+)"\s*,\s*category:\s*"([^"]+)"\s*,\s*text:\s*"((?:[^"\\]|\\.)*)"([\s\S]*?)\}/g;
  for (const match of source.matchAll(objectPattern)) {
    const [, id, category, escapedText, tail] = match;
    const text = JSON.parse(`"${escapedText}"`);
    const linkMatch = tail.match(/link:\s*"([^"]+)"/);
    posts.push({ id, category, text, link: linkMatch?.[1] ?? null, file });
  }
}

if (posts.length < 100) {
  throw new Error(`Expected at least 100 Texas evergreen social posts; found ${posts.length}`);
}

const duplicateValues = (items, field) => {
  const seen = new Map();
  for (const item of items) {
    const key = item[field];
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key).push(item.file);
  }
  return [...seen.entries()].filter(([, sources]) => sources.length > 1);
};

const duplicateIds = duplicateValues(posts, "id");
if (duplicateIds.length) {
  throw new Error(`Duplicate Texas social IDs: ${duplicateIds.map(([id]) => id).join(", ")}`);
}

const duplicateText = duplicateValues(posts, "text");
if (duplicateText.length) {
  throw new Error(`Duplicate Texas social text found for ${duplicateText.length} entries`);
}

for (const post of posts) {
  if (!allowedCategories.has(post.category)) {
    throw new Error(`Invalid category ${post.category} on ${post.id}`);
  }
  if (!post.text.trim() || post.text.length > 500) {
    throw new Error(`Invalid text length on ${post.id}`);
  }
  if (post.link && (!post.link.startsWith("/") || post.link.startsWith("//"))) {
    throw new Error(`Invalid internal link on ${post.id}: ${post.link}`);
  }
}

const counts = Object.fromEntries(
  [...allowedCategories].map((category) => [category, posts.filter((post) => post.category === category).length]),
);

for (const [category, count] of Object.entries(counts)) {
  if (count < 10) throw new Error(`Texas social category ${category} is too thin: ${count}`);
}

console.log(`PASS Texas social evergreen pool: ${posts.length} posts`);
console.log(counts);
