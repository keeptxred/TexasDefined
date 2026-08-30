import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const officialSources = [
  { label: "Texas Parks & Wildlife — Stargazing in State Parks", href: "https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing-in-state-parks", note: "Statewide International Dark Sky Park list, very-dark-sky parks, observatory links and stargazing planning resources." },
  { label: "Texas Parks & Wildlife — Big Bend Ranch Stargazing", href: "https://tpwd.texas.gov/state-parks/big-bend-ranch/dark-skies", note: "Official Bortle ratings, accessible viewing locations, moon/weather resources and exceptionally dark-sky measurements." },
  { label: "Texas Parks & Wildlife — Copper Breaks Stargazing", href: "https://tpwd.texas.gov/state-parks/copper-breaks/stargazing", note: "Official Dark Sky Park status, Bortle rating, star-party information and current sky-planning resources." },
  { label: "Texas Parks & Wildlife — Enchanted Rock Stargazing", href: "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/dark-skies/", note: "Official Dark Sky Park guidance and real-time sky-quality monitoring for the Hill Country site." },
  { label: "Texas Parks & Wildlife — South Llano River Stargazing", href: "https://tpwd.texas.gov/state-parks/south-llano-river/dark-skies", note: "Official Bortle rating, after-hours night-activity guidance and real-time dark-sky monitoring." },
  { label: "Texas Parks & Wildlife — Caprock Canyons Dark Sky designation", href: "https://tpwd.texas.gov/newsmedia/releases/?req=20260107a", note: "Official January 2026 designation notice confirming Caprock Canyons as Texas's fifth International Dark Sky Park." },
] as const;

const parks = [
  {
    name: "Big Bend Ranch State Park",
    region: "Far West Texas · Big Bend",
    summary: "Texas's darkest state-park sky, with Bortle Class 1 conditions in parts of a vast and remote Chihuahuan Desert landscape.",
    details: [
      "TPWD calls Big Bend Ranch the darkest area of Texas and lists accessible viewing locations including River Road, West Contrabando Trailhead, Big Hill and the Hoodoos. Some parts of the park rate Bortle Class 1, while developed visitor areas are brighter.",
      "Darkness does not remove desert trip hazards. Extreme heat can persist after sunset, roads and services are remote, and cloud cover or moonlight can overwhelm the reason for the drive. Check park alerts, moonrise and moonset, weather and the specific viewing area's vehicle access before committing to a late-night plan.",
    ],
  },
  {
    name: "Caprock Canyons State Park & Trailway",
    region: "Panhandle Plains · Quitaque",
    summary: "Texas's newest International Dark Sky Park, designated in January 2026 after lighting and stewardship work at the canyon-and-bison landscape.",
    details: [
      "TPWD announced Caprock Canyons as the fifth Texas state park to earn International Dark Sky Park designation in January 2026. The designation reflects lighting policy, ongoing stewardship and protection of the park's night environment rather than a guarantee of clear skies on any particular visit.",
      "Use the park's current alerts and event calendar when planning. The same open Panhandle setting that creates broad horizons can also bring strong wind, storms and rapid weather changes, so a star-party date or dark-sky label should never substitute for a same-day forecast.",
    ],
  },
  {
    name: "Copper Breaks State Park",
    region: "Panhandle Plains · Quanah",
    summary: "A Bortle Class 2 International Dark Sky Park known for recurring star parties and exceptionally dark rural plains skies.",
    details: [
      "Copper Breaks combines an International Dark Sky Park designation with monthly star parties during much of the year. TPWD rates the park Bortle Class 2 and notes that visitors do not need a scheduled program or telescope to experience its dark skies.",
      "For an independent visit, check moon phase, cloud cover, park hours and any current alerts first. For a program visit, use the current TPWD events schedule rather than relying on an older calendar because dates and operating details change.",
    ],
  },
  {
    name: "Enchanted Rock State Natural Area",
    region: "Hill Country · Fredericksburg / Llano",
    summary: "A Central Texas International Dark Sky Park where protected rural darkness exists within reach of growing Hill Country development.",
    details: [
      "Enchanted Rock's dark-sky status adds a nighttime dimension to a destination best known for its granite dome. TPWD says the Milky Way remains visible under suitable conditions and operates a real-time dark-sky monitor at the site.",
      "This is a heavily visited State Natural Area with its own access and operating rules. Stargazing does not imply unrestricted nighttime hiking or access to every part of the park. Verify reservations, hours, closures and approved nighttime use before building the plan around a late arrival.",
    ],
  },
  {
    name: "South Llano River State Park",
    region: "Hill Country · Junction",
    summary: "A Bortle Class 3 International Dark Sky Park with real-time sky monitoring and an explicit night-activity option for visitors staying past normal hours.",
    details: [
      "South Llano River offers a practical Hill Country dark-sky trip with camping, scheduled astronomy programs and real-time darkness monitoring. TPWD rates the park Bortle Class 3 and describes views of the Milky Way under good conditions.",
      "Visitors who want to stargaze beyond normal hours should follow the park's current night-activity fee and access process. Moon phase, clouds and transparency still matter: a designated dark-sky site can deliver a poor astronomy night when natural conditions are unfavorable.",
    ],
  },
] as const;

