import { supabaseAdmin } from '@/integrations/supabase/client.server';
import type {
  SportsPartnerLead,
  SportsPartnerLeadDashboard,
  SportsPartnerLeadStatus,
} from '@/data/sports-partner-leads.types';

const ADMIN_KEY_NAME = 'sports-partner-leads';
const DASHBOARD_LIMIT = 200;

async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export async function assertSportsPartnerAccess(accessKey: string) {
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_admin_access_keys')
    .select('key_hash')
    .eq('key_name', ADMIN_KEY_NAME)
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw new Error('Sports partner admin access could not be verified.');
  if (!data?.key_hash) throw new Error('Sports partner admin access is not configured.');

  const candidateHash = await sha256Hex(accessKey);
  if (!constantTimeEqual(candidateHash, String(data.key_hash))) {
    throw new Error('Access denied.');
  }
}

function toLead(row: Record<string, unknown>): SportsPartnerLead {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    contactName: String(row.contact_name),
    email: String(row.email),
    company: String(row.company),
    website: typeof row.website === 'string' && row.website ? row.website : null,
    message: String(row.message),
    sourcePath: String(row.source_path),
    status: String(row.status) as SportsPartnerLeadStatus,
  };
}

export async function loadSportsPartnerLeadDashboard(accessKey: string): Promise<SportsPartnerLeadDashboard> {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_partner_inquiries')
    .select('id,created_at,contact_name,email,company,website,message,source_path,status')
    .eq('partnership_type', 'sports-travel')
    .order('created_at', { ascending: false })
    .limit(DASHBOARD_LIMIT + 1);

  if (error) throw new Error(`Sports partner leads could not be loaded: ${error.message}`);

  const rows = Array.isArray(data) ? data : [];
  const truncated = rows.length > DASHBOARD_LIMIT;
  const leads = rows.slice(0, DASHBOARD_LIMIT).map(toLead);
  const statusCounts: Record<SportsPartnerLeadStatus, number> = {
    new: 0,
    reviewing: 0,
    contacted: 0,
    closed: 0,
  };
  const sourceMap = new Map<string, number>();

  for (const lead of leads) {
    statusCounts[lead.status] = (statusCounts[lead.status] ?? 0) + 1;
    sourceMap.set(lead.sourcePath, (sourceMap.get(lead.sourcePath) ?? 0) + 1);
  }

  const sourceCounts = [...sourceMap.entries()]
    .map(([sourcePath, count]) => ({ sourcePath, count }))
    .sort((left, right) => right.count - left.count || left.sourcePath.localeCompare(right.sourcePath));

  return {
    generatedAt: new Date().toISOString(),
    limit: DASHBOARD_LIMIT,
    truncated,
    leads,
    statusCounts,
    sourceCounts,
  };
}

export async function updateSportsPartnerLeadStatus(
  accessKey: string,
  leadId: string,
  status: SportsPartnerLeadStatus,
) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_partner_inquiries')
    .update({ status })
    .eq('id', leadId)
    .eq('partnership_type', 'sports-travel')
    .select('id,status')
    .maybeSingle();

  if (error) throw new Error(`Sports partner lead status could not be updated: ${error.message}`);
  if (!data?.id) throw new Error('Sports partner lead was not found.');
  return { id: String(data.id), status: String(data.status) as SportsPartnerLeadStatus };
}
