import { Container } from "@/components/layout/Container";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import type { FishingTechniqueProfileData } from "@/data/fishing/technique-data.server";
import { FISHING_TECHNIQUES_DIRECTORY_PATH } from "@/data/fishing/technique-routing";

export function FishingTechniqueProfile({ data }: { data: FishingTechniqueProfileData }) {
  const { technique } = data;
  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · <a href={FISHING_TECHNIQUES_DIRECTORY_PATH}>Fishing techniques</a> · {technique.name}</nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">{titleCase(technique.category)} technique</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{technique.name} fishing in Texas.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{technique.summary}</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href="/fishing/seasons" className="border-b border-ink-foreground pb-1 font-semibold">Fishing seasons →</a><a href="/fishing/reports" className="border-b border-ink-foreground/50 pb-1">Fresh reports →</a><a href="/fishing/regulations" className="border-b border-ink-foreground/50 pb-1">Current regulations →</a></div></Container></header>

    <Container className="py-12 sm:py-16">
      {technique.slug === "soft-plastics" ? <SoftPlasticsAuthorityGuide /> : null}

      <section className="grid gap-6 border-y border-border py-8 sm:grid-cols-3" aria-label="Technique coverage"><div><p className="eyebrow text-muted-foreground">Complete lakes</p><p className="mt-2 font-display text-4xl">{data.lakes.length}</p></div><div><p className="eyebrow text-muted-foreground">Verified species</p><p className="mt-2 font-display text-4xl">{data.species.length}</p></div><div><p className="eyebrow text-muted-foreground">Season labels</p><p className="mt-2 font-display text-4xl">{data.seasons.length}</p></div></section>

      <section className="py-12" aria-labelledby="lake-applications"><div className="max-w-3xl"><p className="eyebrow text-primary">Where this method is sourced</p><h2 id="lake-applications" className="mt-3 font-display text-4xl sm:text-5xl">Verified lake applications, not a universal ranking.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Each entry below comes from a lake-technique relationship already attached to a complete TexasDefined fishing guide. A lake missing from this page is simply not yet covered by this verified technique dataset.</p></div>
        <div className="mt-8 grid gap-x-8 lg:grid-cols-2">{data.profiles.map((row) => <article key={row.profile.id} className="border-t border-border py-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">Complete lake guide</p><h3 className="mt-2 font-display text-3xl"><a href={fishingFoundationAnchor("lake", row.lake.slug)} className="hover:text-primary">{row.lake.name}</a></h3></div><span className="border border-border px-3 py-1.5 text-xs">{row.profile.seasons.map(titleCase).join(" · ")}</span></div><p className="mt-4 text-sm leading-7 text-muted-foreground">{row.profile.summary}</p><div className="mt-5"><p className="eyebrow text-muted-foreground">Target species in this relationship</p><ul className="mt-3 flex flex-wrap gap-2">{row.species.map((fish) => <li key={fish.id}><a href={fishingFoundationAnchor("species", fish.slug)} className="inline-block border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary">{fish.commonName}</a></li>)}</ul></div><a href={fishingFoundationAnchor("lake", row.lake.slug)} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {row.lake.name} fishing guide →</a></article>)}</div>
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">What this page means</p><h2 className="mt-2 font-display text-3xl">Durable method context, not today's answer.</h2></div><div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground"><p>This page does not claim that {technique.name.toLowerCase()} is productive today, that it is the best technique statewide, or that a particular product or brand should be purchased.</p><p>For a trip happening now, pair this durable relationship data with <a href="/fishing/reports" className="border-b border-primary text-primary">fresh reports</a>, weather, water conditions, access information and <a href="/fishing/regulations" className="border-b border-primary text-primary">current regulations</a>.</p><p>Season labels here describe the seasons explicitly attached to the verified lake-technique relationship. A “year-round” label does not promise equal conditions or catch rates every day.</p></div></section>

      <section className="py-12" aria-labelledby="technique-sources"><p className="eyebrow text-primary">Sources</p><h2 id="technique-sources" className="mt-2 font-display text-4xl">Source relationships behind this page</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{data.sources.map((source) => <article key={source.url} className="border-t border-border pt-5"><h3 className="font-display text-xl">{source.name}</h3><p className="mt-2 text-xs text-muted-foreground">Checked {source.checkedAt}</p><a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open official/source page ↗</a></article>)}</div></section>

      <section className="border-t border-border py-10"><a href={FISHING_TECHNIQUES_DIRECTORY_PATH} className="border-b border-primary pb-1 text-sm font-semibold text-primary">← Browse all verified fishing techniques</a></section>
    </Container>
  </>;
}

