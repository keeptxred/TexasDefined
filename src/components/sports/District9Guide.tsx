/**
 * District 9-6A evergreen fan guide. Editorial sources reviewed October 29, 2026.
 * No scores, standings, win/loss counts, results ingestion, or live schedule claims.
 * Official sources: UIL, Garland ISD, Wylie ISD and dated Wylie local news.
 */
const schoolGroups = [
  {
    district: 'Garland ISD',
    detail: 'Garland, Lakeview Centennial, Rowlett, Sachse, North Garland and South Garland. Six public high schools share two major GISD varsity football stadiums.',
    source: 'https://garlandisd.net/programs-services/athletics',
    label: 'Garland ISD athletics',
  },
  {
    district: 'Wylie ISD',
    detail: 'Wylie High School and Wylie East High School. This is Wylie ISD in Collin County, not Abilene Wylie ISD.',
    source: 'https://athletics.wylieisd.net/',
    label: 'Wylie ISD athletics',
  },
] as const;

const venueGuide = [
  {
    name: 'Williams Stadium',
    location: '510 Stadium Drive, Garland, TX 75040',
    detail: 'Garland ISD football venue. The district warns that construction limits visitor-side parking; its stadium page identifies nearby Technology Center parking as an alternative.',
    source: 'https://garlandisd.net/about/facility-directory/williams-stadium',
    label: 'Official Williams Stadium information',
  },
  {
    name: 'Homer B. Johnson Stadium',
    location: '1209 E. Centerville Road, Garland, TX 75041',
    detail: 'Garland ISD football venue, previously known as Memorial Stadium. Confirm the event-specific home and visitor sides with GISD.',
    source: 'https://www.garlandisd.net/about/facility-directory/homer-b-johnson-stadium',
    label: 'Official HBJ Stadium information',
  },
  {
    name: 'Wylie ISD Stadium',
    location: 'Near FM 544 and Woodbridge Parkway, Wylie, TX 75098',
    detail: 'Wylie ISD publishes separate home- and visitor-side approach directions and accessibility parking. Verify the side shown on your ticket before traveling.',
    source: 'https://athletics.wylieisd.net/facilities/wylie-stadium/directions-parking',
    label: 'Official stadium directions and accessible parking',
  },
] as const;

const officialLinks = [
  { title: 'Garland ISD varsity athletic calendar', url: 'https://www.garlandisd.net/calendars/athletic-events-calendar', context: 'Filter by date and team; the combined calendar also lists JV and freshman events.' },
  { title: 'Garland ISD tickets and stadium sales', url: 'https://garlandisd.net/programs-services/athletics/ticket-sales', context: 'District-approved HomeTown purchasing; consult GISD for varsity football gate options.' },
  { title: 'Garland ISD clear-bag guidance', url: 'https://www.garlandisd.net/school-operations/clear-bag-policy', context: 'Check current bag rules and security procedures before attending.' },
  { title: 'Wylie High varsity football', url: 'https://athletics.wylieisd.net/schools/whs/mens-football', context: 'Use the Wylie Pirates school program page for the current varsity calendar.' },
  { title: 'Wylie East varsity football', url: 'https://athletics.wylieisd.net/schools/wehs/mens-football', context: 'Use the Wylie East Raiders school program page for the current varsity calendar.' },
  { title: 'Wylie ISD official ticketing', url: 'https://events.hometownticketing.com/boxoffice/wylieisd', context: 'Select the school, correct game and stadium side; this is not an affiliate sale.' },
  { title: 'Wylie ISD stadium bag policy', url: 'https://athletics.wylieisd.net/facilities/bag-policy', context: 'Stadium-specific security rules may differ from Garland facilities.' },
] as const;

// Selected first-party varsity fixtures from the Oct 29 school calendars, not
// a live schedule, reported finals, or a standings feed.
const varsityFixtureSnapshot = [
  { date: 'Thu, Oct. 29', label: 'Sachse at Wylie East', time: '7:00 p.m. CDT', venue: 'Wylie ISD Stadium', source: 'https://athletics.wylieisd.net/schools/wehs/mens-football' },
  { date: 'Thu, Oct. 29', label: 'South Garland at Garland', time: '7:00 p.m. CDT', venue: 'Williams Stadium', source: 'https://www.garlandisd.net/calendars/athletic-events-calendar' },
  { date: 'Fri, Oct. 30', label: 'Rowlett at Wylie', time: '7:00 p.m. CDT', venue: 'Wylie ISD Stadium', source: 'https://athletics.wylieisd.net/schools/whs/mens-football' },
  { date: 'Thu, Nov. 5', label: 'Wylie East at Lakeview Centennial', time: '4:00 p.m. CST (listed; reconfirm)', venue: 'Homer B. Johnson Stadium', source: 'https://athletics.wylieisd.net/schools/wehs/mens-football' },
  { date: 'Fri, Nov. 6', label: 'Wylie at South Garland', time: '7:00 p.m. CST', venue: 'Homer B. Johnson Stadium', source: 'https://athletics.wylieisd.net/schools/whs/mens-football' },
] as const;

