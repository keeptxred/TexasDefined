export const START_BUSINESS_FAQ = [
  { question: "Does Texas require a general business license?", answer: "No. Texas does not require one general statewide business license. Specific activities, professions and local jurisdictions can still require licenses, permits, certifications, registrations or zoning approval." },
  { question: "How much does it cost to form an LLC in Texas?", answer: "The Texas Secretary of State currently lists a $300 filing fee for an LLC Certificate of Formation. Optional services, assumed-name filings and professional help can add cost." },
  { question: "Do I need an EIN in Texas?", answer: "An EIN is federal, not Texas-specific. The IRS requires one for many businesses, including corporations and partnerships and businesses with employees. Banks and other institutions may also require one." },
  { question: "Is an EIN free?", answer: "Yes. The IRS issues EINs directly at no charge. Be cautious with third-party sites that charge simply to submit an EIN request." },
  { question: "Do I need a registered agent for a Texas LLC?", answer: "Yes. A Texas LLC must continuously maintain a registered agent and registered office in Texas. The person or organization serving as agent must consent." },
  { question: "Do I need a Texas sales-tax permit?", answer: "It depends on what the business sells or leases and whether those transactions are taxable. Use the Texas Comptroller's guidance to determine whether you must obtain a sales and use tax permit." },
  { question: "Does every Texas LLC owe franchise tax?", answer: "Texas franchise-tax rules apply to many taxable entities, but owing tax and filing information reports are separate questions. For 2026 and 2027, the Comptroller lists a $2.65 million no-tax-due threshold. Entities at or below that threshold generally do not file a No Tax Due Report, but many must still file a Public Information Report or Ownership Information Report." },
  { question: "Do Texas companies still have to file federal BOI reports?", answer: "Under FinCEN's current rule, U.S.-created companies are exempt from federal Beneficial Ownership Information reporting. Because this requirement changed repeatedly, verify FinCEN's current guidance before relying on an older startup checklist." },
  { question: "Do I need a DBA in Texas?", answer: "Not every business needs one. An assumed-name filing may be relevant when the business operates under a name different from its legal name. Filing requirements depend on the business structure and circumstances." },
  { question: "Can I start a Texas business from home?", answer: "Often, yes, but home-based businesses can still be subject to local zoning, deed restrictions, permits, sales-tax rules and professional or activity-specific requirements." },
  { question: "Is forming an LLC the same as getting a business license?", answer: "No. Formation creates the legal entity. Licenses and permits authorize particular regulated activities or operations. Texas does not issue a single general statewide business license." },
  { question: "What should I do immediately after forming an LLC?", answer: "Common next steps include obtaining an EIN when needed, opening a separate bank account, setting up accounting, checking sales-tax and permit requirements, documenting ownership and management, and calendaring state and local compliance deadlines." },
] as const;

export const START_BUSINESS_SEO_SECTIONS = [
  { heading: "Start a Texas business in 10 steps", paragraphs: ["Choose a structure and name, appoint a registered agent when required, file formation documents, obtain an EIN, register for applicable Texas taxes, check licenses and local rules, set up financial records, handle employer requirements and maintain compliance."], links: [] },
  { heading: "Choose the right Texas business structure", paragraphs: ["The right structure depends on liability, tax treatment, ownership, financing plans and administrative burden. Sole proprietorships, partnerships, LLCs and corporations follow different filing and governance paths."], links: [] },
  { heading: "Business name, DBA and registered-agent basics", paragraphs: ["A legal entity name, assumed name or DBA, and trademark are different concepts. Texas filing entities such as LLCs and corporations must maintain a registered agent and registered office."], links: [] },
  { heading: "Texas taxes and EIN requirements", paragraphs: ["The IRS issues EINs directly for free. Texas sales-tax and franchise-tax obligations depend on the business activity and entity. For 2026 and 2027, the Comptroller lists a $2.65 million no-tax-due threshold."], links: [] },
  { heading: "Licenses, permits and local requirements", paragraphs: ["Texas does not require a general statewide business license, but regulated activities and professions can require state, federal, city or county approvals."], links: [] },
  { heading: "Moving or expanding an existing company", paragraphs: ["If the business move includes employees or a new Texas site, business formation is only one part of the decision. Use the corporate relocation workflow for workforce, site-selection, housing, schools and commute planning."], links: [{ label: "Corporate relocation to Texas", href: "/moving-to-texas?companyMove=employer#corporate-relocation" }] },
] as const;

