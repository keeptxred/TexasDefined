import { createFileRoute, notFound, redirect } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { CountyPropertyTaxTemplate } from '@/components/property/CountyPropertyTaxTemplate';
import { getCountyPropertyRecordBySlug } from '@/data/property/county-property-data';
import { isCountyPropertyIndexReady } from '@/data/property/county-property-schema';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const Route = createFileRoute('/property-tax/county/$county')({
  loader: ({ params }) => {
    const normalizedSlug = params.county.trim().toLowerCase();
    const county = getCountyPropertyRecordBySlug(normalizedSlug);
    if (!county) throw notFound();

    if (params.county !== county.slug) {
      throw redirect({
        to: '/property-tax/county/$county',
        params: { county: county.slug },
        replace: true,
      });
    }

    return { county };
  },
  head: ({ loaderData }) => {
    const county = loaderData?.county;
    if (!county) return {};

    const canonicalPath = `/property-tax/county/${county.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const siteUrl = absoluteUrl(texasDefinedBrand, '/');
    const description = `${county.name} property-tax guide covering appraisal records, exemptions, protests, payments, taxing units and official local resources.`;
    const indexReady = isCountyPropertyIndexReady(county);

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${county.name} Property Tax Guide`,
        description,
        robots: indexReady ? undefined : 'noindex, follow',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: `${county.name} Property Tax Guide`,
            description,
            isPartOf: { '@id': `${siteUrl}#website` },
            about: { '@id': `${pageUrl}#county` },
            mainEntity: { '@id': `${pageUrl}#article` },
            breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
          },
          {
            '@type': 'Article',
            '@id': `${pageUrl}#article`,
            headline: `${county.name} Property Tax Guide`,
            description,
            url: pageUrl,
            ...(county.lastVerifiedAt ? { dateModified: county.lastVerifiedAt } : {}),
            isPartOf: { '@id': `${pageUrl}#page` },
            mainEntityOfPage: { '@id': `${pageUrl}#page` },
            about: { '@id': `${pageUrl}#county` },
          },
          {
            '@type': 'AdministrativeArea',
            '@id': `${pageUrl}#county`,
            name: county.name,
            containedInPlace: {
              '@type': 'State',
              name: 'Texas',
            },
            ...(county.fips ? { identifier: { '@type': 'PropertyValue', propertyID: 'FIPS', value: county.fips } } : {}),
            sameAs: county.links.countyWebsiteUrl ?? county.officialDirectoryUrl,
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') },
              { '@type': 'ListItem', position: 3, name: 'County property-tax guides', item: absoluteUrl(texasDefinedBrand, '/property-tax/counties') },
              { '@type': 'ListItem', position: 4, name: county.name, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: CountyPropertyTaxPage,
});

function CountyPropertyTaxPage() {
  const { county } = Route.useLoaderData();
  const sources = county.sourceUrls.map((url) => ({
    name: sourceName(url),
    url,
    note: 'Official or authoritative source used to verify this county property-tax record.',
  }));

  return (
    <>
      <CountyPropertyTaxTemplate county={county} />
      <Container className="pb-12 sm:pb-16">
        <CitationTrustPanel
          sources={sources}
          methodology="TexasDefined combines verified county, appraisal-district and tax-office records into one county reference. Property-specific values, exemptions, jurisdictions and deadlines must still be confirmed against the official parcel record and local notices; this page does not infer missing local facts."
          lastVerified={county.lastVerifiedAt ? formatVerifiedDate(county.lastVerifiedAt) : 'Verification pending; this page remains outside the searchable citation-ready set until local sources are verified.'}
          title="Sources, methodology and verification"
        />
      </Container>
    </>
  );
}

function sourceName(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'Official source';
  }
}

function formatVerifiedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}
