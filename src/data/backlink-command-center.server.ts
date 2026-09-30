import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { assertSportsPartnerAccess } from "@/data/sports-partner-leads.server";
import {
  BACKLINK_GOALS,
  BACKLINK_STAGES,
  type BacklinkCommandCenterDashboard,
  type BacklinkDuplicateGroup,
  type BacklinkMonthlyReport,
  type BacklinkRecord,
  type BacklinkRecordInput,
  type BacklinkStage,
} from "@/data/backlink-command-center";

const DASHBOARD_LIMIT = 500;

function clean(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeReferringDomain(value: string) {
  const input = value.trim().toLowerCase();
  if (!input) throw new Error("Referring domain is required.");
  const url = input.includes("://") ? new URL(input) : new URL(`https://${input}`);
  return url.hostname.replace(/^www\./, "").replace(/\.$/, "");
}

function canonicalTexasDefinedUrl(value: string) {
  const url = new URL(value.trim());
  if (url.protocol !== "https:" || url.hostname !== "texasdefined.com") {
    throw new Error("Destination URL must use the canonical https://texasdefined.com domain.");
  }
  url.hash = "";
  return url.toString().replace(/\/$/, url.pathname === "/" ? "/" : "");
}

function httpsUrlOrNull(value: string | null | undefined) {
  const trimmed = clean(value);
  if (!trimmed) return null;
  const url = new URL(trimmed);
  if (url.protocol !== "https:") throw new Error("Linking URL must use HTTPS.");
  return url.toString();
}

function validateWonState(input: BacklinkRecordInput) {
  if (input.stage === "link-won" && input.backlinkStatus !== "won") {
    throw new Error("Link Won stage requires backlink status Won.");
  }
  if (input.backlinkStatus === "won" && !clean(input.linkingUrl)) {
    throw new Error("A won backlink requires the exact linking URL.");
  }
}

function toRow(input: BacklinkRecordInput) {
  const normalized: BacklinkRecordInput = {
    ...input,
    referringDomain: normalizeReferringDomain(input.referringDomain),
    linkingUrl: httpsUrlOrNull(input.linkingUrl),
    destinationUrl: canonicalTexasDefinedUrl(input.destinationUrl),
    topicCluster: input.topicCluster.trim(),
    contactOrganization: input.contactOrganization.trim(),
    contactName: clean(input.contactName),
    contactEmail: clean(input.contactEmail)?.toLowerCase() ?? null,
    outreachReason: input.outreachReason.trim(),
    authorityRelevanceNotes: input.authorityRelevanceNotes.trim(),
    nextAction: input.nextAction.trim(),
    campaign: input.campaign.trim(),
    anchorText: clean(input.anchorText),
  };
  validateWonState(normalized);
  return {
    referring_domain: normalized.referringDomain,
    linking_url: normalized.linkingUrl,
    destination_url: normalized.destinationUrl,
    topic_cluster: normalized.topicCluster,
    contact_organization: normalized.contactOrganization,
    contact_name: normalized.contactName,
    contact_email: normalized.contactEmail,
    source_type: normalized.sourceType,
    outreach_reason: normalized.outreachReason,
    outreach_date: normalized.outreachDate,
    last_follow_up_date: normalized.lastFollowUpDate,
    response_status: normalized.responseStatus,
    backlink_status: normalized.backlinkStatus,
    link_attribute: normalized.linkAttribute,
    anchor_text: normalized.anchorText,
    authority_relevance_notes: normalized.authorityRelevanceNotes,
    next_action: normalized.nextAction,
    campaign: normalized.campaign,
    stage: normalized.stage,
    date_first_discovered: normalized.dateFirstDiscovered,
    date_last_verified: normalized.dateLastVerified,
    updated_at: new Date().toISOString(),
  };
}

function toRecord(row: Record<string, unknown>): BacklinkRecord {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    referringDomain: String(row.referring_domain),
    linkingUrl: typeof row.linking_url === "string" && row.linking_url ? row.linking_url : null,
    destinationUrl: String(row.destination_url),
    topicCluster: String(row.topic_cluster),
    contactOrganization: String(row.contact_organization),
    contactName: typeof row.contact_name === "string" && row.contact_name ? row.contact_name : null,
    contactEmail: typeof row.contact_email === "string" && row.contact_email ? row.contact_email : null,
    sourceType: String(row.source_type) as BacklinkRecord["sourceType"],
    outreachReason: String(row.outreach_reason),
    outreachDate: typeof row.outreach_date === "string" && row.outreach_date ? row.outreach_date : null,
    lastFollowUpDate: typeof row.last_follow_up_date === "string" && row.last_follow_up_date ? row.last_follow_up_date : null,
    responseStatus: String(row.response_status) as BacklinkRecord["responseStatus"],
    backlinkStatus: String(row.backlink_status) as BacklinkRecord["backlinkStatus"],
    linkAttribute: String(row.link_attribute) as BacklinkRecord["linkAttribute"],
    anchorText: typeof row.anchor_text === "string" && row.anchor_text ? row.anchor_text : null,
    authorityRelevanceNotes: String(row.authority_relevance_notes ?? ""),
    nextAction: String(row.next_action ?? ""),
    campaign: String(row.campaign),
    stage: String(row.stage) as BacklinkStage,
    dateFirstDiscovered: typeof row.date_first_discovered === "string" && row.date_first_discovered ? row.date_first_discovered : null,
    dateLastVerified: typeof row.date_last_verified === "string" && row.date_last_verified ? row.date_last_verified : null,
  };
}

