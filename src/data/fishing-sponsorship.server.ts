import { FISHING_SPONSOR_INVENTORY } from '@/data/fishing-sponsorship-inventory';
import type {
  FishingSponsorAdminDashboard,
  FishingSponsorMetricEvent,
  FishingSponsorPlacementRecord,
  FishingSponsorPlacementStatus,
  FishingSponsorRecord,
  FishingSponsorStatus,
  PublicFishingSponsorPlacement,
} from '@/data/fishing-sponsorship.types';
import type { FishingPlacementKind } from '@/data/fishing/types';
import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

/**
 * Batch 10 intentionally designs monetization before selling it. Prospect and
 * draft operations are live, but public delivery/approval remains held until a
 * deliberate commercial launch decision is made from real fishing traffic.
 */
export const FISHING_SPONSOR_OUTREACH_HOLD = true;
export const FISHING_SPONSOR_OUTREACH_HOLD_REASON =
  'Fishing sponsorship delivery is on hold until TexasDefined has enough real fishing traffic and approved partners to support credible commercial placements.';
export const FISHING_SPONSOR_EDITORIAL_POLICY =
  'Paid placement never changes planner ordering, fishery ratings, access facts, guide verification or editorial recommendations.';

function assertLaunchReady() {
  if (FISHING_SPONSOR_OUTREACH_HOLD) throw new Error(FISHING_SPONSOR_OUTREACH_HOLD_REASON);
}

function assertHttpsUrl(value: string, label: string) {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:') throw new Error(`${label} must use https.`);
  return parsed.toString();
}

function sponsorNameFromJoin(value: unknown) {
  if (Array.isArray(value)) return String((value[0] as Record<string, unknown> | undefined)?.company_name ?? 'Sponsor');
  if (value && typeof value === 'object') return String((value as Record<string, unknown>).company_name ?? 'Sponsor');
  return 'Sponsor';
}

