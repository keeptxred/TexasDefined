import {
  TEXAS_TOURNAMENTS,
  tournamentCountyName,
} from './texas-tournaments';
import {
  TEXAS_TOURNAMENT_CATEGORIES,
  type TexasTournamentCategory,
} from './texas-tournament-collections';
import {
  formatMajorEventDateLabelServer,
  getMajorEventRecordServer,
} from './major-event-page.server';

export interface TournamentCollectionItem {
  slug: string;
  href: string;
  name: string;
  city: string;
  countyName?: string;
  detail: string;
  sourceCheckedAt?: string;
}

const categoryPathBySlug = new Map(
  TEXAS_TOURNAMENT_CATEGORIES.map((category) => [category.slug, category.path]),
);

// Tournament seed names and permanent event-guide names are usually identical.
// Keep the small mismatch map explicit so a verified guide can be reused without
// manufacturing a second canonical URL merely because the seed wording differed.
const eventGuideSlugAliases: Readonly<Record<string, string>> = {
  'houston-livestock-show-and-rodeo': 'houston-livestock-show-rodeo',
  'sandhills-stock-show-and-rodeo': 'sandhills-stock-show-rodeo',
  'abilene-western-heritage-classic-ranch-rodeo': 'western-heritage-classic',
  'fort-bend-county-fair-prca-rodeo': 'fort-bend-county-fair-rodeo',
  'austin-open-atx-open': 'atx-open',
  'houston-marathon-half-marathon': 'chevron-houston-marathon',
  'dallas-marathon-championship': 'bmw-dallas-marathon',
  'austin-marathon-half': 'austin-marathon',
  'nascar-cup-series-autotrader-echopark-automotive-400': 'texas-motor-speedway-nascar-weekend',
  'terlingua-international-chili-cook-off': 'casi-terlingua-international-chili-championship',
  'texas-state-fiddlers-championship': 'texas-state-championship-fiddlers-frolics',
};

function verifiedEventGuideForSeed(seedSlug: string) {
  const eventSlug = eventGuideSlugAliases[seedSlug] ?? seedSlug;
  const event = getMajorEventRecordServer(eventSlug);
  return event?.sourceCheckedAt ? event : null;
}

export function loadTournamentCollectionItemsServer(category?: TexasTournamentCategory): TournamentCollectionItem[] {
  const tournaments = category
    ? TEXAS_TOURNAMENTS.filter((tournament) => tournament.category === category)
    : TEXAS_TOURNAMENTS;

  return tournaments.map((tournament) => {
    const event = verifiedEventGuideForSeed(tournament.slug);
    return {
      slug: tournament.slug,
      href: event ? `/event/${event.slug}` : category ? '/events/tournaments' : categoryPathBySlug.get(tournament.category) ?? '/events/tournaments',
      name: event?.name ?? tournament.name,
      city: event?.city ?? tournament.locationLabel,
      countyName: event?.countyName ?? tournamentCountyName(tournament.countySlug),
      detail: event
        ? `${formatMajorEventDateLabelServer(event)} · ${event.venue} · ${tournament.summary}`
        : `${tournament.locationLabel} · ${tournament.summary}`,
      sourceCheckedAt: event?.sourceCheckedAt,
    };
  });
}
