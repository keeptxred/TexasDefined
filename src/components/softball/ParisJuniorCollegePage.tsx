import { Container } from '@/components/layout/Container';
import type { ReactNode } from 'react';
const canonical = 'https://texasdefined.com/sports/softball/paris-junior-college';
const sources = [
  ['PJC: Mike Mendenhall appointed head coach, July 2026', 'https://www.parisjc.edu/news/articles/mike_mendenhall_nextheadcoach_softball.php'],
  ['PJC: 2025 regional award and softball field, July 2025', 'https://www.parisjc.edu/news/articles/hosting-prospect.php'],
  ['NFCA: 2025 NJCAA Division I regional coaching awards', 'https://nfca.org/divnews/njcaa1/njcaa-di-dii-regional-coaching-staff-of-the-year-2025'],
  ['NFCA: 2026 NJCAA All-American selections', 'https://nfca.org/divnews/njcaa1/njcaa-di-all-americans-release-2026'],
  ['PJC: 2002–2024 Jack Butler recognition on official college social channel', 'https://www.linkedin.com/posts/paris-junior-college_it-was-a-special-day-on-the-paris-junior-activity-7188286301400371200-FVQB'],
  ['Local publication of PJC statement: 2026 season and coaching transition', 'https://myparistexas.com/pjc-coach-shelton-headed-for-southern-arkansas-university/'],
  ['NJCAA 2026 champions account: Paris World Series game', 'https://www.nacc.edu/news/mustangs-win-njcaa-di-softball-national-championship'],
  ['San Jacinto College: 2026 Region XIV tournament results', 'https://sanjacsports.com/sports/2026/4/24/region-xiv-softball-tournament.aspx'],
] as const;

function Section({ id, label, heading, children }: { id: string; label: string; heading: string; children: ReactNode }) {
  return <section id={id} className="border-t border-border py-11 sm:py-14" aria-labelledby={id + '-heading'}>
    <p className="eyebrow text-primary">{label}</p>
    <h2 id={id + '-heading'} className="mt-3 max-w-4xl font-display text-3xl sm:text-4xl">{heading}</h2>
    <div className="mt-5 max-w-4xl space-y-5 text-sm leading-8 text-muted-foreground">{children}</div>
  </section>;
}

