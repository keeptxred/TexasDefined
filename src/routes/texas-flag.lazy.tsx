import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { Container } from "@/components/layout/Container";

// These are accessible explanatory reconstructions, not photographs of original flags.
// The 1836 design is described in the Handbook of Texas; the modern proportions
// follow Texas Government Code § 3100.002. No third-party image rights are needed.
export const Route = createLazyFileRoute("/texas-flag")({
  component: TexasFlagPage,
});

const statute = "https://tcss.legis.texas.gov/resources/GV/htm/GV.3100.htm";
const handbook = "https://www.tshaonline.org/handbook/entries/flags-of-texas";
const archivalDesign = "https://www.tsl.texas.gov/treasures/flagsandmaps/flag-design.html";

function HistoricalFlagComparison() {
  return <section aria-labelledby="texas-flag-history-comparison" className="border-b border-border py-10 sm:py-14">
    <Container>
      <div className="max-w-4xl">
        <p className="eyebrow text-primary">Two flags, one Lone Star</p>
        <h2 id="texas-flag-history-comparison" className="mt-2 font-display text-3xl md:text-4xl">Before red, white and blue: the Burnet flag and the 1839 Lone Star flag</h2>
        <p className="mt-4 leading-8 text-muted-foreground">The Republic of Texas adopted a blue national standard with a large gold star on December 10, 1836. On January 25, 1839, it adopted the blue, white and red Lone Star flag we know today. The earlier flag was not the first banner flown during the Revolution: military units used other flags, and the Republic also had a separate naval ensign.</p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <figure className="overflow-hidden rounded-xl border border-border bg-background">
          <svg className="block h-auto w-full" viewBox="0 0 600 400" role="img" aria-labelledby="burnet-flag-title burnet-flag-description">
            <title id="burnet-flag-title">Burnet flag of the Republic of Texas, 1836</title>
            <desc id="burnet-flag-description">A solid blue rectangular flag with a large gold five-pointed star centered in the field.</desc>
            <rect width="600" height="400" fill="#0033a0" />
            <polygon points="300,72 330,159 422,159 346,215 375,303 300,253 225,303 254,215 178,159 270,159" fill="#ffcf30" />
          </svg>
          <figcaption className="p-5">
            <p className="font-display text-2xl">Burnet flag</p>
            <p className="mt-1 text-sm font-semibold text-primary">December 10, 1836 – January 25, 1839</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">The Republic's first clearly documented official national standard. It continued as a war flag after the new national design was adopted.</p>
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-xl border border-border bg-background">
          <svg className="block h-auto w-full" viewBox="0 0 600 400" role="img" aria-labelledby="lone-star-flag-title lone-star-flag-description">
            <title id="lone-star-flag-title">Lone Star flag adopted in 1839</title>
            <desc id="lone-star-flag-description">A dark-blue stripe at the hoist with an upright white star, and a white stripe over a red stripe in the remaining field.</desc>
            <rect width="600" height="400" fill="#ffffff" />
            <rect width="200" height="400" fill="#00205b" />
            <rect x="200" y="200" width="400" height="200" fill="#bf0d3e" />
            <polygon points="100,125 116.8,176.8 171.3,176.8 127.2,208.9 144.1,260.7 100,228.6 55.9,260.7 72.8,208.9 28.7,176.8 83.2,176.8" fill="#ffffff" />
          </svg>
          <figcaption className="p-5">
            <p className="font-display text-2xl">Lone Star flag</p>
            <p className="mt-1 text-sm font-semibold text-primary">Adopted January 25, 1839</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">First the Republic's national flag, then the symbol Texans continued using after statehood. The modern flag retains its basic 1839 arrangement.</p>
          </figcaption>
        </figure>
      </div>
      <p className="mt-4 max-w-5xl text-xs leading-6 text-muted-foreground">Flag drawings are original simplified illustrations for comparison, not images of surviving artifacts. Their screen colors are illustrative; the current statutory color specification applies to the modern flag, not as a verified color sample of 1836 cloth.</p>
      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm">
        <a href={handbook} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">Handbook of Texas: official flag chronology ↗</a>
        <a href={archivalDesign} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">State Library: original 1839 design ↗</a>
        <Link to="/article/history-of-the-texas-flag" className="font-semibold text-primary underline underline-offset-4">Read the full Texas flag history</Link>
      </div>
    </Container>
  </section>;
}

