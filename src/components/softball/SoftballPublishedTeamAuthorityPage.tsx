import type { PublishedSoftballProfile } from '@/data/softball/softball-published-team.server';
import { Container } from '@/components/layout/Container';

const sectionDetails = [
  ['identityAndSchool', 'School and varsity team identity'],
  ['uilAlignmentAndDistrict', 'UIL softball classification and district'],
  ['programHistory', 'Program history and historic milestones'],
  ['coachesAndLeadership', 'Coaching staff and leadership'],
  ['rosterAndPlayers', 'Official roster resources and player recognition'],
  ['seasonScheduleAndResults', 'Seasons, schedules and results'],
  ['homeFieldAndGameDay', 'Home softball field and game-day guide'],
  ['championshipsAndHonors', 'Championships, records and honors'],
  ['districtOpponents', 'District opponents and rivalries'],
  ['recruitmentAndEligibility', 'Eligibility, transfers and player pathways'],
  ['communityAndTraditions', 'Community, alumni and traditions'],
  ['planningAndLocal', 'Visitor planning and local connections'],
  ['methodologyAndCorrections', 'Research methodology and corrections'],
] as const;

export function SoftballPublishedTeamAuthorityPage({ profile }: { profile: PublishedSoftballProfile }) {
  const sources = new Map(profile.sources.map((source) => [source.id, source]));
  const team = profile.identity;
  const sourceLinks = (ids: string[]) => (
    <span className="ml-1 inline-flex flex-wrap items-center gap-x-2 gap-y-1 align-baseline">
      {ids.map((id) => {
        const source = sources.get(id);
        if (!source) return null;
        return <a
          key={id}
          className="rounded-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          title={source.title}
          aria-label={`Source: ${source.title}, checked ${source.checkedAt}`}
        >[{id}]</a>;
      })}
    </span>
  );

  return (
    <Container>
      <nav aria-label="Breadcrumb" className="pt-7 text-sm leading-7 text-muted-foreground">
        <a className="underline" href="/">Home</a> / <a className="underline" href="/sports">Sports</a> / <a className="underline" href="/sports/softball">Softball</a> / <a className="underline" href="/sports/softball/schools">UIL schools</a> / <span aria-current="page">{team.uilName}</span>
      </nav>
      <article className="pb-20">
        <header className="border-b border-border pb-10 pt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Texas high school girls softball · 2026–27</p>
          <h1 className="mt-4 max-w-5xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{profile.title}</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">{profile.uniqueThesis}</p>
          <dl className="mt-8 grid gap-4 border-y border-border py-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="font-semibold uppercase tracking-wider text-muted-foreground">Softball alignment</dt><dd className="mt-2 font-semibold">{team.conference} · District {team.district} · Region {team.region}</dd></div>
            <div><dt className="font-semibold uppercase tracking-wider text-muted-foreground">School</dt><dd className="mt-2 font-semibold">{team.uilName} · {team.mascot}</dd></div>
            <div><dt className="font-semibold uppercase tracking-wider text-muted-foreground">Location</dt><dd className="mt-2 font-semibold">{team.city}, {team.county} County, Texas</dd></div>
            <div><dt className="font-semibold uppercase tracking-wider text-muted-foreground">Reviewed</dt><dd className="mt-2 font-semibold"><time dateTime={profile.reviewedAt}>{profile.reviewedAt}</time></dd></div>
          </dl>
          <p className="mt-5 text-sm text-muted-foreground">Edited by {profile.editor}. The softball alignment is sport-specific and does not establish a school’s football classification or the coming season’s game results.</p>
          <p className="mt-3 text-sm"><a className="font-semibold text-primary underline" href={team.schoolOfficialUrl} rel="noopener noreferrer" target="_blank">School’s official website ↗</a></p>
        </header>

        {profile.media.length > 0 && (
          <div className="my-10 grid gap-5 md:grid-cols-2">
            {profile.media.map((asset) => (
              <figure key={asset.path} className="overflow-hidden border border-border">
                <img src={asset.path} alt={asset.alt} className="max-h-[470px] w-full object-contain" loading="lazy" decoding="async" />
                <figcaption className="p-4 text-xs leading-6 text-muted-foreground">
                  Photo: {asset.credit}. Rights: {asset.rights}. <a className="underline" href={asset.sourceUrl} target="_blank" rel="noopener noreferrer">Original photo / provenance ↗</a>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="min-w-0">
            {sectionDetails.map(([id, heading]) => {
              const section = profile.sections[id];
              if (!section) return null;
              return <section key={id} id={id} aria-labelledby={`title-${id}`} className="scroll-mt-24 border-b border-border py-9 first:pt-0">
                <h2 id={`title-${id}`} className="font-display text-3xl leading-tight">{heading}</h2>
                <p className="mt-5 whitespace-pre-line text-base leading-8">{section.text}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">Primary records and verification: {sourceLinks(section.sourceIds)}</p>
              </section>;
            })}
            <section id="documented-facts" aria-labelledby="title-documented-facts" className="scroll-mt-24 py-9">
              <h2 id="title-documented-facts" className="font-display text-3xl">Dated program facts and primary documents</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">These are individually attributed observations. Historical seasons, award levels and dated staff snapshots are not the same as current-season appointments.</p>
              <ol className="mt-6 space-y-5">
                {profile.claims.map((claim) => <li key={claim.id} className="border-l-2 border-border pl-5 text-base leading-8">
                  <p>{claim.text}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Documented as of <time dateTime={claim.asOf}>{claim.asOf}</time> {sourceLinks(claim.sourceIds)}</p>
                </li>)}
              </ol>
            </section>
            <section id="source-library" aria-labelledby="title-source-library" className="scroll-mt-24 border-t border-border py-9">
              <h2 id="title-source-library" className="font-display text-3xl">Source library and verification dates</h2>
              <ol className="mt-6 space-y-4 text-sm leading-7">
                {profile.sources.map((source) => <li key={source.id} id={`source-${source.id}`} className="break-words">
                  <span className="mr-2 font-semibold">[{source.id}]</span>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{source.title} ↗</a>
                  <span className="ml-2 text-muted-foreground">({source.evidenceType}, checked {source.checkedAt})</span>
                </li>)}
              </ol>
            </section>
          </div>
          <aside className="min-w-0 self-start lg:sticky lg:top-20">
            <nav aria-label="On this team page" className="border border-border p-5 text-sm">
              <h2 className="mb-4 font-semibold uppercase tracking-wider">On this page</h2>
              <ul className="space-y-3">
                {sectionDetails.map(([id,heading])=><li key={id}><a className="text-primary underline underline-offset-4" href={`#${id}`}>{heading}</a></li>)}
                <li><a className="text-primary underline" href="#documented-facts">Documented facts</a></li>
                <li><a className="text-primary underline" href="#source-library">Sources</a></li>
              </ul>
            </nav>
          </aside>
        </div>
        <footer className="border-t border-border py-10">
          <h2 className="font-display text-2xl">Updates, related reading and corrections</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7">{profile.correctionsPolicy}</p>
          <p className="mt-3 text-sm">Team research verified <time dateTime={profile.reviewedAt}>{profile.reviewedAt}</time>; updated official UIL alignments, school appointments and venue notices take precedence over older records.</p>
          <nav aria-label="Related Texas softball and local guides" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {profile.relatedPaths.map(path => <a key={path} className="font-semibold text-primary underline underline-offset-4" href={path}>{path === '/sports/softball' ? 'Texas softball' : path === '/sports/softball/schools' ? 'UIL schools directory' : path.replace(/^\//, '').replace(/[-/]/g,' ')}</a>)}
          </nav>
        </footer>
      </article>
    </Container>
  );
}
