import fs from "node:fs";

const routePaths = [
  "src/routes/texas-icons.tsx",
  "src/routes/texas-icons_.$slug.tsx",
];
const functionsPath = "src/data/texas-icons.functions.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const researchPaths = [
  "src/data/texas-icons-research-history-1.server.ts",
  "src/data/texas-icons-research-history-2.server.ts",
  "src/data/texas-icons-research-history-3.server.ts",
  "src/data/texas-icons-research-history-4.server.ts",
  "src/data/texas-icons-research-history-5.server.ts",
  "src/data/texas-icons-research-history-6.server.ts",
  "src/data/texas-icons-research-history-7.server.ts",
  "src/data/texas-icons-research-history-8.server.ts",
  "src/data/texas-icons-research-history-9.server.ts",
  "src/data/texas-icons-research-history-10.server.ts",
];
const failures = [];

for (const path of [...routePaths, functionsPath, resolverPath, ...researchPaths]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons isolation contract file: ${path}`);
}

const routeSources = routePaths.map((path) => [path, fs.readFileSync(path, "utf8")]);
for (const [path, source] of routeSources) {
  if (!source.includes('from "@/data/texas-icons.functions"')) failures.push(`${path} must use the Texas Icons server-function bridge.`);
  if (/texas-icons(?:-research[^"']*)?\.server/.test(source)) failures.push(`${path} must never import a Texas Icons .server module directly.`);
}

const functions = fs.readFileSync(functionsPath, "utf8");
if (!functions.includes('import("./texas-icons.server")')) failures.push("Texas Icons server functions must dynamically import the server resolver.");

const resolver = fs.readFileSync(resolverPath, "utf8");
for (const path of researchPaths) {
  const moduleName = path.replace(/^src\/data\//, "@/data/").replace(/\.ts$/, "");
  if (!resolver.includes(`from "${moduleName}"`)) failures.push(`The server resolver must own staged research import: ${moduleName}.`);
}
if (!resolver.includes("TEXAS_ICON_RESEARCH_PROFILES")) failures.push("The server resolver must combine staged research batches before building the lookup map.");

if (failures.length) {
  console.error("Texas Icons server-isolation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas Icons server-isolation validation passed: public routes use the server-function bridge and ${researchPaths.length} staged research batches stay server-only.`);
