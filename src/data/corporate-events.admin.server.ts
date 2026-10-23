import { assertSportsPartnerAccess } from '@/data/sports-partner-leads.server';
import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { corporateEventProviders } from '@/data/corporate-events';
import { corporateEventTexasToday } from '@/data/corporate-event-dates';

export type CorporateEventLeadStatus = 'new' | 'reviewing' | 'contacted' | 'closed' | 'spam';
export type CorporateEventApplicationStatus = 'pending' | 'reviewing' | 'approved' | 'rejected' | 'spam';
export type CorporateEventOfferStatus = 'draft' | 'approved' | 'paused' | 'expired';

const leadStatuses: CorporateEventLeadStatus[] = ['new', 'reviewing', 'contacted', 'closed', 'spam'];
const applicationStatuses: CorporateEventApplicationStatus[] = ['pending', 'reviewing', 'approved', 'rejected', 'spam'];
const offerStatuses: CorporateEventOfferStatus[] = ['draft', 'approved', 'paused', 'expired'];
const MAX_ROWS = 120;
const client = supabaseAdmin as any;

export type CorporateEventLeadRecord = {
  id: string; created_at: string; status: CorporateEventLeadStatus;
  contact_name: string; email: string; company: string; phone: string | null;
  city: string; group_size: number; event_category: string; event_date: string | null;
  budget_per_person: number | null; provider_slugs: string[]; notes: string | null;
  allow_provider_outreach: boolean; provider_outreach_consented_at: string | null;
};
export type CorporateEventApplicationRecord = {
  id: string; created_at: string; status: CorporateEventApplicationStatus;
  contact_name: string; email: string; phone: string | null; business_name: string;
  city: string; website: string; published_capacity: number | null;
  proposal: string | null; proposed_promo_code: string | null; notes: string | null;
  identity_verified_at: string | null; identity_verified_by: string | null; identity_verification_note: string | null;
};
export type CorporateEventOfferRecord = {
  id: string; created_at: string; status: CorporateEventOfferStatus;
  partner_application_id: string; provider_slug: string;
  title: string; benefit: string; code: string | null;
  redemption_url: string; starts_on: string; ends_on: string;
  reviewed_by: string | null; reviewed_at: string | null;
};

export async function loadCorporateEventOperations(accessKey: string) {
  await assertSportsPartnerAccess(accessKey);
  const cutoff = new Date(corporateEventTexasToday() + 'T12:00:00Z');
  cutoff.setUTCDate(cutoff.getUTCDate() - 29);
  const [leadQuery, applicationQuery, offerQuery, clickQuery] = await Promise.all([
    client.from('texasdefined_group_event_requests')
      .select('id,created_at,status,contact_name,email,company,phone,city,group_size,event_category,event_date,budget_per_person,provider_slugs,notes,allow_provider_outreach,provider_outreach_consented_at')
      .order('created_at', { ascending: false }).limit(MAX_ROWS + 1),
    client.from('texasdefined_group_event_partner_applications')
      .select('id,created_at,status,contact_name,email,phone,business_name,city,website,published_capacity,proposal,proposed_promo_code,notes,identity_verified_at,identity_verified_by,identity_verification_note')
      .order('created_at', { ascending: false }).limit(MAX_ROWS + 1),
    client.from('texasdefined_group_event_offers')
      .select('id,created_at,status,partner_application_id,provider_slug,title,benefit,code,redemption_url,starts_on,ends_on,reviewed_by,reviewed_at')
      .order('created_at', { ascending: false }).limit(MAX_ROWS + 1),
    client.from('texasdefined_group_event_offer_click_totals')
      .select('offer_id,clicks').gte('clicked_on', cutoff.toISOString().slice(0, 10)).limit(1001),
  ]);
  if (leadQuery.error || applicationQuery.error || offerQuery.error || clickQuery.error) {
    throw new Error('Corporate event dashboard data is temporarily unavailable.');
  }
  const leads = (leadQuery.data ?? []) as CorporateEventLeadRecord[];
  const applications = (applicationQuery.data ?? []) as CorporateEventApplicationRecord[];
  const offers = (offerQuery.data ?? []) as CorporateEventOfferRecord[];
  const clickRows = (clickQuery.data ?? []) as { offer_id: string; clicks: number }[];
  const offerClicks = new Map<string, number>();
  for (const row of clickRows.slice(0, 1000)) {
    offerClicks.set(row.offer_id, (offerClicks.get(row.offer_id) ?? 0) + row.clicks);
  }
  const outboundClicks30Days = [...offerClicks.values()].reduce((total, clicks) => total + clicks, 0);
  return {
    generatedAt: new Date().toISOString(),
    leads: leads.slice(0, MAX_ROWS),
    applications: applications.slice(0, MAX_ROWS),
    offers: offers.slice(0, MAX_ROWS),
    offerClickStats: {
      outboundClicks30Days,
      truncated: clickRows.length > 1000,
      byOffer: [...offerClicks].map(([offerId, clicks]) => ({ offerId, clicks })),
    },
    truncated: {
      leads: leads.length > MAX_ROWS,
      applications: applications.length > MAX_ROWS,
      offers: offers.length > MAX_ROWS,
    },
  };
}

