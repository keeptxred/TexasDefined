import { loadEditorialOutreachDashboard } from "./editorial-outreach.server";
import {
  BACKLINK_COMMAND_CENTER_POLICY,
  BACKLINK_OUTREACH_ACTIVITY,
  VERIFIED_BACKLINK_LEDGER,
  type BacklinkLedgerEntry,
  type BacklinkOutreachActivity,
  type BacklinkOutreachStage,
  type BacklinkSourceType,
} from "./backlink-command-center";

export interface BacklinkPipelineRow {
  id: string;
  organization: string;
  destinationPath: string;
  topicCluster: string;
  sourceType: BacklinkSourceType;
  contactName?: string;
  contactEmail?: string;
  contactUrl?: string;
  stage: BacklinkOutreachStage;
  score?: number;
  nextAction: string;
  followUpAt?: string;
  relationshipOpportunity?: string;
}

export interface BacklinkCommandCenterDashboard {
  generatedAt: string;
  policy: typeof BACKLINK_COMMAND_CENTER_POLICY;
  backlinks: BacklinkLedgerEntry[];
  manualActivity: BacklinkOutreachActivity[];
  pipeline: BacklinkPipelineRow[];
  summary: {
    verifiedLiveBacklinks: number;
    referringDomains: number;
    lostBacklinks: number;
    needsReview: number;
    pipelineTargets: number;
    readyToContact: number;
    sent: number;
    replies: number;
    activeRelationships: number;
    wonLinks: number;
    responseRate: number | null;
    linkConversionRate: number | null;
  };
  byTopicCluster: Array<{ key: string; liveLinks: number; pipelineTargets: number }>;
  bySourceType: Array<{ key: string; liveLinks: number; pipelineTargets: number }>;
}

function normalizeSourceType(value: string): BacklinkSourceType {
  const normalized = value.toLowerCase();
  if (normalized.includes("tourism") || normalized.includes("visitor") || normalized.includes("destination marketing")) return "tourism";
  if (normalized.includes("government") || normalized.includes("agency") || normalized.includes("national park") || normalized.includes("state park")) return "government";
  if (normalized.includes("museum") || normalized.includes("aquarium")) return "museum";
  if (normalized.includes("nonprofit")) return "nonprofit";
  if (normalized.includes("university") || normalized.includes("college")) return "university";
  if (normalized.includes("media") || normalized.includes("news")) return "media";
  if (normalized.includes("event") || normalized.includes("festival") || normalized.includes("fair")) return "event";
  if (normalized.includes("marina") || normalized.includes("guide")) return "marina-guide";
  if (normalized.includes("chamber")) return "chamber";
  if (normalized.includes("restaurant") || normalized.includes("business")) return "local-business";
  return "other";
}

function topicFromPath(path: string) {
  if (path.startsWith("/event/") || path === "/texas-state-fair") return "events";
  if (path.startsWith("/fishing/")) return "fishing";
  if (path.includes("painted-churches")) return "history / painted churches";
  if (path.startsWith("/destination/")) return "destinations";
  if (path.startsWith("/article/")) return "editorial authority";
  if (path.startsWith("/county/")) return "counties";
  return "site authority";
}

function stageFromEditorialStatus(status: string): BacklinkOutreachStage {
  if (status === "existing-relationship") return "relationship";
  if (status === "ready") return "ready";
  return "research";
}

function aggregate(keys: string[], live: BacklinkLedgerEntry[], pipeline: BacklinkPipelineRow[], selector: (item: BacklinkLedgerEntry | BacklinkPipelineRow) => string) {
  return keys.map((key) => ({
    key,
    liveLinks: live.filter((item) => selector(item) === key && item.status === "verified-live").length,
    pipelineTargets: pipeline.filter((item) => selector(item) === key).length,
  })).sort((left, right) => right.liveLinks - left.liveLinks || right.pipelineTargets - left.pipelineTargets || left.key.localeCompare(right.key));
}

