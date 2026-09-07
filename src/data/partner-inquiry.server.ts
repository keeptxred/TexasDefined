import { supabaseAdmin } from '@/integrations/supabase/client.server';

export type PartnerInquiryInsert = {
  contact_name: string;
  email: string;
  company: string;
  website: string | null;
  partnership_type: 'insurance' | 'mortgage' | 'real-estate' | 'moving' | 'travel' | 'sports-travel' | 'brand-retail' | 'sponsorship' | 'other';
  message: string;
  source_path: string;
};

type InsertResult = { error: { message: string } | null };
type PartnerInquiryAdminClient = {
  from: (table: string) => {
    insert: (value: PartnerInquiryInsert) => PromiseLike<InsertResult>;
  };
};

export async function savePartnerInquiry(value: PartnerInquiryInsert) {
  const client = supabaseAdmin as unknown as PartnerInquiryAdminClient;
  const { error } = await client.from('texasdefined_partner_inquiries').insert(value);
  if (error) throw new Error(`Partner inquiry could not be saved: ${error.message}`);
}
