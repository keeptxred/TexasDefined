import type { Region } from "@/data/types";
import { REGION_AUTHORITY_OVERVIEWS } from "@/data/region-authority-overviews";
import { REGION_AUTHORITY_DEPTH } from "@/data/region-authority-depth";
import { REGIONAL_LANDSCAPE_LINKS } from "@/data/region-landscape-crosslinks";
import { Container } from "@/components/layout/Container";

export function RegionAuthorityGuide({ region }: { region: Region }) {
  const guide = REGION_AUTHORITY_OVERVIEWS[region.id];

  return (
    <section aria-labelledby="regional-planning-heading" className="border-y border-border bg-surface py-12 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Regional field guide</p>
        <h2 id="regional-planning-heading" className="mt-3 max-w-4xl font-display text-3xl leading-tight sm:text-4xl">
          Understand {region.name} before you go
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">{guide.intro}</p>
        <h3 className="mt-9 font-display text-2xl">Choose a practical base</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {guide.bases.map(([name, description]) => (
            <div key={name} className="border border-border bg-background p-5">
              <h4 className="font-display text-xl">{name}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-4xl">
          {REGION_AUTHORITY_DEPTH[region.id].map((section) => (
            <section key={section.heading} className="mt-10">
              <h3 className="font-display text-2xl">{section.heading}</h3>
              <p className="mt-3 text-base leading-8 text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
        <section className="mt-12 border-t border-border pt-7" aria-labelledby="region-natural-landscapes">
          <h3 id="region-natural-landscapes" className="font-display text-2xl">Understand the landscapes behind this region</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
            These scientific and geographic field guides add context to the travel region; landscape boundaries are not the same as tourism regions. Follow a topic that matters to your actual route rather than assuming every landscape covers the whole region.
          </p>
          <ul className="mt-5 grid gap-5 md:grid-cols-3">
            {REGIONAL_LANDSCAPE_LINKS[region.id].map((item) => (
              <li key={item.slug} className="border border-border bg-background p-5">
                <h4 className="font-display text-lg">
                  <a href={`/explore/landscapes/${item.slug}`} className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
                    {item.label}
                  </a>
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.context}</p>
              </li>
            ))}
          </ul>
        </section>

        <h3 className="mt-10 font-display text-2xl">Season, access and safety</h3>
        <p className="mt-3 max-w-4xl text-base leading-8 text-muted-foreground">{guide.safety}</p>
        <h3 className="mt-10 font-display text-2xl">Build the next part of your trip</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {guide.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block border-b border-border py-3 text-sm font-semibold text-primary hover:underline">
                {link.label} →
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 border-t border-border pt-5">
          <h3 className="text-sm font-semibold">Primary references and methodology</h3>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
            TexasDefined uses approximate editorial travel regions rather than fixed legal boundaries. Suggested bases and travel approaches are editorial planning guidance, not live road, weather or access reports. Verify current conditions and permissions before departure.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {guide.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                  {source.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">Editorial review: October 12, 2026. Live conditions must be checked with the relevant authority.</p>
        </div>
      </Container>
    </section>
  );
}
