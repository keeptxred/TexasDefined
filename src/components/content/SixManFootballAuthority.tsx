import { Link } from "@tanstack/react-router";

const differences = [
  ["Players", "6 per side", "11 per side"],
  ["Field", "80 × 40 yards", "100 yards between goal lines; 53⅓ yards wide"],
  ["First down", "15 yards", "10 yards"],
  ["Field goal", "4 points", "3 points"],
  ["Kick after TD", "2 points", "1 point"],
  ["Run/pass try", "1 point", "2 points"],
  ["Quarter length", "10 minutes", "12 minutes in Texas high school football"],
] as const;

const ruleCards = [
  ["6", "players per side", "Fewer bodies make open-field tackling and spacing far more important."],
  ["15 yd", "for a first down", "The offense still gets four downs, but it must gain five more yards than in 11-man football."],
  ["4 pts", "for a field goal", "Kicking can swing a six-man game because field goals and kick tries are worth more."],
  ["45", "point ending rule", "A 45-point lead at halftime, or reached during the second half, ends the contest."],
] as const;

const sixManPhotos = [
  {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Six-man_football_battle.jpg?width=1600",
    alt: "Six-man football players battling for the ball under stadium lights",
    caption: "Six-man football creates huge one-on-one spaces. One missed tackle can become a scoring play in seconds.",
    credit: "KaleenaBurt · CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Six-man_football_battle.jpg",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Whitharral_Texas_Panthers_six-man_football_2010.jpg?width=1600",
    alt: "Whitharral Panthers six-man football players on a West Texas field",
    caption: "At schools such as Whitharral, six-man football keeps Friday-night football viable with a much smaller student body.",
    credit: "Leaflet · CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Whitharral_Texas_Panthers_six-man_football_2010.jpg",
  },
] as const;

function Step({ number, title, body }: { number: string; title: string; body: string }) {
  return <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
    <p className="font-semibold text-primary">Step {number}: {title}</p>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p>
  </div>;
}

function WidePhoto({ photo }: { photo: (typeof sixManPhotos)[number] }) {
  return <figure className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
    <div className="aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/10]">
      <img
        src={photo.src}
        alt={photo.alt}
        width={1600}
        height={1067}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="size-full object-cover"
      />
    </div>
    <figcaption className="p-4 text-sm leading-6 text-muted-foreground sm:p-5">
      <span className="text-foreground/85">{photo.caption}</span>
      <span className="mt-2 block text-xs">
        Photo: <a href={photo.href} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-primary">{photo.credit} · Wikimedia Commons</a>
      </span>
    </figcaption>
  </figure>;
}

