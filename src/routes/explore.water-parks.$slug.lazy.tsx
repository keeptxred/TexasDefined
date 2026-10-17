import { createLazyFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { texasWaterParks } from "@/data/texas-water-parks";

const routeApi = getRouteApi("/explore/water-parks/$slug");
export const Route = createLazyFileRoute("/explore/water-parks/$slug")({ component: WaterParkGuidePage });

function WaterParkGuidePage() {
  const park = routeApi.useLoaderData();
  // Prefer truly local same-county alternatives over an arbitrary regional slice.
  const nearby = texasWaterParks
    .filter((item) => item.slug !== park.slug && (item.county === park.county || item.region === park.region))
    .sort((a, b) => Number(b.county === park.county) - Number(a.county === park.county)
      || a.city.localeCompare(b.city) || a.name.localeCompare(b.name))
    .slice(0, 5);
  const isResort = /Resort|Campground/.test(park.kind);
  const isIndoor = park.setting === "Indoor";
  const isBoth = park.setting === "Both";

  return <main>
    <header className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/explore" className="underline">Explore</Link><span className="mx-2">/</span>
          <Link to="/explore/water-parks" className="underline">Water parks</Link><span className="mx-2">/</span>{park.city}
        </nav>
        <p className="eyebrow mt-9 text-primary">{park.region} · {park.setting} water park</p>
        <h1 className="mt-4 max-w-5xl font-display text-4xl leading-tight sm:text-6xl">{park.name}</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">{park.summary}</p>
        <p className="mt-4 text-sm text-muted-foreground">Research-in-progress visitor guide · Operator source links assembled October 17, 2026</p>
        <a className="mt-7 inline-flex bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90" href={park.officialUrl} target="_blank" rel="noopener noreferrer">Read the official park or public-agency source ↗</a>
      </Container>
    </header>
    <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-2">
      <article>
        {park.licensedMedia ? <figure className="mb-10 border-b border-border pb-8">
          <img
            src={park.licensedMedia.src}
            alt={park.licensedMedia.alt}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
          <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">
            Historical photograph ({park.licensedMedia.year}), not a representation of the current ride lineup.
            Photo by {park.licensedMedia.photographer}.{' '}
            <a className="underline" href={park.licensedMedia.sourceUrl} target="_blank" rel="noopener noreferrer">Wikimedia Commons source</a>
            {' '}·{' '}
            <a className="underline" href={park.licensedMedia.licenseUrl} target="_blank" rel="noopener noreferrer">{park.licensedMedia.licenseLabel} license</a>.
            Image shown unmodified; rights and venue are individually documented.
          </figcaption>
        </figure> : null}
        <section aria-labelledby="water-park-glance">
          <h2 id="water-park-glance" className="font-display text-3xl">At a glance</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["Location", `${park.city}, Texas`],
              ...(park.visitorAddress ? [["Verified venue address", park.visitorAddress]] : []),
              ["Region", park.region],
              ...(park.county ? [["County", `${park.county} County`]] : []),
              ["Setting", park.setting === "Both" ? "Indoor and outdoor" : park.setting],
              ["Type", park.kind],
              ["Getting in", park.admission],
              ["Research registry updated", park.reviewedAt],
            ].map(([label, value]) => <div key={label} className="border-t border-border pt-4"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-2 leading-6">{value}</dd></div>)}
          </dl>
          {park.visitorAddress ? <a
            className="mt-5 inline-block text-sm font-semibold text-primary underline"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.visitorAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
          >Open map and directions for this venue ↗</a> : null}
        </section>
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">What makes this park worth considering</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{park.summary}</p>
          <p className="mt-4 leading-8 text-muted-foreground">{isIndoor
            ? "An indoor setting reduces dependence on summer weather, but each operator still sets its own open-swim schedule, ride hours and temporary maintenance closures."
            : isBoth
              ? "This location has both indoor and outdoor water-play elements. Check which specific pools and rides are included with your ticket and scheduled to run on the date you choose."
              : "This is primarily an outdoor water-park outing. Rain, lightning, cooler weather, staffing and the end of the summer season can all change what is available on a particular date."}</p>
        </section>
        {park.visitorHighlights?.length ? <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">Confirmed facilities and water activities</h2>
          <ul className="mt-5 space-y-3">
            {park.visitorHighlights.map((highlight) => <li key={highlight} className="leading-8 text-muted-foreground">{highlight}</li>)}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">Features listed by the responsible operator can be temporarily closed; confirm availability for your visit.</p>
        </section> : null}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">Tickets, day passes and who can visit</h2>
          <p className="mt-4 leading-8 text-muted-foreground"><strong>Published access approach:</strong> {park.admission}. {isResort
            ? "This is part of a resort or campground setting. Do not assume the general public can walk in for a day of swimming; the operator may require an overnight reservation or limit visitor passes."
            : "The operator sells or administers water-park admission, but eligibility, promotions and what each pass includes can change throughout the season."}</p>
          <p className="mt-4 leading-8 text-muted-foreground">Ticket rates can vary by season, day, residence and attractions. Some sources here are municipal announcements rather than ticket pages, so confirm the current operator schedule and full admission total before purchasing.</p>
          <a href={park.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {park.name}'s operator or agency source ↗</a>
        </section>
        {park.visitorFaqs?.length ? <section className="mt-12 border-t border-border pt-8" aria-labelledby="water-park-visitor-questions">
          <h2 id="water-park-visitor-questions" className="font-display text-3xl">Questions that matter for this park</h2>
          <dl className="mt-6 space-y-6">
            {park.visitorFaqs.map((faq) => <div key={faq.question}>
              <dt className="font-semibold">{faq.question}</dt>
              <dd className="mt-2 leading-7 text-muted-foreground">{faq.answer} <a href={faq.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">Official source ↗</a></dd>
            </div>)}
          </dl>
        </section> : null}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">Best time to visit and what to check</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{park.distinctiveNote}</p>
          <p className="mt-4 leading-8 text-muted-foreground">{isIndoor
            ? "Check school-year and holiday hours rather than assuming the park is open all day, every day. Indoor attractions can still close for maintenance or private events."
            : "Most Texas outdoor water parks concentrate public hours between late spring and early fall. Even when a website offers season passes, that does not mean the rides are currently operating."}</p>
          <p className="mt-4 leading-8 text-muted-foreground">Before making the drive, verify the day's hours, ride and pool closures, minimum heights, flotation-device rules, parking charges, food policy, and rain or lightning procedures. Any early or late-season visit deserves an extra check on the morning of travel.</p>
        </section>
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">How to plan a visit from {park.city}</h2>
          <p className="mt-4 leading-8 text-muted-foreground">Build the day around admission and expected time in the water, then plan a meal and a short nearby stop only if your group still has energy. See <Link className="text-primary underline" to="/browse/cities">our Texas city guides</Link> for more ideas around {park.city}{park.county ? <> and <a className="text-primary underline" href={`/county/${park.county.toLowerCase().replace(/\s+/g, "-")}`}>{park.county} County</a></> : null}, and use the <Link className="text-primary underline" to="/explore/trip-planner">Texas trip planner</Link> to organize a longer route.</p>
          <p className="mt-4 leading-8 text-muted-foreground">If a water park is not the right fit for your group, compare <Link className="text-primary underline" to="/explore/top-attractions">other Texas attractions</Link> or browse the <Link className="text-primary underline" to="/explore/water-parks">full indoor and outdoor water-park collection</Link>.</p>
        </section>
        {park.areaAttractions?.length ? <section className="mt-12 border-t border-border pt-8" aria-label="More county attractions">
          <h2 className="font-display text-3xl">Other attractions in this part of Texas</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            These are separate destinations with their own visitor guides and access rules.
            County-wide attractions may require a substantial additional drive; they are not included with a waterpark ticket.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {park.areaAttractions.map((item) => <li key={item.href}>
              <a className="block border-t border-border py-3 text-sm font-semibold text-primary underline underline-offset-4" href={item.href}>{item.label} →</a>
            </li>)}
          </ul>
        </section> : null}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">Official sources and editorial accuracy</h2>
          <p className="mt-4 leading-8 text-muted-foreground">The source below is maintained by the operator, responsible public agency or official local economic development body; it may not be a dedicated ticket-selling page. Ticket rates and operating hours are intentionally not copied here as evergreen facts. This guide is part of a source-backed research collection, not yet a fully verified authority profile. It does not claim an in-person visit, endorse any park, or guarantee today's ride availability.</p>
          <a href={park.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block break-all text-sm font-semibold text-primary underline">{park.officialUrl} ↗</a>
          <p className="mt-3 text-xs text-muted-foreground">Official reference recorded {park.reviewedAt}; verify access and the current calendar before traveling.</p>
        </section>
      </article>
      <aside>
        <div className="border border-border bg-surface p-6">
          <p className="eyebrow text-primary">Water parks in {park.region}</p>
          <h2 className="mt-3 font-display text-2xl">Other parks in this county and region</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Same-county options appear first; regional options may be farther away.</p>
          {nearby.length ? <ul className="mt-5 space-y-5">{nearby.map((item) => <li key={item.slug} className="border-t border-border pt-4">
            <Link to="/explore/water-parks/$slug" params={{slug:item.slug}} className="font-semibold text-primary hover:underline">{item.name} →</Link>
            <p className="mt-1 text-sm text-muted-foreground">{item.city} · {item.setting} · {item.kind}</p>
          </li>)}</ul> : <p className="mt-4 text-sm text-muted-foreground">Browse the full statewide list for additional options.</p>}
          <Link to="/explore/water-parks" className="mt-7 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">All Texas water parks →</Link>
        </div>
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="font-display text-2xl">More to explore</h3>
          <div className="mt-4 space-y-3 text-sm">
            <p><Link to="/browse/counties" className="font-semibold text-primary underline">Texas county guides</Link></p>
            <p><Link to="/explore" className="font-semibold text-primary underline">Explore Texas</Link></p>
            <p><Link to="/explore/trip-planner" className="font-semibold text-primary underline">Build a Texas road trip</Link></p>
          </div>
        </div>
      </aside>
    </Container>
  </main>;
}
