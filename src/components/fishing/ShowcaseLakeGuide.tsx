import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import { showcaseLakeCanonicalPath, type ShowcaseLakeSection, type ShowcaseLakeSlug } from "@/data/fishing/showcase-lake-routing";
import type { ShowcaseLakePrototype } from "@/data/fishing/showcase-lakes-prototype";
import type { FishingBusiness, FishingGuide, FishingPlacement, FishingReport } from "@/data/fishing/types";

type SectionMeta = { slug: ShowcaseLakeSection; label: string; title: string; description: string };
type PageData = ShowcaseLakePrototype & { sections: SectionMeta[] };

const showcaseNames: Record<ShowcaseLakeSlug, string> = {
  "lake-fork": "Lake Fork",
  "sam-rayburn-reservoir": "Sam Rayburn Reservoir",
  "lake-livingston": "Lake Livingston",
  "lake-texoma": "Lake Texoma",
};

export function ShowcaseLakeGuide({
  section,
  reports,
  guides,
  businesses,
  placements,
  pageData,
}: {
  section?: ShowcaseLakeSection;
  reports: FishingReport[];
  guides: FishingGuide[];
  businesses: FishingBusiness[];
  placements: FishingPlacement[];
  pageData: PageData;
}) {
  const active = section ? pageData.sections.find((item) => item.slug === section) : undefined;
  const title = active?.title ?? `${pageData.overview.name} Fishing Guide`;
  const description = active?.description ?? pageData.overview.summary;
  const verifiedGuides = guides.filter((guide) => guide.verifiedListing);

  return <>
    <Container className="pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li>
        <li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li><li aria-hidden>·</li>
        {section ? <><li><a href={showcaseLakeCanonicalPath(pageData.slug)} className="hover:text-foreground">{pageData.overview.name}</a></li><li aria-hidden>·</li><li aria-current="page">{active?.label}</li></> : <li aria-current="page">{pageData.overview.name}</li>}
      </ol></nav>
    </Container>

    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20">
      <p className="eyebrow text-ink-foreground/65">Texas Defined Fishing · {pageData.overview.region}</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{description}</p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.12em] text-ink-foreground/60"><span>{pageData.overview.surfaceAcres.toLocaleString("en-US")} acres</span><span>{pageData.overview.maxDepthFeet} ft max depth</span><span>Verified {formatDate(pageData.verifiedAt)}</span></div>
    </Container></header>

    <div className="border-b border-border bg-background"><Container><nav aria-label={`${pageData.overview.name} guide sections`} className="flex gap-5 overflow-x-auto py-4 text-xs font-semibold uppercase tracking-[0.12em]">
      <a href={showcaseLakeCanonicalPath(pageData.slug)} className={!section ? "text-primary" : "text-muted-foreground hover:text-foreground"}>Overview</a>
      {pageData.sections.map((item) => <a key={item.slug} href={showcaseLakeCanonicalPath(pageData.slug, item.slug)} className={section === item.slug ? "whitespace-nowrap text-primary" : "whitespace-nowrap text-muted-foreground hover:text-foreground"}>{item.label}</a>)}
    </nav></Container></div>

    <Container className="py-12 sm:py-16">
      {!section && <Overview pageData={pageData} businesses={businesses} placements={placements} />}
      {section === "fish" && <Fish pageData={pageData} />}
      {section === "access" && <Access pageData={pageData} />}
      {section === "boating" && <Boating pageData={pageData} />}
      {section === "regulations" && <Regulations pageData={pageData} />}
      {section === "camping" && <Camping pageData={pageData} />}
      {section === "nearby" && <Nearby pageData={pageData} />}
      {section === "reports" && <Reports reports={reports} pageData={pageData} />}
      {section === "guides" && <Guides guides={verifiedGuides} placements={placements} pageData={pageData} />}
      <SourceFooter pageData={pageData} />
    </Container>
  </>;
}