function toSponsor(row: Record<string, unknown>): FishingSponsorRecord {
  return {
    id: String(row.id),
    companyName: String(row.company_name),
    website: String(row.website),
    contactEmail: typeof row.contact_email === 'string' && row.contact_email ? row.contact_email : null,
    sourceInquiryId: typeof row.source_inquiry_id === 'string' && row.source_inquiry_id ? row.source_inquiry_id : null,
    status: String(row.status) as FishingSponsorStatus,
    notes: typeof row.notes === 'string' && row.notes ? row.notes : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function toPublicPlacement(row: Record<string, unknown>): PublicFishingSponsorPlacement {
  return {
    id: String(row.id),
    sponsorName: sponsorNameFromJoin(row.texasdefined_fishing_sponsors),
    kind: String(row.placement_kind) as FishingPlacementKind,
    surfacePath: String(row.surface_path),
    headline: String(row.headline),
    body: String(row.body),
    ctaLabel: String(row.cta_label),
    destinationUrl: String(row.destination_url),
    priority: Number(row.priority ?? 0),
    exclusive: Boolean(row.exclusive),
  };
}

export async function loadActiveFishingSponsorPlacements(surfacePath: string): Promise<PublicFishingSponsorPlacement[]> {
  if (FISHING_SPONSOR_OUTREACH_HOLD) return [];
  const client = supabaseAdmin as any;
  const now = new Date().toISOString();
  const { data, error } = await client
    .from('texasdefined_fishing_sponsor_placements')
    .select('id,surface_path,placement_kind,headline,body,cta_label,destination_url,priority,exclusive,approved_at,texasdefined_fishing_sponsors!inner(company_name,status)')
    .eq('surface_path', surfacePath)
    .eq('status', 'approved')
    .not('approved_at', 'is', null)
    .eq('texasdefined_fishing_sponsors.status', 'approved')
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gt.${now}`)
    .order('exclusive', { ascending: false })
    .order('priority', { ascending: false })
    .order('approved_at', { ascending: false })
    .limit(3);

  if (error) throw new Error(`Fishing sponsor placements could not be loaded: ${error.message}`);
  const placements = (Array.isArray(data) ? data : []).map((row: Record<string, unknown>) => toPublicPlacement(row));
  const exclusive = placements.find((placement) => placement.exclusive);
  return exclusive ? [exclusive] : placements.slice(0, 3);
}

export async function recordFishingSponsorMetric(placementId: string, event: FishingSponsorMetricEvent) {
  const client = supabaseAdmin as any;
  const { data, error } = await client.rpc('record_texasdefined_fishing_sponsor_metric', {
    p_placement_id: placementId,
    p_event: event,
  });
  if (error) throw new Error(`Fishing sponsor metric could not be recorded: ${error.message}`);
  return Boolean(data);
}

export async function loadFishingSponsorAdminDashboard(accessKey: string): Promise<FishingSponsorAdminDashboard> {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - 29);
  const sinceDate = since.toISOString().slice(0, 10);
  const [sponsorsResult, placementsResult, metricsResult] = await Promise.all([
    client.from('texasdefined_fishing_sponsors').select('*').order('created_at', { ascending: false }),
    client.from('texasdefined_fishing_sponsor_placements').select('*,texasdefined_fishing_sponsors!inner(company_name)').order('created_at', { ascending: false }),
    client.from('texasdefined_fishing_sponsor_daily_metrics').select('placement_id,impressions,clicks').gte('metric_date', sinceDate),
  ]);
  if (sponsorsResult.error) throw new Error(`Fishing sponsors could not be loaded: ${sponsorsResult.error.message}`);
  if (placementsResult.error) throw new Error(`Fishing sponsor placements could not be loaded: ${placementsResult.error.message}`);
  if (metricsResult.error) throw new Error(`Fishing sponsor metrics could not be loaded: ${metricsResult.error.message}`);

  const metrics = new Map<string, { impressions: number; clicks: number }>();
  for (const row of Array.isArray(metricsResult.data) ? metricsResult.data : []) {
    const id = String(row.placement_id);
    const totals = metrics.get(id) ?? { impressions: 0, clicks: 0 };
    totals.impressions += Number(row.impressions ?? 0);
    totals.clicks += Number(row.clicks ?? 0);
    metrics.set(id, totals);
  }

  const placements: FishingSponsorPlacementRecord[] = (Array.isArray(placementsResult.data) ? placementsResult.data : []).map((row: Record<string, unknown>) => {
    const totals = metrics.get(String(row.id)) ?? { impressions: 0, clicks: 0 };
    return {
      ...toPublicPlacement(row),
      sponsorId: String(row.sponsor_id),
      status: String(row.status) as FishingSponsorPlacementStatus,
      monthlyPriceCents: typeof row.monthly_price_cents === 'number' ? row.monthly_price_cents : null,
      startsAt: typeof row.starts_at === 'string' ? row.starts_at : null,
      endsAt: typeof row.ends_at === 'string' ? row.ends_at : null,
      renewalAt: typeof row.renewal_at === 'string' ? row.renewal_at : null,
      approvedAt: typeof row.approved_at === 'string' ? row.approved_at : null,
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
      impressions30d: totals.impressions,
      clicks30d: totals.clicks,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    outreachHold: FISHING_SPONSOR_OUTREACH_HOLD,
    outreachHoldReason: FISHING_SPONSOR_OUTREACH_HOLD_REASON,
    sponsors: (Array.isArray(sponsorsResult.data) ? sponsorsResult.data : []).map((row: Record<string, unknown>) => toSponsor(row)),
    placements,
    inventory: FISHING_SPONSOR_INVENTORY,
  };
}

export async function createFishingSponsor(accessKey: string, input: { companyName: string; website: string; contactEmail?: string | null; sourceInquiryId?: string | null; notes?: string | null }) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client.from('texasdefined_fishing_sponsors').insert({
    company_name: input.companyName.trim(),
    website: assertHttpsUrl(input.website, 'Sponsor website'),
    contact_email: input.contactEmail?.trim().toLowerCase() || null,
    source_inquiry_id: input.sourceInquiryId || null,
    status: 'prospect',
    notes: input.notes?.trim() || null,
    updated_at: new Date().toISOString(),
  }).select('*').single();
  if (error) throw new Error(`Fishing sponsor prospect could not be created: ${error.message}`);
  return toSponsor(data as Record<string, unknown>);
}

export async function setFishingSponsorStatus(accessKey: string, sponsorId: string, status: FishingSponsorStatus) {
  await assertSportsPartnerAccess(accessKey);
  if (status === 'approved') assertLaunchReady();
  const client = supabaseAdmin as any;
  const { data, error } = await client.from('texasdefined_fishing_sponsors').update({ status, updated_at: new Date().toISOString() }).eq('id', sponsorId).select('*').maybeSingle();
  if (error) throw new Error(`Fishing sponsor status could not be updated: ${error.message}`);
  if (!data?.id) throw new Error('Fishing sponsor was not found.');
  if (status !== 'approved') await client.from('texasdefined_fishing_sponsor_placements').update({ status: 'paused', updated_at: new Date().toISOString() }).eq('sponsor_id', sponsorId).eq('status', 'approved');
  return toSponsor(data as Record<string, unknown>);
}

export async function createFishingSponsorPlacement(accessKey: string, input: {
  sponsorId: string; surfacePath: string; kind: FishingPlacementKind; headline: string; body: string; ctaLabel: string; destinationUrl: string;
  priority: number; exclusive: boolean; monthlyPriceCents?: number | null; startsAt?: string | null; endsAt?: string | null; renewalAt?: string | null;
}) {
  await assertSportsPartnerAccess(accessKey);
  const inventory = FISHING_SPONSOR_INVENTORY.find((item) => item.kind === input.kind);
  if (!inventory) throw new Error('Unknown fishing placement inventory kind.');
  if (input.exclusive !== inventory.exclusive) throw new Error('Placement exclusivity must match the governed inventory definition.');
  const client = supabaseAdmin as any;
  const { data, error } = await client.from('texasdefined_fishing_sponsor_placements').insert({
    sponsor_id: input.sponsorId,
    surface_path: input.surfacePath,
    placement_kind: input.kind,
    headline: input.headline.trim(),
    body: input.body.trim(),
    cta_label: input.ctaLabel.trim(),
    destination_url: assertHttpsUrl(input.destinationUrl, 'Sponsor destination URL'),
    status: 'draft',
    priority: input.priority,
    exclusive: input.exclusive,
    monthly_price_cents: input.monthlyPriceCents ?? inventory.introMonthlyCents,
    starts_at: input.startsAt || null,
    ends_at: input.endsAt || null,
    renewal_at: input.renewalAt || null,
    approved_at: null,
    updated_at: new Date().toISOString(),
  }).select('id,status').single();
  if (error) throw new Error(`Fishing sponsor placement draft could not be created: ${error.message}`);
  return { id: String(data.id), status: String(data.status) as FishingSponsorPlacementStatus };
}

export async function setFishingSponsorPlacementStatus(accessKey: string, placementId: string, status: FishingSponsorPlacementStatus) {
  await assertSportsPartnerAccess(accessKey);
  if (status === 'approved') assertLaunchReady();
  const client = supabaseAdmin as any;
  const { data: existing, error: existingError } = await client.from('texasdefined_fishing_sponsor_placements')
    .select('id,sponsor_id,surface_path,exclusive,approved_at,texasdefined_fishing_sponsors!inner(status)')
    .eq('id', placementId).maybeSingle();
  if (existingError) throw new Error(`Fishing sponsor placement could not be checked: ${existingError.message}`);
  if (!existing?.id) throw new Error('Fishing sponsor placement was not found.');
  const sponsorJoin = existing.texasdefined_fishing_sponsors;
  const sponsorStatus = Array.isArray(sponsorJoin) ? sponsorJoin[0]?.status : sponsorJoin?.status;
  if (status === 'approved' && sponsorStatus !== 'approved') throw new Error('Approve the sponsor before approving a placement.');

  if (status === 'approved') {
    const { data: conflicts, error: conflictError } = await client.from('texasdefined_fishing_sponsor_placements')
      .select('id,exclusive').eq('surface_path', existing.surface_path).eq('status', 'approved').neq('id', placementId);
    if (conflictError) throw new Error(`Fishing sponsorship exclusivity could not be checked: ${conflictError.message}`);
    const rows = Array.isArray(conflicts) ? conflicts : [];
    if (Boolean(existing.exclusive) && rows.length) throw new Error('Exclusive inventory requires the surface to have no other approved placement.');
    if (!Boolean(existing.exclusive) && rows.some((row: Record<string, unknown>) => Boolean(row.exclusive))) throw new Error('An exclusive placement already owns that fishing surface.');
    if (!Boolean(existing.exclusive) && rows.length >= 2) throw new Error('This fishing surface already has the maximum three concurrent non-exclusive placements.');
  }

  const update: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
  if (status === 'approved') update.approved_at = existing.approved_at || new Date().toISOString();
  if (status === 'draft') update.approved_at = null;
  const { data, error } = await client.from('texasdefined_fishing_sponsor_placements').update(update).eq('id', placementId).select('id,status').maybeSingle();
  if (error) throw new Error(`Fishing sponsor placement status could not be updated: ${error.message}`);
  if (!data?.id) throw new Error('Fishing sponsor placement was not found.');
  return { id: String(data.id), status: String(data.status) as FishingSponsorPlacementStatus };
}
