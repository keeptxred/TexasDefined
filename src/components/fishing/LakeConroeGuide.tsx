import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import type { getLakeConroePageData } from "@/data/fishing/lake-conroe-page-data.functions";
import {
  LAKE_CONROE_SECTION_SLUGS,
  LAKE_CONROE_VERIFIED_AT,
  lakeConroeCanonicalPath,
  lakeConroeSectionMeta,
  newestPublishedReport,
  verifiedGuides,
  type LakeConroeSection,
} from "@/data/fishing/lake-conroe-prototype";
import type { FishingGuide, FishingReport } from "@/data/fishing/types";

type LakeConroePageData = Awaited<ReturnType<typeof getLakeConroePageData>>;
type LakeConroeSourceKey = keyof LakeConroePageData["sources"];

export function LakeConroeGuide({ section, reports, guides, pageData }: { section?: LakeConroeSection; reports: FishingReport[]; guides: FishingGuide[]; pageData: LakeConroePageData }) {
  const title = section ? lakeConroeSectionMeta[section].title : `${pageData.overview.name} Fishing Guide`;
  const description = section ? lakeConroeSectionMeta[section].description : pageData.overview.summary;

  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li>
            <li aria-hidden>·</li>
            {section ? <><li><Link to={lakeConroeCanonicalPath()} className="hover:text-foreground">{pageData.overview.name}</Link></li><li aria-hidden>·</li><li aria-current="page">{lakeConroeSectionMeta[section].label}</li></> : <li aria-current="page">{pageData.overview.name}</li>}
          </ol>
        </nav>
      </Container>

      <header className="mt-5 border-y border-border bg-ink text-ink-foreground">
        <Container className="py-14 sm:py-20">
          <p className="eyebrow text-ink-foreground/65">{pageData.copy.heroEyebrow}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{description}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.12em] text-ink-foreground/60">
            <span>{pageData.overview.counties.join(" + ")} counties</span>
            <span>{pageData.overview.surfaceAcres.toLocaleString("en-US")} acres</span>
            <span>Verified {formatDate(LAKE_CONROE_VERIFIED_AT)}</span>
          </div>
        </Container>
      </header>

      <div className="border-b border-border bg-background">
        <Container>
          <nav aria-label="Lake Conroe guide sections" className="flex gap-5 overflow-x-auto py-4 text-xs font-semibold uppercase tracking-[0.12em]">
            <Link to={lakeConroeCanonicalPath()} className={!section ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Overview</Link>
            {LAKE_CONROE_SECTION_SLUGS.map((item) => (
              <Link key={item} to={lakeConroeCanonicalPath(item)} className={section === item ? "whitespace-nowrap text-primary" : "whitespace-nowrap text-muted-foreground hover:text-foreground"}>{lakeConroeSectionMeta[item].label}</Link>
            ))}
          </nav>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        {!section && <Overview pageData={pageData} />}
        {section === "fish" && <Fish pageData={pageData} />}
        {section === "access" && <Access pageData={pageData} />}
        {section === "boating" && <Boating pageData={pageData} />}
        {section === "regulations" && <Regulations pageData={pageData} />}
        {section === "camping" && <Camping pageData={pageData} />}
        {section === "nearby" && <Nearby pageData={pageData} />}
        {section === "reports" && <Reports reports={reports} pageData={pageData} />}
        {section === "guides" && <Guides guides={guides} pageData={pageData} />}
        <SourceFooter section={section} pageData={pageData} />
      </Container>
    </>
  );
}

