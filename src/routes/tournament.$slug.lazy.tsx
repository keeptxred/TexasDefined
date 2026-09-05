import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/tournament/$slug")({ component: TournamentPage });

function TournamentPage() {
  const { profile, countyPath } = Route.useLoaderData();

  return <main className="mx-auto max-w-4xl px-6 py-14">
    <p className="eyebrow text-primary">Verified Texas tournament guide</p>
    <h1 className="mt-3 font-display text-5xl">{profile.name}</h1>
    <p className="mt-5 text-lg leading-8 text-muted-foreground">{profile.summary}</p>
    <p className="mt-7 border-y border-border py-5"><strong>{profile.dateLabel}</strong> · {profile.venue}, {profile.city}<br /><span className="text-sm text-muted-foreground">First-party source checked {profile.sourceCheckedAt}</span></p>
    <h2 className="mt-9 font-display text-3xl">Why it matters</h2>
    <p className="mt-3 leading-7 text-muted-foreground">{profile.whyItMatters}</p>
    <h2 className="mt-9 font-display text-3xl">Before you go</h2>
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">{profile.planningNotes.map((note) => <li key={note}>{note}</li>)}</ul>
    <nav className="mt-9 flex flex-wrap gap-5 text-sm font-semibold">
      <a href={profile.officialUrl} target="_blank" rel="noreferrer" className="text-primary">Official source ↗</a>
      <a href={profile.categoryPath}>{profile.categoryLabel}</a>
      <a href={countyPath}>{profile.countyName}</a>
      <a href="/events/tournaments">All Texas tournaments</a>
    </nav>
  </main>;
}
