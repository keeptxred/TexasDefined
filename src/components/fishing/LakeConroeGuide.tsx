import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import {
  LAKE_CONROE_SECTION_SLUGS,
  LAKE_CONROE_VERIFIED_AT,
  lakeConroeAccess,
  lakeConroeBoatingNotes,
  lakeConroeCamping,
  lakeConroeCanonicalPath,
  lakeConroeFish,
  lakeConroeHabitat,
  lakeConroeNearby,
  lakeConroeOverview,
  lakeConroeRegulations,
  lakeConroeReportSnapshot,
  lakeConroeSectionMeta,
  lakeConroeSources,
  newestPublishedReport,
  verifiedGuides,
  type LakeConroeSection,
} from "@/data/fishing/lake-conroe-prototype";
import type { FishingGuide, FishingReport } from "@/data/fishing/types";

export function LakeConroeGuide({ section, reports, guides }: { section?: LakeConroeSection; reports: FishingReport[]; guides: FishingGuide[] }) {
  const title = section ? lakeConroeSectionMeta[section].title : "Lake Conroe Fishing Guide";
  const description = section ? lakeConroeSectionMeta[section].description : lakeConroeOverview.summary;

  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li>
            <li aria-hidden>·</li>
            {section ? <><li><Link to={lakeConroeCanonicalPath()} className="hover:text-foreground">Lake Conroe</Link></li><li aria-hidden>·</li><li aria-current="page">{lakeConroeSectionMeta[section].label}</li></> : <li aria-current="page">Lake Conroe</li>}
          </ol>
        </nav>
      </Container>

      <header className="mt-5 border-y border-border bg-ink text-ink-foreground">
        <Container className="py-14 sm:py-20">
          <p className="eyebrow text-ink-foreground/65">Texas Defined Fishing · Piney Woods</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{description}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.12em] text-ink-foreground/60">
            <span>Montgomery + Walker counties</span>
            <span>20,118 acres</span>
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
        {!section && <Overview />}
        {section === "fish" && <Fish />}
        {section === "access" && <Access />}
        {section === "boating" && <Boating />}
        {section === "regulations" && <Regulations />}
        {section === "camping" && <Camping />}
        {section === "nearby" && <Nearby />}
        {section === "reports" && <Reports reports={reports} />}
        {section === "guides" && <Guides guides={guides} />}

        <SourceFooter section={section} />
      </Container>
    </>
  );
}

function Overview() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="eyebrow text-primary">At a glance</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">A fishing lake with two very different personalities.</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">The developed lower lake is built around open water, bulkheads, docks and marinas. Farther north, the reservoir reaches into Sam Houston National Forest and the old river channel becomes more timber-oriented. That difference matters for both fishing strategy and boat navigation.</p>
          <div className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3">
            <Fact label="Surface area" value={`${lakeConroeOverview.surfaceAcres.toLocaleString("en-US")} acres`} />
            <Fact label="Impounded" value={String(lakeConroeOverview.impoundedYear)} />
            <Fact label="Counties" value={lakeConroeOverview.counties.join(" + ")} />
            <Fact label="Waterway" value={lakeConroeOverview.waterway} />
            <Fact label="Conservation pool" value={`${lakeConroeOverview.conservationPoolFeetMsl} ft msl`} />
            <Fact label="Normal fluctuation" value={lakeConroeOverview.normalFluctuation} />
            <Fact label="Average depth" value={`${lakeConroeOverview.averageDepthFeet} ft (SJRA)`} />
            <Fact label="Shoreline" value={`About ${lakeConroeOverview.shorelineMilesApprox} miles (SJRA)`} />
            <Fact label="Nearest communities" value={lakeConroeOverview.nearestCommunities.join(", ")} />
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Maximum depth:</strong> {lakeConroeOverview.maximumDepthNote}</p>
        </div>

        <aside className="border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">Map & water</p>
          <div className="mt-4 aspect-[4/3] overflow-hidden border border-border bg-muted">
            <iframe title="Map of Lake Conroe, Texas" src="https://www.google.com/maps?q=Lake%20Conroe%20Texas&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full" />
          </div>
          <a href={lakeConroeOverview.mapUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Open Lake Conroe map →</a>
          <a href={lakeConroeSources.liveLevel.url} target="_blank" rel="noreferrer noopener" className="eyebrow ml-5 mt-4 inline-block border-b border-primary pb-1 text-primary">Live lake level →</a>
        </aside>
      </section>

      <section>
        <p className="eyebrow text-primary">Cover & structure</p>
        <h2 className="mt-3 font-display text-4xl">What the water looks like to a fish.</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {lakeConroeHabitat.map((item) => <p key={item} className="border-t border-border pt-5 text-sm leading-7 text-muted-foreground">{item}</p>)}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow text-primary">Fish Lake Conroe</p><h2 className="mt-3 font-display text-4xl">The core targets.</h2></div>
          <Link to={lakeConroeCanonicalPath("fish")} className="eyebrow border-b border-primary pb-1 text-primary">Full fish guide →</Link>
        </div>
        <div className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {lakeConroeFish.slice(0, 6).map((fish) => <article key={fish.id} className="border-b border-border py-6 sm:px-5 sm:first:pl-0"><p className="eyebrow text-primary">{fish.quality}</p><h3 className="mt-2 font-display text-2xl">{fish.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{fish.summary}</p></article>)}
        </div>
      </section>

      <section className="grid gap-6 border-t border-border pt-8 md:grid-cols-3">
        <PlanningCard title="Launch the boat" text="Compare verified ramps, fees and operators before you tow to the lake." href={lakeConroeCanonicalPath("access")} />
        <PlanningCard title="Check the rules" text="Lake Conroe has reservoir-specific fishing limits, including a special largemouth rule." href={lakeConroeCanonicalPath("regulations")} />
        <PlanningCard title="Stay near the water" text="Start with verified national-forest camping and day-use options." href={lakeConroeCanonicalPath("camping")} />
      </section>
    </div>
  );
}

