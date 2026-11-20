import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { westWhartonHospitalDistrict as facts } from '@/data/property/west-wharton-hospital-district';

const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const number = (amount: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount);
const rate = (amount: number) => amount.toFixed(5);
const noticeRateChange = facts.adoptedRate2025 - facts.priorRate2024;
const noticeRateChangePct = noticeRateChange / facts.priorRate2024 * 100;
const homesteadDifference = facts.homestead.proposedTax - facts.homestead.priorTax;
const homesteadChangePct = homesteadDifference / facts.homestead.priorTax * 100;
const fixedTaxableValue = 250000;
const illustrated2025Tax = fixedTaxableValue * facts.adoptedRate2025 / 100;
const illustrated2024Tax = fixedTaxableValue * facts.priorRate2024 / 100;
const reportedLevyDifference = facts.statewideLevy.current - facts.noticeLevy.proposed;
const adoptedBelowNoNewRevenue = facts.localAdopted2026.noNewRevenueRate - facts.localAdopted2026.totalRate;
const countyVsState2023Gap = facts.county2023Reconciliation.comptrollerImportedTotalRate - facts.county2023Reconciliation.countyFiveYearSummaryRate;

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-2">{children} ↗</a>;
}

export function WestWhartonHospitalDistrictAuthority({ latestWorkbookYear }: { latestWorkbookYear: number }) {
  return <>
    <nav aria-label="Hospital district tax page sections" className="flex flex-wrap gap-x-5 gap-y-3 border-b border-border py-5 text-sm font-semibold">
      <a href="#wwchd-2026" className="text-primary underline underline-offset-2">2026 adopted rate</a>
      <a href="#wwchd-2023-sources" className="text-primary underline underline-offset-2">2023 source disagreement</a>
      <a href="#wwchd-rate-decision" className="text-primary underline underline-offset-2">2025 rate decision</a>
      <a href="#wwchd-homestead" className="text-primary underline underline-offset-2">Homeowner comparison</a>
      <a href="#wwchd-estimate" className="text-primary underline underline-offset-2">$250,000 example</a>
      <a href="#wwchd-levy" className="text-primary underline underline-offset-2">Levy discrepancy</a>
      <a href="#wwchd-parcel" className="text-primary underline underline-offset-2">Check your parcel</a>
      <a href="#taxing-unit-rate-history" className="text-primary underline underline-offset-2">Annual rate table</a>
    </nav>
    <section id="wwchd-2026" aria-labelledby="wwchd-2026-heading" className="scroll-mt-24 border-b border-border py-10">
      <p className="eyebrow text-primary">Latest locally verified year · Wharton County Tax Office</p>
      <h2 id="wwchd-2026-heading" className="mt-2 font-display text-3xl sm:text-4xl">2026 hospital district rate: $0.23210 per $100</h2>
      <p className="mt-4 max-w-4xl text-base leading-8">The <strong>October 2026 Wharton County taxing-entity rate table</strong> lists West Wharton County Hospital District at <strong>${rate(facts.localAdopted2026.totalRate)} per $100 of taxable value</strong> for 2026: ${rate(facts.localAdopted2026.maintenanceOperationsRate)} for maintenance and operations and ${rate(facts.localAdopted2026.debtServiceRate)} for debt service. That is <strong>unchanged from its finalized 2025 rate</strong>. <SourceLink href={facts.sources.county2026AdoptedTable}>Read the official county 2026 adopted-rate table (PDF)</SourceLink>.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <div className="border-t border-border pt-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">2025 state-reported rate</p><strong className="mt-2 block font-display text-2xl tabular-nums">${rate(facts.adoptedRate2025)}</strong><p className="mt-2 text-sm text-muted-foreground">Texas Comptroller annual workbook</p></div>
        <div className="border-t border-border pt-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">2026 locally adopted rate</p><strong className="mt-2 block font-display text-2xl tabular-nums">${rate(facts.localAdopted2026.totalRate)}</strong><p className="mt-2 text-sm text-muted-foreground">Wharton County official October 2026 rate table</p></div>
        <div className="border-t border-border pt-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rate-only change</p><strong className="mt-2 block font-display text-2xl tabular-nums">$0.00000</strong><p className="mt-2 text-sm text-muted-foreground">A constant $250,000 district-taxable value produces ${money(fixedTaxableValue * facts.localAdopted2026.totalRate / 100)} in either year.</p></div>
      </div>
      <div className="mt-7 border-t border-border pt-5">
        <h3 className="font-display text-2xl">What the county’s 2026 tax transparency summary adds</h3>
        <p className="mt-3 max-w-4xl text-sm leading-7">The separate Wharton County five-year summary under Texas Tax Code §26.16 reports two <strong>2026 comparison benchmarks</strong> for this exact hospital district. These are calculation thresholds, <strong>not additional taxes charged</strong>. <SourceLink href={facts.sources.countyFiveYearSummary}>County five-year Truth in Taxation summary, page 3 (PDF)</SourceLink>.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { label: "2026 adopted rate", value: facts.localAdopted2026.totalRate, explanation: "The rate actually listed as adopted in both county records." },
            { label: "2026 no-new-revenue benchmark", value: facts.localAdopted2026.noNewRevenueRate, explanation: "A statutory comparison, not a second charge or a prediction of your bill." },
            { label: "2026 voter-approval benchmark", value: facts.localAdopted2026.voterApprovalRate, explanation: "A separate statutory election-related threshold, not the adopted charge." },
          ].map((item) => <div key={item.label} className="border border-border p-5"><h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</h4><strong className="mt-3 block font-display text-3xl tabular-nums">${rate(item.value)}</strong><p className="mt-2 text-xs text-muted-foreground">per $100 of taxable value</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.explanation}</p></div>)}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-7">The adopted 2026 rate is <strong>${rate(adoptedBelowNoNewRevenue)} per $100 below the county’s no-new-revenue rate</strong>, or <strong>{(adoptedBelowNoNewRevenue / facts.localAdopted2026.noNewRevenueRate * 100).toFixed(2)}%</strong> below that benchmark. On a constant $250,000 district-taxable value, that rate-only difference is about <strong>{money(fixedTaxableValue * adoptedBelowNoNewRevenue / 100)}</strong>. These comparisons cannot establish the district’s actual revenue change or your final tax bill, because taxable values, new property and exemptions differ.</p>
      </div>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">Source separation matters: 2026 is a <strong>locally published adopted rate</strong>, not a 2026 Texas Comptroller statewide workbook observation. The 2025 statewide rate, annual levy history and 2025 proposed-notice figures remain separately sourced. The county's 2026 rate table does not establish a finalized 2026 levy or any particular property's tax bill. Check exemptions, parcel jurisdictions and taxable value with the appraisal district. <SourceLink href={facts.sources.countyRateIndex}>County tax-rate index</SourceLink>.</p>
    </section>
    <section aria-labelledby="wwchd-at-a-glance" className="border-b border-border py-10">
      <p className="eyebrow text-primary">West Wharton County · verified local context</p>
      <h2 id="wwchd-at-a-glance" className="mt-2 font-display text-3xl sm:text-4xl">What this hospital district taxes—and where</h2>
      <p className="mt-4 max-w-4xl text-base leading-8">Established in 1995 under Texas Health and Safety Code Chapter 286, West Wharton County Hospital District covers the part of Wharton County <strong>west of the Colorado River</strong>. The district says it primarily supports <strong>El Campo Memorial Hospital</strong>, with financing from property taxes, the Texas HHSC QIPP program and rent. A hospital-district rate is a separate jurisdictional charge, not a countywide rate or a hospital bill. <SourceLink href={facts.sources.districtHome}>District boundary description</SourceLink> and <SourceLink href={facts.sources.districtAbout}>district funding explanation</SourceLink>.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <div className="border-t border-border pt-4"><span className="text-xs uppercase tracking-wider text-muted-foreground">Comptroller district ID</span><strong className="mt-2 block font-display text-2xl tabular-nums">{facts.officialTaxingUnitId}</strong><span className="mt-2 block text-sm text-muted-foreground">Use this ID when confirming the correct local taxing unit.</span></div>
        <div className="border-t border-border pt-4"><span className="text-xs uppercase tracking-wider text-muted-foreground">2025 statewide finalized rate</span><strong className="mt-2 block font-display text-2xl tabular-nums">${rate(facts.adoptedRate2025)} / $100</strong><span className="mt-2 block text-sm text-muted-foreground">M&amp;O ${rate(facts.adoptedRate2025)}; reported debt rate $0.</span></div>
        <div className="border-t border-border pt-4"><span className="text-xs uppercase tracking-wider text-muted-foreground">Rate change from 2024</span><strong className="mt-2 block font-display text-2xl tabular-nums">+{noticeRateChangePct.toFixed(2)}%</strong><span className="mt-2 block text-sm text-muted-foreground">An additional ${rate(noticeRateChange)} per $100 of taxable value; this is a rate comparison, not a homeowner bill forecast.</span></div>
      </div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">The boundary description is not an account-level geographic determination. Check the appraisal district's list of taxing jurisdictions for your parcel—especially near district boundaries—before adding this rate.</p>
    </section>

    <section id="wwchd-2023-sources" aria-labelledby="wwchd-2023-sources-heading" className="scroll-mt-24 border-b border-border py-10">
      <p className="eyebrow text-primary">Independent record reconciliation · unresolved historical difference</p>
      <h2 id="wwchd-2023-sources-heading" className="mt-2 font-display text-3xl sm:text-4xl">Why official sources disagree about the 2023 hospital district rate</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7">Wharton County’s five-year Truth in Taxation summary lists a <strong>2023 adopted rate of ${rate(facts.county2023Reconciliation.countyFiveYearSummaryRate)}</strong> per $100 for West Wharton County Hospital District. The separate Texas Comptroller special-district history imported for this exact unit reports <strong>${rate(facts.county2023Reconciliation.comptrollerImportedTotalRate)}</strong> for 2023. These values differ by <strong>${rate(countyVsState2023Gap)} per $100</strong>. The published documents do not explain the discrepancy. <SourceLink href={facts.sources.countyFiveYearSummary}>County five-year summary, page 3</SourceLink> · <SourceLink href={facts.sources.comptrollerRates}>Comptroller statewide special-district history</SourceLink>.</p>
      <p className="mt-5 max-w-4xl text-sm leading-7"><strong>A second county document corroborates the 2023 figure:</strong> the hospital district's own <SourceLink href={facts.sources.county2024UnitWorksheet}>2024 tax-rate calculation worksheet (Form 50-856, line 4)</SourceLink> records the <em>prior-year, 2023 adopted rate</em> as <strong>${rate(facts.county2023Reconciliation.county2024Worksheet2023AdoptedRate)} per $100</strong>. The <SourceLink href={facts.sources.county2023UnitWorksheet}>2023 worksheet (line 4)</SourceLink> records the <em>2022 adopted rate</em> as <strong>${rate(facts.county2023Reconciliation.county2023Worksheet2022AdoptedRate)} per $100</strong>. These independently dated, district-specific worksheets support the county's year attribution, but they do <strong>not</strong> explain why the statewide 2023 imported row differs; the statewide record remains unchanged and the conflict stays disclosed.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="border-l-2 border-border pl-4"><p className="text-xs uppercase tracking-wider text-muted-foreground">County historical summary · 2023</p><p className="mt-2 font-display text-2xl tabular-nums">${rate(facts.county2023Reconciliation.countyFiveYearSummaryRate)}</p></div><div className="border-l-2 border-border pl-4"><p className="text-xs uppercase tracking-wider text-muted-foreground">Comptroller imported series · 2023</p><p className="mt-2 font-display text-2xl tabular-nums">${rate(facts.county2023Reconciliation.comptrollerImportedTotalRate)}</p></div></div>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground"><strong>How to interpret the table below:</strong> the statewide historical row remains visibly labeled as the Comptroller-sourced 2023 figure; the county number is preserved here as conflicting evidence, not substituted into the statewide series. Neither source proves which amount appeared on a particular owner’s 2023 bill. Check the historic account or contact the tax office for account-level evidence. We have not inferred an explanation or a corrected rate from two conflicting publications.</p>
    </section>

    <section aria-labelledby="wwchd-rate-decision" className="border-b border-border py-10">
      <p className="eyebrow text-primary">Why the 2025 rate matters</p>
      <h2 id="wwchd-rate-decision" className="mt-2 font-display text-3xl sm:text-4xl">The adopted rate versus the public-hearing benchmarks</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">The district's September 2025 public-hearing notice <em>proposed</em> ${rate(facts.adoptedRate2025)} per $100. The separate Texas Comptroller 2025 finalized workbook reports that same total. The two statutory benchmarks below come from the <strong>proposal notice</strong>; they are not additional tax charges and should not be added to the adopted rate. <SourceLink href={facts.sources.districtNotice}>Read the two-page official hearing notice</SourceLink>.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { heading: 'No-new-revenue benchmark', value: facts.noNewRevenueProposed2025, note: 'Notice benchmark intended to produce about the same revenue from properties taxed in both years.' },
          { heading: '2025 adopted total', value: facts.adoptedRate2025, note: 'Finalized rate in the Comptroller file; also the rate proposed in the district notice.' },
          { heading: 'Voter-approval benchmark', value: facts.voterApprovalProposed2025, note: 'Notice benchmark for election requirements, not a tax separately charged.' },
        ].map((item) => <div key={item.heading} className="border border-border p-5"><h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.heading}</h3><strong className="mt-3 block font-display text-3xl tabular-nums">${rate(item.value)}</strong><span className="text-xs text-muted-foreground">per $100 taxable</span><div className="mt-4 h-2 rounded-full bg-muted" aria-hidden="true"><div className="h-full rounded-full bg-primary" style={{width: `${item.value/facts.voterApprovalProposed2025 * 100}%`}} /></div><p className="mt-4 text-sm leading-6 text-muted-foreground">{item.note}</p></div>)}
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">The proposed rate exceeded the notice's no-new-revenue benchmark but was below its voter-approval benchmark. The district published the hearing for September 22, 2025; this is historical information, <strong>not notice of an upcoming hearing</strong>. <SourceLink href={facts.sources.districtTaxes}>District tax notices</SourceLink>.</p>
    </section>

    <section aria-labelledby="wwchd-homestead" className="border-b border-border py-10">
      <p className="eyebrow text-primary">Original comparison · district-reported figures</p>
      <h2 id="wwchd-homestead" className="mt-2 font-display text-3xl sm:text-4xl">How the notice's average homestead changed</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">The district's public notice compares the average residence homestead used for the 2024 levy with the average homestead in its <strong>2025 proposed</strong> calculation. This is a district-wide illustration, not a same-property tax-bill comparison or a guarantee of what any household paid.</p>
      <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[42rem] text-left text-sm">
        <thead><tr className="border-b border-border text-muted-foreground"><th className="py-3">District notice measure</th><th className="py-3">2024</th><th className="py-3">2025 proposal</th><th className="py-3">Change</th></tr></thead>
        <tbody>
          <tr className="border-b border-border"><th className="py-4 font-medium">Adopted/proposed rate per $100</th><td className="tabular-nums">${rate(facts.priorRate2024)}</td><td className="tabular-nums">${rate(facts.adoptedRate2025)}</td><td className="tabular-nums">+{noticeRateChangePct.toFixed(2)}%</td></tr>
          <tr className="border-b border-border"><th className="py-4 font-medium">Average homestead taxable value</th><td className="tabular-nums">{money(facts.homestead.priorTaxableValue)}</td><td className="tabular-nums">{money(facts.homestead.proposedTaxableValue)}</td><td>+{((facts.homestead.proposedTaxableValue / facts.homestead.priorTaxableValue - 1)*100).toFixed(2)}%</td></tr>
          <tr className="border-b border-border"><th className="py-4 font-medium">Tax on average homestead</th><td className="tabular-nums">{money(facts.homestead.priorTax)}</td><td className="tabular-nums">{money(facts.homestead.proposedTax)}</td><td className="font-semibold tabular-nums">+{money(homesteadDifference)} (+{homesteadChangePct.toFixed(2)}%)</td></tr>
        </tbody></table></div>
      <p className="mt-5 max-w-4xl text-sm leading-7">Why can a tax-bill illustration rise faster than the rate? Here, the <strong>rate increased 6.91%</strong> and the <strong>average taxable value increased about 4%</strong>. Those changes together produced the notice's <strong>11.19% increase</strong> in the average-home illustration. The $49.97 difference is not the rate-only cost of a particular property. <SourceLink href={facts.sources.districtNotice}>Source: district notice, page 2</SourceLink>.</p>
    </section>

    <section aria-labelledby="wwchd-estimate" className="border-b border-border py-10">
      <p className="eyebrow text-primary">Reproducible homeowner example</p>
      <h2 id="wwchd-estimate" className="mt-2 font-display text-3xl sm:text-4xl">What this one tax costs on a $250,000 taxable value</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div className="border-t border-border pt-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">2024 rate · unchanged value</p><p className="mt-2 font-display text-3xl tabular-nums">{money(illustrated2024Tax)}</p></div>
        <div className="border-t border-border pt-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">2025 rate · unchanged value</p><p className="mt-2 font-display text-3xl tabular-nums">{money(illustrated2025Tax)}</p></div>
        <div className="border-t border-border pt-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rate-only annual difference</p><p className="mt-2 font-display text-3xl tabular-nums">+{money(illustrated2025Tax - illustrated2024Tax)}</p></div>
      </div>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">Calculation: taxable value × district rate ÷ 100. This assumes the same $250,000 <strong>district-taxable</strong> value in both years, before any changes in valuation or exemptions. It estimates <strong>hospital district tax only</strong>, not county, school, city, college or special-district charges. Do not substitute market value for the actual taxable value shown on your account. For a property-specific calculation, <SourceLink href={facts.sources.countyEstimator}>use Wharton County's tax estimator</SourceLink> or <Link className="font-semibold text-primary underline underline-offset-2" to="/texas-property-tax-estimator">compare all applicable rates with the Texas Defined calculator</Link>.</p>
    </section>

    <section aria-labelledby="wwchd-levy" className="border-b border-border py-10">
      <p className="eyebrow text-primary">Important source distinction</p>
      <h2 id="wwchd-levy" className="mt-2 font-display text-3xl sm:text-4xl">Why two official 2025 levy figures differ</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="border border-border p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">District's 2025 proposed levy</p><strong className="mt-2 block font-display text-3xl tabular-nums">{money(facts.noticeLevy.proposed)}</strong><p className="mt-3 text-sm text-muted-foreground">From the September 2025 public-hearing notice. The notice compared a 2024 figure of {money(facts.noticeLevy.prior)}.</p></div><div className="border border-border p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">2025 Comptroller-reported levy</p><strong className="mt-2 block font-display text-3xl tabular-nums">{money(facts.statewideLevy.current)}</strong><p className="mt-3 text-sm text-muted-foreground">From the later finalized statewide workbook. The published 2024 statewide levy is {money(facts.statewideLevy.prior)}.</p></div></div>
      <p className="mt-5 max-w-4xl text-sm leading-7">These are <strong>not interchangeable</strong>: the Comptroller 2025 levy is {money(reportedLevyDifference)} higher than the amount in the earlier district proposal. Their dates, reporting processes and adjustments may differ; the public documents do not establish a single definitive reason for the difference. Neither number is cash actually collected. The rate-history table below retains the Comptroller figures without silently overwriting them with proposal figures. <SourceLink href={facts.sources.comptrollerRates}>Statewide rate-and-levy files</SourceLink> · <SourceLink href={facts.sources.districtNotice}>local proposal notice</SourceLink>.</p>
    </section>

    <section aria-labelledby="wwchd-parcel" className="border-b border-border py-10">
      <p className="eyebrow text-primary">Verify your actual bill</p>
      <h2 id="wwchd-parcel" className="mt-2 font-display text-3xl sm:text-4xl">Find whether your property owes this hospital district tax</h2>
      <ol className="mt-5 list-decimal space-y-4 pl-5 text-sm leading-7">
        <li><strong>Find your parcel at Wharton Central Appraisal District.</strong> Check the address, the district-specific taxable value, exemptions and taxing-jurisdiction list. The district says its area is west of the Colorado River, but do not infer a parcel's tax status from a general description. <SourceLink href={facts.sources.appraisal}>Wharton CAD</SourceLink>.</li>
        <li><strong>Match the exact taxing unit.</strong> Confirm the unit identification code <strong>{facts.officialTaxingUnitId}</strong> in the <SourceLink href={facts.sources.comptrollerCounty}>Comptroller's Wharton County directory</SourceLink>. County records can show similarly named hospital entries, so do not add both blindly.</li>
        <li><strong>Check the official county tax notice and account.</strong> The <SourceLink href={facts.sources.taxTransparency}>Wharton truth-in-taxation portal</SourceLink> shows property-specific jurisdictions and local rate notices. The <SourceLink href={facts.sources.countyTaxOffice}>Wharton County Tax Assessor-Collector</SourceLink> handles billing and collection for the district; call <a href="tel:+19795323312" className="text-primary underline">979-532-3312</a> for account/payment questions.</li>
        <li><strong>For district governance and spending questions, contact the district.</strong> The district is at 201 S. Mechanic St., El Campo, TX 77437; its published number is <a href="tel:+19793305012" className="text-primary underline">979-330-5012</a>. <SourceLink href={facts.sources.districtNotices}>Board notices and open-records information</SourceLink>.</li>
      </ol>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">Texas Defined is an independent publisher, not the taxing unit, appraisal district or tax collector. Tax rate is only one input in an actual bill; account-specific exemptions and valuations are decided by official local offices.</p>
    </section>

    <section aria-labelledby="wwchd-faq" className="border-b border-border py-10">
      <p className="eyebrow text-primary">Frequently asked questions</p>
      <h2 id="wwchd-faq" className="mt-2 font-display text-3xl sm:text-4xl">Hospital-district property tax questions</h2>
      <div className="mt-5 divide-y divide-border">
        <details className="py-4"><summary className="cursor-pointer font-semibold">Does everyone in Wharton County pay this rate?</summary><p className="mt-3 max-w-4xl text-sm leading-7">No. The district defines its area as the portion of Wharton County west of the Colorado River. Your actual taxing jurisdictions are recorded on your appraisal-district property account.</p></details>
        <details className="py-4"><summary className="cursor-pointer font-semibold">Does the rate include school and county taxes?</summary><p className="mt-3 max-w-4xl text-sm leading-7">No. ${rate(facts.localAdopted2026.totalRate)} is the locally published 2026 hospital-district rate per $100 of district-taxable value. Other taxing units may separately charge a parcel.</p></details>
        <details className="py-4"><summary className="cursor-pointer font-semibold">Why is the 2025 hearing notice discussed?</summary><p className="mt-3 max-w-4xl text-sm leading-7">This local analysis documents the 2025 tax-rate decision and its district-provided comparisons. {latestWorkbookYear === 2025 ? 'The latest finalized Comptroller annual dataset used by this page is 2025. ' : `The statewide dataset on this page now extends through ${latestWorkbookYear}; the notice analysis remains specifically about 2025. `}The district's tax page reviewed on {facts.lastVerified} linked its 2025 notice, while Wharton County's October 2026 adopted-rate table independently confirms the district's 2026 rate. The 2026 local rate is not represented as a Comptroller 2026 statewide observation.</p></details>
        <details className="py-4"><summary className="cursor-pointer font-semibold">Why is the levy higher than last year's without every homeowner's bill rising by that percentage?</summary><p className="mt-3 max-w-4xl text-sm leading-7">A levy covers the whole district tax base. New property, appraisal changes, exemptions, and rate changes affect the aggregate. Your bill depends on your own district-taxable value, applicable exemptions and the rate for that year.</p></details>
      </div>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground"><strong>How this page was checked:</strong> Texas Defined compared the county's October 2026 adopted-rate table and four-page Tax Code §26.16 five-year summary with the district's September 2025 hearing notice and the Texas Comptroller's special-district history. The rate-change percentages, fixed-value tax illustration and $29,027 difference between two differently dated 2025 levy reports were recalculated from those cited figures. The sources do not prove why the two levy totals or the conflicting 2023 rates differ, nor do they identify the taxing units on any individual parcel. <SourceLink href={facts.sources.county2026AdoptedTable}>2026 county table</SourceLink> · <SourceLink href={facts.sources.countyFiveYearSummary}>County five-year summary</SourceLink> · <SourceLink href={facts.sources.districtNotice}>2025 district notice</SourceLink> · <SourceLink href={facts.sources.comptrollerRates}>Comptroller records</SourceLink>.</p>
      <p className="mt-6 text-xs leading-6 text-muted-foreground">Local primary sources last checked <time dateTime={facts.lastVerified}>November 20, 2026</time>. The district's 2025 proposed-rate notice, the county's 2026 adopted-rate table and five-year historical summary, the statewide Comptroller workbook and actual parcel tax bills have distinct evidentiary roles.</p>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm"><Link to="/property-tax/county/wharton" className="font-semibold text-primary underline underline-offset-2">Wharton County property-tax guide</Link><Link to="/texas-property-tax-rate-history" className="font-semibold text-primary underline underline-offset-2">Compare taxing-unit history</Link><Link to="/texas-property-tax-bill-breakdown" className="font-semibold text-primary underline underline-offset-2">Break down your tax bill</Link></div>
    </section>
  </>;
}
