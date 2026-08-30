import { createLazyFileRoute, Link } from "@tanstack/react-router";

import enchantedRock from "@/assets/enchanted-rock.jpg";
import { Container } from "@/components/layout/Container";

const officialSources = [
  { label: "Texas Parks & Wildlife — Hueco Tanks State Park & Historic Site", href: "https://tpwd.texas.gov/state-parks/hueco-tanks", note: "Current park access, reservation, orientation, guided/self-guided area and climbing-tour information." },
  { label: "Texas Parks & Wildlife — Enchanted Rock Climbing & Bouldering", href: "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/rock-climb", note: "Official climbing management, protected-resource and climbing-rule guidance for Enchanted Rock." },
  { label: "Texas Parks & Wildlife — Lake Mineral Wells Rock Climbing", href: "https://tpwd.texas.gov/state-parks/lake-mineral-wells/rock-climbing", note: "Official registration, approved-guide and Penitentiary Hollow climbing information." },
  { label: "Travis County Parks — Milton Reimers Ranch Park trails map", href: "https://parks.traviscountytx.gov/images/docs/Reimers_Park_Trails_Map.pdf", note: "County park map showing North Shore and Climber's Canyon climbing areas and the surrounding trail network." },
] as const;

const areas = [
  {
    name: "Hueco Tanks State Park & Historic Site",
    region: "Far West Texas · El Paso",
    summary: "A desert climbing destination where access is deliberately managed to protect fragile natural and cultural resources.",
    details: [
      "Hueco Tanks combines climbing with an archaeological and cultural landscape that has been important to people for thousands of years. That context changes how a climbing trip should be planned: the park is not simply an open recreation area, and resource protection is part of the visit.",
      "TPWD divides access between guided and self-guided areas. The North Mountain self-guided area uses a daily permit limit, while guided access must be arranged in advance. Visitors to the self-guided area also complete the park orientation requirement. Because capacity, reservation procedures and access restrictions are part of the conservation system, verify the current rules directly with the park before traveling.",
    ],
  },
  {
    name: "Enchanted Rock State Natural Area",
    region: "Hill Country · Fredericksburg / Llano",
    summary: "Granite domes and boulders with a long climbing tradition inside a protected state natural area.",
    details: [
      "Enchanted Rock is both a major Texas landscape and an active climbing area. TPWD requires climbers to check in at park headquarters and publishes a dedicated climbing-management page and climbing-area map. The natural-area designation matters: plants, vernal pools, rock surfaces and other protected features should be treated as part of the resource, not as obstacles to recreation.",
      "The official climbing guidance distinguishes traditional climbing, existing fixed protection and bouldering while prohibiting practices that damage protected natural features. Rather than relying on a generalized route description here, use the current TPWD climbing information and maps for the exact rules in effect on the day of your visit.",
    ],
  },
  {
    name: "Lake Mineral Wells State Park & Trailway",
    region: "North Texas · west of Fort Worth",
    summary: "Sandstone climbing at Penitentiary Hollow with formal registration requirements at park headquarters.",
    details: [
      "Lake Mineral Wells gives North Texas a public natural-rock option at Penitentiary Hollow. TPWD identifies the area as one of the relatively few natural climbing venues in North Texas and publishes a route map for the rock formations.",
      "Registration is not optional: TPWD says individuals and groups must register at park headquarters before rock climbing or rappelling. Commercial and instructional group use has additional restrictions, including approved guide-service requirements. Those rules are a good example of why a statewide climbing guide should teach visitors where to verify access rather than pretending every Texas climbing area operates the same way.",
    ],
  },
  {
    name: "Milton Reimers Ranch Park",
    region: "Central Texas · Dripping Springs",
    summary: "A Travis County park whose official trail map marks both North Shore and Climber's Canyon climbing areas along the Pedernales River landscape.",
    details: [
      "Reimers Ranch adds a county-managed climbing destination to the state and national-park mix. Travis County's current park map identifies two climbing areas—North Shore and Climber's Canyon—within a larger network of hiking, river and mountain-bike trails.",
      "County park operations can differ from TPWD rules, and a map is not a substitute for current access instructions. Check Travis County Parks for current hours, fees, closures and any climbing-specific conditions before the trip. The wider park also shares space with river users, hikers and cyclists, so route planning should account for the whole recreation landscape rather than only the cliff line.",
    ],
  },
] as const;

