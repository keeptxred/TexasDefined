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

const queueFile = "src/lib/texas-social-facebook-queue.ts";
const queuePath = path.join(root, queueFile);
if (!fs.existsSync(queuePath)) throw new Error(`Missing Facebook draft queue: ${queueFile}`);
const queueSource = fs.readFileSync(queuePath, "utf8");

const requiredQueueMarkers = [
  'enabled: false',
  'postsPerDay: 2',
  'status: "draft"',
  'canPublish: false',
  'assertTexasFacebookPublishingDisabled',
  'TexasDefined Facebook publishing is not implemented in this module',
  'texasdefined:facebook:',
];

for (const marker of requiredQueueMarkers) {
  if (!queueSource.includes(marker)) {
    throw new Error(`Facebook queue safety marker missing: ${marker}`);
  }
}

const forbiddenPublisherMarkers = [
  "graph.facebook.com",
  "PAGE_ACCESS_TOKEN",
  "FACEBOOK_PAGE_ACCESS_TOKEN",
  "axios.post",
];

for (const marker of forbiddenPublisherMarkers) {
  if (queueSource.includes(marker)) {
    throw new Error(`Facebook queue must remain draft-only; forbidden publisher marker found: ${marker}`);
  }
}

const serverCalendarFile = "src/data/texas-social-calendar.functions.ts";
const serverCalendarPath = path.join(root, serverCalendarFile);
if (!fs.existsSync(serverCalendarPath)) throw new Error(`Missing server-side social calendar boundary: ${serverCalendarFile}`);
const serverCalendarSource = fs.readFileSync(serverCalendarPath, "utf8");

const requiredServerCalendarMarkers = [
  'createServerFn({ method: "GET" })',
  'await import("@/lib/texas-social-facebook-queue")',
  'enabled: false',
  'postsPerDay: 2',
  'origin: "https://texasdefined.com"',
];
for (const marker of requiredServerCalendarMarkers) {
  if (!serverCalendarSource.includes(marker)) {
    throw new Error(`Server-side social calendar safety marker missing: ${marker}`);
  }
}

const calendarFile = "src/routes/admin.social-calendar.tsx";
const calendarPath = path.join(root, calendarFile);
if (!fs.existsSync(calendarPath)) throw new Error(`Missing social calendar preview: ${calendarFile}`);
const calendarSource = fs.readFileSync(calendarPath, "utf8");

const requiredCalendarMarkers = [
  'createFileRoute("/admin/social-calendar")',
  'content: "noindex,nofollow"',
  'getTexasSocialCalendarPreview',
  'Publishing disabled',
  'no Facebook credentials, Graph API calls, scheduling action, or publish control',
];

for (const marker of requiredCalendarMarkers) {
  if (!calendarSource.includes(marker)) {
    throw new Error(`Social calendar safety marker missing: ${marker}`);
  }
}

if (calendarSource.includes('texas-social-facebook-queue')) {
  throw new Error("Social calendar route must not import the Facebook queue into the client bundle; use the server function boundary instead.");
}

for (const [label, source] of [[queueFile, queueSource], [serverCalendarFile, serverCalendarSource], [calendarFile, calendarSource]]) {
  for (const marker of forbiddenPublisherMarkers) {
    if (source.includes(marker)) {
      throw new Error(`${label} must remain draft-only/read-only; forbidden publisher marker found: ${marker}`);
    }
  }
}

console.log(`PASS Texas social evergreen pool: ${posts.length} posts`);
console.log(counts);
console.log("PASS Texas Facebook queue: disabled-by-default and draft-only");
console.log("PASS Texas social calendar: server-side queue boundary, read-only and noindex");
