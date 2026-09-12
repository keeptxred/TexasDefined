import fs from "node:fs";

const resolverPath = "scripts/data/sync-rv-park-hero-assets.mjs";
const source = fs.readFileSync(resolverPath, "utf8");

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

console.log("RV hero resolver safety contract verified: exact property/locality evidence and commercial-use licensing guards are present.");
