import { Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';

const description = 'Texas vehicle registration fees, title charges, EV fees, sales and use tax, new-resident tax, gift tax and standard presumptive value explained.';
const reviewedDate = 'September 14, 2026';

const commonFees = [
  ['Cars and light trucks', '$50.75 base registration fee, plus $1 for TexasSure'],
  ['Pickup trucks 6,001–10,000 lb.', '$54 base registration fee'],
  ['Trailers up to 6,000 lb.', '$45 base registration fee'],
  ['Motorcycles and mopeds', '$30 base registration fee'],
  ['Title application', '$28 or $33, depending on county'],
  ['Local county fees', 'Vary by county; TxDMV lists up to $31.50 in common new-resident transactions'],
  ['Processing and handling', '$4.75'],
  ['Inspection replacement fee', '$7.50 for many annual non-commercial registrations'],
  ['New two-year vehicle inspection replacement fee', '$16.75'],
  ['Fully electric vehicle fee', '$200 annually; $400 with a qualifying initial two-year registration'],
] as const;

const faq = [
  {
    question: 'What is the standard Texas registration fee for a passenger vehicle?',
    answer: 'TxDMV lists a $50.75 base registration fee for cars and light trucks plus $1 for TexasSure, before local, inspection-related, processing, plate or electric-vehicle charges.',
  },
  {
    question: 'What is the Texas motor vehicle sales-tax rate?',
    answer: 'The Texas Comptroller lists a 6.25% motor vehicle sales-tax rate. Dealer trade-ins and private-party standard presumptive value rules can change the taxable amount.',
  },
  {
    question: 'What does a qualifying new Texas resident pay on a vehicle already owned?',
    answer: 'The Texas Comptroller lists a $90 new-resident tax in lieu of use tax when the statutory new-resident requirements are met and the vehicle was previously registered in the resident’s name outside Texas.',
  },
  {
    question: 'How is a private-party vehicle purchase taxed in Texas?',
    answer: 'Standard presumptive value rules generally tax a qualifying private-party purchase on the greater of the actual sales price or 80% of the vehicle’s SPV unless an allowed exception or timely certified appraisal applies.',
  },
  {
    question: 'How much is Texas motor vehicle gift tax?',
    answer: 'The Comptroller lists a $10 gift tax for qualifying transfers to eligible recipients. Transfers that do not qualify as gifts can instead be treated as taxable sales.',
  },
];

export function VehicleRegistrationFeesTaxesPage() {
  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-dmv">Texas DMV</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-vehicle-registration">Vehicle registration</Link><span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Fees & taxes</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas driving costs</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas vehicle registration fees and taxes</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          </div>
          <div className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">
            <p className="font-semibold text-foreground">Reviewed {reviewedDate}</p>
            <p className="mt-2">Use these figures for planning, then confirm the exact amount with TxDMV, the Texas Comptroller and the county tax assessor-collector handling the transaction.</p>
          </div>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Common charges</p><h2 className="mt-2 font-display text-3xl">What can appear on the bill</h2></div>
          <div>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">The final total depends on vehicle type and weight, county, title transaction, inspection status, plate choice, tax treatment and payment method. These are current statewide or commonly listed TxDMV amounts, not a guaranteed quote for a specific vehicle.</p>
            <div className="mt-6 overflow-x-auto border border-border">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="border-b border-border bg-muted/40"><tr><th className="px-4 py-3">Charge</th><th className="px-4 py-3">Current planning amount</th></tr></thead>
                <tbody className="divide-y divide-border">{commonFees.map(([name, amount]) => <tr key={name}><td className="px-4 py-3 font-semibold text-foreground">{name}</td><td className="px-4 py-3 text-muted-foreground">{amount}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Sales & use tax</p><h2 className="mt-2 font-display text-3xl">The 6.25% rate is only the starting point</h2></div>
          <div className="space-y-5 text-base leading-7 text-muted-foreground">
            <p>The Texas Comptroller lists a 6.25% motor vehicle sales-tax rate. For a dealer purchase, a qualifying motor-vehicle trade-in can reduce the taxable sales price. For a Texas resident bringing in a vehicle purchased in another state, use tax can apply at 6.25%, with allowable credit for qualifying tax paid to another state.</p>
            <p>Do not assume that every amount on a dealer contract is part of the taxable vehicle price. Title, registration and other separately stated charges can be treated differently. For a specific deal, use the Comptroller&apos;s current guidance or professional tax advice rather than estimating from the sticker price alone.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Private sales</p><h2 className="mt-2 font-display text-3xl">Standard presumptive value can control the taxable amount</h2></div>
          <div className="space-y-5 text-base leading-7 text-muted-foreground">
            <p>For many private-party used-vehicle purchases, Texas does not automatically accept a low bill-of-sale amount as the tax base. The Comptroller says tax is generally calculated on the greater of the actual sales price or 80% of the vehicle&apos;s standard presumptive value (SPV), unless an exception applies.</p>
            <p>A timely certified appraisal can establish a different taxable value in qualifying cases. SPV does not apply to every transfer; dealer sales, salvage vehicles, eligible gifts, qualifying even trades and several other categories are treated differently.</p>
            <a className="inline-block font-semibold underline decoration-primary/50 underline-offset-4" href="https://comptroller.texas.gov/taxes/motor-vehicle/private-party-spv.php" target="_blank" rel="noreferrer noopener">Texas Comptroller: Private-party purchases and SPV ↗</a>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">New residents</p><h2 className="mt-2 font-display text-3xl">The $90 new-resident tax has specific eligibility rules</h2></div>
          <div className="space-y-5 text-base leading-7 text-muted-foreground">
            <p>A qualifying new Texas resident generally pays a $90 new-resident tax instead of the 6.25% use tax when the vehicle was purchased outside Texas and was previously registered in that resident&apos;s name in another state or foreign country. The Comptroller&apos;s rules distinguish that situation from a vehicle purchased after the move or a vehicle not previously registered in the new resident&apos;s name.</p>
            <p>The tax is paid to the county tax assessor-collector as part of the title and/or registration transaction. Timing and military rules can differ, so confirm eligibility rather than assuming every out-of-state vehicle qualifies for the $90 treatment.</p>
            <Link className="inline-block font-semibold underline decoration-primary/50 underline-offset-4" to="/moving-to-texas">See the broader Moving to Texas guide</Link>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Gifts & exchanges</p><h2 className="mt-2 font-display text-3xl">A no-cost transfer is not automatically a $10 gift</h2></div>
          <div className="space-y-5 text-base leading-7 text-muted-foreground">
            <p>The Texas Comptroller lists a $10 gift tax when a vehicle is transferred without consideration to an eligible recipient under the motor-vehicle gift rules. Eligible relationships and qualifying nonprofit or trust transfers are specifically defined. Transfers that do not satisfy the gift rules can instead be treated as taxable sales and may be subject to SPV.</p>
            <p>The Comptroller also lists a $5 tax for qualifying even exchanges. Estate transfers received on or after September 1, 2025 have separate treatment under updated Texas law, so inherited vehicles should be checked against the current estate-transfer guidance rather than ordinary gift rules.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Electric vehicles</p><h2 className="mt-2 font-display text-3xl">Texas adds an EV registration fee</h2></div>
          <div className="space-y-5 text-base leading-7 text-muted-foreground">
            <p>TxDMV lists an additional $200 annual registration fee for fully electric cars and trucks with a gross vehicle weight of 10,000 pounds or less. A qualifying new electric vehicle receiving an initial two-year registration is assessed $400. Standard registration and other applicable charges still apply.</p>
            <p>The fee does not apply merely because a vehicle is a hybrid. Confirm how TxDMV classifies the vehicle before budgeting the transaction.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Frequently asked</p><h2 className="mt-2 font-display text-3xl">Fee and tax questions</h2></div>
          <div className="divide-y divide-border border-y border-border">{faq.map((item) => <details key={item.question} className="py-5"><summary className="cursor-pointer font-semibold text-foreground">{item.question}</summary><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{item.answer}</p></details>)}</div>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Official sources</p><h2 className="mt-2 font-display text-3xl">Confirm the transaction before paying</h2></div>
          <div className="space-y-3 text-sm leading-6">
            <a className="block font-semibold underline decoration-primary/50 underline-offset-4" href="https://www.txdmv.gov/motorists/register-your-vehicle" target="_blank" rel="noreferrer noopener">TxDMV: Registration fees and vehicle registration ↗</a>
            <a className="block font-semibold underline decoration-primary/50 underline-offset-4" href="https://comptroller.texas.gov/taxes/motor-vehicle/sales-use.php" target="_blank" rel="noreferrer noopener">Texas Comptroller: Motor vehicle sales and use tax ↗</a>
            <a className="block font-semibold underline decoration-primary/50 underline-offset-4" href="https://comptroller.texas.gov/taxes/motor-vehicle/private-party-spv.php" target="_blank" rel="noreferrer noopener">Texas Comptroller: Private-party purchases and SPV ↗</a>
            <a className="block font-semibold underline decoration-primary/50 underline-offset-4" href="https://comptroller.texas.gov/taxes/publications/96-254/new-resident-tax.php" target="_blank" rel="noreferrer noopener">Texas Comptroller: New-resident tax ↗</a>
            <a className="block font-semibold underline decoration-primary/50 underline-offset-4" href="https://comptroller.texas.gov/taxes/publications/96-254/gift.php" target="_blank" rel="noreferrer noopener">Texas Comptroller: Motor vehicle gift tax ↗</a>
            <p className="pt-2 text-muted-foreground">For an exact quote, use the county tax assessor-collector handling the title or registration transaction. County charges and payment methods vary.</p>
          </div>
        </section>
      </article>
    </Container>
  );
}
