
import { FishingPhoto } from "@/components/fishing/FishingPhoto";
import { Container } from "@/components/layout/Container";
import { getFishingFishImage } from "@/data/fishing/image-library";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import type { loadFishSpeciesDirectoryDataServer } from "@/data/fishing/species-directory-data.server";

type DirectoryData = Awaited<ReturnType<typeof loadFishSpeciesDirectoryDataServer>>;

export function FishSpeciesDirectory({ pageData }: { pageData: DirectoryData }) {
  return (
    <>
      <Container className="py-14 sm:py-20">
        <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="species-directory-policy">
          <div><p className="eyebrow text-primary">Identify your catch</p><h2 id="species-directory-policy" className="mt-2 font-display text-3xl">Which Texas fish did you catch?</h2></div>
          <div className="grid gap-x-8 md:grid-cols-2">
            <Answer question="How do I identify an unfamiliar fish?" answer="Start with body shape, mouth, fins and markings. Compare several features before deciding on a species; color alone is not reliable." />
            <Answer question="Which fish can I compare in detail?" answer={`Explore ${pageData.completeSpeciesGuides} illustrated guides among ${pageData.totalSpecies} freshwater fish and fishing-group entries. Start with black bass, crappie, catfish or sunfish, then compare their individual species.`} />
            <Answer question="Where can I catch these fish?" answer="The guides distinguish current official fishing opportunities, historical catches, fisheries surveys and stocking schedules. A historical record alone is not a present-day lake recommendation." />
            <Answer question="Can I keep the fish I catch?" answer="Identify the species, then check current TPWD bag and length limits, waterbody exceptions and fish-consumption advisories. These guides do not replace those rules." />
          </div>
        </section>

        <p className="mt-7 max-w-4xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">Scope note: This is a curated freshwater fishing directory, not a complete biological inventory or a complete list of Texas-regulated game fish. For example, Alabama bass has its own directory entry because it is distinct from spotted bass; see the Alan Henry fisheries survey for the introduced population. <a href="https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/general-fishing-regulations" target="_blank" rel="noreferrer noopener" className="border-b border-primary text-primary">Consult TPWD's complete current game-fish list</a>.</p>

        <nav className="mt-8 flex flex-wrap gap-3" aria-label="Jump to fish group">{pageData.groups.map(group => <a key={group.id} className="border border-border px-3 py-2 text-sm font-semibold hover:text-primary" href={`#family-${group.id}`}>{group.name}</a>)}</nav>
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
                    </div> : null}

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
          <p className="eyebrow text-primary">Plan your fishing trip</p>
          <h2 className="mt-3 font-display text-3xl">Check fishing conditions before you go</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Explore <a className="underline text-primary" href="/fishing/lakes">Texas lake guides</a>, <a className="underline text-primary" href="/fishing/seasons">seasonal fishing patterns</a> and <a className="underline text-primary" href="/fishing/regulations">current fishing rules</a>. Source-backed historical examples are not the same as current fishing conditions.</p>
          <p className="mt-6 text-xs leading-6 text-muted-foreground">Latest species-record source review {formatDate(pageData.verifiedAt)}; older records may have earlier review dates. Regulations, stockings and waterbody conditions can change; always confirm current TPWD information before fishing.</p>
        </section>
      </Container>
    </>
  );
}

function Answer({ question, answer }: { question: string; answer: string }) { return <article className="border-t border-border py-5"><h3 className="font-display text-2xl leading-tight">{question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p></article>; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date); }
