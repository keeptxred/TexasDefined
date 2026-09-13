import fs from "node:fs";

const resolverPath = "scripts/data/sync-rv-park-hero-assets.mjs";
const strictPath = "scripts/data/enforce-rv-park-hero-location-policy.mjs";
const workflowPath = ".github/workflows/rv-park-hero-assets.yml";
const source = fs.readFileSync(resolverPath, "utf8");
const strictSource = fs.readFileSync(strictPath, "utf8");
const workflowSource = fs.readFileSync(workflowPath, "utf8");

const requiredSnippets = [
  "function hasStrongPropertyLocationEvidence(page, record)",
  "if (!hasStrongPropertyLocationEvidence(page, record)) continue;",
  "function assertResolverRegressionGuards()",
  "Greater Roadrunner - Flickr - GregTheBusker",
  "Fredericksburg-Spotsylvania National Military Park",
  "Singapore Marina-Bay-at-night",
  "CC BY-NC 4.0",
  "CC BY-ND 4.0",
  "fullName && (evidence.includes(fullName) || title.includes(fullName))",
  "isPublicLand && identity && (evidence.includes(identity) || title.includes(identity))",
];

for (const snippet of requiredSnippets) {
  if (!source.includes(snippet)) {
    throw new Error(`RV hero resolver safety contract missing: ${snippet}`);
  }
}

if (/LICENSE_OK\s*=/.test(source)) {
  throw new Error("RV hero resolver reverted to substring-based license allowlist");
}

if (!source.includes("if (/\\b(?:nc|noncommercial|non commercial|nd|no derivatives|non derivative)\\b/.test(text)) return false;")) {
  throw new Error("RV hero resolver must explicitly reject NC/ND license forms");
}

const strictRequiredSnippets = [
  "function registryCommonsCandidates(imagesSource, seedMap, report)",
  "function commonsTitleFromSourceUrl(sourceUrl)",
  "const commons = registryCommonsCandidates(imagesSource, seedMap, report);",
  "assertRegistryAuditRegression();",
  "registryAudit: true",
  "every existing Wikimedia-backed RV registry entry",
  "commonsReviewed: commons.length",
  "commonsAccepted: accepted.length",
  "commonsRejected: rejected.length",
];

for (const snippet of strictRequiredSnippets) {
  if (!strictSource.includes(snippet)) {
    throw new Error(`RV strict-location safety contract missing: ${snippet}`);
  }
}

const workflowRequiredSnippets = [
  "const currentCommons =",
  "strict.registryAudit === true",
  "strictReviewed === strictAccepted + strictRejected",
  "qualityReviewed === strictAccepted",
  "qualityReviewed === qualityRetained + qualityRejected",
  "currentCommons === qualityRetained",
  "Detect material generated RV image changes",
  "existing Commons entries location-audited",
];

for (const snippet of workflowRequiredSnippets) {
  if (!workflowSource.includes(snippet)) {
    throw new Error(`RV hero workflow safety contract missing: ${snippet}`);
  }
}

const materialSection = workflowSource.split("      - name: Detect material generated RV image changes")[1]?.split("      - name: Create RV image review branch")[0] || "";
if (!materialSection) {
  throw new Error("RV hero workflow safety contract missing material-change detection section");
}
if (materialSection.includes("rv-park-hero-report.json")) {
  throw new Error("RV hero workflow must not open report-only review PRs");
}

console.log("RV hero resolver safety contract verified: commercial-use licensing, exact property/locality resolution, registry-wide Commons re-audit, hero-quality accounting, and material-only PR publication guards are present.");
