import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getPaintedChurchesPageData } from "@/data/painted-churches.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches";
const coreDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&origin=Schulenburg%2C%20TX&destination=St.%20Mary%27s%20Church%20of%20the%20Assumption%2C%20Praha%2C%20TX&waypoints=Saints%20Cyril%20and%20Methodius%20Catholic%20Church%2C%20Dubina%2C%20TX%7CSt.%20John%20the%20Baptist%20Catholic%20Church%2C%20Ammannsville%2C%20TX%7CNativity%20of%20Mary%2C%20Blessed%20Virgin%20Catholic%20Church%2C%20High%20Hill%2C%20TX";

export const Route = createFileRoute("/explore/painted-churches")({
  loader: () => getPaintedChurchesPageData(),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Painted Churches of Texas | Route & Historic Church Guide",
      description:
        "Plan a Texas painted-church drive with the Schulenburg route, verified historic church pages, visitor notes, National Register context and rights-cleared photography.",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: PaintedChurchesPage,
});

function PaintedChurchesPage() {
  const {
    paintedChurches,
    paintedChurchSources,
    schulenburgCoreRoute,
    schulenburgPaintedChurchesCount,
    nationalRegisterDecorativeInteriorChurchesCount,
  } = Route.useLoaderData();

  return (
    <main>
      <section className="border-b border-border bg-ink text-ink-foreground">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)] lg:items-end">
          <div>
            <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-foreground/60">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link to="/" className="hover:text-white">Front page</Link></li><li aria-hidden>·</li>
                <li><Link to="/explore" className="hover:text-white">Explore</Link></li><li aria-hidden>·</li>
                <li aria-current="page" className="text-white">Painted Churches</li>
              </ol>
            </nav>
            <p className="eyebrow mt-10 text-ink-foreground/70">Texas heritage drive</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Painted Churches of Texas</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Rural sanctuaries that look restrained from the road and open into color, stenciling, faux marble, murals and immigrant craftsmanship. Start with the compact Schulenburg circuit, then explore the wider statewide tradition.</p>
          </div>
          <div className="border-t border-ink-foreground/25 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="eyebrow text-ink-foreground/60">Verified collection</p>
            <p className="mt-3 font-display text-5xl">{paintedChurches.length}</p>
            <p className="mt-3 text-sm leading-6 text-ink-foreground/70">Individual church guides with source-backed history, visitor notes and rights-cleared photography where available.</p>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-18">
        <section aria-labelledby="schulenburg-route" className="border-t-2 border-foreground pt-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <p className="eyebrow text-primary">Start here</p>
              <h2 id="schulenburg-route" className="mt-3 font-display text-4xl sm:text-5xl">The four-church Schulenburg route</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Use Schulenburg as the base and run the core sequence through Dubina, Ammannsville, High Hill and Praha. Verify access before traveling because these remain active churches.</p>
            </div>
            <div className="border-l border-border pl-6">
              <p className="eyebrow text-muted-foreground">Route tools</p>
              <a href={coreDirectionsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary pb-1 text-sm font-medium text-primary">Open the core drive in Maps</a><br />
              <Link to="/explore/trip-planner" className="mt-4 inline-block border-b border-primary pb-1 text-sm font-medium text-primary">Open the Texas Trip Planner</Link>
            </div>
          </div>
          <ol className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
            {schulenburgCoreRoute.map((church, index) => (
              <li key={church.slug} className="bg-background p-6">
                <p className="eyebrow text-primary">Stop {index + 1} · {church.city}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{church.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="access" className="mt-16 grid gap-10 border-t border-border pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.55fr)]">
          <div><p className="eyebrow text-primary">Before you leave</p><h2 id="access" className="mt-3 font-display text-4xl">These are active churches, not museum sets.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Services, funerals, weddings, holy days and parish events can change access without notice. Check the local source before you travel and visit respectfully.</p></div>
          <div className="border-l border-border pl-6"><p className="eyebrow text-muted-foreground">Local six-church cluster</p><p className="mt-3 text-3xl font-display">{schulenburgPaintedChurchesCount} churches</p><a href={paintedChurchSources.schulenburgChamber} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary pb-1 text-sm text-primary">Check current tour information</a></div>
        </section>

        <section aria-labelledby="all-churches" className="mt-16 border-t-2 border-foreground pt-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="eyebrow text-primary">Church by church</p><h2 id="all-churches" className="mt-3 font-display text-4xl sm:text-5xl">Explore the full Texas collection</h2></div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">{nationalRegisterDecorativeInteriorChurchesCount} entries belong to the Texas Historical Commission’s formal decorative-interior National Register group; the remaining guides are separately documented painted-church destinations.</p>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {paintedChurches.map((church) => (
              <article key={church.slug} className="border-t border-border pt-5">
                {church.image ? <img src={church.image.src} alt={church.image.alt} width={church.image.width} height={church.image.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" /> : <div className="flex aspect-[4/3] items-end bg-surface p-6"><p className="font-display text-3xl text-foreground/70">{church.city}</p></div>}
                <p className="eyebrow mt-5 text-primary">{church.city} · {church.county} County</p>
                <h3 className="mt-2 font-display text-3xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-y border-border py-10">
          <p className="eyebrow text-primary">Source-backed collection</p>
          <h2 className="mt-3 font-display text-4xl">Historic designations and travel labels are kept distinct.</h2>
          <p className="mt-6 max-w-4xl text-base leading-8 text-muted-foreground">Texas heritage sources use “Painted Churches” broadly, while the National Register uses a narrower historic grouping. TexasDefined keeps those designations separate instead of implying every church carries the same status.</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href={paintedChurchSources.nationalRegisterMultipleProperty} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Texas Historical Commission listing</a><a href={paintedChurchSources.texasTimeTravel} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Texas Time Travel</a><a href={paintedChurchSources.austinPbs} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Austin PBS painted churches</a></div>
        </section>
      </Container>
    </main>
  );
}
