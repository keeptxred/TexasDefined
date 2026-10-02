import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const highlights = [
  {
    title: "Little Lone Stars Land",
    body: "New for 2026, this family area is designed for toddlers and younger school-age children, with rides, food, entertainment and the relocated petting zoo and Fringe Stage.",
    href: "https://bigtex.com/big-fun-for-little-texans-state-fair-of-texas-debuts-little-lone-stars-land-and-reimagined-kidway-family-friendly-areas-bring-more-rides-food-entertainment-and-texas-sized-fun-to-the-2026-state-f/",
  },
  {
    title: "Reimagined Kidway",
    body: "Kidway has a larger footprint, a new layout and additional family-friendly rides and games for 2026.",
    href: "https://bigtex.com/big-fun-for-little-texans-state-fair-of-texas-debuts-little-lone-stars-land-and-reimagined-kidway-family-friendly-areas-bring-more-rides-food-entertainment-and-texas-sized-fun-to-the-2026-state-f/",
  },
  {
    title: "Every Day Values",
    body: "The new value program highlights lower-priced food, drinks, rides and souvenirs throughout the Fair, alongside reduced Midway pricing.",
    href: "https://bigtex.com/category/press-releases/",
  },
  {
    title: "Chevrolet Main Stage moved indoors",
    body: "The Fair's main concert stage is inside the historic Fair Park Coliseum this year, creating an indoor concert setting while keeping performances included with admission.",
    href: "https://bigtex.com/state-fair-of-texas-iconic-chevrolet-main-stage-moves-inside-historic-fair-park-coliseum/",
  },
  {
    title: "Sensory-friendly options expanded",
    body: "Wednesday sensory-friendly mornings continue in 2026, and the Fair added a sensory-friendly room plus a quieter Safe Kids Corral available throughout the 24-day run.",
    href: "https://bigtex.com/state-fair-amenities-and-accessibility/",
  },
  {
    title: "Stars, Stripes, and Howdies",
    body: "The 2026 theme marks both America's 250th birthday and the State Fair of Texas' 140th birthday, with related exhibits and experiences across Fair Park.",
    href: "https://bigtex.com/theme/",
  },
];

export function StateFairCurrentHighlights() {
  return (
    <section className="border-b border-border bg-muted/20 py-12" data-state-fair-current-highlights>
      <Container>
        <div className="max-w-5xl">
          <p className="eyebrow text-primary">New for 2026</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">What returning fairgoers should know this year</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            The 2026 Fair changes more than the food menu. These are the updates most likely to affect how you plan the day.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="border border-border bg-background p-5">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{item.body}</p>
              <a href={item.href} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
                Official details ↗
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="border border-border bg-background p-5">
            <p className="eyebrow text-primary">Arriving by rail</p>
            <h3 className="mt-2 font-display text-2xl">Fair Park Station</h3>
            <p className="mt-3 leading-7 text-muted-foreground">DART's Green Line stops at Fair Park Station on Parry Avenue near a main fairground entrance.</p>
          </div>
          <div className="border border-border bg-background p-5">
            <p className="eyebrow text-primary">Second rail option</p>
            <h3 className="mt-2 font-display text-2xl">MLK, Jr. Station</h3>
            <p className="mt-3 leading-7 text-muted-foreground">MLK, Jr. Station is south of R.B. Cullum Boulevard and convenient to Gate 6.</p>
          </div>
          <div className="border border-border bg-background p-5">
            <p className="eyebrow text-primary">Fair Park address</p>
            <h3 className="mt-2 font-display text-2xl">3809 Grand Avenue</h3>
            <p className="mt-3 leading-7 text-muted-foreground">Dallas, TX 75210. Use the Fair's current getting-here page for parking, rideshare and any day-specific changes.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://bigtex.com/plan-your-visit/getting-here/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Getting here ↗</a>
          <Link to="/article/state-fair-texas-2026-new-foods-guide" className="inline-flex min-h-11 items-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted">2026 food guide</Link>
          <Link to="/county/dallas" className="inline-flex min-h-11 items-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted">Dallas County guide</Link>
        </div>
      </Container>
    </section>
  );
}
