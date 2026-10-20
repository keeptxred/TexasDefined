import { Container } from "@/components/layout/Container";
import { dallasBlackHistoryResearch } from "@/data/dallas-black-history-research";
const canonical = "https://texasdefined.com/dallas-black-history";

const connections = [
  {
    heading: "The downtown Arts District and North Dallas Freedmen's Town",
    body: "A congregation organized in 1873, the 1922 Booker T. Washington school and the threatened burial landscape of North Dallas Freedmen's Town document three different community institutions: worship, education and remembrance. St. Paul and the school are across from one another; Freedman's Cemetery is a separate site.",
    slugs: ["st-paul-united-methodist-church-dallas", "booker-t-washington-high-school-dallas", "freedmans-cemetery-memorial-dallas"],
  },
  {
    heading: "Deep Ellum and Fair Park: business, creativity and collecting",
    body: "Deep Ellum developed around railroad commerce and became nationally influential through Black music and performance. The African American Museum in Fair Park preserves material and artistic histories that make those wider networks visible. They should not be collapsed into a single neighborhood origin.",
    slugs: ["deep-ellum", "african-american-museum-dallas-fair-park"],
  },
  {
    heading: "South Dallas: civil-rights leadership and working-class neighborhoods",
    body: "Juanita Craft's home is in Wheatley Place. Queen City Heights is a different historic residential district whose development began in a post-emancipation farming settlement. Together these places show the role of ordinary domestic space in Dallas's civic and cultural history.",
    slugs: ["juanita-craft-civil-rights-house-dallas", "queen-city-heights-historic-district-dallas"],
  },
  {
    heading: "Oak Cliff: the Tenth Street Freedmen's Town",
    body: "Tenth Street stands on the other side of Dallas's historic Black urban geography. Its housing, religious and educational institutions tell an Oak Cliff story distinct from North Dallas Freedmen's Town. Its surviving structures are private homes, not reconstructed museum displays.",
    slugs: ["tenth-street-historic-district-oak-cliff"],
  },
];