function percentage(numerator: number, denominator: number) {
  if (!denominator) return 0;
  return Math.round((numerator / denominator) * 1000) / 10;
}

function lifecycleMetrics(records: BacklinkRecord[]) {
  const totalProspects = records.length;
  const contactedRecords = records.filter((record) => Boolean(record.outreachDate));
  const replyRecords = records.filter((record) =>
    record.responseStatus === "replied" ||
    record.responseStatus === "declined" ||
    ["replied", "link-won", "declined"].includes(record.stage)
  );
  const wonRecords = records.filter((record) => record.stage === "link-won" && record.backlinkStatus === "won");
  const uniqueWonDomains = new Set(wonRecords.map((record) => record.referringDomain)).size;
  return {
    totalProspects,
    contacted: contactedRecords.length,
    replies: replyRecords.length,
    linksWon: wonRecords.length,
    uniqueWonDomains,
    activeCampaigns: new Set(records.map((record) => record.campaign)).size,
    prospectToContactRate: percentage(contactedRecords.length, totalProspects),
    contactToReplyRate: percentage(replyRecords.length, contactedRecords.length),
    contactToLinkRate: percentage(wonRecords.length, contactedRecords.length),
    replyToLinkRate: percentage(wonRecords.length, replyRecords.length),
  };
}

function duplicateGroups(records: BacklinkRecord[]): BacklinkDuplicateGroup[] {
  const grouped = new Map<string, BacklinkRecord[]>();
  for (const record of records) {
    const bucket = grouped.get(record.referringDomain) ?? [];
    bucket.push(record);
    grouped.set(record.referringDomain, bucket);
  }
  return [...grouped.entries()]
    .map(([referringDomain, items]) => ({
      referringDomain,
      campaigns: [...new Set(items.map((item) => item.campaign))].sort(),
      recordIds: items.map((item) => item.id),
      destinationUrls: [...new Set(items.map((item) => item.destinationUrl))].sort(),
    }))
    .filter((group) => group.campaigns.length > 1)
    .sort((left, right) => right.campaigns.length - left.campaigns.length || left.referringDomain.localeCompare(right.referringDomain));
}

function monthKey(value: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return `${parsed.getUTCFullYear()}-${String(parsed.getUTCMonth() + 1).padStart(2, "0")}`;
}

