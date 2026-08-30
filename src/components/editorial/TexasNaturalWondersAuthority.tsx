import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const officialSources = [
  { label: "National Park Service — Big Bend National Park", href: "https://www.nps.gov/bibe/index.htm", note: "Official park planning, conditions, hiking, camping, river, geology and natural-resource information for Big Bend." },
  { label: "National Park Service — Guadalupe Mountains National Park", href: "https://www.nps.gov/gumo/index.htm", note: "Official planning and natural-resource information for the Guadalupe Mountains, including peaks, canyons, desert and dunes." },
  { label: "National Park Service — Padre Island National Seashore", href: "https://www.nps.gov/pais/index.htm", note: "Official access, safety, beach, barrier-island, wildlife and visitor-planning information for Padre Island National Seashore." },
  { label: "Texas Parks & Wildlife — Palo Duro Canyon State Park", href: "https://tpwd.texas.gov/state-parks/palo-duro-canyon", note: "Official state-park information for canyon access, trails, camping, reservations and current visitor guidance." },
  { label: "Texas Parks & Wildlife — Caddo Lake State Park", href: "https://tpwd.texas.gov/state-parks/caddo-lake", note: "Official information for the cypress-and-wetland landscape, paddling, camping, fishing and park access." },
  { label: "Texas Parks & Wildlife — Enchanted Rock State Natural Area", href: "https://tpwd.texas.gov/state-parks/enchanted-rock", note: "Official visitor guidance for the granite-dome landscape, hiking, climbing, reservations and natural-area protection." },
  { label: "Texas Parks & Wildlife — Balmorhea State Park", href: "https://tpwd.texas.gov/state-parks/balmorhea", note: "Official information for the spring-fed pool, desert setting, swimming access and park operations." },
  { label: "Texas Parks & Wildlife — Caprock Canyons State Park", href: "https://tpwd.texas.gov/state-parks/caprock-canyons", note: "Official canyon, trail, camping and Texas State Bison Herd visitor guidance." },
  { label: "Texas Parks & Wildlife — Monahans Sandhills State Park", href: "https://tpwd.texas.gov/state-parks/monahans-sandhills", note: "Official information for the dune landscape, recreation, conditions and park access." },
  { label: "Texas Parks & Wildlife — Devils River State Natural Area", href: "https://tpwd.texas.gov/state-parks/devils-river", note: "Official access, reservation, paddling, camping and conservation guidance for the remote Devils River landscape." },
] as const;

const planningPaths = [
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Move from the bucket list into Texas trails, habitats, public lands and wildlife planning." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Find the state-managed parks and natural areas behind many of these landscapes." },
  { to: "/explore/national-parks", label: "National parks", description: "Plan Big Bend and Guadalupe Mountains with the wider protected-land context." },
  { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "Connect Caddo Lake, Devils River and spring-fed landscapes to water-trip planning." },
  { to: "/explore/beaches-coast", label: "Beaches & Gulf Coast", description: "Build Padre Island and barrier-island landscapes into a Gulf Coast route." },
  { to: "/explore/major-springs", label: "Springs & swimming", description: "Go deeper on Balmorhea and the aquifer-fed springs that shape Central and West Texas." },
  { to: "/explore/road-trips", label: "Texas road trips", description: "Connect canyons, mountains, desert, wetlands and coast into regional itineraries." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Turn selected landscapes into a practical day-by-day trip." },
] as const;

export function TexasNaturalWondersAuthority() {
  return (
    <Container className="pb-20">
      <section className="mx-auto max-w-5xl border-t border-border pt-12" aria-labelledby="natural-wonders-planning">
        <p className="eyebrow text-primary">Plan beyond the list</p>
        <h2 id="natural-wonders-planning" className="mt-2 font-display text-4xl">Build a Texas landscape trip</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          Texas natural wonders cross several travel systems: national parks, state parks, rivers, springs, coast and wildlife habitat. Use these paths to move from a statewide bucket list into current access, regional planning and practical itineraries.
        </p>
        <nav aria-label="Texas natural wonders planning paths" className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {planningPaths.map((item) => (
            <Link key={item.to} to={item.to} className="group bg-background p-5">
              <strong className="font-display text-xl leading-tight group-hover:text-primary">{item.label}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
            </Link>
          ))}
        </nav>
      </section>

      <section className="mx-auto mt-12 max-w-5xl border-t border-border pt-10" aria-labelledby="natural-wonders-sources">
        <p className="eyebrow text-primary">Official sources</p>
        <h2 id="natural-wonders-sources" className="mt-2 font-display text-3xl">Check the managing agencies before you go</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Access, reservations, weather, water, fire restrictions, trail conditions and closures can change after this guide is published. These National Park Service and Texas Parks &amp; Wildlife pages are the primary planning references for the major landscapes in this guide. Source review: August 30, 2026.
        </p>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {officialSources.map((source) => (
            <li key={source.href} className="py-4">
              <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
