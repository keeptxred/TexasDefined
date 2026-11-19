/**
 * Three primary-source examples explain consequential differences between
 * fishing lakes. These are research comparisons, not live trip reports or rankings.
 * Primary profiles inspected 2026-11-19; do not silently restamp lake record dates.
 */
const examples = [
  {
    name: "Lake Fork",
    guide: "/fishing/lakes/lake-fork",
    source: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/",
    decision: "Choose when your main question is where to fish for largemouth bass around cover.",
    evidence: "TPWD identifies aquatic vegetation, docks and lake points as important bass habitat. This makes a cover-focused plan more relevant than simply comparing lake acreage.",
    tradeoff: "A famous bass fishery is not a guarantee of a catch. Check Lake Fork's lake-specific harvest rules before keeping any bass.",
  },
  {
    name: "Lake Conroe",
    guide: "/fishing/lakes/lake-conroe",
    source: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/",
    decision: "Consider when channel catfish or a mix of open water and upper-lake timber fits the trip.",
    evidence: "TPWD describes channel catfish as the reservoir's most abundant sportfish, with broad open-water habitat in the lower portion and standing timber in its upper reaches.",
    tradeoff: "The upper and lower lake are not interchangeable fishing settings; check the actual public access point, launch usability and conditions.",
  },
  {
    name: "Canyon Lake",
    guide: "/fishing/lakes/canyon-lake",
    source: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/",
    decision: "Consider when a rocky highland reservoir and striped-bass opportunity interest you.",
    evidence: "TPWD documents steep rocky banks, clear water, flooded timber and a striped-bass fishery maintained by stocking because the fish do not successfully reproduce there.",
    tradeoff: "Steep shores do not establish safe public bank access. Verify the particular park, ramp or shoreline access and current rules before leaving.",
  },
] as const;

export function FishingLakeDecisionGuide({ guideCount }: { guideCount: number }) {
  return (
    <section className="border-t border-border py-12" aria-labelledby="lake-decision-heading">
      <p className="eyebrow text-primary">Original lake-by-lake analysis</p>
      <h2 id="lake-decision-heading" className="mt-2 max-w-4xl font-display text-3xl sm:text-4xl">Three lakes, three different fishing decisions</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
        An acreage ranking cannot tell you whether a reservoir suits your target species, fishing style or access needs.
        These three examples contrast TPWD-documented habitat and fishery information, with our editorial interpretation
        of when each difference may matter. They are not a forecast, personal field test, or a list of the state's best lakes.
      </p>
      <div className="mt-7 grid gap-6 lg:grid-cols-3">
        {examples.map((example) => (
          <article key={example.name} className="rounded-lg border border-border p-5">
            <h3 className="font-display text-2xl">{example.name}</h3>
            <p className="mt-3 text-sm font-semibold leading-6">{example.decision}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{example.evidence}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Planning trade-off:</strong> {example.tradeoff}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href={example.guide} className="font-semibold text-primary underline underline-offset-2">Read complete {example.name} guide</a>
              <a href={example.source} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline underline-offset-2">TPWD lake profile — primary source</a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">
        <strong className="text-foreground">How to narrow the choice:</strong> Start with the species and habitat you want
        to fish, filter above for documented shore, ramp or kayak facilities, and then compare lake-specific season notes.
        A facility in a historical agency listing is not proof that it is open today. Check each waterbody's current
        regulations, public access and management notices before travelling.
      </p>
      <div className="mt-8 border-t border-border pt-6">
        <h3 className="font-display text-2xl">Why {guideCount} guides, not every Texas lake?</h3>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          This is an editorial collection of completed, individually source-reviewed TexasDefined lake guides, not a
          statewide inventory or a ranking. We include a guide once its lake identity, species relationships and practical
          planning sources have been researched and the page is ready for public use. More Texas lakes exist than the {guideCount}
          displayed here; the <a href="https://tpwd.texas.gov/fishboat/fish/recreational/lakes/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">TPWD Texas Lake Finder</a>
          covers additional destinations. Selection means a completed guide, not that these lakes are better than others.
        </p>
        <p className="mt-3 max-w-4xl text-xs leading-6 text-muted-foreground">
          Editorial comparison sources checked November 19, 2026. The date applies to these three referenced agency
          profiles only; each directory card shows its separate lake-record source-review date. Twice-weekly source
          monitoring and quarterly directory research reviews do not certify live lake conditions. For corrections,
          consult our <a href="/corrections-policy" className="underline underline-offset-2">corrections policy</a>.
        </p>
      </div>
    </section>
  );
}
