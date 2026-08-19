import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchSources, schulenburgCoreRoute } from "@/data/painted-churches";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches-plan";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&origin=Schulenburg%2C%20TX&destination=St.%20Mary%27s%20Church%20of%20the%20Assumption%2C%20Praha%2C%20TX&waypoints=Saints%20Cyril%20and%20Methodius%20Catholic%20Church%2C%20Dubina%2C%20TX%7CSt.%20John%20the%20Baptist%20Catholic%20Church%2C%20Ammannsville%2C%20TX%7CNativity%20of%20Mary%2C%20Blessed%20Virgin%20Catholic%20Church%2C%20High%20Hill%2C%20TX";

export const Route = createFileRoute("/explore/painted-churches-plan")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Painted Churches Trip Planner | Schulenburg Route",
      description:
        "Plan a one-day Painted Churches of Texas drive from Schulenburg through Dubina, Ammannsville, High Hill and Praha with verified church profiles, addresses and visitor guidance.",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: PaintedChurchesTripPlanner,
});

function PaintedChurchesTripPlanner() {
  return (
    <main>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
              <li aria-hidden>·</li>
              <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
              <li aria-hidden>·</li>
              <li><Link to="/explore/trip-planner" className="hover:text-foreground">Trip Planner</Link></li>
              <li aria-hidden>·</li>
              <li aria-current="page" className="text-foreground">Painted Churches</li>
            </ol>
          </nav>
          <p className="eyebrow mt-8 text-primary">Texas Trip Planner · Heritage route</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Painted Churches in one practical day.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Use Schulenburg as the base, then visit Dubina, Ammannsville, High Hill and Praha. The sequence below uses the verified Texas Defined church records and keeps the route compact enough to leave time for the interiors instead of turning the day into a windshield tour.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={directionsUrl} target="_blank" rel="noreferrer" className="eyebrow border border-foreground bg-foreground px-5 py-3 text-background">Open route in Maps</a>
            <Link to="/explore/painted-churches" className="eyebrow border border-border px-5 py-3 hover:border-foreground">All Painted Churches</Link>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-18">
        <section className="grid gap-8 border-t-2 border-foreground pt-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <p className="eyebrow text-primary">Suggested pace</p>
            <h2 className="mt-3 font-display text-4xl">Four church stops, with time to look.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              Budget roughly 45–60 minutes at each church plus driving time, with extra room for lunch and unexpected closures. These are active places of worship. Services, funerals, weddings, holy days and parish events always take priority over sightseeing.
            </p>
          </div>
          <aside className="border-l border-border pl-6">
            <p className="eyebrow text-muted-foreground">Before leaving</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Confirm same-day access with the local tourism source. Current touring guidance can change and should not be treated as a guaranteed opening schedule.
            </p>
            <a href={paintedChurchSources.schulenburgChamber} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary pb-1 text-sm text-primary">Check current tour information</a>
          </aside>
        </section>

        <ol className="mt-12 space-y-12">
          {schulenburgCoreRoute.map((church, index) => {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address ?? `${church.name}, ${church.city}, Texas`)}`;
            return (
              <li key={church.slug} className="border-t border-border pt-8">
                <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
                  <div>
                    <p className="eyebrow text-primary">Stop {index + 1}</p>
                    {church.image ? (
                      <img src={church.image.src} alt={church.image.alt} width={church.image.width} height={church.image.height} loading="lazy" decoding="async" className="mt-4 aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="mt-4 flex aspect-[4/3] items-end bg-surface p-5"><span className="font-display text-2xl">{church.city}</span></div>
                    )}
                  </div>
                  <div>
                    <p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p>
                    <h3 className="mt-2 font-display text-4xl leading-tight">
                      <Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link>
                    </h3>
                    <p className="mt-4 text-base leading-8 text-muted-foreground">{church.summary}</p>
                    <p className="mt-5 text-sm leading-7"><span className="eyebrow mr-2 text-muted-foreground">Allow</span>45–60 minutes</p>
                    <p className="mt-2 text-sm leading-7"><span className="eyebrow mr-2 text-muted-foreground">Why it matters</span>{church.significance}</p>
                  </div>
                  <div className="border-l border-border pl-6">
                    <p className="eyebrow text-muted-foreground">Location</p>
                    <p className="mt-3 text-sm leading-6">{church.address ?? `${church.name}, ${church.city}, Texas`}</p>
                    <a href={mapUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary pb-1 text-sm text-primary">Open this stop in Maps</a>
                    <br />
                    <Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="mt-4 inline-block border-b border-primary pb-1 text-sm text-primary">Read the full church guide</Link>
                    <p className="mt-5 text-xs leading-6 text-muted-foreground">{church.visitNote}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <section className="mt-16 border-y border-border py-10">
          <p className="eyebrow text-primary">Keep planning</p>
          <div className="mt-4 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl">Want a broader Texas trip?</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Use the main planner for parks, towns, water, history and other Texas Defined destinations around the same trip.</p>
              <Link to="/explore/trip-planner" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Open the main Trip Planner</Link>
            </div>
            <div>
              <h2 className="font-display text-3xl">Want more churches?</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">The statewide Painted Churches guide includes every verified church profile currently in the Texas Defined collection.</p>
              <Link to="/explore/painted-churches" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Browse all church profiles</Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
