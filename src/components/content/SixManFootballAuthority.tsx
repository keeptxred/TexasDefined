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


/**
 * Six-player field proportions are taken from the UIL 2026 six-player
 * exceptions (field dimensions, p. 1): 80 yd between goal lines, two
 * 10-yd end zones, 40 yd width, with midfield at the 40.
 *
 * The viewport uses eight SVG units per yard for both axes to preserve
 * an accurate 100:40 overall length-to-width ratio.
 */
function SixManFieldDiagram() {
  const yardLabels = [10, 20, 30, 40, 30, 20, 10];
  const hashY = [160 + 320 / 3, 160 + (320 * 2) / 3];
  const secondaryY = [160 + (320 * 13) / 120, 480 - (320 * 13) / 120];

  return (
    <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
      <p className="p-2 text-sm text-muted-foreground md:hidden">
        Swipe left on the field to see the other end zone →
      </p>
      <div className="overflow-x-auto p-2 sm:p-5" role="region" aria-label="Six-man field illustration; scroll horizontally on small screens" tabIndex={0}>
        <svg
          className="h-auto w-full" style={{ minWidth: 660 }}
          viewBox="0 0 1080 550"
          role="img"
          aria-labelledby="six-man-field-title six-man-field-description"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id="six-man-field-title">Texas six-player football field, drawn to scale</title>
          <desc id="six-man-field-description">
            The field is 100 yards long including a 10-yard end zone at each end. The playing area is 80 yards long and 40 yards wide.
            Yard lines read goal, 10, 20, 30, 40 at midfield, then 30, 20, 10 and goal. Hash marks are 40 feet from each sideline.
          </desc>
          <defs>
            <linearGradient id="six-man-grass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#246b50" />
              <stop offset="100%" stopColor="#164a39" />
            </linearGradient>
            <marker id="six-man-field-arrow" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto-start-reverse">
              <path d="M 0 0 L 7 3.5 L 0 7 Z" fill="#52665f" />
            </marker>
          </defs>

          <rect x="0" y="0" width="1080" height="550" rx="14" fill="#f5f4ed" />

          {/* Field dimensions: identical scale on both axes, including end zones. */}
          <g fill="none" stroke="#52665f" strokeWidth="2">
            <line x1="140" y1="65" x2="940" y2="65" markerStart="url(#six-man-field-arrow)" markerEnd="url(#six-man-field-arrow)" />
            <line x1="220" y1="125" x2="860" y2="125" markerStart="url(#six-man-field-arrow)" markerEnd="url(#six-man-field-arrow)" />
            <line x1="110" y1="160" x2="110" y2="480" markerStart="url(#six-man-field-arrow)" markerEnd="url(#six-man-field-arrow)" />
            {[140, 940].map((x) => <line key={x} x1={x} y1="78" x2={x} y2="153" strokeOpacity=".55" />)}
            {[220, 860].map((x) => <line key={x} x1={x} y1="131" x2={x} y2="151" strokeOpacity=".55" />)}
          </g>
          <g fill="#263b31" fontFamily="system-ui, sans-serif" fontWeight="700" textAnchor="middle">
            <text x="540" y="45" fontSize="22">100 yards including end zones</text>
            <text x="540" y="109" fontSize="19">80-yard playing field</text>
            <text x="73" y="320" transform="rotate(-90 73 320)" fontSize="19">40 yards wide</text>
          </g>

          <rect x="140" y="160" width="800" height="320" fill="url(#six-man-grass)" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={220 + i * 80} y="160" width="80" height="320" fill="#ffffff" opacity={i % 2 === 0 ? ".045" : ".012"} />
          ))}
          <rect x="140" y="160" width="80" height="320" fill="#10372e" />
          <rect x="860" y="160" width="80" height="320" fill="#10372e" />

          {/* Goal lines, five-yard lines, and the prominently marked 40-yard midfield line. */}
          {Array.from({ length: 17 }, (_, i) => (
            <line
              key={i}
              x1={220 + i * 40}
              x2={220 + i * 40}
              y1="160"
              y2="480"
              stroke="#ffffff"
              strokeWidth={i === 8 ? 3.6 : i % 2 === 0 ? 2.6 : 1.3}
              strokeOpacity={i % 2 === 0 ? 0.9 : 0.45}
            />
          ))}

          {/* UIL inbound hash marks: 40 ft from each sideline. Additional ticks: 13 ft. */}
          {Array.from({ length: 79 }, (_, i) => {
            const x = 228 + i * 8;
            return (
              <g key={i} stroke="#f9fcfa" strokeWidth="1.6" strokeOpacity={i % 5 === 4 ? 0.88 : 0.6}>
                {hashY.map((y, j) => <line key={j} x1={x} x2={x} y1={y - 5} y2={y + 5} />)}
                {secondaryY.map((y, j) => <line key={"s" + j} x1={x} x2={x} y1={y - 3} y2={y + 3} />)}
              </g>
            );
          })}
          <rect x="140" y="160" width="800" height="320" fill="none" stroke="#ffffff" strokeWidth="4" />

          <g fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="800" textAnchor="middle">
            {yardLabels.map((yard, i) => (
              <g key={i}>
                <text x={300 + i * 80} y="242" fontSize={yard === 40 ? 30 : 24}>{yard}</text>
                <text x={300 + i * 80} y="427" fontSize={yard === 40 ? 30 : 24}>{yard}</text>
              </g>
            ))}
            <text x="180" y="322" fontSize="22" letterSpacing="3" transform="rotate(-90 180 322)">END ZONE</text>
            <text x="900" y="322" fontSize="22" letterSpacing="3" transform="rotate(90 900 322)">END ZONE</text>
          </g>
          <g fill="#f0faf3" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" textAnchor="middle">
            <text x="220" y="149">GOAL</text>
            <text x="860" y="149">GOAL</text>
          </g>
          <g fill="#52665f" fontFamily="system-ui, sans-serif" fontSize="15" textAnchor="middle">
            <text x="540" y="525">Illustrative field markings • not a construction or field-striping plan</text>
          </g>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-6 text-muted-foreground sm:px-5">
        To scale: 80 yards between goal lines, 10-yard end zones, 40 yards across, and the 40-yard line at midfield.{" "}
        <a
          href="https://www.uiltexas.org/files/athletics/2026-UIL-6-Player-Exceptions-to-NCAA-Rules_AUGUST_2026_REVISION.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-2"
        >
          Official UIL 2026 field diagram
        </a>
        .
      </figcaption>
    </figure>
  );
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
      <SixManFieldDiagram />
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
