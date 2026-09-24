import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import type { loadFishSpeciesDirectoryDataServer } from "@/data/fishing/species-directory-data.server";

type DirectoryData = Awaited<ReturnType<typeof loadFishSpeciesDirectoryDataServer>>;

export function FishSpeciesDirectory({ pageData }: { pageData: DirectoryData }) {
  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li>
            <li aria-hidden>·</li>
            <li aria-current="page">Fish species</li>
          </ol>
        </nav>
      </Container>

      <section className="mt-5 border-b border-border bg-ink text-ink-foreground">
        <Container className="py-16 sm:py-24">
          <p className="eyebrow text-ink-foreground/70">Texas fish species</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] sm:text-7xl">Fish Texas by species.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/82">Start with the fish, then move to Texas lakes where TexasDefined has a verified lake-to-species relationship. Every published fish record opens a standalone Texas guide.</p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm">
            <Link to="/fishing/species/largemouth-bass" className="border-b border-ink-foreground pb-1 font-semibold text-ink-foreground">Open largemouth bass guide →</Link>
            <Link to="/fishing/lakes" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Compare complete fishing lakes →</Link>
            <Link to="/fishing" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Back to all Texas fishing →</Link>
          </div>
          <dl className="mt-10 grid gap-5 border-t border-ink-foreground/20 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Published records" value={pageData.totalSpecies} />
            <Stat label="Species guides" value={pageData.completeSpeciesGuides} />
            <Stat label="Complete lake guides" value={pageData.completeLakeGuides} />
            <Stat label="Species families" value={pageData.groups.length} />
          </dl>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="species-directory-guide">
          <div><p className="eyebrow text-primary">Choose your target</p><h2 id="species-directory-guide" className="mt-2 font-display text-3xl">Start with the fish you want to catch</h2></div>
          <div className="grid gap-x-8 md:grid-cols-2">
            <Answer question="How many fish are covered?" answer={`Explore ${pageData.totalSpecies} Texas freshwater fish species and practical fishing groups, each with its own guide.`} />
            <Answer question="What is in a fish guide?" answer="Each guide covers identification, Texas habitat and range, seasonal patterns, useful fishing methods, related fish and lakes connected to that species." />
            <Answer question="How do I find a lake for a fish?" answer="Open a fish guide to see matching Texas lakes, or use the lake finder to select one or several species and compare the results." />
            <Answer question="Does this show today's bite?" answer="No. These guides help choose a fishery. For a trip happening now, also check current fishing reports, regulations, stocking, lake levels and access conditions." />
          </div>
        </section>

        <div className="mt-12 space-y-14">
          {pageData.groups.map((group) => (
            <section key={group.id} aria-labelledby={`family-${group.id}`} className="border-t border-border pt-8">
              <div className="max-w-3xl">
                <h2 id={`family-${group.id}`} className="font-display text-3xl">{group.name}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
              </div>
              <div className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
                {group.species.map((row) => (
                  <article id={`species-${row.slug}`} key={row.id} className="scroll-mt-28 border-b border-border py-6 sm:px-5 sm:first:pl-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="eyebrow text-primary">{row.taxonKind === "group" ? "Fishing group" : "Fish species"}</p>
                      <span className="border border-primary px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-primary">Species guide</span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl"><a href={fishingFoundationAnchor("species", row.slug)} className="hover:text-primary">{row.commonName}</a></h3>
                    {row.scientificName && <p className="mt-1 text-xs italic text-muted-foreground">{row.scientificName}</p>}
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{row.summary}</p>

                    {row.completeLakes.length > 0 ? <div className="mt-5">
                      <p className="eyebrow text-muted-foreground">In complete lake guides</p>
                      <ul className="mt-3 space-y-2">
                        {row.completeLakes.map((lake) => <li key={lake.slug} className="text-sm"><a href={lake.href} className="font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">{lake.name}</a><span className="ml-2 text-xs text-muted-foreground">{titleCase(lake.quality)} · {titleCase(lake.prominence)}</span></li>)}
                      </ul>
                    </div> : <p className="mt-5 text-xs leading-5 text-muted-foreground">No completed TexasDefined lake guide currently carries a source-backed relationship for this record. That does not mean the fish is absent from other Texas waters.</p>}

                    <div className="mt-5 flex flex-wrap gap-4">
                      <a href={fishingFoundationAnchor("species", row.slug)} className="eyebrow border-b border-primary pb-1 text-primary">Species guide →</a>
                      {row.sources[0] && <a href={row.sources[0].url} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-border pb-1 text-muted-foreground hover:text-foreground">Official source →</a>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">Plan the next step</p>
          <h2 className="mt-3 font-display text-3xl">Turn a target fish into a Texas fishing trip.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Use the lake finder to combine several target fish with a city, ZIP code, county or region, then narrow the results by distance, shore access, boat access, camping, guides or current fishing reports.</p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm"><a href="/fishing/plan" className="border-b border-primary pb-1 font-semibold text-primary">Find a fishing lake →</a><a href="/fishing/lakes" className="border-b border-border pb-1">Browse Texas fishing lakes →</a></div>
          <p className="mt-6 text-xs leading-6 text-muted-foreground">Species information checked {formatDate(pageData.verifiedAt)}. Regulations, stockings and waterbody conditions can change; always confirm current TPWD information before fishing.</p>
        </section>
      </Container>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) { return <div><dt className="eyebrow text-ink-foreground/55">{label}</dt><dd className="mt-2 font-display text-3xl">{value}</dd></div>; }
function Answer({ question, answer }: { question: string; answer: string }) { return <article className="border-t border-border py-5"><h3 className="font-display text-2xl leading-tight">{question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p></article>; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date); }
