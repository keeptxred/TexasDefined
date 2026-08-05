import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'A plain-English guide to Texas sales tax, local rates, exemptions, online purchases, permits and the questions to ask before a transaction.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/texas-sales-tax-explained';
const pageUrl = `${siteUrl}${canonicalPath}`;
const checklist = [
  'Identify the exact product or service.',
  'Check whether Texas treats it as taxable.',
  'Confirm any exemption and the certificate it requires.',
  'Determine the correct transaction location.',
  'Use the official rate lookup and current guidance.',
  'Keep the invoice and supporting records.',
] as const;

export const Route = createFileRoute('/texas-sales-tax-explained')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Sales Tax Explained',
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
          name: 'How to verify Texas sales tax for a transaction',
          description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: checklist.map((text, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: `Sales-tax check ${index + 1}`,
            text,
            url: `${pageUrl}#sales-tax-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Living in Texas', item: `${siteUrl}/texas-living` },
            { '@type': 'ListItem', position: 3, name: 'Texas Sales Tax Explained', item: pageUrl },
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
            <li aria-current="page" className="text-foreground">Texas Sales Tax Explained</li>
          </ol>
        </nav>
        <p className="eyebrow text-primary">Texas taxes</p>
        <h1>Texas Sales Tax Explained</h1>
        <p className="lead">{description}</p>
        <h2>Why the rate can change from place to place</h2>
        <p>A purchase can include the statewide rate plus city, county, transit or special-district taxes. The final number depends on what you bought, where the sale happened, where it was delivered and how Texas sourcing rules apply.</p>
        <h2>What is usually taxed—and what may not be</h2>
        <p>Most sales of physical goods are taxable unless an exemption applies. Some services are taxed, while many basic groceries and certain medical, agricultural, manufacturing, resale or nonprofit purchases may be treated differently. The paperwork has to match the exemption.</p>
        <h2>Online orders and use tax</h2>
        <p>Marketplace providers and remote sellers may collect Texas tax at checkout. When they do not, a taxable purchase may still create a Texas use-tax obligation.</p>
        <h2>For Texas sellers</h2>
        <p>Anyone selling taxable goods or services should check whether a Texas sales-tax permit, collection, filing and recordkeeping are required. Resale certificates are for qualifying purchases that will be resold—not ordinary business expenses.</p>
        <h2>Before you rely on a rate</h2>
        <ol>
          {checklist.map((item, index) => <li id={`sales-tax-step-${index + 1}`} key={item}>{item}</li>)}
        </ol>
        <p><a href="https://comptroller.texas.gov/taxes/sales/" rel="noreferrer">Check the Texas Comptroller's sales-tax guidance</a></p>
        <aside className="not-prose mt-10 rounded-lg bg-muted p-5 text-sm text-muted-foreground">Tax rules and agency guidance can change. Confirm a specific filing, rate or exemption with the Texas Comptroller or a qualified tax professional.</aside>
      </article>
    </Container>
  );
}
