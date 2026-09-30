import fs from "node:fs";

import {
  BACKLINK_COMMAND_CENTER_POLICY,
  BACKLINK_LEDGER_REQUIRED_FIELDS,
  BACKLINK_OUTREACH_ACTIVITY,
  VERIFIED_BACKLINK_LEDGER,
} from "../../src/data/backlink-command-center.ts";

const fail = (message: string): never => {
  throw new Error(`Backlink command center validation failed: ${message}`);
};

const read = (path: string) => fs.readFileSync(path, "utf8");
const files = {
  data: read("src/data/backlink-command-center.ts"),
  server: read("src/data/backlink-command-center.server.ts"),
  functions: read("src/data/backlink-command-center.functions.ts"),
  route: read("src/routes/admin.backlinks.tsx"),
  lazy: read("src/routes/admin.backlinks.lazy.tsx"),
  admin: read("src/routes/admin.tsx"),
};

const requireText = (source: string, token: string, message: string) => {
  if (!source.includes(token)) fail(message);
};

for (const field of BACKLINK_LEDGER_REQUIRED_FIELDS) {
  requireText(files.data, `${field}:`, `ledger type is missing required field ${field}`);
}

const linkUrls = new Set<string>();
for (const entry of VERIFIED_BACKLINK_LEDGER) {
  if (!entry.id.trim()) fail("ledger entry has an empty id");
  if (!entry.destinationPath.startsWith("/")) fail(`${entry.id} destinationPath must be site-relative`);
  if (!entry.topicCluster.trim()) fail(`${entry.id} topicCluster is empty`);
  if (!entry.anchorContext.trim()) fail(`${entry.id} anchorContext is empty`);
  if (!entry.sourceEvidence.trim()) fail(`${entry.id} sourceEvidence is empty`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.firstSeen) || !/^\d{4}-\d{2}-\d{2}$/.test(entry.lastChecked)) {
    fail(`${entry.id} firstSeen/lastChecked must be YYYY-MM-DD`);
  }
  if (entry.lastChecked < entry.firstSeen) fail(`${entry.id} lastChecked predates firstSeen`);

  let url: URL;
  try {
    url = new URL(entry.linkingUrl);
  } catch {
    fail(`${entry.id} linkingUrl is not a valid absolute URL`);
  }
  if (url!.protocol !== "https:") fail(`${entry.id} linkingUrl must use HTTPS`);
  if (url!.hostname === "texasdefined.com" || url!.hostname.endsWith(".texasdefined.com")) fail(`${entry.id} linkingUrl is internal, not a backlink`);
  const host = url!.hostname.replace(/^www\./, "").toLowerCase();
  const domain = entry.referringDomain.replace(/^www\./, "").toLowerCase();
  if (host !== domain) fail(`${entry.id} referringDomain does not match linkingUrl hostname`);
  if (linkUrls.has(entry.linkingUrl)) fail(`${entry.id} duplicates an existing linkingUrl`);
  linkUrls.add(entry.linkingUrl);
}

const activityIds = new Set<string>();
for (const activity of BACKLINK_OUTREACH_ACTIVITY) {
  if (!activity.id.trim() || !activity.targetId.trim()) fail("outreach activity must have id and targetId");
  if (!activity.organization.trim() || !activity.destinationPath.startsWith("/")) fail(`${activity.id} is missing organization or canonical destination`);
  if (!activity.topicCluster.trim() || !activity.nextAction.trim()) fail(`${activity.id} is missing topicCluster or nextAction`);
  if (activityIds.has(activity.id)) fail(`duplicate outreach activity id ${activity.id}`);
  activityIds.add(activity.id);
}

if (!BACKLINK_COMMAND_CENTER_POLICY.verifiedOnly.toLowerCase().includes("concrete external linking url")) fail("verified-only counting policy drifted");
if (!BACKLINK_COMMAND_CENTER_POLICY.noPaidLinks || !BACKLINK_COMMAND_CENTER_POLICY.noReciprocalLinkScheme || !BACKLINK_COMMAND_CENTER_POLICY.noGuaranteedLinks) {
  fail("anti-link-scheme policy must remain enabled");
}

for (const token of [
  "loadEditorialOutreachDashboard",
  "VERIFIED_BACKLINK_LEDGER",
  "BACKLINK_OUTREACH_ACTIVITY",
  "verifiedLiveBacklinks",
  "referringDomains",
  "responseRate",
  "linkConversionRate",
  "byTopicCluster",
  "bySourceType",
]) requireText(files.server, token, `server reporting missing ${token}`);

for (const token of ["createServerFn", "getBacklinkCommandCenter", "loadBacklinkCommandCenter"]) {
  requireText(files.functions, token, `protected server-function bridge missing ${token}`);
}

for (const token of [
  'createFileRoute("/admin/backlinks")',
  "noindex,nofollow,noarchive",
]) requireText(files.route, token, `backlink admin route missing ${token}`);

for (const token of [
  'createLazyFileRoute("/admin/backlinks")',
  "texasdefined:editorial-outreach-admin-key",
  "0 verified backlinks recorded",
  "That is an intentional zero, not missing data.",
  "A pipeline row is not a backlink",
  "Verified backlink ledger",
  "By topic cluster",
  "By source type",
]) requireText(files.lazy, token, `backlink dashboard UI missing ${token}`);

if (files.lazy.includes('type="password"') || files.lazy.includes("Admin access key")) {
  fail("backlink dashboard must reuse Editorial Outreach session instead of creating a second credential form");
}
requireText(files.admin, 'to="/admin/backlinks"', "admin navigation does not link the backlink command center");

for (const forbidden of [
  "buy backlinks",
  "paid backlink",
  "guaranteed backlink",
  "reciprocal link exchange",
  "we have backlinks" ,
]) {
  if (Object.values(files).some((source) => source.toLowerCase().includes(forbidden))) fail(`prohibited backlink framing leaked: ${forbidden}`);
}

console.log(`Backlink command center validation passed: ${VERIFIED_BACKLINK_LEDGER.length} verified link records, ${BACKLINK_OUTREACH_ACTIVITY.length} manual outreach records, verified-URL accounting and relationship-first policy enforced.`);
