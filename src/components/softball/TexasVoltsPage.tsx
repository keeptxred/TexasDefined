import { Container } from '@/components/layout/Container';
const canonical = 'https://texasdefined.com/sports/softball/texas-volts';
const official = [
  ['Texas Volts official team site', 'https://theausl.com/volts/'],
  ['AUSL: Texas Volts organization and staff', 'https://theausl.com/volts/about/'],
  ['AUSL: 2026 club launch release', 'https://theausl.com/volts/news/ausl-brings-texas-volts-to-round-rock-austin/'],
  ['City of Round Rock: franchise announcement', 'https://www.roundrocktexas.gov/news/pro-softball-team-to-call-round-rock-home/'],
  ['AUSL official schedule and final 2026 scores', 'https://theausl.com/schedule/'],
  ['AUSL league teams and current news', 'https://theausl.com/'],
] as const;

export function TexasVoltsPage() {
  return <Container className="pb-16 pt-10 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', name: 'Texas Volts: Round Rock Professional Softball & Dell Diamond', url: 'https://texasdefined.com/sports/softball/texas-volts', dateModified: '2026-10-11', author: { '@type': 'Organization', name: 'TexasDefined Editorial' }, }) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><a href="/">Home</a> / <a href="/sports">Sports</a> / <a href="/sports/softball">Softball</a> / <span aria-current="page">Texas Volts</span></nav>
      <header className="border-b border-border pb-12 pt-10">
        <p className="eyebrow text-primary">Women's professional softball · Round Rock · Reviewed October 11, 2026</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[1.02] sm:text-7xl">Texas Volts: professional softball comes home to Round Rock</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The Texas Volts are a professional women's fastpitch softball team in the Athletes Unlimited Softball League (AUSL), based at Dell Diamond in Round Rock. Their story links an emerging Texas professional franchise with former Longhorns and decades of Central Texas softball tradition.</p>
        <div className="mt-7 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
          <div><span className="text-xs uppercase tracking-widest text-muted-foreground">League</span><p className="mt-2 font-display text-2xl">AUSL</p></div>
          <div><span className="text-xs uppercase tracking-widest text-muted-foreground">Home venue</span><p className="mt-2 font-display text-2xl">Dell Diamond</p></div>
          <div><span className="text-xs uppercase tracking-widest text-muted-foreground">Home market</span><p className="mt-2 font-display text-2xl">Round Rock, Texas</p></div>
        </div>
      </header>
      <section className="border-b border-border py-12" aria-labelledby="volts-origins">
        <p className="eyebrow text-primary">How the franchise began</p><h2 id="volts-origins" className="mt-3 font-display text-4xl">From a touring league to a Texas home city</h2>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground">The Volts were one of four inaugural AUSL teams in 2025, when the league played across multiple markets. On January 13, 2026, AUSL designated Round Rock the Volts' home city as the league adopted permanent home markets and expanded to six teams. Both <a href="https://theausl.com/volts/news/ausl-brings-texas-volts-to-round-rock-austin/" className="text-primary underline">AUSL</a> and the <a href="https://www.roundrocktexas.gov/news/pro-softball-team-to-call-round-rock-home/" className="text-primary underline">City of Round Rock</a> documented the move. These dates describe the franchise's history; the current team's next season should be checked independently.</p>
      </section>
      <section className="border-b border-border py-12" aria-labelledby="volts-people">
        <p className="eyebrow text-primary">People behind the program</p><h2 id="volts-people" className="mt-3 font-display text-4xl">Cat Osterman, Ricci Woodard and Texas roots</h2>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground"><strong>Cat Osterman</strong>, a former University of Texas star and three-time Olympian, was announced as the Volts' general manager. <strong>Ricci Woodard</strong>, who coached at Texas State, was announced as head coach. Their backgrounds make the team a compelling bridge between the state's major collegiate programs and the professional game. Both roles were documented by the <a className="text-primary underline" href="https://theausl.com/volts/about/">official team</a> for the 2026 season, but staff assignments should always be rechecked before a new campaign.</p>
      </section>
      <section className="border-b border-border py-12" aria-labelledby="volts-venue">
        <p className="eyebrow text-primary">Going to a game</p><h2 id="volts-venue" className="mt-3 font-display text-4xl">Dell Diamond: check the softball configuration and date</h2>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground">Dell Diamond, known as the Round Rock Express baseball venue, was announced as the Volts' home ballpark for the 2026 AUSL season. Do not assume baseball event seating, gates, bag policies or parking prices apply unchanged to professional softball. Consult <a href="https://theausl.com/schedule/" className="text-primary underline">AUSL's current schedule</a> and the venue's official event listing for date, admission, broadcast, entry and weather updates.</p>
      </section>
      <section className="border-b border-border py-12" aria-labelledby="volts-league">
        <p className="eyebrow text-primary">League context</p><h2 id="volts-league" className="mt-3 font-display text-4xl">AUSL is not NCAA or a Texas high-school league</h2>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground">AUSL is a professional league. Its six teams in 2026 were the Texas Volts, Utah Talons, Chicago Bandits, Carolina Blaze, Portland Cascade and Oklahoma City Spark. The 2026 championship was won by Utah. Match results and rosters can be confirmed from the <a href="https://theausl.com/schedule/" className="text-primary underline">league's archived game pages</a> rather than estimated from secondary summaries.</p>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground">Looking for other levels? <a className="font-semibold text-primary underline" href="/sports/softball">TexasDefined's statewide women's softball hub</a> connects UIL championships, NCAA teams, NJCAA programs, and youth and adult softball associations.</p>
      </section>
      <section className="py-12" aria-labelledby="volts-sources">
        <p className="eyebrow text-primary">Sources and review policy</p><h2 id="volts-sources" className="mt-3 font-display text-3xl">Independently reported, verified against original records</h2>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-muted-foreground">Reviewed October 11, 2026. This is an independent TexasDefined profile and is not affiliated with AUSL. Coach, roster, broadcast and ticket details may change. Suggested citation: TexasDefined, “Texas Volts Softball: Round Rock, Dell Diamond and AUSL,” October 11, 2026, {canonical}.</p>
        <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">{official.map(([label, url]) => <li key={url}><a className="font-semibold text-primary underline" href={url}>{label} ↗</a></li>)}</ul>
      </section>
    </main>
  </Container>;
}
