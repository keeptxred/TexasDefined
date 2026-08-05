import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Texas calculators and planning guides for property taxes, mortgages, affordability, relocation, utilities, insurance, counties, cities, and household decisions.';
export const Route = createFileRoute('/decide/financial-tools')({ head: () => ({ meta: buildMeta(texasDefinedBrand, { title: 'Texas Financial Tools', description }), links: [canonicalLink(texasDefinedBrand, '/decide/financial-tools')] }), component: Page });
const resources = [
  ['Texas property-tax calculator', '/decide/property-taxes', 'Estimate taxable value and annual and monthly property-tax costs.'],
  ['Texas mortgage calculator', '/texas-mortgage-calculator', 'Estimate principal, interest, property taxes and insurance.'],
  ['Home affordability calculator', '/texas-home-affordability-calculator', 'Estimate an illustrative home-price range from income, debts and housing costs.'],
  ['Rent vs buy calculator', '/texas-rent-vs-buy-calculator', 'Compare simplified long-term renting and owning costs.'],
  ['Cost of living calculator', '/texas-cost-of-living-calculator', 'Translate current household spending with adjustable local indexes.'],
  ['Texas salary calculator', '/texas-salary-calculator', 'Estimate take-home pay after adjustable deductions.'],
  ['Moving cost calculator', '/texas-moving-cost-calculator', 'Estimate transportation, packing, setup and a contingency reserve.'],
  ['Utility cost calculator', '/texas-utility-cost-calculator', 'Estimate monthly and annual household utility costs.'],
  ['Home insurance calculator', '/texas-home-insurance-calculator', 'Model an illustrative premium from replacement cost and coverage additions.'],
  ['Complete property-tax guide', '/learn/property-taxes', 'Understand appraisal, exemptions, rates, bills, protests, and payments.'],
  ['Homestead exemption guide', '/do/homestead-exemption', 'Review eligibility, filing steps, and what to verify after approval.'],
  ['Property-tax protest guide', '/do/property-tax-protest', 'Prepare deadlines, evidence, informal review, and ARB hearing steps.'],
  ['Texas county directory', '/browse/counties', 'Continue to county, appraisal district, and official local resources.'],
  ['Texas city directory', '/browse/cities', 'Browse Texas cities by county and region.'],
  ['Moving to Texas', '/moving-to-texas', 'Plan where to live, what to budget for, and how to get settled.'],
  ['Moving checklist', '/moving-to-texas-checklist', 'Organize practical steps before and after arrival.'],
] as const;
function Page() { return <Container className="py-16 sm:py-24"><main className="mx-auto max-w-6xl"><p className="eyebrow text-primary">Guides and calculators</p><h1 className="mt-3 font-display text-4xl sm:text-6xl">Texas Financial Tools</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{resources.map(([title, to, copy]) => <Link key={to} to={to} className="rounded-lg border border-border p-6 transition hover:-translate-y-0.5 hover:shadow-sm"><h2 className="font-display text-2xl">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-5 block text-sm font-medium text-primary">Open resource →</span></Link>)}</div><aside className="mt-10 rounded-lg bg-muted p-6 text-sm leading-6 text-muted-foreground">These tools provide planning estimates and educational information. Confirm official rates, eligibility, deadlines, quotes and parcel-level details with the responsible provider or agency.</aside></main></Container>; }
