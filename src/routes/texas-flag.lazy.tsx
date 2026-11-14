import { createLazyFileRoute } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-flag")({
  component: TexasFlagPage,
});

function TexasFlagPage() {
  return <PrioritySearchPage data={Route.useLoaderData()} afterQuickAnswer={
    <section aria-labelledby="texas-flag-proportions" className="border-b border-border py-10 sm:py-14">
      <Container><div className="grid gap-7 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow text-primary">The flag in proportion</p>
          <h2 id="texas-flag-proportions" className="mt-2 font-display text-3xl">How the Lone Star flag is laid out</h2>
          <p className="mt-4 leading-8 text-muted-foreground">Texas Government Code § 3100.002 sets a 2:3 height-to-length ratio. The blue hoist occupies the left third of the length. White and red each occupy half the height of the remaining two thirds. The star is centered in the blue stripe, with one point upward and a diameter equal to three-quarters of the blue stripe's width.</p>
          <p className="mt-3 leading-7 text-muted-foreground">This diagram follows the statutory geometry. Its screen colors are illustrative; the statute specifies Pantone 281 dark blue and Pantone 193 red, not arbitrary web hex codes.</p>
          <a className="mt-4 inline-block font-semibold text-primary underline underline-offset-4" target="_blank" rel="noreferrer" href="https://tcss.legis.texas.gov/resources/GV/htm/GV.3100.htm">Texas Government Code, Chapter 3100 ↗</a>
        </div>
        <figure className="max-w-2xl">
          <svg className="h-auto w-full border border-border" viewBox="0 0 600 400" role="img" aria-labelledby="texas-flag-design-title texas-flag-design-description">
            <title id="texas-flag-design-title">The Lone Star flag of Texas</title>
            <desc id="texas-flag-design-description">A blue stripe one-third of the flag's length, a white stripe above a red stripe on the right, and one upward-facing white five-pointed star centered in the blue.</desc>
            <rect x="0" y="0" width="600" height="400" fill="#fff" />
            <rect x="0" y="0" width="200" height="400" fill="#00205b" />
            <rect x="200" y="200" width="400" height="200" fill="#bf0d3e" />
            <polygon points="100,125 116.8,176.8 171.3,176.8 127.2,208.9 144.1,260.7 100,228.6 55.9,260.7 72.8,208.9 28.7,176.8 83.2,176.8" fill="#fff" />
          </svg>
          <figcaption className="mt-3 text-sm text-muted-foreground">Geometry: 1839 Lone Star design as described in Texas Government Code § 3100.002.</figcaption>
        </figure>
      </div></Container>
    </section>
  } />;
}
