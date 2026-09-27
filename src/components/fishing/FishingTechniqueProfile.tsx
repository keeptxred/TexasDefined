import { Container } from "@/components/layout/Container";
import { fishingTechniqueGuideContent } from "@/data/fishing/technique-guide-content";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import type { FishingTechniqueProfileData } from "@/data/fishing/technique-data.server";
import { FISHING_TECHNIQUES_DIRECTORY_PATH } from "@/data/fishing/technique-routing";

export function FishingTechniqueProfile({ data }: { data: FishingTechniqueProfileData }) {
  const { technique } = data;
  const guide = fishingTechniqueGuideContent[technique.slug];

  return <>
    <Container className="pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <a href="/">Front page</a> · <a href="/fishing">Fishing</a> · <a href={FISHING_TECHNIQUES_DIRECTORY_PATH}>Fishing techniques</a> · {technique.name}
      </nav>
    </Container>

    <header className="mt-5 border-y border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-20">
        <p className="eyebrow text-ink-foreground/65">{titleCase(technique.category)} technique</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{technique.name === "Crankbaits" ? "How to Fish Crankbaits in Texas" : `How to Fish ${technique.name} in Texas`}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{guide?.plainEnglish ?? technique.summary}</p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <a href="#how-to-fish-it" className="border-b border-ink-foreground pb-1 font-semibold">How to fish it ↓</a>
          <a href="#seasonal-guide" className="border-b border-ink-foreground/50 pb-1">Season guide ↓</a>
          <a href="#lake-applications" className="border-b border-ink-foreground/50 pb-1">Texas lake applications ↓</a>
          <a href="/fishing/reports" className="border-b border-ink-foreground/50 pb-1">Fresh reports →</a>
        </div>
      </Container>
    </header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-6 border-y border-border py-8 sm:grid-cols-3" aria-label="Technique coverage">
        <div><p className="eyebrow text-muted-foreground">Complete lakes</p><p className="mt-2 font-display text-4xl">{data.lakes.length}</p></div>
        <div><p className="eyebrow text-muted-foreground">Verified species</p><p className="mt-2 font-display text-4xl">{data.species.length}</p></div>
        <div><p className="eyebrow text-muted-foreground">Season labels</p><p className="mt-2 font-display text-4xl">{data.seasons.length}</p></div>
      </section>

      {guide ? <>
        <section className="py-12" aria-labelledby="when-to-use">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow text-primary">Start here</p>
              <h2 id="when-to-use" className="mt-3 font-display text-4xl sm:text-5xl">When should you use {technique.name.toLowerCase()}?</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">These are practical technique fundamentals. The Texas lake, species and season claims farther down remain tied to the verified source relationships in the fishing dataset.</p>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {guide.whenToUse.map((item) => <div key={item} className="bg-background p-6"><p className="text-sm leading-7">{item}</p></div>)}
            </div>
          </div>
        </section>

        {guide.selectionGuide?.length ? <section className="border-y border-border py-12" aria-labelledby="selection-guide">
          <p className="eyebrow text-primary">Choose the right version</p>
          <h2 id="selection-guide" className="mt-3 font-display text-4xl sm:text-5xl">{technique.name} by depth and cover</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">For crankbaits, running depth is the first decision. Pick the lure that can actually reach the zone you are trying to fish; color and finish come after depth, cover and retrieve speed.</p>
          <div className="mt-8 overflow-hidden border border-border">
            <div className="hidden grid-cols-[11rem_9rem_1fr] bg-muted/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:grid">
              <span>Style</span><span>Depth</span><span>Best use</span>
            </div>
            {guide.selectionGuide.map((item) => <div key={item.label} className="grid gap-2 border-t border-border px-5 py-5 first:border-t-0 sm:grid-cols-[11rem_9rem_1fr] sm:gap-0">
              <strong className="font-display text-xl">{item.label}</strong>
              <span className="text-sm text-muted-foreground">{item.depth}</span>
              <span className="text-sm leading-6">{item.bestFor}</span>
            </div>)}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-4" aria-label="Crankbait depth ladder">
            {["Surface / very shallow", "Shallow", "Mid-depth", "Deep"].map((depth, index) => <div key={depth} className="border border-border p-5">
              <p className="eyebrow text-muted-foreground">Zone {index + 1}</p>
              <p className="mt-2 font-display text-2xl">{depth}</p>
              <div className="mt-4 h-1 bg-foreground/20" style={{ width: `${35 + index * 20}%` }} />
            </div>)}
          </div>
        </section> : null}

        <section id="how-to-fish-it" className="py-12" aria-labelledby="how-to-fish-heading">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-primary">Where to fish it</p>
              <h2 className="mt-3 font-display text-4xl">Put the lure where the fish can use it.</h2>
              <ol className="mt-7 space-y-4">
                {guide.whereToFish.map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border pt-4">
                  <span className="font-display text-2xl text-primary">{index + 1}</span><span className="text-sm leading-7">{item}</span>
                </li>)}
              </ol>
            </div>
            <div>
              <p className="eyebrow text-primary">How to fish it</p>
              <h2 id="how-to-fish-heading" className="mt-3 font-display text-4xl">Make the retrieve match the job.</h2>
              <ol className="mt-7 space-y-4">
                {guide.howToFish.map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border pt-4">
                  <span className="font-display text-2xl text-primary">{index + 1}</span><span className="text-sm leading-7">{item}</span>
                </li>)}
              </ol>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Rod, reel, line and rigging</p><h2 className="mt-2 font-display text-3xl">Set up for control, not brand names.</h2></div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {guide.setup.map((item) => <div key={item} className="bg-background p-5 text-sm leading-7">{item}</div>)}
          </div>
        </section>

        <section id="seasonal-guide" className="py-12" aria-labelledby="seasonal-guide-heading">
          <p className="eyebrow text-primary">Texas season guide</p>
          <h2 id="seasonal-guide-heading" className="mt-3 font-display text-4xl sm:text-5xl">How the approach changes through the year</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Seasonal notes below are broad technique guidance, not a live fishing report. Check current water temperature, weather, lake level, access and fresh reports before a trip.</p>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {guide.seasonalGuide.map((row) => <article key={row.season} className="bg-background p-6">
              <p className="eyebrow text-primary">{row.season}</p>
              <p className="mt-3 text-sm leading-7">{row.guidance}</p>
            </article>)}
          </div>
        </section>

        <section className="border-y border-border py-10" aria-labelledby="mistakes-heading">
          <p className="eyebrow text-primary">Common mistakes</p>
          <h2 id="mistakes-heading" className="mt-2 font-display text-3xl">What usually makes this technique less effective</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {guide.commonMistakes.map((item) => <li key={item} className="border-t border-border pt-4 text-sm leading-7">{item}</li>)}
          </ul>
        </section>
      </> : null}

      <section className="py-12" aria-labelledby="lake-applications">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Where TexasDefined has source-backed applications</p>
          <h2 id="lake-applications" className="mt-3 font-display text-4xl sm:text-5xl">Verified Texas lake relationships</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Each entry below comes from a lake-technique relationship already attached to a complete TexasDefined fishing guide. A lake missing from this page is simply not yet covered by this verified technique dataset.</p>
        </div>
        <div className="mt-8 grid gap-x-8 lg:grid-cols-2">
          {data.profiles.map((row) => <article key={row.profile.id} className="border-t border-border py-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="eyebrow text-primary">Complete lake guide</p><h3 className="mt-2 font-display text-3xl"><a href={fishingFoundationAnchor("lake", row.lake.slug)} className="hover:text-primary">{row.lake.name}</a></h3></div>
              <span className="border border-border px-3 py-1.5 text-xs">{row.profile.seasons.map(titleCase).join(" · ")}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{row.profile.summary}</p>
            <div className="mt-5">
              <p className="eyebrow text-muted-foreground">Target species in this relationship</p>
              <ul className="mt-3 flex flex-wrap gap-2">{row.species.map((fish) => <li key={fish.id}><a href={fishingFoundationAnchor("species", fish.slug)} className="inline-block border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary">{fish.commonName}</a></li>)}</ul>
            </div>
            <a href={fishingFoundationAnchor("lake", row.lake.slug)} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {row.lake.name} fishing guide →</a>
          </article>)}
        </div>
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Before you fish</p><h2 className="mt-2 font-display text-3xl">Durable method context, not today's answer.</h2></div>
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
          <p>This page does not claim that {technique.name.toLowerCase()} is productive today, that it is the best technique statewide, or that a particular product or brand should be purchased.</p>
          <p>For a trip happening now, pair this durable relationship data with <a href="/fishing/reports" className="border-b border-primary text-primary">fresh reports</a>, weather, water conditions, access information and <a href="/fishing/regulations" className="border-b border-primary text-primary">current regulations</a>.</p>
          <p>Season labels on the verified lake cards describe the seasons explicitly attached to the source-backed lake-technique relationship. The broader seasonal guide above explains technique mechanics and does not override current conditions.</p>
        </div>
      </section>

      <section className="py-12" aria-labelledby="technique-sources">
        <p className="eyebrow text-primary">Sources</p>
        <h2 id="technique-sources" className="mt-2 font-display text-4xl">Source relationships behind this page</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">{data.sources.map((source) => <article key={source.url} className="border-t border-border pt-5">
          <h3 className="font-display text-xl">{source.name}</h3>
          <p className="mt-2 text-xs text-muted-foreground">Checked {source.checkedAt}</p>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open official/source page ↗</a>
        </article>)}</div>
      </section>

      <section className="border-t border-border py-10">
        <div className="flex flex-wrap gap-5 text-sm">
          <a href={FISHING_TECHNIQUES_DIRECTORY_PATH} className="border-b border-primary pb-1 font-semibold text-primary">← Browse all fishing techniques</a>
          <a href="/fishing/reports" className="border-b border-primary pb-1 font-semibold text-primary">Check current fishing reports →</a>
          <a href="/fishing/seasons" className="border-b border-primary pb-1 font-semibold text-primary">Fishing by season →</a>
        </div>
      </section>
    </Container>
  </>;
}

function titleCase(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