const steps = [
  ["1", "Choose the business structure", "Decide whether you will operate as a sole proprietorship, partnership, LLC, corporation or another entity. Liability, taxes, governance and filing requirements differ by structure."],
  ["2", "Choose and check the business name", "Check whether your proposed legal entity name is available. If you will operate under another name, determine whether an assumed-name or DBA filing is required."],
  ["3", "Choose a registered agent", "Texas filing entities such as LLCs and corporations must maintain a registered agent and registered office in Texas. The agent must consent to serve."],
  ["4", "File formation documents", "Texas LLCs generally file a Certificate of Formation with the Secretary of State. The current state filing fee for a Texas LLC Certificate of Formation is $300."],
  ["5", "Get an EIN from the IRS", "An Employer Identification Number is a federal tax ID. The IRS issues EINs directly at no charge, and many banks require one to open a business account."],
  ["6", "Register for Texas taxes when required", "Depending on what you sell and how the business is organized, you may need a Texas sales and use tax permit and may have Texas franchise-tax reporting obligations."],
  ["7", "Check licenses, permits and local rules", "Texas does not have a general statewide business license, but professions and business activities can require state, federal, city or county licenses, permits, registrations or zoning approval."],
  ["8", "Set up banking, records and insurance", "Separate business and personal finances, establish bookkeeping, evaluate insurance needs and keep formation, tax and licensing records together."],
  ["9", "Handle employer requirements", "If you hire workers, review federal employment-tax requirements and Texas Workforce Commission rules, including unemployment-tax and new-hire responsibilities where applicable."],
  ["10", "Keep the business compliant", "Track periodic reports, tax filings, permit renewals, registered-agent information and changes to ownership or addresses after the business opens."],
] as const;

const entityRows = [
  ["Sole proprietorship", "Usually no SOS formation filing", "No entity-level liability shield", "Simple one-owner businesses"],
  ["General partnership", "Usually no SOS formation filing", "Partners can have personal liability", "Businesses with two or more owners using a simple structure"],
  ["LLC", "$300 Certificate of Formation", "Generally separates business liabilities from owners", "Many small businesses wanting liability separation and flexible management"],
  ["For-profit corporation", "$300 Certificate of Formation", "Generally separates business liabilities from shareholders", "Businesses that want a corporate governance and ownership structure"],
] as const;

const sources = [
  ["Texas Governor — Start a Business", "https://gov.texas.gov/business/page/start-a-business"],
  ["Texas Secretary of State — Form 205 LLC instructions", "https://www.sos.state.tx.us/corp/instructions/205.shtml"],
  ["Texas Secretary of State — Business Organizations", "https://www.sos.state.tx.us/corp/index.shtml"],
  ["Texas Comptroller — Franchise Tax", "https://comptroller.texas.gov/taxes/franchise/"],
  ["Texas Comptroller — Sales Tax Permits", "https://comptroller.texas.gov/taxes/permit/"],
  ["Texas Business Permit Office", "https://gov.texas.gov/business/page/business-permits-office"],
  ["IRS — Employer Identification Number", "https://www.irs.gov/businesses/employer-identification-number"],
  ["FinCEN — Beneficial Ownership Information", "https://www.fincen.gov/boi"],
  ["Texas Workforce Commission — Businesses & Employers", "https://www.twc.texas.gov/businesses"],
] as const;

