import { useMemo, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { TEXAS_COLLEGE_SOFTBALL_PROGRAMS as programs } from '@/data/softball/texas-ncaa-colleges-2026';

const landing = 'https://texasdefined.com/sports/softball/colleges';
const reviews = [
  ['Southland Conference — official 2026 softball standings', 'https://www.southland.org/standings.aspx?path=softball'],
  ['Lone Star Conference — official 2026 softball standings', 'https://lonestarconference.org/standings.aspx?path=softball'],
  ['American Southwest Conference — official 2026 softball standings', 'https://ascsports.org/standings.aspx?path=softball'],
  ['NCAA: 2026 Division III championship qualifiers', 'https://www.ncaa.com/news/softball/article/2026-05-11/2026-ncaa-division-iii-softball-committee-announces-championship-bracket'],
  ['NCAA: Division I softball championship', 'https://www.ncaa.com/sports/softball/d1'],
] as const;

export function TexasCollegeSoftballDirectory() {
  const [query, setQuery] = useState('');
  const [division, setDivision] = useState('all');
  const [showCount, setShowCount] = useState(40);
  const results = useMemo(() => programs.filter((program) => {
    const q = query.toLocaleLowerCase().trim();
    return (division === 'all' || program.division === division)
      && (!q || [program.name, program.city, program.conference].some((value) => value.toLocaleLowerCase().includes(q)));
  }).sort((a,b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name)), [division,query]);
  const counts = (['I','II','III'] as const).map((code) => ({ code, count: programs.filter((item) => item.division === code).length }));
  return <Container className="pb-16 pt-10 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':'https://schema.org', '@type':'CollectionPage',
        name:'Texas NCAA Women’s Softball College Programs: Division I, II and III', url: landing,
        dateModified:'2026-10-11', about:'Texas college softball',
        mainEntity: { '@type':'ItemList', numberOfItems:programs.length,
          itemListElement:programs.map((p,i)=>({ '@type':'ListItem',position:i+1,name:p.name,url:p.teamUrl })) },
      }) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><a href="/">Home</a> / <a href="/sports">Sports</a> / <a href="/sports/softball">Women’s softball</a> / <span aria-current="page">Colleges</span></nav>
      <header className="border-b border-border pb-12 pt-10">
        <p className="eyebrow text-primary">2026 college softball · Research reviewed October 11, 2026</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[1.02] sm:text-7xl">Texas women’s college softball teams: the NCAA directory</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
          Texas women play college softball far beyond the televised Division I tournaments. Explore source-attributed Texas NCAA Division I, II and III programs, with original team pages and conference results from the completed 2026 season.
        </p>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
          This is a verified <strong>curated starting directory</strong>, not a complete census of every Texas NCAA program or the additional NAIA and NJCAA opportunities. Only colleges with individually identifiable softball programs and source references are included here. League membership and eligibility may change with each season.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="#find-colleges" className="border border-primary px-4 py-3 text-primary">Find programs ↓</a>
          <a href="#methodology" className="border border-primary px-4 py-3 text-primary">Official sources ↓</a>
          <a href="/sports/softball/paris-junior-college" className="border border-primary px-4 py-3 text-primary">Paris JC / NJCAA →</a>
          <a href="/sports/softball" className="border border-primary px-4 py-3 text-primary">Statewide guide →</a>
        </div>
      </header>
      <div className="grid gap-4 border-b border-border py-8 sm:grid-cols-3">
        {counts.map(({code,count}) => <div key={code} className="p-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">NCAA Division {code}</span>
          <strong className="mt-3 block font-display text-4xl">{count}</strong>
          <p className="mt-2 text-sm text-muted-foreground">Identified Texas programs (not exhaustive)</p>
        </div>)}
      </div>
      <section id="find-colleges" aria-labelledby="colleges-heading" className="border-b border-border py-12">
        <h2 className="font-display text-3xl sm:text-4xl" id="colleges-heading">Find a softball program</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Search school, city or league. Choose an NCAA division to compare programs; use each original college athletics page to verify current coaches, schedule, roster, recruitment and eligibility.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">School, city or conference</span>
            <input type="search" value={query} onChange={(e) => {setQuery(e.target.value);setShowCount(40);}} placeholder="Try Houston, Lubbock, UT Tyler..." className="mt-2 w-full border border-border bg-background p-3 text-sm text-foreground" />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">NCAA division</span>
            <select className="mt-2 w-full border border-border bg-background p-3 text-sm text-foreground" value={division} onChange={(e) => {setDivision(e.target.value);setShowCount(40);}}>
              <option value="all">All NCAA divisions</option>
              <option value="I">Division I</option>
              <option value="II">Division II</option>
              <option value="III">Division III</option>
            </select>
          </label>
        </div>
        <p className="mt-7 text-sm" role="status" aria-live="polite"><strong>{results.length}</strong> matching programs</p>
        {results.length === 0
          ? <p className="mt-6 border border-border p-5 text-sm">No program matches those filters. Try another city or division. Programs outside this curated source set may still exist.</p>
          : <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {results.slice(0,showCount).map((program) => <article key={program.id} className="bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">{program.city} · NCAA Division {program.division}</p>
              <h3 className="mt-2 font-display text-xl">{program.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{program.conference}</p>
              <a href={program.teamUrl} className="mt-4 block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">Official softball team and roster ↗</a>
              <a href={program.sourceUrl} className="mt-2 block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">Program / 2026 season evidence ↗</a>
            </article>)}
          </div>}
        {showCount < results.length ? <button type="button" className="mt-7 border border-primary px-5 py-3 text-sm font-semibold text-primary" onClick={() => setShowCount((n)=>n+40)}>Show more programs ↓</button> : null}
      </section>
      <section aria-labelledby="choose-school" className="border-b border-border py-12">
        <p className="eyebrow text-primary">Understand the options</p>
        <h2 id="choose-school" className="mt-3 font-display text-3xl sm:text-4xl">What changes from Division I to Division III?</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div><h3 className="font-display text-xl">Division I</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Major and mid-major NCAA programs. Athletic scholarships may be offered under school, conference and NCAA rules. Training and travel vary greatly among programs.</p></div>
          <div><h3 className="font-display text-xl">Division II</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The Lone Star Conference has many Texas programs. Partial athletic aid may be available. Check a school's own financial aid and recruiting staff; standings do not determine a school's value.</p></div>
          <div><h3 className="font-display text-xl">Division III</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">NCAA Division III schools do not offer scholarships on the basis of athletic participation, though eligible academic and need-based aid may be available.</p></div>
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground"><strong>Separate pathways:</strong> NJCAA two-year colleges and NAIA four-year programs have different rules. Do not assume every Texas college listed elsewhere on this site is an NCAA softball member. For two-year softball and the remarkable Lady Dragons program, start with our <a href="/sports/softball/paris-junior-college" className="text-primary underline">Paris Junior College history</a>.</p>
      </section>
      <section id="methodology" aria-labelledby="colleges-sources" className="py-12">
        <p className="eyebrow text-primary">Independent methodology and source links</p>
        <h2 id="colleges-sources" className="mt-3 font-display text-3xl sm:text-4xl">Documented programs, not an invented ranking</h2>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">The 2026 source list was assembled from official athletics programs and completed 2026 standings of the Southland, Lone Star and American Southwest conferences. Programs outside these conferences are linked to their school athletics pages. Out-of-state Lone Star members, including Cameron (Oklahoma), Oklahoma Christian, Western New Mexico and Eastern New Mexico, are excluded from the Texas count. UT Dallas and Sul Ross State are included as 2026 Lone Star softball participants, not represented as longtime Division II institutions.</p>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">A conference is shown in its documented 2026 context; conference changes may make a school’s 2027 affiliation different. This is not a live transfer portal, recruiting contact list or roster. We do not publish private details about high-school recruits or promise athletic aid. Last editorial review: October 11, 2026. Suggested citation: TexasDefined, “Texas NCAA Women’s College Softball Team Directory,” https://texasdefined.com/sports/softball/colleges.</p>
        <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">{reviews.map(([label,url]) => <li key={url}><a className="font-semibold text-primary underline" href={url}>{label} ↗</a></li>)}</ul>
        <p className="mt-8 text-sm font-semibold"><a className="text-primary underline" href="/sports/softball/schools">Browse 1,192 UIL softball school listings and their districts →</a></p>
      </section>
    </main>
  </Container>;
}