function HistoricalTimeline() {
  const moments = [
    { date: "1835–1836", event: "Revolution-era flags", text: "Several revolutionary and military flags were used; not all were official national designs." },
    { date: "December 10, 1836", event: "Burnet national standard", text: "The Republic approved a blue flag with a central gold star. A separate naval ensign was also authorized." },
    { date: "January 25, 1839", event: "Lone Star design approved", text: "The Third Congress's blue, white and red national flag was approved by President Mirabeau B. Lamar." },
    { date: "December 29, 1845", event: "Texas becomes a U.S. state", text: "The 1839 design continued as the state flag after annexation." },
    { date: "1879–1933", event: "A legal gap, not a new flag", text: "The earlier flag statute was omitted from the 1879 revision; the design remained in customary use until the 1933 act." },
    { date: "1993–present", event: "Modern statutory description", text: "The current law specifies precise proportions, star orientation and color standards." },
  ];
  return <section aria-labelledby="texas-flag-timeline" className="border-b border-border bg-muted/20 py-10 sm:py-14">
    <Container>
      <h2 id="texas-flag-timeline" className="font-display text-3xl md:text-4xl">Timeline: from revolution to today's Texas flag</h2>
      <ol className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {moments.map((moment) => <li key={moment.date} className="rounded-lg border border-border bg-background p-5">
          <p className="text-sm font-semibold text-primary">{moment.date}</p>
          <h3 className="mt-2 font-display text-xl">{moment.event}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{moment.text}</p>
        </li>)}
      </ol>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">The first official national standard was blue and gold, but it would be misleading to say Texas never flew red, white and blue before 1839: the Republic's 1836 naval ensign used those colors. The popular de Zavala flag design is also disputed in the surviving convention record.</p>
      <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm">
        <Link to="/article/six-flags-over-texas-meaning" className="font-semibold text-primary underline underline-offset-4">What the Six Flags Over Texas mean</Link>
        <Link to="/article/texas-revolution-historic-sites-road-trip" className="font-semibold text-primary underline underline-offset-4">Visit Texas Revolution historic sites</Link>
        <Link to="/texas-history" className="font-semibold text-primary underline underline-offset-4">Explore Texas history</Link>
      </div>
    </Container>
  </section>;
}

function LoneStarProportions() {
  return <section aria-labelledby="texas-flag-proportions" className="border-b border-border py-10 sm:py-14">
    <Container><div className="grid gap-7 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        <p className="eyebrow text-primary">The flag in proportion</p>
        <h2 id="texas-flag-proportions" className="mt-2 font-display text-3xl">How the modern Lone Star flag is laid out</h2>
        <p className="mt-4 leading-8 text-muted-foreground">Texas Government Code § 3100.002 sets a 2:3 height-to-length ratio. The blue hoist occupies the left third of the length. White and red each occupy half the height of the remaining two thirds. The star is centered in the blue stripe, with one point upward and a diameter equal to three-quarters of the blue stripe's width.</p>
        <p className="mt-3 leading-7 text-muted-foreground">The design shown here follows the legal geometry. Its screen colors are illustrative; the law specifies Pantone 281 dark blue and Pantone 193 red rather than web hex codes.</p>
        <a className="mt-4 inline-block font-semibold text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer" href={statute}>Texas Government Code, Chapter 3100 ↗</a>
      </div>
      <figure className="max-w-2xl">
        <svg className="h-auto w-full border border-border" viewBox="0 0 600 400" role="img" aria-labelledby="texas-flag-design-title texas-flag-design-description">
          <title id="texas-flag-design-title">The modern Lone Star flag of Texas</title>
          <desc id="texas-flag-design-description">A blue stripe one-third of the flag's length, a white stripe above a red stripe on the right, and one upward-facing white five-pointed star centered in the blue.</desc>
          <rect x="0" y="0" width="600" height="400" fill="#fff" />
          <rect x="0" y="0" width="200" height="400" fill="#00205b" />
          <rect x="200" y="200" width="400" height="200" fill="#bf0d3e" />
          <polygon points="100,125 116.8,176.8 171.3,176.8 127.2,208.9 144.1,260.7 100,228.6 55.9,260.7 72.8,208.9 28.7,176.8 83.2,176.8" fill="#fff" />
        </svg>
        <figcaption className="mt-3 text-sm text-muted-foreground">Illustrated geometry based on Texas Government Code § 3100.002; for the historical artwork, see the <a href={archivalDesign} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">State Library's 1839 drawing ↗</a>.</figcaption>
      </figure>
    </div></Container>
  </section>;
}

function TexasFlagPage() {
  return <PrioritySearchPage
    data={Route.useLoaderData()}
    officialSourcesHeading="Sources, archival documents and current law"
    officialSourcesIntro="Historical dates are checked against the Handbook of Texas, the Texas House's official history and the State Library's original 1839 drawing. The current design and display rules are governed by Texas Government Code Chapter 3100."
    afterQuickAnswer={<>
      <HistoricalFlagComparison />
      <HistoricalTimeline />
      <LoneStarProportions />
    </>}
  />;
}
