import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';

const description = 'TexasDefined relocation finders for school districts, DMV and county offices, utilities, voter registration, homestead exemptions, property taxes, emergency services, ZIP research and city comparison.';
const tools = [
  ['Find my school district', '/find-my-school-district', 'Establish local context, then verify the exact address with the Texas Education Agency and the district.'],
  ['Find my DMV or county office', '/find-my-dmv', 'Route driver-license, registration, title and county-tax-office tasks to the right system.'],
  ['Find my county', '/find-my-county', 'Search Texas cities and counties before handling local services, taxes or records.'],
  ['Find my utilities', '/find-my-utilities', 'Move from city/county context to official PUCT electric, water and sewer service-area tools.'],
  ['Find voter registration', '/find-my-voter-registration', 'Connect county context with the Texas Secretary of State voter portal and registration information.'],
  ['Find homestead exemption filing', '/find-my-homestead-exemption', 'Locate the appraisal-district path for residence-homestead exemption filing.'],
  ['Find property-tax offices', '/find-my-property-tax', 'Locate appraisal-district, property-search and county tax-office resources.'],
  ['Find emergency & community services', '/find-my-emergency-services', 'Connect local context with 911 guidance and 2-1-1 Texas community resources.'],
  ['Texas ZIP Code Explorer', '/texas-zip-code-explorer', 'Use a ZIP as a research starting point without pretending postal geography equals local boundaries.'],
  ['Compare Texas cities', '/compare-texas-cities', 'Compare TexasDefined relocation-planning descriptors before narrowing to neighborhoods and addresses.'],
] as const;

export const Route = createLazyFileRoute('/moving-to-texas/tools')({ component: Page });

function Page() {
  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16"><article className="mx-auto max-w-6xl">
    <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span className="mx-2">/</span><span aria-current="page" className="text-foreground">Tools</span></nav>
    <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end"><div><p className="eyebrow text-primary">Relocation toolkit</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas relocation tools built around the decisions that change by address</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p></div><p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">These are research and decision tools, not shortcuts around official records. TexasDefined organizes the path; agencies and local offices remain the source of record.</p></header>
    <section className="py-10"><div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">{tools.map(([name, to, copy], index) => <Link key={to} to={to} className="group bg-background p-6"><span className="eyebrow text-primary">Tool {String(index + 1).padStart(2, '0')}</span><h2 className="mt-2 font-display text-2xl group-hover:text-primary">{name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-5 inline-block text-sm font-semibold text-primary">Open tool →</span></Link>)}</div></section>
    <section className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3"><Link to="/moving-to-texas-checklist" className="bg-background p-5 font-semibold hover:text-primary">Moving checklist →</Link><Link to="/decide/financial-tools" className="bg-background p-5 font-semibold hover:text-primary">Financial calculators →</Link><Link to="/browse/cities" className="bg-background p-5 font-semibold hover:text-primary">City directory →</Link></section>
  </article></Container>;
}