function SoftPlasticsAuthorityGuide() {
  const rigs = [
    { name: "Texas rig", use: "Grass, brush, timber, docks and other snag-prone cover.", setup: "Bullet weight + offset hook + worm, craw or creature bait.", cue: "Start here when you need a weedless presentation." },
    { name: "Weightless stick bait", use: "Shallow cover, dock edges, calm pockets and pressured fish.", setup: "Offset hook or wacky hook with no added weight.", cue: "Use the bait's slow fall instead of forcing it down." },
    { name: "Carolina rig", use: "Points, flats, roadbeds and deeper structure where you need bottom contact.", setup: "Sliding sinker + swivel + leader + soft plastic.", cue: "Cover broad bottom areas while keeping the bait behind the weight." },
    { name: "Drop shot", use: "Deep water, vertical targets and clear or pressured situations.", setup: "Hook above the sinker with a finesse worm or small bait.", cue: "Keep the bait suspended just off bottom with minimal movement." },
    { name: "Shaky head", use: "Rock, points, sparse cover and difficult bites.", setup: "Jighead + finesse worm, usually worked on bottom.", cue: "Drag, pause and subtly shake without overworking it." },
    { name: "Ned rig", use: "Rock, gravel, open bottom and high-pressure fish.", setup: "Light mushroom-style jighead + compact buoyant plastic.", cue: "Think small, slow and close to the bottom." },
  ];

  const seasons = [
    { season: "Spring", detail: "Work warming pockets, secondary points, protected spawning areas and nearby cover. Weightless stick baits, Texas-rigged creatures and finesse worms are especially versatile as bass move shallow." },
    { season: "Summer", detail: "Split the day between shade and depth. Skip plastics around docks and vegetation early, then work deeper points, brush, creek-channel edges and offshore structure as light and heat increase." },
    { season: "Fall", detail: "Follow forage into creek arms and transition zones. Soft jerkbaits, swimbaits and faster-moving plastics can cover water; keep a Texas rig or finesse bait ready for fish holding tight to cover." },
    { season: "Winter", detail: "Slow the presentation and stay near stable structure. Finesse worms, shaky heads, drop shots and compact bottom baits can keep a lure in the strike zone longer during cold-water periods." },
  ];

  return <div className="mb-14 space-y-14">
    <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]" aria-labelledby="soft-plastics-start">
      <div>
        <p className="eyebrow text-primary">Quick start</p>
        <h2 id="soft-plastics-start" className="mt-3 font-display text-4xl sm:text-5xl">How to fish soft plastics in Texas.</h2>
      </div>
      <div className="space-y-4 text-sm leading-7 text-muted-foreground">
        <p>Soft plastics imitate worms, crawfish, baitfish and other forage while letting you control fall rate, depth and presentation speed. Their biggest advantage is adaptability: the same family of baits can be fished weightless in inches of water, punched through vegetation, dragged across a point or suspended above deep structure.</p>
        <p>For a first setup, rig a 5- to 7-inch worm or creature bait weedless on an offset hook with a light bullet weight. Cast past the target, let the bait fall on semi-slack line, watch for a twitch or sideways movement, then work it back with short hops or a slow drag. Most beginners move the bait too much and too quickly.</p>
      </div>
    </section>

    <section aria-labelledby="choose-rig">
      <div className="max-w-3xl">
        <p className="eyebrow text-primary">Choose the presentation</p>
        <h2 id="choose-rig" className="mt-3 font-display text-4xl sm:text-5xl">Match the rig to the cover, depth and pressure.</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">There is no single “soft-plastic rig.” Start with the environment you are fishing, then choose the simplest rig that keeps the bait in the strike zone without constantly hanging up.</p>
      </div>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
        {rigs.map((rig) => <article key={rig.name} className="bg-background p-6">
          <h3 className="font-display text-2xl">{rig.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{rig.use}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-foreground">Basic setup</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{rig.setup}</p>
          <p className="mt-4 border-l-2 border-primary pl-3 text-sm leading-6">{rig.cue}</p>
        </article>)}
      </div>
    </section>

    <section className="border-y border-border py-10" aria-labelledby="rig-diagrams">
      <p className="eyebrow text-primary">Rigging at a glance</p>
      <h2 id="rig-diagrams" className="mt-3 font-display text-4xl">Four core layouts to recognize.</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <RigDiagram title="Texas rig" labels={["line", "bullet weight", "hook", "soft plastic"]} arrangement="inline" />
        <RigDiagram title="Carolina rig" labels={["weight", "swivel", "leader", "hook + bait"]} arrangement="inline" />
        <RigDiagram title="Drop shot" labels={["main line", "hook + bait", "leader", "weight"]} arrangement="vertical" />
        <RigDiagram title="Wacky rig" labels={["line", "hook through center", "stick bait"]} arrangement="center" />
      </div>
    </section>

    <section className="grid gap-8 lg:grid-cols-[15rem_1fr]" aria-labelledby="presentation-process">
      <div>
        <p className="eyebrow text-primary">Presentation</p>
        <h2 id="presentation-process" className="mt-2 font-display text-3xl">Cast, fall, read, move, pause.</h2>
      </div>
      <ol className="grid gap-5 md:grid-cols-2">
        {[
          ["1. Cast beyond the target", "Land past the dock post, grass edge, stump, point or brush so the bait enters the strike zone naturally instead of dropping directly on a fish."],
          ["2. Watch the fall", "Many bites happen before the bait reaches bottom. Follow the line for a jump, sudden slack, sideways movement or a fall that stops too early."],
          ["3. Establish bottom contact", "Once the bait settles, lightly lift or drag it. Learn what rock, wood, grass and clean bottom feel like so an unexpected change is easier to recognize."],
          ["4. Add short movements", "Use one or two hops, a slow pull or a subtle shake. Then stop. Soft plastics often work because they remain in place long enough for a fish to commit."],
          ["5. Reel down before setting", "If the line moves or pressure increases, remove slack, confirm weight and make a firm controlled hookset appropriate to the hook and tackle."],
          ["6. Change one variable at a time", "Before abandoning an area, change fall rate, bait profile, color, retrieve speed or rig. This helps identify what actually changed the response."],
        ].map(([heading, body]) => <li key={heading} className="border-t border-border pt-5"><h3 className="font-display text-2xl">{heading}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></li>)}
      </ol>
    </section>

    <section aria-labelledby="texas-cover">
      <div className="max-w-3xl">
        <p className="eyebrow text-primary">Texas water</p>
        <h2 id="texas-cover" className="mt-3 font-display text-4xl sm:text-5xl">Let habitat make the first decision.</h2>
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border"><th className="py-3 pr-6 font-semibold">Situation</th><th className="py-3 pr-6 font-semibold">Good starting rig</th><th className="py-3 font-semibold">Why</th></tr></thead>
          <tbody className="text-muted-foreground">
            {[
              ["Hydrilla, reeds or dense shoreline vegetation", "Texas rig", "Weedless profile reaches pockets and edges without collecting as much vegetation."],
              ["Flooded timber, brush piles and laydowns", "Texas rig / creature bait", "Compact, weedless presentations can be pitched repeatedly to individual targets."],
              ["Docks and shade lines", "Weightless stick bait / Texas rig", "Both skip well and can fall beside pilings or under overhangs."],
              ["Rocky points, ledges and roadbeds", "Carolina rig / shaky head", "Maintains bottom contact while covering structure methodically."],
              ["Deep clear water or pressured fish", "Drop shot / Ned rig", "Small profiles and controlled depth help keep the bait close to fish."],
              ["Shad-oriented fish in open water", "Soft jerkbait / swimbait", "A baitfish profile can be counted down and retrieved through suspended fish."],
            ].map((row) => <tr key={row[0]} className="border-b border-border/70"><td className="py-4 pr-6 text-foreground">{row[0]}</td><td className="py-4 pr-6">{row[1]}</td><td className="py-4">{row[2]}</td></tr>)}
          </tbody>
        </table>
      </div>
    </section>

    <section aria-labelledby="season-guide">
      <p className="eyebrow text-primary">Seasonal strategy</p>
      <h2 id="season-guide" className="mt-3 font-display text-4xl sm:text-5xl">Adjust location and speed through the year.</h2>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
        {seasons.map((item) => <article key={item.season} className="bg-background p-6"><h3 className="font-display text-2xl">{item.season}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p></article>)}
      </div>
    </section>

    <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="mistakes">
      <div><p className="eyebrow text-primary">Common mistakes</p><h2 id="mistakes" className="mt-2 font-display text-3xl">What usually goes wrong.</h2></div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["Fishing too fast", "Give the bait time to fall and pause, especially around specific pieces of cover."],
          ["Ignoring the line", "A bite may appear as movement rather than a hard pull. Watch the line during the fall."],
          ["Using too much weight", "Heavy weight can kill a natural fall. Use enough to maintain control, not automatically the heaviest sinker available."],
          ["Never changing profile", "Downsize for pressure or clear water; increase bulk when you need displacement, visibility or a slower fall."],
          ["Setting on slack line", "Reel down first so the hookset transfers force to the hook instead of merely removing slack."],
          ["Treating every lake alike", "Vegetation, timber, clarity, depth and forage differ widely across Texas. Let the actual lake relationship guide the presentation."],
        ].map(([title, body]) => <article key={title} className="border-t border-border pt-5"><h3 className="font-display text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></article>)}
      </div>
    </section>
  </div>;
}

function RigDiagram({ title, labels, arrangement }: { title: string; labels: string[]; arrangement: "inline" | "vertical" | "center" }) {
  const vertical = arrangement === "vertical";
  return <figure className="border border-border p-5">
    <figcaption className="font-display text-xl">{title}</figcaption>
    <div className={"mt-5 flex min-h-24 items-center justify-center gap-3 rounded-sm bg-muted/35 p-5 " + (vertical ? "flex-col" : "flex-row flex-wrap")}>
      {labels.map((label, index) => <div key={label} className="contents">
        <span className="rounded-full border border-foreground/30 bg-background px-3 py-2 text-xs font-semibold">{label}</span>
        {index < labels.length - 1 ? <span aria-hidden="true" className={vertical ? "h-5 w-px bg-foreground/35" : "h-px w-6 bg-foreground/35"} /> : null}
      </div>)}
    </div>
  </figure>;
}

function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
