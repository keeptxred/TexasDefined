/**
 * Bounded production follow-up to the 2026-11-02 pasted oversized-image audit.
 * The paste was labeled 110 but held only 50 image URLs (42 remote + 8 local).
 * Verify those 50 exact image identities on the live site; do NOT infer the 60
 * unavailable rows or turn this into a full-site scan on every deployment.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ORIGIN = "https://texasdefined.com";
const MAX_BODY_BYTES = 12_000_000;
const CONCURRENCY = 2;
const OUT = process.env.IMAGE_AUDIT_DIR || ".artifacts/image-payloads-20261102";
const SOURCES = String.raw`
c|Special:Redirect/file/San Solomon Springs Balmorhea State Park, Balmorhea, Texas.jpg
u|4/40/Tenth_Street_Historic_District_Freedmen's_Town_TxHM_(29573143580).jpg
u|4/45/San_Marcos_River_San_Marcos_Texas_2023.jpg
u|9/91/African_American_Museum_August_2016_10_(Facing_the_Rising_Sun_Freedman's_Cemetery_exhibit).jpg
c|Special:FilePath/Entrance Sign Neches River NWR.jpg
c|Special:Redirect/file/Dallas_Holocaust_&_Human_Rights_Museum_Photo.png?width=1600
c|Special:Redirect/file/Natural_bridge_caverns_bridge.jpg?width=1600
c|Special:Redirect/file/H-E-B.jpg
l|/images/explore/historic-sites/goliad-state-park.jpg
u|8/83/Llano_River_in_Junction,_TX_IMG_4345.JPG
c|Special:Redirect/file/Carl guenther house 2012.jpg?width=1600
u|b/ba/Comal_River_in_Landa_Park.jpg
c|Special:Redirect/file/Comal_River_in_Landa_Park.jpg?width=1600
c|Special:Redirect/file/Buc-ee's_Texas.jpg
c|Special:FilePath/Santa Ana National Wildlife Refuge.jpg
l|/images/state-parks/old-tunnel-state-park.jpg
l|/images/state-parks/mother-neff-state-park.jpg
c|Special:Redirect/file/San_augustine_county_tx_former_jail.jpg?width=1600
u|4/42/An_aerial_photo_of_the_USS_Lexington_in_Corpus_Christi.jpg
c|Special:Redirect/file/Olivewood_Cemetery,_Houston,_Texas_0505101341BW_(4590379590).jpg?width=1600
c|Special:Redirect/file/Austin_nature_center_entrance.jpg?width=1600
c|Special:FilePath/El Sal Del Rey.jpg
c|Special:Redirect/file/Acton_Cemetery_–_20190516_123629_(47809742402).jpg?width=1600
c|Special:Redirect/file/Edward steves homestead.jpg?width=1600
c|Special:Redirect/file/San_augustine_county_tx_courthouse_2015.jpg?width=1600
c|Special:Redirect/file/Harry_ransom_center_2012.jpg?width=1600
l|/images/explore/lakes-rivers/lake-meredith-national-recreation-area.jpg
c|Special:Redirect/file/Brazos valley museum of natural history.jpg?width=1600
c|Special:Redirect/file/Hiking_with_Dogs_(52360667545).jpg?width=1600
l|/images/explore/historic-sites/alibates-flint-quarries-national-monument.jpg
c|Special:FilePath/Anahuac National Wildlife Refuge (5A) Chambers Co. TX; 1 Dec 2018.jpg
c|Special:Redirect/file/Lake_travis_from_iguana_grill_2013.jpg?width=1600
c|Special:FilePath/Aransas National Wildlife Refuge, Aransas County, Texas, USA (27 November 2011).jpg
c|Special:Redirect/file/Book_of_Texas_(1916)_(14771239644).jpg?width=1600
c|Special:Redirect/file/Dewitt courthouse.jpg?width=1600
l|/images/state-parks/world-birding-center-bentsen-rio-grande-valley-state-park.jpg
c|Special:Redirect/file/Modern_Blue_Bell_Creameries_factory_located_in_Brenham,_Texas.jpg
c|Special:Redirect/file/Former_alvin_tx_post_office.jpg?width=1600
c|Special:Redirect/file/Boerne_ag_museum_2013.jpg?width=1600
c|Special:Redirect/file/Main street schulenburg 2012.jpg?width=1600
c|Special:Redirect/file/Sabine_National_Forest,_Toledo_Bend_Reservoir,_Texas.jpg?width=1600
l|/images/explore/beaches-coast/mustang-island-state-park.jpg
l|/images/state-parks/tyler-state-park.jpg
c|Special:Redirect/file/Mission San Juan Capistrano, San Antonio, Texas.jpg?width=1600
c|Special:Redirect/file/Reeves county courthouse 2009.jpg?width=1600
c|Special:Redirect/file/Fort_martin_scott_2008.jpg?width=1600
u|7/7b/Garner_state_park.jpg
c|Special:Redirect/file/Fredericksburg_historic_district_2008.jpg?width=1600
c|Special:Redirect/file/Science Spectrum kinetic sculpture fall 2023.jpg?width=1600
c|Special:Redirect/file/ATTCenter.jpg
`.trim().split("\n");

const BEFORE_BYTES = [
  6620072,5975466,5850365,5505024,4299543,3450668,3317473,3117715,3015314,2979762,
  2971154,2893588,2893588,2890094,2865443,2722097,2680960,2527572,2441148,2389077,
  2382992,2330758,2330178,2281381,2264754,2223672,2215613,2187839,2090610,2065976,
  2060140,2044429,2013978,1977032,1974526,1934077,1885225,1760885,1736376,1664092,
  1658192,1628409,1589198,1553793,1549849,1519213,1486833,1486409,1463548,1425251,
];
if (SOURCES.length !== 50 || BEFORE_BYTES.length !== SOURCES.length) {
  throw new Error("Pasted audit manifest must have exactly 50 source rows");
}

const entries = SOURCES.map((line, index) => {
  const kind = line[0];
  const pathValue = line.slice(2);
  if (line[1] !== "|" || !["c","u","l"].includes(kind)) throw new Error("Invalid source at " + index);
  const original = kind === "c" ? "https://commons.wikimedia.org/wiki/" + pathValue
    : kind === "u" ? "https://upload.wikimedia.org/wikipedia/commons/" + pathValue
    : ORIGIN + pathValue;
  const publicUrl = kind === "l" ? original
    : ORIGIN + "/media/remote?url=" + encodeURIComponent(new URL(original).href);
  return { ordinal: index + 1, kind: kind === "l" ? "local" : "remote", original, publicUrl,
    beforeBytes: BEFORE_BYTES[index], budgetBytes: kind === "l" ? 900_000 : 1_250_000 };
});

async function probe(entry) {
  let last;
  for (let attempt = 1; attempt <= 2; attempt++) {
    let response;
    const start = Date.now();
    try {
      response = await fetch(entry.publicUrl, {
        method: "GET", redirect: "follow", signal: AbortSignal.timeout(30000),
        headers: { "User-Agent": "TexasDefinedImagePayloadAudit/1.0", Accept: "image/avif,image/webp,image/jpeg,image/png,image/*;q=0.8" },
      });
      const type = response.headers.get("content-type") || "";
      // fetch() follows the pinned same-origin 302 for two governed WebP assets.
      const finalUrl = response.url;
      const pinned = new URL(finalUrl).pathname.startsWith("/images/editorial/optimized/");
      const variant = pinned ? "local-pinned-webp" : response.headers.get("x-texasdefined-image-variant") || null;
      const length = response.headers.get("content-length") || null;
      let measuredBytes = 0;
      if (response.body) {
        const reader = response.body.getReader();
        while (true) {
          const part = await reader.read();
          if (part.done) break;
          measuredBytes += part.value.byteLength;
          if (measuredBytes > MAX_BODY_BYTES) {
            await reader.cancel();
            throw new Error("Image exceeds bounded 12 MB audit maximum");
          }
        }
      }
      const result = {
        ...entry, status: response.status, contentType: type, variant, reportedLength: length,
        afterBytes: measuredBytes, elapsedMs: Date.now() - start,
        pass: response.status === 200 && type.toLowerCase().startsWith("image/") &&
          measuredBytes > 0 && measuredBytes <= entry.budgetBytes,
      };
      if (!result.pass && [408,429,500,502,503,504].includes(response.status) && attempt < 2) {
        last = result;
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        continue;
      }
      return result;
    } catch (error) {
      last = { ...entry, status: response?.status || 0, afterBytes: 0,
        error: error instanceof Error ? error.message : String(error), pass: false,
        elapsedMs: Date.now() - start };
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
  return last;
}

const results = new Array(entries.length);
let next = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (true) {
    const i = next++;
    if (i >= entries.length) break;
    const row = await probe(entries[i]);
    results[i] = row;
    const shown = row.afterBytes ? Math.round(row.afterBytes / 1024) + "KiB" : (row.error || "empty");
    console.log("IMAGE " + String(row.ordinal).padStart(2, "0") + " " +
      (row.pass ? "PASS" : "FAIL") + " HTTP=" + row.status + " " + shown +
      " prior=" + Math.round(row.beforeBytes / 1024) + "KiB" +
      " variant=" + (row.variant || "none") + " " + row.publicUrl);
  }
}));

const successes = results.filter(x => x.pass);
const failures = results.filter(x => !x.pass);
const remote = results.filter(x => x.kind === "remote");
const local = results.filter(x => x.kind === "local");
const sum = (items, key) => items.reduce((total, row) => total + (row[key] || 0), 0);
const summary = {
  checkedAt: new Date().toISOString(), source: "2026-11-02 pasted excerpt (50 of 110 reported)",
  count: results.length, passed: successes.length, failed: failures.length,
  missingFromUserExcerpt: 60,
  beforeBytes: sum(results, "beforeBytes"),
  measuredAfterBytes: sum(results, "afterBytes"),
  remote: { count: remote.length, passed: remote.filter(x => x.pass).length,
    beforeBytes: sum(remote, "beforeBytes"), measuredAfterBytes: sum(remote, "afterBytes"),
    optimizedVariant: remote.filter(x => x.variant === "upstream-sized").length,
    pinnedWebpVariant: remote.filter(x => x.variant === "local-pinned-webp").length,
    originalVariant: remote.filter(x => x.variant === "original").length },
  local: { count: local.length, passed: local.filter(x => x.pass).length,
    beforeBytes: sum(local, "beforeBytes"), measuredAfterBytes: sum(local, "afterBytes") },
  failingUrls: failures.map(x => x.publicUrl),
};
await fs.mkdir(OUT, { recursive: true });
await fs.writeFile(path.join(OUT, "report.json"), JSON.stringify({ summary, results }, null, 2) + "\n");
const cols = ["ordinal","kind","status","contentType","variant","beforeBytes","afterBytes","budgetBytes","elapsedMs","pass","publicUrl","error"];
const csv = [cols.join(","), ...results.map(x => cols.map(k => JSON.stringify(x[k] ?? "")).join(","))].join("\n") + "\n";
await fs.writeFile(path.join(OUT, "report.csv"), csv);
console.log("SUMMARY " + JSON.stringify(summary));
if (process.env.GITHUB_STEP_SUMMARY) {
  await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, [
    "## Oversized images: bounded 50-URL production verification",
    "Checked " + summary.count + " actual rows (original paste was labeled 110, but 60 rows were not present).",
    "Passed " + summary.passed + ", failed " + summary.failed + ".",
    "Remote " + summary.remote.passed + "/" + summary.remote.count +
      "; upstream-sized " + summary.remote.optimizedVariant +
      ", pinned WebP " + summary.remote.pinnedWebpVariant + ", original fallback " + summary.remote.originalVariant + ".",
    "Local " + summary.local.passed + "/" + summary.local.count + ".",
    "Measured total " + (summary.measuredAfterBytes / 1e6).toFixed(2) + " MB (only complete if no failures).",
    "Full URL-by-URL data: uploaded JSON and CSV artifacts.",
  ].join("\n\n") + "\n");
}
if (process.env.IMAGE_AUDIT_STRICT === "1" && failures.length) process.exitCode = 1;
