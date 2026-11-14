import official from '@/data/property/austin-county-esd3-adopted.json';
import type { TexasTaxRateRecord } from '@/data/property/texas-tax-rates.generated';

// These independently verified, locally adopted records are intentionally NOT
// imported into the Comptroller dataset or substituted into parcel calculators.
export const austinEsd3Sources = official;
export const latestAustinEsd3Adopted = official.rates.at(-1)!;

function dollars(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
function rate(value: number) {
  return value.toFixed(6);
}

export function AustinCountyEsd3Authority({ history }: { history: TexasTaxRateRecord[] }) {
  const current = latestAustinEsd3Adopted;
  const prior = history.find((item) => item.year === current.year - 1 && !item.rateUnavailable && item.totalRate != null);
  const sameYear = history.find((item) => item.year === current.year && !item.rateUnavailable && item.totalRate != null);
  const difference = prior?.totalRate == null ? null : current.totalRate - prior.totalRate;
  const percentage = prior?.totalRate ? (difference! / prior.totalRate) * 100 : null;
  const sourceConflict = sameYear?.totalRate != null && Math.abs(sameYear.totalRate - current.totalRate) > 0.000001;

  return <section className="border-b border-border py-10" aria-labelledby="esd3-locally-adopted">
    <p className="eyebrow text-primary">Official local government record</p>
    <h2 id="esd3-locally-adopted" className="mt-2 max-w-4xl font-display text-4xl">Austin County ESD #3: {current.year} adopted tax rate</h2>
    <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
      Austin County Emergency Services District No. 3 adopted its {current.year} property-tax rate on <time dateTime={current.adoptedOn}>{new Date(current.adoptedOn + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time>.
      This is an <strong className="text-foreground">independently documented local adopted rate</strong>, not an assertion that the Texas Comptroller has published the {current.year} statewide workbook. Only properties within this particular ESD's taxing jurisdiction can owe this tax.
    </p>
    <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="border-t border-border pt-4"><dt className="text-sm text-muted-foreground">Adopted total / $100</dt><dd className="mt-2 font-display text-3xl">{rate(current.totalRate)}</dd></div>
      <div className="border-t border-border pt-4"><dt className="text-sm text-muted-foreground">Maintenance and operations</dt><dd className="mt-2 font-display text-3xl">{rate(current.maintenanceOperationsRate)}</dd></div>
      <div className="border-t border-border pt-4"><dt className="text-sm text-muted-foreground">Debt service</dt><dd className="mt-2 font-display text-3xl">{rate(current.debtServiceRate)}</dd></div>
      <div className="border-t border-border pt-4"><dt className="text-sm text-muted-foreground">Change from {prior?.year ?? 'prior year'}</dt><dd className="mt-2 font-display text-3xl">{difference == null ? 'Not comparable' : `${difference > 0 ? '+' : ''}${rate(difference)}`}</dd></div>
    </dl>
    {sourceConflict ? <p role="alert" className="mt-6 border-l-2 border-amber-600 pl-4 text-sm leading-6"><strong>Official-source discrepancy:</strong> The {current.year} Comptroller record lists {rate(sameYear!.totalRate!)} per $100, while the district resolution and appraisal-district source list {rate(current.totalRate)}. The source values remain separate until reconciled; do not automatically choose either for a parcel estimate.</p> : null}
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <div>
        <h3 className="font-display text-2xl">What this rate actually means</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">At {rate(current.totalRate)} per $100 of <em>taxable</em> property value, this district's illustrative annual share would be {dollars((100000 / 100) * current.totalRate)} on $100,000 of taxable value or {dollars((300000 / 100) * current.totalRate)} on $300,000. These are not estimates of a complete Austin County tax bill.</p>
        {difference != null && percentage != null ? <p className="mt-3 text-sm leading-7 text-muted-foreground">Compared with the {prior!.year} Comptroller rate of {rate(prior!.totalRate!)} per $100, the adopted nominal rate is {percentage < 0 ? 'lower' : 'higher'} by {Math.abs(percentage).toFixed(2)}%. At an unchanged $100,000 taxable value, the modeled difference for <em>this district alone</em> is {dollars((100000 / 100) * difference)}. Actual tax bills may change differently as taxable values, exemptions and jurisdiction membership change.</p> : null}
        <p className="mt-3 text-sm leading-7 text-muted-foreground">A rate reduction does not establish that the district collected less total revenue: changes in the tax base and new properties matter. Reported prior-year levies in the Comptroller history are not the same thing as cash collections or a current-year revenue projection.</p>
      </div>
      <div>
        <h3 className="font-display text-2xl">How to verify the correct bill</h3>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
          <li>Find your specific property account in the <a href="https://esearch.austincad.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2">Austin County appraisal-district property search</a>.</li>
          <li>Confirm ESD #3 actually appears among the taxing jurisdictions for that parcel. A county address alone does not establish ESD membership.</li>
          <li>Use that account's taxable value, applicable exemptions and the rate for the matching tax year. Add other taxing units only if that parcel is subject to them.</li>
          <li>For district policy, budget or a discrepancy in its adopted rate, consult <a href="https://austincountyesd3.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2">ESD #3's official website</a>; for valuation and parcel records, use Austin CAD. Tax collection and payment questions should go to the office printed on the actual tax statement.</li>
        </ol>
      </div>
    </div>
    <div className="mt-8 border-t border-border pt-6">
      <h3 className="font-display text-2xl">Official documents and verification</h3>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">The district's signed adoption resolution identifies the {current.year} total rate, its operations and debt-service components, and the adoption date. Austin CAD independently publishes the same total in its annual rate table. The two-source check was recorded on <time dateTime={current.verifiedOn}>{current.verifiedOn}</time>. Subsequent automated checks compare official records without pretending that unchanged pages were newly written or that unreported statewide data is zero.</p>
      <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
        <a href={current.resolutionUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">{current.year} signed tax-rate resolution ↗</a>
        <a href={official.sourceRateTable} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Austin CAD adopted tax-rate table ↗</a>
        <a href={official.sourceResolutionIndex} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">District worksheets and historical resolutions ↗</a>
        <a href="https://austincountyesd3.org/budget-information/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Official district budget documents ↗</a>
      </div>
    </div>
  </section>;
}
