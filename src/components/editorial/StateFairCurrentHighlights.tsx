import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const highlights = [
  {
    title: "Little Lone Stars Land",
    body: "Introduced in 2026, this family area was designed for toddlers and younger school-age children, with rides, food, entertainment and the relocated petting zoo and Fringe Stage.",
    href: "https://bigtex.com/big-fun-for-little-texans-state-fair-of-texas-debuts-little-lone-stars-land-and-reimagined-kidway-family-friendly-areas-bring-more-rides-food-entertainment-and-texas-sized-fun-to-the-2026-state-f/",
  },
  {
    title: "Reimagined Kidway",
    body: "In 2026, Kidway debuted a larger footprint, a new layout and additional family-friendly rides and games.",
    href: "https://bigtex.com/big-fun-for-little-texans-state-fair-of-texas-debuts-little-lone-stars-land-and-reimagined-kidway-family-friendly-areas-bring-more-rides-food-entertainment-and-texas-sized-fun-to-the-2026-state-f/",
  },
  {
    title: "Every Day Values",
    body: "The 2026 Every Day Values program highlighted lower-priced food, drinks, rides and souvenirs throughout the Fair, alongside reduced Midway pricing.",
    href: "https://bigtex.com/category/press-releases/",
  },
  {
    title: "Chevrolet Main Stage moved indoors",
    body: "For 2026, the Fair moved its main concert stage into the historic Fair Park Coliseum, creating an indoor concert setting while keeping performances included with admission.",
    href: "https://bigtex.com/state-fair-of-texas-iconic-chevrolet-main-stage-moves-inside-historic-fair-park-coliseum/",
  },
  {
    title: "Sensory-friendly options expanded",
    body: "The 2026 Fair continued Wednesday sensory-friendly mornings and added a sensory-friendly room plus a quieter Safe Kids Corral available throughout the 24-day run.",
    href: "https://bigtex.com/state-fair-amenities-and-accessibility/",
  },
  {
    title: "Stars, Stripes, and Howdies",
    body: "The 2026 theme marked America's 250th birthday and the State Fair of Texas' 140th birthday, with related exhibits and experiences across Fair Park.",
    href: "https://bigtex.com/theme/",
  },
];

// Five activities named as separate festivals in third-party inventories are parts
// of the one State Fair of Texas. Use the official first-party sources and archive
// each year's program instead of inventing five standalone event pages.
const fairExperiences = [
  {
    title: "Ride the Texas Star",
    body: "At 212 feet, the Texas Star is the Fair's landmark Ferris wheel. It is a Midway ride, not a separate festival or something included automatically with the admission ticket. Rides use Food & Midway Coupons; the Fair's published Tuesday ride discounts exclude the Texas Star.",
    usefulToKnow: "Allow extra time for Midway queues, check current ride operation and height/access guidance, and budget for coupons separately.",
    source: "https://bigtex.com/plan-your-visit/attractions-events/midway/",
    sourceLabel: "Official Midway and Texas Star guide",
  },
  {
    title: "See livestock and agriculture",
    body: "Youth and adult livestock competitions, exhibits and agricultural programming rotate throughout the Fair. The livestock exhibitor schedule is not a promise that every species, auction or competition is available on every day.",
    usefulToKnow: "Choose the animal show first, then confirm its date, building and spectator-access arrangements. Exhibitor registration is a separate process from fair admission.",
    source: "https://bigtex.com/livestock-exhibitor-resources/",
    sourceLabel: "Official livestock schedule and exhibitor guide",
  },
  {
    title: "Explore Creative Arts and crafts",
    body: "The 2026 Fair recognized entries in more than 870 arts-and-crafts categories, including photography, fine art, sewing, quilting, canning and sculpture. Many projects were submitted and judged before the September opening; displays during the Fair were distinct from the entry deadlines.",
    usefulToKnow: "Visitors can plan an exhibit stop. Entrants must instead check the current-year Creative Arts handbook for eligibility, delivery windows and fees.",
    source: "https://bigtex.com/creative-arts-arts-crafts/",
    sourceLabel: "Official arts-and-crafts categories and rules",
  },
  {
    title: "Watch or enter a cooking contest",
    body: "The 2026 Creative Arts program had spring contests as well as competitions during the Fair, including breads, Tex-Mex, honey, cheese and candies. These are scheduled activities, not an all-day standalone food festival; participation requires preregistration and eligibility checks.",
    usefulToKnow: "If a specific contest interests you, verify its day, judging access and the latest handbook rather than treating any contest as drop-in public cooking.",
    source: "https://bigtex.com/creative-arts-cooking-contests/",
    sourceLabel: "Official cooking-contest schedules and handbooks",
  },
  {
    title: "Plan a fair-food route",
    body: "The 2026 Big Tex Choice Awards highlighted finalists and winners alongside longstanding favorites such as corny dogs. Food vendors are spread around Fair Park, and award-winning creations may be sold at particular stands rather than universally.",
    usefulToKnow: "Use the Fair's official food map and our dedicated 2026 food guide to prioritize stops. Food is a fairground experience, not a second admission-only festival.",
    source: "https://bigtex.com/big-tex-choice-awards/",
    sourceLabel: "Official Big Tex Choice Awards and food map",
  },
] as const;

