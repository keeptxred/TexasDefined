import fs from "node:fs";

const routePaths = [
  "src/routes/texas-icons.tsx",
  "src/routes/texas-icons_.$slug.tsx",
];
const functionsPath = "src/data/texas-icons.functions.ts";
const resolverPath = "src/data/texas-icons.server.ts";
const researchPath = "src/data/texas-icons-research-history-1.server.ts";
const failures = [];

for (const path of [...routePaths, functionsPath, resolverPath, researchPath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons isolation contract file: ${path}`);
}

const routeSources = routePaths.map((path) => [path, fs.readFileSync(path, "utf8")]);
for (const [path, source] of routeSources) {
  if (!source.includes('from "@/data/texas-icons.functions"')) {
    failures.push(`${path} must use the Texas Icons server-function bridge.`);
  }
  if (/texas-icons(?:-research[^"']*)?\.server/.test(source)) {
    failures.push(`${path} must never import a Texas Icons .server module directly.`);
  }
}

const functions = fs.readFileSync(functionsPath, "utf8");
if (!functions.includes('import("./texas-icons.server")')) {
  failures.push("Texas Icons server functions must dynamically import the server resolver.");
}

const resolver = fs.readFileSync(resolverPath, "utf8");
if (!resolver.includes('from "@/data/texas-icons-research-history-1.server"')) {
  failures.push("The server resolver must own the staged research import.");
}

if (failures.length) {
  console.error("Texas Icons server-isolation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Texas Icons server-isolation validation passed: public routes use the server-function bridge and staged research stays server-only.");
