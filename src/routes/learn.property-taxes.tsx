import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PropertyTaxGuidePage } from '@/components/guides/PropertyTaxGuidePage';
import { Container } from '@/components/layout/Container';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/learn/property-taxes';
const description = 'Learn what Texas property taxes are, why they matter, who pays them, how local taxing units use them and which official records every property owner should review.';

export const Route = createFileRoute('/learn/property-taxes')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Property Taxes Without the Guesswork',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: Page,
});

function Page() {
  return <>
    <PropertyTaxGuidePage
      canonicalPath={canonicalPath}
      reviewedAt="August 6, 2026"
      eyebrow="Homeowner basics"
      title="Property taxes without the guesswork"
      intro="Property taxes are local taxes based on the value of property. They help pay for schools, roads, public safety and other community services. This guide begins with the essentials: what the tax is, why it matters, who pays it and which local office handles each part of the process."
      officialUrl="https://comptroller.texas.gov/taxes/property-tax/"
      officialLabel="See the Texas Comptroller’s property-tax guidance"
      sections={[
        {
          title: 'What are Texas property taxes?',
          paragraphs: [
            'Texas does not impose a state property tax. Property taxes are set and collected locally by taxing units such as counties, school districts, cities and special-purpose districts. The money stays in the local system and supports services such as public schools, streets and roads, police and fire protection, libraries, hospitals, flood control and other community needs.',
            'Property tax is an ad valorem tax, meaning it is measured according to value. The amount due is generally determined by applying the tax rates adopted by the taxing units serving the property to the property’s taxable value after any exemptions or other adjustments.',
            'More than one taxing unit may apply to the same address. A home may be inside a county, school district, city, municipal utility district, emergency-services district, hospital district or community-college district at the same time. That is why two similarly priced homes can have different total tax bills.'
          ],
        },
        {
          title: 'Why property taxes matter',
          paragraphs: [
            'For many Texas homeowners, property taxes are one of the largest recurring costs of owning a home. They can affect the monthly mortgage payment when a lender collects taxes through escrow, the true cost of buying in a particular neighborhood and the amount a household needs to reserve each year.',
            'Property taxes also affect decisions after purchase. A homeowner may need to claim an exemption, correct ownership or property details, compare the appraised value with market evidence, protest an appraisal or contact the collecting office about payment options.',
            'A seller’s tax bill is not a dependable forecast for a buyer. Ownership changes can affect exemptions and appraisal limits, and the final bill depends on the exact taxing units and rates attached to the property.'
          ],
        },
        {
          title: 'Who pays property taxes?',
          paragraphs: [
            'Owners of taxable real property generally pay property taxes. This includes homeowners, landowners, rental-property owners and commercial-property owners. Certain business personal property can also be taxable under Texas law.',
            'A mortgage company may collect money through an escrow account and send the payment to the tax office, but the tax is still tied to the property owner and the property. Owners should review the actual tax statement even when a lender handles payment.',
            'Some property is fully or partly exempt, and some land can qualify for special appraisal. Eligibility is determined under Texas law and administered locally, usually by the county appraisal district.'
          ],
        },
        {
          title: 'The two numbers behind the bill',
          paragraphs: [
            'The tax bill depends mainly on taxable value and local tax rates. The appraisal district determines the property value used for taxation and processes exemptions and special-appraisal applications. The governing body of each local taxing unit adopts its own tax rate.',
            'The collecting office applies the adopted rates to the taxable value shown on the certified appraisal roll. In many counties, the county tax assessor-collector collects for several taxing units, although some units collect separately.'
          ],
        },
        {
          title: 'Key takeaways',
          paragraphs: [
            'Texas has no state property tax; local taxing units set rates and collect the revenue.',
            'Your bill is not based on value alone. Taxable value, exemptions and every local tax rate attached to the address all matter.',
            'The appraisal district handles values, property records, exemptions and protests. The collecting tax office handles bills, receipts and payment questions for the units it serves.',
            'Review the appraisal notice and tax statement every year, even when a mortgage company pays through escrow.',
            'Property owners have rights to notice and to protest certain appraisal-district actions. Deadlines matter, so use the date printed on the local notice rather than relying only on a general calendar.'
          ],
        },
        {
          title: 'Common misconceptions',
          paragraphs: [
            'No state income tax does not mean no property tax. Texas relies heavily on locally imposed property taxes to fund schools and local services.',
            'The appraisal district does not set the tax rates. It appraises property and administers exemptions and protests; local elected governing bodies adopt rates.',
            'A rise in market value does not always produce the same percentage increase in the final bill. Exemptions, appraisal limits and changing tax rates can affect taxable value and the amount due.',
            'A countywide average tax rate is not a substitute for the exact records attached to one property. Special districts and overlapping jurisdictions can materially change the total rate.'
          ],
        },
        {
          title: 'The appraisal district: values, records and exemptions',
          paragraphs: [
            'Each Texas county has an appraisal district responsible for appraising taxable property within the county. The district determines value as of January 1, maintains the appraisal records used by local taxing units and processes applications for exemptions, special appraisals and other forms of tax relief.',
            'The chief appraiser administers the appraisal office. Questions about market value, property characteristics, ownership records, exemption applications, agricultural or special appraisal and the appraisal methods used on an account should be directed to the appraisal district.',
            'An appraisal district does not adopt the tax rates shown on a bill and does not decide how a city, school district or other taxing unit spends its revenue.'
          ],
        },
        {
          title: 'Local taxing units: budgets and tax rates',
          paragraphs: [
            'Counties, cities, school districts, junior-college districts and special-purpose districts are examples of local taxing units. Each unit adopts a budget and then sets a property-tax rate through its own public process.',
            'One address can be served by several taxing units at the same time. The total rate on the final bill is the combination of the rates adopted by the units that have jurisdiction over that property.',
            'Questions about a unit’s budget, proposed rate, adopted rate or the services funded by that rate belong with the individual taxing unit rather than the appraisal district.'
          ],
        },
        {
          title: 'The appraisal review board: hearing disputes',
          paragraphs: [
            'The appraisal review board, commonly called the ARB, is a separate board of local residents that hears disagreements between property owners and the appraisal district. It can hear protests involving value, unequal appraisal, denied exemptions and other actions that Texas law allows a property owner to challenge.',
            'The ARB does not set tax rates or collect tax bills. Its role is to resolve appraisal-related disputes after a property owner files a timely protest and follows the local hearing process.',
            'If an owner disagrees with the ARB’s order, additional appeal options may be available depending on the property and issue. Those options can include binding arbitration, an appeal to the State Office of Administrative Hearings for qualifying property or a lawsuit in district court.'
          ],
        },
        {
          title: 'The collecting office: bills, receipts and payments',
          paragraphs: [
            'In many counties, the county tax assessor-collector collects property taxes for several local taxing units. Some taxing units collect their own taxes or contract with another office, so the collecting office named on the tax statement is the correct starting point.',
            'Questions about the amount billed, payment methods, tax receipts, tax certificates, delinquency, installment options or payment agreements generally belong with the collecting office serving the taxing unit.',
            'The collecting office uses the certified taxable value and the rates adopted by local taxing units. It does not ordinarily decide the underlying appraised value or whether an exemption should have been approved.'
          ],
        },
        {
          title: 'The Texas Comptroller: guidance and oversight',
          paragraphs: [
            'The Texas Comptroller’s Property Tax Assistance Division provides education, forms, statewide information, studies and oversight for the local property-tax system. It reviews appraisal-district performance and conducts property-value studies used in the school-finance system.',
            'The Comptroller does not appraise an individual property, approve a local exemption, set a local tax rate, collect a local property-tax bill or replace the local protest process.',
            'Most account-specific questions must be handled by the appraisal district, the appraisal review board, the collecting office or the taxing unit responsible for the decision.'
          ],
        },
        {
          title: 'Use the office responsible for the decision',
          paragraphs: [
            'Send value, exemption, ownership-record and protest questions to the appraisal district. Send billing, receipt, payment and delinquency questions to the collecting office. Send budget and tax-rate questions to the governing body of the taxing unit.',
            'Using the correct office matters most near a deadline. A payment clerk cannot change an appraisal, and an appraiser generally cannot extend a payment deadline shown on a tax bill.'
          ],
        },
        {
          title: 'The year in a few steps',
          paragraphs: [
            'Appraisal districts value taxable property as of January 1. Notices are generally delivered in the spring when required, most protests are due by May 15 or the applicable notice-based deadline, appraisal rolls are certified later in the year, local governments adopt rates and tax bills usually follow in the fall.',
          ],
          steps: [
            'Check the appraisal notice and property details.',
            'Make sure ownership and exemptions are correct.',
            'Compare the proposed value with useful market evidence.',
            'File a protest before the deadline when something needs correcting.',
            'Review the adopted rates and final bill.',
          ],
        },
      ]}
    />

    <Container className="pb-16 sm:pb-24">
      <section className="mx-auto max-w-4xl rounded-md border border-border p-6">
        <p className="eyebrow text-primary">Where we check the details</p>
        <h2 className="mt-2 font-display text-2xl">Check the rule at the source</h2>
        <div className="mt-4 grid gap-3 text-sm">
          <a className="font-medium text-primary underline" href="https://comptroller.texas.gov/taxes/property-tax/basics.php" target="_blank" rel="noreferrer noopener">Texas Comptroller: Property Tax System Basics</a>
          <a className="font-medium text-primary underline" href="https://comptroller.texas.gov/taxes/property-tax/county-directory/" target="_blank" rel="noreferrer noopener">Texas Comptroller: Local Appraisal District and Tax Office Directory</a>
          <a className="font-medium text-primary underline" href="https://comptroller.texas.gov/taxes/property-tax/board-of-directors/" target="_blank" rel="noreferrer noopener">Texas Comptroller: Appraisal District Board of Directors</a>
          <a className="font-medium text-primary underline" href="https://comptroller.texas.gov/taxes/property-tax/about.php" target="_blank" rel="noreferrer noopener">Texas Comptroller: Property Tax Assistance Division</a>
          <a className="font-medium text-primary underline" href="https://comptroller.texas.gov/taxes/property-tax/bill-of-rights.php" target="_blank" rel="noreferrer noopener">Texas Comptroller: Property Taxpayers’ Bill of Rights</a>
        </div>
      </section>
    </Container>

    <Container className="pb-16 sm:pb-24">
      <section className="mx-auto max-w-4xl rounded-md border border-border p-6">
        <p className="eyebrow text-primary">What to do next</p>
        <h2 className="mt-2 font-display text-2xl">Understand the values on your notice</h2>
        <p className="mt-3 text-muted-foreground">Next, look at market value, appraised value, assessed value and taxable value—four numbers that are related but not interchangeable.</p>
        <Link to="/decide/property-taxes" className="mt-4 inline-block font-medium text-primary underline">Estimate your property taxes</Link>
      </section>
    </Container>
  </>;
}
