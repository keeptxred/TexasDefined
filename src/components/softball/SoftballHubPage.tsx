import { Container } from '@/components/layout/Container';
import type { ReactNode } from 'react';
const verified = 'October 11, 2026';

// A curated starting index, explicitly NOT a claim to list every active program.
// Link directly to school athletics departments; schedules, coaches and rosters change.
const collegePrograms = [
  ['Texas Longhorns', 'Austin', 'NCAA Division I · SEC', 'https://texaslonghorns.com/sports/softball'],
  ['Texas A&M Aggies', 'College Station', 'NCAA Division I · SEC', 'https://12thman.com/sports/softball'],
  ['Texas Tech Red Raiders', 'Lubbock', 'NCAA Division I · Big 12', 'https://texastech.com/sports/softball'],
  ['Baylor Bears', 'Waco', 'NCAA Division I · Big 12', 'https://baylorbears.com/sports/softball'],
  ['Houston Cougars', 'Houston', 'NCAA Division I · Big 12', 'https://uhcougars.com/sports/softball'],
  ['Texas State Bobcats', 'San Marcos', 'NCAA Division I · Sun Belt', 'https://txst.com/sports/softball'],
  ['North Texas Mean Green', 'Denton', 'NCAA Division I', 'https://meangreensports.com/sports/softball'],
  ['UTSA Roadrunners', 'San Antonio', 'NCAA Division I', 'https://goutsa.com/sports/softball'],
  ['Sam Houston Bearkats', 'Huntsville', 'NCAA Division I', 'https://gobearkats.com/sports/softball'],
  ['UT Arlington Mavericks', 'Arlington', 'NCAA Division I', 'https://utamavs.com/sports/softball'],
  ['Stephen F. Austin Ladyjacks', 'Nacogdoches', 'NCAA Division I', 'https://sfajacks.com/sports/softball'],
  ['Tarleton State Texans', 'Stephenville', 'NCAA Division I', 'https://tarletonsports.com/sports/softball'],
  ['Lamar Cardinals', 'Beaumont', 'NCAA Division I', 'https://lamarcardinals.com/sports/softball'],
  ['Texas A&M–Corpus Christi Islanders', 'Corpus Christi', 'NCAA Division I', 'https://goislanders.com/sports/softball'],
  ['Texas Southern Tigers', 'Houston', 'NCAA Division I · SWAC', 'https://tsusports.com/sports/softball'],
  ['Prairie View A&M Panthers', 'Prairie View', 'NCAA Division I · SWAC', 'https://pvpanthers.com/sports/softball'],
] as const;

const champions2026 = [
  ['1A', 'Jonesboro'], ['2A Division I', 'Ganado'], ['2A Division II', 'Shiner'],
  ['3A Division I', 'Grandview'], ['3A Division II', 'Santa Gertrudis Academy'],
  ['4A Division I', 'Bullard'], ['4A Division II', 'Liberty'],
  ['5A Division I', 'Mont Belvieu Barbers Hill'], ['5A Division II', 'Montgomery Lake Creek'],
  ['6A Division I', 'Pearland'], ['6A Division II', 'Katy'],
] as const;

const officialResources = [
  ['UIL softball hub: rules and calendar', 'https://www.uiltexas.org/softball'],
  ['UIL 2026–27 alignments by conference', 'https://www.uiltexas.org/softball/alignments'],
  ['UIL state championship archive', 'https://www.uiltexas.org/softball/archives'],
  ['UIL 2027 championship page', 'https://www.uiltexas.org/softball/state'],
  ['NCAA Division I softball championship', 'https://www.ncaa.org/championship/division-i/softball/'],
  ['NCAA Division II softball championship', 'https://www.ncaa.org/championship/division-ii/softball/'],
  ['NJCAA softball standings', 'https://www.njcaa.org/sports/standings?division=div1&season=2026-27&sport=sball'],
  ['NFCA coaches and awards', 'https://nfca.org/'],
  ['Texas Volts professional softball', 'https://theausl.com/volts/about/'],
  ['USA Softball of Texas official association', 'https://usasoftballoftexas.com/'],
  ['Lone Star Conference 2026 Division II tournament field', 'https://lonestarconference.org/news/2026/5/4/lsc-softball-championship-field-released.aspx'],
  ['ASC 2026 Division III championship results', 'https://ascsports.org/news/2026/5/9/tigers-take-2026-asc-baseball-championship.aspx?path=softball'],
  ['ASC Division III softball standings', 'https://ascsports.org/standings.aspx?path=softball'],
  ['Texas baseball and softball tournaments', '/events/tournaments-baseball-softball'],
] as const;

