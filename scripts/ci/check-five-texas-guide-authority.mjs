import assert from "node:assert/strict";
import { readFile, appendFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);

const registry = JSON.parse(await readFile("ops/editorial/texas-culture-outdoors-review-groups.json", "utf8"));
const mumPhoto = await readFile("public/images/editorial/optimized/goldthwaite-homecoming-mum-640.webp");
assert.ok(mumPhoto.length > 10000 && mumPhoto.length <= 125000, "Licensed mum hero exceeds byte budget");
assert.equal(mumPhoto.subarray(0,4).toString(), "RIFF");
assert.equal(mumPhoto.subarray(8,12).toString(), "WEBP");
assert.equal(createHash("sha256").update(mumPhoto).digest("hex"), "9785d27a3f43ed12f4bb8b5cb299cc12ba798d689f52f4e1f1d2095c4028079f", "Pinned licensed photograph changed without provenance review");
const argv = new Set(process.argv.slice(2));
const scopeFlag = process.argv.find(value => value.startsWith("--scope="));
const scope = scopeFlag?.slice(8) || "all";
const today = new Date().toISOString().slice(0, 10);
const problems = [];
const rows = [];
const independentProofs = [];
const UNT_ARCHIVE_PAGE = "https://texashistory.unt.edu/ark:/67531/metadc271470/m1/196/";
const UNT_ARCHIVE_OCR = UNT_ARCHIVE_PAGE + "annotations/ocr/";
const UNT_ARCHIVE_CANVAS = UNT_ARCHIVE_PAGE + "canvas/";
const archiveProofs = [];
// UNT explicitly supports IIIF programmatic access: https://texashistory.unt.edu/api/.
// The item's official manifest links this exact canvas's OCR AnnotationList.
// The reader-facing archival link stays intact; validate actual page text,
// not a challenge HTML response or merely a metadata record.
function validUntArchiveOcr(data) {
  if (data?.["@id"] !== UNT_ARCHIVE_OCR || data?.["@type"] !== "sc:AnnotationList" ||
      !Array.isArray(data.resources) || data.resources.length < 100) return false;
  if (data.resources.some(entry => entry?.["@type"] !== "oa:Annotation" ||
      typeof entry.on !== "string" || !entry.on.startsWith(UNT_ARCHIVE_CANVAS + "#") ||
      typeof entry.resource?.chars !== "string")) return false;
  const text = data.resources.map(entry => entry.resource.chars).join(" ");
  return /PECOS\s+BILL\s+AND\s+HIS\s+PEDIGREE\s+183/i.test(text) &&
    /Edward\s+O['’]Reilly/i.test(text) && /1923/.test(text) &&
    /Century\s+Magazine/i.test(text) && /first\s+known\s+Pecos\s+Bill\s+stories/i.test(text);
}
{
  const words = ("PECOS BILL AND HIS PEDIGREE 183 Edward O'Reilly 1923 Century Magazine first known Pecos Bill stories " + "word ".repeat(110)).trim().split(/\s+/);
  const valid = {"@id":UNT_ARCHIVE_OCR,"@type":"sc:AnnotationList",resources:words.map(chars=>({"@type":"oa:Annotation",on:UNT_ARCHIVE_CANVAS+"#xywh=1,2,3,4",resource:{chars}}))};
  assert.ok(validUntArchiveOcr(valid));
  assert.equal(validUntArchiveOcr({...valid,"@id":"https://other.invalid"}),false);
  assert.equal(validUntArchiveOcr({...valid,resources:valid.resources.map(x=>({...x,on:"https://other.invalid"}))}),false);
  assert.equal(validUntArchiveOcr({...valid,resources:valid.resources.map(x=>({...x,resource:{chars:"unrelated"}}))}),false);
  assert.equal(validUntArchiveOcr({html:"Validating your request..."}),false);
}

const INDEPENDENT_SOURCE_PATH = "/texas-dance-halls-honky-tonks";
const INDEPENDENT_SOURCES = new Set([
  "https://gruenehall.com/events/month/",
  "https://gruenehall.com/faq/",
]);
const MAX_INDEPENDENT_AGE_MS = 30 * 86400000;
const SOURCE_LEDGER_ORIGIN = "https://ftkznprjljkhymknvhye.supabase.co";

// A publisher's GitHub-runner 403 is a transport restriction, not a
// factual change. Only these two separately enrolled sources may use
// fresh, exact-fingerprint editorial review + independent HTTP evidence.
// A plain 200, changed fingerprint, expired review, or missing credential
// never establishes success. No browser or page-canonical check uses this.
function validIndependentEvidence(row, review, url, now = Date.now()) {
  if (!INDEPENDENT_SOURCES.has(url) || !row || !review) return false;
  const probeAt = Date.parse(row.last_checked_at), reviewAt = Date.parse(review.checked_at);
  const evidenceProbeAt = Date.parse(review.details?.probe_checked_at);
  if (![probeAt, reviewAt, evidenceProbeAt].every(Number.isFinite)) return false;
  if ([probeAt, reviewAt, evidenceProbeAt].some(t => t > now || now-t > MAX_INDEPENDENT_AGE_MS)) return false;
  if (reviewAt < evidenceProbeAt || probeAt < evidenceProbeAt) return false;
  return row.path === INDEPENDENT_SOURCE_PATH && row.source_url === url &&
    row.http_status === 200 && row.pending_request_id === null &&
    ["source_reviewed","source_unchanged"].includes(row.result) &&
    typeof row.fingerprint === "string" && /^[a-f0-9]{32}$/i.test(row.fingerprint) &&
    review.path === INDEPENDENT_SOURCE_PATH && review.source_url === url &&
    review.event_type === "editorial_verified" &&
    review.details?.source === url &&
    review.details?.source_fingerprint === row.fingerprint &&
    typeof review.details?.independent_comparison === "string" &&
    review.details.independent_comparison.length > 30;
}
{
  const url = [...INDEPENDENT_SOURCES][0], now = Date.parse("2026-11-25T15:00:00Z");
  const at = "2026-11-25T14:52:37Z", hash = "a".repeat(32);
  const row = {path:INDEPENDENT_SOURCE_PATH,source_url:url,http_status:200,pending_request_id:null,result:"source_reviewed",fingerprint:hash,last_checked_at:at};
  const review = {path:INDEPENDENT_SOURCE_PATH,source_url:url,event_type:"editorial_verified",checked_at:"2026-11-25T14:55:00Z",details:{source:url,source_fingerprint:hash,probe_checked_at:at,independent_comparison:"Actual source claims compared with published guide."}};
  assert.ok(validIndependentEvidence(row,review,url,now));
  for (const bad of [{...row,result:"source_changed"},{...row,fingerprint:"b".repeat(32)},{...row,pending_request_id:123},{...row,http_status:403},{...row,last_checked_at:"2026-10-01T00:00:00Z"}]) {
    assert.equal(validIndependentEvidence(bad,review,url,now),false);
  }
  assert.equal(validIndependentEvidence(row,{...review,details:{...review.details,source_fingerprint:null}},url,now),false);
  assert.equal(validIndependentEvidence(row,review,"https://other.invalid/",now),false);
  assert.equal(validIndependentEvidence(row,review,url,now+31*86400000),false);
}

async function independentSourceProof(url, description) {
  if (!INDEPENDENT_SOURCES.has(url) || description !== INDEPENDENT_SOURCE_PATH + " primary source") return null;
  const key = process.env.TD_SOURCE_LEDGER_READ_KEY;
  if (!key) return null;
  const headers = {apikey:key,Authorization:"Bearer "+key,Accept:"application/json"};
  // Fixed, authenticated project's read-only GET queries only; no secret
  // is sent to a source publisher or emitted into the Actions log.
  async function readLedger(table, fields, extra={}) {
    const request = new URL("/rest/v1/"+table,SOURCE_LEDGER_ORIGIN);
    for (const [k,v] of Object.entries({select:fields,path:"eq."+INDEPENDENT_SOURCE_PATH,source_url:"eq."+url,...extra})) request.searchParams.set(k,v);
    const response=await fetch(request,{headers,redirect:"error",signal:AbortSignal.timeout(12000)});
    if(!response.ok) return [];
    const data=await response.json();
    return Array.isArray(data)?data:[];
  }
  try {
    const [row] = await readLedger("td_authority_verification_sources","path,source_url,http_status,pending_request_id,result,fingerprint,last_checked_at",{limit:"1"});
    const reviews = await readLedger("td_authority_verification_checks","path,source_url,event_type,checked_at,details",{event_type:"eq.editorial_verified",order:"checked_at.desc",limit:"5"});
    const reviewed=reviews.find(review=>validIndependentEvidence(row,review,url));
    return reviewed?{source:url,probeAt:row.last_checked_at,reviewAt:reviewed.checked_at,transport:"GitHub HTTP 403; independent source ledger"}:null;
  } catch { return null; }
}


assert.equal(registry.schemaVersion, 1);
assert.deepEqual(registry.groups.find(group=>group.id==="culture-folklore").machineSourceOverrides, {[UNT_ARCHIVE_PAGE]:UNT_ARCHIVE_OCR}, "Exact archival reader-to-machine source identity must remain governed");
assert.equal(registry.groups.length, 5);
assert.equal(new Set(registry.groups.map(group => group.path)).size, 5);
assert.deepEqual(registry.groups.map(group => group.path), [
  "/texas-tall-tales-folklore",
  "/texas-dance-halls-honky-tonks",
  "/texas-homecoming-mums",
  "/texas-natural-wonders-bucket-list",
  "/texas-rock-climbing-bouldering-guide",
]);

const selected = registry.groups.filter(group => scope === "all" || group.cadence === scope);
assert.ok(selected.length, "Invalid or empty scope " + scope);
for (const group of registry.groups) {
  assert.ok(["weekly", "monthly", "quarterly"].includes(group.cadence));
  assert.ok(group.reviewedAt <= today, "Future review date " + group.path);
  assert.ok(group.maxReviewAgeDays >= 7 && group.maxReviewAgeDays <= 90);
  assert.ok(group.sourceFiles.length && group.primarySources.length);
  assert.ok(group.primarySources.length >= 2, group.path + " requires multiple independent sources");
  const contents = (await Promise.all(group.sourceFiles.map(file => readFile(file, "utf8")))).join("\n");
  for (const marker of group.requiredMarkers) {
    assert.ok(contents.includes(marker), group.path + " missing editorial/safety fact: " + marker);
  }
  for (const url of group.primarySources) {
    assert.ok(url.startsWith("https://"), group.path + " official source requires HTTPS");
    assert.ok(contents.includes(url), group.path + " primary source not linked: " + url);
  }
  const ageDays = Math.floor((Date.parse(today + "T00:00:00Z") - Date.parse(group.reviewedAt + "T00:00:00Z")) / 86400000);
  rows.push({ path: group.path, cadence: group.cadence, lastFactReview: group.reviewedAt, ageDays, maxAgeDays: group.maxReviewAgeDays });
  if (argv.has("--watch") && selected.includes(group) && ageDays > group.maxReviewAgeDays) {
    problems.push(group.path + " " + group.primarySources[0] + ": factual source review is overdue by " + (ageDays - group.maxReviewAgeDays) + " days. Verify the official evidence, then commit a genuinely reviewed date; HTTP 200 does not count.");
  }
}
console.log("FIVE_GUIDE_STATIC_PASS " + JSON.stringify(rows));
if (argv.has("--watch")) {
  // Retry bounded transient DNS/TLS/socket/429/5xx failures. A final
  // unresolved failure remains actionable; do not turn it into a false pass.
  async function fetchWithRetry(url) {
    let lastError;
    for (let attempt=1; attempt<=3; attempt++) {
      try {
        const response=await fetch(url,{
          redirect:"follow",
          headers:{"User-Agent":"TexasDefined-Five-Guides-Source-Monitor/1.0"},
          signal:AbortSignal.timeout(18000),
        });
        if (![429,500,502,503,504].includes(response.status) || attempt===3) return response;
        lastError=new Error("HTTP "+response.status);
        await response.body?.cancel();
      } catch(error) {
        lastError=error;
        if(attempt===3) throw error;
      }
      await new Promise(resolve=>setTimeout(resolve,attempt*1200));
    }
    throw lastError;
  }
  async function curlSourceFallback(url) {
    // Node's undici and system curl have independent TLS/proxy stacks.
    // A second transport only verifies reachability, never factual correctness.
    // Do not use this for first-party editorial-marker/canonical checks.
    const { stdout } = await execFileAsync("curl",[
      "--location","--silent","--show-error","--compressed",
      "--max-time","30","--retry","2","--retry-all-errors","--retry-delay","1",
      "--user-agent","TexasDefined-Five-Guides-Source-Monitor/1.0",
      "--write-out","\\n__TD_HTTP_STATUS__%{http_code}",
      url
    ],{timeout:100000,maxBuffer:12*1024*1024});
    const m=stdout.match(/\\n__TD_HTTP_STATUS__(\\d{3})$/);
    if(!m)throw new Error("curl response status unavailable");
    const status=Number(m[1]);
    return {ok:status>=200&&status<300,status,headers:{get:()=>null},
      body:{cancel:async()=>{}},text:async()=>stdout.slice(0,m.index)};
  }
  async function probe(url, description, marker) {
    try {
      if (!marker && url === UNT_ARCHIVE_PAGE && description === "/texas-tall-tales-folklore primary source") {
        const response = await fetchWithRetry(UNT_ARCHIVE_OCR);
        if (!response.ok || !/^application\/json\b/i.test(response.headers.get("content-type")||"")) {
          await response.body?.cancel();
          throw new Error("UNT public OCR API did not return JSON HTTP 200");
        }
        const document = await response.json();
        if (!validUntArchiveOcr(document)) throw new Error("UNT exact archival page OCR identity or source fact markers mismatch");
        const proof = {readerSource:url,machineSource:UNT_ARCHIVE_OCR,annotations:document.resources.length,transport:"official IIIF OCR annotations; reader HTML not tested"};
        archiveProofs.push(proof);
        console.log("FIVE_GUIDE_ARCHIVE_OCR_PROOF "+JSON.stringify(proof));
        return;
      }
      let response;
      try { response = await fetchWithRetry(url); }
      catch(primaryError) {
        if(marker)throw primaryError;
        try {
          response=await curlSourceFallback(url);
          console.log("FIVE_GUIDE_SOURCE_CURL_FALLBACK_OK "+url+" HTTP "+response.status);
        } catch(fallbackError) {
          throw new Error("Node fetch: "+String(primaryError).slice(0,75)+
            "; curl: "+String(fallbackError).slice(0,100));
        }
      }
      if (!response.ok) {
        if (!marker && response.status === 403) {
          await response.body?.cancel();
          const proof = await independentSourceProof(url,description);
          if (proof) {
            independentProofs.push(proof);
            console.log("FIVE_GUIDE_INDEPENDENT_SOURCE_REVIEW "+JSON.stringify(proof));
            return;
          }
        }
        problems.push(description + ": official/live response HTTP " + response.status + " at " + url);
        return;
      }
      if (marker) {
        const html = await response.text();
        if (!html.toLowerCase().includes(marker.toLowerCase())) problems.push(description + ": expected source-specific public content not visible: " + marker + " at " + url);
        if (description.startsWith("/") && !html.includes("November 20, 2026")) {
          problems.push(description + ": revised November 20 editorial date not present in raw public HTML at " + url);
        }
        if (description.startsWith("/")) {
          const expectedCanonical = "https://texasdefined.com" + description;
          const canonicalTags = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => match[0])
            .filter(tag => /\brel\s*=\s*["']canonical["']/i.test(tag));
          if (!canonicalTags.some(tag => /\bhref\s*=\s*["'][^"']+["']/i.test(tag) && tag.includes(expectedCanonical))) {
            problems.push(description + ": public self-canonical missing or different from " + expectedCanonical);
          }
          const robotTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0])
            .filter(tag => /\bname\s*=\s*["']robots["']/i.test(tag));
          if (robotTags.some(tag => /\bnoindex\b/i.test(tag)) || /\bnoindex\b/i.test(response.headers.get("x-robots-tag") || "")) {
            problems.push(description + ": public robots directive unexpectedly prohibits indexing");
          }
        }
      } else {
        await response.body?.cancel();
      }
    } catch (error) {
      problems.push(description + ": source not verified (" + String(error).slice(0, 130) + ") at " + url);
    }
  }
  // Bounded concurrency: no whole-site scan, no Cloudflare API calls, no content mutations.
  const checks = [];
  const publicProof = {
    "/texas-tall-tales-folklore": "Three source trails, three different kinds of evidence",
    "/texas-dance-halls-honky-tonks": "Compare the door, the dance floor and the trip",
    "/texas-homecoming-mums": "Actual maker and kit listings",
    "/texas-natural-wonders-bucket-list": "Rio Grande canyons within Big Bend",
    "/texas-rock-climbing-bouldering-guide": "Where to start, and where not to enter",
  };
  for (const group of selected) {
    for (const origin of ["https://texasdefined.com","https://texasdefined-site.freddy-coppola.workers.dev"]) {
      checks.push([ origin + group.path, group.path, publicProof[group.path] ]);
    }
    for (const url of group.primarySources) checks.push([url, group.path + " primary source", null]);
  }
  let next = 0;
  await Promise.all(Array.from({length: Math.min(3, checks.length)}, async () => {
    while (next < checks.length) {
      const [url, description, marker] = checks[next++];
      await probe(url, description, marker);
    }
  }));
  console.log("FIVE_GUIDE_WATCH " + checks.length + " bounded checks for " + scope);
}
const summary = [
  "## TexasDefined five-guide authority verification (" + scope + ")",
  "",
  "| Guide | Last factual review | Days | Maximum days |",
  "|---|---|---:|---:|",
  ...rows.filter(row => scope === "all" || row.cadence === scope)
    .map(row => "| " + row.path + " | " + row.lastFactReview + " | " + row.ageDays + " | " + row.maxAgeDays + " |"),
  "",
  problems.length ? "### Action required\n" + problems.map(problem => "- " + problem).join("\n") : "No selected source reachability/age alerts.",
  ...archiveProofs.map(proof => "- Official UNT IIIF OCR evidence: "+proof.machineSource+"; "+proof.annotations+" exact-page annotations validated. Reader-facing HTML transport is not certified."),
  ...independentProofs.map(proof => "- Independent source proof (direct GitHub transport HTTP 403): "+proof.source+"; HTTP probe "+proof.probeAt+"; exact-fingerprint editorial review "+proof.reviewAt),
  "",
  "HTTP success does **not** certify factual accuracy. Do not alter reviewedAt until a person or verified research workflow actually rechecks facts.",
  "",
].join("\n");
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
if (problems.length) {
  for (const problem of problems) console.error("FIVE_GUIDE_REVIEW_REQUIRED " + problem);
  process.exitCode = 1;
} else console.log("FIVE_GUIDE_AUTHORITY_CHECK_PASS");
