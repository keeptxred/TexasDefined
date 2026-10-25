/**
 * Staff-reference-only public event inquiry paths, checked on operator-owned
 * public pages on 2026-10-24 and 2026-10-25. These are not contacts sent, approved partners,
 * available dates, exclusive offers, reservations, referral terms, or inboxes.
 * Clicking a link never submits a quote or shares planner information.
 */
export type CorporateEventPublicOperatorChannel = {
  venueSlug: string;
  url: string;
  evidenceUrl: string;
  reviewedOn: string;
};

export const corporateEventPublicOperatorChannels: readonly CorporateEventPublicOperatorChannel[] = [
  { venueSlug: 'beat-the-bomb-houston', url: 'https://www.beatthebomb.com/events', evidenceUrl: 'https://www.beatthebomb.com/events', reviewedOn: '2026-10-24' },
  { venueSlug: 'the-escape-game-houston', url: 'https://theescapegame.com/houston/parties-and-events/', evidenceUrl: 'https://theescapegame.com/houston/parties-and-events/', reviewedOn: '2026-10-24' },
  { venueSlug: 'pkl-social', url: 'https://pklsocial.com/private-events/', evidenceUrl: 'https://pklsocial.com/private-events/', reviewedOn: '2026-10-24' },
  { venueSlug: 'meow-wolf-houston', url: 'https://meowwolf.com/visit/houston/private-events', evidenceUrl: 'https://meowwolf.com/visit/houston/private-events', reviewedOn: '2026-10-24' },
  { venueSlug: 'houston-zoo-events', url: 'https://www.houstonzoo.org/host-an-event/host-your-event-inquiry-form/', evidenceUrl: 'https://www.houstonzoo.org/host-an-event/host-your-event-inquiry-form/', reviewedOn: '2026-10-24' },
  { venueSlug: 'puttshack-houston-corporate', url: 'https://www.puttshack.com/parties/houston/', evidenceUrl: 'https://www.puttshack.com/parties/houston/', reviewedOn: '2026-10-24' },
  { venueSlug: 'great-big-game-show-houston', url: 'https://greatbiggameshow.com/houston/events/', evidenceUrl: 'https://greatbiggameshow.com/houston/events/', reviewedOn: '2026-10-24' },
  { venueSlug: 'color-factory-houston-private-events', url: 'https://www.colorfactory.co/events', evidenceUrl: 'https://www.colorfactory.co/events', reviewedOn: '2026-10-24' },
  { venueSlug: 'house-of-blues-houston-private-events', url: 'https://houston.houseofblues.com/contact', evidenceUrl: 'https://houston.houseofblues.com/contact', reviewedOn: '2026-10-24' },
  { venueSlug: 'pelazzio-houston-corporate-ballrooms', url: 'https://pelazzio.com/corporate-events/', evidenceUrl: 'https://pelazzio.com/corporate-events/', reviewedOn: '2026-10-24' },
  { venueSlug: 'space-center-houston-corporate-rentals', url: 'https://spacecenter.org/host-an-event/', evidenceUrl: 'https://spacecenter.org/host-an-event/', reviewedOn: '2026-10-25' },
  { venueSlug: 'lone-star-flight-museum-rentals', url: 'https://lonestarflight.org/celebrate/event-spaces/', evidenceUrl: 'https://lonestarflight.org/celebrate/event-spaces/', reviewedOn: '2026-10-25' },
  { venueSlug: 'museum-of-illusions-houston-groups', url: 'https://moihouston.com/group-visits/', evidenceUrl: 'https://moihouston.com/group-visits/', reviewedOn: '2026-10-25' },
  { venueSlug: 'hmns-houston-corporate-events', url: 'https://www.hmns.org/visit/host-an-event/', evidenceUrl: 'https://www.hmns.org/visit/host-an-event/', reviewedOn: '2026-10-25' },
];

export function corporateEventPublicOperatorChannel(venueSlug: string):
  CorporateEventPublicOperatorChannel | null {
  return corporateEventPublicOperatorChannels.find(item => item.venueSlug === venueSlug) ?? null;
}
