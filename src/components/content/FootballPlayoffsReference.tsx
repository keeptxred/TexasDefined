const bracketUrl = "https://realignment.uiltexas.org/alignments/2026/FB_BB_VB_Blank_Brackets.pdf";
const rows = [
  ["1A six-man", "Top two", "Before the season", "32 slots; five rounds"],
  ["2A–5A", "Top four", "Before the season", "64 slots; six rounds"],
  ["6A", "Top four", "Two larger qualifiers to I; two smaller to II", "64 slots per division; six rounds"],
];

export function FootballPlayoffsReference() {
  return <section className="my-10 space-y-8" aria-labelledby="playoffs-reference-heading" data-playoffs-reference="2026">
    <div>
      <p className="text-sm text-muted-foreground">Last verified October 13, 2026 · UIL rules and 2026–27 calendar</p>
      <h2 id="playoffs-reference-heading" className="mt-3 font-display text-2xl font-semibold">Find your school’s playoff path</h2>
      <p className="mt-3 leading-7">Start with the <a className="underline underline-offset-4" href="/texas-high-school-football-teams">school’s UIL classification and district</a>. Use our <a className="underline underline-offset-4" href="/article/texas-high-school-football-classifications-1a-6a">classification explainer</a> for enrollment rules and our <a className="underline underline-offset-4" href="/article/texas-high-school-football-2026-season-calendar">2026 calendar</a> for playing windows.</p>
      <div className="mt-5 overflow-x-auto rounded border border-border" tabIndex={0} role="region" aria-label="Playoff comparison table, scroll horizontally on small screens">
        <table className="w-full text-left text-sm" style={{ minWidth: "34rem" }}>
          <caption className="p-3 text-left font-semibold">UIL qualification and championship path, by division</caption>
          <thead className="bg-muted"><tr>{["Class", "Qualifiers per district", "When divisions are chosen", "Full bracket path"].map(label => <th key={label} scope="col" className="p-3">{label}</th>)}</tr></thead>
          <tbody>{rows.map(([classification, ...cells]) => <tr key={classification} className="border-t border-border"><th scope="row" className="p-3">{classification}</th>{cells.map(cell => <td key={cell} className="p-3 align-top">{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="mt-3 text-sm leading-6">Sources: <a className="underline" href="https://www.uiltexas.org/football/playoff-brackets">UIL qualification rules</a> and <a className="underline" href={bracketUrl}>2026 blank brackets, pages 4–6 (PDF)</a>. Slots describe a full bracket; a vacancy or bye changes the number of games actually played.</p>
    </div>
    <div>
      <h3 className="font-display text-xl font-semibold">A 6A district example: finish and enrollment are different</h3>
      <p className="mt-3 leading-7">Imagine these four qualifying schools, using illustrative realignment enrollments: A finishes first with 2,500 students; B second with 3,600; C third with 2,800; D fourth with 3,200. B and D enter Division I. A and C enter Division II. A remains district champion even though it enters the smaller-enrollment bracket.</p>
      <p className="mt-3 leading-7">Within each division, the better district finisher is its district’s W representative and the other is R. Here B is Division I W and D is R; A is Division II W and C is R. A nonqualifying school’s enrollment does not change the split. Source: <a className="underline" href="https://www.uiltexas.org/football/manual/football-manual-post-season-information">UIL’s qualifier and enrollment rules</a>.</p>
    </div>
    <figure className="rounded border border-border p-5">
      <figcaption className="font-display text-xl font-semibold">Read one small branch of the bracket</figcaption>
      <p className="mt-3 text-sm leading-6">Hypothetical 2A–5A example, within the same class and division. W means district winner; R is runner-up, T is third place and F is fourth place.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded border border-border p-4"><strong>Bi-district game 1</strong><p className="mt-2">District 1 winner (W1) vs. District 2 fourth place (F2)</p></div>
        <div className="rounded border border-border p-4"><strong>Bi-district game 2</strong><p className="mt-2">District 4 runner-up (R4) vs. District 3 third place (T3)</p></div>
        <div className="rounded border border-primary p-4 sm:col-span-2"><strong>Area game</strong><p className="mt-2">Winner of game 1 vs. winner of game 2. The winner advances to the regional round.</p></div>
      </div>
      <p className="mt-4 text-sm leading-6">The other first-round pairings include first vs. fourth and second vs. third across paired districts. In 1A and each 6A division, the paired-district slots are W vs. R. There is no weekly reseeding. <a className="underline" href={bracketUrl}>Check the complete UIL bracket</a> for the next branch.</p>
    </figure>
    <aside className="border-l-2 border-primary pl-5 text-sm leading-7" aria-label="Official playoff sources">
      <p><a className="underline" href="https://www.uiltexas.org/policy/constitution/athletics/football">Section 1250(i)</a> governs playoff sites; <a className="underline" href="https://www.uiltexas.org/football">UIL’s 2026–27 calendar</a> supplies this season’s dates. The <a className="underline" href="https://www.uiltexas.org/football/page/Football-playoff-information-handbook1">handbook and FAQs page</a> still says the 2026 handbook is forthcoming and contains older examples.</p>
      <p className="mt-3">For championship tickets and current broadcast announcements, use the <a className="underline" href="https://www.uiltexas.org/football/state">official UIL state-finals page</a>. For a specific matchup, check the schools’ announcements and our <a className="underline" href="/sports-venues/high-school-football">stadium guides</a>.</p>
    </aside>
  </section>;
}
