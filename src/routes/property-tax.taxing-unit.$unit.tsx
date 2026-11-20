import { createFileRoute, notFound } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { lazy, Suspense } from 'react';
import austinEsd3Sources from '@/data/property/austin-county-esd3-adopted.json';
// Load district-specific primary evidence only on its own route. The generic
// taxing-unit head must not ship a full district source dossier in main.js.

const latestAustinEsd3Adopted = austinEsd3Sources.rates.at(-1)!;
// The main client entry loads only routing and metadata; all detail HTML is
// streamed through this route-scoped lazy component for a smaller shared JS.
const TaxingUnitRatePage = lazy(() => import('@/components/property/TaxingUnitRatePage').then((m) => ({ default: m.TaxingUnitRatePage })));
import { getTaxingUnitRateHistory } from '@/data/property/texas-tax-rates.functions';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const Route = createFileRoute('/property-tax/taxing-unit/$unit')({
  loader: async ({ params }) => {
    const { history, peers, isdEvidence } = await getTaxingUnitRateHistory({ data: { slug: params.unit.trim().toLowerCase() } });
    if (!history.length) throw notFound();
    const latest = history.at(-1)!;
    // This single audited district requires source-specific metadata. Keep the
    // full 2023/2024 worksheets and source table out of the eager route bundle.
    const westWhartonHospitalDistrict = latest.slug === 'west-wharton-county-hospital-district'
      ? (await import('@/data/property/west-wharton-hospital-district')).westWhartonHospitalDistrict
      : null;
    return { history, latest, peers, isdEvidence, westWhartonHospitalDistrict };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { latest, history, isdEvidence, westWhartonHospitalDistrict } = loaderData;
    const canonicalPath = `/property-tax/taxing-unit/${latest.slug}`;
    const hasEsd3Adoption = latest.slug === austinEsd3Sources.unitSlug;
    const wharton2025 = history.find((row) => row.year === 2025);
    const wharton2024 = history.find((row) => row.year === 2024);
    const hasWestWhartonAuthority = westWhartonHospitalDistrict != null && latest.slug === westWhartonHospitalDistrict.slug
      && wharton2025?.rateUnavailable === false && wharton2024?.rateUnavailable === false
      && Math.abs((wharton2025?.totalRate ?? -1) - westWhartonHospitalDistrict.adoptedRate2025) < 0.0000001
      && Math.abs((wharton2024?.totalRate ?? -1) - westWhartonHospitalDistrict.priorRate2024) < 0.0000001
      && wharton2025?.levy === westWhartonHospitalDistrict.statewideLevy.current
      && wharton2024?.levy === westWhartonHospitalDistrict.statewideLevy.prior;
    const verifiedSchoolAdoption = isdEvidence?.adoption ?? null;
    const showSchoolAdoption = verifiedSchoolAdoption != null && isdEvidence!.officialYear >= latest.year;
    const description = hasWestWhartonAuthority
      ? `${latest.name}: locally adopted 2026 hospital-district tax rate (Wharton County), 2026 no-new-revenue/voter-approval benchmarks, a disclosed 2023 county/Comptroller rate conflict, 2024–25 levy analysis and parcel verification.`
      : hasEsd3Adoption
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
        temporalCoverage: `${history[0]?.year}/${hasWestWhartonAuthority ? Math.max(latest.year, westWhartonHospitalDistrict.localAdopted2026.year) : hasEsd3Adoption ? Math.max(latest.year, latestAustinEsd3Adopted.year) : showSchoolAdoption ? Math.max(latest.year, isdEvidence!.officialYear) : history.at(-1)?.year}`,
        creator: { '@type': 'Organization', name: 'Texas Defined' },
        ...(hasWestWhartonAuthority ? { author: { '@type': 'Organization', name: 'Texas Defined Homes & Property Desk', url: 'https://texasdefined.com/authors/a-homes-land' } } : {}),
        ...(hasWestWhartonAuthority ? { dateModified: westWhartonHospitalDistrict.lastVerified, identifier: westWhartonHospitalDistrict.officialTaxingUnitId, spatialCoverage: { '@type': 'Place', name: 'West Wharton County, Texas' } } : {}),
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
        ...(isdEvidence?.historicalComponents.flatMap((entry) => entry.components ? [entry.components.sourceUrl] : []) ?? []),
        ...(latest.slug === 'tolar-isd' ? [isdEvidence!.sourceUrl] : []),
        ...(hasWestWhartonAuthority ? [westWhartonHospitalDistrict.sources.districtNotice, westWhartonHospitalDistrict.sources.districtHome, westWhartonHospitalDistrict.sources.districtAbout, westWhartonHospitalDistrict.sources.comptrollerCounty, westWhartonHospitalDistrict.sources.county2026AdoptedTable, westWhartonHospitalDistrict.sources.countyRateIndex, westWhartonHospitalDistrict.sources.countyFiveYearSummary, westWhartonHospitalDistrict.sources.county2024UnitWorksheet, westWhartonHospitalDistrict.sources.county2023UnitWorksheet] : [])],
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
