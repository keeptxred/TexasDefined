import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent reverse-link validation failed: ${message}`);
  process.exit(1);
};
const requireCondition = (condition, message) => {
  if (!condition) fail(message);
};

const serverPath = "src/data/texas-talent-reverse-links.server.ts";
const routePath = "src/routes/admin.texas-talent.relationships.tsx";
const pagePath = "src/routes/admin.texas-talent.relationships.lazy.tsx";
const functionsPath = "src/data/texas-talent.functions.ts";

for (const path of [serverPath, routePath, pagePath, functionsPath]) {
  requireCondition(existsSync(resolve(root, path)), `missing required reverse-link file ${path}`);
}

const server = read(serverPath);
const route = read(routePath);
const page = read(pagePath);
const functions = read(functionsPath);
const publicRoutes = read("src/lib/public-routes.ts");
const sitemap = read("src/routes/sitemap[.]xml.ts");

requireCondition(
  server.includes('loadTexasKnowledgeGraph') && server.includes('resolveTexasTalentEntityLinksFromGraph'),
  "reverse-link audit must derive relationships from the current knowledge graph resolver",
);
requireCondition(
  server.includes('loadTexasTalentProfilesServer'),
  "reverse-link audit must use the effective Texas Talent profile inventory",
);
requireCondition(
  server.includes('destination.profiles.set(profile.slug'),
  "reverse-link destinations must deduplicate profiles by slug",
);
requireCondition(
  server.includes('profileCoverage')
    && server.includes('profilesWithCityLinks')
    && server.includes('profilesWithCultureLinks')
    && server.includes('profilesWithCountyOnlyLinks'),
  "reverse-link audit must retain per-profile city/culture/county-only coverage diagnostics",
);
requireCondition(
  route.includes('createFileRoute("/admin/texas-talent/relationships")'),
  "relationship audit must remain inside the admin namespace",
);
requireCondition(
  route.includes('noindex, nofollow, noarchive'),
  "relationship audit must remain noindex, nofollow, noarchive",
);
requireCondition(
  functions.includes('getTexasTalentReverseLinkAudit') && functions.includes('texas-talent-reverse-links.server'),
  "relationship audit must load through the server-only reverse-link module",
);
requireCondition(
  page.includes('Nothing on this page enables those public modules.'),
  "hidden relationship view must retain its non-public activation warning",
);
requireCondition(
  page.includes('Profiles that still need a richer TexasDefined path')
    && page.includes('County-only coverage')
    && page.includes('does not invent links and does not change stored readiness'),
  "hidden relationship view must retain the launch-quality coverage-gap audit and its safety boundary",
);
requireCondition(
  !existsSync(resolve(root, "src/routes/texas-talent.tsx")) && !existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx")),
  "public Texas Talent hub must remain absent during reverse-link planning",
);
requireCondition(!publicRoutes.includes('"/texas-talent"'), "Texas Talent must remain outside public route classification");
requireCondition(!sitemap.includes("texas-talent"), "Texas Talent must remain absent from sitemap generation");

console.log("Texas Talent reverse-link contract passed: relationships and per-profile coverage gaps remain graph-derived, hidden and non-publishing.");