export async function loadBacklinkCommandCenter(accessKey: string): Promise<BacklinkCommandCenterDashboard> {
  const outreach = await loadEditorialOutreachDashboard(accessKey);

  const verifiedPipeline: BacklinkPipelineRow[] = outreach.verifiedTargets.map((target) => ({
    id: `verified:${target.id}`,
    organization: target.organization,
    destinationPath: target.pagePath,
    topicCluster: topicFromPath(target.pagePath),
    sourceType: normalizeSourceType(target.organizationType),
    contactEmail: target.contactEmail,
    contactUrl: target.contactUrl,
    stage: stageFromEditorialStatus(target.status),
    score: target.score,
    nextAction: target.status === "existing-relationship"
      ? "Maintain the relationship and record any concrete external linking URL if one appears."
      : target.status === "ready"
        ? "Send relationship-first editorial outreach; backlink/reference language remains optional and secondary."
        : "Research the correct communications or media contact before outreach.",
    relationshipOpportunity: target.relationshipOpportunity,
  }));

  const automaticPipeline: BacklinkPipelineRow[] = [
    ...outreach.automaticIntake,
    ...outreach.eventIntake,
    ...outreach.authoritySourceIntake,
  ].map((item) => ({
    id: item.id,
    organization: item.organization,
    destinationPath: item.pagePath,
    topicCluster: topicFromPath(item.pagePath),
    sourceType: normalizeSourceType(item.category),
    contactUrl: item.officialUrl,
    stage: "research",
    score: item.score,
    nextAction: item.status === "source-research"
      ? "Confirm this is a useful long-term subject-matter relationship before researching a contact."
      : "Research the correct communications/media contact and verify the page is citation-worthy before outreach.",
  }));

  const manualByTarget = new Map(BACKLINK_OUTREACH_ACTIVITY.map((activity) => [activity.targetId, activity]));
  const derivedPipeline = [...verifiedPipeline, ...automaticPipeline].map((row) => {
    const manual = manualByTarget.get(row.id.replace(/^verified:/, "")) ?? manualByTarget.get(row.id);
    if (!manual) return row;
    return {
      ...row,
      stage: manual.stage,
      contactName: manual.contactName,
      contactEmail: manual.contactEmail ?? row.contactEmail,
      contactUrl: manual.contactUrl ?? row.contactUrl,
      nextAction: manual.nextAction,
      followUpAt: manual.followUpAt,
    };
  });

  const manualOnly = BACKLINK_OUTREACH_ACTIVITY.filter((activity) => !derivedPipeline.some((row) => row.id === activity.targetId || row.id === `verified:${activity.targetId}`));
  const pipeline: BacklinkPipelineRow[] = [
    ...derivedPipeline,
    ...manualOnly.map((activity) => ({
      id: `manual:${activity.id}`,
      organization: activity.organization,
      destinationPath: activity.destinationPath,
      topicCluster: activity.topicCluster,
      sourceType: activity.sourceType,
      contactName: activity.contactName,
      contactEmail: activity.contactEmail,
      contactUrl: activity.contactUrl,
      stage: activity.stage,
      nextAction: activity.nextAction,
      followUpAt: activity.followUpAt,
    })),
  ].sort((left, right) => {
    const rank: Record<BacklinkOutreachStage, number> = { "won-link": 0, replied: 1, sent: 2, ready: 3, relationship: 4, research: 5, closed: 6 };
    return rank[left.stage] - rank[right.stage] || (right.score ?? 0) - (left.score ?? 0) || left.organization.localeCompare(right.organization);
  });

  const backlinks = [...VERIFIED_BACKLINK_LEDGER].sort((left, right) => right.lastChecked.localeCompare(left.lastChecked) || left.referringDomain.localeCompare(right.referringDomain));
  const live = backlinks.filter((item) => item.status === "verified-live");
  const referringDomains = new Set(live.map((item) => item.referringDomain.toLowerCase())).size;
  const sent = pipeline.filter((item) => ["sent", "replied", "won-link"].includes(item.stage)).length;
  const replies = pipeline.filter((item) => ["replied", "won-link"].includes(item.stage)).length;
  const wonLinks = pipeline.filter((item) => item.stage === "won-link").length;

  const topicKeys = [...new Set([...backlinks.map((item) => item.topicCluster), ...pipeline.map((item) => item.topicCluster)])];
  const sourceKeys = [...new Set([...backlinks.map((item) => item.sourceType), ...pipeline.map((item) => item.sourceType)])];

  return {
    generatedAt: new Date().toISOString(),
    policy: BACKLINK_COMMAND_CENTER_POLICY,
    backlinks,
    manualActivity: [...BACKLINK_OUTREACH_ACTIVITY],
    pipeline,
    summary: {
      verifiedLiveBacklinks: live.length,
      referringDomains,
      lostBacklinks: backlinks.filter((item) => item.status === "lost").length,
      needsReview: backlinks.filter((item) => item.status === "needs-review").length,
      pipelineTargets: pipeline.length,
      readyToContact: pipeline.filter((item) => item.stage === "ready").length,
      sent,
      replies,
      activeRelationships: pipeline.filter((item) => item.stage === "relationship").length,
      wonLinks,
      responseRate: sent > 0 ? replies / sent : null,
      linkConversionRate: sent > 0 ? wonLinks / sent : null,
    },
    byTopicCluster: aggregate(topicKeys, backlinks, pipeline, (item) => item.topicCluster),
    bySourceType: aggregate(sourceKeys, backlinks, pipeline, (item) => item.sourceType),
  };
}
