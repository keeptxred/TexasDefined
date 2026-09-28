import { Container } from "@/components/layout/Container";
import { fishingTechniqueAuthorityContent, type FishingTechniqueAuthorityContent } from "@/data/fishing/technique-authority-content";
import { fishingTechniqueGuideContent } from "@/data/fishing/technique-guide-content";
import { fishingTechniqueImages } from "@/data/fishing/technique-images";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import type { FishingTechniqueProfileData } from "@/data/fishing/technique-data.server";
import { FISHING_TECHNIQUES_DIRECTORY_PATH } from "@/data/fishing/technique-routing";

export function FishingTechniqueProfile({ data }: { data: FishingTechniqueProfileData }) {
  const { technique } = data;
  const guide = fishingTechniqueGuideContent[technique.slug];
  const authority = fishingTechniqueAuthorityContent[technique.slug as keyof typeof fishingTechniqueAuthorityContent];
  const images = fishingTechniqueImages[technique.slug];
  const selectionGuide = guide?.selectionGuide ?? authority?.selectionGuide ?? [];
  const selectionTitle = guide?.selectionTitle ?? authority?.selectionTitle ?? `${technique.name} by Depth and Cover`;
  const selectionIntro = guide?.selectionIntro ?? authority?.selectionIntro ?? "Choose the version that best matches the depth, cover and presentation job before fine-tuning secondary details.";

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
          <a href="#questions" className="border-b border-ink-foreground/50 pb-1">Questions ↓</a>
          <a href="/fishing/reports" className="border-b border-ink-foreground/50 pb-1">Fresh reports →</a>
        </div>
      </Container>
    </header>

    {images?.hero ? <Container className="pt-8 sm:pt-10">
      <figure className="overflow-hidden border border-border bg-muted/20">
        <img
          src={images.hero.src}
          alt={images.hero.alt}
          width={images.hero.width}
          height={images.hero.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="aspect-[16/9] w-full object-cover"
        />
        <figcaption className="border-t border-border px-5 py-3 text-xs leading-5 text-muted-foreground">{images.hero.caption}</figcaption>
      </figure>
    </Container> : null}

    <Container className="py-12 sm:py-16">
      <section className="grid gap-6 border-y border-border py-8 sm:grid-cols-3" aria-label="Technique coverage">
        <div><p className="eyebrow text-muted-foreground">Lake guides</p><p className="mt-2 font-display text-4xl">{data.lakes.length}</p></div>
        <div><p className="eyebrow text-muted-foreground">Verified species</p><p className="mt-2 font-display text-4xl">{data.species.length}</p></div>
        <div><p className="eyebrow text-muted-foreground">Documented seasons</p><p className="mt-2 font-display text-4xl">{data.seasons.length}</p></div>
      </section>

      {guide ? <>
        <section className="py-12" aria-labelledby="when-to-use">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-primary">When to use</p>
              <h2 id="when-to-use" className="mt-3 font-display text-4xl sm:text-5xl">When to Use {technique.name}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">These are practical technique fundamentals. The Texas lake, species and season claims farther down remain tied to the verified source relationships in the fishing dataset.</p>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {guide.whenToUse.map((item) => <div key={item} className="bg-background p-6"><p className="text-sm leading-7">{item}</p></div>)}
            </div>
          </div>
        </section>

        {authority?.regulationNotes ? <section className="border-b border-border py-12" aria-labelledby="technique-rules">
          <p className="eyebrow text-primary">Texas rules</p>
          <h2 id="technique-rules" className="mt-3 font-display text-4xl sm:text-5xl">{authority.regulationNotes.title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{authority.regulationNotes.intro}</p>
          <ul className="mt-7 grid gap-4 md:grid-cols-2">
            {authority.regulationNotes.bullets.map((item) => <li key={item} className="border-t border-border pt-4 text-sm leading-7">{item}</li>)}
          </ul>
          <a href={authority.regulationNotes.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">{authority.regulationNotes.sourceLabel} ↗</a>
        </section> : null}

        {selectionGuide.length ? <section className="border-y border-border py-12" aria-labelledby="selection-guide">
          <p className="eyebrow text-primary">Choose the setup</p>
          <h2 id="selection-guide" className="mt-3 font-display text-4xl sm:text-5xl">{selectionTitle}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{selectionIntro}</p>
          {images?.depthGuide ? <figure className="mt-8 overflow-hidden border border-border bg-muted/20">
            <img
              src={images.depthGuide.src}
              alt={images.depthGuide.alt}
              width={images.depthGuide.width}
              height={images.depthGuide.height}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover"
            />
            <figcaption className="border-t border-border px-5 py-3 text-xs leading-5 text-muted-foreground">{images.depthGuide.caption}</figcaption>
          </figure> : null}
          <div className="mt-8 overflow-hidden border border-border">
            <div className="hidden grid-cols-3 bg-muted/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:grid">
              <span>{technique.slug === "soft-plastics" ? "Rig" : "Style"}</span><span>{technique.slug === "soft-plastics" ? "Depth / role" : "Depth"}</span><span>Best use</span>
            </div>
            {selectionGuide.map((item) => <div key={item.label} className="grid gap-2 border-t border-border px-5 py-5 first:border-t-0 sm:grid-cols-3 sm:gap-0">
              <strong className="font-display text-xl">{item.label}</strong>
              <span className="text-sm text-muted-foreground">{item.depth}</span>
              <span className="text-sm leading-6">{item.bestFor}</span>
            </div>)}
          </div>
          {technique.slug === "crankbaits" ? <div className="mt-8 grid gap-3 sm:grid-cols-4" aria-label="Crankbait depth ladder">
            {["Surface / very shallow", "Shallow", "Mid-depth", "Deep"].map((depth, index) => <div key={depth} className="border border-border p-5">
              <p className="eyebrow text-muted-foreground">Zone {index + 1}</p>
              <p className="mt-2 font-display text-2xl">{depth}</p>
              <div className="mt-4 h-1 bg-border" style={{ width: `${35 + index * 20}%` }} />
            </div>)}
          </div> : null}
        </section> : null}

        {technique.slug === "soft-plastics" ? <SoftPlasticsRiggingVisual /> : null}
        {authority?.diagram ? <TechniqueDiagram diagram={authority.diagram} /> : null}

        <section id="how-to-fish-it" className="py-12" aria-labelledby="how-to-fish-heading">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-primary">Where to fish</p>
              <h2 className="mt-3 font-display text-4xl">Where to Fish {technique.name}</h2>
              <ol className="mt-7 space-y-4">
                {guide.whereToFish.map((item, index) => <li key={item} className="flex gap-3 border-t border-border pt-4">
                  <span className="font-display text-2xl text-primary">{index + 1}</span><span className="text-sm leading-7">{item}</span>
                </li>)}
              </ol>
            </div>
            <div>
              <p className="eyebrow text-primary">How to fish</p>
              <h2 id="how-to-fish-heading" className="mt-3 font-display text-4xl">How to Fish {technique.name}</h2>
              <ol className="mt-7 space-y-4">
                {guide.howToFish.map((item, index) => <li key={item} className="flex gap-3 border-t border-border pt-4">
                  <span className="font-display text-2xl text-primary">{index + 1}</span><span className="text-sm leading-7">{item}</span>
                </li>)}
              </ol>
            </div>
          </div>
        </section>

        {authority?.speciesGuide?.length ? <section className="border-t border-border py-12" aria-labelledby="species-differences">
          <p className="eyebrow text-primary">Target differences</p>
          <h2 id="species-differences" className="mt-3 font-display text-4xl sm:text-5xl">{authority.speciesTitle ?? `${technique.name} by Target Species`}</h2>
          {authority.speciesIntro ? <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{authority.speciesIntro}</p> : null}
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {authority.speciesGuide.map((row) => <article key={row.label} className="bg-background p-6">
              <h3 className="font-display text-2xl">{row.label}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{row.guidance}</p>
            </article>)}
          </div>
        </section> : null}

        <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Rod, reel, line and rigging</p><h2 className="mt-2 font-display text-3xl">Basic Tackle and Rigging Setup</h2></div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {guide.setup.map((item) => <div key={item} className="bg-background p-5 text-sm leading-7">{item}</div>)}
          </div>
        </section>

        <section id="seasonal-guide" className="py-12" aria-labelledby="seasonal-guide-heading">
          <p className="eyebrow text-primary">Seasonal guide</p>
          <h2 id="seasonal-guide-heading" className="mt-3 font-display text-4xl sm:text-5xl">Season-by-Season Guide</h2>
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
          <h2 id="mistakes-heading" className="mt-2 font-display text-3xl">Common Mistakes to Avoid</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {guide.commonMistakes.map((item) => <li key={item} className="border-t border-border pt-4 text-sm leading-7">{item}</li>)}
          </ul>
        </section>
      </> : null}

      <section className="py-12" aria-labelledby="lake-applications">
        <div className="max-w-3xl">
          <h2 id="lake-applications" className="mt-3 font-display text-4xl sm:text-5xl">Texas Lakes Covered in This Guide</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Each entry below comes from a lake-technique relationship already attached to a complete TexasDefined fishing guide. A lake missing from this page is simply not yet covered by this verified technique dataset.</p>
        </div>
        <div className="mt-8 grid gap-x-8 lg:grid-cols-2">
          {data.profiles.map((row) => <article key={row.profile.id} className="border-t border-border py-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="eyebrow text-primary">Lake guide</p><h3 className="mt-2 font-display text-3xl"><a href={fishingFoundationAnchor("lake", row.lake.slug)} className="hover:text-primary">{row.lake.name}</a></h3></div>
              <span className="border border-border px-3 py-1.5 text-xs">{row.profile.seasons.map(titleCase).join(" · ")}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{row.profile.summary}</p>
            <div className="mt-5">
              <p className="eyebrow text-muted-foreground">Target species</p>
              <ul className="mt-3 flex flex-wrap gap-2">{row.species.map((fish) => <li key={fish.id}><a href={fishingFoundationAnchor("species", fish.slug)} className="inline-block border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary">{fish.commonName}</a></li>)}</ul>
            </div>
            <a href={fishingFoundationAnchor("lake", row.lake.slug)} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {row.lake.name} fishing guide →</a>
          </article>)}
        </div>
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Current conditions</p><h2 className="mt-2 font-display text-3xl">Check Current Conditions Before You Fish</h2></div>
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
          <p>This page does not claim that {technique.name.toLowerCase()} is productive today, that it is the best technique statewide, or that a particular product or brand should be purchased.</p>
          <p>For a trip happening now, pair this durable relationship data with <a href="/fishing/reports" className="border-b border-primary text-primary">fresh reports</a>, weather, water conditions, access information and <a href="/fishing/regulations" className="border-b border-primary text-primary">current regulations</a>.</p>
          <p>Season labels on the verified lake cards describe the seasons explicitly attached to the source-backed lake-technique relationship. The broader seasonal guide above explains technique mechanics and does not override current conditions.</p>
        </div>
      </section>

      {authority?.faq?.length ? <section id="questions" className="py-12" aria-labelledby="questions-heading">
        <p className="eyebrow text-primary">Practical questions</p>
        <h2 id="questions-heading" className="mt-2 font-display text-4xl sm:text-5xl">{technique.name} Questions, Answered</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {authority.faq.map((item) => <article key={item.question} className="py-6">
            <h3 className="font-display text-2xl">{item.question}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{item.answer}</p>
          </article>)}
        </div>
      </section> : null}

      <section className="py-12" aria-labelledby="technique-sources">
        <p className="eyebrow text-primary">Sources</p>
        <h2 id="technique-sources" className="mt-2 font-display text-4xl">Sources and Verification</h2>
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

function TechniqueDiagram({ diagram }: { diagram: NonNullable<FishingTechniqueAuthorityContent["diagram"]> }) {
  return <section className="border-b border-border py-12" aria-labelledby="technique-diagram">
    <p className="eyebrow text-primary">{diagram.eyebrow ?? "Presentation at a glance"}</p>
    <h2 id="technique-diagram" className="mt-3 font-display text-4xl sm:text-5xl">{diagram.title}</h2>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{diagram.intro}</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      {diagram.rigs.map((rig) => <figure key={rig.name} className="border border-border p-5">
        <figcaption className="font-display text-2xl">{rig.name}</figcaption>
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4" aria-label={`${rig.name} simplified layout`}>
          {rig.pieces.map((piece, index) => <div key={`${rig.name}-${piece}`} className="contents">
            <span className="border border-border px-3 py-2 text-xs font-semibold">{piece}</span>
            {index < rig.pieces.length - 1 ? <span aria-hidden="true" className="text-muted-foreground">→</span> : null}
          </div>)}
        </div>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">{rig.note}</p>
      </figure>)}
    </div>
  </section>;
}

function SoftPlasticsRiggingVisual() {
  const rigs = [
    {
      name: "Texas rig",
      image: "/images/fishing/rigs/texas-rig.svg",
      imageAlt: "Texas rig with line, bullet weight, offset hook and soft plastic worm",
      pieces: ["line", "bullet weight", "offset hook", "soft plastic"],
    },
    {
      name: "Carolina rig",
      image: "/images/fishing/rigs/carolina-rig.svg",
      imageAlt: "Carolina rig with sliding weight, swivel, leader, hook and soft plastic bait",
      pieces: ["line", "sliding weight", "swivel", "leader", "hook + bait"],
    },
    {
      name: "Drop shot",
      image: "/images/fishing/rigs/drop-shot.svg",
      imageAlt: "Drop shot rig with hook and bait suspended above a weight",
      pieces: ["main line", "hook + bait", "leader below hook", "weight"],
    },
    {
      name: "Wacky rig",
      image: "/images/fishing/rigs/wacky-rig.svg",
      imageAlt: "Wacky rig with a center hook through a stick bait",
      pieces: ["line", "center hook", "stick bait"],
    },
  ];

  return <section className="border-b border-border py-12" aria-labelledby="soft-plastics-rigging-visual">
    <p className="eyebrow text-primary">Rigging at a glance</p>
    <h2 id="soft-plastics-rigging-visual" className="mt-3 font-display text-4xl sm:text-5xl">Recognize the Basic Layout Before You Tie It</h2>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These are simplified orientation diagrams, not scale drawings. Hook style, leader length, sinker shape and exact placement should still match the cover, bait and water you are fishing.</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      {rigs.map((rig) => <figure key={rig.name} className="overflow-hidden border border-border bg-background">
        <div className="p-5">
          <figcaption className="font-display text-2xl">{rig.name}</figcaption>
        </div>
        <div className="border-y border-border bg-muted/20">
          <img
            src={rig.image}
            alt={rig.imageAlt}
            width={640}
            height={220}
            loading="lazy"
            decoding="async"
            className="aspect-[32/11] w-full object-contain"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 p-5" aria-label={`${rig.name} simplified rig layout`}>
          {rig.pieces.map((piece, index) => <div key={piece} className="contents">
            <span className="border border-border px-3 py-2 text-xs font-semibold">{piece}</span>
            {index < rig.pieces.length - 1 ? <span aria-hidden="true" className="text-muted-foreground">→</span> : null}
          </div>)}
        </div>
      </figure>)}
    </div>
  </section>;
}

function titleCase(value: string) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
