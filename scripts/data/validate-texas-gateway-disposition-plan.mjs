import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const planPath = path.join(root, "scripts/data/texas-gateway-disposition-plan.json");
const reviewPath = path.join(root, "scripts/data/texas-gateway-editorial-review.json");
const specialPath = path.join(root, "scripts/data/texas-gateway-batch14-16-disposition.json");
const promotionsPath = path.join(root, "scripts/data/texas-gateway-editorial-promotions.json");
const readinessPath = path.join(root, "src/data/fixtures/texas-gateway-index-readiness.ts");

const fail = (message) => {
  console.error(`gateway disposition-plan validation failed: ${message}`);
  process.exitCode = 1;
};

const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
const special = JSON.parse(fs.readFileSync(specialPath, "utf8"));
const promotions = JSON.parse(fs.readFileSync(promotionsPath, "utf8"));
const readinessText = fs.readFileSync(readinessPath, "utf8");

const entries = Array.isArray(plan.entries) ? plan.entries : [];
const reviewEntries = Array.isArray(review.entries) ? review.entries : [];
const specialEntries = Array.isArray(special.entries) ? special.entries : [];
const promotionEntries = Array.isArray(promotions.promotions) ? promotions.promotions : [];
const allowedDispositions = new Set(["expand", "rebuild", "consolidate", "retire", "requires-specialized-verification"]);
const reviewBySlug = new Map(reviewEntries.map((entry) => [entry.slug, entry]));
const specialBySlug = new Map(specialEntries.map((entry) => [entry.slug, entry]));
const promoted = new Set(promotionEntries.filter((entry) => entry.status === "index-ready").map((entry) => entry.slug));
const allowlistBody = readinessText.match(/TEXAS_GATEWAY_INDEX_READY_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
const allowlisted = new Set([...allowlistBody.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]));

if (reviewEntries.length !== 140) fail(`canonical editorial review must contain 140 concepts, found ${reviewEntries.length}`);
if (entries.length !== 140) fail(`disposition plan must contain 140 concepts, found ${entries.length}`);
if (new Set(entries.map((entry) => entry.slug)).size !== entries.length) fail("duplicate slug in disposition plan");

for (const reviewEntry of reviewEntries) {
  if (!entries.some((entry) => entry.slug === reviewEntry.slug)) fail(`missing disposition for ${reviewEntry.slug}`);
}

for (const entry of entries) {
  const editorial = reviewBySlug.get(entry.slug);
  if (!editorial) {
    fail(`unknown gateway slug in disposition plan: ${entry.slug}`);
    continue;
  }
  if (entry.batch !== editorial.batch) fail(`batch mismatch for ${entry.slug}: plan ${entry.batch}, review ${editorial.batch}`);
  if (!allowedDispositions.has(entry.disposition)) fail(`invalid disposition for ${entry.slug}: ${entry.disposition}`);
  if (!entry.rationale) fail(`missing rationale for ${entry.slug}`);
  if (!["staged", "already-promoted-through-guarded-ledger"].includes(entry.promotionState)) fail(`invalid promotionState for ${entry.slug}`);

  const expectedPromotionState = promoted.has(entry.slug) ? "already-promoted-through-guarded-ledger" : "staged";
  if (entry.promotionState !== expectedPromotionState) fail(`promotionState drift for ${entry.slug}: expected ${expectedPromotionState}`);

  if (entry.disposition === "expand" && editorial.status !== "needs-expansion") {
    fail(`expand disposition must originate from needs-expansion review status: ${entry.slug}`);
  }

  if (entry.disposition === "requires-specialized-verification" && editorial.reason !== "stage-audience") {
    fail(`specialized verification must originate from stage-audience review reason: ${entry.slug}`);
  }

  if (entry.disposition === "rebuild" && editorial.reason !== "stage-template") {
    const specialEntry = specialBySlug.get(entry.slug);
    if (!specialEntry || specialEntry.disposition !== "rebuild-distinct") {
      fail(`rebuild disposition lacks approved template/rebuild basis: ${entry.slug}`);
    }
  }

  if (entry.disposition === "consolidate") {
    const specialEntry = specialBySlug.get(entry.slug);
    if (!specialEntry || specialEntry.disposition !== "consolidate") fail(`consolidation not backed by Batch 14-16 plan: ${entry.slug}`);
    if (!entry.targetSlug) fail(`consolidation target missing for ${entry.slug}`);
    if (specialEntry?.targetSlug !== entry.targetSlug) fail(`consolidation target drift for ${entry.slug}`);
  } else if (entry.targetSlug) {
    fail(`only consolidate entries may define targetSlug: ${entry.slug}`);
  }

  if (["rebuild", "consolidate", "retire", "requires-specialized-verification"].includes(entry.disposition) && allowlisted.has(entry.slug)) {
    fail(`unsafe allowlist state for unresolved disposition ${entry.slug} (${entry.disposition})`);
  }
}

const observedSummary = entries.reduce((acc, entry) => {
  acc.total += 1;
  acc[entry.disposition] = (acc[entry.disposition] ?? 0) + 1;
  return acc;
}, { total: 0 });

for (const [key, value] of Object.entries(observedSummary)) {
  if (plan.summary?.[key] !== value) fail(`summary drift for ${key}: expected ${value}, found ${plan.summary?.[key]}`);
}

const expectedKeys = new Set(["total", ...allowedDispositions]);
for (const key of Object.keys(plan.summary ?? {})) {
  if (!expectedKeys.has(key)) fail(`unexpected summary key: ${key}`);
}

if (!process.exitCode) {
  console.log(
    `Gateway disposition-plan validation passed: ${entries.length} covered; ` +
      `${observedSummary.expand ?? 0} expand, ${observedSummary.rebuild ?? 0} rebuild, ` +
      `${observedSummary.consolidate ?? 0} consolidate, ${observedSummary.retire ?? 0} retire, ` +
      `${observedSummary["requires-specialized-verification"] ?? 0} specialized-verification.`,
  );
}
