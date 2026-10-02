import { START_BUSINESS_FAQ } from "@/data/start-business-texas-guide";

const steps = [
  ["1", "Choose the business structure", "Compare a sole proprietorship, partnership, LLC, corporation or another entity based on liability, taxes, ownership and administration."],
  ["2", "Choose and check the business name", "Check the proposed legal entity name and decide whether an assumed-name or DBA filing also applies."],
  ["3", "Choose a registered agent", "Texas filing entities such as LLCs and corporations must maintain a registered agent and registered office in Texas, and the agent must consent."],
  ["4", "File formation documents", "Texas LLCs generally file a Certificate of Formation with the Secretary of State. The current filing fee for a Texas LLC Certificate of Formation is $300."],
  ["5", "Get an EIN from the IRS", "An Employer Identification Number is a federal tax ID. The IRS issues EINs directly at no charge."],
  ["6", "Register for Texas taxes when required", "Depending on the business, you may need a Texas sales and use tax permit and may have franchise-tax reporting obligations."],
  ["7", "Check licenses, permits and local rules", "Texas has no general statewide business license, but regulated work and local operations can require licenses, permits, registrations or zoning approval."],
  ["8", "Set up banking, records and insurance", "Separate business and personal finances, establish bookkeeping, evaluate insurance and keep formation, tax and licensing records together."],
  ["9", "Handle employer requirements", "If you hire workers, review federal employment-tax rules and Texas Workforce Commission requirements, including unemployment tax and new-hire reporting."],
  ["10", "Keep the business compliant", "Track tax and information reports, permit renewals, registered-agent details, and ownership or address changes after launch."],
] as const;

const entityRows = [
  ["Sole proprietorship", "Usually no SOS formation filing", "No entity-level liability shield", "Simple one-owner businesses"],
  ["General partnership", "Usually no SOS formation filing", "Partners can have personal liability", "Simple businesses with two or more owners"],
  ["LLC", "$300 Certificate of Formation", "Generally separates business liabilities from owners", "Small businesses seeking liability separation and flexible management"],
  ["For-profit corporation", "$300 Certificate of Formation", "Generally separates business liabilities from shareholders", "Businesses using a corporate ownership and governance structure"],
] as const;

const checklist = [
  "Business structure selected",
  "Legal name checked",
  "Registered agent confirmed when required",
  "Formation or assumed-name filings completed",
  "EIN obtained when needed",
  "Business bank account opened",
  "Bookkeeping system established",
  "Sales-tax permit checked",
  "Professional or industry licenses checked",
  "City and county permits or zoning checked",
  "Employer obligations reviewed",
  "Compliance deadlines calendared",
] as const;

const sources = [
  ["Texas Governor — Start a Business", "https://gov.texas.gov/business/page/start-a-business"],
  ["Texas Secretary of State — Form 205 LLC instructions", "https://www.sos.state.tx.us/corp/instructions/205.shtml"],
  ["Texas Secretary of State — Business Organizations", "https://www.sos.state.tx.us/corp/index.shtml"],
  ["Texas Comptroller — Franchise Tax", "https://comptroller.texas.gov/taxes/franchise/"],
  ["Texas Comptroller — Sales Tax Permits", "https://comptroller.texas.gov/taxes/permit/"],
  ["Texas Business Permit Office", "https://gov.texas.gov/business/page/business-permits-office"],
  ["IRS — Get an Employer Identification Number", "https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number"],
  ["FinCEN — Beneficial Ownership Information", "https://www.fincen.gov/boi"],
  ["Texas Workforce Commission — Businesses & Employers", "https://www.twc.texas.gov/businesses"],
] as const;

