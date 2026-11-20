import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "src/data/texas-social-evergreen.ts",
  "src/data/texas-social-evergreen-batch2.ts",
];

function hash32(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function parsePosts() {
  const posts = [];
  for (const file of files) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    const pattern = /\{\s*id:\s*"([^"]+)"\s*,\s*category:\s*"([^"]+)"\s*,\s*text:\s*"((?:[^"\\]|\\.)*)"([\s\S]*?)\}/g;
    for (const match of source.matchAll(pattern)) {
      const [, id, category, escapedText, tail] = match;
      const text = JSON.parse(`"${escapedText}"`);
      const promptMatch = tail.match(/prompt:\s*"((?:[^"\\]|\\.)*)"/);
      const prompt = promptMatch ? JSON.parse(`"${promptMatch[1]}"`) : null;
      const message = prompt ? `${text}\n\n${prompt}` : text;
      posts.push({ id, category, message });
    }
  }
  return posts;
}

const dateKey = process.env.TD_SOCIAL_DATE || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Chicago",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const slot = process.env.TD_SOCIAL_SLOT;
if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) throw new Error(`Invalid TD_SOCIAL_DATE: ${dateKey}`);
if (slot !== "morning" && slot !== "evening") throw new Error(`Invalid TD_SOCIAL_SLOT: ${slot}`);

// A reviewed, protected-main JSON request can select one exact approved post
// when the existing workflow is triggered by a path-filtered push. Ordinary
// workflow_dispatch calls retain the original seeded evergreen rotation.
const approvedFile = process.env.TD_SOCIAL_APPROVED_POST_FILE;
if (approvedFile) {
  if (!/^src\/data\/social-approved-facebook-posts\/[a-z0-9-]+\.json$/.test(approvedFile)) {
    throw new Error("Approved Facebook post path is outside the allowlist");
  }
  const approved = JSON.parse(fs.readFileSync(path.join(root, approvedFile), "utf8"));
  if (
    approved.approved !== true ||
    approved.site !== "texasdefined" ||
    typeof approved.id !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(approved.id) ||
    approved.id.length > 64 ||
    typeof approved.category !== "string" ||
    !["food", "texas-life", "road-trip", "small-town", "home"].includes(approved.category) ||
    typeof approved.message !== "string" ||
    approved.message.length < 40 ||
    approved.message.length > 2000 ||
    !approved.message.includes("https://texasdefined.com/") ||
    /\b(?:localhost|javascript:)\b/i.test(approved.message)
  ) {
    throw new Error("Invalid exact TexasDefined Facebook approved-post manifest");
  }
  process.stdout.write(JSON.stringify({
    date: dateKey,
    slot,
    id: approved.id,
    category: approved.category,
    message: approved.message,
  }));
  process.exit(0);
}

const posts = parsePosts();
if (posts.length < 100) throw new Error(`Expected at least 100 TexasDefined social posts; found ${posts.length}`);

const start = hash32(`texasdefined-facebook-openai:${dateKey}`) % posts.length;
const offset = slot === "morning" ? 0 : Math.max(1, Math.floor(posts.length / 2));
const selected = posts[(start + offset) % posts.length];
if (!selected?.message) throw new Error("TexasDefined Facebook selector produced no post text");

process.stdout.write(JSON.stringify({
  date: dateKey,
  slot,
  id: selected.id,
  category: selected.category,
  message: selected.message,
}));
