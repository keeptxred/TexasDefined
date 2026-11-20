import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import caddoLake from "@/assets/caddo-lake.jpg";
import paloDuro from "@/assets/palo-duro.jpg";
import enchantedRock from "@/assets/enchanted-rock.jpg";

const officialSources = [
  { label: "Travis County Parks — Hamilton Pool Preserve", href: "https://parks.traviscountytx.gov/parks/hamilton-pool-preserve", note: "Official reservation, water, swimming status and preserve-access guidance; access for viewing and swimming can differ." },
  { label: "National Park Service — Big Bend river trips", href: "https://www.nps.gov/bibe/planyourvisit/river-trips.htm", note: "Official guidance on river trips in the Santa Elena and Boquillas canyon landscape, distinct from a scenic canyon viewpoint." },
  { label: "TPWD — Devils River access permits", href: "https://tpwd.texas.gov/state-parks/devils-river/access-permit-overview/", note: "Differentiates Del Norte and Dan A. Hughes units and the Devils River Access Permit requirements." },
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

const chooseALandscape = [
  { place: "Big Bend", fit: "A multi-day remote desert and canyon trip", first: "Check NPS roads and accommodation/permit rules", href: "https://www.nps.gov/bibe/planyourvisit/conditions.htm", caution: "Santa Elena overlooks and river trips are different commitments" },
  { place: "Guadalupe Mountains", fit: "Mountain hiking with sustained elevation and exposed terrain", first: "Check NPS trail notices and weather before setting a summit goal", href: "https://www.nps.gov/gumo/planyourvisit/conditions.htm", caution: "Not a casual scenic roadside peak visit" },
  { place: "Palo Duro / Caprock Canyons", fit: "Panhandle canyon trails and distinct park ecosystems", first: "Review both TPWD parks, heat and day-entry availability", href: "https://tpwd.texas.gov/state-parks/palo-duro-canyon", caution: "These are separate parks, not one canyon entrance" },
  { place: "Caddo Lake", fit: "Cypress wetlands, paddling and wildlife observation", first: "Check TPWD paddling access and current lake conditions", href: "https://tpwd.texas.gov/state-parks/caddo-lake", caution: "Wetland navigation and weather need a separate plan from hiking" },
  { place: "Enchanted Rock / Hill Country springs", fit: "Granite and water-shaped landscapes near Central Texas", first: "Secure park/preserve access first; check actual swimming policy", href: "https://parks.traviscountytx.gov/parks/hamilton-pool-preserve", caution: "Hamilton Pool reservation never guarantees swimming" },
  { place: "Padre Island National Seashore", fit: "Barrier island, shoreline and remote beach ecology", first: "Check NPS beach-road, tide and current park alerts", href: "https://www.nps.gov/pais/planyourvisit/conditions.htm", caution: "Beach driving and remote access require distinct vehicle planning" },
  { place: "Devils River", fit: "Remote river and designated natural-area units", first: "Check TPWD Del Norte access versus separate permitted paddling", href: "https://tpwd.texas.gov/state-parks/devils-river/access-permit-overview/", caution: "A park reservation is not automatically a river-trip access permit" }
] as const;

const landscapePhotos = [
  { src: paloDuro, name: "Palo Duro Canyon", alt: "Layered rock cliffs at Palo Duro Canyon in the Texas Panhandle", note: "Panhandle canyon terrain" },
  { src: caddoLake, name: "Caddo Lake", alt: "Bald cypress trees and water at Caddo Lake in East Texas", note: "East Texas wetland landscape" },
  { src: enchantedRock, name: "Enchanted Rock", alt: "Exposed pink-granite dome at Enchanted Rock in Central Texas", note: "Hill Country granite dome" }
] as const;

const geographicPlans = [
  { title: "Far West Texas", places: "Big Bend, Guadalupe Mountains, Balmorhea and Monahans", advice: "Do not compress this into a one-day loop; these are long-distance stops with very different water, road and hiking conditions." },
  { title: "Panhandle", places: "Palo Duro and Caprock Canyons", advice: "Make a separate regional trip, with advance state-park entry arrangements and summer heat precautions." },
  { title: "Hill Country and Central Texas", places: "Enchanted Rock and managed spring sites", advice: "Choose reservations first, then build the scenic drive around the confirmed access window." },
  { title: "East Texas and Gulf Coast", places: "Caddo Lake and Padre Island National Seashore", advice: "These are separate ecosystems and distant destinations; plan different trips, with paddling and coastal weather checks." },
] as const;

const planningPaths = [
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Move from the bucket list into Texas trails, habitats, public lands and wildlife planning." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Find the state-managed parks and natural areas behind many of these landscapes." },
  { to: "/explore/national-parks", label: "National parks", description: "Plan Big Bend and Guadalupe Mountains with the wider protected-land context." },
  { to: "/texas-rock-climbing-bouldering-guide", label: "Rock climbing & bouldering", description: "Connect granite domes, desert rock and public climbing areas to current land-manager access rules." },
  { to: "/explore/lakes-rivers", label: "Lakes & rivers", description: "Connect Caddo Lake, Devils River and spring-fed landscapes to water-trip planning." },
  { to: "/explore/beaches-coast", label: "Beaches & Gulf Coast", description: "Build Padre Island and barrier-island landscapes into a Gulf Coast route." },
  { to: "/explore/major-springs", label: "Springs & swimming", description: "Go deeper on Balmorhea and the aquifer-fed springs that shape Central and West Texas." },
  { to: "/explore/road-trips", label: "Texas road trips", description: "Connect canyons, mountains, desert, wetlands and coast into regional itineraries." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Turn selected landscapes into a practical day-by-day trip." },
] as const;

export function TexasNaturalWondersAuthority() {
  return (
    <Container className="pb-20">
      <section className="mx-auto max-w-5xl pb-10" aria-labelledby="natural-wonders-which">
        <p className="eyebrow text-primary">Choose by actual visitor needs</p>
        <h2 id="natural-wonders-which" className="mt-2 font-display text-4xl">Which natural wonder fits this trip?</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">The twelve landmarks are not interchangeable. Match terrain, access system and travel effort first. This comparison is editorial planning, not a live access guarantee; the linked land manager controls today's conditions.</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm leading-6">
            <caption className="sr-only">Texas natural landscapes compared by visitor fit, official action and important limitations</caption>
            <thead><tr className="border-b border-border"><th scope="col" className="p-3">Landscape</th><th scope="col" className="p-3">Good fit</th><th scope="col" className="p-3">Before you travel</th><th scope="col" className="p-3">Easy mistake</th></tr></thead>
            <tbody>{chooseALandscape.map((landscape) => <tr key={landscape.place} className="border-b border-border align-top">
              <th scope="row" className="p-3 font-semibold">{landscape.place}</th>
              <td className="p-3">{landscape.fit}</td>
              <td className="p-3"><a href={landscape.href} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-2">{landscape.first} ↗</a></td>
              <td className="p-3">{landscape.caution}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className="mx-auto max-w-5xl border-t border-border py-10" aria-labelledby="natural-wonders-landscapes">
        <p className="eyebrow text-primary">Three different terrains</p>
        <h2 id="natural-wonders-landscapes" className="mt-2 font-display text-3xl">The state changes dramatically across regions</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {landscapePhotos.map((photo) => <figure key={photo.name} className="min-w-0">
            <img src={photo.src} alt={photo.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="mt-2 text-sm text-muted-foreground"><strong className="text-foreground">{photo.name}.</strong> {photo.note}. TexasDefined's existing place-image library; confirm site rules separately.</figcaption>
          </figure>)}
        </div>
      </section>
      <section className="mx-auto max-w-5xl border-t border-border pt-12" aria-labelledby="natural-wonders-regions">
        <p className="eyebrow text-primary">Build a realistic route</p>
        <h2 id="natural-wonders-regions" className="mt-2 font-display text-4xl">Four regional trips beat one giant checklist</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">These are planning clusters, not advertised tour packages or promises of open access. Confirm each park, preserve or waterway separately; statewide drives between them can take hours.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {geographicPlans.map((plan) => <section key={plan.title} className="border border-border p-6">
            <h3 className="font-display text-2xl">{plan.title}</h3>
            <p className="mt-2 font-medium">{plan.places}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{plan.advice}</p>
          </section>)}
        </div>
      </section>
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
          Access, reservations, weather, water, fire restrictions, trail conditions and closures can change after this guide is published. These National Park Service and Texas Parks &amp; Wildlife pages are the primary planning references for the major landscapes in this guide. Source review: November 18, 2026. This is a source review, not a claim that a park is currently open.
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
