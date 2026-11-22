import type { ReactNode } from 'react';

/**
 * Aubrey-only, source-backed 2026 retrospective. All scoring statistics are
 * computed from the same final-score ledger used by the public team table.
 * Show no derived district-championship claims if the verified ledger changes.
 * No copyrighted team photographs or logos are reproduced.
 */
type Final = {
  date: string;
  opponent: string;
  district?: boolean;
  result?: string | null;
};
const SOURCES = {
  standings: 'https://www.maxpreps.com/tx/football/26-27/district/4a-1-region-i-district-4/?leagueid=8d9aee28-3ea5-463b-82c1-c731ae42f8ca',
  school: 'https://www.aubreyisd.net/live-feed/?page_no=1',
  season: 'https://www.maxpreps.com/tx/aubrey/aubrey-chaparrals/football/schedule/',
  andrews: 'https://www.mrt.com/sports/highschool/article/big-spring-permian-forsan-advance-uil-football-22530172.php',
  canyon: 'https://www.myplainview.com/canyon/sports/article/eagles-eliminate-aubrey-39-36-set-showdown-22543265.php',
  canyonScore: 'https://www.maxpreps.com/tx/football/game/aubrey-vs-canyon/11-19-2026/?c=1bd2bea1-32e4-4b09-befc-909a6e7613b6',
  conflict: 'https://www.houstonchronicle.com/sports/high-school/football/article/uil-football-texas-playoff-scores-thursday-22540994.php',
  campus: 'https://www.aubreyisd.net/page/contact-us',
  rules: 'https://www.aubreyisd.net/page/aubrey-isd-stadium-policies',
  tickets: 'https://gofan.co/app/school/TX90134',
};
function numericFinal(game: Final) {
  const match = game.result?.match(/^([WL])\s+(\d+)[–-](\d+)/);
  if (!match) return null;
  const scored = Number(match[2]);
  const conceded = Number(match[3]);
  if ((match[1] === 'W') !== (scored > conceded)) return null;
  return { scored, conceded, won: match[1] === 'W' };
}
function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a className="font-semibold text-primary underline underline-offset-4 hover:text-foreground" href={href} target="_blank" rel="noreferrer noopener">{children} ↗</a>;
}
export function AubreySeasonAuthority({ games }: { games: readonly Final[] }) {
  const district = games.filter((game) => game.district);
  const finals = district.map(numericFinal);
  // The postseason and analytical claims must never be inferred from missing results.
  const andrews = games.find((game) => game.date === '2026-11-12' && game.opponent === 'Andrews');
  const canyon = games.find((game) => game.date === '2026-11-19' && game.opponent === 'Canyon');
  if (district.length !== 7 || finals.some((f) => !f || !f.won) ||
      andrews?.result !== 'W 63–24' || canyon?.result !== 'L 36–39') return null;
  const total = finals.reduce((result, final) => ({
    for: result.for + (final?.scored ?? 0),
    against: result.against + (final?.conceded ?? 0),
    oneScore: result.oneScore + (final && final.scored - final.conceded <= 8 ? 1 : 0),
  }), { for: 0, against: 0, oneScore: 0 });
  const margins = total.for - total.against;
  return (
    <section aria-labelledby="aubrey-2026-retrospective" className="border-b border-border py-10 sm:py-14" data-aubrey-authority="2026">
      <div className="max-w-5xl">
        <p className="eyebrow text-primary">Aubrey · original season analysis</p>
        <h2 id="aubrey-2026-retrospective" className="mt-3 font-display text-3xl leading-tight sm:text-4xl">How Aubrey won District 4 and where its 2026 season ended</h2>
        <p className="mt-4 text-base leading-8 text-foreground">After three non-district losses, the Chaparrals won seven straight District 4-4A Division I games, claimed the district title and reached the second round of the UIL playoffs. Aubrey finished <strong>8–4 overall and 7–0 in district</strong>. The title is confirmed both by the school district's announcement and the published district standings.</p>
      </div>
      <dl className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-3">
        <div className="bg-surface p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">District scoring</dt><dd className="mt-2 font-display text-3xl font-semibold">{total.for}–{total.against}</dd><p className="mt-2 text-sm leading-6 text-muted-foreground">Points scored–conceded in seven district games</p></div>
        <div className="bg-surface p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">District scoring margin</dt><dd className="mt-2 font-display text-3xl font-semibold">+{margins}</dd><p className="mt-2 text-sm leading-6 text-muted-foreground">Calculated from the verified final-score rows</p></div>
        <div className="bg-surface p-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Close district wins</dt><dd className="mt-2 font-display text-3xl font-semibold">{total.oneScore} of 7</dd><p className="mt-2 text-sm leading-6 text-muted-foreground">Decided by eight points or fewer</p></div>
      </dl>
      <p className="mt-4 max-w-5xl text-sm leading-7 text-muted-foreground">TexasDefined computed these figures from the dated 2026 score table above, not an independent box-score feed. The three seven-point victories against Springtown, Decatur and Lake Dallas mattered as much to the unbeaten district finish as the high-scoring wins over Castleberry, Ranchview, Alvarado and Godley. <Source href={SOURCES.standings}>Independent district table</Source></p>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="border-l-4 border-primary bg-surface p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Bi-district · November 12</p>
          <h3 className="mt-2 font-display text-2xl">Aubrey 63, Andrews 24</h3>
          <p className="mt-3 text-sm leading-7 text-foreground">The Chaparrals opened the postseason with a win over Andrews at Mustang Bowl in Sweetwater. The neutral-site result advanced Aubrey to an area-round meeting with Canyon. It was the eighth straight Aubrey victory after the early non-district losses.</p>
          <p className="mt-4 text-sm"><a href="/texas-high-school-football-teams/andrews" className="font-semibold text-primary underline underline-offset-4">Andrews Mustangs team guide →</a></p>
          <p className="mt-3 text-sm"><Source href={SOURCES.andrews}>Reported bi-district result</Source></p>
        </article>
        <article className="border-l-4 border-primary bg-surface p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Area round · November 19</p>
          <h3 className="mt-2 font-display text-2xl">Canyon 39, Aubrey 36</h3>
          <p className="mt-3 text-sm leading-7 text-foreground">At Bulldog Stadium in Burkburnett, Canyon led 36–7 at halftime. Aubrey scored 29 points after the break, but Canyon's 37-yard field goal helped preserve a 39–36 win. The comeback did not extend Aubrey's season into the regional semifinals.</p>
          <p className="mt-4 text-sm"><a href="/texas-high-school-football-teams/canyon" className="font-semibold text-primary underline underline-offset-4">Canyon Eagles team guide →</a></p>
          <p className="mt-3 text-sm"><Source href={SOURCES.canyon}>Detailed area-round reporting</Source></p>
        </article>
      </div>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl">Why some Canyon score reports disagree</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">A statewide roundup published a Canyon 39, Aubrey 37 line. The game-specific MaxPreps result and the detailed Canyon News report both confirm <strong>39–36</strong>. TexasDefined follows the corroborated game-specific final and leaves the conflicting roundup visible for readers to assess. <Source href={SOURCES.canyonScore}>Game result</Source> · <Source href={SOURCES.conflict}>Conflicting roundup</Source></p>
        </div>
        <div>
          <h3 className="font-display text-2xl">2026 stadium and ticket guidance</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Chaparral Stadium is at the Aubrey High School campus, 510 Spring Hill Road. The Andrews and Canyon playoff games used neutral sites in Sweetwater and Burkburnett: the Aubrey home ticket link and home-stadium policies do not establish admission or parking rules at those venues.</p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm"><Source href={SOURCES.campus}>Aubrey ISD address</Source><Source href={SOURCES.rules}>Official stadium rules</Source><Source href={SOURCES.tickets}>School's GoFan page</Source></p>
        </div>
      </div>
      <p className="mt-7 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">Research notes: 2026 regular season and postseason, reviewed November 22, 2026. <Source href={SOURCES.season}>Complete game ledger</Source> · <Source href={SOURCES.school}>Aubrey ISD district-title announcement</Source>. The analysis uses published results only; no interviews, field photographs, proprietary statistics or school affiliation are claimed.</p>
    </section>
  );
}
