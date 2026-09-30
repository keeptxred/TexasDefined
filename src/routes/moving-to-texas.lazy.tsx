import { lazy, Suspense } from "react";
import { createLazyFileRoute, Link, Outlet, useChildMatches } from "@tanstack/react-router";

import roadTrip from "@/assets/road-trip.jpg";
import { CitationTrustPanel } from "@/components/authority/CitationTrustPanel";
import { TexasCountyComparisonTable } from "@/components/counties/TexasCountyComparisonTable";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { CITY_AUTHORITY_INDEX, cityAuthorityPath } from "@/data/city-authority-index";
import { RELOCATION_CITY_PAIRS, relocationCityPairPath } from "@/data/relocation-city-pairs";

const RelocationAuthorityLab = lazy(() => import("@/components/relocation/RelocationAuthorityLab").then((module) => ({ default: module.RelocationAuthorityLab })));
const RelocationCommandCenter = lazy(() => import("@/components/relocation/RelocationCommandCenter").then((module) => ({ default: module.RelocationCommandCenter })));
const description = "A clear-eyed guide to choosing a Texas city or county, understanding the cost and property context, finding a home and settling into everyday life in a very large state.";
const imageAlt = "A two-lane Texas farm road running to the horizon";
const arrivalTasks = [
  ["Texas driver license", "/texas-drivers-license", "Start here for renewals, appointments, REAL ID, replacements and address changes, with direct links to the official DPS transaction pages."],
  ["Texas vehicle registration", "/texas-vehicle-registration", "Understand registration, renewal and the role of TxDMV and your county tax assessor-collector."],
  ["Texas DMV", "/texas-dmv", "Use the TxDMV guide for titles, vehicle registration, dealers and motor-carrier services."],
  ["Find my DMV or county office", "/find-my-dmv", "Move from statewide rules to the local office that actually serves your county."],
  ["Texas moving cost calculator", "/texas-moving-cost-calculator", "Build the one-time move budget around transportation, packing, travel, storage, deposits and setup costs before comparing the new monthly budget."],
  ["Texas cost-of-living calculator", "/texas-cost-of-living-calculator", "Compare household-budget assumptions before choosing a city or signing a lease."],
  ["Texas resources", "/texas-resources", "Open Texas Defined's practical guidebook for moving, driving, property, money, travel and everyday Texas life."],
] as const;
const localTaxTools = [
  ["Houston", "/property-tax-calculator/houston", "Harris, Fort Bend or Montgomery County starting points with parcel-level taxing-unit selection."],
  ["Austin", "/property-tax-calculator/austin", "Travis, Williamson or Hays County starting points with local school, city and district rates."],
  ["Frisco", "/property-tax-calculator/frisco", "Collin or Denton County starting points with address-specific school and local taxing units."],
] as const;
const localAffordabilityTools = [
  ["Houston", "/texas-home-affordability-calculator/houston"],
  ["Austin", "/texas-home-affordability-calculator/austin"],
  ["Dallas", "/texas-home-affordability-calculator/dallas"],
  ["Fort Worth", "/texas-home-affordability-calculator/fort-worth"],
  ["San Antonio", "/texas-home-affordability-calculator/san-antonio"],
  ["Frisco", "/texas-home-affordability-calculator/frisco"],
  ["El Paso", "/texas-home-affordability-calculator/el-paso"],
] as const;
const localCostOfLivingTools = [
  ["Houston", "/texas-cost-of-living-calculator/houston"],
  ["Austin", "/texas-cost-of-living-calculator/austin"],
  ["Dallas", "/texas-cost-of-living-calculator/dallas"],
  ["Fort Worth", "/texas-cost-of-living-calculator/fort-worth"],
  ["San Antonio", "/texas-cost-of-living-calculator/san-antonio"],
  ["Frisco", "/texas-cost-of-living-calculator/frisco"],
  ["El Paso", "/texas-cost-of-living-calculator/el-paso"],
] as const;
const localSalaryNeededTools = [
  ["Houston", "/texas-salary-needed-calculator/houston"],
  ["Austin", "/texas-salary-needed-calculator/austin"],
  ["Dallas", "/texas-salary-needed-calculator/dallas"],
  ["Fort Worth", "/texas-salary-needed-calculator/fort-worth"],
  ["San Antonio", "/texas-salary-needed-calculator/san-antonio"],
  ["Frisco", "/texas-salary-needed-calculator/frisco"],
  ["El Paso", "/texas-salary-needed-calculator/el-paso"],
] as const;
const industryResearchLinks = [
  ["Texas industries", "/texas-industries", "Start with the statewide authority hub, then follow the sector that matches your field into its major Texas regions and cities."],
  ["Texas jobs & economy", "/article/texas-jobs-economy-industries", "Use the practical statewide overview to understand where major job systems concentrate before comparing a move."],
  ["Made in Texas", "/made-in-texas", "See companies, products and operating relationships tied to Texas communities without treating a headquarters as proof of local manufacturing."],
  ["Salary comparison by city", "/texas-salary-comparison-by-city", "Compare salary-planning tools after you identify the cities where your industry is strongest."],
] as const;
const priorityOriginStates = [
  ["California", "/texas-vs/california"],
  ["New York", "/texas-vs/new-york"],
  ["Illinois", "/texas-vs/illinois"],
  ["Florida", "/texas-vs/florida"],
  ["Colorado", "/texas-vs/colorado"],
] as const;
const priorityRelocationGuides = [
  ["Best Houston Suburbs for Commuters", "/article/best-houston-suburbs-for-commuters", "Choose a Houston-area search zone from the actual job corridor, Park & Ride options and address-level costs instead of a generic suburb ranking."],
  ["Best Dallas Suburbs for Commuters", "/article/best-dallas-suburbs-for-commuters", "Match Dallas-area suburbs to downtown, Las Colinas, Plano and other work centers with road, rail and total household cost in the same comparison."],
  ["Texas Property Taxes for New Residents", "/article/texas-property-taxes-for-new-residents", "Understand appraisal districts, taxing units, homestead research and why the previous owner's bill should not be copied into a new household budget."],
  ["Corporate Relocation to Texas", "/article/corporate-relocation-to-texas", "Connect site selection, workforce, registration, taxes and employee transition with current Texas and federal source links."],
  ["Employee Relocation Guide to Texas", "/article/employee-relocation-guide-to-texas", "Turn an employer transfer into a household plan for benefits, housing, commuting, utilities, vehicles and first-month tasks."],
  ["Moving to Texas as a Renter", "/article/moving-to-texas-renter-guide", "Review the lease, deposits, utilities, insurance and exact-address facts before committing to a Texas rental."],
  ["How to Verify a Texas Moving Company", "/article/how-to-verify-texas-moving-company", "Use TxDMV and FMCSA records to verify the company, authority and carrier-or-broker role before loading begins."],
  ["Health Insurance When Moving to Texas", "/article/health-insurance-when-moving-to-texas", "Coordinate employer or Marketplace coverage, provider networks and any move-related Special Enrollment Period."],
  ["Military Family Moving to Texas", "/article/military-family-moving-to-texas", "Join Military OneSource and installation PCS requirements with Texas housing, schools, TRICARE and address-level research."],
] as const;

