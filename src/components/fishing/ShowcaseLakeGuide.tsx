import { Link } from "@tanstack/react-router";

import { FishingPhoto } from "@/components/fishing/FishingPhoto";
import { Container } from "@/components/layout/Container";
import { getFishingFishImage, getFishingLakeImage } from "@/data/fishing/image-library";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import { fishingTechniqueCanonicalPath, isPublishedFishingTechniqueSlug } from "@/data/fishing/technique-routing";
import { isLiveLakeLevelSource } from "@/data/fishing/live-lake-level-source";
import { showcaseLakeCanonicalPath, type ShowcaseLakeSection } from "@/data/fishing/showcase-lake-routing";
import type { ShowcaseLakePrototype } from "@/data/fishing/showcase-lakes-prototype";
import type { FishingBusiness, FishingGuide, FishingPlacement, FishingReport } from "@/data/fishing/types";

type SectionMeta = { slug: ShowcaseLakeSection; label: string; title: string; description: string };
type PageData = ShowcaseLakePrototype & { sections: SectionMeta[] };


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
  const lakeImage = getFishingLakeImage(pageData.slug);
  return <div className="space-y-16">
    <section className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
      <div>
        <p className="eyebrow text-primary">At a glance</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">About {o.name}</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{pageData.identityAngle}</p>
        <dl className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3">
          <Fact label="Surface area" value={`${o.surfaceAcres.toLocaleString("en-US")} acres`} /><Fact label="Maximum depth" value={`${o.maxDepthFeet} ft`} /><Fact label="Impounded" value={String(o.impoundedYear)} /><Fact label="Counties" value={o.counties.join(", ")} /><Fact label="Nearby communities" value={o.nearestCommunities.join(", ")} /><Fact label="Waterway" value={o.waterway} /><Fact label="Conservation pool" value={o.conservationPool} /><Fact label="Normal fluctuation" value={o.normalFluctuation} /><Fact label="Water clarity" value={o.normalClarity} /><Fact label="Controlling authority" value={o.controllingAuthority} />
        </dl>
      </div>
      <aside className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">Map & water</p>{lakeImage ? <FishingPhoto image={lakeImage} className="mt-4" imageClassName="aspect-[4/3] w-full object-cover" /> : null}<div className={lakeImage ? "mt-6 aspect-[4/3] overflow-hidden border border-border bg-muted" : "mt-4 aspect-[4/3] overflow-hidden border border-border bg-muted"}><iframe title={`Map of ${o.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full" /></div><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Open map →</a><a href={pageData.sources.liveLevel.url} target="_blank" rel="noreferrer noopener" className="eyebrow ml-5 mt-4 inline-block border-b border-primary pb-1 text-primary">{isLiveLakeLevelSource(pageData.sources.liveLevel.url) ? "Live lake level →" : "Official current conditions →"}</a>{pageData.liveDataNote ? <p className="mt-5 text-xs leading-6 text-muted-foreground">{pageData.liveDataNote}</p> : null}</aside>
    </section>

    <section><p className="eyebrow text-primary">Cover & structure</p><h2 className="mt-3 font-display text-4xl">Fish Habitat and Structure</h2><div className="mt-7 grid gap-5 sm:grid-cols-2">{pageData.habitat.map((item) => <p key={item} className="border-t border-border pt-5 text-sm leading-7 text-muted-foreground">{item}</p>)}</div></section>

    <section><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Fish this lake</p><h2 className="mt-3 font-display text-4xl">Fish Species at {o.name}</h2></div><a href={showcaseLakeCanonicalPath(pageData.slug, "fish")} className="eyebrow border-b border-primary pb-1 text-primary">Full fish guide →</a></div><div className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">{pageData.fish.slice(0, 6).map((fish) => { const image = getFishingFishImage(fish.id); return <article key={fish.id} className="border-b border-border py-6 sm:px-5 sm:first:pl-0">{image ? <FishingPhoto image={image} showCredit={false} className="mb-4" imageClassName="aspect-[4/3] w-full object-contain bg-muted/30 p-3" /> : null}<p className="eyebrow text-primary">{fish.quality}</p><h3 className="mt-2 font-display text-2xl"><a href={fishingFoundationAnchor("species", fish.id)} className="hover:text-primary">{fish.name}</a></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{fish.summary}</p></article>; })}</div></section>

    <section aria-labelledby="quick-answers" className="border-t border-border pt-8"><p className="eyebrow text-primary">Quick answers</p><h2 id="quick-answers" className="mt-3 font-display text-3xl">Plan Your Visit</h2><div className="mt-6 grid gap-6 md:grid-cols-3"><QuickAnswer question={`What is ${o.name} best known for?`} answer={pageData.identityAngle} /><QuickAnswer question={`How large is ${o.name}?`} answer={`${o.name} covers ${o.surfaceAcres.toLocaleString("en-US")} acres and reaches a published maximum depth of ${o.maxDepthFeet} feet.`} /><QuickAnswer question={`Where should I check ${o.name} fishing rules?`} answer="Use the current Texas Parks & Wildlife Department rules before harvesting fish; this guide avoids freezing changeable bag limits into evergreen copy." /></div></section>

    <section className="border-t border-border pt-8"><p className="eyebrow text-primary">Local fishing services</p><h2 className="mt-3 font-display text-3xl">Fishing Services Near {o.name}</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined can connect verified local businesses to the water they actually serve without letting advertising alter editorial fishing guidance.</p><div className="mt-6 flex flex-wrap gap-2">{pageData.businessCategories.map((category) => <span key={category} className="border border-border px-3 py-2 text-xs">{category}</span>)}</div>{businesses.length > 0 ? <div className="mt-8 grid gap-5 sm:grid-cols-2">{businesses.map((business) => <article key={business.id} className="border-t border-border pt-5"><p className="eyebrow text-primary">Local fishing service</p><h3 className="mt-2 font-display text-xl">{business.name}</h3><p className="mt-2 text-sm text-muted-foreground">{business.description}</p>{business.website && <a href={business.website} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block border-b border-primary text-sm text-primary">Website →</a>}</article>)}</div> : <p className="mt-6 text-sm leading-7 text-muted-foreground">Local business inventory is ready, but no verified fishing-business listing is published for this lake yet. We do not invent businesses to make the directory look full.</p>}<Sponsored placements={placements} /></section>

    <section className="border-t border-border pt-8"><p className="eyebrow text-primary">Compare nearby waters</p><h2 className="mt-3 font-display text-3xl">Explore More Texas Fishing Lakes</h2><div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">{pageData.nearby.filter((item) => !item.external && item.href.startsWith("/fishing/lakes/")).map((item) => <a key={item.href} href={item.href} className="border-b border-primary pb-1 text-sm font-semibold text-primary">{item.label} →</a>)}<Link to="/fishing/lakes" className="border-b border-primary pb-1 text-sm font-semibold text-primary">All complete lake guides →</Link></div></section>
  </div>;
}

function Fish({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Species, seasons & techniques</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Fish Species, Seasons and Techniques</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">These are durable patterns drawn from official fisheries guidance, not a claim about today's bite.</p><div className="mt-10 space-y-9">{pageData.fish.map((fish) => { const image = getFishingFishImage(fish.id); return <article key={fish.id} id={fish.id} className="scroll-mt-28 border-t border-border pt-7"><div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr]"><div>{image ? <FishingPhoto image={image} showCredit={false} className="mb-5" imageClassName="aspect-[4/3] w-full object-contain bg-muted/30 p-3" /> : null}<p className="eyebrow text-primary">{fish.prominence} · {fish.quality}</p><h3 className="mt-2 font-display text-3xl"><a href={fishingFoundationAnchor("species", fish.id)} className="hover:text-primary">{fish.name}</a></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{fish.summary}</p><div className="mt-4 flex flex-wrap gap-2">{fish.techniques.map((technique) => <TechniquePill key={technique} label={technique} />)}</div></div><div className="grid gap-4 sm:grid-cols-2">{fish.seasons.map((pattern) => <div key={pattern.label} className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">{pattern.label}</p><p className="mt-2 text-sm leading-6">{pattern.text}</p></div>)}</div></div></article>; })}</div></section>; }

function Access({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Fishing access</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Boat Ramps and Fishing Access</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Facilities are drawn from official access inventories. Private fees, closures and water-level usability can change, so verify the operating source before travel.</p><div className="mt-9 grid gap-x-8 border-t border-border md:grid-cols-2">{pageData.access.map((item) => <article key={item.name} className="border-b border-border py-7"><p className="eyebrow text-primary">{item.operator}</p><h3 className="mt-2 font-display text-2xl">{item.name}</h3><dl className="mt-4 space-y-2 text-sm leading-6"><div><dt className="inline text-muted-foreground">Launch: </dt><dd className="inline">{item.launch}</dd></div><div><dt className="inline text-muted-foreground">Fee: </dt><dd className="inline">{item.fee}</dd></div><div><dt className="inline text-muted-foreground">Availability: </dt><dd className="inline">{item.availability}</dd></div></dl></article>)}</div><a href={pageData.sources.tpwdAccess.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Verify all access with TPWD →</a></section>; }

function Boating({ pageData }: { pageData: PageData }) {
  const o = pageData.overview;
  const lakeImage = getFishingLakeImage(pageData.slug);
  const primaryRamp = pageData.access[0];
  const statusSource = pageData.sources.parkAlerts ?? pageData.sources.tpwdAccess;
  const statusLabel = pageData.sources.parkAlerts ? "Check current park & ramp alerts →" : "Verify current ramp status →";

  return <div className="space-y-14">
    <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p className="eyebrow text-primary">Before you launch</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Boating {o.name}</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Water level, ramp depth and navigation hazards can change the practical boating experience on a reservoir long before a facility is formally closed. Use the live lake-level source and the operating agency's current access notices immediately before towing.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">{pageData.boatingNotes.map((item) => <p key={item} className="border-t border-border pt-5 text-sm leading-7 text-muted-foreground">{item}</p>)}</div>
      </div>
      <aside className="border-t-2 border-foreground pt-5">
        <p className="eyebrow text-primary">Map & current conditions</p>
        {lakeImage ? <FishingPhoto image={lakeImage} showCredit={false} className="mt-4" imageClassName="aspect-[4/3] w-full object-cover" /> : null}
        <div className={lakeImage ? "mt-5 aspect-[4/3] overflow-hidden border border-border bg-muted" : "mt-4 aspect-[4/3] overflow-hidden border border-border bg-muted"}><iframe title={`Boating map of ${o.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full" /></div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3"><a href={pageData.sources.liveLevel.url} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">{isLiveLakeLevelSource(pageData.sources.liveLevel.url) ? "Live lake level →" : "Official current conditions →"}</a><a href={statusSource.url} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">{statusLabel}</a></div>
        {pageData.liveDataNote ? <p className="mt-5 text-xs leading-6 text-muted-foreground">{pageData.liveDataNote}</p> : null}
      </aside>
    </section>

    <section aria-labelledby="boating-launch-access" className="border-t border-border pt-9">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Launch access</p><h2 id="boating-launch-access" className="mt-3 font-display text-3xl sm:text-4xl">Boat Ramps and Launch Planning</h2></div><a href={showcaseLakeCanonicalPath(pageData.slug, "access")} className="eyebrow border-b border-primary pb-1 text-primary">Full access guide →</a></div>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">An official listing is not a guarantee that the water reaches the end of a ramp today. Confirm both facility status and lake level before departure.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{pageData.access.map((item) => <article key={item.name} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">{item.kind.replace("-", " ")}</p><h3 className="mt-2 font-display text-2xl">{item.name}</h3><dl className="mt-4 space-y-2 text-sm leading-6"><div><dt className="inline text-muted-foreground">Launch: </dt><dd className="inline">{item.launch}</dd></div><div><dt className="inline text-muted-foreground">Fee: </dt><dd className="inline">{item.fee}</dd></div><div><dt className="inline text-muted-foreground">Status: </dt><dd className="inline">{item.availability}</dd></div></dl></article>)}</div>
    </section>

    <section className="border-t border-border pt-9">
      <p className="eyebrow text-primary">Launch-day checklist</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Know Before You Tow</h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAnswer question="Which ramp should I use?" answer={primaryRamp ? `Start with ${primaryRamp.name}, then compare every listed facility against today's water level and operator notices.` : "Compare the official access inventory against today's water level and operator notices."} />
        <QuickAnswer question="What changes first at low water?" answer="Usable ramp depth, exposed shoreline and submerged or newly exposed hazards can change before a lake-wide closure is posted." />
        <QuickAnswer question="What should I verify?" answer="Ramp status, lake level, wind and storms, required safety gear, invasive-species rules and any park or WMA access restrictions." />
        <QuickAnswer question="Where are the official updates?" answer="Use the live water-data link plus the managing agency's access or alert page linked on this page immediately before departure." />
      </div>
    </section>

    <section className="border-t border-border pt-9">
      <p className="eyebrow text-primary">Safety & navigation</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Plan for Changing Water, Weather and Cover</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3"><div><h3 className="font-display text-xl">Water level</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Reservoir elevation changes shoreline geometry, ramp reach and the location of shallow hazards. Do not navigate from an old shoreline assumption alone.</p></div><div><h3 className="font-display text-xl">Wind & storms</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Open water can build rough conditions quickly. Check the local forecast and radar close to launch time, not only when the trip is planned.</p></div><div><h3 className="font-display text-xl">Timber & structure</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Flooded timber, brush, points, roadbeds and other structure may be productive fishing cover and a navigation concern, especially when water levels shift.</p></div></div>
    </section>

    <section className="border-t border-border pt-9">
      <p className="eyebrow text-primary">Build the rest of the trip</p><h2 className="mt-3 font-display text-3xl sm:text-4xl">Camping, Fishing and Nearby Places</h2>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3"><a href={showcaseLakeCanonicalPath(pageData.slug)} className="border-b border-primary pb-1 text-sm font-semibold text-primary">{o.name} overview →</a><a href={showcaseLakeCanonicalPath(pageData.slug, "fish")} className="border-b border-primary pb-1 text-sm font-semibold text-primary">Fish species →</a><a href={showcaseLakeCanonicalPath(pageData.slug, "camping")} className="border-b border-primary pb-1 text-sm font-semibold text-primary">Camping →</a><a href={showcaseLakeCanonicalPath(pageData.slug, "nearby")} className="border-b border-primary pb-1 text-sm font-semibold text-primary">Nearby places →</a><a href={showcaseLakeCanonicalPath(pageData.slug, "regulations")} className="border-b border-primary pb-1 text-sm font-semibold text-primary">Fishing regulations →</a></div>
    </section>
  </div>;
}

function Regulations({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Rules planning</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Current Fishing Regulations</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">This page was source-checked {formatDate(pageData.verifiedAt)}. It summarizes the issues an angler should know to check, but deliberately avoids hard-coding changeable bag and length limits.</p><div className="mt-9 border-t border-border">{pageData.regulations.map((row) => <div key={row.label} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[0.3fr_0.7fr]"><h3 className="font-display text-xl">{row.label}</h3><p className="text-sm leading-6 text-muted-foreground">{row.text}</p></div>)}</div><a href={pageData.sources.tpwdRegulations.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Open current TPWD regulations →</a></section>; }

function Camping({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Stay near the water</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Camping Near the Lake</h2><div className="mt-9 grid gap-6 lg:grid-cols-2">{pageData.camping.map((item) => <article key={item.name} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">{item.type}</p><h3 className="mt-2 font-display text-2xl">{item.name}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p><a href={item.href} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Verify official details →</a></article>)}</div></section>; }

function Nearby({ pageData }: { pageData: PageData }) { return <section><p className="eyebrow text-primary">Build a bigger trip</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Things to Do Near the Lake</h2><div className="mt-9 grid gap-x-8 border-t border-border md:grid-cols-2">{pageData.nearby.map((item) => <article key={item.label} className="border-b border-border py-7"><h3 className="font-display text-2xl">{item.label}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>{item.external ? <a href={item.href} target="_blank" rel="noreferrer noopener" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Official source →</a> : <a href={item.href} className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">TexasDefined guide →</a>}</article>)}</div></section>; }

function Reports({ reports, pageData }: { reports: FishingReport[]; pageData: PageData }) { return <section><p className="eyebrow text-primary">Fishing reports</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Latest Available Fishing Report</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Fishing conditions can change quickly. Each report keeps its original publication date and source so you can see how recent the information is.</p>{reports.length > 0 ? <div className="mt-9 space-y-6">{reports.map((report) => <article key={report.id} className="border-t border-border pt-6"><p className="eyebrow text-primary">Published {formatDate(report.publishedAt)}</p><h3 className="mt-2 font-display text-2xl">{report.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{report.summary}</p></article>)}</div> : <div className="mt-9 border-l-2 border-primary pl-5"><h3 className="font-display text-2xl">No recent report is available.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Check TPWD for the latest official lake information while a newer dated fishing report is unavailable.</p></div>}<a href={pageData.sources.tpwdLake.url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Open official TPWD lake page →</a></section>; }

function Guides({ guides, placements, pageData }: { guides: FishingGuide[]; placements: FishingPlacement[]; pageData: PageData }) { return <section><p className="eyebrow text-primary">Local expertise</p><h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Fishing Guides for This Lake</h2>{guides.length > 0 ? <div className="mt-9 grid gap-6 md:grid-cols-2">{guides.map((guide) => <article key={guide.id} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">Fishing guide listing</p><h3 className="mt-2 font-display text-2xl">{guide.businessName}</h3>{guide.bio && <p className="mt-3 text-sm leading-7 text-muted-foreground">{guide.bio}</p>}{guide.website && <a href={guide.website} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block border-b border-primary text-sm text-primary">Guide website →</a>}</article>)}</div> : <div className="mt-9 border-l-2 border-primary pl-5"><h3 className="font-display text-2xl">No {pageData.overview.name} guide has cleared the verified-listing gate yet.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">We will not fill the directory with scraped names or implied endorsements. Guides can submit a profile for verification and future report/article contributor access.</p><Link to="/partner-with-us" className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Partner with TexasDefined →</Link></div>}<Sponsored placements={placements} /><div className="mt-9 border-t border-border pt-6"><p className="eyebrow text-primary">Sponsorship policy</p><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Paid placement never changes the verified-listing requirement or editorial fishing advice. Sponsored positions are labeled and kept separate from organic guide listings.</p></div></section>; }

function Sponsored({ placements }: { placements: FishingPlacement[] }) { if (!placements.length) return null; return <div className="mt-9 border-t border-border pt-6"><p className="eyebrow text-primary">Sponsored</p><div className="mt-5 grid gap-5 sm:grid-cols-2">{placements.map((placement) => <article key={placement.id} className="border border-border p-5"><p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">Sponsored placement</p><p className="mt-3 text-sm leading-6">A paid lake-area partner. Sponsorship does not affect species ratings, lake advice or guide verification.</p><a href={placement.destinationUrl} target="_blank" rel="noreferrer noopener sponsored" className="mt-4 inline-block border-b border-primary pb-1 text-sm text-primary">Visit sponsored partner →</a></article>)}</div></div>; }

function SourceFooter({ pageData }: { pageData: PageData }) { const sources = [...new Map(Object.values(pageData.sources).map((source) => [source.url, source])).values()]; return <section className="mt-16 border-t border-border pt-8"><p className="eyebrow text-primary">Source transparency</p><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Core facts and durable fishing patterns were checked against official sources on {formatDate(pageData.verifiedAt)}. Water levels, closures, access, regulations and current fishing activity can change.</p><ul className="mt-5 space-y-3 text-sm">{sources.map((source) => <li key={`${source.label}-${source.url}`}><a href={source.url} target="_blank" rel="noreferrer noopener" className="border-b border-border pb-1 hover:border-primary hover:text-primary">{source.label}</a></li>)}</ul></section>; }
function Fact({ label, value }: { label: string; value: string }) { return <div><dt className="eyebrow text-muted-foreground">{label}</dt><dd className="mt-1 text-sm">{value}</dd></div>; }
function QuickAnswer({ question, answer }: { question: string; answer: string }) { return <div className="border-t border-border pt-5"><h3 className="font-display text-xl">{question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p></div>; }
function formatDate(value: string) { const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value); return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }); }


const TECHNIQUE_SLUG_BY_LABEL: Record<string, string> = {
  "soft plastics": "soft-plastics",
  crankbaits: "crankbaits",
  spinnerbaits: "spinnerbaits",
  topwater: "topwater",
  trolling: "trolling",
  "vertical jigging": "vertical-jigging",
  "jigs and minnows": "jigs-and-minnows",
  "live bait": "live-bait",
  "cut bait": "cut-bait",
};

function TechniquePill({ label }: { label: string }) {
  const slug = TECHNIQUE_SLUG_BY_LABEL[label.trim().toLowerCase()];
  if (!slug || !isPublishedFishingTechniqueSlug(slug)) return <span className="border border-border px-2.5 py-1 text-xs text-muted-foreground">{label}</span>;
  return <a href={fishingTechniqueCanonicalPath(slug)} className="border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary">{label}</a>;
}
