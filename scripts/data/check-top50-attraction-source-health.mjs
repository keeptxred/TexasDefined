import fs from "node:fs";
import path from "node:path";

/**
 * Bounded weekly source link check for the 50 editorial attractions. This does
 * not rewrite text, move sourceCheckedAt, or claim facts are still correct.
 * The Top-25 check remains independent and unchanged.
 */
const root = process.cwd();
const sourceFiles = [
  "src/data/top-attraction-authority-sources.ts",
  "src/data/destination-authority-top-attractions.ts",
  "src/data/destination-authority-top50-wave1.ts",
  "src/data/top50-theme-park-destinations.ts",
  "src/data/congress-avenue-bat-colony-authority.ts",
  "src/data/top50-source-verified-faqs-wave2.ts",
  "src/data/top50-sports-venue-visitor-guidance.ts",
  "src/data/top50-event-visitor-answers.ts",
  "src/data/top50-museum-historic-upgrades.ts",
  "src/data/top50-final-visitor-faqs.ts",
  "src/data/top50-final-park-historic-authority.ts",
];
const urlPattern = /(?:officialUrl|reservationUrl|sourceUrl|url|href)["']?\s*:\s*["'](https:\/\/[^"'\s]+)["']/g;
const locations = new Map();
for(const name of sourceFiles) {
  const source = fs.readFileSync(path.join(root, name), "utf8");
  for(const match of source.matchAll(urlPattern)) {
    let url;
    try { url = new URL(match[1]); } catch { continue; }
    if (url.protocol !== "https:" || !url.hostname) continue;
    url.hash = "";
    const href = url.toString();
    const names = locations.get(href) ?? new Set();
    names.add(name);
    locations.set(href, names);
  }
}
const urls = [...locations.keys()].sort();
if(urls.length < 65) {
  console.error(`Top 50 source-health inventory too small: found ${urls.length} unique HTTPS citations; 65 minimum required. Do not mark source review complete.`);
  process.exit(1);
}
const timeoutMs = 12000;
const maxConcurrency = 5;
const queue = [...urls];
const results = [];
async function checkUrl(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        "user-agent": "TexasDefinedAuthoritySourceAudit/1.0 (+https://texasdefined.com/citation-guide)",
        "accept": "text/html,application/xhtml+xml,application/json;q=0.7,*/*;q=0.5"
      }
    });
    await response.body?.cancel();
    const restricted = [401,403,405,406,409,418,429].includes(response.status);
    const ok = (response.status >= 200 && response.status < 400) || restricted;
    return { url, status: response.status, ok, restricted, finalUrl: response.url, error: null, files: [...locations.get(url)] };
  } catch(e) {
    return { url, status: 0, ok: false, restricted: false, finalUrl: null, error: String(e?.message ?? e), files: [...locations.get(url)] };
  }
}
async function worker() {
  while(queue.length) {
    const url = queue.shift();
    if(url) results.push(await checkUrl(url));
  }
}
await Promise.all(Array.from({length:Math.min(maxConcurrency,queue.length)},()=>worker()));
results.sort((a,b)=>a.url.localeCompare(b.url));
const failed = results.filter(x=>!x.ok);
const restricted = results.filter(x=>x.restricted);
const report = {
  schemaVersion:1,scope:"top50-attractions",checkedAt:new Date().toISOString(),
  thresholds:{minSources:65,timeoutMs,maxConcurrency},
  counts:{checked:results.length,healthy:results.length-failed.length,restricted:restricted.length,failures:failed.length},
  results
};
const target=process.env.TOP50_SOURCE_HEALTH_REPORT ?? "artifacts/top50-attraction-source-health.json";
fs.mkdirSync(path.dirname(path.join(root,target)),{recursive:true});
fs.writeFileSync(path.join(root,target),JSON.stringify(report,null,2)+"\n");
console.log(`Top 50 attraction link check: ${report.counts.healthy}/${urls.length} reachable, ${restricted.length} access restricted, ${failed.length} broken or unconfirmed.`);
for(const x of failed) console.error(`FAILED ${x.status || "NETWORK"} ${x.url} [${x.files.join(", ")}] ${x.error ?? ""}`);
if(process.env.GITHUB_STEP_SUMMARY){
  const summary=["## Top 50 attraction source health",
    `- URLs checked: **${urls.length}**`,
    `- Reachable or restricted: **${report.counts.healthy}**`,
    `- Confirmed or suspected failures: **${failed.length}**`,
    "",
    ...failed.slice(0,80).map(x=>`- ${x.status || "NETWORK"} — ${x.url} (${x.files.join(", ")})`),
  ];
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary.join("\n")+"\n");
}
if(failed.length) process.exitCode = 1;
