import { spawnSync } from "node:child_process";

await import("./validate-fishing-image-library-v2.mjs");
await import("./validate-fishing-live-source-governance.mjs");

const parserTests = spawnSync(
  process.execPath,
  ["--experimental-strip-types", "--test", "src/data/fishing/__tests__/lcra-lake-level.test.ts"],
  { stdio: "inherit" },
);

if (parserTests.status !== 0) {
  throw new Error("Fishing image/live-source validation failed: LCRA parser regression tests did not pass");
}

console.log("Fishing image/live-source validation passed: provenance, exact-location imagery, Calaveras exception governance and LCRA parser fixtures are all enforced.");
