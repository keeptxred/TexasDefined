import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'A plain-English starting point for mortgage help, down-payment assistance, homebuyer classes, lender questions and the programs worth checking first.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/texas-first-time-homebuyer-programs';
const pageUrl = `${siteUrl}${canonicalPath}`;
const checklist = [
  'Review your credit reports and settle on a monthly budget you can live with.',
  'Take an accepted homebuyer class early.',
  'Check the current income, purchase-price, property and location limits.',
  'Use an approved lender when a program requires one.',
  'Ask for side-by-side written estimates with and without assistance.',
  'Keep some cash in reserve after closing.',
] as const;

export const Route = createFileRoute('/texas-first-time-homebuyer-programs')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas First-Time Homebuyer Programs',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          '@id': `${pageUrl}#howto`,
          url: pageUrl,
          name: 'How to evaluate Texas first-time homebuyer assistance',
          description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: checklist.map((text, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: `Homebuyer checklist step ${index + 1}`,
            text,
            url: `${pageUrl}#homebuyer-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Living in Texas', item: `${siteUrl}/texas-living` },
            { '@type': 'ListItem', position: 3, name: 'First-Time Homebuyer Programs', item: pageUrl },
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
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/texas-living" className="hover:text-foreground">Living in Texas</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">First-Time Homebuyer Programs</li>
          </ol>
        </nav>
        <p className="eyebrow text-primary">Buying a Texas home</p>
        <h1>Texas First-Time Homebuyer Programs</h1>
        <p className="lead">{description}</p>
        <h2>First, find your comfortable number</h2>
        <p>Start with the full monthly cost—not just the mortgage. Add property taxes, homeowners insurance, mortgage insurance, HOA dues, utilities, maintenance and room for the unexpected.</p>
        <div className="not-prose my-8 grid gap-4 sm:grid-cols-3">
          <Link className="rounded-lg border p-5 font-medium" to="/texas-home-affordability-calculator">See what feels affordable</Link>
          <Link className="rounded-lg border p-5 font-medium" to="/texas-down-payment-assistance-calculator">Estimate possible assistance</Link>
          <Link className="rounded-lg border p-5 font-medium" to="/texas-closing-cost-calculator">Plan for closing costs</Link>
        </div>
        <h2>What assistance can look like</h2>
        <p>Help may come as a grant, a forgivable lien, a deferred loan, a second mortgage, a mortgage-credit certificate or a lender-specific offer. Compare the interest rate, repayment terms, cash needed at closing and what happens if you sell or refinance.</p>
        <h2>Your homebuyer checklist</h2>
        <ol>
          {checklist.map((item, index) => <li id={`homebuyer-step-${index + 1}`} key={item}>{item}</li>)}
        </ol>
        <h2>Good places to start</h2>
        <ul>
          <li><a href="https://welcomehome.tdhca.texas.gov/" rel="noreferrer">Texas Department of Housing and Community Affairs homebuyer programs</a></li>
          <li><a href="https://www.tdhca.texas.gov/help-for-texans" rel="noreferrer">TDHCA Help for Texans</a></li>
          <li><a href="https://www.hud.gov/states/texas" rel="noreferrer">HUD resources for Texas buyers</a></li>
        </ul>
        <aside className="not-prose mt-10 rounded-lg bg-muted p-5 text-sm text-muted-foreground">Programs, rates, funding and limits change. Confirm the details with the agency and participating lender before making a decision.</aside>
      </article>
    </Container>
  );
}
