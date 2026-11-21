import { createLazyFileRoute, Link } from "@tanstack/react-router";

import enchantedRock from "@/assets/enchanted-rock.jpg";
import { Container } from "@/components/layout/Container";

const officialSources = [
  { label: "TPWD — Lake Mineral Wells live trails and rock-area closure notices", href: "https://tpwd.texas.gov/state-parks/park-information/notices/lmw-trails-update", note: "Check the climbing area status before travel: a park-wide open designation does not mean Penitentiary Hollow climbing is open." },
  { label: "TPWD — Lake Mineral Wells minor parental consent form", href: "https://tpwd.texas.gov/publications/pwdforms/media/pwd_1424d_p4000_parental_consent.pdf", note: "Required parental permission form for minors; contact the park for current submission procedures." },
  { label: "Texas Parks & Wildlife — Hueco Tanks State Park & Historic Site", href: "https://tpwd.texas.gov/state-parks/hueco-tanks/activities", note: "Current park access, reservation, orientation, guided/self-guided area and climbing-tour information." },
  { label: "Texas Parks & Wildlife — Enchanted Rock Climbing & Bouldering", href: "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/rock-climb", note: "Official climbing management, protected-resource and climbing-rule guidance for Enchanted Rock." },
  { label: "Texas Parks & Wildlife — Lake Mineral Wells Rock Climbing", href: "https://tpwd.texas.gov/state-parks/lake-mineral-wells/rock-climbing", note: "Official registration, approved-guide and Penitentiary Hollow climbing information." },
  { label: "Travis County Parks — Milton Reimers Ranch official trails map (PDF)", href: "https://parks.traviscountytx.gov/images/docs/Reimers_Park_Trails_Map.pdf", note: "County PDF map explicitly marks separate North Shore and Climber's Canyon climbing areas, roads, trails and approximate distances; it is NOT a surveyed route." },
] as const;

const areas = [
  {
    name: "Hueco Tanks State Park & Historic Site",
    sourceUrl: "https://tpwd.texas.gov/state-parks/hueco-tanks/activities",
    region: "Far West Texas · El Paso",
    summary: "A desert climbing destination where access is deliberately managed to protect fragile natural and cultural resources.",
    details: [
      "Hueco Tanks combines climbing with an archaeological and cultural landscape that has been important to people for thousands of years. That context changes how a climbing trip should be planned: the park is not simply an open recreation area, and resource protection is part of the visit.",
      "TPWD divides access between guided and self-guided areas. TPWD's Activities page says North Mountain self-guided access is limited to 70 people at one time, whereas its main park page describes 70 daily permits. These are different descriptions, so reserve the dated self-guided permit by phone (512) 389-8911 (online reservations are unavailable) and confirm capacity with park staff. Guided West Mountain, East Mountain and East Spur access must be arranged in advance. TPWD's main park page explicitly says guided tours must be booked a minimum of one week ahead. Visitors to the self-guided area also complete the park orientation requirement. Because capacity, reservation procedures and access restrictions are part of the conservation system, verify the current rules directly with the park before traveling.",
    ],
  },
  {
    name: "Enchanted Rock State Natural Area",
    sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/rock-climb",
    region: "Hill Country · Fredericksburg / Llano",
    summary: "Granite domes and boulders with a long climbing tradition inside a protected state natural area.",
    details: [
      "Enchanted Rock is both a major Texas landscape and an active climbing area. TPWD requires climbers to check in at park headquarters and publishes a dedicated climbing-management page and climbing-area map. The natural-area designation matters: plants, vernal pools, rock surfaces and other protected features should be treated as part of the resource, not as obstacles to recreation.",
      "The official climbing guidance distinguishes traditional climbing, existing fixed protection and bouldering while prohibiting practices that damage protected natural features. Enchanted Rock has long slab and multi-pitch routes: TPWD warns that protection may be widely spaced and some rappel stations require a rope of at least 70 meters. Never assume a 60-meter rope reaches the ground or that a route is appropriate for beginners. Use the current TPWD map, route information and safe-climbing procedures, with rope-end knots, before committing.",
    ],
  },
  {
    name: "Lake Mineral Wells State Park & Trailway",
    sourceUrl: "https://tpwd.texas.gov/state-parks/lake-mineral-wells/rock-climbing",
    region: "North Texas · west of Fort Worth",
    summary: "Sandstone climbing at Penitentiary Hollow with formal registration requirements at park headquarters.",
    details: [
      "Lake Mineral Wells gives North Texas a public natural-rock option at Penitentiary Hollow. TPWD identifies the area as one of the relatively few natural climbing venues in North Texas and publishes a route map for the rock formations.",
      "Registration is not optional: TPWD says individuals and groups must register at park headquarters and complete the required waiver before climbing or rappelling. Bouldering, free climbing and soloing are prohibited here, so this is NOT a destination for unroped bouldering. TPWD requires a parent or guardian present, or written parental permission, for participants younger than 17; registered groups require an approved guide. The climbing area closes at sundown and during wet conditions, and climbing north of the creek is forbidden. Use the designated bolted anchors, never the scenic-overlook structures; do not install hardware. The park publishes separate notices about rock-area closures; check those notices and confirm with staff at (940) 328-1171 before travel.",
    ],
  },
  {
    name: "Milton Reimers Ranch Park",
    sourceUrl: "https://parks.traviscountytx.gov/parks/reimers-ranch",
    region: "Central Texas · Dripping Springs",
    summary: "A Travis County park whose official trail map marks both North Shore and Climber's Canyon climbing areas along the Pedernales River landscape.",
    details: [
      "Reimers Ranch adds a county-managed climbing destination to the state and national-park mix. Travis County's current park map identifies two climbing areas—North Shore and Climber's Canyon—within a larger network of hiking, river and mountain-bike trails.",
      "County park operations can differ from TPWD rules, and a map is not a substitute for current access instructions. Check Travis County Parks for current hours, fees, closures and any climbing-specific conditions before the trip. The wider park also shares space with river users, hikers and cyclists, so route planning should account for the whole recreation landscape rather than only the cliff line.",
    ],
  },
] as const;