export default function DallasBlackHistoryPage() {
  return (
    <main className="pb-20">
      <section className="border-b border-border bg-ink py-14 text-ink-foreground sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-wider text-ink-foreground/70"><a href="/" className="underline">Home</a> / <a href="/texas-history" className="underline">Texas History</a> / Dallas Black History</nav>
          <p className="eyebrow mt-10 text-ink-foreground/70">Texas Defined · Dallas history authority</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-tight sm:text-7xl">Dallas Black History: Places That Built a City</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-foreground/85">
            Eight places tell interlocking but distinct stories of emancipation, schools, Black-owned commerce, faith,
            art, civil-rights organizing and the fight to preserve neighborhoods displaced by urban development.
            This is a research-led heritage guide, not a promise that every site offers public tours.
          </p>
          <p className="mt-6 text-sm text-ink-foreground/70">Research last verified October 12, 2026 · Texas Defined Editorial Desk</p>
        </Container>
      </section>

      <Container className="py-12">
        <section aria-labelledby="overview" className="max-w-4xl">
          <p className="eyebrow text-primary">Quick answer</p>
          <h2 id="overview" className="mt-3 font-display text-3xl sm:text-4xl">Where to explore African American history in Dallas</h2>
          <p className="mt-5 text-base leading-8">
            Start with the African American Museum at Fair Park for art and interpretive history. Compare the surviving
            post-emancipation St. Paul Methodist congregation and the landmark Booker T. Washington school in the Arts
            District. Discover how Deep Ellum's railroad businesses nourished Black blues and jazz. Explore Dallas's
            North Dallas and Oak Cliff freedmen's histories separately through Freedman's Cemetery Memorial and Tenth
            Street. Then connect Juanita Craft's organizing house with the residential landscape of Queen City Heights.
          </p>
          <p className="mt-5 text-base leading-8">
            These places are not all conventional tourist attractions. Some are active schools or churches, some are
            memorials, and others are occupied neighborhoods. This distinction matters when planning access,
            photography, parking and respectful conduct. Use the individual pages for history, current operator
            links, accessibility caveats, photos, FAQs and source documents.
          </p>
        </section>

        <section aria-labelledby="eight-sites" className="mt-14">
          <p className="eyebrow text-primary">Place-by-place research</p>
          <h2 id="eight-sites" className="mt-3 font-display text-3xl sm:text-4xl">Explore the eight landmarks</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {connections.flatMap((group) => group.slugs).map((slug, i) => {
              const entry = dallasBlackHistoryResearch.find((row) => row.slug === slug);
              if (!entry) return null;
              return (
                <a key={slug} href={`/destination/${slug}`} className="block rounded-lg border border-border p-6 hover:text-primary">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Historic place {i + 1} of 8</p>
                  <h3 className="mt-2 font-display text-2xl">{entry.shortName}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{entry.focus}</p>
                  <p className="mt-4 text-xs text-muted-foreground">{entry.visitType}</p>
                  <span className="mt-5 inline-block text-sm font-semibold text-primary">Read the complete authority guide →</span>
                </a>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="connected-city" className="mt-16">
          <p className="eyebrow text-primary">History across the city</p>
          <h2 id="connected-city" className="mt-3 font-display text-3xl sm:text-4xl">Four connected but distinct historical geographies</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {connections.map((group) => (
              <section key={group.heading} className="border-t border-border pt-6">
                <h3 className="font-display text-2xl">{group.heading}</h3>
                <p className="mt-4 text-sm leading-7">{group.body}</p>
                <ul className="mt-5 space-y-2">
                  {group.slugs.map((slug) => {
                    const item = dallasBlackHistoryResearch.find((entry) => entry.slug === slug);
                    return item ? <li key={slug}><a href={`/destination/${slug}`} className="text-sm font-semibold text-primary underline underline-offset-4">{item.shortName} →</a></li> : null;
                  })}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section aria-labelledby="timeline" className="mt-16 max-w-4xl border-t border-border pt-10">
          <p className="eyebrow text-primary">Historical chronology</p>
          <h2 id="timeline" className="mt-3 font-display text-3xl sm:text-4xl">Key turning points</h2>
          <div className="mt-7 space-y-5 text-sm leading-7">
            <p><strong>After 1865:</strong> Freed people build neighborhoods, schools, churches and burial institutions in North Dallas and Oak Cliff. The precise earliest date assigned to Freedman's Cemetery varies across official sources.</p>
            <p><strong>1872–73:</strong> Railroad connections create the commercial crossroads that becomes Deep Ellum. St. Paul's Black Methodist congregation also organizes in 1873.</p>
            <p><strong>1880–1922:</strong> Oak Cliff's Tenth Street institutions grow; a school opens at Booker T. Washington's present site in 1922, replacing the earlier Dallas Colored High School.</p>
            <p><strong>1930s–1970s:</strong> Juanita Craft organizes across Texas; Dallas schools move through desegregation, with Booker T. Washington's arts-magnet identity beginning in 1976.</p>
            <p><strong>1990s:</strong> Archaeological investigation of highway-threatened cemetery burials, district designations and preservation advocacy bring renewed attention to histories long omitted from common city narratives.</p>
            <p><strong>2000s–2020s:</strong> Restorations, museum interpretation and new historic-district recognition broaden access to primary research, while living neighborhoods still face preservation and affordability pressures.</p>
          </div>
        </section>

        <section aria-labelledby="method" className="mt-16 max-w-4xl border-t border-border pt-10">
          <p className="eyebrow text-primary">Research methods and visits</p>
          <h2 id="method" className="mt-3 font-display text-3xl sm:text-4xl">How we verified these places</h2>
          <p className="mt-5 text-sm leading-7">
            This guide prioritizes Dallas municipal preservation records, Dallas ISD, Dallas Parks, Texas
            Historical Commission documents, TxDOT archaeology and site operators. The individual site pages
            identify each reference and the specific claims it supports. Exact dates or counts are qualified
            where authoritative sources disagree. We separate historical truth from changing operating hours.
          </p>
          <p className="mt-5 text-sm leading-7">
            <strong>Before traveling:</strong> Schools and churches are active institutions. Historic neighborhoods are
            homes. Cemeteries and memorials call for respectful behavior. Museum exhibits, events, accessible
            entrances and parking can change; verify with the official operator. Research is scheduled for
            quarterly review or more often for active venues, without representing a planned review as a
            completed automated verification.
          </p>
          <p className="mt-5 text-sm leading-7">
            Recommended citation: Texas Defined Editorial Desk, “Dallas Black History: Places That Built a
            City,” verified October 12, 2026, {canonical}.
          </p>
          <p className="mt-6 text-sm font-semibold text-primary">
            <a href="https://thc.texas.gov/blog/discover-these-8-african-american-history-sites-dallas" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">Texas Historical Commission — additional Dallas historic-site research ↗</a>
          </p>
        </section>
      </Container>
    </main>
  );
}
