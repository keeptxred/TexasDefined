import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = ["src/data/texas-social-evergreen.ts", "src/data/texas-social-evergreen-batch2.ts"];
const allowedCategories = new Set(["you-know","texas-life","weather","food","road-trip","small-town","home","conversation"]);
const posts = [];

for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const pattern = /\{\s*id:\s*"([^"]+)"\s*,\s*category:\s*"([^"]+)"\s*,\s*text:\s*"((?:[^"\\]|\\.)*)"([\s\S]*?)\}/g;
  for (const match of source.matchAll(pattern)) {
    const [, id, category, escapedText, tail] = match;
    posts.push({ id, category, text: JSON.parse(`"${escapedText}"`), link: tail.match(/link:\s*"([^"]+)"/)?.[1] ?? null });
  }
}
if (posts.length < 100) throw new Error(`Expected at least 100 posts; found ${posts.length}`);
for (const field of ["id", "text"]) {
  const values = posts.map((post) => post[field]);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate social ${field}`);
}
for (const post of posts) {
  if (!allowedCategories.has(post.category)) throw new Error(`Invalid category on ${post.id}`);
  if (!post.text.trim() || post.text.length > 500) throw new Error(`Invalid text on ${post.id}`);
  if (post.link && (!post.link.startsWith("/") || post.link.startsWith("//"))) throw new Error(`Invalid link on ${post.id}`);
}
for (const category of allowedCategories) {
  if (posts.filter((post) => post.category === category).length < 10) throw new Error(`Category too thin: ${category}`);
}

const queueFile = "src/lib/texas-social-facebook-queue.ts";
const queue = fs.readFileSync(path.join(root, queueFile), "utf8");
for (const marker of ['enabled: false','postsPerDay: 2','status: "draft"','canPublish: false','assertTexasFacebookPublishingDisabled','TexasDefined Facebook publishing is not implemented in this module','texasdefined:facebook:']) {
  if (!queue.includes(marker)) throw new Error(`Queue safety marker missing: ${marker}`);
}

const apiFile = "src/routes/api.admin.social-calendar-preview.ts";
const api = fs.readFileSync(path.join(root, apiFile), "utf8");
for (const marker of ['createFileRoute("/api/admin/social-calendar-preview")','server:','handlers:','GET: async','await import("@/lib/texas-social-facebook-queue")','enabled: false','postsPerDay: 2','origin: "https://texasdefined.com"','"cache-control": "no-store"','"x-robots-tag": "noindex, nofollow"']) {
  if (!api.includes(marker)) throw new Error(`API safety marker missing: ${marker}`);
}

const calendarFile = "src/routes/admin.social-calendar.tsx";
const calendar = fs.readFileSync(path.join(root, calendarFile), "utf8");
for (const marker of ['createFileRoute("/admin/social-calendar")','content: "noindex,nofollow"','fetch("/api/admin/social-calendar-preview"','Publishing disabled','no Facebook credentials, Graph API calls, scheduling action, or publish control']) {
  if (!calendar.includes(marker)) throw new Error(`Calendar safety marker missing: ${marker}`);
}
if (calendar.includes("texas-social-facebook-queue") || calendar.includes("texas-social-evergreen")) throw new Error("Client calendar must not import social corpus or queue");

for (const [label, source] of [[queueFile, queue],[apiFile, api],[calendarFile, calendar]]) {
  for (const marker of ["graph.facebook.com","PAGE_ACCESS_TOKEN","FACEBOOK_PAGE_ACCESS_TOKEN","axios.post"]) {
    if (source.includes(marker)) throw new Error(`${label} contains forbidden publisher marker: ${marker}`);
  }
}

console.log(`PASS Texas social evergreen pool: ${posts.length} posts`);
console.log("PASS Texas Facebook queue: disabled-by-default and draft-only");
console.log("PASS Texas social calendar: server API boundary, read-only and noindex");
