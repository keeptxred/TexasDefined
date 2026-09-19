export type PartnerSearchStartBreakdown = {
  key: string;
  label: string;
  starts30d: number;
  starts7d: number;
};

export type PartnerRecommendationEngagementBreakdown = {
  key: string;
  label: string;
  opens30d: number;
  opens7d: number;
};

export type PartnerReferralBreakdown = {
  key: string;
  label: string;
  clicks30d: number;
  clicks7d: number;
  impressions30d: number;
  impressions7d: number;
  measurementClicks: number;
  measurementImpressions: number;
  measurementCtr: number | null;
};

export type PartnerReferralPageBreakdown = {
  pagePath: string;
  clicks30d: number;
  clicks7d: number;
  impressions30d: number;
  impressions7d: number;
  measurementClicks: number;
  measurementImpressions: number;
  measurementCtr: number | null;
};

export type PartnerReferralDestinationBreakdown = {
  partner: string;
  destinationUrl: string;
  clicks30d: number;
  clicks7d: number;
  impressions30d: number;
  impressions7d: number;
  measurementClicks: number;
  measurementImpressions: number;
  measurementCtr: number | null;
};

export type PartnerReferralDailyPoint = {
  date: string;
  clicks: number;
  impressions: number | null;
};

export type PartnerReferralAnalyticsDashboard = {
  generatedAt: string;
  lastSyncedAt: string | null;
  lastPipelineSyncAt: string | null;
  impressionTrackingStartedAt: string;
  ctrMeasurementStartedAt: string;
  windowDays: number;
  totalClicks30d: number;
  totalClicks7d: number;
  totalImpressions30d: number;
  totalImpressions7d: number;
  totalSearchStarts30d: number;
  totalSearchStarts7d: number;
  totalRecommendationOpens30d: number;
  totalRecommendationOpens7d: number;
  clicksSinceImpressionTracking: number;
  impressionsSinceImpressionTracking: number;
  clickThroughRateSinceImpressionTracking: number | null;
  prior7dClicks: number;
  weekOverWeekPercent: number | null;
  partners: PartnerReferralBreakdown[];
  placements: PartnerReferralBreakdown[];
  pages: PartnerReferralPageBreakdown[];
  destinations: PartnerReferralDestinationBreakdown[];
  searchStartPlacements: PartnerSearchStartBreakdown[];
  searchStartPages: PartnerSearchStartBreakdown[];
  recommendationOpenPlacements: PartnerRecommendationEngagementBreakdown[];
  recommendationOpenPages: PartnerRecommendationEngagementBreakdown[];
  daily: PartnerReferralDailyPoint[];
};
