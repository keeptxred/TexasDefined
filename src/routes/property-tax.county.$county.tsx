import { createFileRoute, notFound, redirect } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { CountyPropertyTaxTemplate } from '@/components/property/CountyPropertyTaxTemplate';
import { CountyTaxRateSection } from '@/components/property/CountyTaxRateSection';
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
    const title = `${county.name} Property Tax Rates | Appraisal, Exemptions & Protests`;
    const description = `${county.name} property tax guide with county, city, school-district and special-district rate data, appraisal resources, exemptions, protests, payment details and official local links.`;
    const indexReady = isCountyPropertyIndexReady(county);

    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title,
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
            name: title,
            description,
            isPartOf: { '@id': `${siteUrl}#website` },
            about: { '@id': `${pageUrl}#county` },
            mainEntity: { '@id': `${pageUrl}#article` },
            breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
          },
          {
            '@type': 'Article',
            '@id': `${pageUrl}#article`,
            headline: title,
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
            containedInPlace: { '@type': 'State', name: 'Texas' },
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
  sources.push({
    name: 'Texas Comptroller Property Tax Assistance Division',
    url: 'https://comptroller.texas.gov/taxes/property-tax/rates/',
    note: 'Official statewide Tax Rates and Levies source for county, city, school-district and special-district adopted rates.',
  });
  const upstreamFreshness = [
    county.sourceUpdatedAt.appraisalDistrict ? `Appraisal-district record updated ${formatVerifiedDate(county.sourceUpdatedAt.appraisalDistrict)}` : null,
    county.sourceUpdatedAt.taxOffice ? `tax-office record updated ${formatVerifiedDate(county.sourceUpdatedAt.taxOffice)}` : null,
  ].filter((value): value is string => Boolean(value)).join('; ');
  const methodology = `TexasDefined combines verified county, appraisal-district and tax-office records with statewide taxing-unit rate files reported to the Texas Comptroller. ${upstreamFreshness ? `The Texas Comptroller county directory reports: ${upstreamFreshness}. ` : ''}A taxing unit being associated with the county does not mean every parcel pays that tax. Property-specific values, exemptions, taxing-unit membership and deadlines must still be confirmed against the official parcel record and local notices.`;

  return (
    <>
      <CountyPropertyTaxTemplate county={county} />
      <Container className="pb-12 sm:pb-16">
        <CountyTaxRateSection countySlug={county.slug} countyName={county.name} />
        <CitationTrustPanel
          sources={sources}
          methodology={methodology}
          lastVerified={county.lastVerifiedAt ? formatVerifiedDate(county.lastVerifiedAt) : 'Local office verification pending; the rate data is sourced separately from the statewide Comptroller file.'}
          title="Sources, methodology and verification"
        />
      </Container>
    </>
  );
}

function sourceName(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ''); }
  catch { return 'Official source'; }
}

function formatVerifiedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}
