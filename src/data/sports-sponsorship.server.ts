import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import type {
  PublicSportsSponsorPlacement,
  SportsSponsorAdminDashboard,
  SportsSponsorMetricEvent,
  SportsSponsorPlacementRecord,
  SportsSponsorPlacementStatus,
  SportsSponsorRecord,
  SportsSponsorStatus,
} from '@/data/sports-sponsorship.types';

/**
 * Commercial launch is intentionally held until TexasDefined has enough real
 * sports traffic to support credible sponsor outreach. While this is true:
 * - prospects can still be researched/stored internally;
 * - sponsors cannot be approved;
 * - placements cannot be approved;
 * - no sponsored placement can render publicly.
 *
 * Changing this flag is a deliberate launch decision, not an operational
 * shortcut. Traffic evidence should be reviewed before it is changed.
 */
export const SPORTS_SPONSOR_OUTREACH_HOLD = true;
export const SPORTS_SPONSOR_OUTREACH_HOLD_REASON =
  'Sports sponsorship outreach is on hold until TexasDefined has sufficient real sports-page traffic to support credible sponsor conversations.';

function assertSponsorLaunchReady() {
  if (SPORTS_SPONSOR_OUTREACH_HOLD) throw new Error(SPORTS_SPONSOR_OUTREACH_HOLD_REASON);
}

function assertHttpsUrl(value: string, label: string) {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:') throw new Error(`${label} must use https.`);
  return parsed.toString();
}

