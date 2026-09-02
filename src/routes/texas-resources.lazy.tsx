import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';

type ResourceGroup = { title: string; links: ReadonlyArray<readonly [string, string]> };

const description = 'A practical starting point for moving, driving, buying and owning a home, finding Texas state agencies and navigating everyday life across the state.';

const groups: ReadonlyArray<ResourceGroup> = [
  {
    title: 'Everyday Texas services',
    links: [
      ['Texas Services: how-to hub', '/texas-services'],
      ['Texas driver license', '/texas-drivers-license'],
      ['Track a Texas driver license or ID', '/track-texas-drivers-license'],
      ['Texas by Texas (TxT)', '/texas-by-texas-txt'],
      ['Texas DMV', '/texas-dmv'],
      ['Texas vehicle registration', '/texas-vehicle-registration'],
      ['Replace a lost registration receipt', '/replace-texas-registration-receipt'],
      ['Texas toll tags: EZ TAG vs. TxTag vs. TollTag', '/texas-toll-tags'],
      ['Find your DMV or county office', '/find-my-dmv'],
      ['Texas birth certificate', '/texas-birth-certificate'],
      ['Texas hunting license', '/texas-hunting-license'],
      ['Texas fishing license', '/texas-fishing-license'],
      ['Find your school district', '/find-my-school-district'],
    ],
  },
  {
    title: 'Moving and settling in',
    links: [
      ['Moving to Texas', '/moving-to-texas'],
      ['Your first-month checklist', '/moving-to-texas-checklist'],
      ['Texas moving-cost calculator', '/texas-moving-cost-calculator'],
      ['Texas cost-of-living calculator', '/texas-cost-of-living-calculator'],
      ['Texas utility-cost calculator', '/texas-utility-cost-calculator'],
      ['Register your vehicle', '/texas-vehicle-registration'],
      ['Choose a Texas toll tag', '/texas-toll-tags'],
      ['Check flood maps and flood risk', '/texas-flood-information'],
    ],
  },
  {
    title: 'Money and homeownership',
    links: [
      ['Money & Property', '/decide/financial-tools'],
      ['How to start a business in Texas', '/start-a-business-in-texas'],
      ['Get a Texas sales tax permit', '/texas-sales-tax-permit'],
      ['How Texas sales tax works', '/texas-sales-tax-explained'],
      ['Look up property taxes and appraisal records', '/texas-property-tax-lookup'],
      ['Understand property taxes', '/learn/property-taxes'],
      ['Property-tax guide library', '/property-tax-guides'],
      ['Property-tax calculator toolkit', '/property-tax-calculators'],
      ['County property-tax guides', '/property-tax/counties'],
      ['File a homestead exemption', '/do/homestead-exemption'],
      ['Protest your appraisal', '/do/property-tax-protest'],
      ['Get a Texas septic permit', '/texas-septic-permit'],
      ['Texas septic system design & OSSF guide', '/article/texas-septic-systems-homeowner-guide'],
      ['First-time homebuyer help', '/texas-first-time-homebuyer-programs'],
      ['Texas mortgage calculator', '/texas-mortgage-calculator'],
      ['Texas home-insurance calculator', '/texas-home-insurance-calculator'],
    ],
  },
  {
    title: 'Texas state agencies and services',
    links: [
      ['Texas Secretary of State agency page', '/agency/texas-secretary-of-state'],
      ['Texas Comptroller agency page', '/agency/texas-comptroller'],
      ['Texas Department of Insurance', '/agency/texas-department-insurance'],
      ['Texas Department of Motor Vehicles agency page', '/agency/texas-dmv'],
      ['Texas Commission on Environmental Quality', '/agency/texas-commission-environmental-quality'],
      ['Texas Education Agency', '/agency/texas-education-agency'],
      ['Texas Health and Human Services', '/agency/texas-health-human-services'],
      ['Texas Parks and Wildlife', '/agency/texas-parks-wildlife'],
      ['Texas Department of Public Safety agency page', '/agency/texas-dps'],
      ['Texas Workforce Commission', '/agency/texas-workforce-commission'],
      ['Public Utility Commission of Texas', '/agency/public-utility-commission'],
    ],
  },
  {
    title: 'Finding your place',
    links: [
      ['Explore Texas', '/explore'],
      ['Best places to go camping in Texas', '/best-places-to-go-camping-in-texas'],
      ['Texas state parks', '/explore/state-parks'],
      ['Texas lakes and rivers', '/explore/lakes-rivers'],
      ['Texas small towns', '/explore/small-towns'],
      ['Find your county', '/browse/counties'],
      ['Find a city', '/browse/cities'],
      ['Build a Texas trip', '/explore/trip-planner'],
    ],
  },
  {
    title: 'Texas culture and traditions',
    links: [
      ['Texas vs every other state', '/texas-vs-every-state'],
      ['State Fair of Texas 2026', '/texas-state-fair'],
      ['Texas flag', '/texas-flag'],
      ['Texas Two Step', '/texas-two-step'],
      ['Texas Explained', '/texas-explained'],
      ['Texas facts', '/texas-facts'],
      ['Is everything really bigger in Texas?', '/everything-bigger-in-texas'],
      ['What does chud mean?', '/what-does-chud-mean'],
      ['Things unique to Texas', '/things-unique-to-texas'],
      ['Texas food history', '/texas-food-history'],
    ],
  },
  {
    title: 'Stories and everyday Texas',
    links: [
      ['Texas Life', '/texas-living'],
      ['Sports', '/sports'],
      ['History', '/texas-history'],
      ['Home & Garden', '/home-garden'],
      ['Homes & Land', '/real-estate'],
      ['Guides & Tools', '/guides'],
      ['About Texas Defined', '/about'],
    ],
  },
];

export const Route = createLazyFileRoute('/texas-resources')({ component: Page });

function Page() {
  return (
    <>
      <DepartmentHero current="Start Here" eyebrow="The Texas Guidebook" title="Good answers for everyday Texas life" description={description} />
      <Container className="py-12 sm:py-16">
        <aside className="max-w-3xl border-y border-border py-5 text-sm leading-7 text-muted-foreground">
          <p className="eyebrow text-primary">How to use this page</p>
          <p className="mt-3">Start with the task in front of you. These Texas Defined guides connect practical explanations with reference pages for the state agencies, official offices and records that matter when details need verification.</p>
        </aside>
        <div className="mt-8 divide-y divide-border">
          {groups.map((group, groupIndex) => (
            <section key={group.title} className="grid gap-7 py-10 lg:grid-cols-[15rem_1fr]">
              <div>
                <p className="eyebrow text-primary">Section {String(groupIndex + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 font-display text-3xl leading-tight">{group.title}</h2>
              </div>
              <div className="grid sm:grid-cols-2">
                {group.links.map(([label, to]) => (
                  <Link key={`${group.title}-${to}-${label}`} to={to} className="group border-t border-border py-4 sm:px-5">
                    <span className="font-display text-xl group-hover:text-primary">{label}</span>
                    <span className="ml-2 text-sm text-muted-foreground">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        <footer className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
          Looking for a place rather than a practical guide? <Link to="/explore" className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4">Open the Texas travel guide.</Link>
        </footer>
      </Container>
    </>
  );
}
