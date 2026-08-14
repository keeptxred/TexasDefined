import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';

export async function promoteSportsPartnerLead(accessKey: string, leadId: string) {
  await assertSportsPartnerAccess(accessKey);
  const client = supabaseAdmin as any;

  const { data: lead, error: leadError } = await client
    .from('texasdefined_partner_inquiries')
    .select('id,company,email,website,message,status,partnership_type')
    .eq('id', leadId)
    .eq('partnership_type', 'sports-travel')
    .maybeSingle();

  if (leadError) throw new Error(`Sports partner lead could not be loaded: ${leadError.message}`);
  if (!lead?.id) throw new Error('Sports partner lead was not found.');
  if (!lead.website) throw new Error('Add or obtain the business website before promoting this lead to a sponsor prospect.');

  const website = new URL(String(lead.website));
  if (website.protocol !== 'https:') throw new Error('Sponsor prospects require an HTTPS business website.');

  const { data: sponsor, error: sponsorError } = await client
    .from('texasdefined_sports_sponsors')
    .insert({
      company_name: String(lead.company).trim(),
      website: website.toString(),
      contact_email: String(lead.email).trim().toLowerCase(),
      source_inquiry_id: String(lead.id),
      status: 'prospect',
      notes: `Promoted from sports-travel inquiry. Original message:\n${String(lead.message).trim()}`,
      updated_at: new Date().toISOString(),
    })
    .select('id,company_name,status,source_inquiry_id')
    .single();

  if (sponsorError) {
    if (String(sponsorError.message).includes('texasdefined_sports_sponsors_source_inquiry_unique_idx')) {
      throw new Error('This sports-travel inquiry has already been promoted to a sponsor prospect.');
    }
    throw new Error(`Sponsor prospect could not be created: ${sponsorError.message}`);
  }

  const { error: statusError } = await client
    .from('texasdefined_partner_inquiries')
    .update({ status: 'reviewing' })
    .eq('id', leadId)
    .eq('partnership_type', 'sports-travel');

  if (statusError) {
    await client.from('texasdefined_sports_sponsors').delete().eq('id', sponsor.id);
    throw new Error(`Lead status could not be updated after promotion: ${statusError.message}`);
  }

  return {
    sponsorId: String(sponsor.id),
    companyName: String(sponsor.company_name),
    status: String(sponsor.status),
    sourceInquiryId: String(sponsor.source_inquiry_id),
  };
}
