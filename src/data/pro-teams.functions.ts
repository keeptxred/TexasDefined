import { createServerFn } from '@tanstack/react-start';

export const getProTeamsIndex = createServerFn({ method: 'GET' }).handler(async () => {
  const { default: teams } = await import('./pro-teams.json');
  const { proTeamsIndexMetadata } = await import('./pro-team-seo.server');
  return { teams: teams.map(({ slug, name, league, city, intro, color }) => ({ slug, name, league, city, intro, color })), seo: proTeamsIndexHead() };
});

export const getProTeamGuide = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { default: teams } = await import('./pro-teams.json');
    const team = teams.find((entry) => entry.slug === data.slug);
    if (!team) return null;
    const [{ loadUpcomingTexasEventRecordsServer }, { buildTexasEventCarouselItemsServer }, { getSportsVenuePhoto }, { isProTeamHomeGame }, { loadProTeamLiveServer }] = await Promise.all([
      import('./events/texas-event-records.server'), import('./events/texas-event-calendar.server'), import('./sports-venue-images-all'), import('./pro-team-events'), import('./pro-team-live.server'),
    ]);
    // Filter before the display limit, including arenas with several tenants.
    const records = team.venues.flatMap((slug) => loadUpcomingTexasEventRecordsServer({ venueId: `sports-venue:${slug}`, category: 'sport', limit: 250 }))
      .filter((event) => isProTeamHomeGame(event, team))
      .filter((event, index, all) => all.findIndex((other) => other.id === event.id) === index)
      .sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 12);
    const live = await loadProTeamLiveServer(team);
    const primaryVenue = team.slug === 'san-antonio-spurs' ? 'frost-bank-center' : records[0]?.venueId?.replace('sports-venue:', '') ?? (team.slug === 'dallas-wings' && new Date().getFullYear() >= 2027 ? 'american-airlines-center' : team.venues[0]);
    const photo = getSportsVenuePhoto(primaryVenue) ?? null;
    const { proTeamGuideHead } = await import('./pro-team-seo.server');
    return { team, primaryVenue, photo, seo: proTeamGuideHead(team, photo), games: buildTexasEventCarouselItemsServer(records).map((event) => { const card = { ...event }; delete card.image; return card; }), ...live };
  });
