import type { TexasTaxRateRecord } from '@/data/property/texas-tax-rates.generated';
import { getVerifiedHoodIsdAdoption, hoodIsdEvidence } from '@/data/property/isd-authority';

const SCHOOL_EXEMPTION_SOURCE = 'https://comptroller.texas.gov/taxes/property-tax/exemptions/';
const TEA_RATE_SOURCE = 'https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-property-values-and-tax-rates';

function rate(value: number) { return value.toFixed(6); }
function dollars(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function IsdTaxAuthority({ history }: { history: TexasTaxRateRecord[] }) {
  const latest = history.at(-1);
  if (!latest || latest.type !== 'school-district') return null;
  const adopted = getVerifiedHoodIsdAdoption(latest.slug);
  const localYear = hoodIsdEvidence.officialYear;
  const showAdopted = !!adopted && localYear >= latest.year;
  const sample = showAdopted ? adopted!.totalRate : latest.totalRate;
  const sampleYear = showAdopted ? localYear : latest.year;
  const prior = history.find((item) => item.year === sampleYear - 1 && !item.rateUnavailable && item.totalRate != null);
  const sameYear = history.find((item) => item.year === localYear && !item.rateUnavailable && item.totalRate != null);
  const conflicting = showAdopted && sameYear?.totalRate != null && Math.abs(sameYear.totalRate - adopted!.totalRate) > 0.000002;
  const annualChange = sample != null && prior?.totalRate != null ? sample - prior.totalRate : null;
  const annualPercent = annualChange != null && prior?.totalRate ? 100 * annualChange / prior.totalRate : null;
  const associatedCounties = latest.countySlugs.map((slug) => slug.replaceAll('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
  const unresolved2022 = latest.slug === 'tolar-isd';
  const comparable = showAdopted
    ? Object.values(hoodIsdEvidence.districts).sort((a, b) => a.totalRate - b.totalRate)
    : [];
  return <section className="border-b border-border py-10" aria-labelledby="isd-authority-heading">
    <p className="eyebrow text-primary">School district homeowner guide</p>
    <h2 id="isd-authority-heading" className="mt-2 max-w-4xl font-display text-3xl sm:text-4xl">What this school tax rate means for a home</h2>
    {showAdopted ? <>
      <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground">
        <strong className="text-foreground">{adopted!.name}'s {localYear} locally adopted tax rate is {rate(adopted!.totalRate)} per $100 of taxable value.</strong>{' '}
        {hoodIsdEvidence.sourceAgency} publishes {rate(adopted!.maintenanceOperationsRate)} for maintenance and operations (M&amp;O)
        and {rate(adopted!.debtServiceRate)} for debt service (I&amp;S).
        This independent {localYear} record is <strong className="text-foreground">not</strong> a {localYear} statewide Comptroller workbook observation,
        and it does not replace the historical state data used by our tax calculators.
      </p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
        <a href={hoodIsdEvidence.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Hood CAD {localYear} adopted rates ↗</a>
        <a href={hoodIsdEvidence.sourceDocumentsUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Official school district adoption worksheets and notices ↗</a>
        <a href={hoodIsdEvidence.exemptionSourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Hood CAD exemptions by taxing unit ↗</a>
      </div>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">The locally published source was reviewed on <time dateTime={hoodIsdEvidence.verifiedOn}>{hoodIsdEvidence.verifiedOn}</time>. Rates and adoption records must be checked again when official sources change.</p>
    </> : <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">The latest Texas Comptroller rate in the history below is for {latest.year}. A newer rate may have been adopted locally; no later district-specific adoption has been verified in this page's separately sourced records. Before estimating a current bill, confirm the matching tax year with the appraisal district, county tax office, or school district. The <a href={TEA_RATE_SOURCE} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Texas Education Agency's school tax-rate series</a> is an additional historical cross-check.</p>}
    {conflicting ? <p role="alert" className="mt-5 border-l-2 border-amber-600 pl-4 text-sm leading-6"><strong>Official source discrepancy:</strong> the {localYear} local and Comptroller rates do not agree. Both remain visible for research; verify the correct rate with the taxing district before using it in a tax calculation.</p> : null}
    <div className="mt-9 grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="font-display text-2xl">School-only homeowner examples</h3>
        {sample == null ? <p className="mt-3 text-sm leading-7 text-muted-foreground">No numeric rate is verified for an illustrative calculation. Do not treat an unreported rate as zero.</p> : <>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">At the {sampleYear} {showAdopted ? 'locally adopted' : 'Comptroller-reported'} rate of {rate(sample)}, a property with <strong className="text-foreground">$300,000 of school-taxable value</strong> would have an illustrative school-only levy of <strong className="text-foreground">{dollars(3000 * sample)}</strong> before any individual tax ceiling or other adjustments.</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">For a separately assumed $300,000 appraised residence homestead eligible for the $140,000 general school exemption, school-taxable value could be $160,000 and this district-only illustration would be <strong className="text-foreground">{dollars(1600 * sample)}</strong>. This is a simplified example, <em>not</em> a parcel appraisal or bill estimate. Appraised, assessed, market and taxable values may differ; other exemptions and limitations may apply.</p>
          {annualChange != null && annualPercent != null ? <p className="mt-3 text-sm leading-7 text-muted-foreground">Compared with the {prior!.year} statewide rate of {rate(prior!.totalRate!)}, the nominal rate {annualChange < 0 ? 'fell' : annualChange > 0 ? 'rose' : 'was unchanged'} {Math.abs(annualPercent).toFixed(2)}%. For an identical $300,000 school-taxable value in both years, the illustrative district-only difference is {dollars(3000 * annualChange)}. Actual bills may rise even when nominal rates fall if taxable values change.</p> : null}
        </>}
      </div>
      <div>
        <h3 className="font-display text-2xl">Homestead exemptions and the tax ceiling</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">Texas law provides a <strong className="text-foreground">$140,000 general residence-homestead exemption for school district taxes</strong>. Qualifying homeowners age 65 or older or with a qualifying disability may receive an <strong className="text-foreground">additional $60,000 school exemption</strong> and a school-tax ceiling. The two additional age/disability exemptions are not stacked against the same school levy. Eligibility, any local options, school-tax ceiling, and your actual taxable value must be confirmed for the parcel and year.</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">These are <strong className="text-foreground">school-district</strong> taxes, not a complete property tax bill. Check your account's school district, city, county and any special districts separately; an associated {associatedCounties.length === 1 ? 'county' : 'set of counties'} ({associatedCounties.join(', ') || 'the county list above'}) does not establish parcel jurisdiction.</p>
        <a href={SCHOOL_EXEMPTION_SOURCE} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-2">Official Texas Comptroller homestead and exemption guidance ↗</a>
      </div>
    </div>
    {comparable.length ? <div className="mt-9">
      <h3 className="font-display text-2xl">Compare other school districts in the same Hood CAD rate table</h3>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Each district below has its own boundaries. These {localYear} adopted rates are comparable per $100 of taxable value but are <strong className="text-foreground">alternatives, not taxes to add together</strong>. Individual properties generally belong to one principal school district; verify your parcel.</p>
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[32rem] text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3">District</th><th>Adopted {localYear} rate</th><th>M&amp;O</th><th>I&amp;S</th></tr></thead><tbody>{comparable.map((item) => <tr key={item.name} className="border-b border-border"><td className="py-3 font-medium">{item.name}{item.name === latest.name ? ' (this page)' : ''}</td><td className="tabular-nums">{rate(item.totalRate)}</td><td className="tabular-nums">{rate(item.maintenanceOperationsRate)}</td><td className="tabular-nums">{rate(item.debtServiceRate)}</td></tr>)}</tbody></table></div>
    </div> : null}
    {unresolved2022 ? <p className="mt-8 border-l-2 border-amber-600 pl-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">2022 historical-source caution:</strong> Hood CAD's 2022 published component columns do not reconcile with the adopted Tolar ISD total. We preserve the statewide historical total and leave uncorroborated M&amp;O/I&amp;S components blank rather than fabricate a breakdown. <a href={hoodIsdEvidence.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Inspect the original Hood CAD table ↗</a>.</p> : null}
    <div className="mt-8 border-t border-border pt-5 text-sm leading-7 text-muted-foreground">
      <strong className="text-foreground">How to verify a real parcel:</strong> find the property in its county appraisal-district account search, confirm the named school taxing unit, selected tax year, appraised and taxable values and exemptions, then use the applicable official tax statement for payment questions.
      For background on M&amp;O and I&amp;S, read <a href={TEA_RATE_SOURCE} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Texas Education Agency school finance records ↗</a>.
    </div>
  </section>;
}