export async function setCorporateEventLeadStatus(accessKey: string, id: string, status: CorporateEventLeadStatus) {
  await assertSportsPartnerAccess(accessKey);
  if (!leadStatuses.includes(status)) throw new Error('Unknown lead status.');
  const { data, error } = await client.from('texasdefined_group_event_requests').update({ status }).eq('id', id).select('id,status').maybeSingle();
  if (error || !data?.id) throw new Error('Lead status could not be updated.');
  return { id: String(data.id), status: String(data.status) };
}

export async function setCorporateEventApplicationStatus(
  accessKey: string, id: string, status: CorporateEventApplicationStatus,
  verifiedIdentity: boolean, verificationNote: string,
) {
  await assertSportsPartnerAccess(accessKey);
  if (!applicationStatuses.includes(status)) throw new Error('Unknown application status.');
  // Staff must independently verify the applicant through an official business
  // contact channel. Evidence is not inferred from a self-reported website.
  if (status === 'approved' && (!verifiedIdentity || verificationNote.trim().length < 20 || verificationNote.length > 500)) {
    throw new Error('To approve a partner, verify its identity using the official venue contact channel and record at least 20 characters of evidence.');
  }
  const updates = status === 'approved'
    ? {
        status,
        identity_verified_at: new Date().toISOString(),
        identity_verified_by: 'TexasDefined corporate event operations',
        identity_verification_note: verificationNote.trim(),
      }
    : { status };
  const { data, error } = await client.from('texasdefined_group_event_partner_applications')
    .update(updates).eq('id', id).select('id,status').maybeSingle();
  if (error || !data?.id) throw new Error('Application status could not be updated.');
  return { id: String(data.id), status: String(data.status) };
}

export type CorporateEventOfferProposal = {
  applicationId: string; providerSlug: string; title: string; benefit: string;
  code: string | null; redemptionUrl: string; startsOn: string; endsOn: string;
};

export async function proposeCorporateEventOffer(accessKey: string, data: CorporateEventOfferProposal) {
  await assertSportsPartnerAccess(accessKey);
  const record = corporateEventProviders.find((provider) => provider.slug === data.providerSlug);
  if (!record) throw new Error('Add and source the provider in the editorial directory before creating an offer.');
  const applicationQuery = await client.from('texasdefined_group_event_partner_applications')
    .select('id,business_name,website,status,identity_verified_at,identity_verification_note').eq('id', data.applicationId).maybeSingle();
  const application = applicationQuery.data;
  if (applicationQuery.error || !application || application.status !== 'approved' || !application.identity_verified_at || !application.identity_verification_note) {
    throw new Error('Business application must be approved first.');
  }
  const business = String(application.business_name).toLowerCase().replace(/[^a-z0-9]/g, '');
  const listing = record.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (business !== listing) throw new Error('Application name does not match the verified provider. Reconcile the listing before approval.');
  const redemption = new URL(data.redemptionUrl);
  if (redemption.protocol !== 'https:') throw new Error('The redemption link must use HTTPS.');
  const issuer = new URL(String(application.website));
  if (redemption.hostname !== issuer.hostname && !redemption.hostname.endsWith('.' + issuer.hostname)) {
    throw new Error('Redemption link must be hosted on the verified applicant business website.');
  }
  const { data: created, error } = await client.from('texasdefined_group_event_offers').insert({
    partner_application_id: data.applicationId,
    provider_slug: data.providerSlug,
    title: data.title,
    benefit: data.benefit,
    code: data.code,
    redemption_url: data.redemptionUrl,
    starts_on: data.startsOn,
    ends_on: data.endsOn,
    status: 'draft',
  }).select('id,status').maybeSingle();
  if (error || !created?.id) throw new Error('Draft offer could not be created.');
  return { id: String(created.id), status: 'draft' as const };
}

export async function setCorporateEventOfferStatus(accessKey: string, id: string, status: CorporateEventOfferStatus) {
  await assertSportsPartnerAccess(accessKey);
  if (!offerStatuses.includes(status)) throw new Error('Invalid offer status.');
  const { data: offer, error: lookupError } = await client.from('texasdefined_group_event_offers')
    .select('id,partner_application_id,starts_on,ends_on,status').eq('id', id).maybeSingle();
  if (lookupError || !offer?.id) throw new Error('Offer not found.');
  if (status === 'approved') {
    const { data: partner, error } = await client.from('texasdefined_group_event_partner_applications')
      .select('status,identity_verified_at,identity_verification_note').eq('id', offer.partner_application_id).maybeSingle();
    if (error || partner?.status !== 'approved' || !partner.identity_verified_at || !partner.identity_verification_note) throw new Error('Only identity-verified partners may have approved offers.');
    const today = corporateEventTexasToday();
    if (String(offer.ends_on) < today || String(offer.starts_on) > String(offer.ends_on)) throw new Error('Offer date window is invalid or expired.');
  }
  // Approved offers require a reviewer and timestamp. No public publication occurs here.
  const payload = status === 'approved'
    ? { status, reviewed_by: 'TexasDefined corporate events operations', reviewed_at: new Date().toISOString() }
    : { status };
  const { data: updated, error } = await client.from('texasdefined_group_event_offers')
    .update(payload).eq('id', id).select('id,status').maybeSingle();
  if (error || !updated?.id) throw new Error('Offer status update failed.');
  return { id: String(updated.id), status: String(updated.status) };
}
