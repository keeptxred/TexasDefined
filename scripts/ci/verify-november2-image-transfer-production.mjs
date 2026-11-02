import fs from "node:fs/promises";
import path from "node:path";
import { NOVEMBER_2_IMAGE_AUDIT } from "./november2-oversized-images.mjs";

const ORIGIN = (process.env.IMAGE_AUDIT_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const REPORT_PATH = process.env.IMAGE_AUDIT_OUTPUT || ".artifacts/oversized-image-production-audit.json";
const MAX_REMOTE_BYTES = 1_600_000;
const MAX_LOCAL_BYTES = 900_000;
const CONCURRENCY = 3;
const TIMEOUT_MS = 25_000;
const USER_AGENT = "TexasDefined-Image-Transfer-Audit/1.0 (https://texasdefined.com/about)";

if (NOVEMBER_2_IMAGE_AUDIT.length !== 50) {
  throw new Error("Expected the 50 actual audit rows; the other 60 were not provided");
}

async function measure([src, baselineBytes], index) {
  const remote = src.startsWith("https://");
  const budgetBytes = remote ? MAX_REMOTE_BYTES : MAX_LOCAL_BYTES;
  const publicUrl = remote
    ? new URL("/media/remote?url=" + encodeURIComponent(src), ORIGIN).href
    : new URL(src, ORIGIN).href;
  const entry = {
    row: index + 1,
    source: src,
    publicUrl,
    remote,
    baselineBytes,
    budgetBytes,
    status: null,
    contentType: null,
    variant: null,
    contentLength: null,
    location: null,
    server: null,
    workerVersion: null,
    transferredBytes: null,
    withinBudget: false,
    error: null,
  };

  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController();
    const abort = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(publicUrl, {
        method: "GET",
        redirect: "manual",
        headers: {
          Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
          "User-Agent": USER_AGENT,
        },
        signal: controller.signal,
      });
      entry.status = response.status;
      entry.contentType = response.headers.get("content-type");
      entry.variant = response.headers.get("x-texasdefined-image-variant");
      entry.contentLength = Number(response.headers.get("content-length")) || null;
      entry.location = response.headers.get("location");
      entry.server = response.headers.get("server");
      entry.workerVersion = response.headers.get("x-texasdefined-worker-version");
      if (response.status !== 200 || !/^image\//i.test(entry.contentType ?? "")) {
        entry.error = "Image request returned non-200 or non-image content";
        await response.body?.cancel();
        if ((response.status === 429 || response.status >= 500) && attempt === 1) continue;
        break;
      }
      // Enforce the transfer ceiling even when Content-Length is not set.
      // Cancel the reader after the ceiling to avoid downloading the old
      // 6 MB originals merely to report that they remain oversized.
      let bytes = 0;
      const reader = response.body?.getReader();
      if (!reader) {
        entry.error = "No image response body";
        break;
      }
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > budgetBytes) {
          await reader.cancel();
          break;
        }
      }
      entry.transferredBytes = bytes;
      entry.withinBudget = bytes <= budgetBytes;
      if (!entry.withinBudget) entry.error = "Image exceeds per-file transfer budget";
      if (remote && entry.variant !== "upstream-sized") {
        entry.withinBudget = false;
        entry.error = "Remote image was not served using optimized upstream variant";
      }
      break;
    } catch (error) {
      entry.error = error instanceof Error ? error.message : String(error);
      if (attempt === 2) break;
    } finally {
      clearTimeout(abort);
    }
  }

  console.log(
    String(entry.row).padStart(2, "0") + " " +
      (entry.withinBudget ? "PASS" : "FAIL") + " " +
      (entry.status ?? "?") + " " +
      (entry.transferredBytes ?? "?") + "B / " + budgetBytes + "B " +
      (entry.variant || "-") + " " + entry.source +
      (entry.location ? " redirect=" + entry.location : "") +
      (entry.error ? " error=" + entry.error : ""),
  );
  return entry;
}

async function mapLimit(items, limit, fn) {
  const output = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(items.length, limit) }, async () => {
      for (;;) {
        const index = next++;
        if (index >= items.length) return;
        output[index] = await fn(items[index], index);
      }
    }),
  );
  return output;
}

const results = await mapLimit(NOVEMBER_2_IMAGE_AUDIT, CONCURRENCY, measure);
const verified = results.filter((x) => x.withinBudget);
const overBudget = results.filter((x) => !x.withinBudget);
const remote = results.filter((x) => x.remote);
const local = results.filter((x) => !x.remote);
const completeBytes = results.filter((x) => x.withinBudget).reduce((s, x) => s + x.transferredBytes, 0);
const baselineBytes = results.reduce((s, x) => s + x.baselineBytes, 0);
const report = {
  generatedAt: new Date().toISOString(),
  origin: ORIGIN,
  originalReportHeading: 110,
  rowsActuallySupplied: 50,
  unknownRowsNotClaimed: 60,
  baselineBytes,
  completeVerifiedBytes: completeBytes,
  allRowsMeasured: results.every((x) => x.withinBudget),
  remoteChecked: remote.length,
  localChecked: local.length,
  verifiedWithinBudget: verified.length,
  exceptions: overBudget.length,
  remoteBudgetBytes: MAX_REMOTE_BYTES,
  localBudgetBytes: MAX_LOCAL_BYTES,
  results,
};
await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true });
await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2) + "\n");
if (process.env.GITHUB_STEP_SUMMARY) {
  const lines = [
    "## November 2 image payload follow-up",
    "",
    "The uploaded report claimed 110 but supplied exactly 50 URLs; the remaining 60 cannot be certified.",
    "",
    "| Status | Count |",
    "|---|---:|",
    "| Supplied image URLs | 50 |",
    "| Passed image budget and correct variant | " + verified.length + " |",
    "| Failures needing specific follow-up | " + overBudget.length + " |",
    "| Remotes / locals | " + remote.length + " / " + local.length + " |",
    "",
    "Per-URL evidence is in the uploaded JSON artifact. Baseline bytes are from the owner's pre-fix audit.",
  ];
  await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, lines.join("\n") + "\n");
}
console.log(JSON.stringify({ checked: results.length, passed: verified.length, failed: overBudget.length, baselineBytes, completeVerifiedBytes: completeBytes, report: REPORT_PATH }));
if (overBudget.length) process.exitCode = 1;
