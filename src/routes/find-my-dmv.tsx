import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'The basic steps for registering a vehicle after a move, plus the official state and county pages you’ll need along the way.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/find-my-dmv';
const pageUrl = `${siteUrl}${canonicalPath}`;
const steps = [
  'Arrange insurance that meets Texas requirements.',
  'Complete any inspection or emissions step that applies to your vehicle and county.',
  'Gather your title, registration, identification and proof-of-residency documents.',
  'Check your county tax office for current fees, hours and accepted payment methods.',
  'Handle your Texas driver license separately through DPS.',
] as const;

export const Route = createFileRoute('/find-my-dmv')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Register a Vehicle in Texas', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo', '@id': `${pageUrl}#howto`, url: pageUrl,
          name: 'How to register a vehicle after moving to Texas', description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: steps.map((text, index) => ({
            '@type': 'HowToStep', position: index + 1, name: `Vehicle registration step ${index + 1}`,
            text, url: `${pageUrl}#vehicle-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Moving to Texas', item: `${siteUrl}/moving-to-texas` },
            { '@type': 'ListItem', position: 3, name: 'Register a Vehicle', item: pageUrl },
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
            <li><Link to="/moving-to-texas" className="hover:text-foreground">Moving to Texas</Link></li><li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">Register a Vehicle</li>
          </ol>
        </nav>
        <p className="eyebrow text-primary">New in Town</p><h1>Getting your car settled in Texas</h1><p className="lead">{description}</p>
        <h2>Two offices, two different jobs</h2>
        <p>County tax offices generally handle vehicle registration. The Texas Department of Public Safety handles driver licenses. Check both official sites before making a trip so you know which documents, fees and appointments apply.</p>
        <h2>Your first steps</h2>
        <ol>{steps.map((step, index) => <li id={`vehicle-step-${index + 1}`} key={step}>{step}</li>)}</ol>
        <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
          <a className="rounded-lg border p-5 font-medium" href="https://www.txdmv.gov/motorists/new-to-texas" rel="noreferrer">See the official TxDMV steps</a>
          <a className="rounded-lg border p-5 font-medium" href="https://www.dps.texas.gov/section/driver-license" rel="noreferrer">Visit Texas driver-license services</a>
          <Link className="rounded-lg border p-5 font-medium" to="/browse/counties">Find your county</Link>
          <Link className="rounded-lg border p-5 font-medium" to="/moving-to-texas-checklist">See the moving checklist</Link>
        </div>
        <aside className="not-prose rounded-lg bg-muted p-5 text-sm text-muted-foreground">Use the official state and county pages for the latest office locations, fees, deadlines and document requirements.</aside>
      </article>
    </Container>
  );
}
