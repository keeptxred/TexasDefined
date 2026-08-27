import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";

import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import type { CategorySlug } from "@/data/types";

const EvergreenNextSteps = lazy(() =>
  import("@/components/monetization/EvergreenNextSteps").then((module) => ({ default: module.EvergreenNextSteps })),
);

const pathways = [
  { to: "/browse/cities", label: "Compare Texas cities", description: "Start with place, county and region before comparing household costs." },
  { to: "/texas-cost-of-living-calculator", label: "Compare cost of living", description: "Model how everyday household costs may change from one place to another." },
  { to: "/texas-salary-comparison-by-city", label: "Compare salaries by city", description: "Translate a salary into a rough cost-adjusted equivalent across Texas cities." },
  { to: "/texas-moving-cost-calculator", label: "Estimate moving costs", description: "Plan transportation, packing, setup expenses and a practical cushion." },
  { to: "/texas-utility-cost-calculator", label: "Estimate utilities", description: "Build a starting monthly estimate for electricity, water, gas and household services." },
  { to: "/property", label: "Understand property ownership", description: "Property taxes, exemptions, county guides, insurance and recurring ownership costs." },
  { to: "/texas-homeownership-cost-calculator", label: "See the full cost of owning", description: "Combine mortgage, property taxes, insurance, utilities, maintenance and fees." },
  { to: "/texas-home-insurance-calculator", label: "Estimate home insurance", description: "Create a planning estimate before comparing actual Texas insurance quotes." },
  { to: "/browse/counties", label: "Find the county", description: "Connect a location to local appraisal, tax and public-record research paths." },
  { to: "/find-my-school-district", label: "Verify the school district", description: "Use the exact address to research district and campus assignment instead of relying on a city name." },
  { to: "/texas-data", label: "Open the Texas Data Desk", description: "Use source-backed migration, insurance, jobs, housing and Texas reference datasets." },
  { to: "/moving-to-texas-checklist", label: "Use the moving checklist", description: "Keep before-and-after relocation tasks and official agency sources in one practical sequence." },
] as const;

export function LivingAuthorityPaths({ currentCategory }: { currentCategory: CategorySlug }) {
  if (currentCategory !== "moving-to-texas" && currentCategory !== "real-estate") return null;

  return (
    <>
      <Section>
        <Container>
          <SectionHeader
            eyebrow={currentCategory === "moving-to-texas" ? "Plan the move" : "Plan the ownership costs"}
            title={currentCategory === "moving-to-texas" ? "Put the practical Texas numbers next to the place" : "Put the full cost of a Texas home in context"}
            description={currentCategory === "moving-to-texas"
              ? "City choice, salary, utilities, schools, housing, insurance, moving expenses and property taxes all shape what a move really costs."
              : "A home price is only one number. Compare financing, taxes, insurance, utilities, maintenance and the local county context together."}
          />
          <nav aria-label="Texas moving and property planning paths" className="mt-8">
            <ul className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
              {pathways.map((item, index) => (
                <li key={item.to} className={`${index % 4 !== 3 ? "lg:border-r" : ""} border-b border-border sm:px-6 sm:first:pl-0`}>
                  <Link to={item.to} className="group block py-6">
                    <span className="font-display text-xl leading-tight transition-colors group-hover:text-primary">{item.label}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>
      <Suspense fallback={null}>
        <EvergreenNextSteps category={currentCategory} />
      </Suspense>
    </>
  );
}
