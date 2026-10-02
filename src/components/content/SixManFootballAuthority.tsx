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

function Step({ number, title, body }: { number: string; title: string; body: string }) {
  return <div className="rounded-xl border border-border p-5">
    <p className="font-semibold text-primary">Step {number}: {title}</p>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p>
  </div>;
}

export function SixManFootballAuthority() {
  return <>
    <section className="mt-8 rounded-xl border border-border p-5" aria-labelledby="six-man-at-a-glance">
      <p className="eyebrow text-primary">Six-man at a glance</p>
      <h2 id="six-man-at-a-glance" className="mt-2 font-display text-3xl font-semibold">The rules that make it a different game</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {ruleCards.map(([value, label, body]) => <div key={label} className="rounded-xl border border-border p-5">
          <p className="font-display text-3xl font-semibold text-primary">{value}</p>
          <p className="mt-1 font-semibold">{label}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
        </div>)}
      </div>
    </section>

    <section className="mt-10" aria-labelledby="six-v-eleven">
      <p className="eyebrow text-primary">Side-by-side</p>
      <h2 id="six-v-eleven" className="mt-2 font-display text-3xl font-semibold">Six-man vs. 11-man football</h2>
      <div className="mt-5 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead><tr><th className="p-4 font-semibold">Rule</th><th className="p-4 font-semibold">Texas six-man</th><th className="p-4 font-semibold">11-man comparison</th></tr></thead>
          <tbody>{differences.map(([rule, six, eleven]) => <tr key={rule} className="border-t border-border"><th className="p-4 font-semibold">{rule}</th><td className="p-4">{six}</td><td className="p-4 text-muted-foreground">{eleven}</td></tr>)}</tbody>
        </table>
      </div>
    </section>

    <section className="mt-12" aria-labelledby="six-man-field">
      <p className="eyebrow text-primary">Field geometry</p>
      <h2 id="six-man-field" className="mt-2 font-display text-3xl font-semibold">What an 80-by-40-yard field looks like</h2>
      <p className="mt-4 leading-8">The standard UIL six-man field is shorter and narrower, but the reduction from 11 defenders to six creates enormous space. Midfield is the 40-yard line, and every defender has more ground to protect.</p>
      <div className="mt-5 rounded-xl border border-border p-5">
        <div
          aria-label="Simplified six-man football field diagram showing an 80-yard field with midfield at the 40-yard line"
          style={{
            minHeight: 180,
            display: "grid",
            placeItems: "center",
            border: "2px solid currentColor",
            backgroundImage: "linear-gradient(to right, transparent 24.7%, currentColor 25%, transparent 25.3%, transparent 49.7%, currentColor 50%, transparent 50.3%, transparent 74.7%, currentColor 75%, transparent 75.3%)",
          }}
        >
          <strong>80 yards × 40 yards · midfield at the 40</strong>
        </div>
      </div>
    </section>

    <section className="mt-12 rounded-xl border border-border p-5" aria-labelledby="exchange-rule-visual">
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
        <div className="rounded-xl border border-border p-5"><p className="font-display text-2xl font-semibold">Division I</p><p className="mt-2 text-3xl font-semibold text-primary">57.6–104.9</p><p className="mt-2 text-sm leading-7 text-muted-foreground">Enrollment range used for the current 1A Division I football alignment.</p></div>
        <div className="rounded-xl border border-border p-5"><p className="font-display text-2xl font-semibold">Division II</p><p className="mt-2 text-3xl font-semibold text-primary">57.5 and below</p><p className="mt-2 text-sm leading-7 text-muted-foreground">Enrollment range used for the current 1A Division II football alignment.</p></div>
      </div>
    </section>

    <section className="mt-12 rounded-xl border border-border p-5" aria-labelledby="find-six-man-team">
      <p className="eyebrow text-primary">Make it real</p>
      <h2 id="find-six-man-team" className="mt-2 font-display text-3xl font-semibold">Find a Texas six-man team</h2>
      <p className="mt-3 leading-8">Use the TexasDefined team finder to move from the rules to actual 1A programs, districts and school pages. That is the fastest way to see where six-man football is played across Texas.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link to="/texas-high-school-football-teams" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Open the team finder →</Link>
        <Link to="/sports/friday-night-lights" className="rounded-full border border-border px-5 py-3 text-sm font-semibold">Explore Friday Night Lights →</Link>
      </div>
    </section>
  </>;
}