const planningPaths = [
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Put climbing inside the wider Texas public-land, weather and wildlife picture." },
  { to: "/texas-natural-wonders-bucket-list", label: "Texas natural wonders", description: "Connect granite domes, desert rock and canyon landscapes to the statewide geology story." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Plan around the public lands that host three of the featured climbing destinations." },
  { to: "/explore/road-trips", label: "Texas road trips", description: "Build climbing stops into a realistic regional route instead of a statewide sprint." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence access windows, lodging and nearby destinations into a practical itinerary." },
  { to: "/best-places-to-go-camping-in-texas", label: "Texas camping", description: "Pair outdoor days with an overnight base where camping access makes sense." },
] as const;

export const Route = createLazyFileRoute("/texas-rock-climbing-bouldering-guide")({ component: TexasClimbingGuidePage });

function TexasClimbingGuidePage() {
  return (
    <main className="pb-20">
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/explore" className="hover:text-foreground">Explore Texas</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/explore/outdoors" className="hover:text-foreground">Outdoors &amp; Wildlife</Link>
        </nav>
      </Container>

      <Container className="pt-10">
        <article className="mx-auto max-w-5xl">
          <header className="border-b border-border pb-10">
            <p className="eyebrow text-primary">Public rock · access · stewardship</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Rock Climbing &amp; Bouldering</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A visitor-first guide to four public Texas climbing areas: where they are, how their access systems differ, what the managing agencies protect, and where to verify current rules before you go.</p>
          </header>

          <figure className="border-b border-border py-8">
            <img src={enchantedRock} alt="Granite dome landscape at Enchanted Rock in the Texas Hill Country" className="aspect-[16/9] w-full object-cover" loading="eager" fetchPriority="high" />
            <figcaption className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">Enchanted Rock is one of several Texas public landscapes where climbing access is managed alongside conservation and other visitor uses.</figcaption>
          </figure>

          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">Texas climbing is a patchwork, not one rulebook</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">For a public-land climbing trip, start with Hueco Tanks, Enchanted Rock, Lake Mineral Wells and Milton Reimers Ranch. The important distinction is access: Hueco Tanks uses tightly managed guided and self-guided areas; Enchanted Rock requires climber check-in and follows a climbing-management plan; Lake Mineral Wells requires registration before climbing or rappelling; and Reimers Ranch is managed by Travis County rather than TPWD. Always use the managing agency's current instructions for reservations, closures, maps and climbing rules.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="safety-boundary">
            <p className="eyebrow text-primary">Safety boundary</p>
            <h2 id="safety-boundary" className="mt-2 font-display text-3xl">This is a trip-planning guide, not climbing instruction</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Rock climbing and bouldering can result in serious injury or death. This page does not teach anchors, protection placement, belaying, rappelling, spotting, fall technique, route grades or equipment selection. Those skills require competent instruction, appropriate equipment and judgment specific to the activity and site.</p>
              <p>Weather also changes the decision. Heat, lightning, wet rock, flooding, fire restrictions and park closures can turn a planned climbing day into the wrong day to climb. Check the land manager and current weather before leaving home, and be willing to change the plan.</p>
            </div>
          </section>

          <div>
            {areas.map((area, index) => (
              <section key={area.name} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {area.region}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{area.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.summary}</p>
                </div>
                <div className="max-w-3xl space-y-5">
                  {area.details.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          <section className="border-b border-border py-10" aria-labelledby="stewardship">
            <p className="eyebrow text-primary">Stewardship</p>
            <h2 id="stewardship" className="mt-2 font-display text-3xl">Access lasts only when the landscape does</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Texas climbing areas overlap with sensitive habitat, cultural resources, trails and other public uses. Stay within designated access, follow closures, avoid disturbing archaeological or biological features, pack out waste, and follow the land manager's rules about fixed hardware, vegetation and route access.</p>
              <p>Hueco Tanks makes the connection especially visible because climbing occurs in a protected cultural landscape with ancient rock imagery. Enchanted Rock is a State Natural Area, where the granite ecosystem includes fragile vernal pools and protected vegetation. Treating stewardship as part of the climbing day—not an afterthought—is what keeps recreation compatible with those places.</p>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="planning">
            <p className="eyebrow text-primary">Keep planning</p>
            <h2 id="planning" className="mt-2 font-display text-3xl">Connect climbing to the rest of Texas outdoors</h2>
            <nav aria-label="Texas climbing related guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {planningPaths.map((item) => (
                <Link key={item.to} to={item.to} className="group bg-background p-5">
                  <strong className="font-display text-xl group-hover:text-primary">{item.label}</strong>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                </Link>
              ))}
            </nav>
          </section>

          <section className="py-10" aria-labelledby="sources">
            <p className="eyebrow text-primary">Official sources</p>
            <h2 id="sources" className="mt-2 font-display text-3xl">Verify access with the land manager</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Rules, reservation systems, closures and operating conditions can change. These are the first-party sources used for this guide and should control current trip decisions. Source review: August 30, 2026.</p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {officialSources.map((source) => (
                <li key={source.href} className="py-4">
                  <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </Container>
    </main>
  );
}
