import { useMemo, useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { texasWaterParks, texasWaterParkRegions } from "@/data/texas-water-parks";

const description = "Find Texas water parks by region, indoor or outdoor setting, and admission style. Compare destination parks, public indoor parks, city water parks and resort-only facilities with official links.";

export const Route = createLazyFileRoute("/explore/water-parks/")({ component: WaterParkDirectory });

function WaterParkDirectory() {
  const [region, setRegion] = useState("All Texas");
  const [setting, setSetting] = useState("All settings");
  const [access, setAccess] = useState("All access types");
  const [query, setQuery] = useState("");
  const results = useMemo(() => texasWaterParks.filter((park) => {
    if (region !== "All Texas" && park.region !== region) return false;
    if (setting === "Indoor" && park.setting === "Outdoor") return false;
    if (setting === "Outdoor" && park.setting === "Indoor") return false;
    if (access === "Public day parks" && /Resort|Campground/.test(park.kind)) return false;
    if (access === "Resorts & campgrounds" && !/Resort|Campground/.test(park.kind)) return false;
    const search = query.trim().toLowerCase();
    return !search || [park.name, park.city, park.region, park.summary].join(" ").toLowerCase().includes(search);
  }), [region, setting, access, query]);

  return <main>
    <div className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><Link to="/explore" className="underline">Explore Texas</Link> / Water parks</nav>
        <p className="eyebrow mt-10 text-primary">The Texas water-park guide</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-tight sm:text-6xl">Texas water parks, from indoor escapes to summer slides</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">{description}</p>
        <p className="mt-5 max-w-4xl text-sm leading-7">The guide currently includes <strong>{texasWaterParks.length} separate facilities</strong>. Each location has its own visitor guide; chains count once per physical park. It is an actively researched collection, not a claim that every municipal or resort water-play facility has already been identified.</p>
        <p className="mt-3 text-sm text-muted-foreground">Operator references assembled October 17, 2026; check each official calendar for current status. Seasonal parks may be closed for fall or winter; see the park's official calendar before departing.</p>
      </Container>
    </div>
    <Container className="py-10 sm:py-14">
      <section aria-labelledby="find-park" className="border-y border-border py-7">
        <h2 id="find-park" className="font-display text-3xl">Find the right park</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-semibold">Park or city
            <input className="mt-2 w-full border border-border bg-background p-3 font-normal" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try Waco or water slides" />
          </label>
          <label className="text-sm font-semibold">Part of Texas
            <select className="mt-2 w-full border border-border bg-background p-3 font-normal" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option>All Texas</option>{texasWaterParkRegions.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">Indoor or outdoor
            <select className="mt-2 w-full border border-border bg-background p-3 font-normal" value={setting} onChange={(e) => setSetting(e.target.value)}>
              <option>All settings</option><option>Indoor</option><option>Outdoor</option>
            </select>
          </label>
          <label className="text-sm font-semibold">Type of admission
            <select className="mt-2 w-full border border-border bg-background p-3 font-normal" value={access} onChange={(e) => setAccess(e.target.value)}>
              <option>All access types</option><option>Public day parks</option><option>Resorts &amp; campgrounds</option>
            </select>
          </label>
        </div>
        <p role="status" className="mt-5 text-sm text-muted-foreground">Showing {results.length} of {texasWaterParks.length} park guides</p>
      </section>
      <section className="mt-10" aria-labelledby="all-parks">
        <h2 id="all-parks" className="font-display text-3xl">Browse the parks</h2>
        {results.length ? <ul className="mt-7 grid gap-x-8 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
          {results.map((park) => <li key={park.slug} className="border-t-2 border-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">{park.setting} · {park.kind}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight"><Link to="/explore/water-parks/$slug" params={{ slug: park.slug }} className="hover:text-primary">{park.name}</Link></h3>
            <p className="mt-1 text-sm text-muted-foreground">{park.city}{park.county ? ` · ${park.county} County` : ""} · {park.region}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{park.summary}</p>
            <p className="mt-3 text-sm leading-6"><strong>Entry:</strong> {park.admission}</p>
            <Link className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary" to="/explore/water-parks/$slug" params={{slug:park.slug}}>Plan this water-park day →</Link>
          </li>)}
        </ul> : <p className="mt-6 text-muted-foreground">No matching parks in this group. Try another region or remove a filter.</p>}
      </section>
      <section className="mt-16 border-t border-border pt-9">
        <h2 className="font-display text-3xl">Which kind of water park is right for your trip?</h2>
        <div className="mt-5 grid gap-7 sm:grid-cols-3">
          <div><h3 className="font-semibold">Indoor parks</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Good options for colder or rainy days. Some are open to day visitors, while hotel resorts may bundle admission with rooms. Confirm the specific operating hours.</p></div>
          <div><h3 className="font-semibold">Outdoor destination parks</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Slides, rivers and wave attractions suit a full summer day. Operating seasons, ride availability, weather closures and ticket inclusions vary widely.</p></div>
          <div><h3 className="font-semibold">Municipal and resort parks</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">City parks can be convenient for shorter outings. Resorts and campgrounds sometimes require an overnight stay or limited-quantity day passes.</p></div>
        </div>
        <p className="mt-7 text-sm leading-7 text-muted-foreground">A playground spray pad or ordinary swimming pool is not counted as a stand-alone water park. Known permanently closed parks are excluded from this visitor list. Seasonal parks may be closed right now without being permanently shut down. Small city facilities with substantial slides or water-play complexes are included where operator materials support that classification.</p>
      </section>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-3xl">Make a weekend of it</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Pair a park with nearby attractions, river towns or a hotel rather than crossing Texas for a single slide. Start with our <Link to="/explore/trip-planner" className="text-primary underline">Texas trip planner</Link>, browse <Link to="/browse/cities" className="text-primary underline">Texas city guides</Link>, or look at <Link to="/explore/top-attractions" className="text-primary underline">landmark attractions</Link> nearby.</p>
      </section>
    </Container>
  </main>;
}
