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
    note: "Its route surfaced Plantersville and Corn Hill as candidates outside the original Texas Defined collection. Both were independently researched before being added, with their designation differences clearly labeled.",
  },
  {
    label: "Portal to Texas History",
    url: "https://texashistory.unt.edu/search/?q=painted+churches+texas",
    role: "Primary-source photographs and scans",
    note: "Especially valuable for historic interior photographs, archival views and locally held collections. Item-level rights and reproduction statements are checked before images are republished.",
  },
  {
    label: "Buie Harwood decorative-painting research archive",
    url: "https://txarchives.org/utaaa/finding_aids/00136.xml",
    role: "Scholarly candidate discovery",
    note: "The archive documents decorative-painting field research at churches across Texas and helps identify strong candidates beyond the familiar Schulenburg circuit. It helped elevate Sacred Heart at Palestine from a travel lead to a research-backed addition.",
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
    result: "Verified and added as part of the broader Painted Churches tradition. Parish and Williamson County records document the 1889 founding, Moravian heritage, 1913 twin-spired church and current parish identity. It is not represented as part of the THC decorative-interior National Register group.",
  },
  {
    name: "Sacred Heart Catholic Church",
    place: "Palestine, Texas",
    result: "Verified and added from unusually strong evidence: Portal to Texas History photographs document the religious mural and decorated sanctuary, the Buie Harwood archive documents decorative-painting research at the church, and the parish publishes current visitor policy.",
  },
  {
    name: "St. Stanislaus Catholic Church",
    place: "Bandera, Texas",
    result: "Verified and added as a living Painted Church tradition. The historic 1876 Polish parish church is an RTHL, while the parish itself documents the artists, subjects and 2003–2008 chronology of its modern painted interior. The modern campaign is clearly separated from the 19th-century THC group.",
  },
] as const;

const researchQueue = [
  {
    name: "St. Mary’s Church",
    place: "Ellinger / Hostyn Hill, Texas",
    status: "Historic church history is verified, but the painted-interior evidence has not yet met the same church-specific primary-source standard used for public inclusion.",
  },
  {
    name: "Sacred Heart Catholic Church",
    place: "Rockne, Texas",
    status: "The parish’s German-Catholic history and historic church are well documented, and a reusable exterior photograph has been located, but Painted Church classification still needs stronger interior evidence before publication.",
  },
] as const;

export function PaintedChurchSourceLibrary() {
  return (
    <section aria-labelledby="source-library" className="mt-16 border-t-2 border-foreground pt-8">
      <p className="eyebrow text-primary">Research library</p>
      <h2 id="source-library" className="mt-3 font-display text-4xl sm:text-5xl">How Texas Defined keeps expanding the record</h2>
      <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
        Primary records still lead: Texas Historical Commission, National Register documentation, parish archives and official church sources take precedence for dates, architects, artists, designations and access. Secondary sources and archival collections are used to discover candidates, interpret decorative work and locate photography, but every public addition receives a church-specific verification pass first.
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
        <h3 className="mt-3 font-display text-3xl">The collection now includes 22 verified church profiles.</h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Plantersville, Corn Hill, Palestine and Bandera were added only after stronger church-specific records established the basis for inclusion. Texas Defined keeps formal National Register membership, broader historic Painted Church status and later living decorative campaigns distinct rather than treating them as interchangeable labels.
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

      <div className="mt-10 border-t border-border pt-8">
        <p className="eyebrow text-primary">Still under verification</p>
        <h3 className="mt-3 font-display text-3xl">Candidates are not counted until the evidence is there.</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {researchQueue.map((lead) => (
            <div key={`${lead.name}-${lead.place}`} className="border-t border-border pt-4">
              <h4 className="font-display text-2xl">{lead.name}</h4>
              <p className="eyebrow mt-2 text-muted-foreground">{lead.place}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{lead.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