const questions = [
  { question: 'Which schools are in UIL 6A District 9 for 2026–28?', answer: 'Garland, Lakeview Centennial, Rowlett, Sachse, North Garland, South Garland, Wylie and Wylie East. Garland ISD operates six of those programs and Wylie ISD operates two.' },
  { question: 'Why is Naaman Forest missing?', answer: 'The 2026 UIL realignment reduced District 9 from nine teams to eight. Garland Naaman Forest moved to 5A Division I District 6, so it is not a 2026–28 member of 6A District 9.' },
  { question: 'Do the 6A District 9 schools already belong to Division I or Division II?', answer: 'No. Four qualifying teams advance after district play. Of those four, the two schools with the higher official UIL enrollments enter Division I, while the other two enter Division II.' },
  { question: 'Where do District 9 games take place?', answer: 'Garland ISD uses Williams Stadium and Homer B. Johnson Stadium. Wylie ISD uses Wylie ISD Stadium. The scheduled home school does not necessarily identify the stadium or entrance; always check the actual varsity event listing.' },
  { question: 'Where can I buy official varsity football tickets?', answer: 'Use the host district’s approved ticket links. Garland ISD and Wylie ISD provide separate ticket portals, and the correct school, opponent, date and stadium side matter.' },
] as const;

export function District9Guide() {
  return (
    <section id="district-9-authority" data-football-district-section="district-9-guide"
      className="border-b border-border py-10">
      <p className="eyebrow text-primary">Region II · 2026–28 UIL alignment · Garland & Wylie</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">District 9 football: teams, tickets, stadiums and UIL rules</h2>
      <p className="mt-4 max-w-4xl text-base leading-8 text-foreground">
        UIL 6A District 9 brings together six Garland ISD high schools and two Wylie ISD high schools
        in the eastern Dallas–Fort Worth area. The 2026–28 alignment is an eight-school district,
        unlike the nine-school group from the preceding cycle. Naaman Forest moved to 5A Division I
        District 6, while the other eight schools remain in 6A District 9.
        {' '}<a className="font-semibold text-primary underline underline-offset-4"
          href="https://realignment.uiltexas.org/alignments/2026/2026_RR-Packet.pdf"
          target="_blank" rel="noopener noreferrer">Official UIL 2026–28 alignment ↗</a>
        {' · '}<a className="font-semibold text-primary underline underline-offset-4"
          href="https://wylienews.com/2026/02/02/uil-announces-2026-27-realignment/"
          target="_blank" rel="noopener noreferrer">Local realignment reporting ↗</a>
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {schoolGroups.map((group) => <div key={group.district} className="border border-border p-5">
          <h3 className="font-display text-2xl">{group.district}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{group.detail}</p>
          <a className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4"
            href={group.source} target="_blank" rel="noopener noreferrer">{group.label} ↗</a>
        </div>)}
      </div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">
        The UIL roster lower on this page links to all eight TexasDefined school profiles. The UIL
        sometimes abbreviates Lakeview Centennial and prefixes Sachse or Rowlett with “Garland”;
        the display names are normalized for readers while enrollment and official team identity
        remain tied to the published UIL records.
      </p>

      <div id="district-9-calendar" className="mt-10">
        <h3 className="font-display text-2xl">Selected 2026 varsity matchups</h3>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
          This is a source-dated <strong>October 29, 2026 varsity fixture snapshot</strong>,
          not a full season calendar, live upcoming-games feed or reported-score table.
          The schedule includes only matches explicitly labeled varsity by the host school or
          its district. Kickoffs and stadium assignments may change, particularly the published
          November 5 afternoon listing, so always reconfirm with the linked school before traveling.
        </p>
        <div className="mt-5 overflow-x-auto border border-border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs text-muted-foreground">
              <tr><th scope="col" className="p-3">Date</th><th scope="col" className="p-3">Varsity matchup</th><th scope="col" className="p-3">Published kickoff / venue</th><th scope="col" className="p-3">Source</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {varsityFixtureSnapshot.map((game) => <tr key={game.date + game.label}>
                <td className="p-3 whitespace-nowrap">{game.date}, 2026</td>
                <th scope="row" className="p-3 font-semibold">{game.label}</th>
                <td className="p-3">{game.time} · {game.venue}</td>
                <td className="p-3"><a href={game.source} target="_blank" rel="noopener noreferrer"
                  className="font-semibold text-primary underline underline-offset-4">Official varsity calendar ↗</a></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          A past fixture remains a historical calendar entry, never automatically a final or
          a game result. Use Garland ISD's or Wylie ISD's complete schedule links below for all
          other district and non-district varsity dates.
        </p>
      </div>

      <div id="district-9-game-day" className="mt-10">
        <h3 className="font-display text-2xl">Where to watch District 9 football</h3>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
          Football stadiums are not interchangeable with school campus addresses. Always
          verify the specific varsity event, current venue, visitor entrance, accessibility,
          parking and any weather change using the host district’s information.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {venueGuide.map((venue) => <div key={venue.name} className="border border-border p-5">
            <h4 className="font-display text-xl">{venue.name}</h4>
            <p className="mt-2 text-xs font-semibold text-foreground">{venue.location}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{venue.detail}</p>
            <a href={venue.source} target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">{venue.label} ↗</a>
          </div>)}
        </div>
      </div>

      <div id="district-9-sources" className="mt-10">
        <h3 className="font-display text-2xl">Official varsity schedules, admission and safety</h3>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">
          The Garland district calendar combines different age groups. Select only entries labeled
          varsity football when planning a visit. Wylie’s separate school athletics pages and official
          district ticket portal help prevent confusing the two Wylie high schools, or Wylie, Texas
          with Abilene Wylie. TexasDefined does not guarantee that listed tickets remain available.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {officialLinks.map((link) => <a key={link.url} href={link.url} target="_blank"
            rel="noopener noreferrer" className="border border-border p-4 hover:border-primary">
            <strong className="text-sm text-primary underline underline-offset-4">{link.title} ↗</strong>
            <span className="mt-2 block text-xs leading-6 text-muted-foreground">{link.context}</span>
          </a>)}
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          Official athletics sources and venue policies last editorially checked
          <time dateTime="2026-10-29"> October 29, 2026</time>. The GitHub freshness job checks
          the authority sources on a recurring schedule, but that does not constitute
          real-time schedule or ticket validation.
        </p>
      </div>

      <div id="district-9-playoffs" className="mt-10 border-l-2 border-primary bg-surface px-5 py-6">
        <h3 className="font-display text-2xl text-foreground">How District 9 advances to the postseason</h3>
        <p className="mt-3 text-sm leading-7">
          District 9 is in Region II. The top four district finishers advance to the Class 6A playoffs.
          The two larger-enrollment qualifiers go to Division I and the other two to Division II.
          UIL enrollment figures used for classification, not current student headcounts or an
          unofficial standings table, control that split. Region II District 9’s bi-district
          pairing is against District 10; the certified qualifiers and specific games are not
          known from the alignment alone.
        </p>
        <p className="mt-3 text-sm leading-7">
          For the 2026 season, the UIL lists <strong>November 7</strong> as the district
          certification deadline and <strong>November 12–14</strong> for the opening
          playoff round. Do not interpret a preseason or published school calendar as a certified bracket.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="https://www.uiltexas.org/football" target="_blank" rel="noopener noreferrer"
            className="text-primary underline underline-offset-4">UIL season dates ↗</a>
          <a href="https://www.uiltexas.org/football/playoff-brackets" target="_blank" rel="noopener noreferrer"
            className="text-primary underline underline-offset-4">Official UIL playoff brackets ↗</a>
          <a href="/texas-high-school-football-playoff-brackets"
            className="text-primary underline underline-offset-4">TexasDefined playoff guide →</a>
        </div>
      </div>

      <div id="district-9-faq" className="mt-10">
        <h3 className="font-display text-2xl">District 9 football FAQ</h3>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {questions.map((entry) => <div key={entry.question} className="py-4">
            <h4 className="font-semibold text-foreground">{entry.question}</h4>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{entry.answer}</p>
          </div>)}
        </div>
      </div>

      <p className="mt-8 text-sm leading-7 text-muted-foreground">
        <strong>Separate feature pending:</strong> automated District 9 scores, win/loss records
        and standings are intentionally excluded from this authority guide while the
        authorized data source and accuracy checks are being developed. No incomplete
        table, simulated live scoreboard or inferred postseason seed is shown.
      </p>
    </section>
  );
}
