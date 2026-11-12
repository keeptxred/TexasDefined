import { createServerFn } from '@tanstack/react-start';

export const getProTeamGuide = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { default: teams } = await import('./pro-teams.json');
    if (!data.slug) {
      const { proTeamsIndexHead } = await import('./pro-team-seo.server');
      return { index: { teams: teams.map(({ slug, name, league, city, intro, color }) => ({ slug, name, league, city, intro, color })), ...proTeamsIndexHead() }, guide: null };
    }
    const team = teams.find((entry) => entry.slug === data.slug);
    if (!team) return { index: null, guide: null };
    // Keep the independently authored team guide available if an optional,
    // large event-catalogue import fails under the Worker's memory ceiling.
    // Never invent game times or ticket links to compensate for missing data.
    const [{ getSportsVenuePhoto }, { loadProTeamLiveServer }, { proTeamGuideHead }] = await Promise.all([
      import('./sports-venue-images-all'), import('./pro-team-live.server'), import('./pro-team-seo.server'),
    ]);
    const eventSelection = await (async () => {
      try {
        const [{ loadTexasEventRecordsServer }, { buildTexasEventCarouselItemsServer }, { isProTeamHomeGame }] = await Promise.all([
          import('./events/texas-event-records.server'), import('./events/texas-event-calendar.server'), import('./pro-team-events'),
        ]);
        // Construct the shared editorial calendar only once per request,
        // even for teams that use multiple arenas. The previous code built the
        // entire statewide catalogue once for every venue.
        const dateParts = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
        }).formatToParts(new Date());
        const date = (part: 'year' | 'month' | 'day') => dateParts.find((value) => value.type === part)?.value ?? '00';
        const today = `${date('year')}-${date('month')}-${date('day')}`;
        const venueIds = new Set(team.venues.map((slug) => `sports-venue:${slug}`));
        const records = loadTexasEventRecordsServer()
          .filter((event) => event.category === 'sport' && event.venueId && venueIds.has(event.venueId))
          .filter((event) => event.status === 'scheduled' && (event.endDate ?? event.startDate) >= today)
          .filter((event) => isProTeamHomeGame(event, team))
          .filter((event, index, all) => all.findIndex((other) => other.id === event.id) === index)
          .sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 12);
        return {
          firstVenue: records[0]?.venueId?.replace('sports-venue:', ''),
          games: buildTexasEventCarouselItemsServer(records).map((event) => { const card = { ...event }; delete card.image; return card; }),
        };
      } catch (error) {
        // The cards are optional enrichment. The verified official schedule
        // and venue guide links remain on the page and are never replaced by
        // fabricated fixtures. The sitewide memory incident is tracked in #7055.
        console.warn('Optional pro-team event catalogue unavailable; official schedule remains linked:', String(error));
        return { firstVenue: undefined, games: [] };
      }
    })();
    const live = await loadProTeamLiveServer(team);
    const primaryVenue = team.slug === 'san-antonio-spurs' ? 'frost-bank-center'
      : eventSelection.firstVenue ?? (team.slug === 'dallas-wings' && new Date().getFullYear() >= 2027 ? 'american-airlines-center' : team.venues[0]);
    const photo = getSportsVenuePhoto(primaryVenue) ?? null;
    return { index: null, guide: { team, primaryVenue, photo, seo: proTeamGuideHead(team, photo), games: eventSelection.games, ...live } };
  });
