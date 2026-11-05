import fs from "node:fs";
const definitions = fs.readFileSync("src/data/fishing/statewide-lake-network.ts", "utf8");
const curated = JSON.parse(fs.readFileSync("src/data/fishing/curated-access-sites.json", "utf8"));
const known = new Set(curated.map((x) => x.lakeId));
const lakes = [...definitions.matchAll(/slug:\s*"([^"]+)"[^\n]*tpwdSlug:\s*"([^"]+)"/g)]
  .map((m) => ({ lakeId: m[1], tpwd: m[2] }))
  .filter((row, index, all) => all.findIndex((x) => x.lakeId === row.lakeId) === index)
  .filter((row) => !known.has(row.lakeId));
if (lakes.length < 10) throw new Error("Unexpectedly few uncurated lake definitions");
const size = 8;
const batches = Math.ceil(lakes.length / size);
const arg = process.env.FISHING_DISCOVERY_BATCH;
const ordinal = arg === undefined || arg === "" ? Number(process.env.GITHUB_RUN_NUMBER ?? "1") - 1 : Number(arg);
if (!Number.isInteger(ordinal) || ordinal < 0) throw new Error("Invalid discovery batch");
const index = ordinal % batches;
const batch = lakes.slice(index * size, (index + 1) * size);
const plain = (s) => s.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&#x27;|&#39;/gi, "'").replace(/\s+/g, " ").trim();
const heads = (html) => [...new Set([...html.matchAll(/<h([3-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => plain(m[2]).replace(/^[A-Z]\d?:\s*/, "")).filter((s) => s.length >= 4 && s.length <= 100 && !/public access facilities|return to|fishing regulations|fishing reports/i.test(s)))].slice(0, 30);
async function checkPage(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(12000), redirect: "follow", headers: { "User-Agent": "TexasDefinedFishingDiscovery/1.0 (+https://texasdefined.com/fishing)" } });
  if (!r.ok) return { url, status: r.status, names: [] };
  const html = (await r.text()).slice(0, 500000);
  return { url, status: r.status, names: html.toLowerCase().includes("public access facilities") ? heads(html) : [] };
}
async function inspect(lake) {
  const root = "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/" + lake.tpwd + "/";
  const attempts = [];
  for (const file of ["access2.phtml", "access.phtml"]) {
    const url = root + file;
    try {
      const result = await checkPage(url);
      attempts.push({ url: result.url, http: result.status, found: result.names.length });
      if (result.names.length) return { ...lake, source: url, status: "source-candidates-found", names: result.names };
    } catch (error) { attempts.push({ url, error: String(error.message ?? error) }); }
  }
  return { ...lake, status: "needs-source-review", attempts };
}
const found = [];
for (let p = 0; p < batch.length; p += 4) found.push(...await Promise.all(batch.slice(p, p + 4).map(inspect)));
const report = { checkedAt: new Date().toISOString(), policy: "Unpublished candidates only; never auto-publish before individual source and lake checks", knownStatewideLakeDefinitions: lakes.length + known.size, curatedLakeGroups: known.size, uncuratedCandidateLakes: lakes.length, batchIndex: index, totalBatches: batches, results: found };
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(".artifacts/fishing-access-discovery.json", JSON.stringify(report, null, 2) + "\n");
const lines = ["# Fishing access source discovery", "", "Batch " + (index + 1) + " of " + batches + "; " + found.length + " official lake pages reviewed.", "", "Unpublished source candidates only. Individual facility details require verification before addition to public catalog.", "", ...found.map((x) => "- **" + x.lakeId + "**: " + x.status + "; " + (x.source ?? x.attempts?.[0]?.url ?? "none") + "; names: " + (x.names?.slice(0, 8).join(", ") ?? "none"))];
fs.writeFileSync(".artifacts/fishing-access-discovery.md", lines.join("\n") + "\n");
console.log(JSON.stringify({ batch: index, batches, inspected: found.length, sourceCandidates: found.reduce((n, x) => n + (x.names?.length ?? 0), 0), status: found.map((x) => ({ lake: x.lakeId, state: x.status })) }, null, 2));
if (found.some((x) => x.status === "needs-source-review")) process.exitCode = 1;
