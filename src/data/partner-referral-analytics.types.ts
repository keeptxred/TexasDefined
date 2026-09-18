export type PartnerReferralBreakdown = {
  key: string;
  label: string;
  clicks30d: number;
  clicks7d: number;
  impressions30d: number;
  impressions7d: number;
};

export type PartnerReferralPageBreakdown = {
  pagePath: string;
  clicks30d: number;
  clicks7d: number;
  impressions30d: number;
  impressions7d: number;
};

export type PartnerReferralDestinationBreakdown = {
  partner: string;
  destinationUrl: string;
  clicks30d: number;
  clicks7d: number;
  impressions30d: number;
  impressions7d: number;
};

export type PartnerReferralDailyPoint = {
  date: string;
  clicks: number;
};

export type PartnerReferralAnalyticsDashboard = {
  generatedAt: string;
  lastSyncedAt: string | null;
  lastPipelineSyncAt: string | null;
  impressionTrackingStartedAt: string;
  windowDays: number;
  totalClicks30d: number;
  totalClicks7d: number;
  totalImpressions30d: number;
  totalImpressions7d: number;
  clicksSinceImpressionTracking: number;
  impressionsSinceImpressionTracking: number;
  clickThroughRateSinceImpressionTracking: number | null;
  prior7dClicks: number;
  weekOverWeekPercent: number | null;
  partners: PartnerReferralBreakdown[];
  placements: PartnerReferralBreakdown[];
  pages: PartnerReferralPageBreakdown[];
  destinations: PartnerReferralDestinationBreakdown[];
  daily: PartnerReferralDailyPoint[];
};
