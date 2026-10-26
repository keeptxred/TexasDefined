import type { CorporateEventProvider } from './corporate-events';

export type CorporateEventInvitationPurpose = 'group-packages' | 'commercial-opportunities';

/**
 * Editorial-source-grounded first-contact drafts. No venue is represented as
 * an advertiser, preferred partner, licensed affiliate or signed offer.
 */
export function prepareCorporateEventPartnerInvitation(
  provider: Pick<CorporateEventProvider,
    'name' | 'city' | 'format' | 'capacityDetail' | 'officialUrl' | 'sourceUrl' | 'verifiedOn'>,
  purpose: CorporateEventInvitationPurpose,
) {
  if (!['group-packages','commercial-opportunities'].includes(purpose)) throw new Error('Unknown manual invitation purpose.');
  const subject = 'TexasDefined — ' + provider.city + ' corporate events collaboration for ' + provider.name;
  const introduction = [
    'Hello ' + provider.name + ' events team,',
    '',
    'I help with TexasDefined, an independent directory of Texas events and destinations. We are building more useful information for businesses organizing group outings, including events for approximately 45 coworkers.',
    '',
    'Your venue was added to our editorial research directory from public information. This does not mean we have a commercial partnership or confirmed availability:',
    'Official venue website: ' + provider.officialUrl,
    'Public source we reviewed: ' + provider.sourceUrl,
    'Source review date: ' + provider.verifiedOn,
    'Listed event format: ' + provider.format,
    'Published group-capacity information (must be reconfirmed): ' + provider.capacityDetail,
    '',
  ];
  const inquiry = purpose === 'group-packages' ? [
    'Would you be open to sharing your current corporate-group packages and the right events contact?',
    'We would especially like to clarify whether one group of about 45 guests can be accommodated together or in organized rotations, and what options are available for larger teams.',
    'Helpful details include per-person or venue minimum pricing, room fees, catering, deposits, taxes, accessibility, date availability, parking, cancellation terms and how far in advance a company should book.',
    'Please send only information you are comfortable having reviewed for an accurate editorial listing. We will independently review the terms before publishing any group-specific claim.',
  ] : [
    'Would your business be interested in discussing a separately agreed corporate-events partnership with TexasDefined?',
    'Possible structures could include a properly disclosed paid sponsorship, a venue-approved company-group offer, or a referral arrangement if separately agreed and legally eligible. No rates, discounts, commissions, exclusivity or placements are assumed.',
    'If this is of interest, who is authorized to discuss terms, redemption rules, expiry, attribution, invoicing and signed approval on behalf of your business?',
    'Any promotional placement must be clearly labeled and must not change our independent editorial venue rankings.',
  ];
  const body = [...introduction, ...inquiry, '',
    'We are not forwarding planner contact details or making a booking request in this introduction.',
    'Thank you,',
    'TexasDefined corporate events team',
  ].join('\n');
  return {
    subject, body, venueName: provider.name, officialUrl: provider.officialUrl,
    sourceUrl: provider.sourceUrl, status: 'manual-draft-not-sent' as const,
  };
}
