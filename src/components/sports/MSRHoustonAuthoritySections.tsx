import type { ReactNode } from "react";
/**
 * Independent, dated MSR Houston visitor research. The page intentionally keeps
 * changing track schedules, karting operations and access rules separate from
 * permanent facility facts. Reviewed against MSR Houston primary sources 2026-10-09.
 */
const references = {
  facility: "https://msrhouston.com/about/facility/",
  about: "https://msrhouston.com/about/",
  calendar: "https://msrhouston.com/calendar/",
  events: "https://msrhouston.com/events/",
  membership: "https://msrhouston.com/membership/",
  rules: "https://msrhouston.com/about/track-rules/",
  faqs: "https://msrhouston.com/about/faqs/",
  karting: "https://msrhouston.com/karting/",
  schools: "https://msrhouston.com/schools/",
  location: "https://msrhouston.com/about/location/",
};

const experiences = [
  {
    name: "Member road-course driving",
    access: "Membership plus required orientation and solo clearance",
    action: "Contact the membership office and check the daily track calendar",
    href: references.membership,
  },
  {
    name: "Driving as a member's guest",
    access: "Accompanied by the host member; at most four driving visits per calendar year under the published guest policy",
    action: "Confirm availability, guest documentation, fee and required credentials",
    href: references.membership,
  },
  {
    name: "HPDE / club track day",
    access: "Register for a specific organizer's event; each organizer sets eligibility, instruction, schedule and costs",
    action: "Find an event on the road-course calendar, then register with the organizer",
    href: references.calendar,
  },
  {
    name: "Driving instruction / racing school",
    access: "Prearranged program, not unrestricted public lapping",
    action: "Choose teen safety, private instruction or competition training",
    href: references.schools,
  },
  {
    name: "Race spectator / event visitor",
    access: "Event-specific; public facility access does not mean open access to the hot track or paddock",
    action: "Check the organizer's spectator admission and event check-in instructions",
    href: references.calendar,
  },
  {
    name: "Recreational karting",
    access: "Temporarily closed as of October 9, 2026",
    action: "Do not buy a trip around karting until the operator confirms reopening",
    href: references.karting,
  },
];

const trackFacts = [
  ["Road-course length", "2.38 miles / 3.83 km"],
  ["Road-course turns", "17"],
  ["Road-course width", "40 ft / 12.2 m"],
  ["Direction", "Clockwise or counterclockwise, scheduled by track operations"],
  ["Kart circuit", "0.7 mile / 17 turns / 26 ft wide; currently closed to recreational karting"],
  ["Alternative kart configurations", "Two independent 0.375-mile loops, as described by the venue"],
  ["Paddock", "180,000 sq ft"],
  ["Skid pad", "90,000 sq ft"],
  ["Private garages", "More than 75,000 sq ft"],
  ["Classroom / hospitality / meeting rooms", "3,000 sq ft"],
  ["Registration space", "1,000 sq ft"],
  ["Site", "163 acres"],
];

const checklists = [
  {
    title: "Before reserving",
    items: [
      "Identify the organizer and whether your activity is a members' day, HPDE, racing, a school or a spectator event.",
      "Verify the exact date and track direction; road-course availability can change for private bookings and maintenance.",
      "Check age, license, vehicle, helmet, tech inspection and instructor requirements with your specific organizer.",
      "Confirm refund and weather policies before committing to travel.",
    ],
  },
  {
    title: "Before leaving home",
    items: [
      "Use the official calendar and registration confirmation, not an old search result, for schedule and entry details.",
      "Bring identification and any signed forms, waiver documentation and required safety equipment.",
      "Pack water, sun protection, hearing protection and clothing suited to an exposed outdoor paddock.",
      "Confirm whether event camping, power, fuel and paddock space are available for your specific booking.",
    ],
  },
  {
    title: "On arrival",
    items: [
      "Follow Highway 288 toward South CR 48 and Performance Drive; verify navigation and gate instructions with the organizer.",
      "Sign in at the track office and execute the required waivers before entering restricted areas.",
      "Learn the day's flags, speed limits, track direction, session grouping, and permitted pit and spectator zones.",
      "Observe the posted 10 mph paddock speed limit and obey race-control and corner-worker instructions.",
    ],
  },
];

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">{children} ↗</a>;
}

function SectionHeading({ kicker, title, id, children }: { kicker: string; title: string; id: string; children?: ReactNode }) {
  return <header className="mb-7 max-w-4xl">
    <p className="eyebrow text-primary">{kicker}</p>
    <h2 id={id} className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
    {children ? <div className="mt-4 text-base leading-8 text-muted-foreground">{children}</div> : null}
  </header>;
}