function Overview({ pageData }: { pageData: LakeConroePageData }) {
  const { overview, copy } = pageData;
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="eyebrow text-primary">{copy.overview.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{copy.overview.heading}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{copy.overview.intro}</p>
          <div className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3">
            <Fact label="Surface area" value={`${overview.surfaceAcres.toLocaleString("en-US")} acres`} />
            <Fact label="Impounded" value={String(overview.impoundedYear)} />
            <Fact label="Counties" value={overview.counties.join(" + ")} />
            <Fact label="Waterway" value={overview.waterway} />
            <Fact label="Conservation pool" value={`${overview.conservationPoolFeetMsl} ft msl`} />
            <Fact label="Normal fluctuation" value={overview.normalFluctuation} />
            <Fact label="Average depth" value={`${overview.averageDepthFeet} ft (SJRA)`} />
            <Fact label="Shoreline" value={`About ${overview.shorelineMilesApprox} miles (SJRA)`} />
            <Fact label="Nearest communities" value={overview.nearestCommunities.join(", ")} />
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Maximum depth:</strong> {overview.maximumDepthNote}</p>
        </div>
        <aside className="border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">{copy.overview.mapEyebrow}</p>
          <div className="mt-4 aspect-[4/3] overflow-hidden border border-border bg-muted">
            <iframe title={`Map of ${overview.name}, Texas`} src="https://www.google.com/maps?q=Lake%20Conroe%20Texas&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full" />
          </div>
          <a href={overview.mapUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">{copy.overview.openMapLabel}</a>
          <a href={pageData.sources.liveLevel.url} target="_blank" rel="noreferrer noopener" className="eyebrow ml-5 mt-4 inline-block border-b border-primary pb-1 text-primary">{copy.overview.liveLevelLabel}</a>
        </aside>
      </section>

      <section>
        <p className="eyebrow text-primary">{copy.overview.habitatEyebrow}</p>
        <h2 className="mt-3 font-display text-4xl">{copy.overview.habitatHeading}</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">{pageData.habitat.map((item) => <p key={item} className="border-t border-border pt-5 text-sm leading-7 text-muted-foreground">{item}</p>)}</div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow text-primary">{copy.overview.fishEyebrow}</p><h2 className="mt-3 font-display text-4xl">{copy.overview.fishHeading}</h2></div>
          <Link to={lakeConroeCanonicalPath("fish")} className="eyebrow border-b border-primary pb-1 text-primary">{copy.overview.fishLinkLabel}</Link>
        </div>
        <div className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {pageData.fish.slice(0, 6).map((fish) => <article key={fish.id} className="border-b border-border py-6 sm:px-5 sm:first:pl-0"><p className="eyebrow text-primary">{fish.quality}</p><h3 className="mt-2 font-display text-2xl">{fish.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{fish.summary}</p></article>)}
        </div>
      </section>

      <section className="grid gap-6 border-t border-border pt-8 md:grid-cols-3">
        {copy.overview.planning.map((item, index) => <PlanningCard key={item.title} title={item.title} text={item.text} label={item.label} href={lakeConroeCanonicalPath((["access", "regulations", "camping"] as const)[index])} />)}
      </section>
    </div>
  );
}

function Fish({ pageData }: { pageData: LakeConroePageData }) {
  const copy = pageData.copy.fishSection;
  return (
    <section>
      <p className="eyebrow text-primary">{copy.eyebrow}</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{copy.heading}</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{copy.intro}</p>
      <div className="mt-10 space-y-9">{pageData.fish.map((fish) => <article key={fish.id} id={fish.id} className="scroll-mt-28 border-t border-border pt-7"><div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr]"><div><p className="eyebrow text-primary">{fish.prominence} · {fish.quality}</p><h3 className="mt-2 font-display text-3xl">{fish.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{fish.summary}</p></div><div className="grid gap-4 sm:grid-cols-2">{fish.seasons.map((pattern) => <div key={pattern.label} className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">{pattern.label}</p><p className="mt-2 text-sm leading-6">{pattern.text}</p></div>)}</div></div></article>)}</div>
    </section>
  );
}

