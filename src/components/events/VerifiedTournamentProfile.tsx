import type { VerifiedTournamentProfileData } from "@/data/tournaments/verified-profile-data.server";

export function VerifiedTournamentProfile({ pageData }: { pageData: VerifiedTournamentProfileData }) {
  const { profile, countyPath } = pageData;

  return <main>
    <section className="border-b border-border bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="eyebrow text-primary">Verified Texas tournament guide</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none sm:text-6xl">{profile.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{profile.summary}</p>
        <div className="mt-8 grid gap-5 border-y border-border py-6 sm:grid-cols-3">
          <div><span className="eyebrow text-primary">When</span><strong className="mt-2 block font-display text-2xl">{profile.dateLabel}</strong></div>
          <div><span className="eyebrow text-primary">Where</span><strong className="mt-2 block font-display text-2xl">{profile.venue}</strong><span className="mt-1 block text-sm text-muted-foreground">{profile.city}, Texas</span></div>
          <div><span className="eyebrow text-primary">Source status</span><strong className="mt-2 block font-display text-2xl">First-party verified</strong><span className="mt-1 block text-sm text-muted-foreground">Checked {profile.sourceCheckedAt}</span></div>
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8">
        <div>
          <p className="eyebrow text-primary">Why it matters</p>
          <h2 className="mt-2 font-display text-4xl">A Texas competition worth planning around</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{profile.whyItMatters}</p>

          <div className="mt-10 border-t border-border pt-8">
            <p className="eyebrow text-primary">Plan carefully</p>
            <h2 className="mt-2 font-display text-3xl">What to verify before you go</h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
              {profile.planningNotes.map((note) => <li key={note} className="border-t border-border pt-4">{note}</li>)}
            </ul>
          </div>
        </div>

        <aside className="h-fit border border-border bg-surface p-6">
          <p className="eyebrow text-primary">Official source</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Dates, venue and occurrence details on this page were checked against the organizer or official event site.</p>
          <a href={profile.officialUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block font-semibold text-primary underline decoration-primary/40 underline-offset-4">Open {profile.officialSourceLabel} ↗</a>
          <div className="mt-7 border-t border-border pt-5">
            <p className="eyebrow text-primary">Keep exploring</p>
            <div className="mt-3 flex flex-col gap-3 text-sm font-semibold">
              <a href={profile.categoryPath} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{profile.categoryLabel} →</a>
              <a href={countyPath} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{profile.countyName} →</a>
              <a href="/events/tournaments" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">All Texas tournaments →</a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>;
}
