import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';

type ResourceGroup = {
  title: string;
  description: string;
  links: ReadonlyArray<readonly [string, string, string]>;
};

const description = 'Find practical Texas services, state agencies, local offices, moving help, property-tax resources and everyday answers organized around what you need to do.';

const featuredTasks = [
  ['Driver license & ID', '/texas-drivers-license', 'Renew, replace, track or understand a Texas driver license or state ID.'],
  ['Vehicle registration', '/texas-vehicle-registration', 'Registration, renewal, receipts and the right county or DMV office.'],
  ['Find my county', '/find-my-county', 'Use an address to identify the Texas county that serves a location.'],
  ['Find my school district', '/find-my-school-district', 'Look up the public school district tied to an address.'],
  ['Property taxes & homestead', '/decide/property-taxes', 'Estimate taxes, find filing paths and understand exemptions or protests.'],
  ['Start a business', '/start-a-business-in-texas', 'Follow the Texas setup path for entities, tax accounts and common filings.'],
  ['Moving to Texas', '/moving-to-texas', 'Plan the first practical steps for relocating and settling in.'],
  ['Find the right office', '/find-my-dmv', 'Locate the DMV or county office for a vehicle-related task.'],
] as const;

const groups: ReadonlyArray<ResourceGroup> = [
  {
    title: 'Texas services',
    description: 'Common state and local tasks, organized around the thing you are trying to get done.',
    links: [
      ['Track a driver license or ID', '/track-texas-drivers-license', 'Check the status of a Texas driver license or ID after an application or renewal.'],
      ['Texas by Texas (TxT)', '/texas-by-texas-txt', 'Understand the state digital-services account and what it can handle.'],
      ['Texas DMV', '/texas-dmv', 'Start with the Texas Department of Motor Vehicles for vehicle-related services.'],
      ['Replace a lost registration receipt', '/replace-texas-registration-receipt', 'Find the correct replacement path and office.'],
      ['Texas toll tags', '/texas-toll-tags', 'Compare EZ TAG, TxTag and TollTag before choosing one.'],
      ['Fishing license', '/texas-fishing-license', 'Find Texas fishing-license requirements and the official purchase path.'],
      ['Hunting licenses & public hunting', '/hunting', 'Start with license, season and public-land information.'],
      ['Voter-registration resources', '/find-my-voter-registration', 'Find the official Texas voter-registration path for your situation.'],
    ],
  },
  {
    title: 'Home, property & moving',
    description: 'Practical tools for settling in, owning a home and finding the local offices tied to an address.',
    links: [
      ['Moving to Texas checklist', '/moving-to-texas-checklist', 'Work through the first-month tasks in a practical order.'],
      ['Emergency & community services', '/find-my-emergency-services', 'Find local emergency and community resources by location.'],
      ['Homestead-exemption filing path', '/find-my-homestead-exemption', 'Identify where and how to file a Texas homestead exemption.'],
      ['Texas ZIP code explorer', '/texas-zip-code-explorer', 'Explore location context and local reference information by ZIP code.'],
      ['Property-tax guide library', '/property-tax-guides', 'Browse plain-English guides to Texas property taxes.'],
      ['County property-tax guides', '/property-tax/counties', 'Use county-specific property-tax reference pages.'],
      ['Protest your appraisal', '/do/property-tax-protest', 'Understand the Texas appraisal-protest process and next steps.'],
      ['First-time homebuyer help', '/texas-first-time-homebuyer-programs', 'Review Texas programs and practical homebuying resources.'],
      ['Money & property tools', '/decide/financial-tools', 'Use calculators for housing, moving, utilities, insurance and affordability.'],
    ],
  },
  {
    title: 'Work & business',
    description: 'Start with the business or employment task, then follow the relevant Texas agency or guide.',
    links: [
      ['Start a business in Texas', '/start-a-business-in-texas', 'Entity setup, registrations, tax accounts and common first steps.'],
      ['Texas sales tax', '/texas-sales-tax-explained', 'Understand when sales tax applies and where official rules live.'],
      ['Texas industries', '/texas-industries', 'Explore the industries that shape the state economy.'],
      ['Texas jobs and economy', '/article/texas-jobs-economy-industries', 'Read the broader employment and economic context.'],
      ['Texas Workforce Commission', '/agency/texas-workforce-commission', 'Start here for workforce, unemployment and employer services.'],
      ['Texas Comptroller', '/agency/texas-comptroller', 'Use the Comptroller path for state tax and business-account questions.'],
    ],
  },
  {
    title: 'Texas agencies & official help',
    description: 'Choose the problem first. Each guide explains the agency role and points you toward the official source for final verification or action.',
    links: [
      ['Business registration — Secretary of State', '/agency/texas-secretary-of-state', 'Entity formation, business records and certain statewide filings.'],
      ['Insurance questions — Texas Department of Insurance', '/agency/texas-department-insurance', 'Insurance regulation, consumer help and complaint pathways.'],
      ['Driver license or ID — Texas DPS', '/agency/texas-dps', 'Driver license, identification and other Department of Public Safety services.'],
      ['Vehicle title or registration — TxDMV', '/agency/texas-dmv', 'Vehicle titles, registrations, dealers and related services.'],
      ['Utility issues — Public Utility Commission', '/agency/public-utility-commission', 'Electric, telecom and other regulated utility questions.'],
      ['Environmental issues — TCEQ', '/agency/texas-commission-environmental-quality', 'Environmental permits, complaints and regulatory information.'],
      ['Schools — Texas Education Agency', '/agency/texas-education-agency', 'State-level public-education information and oversight.'],
      ['Health & benefits — Texas HHSC', '/agency/texas-health-human-services', 'Health, human-services and benefit-program information.'],
      ['Parks, hunting & fishing — TPWD', '/agency/texas-parks-wildlife', 'State parks, wildlife, hunting and fishing programs.'],
    ],
  },
];