export function StartBusinessTexasGuide() {
  return (
    <main className="bg-background text-foreground">
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Texas business</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-5xl">How to Start a Business in Texas</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">A practical 2026 guide to choosing a structure, registering the business, getting an EIN, handling Texas taxes, checking licenses and permits, hiring employees and staying compliant after launch.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span>Last verified: October 1, 2026</span>
            <span>Official Texas and federal sources linked throughout</span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0">
          <section className="border-b border-border pb-10">
            <h2 className="font-display text-2xl font-bold">Quick answer</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Texas does not require a general statewide business license. Starting a business can still require a Secretary of State or county filing, an IRS EIN, Texas tax registration, a registered agent for filing entities, industry-specific licenses or permits, and local approvals. For a standard Texas LLC, the current Secretary of State filing fee is <strong className="text-foreground">$300</strong>.</p>
          </section>

          <section id="steps" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Start a Texas business in 10 steps</h2>
            <div className="mt-5">
              {steps.map(([number, title, text]) => (
                <div key={number} className="flex gap-4 border-t border-border py-4">
                  <span className="font-semibold text-primary">{number}.</span>
                  <div><h3 className="font-semibold">{title}</h3><p className="mt-1 leading-7 text-muted-foreground">{text}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section id="structure" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Which Texas business structure should you choose?</h2>
            <p className="mt-3 leading-7 text-muted-foreground">There is no single best structure for every owner. Liability, tax treatment, ownership, financing plans and administrative burden all matter. This table is a high-level orientation, not legal or tax advice.</p>
            <div className="mt-6 overflow-x-auto border border-border" role="region" aria-label="Texas business entity comparison" tabIndex={0}>
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-muted/40"><tr><th className="p-4 font-semibold">Structure</th><th className="p-4 font-semibold">Texas formation filing</th><th className="p-4 font-semibold">Liability</th><th className="p-4 font-semibold">Common fit</th></tr></thead>
                <tbody>{entityRows.map((row) => <tr key={row[0]} className="border-t border-border">{row.map((cell) => <td key={cell} className="p-4 align-top leading-6">{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">The $300 amount reflects the current Texas Secretary of State filing fee for an LLC Certificate of Formation and a for-profit corporation Certificate of Formation. Other entity types and optional filings can have different fees.</p>
          </section>

          <section id="llc" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Forming a Texas LLC</h2>
            <p className="mt-3 leading-7 text-muted-foreground">A Texas LLC generally files a Certificate of Formation with the Secretary of State, names a registered agent and registered office in Texas, and pays the current <strong className="text-foreground">$300</strong> filing fee. Formation is only the entity-creation step: you may still need an EIN, tax registrations, licenses, permits and local approvals before operating.</p>
            <p className="mt-3 leading-7 text-muted-foreground">The Secretary of State&apos;s Form 205 instructions are the best place to verify the filing fee and formation requirements before submitting.</p>
            <a className="mt-4 inline-block font-semibold underline underline-offset-4" href="https://www.sos.state.tx.us/corp/instructions/205.shtml" target="_blank" rel="noreferrer">Texas LLC filing instructions →</a>
          </section>

          <section id="name-agent" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Business name, DBA and registered-agent basics</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Your legal entity name, an assumed name or DBA, and a trademark are different concepts. A name being available for a Texas entity filing does not automatically mean it is free of trademark conflicts.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="border border-border p-5"><h3 className="font-semibold">Assumed name / DBA</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A DBA does not create a separate liability-protecting entity. Determine whether an assumed-name filing applies to your structure and where it must be filed.</p></div>
              <div className="border border-border p-5"><h3 className="font-semibold">Registered agent</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Texas filing entities must maintain a registered agent and registered office. The agent receives official legal and government notices and must consent to serve.</p></div>
            </div>
          </section>

          <section id="taxes" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Texas taxes and EIN requirements</h2>
            <p className="mt-4 leading-7 text-muted-foreground"><strong className="text-foreground">EIN:</strong> The EIN is federal. The IRS issues it directly for free. Form the legal entity first when you are creating one, then apply using the entity&apos;s correct legal name.</p>
            <p className="mt-4 leading-7 text-muted-foreground"><strong className="text-foreground">Sales and use tax:</strong> If you sell taxable goods or taxable services, determine whether a Texas sales and use tax permit is required before collecting tax.</p>
            <p className="mt-4 leading-7 text-muted-foreground"><strong className="text-foreground">Franchise tax:</strong> Many Texas entities are subject to the franchise-tax system even when no tax is ultimately due. For report years 2026 and 2027, the Comptroller lists a <strong className="text-foreground">$2.65 million no-tax-due threshold</strong>. Qualifying entities at or below that threshold generally do not file a No Tax Due Report, but many still must file a Public Information Report or Ownership Information Report.</p>
          </section>

          <section id="boi" className="border-b border-border py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">2026 federal update</p>
            <h2 className="mt-2 font-display text-3xl font-bold">BOI reporting changed</h2>
            <p className="mt-3 leading-7 text-muted-foreground">FinCEN&apos;s final rule, effective August 14, 2026, exempts U.S.-created companies from federal Beneficial Ownership Information reporting. Certain foreign entities registered to do business in the United States can still be reporting companies, so check FinCEN&apos;s current guidance if the business was formed outside the United States.</p>
            <a className="mt-4 inline-block font-semibold underline underline-offset-4" href="https://www.fincen.gov/boi" target="_blank" rel="noreferrer">Check current FinCEN BOI guidance →</a>
          </section>

          <section id="licenses" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Licenses, permits and local requirements</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Texas does not issue a single general statewide business license. Restaurants, contractors, health-related businesses, regulated professions, alcohol sellers and many other activities can trigger specific requirements. Cities and counties can also impose zoning, building, fire, signage, health or other local rules.</p>
            <div className="mt-5 flex flex-wrap gap-4"><a className="font-semibold underline underline-offset-4" href="https://gov.texas.gov/business/page/business-permits-office" target="_blank" rel="noreferrer">Texas Business Permit Office</a><a className="font-semibold underline underline-offset-4" href="/county">Find Texas county information</a></div>
          </section>

          <section id="employers" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Hiring employees in Texas</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Hiring workers creates obligations beyond forming the business. Review federal payroll and employment requirements, determine whether Texas unemployment-tax registration applies, keep required employment records and follow new-hire reporting rules. Texas Workforce Commission guidance says employers generally must report new hires to the state&apos;s directory within 20 days of the employee&apos;s first day of paid work.</p>
            <a className="mt-4 inline-block font-semibold underline underline-offset-4" href="https://www.twc.texas.gov/businesses" target="_blank" rel="noreferrer">Texas Workforce Commission resources →</a>
          </section>

          <section id="compliance" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Ongoing Texas business compliance</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Opening the doors is not the end of the filing calendar. Keep registered-agent and address information current, track franchise-tax and information-report requirements, renew applicable licenses and permits, maintain payroll and employment records, and document ownership or management changes when required.</p>
          </section>

          <section id="relocation" className="border-b border-border py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Existing companies</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Moving or expanding an existing company?</h2>
            <p className="mt-3 leading-7 text-muted-foreground"><strong className="text-foreground">If the business move includes employees or a new Texas site</strong>, formation and tax registration are only part of the project. You may also need to compare labor markets, commute corridors, housing, schools, utilities, incentives and site-level operating conditions.</p>
            <div className="mt-5 flex flex-wrap gap-4"><a className="font-semibold underline underline-offset-4" href="/moving-to-texas?companyMove=employer#corporate-relocation">Corporate relocation to Texas</a><a className="font-semibold underline underline-offset-4" href="/texas-industries">Research Texas industries</a></div>
          </section>

          <section id="costs" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">What does it cost to start a business in Texas?</h2>
            <p className="mt-3 leading-7 text-muted-foreground">There is no universal startup price. A sole proprietor with no regulated activity can have very different costs from an LLC with employees, local permits and professional licensing.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="border border-border p-5"><div className="text-3xl font-bold">$300</div><div className="mt-1 font-semibold">Texas LLC formation filing</div><p className="mt-2 text-sm leading-6 text-muted-foreground">Current Secretary of State fee for Form 205 / Certificate of Formation—Limited Liability Company.</p></div><div className="border border-border p-5"><div className="text-3xl font-bold">$0</div><div className="mt-1 font-semibold">IRS EIN</div><p className="mt-2 text-sm leading-6 text-muted-foreground">The IRS issues EINs directly at no charge. Third-party filing services may charge their own fee.</p></div></div>
          </section>

          <section id="checklist" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Before you open: Texas startup checklist</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{checklist.map((item) => <div key={item} className="border-t border-border py-3 text-sm">✓ {item}</div>)}</div>
          </section>

          <section id="faq" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Texas business startup FAQ</h2>
            <div className="mt-5">{START_BUSINESS_FAQ.map((item) => <details key={item.question} className="border-t border-border py-4"><summary className="cursor-pointer font-semibold">{item.question}</summary><p className="mt-3 leading-7 text-muted-foreground">{item.answer}</p></details>)}</div>
          </section>

          <section id="sources" className="border-b border-border py-10">
            <h2 className="font-display text-3xl font-bold">Official sources</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Use these agencies as the source of truth for filing fees, tax rules, licensing and federal requirements.</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{sources.map(([label, href]) => <li key={href} className="border-t border-border py-3"><a className="font-semibold underline underline-offset-4" href={href} target="_blank" rel="noreferrer">{label} →</a></li>)}</ul>
          </section>

          <section className="py-10">
            <h2 className="font-display text-2xl font-bold">Keep researching Texas</h2>
            <div className="mt-4 flex flex-wrap gap-4"><a className="font-semibold underline underline-offset-4" href="/texas-industries">Texas industries</a><a className="font-semibold underline underline-offset-4" href="/made-in-texas">Made in Texas</a><a className="font-semibold underline underline-offset-4" href="/moving-to-texas">Moving to Texas</a><a className="font-semibold underline underline-offset-4" href="/texas-resources">Texas resources</a></div>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">This guide is general information, not legal, tax or accounting advice. Rules and fees can change; verify requirements with the responsible agency and qualified professionals when needed.</p>
          </section>
        </article>

        <aside className="hidden lg:block">
          <nav className="sticky top-24 border-l border-border pl-6 text-sm" aria-label="On this page">
            <div className="font-semibold">On this page</div>
            <div className="mt-4 grid gap-2 text-muted-foreground"><a href="#steps">10-step process</a><a href="#structure">Business structures</a><a href="#llc">Texas LLC</a><a href="#name-agent">Name & registered agent</a><a href="#taxes">Taxes & EIN</a><a href="#boi">BOI update</a><a href="#licenses">Licenses & permits</a><a href="#employers">Employers</a><a href="#compliance">Ongoing compliance</a><a href="#relocation">Company relocation</a><a href="#costs">Startup costs</a><a href="#checklist">Checklist</a><a href="#faq">FAQ</a><a href="#sources">Official sources</a></div>
          </nav>
        </aside>
      </div>
    </main>
  );
}
