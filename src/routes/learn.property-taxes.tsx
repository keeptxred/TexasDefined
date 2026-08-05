import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { Container } from '@/components/layout/Container';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Understand Texas property appraisals, exemptions, protests, local tax rates, special districts, payment deadlines, and the records homeowners should verify.';

export const Route = createFileRoute('/learn/property-taxes')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/learn/property-taxes',
      title: 'Texas Property Taxes', description }),
    links: [canonicalLink(texasDefinedBrand, '/learn/property-taxes')] }),
  component: Page,
});

function Page() {
  return <>
    <PropertyTaxGuidePage eyebrow="Texas Home & Property" title="Texas Property Taxes: The Complete Guide" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/" officialLabel="Texas Comptroller property-tax guidance" sections={[
      { title: 'How the system works', paragraphs: ['Local appraisal districts determine taxable property values, while cities, counties, school districts and special districts adopt tax rates. Tax offices apply those rates to taxable values after exemptions.', 'The appraisal district does not set the tax rate, and a taxing unit does not independently decide the property appraisal. Understanding that split helps you contact the correct office.'] },
      { title: 'The annual property-tax cycle', paragraphs: ['Appraisal notices generally arrive in spring, protests follow local deadlines, appraisal rolls are certified later in the year, taxing units adopt rates, and tax bills are commonly mailed in the fall.'], steps: ['Review the appraisal notice and property characteristics.', 'Confirm exemptions and ownership information.', 'Compare the proposed value with relevant market evidence.', 'File a timely protest when correction is needed.', 'Review adopted rates and the final tax statement.'] },
      { title: 'Taxable value and exemptions', paragraphs: ['Market value, appraised value and taxable value are related but are not always identical. Exemptions reduce taxable value for qualifying taxing units, and appraisal limitations may restrict annual growth after eligibility requirements are met.', 'A seller’s taxable value may not predict a buyer’s future bill because exemptions and capped values may not transfer.'] },
      { title: 'Rates, MUDs and special districts', paragraphs: ['The combined rate for one address can include a school district, county, city, municipal utility district, emergency-services district, hospital district, college district and other units.', 'Use the exact parcel and official local records rather than a countywide average.'] },
      { title: 'Payments and delinquency', paragraphs: ['Tax statements identify the collecting office, amount due and delinquency date. Penalties and interest can grow after delinquency, so owners who cannot pay should contact the collecting office promptly about available options.'] },
    ]} />
    <Container className="pb-16 sm:pb-24"><section className="mx-auto max-w-4xl rounded-md border border-border p-6"><p className="eyebrow text-primary">Continue this guide</p><h2 className="mt-2 font-display text-2xl">Payments, escrow, delinquency and collections</h2><p className="mt-3 text-muted-foreground">Review payment deadlines, mortgage escrow, installment options, deferrals, penalties, payment agreements, waivers, liens and tax sales.</p><Link to="/learn/property-tax-payments" className="mt-4 inline-block font-medium text-primary underline">Open the Texas property-tax payments guide</Link></section></Container>
  </>;
}