function toSponsor(row: Record<string, unknown>): SportsSponsorRecord {
  return {
    id: String(row.id),
    companyName: String(row.company_name),
    website: String(row.website),
    contactEmail: typeof row.contact_email === 'string' && row.contact_email ? row.contact_email : null,
    sourceInquiryId: typeof row.source_inquiry_id === 'string' && row.source_inquiry_id ? row.source_inquiry_id : null,
    status: String(row.status) as SportsSponsorStatus,
    notes: typeof row.notes === 'string' && row.notes ? row.notes : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function sponsorNameFromJoin(value: unknown) {
  if (Array.isArray(value)) return String((value[0] as Record<string, unknown> | undefined)?.company_name ?? 'Sponsor');
  if (value && typeof value === 'object') return String((value as Record<string, unknown>).company_name ?? 'Sponsor');
  return 'Sponsor';
}

function toPublicPlacement(row: Record<string, unknown>): PublicSportsSponsorPlacement {
  return {
    id: String(row.id),
    sponsorName: sponsorNameFromJoin(row.texasdefined_sports_sponsors),
    surfacePath: String(row.surface_path),
    headline: String(row.headline),
    body: String(row.body),
    ctaLabel: String(row.cta_label),
    destinationUrl: String(row.destination_url),
  };
}

export async function loadActiveSportsSponsorPlacement(surfacePath: string): Promise<PublicSportsSponsorPlacement | null> {
  if (SPORTS_SPONSOR_OUTREACH_HOLD) return null;

  const client = supabaseAdmin as any;
  const now = new Date().toISOString();
  const { data, error } = await client
    .from('texasdefined_sports_sponsor_placements')
    .select('id,surface_path,headline,body,cta_label,destination_url,approved_at,texasdefined_sports_sponsors!inner(company_name,status)')
    .eq('surface_path', surfacePath)
    .eq('status', 'approved')
    .not('approved_at', 'is', null)
    .eq('texasdefined_sports_sponsors.status', 'approved')
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gt.${now}`)
    .order('approved_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`Sports sponsor placement could not be loaded: ${error.message}`);
  return data ? toPublicPlacement(data as Record<string, unknown>) : null;
}

export async function recordSportsSponsorMetric(placementId: string, event: SportsSponsorMetricEvent) {
  const client = supabaseAdmin as any;
  const { data, error } = await client.rpc('record_texasdefined_sports_sponsor_metric', {
    p_placement_id: placementId,
    p_event: event,
  });
  if (error) throw new Error(`Sports sponsor metric could not be recorded: ${error.message}`);
  return Boolean(data);
}

export async function loadSportsSponsorAdminDashboard(accessKey: string): Promise<SportsSponsorAdminDashboard> {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - 29);
  const sinceDate = since.toISOString().slice(0, 10);

  const [sponsorsResult, placementsResult, metricsResult] = await Promise.all([
    client.from('texasdefined_sports_sponsors').select('*').order('created_at', { ascending: false }),
    client.from('texasdefined_sports_sponsor_placements')
      .select('*,texasdefined_sports_sponsors!inner(company_name)')
      .order('created_at', { ascending: false }),
    client.from('texasdefined_sports_sponsor_daily_metrics')
      .select('placement_id,impressions,clicks')
      .gte('metric_date', sinceDate),
  ]);

  if (sponsorsResult.error) throw new Error(`Sports sponsors could not be loaded: ${sponsorsResult.error.message}`);
  if (placementsResult.error) throw new Error(`Sports sponsor placements could not be loaded: ${placementsResult.error.message}`);
  if (metricsResult.error) throw new Error(`Sports sponsor metrics could not be loaded: ${metricsResult.error.message}`);

  const metrics = new Map<string, { impressions: number; clicks: number }>();
  for (const row of Array.isArray(metricsResult.data) ? metricsResult.data : []) {
    const id = String(row.placement_id);
    const current = metrics.get(id) ?? { impressions: 0, clicks: 0 };
    current.impressions += Number(row.impressions ?? 0);
    current.clicks += Number(row.clicks ?? 0);
    metrics.set(id, current);
  }

  const placements: SportsSponsorPlacementRecord[] = (Array.isArray(placementsResult.data) ? placementsResult.data : []).map((row: Record<string, unknown>) => {
    const totals = metrics.get(String(row.id)) ?? { impressions: 0, clicks: 0 };
    return {
      ...toPublicPlacement(row),
      sponsorId: String(row.sponsor_id),
      status: String(row.status) as SportsSponsorPlacementStatus,
      startsAt: typeof row.starts_at === 'string' ? row.starts_at : null,
      endsAt: typeof row.ends_at === 'string' ? row.ends_at : null,
      approvedAt: typeof row.approved_at === 'string' ? row.approved_at : null,
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
      impressions30d: totals.impressions,
      clicks30d: totals.clicks,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    sponsors: (Array.isArray(sponsorsResult.data) ? sponsorsResult.data : []).map((row: Record<string, unknown>) => toSponsor(row)),
    placements,
  };
}

export async function createSportsSponsor(accessKey: string, input: {
  companyName: string;
  website: string;
  contactEmail?: string | null;
  sourceInquiryId?: string | null;
  notes?: string | null;
}) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const now = new Date().toISOString();
  const { data, error } = await client.from('texasdefined_sports_sponsors').insert({
    company_name: input.companyName.trim(),
    website: assertHttpsUrl(input.website, 'Sponsor website'),
    contact_email: input.contactEmail?.trim().toLowerCase() || null,
    source_inquiry_id: input.sourceInquiryId || null,
    status: 'prospect',
    notes: input.notes?.trim() || null,
    updated_at: now,
  }).select('*').single();
  if (error) throw new Error(`Sports sponsor prospect could not be created: ${error.message}`);
  return toSponsor(data as Record<string, unknown>);
}

export async function setSportsSponsorStatus(accessKey: string, sponsorId: string, status: SportsSponsorStatus) {
  await assertSportsPartnerAccess(accessKey);
  if (status === 'approved') assertSponsorLaunchReady();

  const client = supabaseAdmin as any;
  const { data, error } = await client.from('texasdefined_sports_sponsors')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', sponsorId)
    .select('*')
    .maybeSingle();
  if (error) throw new Error(`Sports sponsor status could not be updated: ${error.message}`);
  if (!data?.id) throw new Error('Sports sponsor was not found.');

  if (status !== 'approved') {
    await client.from('texasdefined_sports_sponsor_placements')
      .update({ status: 'paused', updated_at: new Date().toISOString() })
      .eq('sponsor_id', sponsorId)
      .eq('status', 'approved');
  }
  return toSponsor(data as Record<string, unknown>);
}

export async function createSportsSponsorPlacement(accessKey: string, input: {
  sponsorId: string;
  surfacePath: string;
  headline: string;
  body: string;
  ctaLabel: string;
  destinationUrl: string;
  startsAt?: string | null;
  endsAt?: string | null;
}) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const now = new Date().toISOString();
  const { data, error } = await client.from('texasdefined_sports_sponsor_placements').insert({
    sponsor_id: input.sponsorId,
    surface_path: input.surfacePath,
    headline: input.headline.trim(),
    body: input.body.trim(),
    cta_label: input.ctaLabel.trim(),
    destination_url: assertHttpsUrl(input.destinationUrl, 'Sponsor destination URL'),
    status: 'draft',
    starts_at: input.startsAt || null,
    ends_at: input.endsAt || null,
    approved_at: null,
    updated_at: now,
  }).select('*,texasdefined_sports_sponsors!inner(company_name)').single();
  if (error) throw new Error(`Sports sponsor placement draft could not be created: ${error.message}`);
  return data as Record<string, unknown>;
}

export async function reviseSportsSponsorPlacement(accessKey: string, placementId: string, input: {
  surfacePath: string;
  headline: string;
  body: string;
  ctaLabel: string;
  destinationUrl: string;
  startsAt?: string | null;
  endsAt?: string | null;
}) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client.from('texasdefined_sports_sponsor_placements').update({
    surface_path: input.surfacePath,
    headline: input.headline.trim(),
    body: input.body.trim(),
    cta_label: input.ctaLabel.trim(),
    destination_url: assertHttpsUrl(input.destinationUrl, 'Sponsor destination URL'),
    starts_at: input.startsAt || null,
    ends_at: input.endsAt || null,
    status: 'draft',
    approved_at: null,
    updated_at: new Date().toISOString(),
  }).eq('id', placementId).select('id,status').maybeSingle();
  if (error) throw new Error(`Sports sponsor placement could not be revised: ${error.message}`);
  if (!data?.id) throw new Error('Sports sponsor placement was not found.');
  return { id: String(data.id), status: String(data.status) as SportsSponsorPlacementStatus };
}

export async function setSportsSponsorPlacementStatus(
  accessKey: string,
  placementId: string,
  status: SportsSponsorPlacementStatus,
) {
  await assertSportsPartnerAccess(accessKey);
  if (status === 'approved') assertSponsorLaunchReady();

  const client = supabaseAdmin as any;
  const { data: existing, error: existingError } = await client
    .from('texasdefined_sports_sponsor_placements')
    .select('id,sponsor_id,approved_at,texasdefined_sports_sponsors!inner(status)')
    .eq('id', placementId)
    .maybeSingle();
  if (existingError) throw new Error(`Sports sponsor placement could not be checked: ${existingError.message}`);
  if (!existing?.id) throw new Error('Sports sponsor placement was not found.');

  const sponsorJoin = existing.texasdefined_sports_sponsors;
  const sponsorStatus = Array.isArray(sponsorJoin) ? sponsorJoin[0]?.status : sponsorJoin?.status;
  if (status === 'approved' && sponsorStatus !== 'approved') {
    throw new Error('Approve the sponsor before approving a placement.');
  }

  const update: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (status === 'approved') update.approved_at = existing.approved_at || new Date().toISOString();
  if (status === 'draft') update.approved_at = null;

  const { data, error } = await client.from('texasdefined_sports_sponsor_placements')
    .update(update)
    .eq('id', placementId)
    .select('id,status,approved_at')
    .maybeSingle();
  if (error) {
    if (String(error.message).includes('texasdefined_sports_sponsor_one_approved_surface_idx')) {
      throw new Error('Another placement is already approved for that sports surface. Pause or end it first.');
    }
    throw new Error(`Sports sponsor placement status could not be updated: ${error.message}`);
  }
  if (!data?.id) throw new Error('Sports sponsor placement was not found.');
  return { id: String(data.id), status: String(data.status) as SportsSponsorPlacementStatus };
}
