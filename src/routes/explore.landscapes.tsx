import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Section, SectionHeader } from '@/components/editorial/SectionHeader';
import { Container } from '@/components/layout/Container';
import { texasLandscapeGuides, texasLandscapes } from '@/data/texas-landscapes';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'A field guide to the landscapes that define Texas: Hill Country limestone, Piney Woods forest, Gulf marshes, prairie, canyon, desert, mountain, river and more.';
const pagePath = '/explore/landscapes';

export const Route = createFileRoute('/explore/landscapes')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: pagePath, title: 'Texas Landscapes: The Complete Guide', description }),
    links: [canonicalLink(texasDefinedBrand, pagePath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${absoluteUrl(texasDefinedBrand, pagePath)}#page`,
          url: absoluteUrl(texasDefinedBrand, pagePath),
          name: 'Texas Landscapes: The Complete Guide',
          description,
          isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
          mainEntity: { '@id': `${absoluteUrl(texasDefinedBrand, pagePath)}#landscapes` },
        },
        {
          '@type': 'ItemList',
          '@id': `${absoluteUrl(texasDefinedBrand, pagePath)}#landscapes`,
          name: 'Landscapes of Texas',
          numberOfItems: texasLandscapes.length,
          itemListElement: texasLandscapes.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'WebPage',
              name: item.name,
              description: item.dek,
              url: absoluteUrl(texasDefinedBrand, `/explore/landscapes/${item.slug}`),
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${absoluteUrl(texasDefinedBrand, pagePath)}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
            { '@type': 'ListItem', position: 2, name: 'Explore Texas', item: absoluteUrl(texasDefinedBrand, '/explore') },
            { '@type': 'ListItem', position: 3, name: 'Texas Landscapes', item: absoluteUrl(texasDefinedBrand, pagePath) },
          ],
        },
      ],
    })],
  }),
  component: TexasLandscapesPage,
});

function TexasLandscapesPage() {
  return <>
    <DepartmentHero current="Explore" eyebrow="Texas Landscapes" title="The landscapes that define Texas" description={description} />

    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="eyebrow text-primary">Why Texas looks so different</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">One state. Forest, prairie, limestone, desert, mountains and coast.</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Texas does not have one defining landscape. Rainfall decreases dramatically from east to west, elevation rises toward the Trans-Pecos, major river systems cut across the state, and changing geology creates everything from black-clay prairie to limestone karst and desert mountain ranges.</p>
            <p>This guide treats Texas as a connected physical landscape. Each page explains where a landscape occurs, what the terrain is made of, what grows there, how water behaves, and where to go if you want to experience it in person.</p>
          </div>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="The field guide" title={`${texasLandscapes.length} Texas landscapes to know`} description="Use these as building blocks. Many counties and travel regions contain more than one landscape." />
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {texasLandscapes.map((item, index) => <li key={item.slug} className="border-t border-border pt-5">
            <Link to="/explore/landscapes/$slug" params={{ slug: item.slug }} className="group block">
              <p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, '0')} · {item.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl leading-tight transition-colors group-hover:text-primary">{item.name}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.dek}</p>
              <span className="eyebrow mt-5 inline-block text-primary">Explore the landscape →</span>
            </Link>
          </li>)}
        </ul>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Questions people actually ask" title="Texas geography, explained plainly" description="These guides connect the landscape pages to practical travel, photography and geography searches." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {texasLandscapeGuides.map((guide) => <Link key={guide.slug} to="/explore/landscapes/$slug" params={{ slug: guide.slug }} className="group border border-border bg-background p-7 transition-colors hover:border-primary">
            <h2 className="font-display text-3xl leading-tight group-hover:text-primary">{guide.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{guide.dek}</p>
            <span className="eyebrow mt-5 inline-block text-primary">Read the guide →</span>
          </Link>)}
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <div className="grid gap-8 border-y border-border py-8 md:grid-cols-3">
          <Link to="/explore/road-trips" className="group"><p className="eyebrow text-primary">See it from the road</p><h2 className="mt-2 font-display text-2xl group-hover:text-primary">Texas scenic drives</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Match a route to the landscape you want to see.</p></Link>
          <Link to="/explore/state-parks" className="group"><p className="eyebrow text-primary">Get outside</p><h2 className="mt-2 font-display text-2xl group-hover:text-primary">Texas state parks</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Find protected examples of canyons, rivers, prairie, desert and forest.</p></Link>
          <Link to="/explore/road-trips" className="group"><p className="eyebrow text-primary">Connect the dots</p><h2 className="mt-2 font-display text-2xl group-hover:text-primary">Texas road trips</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Build a trip around changing terrain instead of just cities.</p></Link>
        </div>
      </Container>
    </Section>
  </>;
}