function Overview({ pageData, businesses, placements }: { pageData: PageData; businesses: FishingBusiness[]; placements: FishingPlacement[] }) {
  const o = pageData.overview;
  return <div className="space-y-16">
    <section className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
      <div>
        <p className="eyebrow text-primary">At a glance</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">What makes {o.name} different.</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{pageData.identityAngle}</p>
        <dl className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3">
          <Fact label="Surface area" value={`${o.surfaceAcres.toLocaleString("en-US")} acres`} /><Fact label="Maximum depth" value={`${o.maxDepthFeet} ft`} /><Fact label="Impounded" value={String(o.impoundedYear)} /><Fact label="Counties" value={o.counties.join(", ")} /><Fact label="Waterway" value={o.waterway} /><Fact label="Conservation pool" value={o.conservationPool} /><Fact label="Normal fluctuation" value={o.normalFluctuation} /><Fact label="Water clarity" value={o.normalClarity} /><Fact label="Controlling authority" value={o.controllingAuthority} />
        </dl>
      </div>
      <aside className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">Map & water</p><div className="mt-4 aspect-[4/3] overflow-hidden border border-border bg-muted"><iframe title={`Map of ${o.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full" /></div><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Open map →</a><a href={pageData.sources.liveLevel.url} target="_blank" rel="noreferrer noopener" className="eyebrow ml-5 mt-4 inline-block border-b border-primary pb-1 text-primary">Live lake level →</a></aside>
    </section>

    <section><p className="eyebrow text-primary">Cover & structure</p><h2 className="mt-3 font-display text-4xl">What the water looks like to a fish.</h2><div className="mt-7 grid gap-5 sm:grid-cols-2">{pageData.habitat.map((item) => <p key={item} className="border-t border-border pt-5 text-sm leading-7 text-muted-foreground">{item}</p>)}</div></section>

    <section><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Fish this lake</p><h2 className="mt-3 font-display text-4xl">The targets that define {o.name}.</h2></div><a href={showcaseLakeCanonicalPath(pageData.slug, "fish")} className="eyebrow border-b border-primary pb-1 text-primary">Full fish guide →</a></div><div className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">{pageData.fish.slice(0, 6).map((fish) => <article key={fish.id} className="border-b border-border py-6 sm:px-5 sm:first:pl-0"><p className="eyebrow text-primary">{fish.quality}</p><h3 className="mt-2 font-display text-2xl"><a href={fishingFoundationAnchor("species", fish.id)} className="hover:text-primary">{fish.name}</a></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{fish.summary}</p></article>)}</div></section>

    <section aria-labelledby="quick-answers" className="border-t border-border pt-8"><p className="eyebrow text-primary">Quick answers</p><h2 id="quick-answers" className="mt-3 font-display text-3xl">Plan the trip faster.</h2><div className="mt-6 grid gap-6 md:grid-cols-3"><QuickAnswer question={`What is ${o.name} best known for?`} answer={pageData.identityAngle} /><QuickAnswer question={`How large is ${o.name}?`} answer={`${o.name} covers ${o.surfaceAcres.toLocaleString("en-US")} acres and reaches a published maximum depth of ${o.maxDepthFeet} feet.`} /><QuickAnswer question={`Where should I check ${o.name} fishing rules?`} answer="Use the current Texas Parks & Wildlife Department rules before harvesting fish; this guide avoids freezing changeable bag limits into evergreen copy." /></div></section>

    <section className="border-t border-border pt-8"><p className="eyebrow text-primary">Local fishing services</p><h2 className="mt-3 font-display text-3xl">A directory designed to grow around the lake.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined can connect verified local businesses to the water they actually serve without letting advertising alter editorial fishing guidance.</p><div className="mt-6 flex flex-wrap gap-2">{pageData.businessCategories.map((category) => <span key={category} className="border border-border px-3 py-2 text-xs">{category}</span>)}</div>{businesses.length > 0 ? <div className="mt-8 grid gap-5 sm:grid-cols-2">{businesses.map((business) => <article key={business.id} className="border-t border-border pt-5"><p className="eyebrow text-primary">Verified local listing</p><h3 className="mt-2 font-display text-xl">{business.name}</h3><p className="mt-2 text-sm text-muted-foreground">{business.description}</p>{business.website && <a href={business.website} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block border-b border-primary text-sm text-primary">Website →</a>}</article>)}</div> : <p className="mt-6 text-sm leading-7 text-muted-foreground">Local business inventory is ready, but no verified fishing-business listing is published for this lake yet. We do not invent businesses to make the directory look full.</p>}<Sponsored placements={placements} /></section>

    <section className="border-t border-border pt-8"><p className="eyebrow text-primary">Compare the showcase lakes</p><h2 className="mt-3 font-display text-3xl">Keep fishing across Texas.</h2><div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">{Object.entries(showcaseNames).filter(([slug]) => slug !== pageData.slug).map(([slug, name]) => <a key={slug} href={showcaseLakeCanonicalPath(slug as ShowcaseLakeSlug)} className="border-b border-primary pb-1 text-sm font-semibold text-primary">{name} →</a>)}<Link to="/fishing/lakes/lake-conroe" className="border-b border-primary pb-1 text-sm font-semibold text-primary">Lake Conroe →</Link></div></section>
  </div>;
}

function Fish({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Species, seasons & techniques</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Fish the lake's real strengths.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">These are durable patterns drawn from official fisheries guidance, not a claim about today's bite.</p><div className="mt-10 space-y-9">{pageData.fish.map((fish) => <article key={fish.id} id={fish.id} className="scroll-mt-28 border-t border-border pt-7"><div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr]"><div><p className="eyebrow text-primary">{fish.prominence} · {fish.quality}</p><h3 className="mt-2 font-display text-3xl"><a href={fishingFoundationAnchor("species", fish.id)} className="hover:text-primary">{fish.name}</a></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{fish.summary}</p><div className="mt-4 flex flex-wrap gap-2">{fish.techniques.map((technique) => <span key={technique} className="border border-border px-2.5 py-1 text-xs text-muted-foreground">{technique}</span>)}</div></div><div className="grid gap-4 sm:grid-cols-2">{fish.seasons.map((pattern) => <div key={pattern.label} className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">{pattern.label}</p><p className="mt-2 text-sm leading-6">{pattern.text}</p></div>)}</div></div></article>)}</div></section>; }

function Access({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Verified access planning</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Choose the launch before you tow.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Facilities are drawn from official access inventories. Private fees, closures and water-level usability can change, so verify the operating source before travel.</p><div className="mt-9 grid gap-x-8 border-t border-border md:grid-cols-2">{pageData.access.map((item) => <article key={item.name} className="border-b border-border py-7"><p className="eyebrow text-primary">{item.operator}</p><h3 className="mt-2 font-display text-2xl">{item.name}</h3><dl className="mt-4 space-y-2 text-sm leading-6"><div><dt className="inline text-muted-foreground">Launch: </dt><dd className="inline">{item.launch}</dd></div><div><dt className="inline text-muted-foreground">Fee: </dt><dd className="inline">{item.fee}</dd></div><div><dt className="inline text-muted-foreground">Availability: </dt><dd className="inline">{item.availability}</dd></div></dl></article>)}</div><a href={pageData.sources.tpwdAccess.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Verify all access with TPWD →</a></section>; }

function Boating({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Before you launch</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Water level, navigation and invasive-species rules matter.</h2><div className="mt-8 grid gap-5 sm:grid-cols-2">{pageData.boatingNotes.map((item) => <p key={item} className="border-t border-border pt-5 text-sm leading-7 text-muted-foreground">{item}</p>)}</div><div className="mt-10 flex flex-wrap gap-5"><a href={pageData.sources.liveLevel.url} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Check live lake level →</a><a href={showcaseLakeCanonicalPath(pageData.slug, "access")} className="eyebrow border-b border-primary pb-1 text-primary">Compare access →</a></div></section>; }

function Regulations({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Rules planning</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Confirm the current rule before harvest.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">This page was source-checked {formatDate(pageData.verifiedAt)}. It summarizes the issues an angler should know to check, but deliberately avoids hard-coding changeable bag and length limits.</p><div className="mt-9 border-t border-border">{pageData.regulations.map((row) => <div key={row.label} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[0.3fr_0.7fr]"><h3 className="font-display text-xl">{row.label}</h3><p className="text-sm leading-6 text-muted-foreground">{row.text}</p></div>)}</div><a href={pageData.sources.tpwdRegulations.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Open current TPWD regulations →</a></section>; }

function Camping({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Stay near the water</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Start with overnight options we can verify.</h2><div className="mt-9 grid gap-6 lg:grid-cols-2">{pageData.camping.map((item) => <article key={item.name} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">{item.type}</p><h3 className="mt-2 font-display text-2xl">{item.name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p><a href={item.href} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Verify official details →</a></article>)}</div></section>; }

function Nearby({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Build a bigger trip</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Connect the lake to the rest of TexasDefined.</h2><div className="mt-9 grid gap-x-8 border-t border-border md:grid-cols-2">{pageData.nearby.map((item) => <article key={item.label} className="border-b border-border py-7"><h3 className="font-display text-2xl">{item.label}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>{item.external ? <a href={item.href} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Official source →</a> : <a href={item.href} className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">TexasDefined guide →</a>}</article>)}</div></section>; }

function Reports({ reports, pageData }: { reports: FishingReport[]; pageData: PageData }) { return <section><p className="eyebrow text-primary">Freshness first</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Fishing reports need dates and attribution.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{pageData.reportSnapshot.summary}</p>{reports.length > 0 ? <div className="mt-9 space-y-6">{reports.map((report) => <article key={report.id} className="border-t border-border pt-6"><p className="eyebrow text-primary">Published {formatDate(report.publishedAt)}</p><h3 className="mt-2 font-display text-2xl">{report.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{report.summary}</p></article>)}</div> : <div className="mt-9 border-l-2 border-primary pl-5"><h3 className="font-display text-2xl">No TexasDefined current report is published.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">We do not turn evergreen seasonal guidance into a fake current report. Use TPWD's current fisheries information until a dated TexasDefined report is available.</p></div>}<a href={pageData.sources.tpwdLake.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Open TPWD lake page →</a></section>; }

function Guides({ guides, placements, pageData }: { guides: FishingGuide[]; placements: FishingPlacement[]; pageData: PageData }) { return <section><p className="eyebrow text-primary">Local expertise</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Only verified guide profiles belong here.</h2>{guides.length > 0 ? <div className="mt-9 grid gap-6 md:grid-cols-2">{guides.map((guide) => <article key={guide.id} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">Verified listing</p><h3 className="mt-2 font-display text-2xl">{guide.businessName}</h3>{guide.bio && <p className="mt-3 text-sm leading-7 text-muted-foreground">{guide.bio}</p>}{guide.website && <a href={guide.website} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block border-b border-primary text-sm text-primary">Guide website →</a>}</article>)}</div> : <div className="mt-9 border-l-2 border-primary pl-5"><h3 className="font-display text-2xl">No {pageData.overview.name} guide has cleared the verified-listing gate yet.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">We will not fill the directory with scraped names or implied endorsements. Guides can submit a profile for verification and future report/article contributor access.</p><Link to="/partner-with-us" className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Partner with TexasDefined →</Link></div>}<Sponsored placements={placements} /><div className="mt-9 border-t border-border pt-6"><p className="eyebrow text-primary">Sponsorship policy</p><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Paid placement never changes the verified-listing requirement or editorial fishing advice. Sponsored positions are labeled and kept separate from organic guide listings.</p></div></section>; }

function Sponsored({ placements }: { placements: FishingPlacement[] }) { if (!placements.length) return null; return <div className="mt-9 border-t border-border pt-6"><p className="eyebrow text-primary">Sponsored</p><div className="mt-5 grid gap-5 sm:grid-cols-2">{placements.map((placement) => <article key={placement.id} className="border border-border p-5"><p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">Sponsored placement</p><p className="mt-3 text-sm leading-6">A paid lake-area partner. Sponsorship does not affect species ratings, lake advice or guide verification.</p><a href={placement.destinationUrl} target="_blank" rel="noreferrer noopener sponsored" className="mt-4 inline-block border-b border-primary pb-1 text-sm text-primary">Visit sponsored partner →</a></article>)}</div></div>; }

function SourceFooter({ pageData }: { pageData: PageData }) { return <section className="mt-16 border-t border-border pt-8"><p className="eyebrow text-primary">Source transparency</p><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Core facts and durable fishing patterns were checked against official sources on {formatDate(pageData.verifiedAt)}. Water levels, closures, access, regulations and current fishing activity can change.</p><ul className="mt-5 space-y-3 text-sm">{Object.values(pageData.sources).map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1 hover:border-primary hover:text-primary">{source.label}</a></li>)}</ul></section>; }
function Fact({ label, value }: { label: string; value: string }) { return <div><dt className="eyebrow text-muted-foreground">{label}</dt><dd className="mt-1 text-sm">{value}</dd></div>; }
function QuickAnswer({ question, answer }: { question: string; answer: string }) { return <div className="border-t border-border pt-5"><h3 className="font-display text-xl">{question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p></div>; }
function formatDate(value: string) { const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }); }
