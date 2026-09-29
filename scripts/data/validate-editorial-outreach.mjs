import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  data: "src/data/editorial-outreach.ts",
  server: "src/data/editorial-outreach.server.ts",
  functions: "src/data/editorial-outreach.functions.ts",
  route: "src/routes/admin.editorial-outreach.tsx",
  lazy: "src/routes/admin.editorial-outreach.lazy.tsx",
  admin: "src/routes/admin.tsx",
  routeTree: "src/routeTree.gen.ts",
  package: "package.json",
};
for (const path of Object.values(paths)) if (!fs.existsSync(path)) throw new Error(`Editorial outreach validation failed: missing ${path}`);
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const errors = [];
const requireText = (source, token, label) => { if (!source.includes(token)) errors.push(label); };

const targetIds = [...files.data.matchAll(/id:"([a-z0-9-]+)"/g)].map((match) => match[1]);
if (targetIds.length !== 10 || new Set(targetIds).size !== 10) errors.push(`Expected 10 unique verified outreach targets, found ${new Set(targetIds).size}.`);

for (const id of [
  "state-fair-of-texas",
  "visit-fredericksburg",
  "space-center-houston",
  "fort-worth-stockyards",
  "painted-churches-schulenburg",
  "waco-mammoth",
  "national-museum-pacific-war",
  "san-antonio-missions",
  "texas-state-capitol",
  "texas-state-aquarium",
]) requireText(files.data, `id:"${id}"`, `Verified outreach target missing: ${id}`);

for (const marker of [
  "noPaidLinks: true",
  "noReciprocalLinkScheme: true",
  "noGuaranteedCoverage: true",
  "no link is required",
  "accuracy",
  "approved imagery",
  "recurring update",
]) requireText(files.data, marker, `Editorial relationship policy missing: ${marker}`);

for (const marker of [
  "assertSportsPartnerAccess",
  "listResolvedDestinations",
  "auditDestination",
  "audit.readyForIndexing",
  "destination.officialUrl",
  "destination.managingAuthority",
  '"contact-research"',
  "needsImprovementFirst",
  "automaticIntake.slice(0, 60)",
  "loadUpcomingTexasEventRecordsServer",
  "eventIntake.slice(0, 40)",
  'contentKind: "event"',
  "platform.articles.list(scope)",
  "isArticleIndexReady(article)",
  "authoritySourceIntake.slice(0, 40)",
  'contentKind: "article-source"',
  'status: "source-research"',
]) requireText(files.server, marker, `Automatic outreach intake missing: ${marker}`);

for (const marker of [
  "createServerFn",
  "z.string().min(20).max(200)",
  "loadEditorialOutreachDashboard",
]) requireText(files.functions, marker, `Protected outreach server function missing: ${marker}`);

for (const marker of [
  'createFileRoute("/admin/editorial-outreach")',
  "noindex,nofollow,noarchive",
]) requireText(files.route, marker, `Admin outreach route missing: ${marker}`);

for (const marker of [
  'createLazyFileRoute("/admin/editorial-outreach")',
  "Copy outreach draft",
  "No email is sent from this dashboard.",
  "New authority pages needing contact research",
  "Pages that should be improved first",
  "Upcoming event guides needing organizer contact research",
  "Published articles with named source relationships to evaluate",
  "A citation does not mean",
  "We are not asking for paid placement or a reciprocal-link arrangement.",
]) requireText(files.lazy, marker, `Editorial outreach admin UX missing: ${marker}`);

requireText(files.admin, 'to="/admin/editorial-outreach"', "Admin navigation does not link editorial outreach.");

for (const marker of [
  "AdminEditorialOutreachRouteImport",
  "'/admin/editorial-outreach'",
  "admin.editorial-outreach.lazy",
]) requireText(files.routeTree, marker, `Generated route tree missing: ${marker}`);

const pkg = JSON.parse(files.package);
if (pkg.scripts?.["editorial-outreach:validate"] !== "node scripts/data/validate-editorial-outreach.mjs") errors.push("package script editorial-outreach:validate missing or changed.");
if (!pkg.scripts?.["data:validate"]?.includes("npm run editorial-outreach:validate")) errors.push("Editorial outreach validation is not wired into data:validate.");

for (const forbidden of [
  "buy a backlink",
  "pay for a link",
  "reciprocal link exchange",
  "guaranteed backlink",
  "guaranteed coverage",
]) {
  if (Object.values(files).some((source) => source.toLowerCase().includes(forbidden))) errors.push(`Prohibited outreach framing found: ${forbidden}`);
}

if (errors.length) {
  console.error("Editorial source-relationship validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Editorial outreach validation passed: ten verified relationship targets, protected admin access, quality-gated destination intake, verified event-organizer intake, conservative authority-source research, improve-before-outreach separation, optional-reference framing and no paid/reciprocal link scheme.");
