import { createFileRoute, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { lazy, Suspense } from 'react';
import austinEsd3Sources from '@/data/property/austin-county-esd3-adopted.json';

const latestAustinEsd3Adopted = austinEsd3Sources.rates.at(-1)!;
// The main client entry loads only routing and metadata; all detail HTML is
// streamed through this route-scoped lazy component for a smaller shared JS.
const TaxingUnitRatePage = lazy(() => import('@/components/property/TaxingUnitRatePage').then((m) => ({ default: m.TaxingUnitRatePage })));
import { getTaxingUnitRateHistory } from '@/data/property/texas-tax-rates.functions';
import { getSchoolDistrictPeerRates } from '@/data/property/school-district-peers.functions';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const Route = createFileRoute('/property-tax/taxing-unit/$unit')({
  loader: async ({ params }) => {
    const history = await getTaxingUnitRateHistory({ data: { slug: params.unit.trim().toLowerCase() } });
    if (!history.length) throw notFound();
    const latest = history.at(-1)!;
    const peers = latest.type === 'school-district' && latest.totalRate != null && !latest.rateUnavailable && latest.countySlugs.length
      ? await getSchoolDistrictPeerRates({ data: { countySlug: latest.countySlugs[0], year: latest.year, slug: latest.slug, rate: latest.totalRate } })
      : [];
    // Lazy-load source-specific evidence only for the school route. This keeps
    // the six-district Hood rate catalog out of the sitewide main bundle.
    const isdEvidence = latest.type === 'school-district'
      ? await (async () => {
        const source = await import('@/data/property/isd-authority');
        return {
          adoption: source.getVerifiedHoodIsdAdoption(latest.slug),
          officialYear: source.hoodIsdEvidence.officialYear,
          sourceUrl: source.hoodIsdEvidence.sourceUrl,
          sourceDocumentsUrl: source.hoodIsdEvidence.sourceDocumentsUrl,
          exemptionSourceUrl: source.hoodIsdEvidence.exemptionSourceUrl,
          historicalComponents: history.map((item) => ({
            year: item.year,
            components: source.getVerifiedIsdHistoricalComponents(item.slug, item.year, item.totalRate),
          })).filter((item) => item.components != null),
        };
      })()
      : null;
    return { history, latest, peers, isdEvidence };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { latest, history, isdEvidence } = loaderData;
    const canonicalPath = `/property-tax/taxing-unit/${latest.slug}`;
    const hasEsd3Adoption = latest.slug === austinEsd3Sources.unitSlug;
    const verifiedSchoolAdoption = isdEvidence?.adoption ?? null;
    const showSchoolAdoption = verifiedSchoolAdoption != null && isdEvidence!.officialYear >= latest.year;
    const description = hasEsd3Adoption
      ? `${latest.name}: locally adopted ${latestAustinEsd3Adopted.year} rate ${latestAustinEsd3Adopted.totalRate.toFixed(6)} per $100, signed district resolution, parcel-verification steps, and separately labeled Comptroller history through ${latest.year}.`
      : showSchoolAdoption
        ? `${latest.name}: locally adopted ${isdEvidence!.officialYear} school tax rate ${verifiedSchoolAdoption!.totalRate.toFixed(6)} per $100 from Hood CAD, M&O/I&S details, homeowner examples, homestead exemptions, and separately labeled Comptroller history through ${latest.year}.`
        : `${latest.name} property-tax rate history through ${latest.year}, distinguishing finalized statewide figures from separately verified local records, missing reports and documented source conflicts. M&O and I&S components are shown only when reported.`;
    // A credible history can include a fully evidenced local supplement when
    // the Comptroller marked a year as not-reported. A source disagreement
    // never creates an extra verified observation or an indexability shortcut.
    const indexable = history.filter((record) =>
      (!record.rateUnavailable && record.totalRate != null)
      || (record.localVerification?.mode === 'supplement'
        && record.localVerification.sourceUrl.startsWith('https://'))
    ).length >= 3;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${latest.name} Property Tax Rate & History`,
        description,
        robots: indexable ? undefined : 'noindex, follow, max-image-preview:large',
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        '@id': `${pageUrl}#dataset`,
        name: `${latest.name} property-tax rate history`,
        description,
        url: pageUrl,
        temporalCoverage: `${history[0]?.year}/${hasEsd3Adoption ? Math.max(latest.year, latestAustinEsd3Adopted.year) : showSchoolAdoption ? Math.max(latest.year, isdEvidence!.officialYear) : history.at(-1)?.year}`,
        creator: { '@type': 'Organization', name: 'Texas Defined' },
        // Cite every yearly Comptroller workbook as well as any separately
        // sourced local-rate evidence; do not imply the latest source covers
        // years it does not report.
        citation: [...new Set(history.flatMap((record) => [
          record.sourceUrl,
          ...(record.localVerification
            ? [record.localVerification.sourceUrl, ...(record.localVerification.componentSourceUrl ? [record.localVerification.componentSourceUrl] : [])]
            : []),
        ])), ...(hasEsd3Adoption ? [austinEsd3Sources.sourceRateTable, latestAustinEsd3Adopted.resolutionUrl] : []),
        ...(showSchoolAdoption ? [isdEvidence!.sourceUrl, isdEvidence!.sourceDocumentsUrl, isdEvidence!.exemptionSourceUrl] : []),
        ...(latest.slug === 'tolar-isd' ? [isdEvidence!.sourceUrl] : [])],
        publisher: { '@type': 'Organization', name: 'Texas Defined' },
        variableMeasured: ['Total property-tax rate', 'Maintenance and operations rate', 'Debt-service / I&S rate', 'Reported levy'],
      })],
    };
  },
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();
  return <Suspense fallback={<main className="mx-auto max-w-6xl px-4 py-12" aria-live="polite">Loading the property-tax record…</main>}><TaxingUnitRatePage data={data}/></Suspense>;
}
