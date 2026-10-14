import { createLazyFileRoute } from '@tanstack/react-router';

import { TexasHillCountryGeologyGuidePage } from '@/components/editorial/TexasHillCountryGeologyGuidePage';
import { TexasLandscapeDetailPage } from '@/components/editorial/TexasLandscapeDetailPage';
import { TexasRiverValleysLandscapePage } from '@/components/editorial/TexasRiverValleysLandscapePage';
import { Container } from '@/components/layout/Container';
import { landscapeRegionBacklinks } from '@/data/region-landscape-crosslinks';
import { texasRegionDefinition } from '@/data/texas-regions';

export const Route = createLazyFileRoute('/explore/landscapes/$slug')({
  component: LandscapeDetailRoute,
});

function LandscapeDetailRoute() {
  const { item, nearby } = Route.useLoaderData();
  const { slug } = Route.useParams();
  const regions = landscapeRegionBacklinks(slug);

  const page = slug === 'why-is-the-texas-hill-country-so-hilly' && !('name' in item)
    ? <TexasHillCountryGeologyGuidePage item={item} />
    : slug === 'rivers-and-river-valleys' && 'name' in item
      ? <TexasRiverValleysLandscapePage item={item} nearby={nearby} />
      : <TexasLandscapeDetailPage item={item} nearby={nearby} />;

  return <>
    {page}
    {regions.length ? <section className="border-t border-border py-10" aria-labelledby="landscape-regional-itinerary">
      <Container>
        <h2 id="landscape-regional-itinerary" className="font-display text-2xl">Experience this landscape through Texas travel regions</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          Natural landscapes and travel regions overlap but are not interchangeable. These related regional guides
          explain where the terrain shapes real visits, nearby attractions and seasonal planning.
        </p>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => <li key={region.region} className="border border-border p-5">
            <a href={region.href} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">
              {texasRegionDefinition(region.region)?.name ?? region.region} travel guide →
            </a>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{region.explanation}</p>
          </li>)}
        </ul>
      </Container>
    </section> : null}
  </>;
}
