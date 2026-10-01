import { Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';

export const PROPERTY_TAX_HUB_FAQS = [
  { question: 'How do Texas property taxes work?', answer: 'Local appraisal districts determine property values, exemptions reduce taxable value when a property qualifies, and local taxing units such as counties, cities, school districts and special districts adopt tax rates. The bill depends on the taxable value and the rates for the exact taxing units serving the property.' },
  { question: 'Does Texas have one statewide property-tax rate?', answer: 'No. Texas does not impose a statewide property tax. Local taxing units adopt their own rates, so two homes with the same value can have different bills depending on their county, city, school district and special districts.' },
  { question: 'What is the Texas homestead exemption for school taxes in 2026?', answer: 'Texas law requires school districts to provide a $140,000 residence-homestead exemption. Other taxing units may offer additional local-option exemptions, so the taxable value can differ by taxing unit.' },
  { question: 'Does the 10% homestead cap mean my tax bill can only rise 10%?', answer: 'No. The limitation applies to the appraised value of a qualifying residence homestead under statutory conditions, not directly to the final tax bill. Taxable value, exemptions, tax rates, new improvements and special-district changes can all affect the bill.' },
  { question: 'When is the usual Texas property-tax protest deadline?', answer: 'In most cases, the deadline is May 15 or 30 days after the appraisal district mails the notice of appraised value, whichever is later. Special situations can have different deadlines, so verify the date shown by your appraisal district.' },
  { question: 'When are Texas property taxes normally due?', answer: 'In most cases, property taxes must be paid by January 31. Taxes unpaid on February 1 are generally delinquent, although a later-mailed bill can postpone the delinquency date.' },
  { question: 'Where do I file a homestead exemption?', answer: 'File with the appraisal district for the county where the property is located. The appraisal district chief appraiser determines whether the property qualifies.' },
  { question: 'What is the general exemption application deadline?', answer: 'The general deadline for filing many property-tax exemption applications is before May 1, although Texas law allows different timing in some situations and some exemptions may be filed late. Check the specific exemption and your appraisal district.' },
  { question: 'What is the difference between market value, appraised value and taxable value?', answer: 'Market value is the appraisal district’s estimate of what the property would sell for under statutory standards. Appraised value is the value after applicable appraisal limitations or special appraisal rules. Taxable value is the amount remaining after applicable exemptions for a particular taxing unit.' },
  { question: 'How do I find my appraisal district?', answer: 'Start with the county where the property is located. Texas Defined’s county and property-tax directories link homeowners to local appraisal, protest, exemption and payment resources.' },
  { question: 'Can I protest only because I think my tax bill is too high?', answer: 'A protest is generally directed at an appraisal-district action such as appraised value, unequal appraisal, exemption denial or another protestable matter. Tax rates are adopted separately by taxing units.' },
  { question: 'What evidence is useful in a property-tax protest?', answer: 'Useful evidence can include comparable sales, condition photographs, repair estimates, appraisal-district records, closing documents, surveys and other information relevant to the issue being protested. The best evidence depends on the protest ground.' },
  { question: 'What is a MUD tax?', answer: 'A municipal utility district is a special-purpose district that may levy property taxes in addition to county, city and school-district taxes. MUD rates can materially affect the total annual cost of owning a property.' },
  { question: 'Do age-65 homeowners receive additional property-tax relief?', answer: 'Texas provides additional property-tax provisions for qualifying age-65-or-older homeowners, including additional exemptions and a school-tax ceiling, with other local options and payment or deferral provisions potentially available.' },
  { question: 'Do disabled veterans receive Texas property-tax exemptions?', answer: 'Texas provides several property-tax exemptions for qualifying disabled veterans and certain surviving spouses. Eligibility and exemption amount depend on the specific statutory provision and disability circumstances.' },
  { question: 'How do agricultural and wildlife-management valuations work?', answer: 'Qualifying land may be appraised under special productivity-based rules rather than ordinary market-value treatment. Qualification depends on statutory requirements, local standards, timely applications and continued qualifying use.' },
  { question: 'Why can the seller’s tax bill be misleading when I buy a home?', answer: 'The seller may have exemptions, appraisal limitations or special circumstances that will not carry over to the buyer. A buyer should model the property using the expected post-purchase taxable value and the exact taxing units that apply to the address.' },
  { question: 'Are Texas Defined estimates official tax bills?', answer: 'No. Texas Defined provides educational guides and planning tools. Appraisal districts, appraisal review boards, taxing units and tax assessor-collectors control official values, exemptions, rates, decisions and bills.' },
] as const;

const quickActions = [
  { to: '/texas-property-tax-estimator', label: 'Estimate my property taxes', body: 'Build a parcel scenario from county, school, city and special-district rates.' },
  { to: '/find-my-county', label: 'Find my county', body: 'Start from an address when you are not sure which county controls the local property records.' },
  { to: '/property-tax/counties', label: 'Open county tax resources', body: 'Find verified local property-tax guides where available, plus county research and calculator paths statewide.' },
  { to: '/do/homestead-exemption', label: 'File or check homestead', body: 'Review eligibility, filing, appraisal limitations and the documents you may need.' },
  { to: '/do/property-tax-protest', label: 'Protest my appraisal', body: 'Check the deadline, protest grounds, evidence and appraisal review board process.' },
  { to: '/learn/property-tax-payments', label: 'Understand or pay my bill', body: 'Learn billing, payment, escrow, delinquency and installment basics.' },
  { to: '/learn/property-tax-deadlines', label: 'Check property-tax deadlines', body: 'See the dates that control exemptions, protests, bills and payment decisions.' },
  { to: '/property-tax-calculators', label: 'Use all tax calculators', body: 'Compare rates, exemptions, protests, escrow and ownership scenarios.' },
] as const;

const howItWorks = [
  ['01', 'Your appraisal district values the property', 'The county appraisal district determines market value and applies qualifying appraisal limitations or special appraisal rules.'],
  ['02', 'Exemptions reduce taxable value', 'Residence homestead, age-65, disability, disabled-veteran and other exemptions can reduce taxable value for the taxing units to which they apply.'],
  ['03', 'You can challenge appraisal-district actions', 'A property owner can protest value, unequal appraisal, exemption decisions and other eligible matters through the appraisal review board process.'],
  ['04', 'Local taxing units adopt their rates', 'Counties, cities, school districts, MUDs and other special districts set rates separately. There is no single Texas property-tax rate.'],
  ['05', 'Your bill combines the applicable units', 'The tax office calculates the bill from each taxing unit’s taxable value and rate. The exact address determines which local units belong in the stack.'],
] as const;

const reliefGuides = [
  { to: '/do/homestead-exemption', label: 'Residence homestead', body: 'School districts must provide a $140,000 residence-homestead exemption; local taxing units may provide additional exemptions.' },
  { to: '/learn/over-65-property-tax-guide', label: 'Age 65 or older', body: 'Review additional exemptions, the school-tax ceiling, installments and deferral rules that may apply.' },
  { to: '/learn/disabled-veteran-property-tax-benefits', label: 'Disabled veterans', body: 'Understand the exemption paths available to qualifying disabled veterans and certain surviving spouses.' },
  { to: '/learn/agricultural-valuation', label: 'Agricultural valuation', body: 'Learn how qualifying open-space land can be appraised under productivity rules.' },
  { to: '/learn/wildlife-management-valuation', label: 'Wildlife management', body: 'See how qualifying land may continue special appraisal when converted to wildlife-management use.' },
] as const;

const calculators = [
  { to: '/texas-property-tax-estimator', label: 'Official-rate property-tax estimator', body: 'Select the actual local taxing units serving a parcel and model the annual bill.' },
  { to: '/texas-property-tax-bill-breakdown', label: 'Tax-bill breakdown', body: 'See how much each selected taxing unit contributes to the combined bill.' },
  { to: '/texas-property-tax-county-comparison-calculator', label: 'Location comparison', body: 'Compare two local tax stacks instead of relying on countywide averages.' },
  { to: '/texas-property-tax-rate-history', label: 'Rate-history explorer', body: 'Review retained annual rates for counties, cities, school districts and special districts.' },
  { to: '/texas-mud-tax-impact-calculator', label: 'MUD / special-district impact', body: 'Measure the annual, monthly and long-term effect of a special-district rate.' },
  { to: '/texas-homeownership-cost-calculator', label: 'Homeownership-cost calculator', body: 'Combine property taxes with insurance, financing and recurring ownership costs.' },
] as const;

const calendar = [
  { date: 'January 31', title: 'Usual last day to pay before delinquency', body: 'For most normally mailed bills, taxes must be paid by January 31. Confirm the delinquency date printed on the bill.' },
  { date: 'February 1', title: 'Taxes generally become delinquent', body: 'Penalty and interest generally begin when taxes become delinquent. Later-mailed bills can have a postponed delinquency date.' },
  { date: 'Before May 1', title: 'General exemption filing deadline', body: 'Many exemption applications use this general deadline, but specific exemptions and late-filing rules can differ.' },
  { date: 'May 15 or later', title: 'Usual appraisal protest deadline', body: 'The common deadline is May 15 or 30 days after the appraisal district mails the notice of appraised value, whichever is later.' },
  { date: 'Spring–summer', title: 'ARB hearings and appraisal-roll work', body: 'Appraisal review boards hear protests and appraisal districts complete the appraisal roll before taxing units adopt rates.' },
  { date: 'Late summer–fall', title: 'Tax-rate adoption and bills', body: 'Local taxing units adopt rates through their budget and tax-rate processes, and tax offices later send bills based on the finalized local stack.' },
] as const;

const guideGroups = [
  {
    title: 'Appraisal, protests and appeals',
    links: [
      ['/learn/appraisal-districts', 'Appraisal districts', 'Understand the local agency that values property and administers exemptions.'],
      ['/do/property-tax-protest', 'Property-tax protest', 'Prepare a timely protest and understand the ARB hearing process.'],
      ['/learn/property-tax-appeals-arbitration', 'Appeals and arbitration', 'Review paths available after an appraisal review board decision.'],
      ['/learn/property-tax-deadlines', 'Property-tax deadlines', 'Keep the major statutory dates in one place.'],
    ],
  },
  {
    title: 'Bills, rates and special districts',
    links: [
      ['/learn/property-taxes', 'How Texas property taxes work', 'Use the plain-English explainer for the statewide system from appraisal through payment.'],
      ['/learn/property-tax-payments', 'Property-tax payments', 'Understand bills, deadlines, escrow, delinquency and payment options.'],
      ['/learn/mud-taxes-explained', 'MUD taxes explained', 'Understand how utility-district taxes can change ownership cost.'],
      ['/property-tax-calculators', 'Property-tax calculator toolkit', 'Use the full set of Texas Defined tax-planning tools.'],
    ],
  },
  {
    title: 'Homebuyers and owners',
    links: [
      ['/learn/homebuyer-property-tax-checklist', 'Homebuyer property-tax checklist', 'Do not assume the seller’s current bill is your future bill.'],
      ['/buying-a-home-in-texas', 'Buying a home in Texas', 'Connect taxes to financing, insurance, closing and ownership costs.'],
      ['/texas-homeownership-cost-calculator', 'Homeownership-cost calculator', 'Plan beyond principal and interest.'],
      ['/browse/counties', 'Browse all 254 counties', 'Move from statewide guidance to the local offices and rates that control the address.'],
    ],
  },
] as const;

const officialSources = [
  ['Texas Comptroller — Property Tax Assistance', 'https://comptroller.texas.gov/taxes/property-tax/'],
  ['Texas Comptroller — Property Tax Exemptions', 'https://comptroller.texas.gov/taxes/property-tax/exemptions/'],
  ['Texas Comptroller — Appraisal Protests and Appeals', 'https://comptroller.texas.gov/taxes/property-tax/protests/'],
  ['Texas Comptroller — Property Tax Law Deadlines', 'https://comptroller.texas.gov/taxes/property-tax/calendars/deadlines.php'],
  ['Texas Comptroller — Paying Your Taxes', 'https://comptroller.texas.gov/taxes/property-tax/pay/'],
  ['Texas Comptroller — Valuing Property', 'https://comptroller.texas.gov/taxes/property-tax/valuing-property.php'],
] as const;

export function PropertyTaxHubPage() {
  return <article>
    <nav aria-label="Property section" className="border-b border-border bg-background">
      <Container className="flex gap-1 overflow-x-auto py-2 text-sm">
        <Link to="/property" className="whitespace-nowrap rounded-sm px-3 py-2 font-semibold text-muted-foreground hover:bg-surface hover:text-primary">Property home</Link>
        <Link to="/property-tax-guides" className="whitespace-nowrap rounded-sm bg-surface px-3 py-2 font-semibold text-primary">Tax hub</Link>
        <Link to="/property-tax/counties" className="whitespace-nowrap rounded-sm px-3 py-2 font-semibold text-muted-foreground hover:bg-surface hover:text-primary">Counties</Link>
        <Link to="/property-tax-calculators" className="whitespace-nowrap rounded-sm px-3 py-2 font-semibold text-muted-foreground hover:bg-surface hover:text-primary">Calculators</Link>
      </Container>
    </nav>

    <header className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden="true">/</li><li><Link to="/property" className="hover:text-foreground">Property</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-foreground">Texas Property Tax Guide</li></ol>
        </nav>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas property taxes · 2026</p>
            <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] tracking-tight text-foreground sm:text-7xl">Texas Property Tax Guide: Exemptions, Protests, Rates & Bills</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Understand how your appraisal becomes a tax bill, find the right local office, claim relief you may qualify for, challenge an appraisal on time, and use official-rate tools to estimate the cost for a specific Texas property.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link to="/texas-property-tax-estimator" className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Estimate my property taxes</Link><Link to="/find-my-county" className="rounded-sm border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground">Find my county</Link><Link to="/do/property-tax-protest" className="rounded-sm border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground">Check protest steps</Link></div>
          </div>
          <div className="rounded-md border border-border bg-background p-6">
            <p className="eyebrow text-primary">2026 quick facts</p>
            <dl className="mt-5 divide-y divide-border text-sm">
              <div className="py-3"><dt className="font-semibold text-foreground">School homestead exemption</dt><dd className="mt-1 leading-6 text-muted-foreground">$140,000 for a qualifying residence homestead.</dd></div>
              <div className="py-3"><dt className="font-semibold text-foreground">Usual protest deadline</dt><dd className="mt-1 leading-6 text-muted-foreground">May 15 or 30 days after the notice is mailed, whichever is later.</dd></div>
              <div className="py-3"><dt className="font-semibold text-foreground">Usual payment deadline</dt><dd className="mt-1 leading-6 text-muted-foreground">January 31; normally delinquent February 1.</dd></div>
              <div className="py-3"><dt className="font-semibold text-foreground">Statewide tax rate</dt><dd className="mt-1 leading-6 text-muted-foreground">None. Property taxes are imposed by local taxing units.</dd></div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">Reviewed October 1, 2026 against Texas Comptroller guidance. Always verify the exact deadline, exemption and tax bill with the responsible local office.</p>
          </div>
        </div>
      </Container>
    </header>

    <section className="border-b border-border bg-background"><Container className="py-12 sm:py-16"><p className="eyebrow text-primary">What do you need to do?</p><h2 className="mt-2 max-w-3xl font-display text-3xl sm:text-4xl">Jump directly to the task in front of you</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{quickActions.map(item => <Link key={item.to} to={item.to} className="group rounded-md border border-border p-5 transition-colors hover:border-primary/50 hover:bg-surface"><h3 className="font-display text-xl text-foreground group-hover:text-primary">{item.label}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Open →</span></Link>)}</div></Container></section>

    <Container className="py-14 sm:py-20"><div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16"><aside className="h-fit border-t-2 border-foreground pt-5 lg:sticky lg:top-28"><p className="eyebrow text-primary">On this page</p><nav className="mt-4 divide-y divide-border text-sm text-muted-foreground"><a href="#how-it-works" className="block py-3 hover:text-primary">How the system works</a><a href="#county" className="block py-3 hover:text-primary">Find local offices</a><a href="#relief" className="block py-3 hover:text-primary">Exemptions & relief</a><a href="#protests" className="block py-3 hover:text-primary">Appraisals & protests</a><a href="#rates" className="block py-3 hover:text-primary">Rates, MUDs & bills</a><a href="#calendar" className="block py-3 hover:text-primary">2026 calendar</a><a href="#calculators" className="block py-3 hover:text-primary">Calculators</a><a href="#library" className="block py-3 hover:text-primary">Deep-dive guides</a><a href="#faq" className="block py-3 hover:text-primary">FAQ</a><a href="#sources" className="block py-3 hover:text-primary">Official sources</a></nav></aside><div className="min-w-0">

      <section id="how-it-works" className="scroll-mt-28"><p className="eyebrow text-primary">The system in plain English</p><h2 className="mt-3 font-display text-4xl leading-tight text-foreground">How Texas property taxes work in five steps</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Texas property taxes are local. The appraisal district determines value, exemptions and appraisal limitations affect taxable value, and each local taxing unit adopts its own rate. Your final bill is the combination that applies to the exact property.</p><ol className="mt-8 grid gap-5 md:grid-cols-2">{howItWorks.map(([number,title,body]) => <li key={number} className="rounded-md border border-border p-6"><span className="eyebrow text-primary">{number}</span><h3 className="mt-2 font-display text-2xl text-foreground">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></li>)}</ol><div className="mt-6 rounded-md border border-primary/30 bg-primary/5 p-6"><h3 className="font-display text-2xl">Worked example: why one rate is not enough</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">A $400,000 residence may have different taxable values for the school district, county, city and special districts because exemptions differ by taxing unit. The parcel may also sit inside a MUD or another special district. That is why Texas Defined’s estimator asks for the actual local taxing-unit stack instead of applying one generic county rate.</p><Link to="/texas-property-tax-estimator" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Build an address-specific planning estimate →</Link></div></section>

      <section id="county" className="mt-16 scroll-mt-28 border-t border-border pt-10"><p className="eyebrow text-primary">Local first</p><h2 className="mt-3 font-display text-4xl leading-tight">Find the county, appraisal district and tax office</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">Property-tax administration starts locally. The appraisal district handles value and exemption administration; appraisal review boards hear protests; taxing units adopt rates; and tax assessor-collectors or other collectors send and collect bills. Start with the property’s county, then verify the exact offices and taxing units that serve the parcel.</p><div className="mt-7 grid gap-5 sm:grid-cols-3"><Link to="/find-my-county" className="rounded-md border border-border p-5"><h3 className="font-display text-xl">Find county by address</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the address-first county finder when you do not know the county.</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Find my county →</span></Link><Link to="/property-tax/counties" className="rounded-md border border-border p-5"><h3 className="font-display text-xl">County tax directory</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Open verified property-tax guides where available, plus county research and calculator paths statewide.</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Browse county tax resources →</span></Link><Link to="/browse/counties" className="rounded-md border border-border p-5"><h3 className="font-display text-xl">All 254 counties</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Move from the statewide hub into a county profile and local resources.</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Browse Texas counties →</span></Link></div></section>

      <section id="relief" className="mt-16 scroll-mt-28 border-t border-border pt-10"><p className="eyebrow text-primary">Exemptions & special appraisal</p><h2 className="mt-3 font-display text-4xl leading-tight">Reduce taxable value when you qualify</h2><p className="mt-5 text-base leading-8 text-muted-foreground">For 2026, Texas law requires school districts to provide a $140,000 residence-homestead exemption. Other taxing units may adopt local-option homestead exemptions, and separate provisions exist for qualifying age-65 homeowners, disabled persons, disabled veterans and certain land uses. The chief appraiser determines qualification.</p><div className="mt-7 grid gap-5 md:grid-cols-2">{reliefGuides.map(item => <Link key={item.to} to={item.to} className="rounded-md border border-border p-5"><h3 className="font-display text-xl">{item.label}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Read guide →</span></Link>)}</div><div className="mt-7 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Important:</strong> the homestead appraisal limitation is not a guarantee that the tax bill can rise only 10%. It limits qualifying appraised value under statutory rules; changing tax rates, exemptions, new improvements and other factors can still change the final bill.</div></section>

      <section id="protests" className="mt-16 scroll-mt-28 border-t border-border pt-10"><p className="eyebrow text-primary">Appraisal & protest</p><h2 className="mt-3 font-display text-4xl leading-tight">If the appraisal is wrong, act before the deadline</h2><p className="mt-5 text-base leading-8 text-muted-foreground">The usual Texas protest deadline is May 15 or 30 days after the appraisal district mails the notice of appraised value, whichever is later. A protest can address appraised value, unequal appraisal, exemption decisions and other eligible appraisal-district actions. Do not wait for the tax bill if the issue is the appraisal.</p><div className="mt-7 grid gap-5 md:grid-cols-2"><Link to="/do/property-tax-protest" className="rounded-md border border-border p-6"><h3 className="font-display text-2xl">Property-tax protest guide</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Work through grounds, evidence, filing, informal review and the appraisal review board hearing.</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Prepare a protest →</span></Link><Link to="/learn/property-tax-appeals-arbitration" className="rounded-md border border-border p-6"><h3 className="font-display text-2xl">After the ARB decision</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Review appeal and arbitration paths and the deadlines that may apply after an ARB order.</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Review appeal options →</span></Link></div><div className="mt-7 rounded-md bg-surface p-6"><h3 className="font-display text-2xl">Evidence checklist</h3><ul className="mt-4 grid gap-2 text-sm leading-7 text-muted-foreground sm:grid-cols-2"><li>Comparable sales or equity evidence</li><li>Photos showing condition or defects</li><li>Repair bids or contractor estimates</li><li>Appraisal-district property records</li><li>Closing documents or recent appraisal</li><li>Survey, measurements or factual corrections</li></ul></div></section>

      <section id="rates" className="mt-16 scroll-mt-28 border-t border-border pt-10"><p className="eyebrow text-primary">Rates, bills & special districts</p><h2 className="mt-3 font-display text-4xl leading-tight">The address determines the tax-rate stack</h2><p className="mt-5 text-base leading-8 text-muted-foreground">A countywide average is not an official parcel tax rate. A property can owe taxes to a county, school district, city, MUD, emergency-services district, hospital district, community-college district or other special-purpose unit. Each applicable unit can have its own taxable value and rate.</p><div className="mt-7 grid gap-5 md:grid-cols-3"><Link to="/learn/mud-taxes-explained" className="rounded-md border border-border p-5"><h3 className="font-display text-xl">MUD taxes</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Understand debt-supported utility-district taxes before buying or comparing neighborhoods.</p></Link><Link to="/learn/property-tax-payments" className="rounded-md border border-border p-5"><h3 className="font-display text-xl">Bills & payments</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Review payment deadlines, escrow, delinquency and qualifying installment options.</p></Link><Link to="/learn/homebuyer-property-tax-checklist" className="rounded-md border border-border p-5"><h3 className="font-display text-xl">Buying a home</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Rebuild the expected post-purchase bill instead of copying the seller’s current taxes.</p></Link></div></section>

      <section id="calendar" className="mt-16 scroll-mt-28 border-t border-border pt-10"><p className="eyebrow text-primary">2026 planning calendar</p><h2 className="mt-3 font-display text-4xl leading-tight">The dates homeowners should keep visible</h2><p className="mt-5 text-base leading-8 text-muted-foreground">Texas property-tax law contains many specialized deadlines. These are the major homeowner planning milestones; the controlling date for a specific property can differ, so verify notices and local-office instructions.</p><div className="mt-7 divide-y divide-border border-y border-border">{calendar.map(item => <div key={item.date} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]"><strong className="text-sm text-primary">{item.date}</strong><div><h3 className="font-semibold text-foreground">{item.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p></div></div>)}</div><Link to="/learn/property-tax-deadlines" className="mt-6 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open the full Texas property-tax deadline guide →</Link></section>

      <section id="calculators" className="mt-16 scroll-mt-28 border-t border-border pt-10"><p className="eyebrow text-primary">Planning tools</p><h2 className="mt-3 font-display text-4xl leading-tight">Use the exact local scenario instead of a generic rate</h2><p className="mt-5 text-base leading-8 text-muted-foreground">Texas Defined’s property-tax tools are designed around the fact that local taxing units vary by address. Use them for planning, then verify the final taxable values, rates and bill with the responsible local offices.</p><div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{calculators.map(item => <Link key={item.to} to={item.to} className="rounded-md border border-border p-5 transition-colors hover:border-primary/50"><h3 className="font-display text-xl">{item.label}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Open tool →</span></Link>)}</div><Link to="/property-tax-calculators" className="mt-6 inline-block text-sm font-semibold text-primary underline underline-offset-4">See the full property-tax calculator toolkit →</Link></section>

      <section id="library" className="mt-16 scroll-mt-28 border-t border-border pt-10"><p className="eyebrow text-primary">Deep-dive guides</p><h2 className="mt-3 font-display text-4xl leading-tight">Go deeper without losing the statewide context</h2><div className="mt-8 space-y-10">{guideGroups.map(group => <div key={group.title}><h3 className="font-display text-2xl">{group.title}</h3><div className="mt-4 grid gap-4 md:grid-cols-2">{group.links.map(([to,label,body]) => <Link key={to} to={to} className="rounded-md border border-border p-5"><strong className="font-display text-xl font-normal text-foreground">{label}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p><span className="mt-3 inline-block text-sm font-semibold text-primary">Read →</span></Link>)}</div></div>)}</div></section>

      <section id="faq" className="mt-16 scroll-mt-28 border-t border-border pt-10"><p className="eyebrow text-primary">Questions & answers</p><h2 className="mt-3 font-display text-4xl leading-tight">Texas property-tax FAQ</h2><div className="mt-6 divide-y divide-border border-y border-border">{PROPERTY_TAX_HUB_FAQS.map(faq => <details key={faq.question} className="group py-5"><summary className="cursor-pointer font-display text-xl text-foreground">{faq.question}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div></section>

      <section id="sources" className="mt-16 scroll-mt-28 border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Official Texas sources & methodology</p><h2 className="mt-3 font-display text-3xl">Verify high-stakes details at the source</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined uses Texas Comptroller guidance as the statewide starting point, then connects readers to local appraisal districts, appraisal review boards, taxing units and tax offices for parcel-specific decisions. Our calculators are planning tools, not official appraisals, exemption determinations or tax bills.</p><ul className="mt-6 grid gap-3 md:grid-cols-2">{officialSources.map(([label,url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer" className="block rounded-md border border-border p-4 text-sm font-semibold text-primary hover:border-primary/50">{label} ↗</a></li>)}</ul><p className="mt-6 text-xs leading-5 text-muted-foreground">Last reviewed: October 1, 2026. Property-tax law and local rates can change. For an official determination, use the responsible appraisal district, appraisal review board, taxing unit or tax collector.</p></section>

    </div></div></Container>
  </article>;
}