const planningPaths = [
  { to: "/explore/outdoors", label: "Outdoors & wildlife", description: "Connect night-sky trips to public-land access, weather, wildlife and seasonal planning." },
  { to: "/explore/state-parks", label: "Texas state parks", description: "Find camping, operating hours and current park-specific visitor information." },
  { to: "/texas-natural-wonders-bucket-list", label: "Natural wonders", description: "Pair dark skies with the landscapes that make these destinations worth the daytime drive too." },
  { to: "/best-places-to-go-camping-in-texas", label: "Texas camping", description: "Choose an overnight base when the best viewing window falls well after sunset." },
  { to: "/explore/road-trips", label: "Texas road trips", description: "Build remote dark-sky parks into realistic regional routes and daylight stops." },
  { to: "/explore/trip-planner", label: "Texas Trip Planner", description: "Sequence drive times, reservations, sunset, moon conditions and overnight logistics." },
] as const;

export const Route = createLazyFileRoute("/texas-stargazing-guide")({ component: TexasStargazingGuidePage });

function TexasStargazingGuidePage() {
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
            <p className="eyebrow text-primary">Dark skies · moon phase · park access</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Stargazing Guide</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A visitor-first guide to Texas's five International Dark Sky Parks, with the moon, weather, Bortle rating, park-hours and access questions to resolve before making a night-sky trip.</p>
          </header>

          <section className="border-b border-border py-9" aria-labelledby="quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="quick-answer" className="mt-2 font-display text-3xl">A Dark Sky designation is the starting point, not the forecast</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">TPWD currently lists Big Bend Ranch, Caprock Canyons, Copper Breaks, Enchanted Rock and South Llano River as International Dark Sky Parks. For the actual night, check moonrise and moonset, cloud cover, transparency, weather, park alerts, operating hours and any after-hours access rules. Lower Bortle numbers indicate darker skies, but even a Bortle Class 1 site can be disappointing under a bright moon or overcast sky.</p>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="stewardship">
            <p className="eyebrow text-primary">Night-sky stewardship</p>
            <h2 id="stewardship" className="mt-2 font-display text-3xl">Protect the darkness you came to see</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-muted-foreground">
              <p>Dark-sky designations are tied to lighting practices and long-term stewardship. Follow park rules on lighting, parking, quiet hours and nighttime access, and avoid unnecessary bright light that disrupts other visitors and wildlife.</p>
              <p>This guide is trip planning, not astronomy or astrophotography instruction. It does not teach telescope alignment, solar viewing, optical equipment use, celestial navigation or night photography settings. Never look directly at the sun through binoculars, a telescope or other optical equipment without purpose-built solar safety equipment and competent guidance.</p>
            </div>
          </section>

          <div>
            {parks.map((park, index) => (
              <section key={park.name} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {park.region}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{park.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{park.summary}</p>
                </div>
                <div className="max-w-3xl space-y-5">
                  {park.details.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          <section className="border-b border-border py-10" aria-labelledby="planning">
            <p className="eyebrow text-primary">Keep planning</p>
            <h2 id="planning" className="mt-2 font-display text-3xl">Build the night sky into a complete Texas trip</h2>
            <nav aria-label="Texas stargazing related guides" className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 id="sources" className="mt-2 font-display text-3xl">Verify darkness, access and events with TPWD</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Designations, park access, alerts, hours, event schedules and night-activity rules can change. These first-party sources support this guide and should control current trip decisions. Source review: August 30, 2026.</p>
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
