import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

import type {
  FishingEditorialReviewDashboard,
  FishingEditorialSubmission,
  FishingEditorialSubmissionKind,
  FishingEditorialSubmissionStatus,
} from './editorial-review.types';

const REVIEW_LIMIT = 250;
const GUIDE_SOURCE_PATH = '/fishing/guides/submit';
const REPORT_SOURCE_PATH = '/fishing/reports/submit';
const REVIEW_SOURCE_PATHS = [GUIDE_SOURCE_PATH, REPORT_SOURCE_PATH] as const;

function kindForSourcePath(sourcePath: string): FishingEditorialSubmissionKind {
  if (sourcePath === GUIDE_SOURCE_PATH) return 'guide-listing';
  if (sourcePath === REPORT_SOURCE_PATH) return 'fishing-report';
  throw new Error('Unsupported fishing editorial submission source.');
}

function toSubmission(row: Record<string, unknown>): FishingEditorialSubmission {
  const sourcePath = String(row.source_path);
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    contactName: String(row.contact_name),
    email: String(row.email),
    company: String(row.company),
    website: typeof row.website === 'string' && row.website ? row.website : null,
    message: String(row.message),
    sourcePath,
    status: String(row.status) as FishingEditorialSubmissionStatus,
    kind: kindForSourcePath(sourcePath),
  };
}

export async function loadFishingEditorialReviewDashboard(accessKey: string): Promise<FishingEditorialReviewDashboard> {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_partner_inquiries')
    .select('id,created_at,contact_name,email,company,website,message,source_path,status')
    .in('source_path', [...REVIEW_SOURCE_PATHS])
    .order('created_at', { ascending: false })
    .limit(REVIEW_LIMIT + 1);

  if (error) throw new Error(`Fishing editorial submissions could not be loaded: ${error.message}`);
  const rows = Array.isArray(data) ? data : [];
  const submissions = rows.slice(0, REVIEW_LIMIT).map(toSubmission);
  const statusCounts: Record<FishingEditorialSubmissionStatus, number> = { new: 0, reviewing: 0, contacted: 0, closed: 0 };
  const kindCounts: Record<FishingEditorialSubmissionKind, number> = { 'guide-listing': 0, 'fishing-report': 0 };
  for (const submission of submissions) {
    statusCounts[submission.status] += 1;
    kindCounts[submission.kind] += 1;
  }
  return {
    generatedAt: new Date().toISOString(),
    limit: REVIEW_LIMIT,
    truncated: rows.length > REVIEW_LIMIT,
    submissions,
    statusCounts,
    kindCounts,
  };
}

export async function updateFishingEditorialSubmissionStatus(
  accessKey: string,
  submissionId: string,
  status: FishingEditorialSubmissionStatus,
) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;
  const { data, error } = await client
    .from('texasdefined_partner_inquiries')
    .update({ status })
    .eq('id', submissionId)
    .in('source_path', [...REVIEW_SOURCE_PATHS])
    .select('id,status,source_path')
    .maybeSingle();

  if (error) throw new Error(`Fishing editorial submission status could not be updated: ${error.message}`);
  if (!data?.id) throw new Error('Fishing editorial submission was not found.');
  return {
    id: String(data.id),
    status: String(data.status) as FishingEditorialSubmissionStatus,
    kind: kindForSourcePath(String(data.source_path)),
  };
}
