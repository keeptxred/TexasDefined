import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { lighthouseVisitorPlans } from "@/data/lighthouse-visitor-planning";
import { texasLighthouseMapPoints, type TexasLighthouseStatus } from "@/data/texas-lighthouse-map-points";
import { absoluteUrl, buildEditorialCollectionHead, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/lighthouses";
const description = "Explore Texas lighthouses from Sabine Pass to Port Isabel with photos, public-access notes, county guides, lighthouse history and a Gulf Coast road-trip itinerary.";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

const statusMeta: Record<TexasLighthouseStatus, { label: string; detail: string }> = {
  visit: { label: "Visit", detail: "Public lighthouse experience" },
  "view-only": { label: "View only", detail: "No public tower access" },
  relocated: { label: "Relocated", detail: "Historic light preserved off its original station" },
  historic: { label: "Historic site", detail: "Original light no longer survives here" },
};

const lighthouseCards = [
  {
    slug: "port-isabel-lighthouse",
    name: "Port Isabel Lighthouse",
    href: "/destination/port-isabel-lighthouse",
    description: "Texas' only lighthouse built around a conventional public tower visit and climb.",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel%2C_Texas_Lighthouse.jpg?width=1600",
    alt: "Port Isabel Lighthouse in Port Isabel, Texas",
    credit: "Billy D. Wagner · CC BY-SA 4.0 · Wikimedia Commons",
  },
  {
    slug: "point-bolivar-lighthouse",
    name: "Point Bolivar Lighthouse",
    href: "/article/point-bolivar-lighthouse-history",
    description: "The black cast-iron tower guarding the entrance to Galveston Bay.",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Bolivar_TX_-_Point_Bolivar_Lighthouse.jpg?width=1600",
    alt: "Point Bolivar Lighthouse on the Bolivar Peninsula at the entrance to Galveston Bay",
    credit: "Patrick Feller · CC BY 2.0 · Wikimedia Commons",
  },
  {
    slug: "halfmoon-reef-lighthouse",
    name: "Halfmoon Reef Lighthouse",
    href: "/article/halfmoon-reef-lighthouse-port-lavaca",
    description: "The Matagorda Bay lighthouse that was moved ashore and preserved in Port Lavaca.",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/HALFMOON_REEF_LIGHTHOUSE.jpg?width=1600",
    alt: "Halfmoon Reef Lighthouse preserved in Port Lavaca, Texas",
    credit: "Charles Henry · CC BY 2.0 · Wikimedia Commons",
  },
  {
    slug: "matagorda-island-lighthouse",
    name: "Matagorda Island Lighthouse",
    href: "/article/matagorda-island-lighthouse-history",
    description: "A remote cast-iron lighthouse preserved on wild Matagorda Island.",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Matagorda_Island_Light_%28Calhoun_County%2C_Texas%29.jpg?width=1600",
    alt: "Matagorda Island Lighthouse, the tapered cast-iron tower in Calhoun County",
    credit: "U.S. Coast Guard · Public domain · Wikimedia Commons",
  },
  {
    slug: "lydia-ann-lighthouse",
    name: "Lydia Ann Lighthouse",
    href: "/article/lydia-ann-lighthouse-port-aransas",
    description: "The historic Aransas Pass light across the channel from Port Aransas.",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lydia_Ann_Lighthouse_near_Port_Aransas.jpg?width=1600",
    alt: "Lydia Ann Lighthouse near Port Aransas with its brick tower and keeper's dwelling",
    credit: "Jon Lebkowsky · CC BY-SA 2.0 · Wikimedia Commons",
  },
  {
    slug: "sabine-pass-lighthouse",
    name: "Sabine Pass Lighthouse",
    href: "/article/sabine-pass-lighthouse-texas-border",
    description: "The border lighthouse tied to Texas' eastern Gulf gateway and Sabine-Neches approach.",
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sabine_Pass_Lighthouse_01.jpg?width=1600",
    alt: "Sabine Pass Lighthouse on the Louisiana side of the Texas-Louisiana border waterway",
    credit: "Jessica Kemm / National Park Service · Public domain · Wikimedia Commons",
  },
] as const;

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

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const base = buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Lighthouses: Photos, History & Gulf Coast Guide",
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
          "@id": `${absoluteUrl(texasDefinedBrand, canonicalPath)}#lighthouses`,
          name: "Texas lighthouse locations",
          description: "Sourced geographic points for surviving, relocated and historically important Texas Gulf Coast lighthouses.",
          spatialCoverage: { "@type": "AdministrativeArea", name: "Texas" },
          creator: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          variableMeasured: ["latitude", "longitude", "public access", "county", "historic era"],
          hasPart: texasLighthouseMapPoints.map((point) => ({
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
      <section>
        <p className="eyebrow text-primary">Texas lighthouse guides</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Meet the lights along the Gulf Coast.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Choose a lighthouse to see its history, public-access reality and trip-planning details. Each card opens the dedicated TexasDefined guide for that light.</p>
        <div className="mt-9 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {lighthouseCards.map((card) => <Link key={card.slug} to={card.href} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <article>
              <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary sm:text-3xl">{card.name}</h3>
              <div className="mt-4 overflow-hidden bg-surface">
                <img src={card.src} alt={card.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]" />
              </div>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{card.description}</p>
              <p className="mt-3 text-[0.7rem] leading-5 text-muted-foreground/80">Photo: {card.credit}</p>
            </article>
          </Link>)}
        </div>
      </section>

      <section className="mt-20 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Visitability at a glance</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Choose a lighthouse that fits your trip.</h2>
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