export function MSRHoustonStatusNotice() {
  return <div className="border-b border-border">
    <section aria-labelledby="msr-status" className="border-b border-border py-10">
      <div className="border-l-4 border-amber-600 bg-amber-50/80 px-5 py-5 text-stone-900 dark:bg-amber-950/20 dark:text-foreground">
        <p className="text-xs font-bold uppercase tracking-widest">Operational alert · checked October 9, 2026</p>
        <h2 id="msr-status" className="mt-2 font-display text-2xl sm:text-3xl">Karting is temporarily closed. The road course is a separate operation.</h2>
        <p className="mt-3 text-sm leading-7">
          MSR Houston's karting pages explicitly say the karting operation is temporarily closed. The facility's
          road-course calendar separately lists member sessions, schools and racing. Do not assume you can arrive
          for a walk-in kart session, and do not mistake posted member-track hours for public driving availability.
        </p>
        <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <SourceLink href={references.karting}>Check the karting status</SourceLink>
          <SourceLink href={references.calendar}>Check today's road-course schedule</SourceLink>
        </p>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">Independent Texas Defined verification, not an operator notice. Operational status and registration can change; recheck the linked primary sources before travel.</p>
    </section>

  </div>;
}

/** Render only on /sports-venue/msr-houston; do not add assumptions to other venue types. */
export function MSRHoustonAuthoritySections() {
  return <div className="border-b border-border" aria-label="MSR Houston independent motorsports guide">
    <nav aria-label="MSR Houston guide sections" className="flex flex-wrap gap-x-5 gap-y-3 border-b border-border py-6 text-sm font-semibold">
      <a href="#msr-access" className="underline underline-offset-4 hover:text-primary">How to participate</a>
      <a href="#msr-track-facts" className="underline underline-offset-4 hover:text-primary">Track specifications</a>
      <a href="#msr-safety" className="underline underline-offset-4 hover:text-primary">Safety & fees</a>
      <a href="#msr-checklist" className="underline underline-offset-4 hover:text-primary">Trip checklist</a>
      <a href="#msr-history" className="underline underline-offset-4 hover:text-primary">History</a>
      <a href="#msr-logistics" className="underline underline-offset-4 hover:text-primary">Camping & amenities</a>
    </nav>

    <section className="border-b border-border py-10" aria-labelledby="msr-access">
      <SectionHeading kicker="Choose your experience" id="msr-access" title="Can you actually drive at MSR Houston?">
        <p>There is no single public admission ticket that guarantees road-course driving. Membership, hosted
        guest sessions, organizer-run track days, competition events and formal schools are distinct ways to use the
        venue. <SourceLink href={references.membership}>Membership & guest policy</SourceLink></p>
      </SectionHeading>
      <div className="overflow-x-auto rounded-sm border border-border">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm leading-6">
          <thead className="bg-muted/40">
            <tr><th className="p-4 font-semibold">Experience</th><th className="p-4 font-semibold">Access requirements</th><th className="p-4 font-semibold">Next step</th></tr>
          </thead>
          <tbody>{experiences.map((item) => <tr key={item.name} className="border-t border-border align-top">
            <th scope="row" className="p-4 font-semibold">{item.name}</th>
            <td className="p-4 text-muted-foreground">{item.access}</td>
            <td className="p-4"><SourceLink href={item.href}>{item.action}</SourceLink></td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">
        Beginner route: a registered driver-education event or an instructed session may be more practical than
        committing to a membership. A club's HPDE is driver education, not automatically a race or a timed qualifying
        session. The organizer controls eligibility, instruction and registration. <SourceLink href={references.schools}>Driving programs</SourceLink>
      </p>
    </section>

    <section className="border-b border-border py-10" aria-labelledby="msr-track-facts">
      <SectionHeading kicker="Technical reference" id="msr-track-facts" title="What makes the circuit different">
        <p>The road course and kart course are not interchangeable. The 2.38-mile road circuit has 17 turns,
        runs in either direction and combines slow, medium and faster corners. MSR reports FIA approval and
        testing use by professional teams. That does not mean every event is an FIA-sanctioned race.
        <span> </span><SourceLink href={references.facility}>Official facility specifications</SourceLink></p>
      </SectionHeading>
      <dl className="grid gap-x-10 md:grid-cols-2">
        {trackFacts.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 border-t border-border py-3 text-sm">
          <dt className="font-semibold">{label}</dt><dd className="max-w-[55%] text-right text-muted-foreground">{value}</dd>
        </div>)}
      </dl>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <div className="border border-border p-5">
          <h3 className="font-display text-xl">Track operations, not just a lap count</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Race control, trackside towers, corner-camera coverage, paved runoff in critical areas and a substantial paddock support organized sessions and testing. The track direction is calendar-dependent: confirm clockwise versus counterclockwise before planning instruction or data comparison.</p>
        </div>
        <div className="border border-border p-5">
          <h3 className="font-display text-xl">A note about track maps</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">The parking orientation graphic above is deliberately a schematic of arrival and paddock zones—not a driving-line map, scale plan or guaranteed parking assignment. The venue's facility page includes aerial photos; rely on event-issued circuit diagrams and instructor briefings for on-track navigation.</p>
          <p className="mt-3 text-sm"><SourceLink href={references.facility}>View official aerial references</SourceLink></p>
        </div>
      </div>
    </section>

    <section className="border-b border-border py-10" aria-labelledby="msr-safety">
      <SectionHeading kicker="Participation rules" id="msr-safety" title="What drivers, guests and spectators need to know">
        <p>Even though MSR says the facility is open to the public, restricted track and pit access is controlled.
        Everyone entering must sign a waiver, and the operator's track rules require office check-in, appropriate
        forms and staff permission before taking to the circuit. <SourceLink href={references.rules}>Full track rules</SourceLink></p>
      </SectionHeading>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border-t border-border pt-4">
          <h3 className="font-display text-2xl">Drivers & motorcycles</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">New members must complete orientation and clearance before driving solo. Drivers wear helmets on track; equipment, passing zones and race-control signals follow the applicable car, motorcycle and event regulations. Motorcycle guests and instruction have specific restrictions. Check the current published rules and your organizer's supplemental regulations.</p>
        </div>
        <div className="border-t border-border pt-4">
          <h3 className="font-display text-2xl">Guest driving fee</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">The venue's published member-guest driving fee was <strong>$175 plus tax</strong> on October 9, 2026, for eligible, accompanied guests. That is <strong>not</strong> a general admission ticket or an HPDE-school price. Other programs, event admission, initiation fees and monthly membership dues are separate; reconfirm pricing before booking.</p>
          <p className="mt-3 text-sm"><SourceLink href={references.membership}>Verify current guest fee and policies</SourceLink></p>
        </div>
        <div className="border-t border-border pt-4">
          <h3 className="font-display text-2xl">Spectator safety</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Admission, permitted paddock areas, event photography and spectator vantage points depend on the event organizer. Do not enter the hot pit or circuit unless authorized; watch for moving cars, tow vehicles and trailers. Wear hearing protection around sustained engine noise.</p>
        </div>
        <div className="border-t border-border pt-4">
          <h3 className="font-display text-2xl">Never assume walk-in access</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">The official calendar describes member-track hours of 9 a.m.–5 p.m. subject to schedule restrictions. Those hours do not guarantee spectator entry, rental availability or a driver session. Schedule an experience with the appropriate operator first.</p>
          <p className="mt-3 text-sm"><SourceLink href={references.calendar}>Live operating calendar</SourceLink></p>
        </div>
      </div>
    </section>

    <section className="border-b border-border py-10" aria-labelledby="msr-checklist">
      <SectionHeading kicker="Practical trip planner" id="msr-checklist" title="The three-stage track-day checklist">
        <p>For most first-time visitors the hard part is not finding the address; it is confirming a suitable
        event, entering the right area and carrying the correct documents and safety gear.</p>
      </SectionHeading>
      <div className="grid gap-7 lg:grid-cols-3">
        {checklists.map((group, index) => <div className="border border-border p-5" key={group.title}>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Step {index + 1}</p>
          <h3 className="mt-2 font-display text-2xl">{group.title}</h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">{group.items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>)}
      </div>
    </section>

    <section className="border-b border-border py-10" aria-labelledby="msr-logistics">
      <SectionHeading kicker="Visit logistics" id="msr-logistics" title="Facilities, overnight stays, food and access">
        <p>Plan for a working outdoor motorsports property—not a conventional grandstand stadium.
        The operator publishes different rules for members, racing events and scheduled schools.</p>
      </SectionHeading>
      <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl">Camping and RVs</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Overnight camping is permitted only at certain events and the operator says there are <strong>no RV hookups</strong>. Restrooms and showers are reported on the west side of Garage 1. Confirm overnight permission, trailer permits and site access with your event organizer before arriving with an RV.</p>
        </div>
        <div>
          <h3 className="font-display text-2xl">Fuel and vehicle support</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">MSR lists on-site non-ethanol fuel grades of 93 unleaded, 100 unleaded and 110 leaded. Fuel inventory and availability are not guaranteed; contact the track for current supply. Garages are primarily a member facility, not public day-use accommodation.</p>
        </div>
        <div>
          <h3 className="font-display text-2xl">Food, pets and weather</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Large events may have food vendors; the venue permits visitors to bring food and drinks. Leashed pets are allowed under its FAQ. No alcohol is allowed while either circuit is green, and some events run rain or shine. Confirm event-specific rules before relying on any of these provisions.</p>
        </div>
        <div>
          <h3 className="font-display text-2xl">Accessibility and family visits</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">The operator does not publish a universal accessibility and accessible-parking map across every event. Ask the track and organizer about suitable viewing locations, accessible restrooms, mobility needs and gate routes before purchasing admission or scheduling a family visit.</p>
        </div>
      </div>
      <p className="mt-7 text-sm"><SourceLink href={references.faqs}>Operator FAQ covering camping, fuel, pets, food and weather</SourceLink></p>
    </section>

    <section className="border-b border-border py-10" aria-labelledby="msr-history">
      <SectionHeading kicker="Motorsports history" id="msr-history" title="From a 2005 members' track to regional racing and driver development">
        <p>Opened in <strong>December 2005</strong>, MSR Houston grew as a members' motorsports venue south
        of Houston. The operator describes past professional testing involving IndyCar-associated teams,
        including Target Chip Ganassi Racing, Andretti Autosport and A.J. Foyt Enterprises. In 2007 it
        served as a sanctioned test site for Champ Car, the Atlantic Championship and Formula BMW.
        These are historical claims, not evidence those teams currently test here. <SourceLink href={references.about}>Venue history</SourceLink></p>
      </SectionHeading>
      <ol className="grid gap-6 md:grid-cols-3">
        <li className="border-t border-border pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">December 2005</p>
          <h3 className="mt-2 font-display text-xl">Facility opens</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">Road-course membership and a purpose-built motorsports campus establish a different kind of venue from a large spectator oval.</p>
        </li>
        <li className="border-t border-border pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">2007</p>
          <h3 className="mt-2 font-display text-xl">Professional-series testing</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">MSR says the facility was sanctioned for Champ Car, Atlantic Championship and Formula BMW testing that year.</p>
        </li>
        <li className="border-t border-border pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Today</p>
          <h3 className="mt-2 font-display text-xl">Multiple motorsports communities</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">Club driving, motorcycle schools, amateur road racing, competition instruction and private testing use the road course on different calendars.</p>
        </li>
      </ol>
    </section>

    <section className="py-10" aria-labelledby="msr-context">
      <SectionHeading kicker="Where it fits in Texas" id="msr-context" title="Make MSR Houston part of a Brazoria County trip">
        <p>Despite its name, MSR Houston is in <strong>Angleton, Brazoria County</strong>, south of the
        central Houston urban core. The operator directs southbound Highway 288 travelers to the
        South CR 48 exit, beyond the FM 1462/Rosharon interchange. Actual trip times vary with traffic;
        verify route conditions before departure. <SourceLink href={references.location}>Official directions</SourceLink></p>
      </SectionHeading>
      <div className="flex flex-wrap gap-4 text-sm font-semibold">
        <a href="/city/angleton" className="border border-border px-4 py-3 hover:border-primary hover:text-primary">Explore Angleton →</a>
        <a href="/county/brazoria" className="border border-border px-4 py-3 hover:border-primary hover:text-primary">Brazoria County guide →</a>
        <a href="/sports-venues" className="border border-border px-4 py-3 hover:border-primary hover:text-primary">Compare Texas sports venues →</a>
        <a href="/explore/road-trips" className="border border-border px-4 py-3 hover:border-primary hover:text-primary">Texas road trips →</a>
      </div>
      <p className="mt-6 text-xs leading-6 text-muted-foreground">Research method: Texas Defined independently synthesized primary venue information, checked Oct. 9, 2026. Static dimensions and historical details are attributed to the operator. Closures, event schedules, prices and public access must be rechecked. This guide is not affiliated with MSR Houston.</p>
    </section>
  </div>;
}
