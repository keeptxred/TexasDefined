/**
 * Weekly bounded source-only Viator discovery. This is an editorial review
 * queue, not a public catalog or a content-publishing workflow.
 *
 * Each sampled attraction remains non-indexable, with no Viator prose, media,
 * reviews, admission or hours copied to TexasDefined's public source files.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { VIATOR_LIVE_DESTINATION_IDS } from "../../src/lib/viator-market-feed.ts";
import { triageAttractionCandidate } from "../../src/data/discovery/attraction-triage.ts";

const origin = (process.env.VIATOR_DISCOVERY_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const markets = Object.keys(VIATOR_LIVE_DESTINATION_IDS);
const results = [];
const failures = [];
for (const market of markets) {
  const url = new URL(`/api/viator/market/${market}/attractions`, origin);
  try {
    const response = await fetch(url.toString(), {
      headers: {"Accept":"application/json","User-Agent":"TexasDefined-Editorial-Attraction-Review/1.0"},
      redirect:"error", signal:AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw Error(`HTTP ${response.status}`);
    if (!response.headers.get("x-robots-tag")?.includes("noindex")) throw Error("Missing nonindexable supplier-data response");
    const json = await response.json();
    if (json.source !== "viator" || json.market !== market || json.robots !== "noindex" ||
        json.incomplete !== true || !Array.isArray(json.candidates) || json.candidates.length > 12) {
      throw Error("Invalid bounded supplier discovery contract");
    }
    const candidates = json.candidates.map((item)=>triageAttractionCandidate(item));
    results.push({market,checkedAt:json.checkedAt,candidates});
    console.log(`[attraction-review] ${market}: ${candidates.length} candidates; ${candidates.filter((c)=>c.possibleExistingSlug).length} possible editorial matches (review required)`);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    failures.push({market,detail});
    console.warn(`[attraction-review] ${market} unavailable: ${detail}`);
  }
}
const report={
  generatedAt:new Date().toISOString(),
  source:"Viator attraction API, nonindexable research-only source data",
  limitations:["First 12 provider results per market only","Not official attraction information","No publication without independent source review","Existing guide matches are suggestions, not identity proof"],
  markets:results,failures,
};
await mkdir(".artifacts",{recursive:true});
await writeFile(".artifacts/viator-attraction-review.json", JSON.stringify(report,null,2)+"\n", "utf8");
if (!results.length) {
  console.error("::error title=Viator discovery unavailable::No verified market yielded a usable supplier candidate feed");
  process.exitCode=1;
}
console.log(`[attraction-review] ${results.length}/${markets.length} markets checked; ${failures.length} source errors. Internal review artifact written; no page was created.`);
