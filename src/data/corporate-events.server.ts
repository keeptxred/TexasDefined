import { supabaseAdmin } from '@/integrations/supabase/client.server';

export type GroupEventRequest = {
  contact_name: string;
  email: string;
  company: string;
  phone: string | null;
  city: string;
  group_size: number;
  event_category: string;
  event_date: string | null;
  budget_per_person: number | null;
  provider_slugs: string[];
  notes: string | null;
  consent_contact: true;
  source_path: '/corporate-events';
};

export async function saveGroupEventRequest(payload: GroupEventRequest) {
  // Service-role operations stay server-only. No public RLS policies exist.
  const admin = supabaseAdmin as any;
  const recent = await admin
    .from('texasdefined_group_event_requests')
    .select('id')
    .eq('email', payload.email)
    .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
    .limit(3);
  if (recent.error) throw new Error('Request verification is unavailable.');
  if ((recent.data ?? []).length >= 3) throw new Error('Too many requests from this email. Please try again later.');

  const { error } = await admin.from('texasdefined_group_event_requests').insert(payload);
  if (error) throw new Error('Could not save the request. Please try again.');
}