function Fish() {
  return (
    <section>
      <p className="eyebrow text-primary">Species & seasons</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Fish the pattern, not just the species name.</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">These are durable seasonal patterns from official fisheries guidance, not a claim about today's bite. For genuinely current conditions, use a dated report when one is available.</p>
      <div className="mt-10 space-y-9">
        {lakeConroeFish.map((fish) => (
          <article key={fish.id} id={fish.id} className="scroll-mt-28 border-t border-border pt-7">
            <div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr]">
              <div><p className="eyebrow text-primary">{fish.prominence} · {fish.quality}</p><h3 className="mt-2 font-display text-3xl">{fish.name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{fish.summary}</p></div>
              <div className="grid gap-4 sm:grid-cols-2">{fish.seasons.map((pattern) => <div key={pattern.label} className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">{pattern.label}</p><p className="mt-2 text-sm leading-6">{pattern.text}</p></div>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Access() {
  return (
    <section>
      <p className="eyebrow text-primary">Verified launch points</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Choose the ramp before you leave home.</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">TPWD's access inventory mixes federal, state and private facilities. Fees and operating status can change, so each listing keeps the managing source visible instead of pretending the directory is real-time.</p>
      <div className="mt-9 grid gap-x-8 border-t border-border md:grid-cols-2">
        {lakeConroeAccess.map((item) => {
          const source = lakeConroeSources[item.source];
          return <article key={item.name} className="border-b border-border py-7"><p className="eyebrow text-primary">{item.operator}</p><h3 className="mt-2 font-display text-2xl">{item.name}</h3><dl className="mt-4 space-y-2 text-sm leading-6"><div><dt className="inline text-muted-foreground">Launch: </dt><dd className="inline">{item.launch}</dd></div><div><dt className="inline text-muted-foreground">Fee: </dt><dd className="inline">{item.fee}</dd></div><div><dt className="inline text-muted-foreground">Availability: </dt><dd className="inline">{item.availability}</dd></div></dl><a href={source.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Verify with source →</a></article>;
        })}
      </div>
    </section>
  );
}

function Boating() {
  return (
    <section>
      <p className="eyebrow text-primary">Before you launch</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Lake level, timber and clean-drain-dry all matter here.</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">{lakeConroeBoatingNotes.map((item) => <p key={item} className="border-t border-border pt-5 text-sm leading-7 text-muted-foreground">{item}</p>)}</div>
      <div className="mt-10 flex flex-wrap gap-5"><a href={lakeConroeSources.liveLevel.url} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Check live lake level →</a><Link to={lakeConroeCanonicalPath("access")} className="eyebrow border-b border-primary pb-1 text-primary">Compare boat ramps →</Link></div>
    </section>
  );
}

function Regulations() {
  return (
    <section>
      <p className="eyebrow text-primary">Verified rules snapshot</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Use this as a planning summary—not a substitute for the Outdoor Annual.</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">The limits below were checked against TPWD on {formatDate(LAKE_CONROE_VERIFIED_AT)}. Regulations can change. Confirm the official Lake Conroe page before fishing.</p>
      <div className="mt-9 border-t border-border">{lakeConroeRegulations.map((row) => <div key={row.species} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[0.35fr_0.65fr]"><h3 className="font-display text-xl">{row.species}</h3><p className="text-sm leading-6 text-muted-foreground">{row.limit}</p></div>)}</div>
      <div className="mt-8 border-l-2 border-primary pl-5"><p className="text-sm leading-7"><strong>Grass carp:</strong> TPWD lists a Triploid Grass Carp Permit for Lake Conroe. Any grass carp caught must be returned to the water immediately and unharmed.</p></div>
      <a href={lakeConroeSources.tpwdRegulations.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Open official Lake Conroe regulations →</a>
    </section>
  );
}

function Camping() {
  return (
    <section>
      <p className="eyebrow text-primary">Stay near the lake</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Start with the public-land options we can verify.</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Rather than presenting a generic hotel list, this prototype begins with official national-forest recreation areas tied directly to Lake Conroe.</p>
      <div className="mt-9 grid gap-6 lg:grid-cols-3">{lakeConroeCamping.map((item) => { const source = lakeConroeSources[item.source]; return <article key={item.name} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">{item.type}</p><h3 className="mt-2 font-display text-2xl">{item.name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p><a href={source.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Check official details →</a></article>; })}</div>
    </section>
  );
}

function Nearby() {
  return (
    <section>
      <p className="eyebrow text-primary">Build a bigger trip</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Lake Conroe can anchor more than a day on the water.</h2>
      <div className="mt-9 grid gap-x-8 border-t border-border md:grid-cols-2">{lakeConroeNearby.map((item) => <article key={item.label} className="border-b border-border py-7"><h3 className="font-display text-2xl">{item.label}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>{item.external ? <a href={item.href} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Official site →</a> : <Link to={item.href} className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">TexasDefined guide →</Link>}</article>)}</div>
    </section>
  );
}

function Reports({ reports }: { reports: FishingReport[] }) {
  const report = newestPublishedReport(reports);
  return (
    <section>
      <p className="eyebrow text-primary">Freshness first</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">A fishing report is useful only when its date and source are obvious.</h2>
      {report ? <article className="mt-8 border-t-2 border-foreground pt-6"><p className="eyebrow text-primary">Published {formatDate(report.publishedAt)}</p><h3 className="mt-2 font-display text-3xl">{report.title}</h3><p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">{report.summary}</p></article> : <div className="mt-8 max-w-3xl border-l-2 border-primary pl-6"><h3 className="font-display text-2xl">No TexasDefined current report is published.</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{lakeConroeReportSnapshot.summary}</p></div>}
      <a href={lakeConroeSources.tpwdReport.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Check TPWD's report page →</a>
      <div className="mt-12 border-t border-border pt-7"><h3 className="font-display text-2xl">What a TexasDefined report must show</h3><div className="mt-5 grid gap-4 text-sm leading-7 text-muted-foreground sm:grid-cols-2 lg:grid-cols-4"><p>Publication and expiration dates.</p><p>Contributor attribution.</p><p>Species-specific activity and depth guidance.</p><p>Water conditions only when a source actually supplied them.</p></div></div>
    </section>
  );
}

function Guides({ guides }: { guides: FishingGuide[] }) {
  const rows = verifiedGuides(guides);
  return (
    <section>
      <p className="eyebrow text-primary">Local expertise</p>
      <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Only verified guide profiles belong in the directory.</h2>
      {rows.length ? <div className="mt-9 grid gap-6 md:grid-cols-2">{rows.map((guide) => <article key={guide.id} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">Verified listing</p><h3 className="mt-2 font-display text-2xl">{guide.businessName}</h3>{guide.guideName && <p className="mt-1 text-sm text-muted-foreground">{guide.guideName}</p>}{guide.bio && <p className="mt-4 text-sm leading-7 text-muted-foreground">{guide.bio}</p>}{guide.website && <a href={guide.website} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Guide website →</a>}</article>)}</div> : <div className="mt-8 max-w-3xl border-l-2 border-primary pl-6"><h3 className="font-display text-2xl">No Lake Conroe guide has cleared the verified-listing gate yet.</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">We will not fill this page with scraped names or implied endorsements. Local guides can submit a profile for verification, species/lake matching and future contributor access.</p><Link to="/partner-with-us" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Partner with TexasDefined →</Link></div>}
      <div className="mt-12 border-t border-border pt-7"><p className="eyebrow text-muted-foreground">Sponsorship policy</p><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Paid placement never changes the verified-listing requirement. Future sponsored guide positions must be labeled as sponsored and remain separate from editorial fishing guidance.</p></div>
    </section>
  );
}

function SourceFooter({ section }: { section?: LakeConroeSection }) {
  const keys = sectionSources(section);
  return (
    <section className="mt-16 border-t border-border pt-8" aria-labelledby="lake-conroe-sources">
      <p className="eyebrow text-primary">Source transparency</p>
      <h2 id="lake-conroe-sources" className="mt-2 font-display text-2xl">Verified {formatDate(LAKE_CONROE_VERIFIED_AT)}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Official facts are kept separate from live conditions. Water levels, ramp availability, closures, regulations and fishing activity can change after this verification date.</p>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">{keys.map((key) => { const source = lakeConroeSources[key]; return <li key={key}><a href={source.url} target="_blank" rel="noreferrer noopener" className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-primary">{source.label}</a></li>; })}</ul>
    </section>
  );
}

function sectionSources(section?: LakeConroeSection): Array<keyof typeof lakeConroeSources> {
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

function PlanningCard({ title, text, href }: { title: string; text: string; href: string }) {
  return <article><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p><Link to={href} className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Open guide →</Link></article>;
}

function formatDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
