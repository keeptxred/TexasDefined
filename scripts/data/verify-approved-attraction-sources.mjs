import { readFileSync } from "node:fs";
const manifest = JSON.parse(readFileSync(new URL("../../docs/editorial/attraction-approval-2026-11-17/attraction-source-verification.json", import.meta.url), "utf8"));
const urls = [...new Set(manifest.attractions.flatMap((entry) => entry.sources.map((source) => source.fetchUrl)))];
let failed = 0;
for (const url of urls) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(18000), headers: { "user-agent": "TexasDefinedEditorialSourceCheck/1.0 (+https://texasdefined.com)" } });
    if (!response.ok) {
      console.error("REVIEW NEEDED", response.status, url);
      failed++;
    } else {
      console.log("OK", response.status, url);
    }
    await response.body?.cancel();
  } catch (error) {
    console.error("REVIEW NEEDED", url, error.message);
    failed++;
  }
}
if (failed) {
  console.error(failed + " source(s) need manual review. Do not automatically alter page facts.");
  process.exitCode = 1;
}
