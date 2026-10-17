import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import {
  thcRecentListedLandmarks,
  thcPendingLandmarks,
  thcListingTotals,
  THC_ATLAS_URL,
  THC_LISTINGS_URL,
  THC_RESEARCH_REVIEWED_ON,
} from "@/data/thc-recent-landmarks";

export const Route = createLazyFileRoute("/texas-historic-landmarks")({ component: TexasHistoricLandmarksPage });

const completedAuthoritySlugs: Record<string,string> = {
  "Olivewood Cemetery": "olivewood-cemetery",
  "Castro County Courthouse": "castro-county-courthouse",
  "Southern Pacific Passenger Depot": "southern-pacific-passenger-depot-del-rio",
  "Bosque River Bridge": "bosque-river-bridge-meridian",
  "Holland Hotel": "holland-hotel",
  "Sycamore Creek Bridge": "sycamore-creek-bridge-fort-worth",
  "Bailey County Courthouse": "bailey-county-courthouse",
  "Wimberley Downtown Square Historic District": "wimberley-downtown-square-historic-district",
  "Sour Lake Historic District": "sour-lake-downtown-historic-district",
  "Sour Lake Downtown Historic District": "sour-lake-downtown-historic-district",
  "Kokernot Field": "kokernot-field",
  "Alpine Downtown Historic District": "alpine-downtown-historic-district",
  "Downtown Bryan Historic District": "downtown-bryan-historic-district",
};
const kindLabels: Record<string, string> = {
  building: "Historic buildings",
  district: "Historic districts",
  church: "Houses of worship",
  cemetery: "Cemeteries",
  courthouse: "County courthouses",
  "cultural-landscape": "Cultural landscapes",
  school: "Schools and education",
  bridge: "Historic bridges",
  memorial: "Memorials",
  stadium: "Sports heritage",
};

const visitorGuidance = [
  {
    heading: "National Register ≠ public admission",
    copy: "Federal designation recognizes significance; it does not convert private homes, working churches, businesses or historic districts into attractions. Check ownership and authorized visitor access separately.",
  },
  {
    heading: "A district is not one building",
    copy: "A historic district may contain many contributing and noncontributing properties. A boundary increase or amendment changes an existing listing: it is not automatically a newly opened destination.",
  },
  {
    heading: "Sacred and sensitive places come first",
    copy: "Cemeteries, Indigenous cultural landscapes and archaeological resources require special care. Some places should be understood through public records rather than visited or geolocated; never trespass or disclose sensitive locations.",
  },
  {
    heading: "Use the full nomination as historical evidence",
    copy: "THC links National Register nominations and photographs through its Atlas. Older submissions may describe a past physical condition, not today's opening hours, ownership or accessibility.",
  },
] as const;

const regionGuides = [
  { label: "All historic sites and museums", to: "/explore/historic-sites" },
  { label: "Sacred places, missions and churches", to: "/texas-sacred-places" },
  { label: "Texas historic road trips", to: "/explore/road-trips" },
  { label: "Texas history overview", to: "/texas-history" },
] as const;