export function StartBusinessTexasGuide() {
  return (
    <main className="bg-background text-foreground">
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Texas business</p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl font-bold tracking-tight md:text-6xl">How to Start a Business in Texas</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">A practical 2026 guide to choosing a structure, registering the business, getting an EIN, handling Texas taxes, checking licenses and permits, and staying compliant after launch.</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span>Last verified: September 30, 2026</span>
            <span>Official Texas and federal sources linked throughout</span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0 space-y-12">
          <section className="rounded-2xl border bg-card p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold">Quick answer</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Texas does not require a general statewide business license. Starting a business can still require a Secretary of State or county filing, an IRS EIN, Texas tax registration, a registered agent for filing entities, industry-specific licenses or permits, and local approvals. For a standard Texas LLC, the current Secretary of State filing fee is <strong className="text-foreground">$300</strong>.</p>
          </section>

          <section id="steps">
            <h2 className="font-serif text-3xl font-bold">Start a Texas business in 10 steps</h2>
            <div className="mt-6 grid gap-4">
              {steps.map(([number, title, text]) => (
                <div key={number} className="grid gap-3 rounded-xl border p-5 sm:grid-cols-[44px_1fr]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold">{number}</div>
                  <div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-1 leading-7 text-muted-foreground">{text}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section id="structure">
            <h2 className="font-serif text-3xl font-bold">Which Texas business structure should you choose?</h2>
            <p className="mt-3 leading-7 text-muted-foreground">There is no single best structure for every owner. Liability, tax treatment, ownership, financing plans and administrative burden all matter. This is a high-level orientation, not legal or tax advice.</p>
            <div className="mt-6 overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-muted/40"><tr><th className="p-4 font-semibold">Structure</th><th className="p-4 font-semibold">Texas formation filing</th><th className="p-4 font-semibold">Liability</th><th className="p-4 font-semibold">Common fit</th></tr></thead>
                <tbody>{entityRows.map((row) => <tr key={row[0]} className="border-t">{row.map((cell) => <td key={cell} className="p-4 align-top leading-6">{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">The $300 amount reflects the current Texas Secretary of State filing fee for an LLC Certificate of Formation and a for-profit corporation Certificate of Formation. Other entity types and optional filings can have different fees.</p>
          </section>

          <section id="name-agent">
            <h2 className="font-serif text-3xl font-bold">Business name, DBA and registered-agent basics</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Your legal entity name, an assumed name (often called a DBA) and a trademark are different concepts. A name being available for a Texas entity filing does not automatically mean it is free of trademark conflicts.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border p-5"><h3 className="font-semibold">Assumed name / DBA</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A DBA does not create a separate liability-protecting entity. Determine whether an assumed-name filing applies to your structure and where it must be filed.</p></div>
              <div className="rounded-xl border p-5"><h3 className="font-semibold">Registered agent</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Texas filing entities must maintain a registered agent and registered office. The agent receives official legal and government notices and must have consented to serve.</p></div>
            </div>
          </section>

          <section id="taxes">
            <h2 className="font-serif text-3xl font-bold">Texas taxes: the part most startup checklists oversimplify</h2>
            <div className="mt-5 space-y-5 leading-7 text-muted-foreground">
              <p><strong className="text-foreground">EIN:</strong> The EIN is federal. The IRS issues it directly for free. Form the legal entity first when you are creating one, then apply for the EIN using the entity's correct legal name.</p>
              <p><strong className="text-foreground">Sales and use tax:</strong> If you sell taxable goods or taxable services, determine whether a Texas sales and use tax permit is required before collecting tax.</p>
              <p><strong className="text-foreground">Franchise tax:</strong> Many Texas entities are subject to the franchise-tax system even when no tax is ultimately due. For report years 2026 and 2027, the Comptroller lists a <strong className="text-foreground">$2.65 million no-tax-due threshold</strong>. Qualifying entities at or below that threshold generally do not file a No Tax Due Report, but many still must file a Public Information Report or Ownership Information Report.</p>
            </div>
          </section>

          <section id="boi" className="rounded-2xl border p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">2026 federal update</p>
            <h2 className="mt-2 font-serif text-2xl font-bold">BOI reporting changed</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Under FinCEN's current rule, U.S.-created companies are exempt from federal Beneficial Ownership Information reporting. Older startup guides may still say a newly created domestic LLC must file a BOI report, so verify the current FinCEN page before relying on an older checklist.</p>
            <a className="mt-4 inline-block font-semibold underline underline-offset-4" href="https://www.fincen.gov/boi" target="_blank" rel="noreferrer">Check current FinCEN BOI guidance →</a>
          </section>

          <section id="licenses">
            <h2 className="font-serif text-3xl font-bold">Licenses, permits and local requirements</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Texas does not issue a single general statewide business license. Restaurants, contractors, health-related businesses, regulated professions, alcohol sellers and many other activities can trigger specific requirements. Cities and counties can also impose zoning, building, fire, signage, health or other local rules.</p>
            <div className="mt-5 flex flex-wrap gap-3"><a className="rounded-lg border px-4 py-2 font-semibold hover:bg-muted/40" href="https://gov.texas.gov/business/page/business-permits-office" target="_blank" rel="noreferrer">Texas Business Permit Office</a><a className="rounded-lg border px-4 py-2 font-semibold hover:bg-muted/40" href="/county">Find Texas county information</a></div>
          </section>

          <section id="relocation" className="rounded-2xl border bg-muted/20 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Existing companies</p>
            <h2 className="mt-2 font-serif text-3xl font-bold">Moving or expanding an existing company?</h2>
            <p className="mt-3 leading-7 text-muted-foreground"><strong className="text-foreground">If the business move includes employees or a new Texas site</strong>, formation and tax registration are only part of the project. You may also need to compare labor markets, commute corridors, housing, schools, utilities, incentives and site-level operating conditions.</p>
            <div className="mt-5 flex flex-wrap gap-3"><a className="rounded-lg border px-4 py-2 font-semibold hover:bg-background" href="/moving-to-texas?companyMove=employer#corporate-relocation">Corporate relocation to Texas</a><a className="rounded-lg border px-4 py-2 font-semibold hover:bg-background" href="/texas-industries">Research Texas industries</a></div>
          </section>

          <section id="costs">
            <h2 className="font-serif text-3xl font-bold">What does it cost to start a business in Texas?</h2>
            <p className="mt-3 leading-7 text-muted-foreground">There is no universal startup price. A sole proprietor with no regulated activity can have very different costs from an LLC with employees, local permits and professional licensing.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="rounded-xl border p-5"><div className="text-3xl font-bold">$300</div><div className="mt-1 font-semibold">Texas LLC formation filing</div><p className="mt-2 text-sm leading-6 text-muted-foreground">Current Secretary of State fee for Form 205 / Certificate of Formation—Limited Liability Company.</p></div><div className="rounded-xl border p-5"><div className="text-3xl font-bold">$0</div><div className="mt-1 font-semibold">IRS EIN</div><p className="mt-2 text-sm leading-6 text-muted-foreground">The IRS issues EINs directly at no charge. Third-party filing services may charge their own fee.</p></div></div>
          </section>

          <section id="checklist">
            <h2 className="font-serif text-3xl font-bold">Before you open: Texas startup checklist</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{[
              "Business structure selected", "Legal name checked", "Registered agent confirmed when required", "Formation or assumed-name filings completed", "EIN obtained when needed", "Business bank account opened", "Bookkeeping system established", "Sales-tax permit checked", "Professional or industry licenses checked", "City and county permits or zoning checked", "Employer obligations reviewed", "Compliance deadlines calendared",
            ].map((item) => <div key={item} className="rounded-lg border p-4 text-sm font-medium">✓ {item}</div>)}</div>
          </section>

          <section id="faq">
            <h2 className="font-serif text-3xl font-bold">Texas business startup FAQ</h2>
            <div className="mt-5 divide-y rounded-xl border">{START_BUSINESS_FAQ.map((item) => <details key={item.question} className="group p-5"><summary className="cursor-pointer list-none font-semibold">{item.question}</summary><p className="mt-3 leading-7 text-muted-foreground">{item.answer}</p></details>)}</div>
          </section>

          <section id="sources">
            <h2 className="font-serif text-3xl font-bold">Official sources</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Use these agencies as the source of truth for filing fees, tax rules, licensing and federal requirements.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">{sources.map(([label, href]) => <a key={href} className="rounded-xl border p-4 font-semibold hover:bg-muted/30" href={href} target="_blank" rel="noreferrer">{label} →</a>)}</div>
          </section>

          <section className="rounded-2xl border p-6">
            <h2 className="font-serif text-2xl font-bold">Keep researching Texas</h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3"><a className="font-semibold underline underline-offset-4" href="/texas-industries">Texas industries</a><a className="font-semibold underline underline-offset-4" href="/made-in-texas">Made in Texas</a><a className="font-semibold underline underline-offset-4" href="/moving-to-texas">Moving to Texas</a><a className="font-semibold underline underline-offset-4" href="/texas-resources">Texas resources</a></div>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">This guide is general information, not legal, tax or accounting advice. Rules and fees can change; verify requirements with the responsible agency and qualified professionals when needed.</p>
          </section>
        </article>

        <aside className="hidden lg:block"><div className="sticky top-24 rounded-xl border p-5"><div className="font-semibold">On this page</div><nav className="mt-4 grid gap-2 text-sm text-muted-foreground"><a href="#steps">10-step process</a><a href="#structure">Business structures</a><a href="#name-agent">Name & registered agent</a><a href="#taxes">Taxes & EIN</a><a href="#boi">BOI update</a><a href="#licenses">Licenses & permits</a><a href="#relocation">Company relocation</a><a href="#costs">Startup costs</a><a href="#checklist">Checklist</a><a href="#faq">FAQ</a><a href="#sources">Official sources</a></nav></div></aside>
      </div>
    </main>
  );
}
