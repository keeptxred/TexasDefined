export type BacklinkStatus = "verified-live" | "needs-review" | "lost";
export type BacklinkLinkType = "editorial" | "resource" | "citation" | "directory" | "partner" | "other";
export type BacklinkSourceType = "tourism" | "government" | "museum" | "nonprofit" | "university" | "media" | "event" | "marina-guide" | "chamber" | "local-business" | "other";
export type BacklinkOutreachStage = "research" | "ready" | "sent" | "replied" | "relationship" | "won-link" | "closed";

export interface BacklinkLedgerEntry {
  id: string;
  referringDomain: string;
  linkingUrl: string;
  destinationPath: string;
  topicCluster: string;
  organization?: string;
  sourceType: BacklinkSourceType;
  linkType: BacklinkLinkType;
  anchorContext: string;
  status: BacklinkStatus;
  firstSeen: string;
  lastChecked: string;
  sourceEvidence: string;
  notes?: string;
}

export interface BacklinkOutreachActivity {
  id: string;
  targetId: string;
  organization: string;
  destinationPath: string;
  topicCluster: string;
  sourceType: BacklinkSourceType;
  contactName?: string;
  contactEmail?: string;
  contactUrl?: string;
  stage: BacklinkOutreachStage;
  sentAt?: string;
  lastContactAt?: string;
  followUpAt?: string;
  nextAction: string;
  notes?: string;
}

export const BACKLINK_COMMAND_CENTER_POLICY = {
  verifiedOnly: "A backlink counts only when a concrete external linking URL is recorded. Do not infer a backlink from a relationship, email reply, press mention, citation request or referring organization name alone.",
  relationshipFirst: "Accuracy, official updates, source access and approved imagery come before any optional reference request.",
  noPaidLinks: true,
  noReciprocalLinkScheme: true,
  noGuaranteedLinks: true,
  noFabricatedContacts: true,
  lostLinkPolicy: "Keep lost links in the ledger with status lost so referring-domain and acquisition reporting does not rewrite history.",
  destinationRule: "Every acquired link must map to one canonical TexasDefined destination path and one topic/content cluster.",
} as const;

/**
 * Verified external links to TexasDefined.
 *
 * This ledger intentionally starts empty. A record is added only after a real external
 * linking URL is observed and checked. Relationships and outreach activity belong in
 * BACKLINK_OUTREACH_ACTIVITY, not here.
 */
export const VERIFIED_BACKLINK_LEDGER: BacklinkLedgerEntry[] = [];

/**
 * Manual outreach history that cannot be derived from the editorial target registry.
 * Keep this factual and date-stamped. The command center also derives research/ready
 * pipeline rows from the existing editorial-outreach system automatically.
 */
export const BACKLINK_OUTREACH_ACTIVITY: BacklinkOutreachActivity[] = [];

export const BACKLINK_LEDGER_REQUIRED_FIELDS = [
  "referringDomain",
  "linkingUrl",
  "destinationPath",
  "topicCluster",
  "organization",
  "sourceType",
  "linkType",
  "anchorContext",
  "status",
  "firstSeen",
  "lastChecked",
  "sourceEvidence",
] as const;
