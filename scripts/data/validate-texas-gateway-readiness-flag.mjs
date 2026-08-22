import fs from "node:fs";

const path = "src/data/fixtures/texas-gateway-index-readiness.ts";
const source = fs.readFileSync(path, "utf8");
const allowlistBody = source.match(/TEXAS_GATEWAY_INDEX_READY_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1];
const flag = source.match(/const HAS_INDEX_READY_GATEWAYS\s*=\s*(true|false)\s*;/)?.[1];

if (allowlistBody == null) {
  throw new Error("Gateway readiness flag validation failed: explicit allowlist not found.");
}
if (flag == null) {
  throw new Error("Gateway readiness flag validation failed: HAS_INDEX_READY_GATEWAYS flag not found.");
}

const readySlugs = [...allowlistBody.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
const expected = readySlugs.length > 0;
const actual = flag === "true";
if (actual !== expected) {
  throw new Error(`Gateway readiness flag validation failed: ${readySlugs.length} allowlisted slug(s) requires HAS_INDEX_READY_GATEWAYS=${expected}.`);
}

if (!source.includes("!HAS_INDEX_READY_GATEWAYS || !isTexasGatewayIndexReadySlug(article.slug)")) {
  throw new Error("Gateway readiness flag validation failed: staged robots guard is not wired through the readiness flag.");
}

console.log(`Gateway readiness compile-time flag passed: ${readySlugs.length} allowlisted slug(s), HAS_INDEX_READY_GATEWAYS=${actual}.`);