export function SixManFootballAuthority() {
  return <>
    <section className="relative left-1/2 mt-8 w-[min(96vw,72rem)] -translate-x-1/2" aria-labelledby="six-man-photo-story">
      <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr] lg:items-stretch">
        <WidePhoto photo={sixManPhotos[0]} />
        <div className="flex flex-col justify-between rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <div>
            <p className="eyebrow text-primary">See the difference</p>
            <h2 id="six-man-photo-story" className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">This is why six-man football looks so open</h2>
            <p className="mt-4 leading-8 text-foreground/85">Only six defenders cover an 80-by-40-yard field. The result is more space per player, more visible one-on-one matchups and explosive plays that can flip a game almost instantly.</p>
          </div>
          <p className="mt-8 border-t border-border pt-5 font-display text-2xl leading-snug">The rules matter. The space is what you notice first.</p>
        </div>
      </div>
    </section>

    <section className="mt-10 rounded-2xl border border-border bg-surface p-5 sm:p-7" aria-labelledby="six-man-at-a-glance">
      <p className="eyebrow text-primary">Six-man at a glance</p>
      <h2 id="six-man-at-a-glance" className="mt-2 font-display text-3xl font-semibold">The rules that make it a different game</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {ruleCards.map(([value, label, body]) => <div key={label} className="rounded-2xl border border-border bg-background p-5 shadow-sm">
          <p className="font-display text-4xl font-semibold text-primary">{value}</p>
          <p className="mt-1 font-semibold">{label}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
        </div>)}
      </div>
    </section>

    <section className="relative left-1/2 mt-12 w-[min(96vw,68rem)] -translate-x-1/2" aria-labelledby="six-v-eleven">
      <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
        <WidePhoto photo={sixManPhotos[1]} />
        <div>
          <p className="eyebrow text-primary">Side-by-side</p>
          <h2 id="six-v-eleven" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Six-man vs. 11-man football</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-background shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface"><tr><th className="p-4 font-semibold">Rule</th><th className="p-4 font-semibold">Texas six-man</th><th className="p-4 font-semibold">11-man comparison</th></tr></thead>
              <tbody>{differences.map(([rule, six, eleven]) => <tr key={rule} className="border-t border-border"><th className="p-4 font-semibold">{rule}</th><td className="p-4">{six}</td><td className="p-4 text-muted-foreground">{eleven}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section className="relative left-1/2 mt-14 w-[min(96vw,66rem)] -translate-x-1/2" aria-labelledby="six-man-field">
      <div className="grid gap-6 rounded-3xl border border-border bg-surface p-5 sm:p-7 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow text-primary">Field geometry</p>
          <h2 id="six-man-field" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">What an 80-by-40-yard field looks like</h2>
          <p className="mt-4 leading-8">The standard UIL six-man field is shorter and narrower, but the reduction from 11 defenders to six creates enormous space. Midfield is the 40-yard line, and every defender has more ground to protect.</p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">The public-domain field diagram at right shows the basic dimensions. UIL rules remain the controlling source for competition specifications.</p>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-border bg-background p-4 shadow-sm">
          <img
            src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Six_man_field.png?width=1200"
            alt="Diagram of a typical six-man football field showing the shorter 80-yard field"
            width={1200}
            height={657}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full"
          />
          <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
            Typical six-man field diagram · <a href="https://commons.wikimedia.org/wiki/File:Six_man_field.png" target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 hover:text-primary">Lothar1976 · public domain · Wikimedia Commons</a>
          </figcaption>
        </figure>
      </div>
    </section>

    <section className="mt-12 rounded-2xl border border-border bg-surface p-5 sm:p-7" aria-labelledby="exchange-rule-visual">
      <p className="eyebrow text-primary">The rule most newcomers miss</p>
      <h2 id="exchange-rule-visual" className="mt-2 font-display text-3xl font-semibold">How the exchange rule works</h2>
      <p className="mt-3 leading-8">On most running plays, the player who receives the snap cannot simply cross the neutral zone with the ball. An exchange with another offensive player must happen first.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Step number="1" title="Snap" body="A player receives the snap and gains possession." />
        <Step number="2" title="Exchange" body="The ball changes possession by handoff, backward pass or another qualifying exchange." />
        <Step number="3" title="Advance" body="After the exchange, the offense can attack beyond the neutral zone; the original receiver can later get the ball back." />
      </div>
    </section>

    <section className="mt-12" aria-labelledby="six-man-divisions">
      <p className="eyebrow text-primary">2026–28 UIL alignment</p>
      <h2 id="six-man-divisions" className="mt-2 font-display text-3xl font-semibold">Division I vs. Division II</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5"><p className="font-display text-2xl font-semibold">Division I</p><p className="mt-2 text-3xl font-semibold text-primary">57.6–104.9</p><p className="mt-2 text-sm leading-7 text-muted-foreground">Enrollment range used for the current 1A Division I football alignment.</p></div>
        <div className="rounded-2xl border border-border bg-surface p-5"><p className="font-display text-2xl font-semibold">Division II</p><p className="mt-2 text-3xl font-semibold text-primary">57.5 and below</p><p className="mt-2 text-sm leading-7 text-muted-foreground">Enrollment range used for the current 1A Division II football alignment.</p></div>
      </div>
    </section>

    <section className="mt-12 rounded-2xl border border-border bg-surface p-5 sm:p-7" aria-labelledby="find-six-man-team">
      <p className="eyebrow text-primary">Make it real</p>
      <h2 id="find-six-man-team" className="mt-2 font-display text-3xl font-semibold">Find a Texas six-man team</h2>
      <p className="mt-3 leading-8">Use the TexasDefined team finder to move from the rules to actual 1A programs, districts and school pages. That is the fastest way to see where six-man football is played across Texas.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link to="/texas-high-school-football-teams" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Open the team finder →</Link>
        <Link to="/sports/friday-night-lights" className="rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold">Explore Friday Night Lights →</Link>
      </div>
    </section>
  </>;
}
