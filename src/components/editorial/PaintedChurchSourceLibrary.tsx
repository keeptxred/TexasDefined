import "@/data/painted-churches-expanded";

const sourceLibrary = [
  {
    label: "Discover Victoria Texas",
    url: "https://www.discovervictoriatexas.com/business/painted-churches-of-texas",
    role: "Regional visitor context",
    note: "Useful for Victoria-area framing, nearby-road-trip context, and a concise overview of High Hill, Praha, Dubina, and Ammannsville. Treat church-specific historical claims as secondary to THC, NPS, parish, and archival records.",
  },
  {
    label: "Painted Churches in Texas",
    url: "https://paintedchurchesintexas.com/",
    role: "Dedicated church catalog",
    note: "Useful for church-by-church visitor details, addresses, maps, and leads for lesser-known painted churches. Verify historical dates, artist attributions, and current access against primary sources before publishing them as fact.",
  },
  {
    label: "Roaming the USA",
    url: "https://www.roamingtheusa.com/painted-churches-of-texas/",
    role: "Travel and visual interpretation",
    note: "Useful for visual descriptions, route-planning context, and visitor-oriented comparisons among Serbin, Ammannsville, Dubina, Praha, Fredericksburg, and High Hill. Time-sensitive service information must be rechecked locally.",
  },
  {
    label: "Traveller’s Elixir",
    url: "https://www.travellerselixir.com/texas-painted-churches-road-trip/",
    role: "Expansion and road-trip lead",
    note: "Its seven-stop route surfaced Plantersville and Corn Hill as candidates outside the original Texas Defined collection. Both have now been independently researched and added with their designation differences clearly labeled.",
  },
  {
    label: "Texas Monthly / Anthony Head research",
    url: "https://www.texasmonthly.com/",
    role: "Expert secondary research",
    note: "Anthony Head’s reporting with photographer Kirk Weddle is especially useful for decorative-painting analysis, unresolved attribution questions, and the possibility that substantially more painted churches survive statewide than appear in the formal National Register group. Use as expert secondary analysis while retaining primary-source precedence for hard facts.",
  },
] as const;

const verifiedAdditions = [
  {
    name: "St. Mary’s Catholic Church",
    place: "Plantersville, Texas",
    result: "Verified and added. THC documents the 1917 Gothic Revival church, German and Polish immigrant parish history, heritage stained glass, and Recorded Texas Historic Landmark status. Independent visual documentation confirms the painted ceiling and historic decorated interior.",
  },
  {
    name: "Holy Trinity Catholic Church",
    place: "Corn Hill, Texas",
    result: "Verified and added as part of the broader Painted Churches tradition. Parish and Williamson County records document the 1889 founding, Moravian heritage, 1913 twin-spired church, continuing Czech Mass, and current parish identity. It is not represented as part of the THC decorative-interior National Register group.",
  },
] as const;

export function PaintedChurchSourceLibrary() {
  return (
    <section aria-labelledby="source-library" className="mt-16 border-t-2 border-foreground pt-8">
      <p className="eyebrow text-primary">Research library</p>
      <h2 id="source-library" className="mt-3 font-display text-4xl sm:text-5xl">How Texas Defined keeps expanding the record</h2>
      <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
        Primary records still lead: Texas Historical Commission, National Register documentation, parish archives and official church sources take precedence for dates, architects, artists, designations and access. The sources below are retained as a second research layer for visual interpretation, visitor context, route planning, photography leads and clues to churches that may be missing from the formal historic-register group.
      </p>

      <div className="mt-9 grid gap-px border border-border bg-border md:grid-cols-2">
        {sourceLibrary.map((source) => (
          <article key={source.label} className="bg-background p-6">
            <p className="eyebrow text-muted-foreground">{source.role}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight">
              <a href={source.url} target="_blank" rel="noreferrer" className="hover:text-primary">{source.label}</a>
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{source.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 border-l-2 border-primary bg-surface p-6 sm:p-8">
        <p className="eyebrow text-primary">Expansion research completed</p>
        <h3 className="mt-3 font-display text-3xl">The collection now includes 20 verified church profiles.</h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Secondary sources are used to discover candidates, but inclusion follows only after stronger records establish the church, its history and the basis for treating it as part of the Painted Churches tradition. Plantersville and Corn Hill have now cleared that review, with their different historic-designation status kept explicit.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {verifiedAdditions.map((lead) => (
            <div key={`${lead.name}-${lead.place}`} className="border-t border-border pt-4">
              <h4 className="font-display text-2xl">{lead.name}</h4>
              <p className="eyebrow mt-2 text-muted-foreground">{lead.place}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{lead.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
