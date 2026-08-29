import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const fail = (message) => {
  console.error(`Texas Talent related-network validation failed: ${message}`);
  process.exit(1);
};
const requireCondition = (condition, message) => {
  if (!condition) fail(message);
};

const serverPath = "src/data/texas-talent-related.server.ts";
const talentServerPath = "src/data/texas-talent.server.ts";
const functionsPath = "src/data/texas-talent.functions.ts";
const routePath = "src/routes/admin.texas-talent.$slug.tsx";
const pagePath = "src/routes/admin.texas-talent.$slug.lazy.tsx";

for (const path of [serverPath, talentServerPath, functionsPath, routePath, pagePath]) {
  requireCondition(existsSync(resolve(root, path)), `missing required file ${path}`);
}

const server = read(serverPath);
const talentServer = read(talentServerPath);
const functions = read(functionsPath);
const route = read(routePath);
const page = read(pagePath);
const publicRoutes = read("src/lib/public-routes.ts");
const sitemap = read("src/routes/sitemap[.]xml.ts");

requireCondition(
  server.includes('resolveTexasTalentEntityLinksFromGraph')
    && server.includes('TexasEntityRecord')
    && server.includes('LoadedTexasTalentProfile'),
  "related-profile scoring must consume the effective profile inventory and current Texas knowledge graph supplied by the existing server loader",
);
requireCondition(
  !server.includes('loadTexasKnowledgeGraph')
    && !server.includes('loadTexasTalentProfilesServer'),
  "related-profile helper must remain parameterized and must not open a second server-loading path",
);
requireCondition(
  server.includes('candidate.slug !== target.slug'),
  "related-profile resolver must exclude the current profile",
);
requireCondition(
  server.includes('sharedDestinations')
    && server.includes('targetPaths.has(link.href)')
    && server.includes('candidate.score > 0'),
  "related profiles must require a real shared destination or same-category signal",
);
requireCondition(
  server.includes('Math.min(limit, 8)'),
  "related-profile output must retain the bounded result limit",
);
requireCondition(
  talentServer.includes('resolveTexasTalentRelatedProfilesFromGraph')
    && talentServer.includes('relatedProfiles,')
    && talentServer.includes('loadTexasTalentProfilesServer(),'),
  "existing enriched-profile server loader must derive and return the related-profile set",
);
requireCondition(
  functions.includes('getTexasTalentProfileWithResolvedLinks')
    && !functions.includes('getTexasTalentRelatedProfiles'),
  "relationship data must reuse the existing Talent profile server-function boundary",
);
requireCondition(
  route.includes('getTexasTalentProfileWithResolvedLinks')
    && route.includes('relatedProfiles: profile.relatedProfiles')
    && !route.includes('getTexasTalentRelatedProfiles'),
  "hidden profile route must reuse the enriched profile loader rather than adding a second client-facing server function",
);
requireCondition(
  route.includes('noindex, nofollow, noarchive'),
  "hidden profile route must remain noindex, nofollow, noarchive",
);
requireCondition(
  page.includes('Related Texas Talent')
    && page.includes('Connected by place, scene or discipline')
    && page.includes('preview-only and never create a public Talent link by themselves'),
  "profile preview must explain and render the guarded relationship layer",
);
requireCondition(
  page.includes('to="/admin/texas-talent/$slug"'),
  "related-profile cards must remain inside the admin preview namespace",
);
requireCondition(
  !existsSync(resolve(root, "src/routes/texas-talent.tsx"))
    && !existsSync(resolve(root, "src/routes/texas-talent.lazy.tsx")),
  "public Texas Talent hub must remain absent",
);
requireCondition(
  !publicRoutes.includes('"/texas-talent"'),
  "Texas Talent must remain outside public route classification",
);
requireCondition(
  !sitemap.includes("texas-talent"),
  "Texas Talent must remain absent from sitemap generation",
);

console.log(
  "Texas Talent related-network contract passed: profile recommendations remain graph-derived, bounded, single-boundary, server-only and inside the hidden noindex preview.",
);