const approachCards = [
  {
    area: "Hueco Tanks · North Mountain vs guided mountains",
    arrival: "Park headquarters and mandatory orientation come first; self-guided North Mountain is limited to 70 people at one time, according to TPWD. West Mountain, East Mountain and East Spur require a guide.",
    action: "Reserve the correct access category ahead of the day. TPWD's park overview says guided tours must be booked at least one week in advance, while its Activities page says request early enough for a guide to be confirmed. Follow the stricter minimum and confirm with staff. A natural-history tour guide is not automatically a technical climbing instructor; verify authorized instruction and equipment separately.",
    map: "https://tpwd.texas.gov/state-parks/hueco-tanks/trails-info",
    closed: "https://tpwd.texas.gov/state-parks/hueco-tanks/climbing-closure-list",
    note: "Read the protected North Mountain sector closures and wet-rock policy BEFORE choosing boulders; a broad park-open alert is not a climbing-zone clearance."
  },
  {
    area: "Enchanted Rock · Echo Canyon and technical granite",
    arrival: "Use the managed park entrance off Ranch Road 965 and park-designated trailheads. Echo Canyon and Turkey Peak are identified in the TPWD trails and climbing-area references.",
    action: "Check in at headquarters. For a first outdoor roped climb, use an operator approved by the park instead of choosing a multipitch slab from an online route rating.",
    map: "https://tpwd.texas.gov/state-parks/enchanted-rock/trails-info",
    closed: "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/rock-climb",
    note: "Rappel endpoints and protection are route-specific; the TPWD warning about 70-meter ropes is not a universal instruction that 70 meters is sufficient for every descent."
  },
  {
    area: "Lake Mineral Wells · Penitentiary Hollow",
    arrival: "Enter Lake Mineral Wells State Park, register at headquarters and use the Penitentiary Hollow designated parking/picnic area. The official rock-area map shows access from the parking lot via the stairway.",
    action: "Complete the climbing waiver and any applicable minor consent; verify the rock area and approved-group guide requirements before carrying gear downhill.",
    map: "https://tpwd.texas.gov/state-parks/lake-mineral-wells/rock-climbing",
    closed: "https://tpwd.texas.gov/state-parks/park-information/notices/lmw-trails-update",
    note: "Accessible picnic pads and parking do NOT mean the sandstone climbing routes or stairway descent are wheelchair accessible. Roped climbing only; no bouldering or soloing."
  },
  {
    area: "Milton Reimers Ranch · North Shore / Climber's Canyon",
    arrival: "Use the Travis County-managed park entrance, then county-signed parking and trails shown on its current park map. Climber's Canyon and North Shore are separate approaches.",
    action: "Check road access notices, climbing policy and any park closures. Confirm with Travis County Parks that a chosen teaching service is authorized for that site.",
    map: "https://parks.traviscountytx.gov/images/docs/Reimers_Park_Trails_Map.pdf",
    closed: "https://parks.traviscountytx.gov/news",
    note: "County management differs from TPWD registrations; beach road access and climber parking are distinct."
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
    <div className="pb-20">
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
            <p className="mt-5 text-xs text-muted-foreground">Source research and safety review by <Link to="/editorial-policy" className="font-semibold underline">TexasDefined Editorial Desk</Link> · updated November 20, 2026 from official land-manager guidance. Check alerts on the day of travel.</p>
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

          <section className="border-b border-border py-10" aria-labelledby="climbing-comparison">
            <p className="eyebrow text-primary">Choose the right area</p>
            <h2 id="climbing-comparison" className="mt-2 font-display text-3xl">Climbing and bouldering do not share the same rules</h2>
            <div className="mt-6 overflow-x-auto">
              <table style={{ minWidth: 670 }} className="w-full text-sm leading-6">
                <caption className="sr-only">Public Texas climbing destinations and important access distinctions</caption>
                <thead><tr className="border-b border-border"><th scope="col" className="p-3">Area</th><th scope="col" className="p-3">Best for</th><th scope="col" className="p-3">Mandatory check</th></tr></thead>
                <tbody>
                  <tr className="border-b border-border"><th scope="row" className="p-3">Hueco Tanks</th><td className="p-3">Bouldering with appropriate experience and permits</td><td className="p-3">Advance access, guided areas and orientation</td></tr>
                  <tr className="border-b border-border"><th scope="row" className="p-3">Enchanted Rock</th><td className="p-3">Granite climbing and designated bouldering</td><td className="p-3">Climber check-in, protection spacing, route length and rappel rope</td></tr>
                  <tr className="border-b border-border"><th scope="row" className="p-3">Lake Mineral Wells</th><td className="p-3">Roped climbing/rappelling, not bouldering</td><td className="p-3">Rock-area closure status, waiver, registration and minor consent</td></tr>
                  <tr className="border-b border-border"><th scope="row" className="p-3">Reimers Ranch</th><td className="p-3">Limestone routes in a county park</td><td className="p-3">County hours, access, park rules and closures</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="climbing-choice">
            <p className="eyebrow text-primary">Choose by experience and restrictions</p>
            <h2 id="climbing-choice" className="mt-2 font-display text-3xl">The best first stop depends on what you can safely do</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>New to outdoor climbing? Do not treat these destinations as beginner instruction. First arrange qualified instruction or an eligible guide, then confirm that the guide is approved for the exact protected area and activity. Lake Mineral Wells requires formal registration and forbids unroped bouldering; a visitor seeking bouldering should not book that park on the assumption every climbing venue allows it.</p>
              <p>Experienced boulderer considering Hueco Tanks? TPWD limits the self-guided North Mountain area to 70 visitors at a time, requires orientation and separates guided areas. Check the park's dedicated wet-weather climbing policy: a significant precipitation event triggers a minimum 24-hour climbing/bouldering closure. Arrange access and check alerts before committing to a long drive.</p>
              <p>Planning Enchanted Rock's longer granite routes? TPWD warns of widely spaced protection and descents that may need at least 70 meters of rope; climbing a scenic granite dome and committing to a technical route are very different decisions. For a Central Texas limestone outing, compare Reimers Ranch's county-managed park access and current road alerts, not a TPWD permit system.</p>
            </div>
            <nav aria-label="Official climbing alerts and arrival choices" className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href="https://tpwd.texas.gov/state-parks/hueco-tanks/weather-closure-policy" target="_blank" rel="noreferrer noopener" className="text-primary underline">Hueco Tanks wet-weather closure policy ↗</a>
              <a href="https://tpwd.texas.gov/state-parks/park-information/notices/lmw-trails-update" target="_blank" rel="noreferrer noopener" className="text-primary underline">Lake Mineral Wells rock-area status ↗</a>
              <a href="https://tpwd.texas.gov/state-parks/enchanted-rock/alert" target="_blank" rel="noreferrer noopener" className="text-primary underline">Enchanted Rock current alerts ↗</a>
              <a href="https://parks.traviscountytx.gov/parks/reimers-ranch" target="_blank" rel="noreferrer noopener" className="text-primary underline">Reimers Ranch current county notices ↗</a>
            </nav>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="climbing-approaches">
            <p className="eyebrow text-primary">On-the-ground access</p>
            <h2 id="climbing-approaches" className="mt-2 font-display text-3xl">Where to start, and where not to enter</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">These are access decisions drawn from current land-manager guidance, not independently tested route descriptions or climbing instruction. A park entrance and the start of a particular rock route are not the same place. Ask staff for current trail/sector maps and do not follow unofficial geotags through protected areas.</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {approachCards.map(item=><article key={item.area} className="border border-border p-5">
                <h3 className="font-display text-xl">{item.area}</h3>
                <p className="mt-3 text-sm leading-7"><strong>Arrival:</strong> {item.arrival}</p>
                <p className="mt-2 text-sm leading-7"><strong>Plan:</strong> {item.action}</p>
                <p className="mt-2 text-sm leading-7"><strong>Don't assume:</strong> {item.note}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <a href={item.map} target="_blank" rel="noreferrer noopener" className="text-primary underline">Land-manager approach guide ↗</a>
                  <a href={item.closed} target="_blank" rel="noreferrer noopener" className="text-primary underline">Current closure rules ↗</a>
                </div>
              </article>)}
            </div>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">Beginner standard: first get indoor belay and equipment training, then arrange a qualified, site-authorized outdoor instructor. A park tour guide is not necessarily a climbing instructor, and an advertised boulder problem is not necessarily open or safe to attempt. We do not assign technical grades without current land-manager or verified route evidence.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="before-climbing">
            <p className="eyebrow text-primary">Before you climb</p>
            <h2 id="before-climbing" className="mt-2 font-display text-3xl">Check access, weather and site rules before committing to the day</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Confirm the reservation, orientation or registration process for the exact area you plan to visit, then check current closures, designated climbing zones and any guide-service or access requirements. Hueco Tanks, Enchanted Rock, Lake Mineral Wells and Reimers Ranch do not use one common access system.</p>
              <p>Heat, lightning, wet rock, flooding, fire restrictions and park closures can turn a planned climbing day into the wrong day to climb. Wear a helmet where falling rock or equipment may be a hazard; double-check harnesses, belay systems, anchors, knots, partner communication and rope length. New climbers should use qualified instruction rather than relying on this destination overview as a technique guide. Check the land manager and current weather before leaving home, and change the plan when access or conditions no longer fit the day you prepared for.</p>
            </div>
          </section>

          <div>
            {areas.map((area, index) => (
              <section key={area.name} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {area.region}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{area.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.summary}</p>
                  <a href={area.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Check this area's official rules and access ↗</a>
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
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Rules, reservation systems, closures and operating conditions can change. These are the first-party sources used for this guide and should control current trip decisions. Source review: November 18, 2026. All access and open/closed status must still be rechecked on the day of travel.</p>
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
    </div>
  );
}
