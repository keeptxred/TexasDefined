import { lazy, Suspense } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import roadTrip from "@/assets/road-trip.jpg";
import { CitationTrustPanel } from "@/components/authority/CitationTrustPanel";
import { TexasCountyComparisonTable } from "@/components/counties/TexasCountyComparisonTable";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";

const RelocationAuthorityLab = lazy(() => import("@/components/relocation/RelocationAuthorityLab").then((module) => ({ default: module.RelocationAuthorityLab })));
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

export const Route = createLazyFileRoute("/moving-to-texas")({ component: MovingToTexasPage });

function MovingToTexasPage() {
  const { counties } = Route.useLoaderData();
  const largestCounties = counties
    .filter((county) => county.population2020 != null)
    .slice()
    .sort((a, b) => Number(b.population2020) - Number(a.population2020) || a.name.localeCompare(b.name))
    .slice(0, 20);
  return <>
    <CategoryPage category="moving-to-texas" eyebrow="The relocation guide" title="What to know before you move to Texas" intro={description} image={{ src: roadTrip, alt: imageAlt, width: 1600, height: 1067 }} />
    <Suspense fallback={null}><RelocationAuthorityLab /></Suspense>
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <section className="mb-12 border-y border-border py-8" aria-labelledby="moving-texas-paperwork">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div><p className="eyebrow text-primary">After you arrive</p><h2 id="moving-texas-paperwork" className="mt-2 font-display text-3xl leading-tight">Texas paperwork without the agency confusion</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Texas splits driver licensing and vehicle services between different systems. These practical guides route you to the right transaction and official source before you make an appointment or start paperwork.</p></div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">{arrivalTasks.map(([title, to, copy]) => <Link key={to} to={to} className="group bg-background p-5"><h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><span className="eyebrow mt-5 inline-block text-primary">Open guide →</span></Link>)}</div>
        </div>
      </section>
      <div className="mb-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-border pb-7 text-sm font-semibold">
        <Link to="/texas-moving-cost-calculator" className="text-primary underline underline-offset-4">Estimate the one-time moving budget →</Link>
        <Link to="/browse/cities" className="text-primary underline underline-offset-4">Compare Texas cities & suburbs →</Link>
        <Link to="/moving-to-texas/data" className="text-primary underline underline-offset-4">Relocation Data Center →</Link>
        <a href="/texas-data/texas-population-and-migration-2025" className="underline underline-offset-4">Current Texas population snapshot</a>
        <a href="/texas-data/texas-population-and-migration-2024" className="underline underline-offset-4">Revised 2024 population history</a>
        <a href="/texas-data/where-new-texans-came-from-2024" className="underline underline-offset-4">Where new Texans came from</a>
        <a href="/texas-data/texas-homeowners-premium-history" className="underline underline-offset-4">Insurance premium history</a>
        <a href="/texas-data/texas-metro-payrolls-june-2026" className="underline underline-offset-4">Metro jobs data</a>
        <a href="/texas-data/texas-traffic-monitoring-coverage" className="underline underline-offset-4">Traffic data coverage</a>
      </div>
      <TexasCountyComparisonTable rows={largestCounties} title="Largest Texas counties by 2020 Census population" description="Use this as an orientation layer, not a best-places ranking. County population and land area can help frame a move, but housing costs, schools, commute, property taxes and local services require address-level research." />
      <p className="-mt-5 mb-10 text-sm text-muted-foreground"><a href="/browse/counties" className="font-semibold text-primary underline underline-offset-4">Compare all 254 Texas counties →</a></p>
      <CitationTrustPanel sources={[{ name: 'Texas State Library and Archives Commission county-seat reference', url: 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html' }, { name: 'U.S. Census Bureau TIGERweb county data', url: 'https://tigerweb.geo.census.gov/arcgis/rest/services/Census2020/State_County/MapServer/1' }]} methodology="The relocation comparison ranks counties only by 2020 Census population and displays source-backed county seat, land area and referenced communities. Texas Defined does not turn those fields into a subjective best-county score." lastVerified="County comparison values are fetched from the cited state and federal references when the page loads; local moving decisions should be verified with current local sources." title="Relocation comparison sources and methodology" />
    </Container>
  </>;
}
