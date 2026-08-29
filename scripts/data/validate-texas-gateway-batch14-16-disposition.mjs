import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const planPath = path.join(root, "scripts/data/texas-gateway-batch14-16-disposition.json");
const readinessPath = path.join(root, "src/data/fixtures/texas-gateway-index-readiness.ts");
const batchFiles = [
  path.join(root, "src/data/fixtures/texas-gateway-occasion-batch14.ts"),
  path.join(root, "src/data/fixtures/texas-gateway-monthly-batch15.ts"),
  path.join(root, "src/data/fixtures/texas-gateway-identity-batch16.ts"),
];
const allGatewayFiles = [
  "texas-gateway-articles.ts",
  "texas-gateway-articles-batch2.ts",
  "texas-gateway-lifestyle-batch3.ts",
  "texas-gateway-lifestyle-batch4.ts",
  "texas-gateway-lifestyle-batch5.ts",
  "texas-gateway-lifestyle-batch6.ts",
  "texas-gateway-regional-batch7.ts",
  "texas-gateway-bestof-batch8.ts",
  "texas-gateway-bestof-batch9.ts",
  "texas-gateway-itinerary-batch10.ts",
  "texas-gateway-decision-batch11.ts",
  "texas-gateway-decision-batch12.ts",
  "texas-gateway-decision-batch13.ts",
  "texas-gateway-occasion-batch14.ts",
  "texas-gateway-monthly-batch15.ts",
  "texas-gateway-identity-batch16.ts",
].map((name) => path.join(root, "src/data/fixtures", name));

const fail = (message) => {
  console.error(`gateway disposition validation failed: ${message}`);
  process.exitCode = 1;
};

const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
const sourceText = batchFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const gatewayText = allGatewayFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const readinessText = fs.readFileSync(readinessPath, "utf8");

const sourceSlugs = [...sourceText.matchAll(/\bslug:\s*["']([^"']+)["']/g)].map((match) => match[1]);
const gatewaySlugs = new Set([...gatewayText.matchAll(/\bslug:\s*["']([^"']+)["']/g)].map((match) => match[1]));
const allowlistBody = readinessText.match(/TEXAS_GATEWAY_INDEX_READY_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
const allowlisted = new Set([...allowlistBody.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]));
const entries = plan.entries ?? [];

if (plan.summary?.total !== 23) fail(`expected summary total 23, found ${plan.summary?.total}`);
if (entries.length !== 23) fail(`expected 23 disposition entries, found ${entries.length}`);
if (new Set(entries.map((entry) => entry.slug)).size !== entries.length) fail("duplicate source slug in disposition plan");
if (sourceSlugs.length !== 23) fail(`expected 23 source gateways across batches 14-16, found ${sourceSlugs.length}`);

for (const slug of sourceSlugs) {
  if (!entries.some((entry) => entry.slug === slug)) fail(`missing disposition for ${slug}`);
}

for (const entry of entries) {
  if (!sourceSlugs.includes(entry.slug)) fail(`unknown batch 14-16 source slug ${entry.slug}`);
  if (![14, 15, 16].includes(entry.batch)) fail(`invalid batch for ${entry.slug}: ${entry.batch}`);
  if (!['consolidate', 'rebuild-distinct'].includes(entry.disposition)) fail(`invalid disposition for ${entry.slug}`);
  if (!entry.reason) fail(`missing reason for ${entry.slug}`);
  if (allowlisted.has(entry.slug)) fail(`staged disposition source is allowlisted: ${entry.slug}`);

  if (entry.disposition === 'consolidate') {
    if (!entry.targetSlug) fail(`consolidation target missing for ${entry.slug}`);
    if (entry.targetSlug === entry.slug) fail(`self-referential consolidation target for ${entry.slug}`);
    if (!gatewaySlugs.has(entry.targetSlug)) fail(`unknown consolidation target ${entry.targetSlug} for ${entry.slug}`);
  } else if (entry.targetSlug) {
    fail(`rebuild-distinct entry must not define targetSlug: ${entry.slug}`);
  }
}

const consolidateCount = entries.filter((entry) => entry.disposition === 'consolidate').length;
const rebuildCount = entries.filter((entry) => entry.disposition === 'rebuild-distinct').length;
if (consolidateCount !== 19) fail(`expected 19 consolidate entries, found ${consolidateCount}`);
if (rebuildCount !== 4) fail(`expected 4 rebuild-distinct entries, found ${rebuildCount}`);
if (plan.summary?.consolidate !== consolidateCount) fail("summary consolidate count is stale");
if (plan.summary?.rebuildDistinct !== rebuildCount) fail("summary rebuildDistinct count is stale");

if (!process.exitCode) {
  console.log(`Gateway disposition validation passed: ${entries.length} covered, ${consolidateCount} consolidate, ${rebuildCount} rebuild-distinct, 0 allowlisted.`);
}
