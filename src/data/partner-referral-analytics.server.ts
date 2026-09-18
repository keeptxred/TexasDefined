import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import type {
  PartnerReferralAnalyticsDashboard,
  PartnerReferralBreakdown,
  PartnerReferralDestinationBreakdown,
  PartnerReferralPageBreakdown,
} from '@/data/partner-referral-analytics.types';

const WINDOW_DAYS = 30;
const QUERY_DAYS = 60;
const TOP_LIMIT = 25;
const HEARTBEAT_PARTNER = '__pipeline__';
const HEARTBEAT_PLACEMENT = 'sync-heartbeat';
const IMPRESSION_TRACKING_STARTED_AT = '2026-09-19';

type ReferralRow = {
  metric_date: string;
  partner: string;
  placement: string;
  page_path: string;
  destination_url: string;
  click_count: number | string;
  impression_count: number | string;
  synced_at: string;
};

function utcDateOffset(daysAgo: number) {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

function addBreakdown(
  map: Map<string, PartnerReferralBreakdown>,
  key: string,
  label: string,
  clicks: number,
  impressions: number,
  in7d: boolean,
  inMeasurementWindow: boolean,
) {
  const row = map.get(key) ?? {
    key,
    label,
    clicks30d: 0,
    clicks7d: 0,
    impressions30d: 0,
    impressions7d: 0,
    measurementClicks: 0,
    measurementImpressions: 0,
    measurementCtr: null,
  };
  row.clicks30d += clicks;
  row.impressions30d += impressions;
  if (in7d) {
    row.clicks7d += clicks;
    row.impressions7d += impressions;
  }
  if (inMeasurementWindow) {
    row.measurementClicks += clicks;
    row.measurementImpressions += impressions;
  }
  row.measurementCtr = clickThroughRate(row.measurementClicks, row.measurementImpressions);
  map.set(key, row);
}

function percentChange(current: number, prior: number) {
  if (prior <= 0) return current > 0 ? null : 0;
  return Math.round(((current - prior) / prior) * 1000) / 10;
}

function clickThroughRate(clicks: number, impressions: number) {
  if (impressions <= 0) return null;
  return Math.round((clicks / impressions) * 10_000) / 100;
}

function sortBreakdowns(rows: PartnerReferralBreakdown[]) {
  return rows.sort((a, b) => b.clicks30d - a.clicks30d || b.clicks7d - a.clicks7d || a.label.localeCompare(b.label));
}

export async function loadPartnerReferralAnalyticsDashboard(accessKey: string): Promise<PartnerReferralAnalyticsDashboard> {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const queryStart = utcDateOffset(QUERY_DAYS - 1);
  const { data, error } = await client
    .from('texasdefined_partner_referral_daily')
    .select('metric_date,partner,placement,page_path,destination_url,click_count,impression_count,synced_at')
    .gte('metric_date', queryStart)
    .order('metric_date', { ascending: true });

  if (error) throw new Error(`Partner referral analytics could not be loaded: ${error.message}`);
  const rows = (Array.isArray(data) ? data : []) as ReferralRow[];

  const sevenDayStart = utcDateOffset(6);
  const thirtyDayStart = utcDateOffset(29);
  const priorSevenStart = utcDateOffset(13);
  const priorSevenEnd = utcDateOffset(7);
  const partnerMap = new Map<string, PartnerReferralBreakdown>();
  const placementMap = new Map<string, PartnerReferralBreakdown>();
  const pageMap = new Map<string, PartnerReferralPageBreakdown>();
  const destinationMap = new Map<string, PartnerReferralDestinationBreakdown>();
  const dailyClicksMap = new Map<string, number>();
  const dailyImpressionsMap = new Map<string, number>();
  let totalClicks30d = 0;
  let totalClicks7d = 0;
  let totalImpressions30d = 0;
  let totalImpressions7d = 0;
  let clicksSinceImpressionTracking = 0;
  let impressionsSinceImpressionTracking = 0;
  let prior7dClicks = 0;
  let lastSyncedAt: string | null = null;
  let lastPipelineSyncAt: string | null = null;

  for (const row of rows) {
    if (row.partner === HEARTBEAT_PARTNER && row.placement === HEARTBEAT_PLACEMENT) {
      if (lastPipelineSyncAt === null || String(row.synced_at) > lastPipelineSyncAt) lastPipelineSyncAt = String(row.synced_at);
      continue;
    }

    const clicks = Math.max(0, Number(row.click_count) || 0);
    const impressions = Math.max(0, Number(row.impression_count) || 0);
    const metricDate = String(row.metric_date).slice(0, 10);
    const in30d = metricDate >= thirtyDayStart;
    const in7d = metricDate >= sevenDayStart;
    const inMeasurementWindow = metricDate >= IMPRESSION_TRACKING_STARTED_AT;
    const inPrior7d = metricDate >= priorSevenStart && metricDate <= priorSevenEnd;

    if (lastSyncedAt === null || String(row.synced_at) > lastSyncedAt) lastSyncedAt = String(row.synced_at);
    if (inPrior7d) prior7dClicks += clicks;
    if (!in30d) continue;

    totalClicks30d += clicks;
    totalImpressions30d += impressions;
    if (in7d) {
      totalClicks7d += clicks;
      totalImpressions7d += impressions;
    }
    if (inMeasurementWindow) {
      clicksSinceImpressionTracking += clicks;
      impressionsSinceImpressionTracking += impressions;
    }
    dailyClicksMap.set(metricDate, (dailyClicksMap.get(metricDate) ?? 0) + clicks);
    if (inMeasurementWindow) {
      dailyImpressionsMap.set(metricDate, (dailyImpressionsMap.get(metricDate) ?? 0) + impressions);
    }
    addBreakdown(partnerMap, row.partner, row.partner, clicks, impressions, in7d, inMeasurementWindow);
    addBreakdown(placementMap, row.placement, row.placement, clicks, impressions, in7d, inMeasurementWindow);

    const page = pageMap.get(row.page_path) ?? {
      pagePath: row.page_path,
      clicks30d: 0,
      clicks7d: 0,
      impressions30d: 0,
      impressions7d: 0,
      measurementClicks: 0,
      measurementImpressions: 0,
      measurementCtr: null,
    };
    page.clicks30d += clicks;
    page.impressions30d += impressions;
    if (in7d) {
      page.clicks7d += clicks;
      page.impressions7d += impressions;
    }
    if (inMeasurementWindow) {
      page.measurementClicks += clicks;
      page.measurementImpressions += impressions;
    }
    page.measurementCtr = clickThroughRate(page.measurementClicks, page.measurementImpressions);
    pageMap.set(row.page_path, page);

    const destinationKey = `${row.partner}\u0000${row.destination_url}`;
    const destination = destinationMap.get(destinationKey) ?? {
      partner: row.partner,
      destinationUrl: row.destination_url,
      clicks30d: 0,
      clicks7d: 0,
      impressions30d: 0,
      impressions7d: 0,
      measurementClicks: 0,
      measurementImpressions: 0,
      measurementCtr: null,
    };
    destination.clicks30d += clicks;
    destination.impressions30d += impressions;
    if (in7d) {
      destination.clicks7d += clicks;
      destination.impressions7d += impressions;
    }
    if (inMeasurementWindow) {
      destination.measurementClicks += clicks;
      destination.measurementImpressions += impressions;
    }
    destination.measurementCtr = clickThroughRate(destination.measurementClicks, destination.measurementImpressions);
    destinationMap.set(destinationKey, destination);
  }

  const daily = Array.from({ length: WINDOW_DAYS }, (_, index) => {
    const date = utcDateOffset(WINDOW_DAYS - 1 - index);
    return {
      date,
      clicks: dailyClicksMap.get(date) ?? 0,
      impressions: date >= IMPRESSION_TRACKING_STARTED_AT ? dailyImpressionsMap.get(date) ?? 0 : null,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    lastSyncedAt,
    lastPipelineSyncAt,
    impressionTrackingStartedAt: IMPRESSION_TRACKING_STARTED_AT,
    windowDays: WINDOW_DAYS,
    totalClicks30d,
    totalClicks7d,
    totalImpressions30d,
    totalImpressions7d,
    clicksSinceImpressionTracking,
    impressionsSinceImpressionTracking,
    clickThroughRateSinceImpressionTracking: clickThroughRate(clicksSinceImpressionTracking, impressionsSinceImpressionTracking),
    prior7dClicks,
    weekOverWeekPercent: percentChange(totalClicks7d, prior7dClicks),
    partners: sortBreakdowns([...partnerMap.values()]),
    placements: sortBreakdowns([...placementMap.values()]),
    pages: [...pageMap.values()]
      .sort((a, b) => b.clicks30d - a.clicks30d || b.clicks7d - a.clicks7d || a.pagePath.localeCompare(b.pagePath))
      .slice(0, TOP_LIMIT),
    destinations: [...destinationMap.values()]
      .sort((a, b) => b.clicks30d - a.clicks30d || b.clicks7d - a.clicks7d || a.destinationUrl.localeCompare(b.destinationUrl))
      .slice(0, TOP_LIMIT),
    daily,
  };
}
