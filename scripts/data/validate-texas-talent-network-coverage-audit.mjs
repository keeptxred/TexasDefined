import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent network-coverage validation failed: ${message}`);
  process.exit(1);
};
const requireCondition = (condition, message) => {
  if (!condition) fail(message);
};

const auditPath = "src/data/texas-talent-network-audit.server.ts";
const routePath = "src/routes/admin.texas-talent.network-audit.ts";
const clientRoutePaths = [
  "src/routes/admin.texas-talent.network-audit.tsx",
  "src/routes/admin.texas-talent.network-audit.lazy.tsx",
];

for (const path of [auditPath, routePath]) {
  requireCondition(existsSync(resolve(root, path)), `missing required file ${path}`);
}
for (const path of clientRoutePaths) {
  requireCondition(!existsSync(resolve(root, path)), `network audit must remain server-only; remove ${path}`);
}

const audit = read(auditPath);
const route = read(routePath);
const publicRoutes = read("src/lib/public-routes.ts");
const sitemap = read("src/routes/sitemap[.]xml.ts");
const editorialStatus = read("src/data/texas-talent-editorial-status.ts");

requireCondition(
  audit.includes('loadTexasTalentProfilesServer')
    && audit.includes('loadTexasKnowledgeGraph')
    && audit.includes('resolveTexasTalentRelatedProfilesFromGraph')
    && audit.includes('resolveTexasTalentEntityLinksFromGraph'),
  "coverage audit must use the effective Talent inventory plus the current safe knowledge graph and relationship resolvers",
);
requireCondition(
  audit.includes('relatedWithSharedContext')
    && audit.includes('categoryOnlyFallback')
    && audit.includes('sharedDestinationCount'),
  "relationship audit must distinguish graph-backed context from taxonomy fallback",
);
requireCondition(
  audit.includes('link.kind === "city" || link.kind === "destination"')
    && audit.includes('"experience-linked"')
    && audit.includes('"context-only"')
    && audit.includes('"unlinked"'),
  "experience readiness must count only safe city/destination links and retain context-only/unlinked states",
);
requireCondition(
  audit.includes('profilesWithSharedContextRelationships')
    && audit.includes('categoryOnlyFallbackProfiles')
    && audit.includes('profilesWithExperienceLinks')
    && audit.includes('contextOnlyExperienceProfiles'),
  "coverage audit must expose aggregate relationship and experience metrics",
);
requireCondition(
  route.includes('createFileRoute("/admin/texas-talent/network-audit")')
    && route.includes('server:')
    && route.includes('handlers:')
    && route.includes('GET:'),
  "network audit must remain a server-only admin response route",
);
requireCondition(
  route.includes('"X-Robots-Tag": "noindex, nofollow, noarchive"')
    && route.includes('content="noindex, nofollow, noarchive"')
    && route.includes('"Cache-Control": "private, no-store"'),
  "network audit must remain uncached and noindex at both HTTP and HTML layers",
);
requireCondition(
  route.includes('Category-only fallback')
    && route.includes('With shared Texas context')
    && route.includes('With city/destination links')
    && route.includes('Context-only links'),
  "network audit must visibly expose relationship and experience-quality queues",
);
requireCondition(
  route.includes('/admin/texas-talent/${encodeURIComponent(row.slug)}')
    && !route.includes('href="/texas-talent/'),
  "network audit profile links must remain inside the hidden admin namespace",
);
requireCondition(
  !existsSync(resolve(root, "src/routes/texas-talent.tsx"))
    && !existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx")),
  "public Texas Talent route must remain absent",
);
requireCondition(!publicRoutes.includes('"/texas-talent"'), "Texas Talent must remain outside public route classification");
requireCondition(!sitemap.includes("texas-talent"), "Texas Talent must remain absent from sitemap generation");
requireCondition(!editorialStatus.includes('launch-ready'), "network audit work must not grant launch-ready editorial approval");

console.log("Texas Talent network-coverage contract passed: relationship and experience backlogs remain server-only, graph-derived, noindex and non-publishing.");