function Access({ pageData }: { pageData: LakeConroePageData }) {
  const copy = pageData.copy.accessSection;
  return <section><p className="eyebrow text-primary">{copy.eyebrow}</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{copy.heading}</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{copy.intro}</p><div className="mt-9 grid gap-x-8 border-t border-border md:grid-cols-2">{pageData.access.map((item) => { const source = pageData.sources[item.source as LakeConroeSourceKey]; return <article key={item.name} className="border-b border-border py-7"><p className="eyebrow text-primary">{item.operator}</p><h3 className="mt-2 font-display text-2xl">{item.name}</h3><dl className="mt-4 space-y-2 text-sm leading-6"><div><dt className="inline text-muted-foreground">Launch: </dt><dd className="inline">{item.launch}</dd></div><div><dt className="inline text-muted-foreground">Fee: </dt><dd className="inline">{item.fee}</dd></div><div><dt className="inline text-muted-foreground">Availability: </dt><dd className="inline">{item.availability}</dd></div></dl><a href={source.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">{copy.verifyLabel}</a></article>; })}</div></section>;
}

function Boating({ pageData }: { pageData: LakeConroePageData }) {
  const copy = pageData.copy.boatingSection;
  return <section><p className="eyebrow text-primary">{copy.eyebrow}</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{copy.heading}</h2><div className="mt-8 grid gap-5 sm:grid-cols-2">{pageData.boatingNotes.map((item) => <p key={item} className="border-t border-border pt-5 text-sm leading-7 text-muted-foreground">{item}</p>)}</div><div className="mt-10 flex flex-wrap gap-5"><a href={pageData.sources.liveLevel.url} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">{copy.liveLevelLabel}</a><Link to={lakeConroeCanonicalPath("access")} className="eyebrow border-b border-primary pb-1 text-primary">{copy.accessLabel}</Link></div></section>;
}

function Regulations({ pageData }: { pageData: LakeConroePageData }) {
  const copy = pageData.copy.regulationsSection;
  return <section><p className="eyebrow text-primary">{copy.eyebrow}</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{copy.heading}</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{copy.introBeforeDate} {formatDate(LAKE_CONROE_VERIFIED_AT)}. {copy.introAfterDate}</p><div className="mt-9 border-t border-border">{pageData.regulations.map((row) => <div key={row.species} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[0.35fr_0.65fr]"><h3 className="font-display text-xl">{row.species}</h3><p className="text-sm leading-6 text-muted-foreground">{row.limit}</p></div>)}</div><div className="mt-8 border-l-2 border-primary pl-5"><p className="text-sm leading-7"><strong>Grass carp:</strong> {copy.grassCarp}</p></div><a href={pageData.sources.tpwdRegulations.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">{copy.officialLabel}</a></section>;
}

function Camping({ pageData }: { pageData: LakeConroePageData }) {
  const copy = pageData.copy.campingSection;
  return <section><p className="eyebrow text-primary">{copy.eyebrow}</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{copy.heading}</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{copy.intro}</p><div className="mt-9 grid gap-6 lg:grid-cols-3">{pageData.camping.map((item) => { const source = pageData.sources[item.source as LakeConroeSourceKey]; return <article key={item.name} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">{item.type}</p><h3 className="mt-2 font-display text-2xl">{item.name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p><a href={source.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">{copy.officialLabel}</a></article>; })}</div></section>;
}

function Nearby({ pageData }: { pageData: LakeConroePageData }) {
  const copy = pageData.copy.nearbySection;
  return <section><p className="eyebrow text-primary">{copy.eyebrow}</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{copy.heading}</h2><div className="mt-9 grid gap-x-8 border-t border-border md:grid-cols-2">{pageData.nearby.map((item) => <article key={item.label} className="border-b border-border py-7"><h3 className="font-display text-2xl">{item.label}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>{item.external ? <a href={item.href} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">{copy.officialLabel}</a> : <Link to={item.href} className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">{copy.internalLabel}</Link>}</article>)}</div></section>;
}

function Reports({ reports, pageData }: { reports: FishingReport[]; pageData: LakeConroePageData }) {
  const report = newestPublishedReport(reports);
  const copy = pageData.copy.reportsSection;
  return <section><p className="eyebrow text-primary">{copy.eyebrow}</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{copy.heading}</h2>{report ? <article className="mt-8 border-t-2 border-foreground pt-6"><p className="eyebrow text-primary">Published {formatDate(report.publishedAt)}</p><h3 className="mt-2 font-display text-3xl">{report.title}</h3><p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">{report.summary}</p></article> : <div className="mt-8 max-w-3xl border-l-2 border-primary pl-6"><h3 className="font-display text-2xl">{copy.emptyHeading}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{pageData.reportSnapshot.summary}</p></div>}<a href={pageData.sources.tpwdReport.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">{copy.tpwdLabel}</a><div className="mt-12 border-t border-border pt-7"><h3 className="font-display text-2xl">{copy.requirementsHeading}</h3><div className="mt-5 grid gap-4 text-sm leading-7 text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">{copy.requirements.map((item) => <p key={item}>{item}</p>)}</div></div></section>;
}

function Guides({ guides, pageData }: { guides: FishingGuide[]; pageData: LakeConroePageData }) {
  const rows = verifiedGuides(guides);
  const copy = pageData.copy.guidesSection;
  return <section><p className="eyebrow text-primary">{copy.eyebrow}</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">{copy.heading}</h2>{rows.length ? <div className="mt-9 grid gap-6 md:grid-cols-2">{rows.map((guide) => <article key={guide.id} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">{copy.verifiedLabel}</p><h3 className="mt-2 font-display text-2xl">{guide.businessName}</h3>{guide.guideName && <p className="mt-1 text-sm text-muted-foreground">{guide.guideName}</p>}{guide.bio && <p className="mt-4 text-sm leading-7 text-muted-foreground">{guide.bio}</p>}{guide.website && <a href={guide.website} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">{copy.websiteLabel}</a>}</article>)}</div> : <div className="mt-8 max-w-3xl border-l-2 border-primary pl-6"><h3 className="font-display text-2xl">{copy.emptyHeading}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy.emptyBody}</p><Link to="/partner-with-us" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">{copy.partnerLabel}</Link></div>}<div className="mt-12 border-t border-border pt-7"><p className="eyebrow text-muted-foreground">{copy.sponsorshipEyebrow}</p><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{copy.sponsorshipBody}</p></div></section>;
}

function SourceFooter({ section, pageData }: { section?: LakeConroeSection; pageData: LakeConroePageData }) {
  const keys = sectionSources(section);
  const copy = pageData.copy.sourcesSection;
  return <section className="mt-16 border-t border-border pt-8" aria-labelledby="lake-conroe-sources"><p className="eyebrow text-primary">{copy.eyebrow}</p><h2 id="lake-conroe-sources" className="mt-2 font-display text-2xl">Verified {formatDate(LAKE_CONROE_VERIFIED_AT)}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{copy.body}</p><ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">{keys.map((key) => { const source = pageData.sources[key]; return <li key={key}><a href={source.url} target="_blank" rel="noreferrer noopener" className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-primary">{source.label}</a></li>; })}</ul></section>;
}

function sectionSources(section?: LakeConroeSection): LakeConroeSourceKey[] {
  if (section === "access") return ["tpwdAccess", "usfsCagle", "usfsScottsRidge", "usfsStubblefield"];
  if (section === "regulations") return ["tpwdRegulations", "tpwdLake"];
  if (section === "boating") return ["tpwdLake", "liveLevel", "sjra"];
  if (section === "camping") return ["usfsCagle", "usfsScottsRidge", "usfsStubblefield"];
  if (section === "reports") return ["tpwdReport", "tpwdLake"];
  if (section === "fish") return ["tpwdLake", "tpwdHabitat"];
  return ["tpwdLake", "twdb", "sjra"];
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div><dt className="eyebrow text-muted-foreground">{label}</dt><dd className="mt-1 text-sm leading-6">{value}</dd></div>;
}

function PlanningCard({ title, text, label, href }: { title: string; text: string; label: string; href: string }) {
  return <article><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p><Link to={href} className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">{label}</Link></article>;
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
