import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import { SPORTS_SPONSOR_OUTREACH_HOLD } from '@/data/sports-sponsorship.server';
import type { SportsTrafficReadiness } from '@/data/sports-traffic.types';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

export const SPORTS_TRAFFIC_WINDOW_DAYS = 30;
export const SPORTS_TRAFFIC_MONTHLY_PAGEVIEW_TARGET = 3000;
export const SPORTS_TRAFFIC_VENUE_PAGEVIEW_TARGET = 300;
export const SPORTS_TRAFFIC_MIN_VENUES_AT_TARGET = 3;

const surfacePattern = /^\/sports-venue\/[a-z0-9-]+$/;

export async function recordSportsVenuePageview(surfacePath: string) {
  if (!surfacePattern.test(surfacePath)) return false;
  const client = supabaseAdmin as any;
  const { data, error } = await client.rpc('record_texasdefined_sports_venue_pageview', {
    p_surface_path: surfacePath,
  });
  if (error) throw new Error(`Sports venue traffic could not be recorded: ${error.message}`);
  return Boolean(data);
}

export async function loadSportsTrafficReadiness(accessKey: string): Promise<SportsTrafficReadiness> {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - (SPORTS_TRAFFIC_WINDOW_DAYS - 1));
  const sinceDate = since.toISOString().slice(0, 10);

  const { data, error } = await client
    .from('texasdefined_sports_venue_daily_traffic')
    .select('surface_path,pageviews')
    .gte('metric_date', sinceDate);
  if (error) throw new Error(`Sports venue traffic could not be loaded: ${error.message}`);

  const totals = new Map<string, number>();
  for (const row of Array.isArray(data) ? data : []) {
    const surfacePath = String(row.surface_path ?? '');
    if (!surfacePattern.test(surfacePath)) continue;
    totals.set(surfacePath, (totals.get(surfacePath) ?? 0) + Number(row.pageviews ?? 0));
  }

  const topVenues = [...totals.entries()]
    .map(([surfacePath, pageviews30d]) => ({ surfacePath, pageviews30d }))
    .sort((left, right) => right.pageviews30d - left.pageviews30d || left.surfacePath.localeCompare(right.surfacePath));
  const totalVenuePageviews30d = topVenues.reduce((sum, row) => sum + row.pageviews30d, 0);
  const venuesAtTarget = topVenues.filter((row) => row.pageviews30d >= SPORTS_TRAFFIC_VENUE_PAGEVIEW_TARGET).length;
  const trafficReady = totalVenuePageviews30d >= SPORTS_TRAFFIC_MONTHLY_PAGEVIEW_TARGET
    && venuesAtTarget >= SPORTS_TRAFFIC_MIN_VENUES_AT_TARGET;

  return {
    generatedAt: new Date().toISOString(),
    windowDays: SPORTS_TRAFFIC_WINDOW_DAYS,
    totalVenuePageviews30d,
    monthlyPageviewTarget: SPORTS_TRAFFIC_MONTHLY_PAGEVIEW_TARGET,
    venuePageviewTarget: SPORTS_TRAFFIC_VENUE_PAGEVIEW_TARGET,
    minimumVenuesAtTarget: SPORTS_TRAFFIC_MIN_VENUES_AT_TARGET,
    venuesAtTarget,
    trafficReady,
    outreachHoldActive: SPORTS_SPONSOR_OUTREACH_HOLD,
    topVenues: topVenues.slice(0, 20),
  };
}
