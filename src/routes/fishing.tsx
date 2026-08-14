import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { fishSpeciesQuery, fishingLakesQuery, lakeSpeciesProfilesQuery } from "@/data/fishing/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/fishing")({
  loader: async ({ context }) => {
    const [lakes, species, lakeSpecies] = await Promise.all([
      context.queryClient.ensureQueryData(fishingLakesQuery({ featured: true, limit: 12 })),
      context.queryClient.ensureQueryData(fishSpeciesQuery({ limit: 50 })),
      context.queryClient.ensureQueryData(lakeSpeciesProfilesQuery()),
    ]);
    return { lakes, species, lakeSpecies };
  },
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Texas Fishing Guide — Lakes, Fish Species & Local Fishing",
      description: "Explore Texas fishing lake by lake, with verified lake facts, target species and the foundation for fishing reports, local guides, ramps, marinas and tackle shops.",
      canonicalPath: "/fishing",
    }),
    links: [canonicalLink(texasDefinedBrand, "/fishing")],
  }),
  component: FishingPage,
});

function FishingPage() {
  const { lakes, species, lakeSpecies } = Route.useLoaderData();
  const speciesById = new Map(species.map((row) => [row.id, row]));

  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li aria-current="page">Fishing</li>
          </ol>
        </nav>
      </Container>

      <section className="mt-5 border-b border-border bg-ink text-ink-foreground">
        <Container className="py-16 sm:py-24">
          <p className="eyebrow text-ink-foreground/70">Texas Defined Fishing</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] sm:text-7xl">Fishing Texas, lake by lake.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/82">A statewide fishing guide built around the water itself: what lives there, how anglers target it, how seasons change the approach, and the local guides and businesses that make a day on the water easier.</p>
          <div className="mt-8 grid max-w-3xl gap-5 border-t border-ink-foreground/20 pt-6 text-sm leading-6 text-ink-foreground/70 sm:grid-cols-3">
            <p><strong className="block text-ink-foreground">Verified lake facts</strong>Official fisheries sources anchor the core lake data.</p>
            <p><strong className="block text-ink-foreground">Fishing-first structure</strong>Species, techniques and seasons are separate reusable records.</p>
            <p><strong className="block text-ink-foreground">Built for local depth</strong>Guide profiles, reports, ramps, marinas and businesses plug into the same lake graph.</p>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <section aria-labelledby="pilot-lakes">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Foundation lakes</p>
            <h2 id="pilot-lakes" className="mt-3 font-display text-4xl sm:text-5xl">The first five lakes in the statewide fishing catalog</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">These records establish the data model that every future Texas lake will use. Dedicated fishing lake pages will layer reports, guides, access, businesses and deeper seasonal strategy onto the same verified record.</p>
          </div>

          <div className="mt-9 grid gap-x-8 border-t border-border lg:grid-cols-2">
            {lakes.map((lake) => {
              const relationships = lakeSpecies.filter((relation) => relation.lakeId === lake.id);
              const targets = relationships
                .map((relation) => ({ relation, species: speciesById.get(relation.speciesId) }))
                .filter((row) => Boolean(row.species))
                .slice(0, 6);
              return (
                <article id={`lake-${lake.slug}`} key={lake.id} className="scroll-mt-28 border-b border-border py-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow text-primary">{lake.region.replaceAll("-", " ")}</p>
                      <h3 className="mt-2 font-display text-3xl">{lake.name}</h3>
                    </div>
                    {lake.surfaceAcres && <p className="text-sm text-muted-foreground">{lake.surfaceAcres.toLocaleString("en-US")} acres</p>}
                  </div>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{lake.summary}</p>
                  <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                    {lake.maxDepthFeet && <div><dt className="eyebrow text-muted-foreground">Maximum depth</dt><dd className="mt-1">{lake.maxDepthFeet} ft</dd></div>}
                    {lake.primaryWaterway && <div><dt className="eyebrow text-muted-foreground">Waterway</dt><dd className="mt-1">{lake.primaryWaterway}</dd></div>}
                    {lake.counties.length > 0 && <div><dt className="eyebrow text-muted-foreground">Counties</dt><dd className="mt-1">{lake.counties.join(", ")}</dd></div>}
                    {lake.controllingAuthorities.length > 0 && <div><dt className="eyebrow text-muted-foreground">Controlling authority</dt><dd className="mt-1">{lake.controllingAuthorities.join(", ")}</dd></div>}
                  </dl>
                  {targets.length > 0 && <div className="mt-6"><p className="eyebrow text-muted-foreground">Fishing targets</p><ul className="mt-3 flex flex-wrap gap-2">{targets.map(({ relation, species }) => <li key={relation.id} className="border border-border px-3 py-1.5 text-xs">{species?.commonName} · {relation.quality}</li>)}</ul></div>}
                  {lake.sources[0] && <a href={lake.sources[0].url} target="_blank" rel="noreferrer noopener" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Official fisheries source →</a>}
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="species-heading" className="mt-16 border-t border-border pt-10">
          <p className="eyebrow text-primary">Fish the state by species</p>
          <h2 id="species-heading" className="mt-3 font-display text-4xl">One species can connect dozens of Texas lakes.</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Species records are independent from lake records, which means Texas Defined can build statewide bass, crappie, catfish and striped-bass guides without duplicating the underlying lake information.</p>
          <div className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {species.map((row) => <article id={`species-${row.slug}`} key={row.id} className="scroll-mt-28 border-b border-border py-6 sm:px-5 sm:first:pl-0"><p className="eyebrow text-primary">{row.taxonKind === "group" ? "Fishing group" : "Fish species"}</p><h3 className="mt-2 font-display text-2xl">{row.commonName}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{row.summary}</p></article>)}
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-10">
          <p className="eyebrow text-primary">What the platform is built to hold</p>
          <h2 className="mt-3 font-display text-4xl">The lake page is only the starting point.</h2>
          <div className="mt-7 grid gap-6 text-sm leading-7 text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
            <div><h3 className="font-display text-xl text-foreground">Local guides</h3><p className="mt-2">One guide profile can connect to every lake, species and technique that guide actually serves.</p></div>
            <div><h3 className="font-display text-xl text-foreground">Fishing reports</h3><p className="mt-2">Permanent lake report records can carry current conditions, species activity and contributor attribution.</p></div>
            <div><h3 className="font-display text-xl text-foreground">Access & services</h3><p className="mt-2">Boat ramps, marinas, tackle shops and nearby fishing businesses attach directly to the lakes they serve.</p></div>
            <div><h3 className="font-display text-xl text-foreground">Local sponsorships</h3><p className="mt-2">Featured guide and lake-level sponsorship records are targeted by geography and species instead of generic display ads.</p></div>
          </div>
          <p className="mt-8 text-xs leading-6 text-muted-foreground">Foundation data checked against Texas Parks & Wildlife Department fisheries pages on August 13, 2026. Conditions, regulations and access can change; anglers should confirm current official information before a trip.</p>
        </section>
      </Container>
    </>
  );
}
