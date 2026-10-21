import { createLazyFileRoute, Outlet, useRouterState } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';

export const Route = createLazyFileRoute('/sports/teams')({ component: TeamsRoute });
function TeamsRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const teams = Route.useLoaderData();
  if (pathname.replace(/\/$/, '') !== '/sports/teams') return <Outlet />;
  return <Container className="py-12 sm:py-20"><article className="mx-auto max-w-6xl">
    <nav aria-label="Breadcrumb" className="text-sm"><a href="/sports" className="underline">Texas sports</a> / Pro teams</nav>
    <header className="border-b border-border py-10"><p className="eyebrow text-primary">Worth the trip</p><h1 className="mt-3 font-display text-5xl sm:text-7xl">Pick the game. Make a weekend of it.</h1><p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">Thirteen Texas teams, with home games, tickets, team stories and practical plans for the days around the game. Choose the team first, then match your hotel and itinerary to the actual venue.</p></header>
    <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{teams.map((team) => <a key={team.slug} href={`/sports/teams/${team.slug}`} className="group border-b border-border py-8"><p className="eyebrow" style={{ color: team.color }}>{team.league} � {team.city}</p><h2 className="mt-3 font-display text-3xl group-hover:text-primary">{team.name}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{team.intro}</p><span className="mt-5 block font-semibold text-primary">Plan a {team.name} trip </span></a>)}</div>
    <section className="py-10"><h2 className="font-display text-3xl">Start with the ticket, then choose the hotel</h2><p className="mt-4 max-w-3xl leading-8">Confirm the game date, kickoff or tipoff time, and arena before booking the rest. The Cowboys and Rangers play in Arlington, FC Dallas plays in Frisco, and special games can move beyond a team's usual home. Keep travel flexible when the league can change the start time.</p><div className="mt-5 flex flex-wrap gap-6 font-semibold text-primary"><a href="/events#calendar">Browse the Texas events calendar </a><a href="/sports-venues">Compare stadium and arena guides </a><a href="/texas-tailgating-guide">Plan a football tailgate </a></div></section>
  </article></Container>;
}
