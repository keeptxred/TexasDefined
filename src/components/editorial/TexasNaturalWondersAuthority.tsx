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
  { place: "Big Bend National Park", fit: "Multi-day Chisos Basin, desert drives and desert ecology", approach: "Start at Panther Junction Visitor Center; choose Chisos Basin or Ross Maxwell Scenic Drive as a separate segment.", first: "Check NPS roads, Chisos access, camping and backcountry permits", href: "https://www.nps.gov/bibe/planyourvisit/conditions.htm", map: "https://www.nps.gov/bibe/planyourvisit/suggested-itineraries.htm", caution: "This is the overarching park itinerary; Santa Elena and Boquillas canyon access is treated separately below." },
  { place: "Guadalupe Mountains National Park", fit: "Demanding mountain hiking or short Pine Springs natural-history stops", approach: "Use Pine Springs Visitor Center and Pine Springs Trailhead for Guadalupe Peak. The trailhead is approximately a half-mile from the visitor center.", first: "Check NPS trail conditions and current weather before a summit attempt", href: "https://www.nps.gov/gumo/planyourvisit/trails.htm", map: "https://www.nps.gov/gumo/planyourvisit/pine_springs_area.htm", caution: "A summit hike is not an accessible quick viewpoint; choose Pinery Nature Trail for a shorter first stop." },
  { place: "Palo Duro Canyon State Park", fit: "Panhandle canyon-floor trails and overlooks", approach: "Enter the TPWD park east of Canyon, Texas; select the Lighthouse Trail trailhead from the park's official map and carry water.", first: "Reserve entry when needed and check high-heat trail advisories", href: "https://tpwd.texas.gov/state-parks/palo-duro-canyon", map: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/map", caution: "The Lighthouse trek is more demanding than roadside canyon viewpoints; plan for heat and return distance." },
  { place: "Caddo Lake State Park", fit: "Cypress swamps and quiet wildlife/paddling", approach: "Begin with the Saw Mill Pond launch at the state park; separate canoe rentals from longer open-lake paddling routes.", first: "Check TPWD current conditions and paddling access", href: "https://tpwd.texas.gov/state-parks/caddo-lake/plan-your-visit/", map: "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/hells-half-acre/", caution: "Rental canoes launch from Saw Mill Pond only, not every Caddo Lake public ramp." },
  { place: "Enchanted Rock State Natural Area", fit: "Hill Country granite dome, short hikes and geology", approach: "Use the state park's designated trailhead and Summit Trail; higher rock may close when wet.", first: "Check the TPWD access reservations and summit/trail alerts", href: "https://tpwd.texas.gov/state-parks/enchanted-rock/alert", map: "https://tpwd.texas.gov/state-parks/enchanted-rock/trails-info", caution: "The popular summit is exposed granite, not a paved accessible overlook; do not conflate hiking with technical climbing." },
  { place: "Padre Island National Seashore", fit: "Barrier-island ecology and accessible beachfront visitor facilities", approach: "Begin at Malaquite Visitor Center at the end of Park Road 22 for restrooms, ranger information and boardwalk access.", first: "Check beach driving, tides, wind and shoreline conditions", href: "https://www.nps.gov/pais/planyourvisit/conditions.htm", map: "https://www.nps.gov/pais/planyourvisit/visitor-center.htm", caution: "Remote beach-road driving requires a different vehicle and safety plan from a Malaquite visitor stop." },
  { place: "Balmorhea State Park", fit: "Spring-fed pool in a desert setting", approach: "Use the official state-park entrance and assigned entry time for the spring-fed swimming pool.", first: "Check TPWD pool/day-use reservation details and closures", href: "https://tpwd.texas.gov/state-parks/balmorhea/balmorhea-faqs/", map: "https://tpwd.texas.gov/state-parks/balmorhea/map", caution: "The pool is managed habitat, not an unrestricted swimming hole; verify current park rules." },
  { place: "Caprock Canyons State Park", fit: "Canyon hikes, prairie and bison viewing", approach: "Use the Quitaque park entrance and park map to choose Prairie or South Prong access rather than mixing trailheads.", first: "Check TPWD park alerts, trail route and bison-distance rules", href: "https://tpwd.texas.gov/state-parks/caprock-canyons", map: "https://tpwd.texas.gov/state-parks/caprock-canyons/trails-info/", caution: "Bison are free-ranging wildlife and not a petting attraction; Palo Duro is a different park." },
  { place: "Monahans Sandhills State Park", fit: "Wind-shaped dunes and family sand sledding", approach: "Enter through the TPWD park entrance near Monahans, then use marked park facilities before walking into shifting dunes.", first: "Check sand-disk rental, wind/heat and day-use entry", href: "https://tpwd.texas.gov/state-parks/monahans-sandhills", map: "https://tpwd.texas.gov/state-parks/monahans-sandhills/map", caution: "Dunes shift constantly; no fixed trail or permanent summit route should be promised." },
  { place: "Devils River State Natural Area", fit: "Remote protected limestone river with specialized access", approach: "Choose the Del Norte unit or the separate Dan A. Hughes unit BEFORE starting a remote-road journey; river put-ins are not regular car parks.", first: "Check TPWD river-access permits and trip preparations", href: "https://tpwd.texas.gov/state-parks/devils-river/access-permit-overview/", map: "https://tpwd.texas.gov/state-parks/devils-river/river-trips", caution: "A land-unit day-use booking does not replace any required Devils River Access Permit." },
  { place: "Hill Country limestone springs", fit: "Karst geology and managed spring-viewing choices", approach: "For Hamilton Pool, use the county preserve's designated parking and steep walk; compare Barton Springs and Jacob's Well separately.", first: "Check the precise preserve's viewing versus swimming restrictions", href: "https://parks.traviscountytx.gov/parks/hamilton-pool-preserve", map: "https://parks.traviscountytx.gov/parks/hamilton-pool-preserve", caution: "Hamilton Pool reservation never guarantees swimming; its overhang section may be closed." },
  { place: "Rio Grande canyons within Big Bend", fit: "Separate Santa Elena or Boquillas canyon-foot viewpoint and river-focused itinerary", approach: "Santa Elena: Ross Maxwell Scenic Drive to the canyon trailhead. Boquillas: the east-side Boquillas Canyon Spur Road to its trailhead.", first: "Choose one canyon road, check NPS river/road conditions and permits", href: "https://www.nps.gov/bibe/planyourvisit/river_hikes.htm", map: "https://www.nps.gov/bibe/planyourvisit/river-trips.htm", caution: "These are TWO sub-destinations INSIDE Big Bend, not a second national park; hiking a river-edge trail is not a permitted raft expedition." },
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
          <table className="w-full text-left text-sm leading-6" style={{minWidth:980}}>
            <caption className="sr-only">Twelve Texas natural landscapes compared by visitor fit, actual arrival location, official action and important limitations</caption>
            <thead><tr className="border-b border-border"><th scope="col" className="p-3">Landscape</th><th scope="col" className="p-3">Good fit</th><th scope="col" className="p-3">Entrance, trailhead or launch</th><th scope="col" className="p-3">Before you travel</th><th scope="col" className="p-3">Easy mistake</th></tr></thead>
            <tbody>{chooseALandscape.map((landscape) => <tr key={landscape.place} className="border-b border-border align-top">
              <th scope="row" className="p-3 font-semibold">{landscape.place}</th>
              <td className="p-3">{landscape.fit}</td>
              <td className="p-3">{landscape.approach} <a href={landscape.map} target="_blank" rel="noreferrer noopener" className="whitespace-nowrap text-primary underline">Official location/route ↗</a></td>
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
