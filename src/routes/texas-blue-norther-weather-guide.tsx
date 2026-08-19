import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { Container } from "@/components/layout/Container";
import { getTexasEvergreenGuideBatch6 } from "@/data/texas-evergreen-guides-batch6";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuideBatch6("texas-blue-norther-weather-guide");
const canonicalPath = "/texas-blue-norther-weather-guide";
const sources = [
  {
    label: "Handbook of Texas — Blue Norther",
    href: "https://www.tshaonline.org/handbook/entries/blue-norther",
    note: "Defines the Texas expression, documents competing folk explanations for the name and distinguishes the Texasism from the broader weather phenomenon.",
  },
  {
    label: "National Weather Service Amarillo — 50 Degree Temperature Ranges",
    href: "https://www.weather.gov/ama/50ranges",
    note: "Documents rapid High Plains temperature drops associated with strong arctic fronts and local use of the Blue Norther term.",
  },
  {
    label: "National Weather Service Houston/Galveston — The Spring Storm Season",
    href: "https://www.weather.gov/hgx/stormsignals_vol40",
    note: "Explains the recurring spring severe-weather pattern in Southeast Texas and the hazards thunderstorms can produce.",
  },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Blue Northers, Spring Storms & Weather Folklore",
      description: guide.dek,
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: TexasBlueNortherWeatherPage,
});

function TexasBlueNortherWeatherPage() {
  return <>
    <TexasEvergreenGuide guide={guide} />
    <Container className="-mt-14 pb-20 sm:pb-28">
      <section className="mx-auto max-w-5xl border-t border-border pt-10" aria-labelledby="weather-source-notes">
        <p className="eyebrow text-primary">Source & safety notes</p>
        <h2 id="weather-source-notes" className="mt-2 font-display text-3xl">Culture explains the language. Forecasts control the decision.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Historical sources help explain why Texans say “Blue Norther” or “the norther.” For any current storm, cold front, tornado, hail, lightning or flood decision, use current National Weather Service forecasts and warnings rather than folklore, cloud appearance or this evergreen guide.</p>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {sources.map((source) => <li key={source.href} className="py-4">
            <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
          </li>)}
        </ul>
      </section>
    </Container>
  </>;
}
