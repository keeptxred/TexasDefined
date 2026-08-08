import { Link } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import type { CountyPropertyRecord } from '@/data/property/county-property-schema';

const resourceLinks = [
  { to: '/learn/property-taxes', label: 'Texas property-tax guide' },
  { to: '/learn/appraisal-districts', label: 'Appraisal districts' },
  { to: '/do/homestead-exemption', label: 'Homestead exemption' },
  { to: '/do/property-tax-protest', label: 'Property-tax protest' },
  { to: '/property-tax-calculators', label: 'Property-tax calculators' },
] as const;

function ExternalResource({ href, children }: { href: string | null; children: string }) {
  if (!href) return null;
  return <a href={href} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">{children}<ExternalLink className="h-4 w-4" aria-hidden="true" /></a>;
}

export function CountyPropertyTaxTemplate({ county }: { county: CountyPropertyRecord }) {
  const officeName = county.appraisalDistrict.name ?? `${county.name} appraisal district`;
  const taxOfficeName = county.taxOffice.name ?? `${county.name} tax office`;
  const localDirectoryUrl = county.links.countyWebsiteUrl ?? county.officialDirectoryUrl;

  return (
    <article>
      <section className="border-b border-border bg-surface">
        <Container className="py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/property">Property</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/property-tax/counties">County guides</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">{county.name}</span>
          </nav>
          <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end">
            <div>
              <p className="eyebrow text-primary">County property guide</p>
              <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{county.name} property taxes</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A practical county-level guide to appraisal records, taxing units, exemptions, protests, payments and the official local offices that control each step.</p>
            </div>
            <dl className="border-l border-border pl-6 text-sm leading-6">
              <div><dt className="text-muted-foreground">County FIPS</dt><dd className="font-semibold text-foreground">{county.fips ?? 'Pending verification'}</dd></div>
              {county.region ? <div className="mt-3"><dt className="text-muted-foreground">Region</dt><dd className="font-semibold text-foreground">{county.region}</dd></div> : null}
              {county.majorCities.length ? <div className="mt-3"><dt className="text-muted-foreground">Cities in directory</dt><dd className="font-semibold text-foreground">{county.majorCities.join(', ')}</dd></div> : null}
            </dl>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          <aside className="h-fit border-t-2 border-foreground pt-5 lg:sticky lg:top-28">
            <p className="eyebrow text-primary">In this county guide</p>
            <nav className="mt-4 divide-y divide-border text-sm">
              {[
                ['overview', 'Overview'], ['taxes', 'Taxes & taxing units'], ['appraisal', 'Appraisal'], ['exemptions', 'Exemptions'], ['protest', 'Protest'], ['payment', 'Payment'], ['resources', 'Local resources'], ['faq', 'FAQ'], ['related', 'Related guides'],
              ].map(([id, label]) => <a key={id} href={`#${id}`} className="block py-3 text-muted-foreground hover:text-primary">{label}</a>)}
            </nav>
          </aside>

          <div className="max-w-3xl">
            <section id="overview" className="scroll-mt-28">
              <p className="eyebrow text-primary">Overview</p>
              <h2 className="mt-3 font-display text-4xl">Start with the exact property account</h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                <p>Property taxes are account-specific. The useful starting point is the parcel record, not a countywide average. Confirm ownership, property characteristics, exemptions, taxable values and every taxing unit attached to the address.</p>
                <p>{county.name} may contain cities and special districts with different rates and rules. Two homes in the same county can therefore have materially different total tax bills.</p>
              </div>
            </section>

            <section id="taxes" className="mt-14 scroll-mt-28 border-t border-border pt-10">
              <p className="eyebrow text-primary">Taxes & taxing units</p>
              <h2 className="mt-3 font-display text-4xl">Build the bill from every jurisdiction</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">Review the county, school district, city and any MUD, ESD, hospital, community-college or other special district serving the parcel. Use the adopted rates for the current tax year and the taxable value shown for each unit.</p>
              <Link to="/property-tax-calculators" className="mt-5 inline-block text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Open the property-tax calculators →</Link>
            </section>

            <section id="appraisal" className="mt-14 scroll-mt-28 border-t border-border pt-10">
              <p className="eyebrow text-primary">Appraisal</p>
              <h2 className="mt-3 font-display text-4xl">Review the appraisal record before the deadline</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">The appraisal district maintains the property record, determines appraised value, administers exemptions and supports the protest process. Check square footage, land size, improvements, condition, ownership, value history and exemption status as soon as the annual notice arrives.</p>
              <div className="mt-5"><ExternalResource href={county.links.appraisalDistrictUrl ?? county.appraisalDistrict.websiteUrl}>Open {officeName}</ExternalResource></div>
            </section>

            <section id="exemptions" className="mt-14 scroll-mt-28 border-t border-border pt-10">
              <p className="eyebrow text-primary">Exemptions</p>
              <h2 className="mt-3 font-display text-4xl">Confirm every exemption that applies</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">Residence homestead, age-65, disability, disabled-veteran and other exemptions are administered through the appraisal district. Some local taxing units may offer optional exemptions, so verify the account rather than assuming every jurisdiction treats the property the same way.</p>
              <div className="mt-5"><ExternalResource href={county.links.exemptionUrl}>Open local exemption information</ExternalResource></div>
            </section>

            <section id="protest" className="mt-14 scroll-mt-28 border-t border-border pt-10">
              <p className="eyebrow text-primary">Protest</p>
              <h2 className="mt-3 font-display text-4xl">Use the notice date, not the fall tax bill</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">If the value, property details, exemption treatment or another appraisal-district action appears wrong, read the notice immediately and use the deadline printed there. Gather comparable sales, condition evidence, repair estimates and examples of similar properties when relevant.</p>
              <div className="mt-5"><ExternalResource href={county.links.protestUrl}>Open the local protest portal or instructions</ExternalResource></div>
            </section>

            <section id="payment" className="mt-14 scroll-mt-28 border-t border-border pt-10">
              <p className="eyebrow text-primary">Payment</p>
              <h2 className="mt-3 font-display text-4xl">Verify the collecting office and actual due date</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">The appraisal district does not collect the tax bill. Confirm which office collects for each taxing unit, then use the actual statement for the amount due, accepted payment methods and delinquency date.</p>
              <div className="mt-5 space-y-3"><ExternalResource href={county.links.paymentUrl}>Open county property-tax payment</ExternalResource><br /><ExternalResource href={county.links.taxOfficeUrl ?? county.taxOffice.websiteUrl}>Open {taxOfficeName}</ExternalResource></div>
            </section>

            <section id="resources" className="mt-14 scroll-mt-28 border-t border-border pt-10">
              <p className="eyebrow text-primary">Local resources</p>
              <h2 className="mt-3 font-display text-4xl">County offices and records</h2>
              <div className="mt-6 grid gap-4 rounded-md border border-border p-5 text-sm">
                <ExternalResource href={county.links.propertySearchUrl}>Property search</ExternalResource>
                <ExternalResource href={county.links.gisUrl}>GIS or parcel map</ExternalResource>
                <ExternalResource href={localDirectoryUrl}>Official county website or directory</ExternalResource>
              </div>
            </section>

            <section id="faq" className="mt-14 scroll-mt-28 border-t border-border pt-10">
              <p className="eyebrow text-primary">FAQ</p>
              <h2 className="mt-3 font-display text-4xl">Common county property-tax questions</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <details className="py-5"><summary className="cursor-pointer font-display text-xl">Does {county.name} set one property-tax rate?</summary><p className="mt-3 text-sm leading-7 text-muted-foreground">No. The total rate depends on every taxing unit serving the exact property.</p></details>
                <details className="py-5"><summary className="cursor-pointer font-display text-xl">Who handles my appraisal?</summary><p className="mt-3 text-sm leading-7 text-muted-foreground">The county appraisal district handles property records, appraised values, exemptions and the protest process.</p></details>
                <details className="py-5"><summary className="cursor-pointer font-display text-xl">Who handles my payment?</summary><p className="mt-3 text-sm leading-7 text-muted-foreground">The tax assessor-collector or another collecting office handles bills and payments for the taxing units it serves.</p></details>
                <details className="py-5"><summary className="cursor-pointer font-display text-xl">Can two homes in {county.name} have different rates?</summary><p className="mt-3 text-sm leading-7 text-muted-foreground">Yes. City limits, school districts and special districts can produce different combined rates within the same county.</p></details>
              </div>
            </section>

            <section id="related" className="mt-14 scroll-mt-28 border-t-2 border-foreground pt-8">
              <p className="eyebrow text-primary">Related guides</p>
              <div className="mt-5 grid border-t border-border sm:grid-cols-2">
                {resourceLinks.map((item, index) => <Link key={item.to} to={item.to} className={`border-b border-border py-5 ${index % 2 === 0 ? 'sm:border-r sm:pr-6' : 'sm:pl-6'}`}><strong className="font-display text-xl hover:text-primary">{item.label}</strong></Link>)}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </article>
  );
}