export function ParisJuniorCollegePage() {
  return <Container className="pb-16 pt-10 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', name: 'Paris Junior College Lady Dragons Softball: Mr. Jack Butler & History', url: 'https://texasdefined.com/sports/softball/paris-junior-college', dateModified: '2026-10-11', author: { '@type': 'Organization', name: 'TexasDefined Editorial' }, }) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><a href="/">Home</a> / <a href="/sports">Sports</a> / <a href="/sports/softball">Softball</a> / <span aria-current="page">Paris Junior College</span></nav>
      <header className="pb-12 pt-10">
        <p className="eyebrow text-primary">Northeast Texas · Lamar County · Reviewed October 11, 2026</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[1.02] sm:text-7xl">Paris Junior College Lady Dragons softball</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The Lady Dragons are a Paris, Texas, NJCAA softball program whose recent success includes a 2026 national Final Four and whose institutional memory reaches back to the program's earliest years through volunteer assistant Jack “Mr. Jack” Butler.</p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="#seasons" className="border border-primary px-4 py-3 text-primary">Program timeline ↓</a>
          <a href="#mr-jack" className="border border-primary px-4 py-3 text-primary">Mr. Jack's legacy ↓</a>
          <a href="#visit" className="border border-primary px-4 py-3 text-primary">Schedules and visiting ↓</a>
          <a href="/sports/softball" className="border border-primary px-4 py-3 text-primary">Texas softball hub →</a>
        </div>
      </header>
      <div className="grid gap-5 border-y border-border py-8 sm:grid-cols-3">
        <div><span className="text-xs uppercase tracking-widest text-muted-foreground">2026 national finish</span><strong className="mt-2 block font-display text-3xl">Final Four · 4th</strong><p className="mt-2 text-sm text-muted-foreground">NJCAA Division I</p></div>
        <div><span className="text-xs uppercase tracking-widest text-muted-foreground">2025 coaching honor</span><strong className="mt-2 block font-display text-3xl">NFCA Midwest</strong><p className="mt-2 text-sm text-muted-foreground">NJCAA Division I regional staff award</p></div>
        <div><span className="text-xs uppercase tracking-widest text-muted-foreground">Current head coach</span><strong className="mt-2 block font-display text-3xl">Mike Mendenhall</strong><p className="mt-2 text-sm text-muted-foreground">Appointed July 6, 2026</p></div>
      </div>

      <Section id="seasons" label="Program record" heading="Three national-tournament seasons and a major 2026 milestone">
        <p>The program reached the NJCAA Division I Softball World Series in <strong>2022, 2025 and 2026</strong> under former head coach Shelby Shelton. The 2022 team finished sixth nationally; the 2025 team won its Region XIV title and entered the national tournament; and the 2026 Lady Dragons finished fourth nationally after reaching the Final Four. These are national placements, not NCAA Women's College World Series appearances.</p>
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          <div className="bg-background p-5"><strong className="font-display text-2xl">2022</strong><p className="mt-2 text-sm">NJCAA World Series; sixth nationally</p></div>
          <div className="bg-background p-5"><strong className="font-display text-2xl">2025</strong><p className="mt-2 text-sm">Region XIV title, NJCAA World Series berth and NFCA Midwest coaching award</p></div>
          <div className="bg-background p-5"><strong className="font-display text-2xl">2026</strong><p className="mt-2 text-sm">Return trip to nationals; program-best fourth-place finish and 52-win season</p></div>
        </div>
        <p>The 2026 Region XIV postseason included multiple advancement paths. San Jacinto's official bracket also documents its own championship and NJCAA berth; TexasDefined does not treat all bracket winners as one undifferentiated champion. See the linked official <a className="text-primary underline" href="https://sanjacsports.com/sports/2026/4/24/region-xiv-softball-tournament.aspx">2026 tournament results</a>.</p>
        <p>At the 2025 award announcement, the <a href="https://nfca.org/divnews/njcaa1/njcaa-di-dii-regional-coaching-staff-of-the-year-2025" className="text-primary underline">NFCA</a> reported that Paris was 50–9, and that Gabby Sosa's power hitting helped drive the playoff run. In 2026 the NFCA again recognized Paris talent, selecting three Lady Dragons as NJCAA Division I All-Americans.</p>
      </Section>

      <Section id="coaches" label="Current and former leadership" heading="Mike Mendenhall succeeded championship-era coach Shelby Shelton">
        <p>Paris Junior College <a className="text-primary underline" href="https://www.parisjc.edu/news/articles/mike_mendenhall_nextheadcoach_softball.php">announced Mike Mendenhall's hiring on July 6, 2026</a>. He arrived after leading McCook Community College to back-to-back NJCAA Division I World Series appearances in 2025 and 2026. That appointment is the documented current head-coaching reference point for this page; consult PJC athletics for subsequent staff changes.</p>
        <p>Former head coach <strong>Shelby Shelton</strong> led the Lady Dragons from the 2021 through 2026 seasons before departing for Southern Arkansas. The public account of the college's June 2026 announcement credits her six-season tenure with a 253–90 record, three national appearances, back-to-back 2025 and 2026 region-title seasons, and the 2026 fourth-place national finish.</p>
        <p><strong>Do not confuse the staff years:</strong> the 2025 NFCA regional recognition listed Shelby Shelton, Taylor Swisher and Jack Butler. Mendenhall's appointment came the following year and is not part of that 2025 award.</p>
      </Section>

      <Section id="mr-jack" label="The people who make a program" heading="Mr. Jack Butler: a remarkable tradition of showing up">
        <p>Jack Butler, affectionately called <strong>“Mr. Jack,”</strong> is a longtime volunteer and program assistant closely associated with Lady Dragons softball. Paris Junior College's own public recognition states that he began helping in <strong>2002</strong> under Vernon Carter, identified by the college as its founding softball coach. At a 2024 recognition before the program moved to its new field, the college credited Butler with working alongside <strong>nine coaches and approximately 300 student-athletes</strong>, spanning roughly 900 games. These numbers are the school's contemporary estimates, not figures presented as independently audited totals.</p>
        <p>His contribution is not adequately described by a win–loss record. PJC has recognized his longstanding work around the team and field, his consistency across coaching changes and his support for generations of players. He connects the college's earliest softball seasons to its recent national prominence.</p>
        <p>In PJC’s public field-farewell ceremony, college representatives described Butler's work preparing the diamond, dragging the field with a tractor and keeping the scorebook. In his own remarks at that ceremony, Butler said he grew up in western Kentucky and attended the University of Kentucky. His statement confirms attendance, not a degree or collegiate playing record.</p>
        <p>The NFCA's <a className="text-primary underline" href="https://nfca.org/regional-coaching-staffs-of-the-year-2024-25">2025 official award roster</a> names Jack Butler among the NJCAA Division I Midwest Regional Coaching Staff of the Year for Paris, with head coach Shelby Shelton and assistant Taylor Swisher. PJC described his role as <strong>program assistant</strong> in its July 2025 announcement. This is a <em>regional staff honor</em>, not a claim that Butler separately won a national coaching award.</p>
        <p>Biographical details sometimes circulated about Butler—such as specific military coaching assignments, his university playing history, or a television episode—are excluded here until a citable first-party record or attributable interview verifies them. We are preserving the documented legacy without filling gaps with anecdotes presented as fact.</p>
        <p><a className="text-primary underline" href="https://www.linkedin.com/posts/paris-junior-college_it-was-a-special-day-on-the-paris-junior-activity-7188286301400371200-FVQB">Read Paris Junior College's tribute to Mr. Jack ↗</a></p>
      </Section>

      <Section id="visit" label="Fan and recruit resources" heading="Where to watch, visit, follow and contact the program">
        <p><strong>Home campus:</strong> Paris Junior College, 2400 Clarksville Street, Paris, TX 75460. The program opened a new on-campus softball field after its earlier games at the City of Paris Sports Complex; the college described it as the Lady Dragons' new field in 2025. Check athletics notices for actual game locations, away-site substitutions, spectator policies and parking before traveling.</p>
        <p><strong>Schedules, rosters and staff:</strong> <a href="https://pjcathletics.com/" className="text-primary underline">PJC athletics</a> is the source of truth. A spring 2026 roster should not be labeled the 2027 roster. For an upcoming schedule, search the official softball team page and confirm the season toggle.</p>
        <p><strong>Recruiting and prospect camps:</strong> the July and August 2025 showcases were past events, not open registrations. Interested high-school players and college transfers should consult the current athletics staff directly, check NJCAA eligibility rules, and obtain new camp dates from the college rather than using an expired form or email address.</p>
        <p><strong>Visitor planning:</strong> Paris is in Lamar County in Northeast Texas. Fans can combine a game with downtown Paris and other local attractions, but should verify the day's venue, parking, admission and weather contingency details with PJC before departure.</p>
      </Section>

      <Section id="questions" label="Quick answers" heading="PJC Lady Dragons softball: frequently asked questions">
        <dl className="space-y-5">
          <div><dt className="font-semibold text-foreground">Is Paris Junior College an NCAA team?</dt><dd>No. Its softball program competes in the National Junior College Athletic Association (NJCAA), a distinct two-year-college competition system.</dd></div>
          <div><dt className="font-semibold text-foreground">Who coaches PJC softball?</dt><dd>As verified October 11, 2026, Mike Mendenhall is the head coach announced by PJC on July 6, 2026. Shelby Shelton led the 2022, 2025 and 2026 World Series teams.</dd></div>
          <div><dt className="font-semibold text-foreground">Did Mr. Jack Butler receive a national award?</dt><dd>He was named on Paris's <strong>2025 NFCA NJCAA Division I Midwest Regional Coaching Staff of the Year</strong>. The award is regional, and he was one member of the recognized staff.</dd></div>
          <div><dt className="font-semibold text-foreground">When did the Lady Dragons reach the national Final Four?</dt><dd>In 2026, they reached the NJCAA Division I national Final Four and finished fourth. The 2025 team also reached nationals, after winning its regional championship.</dd></div>
        </dl>
      </Section>

      <Section id="sources" label="Verification and corrections" heading="Primary records and how this page was checked">
        <p>Research reviewed October 11, 2026. The College and NFCA are authoritative for their own statements and award designations; tournament brackets document match results; a local report of PJC's departure announcement is attributed as secondary evidence. This is an independent guide, not an official college recruiting page.</p>
        <p>Suggested citation: TexasDefined, “Paris Junior College Lady Dragons Softball: Program History and Mr. Jack Butler,” reviewed October 11, 2026, {canonical}.</p>
        <ul className="grid gap-3 sm:grid-cols-2">{sources.map(([label, url]) => <li key={url}><a href={url} className="font-semibold text-primary underline">{label} ↗</a></li>)}</ul>
        <p><a href="/sports/softball" className="font-semibold text-primary underline">Back to Texas women's softball programs, championships and sources →</a></p>
      </Section>
    </main>
  </Container>;
}
