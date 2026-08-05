import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'A dependable way to confirm which public school district serves an address before you buy, rent or enroll.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/find-my-school-district';
const pageUrl = `${siteUrl}${canonicalPath}`;
const steps = [
  'Start with the Texas Education Agency’s official school and district pages.',
  'Enter the exact property address in an official district or county map.',
  'Confirm the assigned campus directly with the district.',
  'Ask about planned boundary changes, transfers or new-campus assignments.',
  'Keep written confirmation when a home purchase or lease depends on the answer.',
] as const;

export const Route = createFileRoute('/find-my-school-district')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Find the School District for an Address', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo', '@id': `${pageUrl}#howto`, url: pageUrl,
          name: 'How to verify the school district for a Texas address', description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: steps.map((text, index) => ({
            '@type': 'HowToStep', position: index + 1, name: `School district check ${index + 1}`,
            text, url: `${pageUrl}#school-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Moving Here', item: `${siteUrl}/moving-to-texas` },
            { '@type': 'ListItem', position: 3, name: 'Find Your School District', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: Page,
});

function Page() {
  return (
    <Container className="py-16 sm:py-24">
      <article className="prose prose-gray mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="not-prose text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li><li aria-hidden="true">/</li>
            <li><Link to="/moving-to-texas" className="hover:text-foreground">Moving Here</Link></li><li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">School Districts</li>
          </ol>
        </nav>
        <p className="eyebrow text-primary">Schools and Communities</p><h1>Find the district that serves your address</h1><p className="lead">{description}</p>
        <h2>Why the city name is not enough</h2>
        <p>City limits, ZIP codes, district boundaries and attendance zones do not always line up. A home can sit in one city and attend schools in another district, so the exact address matters.</p>
        <h2>The safest way to check</h2>
        <ol>{steps.map((step, index) => <li id={`school-step-${index + 1}`} key={step}>{step}</li>)}</ol>
        <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
          <a className="rounded-lg border p-5 font-medium" href="https://tea.texas.gov/texas-schools" rel="noreferrer">Start with the Texas Education Agency</a>
          <a className="rounded-lg border p-5 font-medium" href="https://txschools.gov/" rel="noreferrer">Look up schools on TXschools.gov</a>
          <Link className="rounded-lg border p-5 font-medium" to="/browse/cities">Find a city</Link>
          <Link className="rounded-lg border p-5 font-medium" to="/browse/counties">Find your county</Link>
        </div>
        <aside className="not-prose rounded-lg bg-muted p-5 text-sm text-muted-foreground">
          Before you sign: the district has the final word on campus assignments. Confirm the address directly before making a housing or enrollment decision.
        </aside>
      </article>
    </Container>
  );
}
