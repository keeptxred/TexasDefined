import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { lighthouseVisitorPlanBySlug, lighthouseVisitorPlans } from "@/data/lighthouse-visitor-planning";
import { texasLighthouseMapPoints, type TexasLighthouseStatus } from "@/data/texas-lighthouse-map-points";
import { absoluteUrl, buildEditorialCollectionHead, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/lighthouses";
const description = "Explore Texas lighthouses from Sabine Pass to Port Isabel with a sourced map, public-access notes, county guides, lighthouse history and a Gulf Coast road-trip itinerary.";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

const statusMeta: Record<TexasLighthouseStatus, { label: string; detail: string }> = {
  visit: { label: "Visit", detail: "Public lighthouse experience" },
  "view-only": { label: "View only", detail: "No public tower access" },
  relocated: { label: "Relocated", detail: "Historic light preserved off its original station" },
  historic: { label: "Historic site", detail: "Original light no longer survives here" },
};

const lighthouseFaq = [
  {
    question: "Which Texas lighthouse can you climb?",
    answer: "Port Isabel Lighthouse is the Texas lighthouse to plan a public climb around. Tower access is subject to current Texas Historical Commission hours, weather and climb requirements.",
  },
  {
    question: "Can you climb Point Bolivar Lighthouse?",
    answer: "No. Point Bolivar is a view-only historic landmark rather than a public tower climb. Visitors should respect private-property boundaries and use lawful public vantage points.",
  },
  {
    question: "Is Lydia Ann Lighthouse open to the public?",
    answer: "No. Lydia Ann Lighthouse is privately owned. The public experience comes from nearby waterways and the Lighthouse Lakes area, not from entering the lighthouse property.",
  },
  {
    question: "Can you visit Matagorda Island Lighthouse by car?",
    answer: "No. Matagorda Island has no road bridge from the mainland. Access conditions and transportation arrangements can change, so travelers should verify current public-agency guidance before planning a trip.",
  },
  {
    question: "Is Sabine Pass Lighthouse in Texas?",
    answer: "The historic tower stands on the Louisiana side of the Sabine. It belongs in a Texas lighthouse itinerary because it served the border waterway and the same Gulf entrance used by vessels bound for the Texas side of the Sabine-Neches system.",
  },
];

const mapBounds = { minLon: -98.2, maxLon: -93.4, minLat: 25.7, maxLat: 30.2 };
const mapWidth = 820;
const mapHeight = 720;
const pad = 34;
const project = (lat: number, lon: number) => ({
  x: pad + ((lon - mapBounds.minLon) / (mapBounds.maxLon - mapBounds.minLon)) * (mapWidth - pad * 2),
  y: pad + ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * (mapHeight - pad * 2),
});
const coastGuide = [
  [29.72, -93.85], [29.37, -94.77], [29.10, -95.05], [28.70, -95.85],
  [28.34, -96.42], [27.86, -97.06], [27.20, -97.35], [26.08, -97.21],
] as const;
const coastPoints = coastGuide.map(([lat, lon]) => {
  const point = project(lat, lon);
  return `${point.x},${point.y}`;
}).join(" ");

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const base = buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Lighthouses: Map, History & Gulf Coast Road Trip",
      description,
      collectionName: "Texas Lighthouses",
      breadcrumbParentName: "Explore Texas",
      breadcrumbParentPath: "/explore",
      items: texasLighthouseMapPoints.map((point) => ({
        name: point.name,
        url: point.articleHref ?? canonicalPath,
        description: point.note,
        type: "TouristAttraction" as const,
      })),
    });
    return {
      ...base,
      scripts: [
        ...(base.scripts ?? []),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "@id": `${absoluteUrl(texasDefinedBrand, canonicalPath)}#map`,
          name: "Texas lighthouse map",
          description: "Sourced geographic points for surviving, relocated and historically important Texas Gulf Coast lighthouses.",
          spatialCoverage: { "@type": "State", name: "Texas" },
          variableMeasured: ["latitude", "longitude", "public access", "county", "historic era"],
          distribution: texasLighthouseMapPoints.map((point) => ({
            "@type": "Place",
            name: point.name,
            url: point.articleHref ? `${siteUrl}${point.articleHref}` : `${siteUrl}${canonicalPath}`,
            geo: { "@type": "GeoCoordinates", latitude: point.lat, longitude: point.lon },
          })),
        }),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${absoluteUrl(texasDefinedBrand, canonicalPath)}#faq`,
          mainEntity: lighthouseFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      ],
    };
  },
  component: TexasLighthousesHub,
});

