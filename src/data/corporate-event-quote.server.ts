import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import { corporateEventProviders } from '@/data/corporate-events';
import { isUpcomingCorporateEventDate } from '@/data/corporate-event-dates';
import { supabaseAdmin } from '@/integrations/supabase/client.server';

const client = supabaseAdmin as any;

function normalizeBusinessName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function verifiedBusinessDomain(website: string, officialUrl: string): boolean {
  try {
    const applicant = new URL(website);
    const official = new URL(officialUrl);
    if (applicant.protocol !== 'https:' || official.protocol !== 'https:') return false;
    const host = (url: URL) => url.hostname.toLowerCase().replace(/^www\./, '');
    const a = host(applicant);
    const b = host(official);
    return a === b || a.endsWith('.' + b) || b.endsWith('.' + a);
  } catch {
    return false;
  }
}

/** Staff-only manual draft. Never sends mail or routes customer details automatically. */
export async function prepareCorporateEventPartnerQuote(
  accessKey: string, leadId: string, providerSlug: string,
) {
  await assertSportsPartnerAccess(accessKey);

  // Re-read consent at action time; the browser's dashboard snapshot cannot
  // authorize sharing. Null or revoked consent must fail closed.
  const { data: lead, error: leadError } = await client
    .from('texasdefined_group_event_requests')
    .select('id,status,contact_name,email,company,phone,city,group_size,event_category,event_date,budget_per_person,provider_slugs,notes,allow_provider_outreach,provider_outreach_consented_at')
    .eq('id', leadId)
    .maybeSingle();
  if (leadError || !lead?.id) throw new Error('Planner request not found.');
  if (!lead.allow_provider_outreach || !lead.provider_outreach_consented_at) {
    throw new Error('Planner has not authorized sharing with selected venues.');
  }
  if (['spam', 'closed'].includes(String(lead.status))) {
    throw new Error('Closed or spam requests cannot be prepared for venue outreach.');
  }
  if (!Array.isArray(lead.provider_slugs) || !lead.provider_slugs.includes(providerSlug)) {
    throw new Error('This venue was not selected by the planner.');
  }
  if (lead.event_date && !isUpcomingCorporateEventDate(String(lead.event_date))) {
    throw new Error('Confirm an updated future event date with the planner first.');
  }
  const venue = corporateEventProviders.find((provider) => provider.slug === providerSlug);
  if (!venue) throw new Error('Source-backed venue is not listed.');

  // Approved application, same verified directory identity, official HTTPS
  // domain. Names and domains must both match to limit impersonation.
  const { data: applications, error: applicationError } = await client
    .from('texasdefined_group_event_partner_applications')
    .select('id,status,business_name,website')
    .eq('status', 'approved')
    .limit(250);
  if (applicationError || !Array.isArray(applications)) throw new Error('Cannot verify venue partner.');
  if (applications.length === 250) throw new Error('Partner verification needs an operations review.');
  const candidates = applications.filter((application: { business_name: string; website: string }) =>
    normalizeBusinessName(String(application.business_name)) === normalizeBusinessName(venue.name)
    && verifiedBusinessDomain(String(application.website), venue.officialUrl),
  );
  if (candidates.length !== 1) {
    throw new Error('No unique approved partner matches the venue identity and official website.');
  }

  const subject = 'Corporate group event inquiry — ' + lead.company + ' (' + lead.group_size + ' guests)';
  const brief = [
    'DRAFT FOR MANUAL STAFF REVIEW — NOT SENT BY TEXASDEFINED',
    'Venue: ' + venue.name,
    'Verified official venue site: ' + venue.officialUrl,
    'Requestor explicitly opted into sharing with this shortlisted venue.',
    'Permission recorded: ' + lead.provider_outreach_consented_at,
    '',
    'Hello ' + venue.name + ' events team,',
    '',
    'TexasDefined is helping a company explore group-event options. This planner specifically shortlisted your venue and authorized outreach to selected venues.',
    '',
    'Company: ' + lead.company,
    'Planner: ' + lead.contact_name,
    'Email for quote follow-up: ' + lead.email,
    'Phone (if provided): ' + (lead.phone || 'Not supplied'),
    'City/market: ' + lead.city,
    'Guests: ' + lead.group_size,
    'Activity type: ' + lead.event_category,
    'Preferred date: ' + (lead.event_date || 'Flexible / confirm with organizer'),
    'Per-person budget ceiling: ' + (lead.budget_per_person == null ? 'Not specified' : '$' + lead.budget_per_person),
    'Planner notes: ' + (lead.notes || 'None supplied'),
    '',
    'Please provide the available group formats, minimum spends, itemized taxes/fees, booking terms, cancellation policy, and availability. A quote or booking is not implied by this request.',
    '',
    'TexasDefined operations — MANUAL SEND ONLY AFTER REVIEW',
  ].join('\n');

  return {
    subject,
    brief,
    providerSlug,
    providerName: venue.name,
    verifiedOfficialUrl: venue.officialUrl,
    permissionRecordedAt: String(lead.provider_outreach_consented_at),
    sent: false as const,
  };
}
