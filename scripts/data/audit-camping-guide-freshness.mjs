import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const directory = "src/data/camping";
const profileFiles = fs.readdirSync(directory).filter(name => /^discovery\.ts$|^profiles-wave\d+\.ts$/.test(name));
const normalize = value => value.replace(/&amp;/g, "&");
const refs = new Map();
const label = status => {
  if (status >= 200 && status < 300) return "healthy";
  if (status === 404 || status === 410) return "missing";
  if (status === 401 || status === 403) return "access-restricted";
  if (status === 408 || status === 425 || status === 429 || status >= 500) return "temporary-http-failure";
  return "unexpected-http-status";
};
const shouldRetry = status => [408, 425, 429, 500, 502, 503, 504].includes(status);

const campingFacts = /\bcamp(?:ing|ground|site)?s?\b|reserv|facilit|amenit|electric|hookup|shower|restroom|toilet|dump.station|water|generator|accessib|permit|clos(?:ure|ed)|fire|primitive|overnight|trailer|motorhome|rv\b/i;
// Do not hash raw HTML, menus, timestamps, analytics or site scripts. This
// fingerprint is a CHANGE SIGNAL only, never a license to restamp facts.
function relevantSourceDigest(raw) {
  const cleaned = raw.replace(/<(?:script|style|noscript|nav|header|footer|svg)\b[^>]*>[\s\S]*?<\/(?:script|style|noscript|nav|header|footer|svg)>/gi, ' ');
  const facts = [...cleaned.matchAll(/<(?:p|li|h[1-6]|td|dt|dd)\b[^>]*>([\s\S]*?)<\/(?:p|li|h[1-6]|td|dt|dd)>/gi)]
    .map(m => m[1].replace(/<[^>]*>/g,' ').replace(/&(?:nbsp|amp|quot|#39|#x27);/gi,' ')
      .replace(/\s+/g,' ').trim().toLowerCase())
    .filter(line => line.length >= 18 && line.length <= 600 && campingFacts.test(line));
  const unique = [...new Set(facts)].sort();
  if (unique.length < 2) return null;
  return createHash('sha256').update(unique.join('\n')).digest('hex');
}
const previousPath = process.env.CAMPING_PREVIOUS_SOURCE_REPORT;
let previous = new Map();
if (previousPath && fs.existsSync(previousPath)) {
  const saved = JSON.parse(fs.readFileSync(previousPath,'utf8'));
  if (saved.scope !== 'TexasDefined camping profile sources only' || !Array.isArray(saved.checked))
    throw Error('Previous camping audit artifact has an invalid source scope');
  previous = new Map(saved.checked.filter(x => x.fingerprint && x.url).map(x => [x.url,x.fingerprint]));
}

if (process.argv.includes("--self-test")) {
  for (const status of [200, 201, 206]) assert.equal(label(status), "healthy");
  for (const status of [404, 410]) assert.equal(label(status), "missing");
  for (const status of [401, 403]) assert.equal(label(status), "access-restricted");
  for (const status of [408, 429, 500, 503]) assert.equal(label(status), "temporary-http-failure");
  for (const status of [301, 302, 400, 451]) assert.equal(label(status), "unexpected-http-status");
  assert.equal(shouldRetry(429), true);
  assert.equal(shouldRetry(503), true);
  assert.equal(shouldRetry(404), false);
  const sample = "<main><p>Campground reservations require advance booking.</p><li>RV sites have electric hookups and showers.</li></main>";
  assert.equal(relevantSourceDigest(sample), relevantSourceDigest("<script>var updated=Date.now()</script>" + sample), "analytics timestamps do not change campground fingerprint");
  assert.notEqual(relevantSourceDigest(sample), relevantSourceDigest(sample.replace("require advance booking", "are first come first served")), "reservation policy changes must be detected");
  assert.equal(relevantSourceDigest("<html><script>no campsites</script></html>"), null, "no evidence must not be treated as a verified fingerprint");
  console.log("Camping source health classification self-test passed: 2xx, missing, restricted, rate-limited, server failure and redirect.");
  process.exit(0);
}
const reviewDates = [];
for (const name of profileFiles) {
  const text = fs.readFileSync(path.join(directory, name), "utf8");
  for (const match of text.matchAll(/(?:url|reservationUrl):\s*"(https:\/\/[^"]+)"/g)) {
    const u = normalize(match[1]);
    if (/^(?:https:\/\/)(?:tpwd\.texas\.gov|www\.nps\.gov|www\.recreation\.gov|www\.fs\.usda\.gov|www\.swf-wc\.usace\.army\.mil|lcraparks\.com|www\.brackenridgepark\.com|sratx\.org|www\.gbra\.org|www\.lnra\.org)/.test(u)) refs.set(u, [...new Set([...(refs.get(u) || []), name])]);
  }
  for (const match of text.matchAll(/(?:VERIFIED_AT\s*=|verifiedAt:)\s*"(\d{4}-\d{2}-\d{2})"/g)) {
    reviewDates.push({ file: name, date: match[1] });
  }
}
if (refs.size < 20) throw Error("Unexpectedly small official-source set (" + refs.size + "); refuse a misleading audit");
if (reviewDates.length < 7) throw Error("Profile review dates missing; refuse a misleading audit");
const maxAgeDays = 120;
const now = Date.now();
const stale = reviewDates.filter(x => (now - Date.parse(x.date + "T00:00:00Z")) / 86400000 > maxAgeDays);
const report = { checkedAt: new Date().toISOString(), scope: "TexasDefined camping profile sources only",
  officialUrls: refs.size, reviewDates, stale, checked: [], failures: [], categories: {} };
console.log("Official camping source URLs:", refs.size, "dated profile batches:", reviewDates.length);
if (process.argv.includes("--offline")) {
  if (stale.length) console.warn("STALE PROFILE BATCHES:", JSON.stringify(stale));
  if (stale.length) process.exitCode = 2;
} else {
  const urls = [...refs.keys()];
  let next = 0;
  async function worker() {
    while (next < urls.length) {
      const url = urls[next++];
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        let response;
        let attempts = 0;
        for (let i = 0; i < 2; i++) {
          attempts++;
          response = await fetch(url, { signal: controller.signal, headers: { "user-agent": "TexasDefined Official Camping Source Health" }, redirect: "follow" });
          if (!shouldRetry(response.status) || i === 1) break;
          // One bounded retry for transient provider failures. Never infer a
          // campground was removed from a 403, 429 or 5xx response.
          await new Promise(resolve => setTimeout(resolve, 700));
        }
        const classification = label(response.status);
        const requested = new URL(url);
        const reached = new URL(response.url);
        const crossHost = requested.hostname !== reached.hostname;
        let category = classification === "healthy" && crossHost ? "redirected-source" : classification;
        let fingerprint = null;
        if (category === "healthy" && /(?:text\/html|application\/xhtml\+xml)/i.test(response.headers.get("content-type") || "")) {
          fingerprint = relevantSourceDigest((await response.text()).slice(0, 2_000_000));
          if (fingerprint && previous.has(url) && previous.get(url) !== fingerprint) category = "source-content-changed";
        }
        const check = { url, status: response.status, category, attempts, finalUrl: response.url, files: refs.get(url), fingerprint };
        report.checked.push(check);
        report.categories[category] = (report.categories[category] || 0) + 1;
        if (category !== "healthy") report.failures.push(check);
      } catch (error) {
        const check = { url, category: "unreachable", error: String(error), files: refs.get(url) };
        report.checked.push(check);
        report.categories.unreachable = (report.categories.unreachable || 0) + 1;
        report.failures.push(check);
      } finally { clearTimeout(timeout); }
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  if (report.failures.length || stale.length) process.exitCode = 2;
}
const output = process.env.CAMPING_SOURCE_REPORT || ".artifacts/camping-authority-source-health.json";
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
console.log("Camping source audit:", JSON.stringify({ officialUrls: report.officialUrls,
  checked: report.checked.length, sourceHealthIssues: report.failures.length, classifications: report.categories, staleBatches: stale.length, report: output }));