export const Route = createLazyFileRoute("/moving-to-texas")({ component: MovingToTexasPage });

function MovingToTexasPage() {
  const childMatches = useChildMatches();
  const { counties } = Route.useLoaderData();

  if (childMatches.length > 0) {
    return <Outlet />;
  }

  const largestCounties = counties
    .filter((county) => county.population2020 != null)
    .slice()
    .sort((a, b) => Number(b.population2020) - Number(a.population2020) || a.name.localeCompare(b.name))
    .slice(0, 20);
  return <>
    <CategoryPage category="moving-to-texas" eyebrow="The relocation guide" title="What to know before you move to Texas" intro={description} image={{ src: roadTrip, alt: imageAlt, width: 1600, height: 1067 }} />
    <Suspense fallback={null}><RelocationCommandCenter /></Suspense>
    <Suspense fallback={null}><RelocationAuthorityLab showPlaceExplorer={false} /></Suspense>
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <section className="mb-12 border-b border-border pb-10" aria-labelledby="moving-texas-origin-state">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Moving from another state</p><h2 id="moving-texas-origin-state" className="mt-2 font-display text-3xl">Start with the state you are leaving</h2></div><Link to="/texas-vs-every-state" className="text-sm font-semibold text-primary">Compare Texas with all 49 states →</Link></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These priority guides use the existing Texas-versus-state evidence system to answer moving-to-Texas questions without creating duplicate doorway pages. Use the state comparison first, then narrow the move to a Texas metro, county and exact address.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{priorityOriginStates.map(([state, href]) => <a key={href} href={href} className="border border-border p-4 font-display text-xl hover:border-primary hover:text-primary">Moving from {state} →</a>)}</div>
      </section>

      <section className="mb-12 border-b border-border pb-10" aria-labelledby="moving-texas-city-pairs">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Major metro matchups</p><h2 id="moving-texas-city-pairs" className="mt-2 font-display text-3xl">Compare Houston, Dallas, Austin and San Antonio directly</h2></div><Link to="/compare-texas-cities" className="text-sm font-semibold text-primary">Interactive city comparer →</Link></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The six permanent comparison pages focus on household budget, commute, county and taxing-unit context, insurance, utilities, schools and official-source verification. They do not assign a subjective winner.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{RELOCATION_CITY_PAIRS.map((pair) => <a key={pair.slug} href={relocationCityPairPath(pair.slug)} className="border border-border p-4 font-display text-xl hover:border-primary hover:text-primary">{pair.cityA} vs {pair.cityB} →</a>)}</div>
      </section>
      <section className="mb-12 border-b border-border pb-10" aria-labelledby="moving-texas-priority-guides">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">High-intent relocation guides</p><h2 id="moving-texas-priority-guides" className="mt-2 font-display text-3xl">Go from statewide research to the decision you need to make next</h2></div><Link to="/moving-to-texas/tools" className="text-sm font-semibold text-primary">Open all relocation tools →</Link></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These guides fill the practical gaps between choosing Texas and signing for a specific address: commuting, renter decisions, mover verification, health coverage, military PCS planning, new-resident property taxes and employer or employee relocation. Each one links back into the city, county, cost, utility and checklist system rather than ending as a standalone article.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-5">{priorityRelocationGuides.map(([title, href, copy]) => <a key={href} href={href} className="group bg-background p-5"><strong className="font-display text-2xl leading-tight group-hover:text-primary">{title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{copy}</span><span className="eyebrow mt-5 inline-block text-primary">Open guide →</span></a>)}</div>
      </section>

      <section className="mb-12 border-y border-border py-8" aria-labelledby="moving-texas-paperwork">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div><p className="eyebrow text-primary">After you arrive</p><h2 id="moving-texas-paperwork" className="mt-2 font-display text-3xl leading-tight">Texas paperwork without the agency confusion</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Texas splits driver licensing and vehicle services between different systems. These practical guides route you to the right transaction and official source before you make an appointment or start paperwork.</p></div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">{arrivalTasks.map(([title, to, copy]) => <Link key={to} to={to} className="group bg-background p-5"><h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><span className="eyebrow mt-5 inline-block text-primary">Open guide →</span></Link>)}</div>
        </div>
      </section>

      <section className="mb-12 border-b border-border pb-10" aria-labelledby="moving-texas-local-tax">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Monthly housing reality</p><h2 id="moving-texas-local-tax" className="mt-2 font-display text-3xl">Estimate local property taxes before comparing places</h2></div><Link to="/property-tax-calculators" className="text-sm font-semibold text-primary">All property-tax tools →</Link></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Texas property taxes are parcel-specific. These city starting points load official local rate choices instead of assigning a metro-wide average, so you can match the county, school district, municipality and special districts to an actual address.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{localTaxTools.map(([name, href, copy]) => <a key={href} href={href} className="border border-border p-5 hover:border-primary"><strong className="font-display text-2xl">{name} property tax calculator</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{copy}</span></a>)}</div>
      </section>

      <section className="mb-12 border-b border-border pb-10" aria-labelledby="moving-texas-affordability">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">What can the monthly budget carry?</p><h2 id="moving-texas-affordability" className="mt-2 font-display text-3xl">Compare home affordability with local ownership costs attached</h2></div><Link to="/texas-home-affordability-calculator" className="text-sm font-semibold text-primary">Statewide affordability calculator →</Link></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Income and debt set the starting range, but taxes, insurance, utilities, HOA charges, transportation and the cash you keep after closing determine whether a home fits the household budget. Use a local page, then replace every generic assumption with the exact property's numbers.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{localAffordabilityTools.map(([name, href]) => <a key={href} href={href} className="group bg-background p-5"><strong className="font-display text-2xl group-hover:text-primary">{name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Home affordability calculator →</span></a>)}</div>
      </section>

      <section className="mb-12 border-b border-border pb-10" aria-labelledby="moving-texas-cost-living">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Household budget after the move</p><h2 id="moving-texas-cost-living" className="mt-2 font-display text-3xl">Compare the recurring budget city by city</h2></div><Link to="/texas-cost-of-living-calculator" className="text-sm font-semibold text-primary">Statewide cost-of-living calculator →</Link></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These city planners do not assign a universal local cost index. Start with what your household spends now, then replace housing, transportation, utilities, insurance, food and other recurring costs with the best address-specific estimates you have for the move.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{localCostOfLivingTools.map(([name, href]) => <a key={href} href={href} className="group bg-background p-5"><strong className="font-display text-2xl group-hover:text-primary">{name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Cost-of-living budget planner →</span></a>)}</div>
      </section>

      <section className="mb-12 border-b border-border pb-10" aria-labelledby="moving-texas-salary-needed">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Income target after the budget</p><h2 id="moving-texas-salary-needed" className="mt-2 font-display text-3xl">Work backward from the local budget to a salary target</h2></div><Link to="/texas-salary-comparison-by-city" className="text-sm font-semibold text-primary">Texas salary planning tools →</Link></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These city planners start with your own household budget and savings target, then let you edit federal, payroll and other deduction assumptions. They do not publish a made-up citywide salary requirement. Build the local cost budget first, then use the salary planner as a transparent bridge from take-home needs to a gross-income target.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{localSalaryNeededTools.map(([name, href]) => <a key={href} href={href} className="group bg-background p-5"><strong className="font-display text-2xl group-hover:text-primary">{name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Salary-needed budget planner →</span></a>)}</div>
      </section>

      <section className="mb-12 border-b border-border pb-10" aria-labelledby="moving-texas-industries">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Jobs before geography</p><h2 id="moving-texas-industries" className="mt-2 font-display text-3xl">Match your industry to the Texas region before choosing a city</h2></div><Link to="/texas-industries" className="text-sm font-semibold text-primary">All Texas industries →</Link></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A statewide salary or cost average is not enough for a relocation decision. Start by identifying the Texas regions where your industry is concentrated, then compare the actual cities, housing costs and household budget around those job markets.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{industryResearchLinks.map(([title, href, copy]) => <a key={href} href={href} className="group bg-background p-5"><strong className="font-display text-2xl leading-tight group-hover:text-primary">{title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{copy}</span><span className="eyebrow mt-5 inline-block text-primary">Open research →</span></a>)}</div>
      </section>

      <section className="mb-12 border-b border-border pb-10" aria-labelledby="moving-texas-city-guides">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Texas city guides</p><h2 id="moving-texas-city-guides" className="mt-2 font-display text-3xl">Open the city guide before you narrow to an address</h2></div><Link to="/browse/cities" className="text-sm font-semibold text-primary">Browse Texas cities & suburbs →</Link></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The relocation guide handles statewide moving decisions. These city guides add county and regional context, official municipal sources, nearby destinations and practical Texas Defined resources once you start narrowing the search.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">{CITY_AUTHORITY_INDEX.map((city) => { const href = cityAuthorityPath(city.slug); return <a key={href} href={href} className="group bg-background p-5"><strong className="font-display text-xl group-hover:text-primary">{city.name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Open city guide →</span></a>; })}</div>
      </section>

      <div className="mb-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-border pb-7 text-sm font-semibold">
        <Link to="/texas-moving-cost-calculator" className="text-primary underline underline-offset-4">Estimate the one-time moving budget →</Link>
        <Link to="/browse/cities" className="text-primary underline underline-offset-4">Compare Texas cities & suburbs →</Link>
        <Link to="/moving-to-texas/data" className="text-primary underline underline-offset-4">Relocation data →</Link>
        <a href="/texas-data/texas-population-and-migration-2025" className="underline underline-offset-4">Current Texas population snapshot</a>
        <a href="/texas-data/texas-population-and-migration-2024" className="underline underline-offset-4">Revised 2024 population history</a>
        <a href="/texas-data/where-new-texans-came-from-2024" className="underline underline-offset-4">Where new Texans came from</a>
        <a href="/texas-data/texas-homeowners-premium-history" className="underline underline-offset-4">Insurance premium history</a>
        <a href="/texas-data/texas-metro-payrolls-june-2026" className="underline underline-offset-4">Metro jobs data</a>
        <a href="/texas-data/texas-traffic-monitoring-coverage" className="underline underline-offset-4">Traffic data coverage</a>
      </div>
      <TexasCountyComparisonTable rows={largestCounties} title="Largest Texas counties by 2020 Census population" description="Use this as a starting point, not a best-places ranking. County population and land area can help frame a move, but housing costs, schools, commute, property taxes and local services require address-level research." />
      <p className="-mt-5 mb-10 text-sm text-muted-foreground"><a href="/browse/counties" className="font-semibold text-primary underline underline-offset-4">Compare all 254 Texas counties →</a></p>
      <CitationTrustPanel sources={[{ name: 'Texas State Library and Archives Commission county-seat reference', url: 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html' }, { name: 'U.S. Census Bureau TIGERweb county data', url: 'https://tigerweb.geo.census.gov/arcgis/rest/services/Census2020/State_County/MapServer/1' }]} methodology="The relocation comparison ranks counties only by 2020 Census population and displays source-backed county seat, land area and referenced communities. Texas Defined does not turn those fields into a subjective best-county score." lastVerified="County comparison values are fetched from the cited state and federal references when the page loads; local moving decisions should be verified with current local sources." title="Relocation comparison sources and methodology" />
    </Container>
  </>;
}
