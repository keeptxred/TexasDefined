import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { Container } from "@/components/layout/Container";
import { getTexasEvergreenGuideBatch6 } from "@/data/texas-evergreen-guides-batch6";
import { buildMeta, canonicalLink } from "@/lib/seo";

const guide = getTexasEvergreenGuideBatch6("texas-blue-norther-weather-guide");
const canonicalPath = "/texas-blue-norther-weather-guide";

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
      <section className="mx-auto max-w-5xl border-t border-border pt-10" aria-labelledby="weather-safety-note">
        <p className="eyebrow text-primary">Weather safety</p>
        <h2 id="weather-safety-note" className="mt-2 font-display text-3xl">Culture explains the language. Forecasts control the decision.</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Historical sources help explain why Texans say “Blue Norther” or “the norther.” For any current storm, cold front, tornado, hail, lightning or flood decision, use current National Weather Service forecasts and warnings rather than folklore, cloud appearance or this evergreen guide.</p>
      </section>
    </Container>
  </>;
}
