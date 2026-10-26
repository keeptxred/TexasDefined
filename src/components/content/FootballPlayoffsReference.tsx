const bracketUrl = "https://realignment.uiltexas.org/alignments/2026/FB_BB_VB_Blank_Brackets.pdf";
const elevenManRounds = ["Bi-district", "Area", "Regional", "Quarterfinal", "Semifinal", "State final"];
const sixManRounds = ["Bi-district", "Regional", "Quarterfinal", "Semifinal", "State final"];
const rows = [
  ["1A six-man", "Top two", "Before the season", "32 slots; five rounds"],
  ["2A–5A", "Top four", "Before the season", "64 slots; six rounds"],
  ["6A", "Top four", "Two larger qualifiers to I; two smaller to II", "64 slots per division; six rounds"],
];

export function FootballPlayoffsReference() {
  return <section className="my-10 space-y-8" aria-labelledby="playoffs-reference-heading" data-playoffs-reference="2026">
    <div className="border-l-2 border-primary pl-5" aria-label="Quick answer">
      <p className="font-semibold">How the UIL playoffs work</p>
      <p className="mt-3 leading-7">Teams qualify through district standings, then play a fixed, single-elimination bracket: win and advance, lose and the season ends. Enrollment determines Division I or II. The six classifications crown 12 state champions.</p>
      <p className="mt-3 text-sm leading-6">This guide covers UIL football in 2026. TAPPS and other private-school associations run separate playoffs.</p>
    </div>
    <div id="playoff-bracket-actions" className="rounded-xl border border-primary/30 bg-surface p-5 sm:p-6" aria-label="Find official playoff brackets">
      <p className="text-xs font-bold uppercase tracking-wide text-primary">Follow the 2026 postseason</p>
      <h2 className="mt-2 font-display text-2xl font-semibold">Looking for your team’s bracket?</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Use the class and division picker to open any of the 12 official UIL brackets. Matchups and results come from UIL and MaxPreps, not a prediction.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href="/texas-high-school-football-playoff-brackets" className="inline-flex min-h-11 items-center justify-center rounded bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">View all 2026 playoff brackets →</a>
        <a href="/texas-high-school-football-teams" className="inline-flex min-h-11 items-center justify-center rounded border border-border px-5 py-3 text-sm font-semibold hover:border-primary">Find my school →</a>
      </div>
      <a href="https://www.uiltexas.org/football/playoff-brackets" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm underline underline-offset-4">Official UIL playoff brackets ↗</a>
    </div>
    <nav aria-label="On this page" className="flex flex-wrap gap-x-5 gap-y-3 border-y border-border py-4 text-sm font-semibold">
      <a href="#playoff-bracket-actions" className="text-primary underline underline-offset-4">Find brackets</a>
      <a href="#playoffs-reference-heading" className="text-primary underline underline-offset-4">Who qualifies</a>
      <a href="#playoff-dates-heading" className="text-primary underline underline-offset-4">2026 dates</a>
      <a href="#six-a-example" className="text-primary underline underline-offset-4">6A example</a>
      <a href="#playoff-rounds-heading" className="text-primary underline underline-offset-4">Bracket and rounds</a>
      <a href="#who-gets-home-field" className="text-primary underline underline-offset-4">Home field</a>
      <a href="#frequently-asked-questions" className="text-primary underline underline-offset-4">FAQs</a>
    </nav>
    <div>
      <p className="text-sm text-muted-foreground">Last verified October 20, 2026 · UIL rules and 2026–27 calendar</p>
      <h2 id="playoffs-reference-heading" className="scroll-mt-28 mt-3 font-display text-2xl font-semibold">Find your school’s playoff path</h2>
      <p className="mt-3 leading-7">Start with the <a className="underline underline-offset-4" href="/texas-high-school-football-teams">school’s UIL classification and district</a>. Use our <a className="underline underline-offset-4" href="/article/texas-high-school-football-classifications-1a-6a">classification explainer</a> for enrollment rules and our <a className="underline underline-offset-4" href="/article/texas-high-school-football-2026-season-calendar">2026 calendar</a> for playing windows.</p>
      <div className="mt-5 overflow-x-auto rounded border border-border" tabIndex={0} role="region" aria-label="Playoff comparison table, scroll horizontally on small screens">
        <table className="w-full text-left text-sm" style={{ minWidth: "34rem" }}>
          <caption className="p-3 text-left font-semibold">UIL qualification and championship path, by division</caption>
          <thead className="bg-muted"><tr>{["Class", "Qualifiers per district", "When divisions are chosen", "Full bracket path"].map(label => <th key={label} scope="col" className="p-3">{label}</th>)}</tr></thead>
          <tbody>{rows.map(([classification, ...cells]) => <tr key={classification} className="border-t border-border"><th scope="row" className="p-3">{classification}</th>{cells.map(cell => <td key={cell} className="p-3 align-top">{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="mt-3 text-sm leading-6">Sources: <a target="_blank" rel="noopener noreferrer" className="underline" href="https://www.uiltexas.org/football/playoff-brackets">UIL qualification rules</a> and <a target="_blank" rel="noopener noreferrer" className="underline" href={bracketUrl}>2026 blank brackets, pages 4–6 (PDF)</a>. Slots describe a full bracket; a vacancy or bye changes the number of games actually played.</p>
    </div>
    <section aria-labelledby="playoff-dates-heading">
      <h2 id="playoff-dates-heading" className="scroll-mt-28 font-display text-2xl font-semibold">2026 playoff dates</h2>
      <dl className="mt-4 divide-y divide-border">
        {[
          ["District certification", "November 7"],
          ["Playoff week 1", "November 12–14"],
          ["Playoff week 2", "November 19–21"],
          ["Playoff week 3", "November 26–28"],
          ["Playoff week 4", "December 3–5"],
          ["Playoff week 5", "December 10–12"],
          ["State championships", "December 16–19"],
        ].map(([label, date]) => <div key={label} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3"><dt className="font-semibold">{label}</dt><dd>{date}</dd></div>)}
      </dl>
      <p className="mt-3 text-sm leading-6">These are UIL playing windows, not individual kickoff times. 2A Division II may play December 9 in playoff week 5. In 1A, five rounds lead to a title; 2A–6A have six. A bye or vacancy can reduce the games played. <a href="https://www.uiltexas.org/football" target="_blank" rel="noopener noreferrer" className="underline">Official UIL calendar</a>.</p>
    </section>
    <div>
      <h2 id="six-a-example" className="scroll-mt-28 font-display text-2xl font-semibold">A 6A district example: finish and enrollment are different</h2>
      <p className="mt-3 leading-7">Only the four qualifying schools are compared. This hypothetical district shows why first place does not automatically mean Division I:</p>
      <ol className="mt-4 space-y-3">
        {[
          ["1st: School A", "2,500 students → Division II"],
          ["2nd: School B", "3,600 students → Division I"],
          ["3rd: School C", "2,800 students → Division II"],
          ["4th: School D", "3,200 students → Division I"],
        ].map(([school, result]) => <li key={school} className="rounded border border-border p-3"><strong>{school}</strong><span className="mt-1 block">{result}</span></li>)}
      </ol>
      <div className="mt-4 grid gap-3 sm:grid-cols-2" aria-label="Hypothetical 6A division assignments">
        <section className="rounded-lg border border-border bg-surface p-4" aria-labelledby="division-i-example">
          <h3 id="division-i-example" className="font-semibold">Division I · larger qualifiers</h3>
          <p className="mt-2 text-sm">School B (3,600) and School D (3,200)</p>
        </section>
        <section className="rounded-lg border border-border bg-surface p-4" aria-labelledby="division-ii-example">
          <h3 id="division-ii-example" className="font-semibold">Division II · smaller qualifiers</h3>
          <p className="mt-2 text-sm">School A (2,500) and School C (2,800)</p>
        </section>
      </div>
      <p className="mt-3 leading-7">B and D are the two larger qualifiers. A remains district champion while entering Division II. These are illustrative realignment enrollments, not actual 2026 teams.</p>
      <p className="mt-3 leading-7">Within each division, the better district finisher is its district’s W representative and the other is R. Here B is Division I W and D is R; A is Division II W and C is R. A nonqualifying school’s enrollment does not change the split. Source: <a target="_blank" rel="noopener noreferrer" className="underline" href="https://www.uiltexas.org/football/manual/football-manual-post-season-information">UIL’s qualifier and enrollment rules</a>.</p>
    </div>
    <section aria-labelledby="playoff-rounds-heading">
      <h2 id="playoff-rounds-heading" className="scroll-mt-28 font-display text-2xl font-semibold">The rounds on the road to a title</h2>
      <figure className="mt-5 space-y-6" aria-label="UIL postseason progression by classification">
        {[
          { label: "2A–6A · six rounds", rounds: elevenManRounds },
          { label: "1A six-man · five rounds (no area round)", rounds: sixManRounds },
        ].map(({ label, rounds }) => (
          <div key={label}>
            <h3 className="mb-3 text-sm font-semibold">{label}</h3>
            <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {rounds.map((round, index) => (
                <li key={round} className={"min-w-0 rounded-lg border p-3 text-sm " + (index === rounds.length - 1 ? "border-primary bg-primary/10" : "border-border bg-surface")}>
                  <span className="block text-xs font-semibold text-muted-foreground">Round {index + 1}</span>
                  <strong className="mt-1 block break-words">{round}</strong>
                </li>
              ))}
            </ol>
          </div>
        ))}
        <p className="text-sm text-muted-foreground">Follow each row left to right, then continue to the next line if it wraps. Winners advance through fixed bracket positions; games are not reseeded.</p>
      </figure>
      <p className="mt-3 text-sm leading-6">Each win moves a team to the next fixed bracket slot. A team playing every round needs six wins in 2A–6A or five in 1A.</p>
    </section>
    <figure className="rounded border border-border p-5">
      <figcaption className="font-display text-xl font-semibold">Read one small branch of the bracket</figcaption>
      <p className="mt-3 text-sm leading-6">Hypothetical 2A–5A example, within one class and division. Follow the two opening games into their shared area game; the official bracket fixes each branch.</p>
      <div className="mt-5 grid gap-x-5 gap-y-3 sm:grid-cols-2">
        <div className="rounded border border-border p-4"><strong>Bi-district game 1</strong><p className="mt-2">District 1 champion vs. District 2 fourth-place team</p><p className="mt-3 text-sm font-semibold text-primary">Winner advances to the area game ↓</p></div>
        <div className="rounded border border-border p-4"><strong>Bi-district game 2</strong><p className="mt-2">District 4 runner-up vs. District 3 third-place team</p><p className="mt-3 text-sm font-semibold text-primary">Winner advances to the area game ↓</p></div>
        <svg className="hidden h-10 w-full text-primary sm:col-span-2 sm:flex" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M24 0 V8 H50 V20 M76 0 V8 H50" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="rounded border border-primary p-4 sm:col-span-2"><strong>Area game</strong><p className="mt-2">Winner of game 1 vs. winner of game 2. The winner advances to the regional round.</p></div>
      </div>
      <p className="mt-4 text-sm leading-6">The other first-round pairings include first vs. fourth and second vs. third across paired districts. In 1A and each 6A division, the paired-district slots are W vs. R. There is no weekly reseeding. <a target="_blank" rel="noopener noreferrer" className="underline" href={bracketUrl}>Check the complete UIL bracket</a> for the next branch.</p>
    </figure>
    <aside className="border-l-2 border-primary pl-5 text-sm leading-7" aria-label="Official playoff sources">
      <p><a target="_blank" rel="noopener noreferrer" className="underline" href="https://www.uiltexas.org/policy/constitution/athletics/football">Section 1250(i)</a> governs playoff sites; <a target="_blank" rel="noopener noreferrer" className="underline" href="https://www.uiltexas.org/football">UIL’s 2026–27 calendar</a> supplies this season’s dates. The <a target="_blank" rel="noopener noreferrer" className="underline" href="https://www.uiltexas.org/football/page/Football-playoff-information-handbook1">handbook and FAQs page</a> was awaiting its 2026 handbook when checked October 13; do not use its older dates as the 2026 calendar.</p>
      <p className="mt-3">For championship tickets and current broadcast announcements, use the <a target="_blank" rel="noopener noreferrer" className="underline" href="https://www.uiltexas.org/football/state">official UIL state-finals page</a>. For a specific matchup, check the schools’ announcements and our <a className="underline" href="/sports-venues/high-school-football">stadium guides</a>.</p>
    </aside>
  </section>;
}
