import {
  TEXAS_HOCKEY_ACTIVE_TEAMS,
  findTexasHockeyLeague,
  hockeyVenuePathForTeam,
  texasHockeyLeaguePath,
  texasHockeyTeamPath,
} from '@/data/texas-hockey';

export function EntityHockeyTeams({
  kind,
  slug,
  name,
}: {
  kind: 'city' | 'county';
  slug: string;
  name: string;
}) {
  const teams = TEXAS_HOCKEY_ACTIVE_TEAMS.filter((team) =>
    kind === 'city' ? team.citySlug === slug : team.countySlug === slug,
  );
  if (!teams.length) return null;

  return (
    <section className="border-b border-border py-12" aria-labelledby="local-hockey-heading">
      <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas hockey</p>
          <h2 id="local-hockey-heading" className="mt-2 font-display text-3xl">Hockey in {name}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Current {kind === 'county' ? 'county' : 'city'} teams and programs from the TexasDefined hockey directory.
          </p>
          <a href="/texas-hockey" className="mt-4 inline-block text-sm font-semibold text-primary">All Texas hockey →</a>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {teams.map((team) => {
            const league = findTexasHockeyLeague(team.leagueSlug);
            const venuePath = hockeyVenuePathForTeam(team);
            return (
              <article key={team.slug} className="border-t-2 border-foreground pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {league?.abbreviation ?? team.leagueSlug.toUpperCase()} · {team.level}
                </p>
                <h3 className="mt-2 font-display text-2xl">
                  <a href={texasHockeyTeamPath(team.slug)} className="hover:text-primary">{team.name}</a>
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{team.overview}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                  <a href={texasHockeyTeamPath(team.slug)} className="text-primary">Team profile →</a>
                  {venuePath ? <a href={venuePath} className="text-primary">{team.homeVenueName || 'Home venue'} →</a> : null}
                  {league ? <a href={texasHockeyLeaguePath(league.slug)} className="text-primary">{league.abbreviation} in Texas →</a> : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EntityHockeyTeams;
