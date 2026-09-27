import fs from "node:fs";

const leafOnlyPath = "src/lib/leaf-only-parent-routes.tsx";
const leafOnly = fs.readFileSync(leafOnlyPath, "utf8");
const importByAlias = new Map(
  [...leafOnly.matchAll(/import \{ Route as (\w+) \} from "@\/routes\/([^"]+)";/g)]
    .map((match) => [match[1], match[2]]),
);
const listMatch = leafOnly.match(/const LEAF_ONLY_PARENT_ROUTES = \[([\s\S]*?)\] as const;/);
if (!listMatch) throw new Error("Lazy parent route guard validation failed: LEAF_ONLY_PARENT_ROUTES list not found.");

const aliases = listMatch[1]
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const failures = [];
const checked = [];

for (const alias of aliases) {
  const routeStem = importByAlias.get(alias);
  if (!routeStem) {
    failures.push(`Leaf-only parent alias has no route import: ${alias}`);
    continue;
  }

  const lazyPath = `src/routes/${routeStem}.lazy.tsx`;
  if (!fs.existsSync(lazyPath)) continue;

  const source = fs.readFileSync(lazyPath, "utf8");
  checked.push(lazyPath);

  if (!source.includes("<Outlet")) failures.push(`${lazyPath} is a lazy leaf-only parent but does not render <Outlet> for child paths.`);
  if (!source.includes("useRouterState") && !source.includes("useChildMatches")) {
    failures.push(`${lazyPath} is a lazy leaf-only parent but has no child-path or child-match guard.`);
  }
}

const requiredRegressionFiles = [
  "src/routes/guides.lazy.tsx",
  "src/routes/explore.landscapes.lazy.tsx",
  "src/routes/sports.lazy.tsx",
  "src/routes/texas-data.lazy.tsx",
  "src/routes/fishing.techniques.lazy.tsx",
  "src/routes/fishing.guides.lazy.tsx",
  "src/routes/fishing.reports.lazy.tsx",
];
for (const path of requiredRegressionFiles) {
  if (!checked.includes(path)) failures.push(`Expected lazy parent route is not covered by leaf-only guard validation: ${path}`);
}

if (failures.length) {
  console.error("Lazy parent route guard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Lazy parent route guard validation passed for ${checked.length} lazy leaf-only parent route(s).`);
