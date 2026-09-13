import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Texas relocation tools for comparing costs, schools, taxes, insurance, utilities, housing and the state and local offices you need after a move.';

const groups = [
  {
    title: 'Start here',
    tools: [
      ['Texas new-resident checklist', '/moving-to-texas-checklist', 'Work through the move in practical order: before arrival, first weeks, vehicles, licensing, taxes and home paperwork.'],
      ['Where should I live in Texas?', '/moving-to-texas', 'Use the relocation decision lab to compare regions, settings, commute patterns, climate and housing-planning priorities.'],
      ['Texas city and county comparison', '/browse/cities', 'Move from metro-level research into city and county authority pages before narrowing to an address.'],
      ['Texas moving cost calculator', '/texas-moving-cost-calculator', 'Estimate transportation, packing, travel, storage, deposits and setup costs.'],
      ['Texas cost-of-living calculator', '/texas-cost-of-living-calculator', 'Compare the recurring household budget using your own assumptions.'],
      ['Texas salary calculator', '/texas-salary-calculator', 'Estimate take-home pay and compare a Texas job offer with realistic deductions.'],
    ],
  },
  {
    title: 'Home and taxes',
    tools: [
      ['Property-tax calculators', '/property-tax-calculators', 'Use parcel-oriented local tax tools and statewide estimators before comparing homes.'],
      ['Homestead savings calculator', '/texas-homestead-savings-calculator', 'Estimate the effect of residence-homestead relief on a qualifying home.'],
      ['MUD tax impact calculator', '/texas-mud-tax-impact-calculator', 'Model the additional tax effect of a municipal utility district.'],
      ['Home affordability calculator', '/texas-home-affordability-calculator', 'Model price, income, debt, taxes, insurance and recurring ownership costs.'],
      ['Mortgage calculator', '/texas-mortgage-calculator', 'Estimate principal, interest and the broader monthly housing payment.'],
      ['Rent vs. buy calculator', '/texas-rent-vs-buy-calculator', 'Compare renting and owning using a transparent set of editable assumptions.'],
      ['Closing-cost calculator', '/texas-closing-cost-calculator', 'Estimate cash needed at closing beyond the down payment.'],
      ['Homeowners-insurance calculator', '/texas-home-insurance-calculator', 'Build an insurance planning estimate before requesting actual quotes.'],
      ['Homeownership-cost calculator', '/texas-homeownership-cost-calculator', 'Combine recurring ownership costs that are easy to overlook during a move.'],
      ['Property-tax county comparison', '/texas-property-tax-county-comparison-calculator', 'Compare county-level property-tax planning assumptions before choosing a market.'],
    ],
  },
  {
    title: 'Schools, offices and address lookups',
    tools: [
      ['Find my school district', '/find-my-school-district', 'Start with an address-level school-district lookup, then verify enrollment and attendance zones with the district.'],
      ['Find my DMV / county office', '/find-my-dmv', 'Route driver, registration, title and county-tax-office tasks to the correct agency.'],
      ['Research a Texas address', '/moving-to-texas', 'Resolve county, Census place and unified school-district context from a Texas address, then verify official boundaries.'],
      ['Find my appraisal district', 'https://comptroller.texas.gov/taxes/property-tax/county-directory/', 'Use the Texas Comptroller county directory to reach the appraisal district and local property-tax offices.'],
      ['Register to vote / check status', 'https://www.votetexas.gov/register-to-vote/', 'Use the official Texas election source for registration rules and current deadlines.'],
      ['Find Texas public schools', 'https://tea.texas.gov/families-and-students/finding-school-your-child/finding-school', 'Use TEA resources to verify districts, campuses and enrollment information.'],
    ],
  },
  {
    title: 'Utilities, insurance and risk',
    tools: [
      ['Texas utility-cost calculator', '/texas-utility-cost-calculator', 'Estimate electricity, water, gas, internet and other recurring utility costs.'],
      ['Electricity plan shopping', 'https://www.powertochoose.org/', 'Use the Public Utility Commission marketplace where retail choice applies.'],
      ['Flood risk lookup', 'https://msc.fema.gov/portal/home', 'Check the FEMA Flood Map Service Center for official flood-map information.'],
      ['Texas insurance resources', 'https://www.tdi.texas.gov/', 'Use the Texas Department of Insurance for consumer guidance and current market information.'],
      ['Broadband availability', 'https://broadbandmap.fcc.gov/home', 'Check address-level fixed and mobile broadband availability on the FCC map.'],
      ['Texas budget planner', '/texas-budget-planner', 'Combine housing, utilities, transportation, insurance, food and savings into one household budget.'],
    ],
  },
] as const;

function external(href: string) { return href.startsWith('http'); }

export const Route = createFileRoute('/moving-to-texas-tools')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: '/moving-to-texas-tools', title: 'Texas Relocation Tools: Moving, Schools, Taxes & Costs', description }),
    links: [canonicalLink(texasDefinedBrand, '/moving-to-texas-tools')],
  }),
  component: Page,
});

function Page() {
  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <p className="eyebrow text-primary">Texas relocation toolkit</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The tools to plan a Texas move from one place</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/moving-to-texas" className="text-primary underline underline-offset-4">Relocation hub</Link><Link to="/moving-to-texas-100-things" className="underline underline-offset-4">100 things to know before moving</Link><Link to="/moving-to-texas-checklist" className="underline underline-offset-4">First-month checklist</Link></div>
      </Container>
    </section>

    <Container className="py-14 sm:py-20">
      <p className="max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined uses calculators where transparent estimates are useful and sends you to the responsible government or utility source where an address, legal boundary, current rate or official status must be verified. That keeps the toolkit practical without pretending a statewide average can answer an address-specific question.</p>
      <div className="mt-10 space-y-14">
        {groups.map((group) => <section key={group.title} aria-labelledby={group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') }>
          <h2 id={group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-display text-4xl">{group.title}</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {group.tools.map(([title, href, copy]) => {
              const cls = 'group bg-background p-6 hover:bg-surface';
              const body = <><h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.13em] text-primary">Open tool {external(href) ? '↗' : '→'}</span></>;
              return external(href) ? <a key={href} href={href} target="_blank" rel="noreferrer" className={cls}>{body}</a> : <Link key={href} to={href} className={cls}>{body}</Link>;
            })}
          </div>
        </section>)}
      </div>
    </Container>
  </>;
}