function buildMonthlyReports(records: BacklinkRecord[]): BacklinkMonthlyReport[] {
  const now = new Date();
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - index, 1));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
  });
  return months.map((month) => {
    const prospectsAdded = records.filter((record) => monthKey(record.createdAt) === month).length;
    const contactedRecords = records.filter((record) => monthKey(record.outreachDate) === month);
    const replyRecords = records.filter((record) =>
      monthKey(record.updatedAt) === month &&
      (record.responseStatus === "replied" || record.responseStatus === "declined" || ["replied", "link-won", "declined"].includes(record.stage))
    );
    const wonRecords = records.filter((record) =>
      monthKey(record.dateFirstDiscovered) === month && record.stage === "link-won" && record.backlinkStatus === "won"
    );
    const declined = records.filter((record) => monthKey(record.updatedAt) === month && record.stage === "declined").length;
    const noResponse = records.filter((record) => monthKey(record.updatedAt) === month && record.stage === "no-response").length;
    return {
      month,
      prospectsAdded,
      contacted: contactedRecords.length,
      replies: replyRecords.length,
      linksWon: wonRecords.length,
      declined,
      noResponse,
      uniqueWonDomains: new Set(wonRecords.map((record) => record.referringDomain)).size,
      prospectToContactRate: percentage(contactedRecords.length, prospectsAdded),
      contactToReplyRate: percentage(replyRecords.length, contactedRecords.length),
      contactToLinkRate: percentage(wonRecords.length, contactedRecords.length),
      replyToLinkRate: percentage(wonRecords.length, replyRecords.length),
    };
  });
}

export async function loadBacklinkCommandCenter(accessKey: string): Promise<BacklinkCommandCenterDashboard> {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from("texasdefined_backlink_prospects")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(DASHBOARD_LIMIT);

  if (error) throw new Error(`Backlink command center could not be loaded: ${error.message}`);
  const records = (Array.isArray(data) ? data : []).map(toRecord);
  const stageCounts = Object.fromEntries(BACKLINK_STAGES.map((stage) => [stage, 0])) as Record<BacklinkStage, number>;
  for (const record of records) stageCounts[record.stage] += 1;
  const baseMetrics = lifecycleMetrics(records);
  const duplicates = duplicateGroups(records);
  return {
    generatedAt: new Date().toISOString(),
    records,
    stageCounts,
    metrics: {
      ...baseMetrics,
      duplicateDomainsAcrossCampaigns: duplicates.length,
    },
    goals: BACKLINK_GOALS.map((target) => ({
      target,
      current: baseMetrics.uniqueWonDomains,
      remaining: Math.max(0, target - baseMetrics.uniqueWonDomains),
      percent: Math.min(100, percentage(baseMetrics.uniqueWonDomains, target)),
    })),
    duplicateGroups: duplicates,
    monthlyReports: buildMonthlyReports(records),
  };
}

export async function createBacklinkRecord(accessKey: string, input: BacklinkRecordInput) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const row = toRow(input);
  const { data: existing, error: duplicateError } = await client
    .from("texasdefined_backlink_prospects")
    .select("id,campaign,referring_domain,destination_url")
    .eq("referring_domain", row.referring_domain)
    .eq("destination_url", row.destination_url)
    .maybeSingle();
  if (duplicateError) throw new Error(`Duplicate check failed: ${duplicateError.message}`);
  if (existing?.id) {
    throw new Error(`This domain + destination already exists in campaign "${existing.campaign}". Update the existing prospect instead of duplicating it.`);
  }

  const { data, error } = await client
    .from("texasdefined_backlink_prospects")
    .insert(row)
    .select("*")
    .single();
  if (error) throw new Error(`Backlink prospect could not be created: ${error.message}`);
  return toRecord(data);
}

export async function updateBacklinkRecord(accessKey: string, id: string, input: BacklinkRecordInput) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const row = toRow(input);
  const { data, error } = await client
    .from("texasdefined_backlink_prospects")
    .update(row)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) {
    if (String(error.message).includes("texasdefined_backlink_prospects_domain_destination_unique_idx")) {
      throw new Error("Another record already tracks this referring domain + TexasDefined destination.");
    }
    throw new Error(`Backlink prospect could not be updated: ${error.message}`);
  }
  if (!data?.id) throw new Error("Backlink prospect was not found.");
  return toRecord(data);
}
