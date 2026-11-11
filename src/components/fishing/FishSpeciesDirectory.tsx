import { Link } from "@tanstack/react-router";

import { FishingPhoto } from "@/components/fishing/FishingPhoto";
import { Container } from "@/components/layout/Container";
import { getFishingFishImage } from "@/data/fishing/image-library";
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
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas Fish Species</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/82">Start with the fish, then move to Texas lakes where TexasDefined has a verified lake-to-species relationship. Some records have standalone guides; other records remain sourced directory entries until they qualify for a complete guide.</p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm">
            <Link to="/fishing/species/largemouth-bass" className="border-b border-ink-foreground pb-1 font-semibold text-ink-foreground">Open largemouth bass guide →</Link>
            <Link to="/fishing/lakes" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Compare complete fishing lakes →</Link>
            <Link to="/fishing" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Back to all Texas fishing →</Link>
          </div>
          <dl className="mt-10 grid gap-5 border-t border-ink-foreground/20 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Published records" value={pageData.totalSpecies} />
            <Stat label="Standalone guides" value={pageData.completeSpeciesGuides} />
            <Stat label="Complete lake guides" value={pageData.completeLakeGuides} />
            <Stat label="Directory categories" value={pageData.groups.length} />
          </dl>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="species-directory-policy">
          <div><p className="eyebrow text-primary">Directory policy</p><h2 id="species-directory-policy" className="mt-2 font-display text-3xl">Directory records versus standalone guides</h2></div>
          <div className="grid gap-x-8 md:grid-cols-2">
            <Answer question="How many fish records are published here?" answer={`TexasDefined currently has ${pageData.totalSpecies} published freshwater fish species or practical fishing groups in this directory.`} />
            <Answer question="Does every record have a standalone guide?" answer={`No. ${pageData.completeSpeciesGuides} of ${pageData.totalSpecies} published records currently have standalone guides. Other records remain source-backed directory entries instead of being represented as complete authority guides.`} />
            <Answer question="How are fish connected to lakes?" answer={`A species guide links to lake pages only where the fishing catalog contains a verified lake-to-species relationship. Full lake guides carry deeper planning detail than basic lake profiles.`} />
            <Answer question="Are these links live fishing reports?" answer="No. Lake-to-species relationships describe durable fishery context. Current bite, regulations, stocking, levels and access can change and should be confirmed with current official sources." />
          </div>
        </section>

        <p className="mt-7 max-w-4xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">Scope note: This is a curated freshwater fishing directory, not a complete biological inventory or a complete list of Texas-regulated game fish. For example, TPWD lists Alabama bass among game fish, but TexasDefined has not yet certified a standalone Alabama bass guide. <a href="https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/general-fishing-regulations" target="_blank" rel="noreferrer noopener" className="border-b border-primary text-primary">Consult TPWD's complete current game-fish list</a>.</p>

        <div className="mt-12 space-y-14">
          {pageData.groups.map((group) => (
            <section key={group.id} aria-labelledby={`family-${group.id}`} className="border-t border-border pt-8">
              <div className="max-w-3xl">
                <h2 id={`family-${group.id}`} className="font-display text-3xl">{group.name}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
              </div>
              <div className="mt-7 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
                {group.species.map((row) => {
                  const image = getFishingFishImage(row.slug);
                  return <article id={`species-${row.slug}`} key={row.id} className="scroll-mt-28 border-b border-border py-6 sm:px-5 sm:first:pl-0">
                    {image ? <FishingPhoto image={image} showCredit={false} className="mb-5" imageClassName="aspect-[4/3] w-full object-contain bg-muted/30 p-3" /> : null}
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="eyebrow text-primary">{row.taxonKind === "group" ? "Fishing group" : "Fish species"}</p>
                      <span className="border border-primary px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-primary">{row.completeGuide ? "Standalone guide" : "Directory record"}</span>
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
                      {row.completeGuide ? <a href={fishingFoundationAnchor("species", row.slug)} className="eyebrow border-b border-primary pb-1 text-primary">Open species guide →</a> : <a href={`#species-${row.slug}`} className="eyebrow border-b border-primary pb-1 text-primary">Directory entry</a>}
                      {row.sources[0] && <a href={row.sources[0].url} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-border pb-1 text-muted-foreground hover:text-foreground">Official source →</a>}
                    </div>
                  </article>;
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">Lake coverage</p>
          <h2 className="mt-3 font-display text-3xl">How Lake Coverage Expands</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Every published fish has a sourced directory entry; only complete records receive a standalone species page. Lake recommendations expand separately as verified lake-to-species relationships are added, so a fish page can exist without inventing places to catch it.</p>
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