function TexasHistoricLandmarksPage() {
  const [textQuery, setTextQuery] = useState("");
  const [year, setYear] = useState("all");
  const [kind, setKind] = useState("all");
  const filtered = useMemo(() => thcRecentListedLandmarks.filter((record) => {
    if (year !== "all" && String(record.year) !== year) return false;
    if (kind !== "all" && record.kind !== kind) return false;
    const haystack = `${record.name} ${record.town} ${record.county} ${record.month} ${kindLabels[record.kind]}`.toLocaleLowerCase();
    return haystack.includes(textQuery.trim().toLocaleLowerCase());
  }), [textQuery, year, kind]);

  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Link to="/">Home</Link> <span aria-hidden="true"> / </span>
          <Link to="/texas-history">Texas History</Link> <span aria-hidden="true"> / </span>
          <span aria-current="page">Recent historic landmarks</span>
        </nav>
        <p className="eyebrow mt-8 text-primary">Historic preservation · Official designation records</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-6xl">Texas's newly recognized historic places</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
          The National Register preserves a written record of places that shaped Texas: neighborhoods, schools, working buildings, churches, bridges, cemeteries and cultural landscapes. Browse the recent 2025–2026 listings below by name, county and subject.
          This is a research index, <strong>not</strong> a directory of sites open for tours.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 text-sm">
          <span><strong>{thcListingTotals.listed2026}</strong> listed in 2026</span>
          <span><strong>{thcListingTotals.listed2025}</strong> listed in 2025</span>
          <span><strong>{thcListingTotals.pending}</strong> nomination-stage records tracked separately</span>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          Records reviewed {THC_RESEARCH_REVIEWED_ON}. Listings and nomination status should always be cross-checked with the
          {" "}<a href={THC_LISTINGS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">Texas Historical Commission's current register</a>.
        </p>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-10 sm:py-14">
        <h2 className="font-display text-3xl sm:text-4xl">Find a landmark, district or community story</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Some records are amendments to existing districts; places appearing here should not be interpreted as new public attractions. Use the official source for designation documentation.</p>
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-semibold">
            Search by name, city or county
            <input className="w-full rounded border border-border bg-background px-4 py-3 text-base font-normal" type="search" value={textQuery} onChange={(event) => setTextQuery(event.target.value)} placeholder="Try Houston, church or bridge" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">Listing year
            <select className="rounded border border-border bg-background px-3 py-3 font-normal" value={year} onChange={(event) => setYear(event.target.value)}>
              <option value="all">2025 and 2026</option><option value="2026">2026</option><option value="2025">2025</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">Property type
            <select className="rounded border border-border bg-background px-3 py-3 font-normal" value={kind} onChange={(event) => setKind(event.target.value)}>
              <option value="all">All property types</option>
              {Object.entries(kindLabels).map(([value, name]) => <option key={value} value={value}>{name}</option>)}
            </select>
          </label>
        </div>
        <p className="mt-5 text-sm text-muted-foreground" role="status">{filtered.length} listed {filtered.length === 1 ? "record" : "records"} match your filters.</p>
        {filtered.length ? <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((landmark) => <article key={`${landmark.year}-${landmark.name}`} className="rounded border border-border bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{kindLabels[landmark.kind]}</p>
            <h3 className="mt-3 font-display text-2xl leading-tight">{landmark.name}</h3>
            <p className="mt-3 text-sm">{landmark.town} · {landmark.county} County</p>
            <p className="mt-2 text-xs text-muted-foreground">National Register listing: {landmark.month} {landmark.year}</p>
            {completedAuthoritySlugs[landmark.name] && <Link to="/destination/$slug" params={{ slug: completedAuthoritySlugs[landmark.name] }} className="mr-4 mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Read the research-backed authority guide →</Link>}
            <a href={THC_LISTINGS_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Check official THC listing ↗</a>
          </article>)}
        </div> : <p className="mt-7 rounded border border-border p-5 text-muted-foreground">No records match these filters. Try another county, year or property type.</p>}
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <h2 className="max-w-4xl font-display text-4xl">What designation tells you—and what it cannot</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">{visitorGuidance.map(({heading,copy}) => <article key={heading} className="border-t border-border pt-5"><h3 className="font-display text-2xl">{heading}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p></article>)}</div>
        <p className="mt-8 max-w-4xl text-sm leading-7 text-muted-foreground">The 2026 White Rock Bluffs listing is identified by THC as a traditional cultural property. We intentionally do not publish coordinates, access instructions or recreation suggestions for sensitive resources. For any historic district, consult the district's own nomination instead of treating every building within its boundary as individually listed.</p>
      </Container>
    </section>

    <section className="border-b border-border bg-background">
      <Container className="py-12 sm:py-16">
        <h2 className="font-display text-4xl">Nominations still in progress are not listings</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">THC separates properties submitted to the National Park Service and those still in final-draft review from officially listed properties. These {thcPendingLandmarks.length} records belong in a research watch, not in the list of completed designations. Their status may change after this review date.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {thcPendingLandmarks.map((item) => <div key={item.name} className="border-t border-border pt-4">
            <h3 className="text-base font-semibold">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.town} · {item.county} County</p>
            <p className="mt-2 text-xs text-muted-foreground">{item.stage === "submitted" ? "Submitted; listing not confirmed" : "Nomination in review; listing not confirmed"}</p>
          </div>)}
        </div>
      </Container>
    </section>

    <section className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <h2 className="font-display text-4xl">Research the property, then plan respectfully</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          <li className="border-t border-border pt-4"><strong>1. Confirm designation.</strong><p className="mt-2 text-sm leading-7 text-muted-foreground">Use THC's official listing, then find the nomination in the Historic Sites Atlas. The nomination defines historic significance and boundaries.</p></li>
          <li className="border-t border-border pt-4"><strong>2. Establish the current situation.</strong><p className="mt-2 text-sm leading-7 text-muted-foreground">Check whether the property is occupied, publicly managed, accessible or restricted. National Register listing does not guarantee a museum, tour or public entrance.</p></li>
          <li className="border-t border-border pt-4"><strong>3. Connect regional history.</strong><p className="mt-2 text-sm leading-7 text-muted-foreground">Compare the property with the county's wider history, other nearby sites and the appropriate THC historic-road-trip or heritage-route resources.</p></li>
        </ol>
        <div className="mt-9 flex flex-wrap gap-5 text-sm font-semibold">
          <a href={THC_LISTINGS_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">THC National Register listings ↗</a>
          <a href={THC_ATLAS_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Historic Sites Atlas ↗</a>
          <a href="https://thc.texas.gov/travel/historic-highways" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">THC historic highways ↗</a>
          <a href="https://thc.texas.gov/travel/historic-bridges" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">THC historic bridges ↗</a>
        </div>
      </Container>
    </section>

    <section className="bg-background">
      <Container className="py-12 sm:py-16">
        <h2 className="font-display text-4xl">Continue with TexasDefined's destination guides</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">{regionGuides.map(({label,to}) => <Link key={to} to={to} className="border-t border-border py-4 text-base font-semibold text-primary hover:underline">{label} →</Link>)}</div>
        <div className="mt-7 border-t border-border pt-4">
          <h3 className="font-display text-2xl">Earlier landmark to explore: Clifton's 1884 Whipple Truss Bridge</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
            This separate 1996 Recorded Texas Historic Landmark preserves rare nineteenth-century bridge engineering. It is not part of the 2025–2026 National Register listing above; the old span's deck has been removed and it is not open for crossing.
          </p>
          <Link to="/destination/$slug" params={{ slug: "clifton-whipple-truss-bridge" }} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Read the Clifton bridge history and safe viewing guide →</Link>
        </div>
        <div className="mt-7 border-t border-border pt-4">
          <h3 className="font-display text-2xl">Another historic bridge: Regency Suspension Bridge</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Regency was built in 1939 and was recognized federally in 1976, with a separate Texas designation in 2019. It is not a newly listed 2025–2026 property. Current traffic or weight-limit information must come from road authorities.</p>
          <Link to="/destination/$slug" params={{ slug: "regency-suspension-bridge" }} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">See the Regency bridge history and access guidance →</Link>
        </div>
        <p className="mt-7 max-w-4xl text-sm leading-7 text-muted-foreground">Methodology: the baseline is transcribed from THC's 2025–2026 recent listings and separate nomination-status sections as reviewed on {THC_RESEARCH_REVIEWED_ON}. Each row identifies a named listing, county, THC listing month, and broad property type—not the property's operating conditions. This rolling index supplements the statewide historical-site pages, and is not an exhaustive listing of the many thousands of Texas historic resources.</p>
      </Container>
    </section>
  </>;
}