function Section({ id, kicker, heading, children }: { id: string; kicker: string; heading: string; children: ReactNode }) {
  return <section id={id} className="border-t border-border py-12 sm:py-16" aria-labelledby={id + '-heading'}>
    <p className="eyebrow text-primary">{kicker}</p>
    <h2 id={id + '-heading'} className="mt-3 max-w-4xl font-display text-3xl sm:text-4xl">{heading}</h2>
    <div className="mt-6">{children}</div>
  </section>;
}

export function SoftballHubPage() {
  return <Container className="pb-16 pt-10 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Texas Women’s Softball: Teams, 2026 Champions, Colleges & UIL Guide', url: 'https://texasdefined.com/sports/softball', dateModified: '2026-10-11',  }) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><a href="/">Home</a> / <a href="/sports">Texas sports</a> / <span aria-current="page">Softball</span></nav>
      <header className="pb-12 pt-10">
        <p className="eyebrow text-primary">TexasDefined sports research · Updated {verified}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[1.02] sm:text-7xl">Women’s softball in Texas, defined</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas softball is bigger than the major universities: high-school programs from 1A through 6A, NCAA teams across divisions, junior colleges, developmental pathways, championship history and the people who keep programs alive. This reference hub separates verified history from information that changes each season.</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <a className="border border-primary px-4 py-3 text-primary" href="/sports/softball/schools">Find 1,192 UIL schools →</a>
          <a className="border border-primary px-4 py-3 text-primary" href="#high-school">UIL high schools ↓</a>
          <a className="border border-primary px-4 py-3 text-primary" href="#professional">Professional ↓</a>
          <a className="border border-primary px-4 py-3 text-primary" href="#college">College programs ↓</a>
          <a className="border border-primary px-4 py-3 text-primary" href="#junior-college">Junior colleges ↓</a>
          <a className="border border-primary px-4 py-3 text-primary" href="/sports/softball/paris-junior-college">Paris Lady Dragons →</a>
        </div>
      </header>
      <div className="grid gap-5 border-y border-border py-7 md:grid-cols-3">
        <div><p className="text-xs uppercase tracking-widest text-muted-foreground">2026 UIL state champions</p><strong className="mt-2 block font-display text-4xl">11</strong><p className="text-sm text-muted-foreground">Verified across 1A and split 2A–6A divisions</p></div>
        <div><p className="text-xs uppercase tracking-widest text-muted-foreground">NCAA Division I</p><strong className="mt-2 block font-display text-4xl">{collegePrograms.length}</strong><p className="text-sm text-muted-foreground">Selected Texas programs with athletics links; not a complete census</p></div>
        <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Featured junior college</p><strong className="mt-2 block font-display text-3xl">Paris JC</strong><p className="text-sm text-muted-foreground">2025 and 2026 NJCAA Region XIV title seasons</p></div>
      </div>

      <Section id="high-school" kicker="UIL high schools" heading="The current season and the state-championship record">
        <a className="mb-5 block border-l-4 border-primary bg-surface p-6" href="/sports/softball/schools"><strong className="font-display text-2xl">Search 1,192 UIL softball school listings in 160 districts →</strong><span className="mt-2 block text-sm leading-7 text-muted-foreground">The 2026–27 softball-specific directory is searchable by school, conference, district and region, with all five original UIL PDFs and a source-linked CSV.</span></a>
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">UIL publishes the competition calendar, district alignments, rules and historical results. Do not reuse the classification of a football program for softball: the sports have their own alignments, and 2026–27 divisions must be checked against UIL before describing any school’s current district.</p>
        <p className="mt-4 text-sm leading-7"><strong>2026–27 calendar:</strong> UIL lists January 15, 2027 as the first practice date, February 15 as the first interschool contest date, and June 3–5 for state championships at Red & Charline McCombs Field in Austin. Dates can change; the <a className="text-primary underline" href="https://www.uiltexas.org/softball">UIL softball office</a> is definitive.</p>
        <h3 className="mt-8 font-display text-2xl">2026 Texas UIL softball state champions</h3>
        <p className="mt-2 text-sm text-muted-foreground">The 2025–26 season, not a prediction for 2027. Source: <a href="https://www.uiltexas.org/softball/archives" className="text-primary underline">UIL state archives</a>.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {champions2026.map(([division, school]) => <div key={division} className="bg-background p-5"><p className="text-xs font-semibold uppercase tracking-widest text-primary">{division}</p><p className="mt-2 font-display text-xl">{school}</p></div>)}
        </div>
        <p className="mt-6 text-sm leading-7">For current district opponents or eligibility, start with <a className="text-primary underline" href="https://www.uiltexas.org/softball/alignments">2026–27 UIL softball alignments</a>. The official archive also includes earlier seasons, brackets and all-tournament teams, so readers can distinguish a conference title, a region title and a state championship.</p>
      </Section>

      <Section id="professional" kicker="Professional women’s fastpitch" heading="Texas has its own professional softball team: the Texas Volts">
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">The <strong>Texas Volts</strong> are the Round Rock-based Athletes Unlimited Softball League (AUSL) team. The league designated <strong>Dell Diamond</strong> as the Volts' home venue for the 2026 season; Texas softball legend Cat Osterman serves as general manager and former Texas State coach Ricci Woodard as head coach. Unlike NCAA teams or high-school programs, the Volts are a professional women's team. Check the league's live site before treating prior-season schedules, tickets or staffing as current.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <a className="block border border-border p-6" href="/sports/softball/texas-volts"><p className="eyebrow text-primary">Professional team</p><h3 className="mt-2 font-display text-2xl">Texas Volts · Round Rock</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Team background, roster, coaches and official updates directly from AUSL.</p><span className="mt-4 block font-semibold text-primary">Read the TexasDefined team guide →</span></a>
          <a className="block border border-border p-6" href="https://www.roundrocktexas.gov/news/pro-softball-team-to-call-round-rock-home/"><p className="eyebrow text-primary">Home venue</p><h3 className="mt-2 font-display text-2xl">Dell Diamond · Round Rock</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The City of Round Rock's January 2026 account of the franchise's arrival.</p><span className="mt-4 block font-semibold text-primary">City announcement ↗</span></a>
        </div>
      </Section>

      <Section id="college" kicker="NCAA softball" heading="Texas college programs, from nationally televised games to local campus traditions">
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">Texas won the 2025 and 2026 NCAA Division I national titles, defeating Texas Tech in both championship series. The highest-visibility teams share the sport with smaller institutions where recruiting, affordability and campus fit look different. This list is a selected official-team directory rather than an inflated claim to every varsity program.</p>
        <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {collegePrograms.map(([name, city, division, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="group bg-background p-5 hover:bg-surface"><p className="text-xs uppercase tracking-[0.12em] text-primary">{city}</p><h3 className="mt-2 font-display text-xl group-hover:text-primary">{name}</h3><p className="mt-2 text-xs text-muted-foreground">{division}</p><span className="mt-4 block text-sm font-semibold text-primary">Official team site ↗</span></a>)}
        </div>
        <h3 className="mt-9 font-display text-2xl">Division II and III matter too</h3>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Do not overlook the Lone Star Conference’s Division II programs or NCAA Division III programs such as East Texas Baptist and Mary Hardin-Baylor in the American Southwest Conference. The <a className="text-primary underline" href="https://ascsports.org/standings.aspx?path=softball">official ASC standings</a> preserve conference results. Use <a className="text-primary underline" href="https://www.ncaa.org/championship/division-ii/softball/">NCAA Division II</a> and <a className="text-primary underline" href="https://www.ncaa.com/sports/softball/d3">NCAA Division III</a> resources for national championship context. In 2026 the Texas Division II programs in the Lone Star Conference playoff field included West Texas A&M, UT Tyler, Angelo State, Texas A&M–Kingsville, St. Mary’s, Lubbock Christian and Texas Woman’s University; the conference’s <a className="text-primary underline" href="https://lonestarconference.org/news/2026/5/4/lsc-softball-championship-field-released.aspx">own nine-team tournament announcement</a> documents participants and past results. The 2026 American Southwest Conference title was won by East Texas Baptist. Divisional membership and alignments require seasonal verification.</p>
      </Section>

      <Section id="junior-college" kicker="NJCAA and the player pathway" heading="Junior colleges are a major part of the Texas softball story">
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">Two-year colleges connect Texas high-school players with higher education and, for many athletes, a later transfer to a four-year program. Region XIV includes programs such as Paris, San Jacinto, Trinity Valley, Blinn, Tyler and Navarro; other Texas colleges compete in different NJCAA regions. Check each school’s current schedule and recruiting information rather than treating a prior-season roster as current.</p>
        <a href="/sports/softball/paris-junior-college" className="mt-7 block border-l-4 border-primary bg-surface p-7"><p className="eyebrow text-primary">Featured researched team</p><h3 className="mt-3 font-display text-3xl">Paris Junior College Lady Dragons</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">A program with 2025 and 2026 region-title seasons, a 2026 NJCAA Final Four, an incoming head coach and the remarkable decades-long commitment of program assistant Jack Butler.</p><span className="mt-4 block font-semibold text-primary">Read the researched Lady Dragons profile →</span></a>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><a href="https://www.njcaa.org/sports/standings?division=div1&season=2026-27&sport=sball" className="text-primary underline">NJCAA standings ↗</a><a href="https://www.njcaa.org/" className="text-primary underline">NJCAA official home ↗</a><a href="/events/tournaments-baseball-softball" className="text-primary underline">Texas tournament directory →</a></div>
      </Section>

      <Section id="community" kicker="Youth, travel and adult softball" heading="How to find organized softball beyond school and college">
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">Select/travel fastpitch, local recreation leagues and adult women's softball are an important part of the sport. USA Softball's Texas structure separates the statewide association from the Dallas–Fort Worth and Houston metro associations. That means no single statewide club list is automatically complete. Families should verify age-group eligibility, insurance, background checks, SafeSport rules and current event sanctioning directly with the tournament organizer before registration.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a className="border border-border p-5 text-sm font-semibold text-primary underline" href="https://www.usasoftball.com/associations/state/texas/">USA Softball Texas and metro associations ↗</a>
          <a className="border border-border p-5 text-sm font-semibold text-primary underline" href="https://usasoftballoftexas.com/ssr/pages/cms-v2/adults">Adult fastpitch, slowpitch and local recreation ↗</a>
        </div>
      </Section>

      <Section id="questions" kicker="Explained" heading="How Texas women’s softball is organized">
        <dl className="grid gap-8 md:grid-cols-2">
          <div><dt className="font-display text-xl">What is the difference between UIL and NCAA softball?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">UIL governs the Texas public-school high-school competition structure. NCAA organizes many four-year college championships. Private-school high-school associations, NJCAA two-year colleges and other bodies have separate classifications and championships.</dd></div>
          <div><dt className="font-display text-xl">Do community colleges compete for national championships?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">Yes. NJCAA softball operates national championships by division. A college’s region title, World Series berth and national placement are distinct accomplishments.</dd></div>
          <div><dt className="font-display text-xl">Can I use football districts to find a softball team?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">Not reliably. UIL softball has its own official alignment documents. Verify the school and season directly rather than importing football assignments.</dd></div>
          <div><dt className="font-display text-xl">Where do I check current rosters and scores?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">Use a school’s athletics website for current staff, schedule, roster, results and campus information, and check its governing association for postseason brackets and official awards. This page is an evergreen research guide, not a live scoreboard.</dd></div>
        </dl>
      </Section>

      <Section id="sources" kicker="Our methodology" heading="Sources, definitions and editorial verification">
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground">This is an independently authored TexasDefined research index, not an official UIL, NCAA, NJCAA or college publication. Historical winners come from archived governing-body records; event dates from current UIL notices; team and coach claims from athletics departments and awards publishers. Every season, re-check alignments, schedules and staff. No invented team rankings or unsupported recruiting promises.</p>
        <p className="mt-3 text-sm text-muted-foreground">Reviewed: {verified}. Recommended citation: TexasDefined, “Texas Women’s Softball: Teams, Champions and College Guide,” reviewed October 11, 2026, https://texasdefined.com/sports/softball.</p>
        <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">{officialResources.map(([label, url]) => <li key={url}><a href={url} className="font-semibold text-primary underline">{label} ↗</a></li>)}</ul>
      </Section>
    </main>
  </Container>;
}