export const Route = createLazyFileRoute('/texas-resources')({ component: Page });

function Page() {
  return (
    <>
      <DepartmentHero
        current="Texas Resources"
        eyebrow="The Texas Guidebook"
        title="Texas Resources: Find the Service, Office or Answer You Need"
        description={description}
      />
      <Container className="py-12 sm:py-16">
        <section aria-labelledby="popular-tasks" className="border-y border-border py-8 sm:py-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Start with the task</p>
            <h2 id="popular-tasks" className="mt-2 font-display text-3xl leading-tight sm:text-4xl">What do you need to do?</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              These are the most useful starting points for common Texas tasks. Use the guide first, then follow the official agency or local-office path when you are ready to verify details or take action.
            </p>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {featuredTasks.map(([label, to, summary]) => (
              <Link key={to} to={to} className="group bg-background p-5 transition-colors hover:bg-muted/40">
                <h3 className="font-display text-xl leading-snug group-hover:text-primary">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{summary}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-foreground">Open guide →</span>
              </Link>
            ))}
          </div>
        </section>

        <aside className="mt-8 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Texas Defined explains the path; the responsible government office remains the source of record.</p>
          <p className="mt-1">Use these guides to figure out where to go and what to expect, then confirm deadlines, fees, eligibility and filing requirements with the linked official source.</p>
        </aside>

        <div className="mt-8 divide-y divide-border">
          {groups.map((group, groupIndex) => (
            <section key={group.title} className="grid gap-7 py-10 lg:grid-cols-[16rem_1fr]">
              <div>
                <p className="eyebrow text-primary">Section {String(groupIndex + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 font-display text-3xl leading-tight">{group.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.description}</p>
              </div>
              <div className="grid gap-px border-y border-border bg-border sm:grid-cols-2">
                {group.links.map(([label, to, summary]) => (
                  <Link key={`${group.title}-${to}-${label}`} to={to} className="group bg-background px-5 py-5 transition-colors hover:bg-muted/40">
                    <span className="font-display text-xl group-hover:text-primary">{label}</span>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="grid gap-4 border-t border-border pt-7 text-sm leading-6 text-muted-foreground sm:grid-cols-3">
          <p>
            Looking for destinations and trip ideas?{' '}
            <Link to="/explore" className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4">Explore Texas.</Link>
          </p>
          <p>
            Looking for data and statewide reference pages?{' '}
            <Link to="/texas-data" className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4">Open Texas Data.</Link>
          </p>
          <p>
            Looking for culture, customs or plain-English explainers?{' '}
            <Link to="/texas-explained" className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4">Open Texas Explained.</Link>
          </p>
        </footer>
      </Container>
    </>
  );
}
