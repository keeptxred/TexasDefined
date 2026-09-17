import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import type {
  AdvertiserLead,
  AdvertiserLeadDashboard,
  AdvertiserLeadStatus,
} from '@/data/advertiser-leads.types';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

const DASHBOARD_LIMIT = 300;

const statuses: AdvertiserLeadStatus[] = [
  'new', 'reviewing', 'contacted', 'approved', 'agreement_sent', 'agreement_signed',
  'awaiting_payment', 'paid', 'assets_needed', 'scheduled', 'live', 'completed', 'declined', 'closed',
];

function toLead(row: Record<string, unknown>): AdvertiserLead {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    contactName: String(row.contact_name),
    email: String(row.email),
    phone: typeof row.phone === 'string' && row.phone ? row.phone : null,
    company: String(row.company),
    website: typeof row.website === 'string' && row.website ? row.website : null,
    partnershipType: String(row.partnership_type),
    targetTexasLocations: typeof row.target_texas_locations === 'string' && row.target_texas_locations ? row.target_texas_locations : null,
    requestedTier: typeof row.requested_tier === 'string' ? row.requested_tier as AdvertiserLead['requestedTier'] : null,
    billingCycle: typeof row.billing_cycle === 'string' ? row.billing_cycle as AdvertiserLead['billingCycle'] : null,
    desiredStartDate: typeof row.desired_start_date === 'string' ? row.desired_start_date : null,
    objectives: typeof row.objectives === 'string' && row.objectives ? row.objectives : String(row.message || ''),
    notes: typeof row.notes === 'string' && row.notes ? row.notes : null,
    sourcePath: String(row.source_path),
    status: String(row.status) as AdvertiserLeadStatus,
    advertiserAgreementId: typeof row.advertiser_agreement_id === 'string' ? row.advertiser_agreement_id : null,
  };
}

export async function loadAdvertiserLeadDashboard(accessKey: string): Promise<AdvertiserLeadDashboard> {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_partner_inquiries')
    .select('id,created_at,contact_name,email,phone,company,website,partnership_type,target_texas_locations,requested_tier,billing_cycle,desired_start_date,objectives,notes,message,source_path,status,advertiser_agreement_id')
    .order('created_at', { ascending: false })
    .limit(DASHBOARD_LIMIT + 1);
  if (error) throw new Error(`Advertiser inquiries could not be loaded: ${error.message}`);

  const rows = Array.isArray(data) ? data : [];
  const leads = rows.slice(0, DASHBOARD_LIMIT).map(toLead);
  const statusCounts = Object.fromEntries(statuses.map((status) => [status, 0])) as Record<AdvertiserLeadStatus, number>;
  const sourceMap = new Map<string, number>();
  for (const lead of leads) {
    statusCounts[lead.status] = (statusCounts[lead.status] ?? 0) + 1;
    sourceMap.set(lead.sourcePath, (sourceMap.get(lead.sourcePath) ?? 0) + 1);
  }

  return {
    generatedAt: new Date().toISOString(),
    limit: DASHBOARD_LIMIT,
    truncated: rows.length > DASHBOARD_LIMIT,
    leads,
    statusCounts,
    sourceCounts: [...sourceMap.entries()]
      .map(([sourcePath, count]) => ({ sourcePath, count }))
      .sort((left, right) => right.count - left.count || left.sourcePath.localeCompare(right.sourcePath)),
  };
}

export async function updateAdvertiserLeadStatus(accessKey: string, leadId: string, status: AdvertiserLeadStatus) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_partner_inquiries')
    .update({ status })
    .eq('id', leadId)
    .select('id,status')
    .maybeSingle();
  if (error) throw new Error(`Advertiser lead status could not be updated: ${error.message}`);
  if (!data?.id) throw new Error('Advertiser inquiry was not found.');
  return { id: String(data.id), status: String(data.status) as AdvertiserLeadStatus };
}
