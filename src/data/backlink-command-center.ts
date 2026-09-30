export const BACKLINK_STAGES = [
  "prospect",
  "researched",
  "ready-to-contact",
  "contacted",
  "follow-up",
  "replied",
  "link-won",
  "declined",
  "no-response",
  "disqualified",
] as const;

export type BacklinkStage = (typeof BACKLINK_STAGES)[number];

export const BACKLINK_STAGE_LABELS: Record<BacklinkStage, string> = {
  prospect: "Prospect",
  researched: "Researched",
  "ready-to-contact": "Ready to Contact",
  contacted: "Contacted",
  "follow-up": "Follow-Up",
  replied: "Replied",
  "link-won": "Link Won",
  declined: "Declined",
  "no-response": "No Response",
  disqualified: "Disqualified",
};

export const BACKLINK_STATUS_VALUES = ["unknown", "not-linked", "pending", "won", "removed"] as const;
export type BacklinkStatus = (typeof BACKLINK_STATUS_VALUES)[number];

export const BACKLINK_RESPONSE_VALUES = ["none", "replied", "declined", "no-response"] as const;
export type BacklinkResponseStatus = (typeof BACKLINK_RESPONSE_VALUES)[number];

export const BACKLINK_LINK_ATTRIBUTES = ["follow", "nofollow", "unknown"] as const;
export type BacklinkLinkAttribute = (typeof BACKLINK_LINK_ATTRIBUTES)[number];

export const BACKLINK_SOURCE_TYPES = [
  "government",
  "tourism",
  "museum-cultural",
  "education",
  "media-news",
  "association-nonprofit",
  "event-organizer",
  "business",
  "community-resource",
  "editorial-source",
  "other",
] as const;
export type BacklinkSourceType = (typeof BACKLINK_SOURCE_TYPES)[number];

export interface BacklinkRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  referringDomain: string;
  linkingUrl: string | null;
  destinationUrl: string;
  topicCluster: string;
  contactOrganization: string;
  contactName: string | null;
  contactEmail: string | null;
  sourceType: BacklinkSourceType;
  outreachReason: string;
  outreachDate: string | null;
  lastFollowUpDate: string | null;
  responseStatus: BacklinkResponseStatus;
  backlinkStatus: BacklinkStatus;
  linkAttribute: BacklinkLinkAttribute;
  anchorText: string | null;
  authorityRelevanceNotes: string;
  nextAction: string;
  campaign: string;
  stage: BacklinkStage;
  dateFirstDiscovered: string | null;
  dateLastVerified: string | null;
}

export interface BacklinkDuplicateGroup {
  referringDomain: string;
  campaigns: string[];
  recordIds: string[];
  destinationUrls: string[];
}

export interface BacklinkMonthlyReport {
  month: string;
  prospectsAdded: number;
  contacted: number;
  replies: number;
  linksWon: number;
  declined: number;
  noResponse: number;
  uniqueWonDomains: number;
  prospectToContactRate: number;
  contactToReplyRate: number;
  contactToLinkRate: number;
  replyToLinkRate: number;
}

export interface BacklinkCommandCenterDashboard {
  generatedAt: string;
  records: BacklinkRecord[];
  stageCounts: Record<BacklinkStage, number>;
  metrics: {
    totalProspects: number;
    contacted: number;
    replies: number;
    linksWon: number;
    uniqueWonDomains: number;
    activeCampaigns: number;
    duplicateDomainsAcrossCampaigns: number;
    prospectToContactRate: number;
    contactToReplyRate: number;
    contactToLinkRate: number;
    replyToLinkRate: number;
  };
  goals: Array<{ target: 10 | 25 | 50 | 100; current: number; remaining: number; percent: number }>;
  duplicateGroups: BacklinkDuplicateGroup[];
  monthlyReports: BacklinkMonthlyReport[];
}

export const BACKLINK_POLICY = {
  purpose: "Earn editorially legitimate references to genuinely useful TexasDefined resources while preserving editorial independence and search-quality compliance.",
  legitimateBacklinkDefinition: [
    "The linking page is publicly reachable, indexable or otherwise a real human-facing resource, and the link can be independently verified.",
    "The referring site and linking page are topically, geographically or institutionally relevant to the TexasDefined destination page.",
    "The link exists because the publisher independently chose to cite, recommend, credit or resource-link the TexasDefined page.",
    "The link is not purchased for ranking credit, contractually required, automatically generated at scale or contingent on a reciprocal link.",
    "A nofollow link may still count as a legitimate relationship win, but follow/nofollow is tracked separately from whether the backlink is legitimate.",
  ],
  rejectedSchemes: [
    "Paid links or paid posts whose purpose is to pass ranking credit.",
    "Private blog networks, expired-domain link networks or sites created mainly to sell or exchange links.",
    "Low-quality directories, bookmark sites, automated profile links and mass-submission services.",
    "Excessive reciprocal-link arrangements or partner pages created mainly for cross-linking.",
    "Automated comment, forum, widget, footer or template link building.",
    "Guaranteed-link packages, bulk guest-post marketplaces and outreach vendors promising fixed quantities of ranking links.",
  ],
  outreachRule: "Lead with accuracy, useful resources, data, media access, corrections, event updates or genuine editorial usefulness. A backlink may be invited only as an optional reference when the TexasDefined resource is independently useful; no link is required.",
  privacyRule: "Contact names, email addresses, notes and outreach history belong only in the protected database and server-rendered admin workflow. Do not commit private contact data to Git.",
  duplicateRule: "Normalize domains before saving, flag the same domain appearing in multiple campaigns, and review an existing domain relationship before starting duplicate outreach.",
  verificationRule: "A link remains Won only while the linking URL can be verified and still points to the recorded TexasDefined destination. Record the first-discovered and last-verified dates.",
} as const;

export const BACKLINK_GOALS = [10, 25, 50, 100] as const;