function TexasLighthousesHub() {
  const [selectedSlug, setSelectedSlug] = useState("port-isabel-lighthouse");
  const selected = useMemo(
    () => texasLighthouseMapPoints.find((point) => point.slug === selectedSlug) ?? texasLighthouseMapPoints[0],
    [selectedSlug],
  );
  const selectedPlan = lighthouseVisitorPlanBySlug.get(selected.slug);

  return <main>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore">Explore</Link></li><li aria-hidden>·</li><li aria-current="page">Texas lighthouses</li></ol>
        </nav>
        <p className="eyebrow mt-8 text-primary">Gulf Coast · Maritime history</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The lighthouses that watched the Texas coast.</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas Historical Commission records say sixteen lighthouses were constructed along the Texas coast. This hub follows the surviving towers, relocated lights and lost stations through the ports, passes, counties and barrier islands they once protected.</p>
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
          <Link to="/article/texas-lighthouses-complete-guide" className="border-b border-primary text-primary">Read the complete lighthouse guide</Link>
          <Link to="/article/texas-lighthouse-road-trip" className="border-b border-primary text-primary">Drive the lighthouse trail</Link>
          <Link to="/article/lost-lighthouses-of-texas" className="border-b border-primary text-primary">Find the lost lights</Link>
        </div>
      </Container>
    </section>

    <Container className="py-14 sm:py-20">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,.55fr)]">
        <div>
          <p className="eyebrow text-primary">Sourced lighthouse map</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">From the Sabine to the lower Rio Grande</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The line is a geographic guide to the Gulf Coast, not a driving route. Pins use documented coordinates; select one to see access status, county context and the source behind the point.</p>
          <div className="mt-7 overflow-hidden border border-border bg-surface p-3 sm:p-6">
            <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} role="img" aria-labelledby="lighthouse-map-title lighthouse-map-desc" className="h-auto w-full">
              <title id="lighthouse-map-title">Texas Gulf Coast lighthouse map</title>
              <desc id="lighthouse-map-desc">A simplified coast guide with sourced points for important Texas lighthouse locations from Sabine Pass to Port Isabel.</desc>
              <rect x="0" y="0" width={mapWidth} height={mapHeight} className="fill-background" />
              {[26, 27, 28, 29, 30].map((lat) => { const y = project(lat, -96).y; return <line key={lat} x1={pad} x2={mapWidth - pad} y1={y} y2={y} className="stroke-border" strokeDasharray="4 9"/>; })}
              {[-98, -97, -96, -95, -94].map((lon) => { const x = project(28, lon).x; return <line key={lon} y1={pad} y2={mapHeight - pad} x1={x} x2={x} className="stroke-border" strokeDasharray="4 9"/>; })}
              <polyline points={coastPoints} fill="none" className="stroke-primary/40" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              {texasLighthouseMapPoints.map((point) => {
                const { x, y } = project(point.lat, point.lon);
                const active = selected.slug === point.slug;
                return <g key={point.slug} role="button" tabIndex={0} aria-label={`Select ${point.name}`} className="cursor-pointer focus:outline-none" onClick={() => setSelectedSlug(point.slug)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedSlug(point.slug); }}>
                  <circle cx={x} cy={y} r={active ? 12 : 8} className={active ? "fill-primary stroke-background" : "fill-foreground stroke-background"} strokeWidth="4"><title>{point.name}</title></circle>
                  {active ? <text x={x + 16} y={y + 5} className="fill-foreground text-[13px] font-semibold">{point.name}</text> : null}
                </g>;
              })}
            </svg>
          </div>
        </div>

        <aside className="border-t-2 border-foreground pt-6 lg:mt-16">
          <p className="eyebrow text-primary">Selected light</p>
          <h3 className="mt-3 font-display text-3xl leading-tight">{selected.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{selected.county} · {selected.era}</p>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">{selected.note}</p>
          <dl className="mt-6 border-y border-border py-5 text-sm">
            <div><dt className="eyebrow text-muted-foreground">Access</dt><dd className="mt-1 font-semibold">{statusMeta[selected.status].label}</dd><dd className="mt-1 text-muted-foreground">{statusMeta[selected.status].detail}</dd></div>
            {selectedPlan ? <>
              <div className="mt-5"><dt className="eyebrow text-muted-foreground">Best for</dt><dd className="mt-1 text-muted-foreground">{selectedPlan.bestFor}</dd></div>
              <div className="mt-5"><dt className="eyebrow text-muted-foreground">Pair with</dt><dd className="mt-1 text-muted-foreground">{selectedPlan.pairWith}</dd></div>
            </> : null}
            <div className="mt-5"><dt className="eyebrow text-muted-foreground">Map source</dt><dd className="mt-1"><a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">{selected.sourceLabel}</a></dd></div>
          </dl>
          {selectedPlan ? <p className="mt-5 text-sm leading-7 text-muted-foreground">{selectedPlan.planningNote}</p> : null}
          <div className="mt-6 flex flex-col items-start gap-3 text-sm">
            {selected.articleHref ? <Link to={selected.articleHref} className="border-b border-primary text-primary">Read the lighthouse story</Link> : null}
            <Link to={selected.countyHref} className="border-b border-primary text-primary">Explore county guide</Link>
          </div>
        </aside>
      </section>

      <section className="mt-20 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Visitability at a glance</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Choose the lighthouse for the trip you actually want.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Texas lighthouse travel ranges from a true public tower climb to roadside history, paddling views and remote barrier-island logistics. The distinction matters more than the distance between pins.</p>
        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
          {lighthouseVisitorPlans.map((plan) => {
            const point = texasLighthouseMapPoints.find((candidate) => candidate.slug === plan.slug);
            if (!point) return null;
            return <article key={plan.slug} className="bg-background p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4"><p className="eyebrow text-primary">{statusMeta[point.status].label}</p><span className="text-xs text-muted-foreground">{point.era}</span></div>
              <h3 className="mt-2 font-display text-2xl">{point.name}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Access:</strong> {plan.publicAccess}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Best for:</strong> {plan.bestFor}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Pair with:</strong> {plan.pairWith}</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">{point.articleHref ? <Link to={point.articleHref} className="border-b border-primary text-primary">Full story</Link> : null}<Link to={point.countyHref} className="border-b border-primary text-primary">County guide</Link></div>
            </article>;
          })}
        </div>
      </section>

      <section className="mt-20 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">The lighthouse trail</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Build the coast into four legs</h2>
        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
          {[
            { title: "Upper Coast", copy: "Sabine Pass, Galveston and Point Bolivar connect lighthouse history to shipping, the Galveston Bay entrance, the 1900 storm and the ferry crossing.", counties: [["Jefferson County", "/county/jefferson"], ["Galveston County", "/county/galveston"]] },
            { title: "Middle Coast", copy: "Halfmoon Reef and Matagorda Island explain the shallow bays, reefs, barrier islands and difficult approaches of the central Gulf Coast.", counties: [["Calhoun County", "/county/calhoun"]] },
            { title: "Coastal Bend", copy: "Lydia Ann Lighthouse belongs to the living landscape of Port Aransas, Harbor Island, ship channels and the Lighthouse Lakes paddling trail.", counties: [["Aransas County", "/county/aransas"], ["Nueces County", "/county/nueces"]] },
            { title: "Lower Coast", copy: "Port Isabel brings the story to a tower visitors can still climb, then opens into South Padre Island, Brazos Santiago, Brownsville and the Rio Grande delta.", counties: [["Cameron County", "/county/cameron"]] },
          ].map((leg) => <article key={leg.title} className="bg-background p-7 sm:p-8"><p className="eyebrow text-muted-foreground">Road-trip leg</p><h3 className="mt-2 font-display text-3xl">{leg.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{leg.copy}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">{leg.counties.map(([label, href]) => <Link key={href} to={href} className="border-b border-primary text-primary">{label}</Link>)}</div></article>)}
        </div>
        <p className="mt-7 text-sm leading-7 text-muted-foreground">Some lights are remote or privately owned, so the lighthouse trail is intentionally a maritime-history itinerary rather than a promise of tower access at every stop.</p>
        <Link to="/article/texas-lighthouse-road-trip" className="mt-5 inline-block border-b border-primary text-sm font-semibold text-primary">Plan the full Gulf Coast itinerary</Link>
      </section>

      <section className="mt-20 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Start with the survivor</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-start">
          <div><h2 className="font-display text-4xl sm:text-5xl">Port Isabel is the lighthouse to plan a trip around.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">The Texas Historical Commission identifies Port Isabel as the only Texas lighthouse currently open to the public. The climb, keeper's cottage, lower-coast setting and 2022 reproduction Fresnel lens make it the natural gateway into the state's larger lighthouse story.</p></div>
          <div className="border-l-2 border-primary pl-6"><Link to="/article/port-isabel-lighthouse-guide" className="font-display text-2xl hover:text-primary">Port Isabel Lighthouse: The Texas Light You Can Still Climb</Link><p className="mt-3 text-sm leading-7 text-muted-foreground">History, visitor context, Cameron County links and ideas for turning the lighthouse into a full lower-coast day.</p><Link to="/destination/port-isabel-lighthouse" className="mt-4 inline-block border-b border-primary text-sm font-semibold text-primary">Open the Port Isabel destination guide</Link></div>
        </div>
      </section>

      <section className="mt-20 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Texas lighthouse FAQ</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">What visitors need to know before they go</h2>
        <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-2">
          {lighthouseFaq.map((item) => <article key={item.question} className="bg-background p-7 sm:p-8"><h3 className="font-display text-2xl">{item.question}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}
        </div>
      </section>

      <section className="mt-20 border-t border-border pt-8">
        <p className="eyebrow text-muted-foreground">Keep exploring</p>
        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm">
          <Link to="/article/texas-lighthouses-complete-guide" className="border-b border-primary text-primary">Complete lighthouse history</Link>
          <Link to="/article/lost-lighthouses-of-texas" className="border-b border-primary text-primary">Lost lighthouses</Link>
          <Link to="/article/texas-lighthouse-road-trip" className="border-b border-primary text-primary">Lighthouse road trip</Link>
          <Link to="/texas-history" className="border-b border-primary text-primary">Texas history</Link>
          <Link to="/explore/beaches-coast" className="border-b border-primary text-primary">Beaches & coast</Link>
          <Link to="/browse/counties" className="border-b border-primary text-primary">Texas counties</Link>
        </div>
      </section>
    </Container>
  </main>;
}
