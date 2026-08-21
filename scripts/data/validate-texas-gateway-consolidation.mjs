import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "src/data/fixtures/texas-gateway-articles.ts",
  "src/data/fixtures/texas-gateway-articles-batch2.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch3.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch4.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch5.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch6.ts",
  "src/data/fixtures/texas-gateway-regional-batch7.ts",
  "src/data/fixtures/texas-gateway-bestof-batch8.ts",
  "src/data/fixtures/texas-gateway-bestof-batch9.ts",
  "src/data/fixtures/texas-gateway-itinerary-batch10.ts",
  "src/data/fixtures/texas-gateway-decision-batch11.ts",
  "src/data/fixtures/texas-gateway-decision-batch12.ts",
  "src/data/fixtures/texas-gateway-decision-batch13.ts",
  "src/data/fixtures/texas-gateway-occasion-batch14.ts",
  "src/data/fixtures/texas-gateway-monthly-batch15.ts",
  "src/data/fixtures/texas-gateway-identity-batch16.ts",
];

const rows = [];
for (const file of files) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) throw new Error(`Missing gateway module: ${file}`);
  const source = fs.readFileSync(full, "utf8");

  const objectIds = [...source.matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1]);
  const objectSlugs = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
  if (objectIds.length !== objectSlugs.length) {
    throw new Error(`${file}: found ${objectIds.length} object IDs but ${objectSlugs.length} object slugs`);
  }
  objectIds.forEach((id, index) => rows.push({ id, slug: objectSlugs[index], file }));

  for (const match of source.matchAll(/\b(?:make|trip|article)\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g)) {
    rows.push({ id: match[1], slug: match[2], file });
  }

  for (const match of source.matchAll(/href:\s*"([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) {
      throw new Error(`${file}: invalid gateway internal href ${href}`);
    }
  }
}

if (rows.length < 120) {
  throw new Error(`Gateway consolidation lost content: expected at least 120 articles, found ${rows.length}`);
}

const duplicates = (key) => {
  const seen = new Map();
  for (const row of rows) {
    const value = row[key];
    const list = seen.get(value) ?? [];
    list.push(row.file);
    seen.set(value, list);
  }
  return [...seen.entries()].filter(([, sources]) => sources.length > 1);
};

const duplicateIds = duplicates("id");
const duplicateSlugs = duplicates("slug");
if (duplicateIds.length) {
  throw new Error(`Duplicate gateway IDs: ${duplicateIds.map(([value]) => value).join(", ")}`);
}
if (duplicateSlugs.length) {
  throw new Error(`Duplicate gateway slugs: ${duplicateSlugs.map(([value]) => value).join(", ")}`);
}

const loaderPath = path.join(root, "src/data/fixtures/lazy-texas-gateway.ts");
const repositoryPath = path.join(root, "src/data/fixtures/repositories.ts");
const corePath = path.join(root, "src/data/fixtures/lazy-texas-core-articles.ts");
for (const required of [loaderPath, repositoryPath, corePath]) {
  if (!fs.existsSync(required)) throw new Error(`Missing gateway integration file: ${path.relative(root, required)}`);
}

const loader = fs.readFileSync(loaderPath, "utf8");
const repository = fs.readFileSync(repositoryPath, "utf8");
const core = fs.readFileSync(corePath, "utf8");
for (const file of files) {
  const moduleName = `./${path.basename(file, ".ts")}`;
  if (!loader.includes(`import("${moduleName}")`)) {
    throw new Error(`Lazy loader does not reference ${moduleName}`);
  }
}
if (!repository.includes('import("./lazy-texas-gateway")')) {
  throw new Error("Editorial discovery does not dynamically load the gateway module");
}
if (!repository.includes("...(await loadGatewayEditorialArticles())")) {
  throw new Error("Gateway articles are missing from editorial list/search discovery");
}
if (!core.includes('await import("./lazy-texas-gateway")')) {
  throw new Error("Core article resolution is not dynamically loading gateway articles");
}
if (/^import .*texas-gateway-/m.test(core)) {
  throw new Error("Core article registry must not statically import full gateway modules");
}

console.log(`PASS Texas gateway consolidation: ${rows.length} unique articles across ${files.length} modules`);
