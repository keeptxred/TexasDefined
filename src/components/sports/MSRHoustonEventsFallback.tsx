/**
 * Human-verified MSR Houston calendar excerpts checked 2026-10-09.
 * Unlike an inferred recurring event series, these are exact dated operator
 * listings. Expire the excerpts automatically; never show them as a live feed.
 */
const events = [
  { title: "RideSmart motorcycle school", dates: "October 10–11, 2026", lastDate: "2026-10-11", description: "An instructed motorcycle track-day program. This is rider education, not a road race.", source: "https://msrhouston.com/calendar/" },
  { title: "CMRA motorcycle races", dates: "October 17–18, 2026", lastDate: "2026-10-18", description: "A Central Motorcycle Roadracing Association race weekend. Spectator access and paddock rules depend on the organizer.", source: "https://msrhouston.com/events/" },
  { title: "24 Hours of LeMons", dates: "November 7–8, 2026", lastDate: "2026-11-08", description: "Amateur endurance racing; verify entry, spectator rules and session times before attending.", source: "https://msrhouston.com/events/" },
  { title: "Teen Driving Safety School", dates: "November 21, 2026", lastDate: "2026-11-21", description: "Scheduled driver-safety instruction; contact the school about age requirements, registration and capacity.", source: "https://msrhouston.com/events/" },
] as const;

function currentCentralDate() {
  const pieces = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const fields = Object.fromEntries(pieces.map((piece) => [piece.type, piece.value]));
  return [fields.year, fields.month, fields.day].join("-");
}

export function MSRHoustonEventsFallback() {
  const upcoming = events.filter((event) => event.lastDate >= currentCentralDate());
  return <section aria-labelledby="msr-events-heading" className="border-b border-border py-10 sm:py-12">
    <p className="eyebrow text-primary">Official calendar highlights</p>
    <h2 id="msr-events-heading" className="mt-2 font-display text-3xl sm:text-4xl">Upcoming events at MSR Houston</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
      Independently selected from MSR Houston's official listings and checked October 9, 2026.
      These are dated excerpts, not real-time registration or ticket availability. Entries automatically
      disappear after their listed dates; always verify with the organizer.
    </p>
    {upcoming.length ? <div className="mt-7 grid gap-5 sm:grid-cols-2">
      {upcoming.map((event) => <article key={event.title} className="border border-border px-5 py-5">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">{event.dates}</p>
        <h3 className="mt-2 font-display text-2xl">{event.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{event.description}</p>
        <a className="mt-4 inline-block text-sm font-semibold underline underline-offset-4 hover:text-primary" href={event.source} target="_blank" rel="noopener noreferrer">Verify with the event operator ↗</a>
      </article>)}
    </div> : <p className="mt-6 text-sm leading-7 text-muted-foreground">
      All independently verified dated highlights have passed. See the current official road-course calendar for newly scheduled events.
    </p>}
    <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
      <a href="https://msrhouston.com/calendar/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">Full current track calendar ↗</a>
      <a href="https://msrhouston.com/events/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">Official event descriptions ↗</a>
    </div>
  </section>;
}
