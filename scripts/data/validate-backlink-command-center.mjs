import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  migration: "supabase/migrations/20260930023639_create_texasdefined_backlink_command_center.sql",
  types: "src/data/backlink-command-center.ts",
  server: "src/data/backlink-command-center.server.ts",
  functions: "src/data/backlink-command-center.functions.ts",
  route: "src/routes/admin.editorial-outreach.tsx",
  lazy: "src/routes/admin.editorial-outreach.lazy.tsx",
  panel: "src/components/admin/BacklinkCommandCenterPanel.tsx",
  admin: "src/routes/admin.tsx",
  docs: "docs/seo/backlink-command-center.md",
  package: "package.json",
};
for (const path of Object.values(paths)) if (!fs.existsSync(path)) throw new Error(`Backlink command center validation failed: missing ${path}`);
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const errors = [];
const requireText = (source, token, label) => { if (!source.includes(token)) errors.push(label); };

for (const marker of [
  "referring_domain text not null",
  "linking_url text",
  "destination_url text not null",
  "topic_cluster text not null",
  "contact_organization text not null",
  "contact_name text",
  "contact_email text",
  "source_type text not null",
  "outreach_reason text not null",
  "outreach_date date",
  "last_follow_up_date date",
  "response_status text not null",
  "backlink_status text not null",
  "link_attribute text not null",
  "anchor_text text",
  "authority_relevance_notes text",
  "next_action text",
  "campaign text not null",
  "date_first_discovered date",
  "date_last_verified date",
]) requireText(files.migration, marker, `Backlink table missing field: ${marker}`);

for (const stage of ["prospect","researched","ready-to-contact","contacted","follow-up","replied","link-won","declined","no-response","disqualified"]) {
  requireText(files.migration, `'${stage}'`, `Backlink migration missing stage ${stage}`);
  requireText(files.types, `"${stage}"`, `Backlink types missing stage ${stage}`);
}

for (const marker of [
  "enable row level security",
  "revoke all on table public.texasdefined_backlink_prospects from anon, authenticated",
  "grant select, insert, update, delete on table public.texasdefined_backlink_prospects to service_role",
  "texasdefined_backlink_prospects_domain_destination_unique_idx",
]) requireText(files.migration.toLowerCase(), marker.toLowerCase(), `Backlink privacy/duplicate control missing: ${marker}`);
if (/create\s+policy/i.test(files.migration)) errors.push("Private backlink table must not create anon/authenticated RLS policies.");

for (const marker of [
  "assertSportsPartnerAccess",
  "normalizeReferringDomain",
  "duplicateGroups",
  "buildMonthlyReports",
  "BACKLINK_GOALS",
  "createBacklinkRecord",
  "updateBacklinkRecord",
]) requireText(files.server, marker, `Backlink server workflow missing: ${marker}`);

for (const marker of [
  "getBacklinkCommandCenter",
  "addBacklinkProspect",
  "saveBacklinkProspect",
  "z.enum(BACKLINK_STAGES)",
  "https://texasdefined.com",
]) requireText(files.functions, marker, `Backlink protected function missing: ${marker}`);

for (const marker of [
  "Paid links",
  "Private blog networks",
  "low-quality directory",
  "automated",
  "reciprocal",
  "10, 25, 50 and 100",
  "Contact → Reply",
  "Contact → Link",
  "Reply → Link",
]) requireText(files.docs, marker, `Backlink governance documentation missing: ${marker}`);

for (const marker of [
  "Backlink Command Center",
  "BACKLINK_STAGE_LABELS",
  "Cross-campaign duplicates",
  "Add prospect",
  "Monthly report",
]) requireText(files.panel, marker, `Backlink admin UX missing: ${marker}`);

requireText(files.route, "noindex,nofollow,noarchive", "Backlink admin route must remain noindex/nofollow/noarchive.");
requireText(files.admin, "Backlinks", "Admin navigation must expose the protected backlink command center.");
const pkg = JSON.parse(files.package);
if (pkg.scripts?.["backlinks:validate"] !== "node scripts/data/validate-backlink-command-center.mjs") errors.push("package script backlinks:validate missing or changed.");
if (!pkg.scripts?.["data:validate"]?.includes("npm run backlinks:validate")) errors.push("Backlink validation is not wired into data:validate.");

for (const forbidden of [
  "buy a backlink",
  "pay for a link",
  "guaranteed backlink",
  "guaranteed links",
]) {
  const operational = [files.types, files.server, files.functions, files.lazy].join("\n").toLowerCase();
  if (operational.includes(forbidden)) errors.push(`Prohibited backlink framing found in operational code: ${forbidden}`);
}

if (errors.length) {
  console.error("Backlink command center validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Backlink command center validation passed: private PII storage, complete pipeline stages, duplicate detection, goals, monthly reporting, conversion metrics and anti-spam link governance.");
