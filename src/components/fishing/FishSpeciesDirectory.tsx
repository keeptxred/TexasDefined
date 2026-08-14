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
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/82">Start with the fish, then move to the completed lake guides where TexasDefined has a verified lake-to-species relationship. Standalone species guides publish only when they have enough statewide depth to stand on their own.</p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm">
            <Link to="/fishing/species/largemouth-bass" className="border-b border-ink-foreground pb-1 font-semibold text-ink-foreground">Open the largemouth bass guide →</Link>
            <Link to="/fishing/lakes" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Compare complete fishing lakes →</Link>
            <Link to="/fishing" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Back to all Texas fishing →</Link>
          </div>
          <dl className="mt-10 grid gap-5 border-t border-ink-foreground/20 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Published records" value={pageData.totalSpecies} />
            <Stat label="Complete species guides" value={pageData.completeSpeciesGuides} />
            <Stat label="Complete lake guides" value={pageData.completeLakeGuides} />
            <Stat label="Species families" value={pageData.groups.length} />
          </dl>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="species-directory-policy">
          <div><p className="eyebrow text-primary">Directory policy</p><h2 id="species-directory-policy" className="mt-2 font-display text-3xl">Broad catalog, selective standalone guides</h2></div>
          <div className="grid gap-x-8 md:grid-cols-2">
            <Answer question="How many fish records are published here?" answer={`TexasDefined currently has ${pageData.totalSpecies} published freshwater fish species or practical fishing groups in this directory.`} />
            <Answer question="How many have full standalone guides?" answer={`Only ${pageData.completeSpeciesGuides} currently clears the complete statewide-guide standard: largemouth bass. Other records stay in the directory rather than becoming thin pages.`} />
            <Answer question="How are fish connected to lakes?" answer={`A species card links only to the ${pageData.completeLakeGuides} completed lake guides where the fishing catalog contains a verified lake-to-species relationship.`} />
            <Answer question="Are these links live fishing reports?" answer="No. Lake-to-species relationships describe durable fishery context. Current bite, regulations, stocking, levels and access can change and should be confirmed with current official sources." />
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
                      {row.completeGuide && <span className="border border-primary px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-primary">Full guide</span>}
                    </div>
                    <h3 className="mt-2 font-display text-2xl">{row.completeGuide ? <a href={fishingFoundationAnchor("species", row.slug)} className="hover:text-primary">{row.commonName}</a> : row.commonName}</h3>
                    {row.scientificName && <p className="mt-1 text-xs italic text-muted-foreground">{row.scientificName}</p>}
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{row.summary}</p>

                    {row.completeLakes.length > 0 ? <div className="mt-5">
                      <p className="eyebrow text-muted-foreground">In complete lake guides</p>
                      <ul className="mt-3 space-y-2">
                        {row.completeLakes.map((lake) => <li key={lake.slug} className="text-sm"><a href={lake.href} className="font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">{lake.name}</a><span className="ml-2 text-xs text-muted-foreground">{titleCase(lake.quality)} · {titleCase(lake.prominence)}</span></li>)}
                      </ul>
                    </div> : <p className="mt-5 text-xs leading-5 text-muted-foreground">No completed TexasDefined lake guide currently carries a verified relationship for this record. That does not mean the fish is absent from other Texas waters.</p>}

                    <div className="mt-5 flex flex-wrap gap-4">
                      {row.completeGuide && <a href={fishingFoundationAnchor("species", row.slug)} className="eyebrow border-b border-primary pb-1 text-primary">Species guide →</a>}
                      {row.sources[0] && <a href={row.sources[0].url} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-border pb-1 text-muted-foreground hover:text-foreground">Official source →</a>}
                    </div>
                    {!row.completeGuide && <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Directory profile · standalone guide not published</p>}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">How this grows</p>
          <h2 className="mt-3 font-display text-3xl">One reusable species template, then statewide depth.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Largemouth bass is the first complete species page. The same model is ready for Guadalupe bass, smallmouth, crappie, catfish, striped bass, alligator gar, sunfish and seasonal trout once each has enough verified statewide depth, without creating thin lake-by-species pages just for search volume.</p>
          <p className="mt-6 text-xs leading-6 text-muted-foreground">Species catalog sources checked {formatDate(pageData.verifiedAt)}. Regulations, stockings and waterbody conditions can change; always confirm current TPWD information before fishing.</p>
        </section>
      </Container>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) { return <div><dt className="eyebrow text-ink-foreground/55">{label}</dt><dd className="mt-2 font-display text-3xl">{value}</dd></div>; }
function Answer({ question, answer }: { question: string; answer: string }) { return <article className="border-t border-border py-5"><h3 className="font-display text-2xl leading-tight">{question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p></article>; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date); }