const responsiveCards = { gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))" } as const;

export function StateFairCurrentHighlights() {
  return (
    <section className="border-b border-border py-12" data-state-fair-current-highlights>
      <Container>
        <div className="max-w-5xl">
          <p className="eyebrow text-primary">Introduced in 2026</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">What changed at the 2026 Fair</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            The 2026 Fair introduced these attractions and visitor-service changes. This section records what was new that year, not a confirmed preview of the next Fair.
          </p>
        </div>

        <div className="mt-6 grid gap-5" style={responsiveCards}>
          {highlights.map((item) => (
            <article key={item.title} className="border border-border bg-background p-5">
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{item.body}</p>
              <p className="mt-4 text-sm">
                <a href={item.href} target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-4">
                  Official details ↗
                </a>
              </p>
            </article>
          ))}
        </div>

        <section className="mt-10" aria-labelledby="state-fair-five-experiences" data-state-fair-five-experiences>
          <p className="eyebrow text-primary">Five ways to explore the Fair</p>
          <h3 id="state-fair-five-experiences" className="mt-2 font-display text-3xl md:text-4xl">
            One Fair, five very different experiences
          </h3>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            These are attractions and programs within the State Fair of Texas, not five separate festivals.
            The details below describe the completed 2026 Fair; check the official organizer's new schedule before planning a later visit.
          </p>
          <div className="mt-6 grid gap-5" style={responsiveCards}>
            {fairExperiences.map((item) => (
              <article key={item.title} className="border border-border bg-background p-5">
                <h4 className="font-display text-xl">{item.title}</h4>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong>Before you go:</strong> {item.usefulToKnow}</p>
                <a href={item.source} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-semibold text-primary underline underline-offset-4">
                  {item.sourceLabel} ↗
                </a>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Comparing fair food specifically? Read our{" "}
            <Link to="/article/state-fair-texas-2026-new-foods-guide" className="font-semibold text-primary underline underline-offset-4">
              2026 State Fair food guide
            </Link>{" "}
            before choosing your must-try dishes.
          </p>
        </section>

        <div className="mt-10 grid gap-5" style={responsiveCards}>
          <div className="border border-border bg-background p-5">
            <p className="eyebrow text-primary">Arriving by rail</p>
            <h3 className="mt-2 font-display text-xl">Fair Park Station</h3>
            <p className="mt-4 leading-7 text-muted-foreground">DART's Green Line stops at Fair Park Station on Parry Avenue near a main fairground entrance.</p>
          </div>
          <div className="border border-border bg-background p-5">
            <p className="eyebrow text-primary">Second rail option</p>
            <h3 className="mt-2 font-display text-xl">MLK, Jr. Station</h3>
            <p className="mt-4 leading-7 text-muted-foreground">MLK, Jr. Station is south of R.B. Cullum Boulevard and convenient to Gate 6.</p>
          </div>
          <div className="border border-border bg-background p-5">
            <p className="eyebrow text-primary">Fair Park address</p>
            <h3 className="mt-2 font-display text-xl">3809 Grand Avenue</h3>
            <p className="mt-4 leading-7 text-muted-foreground">Dallas, TX 75210. Use the Fair's current getting-here page for parking, rideshare and any day-specific changes.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="https://bigtex.com/plan-your-visit/getting-here/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Getting here ↗</a>
          <Link to="/article/state-fair-texas-2026-new-foods-guide" className="inline-flex min-h-11 items-center rounded-md border border-border px-5 py-3 text-sm font-semibold hover:bg-muted">2026 food guide</Link>
          <Link to="/county/dallas" className="inline-flex min-h-11 items-center rounded-md border border-border px-5 py-3 text-sm font-semibold hover:bg-muted">Dallas County guide</Link>
        </div>
      </Container>
    </section>
  );
}
