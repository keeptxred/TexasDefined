import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

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

const adminFile = "src/routes/admin.tsx";
const admin = fs.readFileSync(path.join(root, adminFile), "utf8");
for (const marker of ["createFileRoute('/admin')", "content: 'noindex, nofollow, noarchive'"]) {
  if (!admin.includes(marker)) throw new Error(`Admin parent robots guard missing: ${marker}`);
}

const calendarFile = "src/routes/admin.social-calendar.tsx";
const calendar = fs.readFileSync(path.join(root, calendarFile), "utf8");
if (!calendar.includes('createFileRoute("/admin/social-calendar")')) throw new Error("Calendar route registration missing.");
if (calendar.includes("head:")) throw new Error("Calendar route must inherit the stronger admin parent robots guard without a child head override.");

const calendarLazyFile = "src/routes/admin.social-calendar.lazy.tsx";
const calendarLazy = fs.readFileSync(path.join(root, calendarLazyFile), "utf8");
for (const marker of ['createLazyFileRoute("/admin/social-calendar")','fetch("/api/admin/social-calendar-preview"','Publishing disabled','no Facebook credentials, Graph API calls, scheduling action, or publish control']) {
  if (!calendarLazy.includes(marker)) throw new Error(`Lazy calendar safety marker missing: ${marker}`);
}

for (const [label, source] of [[calendarFile, calendar], [calendarLazyFile, calendarLazy]]) {
  if (source.includes("texas-social-facebook-queue") || source.includes("texas-social-evergreen")) {
    throw new Error(`${label} must not import social corpus or queue`);
  }
}

for (const [label, source] of [[queueFile, queue],[apiFile, api],[calendarFile, calendar],[calendarLazyFile, calendarLazy]]) {
  for (const marker of ["graph.facebook.com","PAGE_ACCESS_TOKEN","FACEBOOK_PAGE_ACCESS_TOKEN","axios.post"]) {
    if (source.includes(marker)) throw new Error(`${label} contains forbidden publisher marker: ${marker}`);
  }
}

const selectorFile = "scripts/social/select-facebook-engagement.mjs";
const selector = fs.readFileSync(path.join(root, selectorFile), "utf8");
for (const marker of [
  'TD_SOCIAL_SLOT',
  'slot !== "morning" && slot !== "evening"',
  'const message = prompt ? `${text}\\n\\n${prompt}` : text;',
  'texasdefined-facebook-openai:',
]) {
  if (!selector.includes(marker)) throw new Error(`Facebook selector marker missing: ${marker}`);
}

const selected = ["morning", "evening"].map((slot) => JSON.parse(execFileSync(
  process.execPath,
  [path.join(root, selectorFile)],
  {
    cwd: root,
    env: { ...process.env, TD_SOCIAL_DATE: "2026-08-30", TD_SOCIAL_SLOT: slot },
    encoding: "utf8",
  },
)));
if (selected.some((item) => !item.id || !item.message || !item.category)) {
  throw new Error("Facebook selector returned an incomplete candidate");
}
if (selected[0].id === selected[1].id) throw new Error("Morning and evening Facebook selectors must not choose the same post");

const automationFile = ".github/workflows/auto-facebook-engagement.yml";
const automation = fs.readFileSync(path.join(root, automationFile), "utf8");
for (const marker of [
  'OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}',
  "prompt = 'Generate an image for this Facebook post.\\n\\n' + post_text",
  "https://api.openai.com/v1/images/generations",
  "'model': 'gpt-image-2'",
  "'size': '1536x1024'",
  "TD_IMAGE_ATTRIBUTION: Brought to you by your friends at TexasDefined.com",
  "expected_attribution='Brought to you by your friends at TexasDefined.com'",
  "/tmp/tdfb/attribution.txt",
  "/tmp/tdfb/attribution-footer.png",
  "generated-image-attributed.png",
  "TexasDefined attribution could not be applied to the generated image; publishing is blocked.",
  "'attribution': Path('/tmp/tdfb/attribution.txt').read_text(encoding='utf-8').strip()",
  "stored_attribution=$(tr -d '\\r\\n' < /tmp/tdfb-stored/attribution.txt)",
  "metadata.get('attribution') != expected_attribution",
  "actions/checkout@v7",
  "actions/upload-artifact@v7",
  "actions/download-artifact@v8",
  "/tmp/tdfb/post.txt",
  "/tmp/tdfb/prompt.txt",
  "if-no-files-found: error",
  "path: /tmp/tdfb-stored",
  "stored_sha=$(sha256sum /tmp/tdfb-stored/generated-image.png",
  "stored_manifest_sha=$(tr -d '[:space:]' < /tmp/tdfb-stored/image.sha256)",
  "cmp -s /tmp/tdfb/post.txt /tmp/tdfb-stored/post.txt",
  "expected_prompt = 'Generate an image for this Facebook post.\\n\\n' + stored_post",
  "image_compare=(magick compare)",
  "rendered-footer-proof.png",
  "expected-footer-normalized.png",
  "rendered-footer-normalized.png",
  "pixel_diff_raw=$(\"${image_compare[@]}\" -fuzz 2% -metric AE",
  "pixel_diff=${pixel_diff_raw%% *}",
  "total_footer_pixels=$(( stored_footer_width * stored_footer_height ))",
  "max_pixel_diff=$(( (total_footer_pixels + 199) / 200 ))",
  "allowed=${max_pixel_diff} (0.5%)",
  "Stored Facebook image does not contain the rendered TexasDefined.com footer within the allowed render tolerance",
  "-F \"post_text=</tmp/tdfb-stored/post.txt\"",
  "-F \"image=@/tmp/tdfb-stored/generated-image.png;type=${MIME_TYPE}\"",
  "/api/public/hooks/publish-texasdefined-generated-image",
  "failing closed",
]) {
  if (!automation.includes(marker)) throw new Error(`Facebook automation marker missing: ${marker}`);
}
for (const forbidden of [
  "default.jpg",
  "/og/default",
  "resolveTexasDefinedFacebookImage",
  "generic image",
  "fallback image",
  '-F "image=@/tmp/tdfb/generated-image.png',
  '-F "post_text=</tmp/tdfb/post.txt',
]) {
  if (automation.toLowerCase().includes(forbidden.toLowerCase())) {
    throw new Error(`Facebook automation contains forbidden fallback or pre-storage publish path: ${forbidden}`);
  }
}

console.log(`PASS Texas social evergreen pool: ${posts.length} posts`);
console.log("PASS Texas Facebook queue: disabled-by-default and draft-only");
console.log("PASS Texas social calendar: server API boundary, lazy client preview, read-only and inherited admin noindex");
console.log("PASS TexasDefined OpenAI Facebook engagement: exact prompt, deterministic TexasDefined.com attribution, stored/reloaded image, bounded 0.5% tolerance- and SHA-verified publish, no fallback");
