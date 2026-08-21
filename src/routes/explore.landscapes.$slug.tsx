import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Section, SectionHeader } from '@/components/editorial/SectionHeader';
import { Container } from '@/components/layout/Container';
import { texasLandscapeGuides, texasLandscapes } from '@/data/texas-landscapes';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

function lookup(slug: string) {
  return texasLandscapes.find((item) => item.slug === slug) ?? texasLandscapeGuides.find((item) => item.slug === slug);
}

export const Route = createFileRoute('/explore/landscapes/$slug')({
  loader: ({ params }) => {
    const item = lookup(params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => {
    const item = loaderData;
    if (!item) return {};
    const path = `/explore/landscapes/${item.slug}`;
    const isLandscape = 'name' in item;
    const title = isLandscape ? `${item.name}: Texas Landscape Guide` : item.title;
    const description = item.dek;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: path, title, description }),
      links: [canonicalLink(texasDefinedBrand, path)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': isLandscape ? 'Article' : 'Article',
            '@id': `${absoluteUrl(texasDefinedBrand, path)}#article`,
            url: absoluteUrl(texasDefinedBrand, path),
            headline: title,
            description,
            isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            about: isLandscape ? [item.terrain, item.geology, item.vegetation, item.water] : item.sections.map((section) => section.heading),
            mainEntityOfPage: absoluteUrl(texasDefinedBrand, path),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${absoluteUrl(texasDefinedBrand, path)}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Explore Texas', item: absoluteUrl(texasDefinedBrand, '/explore') },
              { '@type': 'ListItem', position: 3, name: 'Texas Landscapes', item: absoluteUrl(texasDefinedBrand, '/explore/landscapes') },
              { '@type': 'ListItem', position: 4, name: isLandscape ? item.name : item.title, item: absoluteUrl(texasDefinedBrand, path) },
            ],
          },
        ],
      })],
    };
  },
  component: LandscapeDetailPage,
});

function LandscapeDetailPage() {
  const item = Route.useLoaderData();
  const isLandscape = 'name' in item;

  if (!isLandscape) {
    return <>
      <DepartmentHero current="Explore" eyebrow="Texas Landscapes guide" title={item.title} description={item.dek} />
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-9 text-muted-foreground">{item.intro}</p>
            <div className="mt-12 space-y-10">
              {item.sections.map((section) => <section key={section.heading} className="border-t border-border pt-6">
                <h2 className="font-display text-3xl leading-tight">{section.heading}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{section.body}</p>
              </section>)}
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="Go deeper" title="Related Texas Defined guides" />
          <div className="mt-8 flex flex-wrap gap-3">
            {item.related.map((link) => <Link key={link.href} to={link.href} className="border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">{link.label} →</Link>)}
          </div>
          <Link to="/explore/landscapes" className="eyebrow mt-10 inline-block text-primary">← Back to all Texas landscapes</Link>
        </Container>
      </Section>
    </>;
  }

  const nearby = texasLandscapes.filter((landscape) => landscape.slug !== item.slug).slice(0, 6);

  return <>
    <DepartmentHero current="Explore" eyebrow={item.eyebrow} title={item.name} description={item.dek} />

    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">The landscape</p>
            <p className="mt-4 text-lg leading-9 text-muted-foreground">{item.intro}</p>
          </div>
          <aside className="border-t-2 border-foreground pt-6">
            <h2 className="font-display text-2xl">At a glance</h2>
            <dl className="mt-5 space-y-5 text-sm leading-7">
              <div><dt className="eyebrow text-muted-foreground">Where</dt><dd className="mt-1">{item.where}</dd></div>
              <div><dt className="eyebrow text-muted-foreground">Terrain</dt><dd className="mt-1">{item.terrain}</dd></div>
              <div><dt className="eyebrow text-muted-foreground">Vegetation</dt><dd className="mt-1">{item.vegetation}</dd></div>
            </dl>
          </aside>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="What shapes it" title="Rock, water and living cover" description="Texas landscapes are easiest to understand when geology, water and vegetation are read together." />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <section className="border-t border-border pt-5"><p className="eyebrow text-primary">Geology</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.geology}</p></section>
          <section className="border-t border-border pt-5"><p className="eyebrow text-primary">Water</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.water}</p></section>
          <section className="border-t border-border pt-5"><p className="eyebrow text-primary">Vegetation</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.vegetation}</p></section>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <section>
            <p className="eyebrow text-primary">Signature features</p>
            <h2 className="mt-3 font-display text-3xl">What to look for</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">{item.signature.map((feature) => <li key={feature} className="border-t border-border pt-3 text-sm leading-6">{feature}</li>)}</ul>
          </section>
          <section>
            <p className="eyebrow text-primary">Best for</p>
            <h2 className="mt-3 font-display text-3xl">Why people go</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">{item.bestFor.map((feature) => <li key={feature} className="border-t border-border pt-3 text-sm leading-6">{feature}</li>)}</ul>
          </section>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Plan from here" title={`Explore ${item.name}`} description="Use the landscape as a starting point, then move into parks, rivers, road trips and destination guides." />
        <div className="mt-8 flex flex-wrap gap-3">
          {item.related.map((link) => <Link key={link.href} to={link.href} className="border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">{link.label} →</Link>)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Keep exploring" title="Other Texas landscapes" />
        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">{nearby.map((landscape) => <li key={landscape.slug} className="border-t border-border pt-4"><Link to="/explore/landscapes/$slug" params={{ slug: landscape.slug }} className="group block"><h3 className="font-display text-2xl group-hover:text-primary">{landscape.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{landscape.dek}</p></Link></li>)}</ul>
        <Link to="/explore/landscapes" className="eyebrow mt-10 inline-block text-primary">See all Texas landscapes →</Link>
      </Container>
    </Section>
  </>;
}
