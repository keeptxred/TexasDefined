import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/casinos";
const description = "Compare operating Texas tribal gaming destinations, new East Texas developments and practical casino-resort getaways in Louisiana and Oklahoma. Visitor facts and official sources.";
const grouped = ["Texas gaming destinations", "Gaming getaways from Texas metros", "Explainers", "New developments"];

export const Route = createFileRoute("/explore/casinos/")({
  loader: async () => (await import("@/data/texas-casino-guides")).CASINO_GUIDES,
  head: ({ loaderData }) => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Casinos & Gaming Getaways | Locations, Laws and Trip Guides",
        description,
        modifiedTime: "2026-10-15T12:00:00-05:00",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": url + "#page",
            url,
            name: "Texas Casinos & Gaming Getaways",
            description,
            dateModified: "2026-10-15",
            mainEntity: { "@id": url + "#guides" },
          },
          {
            "@type": "ItemList",
            "@id": url + "#guides",
            numberOfItems: loaderData?.length ?? 0,
            itemListElement: (loaderData ?? []).map((guide, i) => ({
              "@type": "ListItem", position: i + 1,
              name: guide.title,
              url: absoluteUrl(texasDefinedBrand, `/explore/casinos/${guide.slug}`),
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Casinos & Gaming Getaways", item: url },
            ],
          },
        ],
      })],
    };
  },
  component: CasinoHub,
});

function CasinoHub() {
  const CASINO_GUIDES = Route.useLoaderData();
  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-foreground">
          <Link to="/" className="hover:underline">Home</Link><span aria-hidden="true"> / </span>
          <Link to="/explore" className="hover:underline">Explore</Link><span aria-hidden="true"> / </span>
          <span>Gaming getaways</span>
        </nav>
        <p className="eyebrow mt-10 text-ink-foreground">Worth the drive · Travel & entertainment</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl  sm:text-5xl">Casinos &amp; gaming getaways</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground">
          Five operating Texas tribal gaming locations (including the smaller Ischoopa travel center), a future East Texas resort and the cross-border casino trips Texans actually take. Choose by location, lodging and entertainment—not hype.
        </p>
        <p className="mt-6 text-sm text-ink-foreground">Independently researched · Official sources reviewed October 15, 2026</p>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      <nav aria-label="Jump to a guide" className="border-b border-border pb-10">
        <h2 className="font-display text-2xl">Go straight to a guide</h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">
          <Link to="/explore/casinos/kickapoo-lucky-eagle" className="underline">Kickapoo Lucky Eagle</Link>
          <Link to="/explore/casinos/naskila-livingston" className="underline">Naskila Livingston</Link>
          <Link to="/explore/casinos/naskila-leggett" className="underline">Naskila Leggett</Link>
          <Link to="/explore/casinos/ischoopa-travel-center" className="underline">Ischoopa Travel Center</Link>
          <Link to="/explore/casinos/speaking-rock-el-paso" className="underline">Speaking Rock</Link>
          <Link to="/explore/casinos/near-houston" className="underline">Near Houston</Link>
          <Link to="/explore/casinos/near-dallas-fort-worth" className="underline">Near Dallas–Fort Worth</Link>
          <Link to="/explore/casinos/texas-gaming-laws" className="underline">Texas casino laws</Link>
          <Link to="/explore/casinos/naskila-resort-leggett" className="underline">Future Naskila Resort</Link>
        </div>
      </nav>

      <section aria-labelledby="what-is-legal" className="grid gap-6 border-b border-border pb-10 lg:grid-cols-2">
        <div>
          <h2 id="what-is-legal" className="font-display text-3xl sm:text-4xl">First, what counts as a Texas casino?</h2>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">Texas does not generally license commercial casino resorts. Tribal gaming operates under a separate federal legal framework, with bingo-based electronic games at several locations. Louisiana and Oklahoma resorts operate under the laws of those states or tribal jurisdictions. A casino across the border is not a casino in Texas.</p>
          <Link to="/explore/casinos/$slug" params={{ slug: "texas-gaming-laws" }} className="mt-5 inline-block border-b border-primary pb-1 font-semibold text-primary">Read Texas gaming laws →</Link>
          <p className="mt-4 text-sm"><a href="https://guides.sll.texas.gov/gambling/general-information" target="_blank" rel="noopener noreferrer" className="text-primary underline">Verify current gambling laws with the Texas State Law Library ↗</a></p>
        </div>
        <div className="border border-border bg-surface p-6">
          <p className="eyebrow text-primary">Planning checklist</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            <li>• Check the exact address—Livingston and Leggett are two different sites.</li>
            <li>• Confirm entry age, ID, accessible access, events and operating hours.</li>
            <li>• Compare actual hotel terms and trip costs before reserving.</li>
            <li>• Never assume a proposed future resort is already open.</li>
          </ul>
        </div>
      </section>

      {grouped.map((group) => {
        const guides = CASINO_GUIDES.filter((guide) => guide.group === group);
        return <section className="mt-12" key={group} aria-label={group}>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
            <h2 className="font-display text-3xl sm:text-4xl">{group}</h2>
            <p className="text-sm text-muted-foreground">{guides.length} {guides.length === 1 ? "guide" : "guides"}</p>
          </div>
          <ul className="mt-5 grid gap-6 md:grid-cols-2">
            {guides.map((guide) => <li key={guide.slug} className="border-t border-primary bg-surface p-6">
              <p className="eyebrow text-primary">{guide.location}</p>
              <h3 className="mt-3 font-display text-2xl"><Link to="/explore/casinos/$slug" params={{ slug: guide.slug }} className="hover:text-primary">{guide.shortTitle}</Link></h3>
              <p className="mt-2 text-xs font-semibold uppercase text-muted-foreground">{guide.status}</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{guide.dek}</p>
              <Link to="/explore/casinos/$slug" params={{ slug: guide.slug }} className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Read the guide →</Link>
            </li>)}
          </ul>
        </section>;
      })}

      <section className="mt-12 border-t border-border pt-9">
        <h2 className="font-display text-3xl">Build a trip around the destination</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Casino properties are not all alike: a short bingo-focused outing is a different trip from a hotel-and-concert weekend. Keep the surrounding cities and other attractions in your plans too.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link to="/road-trips" className="border-b border-primary pb-1 text-primary">Texas road trips</Link>
          <Link to="/explore/trip-planner" className="border-b border-primary pb-1 text-primary">Plan a route</Link>
          <Link to="/browse/cities" className="border-b border-primary pb-1 text-primary">Browse Texas cities</Link>
        </div>
        <div className="mt-8" aria-label="Compare travel accommodation">
          <p className="text-sm leading-7 text-muted-foreground">Going overnight? Compare real hotel availability below. Always choose the city where you intend to stay; Texas, Louisiana and Oklahoma are different lodging markets.</p>
          <div data-stay-nearby-slot className="mt-5" />
        </div>
        <p className="mt-8 text-xs leading-6 text-muted-foreground">Independent travel information only. TexasDefined may earn commissions from qualifying hotel and vacation-rental bookings shown here, at no extra cost to you. No betting services or casino gaming transactions are offered. Gaming can involve financial loss; set limits and consult official venue policies.</p>
      </section>
    </Container>
  </main>;
}
