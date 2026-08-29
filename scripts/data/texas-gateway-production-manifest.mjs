import fs from "node:fs";
import path from "node:path";
import { buildGatewayProductionManifest as buildScannedManifest } from "./texas-gateway-production-readiness-lib.mjs";
import { repairGatewayProductionEntries } from "./repair-texas-gateway-production-readiness.mjs";

const REVIEW_PATH = "scripts/data/texas-gateway-editorial-review.json";
const READINESS_PATH = "src/data/fixtures/texas-gateway-index-readiness.ts";

function contentType(batch) {
  if (batch <= 2) return "broad-evergreen";
  if (batch <= 6) return "lifestyle-practical";
  if (batch === 7) return "regional-guide";
  if (batch <= 9) return "best-of-guide";
  if (batch === 10) return "itinerary";
  if (batch <= 13) return "decision-guide";
  if (batch === 14) return "occasion-wrapper";
  if (batch === 15) return "monthly-seasonal";
  return "identity-culture";
}

function minimumWords(type) {
  if (type === "itinerary") return 1600;
  if (type === "regional-guide" || type === "best-of-guide") return 1400;
  if (type === "decision-guide" || type === "monthly-seasonal") return 1300;
  if (type === "identity-culture") return 1100;
  return 1200;
}

function readySlugs(root) {
  const source = fs.readFileSync(path.join(root, READINESS_PATH), "utf8");
  const body = source.match(/TEXAS_GATEWAY_INDEX_READY_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
  return new Set([...body.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]));
}

function recomputeSummary(entries) {
  return entries.reduce((acc, entry) => {
    acc.total += 1;
    acc[entry.readinessResult] += 1;
    if (entry.allowlisted) acc.allowlisted += 1;
    if (entry.blockers.some((blocker) => blocker.startsWith("cannibalization") || blocker.startsWith("near-duplicate") || blocker.startsWith("scanner:"))) acc.duplicationBlocked += 1;
    if (entry.blockers.some((blocker) => blocker.startsWith("authority-source"))) acc.authorityBlocked += 1;
    if (entry.blockers.some((blocker) => blocker.startsWith("depth"))) acc.depthBlocked += 1;
    return acc;
  }, { total: 0, pass: 0, blocked: 0, allowlisted: 0, duplicationBlocked: 0, authorityBlocked: 0, depthBlocked: 0 });
}

export function buildGatewayProductionManifest(root = process.cwd()) {
  const scanned = buildScannedManifest(root);
  const repairedScannedEntries = repairGatewayProductionEntries(root, scanned.entries);
  const review = JSON.parse(fs.readFileSync(path.join(root, REVIEW_PATH), "utf8"));
  const scannedBySlug = new Map(repairedScannedEntries.map((entry) => [entry.slug, entry]));
  const ready = readySlugs(root);

  const entries = review.entries.map((editorial) => {
    const existing = scannedBySlug.get(editorial.slug);
    if (existing) return existing;

    const type = contentType(editorial.batch);
    const targetMinimumWords = minimumWords(type);
    const blockers = [
      `editorial-status:${editorial.status}`,
      "scanner:helper-generated-shape",
      `depth:unmeasured<${targetMinimumWords}`,
    ];
    if (editorial.reason === "expand-authority" || editorial.reason === "stage-audience") blockers.push("authority-source:unmeasured");

    return {
      slug: editorial.slug,
      batch: editorial.batch,
      editorialStatus: editorial.status,
      editorialReason: editorial.reason,
      targetIntent: editorial.slug.replaceAll("-", " "),
      existingCompetingUrl: null,
      requiredSourceClass: editorial.reason === "expand-authority" || editorial.reason === "stage-audience" ? "authoritative-required" : "standard-editorial",
      contentType: type,
      targetMinimumWords,
      requiredDestinationsOrCollections: 2,
      minimumInternalLinks: 5,
      imageRequirement: "non-generic hero with descriptive alt text and verified rights metadata",
      metrics: {
        estimatedWords: null,
        paragraphCount: null,
        headingCount: null,
        listBlockCount: null,
        listItems: null,
        listRatio: null,
        internalLinkCount: null,
        relatedTargets: null,
        sourceUrl: null,
      },
      cannibalizationCandidates: [],
      nearDuplicateGatewayCandidates: [],
      qualityScore: 20,
      readinessResult: "blocked",
      blockers,
      allowlisted: ready.has(editorial.slug),
    };
  });

  return {
    ...scanned,
    sourceReview: REVIEW_PATH,
    summary: recomputeSummary(entries),
    entries,
  };
}

export function validatePromotedGatewayArticles(root = process.cwd()) {
  const manifest = buildGatewayProductionManifest(root);
  const failures = manifest.entries.filter((entry) => entry.allowlisted && entry.readinessResult !== "pass");
  return { manifest, failures };
}
