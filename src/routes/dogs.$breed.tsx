import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { dogDesignCollections, findDogBreed, relatedDogBreeds } from '@/data/texas-dogs';
import { buildMeta, canonicalLink } from '@/lib/seo';

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute('/dogs/$breed')({
  loader: ({ params }) => {
    const breed = findDogBreed(params.breed);
    if (!breed) throw notFound();
    return { breed, related: relatedDogBreeds(breed.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { breed } = loaderData;
    const canonicalPath = `/dogs/${breed.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const description = `${breed.name} Defined: the breed personality, Texas-life angle and funny shirt directions that fit ${breed.shortName} people without turning the page into a generic product listing.`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${breed.name} Defined — Personality & Funny Shirt Ideas`,
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${pageUrl}#page`,
              url: pageUrl,
              name: `${breed.name} Defined`,
              description,
              isPartOf: { '@id': `${siteUrl}/#website` },
              about: { '@type': 'Thing', name: breed.name },
              breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${pageUrl}#breadcrumbs`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
                { '@type': 'ListItem', position: 2, name: 'Texas Dogs Defined', item: `${siteUrl}/dogs` },
                { '@type': 'ListItem', position: 3, name: `${breed.name} Defined`, item: pageUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
  component: DogBreedPage,
});

function DogBreedPage() {
  const { breed, related } = Route.useLoaderData();
  const primaryCollections = dogDesignCollections.slice(0, 6);
  return <>
    <article>
      <header className="border-b border-border bg-surface/40">
        <Container className="py-12 sm:py-18">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Front page</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link to="/dogs" className="hover:text-foreground">Texas Dogs Defined</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="text-foreground">{breed.shortName}</span>
          </nav>
          <p className="eyebrow mt-10 text-primary">{breed.shortName} Defined</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{breed.name}: {breed.deck}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">A Texas Dogs Defined breed page built around personality first, then the kinds of jokes, settings and shirt concepts that actually make sense for the breed.</p>
        </Container>
      </header>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-12">
            <section>
              <p className="eyebrow text-primary">The short version</p>
              <h2 className="mt-3 font-display text-4xl leading-tight">Why {breed.shortName} people recognize the joke immediately</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{breed.personality}</p>
            </section>

            <section className="border-y border-border py-10">
              <p className="eyebrow text-primary">Texas fit</p>
              <h2 className="mt-3 font-display text-4xl leading-tight">Where the breed meets Texas life</h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">{breed.texasFit}</p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
                <Link to="/explore/road-trips" className="border border-border px-4 py-2 hover:border-primary hover:text-primary">Texas road trips</Link>
                <Link to="/explore/outdoors" className="border border-border px-4 py-2 hover:border-primary hover:text-primary">Outdoors & wildlife</Link>
                <Link to="/texas-living" className="border border-border px-4 py-2 hover:border-primary hover:text-primary">Texas Life</Link>
              </div>
            </section>

            <section>
              <p className="eyebrow text-primary">Design directions</p>
              <h2 className="mt-3 font-display text-4xl leading-tight">The shirt ideas that feel native to the breed</h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {breed.designHooks.map((hook, index) => <div key={hook} className="border border-border p-5">
                  <span className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 font-display text-2xl capitalize">{hook}</h3>
                </div>)}
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <p className="eyebrow text-primary">Collection families</p>
              <h2 className="mt-3 font-display text-4xl leading-tight">One {breed.shortName}, several completely different looks</h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {primaryCollections.map((collection) => <div key={collection.slug} className="border border-border p-5">
                  <p className="eyebrow text-muted-foreground">{collection.tagline}</p>
                  <h3 className="mt-2 font-display text-2xl">{collection.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{collection.description}</p>
                  <Link to="/dogs" hash={collection.slug} className="eyebrow mt-4 inline-block text-primary">See the collection idea →</Link>
                </div>)}
              </div>
            </section>
          </div>

          <aside>
            <div className="sticky top-24 border border-border p-6">
              <p className="eyebrow text-primary">Creative brief</p>
              <h2 className="mt-3 font-display text-3xl">{breed.shortName} shirt signals</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                {breed.designHooks.map((hook) => <li key={hook}>— {hook}</li>)}
              </ul>
              <p className="eyebrow mt-7 text-muted-foreground">Search language</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{breed.keywords.join(' · ')}</p>
            </div>
          </aside>
        </div>
      </Container>
    </article>

    <section className="border-y border-border bg-surface/40">
      <Container className="py-12 sm:py-16">
        <p className="eyebrow text-primary">Meet another breed</p>
        <h2 className="mt-3 font-display text-4xl leading-tight">Keep the dog wall growing</h2>
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {related.map((candidate) => <Link key={candidate.slug} to="/dogs/$breed" params={{ breed: candidate.slug }} className="group bg-background p-5">
            <p className="eyebrow text-muted-foreground">{candidate.shortName} Defined</p>
            <h3 className="mt-2 font-display text-2xl group-hover:text-primary">{candidate.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{candidate.deck}</p>
          </Link>)}
        </div>
      </Container>
    </section>
  </>;
}
