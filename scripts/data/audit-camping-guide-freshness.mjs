import fs from "node:fs";
import path from "node:path";

const directory = "src/data/camping";
const profileFiles = fs.readdirSync(directory).filter(name => /^discovery\.ts$|^profiles-wave\d+\.ts$/.test(name));
const normalize = value => value.replace(/&amp;/g, "&");
const refs = new Map();
const reviewDates = [];
for (const name of profileFiles) {
  const text = fs.readFileSync(path.join(directory, name), "utf8");
  for (const match of text.matchAll(/(?:url|reservationUrl):\s*"(https:\/\/[^"]+)"/g)) {
    const u = normalize(match[1]);
    if (/^(?:https:\/\/)(?:tpwd\.texas\.gov|www\.nps\.gov|www\.recreation\.gov|www\.fs\.usda\.gov|www\.swf-wc\.usace\.army\.mil)/.test(u)) refs.set(u, name);
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
  officialUrls: refs.size, reviewDates, stale, checked: [], failures: [] };
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
        const response = await fetch(url, { signal: controller.signal, headers: { "user-agent": "TexasDefined Official Camping Source Health" } });
        report.checked.push({ url, status: response.status, file: refs.get(url) });
        if (response.status === 404 || response.status === 410) report.failures.push({url, status: response.status, file: refs.get(url)});
      } catch (error) {
        report.checked.push({ url, error: String(error), file: refs.get(url) });
        report.failures.push({url, error: String(error), file: refs.get(url)});
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
  checked: report.checked.length, brokenOrUnreachable: report.failures.length, staleBatches: stale.length, report: output }));
