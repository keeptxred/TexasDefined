import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { Container } from '@/components/layout/Container';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A plain-English guide to appraisals, exemptions, protests, local tax rates, special districts, payment deadlines, and the records Texas homeowners should check.';

export const Route = createFileRoute('/learn/property-taxes')({
  head: () => ({ meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/learn/property-taxes',
      title: 'Texas Property Taxes', description }),
    links: [canonicalLink(texasDefinedBrand, '/learn/property-taxes')] }),
  component: Page,
});

function Page() {
  return <>
    <PropertyTaxGuidePage eyebrow="Home and property" title="Property Taxes Without the Guesswork" intro={description} officialUrl="https://comptroller.texas.gov/taxes/property-tax/" officialLabel="Check the Texas Comptroller guidance" sections={[
      { title: 'Who does what', paragraphs: ['Your county appraisal district determines the property value used for taxes. Cities, counties, school districts and special districts set their own tax rates. The tax office then applies those rates after exemptions.', 'That division matters: value questions go to the appraisal district, while payment and billing questions usually go to the collecting tax office.'] },
      { title: 'The year at a glance', paragraphs: ['Appraisal notices generally arrive in spring, protests follow local deadlines, appraisal rolls are certified later in the year, local governments adopt rates, and tax bills usually arrive in the fall.'], steps: ['Check the appraisal notice and property details.', 'Make sure ownership and exemptions are correct.', 'Compare the proposed value with useful market evidence.', 'File a protest before the deadline when something needs correcting.', 'Review the adopted rates and final bill.'] },
      { title: 'Value, exemptions and caps', paragraphs: ['Market value, appraised value and taxable value are connected, but they are not always the same number. Exemptions can reduce taxable value, while certain appraisal limits may slow annual increases after eligibility requirements are met.', 'A seller’s tax bill is not a reliable forecast for a buyer. Exemptions and capped values may change after a sale.'] },
      { title: 'Why one address can have so many rates', paragraphs: ['A single property can be taxed by a school district, county, city, municipal utility district, emergency-services district, hospital district, college district and other local units.', 'Use the exact property account and official local records instead of a countywide average.'] },
      { title: 'When the bill comes due', paragraphs: ['The tax statement shows who collects the bill, how much is owed and when it becomes delinquent. Penalties and interest can grow after that date, so contact the collecting office early when full payment may be difficult.'] },
    ]} />
    <Container className="pb-16 sm:pb-24"><section className="mx-auto max-w-4xl rounded-md border border-border p-6"><p className="eyebrow text-primary">Next step</p><h2 className="mt-2 font-display text-2xl">Paying the bill and handling problems</h2><p className="mt-3 text-muted-foreground">Understand deadlines, escrow, installment options, deferrals, penalties, payment agreements, liens and tax sales before they become surprises.</p><Link to="/learn/property-tax-payments" className="mt-4 inline-block font-medium text-primary underline">Read the payment guide</Link></section></Container>
  </>;
}
