import { useMemo, useState, type ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import registry from '@/data/softball/uil-2026-27-registry.json';
import approvedIndex from '@/data/softball/published-team-index.json';

const approvedTeamByIdentity = new Map((approvedIndex as { pages: { slug: string; uilName: string; conference: string; district: number; region: number }[] }).pages.map((p) => [
  [p.uilName, p.conference, p.district, p.region].join('|'), '/sports/softball/' + p.slug,
]));

const all = 'all';
const classifications = ['2A', '3A', '4A', '5A', '6A'] as const;
const csv = '/data/texas-softball-uil-2026-27.csv';
const url = 'https://texasdefined.com/sports/softball/schools';
const expectedCount = registry.schools.length;
const title = 'Texas UIL Softball Schools and Districts, 2026–27';
const description = 'Search the 2026–27 official UIL softball district alignment: schools, conferences, regions and all 160 districts. Source-linked rows and free CSV download.';

function Caption({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-7 text-muted-foreground">{children}</p>;
}
function SelectBox({ name, value, options, onChange }: {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (next: string) => void;
}) {
  return <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{name}</span>
    <select
      className="mt-2 w-full border border-border bg-background p-3 text-sm text-foreground"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </label>;
}

export function SoftballSchoolsDirectory() {
  const [search, setSearch] = useState('');
  const [conference, setConference] = useState(all);
  const [region, setRegion] = useState(all);
  const [district, setDistrict] = useState(all);
  const [pageSize, setPageSize] = useState(50);
  const districtOptions = Array.from({ length: 32 }, (_, i) => ({ value: String(i + 1), label: 'District ' + (i + 1) }));
  const filtered = useMemo(() => {
    const q = search.toLocaleLowerCase().trim().replace(/\s+/g, ' ');
    return registry.schools.filter((school) => {
      return (conference === all || school.conference === conference)
        && (region === all || String(school.region) === region)
        && (district === all || String(school.district) === district)
        && (!q || school.name.toLocaleLowerCase().includes(q));
    });
  }, [search, conference, region, district]);
  const visible = filtered.slice(0, pageSize);
  const changeFilter = (setter: (value: string) => void) => (next: string) => {
    setter(next);
    setPageSize(50);
  };
  return <Container className="pb-16 pt-10 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: title,
        description,
        url,
        dateModified: '2026-10-11',
        temporalCoverage: '2026-2027',
        spatialCoverage: { '@type': 'Place', name: 'Texas, United States' },
        isBasedOn: registry.sources.map((source) => source.sourceUrl),
        distribution: [{ '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: 'https://texasdefined.com' + csv }],
        creator: { '@type': 'Organization', name: 'TexasDefined', url: 'https://texasdefined.com' },
      }) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><a href="/">Home</a> / <a href="/sports">Sports</a> / <a href="/sports/softball">Softball</a> / <span aria-current="page">UIL schools</span></nav>
      <header className="border-b border-border pb-12 pt-10">
        <p className="eyebrow text-primary">UIL softball · 2026–27 · Verified October 11, 2026</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[1.02] sm:text-7xl">Every listed Texas UIL softball school and district</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Find a high-school softball program's official UIL district alignment for the 2026–27 school year. This independently organized directory draws directly from the five UIL softball alignment PDFs, not from football schedules or general enrollment classifications.</p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a className="border border-primary px-4 py-3 font-semibold text-primary" href={csv}>Download all schools as CSV ↓</a>
          <a className="border border-primary px-4 py-3 font-semibold text-primary" href="/sports/softball">Statewide softball guide →</a>
          <a className="border border-primary px-4 py-3 font-semibold text-primary" href="#methodology">Sources and methodology ↓</a>
        </div>
      </header>
      <div className="grid gap-5 border-b border-border py-8 sm:grid-cols-3">
        <div><span className="text-xs uppercase tracking-widest text-muted-foreground">Listed schools</span><strong className="mt-2 block font-display text-4xl">{expectedCount.toLocaleString('en-US')}</strong><Caption>Distinct school listings in these softball documents</Caption></div>
        <div><span className="text-xs uppercase tracking-widest text-muted-foreground">UIL softball districts</span><strong className="mt-2 block font-display text-4xl">160</strong><Caption>32 per conference across five documents</Caption></div>
        <div><span className="text-xs uppercase tracking-widest text-muted-foreground">Season</span><strong className="mt-2 block font-display text-4xl">2026–27</strong><Caption>Alignments may change; official UIL notices control</Caption></div>
      </div>
      <section className="border-b border-border py-12" aria-labelledby="find-school">
        <h2 id="find-school" className="font-display text-3xl sm:text-4xl">Find a school or district</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Type a school, campus, town, or name fragment. Narrow by the conference used in the UIL softball document, a UIL region or the numbered district. These listings should not be interpreted as independently confirmed varsity rosters or game participation.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">School name</span>
            <input type="search" value={search} onChange={(event) => changeFilter(setSearch)(event.target.value)}
              placeholder="Try Katy, Pearland, Paris, Shiner..." className="mt-2 w-full border border-border bg-background p-3 text-foreground" />
          </label>
          <SelectBox name="UIL softball document" value={conference} onChange={changeFilter(setConference)}
            options={[{ value: all, label: 'All softball conferences' }, ...classifications.map((name) => ({ value: name, label: name + ' alignment' }))]} />
          <SelectBox name="Region" value={region} onChange={changeFilter(setRegion)}
            options={[{ value: all, label: 'All regions' }, ...[1,2,3,4].map((n) => ({ value: String(n), label: 'Region ' + n }))]} />
          <SelectBox name="District number" value={district} onChange={changeFilter(setDistrict)}
            options={[{ value: all, label: 'All districts' }, ...districtOptions]} />
          <div className="flex items-end">
            <button type="button" className="border border-border px-4 py-3 text-sm font-semibold text-primary" onClick={() => { setSearch(''); setConference(all); setRegion(all); setDistrict(all); setPageSize(50); }}>Clear all filters</button>
          </div>
        </div>
        <p className="mt-7 text-sm" role="status" aria-live="polite"><strong>{filtered.length.toLocaleString('en-US')} matching school listings</strong> · showing {visible.length.toLocaleString('en-US')}</p>
        {visible.length === 0 ? <p className="mt-8 border border-border p-6 text-sm">No schools match those filters. Clear a filter or try the official PDF for the relevant conference.</p> : <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {visible.map((school) => <div className="bg-background p-5" key={school.conference + '-' + school.district + '-' + school.name}>
            <h3 className="font-display text-xl">{school.name}</h3>
            {approvedTeamByIdentity.has([school.name, school.conference, school.district, school.region].join('|')) && <a className="mt-3 block text-sm font-semibold text-primary underline" href={approvedTeamByIdentity.get([school.name, school.conference, school.district, school.region].join('|'))}>Read complete, independently verified team guide →</a>}
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">{school.conference} softball · District {school.district} · Region {school.region}</p>
            <a className="mt-3 block text-sm font-semibold text-primary underline" href={school.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={'UIL original district PDF for ' + school.name}>See original UIL district PDF ↗</a>
          </div>)}
        </div>}
        {visible.length < filtered.length ? <button className="mt-7 border border-primary px-6 py-3 text-sm font-semibold text-primary" type="button" onClick={() => setPageSize((n) => n + 50)}>Show 50 more schools ↓</button> : null}
      </section>
      <section className="border-b border-border py-12" aria-labelledby="league-breakdown">
        <h2 id="league-breakdown" className="font-display text-3xl sm:text-4xl">2026–27 softball schools by UIL alignment</h2>
        <Caption>The 2A alignment also lists smaller 1A schools that play in that softball alignment. A school's listing here must not be mistaken for its general UIL enrollment classification.</Caption>
        <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {registry.sources.map((source) => <div className="bg-background p-5" key={source.conference}>
            <p className="text-xs uppercase tracking-widest text-primary">{source.conference} softball</p>
            <strong className="mt-2 block font-display text-3xl">{source.schoolCount}</strong>
            <Caption>Listed school entries · {source.districtCount} districts</Caption>
            <a className="mt-3 block text-sm font-semibold text-primary underline" href={source.sourceUrl}>UIL {source.conference} PDF ↗</a>
            <button type="button" className="mt-3 block text-sm font-semibold text-primary underline" onClick={() => { setConference(source.conference); setSearch(''); setRegion(all); setDistrict(all); setPageSize(50); document.getElementById('find-school')?.scrollIntoView({ behavior: 'smooth' }); }}>Filter to {source.conference} schools →</button>
          </div>)}
        </div>
      </section>
      <section className="py-12" id="methodology" aria-labelledby="school-method-heading">
        <p className="eyebrow text-primary">Source verification</p>
        <h2 id="school-method-heading" className="mt-3 font-display text-3xl sm:text-4xl">How this directory was assembled</h2>
        <div className="mt-6 max-w-4xl text-sm leading-8 text-muted-foreground">
          <p>TexasDefined extracted the five official UIL <strong>2026–27 softball-specific alignment</strong> documents. Rows preserve the UIL school names and each document's conference, district and region. There are 32 districts in each of five alignment documents, with regions defined by the district ranges 1–8, 9–16, 17–24 and 25–32. The 2A PDF was revised June 15, 2026.</p>
          <p className="mt-4">The extraction checks document titles, required district labels, unique school names within each conference and nonempty districts. It does not establish a school's active 2027 season, game roster, team contact, transfer eligibility or private-school championship qualification. Spelling follows UIL display names; abbreviations such as “H” or “SA” belong to the original records.</p>
          <p className="mt-4">The CSV includes each UIL school name, the softball conference document, district, region and direct original PDF URL. It can be cited or filtered without copying screenshots of proprietary brackets. Before relying on a district for eligibility or a match, recheck <a href="https://www.uiltexas.org/softball/alignments" className="text-primary underline">UIL's current alignment page</a>.</p>
          <p className="mt-4">Last reviewed: October 11, 2026. Suggested citation: TexasDefined, “Texas UIL Softball Schools & Districts, 2026–27,” https://texasdefined.com/sports/softball/schools, derived from official UIL softball district alignment PDFs.</p>
        </div>
        <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          {registry.sources.map((source) => <li key={source.conference}><a className="text-primary underline" href={source.sourceUrl}>Official {source.conference} 2026–27 UIL softball alignment ↗</a></li>)}
          <li><a className="text-primary underline" href={csv}>Download source-linked schools CSV ↓</a></li>
          <li><a className="text-primary underline" href="/sports/softball">Explore NCAA, NJCAA, professional and community softball →</a></li>
        </ul>
      </section>
    </main>
  </Container>;
}
